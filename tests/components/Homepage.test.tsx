import { render, screen } from "@testing-library/react";
import Homepage from "@/page-components/homepage/index";

// Mock child components
jest.mock("@/page-components/about/about", () => {
  return function MockAbout() {
    return <div data-testid="about-section">About Section</div>;
  };
});

jest.mock("@/page-components/code-challenges/code-challenges", () => {
  return function MockCodeChallenges() {
    return <div data-testid="code-challenges-section">Code Challenges Section</div>;
  };
});

jest.mock("@/page-components/projects/projects", () => {
  return function MockProjects() {
    return <div data-testid="projects-section">Projects Section</div>;
  };
});

jest.mock("@/page-components/websites/websites", () => {
  return function MockWebsites() {
    return <div data-testid="websites-section">Websites Section</div>;
  };
});

jest.mock("@/page-components/contact/contact", () => {
  return function MockContact() {
    return <div data-testid="contact-section">Contact Section</div>;
  };
});

jest.mock("@/components/ui/divider", () => {
  return function MockDivider() {
    return <hr data-testid="divider" />;
  };
});

describe("Homepage Component", () => {
  it("renders all major sections in order", () => {
    render(<Homepage />);
    
    expect(screen.getByTestId("about-section")).toBeInTheDocument();
    expect(screen.getByTestId("code-challenges-section")).toBeInTheDocument();
    expect(screen.getByTestId("projects-section")).toBeInTheDocument();
    expect(screen.getByTestId("websites-section")).toBeInTheDocument();
    expect(screen.getByTestId("contact-section")).toBeInTheDocument();
  });

  it("renders dividers between sections", () => {
    render(<Homepage />);
    
    const dividers = screen.getAllByTestId("divider");
    expect(dividers).toHaveLength(4); // 4 dividers between 5 sections
  });

  it("renders sections in correct order", () => {
    const { container } = render(<Homepage />);
    
    const sections = container.querySelectorAll("[data-testid]");
    const sectionIds = Array.from(sections)
      .filter(el => el.getAttribute("data-testid")?.includes("section"))
      .map(el => el.getAttribute("data-testid"));
    
    expect(sectionIds).toEqual([
      "about-section",
      "code-challenges-section",
      "projects-section",
      "websites-section",
      "contact-section",
    ]);
  });
});
