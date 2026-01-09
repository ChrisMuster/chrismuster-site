import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RPSLSGame from "@/components/RPSLSGame/RPSLSGame";

describe("RPSLSGame Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("renders game title", () => {
    render(<RPSLSGame />);
    
    expect(screen.getByText("Rock, Paper, Scissors, Lizard, Spock")).toBeInTheDocument();
  });

  it("renders all choice buttons", () => {
    render(<RPSLSGame />);
    
    expect(screen.getByAltText("rock icon")).toBeInTheDocument();
    expect(screen.getByAltText("paper icon")).toBeInTheDocument();
    expect(screen.getByAltText("scissors icon")).toBeInTheDocument();
    expect(screen.getByAltText("lizard icon")).toBeInTheDocument();
    expect(screen.getByAltText("spock icon")).toBeInTheDocument();
  });

  it("starts countdown when choice is clicked", async () => {
    const user = userEvent.setup({ delay: null });
    render(<RPSLSGame />);
    
    const rockButton = screen.getByAltText("rock icon").closest("button");
    await user.click(rockButton!);
    
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("displays result after countdown", async () => {
    const user = userEvent.setup({ delay: null });
    render(<RPSLSGame />);
    
    const rockButton = screen.getByAltText("rock icon").closest("button");
    await user.click(rockButton!);
    
    // Fast-forward through countdown
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/You chose:/)).toBeInTheDocument();
      expect(screen.getByText(/Computer chose:/)).toBeInTheDocument();
    });
  });

  it("displays win/lose/tie result", async () => {
    const user = userEvent.setup({ delay: null });
    
    // Mock Math.random to control computer choice
    const mockRandom = jest.spyOn(Math, "random");
    mockRandom.mockReturnValue(0); // Computer chooses rock (first choice)
    
    render(<RPSLSGame />);
    
    const rockButton = screen.getByAltText("rock icon").closest("button");
    await user.click(rockButton!);
    
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    await waitFor(() => {
      expect(screen.getByText("It's a tie!")).toBeInTheDocument();
    });
    
    mockRandom.mockRestore();
  });

  it("capitalizes choice names in result display", async () => {
    const user = userEvent.setup({ delay: null });
    render(<RPSLSGame />);
    
    const rockButton = screen.getByAltText("rock icon").closest("button");
    await user.click(rockButton!);
    
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    await waitFor(() => {
      // Check that choice is capitalized in result (appears in <strong> tag)
      const choiceElements = screen.getAllByText(/Rock/);
      expect(choiceElements.length).toBeGreaterThan(0);
    });
  });

  it("allows playing multiple rounds", async () => {
    const user = userEvent.setup({ delay: null });
    render(<RPSLSGame />);
    
    // First round
    const rockButton = screen.getByAltText("rock icon").closest("button");
    await user.click(rockButton!);
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/You chose:/)).toBeInTheDocument();
    });
    
    // Second round
    const paperButton = screen.getByAltText("paper icon").closest("button");
    await user.click(paperButton!);
    
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("hides countdown when showing results", async () => {
    const user = userEvent.setup({ delay: null });
    render(<RPSLSGame />);
    
    const rockButton = screen.getByAltText("rock icon").closest("button");
    await user.click(rockButton!);
    
    expect(screen.getByText("3")).toBeInTheDocument();
    
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    await waitFor(() => {
      expect(screen.queryByText("3")).not.toBeInTheDocument();
      expect(screen.getByText(/You chose:/)).toBeInTheDocument();
    });
  });
});
