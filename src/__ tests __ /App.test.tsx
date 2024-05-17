import { render, fireEvent, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App";
import { Stack } from "../utils/Stack";
import fs from "fs";

interface Card {
  suit: string;
  value: string;
}
interface DeckProps {
  deck: Stack<Card>;
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

jest.mock(
  "../components/Deck",
  () =>
    ({ deck, onClick, topCard }: DeckProps) =>
      (
        <div data-testid="deck" onClick={onClick}>
          Deck (Size: {deck.size()}){" "}
          {topCard ? `Top Card: ${topCard.value} of ${topCard.suit}` : ""}
        </div>
      )
);

test("Rendimiento al renderizar los 3 mazos iniciales", () => {
  const startTime = performance.now(); // Medir tiempo antes de renderizar
  render(<App />);
  const endTime = performance.now(); // Medir tiempo después de renderizar
  const renderDuration = endTime - startTime;
  console.log(
    `Tiempo para renderizar los mazos iniciales: ${renderDuration} ms`
  );
  newPerformanceResults.renderInitialDecks.push(renderDuration);
  const decks = screen.getAllByTestId("deck");
  expect(decks).toHaveLength(3);
  expect(decks[0]).toHaveTextContent("Deck (Size: 546208)");
  expect(decks[1]).toHaveTextContent("Deck (Size: 0)");
  expect(decks[2]).toHaveTextContent("Deck (Size: 0)");
});

// test("mover una carta desde el centro a la derecha cuando se clickea el izquierdo", () => {
//   render(<App />);
//   const leftDeck = screen.getAllByTestId("deck")[0];
//   const centerDeck = screen.getAllByTestId("deck")[1];

//   fireEvent.click(leftDeck);

//   expect(leftDeck).toHaveTextContent("Deck (Size: 546207)");
//   expect(centerDeck).toHaveTextContent("Deck (Size: 1)");
// });

// test("mover 10 cartas del centro a la derecha", () => {
//   render(<App />);
//   const leftDeck = screen.getAllByTestId("deck")[0];
//   const centerDeck = screen.getAllByTestId("deck")[1];
//   const rightDeck = screen.getAllByTestId("deck")[2];

//   for (let i = 0; i < 10; i++) {
//     fireEvent.click(leftDeck);
//   }

//   for (let i = 0; i < 10; i++) {
//     fireEvent.click(centerDeck);
//   }

//   expect(centerDeck).toHaveTextContent("Deck (Size: 0)");
//   expect(rightDeck).toHaveTextContent("Deck (Size: 10)");
// });
// test("mover 10 cartas de la izquierda al centro cuando se clickea 10 veces", () => {
//   render(<App />);
//   const leftDeck = screen.getAllByTestId("deck")[0];
//   const centerDeck = screen.getAllByTestId("deck")[1];

//   // Simular 10 clics en el mazo izquierdo
//   for (let i = 0; i < 10; i++) {
//     fireEvent.click(leftDeck);
//   }

//   expect(leftDeck).toHaveTextContent("Deck (Size: 546198)");
//   expect(centerDeck).toHaveTextContent("Deck (Size: 10)");
// });

// test("mover una carta desde el centro a la derecha cuando se clickea el centro", () => {
//   render(<App />);

//   const centerDeck = screen.getAllByTestId("deck")[1];
//   const rightDeck = screen.getAllByTestId("deck")[2];

//   fireEvent.click(screen.getAllByTestId("deck")[0]);

//   fireEvent.click(centerDeck);

//   expect(centerDeck).toHaveTextContent("Deck (Size: 0)");
//   expect(rightDeck).toHaveTextContent("Deck (Size: 1)");
// });

// test("No mover una carta cuando el un deck sin carta se clickea", () => {
//   render(<App />);
//   const rightDeck = screen.getAllByTestId("deck")[2];
//   const centerDeck = screen.getAllByTestId("deck")[1];

//   fireEvent.click(rightDeck);
//   fireEvent.click(centerDeck);

//   expect(screen.getAllByTestId("deck")[0]).toHaveTextContent(
//     "Deck (Size: 546208)"
//   );
//   expect(screen.getAllByTestId("deck")[1]).toHaveTextContent("Deck (Size: 0)");
//   expect(screen.getAllByTestId("deck")[2]).toHaveTextContent("Deck (Size: 0)");
// });

// test("resetear los decks iniciales cuando se clickea el boton reiniciar ", () => {
//   render(<App />);
//   userEvent.click(screen.getByText("Reiniciar"));

//   expect(screen.getAllByTestId("deck")[0]).toHaveTextContent(
//     "Deck (Size: 546208)"
//   );
//   expect(screen.getAllByTestId("deck")[1]).toHaveTextContent("Deck (Size: 0)");
//   expect(screen.getAllByTestId("deck")[2]).toHaveTextContent("Deck (Size: 0)");
// });

// test("performance of moving cards from left to center", () => {
//   render(<App />);

//   const leftDeck = screen.getAllByTestId("deck")[0];

//   const startTime = performance.now();
//   fireEvent.click(leftDeck);
//   const endTime = performance.now();

//   const duration = endTime - startTime;
//   console.log(`Time to move a card from left to center: ${duration} ms`);

//   expect(screen.getAllByTestId("deck")[0]).toHaveTextContent(
//     "Deck (Size: 546207)"
//   );
//   expect(screen.getAllByTestId("deck")[1]).toHaveTextContent("Deck (Size: 1)");
// });

// test("performance of moving 10 cards from center to right", () => {
//   render(<App />);

//   const leftDeck = screen.getAllByTestId("deck")[0];
//   const centerDeck = screen.getAllByTestId("deck")[1];
//   const rightDeck = screen.getAllByTestId("deck")[2];
//   const startTime = performance.now();
//   for (let i = 0; i < 10; i++) {
//     fireEvent.click(leftDeck);
//   }

//   for (let i = 0; i < 10; i++) {
//     fireEvent.click(centerDeck);
//   }
//   const endTime = performance.now();
//   const duration = endTime - startTime;
//   console.log(`Time to move 10 cards: ${duration} ms`);

//   // Add your assertions here to verify the state of the decks after the click
//   expect(centerDeck).toHaveTextContent("Deck (Size: 0)");
//   expect(rightDeck).toHaveTextContent("Deck (Size: 10)");
// });

test("Rendimiento al mover una carta de izquierda a centro", () => {
  render(<App />);

  const leftDeck = screen.getAllByTestId("deck")[0];

  const inicio = performance.now();
  fireEvent.click(leftDeck);
  const fin = performance.now();

  const duracion = fin - inicio;
  console.log(
    `Tiempo para mover una carta de izquierda a centro: ${duracion} ms`
  );
  newPerformanceResults.moveOneCard.push(duracion);
  expect(screen.getAllByTestId("deck")[0]).toHaveTextContent(
    "Deck (Size: 546207)"
  );
  expect(screen.getAllByTestId("deck")[1]).toHaveTextContent("Deck (Size: 1)");
});

test("Rendimiento al mover 10 cartas del centro a la derecha", () => {
  render(<App />);

  const leftDeck = screen.getAllByTestId("deck")[0];
  const centerDeck = screen.getAllByTestId("deck")[1];
  const rightDeck = screen.getAllByTestId("deck")[2];

  const inicio = performance.now();
  for (let i = 0; i < 10; i++) {
    fireEvent.click(leftDeck);
  }
  for (let i = 0; i < 10; i++) {
    fireEvent.click(centerDeck);
  }
  const fin = performance.now();
  const duracion = fin - inicio;
  console.log(`Tiempo para mover 10 cartas: ${duracion} ms`);

  newPerformanceResults.moveTenCards.push(duracion);
  expect(centerDeck).toHaveTextContent("Deck (Size: 0)");
  expect(rightDeck).toHaveTextContent("Deck (Size: 10)");
});

afterAll(() => {
  try {
    let performanceResults: PerformanceResults = {
      renderInitialDecks: [],
      moveOneCard: [],
      moveTenCards: [],
    };

    if (fs.existsSync("results.json")) {
      const existingResults = fs.readFileSync("results.json", "utf8");
      performanceResults = JSON.parse(existingResults) as PerformanceResults;
    }

    performanceResults = {
      renderInitialDecks: [
        ...performanceResults.renderInitialDecks,
        ...newPerformanceResults.renderInitialDecks,
      ],
      moveOneCard: [
        ...performanceResults.moveOneCard,
        ...newPerformanceResults.moveOneCard,
      ],
      moveTenCards: [
        ...performanceResults.moveTenCards,
        ...newPerformanceResults.moveTenCards,
      ],
    };

    // Escribir el objeto combinado en results.json
    fs.writeFileSync(
      "results.json",
      JSON.stringify(performanceResults, null, 2)
    );
  } catch (error) {
    console.error("Error writing to results.json:", error);
  }
});
