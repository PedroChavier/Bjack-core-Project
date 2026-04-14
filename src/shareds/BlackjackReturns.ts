/**
 * TODOS OS POSSÍVEIS RETORNOS DO BLACKJACK
 * 
 * Notação:
 * b = aposta original
 * Retorno positivo = ganho | Retorno negativo = perda
 */

// ============================================================================
// 1. SEM SPLIT (Mão Única)
// ============================================================================

export const SINGLE_HAND_RETURNS = {
  // Vitória imediata - Blackjack Natural (21 com 2 cartas)
  BLACKJACK: {
    name: 'Blackjack Natural',
    return: 1.5, // +3/2b (retorna 2.5b total: 1b original + 1.5b ganho)
    description: 'Ás + Carta de 10 (J, Q, K) na mão inicial',
  },

  // Vitórias por valor superior
  WIN_21: {
    name: 'Vitória com 21',
    return: 1.0, // +2b (retorna 2b total: 1b original + 1b ganho)
    description: 'Jogador faz 21 sem blackjack natural e dealer não faz 21',
  },
  WIN_DEALER_BUST: {
    name: 'Vitória por Bust do Dealer',
    return: 1.0, // +2b
    description: 'Jogador fica em qualquer valor ≤ 21, dealer estoura (> 21)',
  },
  WIN_HIGHER: {
    name: 'Vitória por Valor Superior',
    return: 1.0, // +2b
    description: 'Jogador > Dealer, ambos ≤ 21',
  },

  // Empate
  PUSH: {
    name: 'Empate (Push)',
    return: 0.0, // 0 (aposta retorna intacta)
    description: 'Jogador e Dealer com mesmo valor',
  },

  // Derrotas
  LOSS_BUST: {
    name: 'Perda por Bust',
    return: -1.0, // -b
    description: 'Jogador estoura (> 21)',
  },
  LOSS_DEALER_21: {
    name: 'Perda para 21 do Dealer',
    return: -1.0, // -b
    description: 'Dealer faz 21, jogador < 21',
  },
  LOSS_DEALER_HIGHER: {
    name: 'Perda por Valor Inferior',
    return: -1.0, // -b
    description: 'Dealer > Jogador, ambos ≤ 21',
  },

  // Empate com Blackjack
  PUSH_BLACKJACK: {
    name: 'Empate com Blackjack',
    return: 0.0, // 0
    description: 'Jogador e Dealer ambos com blackjack (21 com 2 cartas)',
  },
} as const;

// ============================================================================
// 2. COM SPLIT (Duas Mãos)
// ============================================================================

export const SPLIT_RETURNS = {
  // Split simples: ambas as mãos têm um resultado
  'SPLIT_2-0': {
    name: 'Split: 2 Vitórias',
    return: 2.0, // +2b em cada mão = +4b total (retorna 3b total: 2b original + 2b ganho)
    description: 'Venceu as 2 mãos',
    calculation: '+b (mão1) + b (mão2)',
  },

  'SPLIT_2-1': {
    name: 'Split: 1 Vitória, 1 Empate',
    return: 1.0, // +b em uma, 0 na outra
    description: 'Uma mão venceu, a outra empatou',
    calculation: '+b (mão1) + 0 (mão2)',
  },

  'SPLIT_2-2': {
    name: 'Split: 2 Empates',
    return: 0.0, // 0 + 0
    description: 'Empatou ambas as mãos',
    calculation: '0 (mão1) + 0 (mão2)',
  },

  'SPLIT_1-1': {
    name: 'Split: 1 Vitória, 1 Derrota',
    return: 0.0, // +b e -b = 0
    description: 'Uma mão venceu, a outra perdeu',
    calculation: '+b (mão1) - b (mão2)',
  },

  'SPLIT_1-2': {
    name: 'Split: 1 Empate, 1 Derrota',
    return: -1.0, // 0 - b
    description: 'Uma mão empatou, a outra perdeu',
    calculation: '0 (mão1) - b (mão2)',
  },

  'SPLIT_0-2': {
    name: 'Split: 2 Derrotas',
    return: -2.0, // -b em cada mão = -2b total
    description: 'Perdeu ambas as mãos',
    calculation: '-b (mão1) - b (mão2)',
  },

  // Split com Blackjack
  'SPLIT_BJ-0': {
    name: 'Split: 1 Blackjack, 1 Vitória',
    return: 2.5, // +1.5b (BJ) + b (win)
    description: 'Uma mão é blackjack, a outra é vitória simples',
    calculation: '+1.5b (BJ) + b (mão 2)',
  },

  'SPLIT_BJ-1': {
    name: 'Split: 1 Blackjack, 1 Empate',
    return: 1.5, // +1.5b + 0
    description: 'Uma mão é blackjack, a outra é empate',
    calculation: '+1.5b (BJ) + 0 (mão2)',
  },

  'SPLIT_BJ-2': {
    name: 'Split: 1 Blackjack, 1 Derrota',
    return: 0.5, // +1.5b - b
    description: 'Uma mão é blackjack, a outra é derrota',
    calculation: '+1.5b (BJ) - b (mão2)',
  },

  'SPLIT_BJ-BJ': {
    name: 'Split: 2 Blackjacks',
    return: 3.0, // +1.5b + 1.5b
    description: 'Ambas as mãos são blackjack',
    calculation: '+1.5b (mão1) + 1.5b (mão2)',
  },
} as const;

