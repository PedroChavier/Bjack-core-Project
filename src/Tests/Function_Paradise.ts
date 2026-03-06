import { error } from "node:console"

type Suits = 'D'|'S'|'H'|'C'
type Tens = 'T'|'Q'|'J'|'K'
type Joker = 'RED' | 'BLACK'
type Kindof = 'NORMAL' | 'JOKER'
type Ranks =  'A' | '2' | '3' | '4' | '5' | '6'
  | '7' | '8' | '9' | Tens

const Suite: Suits[] = ['D','S','H','C']
const TENS: Ranks[] = ['T','J','Q','K']
const Rank: Ranks[] = ['A','2','3','4','5','6','7','8','9','T','J','Q','K']
const Just: Ranks[] = ['2','3','4','5','6','7','8','9']

type Card = { kind: 'NORMAL'; rank: Ranks; suit: Suits } | { kind: 'JOKER'; color: Joker }

type JK_type = 'XX' | 'RX' | 'BX' | 'RR' | 'BB' | 'BR'
type status = 'porra'
type GameResult = "seca"

const SCORE: Record<string,Number> = {

}

export function createDeck(decks: number=1,Jacks: number|[number,number] = 0, ramdomize:boolean=false): Card[] {
    const Deck: Card[] = []
    const Stack: Card[] = []
    for (const st of Suite){
        for (const rk of Rank){
            Deck.push({kind:"NORMAL",rank:rk,suit:st})
        }
    }


    if (typeof Jacks === "number"){
        for (let i=0;i<Jacks;++i){
            Stack.push({kind:"JOKER",color:"BLACK"})
            Stack.push({kind:"JOKER",color:"RED"})
        }
    } else if (Array.isArray(Jacks) && Jacks.length===2){
        for (let i=0;i<Jacks[0];++i){
            Stack.push({kind:"JOKER",color:"BLACK"})
        }
        for (let i=0;i<Jacks[1];++i){
            Stack.push({kind:"JOKER",color:"RED"})
        }
    } else {}

    
    for (let i=0;i<decks;++i){
        Stack.push(...Deck);
    }

    if (ramdomize===true){return shuffle(Stack)} else {return Stack}
}


function shuffle(arr: Card[]): Card[] {
    let Shuffled: Card[] = []
    while (arr.length>0) {
        const index: number = Math.floor(Math.random() * (arr.length));
        const [select] = arr.splice(index,1)
        if (select !== undefined){Shuffled.push(select)}                   
    }
    return Shuffled
}

function DrawCards(hand:Card[],deck:Card[]): Card {
    const select: Card = deck.shift()!;
    return select
}

function TesteBlackjack(first: [Card, Card]): boolean {
    let obs = 0;
    for (const card of first) {
        if (card.kind !== 'NORMAL') {return false}
        if (TENS.includes(card.rank)){
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
        if (card.kind !== "JOKER") {continue};
        if (card.color === "RED") {sum += 1};
        if (card.color === "BLACK") {sum += 3};
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

function PossibleSplit(first: [Card, Card]): boolean{
  if ((first[0].kind==="JOKER") || (first[1].kind==="JOKER")) {return false}
  return (first[0].rank===first[1].rank);
}

// function Exchange(Vall: Number, GMR: GameResult): Number {

// }

function HandAval(hand: Card[]): [number,number] | number | null{
    if (hand.length<2){return null}
    let Parcial: [number,number] = [0,0];

    //test if at least one 'A' detected
    let AsFlag: boolean = false;

    for (const elem of hand){
        if (elem.kind==="JOKER"){continue}
        if (elem.rank==="A"){
            Parcial[0] += 1;
            Parcial[1] += AsFlag ? 1 : 11;
            AsFlag = true;
        }
        else if (Just.includes(elem.rank)){
            Parcial[0] += Number(elem.rank);
            Parcial[1] += Number(elem.rank);
        }
        else if (TENS.includes(elem.rank)){
            Parcial[0] += 10;
            Parcial[1] += 10;
        }
    };
    if (Parcial[0]===Parcial[1]){return Number(Parcial[0])}
    else if (Parcial[1]===21){return 21}
    else if (Parcial[1]>21){return Number(Parcial[0])}
    else {return [Parcial[0],Parcial[1]]}
}

// ---------------------------QA-AREA----------------------------
let x: Card[]= createDeck(2,[0,5]);

console.log(x)