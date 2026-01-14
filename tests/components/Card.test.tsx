import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "@/components/card/card";

describe("Card Component", () => {
  const defaultProps = {
    title: "Test Title",
    text: "This is a test card description.",
    buttonText: "Learn More",
  };

  it("renders title, text, and button", () => {
    render(<Card {...defaultProps} />);

    // Checks that required fields appear
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("This is a test card description.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Learn More" })).toBeInTheDocument();

    // Checks the default image alt
    expect(screen.getByAltText("Card image")).toBeInTheDocument();
  });

  it("renders optional subtitle", () => {
    render(<Card {...defaultProps} subtitle="Optional Subtitle" />);

    // Checks the subtitle is rendered
    expect(screen.getByText("Optional Subtitle")).toBeInTheDocument();
  });

  it("uses default image if none provided", () => {
    render(
      <Card
        title="Card"
        text="Content"
        buttonText="Button"
      />
    );

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/images/placeholders/placeholder-428x220.png");
    expect(img).toHaveAttribute("alt", "Card image");
  });

  it("applies custom shadow classes", () => {
    const { container: light } = render(<Card {...defaultProps} shadow="light" />);
    expect(light.firstChild).toHaveClass("shadow-light");

    const { container: dark } = render(<Card {...defaultProps} shadow="dark" />);
    expect(dark.firstChild).toHaveClass("shadow-dark");
  });

  it("applies additional custom className", () => {
    const { container } = render(<Card {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("calls onClick handler instead of navigating", async () => {
    const handleClick = jest.fn();
    render(
      <Card
        title="Clickable Card"
        text="With button"
        buttonText="Open"
        onClick={handleClick}
        buttonLink="https://example.com"
      />
    );

    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: "Open" });
    await user.click(button);

    expect(handleClick).toHaveBeenCalled();
  });

  it("renders custom image and alt text if provided", () => {
    render(
      <Card
        title="Card"
        text="Content"
        buttonText="Go"
        imageSrc="/images/custom.png"
        imageAlt="Custom Alt"
      />
    );

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/images/custom.png");
    expect(img).toHaveAttribute("alt", "Custom Alt");
  });
});
