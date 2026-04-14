type Suits = 'D' | 'S' | 'H' | 'C'
type Tens = 'T' | 'Q' | 'J' | 'K'
type Joker = 'RED' | 'BLACK'
type Kindof = 'NORMAL' | 'JOKER'
type Ranks = 'A' | '2' | '3' | '4' | '5' | '6'
    | '7' | '8' | '9' | Tens

const Suite: Suits[] = ['D', 'S', 'H', 'C']
const TENS: Ranks[] = ['T', 'J', 'Q', 'K']
const Rank: Ranks[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K']
const Just: Ranks[] = ['2', '3', '4', '5', '6', '7', '8', '9']

type Card = { kind: 'NORMAL'; rank: Ranks; suit: Suits } | { kind: 'JOKER'; color: Joker }

type JK_type = 'XX' | 'RX' | 'BX' | 'RR' | 'BB' | 'BR'
// type status = 
// type GameResult = 

// const SCORE: Record<string,Number> = {

// }

export function createDeck(decks: number = 1, Jacks: number | [number, number] = 0, ramdomize: boolean = false): Card[] {
    const Deck: Card[] = []
    const Stack: Card[] = []
    for (const st of Suite) {
        for (const rk of Rank) {
            Deck.push({ kind: "NORMAL", rank: rk, suit: st })
        }
    }

    for (let i = 0; i < decks; ++i) {
        Stack.push(...Deck);
    }

    if (typeof Jacks === "number") {
        for (let i = 0; i < Jacks; ++i) {
            Stack.push({ kind: "JOKER", color: "BLACK" })
            Stack.push({ kind: "JOKER", color: "RED" })
        }
    } else if (Array.isArray(Jacks) && Jacks.length === 2) {
        for (let i = 0; i < Jacks[0]; ++i) {
            Stack.push({ kind: "JOKER", color: "BLACK" })
        }
        for (let i = 0; i < Jacks[1]; ++i) {
            Stack.push({ kind: "JOKER", color: "RED" })
        }
    } else { }


    if (ramdomize === true) { return shuffle(Stack) } else { return Stack }
}


function shuffle(arr: Card[]): Card[] {
    let Shuffled: Card[] = []
    while (arr.length > 0) {
        const index: number = Math.floor(Math.random() * (arr.length));
        const [select] = arr.splice(index, 1)
        if (select !== undefined) { Shuffled.push(select) }
    }
    return Shuffled
}

function DrawCards(hand: Card[], deck: Card[]): Card {
    const select: Card = deck.shift()!;
    return select
}

function TesteBlackjack(first: [Card, Card]): boolean {
    let obs = 0;
    for (const card of first) {
        if (card.kind !== 'NORMAL') { return false }
        if (TENS.includes(card.rank)) {
            obs += 1
        } else if (card.rank === 'A') {
            obs += 2
        } else {
            return false
        }
    }
    return obs === 3
}
function TesteJoker(first: [Card, Card]): JK_type {
    let sum = 0;
    for (const card of first) {
        if (card.kind !== "JOKER") { continue };
        if (card.color === "RED") { sum += 1 };
        if (card.color === "BLACK") { sum += 3 };
    }
    switch (sum) {
        case 0: return "XX";
        case 1: return "RX";
        case 2: return "RR";
        case 3: return "BX";
        case 4: return "BR";
        case 6: return "BB";
        default: return "XX";
    }
}

function PossibleSplit(first: [Card, Card]): boolean {
    if ((first[0].kind === "JOKER") || (first[1].kind === "JOKER")) { return false }
    return (first[0].rank === first[1].rank);
}

function Exchange(Vall: Number, GMR: GameResult): Number {

}

function HandAval(hand: Card[]): [number, number] | number | null {
    if (hand.length < 2) { return null }
    let Parcial: [number, number] = [0, 0];

    //test if at least one 'A' detected
    let AsFlag: boolean = false;

    for (const elem of hand) {
        if (elem.kind === "JOKER") { continue }
        if (elem.rank === "A") {
            Parcial[0] += 1;
            Parcial[1] += AsFlag ? 1 : 11;
            AsFlag = true;
        }
        else if (Just.includes(elem.rank)) {
            Parcial[0] += Number(elem.rank);
            Parcial[1] += Number(elem.rank);
        }
        else if (TENS.includes(elem.rank)) {
            Parcial[0] += 10;
            Parcial[1] += 10;
        }
    };
    if (Parcial[0] === Parcial[1]) { return Number(Parcial[0]) }
    else if (Parcial[1] === 21) { return 21 }
    else if (Parcial[1] > 21) { return Number(Parcial[0]) }
    else { return [Parcial[0], Parcial[1]] }
}

function Origin_Small(input: number): string | null {
    if (input <= 0) return null
    if (isNaN(input)) return "NaN"
    if (input === Infinity) return "Infinity"

    const ranges = [
        { threshold: 1_000_000_000_000, suffix: 'T' },
        { threshold: 1_000_000_000,     suffix: 'B' },
        { threshold: 1_000_000,         suffix: 'M' },
        { threshold: 1_000,             suffix: 'k' },
    ]

    for (const { threshold, suffix } of ranges) {
        if (input >= threshold) {
            // Truncate to 3 decimal places (floor, no rounding)
            const raw = Math.floor((input / threshold) * 1000) / 1000
            // Remove trailing zeros via parseFloat
            const formatted = parseFloat(raw.toFixed(3)).toString()
            return ?formatted + suffix:
        }
    }

    // Below 1k: return as-is
    return String(abs)
}
// ---------------------------QA-AREA----------------------------

type TestCase = {
    input: number;
    expected: string | null;
};

const tests: TestCase[] = [
    // 🔹 Básicos
    { input: 0, expected: null },
    { input: 1, expected: "1" },
    { input: 10, expected: "10" },
    { input: 100, expected: "100" },
    { input: 999, expected: "999" },

    // 🔹 Transição mil
    { input: 1000, expected: "1k" },
    { input: 1001, expected: "1k" },
    { input: 1100, expected: "1.1k" },
    { input: 1500, expected: "1.5k" },
    { input: 1999, expected: "1.999k" },

    // 🔹 Mil intermediário
    { input: 2000, expected: "2k" },
    { input: 2500, expected: "2.5k" },
    { input: 9999, expected: "9.999k" },
    { input: 10500, expected: "10.5k" },
    { input: 99999, expected: "99.999k" },

    // 🔹 Limite milhão
    { input: 100000, expected: "100k" },
    { input: 500000, expected: "500k" },
    { input: 999999, expected: "999.999k" },

    // 🔹 Milhão
    { input: 1_000_000, expected: "1M" },
    { input: 1_000_001, expected: "1M" },
    { input: 1_100_000, expected: "1.1M" },
    { input: 1_500_000, expected: "1.5M" },
    { input: 1_999_999, expected: "1.999M" },

    // 🔹 Milhão avançado
    { input: 2_000_000, expected: "2M" },
    { input: 2_500_000, expected: "2.5M" },
    { input: 10_000_000, expected: "10M" },
    { input: 25_000_000, expected: "25M" },
    { input: 999_999_999, expected: "999.999M" },

    // 🔹 Bilhão
    { input: 1_000_000_000, expected: "1B" },
    { input: 1_200_000_000, expected: "1.2B" },
    { input: 1_500_000_000, expected: "1.5B" },
    { input: 2_000_000_000, expected: "2B" },
    { input: 9_999_999_999, expected: "9.999B" },

    // 🔹 Bilhão avançado
    { input: 10_000_000_000, expected: "10B" },
    { input: 25_000_000_000, expected: "25B" },
    { input: 100_000_000_000, expected: "100B" },
    { input: 999_999_999_999, expected: "999.999B" },

    // 🔹 Trilhão
    { input: 1_000_000_000_000, expected: "1T" },
    { input: 1_200_000_000_000, expected: "1.2T" },
    { input: 1_500_000_000_000, expected: "1.5T" },
    { input: 2_000_000_000_000, expected: "2T" },
    { input: 9_999_999_999_999, expected: "9.999T" },

    // 🔹 Decimais
    { input: 999.9, expected: "999.9" },
    { input: 1000.1, expected: "1k" },
    { input: 1500.75, expected: "1.5k" },
    { input: 1000000.5, expected: "1M" },
    { input: 2500000.99, expected: "2.5M" },

    // 🔹 Negativos (bloqueados)
    { input: -1, expected: null },
    { input: -999, expected: null },
    { input: -1000, expected: null },
    { input: -1500, expected: null },
    { input: -1000000, expected: null },
    { input: -2500000, expected: null },

    // 🔹 Pequenos decimais
    { input: 0.1, expected: "0.1" },
    { input: 0.99, expected: "0.99" },
    { input: 0.0001, expected: "0.0001" },

    // 🔹 Edge cases
    { input: 999999.999, expected: "999.999k" },
    { input: 1000000.0001, expected: "1M" },
    { input: 1000056.0001, expected: "1M" },
    { input: 999999999.999, expected: "999.999M" },
    { input: 1000000000.0001, expected: "1B" },

    // 🔹 Extremos
    { input: Number.MAX_SAFE_INTEGER, expected: "9007.199T" },
    { input: Number.MIN_SAFE_INTEGER, expected: null },

    // 🔹 Especiais
    { input: NaN, expected: "NaN" },
    { input: Infinity, expected: "Infinity" }
];

const acets = { Correct: 0, Erro: 0, total: 0 }
tests.forEach(({ input, expected }) => {
    const result = Origin_Small(input);
    acets.total++
    if (result !== expected) {
        acets.Erro++
        console.error(`❌ ${input} → ${result} (esperado: ${expected})`);
    } else {
        acets.Correct++
        console.log(`✅ ${input} → ${result}`);
    }
});

if (acets.Erro === 0) {
    console.log('Todos Satisfazem');
} else {
    console.log(`${acets.Correct}: Resultados Certos`)
    console.log(`${acets.Erro}: Resultados Errados`)
    console.log(`${acets.total}: ao Total`)
}