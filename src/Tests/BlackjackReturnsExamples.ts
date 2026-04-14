/**
 * EXEMPLOS DE USO - Cálculo de Retornos do Blackjack
 * 
 * Este arquivo demonstra como usar as funções de cálculo de retorno
 * em situações reais do jogo
 */

import type { GameOutcome } from '../constants/BlackjackReturns';
import {
  calculateNetReturn,
  calculateFinalBalance,
  getReturnMultiplier,
  isWin,
  isLoss,
  isPush,
  getOutcomeDescription,
  calculateSplitReturn,
} from '../utils/returnCalculator';

// ============================================================================
// EXEMPLOS - MÃOS SIMPLES
// ============================================================================

export function exampleSingleHands() {
  const bet = 100; // R$ 100

  console.log('🎲 EXEMPLOS: MÃOS SIMPLES\n');

  const outcomes: GameOutcome[] = [
    'BLACKJACK',
    'WIN_21',
    'PUSH',
    'LOSS_BUST',
  ];

  for (const outcome of outcomes) {
    const netReturn = calculateNetReturn(outcome, bet);
    const finalBalance = calculateFinalBalance(outcome, bet);
    const multiplier = getReturnMultiplier(outcome);

    console.log(`📊 ${outcome}`);
    console.log(`   Descrição: ${getOutcomeDescription(outcome)}`);
    console.log(`   Multiplicador: ${multiplier}x`);
    console.log(`   Retorno líquido: ${netReturn > 0 ? '+' : ''}R$${netReturn}`);
    console.log(`   Saldo final: R$${finalBalance}`);
    console.log(
      `   Status: ${isWin(outcome) ? '✅ Ganho' : isLoss(outcome) ? '❌ Perda' : '➖ Empate'}`
    );
    console.log();
  }
}

// ============================================================================
// EXEMPLOS - SPLIT
// ============================================================================

export function exampleSplits() {
  const totalBet = 100; // Aposta total
  const betPerHand = totalBet / 2; // R$ 50 em cada mão

  console.log('🎲 EXEMPLOS: SPLIT (2 MÃOS)\n');

  const splitOutcomes: GameOutcome[] = [
    'SPLIT_2-0',
    'SPLIT_1-1',
    'SPLIT_0-2',
    'SPLIT_BJ-BJ',
  ];

  for (const outcome of splitOutcomes) {
    const netReturn = calculateNetReturn(outcome, totalBet);
    const finalBalance = calculateFinalBalance(outcome, totalBet);
    const multiplier = getReturnMultiplier(outcome);

    console.log(`📊 ${outcome}`);
    console.log(`   Descrição: ${getOutcomeDescription(outcome)}`);
    console.log(`   Multiplicador: ${multiplier}x`);
    console.log(`   Retorno líquido: ${netReturn > 0 ? '+' : ''}R$${netReturn}`);
    console.log(`   Saldo final: R$${finalBalance}`);
    console.log();
  }
}

// ============================================================================
// EXEMPLO REALISTA 1: Sessão Simples
// ============================================================================

export interface GameSession {
  playerName: string;
  bets: number[];
  outcomes: GameOutcome[];
  timestamp: Date;
}

export function sessionExample1(): GameSession {
  // Simulando uma sessão de jogo com 3 rodadas
  const session: GameSession = {
    playerName: 'João',
    bets: [100, 100, 100],
    outcomes: ['BLACKJACK', 'LOSS_BUST', 'WIN_21'],
    timestamp: new Date(),
  };

  console.log('📋 SESSÃO DE JOGO #1\n');
  console.log(`Jogador: ${session.playerName}`);
  console.log(`Data: ${session.timestamp.toLocaleString()}\n`);

  let totalBalance = 0;

  for (let i = 0; i < session.bets.length; i++) {
    const bet = session.bets[i];
    const outcome = session.outcomes[i];
    const netReturn = calculateNetReturn(outcome, bet);
    const finalBalance = calculateFinalBalance(outcome, bet);

    console.log(`🎰 Rodada ${i + 1}:`);
    console.log(`   Aposta: R$${bet}`);
    console.log(`   Resultado: ${outcome}`);
    console.log(`   Retorno: ${netReturn > 0 ? '+' : ''}R$${netReturn}`);
    console.log(`   Saldo desta rodada: R$${finalBalance}`);
    console.log();

    totalBalance += netReturn;
  }

  console.log(`💰 RESULTADO TOTAL DA SESSÃO: ${totalBalance > 0 ? '+' : ''}R$${totalBalance}`);
  console.log(`   Status: ${totalBalance > 0 ? '✅ LUCRO' : totalBalance < 0 ? '❌ PREJUÍZO' : '➖ EMPATE'}`);
  console.log();

  return session;
}

