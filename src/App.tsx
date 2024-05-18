// App.tsx
import React, { useState } from "react";
import Deck from "./components/Deck";
import { createShuffledDeck } from "./utils/createSuffleDeck";

interface Card {
  suit: string;
  value: string;
}

export const App: React.FC = () => {
  const [leftDeck, setLeftDeck] = useState<Card[]>(createShuffledDeck());
  const [centerDeck, setCenterDeck] = useState<Card[]>([]);
  const [rightDeck, setRightDeck] = useState<Card[]>([]);

  const handleCardClick = (source: string) => {
    if (source === "left" && leftDeck.length > 0) {
      const card = leftDeck[leftDeck.length - 1];
      setLeftDeck(leftDeck.slice(0, -1));
      setCenterDeck([...centerDeck, card]);
    } else if (source === "center" && centerDeck.length > 0) {
      const card = centerDeck[centerDeck.length - 1];
      setCenterDeck(centerDeck.slice(0, -1));
      setRightDeck([...rightDeck, card]);
    }
  };

  const handleResetClick = () => {
    setLeftDeck(createShuffledDeck());
    setCenterDeck([]);
    setRightDeck([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex justify-center space-x-4 mt-8">
        <Deck cards={leftDeck} onClick={() => handleCardClick("left")} />
        <Deck cards={centerDeck} onClick={() => handleCardClick("center")} />
        <Deck cards={rightDeck} onClick={() => {}} />
      </div>
      <div className="mt-4">
        <button
          onClick={handleResetClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default App;
