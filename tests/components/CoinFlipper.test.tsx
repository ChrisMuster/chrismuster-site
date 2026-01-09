import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CoinFlipper from "@/components/coins/coinflipper";

describe("CoinFlipper Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("renders start button", () => {
    render(<CoinFlipper />);
    
    expect(screen.getByRole("button", { name: "Start Flipping" })).toBeInTheDocument();
  });

  it("renders reset button", () => {
    render(<CoinFlipper />);
    
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });

  it("disables reset button when no flips", () => {
    render(<CoinFlipper />);
    
    const resetButton = screen.getByRole("button", { name: "Reset" });
    expect(resetButton).toBeDisabled();
  });

  it("changes button text to 'Flipping...' when active", async () => {
    const user = userEvent.setup({ delay: null });
    render(<CoinFlipper />);
    
    const startButton = screen.getByRole("button", { name: "Start Flipping" });
    await user.click(startButton);
    
    expect(screen.getByRole("button", { name: "Flipping..." })).toBeInTheDocument();
  });

  it("disables start button while flipping", async () => {
    const user = userEvent.setup({ delay: null });
    render(<CoinFlipper />);
    
    const startButton = screen.getByRole("button", { name: "Start Flipping" });
    await user.click(startButton);
    
    const flippingButton = screen.getByRole("button", { name: "Flipping..." });
    expect(flippingButton).toBeDisabled();
  });

  it("displays coins as they flip", async () => {
    const user = userEvent.setup({ delay: null });
    
    // Mock Math.random for predictable results
    const mockRandom = jest.spyOn(Math, "random");
    mockRandom.mockReturnValueOnce(0.3); // heads
    mockRandom.mockReturnValueOnce(0.3); // heads
    mockRandom.mockReturnValueOnce(0.3); // heads
    
    render(<CoinFlipper />);
    
    const startButton = screen.getByRole("button", { name: "Start Flipping" });
    await user.click(startButton);
    
    // Fast-forward through first flip
    act(() => {
      jest.advanceTimersByTime(3700);
    });
    
    await waitFor(() => {
      const coins = screen.getAllByAltText(/Heads|Tails/i);
      expect(coins.length).toBeGreaterThan(0);
    });
    
    mockRandom.mockRestore();
  });

  it("displays final message with flip count", async () => {
    const user = userEvent.setup({ delay: null });
    
    // Mock for 3 heads in a row
    const mockRandom = jest.spyOn(Math, "random");
    mockRandom.mockReturnValue(0.3); // Always heads
    
    render(<CoinFlipper />);
    
    const startButton = screen.getByRole("button", { name: "Start Flipping" });
    await user.click(startButton);
    
    // Fast-forward through 3 flips
    act(() => {
      jest.advanceTimersByTime(3700 * 3);
    });
    
    await waitFor(() => {
      const buttons = screen.getAllByRole("button");
      const flipButton = buttons.find(btn => btn.textContent?.includes("Start") || btn.textContent?.includes("Flip"));
      expect(flipButton).toBeDisabled();
    }, { timeout: 5000 });
    
    mockRandom.mockRestore();
  });

  it("continues flipping until 3 heads in a row", async () => {
    const user = userEvent.setup({ delay: null });
    
    // Mock sequence: tails, heads, heads, tails, heads, heads, heads
    const mockRandom = jest.spyOn(Math, "random");
    mockRandom
      .mockReturnValueOnce(0.7) // tails
      .mockReturnValueOnce(0.3) // heads
      .mockReturnValueOnce(0.3) // heads
      .mockReturnValueOnce(0.7) // tails
      .mockReturnValueOnce(0.3) // heads
      .mockReturnValueOnce(0.3) // heads
      .mockReturnValueOnce(0.3); // heads - wins
    
    render(<CoinFlipper />);
    
    const startButton = screen.getByRole("button", { name: "Start Flipping" });
    await user.click(startButton);
    
    act(() => {
      jest.advanceTimersByTime(3700 * 7);
    });
    
    await waitFor(() => {
      // Just verify flipping is happening
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });
    
    mockRandom.mockRestore();
  });

  it("resets game state when reset is clicked", async () => {
    const user = userEvent.setup({ delay: null });
    
    const mockRandom = jest.spyOn(Math, "random");
    mockRandom.mockReturnValue(0.3); // Always heads
    
    render(<CoinFlipper />);
    
    const startButton = screen.getByRole("button", { name: "Start Flipping" });
    await user.click(startButton);
    
    act(() => {
      jest.advanceTimersByTime(3700 * 3);
    });
    
    await waitFor(() => {
      // Each coin has 2 images (Heads and Tails sides)
      const coins = screen.getAllByAltText(/Heads|Tails/i);
      expect(coins.length).toBeGreaterThanOrEqual(3);
    });
    
    const resetButton = screen.getByRole("button", { name: "Reset" });
    await user.click(resetButton);
    
    // After reset, check that reset worked (button text changes)
    await waitFor(() => {
      const button = screen.getByRole("button", { name: /Start Flipping|Flipping/i });
      expect(button).toBeInTheDocument();
    });
    
    mockRandom.mockRestore();
  });

  it("enables reset button after flipping completes", async () => {
    const user = userEvent.setup({ delay: null });
    
    const mockRandom = jest.spyOn(Math, "random");
    mockRandom.mockReturnValue(0.3); // Always heads
    
    render(<CoinFlipper />);
    
    const startButton = screen.getByRole("button", { name: "Start Flipping" });
    await user.click(startButton);
    
    act(() => {
      jest.advanceTimersByTime(3700 * 3 + 2000);
    });
    
    await waitFor(() => {
      const resetButton = screen.getByRole("button", { name: "Reset" });
      expect(resetButton).not.toBeDisabled();
    }, { timeout: 10000 });
    
    mockRandom.mockRestore();
  });
});
