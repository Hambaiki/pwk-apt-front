"use client";

import { useState } from "react";
import { Color, GameState } from "../types";

const SequenceMemoryExercise = () => {
  const [gameState, setGameState] = useState(GameState.START);
  const [sequence, setSequence] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showingIndex, setShowingIndex] = useState(-1);

  const colors: Color[] = [
    Color.RED,
    Color.BLUE,
    Color.GREEN,
    Color.YELLOW,
    Color.PURPLE,
    Color.ORANGE,
  ];
  const colorMap: { [key in Color]: string } = {
    [Color.RED]: "bg-red-500",
    [Color.BLUE]: "bg-blue-500",
    [Color.GREEN]: "bg-green-500",
    [Color.YELLOW]: "bg-yellow-400",
    [Color.PURPLE]: "bg-purple-500",
    [Color.ORANGE]: "bg-orange-500",
  };

  const generateSequence = () => {
    const sequenceLength = Math.min(3 + level, 8); // Start with 4, max 9
    const newSequence: string[] = [];
    for (let i = 0; i < sequenceLength; i++) {
      newSequence.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    setSequence(newSequence);
    return newSequence;
  };

  const startGame = () => {
    const newSequence = generateSequence();
    setUserInput([]);
    setCurrentIndex(0);
    setShowingIndex(-1);
    setGameState(GameState.SHOWING);

    // Show sequence with timing
    let index = 0;
    const showInterval = setInterval(() => {
      if (index < newSequence.length) {
        setShowingIndex(index);
        setTimeout(() => setShowingIndex(-1), 500);
        index++;
      } else {
        clearInterval(showInterval);
        setTimeout(() => {
          setGameState(GameState.INPUT);
        }, 800);
      }
    }, 800);
  };

  const handleColorClick = (color: Color) => {
    if (gameState !== GameState.INPUT) return;

    const newUserInput = [...userInput, color];
    setUserInput(newUserInput);

    // Check if the current input matches
    if (newUserInput[currentIndex] === sequence[currentIndex]) {
      if (newUserInput.length === sequence.length) {
        // Completed successfully
        setScore(score + sequence.length * level);
        setLevel(level + 1);
        setGameState(GameState.RESULT);
        setTimeout(() => {
          setGameState(GameState.START);
        }, 2000);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      // Wrong answer
      setGameState(GameState.RESULT);
      //   setTimeout(() => {
      //     setGameState(GameState.START);
      //     setLevel(1);
      //     setScore(0);
      //   }, 3000);
    }
  };

  const resetGame = () => {
    setGameState(GameState.START);
    setScore(0);
    setLevel(1);
    setUserInput([]);
    setSequence([]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Score and Level */}
      <div className="flex justify-between items-center mb-6 bg-gray-50 rounded-lg p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{score}</div>
          <div className="text-sm text-gray-600">Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{level}</div>
          <div className="text-sm text-gray-600">Level</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {sequence.length}
          </div>
          <div className="text-sm text-gray-600">Sequence Length</div>
        </div>
      </div>

      {/* Game Status */}
      <div className="text-center mb-8">
        {gameState === GameState.START && (
          <div>
            <p className="text-lg text-gray-700 mb-4">
              Ready to test your memory?
            </p>
            <button
              onClick={startGame}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-200 shadow-lg"
            >
              Start Level {level}
            </button>
          </div>
        )}

        {gameState === GameState.SHOWING && (
          <div>
            <p className="text-lg text-blue-600 font-semibold">
              Watch carefully...
            </p>
            <div className="mt-2 text-sm text-gray-500">
              Memorize the sequence of colors
            </div>
          </div>
        )}

        {gameState === GameState.INPUT && (
          <div>
            <p className="text-lg text-green-600 font-semibold">Your turn!</p>
            <div className="mt-2 text-sm text-gray-500">
              Click the colors in the same order ({userInput.length}/
              {sequence.length})
            </div>
            {userInput.length > 0 && (
              <div className="mt-2 text-sm text-gray-700">
                Your input: {userInput.join(" → ")}
              </div>
            )}
          </div>
        )}

        {gameState === GameState.RESULT && (
          <div>
            {userInput.length === sequence.length &&
            userInput.every((color, i) => color === sequence[i]) ? (
              <div>
                <p className="text-xl text-green-600 font-bold">Perfect! 🎉</p>
                <p className="text-sm text-gray-600 mt-1">
                  Moving to level {level}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xl text-red-600 font-bold">Game Over!</p>
                <p className="text-sm text-gray-600 mt-1">
                  Final Score: {score}
                </p>
                <button
                  onClick={resetGame}
                  className="text-blue-500 hover:underline"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Color Grid */}
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleColorClick(color)}
            disabled={
              gameState === GameState.SHOWING ||
              gameState === GameState.START ||
              gameState === GameState.RESULT
            }
            className={`
                  ${colorMap[color]} 
                  w-20 h-20 rounded-full shadow-lg transform transition-all duration-200
                  ${
                    gameState === GameState.INPUT
                      ? "hover:scale-110 cursor-pointer"
                      : "cursor-not-allowed"
                  }
                  ${
                    showingIndex >= 0 && sequence[showingIndex] === color
                      ? "scale-125 ring-4 ring-white shadow-xl"
                      : ""
                  }
                  ${
                    gameState === GameState.INPUT &&
                    userInput.length > 0 &&
                    userInput[userInput.length - 1] === color
                      ? "scale-110"
                      : ""
                  }
                  disabled:opacity-70
                `}
          />
        ))}
      </div>

      {/* Sequence Display (for debugging/help) */}
      {gameState === GameState.RESULT &&
        userInput.length !== sequence.length && (
          <div className="text-center text-sm text-gray-500 mb-4">
            Correct sequence: {sequence.join(" → ")}
          </div>
        )}

      {/* Reset Button */}
      {gameState === GameState.START && (score > 0 || level > 1) && (
        <div className="text-center">
          <button
            onClick={resetGame}
            className="text-gray-500 hover:text-gray-700 underline text-sm"
          >
            Reset Game
          </button>
        </div>
      )}
    </div>
  );
};

export default SequenceMemoryExercise;
