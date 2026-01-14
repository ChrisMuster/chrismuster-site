import { render, screen } from "@testing-library/react";
import Hero from "@/components/hero/hero";

describe("Hero Component", () => {
  it("renders with default props", () => {
    render(
      <Hero imageAlt="Test Hero">
        <h1>Hero Title</h1>
      </Hero>
    );
    
    expect(screen.getByAltText("Test Hero")).toBeInTheDocument();
    expect(screen.getAllByText("Hero Title").length).toBeGreaterThan(0);
  });

  it("uses default placeholder image when no image provided", () => {
    render(
      <Hero imageAlt="Hero Image">
        <p>Content</p>
      </Hero>
    );
    
    const img = screen.getByAltText("Hero Image");
    expect(img).toHaveAttribute("src", "/images/placeholders/hero-placeholder.png");
  });

  it("renders custom image", () => {
    render(
      <Hero image="/images/custom-hero.jpg" imageAlt="Custom Hero">
        <p>Content</p>
      </Hero>
    );
    
    const img = screen.getByAltText("Custom Hero");
    expect(img).toHaveAttribute("src", "/images/custom-hero.jpg");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Hero imageAlt="Hero" className="custom-hero">
        <p>Content</p>
      </Hero>
    );
    
    expect(container.firstChild).toHaveClass("custom-hero");
  });

  it("renders children content on desktop and mobile", () => {
    render(
      <Hero imageAlt="Hero">
        <h1>Desktop and Mobile Title</h1>
        <p>Description text</p>
      </Hero>
    );
    
    // Content should appear twice (desktop overlay + mobile below)
    const titles = screen.getAllByText("Desktop and Mobile Title");
    expect(titles.length).toBe(2);
  });

  it("applies overlay alignment classes", () => {
    const { container: left } = render(
      <Hero imageAlt="Hero" overlayAlignment="left">
        <p>Left aligned</p>
      </Hero>
    );
    expect(left.querySelector(".justify-start")).toBeInTheDocument();

    const { container: center } = render(
      <Hero imageAlt="Hero" overlayAlignment="center">
        <p>Center aligned</p>
      </Hero>
    );
    expect(center.querySelector(".justify-center")).toBeInTheDocument();

    const { container: right } = render(
      <Hero imageAlt="Hero" overlayAlignment="right">
        <p>Right aligned</p>
      </Hero>
    );
    expect(right.querySelector(".justify-end")).toBeInTheDocument();
  });

  it("applies text alignment classes", () => {
    const { container: left } = render(
      <Hero imageAlt="Hero" textAlignment="left">
        <p>Left text</p>
      </Hero>
    );
    expect(left.querySelector(".text-left")).toBeInTheDocument();

    const { container: center } = render(
      <Hero imageAlt="Hero" textAlignment="center">
        <p>Center text</p>
      </Hero>
    );
    expect(center.querySelector(".text-center")).toBeInTheDocument();

    const { container: right } = render(
      <Hero imageAlt="Hero" textAlignment="right">
        <p>Right text</p>
      </Hero>
    );
    expect(right.querySelector(".text-right")).toBeInTheDocument();
  });
});