// ============================================================================
// EXEMPLO REALISTA 2: Sessão com Split
// ============================================================================

export function sessionExample2(): GameSession {
  const session: GameSession = {
    playerName: 'Maria',
    bets: [100, 150, 100],
    outcomes: ['SPLIT_2-0', 'WIN_21', 'SPLIT_0-2'],
    timestamp: new Date(),
  };

  console.log('📋 SESSÃO DE JOGO #2 (COM SPLITS)\n');
  console.log(`Jogador: ${session.playerName}`);
  console.log(`Data: ${session.timestamp.toLocaleString()}\n`);

  let totalBalance = 0;

  for (let i = 0; i < session.bets.length; i++) {
    const bet = session.bets[i];
    const outcome = session.outcomes[i];
    const netReturn = calculateNetReturn(outcome, bet);
    const description = getOutcomeDescription(outcome);

    console.log(`🎰 Rodada ${i + 1}:`);
    console.log(`   Aposta: R$${bet}`);
    console.log(`   Resultado: ${outcome}`);
    console.log(`   Descrição: ${description}`);
    console.log(`   Retorno: ${netReturn > 0 ? '+' : ''}R$${netReturn}`);
    console.log();

    totalBalance += netReturn;
  }

  console.log(`💰 TOTAL: ${totalBalance > 0 ? '+' : ''}R$${totalBalance}`);
  return session;
}

// ============================================================================
// EXEMPLO REALISTA 3: Cálculo Manual de Split
// ============================================================================

export function splitCalculationExample() {
  console.log('🎲 CÁLCULO MANUAL DE SPLIT\n');

  const betPerHand = 50; // R$50 em cada mão (split de R$100)

  // Mão 1: Vitória com 20
  // Mão 2: Derrota com 16
  const result = calculateSplitReturn('WIN_HIGHER', 'LOSS_BUST', betPerHand);

  console.log('Cenário: Split de R$100 (R$50 em cada mão)');
  console.log('Mão 1: Vitória com 20 (Dealer 18)');
  console.log('Mão 2: Derrota com 16 (Dealer 20)\n');

  console.log('Cálculo:');
  console.log(`  Mão 1: +R$${result.byHand[0]}`);
  console.log(`  Mão 2: -R$${Math.abs(result.byHand[1])}`);
  console.log(`  Total: ${result.total > 0 ? '+' : ''}R$${result.total}\n`);

  console.log(`Resultado Final: ${result.total === 0 ? 'EMPATE' : result.total > 0 ? 'GANHO' : 'PERDA'}`);
}

// ============================================================================
// EXEMPLO REALISTA 4: Estratégia de Bankroll
// ============================================================================

export function bankrollManagementExample() {
  console.log('💼 EXEMPLO: GERENCIAMENTO DE BANKROLL\n');

  const initialBankroll = 1000; // R$1000 inicial
  const betUnit = 50; // Unidade de aposta = R$50

  const gameResults: { bet: number; outcome: GameOutcome }[] = [
    { bet: betUnit, outcome: 'BLACKJACK' }, // +75
    { bet: betUnit, outcome: 'WIN_21' }, // +50
    { bet: betUnit, outcome: 'LOSS_BUST' }, // -50
    { bet: betUnit * 2, outcome: 'SPLIT_2-0' }, // +100
    { bet: betUnit, outcome: 'PUSH' }, // 0
    { bet: betUnit, outcome: 'LOSS_DEALER_HIGHER' }, // -50
  ];

  let balance = initialBankroll;
  console.log(`Bankroll Inicial: R$${balance}\n`);

  for (let i = 0; i < gameResults.length; i++) {
    const { bet, outcome } = gameResults[i];
    const netReturn = calculateNetReturn(outcome, bet);
    balance += netReturn;

    const icon = netReturn > 0 ? '✅' : netReturn < 0 ? '❌' : '➖';

    console.log(`Rodada ${i + 1}: Aposta R$${bet}`);
    console.log(`  Resultado: ${outcome}`);
    console.log(`  Retorno: ${netReturn > 0 ? '+' : ''}R$${netReturn}`);
    console.log(`  Bankroll: R$${balance} ${icon}\n`);
  }

  const totalWinLoss = balance - initialBankroll;
  console.log('📊 RESULTADO FINAL:');
  console.log(`  Bankroll Final: R$${balance}`);
  console.log(`  Ganho/Perda: ${totalWinLoss > 0 ? '+' : ''}R$${totalWinLoss}`);
  console.log(`  Variação: ${((totalWinLoss / initialBankroll) * 100).toFixed(1)}%`);
}

