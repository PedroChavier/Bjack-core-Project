/**
 * TABELA VISUAL DE RETORNOS DO BLACKJACK
 * Todos os cenários possíveis organizados por categoria
 */

// ============================================================================
// TABELA 1: MÃOS SIMPLES (SEM SPLIT)
// ============================================================================

export const SINGLE_HAND_TABLE = `
╔════════════════════════════════════════════════════════════════╗
║              RETORNOS - MÃOS SIMPLES (SEM SPLIT)              ║
╠════════════════════════════════════════════════════════════════╣
║ CENÁRIO                          │ RETORNO  │ MULTIPLICADOR   ║
╠════════════════════════════════════════════════════════════════╣
║ Blackjack (Ás + 10)              │ +3/2 b   │   1.5x ⭐       ║
║ Vitória (21 ou dealer bust)      │ +2b      │   1.0x ✅       ║
║ Empate / Push                    │ 0        │   0.0x ➖       ║
║ Derrota (bust ou valor menor)    │ -b       │  -1.0x ❌       ║
║ Empate com Blackjack             │ 0        │   0.0x ➖       ║
╚════════════════════════════════════════════════════════════════╝
`;

// ============================================================================
// TABELA 2: COMBINAÇÕES COM SPLIT (2 MÃOS)
// ============================================================================

export const SPLIT_TABLE = `
╔════════════════════════════════════════════════════════════════╗
║         RETORNOS - SPLIT (DUAS MÃOS SIMULTÂNEAS)              ║
╠════════════════════════════════════════════════════════════════╣
║ RESULTADO                        │ RETORNO  │ FÓRMULA         ║
╠════════════════════════════════════════════════════════════════╣
║ Split: 2 Vitórias (2-0)          │ +4b      │ +b +b           ║
║ Split: 1 Vitória, 1 Empate (2-1) │ +2b      │ +b +0           ║
║ Split: 2 Empates (2-2)           │ 0        │ +0 +0           ║
║ Split: 1 Vitória, 1 Derrota      │ 0        │ +b -b           ║
║ Split: 1 Empate, 1 Derrota       │ -2b      │ +0 -b           ║
║ Split: 2 Derrotas (0-2)          │ -2b      │ -b -b           ║
╠════════════════════════════════════════════════════════════════╣
║ COM BLACKJACK:                                                 ║
║ Split: 1 BJ + 1 Vitória (BJ-0)   │ +5b/2    │ +1.5b +b        ║
║ Split: 1 BJ + 1 Empate (BJ-2)    │ +3b/2    │ +1.5b +0        ║
║ Split: 1 BJ + 1 Derrota (BJ-1)   │ +b/2     │ +1.5b -b        ║
║ Split: 2 Blackjacks (BJ-BJ)      │ +3b      │ +1.5b +1.5b ⭐⭐ ║
╚════════════════════════════════════════════════════════════════╝
`;

// ============================================================================
// TABELA 3: RESPLITS (ATÉ 4 MÃOS)
// ============================================================================

export const RESPLIT_TABLE = `
╔═════════════════════════════════════════════════════════════════╗
║              RETORNOS - RESPLIT (ATÉ 4 MÃOS)                   ║
╠═════════════════════════════════════════════════════════════════╣
║ RESULTADO (3 MÃOS)                       │ RETORNO │ TOTAL      ║
╠═════════════════════════════════════════════════════════════════╣
║ 3 Vitórias (3-0-0)                       │ +3b     │ +6b total  ║
║ 2 Vitórias, 1 Empate (2-1-0)             │ +2b     │ +4b total  ║
║ 1 Vitória, 2 Empates (1-1-1)             │ +b      │ +2b total  ║
║ 3 Empates (1-1-1)                        │ 0       │ +0b total  ║
║ 2 Vitórias, 1 Derrota (2-0-1)           │ +b      │ +2b total  ║
║ 1 Vitória, 2 Derrotas (1-0-2)           │ -b      │ -2b total  ║
║ 3 Derrotas (0-0-0)                       │ -3b     │ -6b total  ║
╠═════════════════════════════════════════════════════════════════╣
║ RESULTADO (4 MÃOS)                       │ RETORNO │ TOTAL      ║
╠═════════════════════════════════════════════════════════════════╣
║ 4 Vitórias (4-0-0-0)                     │ +4b     │ +8b total  ║
║ 3 Vitórias, 1 Empate (3-1-0-0)           │ +3b     │ +6b total  ║
║ 2 Vitórias, 2 Empates (2-2-0-0)          │ +2b     │ +4b total  ║
║ 2 Vitórias, 2 Derrotas (2-0-0-2)         │ 0       │ +0b total  ║
║ 4 Derrotas (0-0-0-0)                     │ -4b     │ -8b total  ║
╚═════════════════════════════════════════════════════════════════╝
`;

