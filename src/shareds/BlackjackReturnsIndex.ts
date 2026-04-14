/**
 * ÍNDICE CONSOLIDADO - Retornos do Blackjack
 * 
 * Arquivo central que exporta TUDO que você precisa para trabalhar com retornos.
 * Simplifique seus imports usando este arquivo único.
 * 
 * Uso:
 *   import * as BJReturns from './constants/BlackjackReturnsIndex';
 *   
 *   // Acessar funções
 *   BJReturns.calculateNetReturn('BLACKJACK', 100);
 *   
 *   // Acessar tipos
 *   type Outcome = BJReturns.GameOutcome;
 *   
 *   // Acessar constantes
 *   console.log(BJReturns.SINGLE_HAND_RETURNS);
 */

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

export type {
  JokerResult,
} from './BlackjackReturns.js';

export type {
  SingleHandOutcome,
  SplitOutcome,
  GameOutcome,
  GameResult,
} from './BlackjackReturns.js';

// ============================================================================
// CONSTANTES E DADOS
// ============================================================================

export {
  SINGLE_HAND_RETURNS,
  SPLIT_RETURNS,
  RESPLIT_RETURNS,
  JOKER_RETURNS,
  SPECIAL_MOVES_RETURNS,
  RETURN_SUMMARY,
  SPLIT_MATRIX,
  PAYOUT_CHART,
} from './BlackjackReturns.js';

// ============================================================================
// TABELAS VISUAIS
// ============================================================================

export {
  SINGLE_HAND_TABLE,
  SPLIT_TABLE,
  RESPLIT_TABLE,
  SPECIAL_MOVES_TABLE,
  SPLIT_MATRIX_DETAILED,
  RETURNS_BY_PROFIT,
  EXAMPLE_WITH_VALUES,
  FORMULAS,
  PROBABILITIES_INFO,
  ALL_TABLES,
  printAllTables,
} from './BlackjackReturnsTables.js';

// ============================================================================
// FUNÇÕES DE CÁLCULO
// ============================================================================

export {
  calculateNetReturn,
  calculateFinalBalance,
  getReturnMultiplier,
  isWin,
  isLoss,
  isPush,
  getOutcomeDescription,
  calculateSplitReturn,
} from '../utils/returnCalculator.js';

// ============================================================================
// FUNÇÕES E EXEMPLOS
// ============================================================================

export {
  exampleSingleHands,
  exampleSplits,
  sessionExample1,
  sessionExample2,
  splitCalculationExample,
  bankrollManagementExample,
  strategyComparison,
  runAllExamples,
} from '../Tests/BlackjackReturnsExamples.js';

// ============================================================================
// HELPER UTILITIES
// ============================================================================

/**
 * Converte retorno líquido para retorno formatado com símbolo de moeda
 */
export function formatReturn(value: number, currency: string = 'R$'): string {
  if (value === 0) return '±R$0';
  return `${value > 0 ? '+' : ''}${currency}${Math.abs(value).toFixed(2)}`;
}

/**
 * Formata balance final
 */
export function formatBalance(value: number, currency: string = 'R$'): string {
  return `${currency}${value.toFixed(2)}`;
}

/**
 * Obtém cor/emoji baseado no resultado
 */
export function getOutcomeEmoji(outcome: any): string {
  const multiplier = typeof outcome === 'number' 
    ? outcome 
    : getReturnMultiplier(outcome);
  
  if (multiplier > 0) return '✅';
  if (multiplier < 0) return '❌';
  return '➖';
}

/**
 * Formata resultado completo com informações
 */
export interface FormattedResult {
  outcome: string;
  description: string;
  emoji: string;
  multiplier: number;
  netReturn: string;
  finalBalance: string;
}

export function formatGameResult(
  outcome: any,
  bet: number,
  currency: string = 'R$'
): FormattedResult {
  const multiplier = typeof outcome === 'number' 
    ? outcome 
    : getReturnMultiplier(outcome);
  
  const netReturn = bet * multiplier;
  const finalBalance = bet + netReturn;

  return {
    outcome: typeof outcome === 'string' ? outcome : 'UNKNOWN',
    description: typeof outcome === 'string' 
      ? getOutcomeDescription(outcome) 
      : 'Resultado desconhecido',
    emoji: getOutcomeEmoji(multiplier),
    multiplier,
    netReturn: formatReturn(netReturn, currency),
    finalBalance: formatBalance(finalBalance, currency),
  };
}

