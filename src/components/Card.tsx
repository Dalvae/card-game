import React from "react";

interface CardProps {
  suit: string;
  value: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ suit, value, onClick }) => {
  const suitSymbols: { [key: string]: string } = {
    corazones: "♥",
    diamantes: "♦",
    pica: "♠",
    trebol: "♣",
  };

  const suitColors: { [key: string]: string } = {
    corazones: "text-red-500",
    diamantes: "text-red-500",
    pica: "text-black",
    trebol: "text-black",
  };

  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-lg shadow-md w-32 h-48 flex flex-col justify-between m-4 p-2 cursor-pointer ${suitColors[suit]}`}
    >
      <div className="absolute top-0 left-1 flex flex-col justify-start items-center leading-none">
        <div className="text-2xl leading-none">{value}</div>
        <div className="text-2xl leading-none">{suitSymbols[suit]}</div>
      </div>
      <div className="flex items-center justify-center flex-grow">
        <div className="text-7xl">{suitSymbols[suit]}</div>
      </div>
      <div className="absolute bottom-0 right-1 flex flex-col rotate-180 items-center  leading-none">
        <div className="text-2xl leading-none">{value}</div>
        <div className="text-2xl leading-none">{suitSymbols[suit]}</div>
      </div>
    </div>
  );
};

export default Card;