// ============================================================================
// 3. RESPLITS (Até 4 mãos)
// ============================================================================

export const RESPLIT_RETURNS = {
  'RESPLIT_3-0-0': {
    name: 'Resplit: 3 Vitórias',
    return: 3.0, // +b × 3
    description: 'Venceu as 3 mãos',
  },

  'RESPLIT_3-1-1': {
    name: 'Resplit: 1 Vitória, 2 Empates',
    return: 1.0, // +b + 0 + 0
    description: 'Uma mão venceu, duas empataram',
  },

  'RESPLIT_2-1-0': {
    name: 'Resplit: 2 Vitórias, 1 Empate',
    return: 2.0, // +b + b + 0
    description: 'Duas mãos venceram, uma empatou',
  },

  'RESPLIT_4-0-0-0': {
    name: 'Resplit: 4 Mãos, 4 Vitórias',
    return: 4.0, // +b × 4
    description: 'Venceu as 4 mãos',
  },

  'RESPLIT_2-1-1-0': {
    name: 'Resplit: 2 Vitórias, 2 Derrotas',
    return: 0.0, // +b + b - b - b = 0
    description: 'Resultado equilibrado entre 4 mãos',
  },

  'RESPLIT_0-0-0-0': {
    name: 'Resplit: 4 Mãos, 4 Derrotas',
    return: -4.0, // -b × 4
    description: 'Perdeu todas as 4 mãos',
  },
} as const;

// ============================================================================
// 4. CASOS ESPECIAIS COM JOKERS
// ============================================================================

export const JOKER_RETURNS = {
  RED_JOKER: {
    name: 'Red Joker (1 Joker Vermelho)',
    return: null, // Efeito a ser implementado
    description: 'Pode resultar em vitória imediata ou multiplicador',
  },

  BLACK_JOKER: {
    name: 'Black Joker (1 Joker Preto)',
    return: null, // Efeito a ser implementado
    description: 'Pode resultar em derrota imediata ou penalidade',
  },

  DOUBLE_RED: {
    name: 'Double Red (2 Jokers Vermelhos)',
    return: null, // Efeito a ser implementado (ex: +2b jackpot)
    description: 'Combinação rara com bonus especial',
  },

  DOUBLE_BLACK: {
    name: 'Double Black (2 Jokers Pretos)',
    return: null, // Efeito a ser implementado (ex: -2b penalty)
    description: 'Combinação rara com penalidade especial',
  },

  RED_BLACK: {
    name: 'Red + Black Joker',
    return: null, // Efeito a ser implementado (ex: push/anulação)
    description: 'Cancelamentos entre si',
  },
} as const;

// ============================================================================
// 5. CASOS ESPECIAIS COM DOUBLES & SURRENDERS
// ============================================================================