/**
 * Compara dois resultados e retorna qual é melhor
 */
export function compareOutcomes(
  outcome1: any,
  outcome2: any
): { better: string; difference: number } {
  const mult1 = typeof outcome1 === 'number' 
    ? outcome1 
    : getReturnMultiplier(outcome1);
  
  const mult2 = typeof outcome2 === 'number' 
    ? outcome2 
    : getReturnMultiplier(outcome2);

  const difference = mult1 - mult2;

  return {
    better: difference > 0 ? 'outcome1' : difference < 0 ? 'outcome2' : 'equal',
    difference,
  };
}

/**
 * Simula uma sequência de jogos e retorna estatísticas
 */
export interface GameStats {
  totalGames: number;
  wins: number;
  losses: number;
  pushes: number;
  totalReturn: number;
  averageReturn: number;
  winRate: number;
  roi: number; // Return on Investment
}

export function simulateGameSequence(
  outcomes: any[],
  bets: number[]
): GameStats {
  if (outcomes.length !== bets.length) {
    throw new Error('Outcomes e bets devem ter o mesmo tamanho');
  }

  let wins = 0;
  let losses = 0;
  let pushes = 0;
  let totalReturn = 0;
  let totalBet = 0;

  for (let i = 0; i < outcomes.length; i++) {
    const multiplier = typeof outcomes[i] === 'number'
      ? outcomes[i]
      : getReturnMultiplier(outcomes[i]);

    const return_i = bets[i] * multiplier;
    totalReturn += return_i;
    totalBet += bets[i];

    if (multiplier > 0) wins++;
    else if (multiplier < 0) losses++;
    else pushes++;
  }

  return {
    totalGames: outcomes.length,
    wins,
    losses,
    pushes,
    totalReturn,
    averageReturn: totalReturn / outcomes.length,
    winRate: (wins / outcomes.length) * 100,
    roi: (totalReturn / totalBet) * 100,
  };
}

/**
 * Formata estatísticas de jogo para exibição
 */
export function formatGameStats(stats: GameStats): string {
  return `
📊 ESTATÍSTICAS DE JOGO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 Total de Jogos: ${stats.totalGames}
✅ Vitórias: ${stats.wins}
❌ Derrotas: ${stats.losses}
➖ Empates: ${stats.pushes}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 Retorno Total: R$${stats.totalReturn.toFixed(2)}
📊 Retorno Médio: R$${stats.averageReturn.toFixed(2)}
📈 Taxa de Vitória: ${stats.winRate.toFixed(1)}%
💹 ROI: ${stats.roi.toFixed(1)}%
`;
}

// ============================================================================
// QUICK REFERENCE - Retornos Mais Comuns
// ============================================================================

export const QUICK_REFERENCE = {
  BEST: { outcome: 'SPLIT_BJ-BJ', multiplier: 3.0, description: '2 Blackjacks' },
  VERY_GOOD: { outcome: 'BLACKJACK', multiplier: 1.5, description: 'Blackjack Natural' },
  GOOD: { outcome: 'WIN_21', multiplier: 1.0, description: 'Vitória Simples' },
  NEUTRAL: { outcome: 'PUSH', multiplier: 0.0, description: 'Empate' },
  BAD: { outcome: 'LOSS_BUST', multiplier: -1.0, description: 'Derrota' },
  WORST: { outcome: 'RESPLIT_4-0-0-0', multiplier: -4.0, description: '4 Derrotas' },
} as const;

// ============================================================================
// EXPORT PADRÃO
// ============================================================================

export default {
  // Tipos
  type: {
    GameOutcome: true,
    SplitOutcome: true,
    SingleHandOutcome: true,
    GameResult: true,
  },

  // Constantes
  returns: {
    SINGLE_HAND_RETURNS,
    SPLIT_RETURNS,
    RESPLIT_RETURNS,
  },

  // Funções
  calc: {
    calculateNetReturn,
    calculateFinalBalance,
    getReturnMultiplier,
  },

  // Utilitários
  utils: {
    formatReturn,
    formatBalance,
    formatGameResult,
    compareOutcomes,
    simulateGameSequence,
    formatGameStats,
  },

  // Referência rápida
  QUICK_REFERENCE,
};
