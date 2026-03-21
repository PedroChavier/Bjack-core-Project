// Regras especiais do jogo — efeitos de Joker e side bets
// Lógica pura, sem acesso ao banco ou HTTP.

import type { Card } from './deck.js';

export type JokerResult = 'NONE' | 'RED_JOKER' | 'BLACK_JOKER' | 'DOUBLE_RED' | 'DOUBLE_BLACK' | 'RED_BLACK';

/**
 * Detecta o tipo de combinação de Jokers na mão inicial.
 */
export function detectJoker(hand: [Card, Card]): JokerResult {
    let score = 0;
    for (const card of hand) {
        if (card.kind !== 'JOKER') continue;
        if (card.color === 'RED') score += 1;
        if (card.color === 'BLACK') score += 3;
    }
    switch (score) {
        case 0: return 'NONE';
        case 1: return 'RED_JOKER';
        case 2: return 'DOUBLE_RED';
        case 3: return 'BLACK_JOKER';
        case 4: return 'RED_BLACK';
        case 6: return 'DOUBLE_BLACK';
        default: return 'NONE';
    }
}

// TODO: implementar efeitos dos jokers (vitória imediata, derrota, jackpot, etc.)
// TODO: implementar side bets (Perfect Pairs, 21+3, etc.)
