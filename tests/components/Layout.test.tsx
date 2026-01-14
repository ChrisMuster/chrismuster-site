import { render, screen } from "@testing-library/react";
import Layout from "@/components/layout/layout";

// Mock the child components
jest.mock("@/components/header/header", () => {
  return function MockHeader() {
    return <header data-testid="mock-header">Header</header>;
  };
});

jest.mock("@/components/footer/footer", () => {
  return function MockFooter() {
    return <footer data-testid="mock-footer">Footer</footer>;
  };
});

jest.mock("@/components/top-button/BackToTop", () => {
  return function MockBackToTop() {
    return <div data-testid="mock-back-to-top">Back to Top</div>;
  };
});

describe("Layout Component", () => {
  it("renders all layout components", () => {
    render(
      <Layout>
        <p>Main Content</p>
      </Layout>
    );
    
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
    expect(screen.getByTestId("mock-back-to-top")).toBeInTheDocument();
  });

  it("renders children in main element", () => {
    const { container } = render(
      <Layout>
        <p>Page Content</p>
      </Layout>
    );
    
    const mainElement = container.querySelector("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass("flex-grow");
  });

  it("applies top padding to main content", () => {
    const { container } = render(
      <Layout>
        <p>Content</p>
      </Layout>
    );
    
    const mainElement = container.querySelector("main");
    expect(mainElement).toHaveClass("pt-20");
  });

  it("has flex column layout structure", () => {
    const { container } = render(
      <Layout>
        <p>Content</p>
      </Layout>
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("flex");
    expect(wrapper).toHaveClass("flex-col");
    expect(wrapper).toHaveClass("min-h-screen");
  });

  it("renders multiple children", () => {
    render(
      <Layout>
        <h1>Title</h1>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </Layout>
    );
    
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
    expect(screen.getByText("Paragraph 2")).toBeInTheDocument();
  });
});
