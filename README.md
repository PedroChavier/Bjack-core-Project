# bjack-core 🚧

> **⚠️ Projeto em desenvolvimento ativo — funcionalidades e estrutura podem mudar a qualquer momento.**

Projeto fullstack desenvolvido para fins de **estudo** e construção de **portfólio pessoal**. A aplicação combina um frontend web clássico com uma API REST em Node.js e um banco de dados relacional MySQL.

---

## 🃏 Conceito do Projeto

**bjack-core** é uma plataforma web de cassino temático centrada em uma única experiência: o **Blackjack** — porém reimaginado com novas regras, apostas laterais *(side bets)* e um sistema econômico próprio.

### O Jogo

O fluxo segue o Blackjack tradicional por rodadas — aposta, distribuição de cartas, decisões do jogador (hit, stand, double, split) e resolução com recompensas ou perdas. Sobre essa base clássica, o projeto introduz **regras adicionais** e uma gama de **side bets**, ampliando as possibilidades estratégicas e tornando cada rodada mais dinâmica. Está previsto também permitir múltiplas mãos por rodada, cada uma com sua própria aposta e decisões. Paralelamente às regras padrão, os baralhos podem conter **jokers** (Black/Red), cada um com um efeito imediato na rodada — como vitória ou derrota instantânea, ou a chance de um jackpot **(em desenvolvimento)**.

### Sistema de Carteira e Moedas

Cada usuário possui uma **carteira virtual** abastecida pela loja da plataforma. O diferencial está na diversidade de moedas aceitas, divididas em três categorias:

| Categoria | Exemplos |
|-----------|----------|
| 💵 Moedas Fiduciárias | BRL, USD, EUR, GBP... |
| ₿ Criptomoedas | BTC, ETH, DGC... |
| 🎰 Moedas Fictícias | Exclusivas da plataforma |

As moedas **não fictícias** têm seus valores atualizados por uma **API de cotação em tempo real**, refletindo o mercado. Todas as moedas do jogo, independente da categoria, têm seus valores **volatilizados dinamicamente** a partir de uma **moeda central de referência** com valor estático — criando um mini ecossistema econômico dentro da plataforma.

### Visão Geral da Experiência

```
Usuário → Loja → Carteira (multi-moeda) → Mesa de Blackjack → Resultado
                     ↑
             API de cotação (tempo real)
```

O projeto explora na prática conceitos como **integração com APIs externas**, **modelagem de dados financeiros**, **lógica de jogo server-side** e **design de sistemas com múltiplas entidades relacionadas** — tornando-o um case técnico denso e representativo para o portfólio.

> 🔮 Funcionalidades adicionais estão planejadas para versões futuras à medida que o projeto evolui.

---

## 🎯 Objetivo

Este projeto foi criado com dois propósitos principais:

1. **Aprendizado prático** — aplicar conceitos de desenvolvimento web fullstack de ponta a ponta.
2. **Portfólio** — demonstrar habilidades técnicas com uma aplicação real e funcional.

---

## 🧰 Stack Tecnológica

### Frontend
- **HTML5**, **CSS3**, **JavaScript** (vanilla)
- **Express Handlebars** (`express-handlebars`) — template engine server-side para renderização de views `.hbs`
- Design de telas prototipado via **Figma**

### Backend / API
- **Node.js** com **TypeScript 5** — tipagem estática e configuração strict habilitada
- **Express 5** — framework HTTP com roteamento e middlewares
- **CORS** (`cors`) — controle de requisições cross-origin
- **Dotenv** (`dotenv`) — carregamento de variáveis de ambiente via arquivo `.env`
- **TypeORM** (`typeorm`) — ORM com suporte a decorators, migrations e relacionamentos
- **reflect-metadata** — suporte a metadados necessário para decorators do TypeORM
- **class-validator** — validação declarativa de DTOs via decorators (ex: `@IsString`, `@IsEmail`)
- **class-transformer** — serialização/desserialização de objetos plain ↔ instâncias de classe (`plainToInstance`, `instanceToPlain`)

### Banco de Dados
- **MySQL** (via driver `mysql2`) — banco relacional principal integrado ao TypeORM

### Tooling & DX (Dev Dependencies)
- **tsx** — executa TypeScript diretamente no Node.js sem compilação prévia (usado em `dev` e `debug`)
- **nodemon** — reinicialização automática do servidor em alterações de arquivo
- **TypeScript** (`tsc`) — compilador; build gerado em `./dist` com target `ES2024`
- **Chalk** — estilização de output colorido no terminal (usado nos scripts do `ToolKit/`)
- **@types/node**, **@types/express**, **@types/cors** — definições de tipos para autocompletion e type-checking

---

## 📁 Estrutura do Projeto

```
bjack-core/
├── src/             # Código-fonte TypeScript
├── dist/            # Build compilado (gerado pelo tsc)
├── ToolKit/         # Scripts auxiliares (setup, build)
├── .env             # Variáveis de ambiente (não versionado)
├── package.json
└── tsconfig.json
```

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos
- Node.js 18+
- MySQL rodando localmente
- Arquivo `.env` configurado (veja `.env.example` se disponível)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/pedrochavier/bjack-core.git
cd bjack-core

# Instale as dependências
npm install
```

### Scripts disponíveis

| Comando           | Descrição                                         |
|-------------------|---------------------------------------------------|
| `npm run dev`     | Inicializa o servidor em modo de desenvolvimento  |
| `npm run build`   | Compila o TypeScript para JavaScript              |
| `npm run debug`   | Executa arquivo de testes com watch mode          |
| `npm run rst`     | Executa o script de setup inicial                 |
| `npm start`       | Roda setup e inicializa o servidor                |

---

## 🗺️ Roadmap

- [ ] Estrutura base do projeto (Express + TypeORM)
- [ ] Modelagem do banco de dados
- [ ] Endpoints REST da API
- [ ] Frontend com HTML/CSS/JS
- [ ] Integração frontend ↔ API
- [ ] Telas baseadas no Figma
- [ ] Deploy

---

## 📄 Licença

Distribuído sob a licença [ISC](./LICENSE).
