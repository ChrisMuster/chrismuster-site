import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CodeChallenges from "@/page-components/code-challenges/code-challenges";
import React from "react";

// Mock dynamic imports
jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: (importFn: () => Promise<unknown>, options?: { loading?: () => React.JSX.Element }) => {
    const mockComponents: { [key: string]: () => React.JSX.Element } = {
      RPSLSGame: () => <div data-testid="rpsls-game">RPSLS Game</div>,
      Battleship: () => <div data-testid="battleship-game">Battleship Game</div>,
    };
    
    // Return loading component if ssr is false
    if (options?.loading) {
      return options.loading;
    }
    
    // Determine which component based on the import path
    const importPath = importFn.toString();
    if (importPath.includes("RPSLSGame")) {
      return mockComponents.RPSLSGame;
    }
    if (importPath.includes("battleship")) {
      return mockComponents.Battleship;
    }
    
    return () => <div>Mock Component</div>;
  },
}));

describe("CodeChallenges Page Component", () => {
  it("renders code challenges section with id", () => {
    const { container } = render(<CodeChallenges />);
    
    const section = container.querySelector("section#code-challenges");
    expect(section).toBeInTheDocument();
  });

  it("renders three accordion tabs", () => {
    render(<CodeChallenges />);
    
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it("accordion tabs are closed by default", () => {
    render(<CodeChallenges />);
    
    const contents = screen.getAllByTestId("accordion-content");
    contents.forEach(content => {
      expect(content).toHaveClass("max-h-0");
    });
  });

  it("opens first game tab when clicked", async () => {
    const user = userEvent.setup();
    render(<CodeChallenges />);
    
    const buttons = screen.getAllByRole("button");
    await user.click(buttons[0]);
    
    const content = screen.getAllByTestId("accordion-content")[0];
    expect(content).toHaveClass("max-h-[fit]");
  });

  it("opens second game tab when clicked", async () => {
    const user = userEvent.setup();
    render(<CodeChallenges />);
    
    const buttons = screen.getAllByRole("button");
    await user.click(buttons[1]);
    
    const content = screen.getAllByTestId("accordion-content")[1];
    expect(content).toHaveClass("max-h-[fit]");
  });

  it("opens third game tab when clicked", async () => {
    const user = userEvent.setup();
    render(<CodeChallenges />);
    
    const buttons = screen.getAllByRole("button");
    await user.click(buttons[2]);
    
    const content = screen.getAllByTestId("accordion-content")[2];
    expect(content).toHaveClass("max-h-[fit]");
  });

  it("renders game content in tabs", async () => {
    const user = userEvent.setup();
    render(<CodeChallenges />);
    
    // Open a tab
    const buttons = screen.getAllByRole("button");
    await user.click(buttons[1]);
    
    const content = screen.getAllByTestId("accordion-content")[1];
    expect(content.children.length).toBeGreaterThan(0);
  });

  it("lazy loads RPSLS and Battleship games", () => {
    render(<CodeChallenges />);
    
    // Games shouldn't be loaded until tabs are opened
    expect(screen.queryByTestId("rpsls-game")).not.toBeInTheDocument();
    expect(screen.queryByTestId("battleship-game")).not.toBeInTheDocument();
  });
});
