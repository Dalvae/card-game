import React, { useState, useEffect } from "react";
import Deck from "./components/Deck";
import { createShuffledDeck } from "./utils/createSuffleDeck";
import { Stack } from "./utils/Stack";

interface Card {
  suit: string;
  value: string;
}

const App: React.FC = () => {
  const [leftDeck, setLeftDeck] = useState<Stack<Card>>(
    new Stack(createShuffledDeck())
  );
  const [centerDeck, setCenterDeck] = useState<Stack<Card>>(new Stack());
  const [rightDeck, setRightDeck] = useState<Stack<Card>>(new Stack());
  const [targetValue, setTargetValue] = useState<string>("");
  const [gameWon, setGameWon] = useState<boolean>(false);

  useEffect(() => {
    if (!leftDeck.isEmpty()) {
      const randomIndex = Math.floor(Math.random() * leftDeck.size());
      setTargetValue(leftDeck.items[randomIndex].value);
    }
  }, []);

  useEffect(() => {
    if (
      !leftDeck.isEmpty() &&
      !centerDeck.isEmpty() &&
      !rightDeck.isEmpty() &&
      leftDeck.peek()?.value === targetValue &&
      centerDeck.peek()?.value === targetValue &&
      rightDeck.peek()?.value === targetValue
    ) {
      setGameWon(true);
    }
  }, [leftDeck, centerDeck, rightDeck, targetValue]);

  const handleCardClick = (source: string) => {
    if (gameWon) return;

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
    } else if (source === "right" && !rightDeck.isEmpty()) {
      const card = rightDeck.pop();
      if (card) {
        setRightDeck(rightDeck.clone());
        leftDeck.push(card);
        setLeftDeck(leftDeck.clone());
      }
    }
  };

  const handleResetClick = () => {
    setLeftDeck(new Stack(createShuffledDeck()));
    setCenterDeck(new Stack());
    setRightDeck(new Stack());
    setGameWon(false);
  };

  return (
    <div className=" relative flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mx-[10%] text-center">
        Haz coincidir todas las cartas en: {targetValue}
      </h1>
      <div className="flex flex-col md:flex-row justify-center space-y-1 md:space-y-0 md:space-x-4 mt-8">
        <Deck deck={leftDeck} onClick={() => handleCardClick("left")} />
        <Deck deck={centerDeck} onClick={() => handleCardClick("center")} />
        <Deck deck={rightDeck} onClick={() => handleCardClick("right")} />
      </div>
      {gameWon && (
        <div className="fixed top-0 z- left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50  z-50">
          <div className="bg-white p-32 rounded-lg justify-center items-center flex flex-col">
            <p className="text-black text-xl font-bold mb-4">
              ¡Has ganado el juego!
            </p>
            <button
              onClick={handleResetClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Reiniciar
            </button>
          </div>
        </div>
      )}
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