export const SPECIAL_MOVES_RETURNS = {
  // Double Down (dobrar aposta após 2 primeiras cartas)
  DOUBLE_WIN: {
    name: 'Double Down: Vitória',
    return: 2.0, // +2b (porque dobrou, retorna 3b: 1b original + 2b ganho em 2b apostado)
    description: 'Dobrou a aposta e venceu',
  },

  DOUBLE_PUSH: {
    name: 'Double Down: Empate',
    return: 0.0, // Aposta dobrada retorna
    description: 'Dobrou a aposta e empatou',
  },

  DOUBLE_LOSS: {
    name: 'Double Down: Derrota',
    return: -2.0, // -2b (perdeu o dobro)
    description: 'Dobrou a aposta e perdeu',
  },

  // Surrender (desistir recebendo metade da aposta)
  SURRENDER: {
    name: 'Surrender',
    return: -0.5, // -b/2 (perde metade)
    description: 'Desistiu na início e recebeu metade da aposta',
  },

  // Insurance (aposta lateral contra blackjack do dealer)
  INSURANCE_WIN: {
    name: 'Insurance: Vitória',
    return: 1.0, // +b (aposta de seguro, 2:1)
    description: 'Ativou seguro e dealer tinha blackjack',
  },

  INSURANCE_LOSS: {
    name: 'Insurance: Derrota',
    return: -0.5, // -b/2 (perde metade do original)
    description: 'Ativou seguro mas dealer não tinha blackjack',
  },
} as const;

// ============================================================================
// 6. RESUMO DE RETORNOS POSSÍVEIS (MULTIPLICADORES)
// ============================================================================

export const RETURN_SUMMARY = [
  { range: -4.0, description: '4 Derrotas em Resplit' },
  { range: -2.0, description: '2 Derrotas em Split ou Double Down Loss' },
  { range: -1.0, description: 'Derrota Simples' },
  { range: -0.5, description: 'Surrender ou Insurance Loss' },
  { range: 0.0, description: 'Push/Empate' },
  { range: 0.5, description: 'Blackjack + Derrota em Split' },
  { range: 1.0, description: 'Vitória Simples ou Split 1-1' },
  { range: 1.5, description: 'Blackjack Natural ou Split BJ-Empate' },
  { range: 2.0, description: '2 Vitórias em Split' },
  { range: 2.5, description: 'Blackjack + Vitória em Split' },
  { range: 3.0, description: '3 Vitórias em Resplit ou 2 Blackjacks em Split' },
  { range: 4.0, description: '4 Vitórias em Resplit' },
] as const;

// ============================================================================
// 7. MATRIZ DE COMBINAÇÕES (2 MÃOS COM SPLIT)
// ============================================================================

export const SPLIT_MATRIX = {
  'BJ + BJ': 3.0,      // Blackjack em ambas
  'BJ + WIN': 2.5,     // 1 Blackjack + 1 Vitória
  'BJ + PUSH': 1.5,    // 1 Blackjack + 1 Empate
  'BJ + LOSS': 0.5,    // 1 Blackjack + 1 Derrota
  'WIN + WIN': 2.0,    // 2 Vitórias
  'WIN + PUSH': 1.0,   // 1 Vitória + 1 Empate
  'WIN + LOSS': 0.0,   // 1 Vitória + 1 Derrota
  'PUSH + PUSH': 0.0,  // 2 Empates
  'PUSH + LOSS': -1.0, // 1 Empate + 1 Derrota
  'LOSS + LOSS': -2.0, // 2 Derrotas
} as const;

// ============================================================================
// 8. TIPOS TYPESCRIPT
// ============================================================================

export type SingleHandOutcome =
  | 'BLACKJACK'
  | 'WIN_21'
  | 'WIN_DEALER_BUST'
  | 'WIN_HIGHER'
  | 'PUSH'
  | 'LOSS_BUST'
  | 'LOSS_DEALER_21'
  | 'LOSS_DEALER_HIGHER'
  | 'PUSH_BLACKJACK';

export type SplitOutcome =
  | 'SPLIT_2-0'
  | 'SPLIT_2-1'
  | 'SPLIT_2-2'
  | 'SPLIT_1-1'
  | 'SPLIT_1-2'
  | 'SPLIT_0-2'
  | 'SPLIT_BJ-0'
  | 'SPLIT_BJ-1'
  | 'SPLIT_BJ-2'
  | 'SPLIT_BJ-BJ';

export type GameOutcome = SingleHandOutcome | SplitOutcome;

export interface GameResult {
  outcome: GameOutcome;
  returnMultiplier: number; // Multiplicador de retorno
  finalBalance: number; // Saldo final (aposta original + retorno)
  description: string;
}
