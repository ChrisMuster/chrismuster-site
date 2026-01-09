import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Projects from "@/page-components/projects/projects";

describe("Projects Page Component", () => {
  it("renders projects section with id", () => {
    const { container } = render(<Projects />);
    
    const section = container.querySelector("section#projects");
    expect(section).toBeInTheDocument();
  });

  it("renders gallery carousel component", () => {
    const { container } = render(<Projects />);
    
    const carousel = container.querySelector(".gallery-carousel");
    expect(carousel).toBeInTheDocument();
  });

  it("renders open modal button", () => {
    render(<Projects />);
    
    const button = screen.getByRole("button", { name: /Open Modal/i });
    expect(button).toBeInTheDocument();
  });

  it("renders modal link", () => {
    render(<Projects />);
    
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });

  it("opens modal when button is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<Projects />);
    
    const button = screen.getByRole("button", { name: /Open Modal/i });
    await user.click(button);
    
    // Check modal is visible by looking for modal container
    const modal = container.querySelector('[class*="modal"]');
    expect(modal).toBeInTheDocument();
  });

  it("opens modal when link is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<Projects />);
    
    const link = screen.getAllByRole("link")[0];
    await user.click(link);
    
    // Check modal is visible
    const modal = container.querySelector('[class*="modal"]');
    expect(modal).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<Projects />);
    
    // Open modal
    const button = screen.getByRole("button", { name: /Open Modal/i });
    await user.click(button);
    
    // Verify modal is open
    let modal = container.querySelector('[class*="modal"]');
    expect(modal).toBeInTheDocument();
    
    // Close modal
    const closeButton = screen.getByRole("button", { name: /×/ });
    await user.click(closeButton);
    
    // Modal should be hidden (not in DOM or hidden)
    modal = container.querySelector('[class*="modal"]');
    expect(modal).not.toBeInTheDocument();
  });

  it("modal is closed by default", () => {
    const { container } = render(<Projects />);
    
    // Modal content should not be visible initially
    const modalContent = container.querySelector('[class*="modal"]');
    expect(modalContent).not.toBeInTheDocument();
  });

  it("renders divider between sections", () => {
    const { container } = render(<Projects />);
    
    // Divider is a div element with specific height class
    const divider = container.querySelector('div[class*="h-1"]');
    expect(divider).toBeInTheDocument();
  });
});
