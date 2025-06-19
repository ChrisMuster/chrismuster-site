// app/components/RPSLSGame.tsx  
"use client";

import { useState } from "react";
import Image from "next/image";

import { capitalize } from "@/utils/utils";

import { choices, Choice, Outcomes, winningCombos } from "./RPSLSTypes";

const outcomes: Outcomes = {
  rock: {
    rock: "It's a tie!",
    paper: "Paper covers Rock.",
    scissors: "Rock smashes Scissors.",
    lizard: "Rock crushes Lizard.",
    spock: "Spock vaporizes Rock.",
  },
  paper: {
    rock: "Paper covers Rock.",
    paper: "It's a tie!",
    scissors: "Scissors cut Paper.",
    lizard: "Lizard eats Paper.",
    spock: "Paper disproves Spock.",
  },
  scissors: {
    rock: "Rock smashes Scissors.",
    paper: "Scissors cut Paper.",
    scissors: "It's a tie!",
    lizard: "Scissors decapitates Lizard.",
    spock: "Spock smashes Scissors.",
  },
  lizard: {
    rock: "Rock crushes Lizard.",
    paper: "Lizard eats Paper.",
    scissors: "Scissors decapitates Lizard.",
    lizard: "It's a tie!",
    spock: "Lizard poisons Spock.",
  },
  spock: {
    rock: "Spock vaporizes Rock.",
    paper: "Paper disproves Spock.",
    scissors: "Spock smashes Scissors.",
    lizard: "Lizard poisons Spock.",
    spock: "It's a tie!",
  },
};

export default function RPSLSGame() {
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string>("");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false); // Controls when to show results

  const playGame = (choice: Choice) => {
    setUserChoice(choice);
    setComputerChoice(null); // Reset previous computer choice
    setResult(""); // Reset previous result
    setShowResult(false); // Hide results initially
    setCountdown(3); // Start countdown from 3

    let count = 3;
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);

      if (count === 0) {
        clearInterval(interval);
        determineWinner(choice);
      }
    }, 1000);
  };

  const determineWinner = (choice: Choice) => {
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(compChoice);

    if (choice === compChoice) {
      setResult("It's a tie!");
    } else {
      // Check if user wins
      const userWins = winningCombos.some(
        ([winner, loser]) => winner === choice && loser === compChoice
      );

      if (userWins) {
        setResult(`You win! ${outcomes[choice][compChoice]}`);
      } else {
        setResult(`Computer wins! ${outcomes[compChoice][choice]}`);
      }
    }

    setCountdown(null); // Hide countdown
    setShowResult(true); // Show result messages
  };

  return (
    <div className="rpsls-game text-center p-xsmall">
      <h1 className="text-2xl font-bold mb-xxsmall">Rock, Paper, Scissors, Lizard, Spock</h1>
      <div className="flex justify-center flex-wrap mb-xxsmall">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => playGame(choice)}
            className="p-2 bg-transparent border-none"
          >
            <Image
              src={`/images/icons/${choice}-icon.png`}
              alt={`${choice} icon`}
              width={80}
              height={80}
              className="rounded-lg hover:scale-110 transition-transform duration-200"
            />
          </button>
        ))}
      </div>

      {/* Show countdown first, then switch to results */}
      {countdown !== null && (
        <h2 className="text-6xl font-bold mt-xxsmall animate-pulse">{countdown}</h2>
      )}

      {showResult && userChoice && computerChoice && (
        <div className="mt-xxsmall">
          <p className="text-lg">You chose: <strong>{capitalize(userChoice)}</strong></p>
          <p className="text-lg">Computer chose: <strong>{capitalize(computerChoice)}</strong></p>
          <h2 className="text-xl font-semibold">{result}</h2>
        </div>
      )}
    </div>
  );
}