// ============================================================================
// TABELA 4: MOVIMENTOS ESPECIAIS
// ============================================================================

export const SPECIAL_MOVES_TABLE = `
╔════════════════════════════════════════════════════════════════╗
║            RETORNOS - MOVIMENTOS ESPECIAIS                    ║
╠════════════════════════════════════════════════════════════════╣
║ MOVIMENTO                        │ RETORNO │ NOTAS             ║
╠════════════════════════════════════════════════════════════════╣
║ DOUBLE DOWN                                                    ║
║   ├─ Vitória                    │ +2b     │ Dobrou aposta     ║
║   ├─ Empate                     │ 0       │ Retorna 2b        ║
║   └─ Derrota                    │ -2b     │ Perde o dobro     ║
╠════════════════════════════════════════════════════════════════╣
║ SURRENDER                        │ -b/2    │ Retorna metade    ║
╠════════════════════════════════════════════════════════════════╣
║ INSURANCE (aposta lateral):                                   ║
║   ├─ Campeão (dealer tem BJ)    │ +b/2    │ Paga 2:1          ║
║   └─ Perdedor (dealer sem BJ)   │ -b/2    │ Seguro falha      ║
╠════════════════════════════════════════════════════════════════╣
║ LATE SURRENDER                   │ -b/2    │ Desistência tardia║
╚════════════════════════════════════════════════════════════════╝
`;

// ============================================================================
// TABELA 5: MATRIX DE SPLIT 2 MÃOS DETALHADO
// ============================================================================

export const SPLIT_MATRIX_DETAILED = `
╔══════════════════════════════════════════════════════════════════════════════╗
║                    MATRIX DE SPLIT - 2 MÃOS                                  ║
╠══════════════════════════════════════════════════════════════════════════════╣
║           │  Mão 2: BJ  │ Mão 2: WIN │ Mão 2: PUSH │ Mão 2: LOSS │ TOTAL    ║
╠════════════╬═════════════╪════════════╪═════════════╪═════════════╪══════════╣
║ Mão 1: BJ  │   +3b ⭐⭐  │  +5b/2 ⭐  │   +3b/2 ⭐  │   +b/2      │ MAX      ║
║ Mão 1: WIN │   +5b/2 ⭐  │   +2b ✅   │   +b (2-1)  │   0 (1-1)   │ MÉDIO    ║
║ Mão 1: PUSH│   +3b/2 ⭐  │   +b (2-1) │   0 (2-2)   │  -b (1-2)   │ NORMAL   ║
║ Mão 1: LOSS│   +b/2      │   0 (1-1)  │  -b (1-2)   │  -2b ❌     │ MIN      ║
╚════════════╩═════════════╧════════════╧═════════════╧═════════════╧══════════╝

LEGENDA:
  ⭐⭐  = Resultado excelente (máximo ganho)
  ⭐   = Resultado muito bom
  ✅   = Resultado bom
  ❌   = Resultado ruim (perda)
`;

// ============================================================================
// TABELA 6: RESUMO ORDENADO POR RETORNO
// ============================================================================

