import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Battleship from '@/components/battleship/battleship';

// Test ship data
const mockShips = [
  {
    name: "Destroyer",
    locations: ["00", "01"],
    hits: ["", ""],
    image: "/images/battleship/destroyer.png"
  }
];

// Mocks & Spies
const mockSetShips = jest.fn();
const mockSetShipsSunk = jest.fn();
const mockSetMessage = jest.fn();
const mockSetGuesses = jest.fn();
const mockFire = jest.fn();
const mockGenerateShipLocations = jest.fn();

// Mock hooks
jest.mock("@/components/battleship/useShips", () => ({
  useShips: () => ({
    ships: mockShips,
    setShips: mockSetShips,
    shipsSunk: { Destroyer: 0, Cruiser: 0, Battleship: 0 },
    setShipsSunk: mockSetShipsSunk,
    generateShipLocations: mockGenerateShipLocations,
  }),
}));

const mockUseGameState = jest.fn();

jest.mock("@/components/battleship/useGameState", () => ({
  useGameState: () => mockUseGameState(),
}));

describe('Battleship Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock state
    mockUseGameState.mockReturnValue({
      message: "Battleships!",
      setMessage: mockSetMessage,
      guesses: ["00"],
      setGuesses: mockSetGuesses,
      fire: mockFire,
    });

    // Ensure that our mock ship has a hit
    mockShips[0].hits = ["hit", ""];
  });

  it('renders without crashing and shows default message', () => {
    render(<Battleship />);
    expect(screen.getByText('Battleships!')).toBeInTheDocument();
  });

  it('renders board instructions', () => {
    render(<Battleship />);
    expect(screen.getByText(/2 hits for a Destroyer/i)).toBeInTheDocument();
    expect(screen.getByText(/Click on cells to/i)).toBeInTheDocument();
  });

  it("renders the full game board grid", () => {
    render(<Battleship />);
    const board = screen.getAllByText(/(HIT|MISS|^[A-H0-7]$)?/i);
    expect(board.length).toBeGreaterThanOrEqual(64 + 8 + 8); // playable + row/col labels
  });

  it("fires when the FIRE button is clicked", async () => {
    render(<Battleship />);
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("A0...");
    const fireButton = screen.getByRole('button', { name: 'FIRE!' });

    await user.type(input, "A1");
    await user.click(fireButton); // Click the button

    expect(mockFire).toHaveBeenCalledWith("01"); // A1 = row 0, col 1
    expect(mockSetGuesses).toHaveBeenCalled();
  });

  it("resets the game when the Reset button is clicked", async () => {
    render(<Battleship />);
    const user = userEvent.setup();
    const resetButton = screen.getByRole('button', { name: 'Reset Game' });

    await user.click(resetButton);
    
    expect(mockSetShips).toHaveBeenCalledWith([]); // resets ships
    expect(mockSetGuesses).toHaveBeenCalledWith([]); // resets guesses
    expect(mockSetShipsSunk).toHaveBeenCalledWith({
      Destroyer: 0,
      Cruiser: 0,
      Battleship: 0,
    }); // resets shipsSunk
    expect(mockSetMessage).toHaveBeenCalledWith("Battleships!");
    expect(mockGenerateShipLocations).toHaveBeenCalled();
  });

  it("validates incorrect input and shows error", async () => {
    render(<Battleship />);
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("A0...");
    const button = screen.getByRole("button", { name: "FIRE!" });

    await user.type(input, "Z9");
    await user.click(button);

    expect(mockSetMessage).toHaveBeenCalledWith(
      "Invalid guess. Enter a letter (A-H) and a number (0-7). "
    );
    expect(mockFire).not.toHaveBeenCalled();
  });

  it("detects a repeated guess and shows warning", async () => {
    mockUseGameState.mockReturnValueOnce({
      message: "Battleships!",
      setMessage: mockSetMessage,
      guesses: ["00"], // already guessed
      setGuesses: mockSetGuesses,
      fire: mockFire,
    });

    render(<Battleship />);
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("A0...");
    const fireButton = screen.getByRole("button", { name: "FIRE!" });

    await user.type(input, "A0");
    await user.click(fireButton);

    expect(mockSetMessage).toHaveBeenCalledWith("A0 - You already guessed this spot!");
    expect(mockFire).not.toHaveBeenCalled();
  });

  it("shows 'Game Over' message when all ships are sunk", async () => {
    mockUseGameState.mockReturnValueOnce({
      message: "You sank all ships in 5 guesses! Game Over!",
      setMessage: mockSetMessage,
      guesses: ["00", "01", "10", "11", "12"],
      setGuesses: mockSetGuesses,
      fire: mockFire,
    });

    render(<Battleship />);
    expect(
      screen.getByText("You sank all ships in 5 guesses! Game Over!")
    ).toBeInTheDocument();
  });

  it("displays 'HIT' when a ship cell is marked as hit", () => {
    render(<Battleship />);
    expect(screen.getByText("HIT")).toBeInTheDocument();
  });

  it("displays 'MISS' when a guessed cell is not a hit", () => {
    mockUseGameState.mockReturnValueOnce({
      message: "You missed.",
      setMessage: mockSetMessage,
      guesses: ["11"], // Not in ship locations
      setGuesses: mockSetGuesses,
      fire: mockFire,
    });

    render(<Battleship />);
    expect(screen.getByText("MISS")).toBeInTheDocument();
  });

  it("applies background image on hit cell", () => {
    render(<Battleship />);
    const hitCell = screen.getByText("HIT").closest("div");

    expect(hitCell).toHaveStyle(
      `background-image: url(${mockShips[0].image})`
    );
  });
});
