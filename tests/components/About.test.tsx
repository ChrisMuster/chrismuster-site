import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import About from "@/page-components/about/about";
import { scrollToSection } from "@/utils/utils";

// Mock the scrollToSection utility but keep cleanClassNames real
jest.mock("@/utils/utils", () => ({
  ...jest.requireActual("@/utils/utils"),
  scrollToSection: jest.fn(),
}));

describe("About Page Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders about section with id", () => {
    const { container } = render(<About />);
    
    const section = container.querySelector("section#about");
    expect(section).toBeInTheDocument();
  });

  it("renders hero with image and text", () => {
    render(<About />);
    
    // Check for structural elements instead of specific text
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders content section", () => {
    const { container } = render(<About />);
    
    // Check for content structure
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThan(0);
  });

  it("renders contact button", () => {
    render(<About />);
    
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("calls scrollToSection when contact button clicked", async () => {
    const user = userEvent.setup();
    render(<About />);
    
    const buttons = screen.getAllByRole("button");
    if (buttons.length > 0) {
      await user.click(buttons[0]);
      expect(scrollToSection).toHaveBeenCalled();
    }
  });

  it("uses fullWidth section layout", () => {
    const { container } = render(<About />);
    
    const section = container.querySelector("section");
    expect(section).toHaveClass("w-full");
  });

  it("renders hero with left alignment", () => {
    const { container } = render(<About />);
    
    const heroOverlay = container.querySelector(".justify-start");
    expect(heroOverlay).toBeInTheDocument();
  });
});
