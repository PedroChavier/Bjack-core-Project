// Lógica pura de baralho — sem dependências externas
// Movido de src/Tests/Function_Paradise.ts

export type Suits = 'D' | 'S' | 'H' | 'C';
export type Tens = 'T' | 'Q' | 'J' | 'K';
export type Joker = 'RED' | 'BLACK';
export type Ranks = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | Tens;

export type Card =
    | { kind: 'NORMAL'; rank: Ranks; suit: Suits }
    | { kind: 'JOKER'; color: Joker };

const Suite: Suits[] = ['D', 'S', 'H', 'C'];
const Rank: Ranks[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];

/**
 * Cria um ou mais baralhos, opcionalmente com jokers e embaralhados.
 * @param decks    - número de baralhos (padrão: 1)
 * @param jokers   - número de pares de jokers, ou [black, red] individualmente
 * @param randomize - embaralha o deck ao criar
 */
export function createDeck(
    decks: number = 1,
    jokers: number | [number, number] = 0,
    randomize: boolean = false,
): Card[] {
    const baseDeck: Card[] = Suite.flatMap(suit =>
        Rank.map(rank => ({ kind: 'NORMAL' as const, rank, suit })),
    );

    const stack: Card[] = Array.from({ length: decks }, () => [...baseDeck]).flat();

    if (typeof jokers === 'number') {
        for (let i = 0; i < jokers; i++) {
            stack.push({ kind: 'JOKER', color: 'BLACK' });
            stack.push({ kind: 'JOKER', color: 'RED' });
        }
    } else {
        const [black, red] = jokers;
        for (let i = 0; i < black; i++) stack.push({ kind: 'JOKER', color: 'BLACK' });
        for (let i = 0; i < red; i++) stack.push({ kind: 'JOKER', color: 'RED' });
    }

    return randomize ? shuffle(stack) : stack;
}

/**
 * Embaralha um array de cartas usando Fisher-Yates.
 */
export function shuffle(cards: Card[]): Card[] {
    const arr = [...cards];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j]!, arr[i]!];
    }
    return arr;
}

/**
 * Retira a próxima carta do topo do deck.
 */
export function drawCard(deck: Card[]): Card | undefined {
    return deck.shift();
}
