import { memo, useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
  const cardsToShow = isHovered
    ? deck.items.slice(-3).reverse()
    : deck.items.slice(-1);

  return (
    <div
      className="relative flex justify-center items-center h-64 w-48"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {cardsToShow.map((card, index) => (
        <div
          key={index}
          className={`absolute transition-all duration-500 ease-in-out transform ${
            isHovered ? "hover:translate-x-6 hover:-translate-y-6" : ""
          }`}
          style={{
            zIndex: deck.size() + -index,
            transform: isHovered
              ? `rotate(-${index * 5}deg) scale(${
                  1 + index * 0.1
                }) translateX(-${index * 10}px) translateY(-${index * 10}px)`
              : "none",
          }}
        >
          <Card suit={card.suit} value={card.value} onClick={onClick} />
        </div>
      ))}
      {deck.size() > 1 &&
        [...Array(deck.size() - cardsToShow.length)].map((_, index) => (
          <div
            key={index}
            className="absolute border rounded-lg w-32 h-48 bg-white transform"
            style={{
              transform: `translateY(-${index * 2}px) translateX(-${
                index * 2
              }px)`,
              zIndex: -index - 1,
            }}
          />
        ))}
    </div>
  );
});

export default Deck;
