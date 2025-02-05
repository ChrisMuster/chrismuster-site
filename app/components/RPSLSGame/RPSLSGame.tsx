// app/components/RPSLSGame.tsx  
"use client";

import { useState } from "react";

import { choices, Choice, Outcomes } from "./RPSLSTypes";

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
    scissors: "Scissors cuts Paper.",
    lizard: "Lizard eats Paper.",
    spock: "Paper disproves Spock.",
  },
  scissors: {
    rock: "Rock smashes Scissors.",
    paper: "Scissors cuts Paper.",
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

  const playGame = (choice: Choice) => {
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setComputerChoice(compChoice);

    if (choice === compChoice) {
      setResult("The result is a tie!");
    } else if (outcomes[choice] && outcomes[choice][compChoice]) {
      setResult(outcomes[choice][compChoice]);
    } else {
      setResult("Error: Invalid choice.");
    }
  };

  return (
    <div className="text-center p-5">
      <h1 className="text-2xl font-bold mb-4">Rock, Paper, Scissors, Lizard, Spock</h1>
      <div className="flex justify-center flex-wrap mb-4">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => playGame(choice)}
            className="m-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            {choice.charAt(0).toUpperCase() + choice.slice(1)}
          </button>
        ))}
      </div>
      {userChoice && computerChoice && (
        <div className="mt-4">
          <p className="text-lg">You chose: <strong>{userChoice}</strong></p>
          <p className="text-lg">Computer chose: <strong>{computerChoice}</strong></p>
          <h2 className="text-xl font-semibold">{result}</h2>
        </div>
      )}
    </div>
  );
}
