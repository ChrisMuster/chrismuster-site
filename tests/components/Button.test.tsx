import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/components/ui/button";
import { Check } from "lucide-react";

describe("Button Component", () => {
  it("renders with text", () => {
    render(<Button onClick={() => { }}>Click Me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click Me</Button>);
    await user.click(screen.getByRole("button", { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick} disabled>Click Me</Button>);
    await user.click(screen.getByRole("button", { name: /click me/i }));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies correct class for primary variant", () => {
    render(<Button onClick={() => { }} variant="primary">Primary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-[var(--color-blue)]");
  });

  it("applies correct class for secondary variant", () => {
    render(<Button onClick={() => { }} variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-gray-700");
  });

  it("applies correct class for success variant", () => {
    render(<Button onClick={() => { }} variant="success">Success</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-green-700");
  });

  it("applies correct class for size", () => {
    render(<Button onClick={() => { }} size="large">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("text-lg");
  });

  it("applies additional className", () => {
    render(<Button onClick={() => { }} className="custom-class">Custom</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("renders Lucide icon as children", () => {
    render(<Button onClick={() => { }}><Check aria-label="check-icon" /></Button>);
    expect(screen.getByLabelText("check-icon")).toBeInTheDocument();
  });
});
