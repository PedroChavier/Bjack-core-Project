/**
 * CALCULADORA DE RETORNOS DO BLACKJACK
 * Funções auxiliares para calcular ganhos, perdas e saldos finais
 */

import type { GameOutcome } from './BlackjackReturns';
import {
  SINGLE_HAND_RETURNS,
  SPLIT_RETURNS,
  RESPLIT_RETURNS,
  SPLIT_MATRIX,
} from './BlackjackReturns';

/**
 * Calcula o retorno líquido (sem aposta original)
 * @param outcome - Tipo de resultado do jogo
 * @param bet - Valor da aposta original
 * @returns Valor do retorno líquido (pode ser negativo)
 */
export function calculateNetReturn(outcome: GameOutcome, bet: number): number {
  const allReturns = {
    ...SINGLE_HAND_RETURNS,
    ...SPLIT_RETURNS,
    ...RESPLIT_RETURNS,
  };

  const result = allReturns[outcome as keyof typeof allReturns];
  if (!result) throw new Error(`Outcome desconhecido: ${outcome}`);

  return bet * result.return;
}

/**
 * Calcula o saldo final (aposta original + retorno)
 * @param outcome - Tipo de resultado do jogo
 * @param bet - Valor da aposta original
 * @returns Saldo final do jogador
 */
export function calculateFinalBalance(outcome: GameOutcome, bet: number): number {
  const netReturn = calculateNetReturn(outcome, bet);
  return bet + netReturn;
}

/**
 * Calcula o multiplicador de retorno (quanto multiplica a aposta)
 * @param outcome - Tipo de resultado do jogo
 * @returns Multiplicador (ex: 1.5 para Blackjack, -1 para derrota)
 */
export function getReturnMultiplier(outcome: GameOutcome): number {
  const allReturns = {
    ...SINGLE_HAND_RETURNS,
    ...SPLIT_RETURNS,
    ...RESPLIT_RETURNS,
  };

  const result = allReturns[outcome as keyof typeof allReturns];
  if (!result) throw new Error(`Outcome desconhecido: ${outcome}`);

  return result.return;
}

/**
 * Verifica se foi uma vitória
 */
export function isWin(outcome: GameOutcome): boolean {
  const multiplier = getReturnMultiplier(outcome);
  return multiplier > 0;
}

/**
 * Verifica se foi uma derrota
 */
export function isLoss(outcome: GameOutcome): boolean {
  const multiplier = getReturnMultiplier(outcome);
  return multiplier < 0;
}

/**
 * Verifica se foi um empate
 */
export function isPush(outcome: GameOutcome): boolean {
  const multiplier = getReturnMultiplier(outcome);
  return multiplier === 0;
}

/**
 * Obtém descrição textual do resultado
 */
export function getOutcomeDescription(outcome: GameOutcome): string {
  const allReturns = {
    ...SINGLE_HAND_RETURNS,
    ...SPLIT_RETURNS,
    ...RESPLIT_RETURNS,
  };

  const result = allReturns[outcome as keyof typeof allReturns];
  if (!result) return 'Resultado desconhecido';

  return result.description || result.name;
}

/**
 * Calcula retorno para split (2 mãos)
 * @param outcome1 - Resultado da primeira mão
 * @param outcome2 - Resultado da segunda mão
 * @param bet - Valor apostado em cada mão
 */
export function calculateSplitReturn(
  outcome1: SingleHandOutcome,
  outcome2: SingleHandOutcome,
  bet: number
): { total: number; byHand: [number, number] } {
  const return1 = calculateNetReturn(outcome1, bet);
  const return2 = calculateNetReturn(outcome2, bet);

  return {
    total: return1 + return2,
    byHand: [return1, return2],
  };
}

/**
 * SIMULADOR - Retorna todas as combinações possíveis com numerador/denominador
 */
export const PAYOUT_CHART = {
  // Formato: "descrição": "retorno em fração",
  'Blackjack (21 com 2 cartas)': '3/2b (1.5x)',
  'Vitória Comum': '2b (1:1)',
  'Vitória dupla (split)': '2b (1:1 cada mão)',
  'Derrota': '-b',
  'Empate (Push)': '0 (aposta retorna)',
  'Split 2-0 (2 vitórias)': '+2b',
  'Split 1-1 (1 vitória, 1 derrota)': '0',
  'Split 0-2 (2 derrotas)': '-2b',
  'Split BJ-BJ': '+3b (1.5b cada)',
  'Double Down (vitória)': '+2b',
  'Double Down (derrota)': '-2b',
  'Surrender': '-b/2',
  'Insurance (acertado)': '+b/2',
} as const;

/**
 * Exemplo de uso em lógica de jogo
 */
export function exampleUsage() {
  const bet = 100; // Aposta de 100 BRL

  const examples = [
    ['BLACKJACK', 'Blackjack Natural'],
    ['WIN_21', 'Vitória com 21'],
    ['PUSH', 'Empate'],
    ['LOSS_BUST', 'Perda por Bust'],
    ['SPLIT_2-0', 'Split: 2 Vitórias'],
    ['SPLIT_0-2', 'Split: 2 Derrotas'],
  ] as const;

  for (const [outcome, label] of examples) {
    const netReturn = calculateNetReturn(outcome, bet);
    const finalBalance = calculateFinalBalance(outcome, bet);
    const multiplier = getReturnMultiplier(outcome);

    console.log(`${label}:`);
    console.log(`  Retorno líquido: ${netReturn > 0 ? '+' : ''}${netReturn}`);
    console.log(`  Saldo final: ${finalBalance}`);
    console.log(`  Multiplicador: ${multiplier}x`);
    console.log();
  }
}