export const RETURNS_BY_PROFIT = `
╔════════════════════════════════════════════════════════════════╗
║        RETORNOS ORDENADOS DO MELHOR PARA O PIOR               ║
╠════════════════════════════════════════════════════════════════╣
║ RANK │ RETORNO │ CENÁRIO                                      ║
╠════════════════════════════════════════════════════════════════╣
║  1   │  +4b    │ 4 Vitórias em Resplit (4 mãos)              ║
║  2   │ +3.5b   │ 3 Vitórias em Resplit + 1 Empate            ║
║  3   │  +3b    │ 3 Vitórias em Resplit (OU 2 BJ em Split)    ║
║  4   │  +2.5b  │ BJ + Vitória em Split                       ║
║  5   │  +2b    │ 2 Vitórias em Split (OU Double Down Win)    ║
║  6   │ +1.5b   │ BJ Natural (21 com 2 cartas)                ║
║  7   │  +1b    │ Vitória Simples (21 ou dealer bust)         ║
║  8   │ +0.5b   │ BJ + Derrota em Split                       ║
║      │   0b    │ EMPATE / PUSH (aposta retorna intacta)      ║
║      │ -0.5b   │ Surrender ou Insurance Loss                 ║
║  9   │  -b     │ Derrota Simples                              ║
║ 10   │  -2b    │ 2 Derrotas em Split ou Double Down Loss    ║
║ 11   │  -3b    │ 3 Derrotas em Resplit                       ║
║ 12   │  -4b    │ 4 Derrotas em Resplit (pior caso)           ║
╚════════════════════════════════════════════════════════════════╝
`;

// ============================================================================
// TABELA 7: EXEMPLO COM VALORES REAIS (Aposta de R$100)
// ============================================================================

export const EXAMPLE_WITH_VALUES = `
╔═══════════════════════════════════════════════════════════════════════════╗
║               EXEMPLOS COM APOSTA REAL: R$ 100                            ║
╠═══════════════════════════════════════════════════════════════════════════╣
║ CENÁRIO                          │ RETORNO   │ SALDO FINAL   │ STATUS    ║
╠═══════════════════════════════════════════════════════════════════════════╣
║ Blackjack Natural                │ +R$150    │ R$250 ⭐⭐   │ GANHO     ║
║ Vitória Simples                  │ +R$100    │ R$200 ✅     │ GANHO     ║
║ Empate                           │ ±R$0      │ R$100 ➖     │ NEUTRO    ║
║ Derrota                          │ -R$100    │ R$0 ❌       │ PERDA     ║
╠═══════════════════════════════════════════════════════════════════════════╣
║ SPLIT (R$50 em cada mão):                                                 ║
║ 2 Vitórias                       │ +R$100    │ R$200 ✅     │ GANHO     ║
║ 1 Vitória, 1 Derrota             │ ±R$0      │ R$100 ➖     │ NEUTRO    ║
║ 2 Derrotas                       │ -R$100    │ R$0 ❌       │ PERDA     ║
║ 2 Blackjacks                     │ +R$150    │ R$250 ⭐⭐   │ GANHO     ║
╠═══════════════════════════════════════════════════════════════════════════╣
║ DOUBLE DOWN:                                                              ║
║ Vitória com dupla aposta         │ +R$200    │ R$300 ⭐     │ GANHO     ║
║ Derrota com dupla aposta         │ -R$200    │ -R$100 ❌    │ PERDA     ║
╚═══════════════════════════════════════════════════════════════════════════╝
`;

// ============================================================================
// TABELA 8: FÓRMULAS RESUMIDAS
// ============================================================================

