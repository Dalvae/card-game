import React, { useState } from "react";
import Deck from "./components/Deck";
import { createShuffledDeck } from "./utils/createSuffleDeck";
import { Stack } from "./utils/Stack";

interface Card {
  suit: string;
  value: string;
}

export const App: React.FC = () => {
  const [leftDeck, setLeftDeck] = useState<Stack<Card>>(
    new Stack(createShuffledDeck())
  );
  const [centerDeck, setCenterDeck] = useState<Stack<Card>>(new Stack());
  const [rightDeck, setRightDeck] = useState<Stack<Card>>(new Stack());

  const handleCardClick = (source: string) => {
    if (source === "left" && !leftDeck.isEmpty()) {
      const card = leftDeck.pop();
      if (card) {
        setLeftDeck(leftDeck.clone());
        centerDeck.push(card);
        setCenterDeck(centerDeck.clone());
      }
    } else if (source === "center" && !centerDeck.isEmpty()) {
      const card = centerDeck.pop();
      if (card) {
        setCenterDeck(centerDeck.clone());
        rightDeck.push(card);
        setRightDeck(rightDeck.clone());
      }
    }
  };

  const handleResetClick = () => {
    setLeftDeck(new Stack(createShuffledDeck()));
    setCenterDeck(new Stack());
    setRightDeck(new Stack());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex justify-center space-x-4 mt-8">
        <Deck deck={leftDeck} onClick={() => handleCardClick("left")} />
        <Deck deck={centerDeck} onClick={() => handleCardClick("center")} />
        <Deck deck={rightDeck} onClick={() => {}} />
      </div>
      <div className="mt-4">
        <button
          onClick={handleResetClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 "
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default App;
