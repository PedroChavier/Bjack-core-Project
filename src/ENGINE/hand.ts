// Avaliação de mãos — lógica pura sem dependências externas
// Movido de src/Tests/Function_Paradise.ts

import type { Card, Ranks } from './deck.js';

const TENS: Ranks[] = ['T', 'J', 'Q', 'K'];
const JUST: Ranks[] = ['2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * Calcula o valor de uma mão.
 * Retorna um único número se não há ambiguidade com Ás,
 * ou [soft, hard] quando o Ás pode valer 1 ou 11.
 * Retorna null se a mão tiver menos de 2 cartas.
 */
export function evalHand(hand: Card[]): [number, number] | number | null {
    if (hand.length < 2) return null;

    let low = 0;
    let high = 0;
    let hasAce = false;

    for (const card of hand) {
        if (card.kind === 'JOKER') continue;

        if (card.rank === 'A') {
            low += 1;
            high += hasAce ? 1 : 11;
            hasAce = true;
        } else if (JUST.includes(card.rank)) {
            const val = Number(card.rank);
            low += val;
            high += val;
        } else if (TENS.includes(card.rank)) {
            low += 10;
            high += 10;
        }
    }

    if (low === high) return low;
    if (high === 21) return 21;
    if (high > 21) return low;
    return [low, high];
}

/**
 * Verifica se a mão inicial é Blackjack natural (Ás + carta de 10).
 */
export function isBlackjack(hand: [Card, Card]): boolean {
    let score = 0;
    for (const card of hand) {
        if (card.kind !== 'NORMAL') return false;
        if (TENS.includes(card.rank)) score += 1;
        else if (card.rank === 'A') score += 2;
        else return false;
    }
    return score === 3;
}

/**
 * Verifica se a mão inicial permite split (duas cartas de mesmo rank).
 */
export function canSplit(hand: [Card, Card]): boolean {
    if (hand[0].kind === 'JOKER' || hand[1].kind === 'JOKER') return false;
    return hand[0].rank === hand[1].rank;
}