export const FORMULAS = `
╔════════════════════════════════════════════════════════════════╗
║                 FÓRMULAS DE CÁLCULO                           ║
╚════════════════════════════════════════════════════════════════╝

1️⃣  RETORNO LÍQUIDO:
   Retorno = Aposta × Multiplicador
   
   Exemplo: R$100 de aposta com Blackjack
   Retorno = 100 × 1.5 = R$150

2️⃣  SALDO FINAL:
   Saldo Final = Aposta Original + Retorno Líquido
   
   Exemplo: Blackjack com R$100
   Saldo = 100 + 150 = R$250

3️⃣  SPLIT (2 MÃOS COM APOSTA TOTAL):
   Retorno Total = Retorno(Mão1) + Retorno(Mão2)
   
   Exemplo: Split com +b e -b
   Retorno = 100 + (-100) = 0

4️⃣  DOUBLE DOWN:
   Nova Aposta = Aposta Original × 2
   Retorno = Nova Aposta × Multiplicador
   
   Exemplo: DD com vitória (R$100 original)
   Nova Aposta = 200
   Retorno = 200 × 1 = R$200
   Saldo Final = 100 + 200 = R$300

5️⃣  INSURANCE:
   Aposta Insurance = Aposta Original ÷ 2
   Retorno = Aposta Insurance × 2 (se correto) ou -Aposta Insurance
   
   Exemplo: Insurance de R$100 (aposta R$50 no insurance)
   Se acertar: Retorno = +R$100
   Se errar: Retorno = -R$50

6️⃣  SURRENDER:
   Retorno = -Aposta ÷ 2
   
   Exemplo: Surrender com R$100
   Retorno = -R$50
   Saldo Final = R$50
`;

// ============================================================================
// TABELA 9: PROBABILIDADES (INFORMATIVO)
// ============================================================================

export const PROBABILITIES_INFO = `
╔════════════════════════════════════════════════════════════════╗
║           PROBABILIDADES APROXIMADAS (1 Baralho)             ║
╠════════════════════════════════════════════════════════════════╣
║ EVENTO                               │ PROBABILIDADE           ║
╠════════════════════════════════════════════════════════════════╣
║ Blackjack Natural (jogador)          │ ~4.83%                  ║
║ Dealer Blackjack                     │ ~4.83%                  ║
║ Empate com Blackjack                 │ ~0.25%                  ║
║ Vitória (sem Blackjack)              │ ~42.42%                 ║
║ Derrota (jogador bust)               │ ~15.92%                 ║
║ Derrota (dealer vence)               │ ~17.04%                 ║
║ Empate (sem Blackjack)               │ ~8.48%                  ║
║ Vitória por Push                     │ ~8.48%                  ║
╠════════════════════════════════════════════════════════════════╣
║ TOTAL DE VITÓRIA (com tudo)          │ ~48.35%                 ║
║ TOTAL DE DERROTA                     │ ~32.96%                 ║
║ TOTAL DE EMPATE                      │ ~8.48%                  ║
╚════════════════════════════════════════════════════════════════╝

⚠️  Estas probabilidades podem variar dependendo:
   - Número de baralhos em uso
   - Regras específicas da casa (hit on soft 17, etc)
   - Penetração do baralho
`;

export const ALL_TABLES = {
  SINGLE_HAND_TABLE,
  SPLIT_TABLE,
  RESPLIT_TABLE,
  SPECIAL_MOVES_TABLE,
  SPLIT_MATRIX_DETAILED,
  RETURNS_BY_PROFIT,
  EXAMPLE_WITH_VALUES,
  FORMULAS,
  PROBABILITIES_INFO,
};

// Export como função para imprimir tudo
export function printAllTables() {
  console.log(ALL_TABLES.SINGLE_HAND_TABLE);
  console.log(ALL_TABLES.SPLIT_TABLE);
  console.log(ALL_TABLES.RESPLIT_TABLE);
  console.log(ALL_TABLES.SPECIAL_MOVES_TABLE);
  console.log(ALL_TABLES.SPLIT_MATRIX_DETAILED);
  console.log(ALL_TABLES.RETURNS_BY_PROFIT);
  console.log(ALL_TABLES.EXAMPLE_WITH_VALUES);
  console.log(ALL_TABLES.FORMULAS);
  console.log(ALL_TABLES.PROBABILITIES_INFO);
}
