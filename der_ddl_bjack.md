# DER & DDL — Bjack-core Database

Modelagem baseada na lógica existente em `src/game/` (deck, hand, rules) e nos serviços planejados.

---

## DER — Diagrama Entidade-Relacionamento

```mermaid
erDiagram
  users {
    int id PK
    varchar username
    varchar email
    varchar password_hash
    decimal balance
    datetime created_at
    datetime updated_at
  }
  games {
    int id PK
    enum status
    int num_decks
    boolean use_jokers
    datetime started_at
    datetime finished_at
  }
  game_players {
    int id PK
    int game_id FK
    int user_id FK
    decimal bet_amount
    enum result
    decimal payout
  }
  rounds {
    int id PK
    int game_id FK
    int round_number
    varchar dealer_hand
    int dealer_score
    datetime created_at
  }
  round_actions {
    int id PK
    int round_id FK
    int game_player_id FK
    enum action
    varchar hand_snapshot
    int score_after
    datetime acted_at
  }
  game_events {
    int id PK
    int round_id FK
    int game_player_id FK
    enum event_type
    json payload
    datetime occurred_at
  }

  users ||--o{ game_players : "participa"
  games ||--o{ game_players : "tem"
  games ||--o{ rounds : "contém"
  rounds ||--o{ round_actions : "registra"
  rounds ||--o{ game_events : "dispara"
  game_players ||--o{ round_actions : "executa"
  game_players ||--o{ game_events : "sofre"
` ``
```

## DDL — MySQL

```sql
-- =============================================
-- Bjack-core Database Schema
-- =============================================

CREATE DATABASE IF NOT EXISTS bjack_core
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE bjack_core;

-- ---------------------------------------------
-- users: jogadores registrados
-- ---------------------------------------------
CREATE TABLE users (
    id            INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    username      VARCHAR(50)     NOT NULL UNIQUE,
    email         VARCHAR(100)    NOT NULL UNIQUE,
    password_hash VARCHAR(255)    NOT NULL,
    balance       DECIMAL(10, 2)  NOT NULL DEFAULT 0.00,
    created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP
                                           ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- ---------------------------------------------
-- games: sessão de jogo (mesa)
-- ---------------------------------------------
CREATE TABLE games (
    id          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    status      ENUM('WAITING', 'ACTIVE', 'FINISHED') NOT NULL DEFAULT 'WAITING',
    num_decks   TINYINT       NOT NULL DEFAULT 1,
    use_jokers  BOOLEAN       NOT NULL DEFAULT FALSE,
    started_at  DATETIME      NULL,
    finished_at DATETIME      NULL,
    PRIMARY KEY (id)
);

-- ---------------------------------------------
-- game_players: vínculo jogador <-> partida e resultado
-- ---------------------------------------------
CREATE TABLE game_players (
    id             INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    game_id        INT UNSIGNED    NOT NULL,
    user_id        INT UNSIGNED    NOT NULL,
    bet_amount     DECIMAL(10, 2)  NOT NULL DEFAULT 0.00,
    result         ENUM('WIN', 'LOSE', 'PUSH', 'BLACKJACK', 'BUST') NULL,
    payout         DECIMAL(10, 2)  NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_game_player (game_id, user_id),
    CONSTRAINT fk_gp_game FOREIGN KEY (game_id) REFERENCES games (id) ON DELETE CASCADE,
    CONSTRAINT fk_gp_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- ---------------------------------------------
-- rounds: cada rodada dentro de uma partida
-- ---------------------------------------------
CREATE TABLE rounds (
    id           INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    game_id      INT UNSIGNED  NOT NULL,
    round_number TINYINT       NOT NULL,
    dealer_hand  VARCHAR(64)   NULL COMMENT 'Ex: "KH AS" — cartas do dealer serializadas',
    dealer_score TINYINT       NULL,
    created_at   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_round_game FOREIGN KEY (game_id) REFERENCES games (id) ON DELETE CASCADE
);

-- ---------------------------------------------
-- round_actions: cada ação do jogador na rodada
-- HIT | STAND | DOUBLE | SPLIT | SURRENDER
-- ---------------------------------------------
CREATE TABLE round_actions (
    id              INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    round_id        INT UNSIGNED  NOT NULL,
    game_player_id  INT UNSIGNED  NOT NULL,
    action          ENUM('HIT', 'STAND', 'DOUBLE', 'SPLIT', 'SURRENDER') NOT NULL,
    hand_snapshot   VARCHAR(128)  NULL COMMENT 'Estado da mão após a ação',
    score_after     TINYINT       NULL,
    acted_at        DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_ra_round  FOREIGN KEY (round_id)       REFERENCES rounds (id)       ON DELETE CASCADE,
    CONSTRAINT fk_ra_player FOREIGN KEY (game_player_id) REFERENCES game_players (id) ON DELETE CASCADE
);

-- ---------------------------------------------
-- game_events: jokers, side bets e eventos especiais
-- Tipos: RED_JOKER | BLACK_JOKER | DOUBLE_RED | DOUBLE_BLACK |
--        RED_BLACK | PERFECT_PAIRS | 21PLUS3
-- ---------------------------------------------
CREATE TABLE game_events (
    id              INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    round_id        INT UNSIGNED  NOT NULL,
    game_player_id  INT UNSIGNED  NOT NULL,
    event_type      ENUM(
                        'NONE',
                        'RED_JOKER', 'BLACK_JOKER',
                        'DOUBLE_RED', 'DOUBLE_BLACK', 'RED_BLACK',
                        'PERFECT_PAIRS', '21PLUS3'
                    ) NOT NULL,
    payload         JSON          NULL COMMENT 'Dados adicionais do evento (ex: multiplicador, cartas)',
    occurred_at     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_ge_round  FOREIGN KEY (round_id)       REFERENCES rounds (id)       ON DELETE CASCADE,
    CONSTRAINT fk_ge_player FOREIGN KEY (game_player_id) REFERENCES game_players (id) ON DELETE CASCADE
);
```

---

## Mapeamento com o código existente

| Tabela | Origem no código |
|---|---|
| `users` | `src/entities/User.ts` + `UserService.ts` |
| `games` | `src/services/GameService.ts` |
| `game_players` | Relaciona `users` ↔ `games` com resultado |
| `rounds` | Cada rodada gerenciada pela `hand.ts` |
| `round_actions` | Ações HIT/STAND mapeadas da lógica de `hand.ts` |
| `game_events` | `JokerResult` de `rules.ts` + side bets planejados |

> [!NOTE]
> `hand_snapshot` e `dealer_hand` armazenam as cartas como string simples (ex: `"KH AS 7D"`). Se precisar de histórico granular por carta, extraia para uma tabela `round_cards` separada.

> [!TIP]
> Com `synchronize: true` ativo no TypeORM, você pode criar as entities em `src/entities/` e o schema é gerado automaticamente. Use esse DDL como referência para as `@Column` e relações.
