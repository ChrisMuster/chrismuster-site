// app/components/RPSLSTypes.ts  

// The immutable choices array  
export const choices = ["rock", "paper", "scissors", "lizard", "spock"] as const;

// Type for valid choices  
export type Choice = typeof choices[number];

// Define the outcomes as a type  
export type Outcomes = Record<Choice, Record<Choice, string>>;  