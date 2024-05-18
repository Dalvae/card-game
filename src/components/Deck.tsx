import React from "react";
import Card from "./Card";

interface Card {
  suit: string;
  value: string;
}

interface DeckProps {
  cards: Card[];
  onClick: () => void;
}

const Deck: React.FC<DeckProps> = ({ cards, onClick }) => {
  const topCard = cards[cards.length - 1];

  return (
    <div className="relative flex justify-center items-center h-64 w-48 m-4">
      {topCard && (
        <div className="absolute" style={{ zIndex: cards.length }}>
          <Card suit={topCard.suit} value={topCard.value} onClick={onClick} />
        </div>
      )}
      {cards.length > 1 &&
        [...Array(cards.length - 1)].map((_, index) => (
          <div
            key={index}
            className="absolute border rounded-lg w-32 h-48 bg-white transform"
            style={{
              transform: `translateY(-${index * 2}px) translateX(-${
                index * 2
              }px)`,
              zIndex: cards.length - index - 1,
            }}
          />
        ))}
    </div>
  );
};

export default Deck;
