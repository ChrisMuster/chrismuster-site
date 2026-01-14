import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CoinFlipper from "@/components/coins/coinflipper";
import content from "@/app/data/content.json";

const { coinflipper } = content.code_challenges;

describe("CoinFlipper Component", () => {
  it("renders start button", () => {
    render(<CoinFlipper />);
    
    expect(screen.getByRole("button", { name: coinflipper.start_button })).toBeInTheDocument();
  });

  it("renders reset button", () => {
    render(<CoinFlipper />);
    
    expect(screen.getByRole("button", { name: coinflipper.reset_button })).toBeInTheDocument();
  });

  it("shows idle coin when not flipping", () => {
    render(<CoinFlipper />);
    
    const coins = screen.getAllByAltText(/Heads|Tails/i);
    // Idle coin shows 1 coin with 2 faces (heads and tails sides)
    expect(coins.length).toBe(2);
  });

  it("changes button text to 'Flipping...' when active", async () => {
    const user = userEvent.setup();
    render(<CoinFlipper />);
    
    const startButton = screen.getByRole("button", { name: coinflipper.start_button });
    await user.click(startButton);
    
    expect(screen.getByRole("button", { name: coinflipper.flipping_button })).toBeInTheDocument();
  });

  it("disables start button while flipping", async () => {
    const user = userEvent.setup();
    render(<CoinFlipper />);
    
    const startButton = screen.getByRole("button", { name: coinflipper.start_button });
    await user.click(startButton);
    
    const flippingButton = screen.getByRole("button", { name: coinflipper.flipping_button });
    expect(flippingButton).toBeDisabled();
  });

  it("shows 'Stop/Reset' button while flipping", async () => {
    const user = userEvent.setup();
    render(<CoinFlipper />);
    
    const startButton = screen.getByRole("button", { name: coinflipper.start_button });
    await user.click(startButton);
    
    expect(screen.getByRole("button", { name: coinflipper.stop_reset_button })).toBeInTheDocument();
  });

  it("stops flipping when Stop/Reset is clicked", async () => {
    const user = userEvent.setup();
    
    render(<CoinFlipper />);
    
    const startButton = screen.getByRole("button", { name: coinflipper.start_button });
    await user.click(startButton);
    
    await waitFor(() => {
      expect(screen.getByRole("button", { name: coinflipper.stop_reset_button })).toBeInTheDocument();
    });
    
    // Click Stop/Reset
    const stopButton = screen.getByRole("button", { name: coinflipper.stop_reset_button });
    await user.click(stopButton);
    
    // Should show start button again (flipping stopped)
    await waitFor(() => {
      const startBtn = screen.getByRole("button", { name: coinflipper.start_button });
      expect(startBtn).toBeInTheDocument();
      expect(startBtn).not.toBeDisabled();
    });
  });

  it("displays coins as they flip", async () => {
    const user = userEvent.setup();
    
    render(<CoinFlipper />);
    
    const startButton = screen.getByRole("button", { name: coinflipper.start_button });
    await user.click(startButton);
    
    // Wait a bit for flipping to start
    await waitFor(() => {
      const coins = screen.getAllByAltText(/Heads|Tails/i);
      // Should have more than just the idle coin
      expect(coins.length).toBeGreaterThan(2);
    }, { timeout: 3000 });
  });

  it("resets game state when reset is clicked", async () => {
    const user = userEvent.setup();
    
    render(<CoinFlipper />);
    
    const startButton = screen.getByRole("button", { name: coinflipper.start_button });
    await user.click(startButton);
    
    // Wait for some flips
    await waitFor(() => {
      const coins = screen.getAllByAltText(/Heads|Tails/i);
      expect(coins.length).toBeGreaterThan(2);
    }, { timeout: 3000 });
    
    // Click Stop/Reset to stop
    const stopButton = screen.getByRole("button", { name: coinflipper.stop_reset_button });
    await user.click(stopButton);
    
    // Should show idle coin again
    await waitFor(() => {
      const coins = screen.getAllByAltText(/Heads|Tails/i);
      // Back to idle coin (2 sides)
      expect(coins.length).toBe(2);
    });
  });

  it("reset button is always enabled", () => {
    render(<CoinFlipper />);
    
    const resetButton = screen.getByRole("button", { name: coinflipper.reset_button });
    expect(resetButton).not.toBeDisabled();
  });
});
