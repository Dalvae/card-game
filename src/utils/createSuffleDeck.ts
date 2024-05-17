export interface Card {
  suit: string;
  value: string;
}

const suits = [
  "corazones", "diamantes", "pica", "trebol",
  "corazones", "diamantes", "pica", "trebol",
  "corazones", "diamantes", "pica", "trebol",
  "corazones", "diamantes", "pica", "trebol",
  ...Array(100).fill(["corazones", "diamantes", "pica", "trebol"]).flat(),
];

const values = [
  "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",
  ...Array(100).fill(["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]).flat(),
];

export const createShuffledDeck = (): Card[] => {
  const deck: Card[] = [];

  // Crear el mazo de cartas
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }

  // Aleatorizar el mazo de cartas Fisher-Yates
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
};