// ============================================================================
// EXEMPLO REALISTA 5: Comparação de Estratégias
// ============================================================================

export function strategyComparison() {
  console.log('🎯 COMPARAÇÃO: AGRESSIVO vs CONSERVADOR\n');

  // Estratégia 1: Agressiva (apostas maiores)
  const aggressiveSession: GameOutcome[] = [
    'BLACKJACK',
    'WIN_21',
    'LOSS_BUST', // Dupla
    'SPLIT_0-2',
  ];

  // Estratégia 2: Conservadora (apostas menores)
  const conservativeSession: GameOutcome[] = [
    'WIN_21',
    'PUSH',
    'LOSS_BUST',
    'WIN_HIGHER',
  ];

  const aggressiveBets = [200, 200, 400, 200]; // Apostas maiores
  const conservativeBets = [50, 50, 50, 50]; // Apostas menores

  console.log('ESTRATÉGIA AGRESSIVA:');
  let aggressiveTotal = 0;
  for (let i = 0; i < aggressiveSession.length; i++) {
    const ret = calculateNetReturn(aggressiveSession[i], aggressiveBets[i]);
    aggressiveTotal += ret;
    console.log(`  Rodada ${i + 1}: ${aggressiveSession[i]} (${aggressiveBets[i]}) = ${ret > 0 ? '+' : ''}${ret}`);
  }
  console.log(`  Total: ${aggressiveTotal > 0 ? '+' : ''}R$${aggressiveTotal}\n`);

  console.log('ESTRATÉGIA CONSERVADORA:');
  let conservativeTotal = 0;
  for (let i = 0; i < conservativeSession.length; i++) {
    const ret = calculateNetReturn(conservativeSession[i], conservativeBets[i]);
    conservativeTotal += ret;
    console.log(`  Rodada ${i + 1}: ${conservativeSession[i]} (${conservativeBets[i]}) = ${ret > 0 ? '+' : ''}${ret}`);
  }
  console.log(`  Total: ${conservativeTotal > 0 ? '+' : ''}R$${conservativeTotal}\n`);

  console.log('ANÁLISE:');
  console.log(`  Agressiva: ${aggressiveTotal > 0 ? '✅ Ganho' : aggressiveTotal < 0 ? '❌ Perda' : '➖ Empate'} de R$${aggressiveTotal}`);
  console.log(`  Conservadora: ${conservativeTotal > 0 ? '✅ Ganho' : conservativeTotal < 0 ? '❌ Perda' : '➖ Empate'} de R$${conservativeTotal}`);
}

// ============================================================================
// FUNÇÃO PRINCIPAL PARA EXECUTAR TODOS OS EXEMPLOS
// ============================================================================

export function runAllExamples() {
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  EXEMPLOS PRÁTICOS - CÁLCULO DE RETORNOS DO BLACKJACK');
  console.log('═══════════════════════════════════════════════════════════════════\n');

  console.log('1️⃣  MÃOS SIMPLES');
  console.log('────────────────────────────────────────────────────────────────────\n');
  exampleSingleHands();

  console.log('\n2️⃣  SPLITS');
  console.log('────────────────────────────────────────────────────────────────────\n');
  exampleSplits();

  console.log('\n3️⃣  SESSÃO SIMPLES');
  console.log('────────────────────────────────────────────────────────────────────\n');
  sessionExample1();

  console.log('\n4️⃣  SESSÃO COM SPLITS');
  console.log('────────────────────────────────────────────────────────────────────\n');
  sessionExample2();

  console.log('\n5️⃣  CÁLCULO MANUAL DE SPLIT');
  console.log('────────────────────────────────────────────────────────────────────\n');
  splitCalculationExample();

  console.log('\n6️⃣  GERENCIAMENTO DE BANKROLL');
  console.log('────────────────────────────────────────────────────────────────────\n');
  bankrollManagementExample();

  console.log('\n7️⃣  COMPARAÇÃO DE ESTRATÉGIAS');
  console.log('────────────────────────────────────────────────────────────────────\n');
  strategyComparison();

  console.log('\n═══════════════════════════════════════════════════════════════════');
  console.log('  FIM DOS EXEMPLOS');
  console.log('═══════════════════════════════════════════════════════════════════');
}

// Execute se for o arquivo principal (mais info: https://www.typescriptlang.org/tsconfig#moduleResolution)
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllExamples();
}
