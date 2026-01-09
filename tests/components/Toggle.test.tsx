import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toggle, { ThemeToggleButton } from "@/components/toggle/toggle";
import React from "react";

// Mock Lucide icons for testing
const MockIconOn = React.forwardRef<SVGSVGElement>((props, ref) => (
  <svg ref={ref} {...props}><title>ON</title></svg>
));
MockIconOn.displayName = "MockIconOn";

const MockIconOff = React.forwardRef<SVGSVGElement>((props, ref) => (
  <svg ref={ref} {...props}><title>OFF</title></svg>
));
MockIconOff.displayName = "MockIconOff";

describe("Toggle Component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default icons", () => {
    render(<Toggle checked={false} onChange={mockOnChange} />);
    
    expect(screen.getByRole("button", { name: /Toggle Theme/i })).toBeInTheDocument();
  });

  it("calls onChange when clicked", async () => {
    const user = userEvent.setup();
    render(<Toggle checked={false} onChange={mockOnChange} />);
    
    const button = screen.getByRole("button");
    await user.click(button);
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("calls onChange when checkbox is clicked", async () => {
    const user = userEvent.setup();
    render(<Toggle checked={false} onChange={mockOnChange} />);
    
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("displays checked state correctly", () => {
    const { rerender } = render(<Toggle checked={false} onChange={mockOnChange} />);
    
    let checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    
    rerender(<Toggle checked={true} onChange={mockOnChange} />);
    
    checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("applies correct background color based on state", () => {
    const { container, rerender } = render(
      <Toggle checked={false} onChange={mockOnChange} />
    );
    
    let background = container.querySelector(".bg-\\[var\\(--color-blue\\)\\]");
    expect(background).toBeInTheDocument();
    
    rerender(<Toggle checked={true} onChange={mockOnChange} />);
    
    background = container.querySelector(".bg-\\[var\\(--color-gold\\)\\]");
    expect(background).toBeInTheDocument();
  });

  it("renders custom icons", () => {
    render(
      <Toggle 
        checked={false} 
        onChange={mockOnChange} 
        iconOn={MockIconOn} 
        iconOff={MockIconOff} 
      />
    );
    
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByTitle("OFF")).toBeInTheDocument();
  });
});

describe("ThemeToggleButton Component", () => {
  const mockOnChange = jest.fn();

  it("renders with default Sun and Moon icons", () => {
    render(<ThemeToggleButton checked={false} onChange={mockOnChange} />);
    
    expect(screen.getByRole("button", { name: /Toggle Theme/i })).toBeInTheDocument();
  });

  it("forwards props to Toggle component", async () => {
    const user = userEvent.setup();
    render(<ThemeToggleButton checked={false} onChange={mockOnChange} />);
    
    const button = screen.getByRole("button");
    await user.click(button);
    
    expect(mockOnChange).toHaveBeenCalled();
  });
});
