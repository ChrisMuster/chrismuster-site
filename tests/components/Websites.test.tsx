import { render, screen } from "@testing-library/react";
import Websites from "@/page-components/websites/websites";

describe("Websites Page Component", () => {
  it("renders websites section with id", () => {
    const { container } = render(<Websites />);
    
    const section = container.querySelector("section#websites");
    expect(section).toBeInTheDocument();
  });

  it("renders three website cards", () => {
    render(<Websites />);
    
    // Based on content.json, should have cards for Portfolio, Muster Financial, Wildberries
    const cards = screen.getAllByRole("link");
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });

  it("renders cards in a grid layout", () => {
    const { container } = render(<Websites />);
    
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
  });

  it("applies responsive grid columns", () => {
    const { container } = render(<Websites />);
    
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).toHaveClass("md:grid-cols-2");
    expect(grid).toHaveClass("xl:grid-cols-3");
  });

  it("renders cards with images", () => {
    render(<Websites />);
    
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThanOrEqual(3);
  });

  it("renders cards with links", () => {
    render(<Websites />);
    
    const links = screen.getAllByRole("link");
    links.forEach(link => {
      expect(link).toHaveAttribute("href");
    });
  });

  it("applies light shadow to cards", () => {
    const { container } = render(<Websites />);
    
    const cards = container.querySelectorAll(".shadow-light");
    expect(cards.length).toBe(3);
  });
});
