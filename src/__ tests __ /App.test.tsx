import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import fs from "fs";

interface Card {
  suit: string;
  value: string;
}

interface DeckProps {
  cards: Card[];
  topCard?: Card;
  onClick: () => void;
}

interface PerformanceResults {
  renderInitialDecks: number[];
  moveOneCard: number[];
  moveTenCards: number[];
}

const newPerformanceResults: PerformanceResults = {
  renderInitialDecks: [],
  moveOneCard: [],
  moveTenCards: [],
};

jest.mock("../components/Deck", () => ({ cards, onClick }: DeckProps) => (
  <div data-testid="deck" onClick={onClick}>
    Deck (Size: {cards.length}){" "}
    {cards.length > 0
      ? `Top Card: ${cards[cards.length - 1].value} of ${
          cards[cards.length - 1].suit
        }`
      : ""}
  </div>
));

describe("App performance", () => {
  const numIterations = 20;

  test(`Render initial decks`, () => {
    for (let i = 0; i < numIterations; i++) {
      const startTime = performance.now();
      render(<App />);
      const endTime = performance.now();
      const renderDuration = endTime - startTime;
      newPerformanceResults.renderInitialDecks.push(renderDuration);
    }
  });

  test(`Move one card from left to center`, () => {
    for (let i = 0; i < numIterations; i++) {
      render(<App />);
      const leftDeck = screen.getAllByTestId("deck")[0];
      const inicio = performance.now();
      fireEvent.click(leftDeck);
      const fin = performance.now();
      const duracion = fin - inicio;
      newPerformanceResults.moveOneCard.push(duracion);
    }
  });

  test(`Move ten cards from center to right`, () => {
    for (let i = 0; i < numIterations; i++) {
      render(<App />);
      const leftDeck = screen.getAllByTestId("deck")[0];
      const centerDeck = screen.getAllByTestId("deck")[1];
      const inicio = performance.now();
      for (let j = 0; j < 10; j++) {
        fireEvent.click(leftDeck);
        fireEvent.click(centerDeck);
      }
      const fin = performance.now();
      const duracion = fin - inicio;
      newPerformanceResults.moveTenCards.push(duracion);
    }
  });
});

afterAll(() => {
  try {
    const resultsFile = "resultsarray.json";
    let performanceResults: PerformanceResults = {
      renderInitialDecks: [],
      moveOneCard: [],
      moveTenCards: [],
    };

    if (fs.existsSync(resultsFile)) {
      const existingResults = fs.readFileSync(resultsFile, "utf8");
      performanceResults = JSON.parse(existingResults) as PerformanceResults;
    }

    performanceResults.renderInitialDecks.push(
      ...newPerformanceResults.renderInitialDecks
    );
    performanceResults.moveOneCard.push(...newPerformanceResults.moveOneCard);
    performanceResults.moveTenCards.push(...newPerformanceResults.moveTenCards);

    fs.writeFileSync(resultsFile, JSON.stringify(performanceResults, null, 2));
  } catch (error) {
    console.error("Error writing to resultsarray.json:", error);
  }
});
