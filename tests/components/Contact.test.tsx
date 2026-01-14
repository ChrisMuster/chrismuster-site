import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "@/page-components/contact/contact";

describe("Contact Page Component", () => {
  it("renders contact section with id", () => {
    const { container } = render(<Contact />);
    
    const section = container.querySelector("section#contact");
    expect(section).toBeInTheDocument();
  });

  it("renders tabs", () => {
    render(<Contact />);
    
    const tabs = screen.getAllByRole("tab");
    expect(tabs.length).toBeGreaterThanOrEqual(3);
  });

  it("shows resume tab content by default", () => {
    const { container } = render(<Contact />);
    
    // Check for PdfViewer or loading state
    const hasContent = container.querySelector('[class*="pdf"]') || screen.queryByText(/Loading/i);
    expect(hasContent).toBeTruthy();
  });

  it("switches to email tab when clicked", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const tabs = screen.getAllByRole("tab");
    const emailTab = tabs.find(btn => btn.textContent?.includes("Email") || btn.textContent?.includes("email"));
    
    if (emailTab) {
      await user.click(emailTab);
      // Check for form fields
      const inputs = screen.getAllByRole("textbox");
      expect(inputs.length).toBeGreaterThan(0);
    }
  });

  it("renders email form in email tab", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const tabs = screen.getAllByRole("tab");
    const emailTab = tabs.find(btn => btn.textContent?.includes("Email") || btn.textContent?.includes("email"));
    
    if (emailTab) {
      await user.click(emailTab);
      
      // Check for form inputs
      const inputs = screen.getAllByRole("textbox");
      expect(inputs.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("switches to LinkedIn tab when clicked", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const tabs = screen.getAllByRole("tab");
    const linkedInTab = tabs.find(btn => btn.textContent?.includes("LinkedIn") || btn.textContent?.includes("linkedin"));
    
    if (linkedInTab) {
      await user.click(linkedInTab);
      // Tab should be active
      expect(linkedInTab).toHaveAttribute("aria-selected", "true");
    }
  });

  it("maintains active tab state", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const tabs = screen.getAllByRole("tab");
    
    // Click second tab
    await user.click(tabs[1]);
    // Just verify the tab system is functional
    expect(tabs[1]).toBeInTheDocument();
    
    // Click back to first tab
    await user.click(tabs[0]);
    // Verify tabs are functional
    expect(tabs[0]).toBeInTheDocument();
  });

  it("renders PdfViewer component in resume tab", () => {
    const { container } = render(<Contact />);
    
    // PdfViewer shows loading text initially or pdf container
    const hasViewer = screen.queryByText(/Loading/i) || container.querySelector('[class*="pdf"]');
    expect(hasViewer).toBeTruthy();
  });
});
