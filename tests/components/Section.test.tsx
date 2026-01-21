import { render, screen } from "@testing-library/react";
import Section from "@/components/section/section";

describe("Section Component", () => {
  it("renders children", () => {
    render(
      <Section>
        <p>Section Content</p>
      </Section>
    );
    
    expect(screen.getByText("Section Content")).toBeInTheDocument();
  });

  it("applies id attribute", () => {
    const { container } = render(
      <Section id="about-section">
        <p>Content</p>
      </Section>
    );
    
    const section = container.querySelector("section#about-section");
    expect(section).toBeInTheDocument();
  });

  it("applies constrained width by default", () => {
    const { container } = render(
      <Section>
        <p>Content</p>
      </Section>
    );
    
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("p-6");
    expect(section.className).toContain("md:p-12");
  });

  it("applies fullWidth class when fullWidth is true", () => {
    const { container } = render(
      <Section fullWidth>
        <p>Content</p>
      </Section>
    );
    
    const section = container.firstChild as HTMLElement;
    expect(section).toHaveClass("w-full");
    expect(section.className).not.toContain("p-6");
  });

  it("applies default spacing of none", () => {
    const { container } = render(
      <Section>
        <p>Content</p>
      </Section>
    );
    
    expect(container.firstChild).toHaveClass("mb-0");
  });

  it("applies spacing options correctly", () => {
    const { container: xxsmall } = render(<Section spacing="xxsmall"><p>1</p></Section>);
    expect(xxsmall.firstChild).toHaveClass("mb-4");

    const { container: xsmall } = render(<Section spacing="xsmall"><p>2</p></Section>);
    expect(xsmall.firstChild).toHaveClass("mb-6");

    const { container: small } = render(<Section spacing="small"><p>3</p></Section>);
    expect(small.firstChild).toHaveClass("mb-8");

    const { container: medium } = render(<Section spacing="medium"><p>4</p></Section>);
    expect(medium.firstChild).toHaveClass("mb-12");

    const { container: large } = render(<Section spacing="large"><p>5</p></Section>);
    expect(large.firstChild).toHaveClass("mb-16");

    const { container: xlarge } = render(<Section spacing="xlarge"><p>6</p></Section>);
    expect(xlarge.firstChild).toHaveClass("mb-24");

    const { container: xxlarge } = render(<Section spacing="xxlarge"><p>7</p></Section>);
    expect(xxlarge.firstChild).toHaveClass("mb-32");
  });

  it("applies background color when provided", () => {
    const { container } = render(
      <Section bgColor="bg-blue-500">
        <p>Content</p>
      </Section>
    );
    
    expect(container.firstChild).toHaveClass("bg-blue-500");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Section className="custom-section">
        <p>Content</p>
      </Section>
    );
    
    expect(container.firstChild).toHaveClass("custom-section");
  });

  it("combines multiple props correctly", () => {
    const { container } = render(
      <Section 
        id="test" 
        fullWidth 
        spacing="large" 
        bgColor="bg-gray-100" 
        className="custom"
      >
        <p>Content</p>
      </Section>
    );
    
    const section = container.firstChild as HTMLElement;
    expect(section).toHaveAttribute("id", "test");
    expect(section).toHaveClass("w-full");
    expect(section).toHaveClass("mb-16");
    expect(section).toHaveClass("bg-gray-100");
    expect(section).toHaveClass("custom");
  });

  it("applies default minHeight of auto", () => {
    const { container } = render(
      <Section>
        <p>Content</p>
      </Section>
    );
    
    const section = container.firstChild as HTMLElement;
    expect(section.className).not.toContain("min-h-screen");
  });

  it("applies min-h-screen when minHeight is screen", () => {
    const { container } = render(
      <Section minHeight="screen">
        <p>Content</p>
      </Section>
    );
    
    const section = container.firstChild as HTMLElement;
    expect(section).toHaveClass("min-h-screen");
  });

  it("does not apply min-h-screen when minHeight is auto", () => {
    const { container } = render(
      <Section minHeight="auto">
        <p>Content</p>
      </Section>
    );
    
    const section = container.firstChild as HTMLElement;
    expect(section.className).not.toContain("min-h-screen");
  });
});
