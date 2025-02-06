// app/components/RPSLSTypes.ts  

// The immutable choices array  
export const choices = ["rock", "paper", "scissors", "lizard", "spock"] as const;

// Type for valid choices  
export type Choice = typeof choices[number];

// Define the outcomes as a type  
export type Outcomes = Record<Choice, Record<Choice, string>>;

// Winning combinations: [winner, loser]
export const winningCombos: [Choice, Choice][] = [
  ["rock", "scissors"],
  ["rock", "lizard"],
  ["paper", "rock"],
  ["paper", "spock"],
  ["scissors", "paper"],
  ["scissors", "lizard"],
  ["lizard", "spock"],
  ["lizard", "paper"],
  ["spock", "scissors"],
  ["spock", "rock"],
];
