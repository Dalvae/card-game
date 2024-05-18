import React, { memo } from "react";
import Card from "./Card";
import { Stack } from "../utils/Stack";

interface Card {
  suit: string;
  value: string;
}

interface DeckProps {
  deck: Stack<Card>;
  onClick: () => void;
}
const Deck = memo(function Deck({ deck, onClick }: DeckProps) {
  const topCard = deck.peek();
  return (
    <div className="relative flex justify-center items-center h-64 w-48 ">
      {topCard && (
        <div className="absolute" style={{ zIndex: deck.size() }}>
          <Card suit={topCard.suit} value={topCard.value} onClick={onClick} />
        </div>
      )}
      {deck.size() > 1 &&
        [...Array(deck.size() - 1)].map((_, index) => (
          <div
            key={index}
            className="absolute border rounded-lg w-32 h-48 bg-white transform"
            style={{
              transform: `translateY(-${index * 2}px) translateX(-${
                index * 2
              }px)`,
              zIndex: deck.size() - index - 1,
            }}
          />
        ))}
    </div>
  );
});

export default Deck;
