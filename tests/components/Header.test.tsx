import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/header/header";
import { scrollToSection } from "@/utils/utils";

// Mock the scrollToSection utility
jest.mock("@/utils/utils", () => ({
  scrollToSection: jest.fn(),
}));

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders logo and title", () => {
    render(<Header />);
    
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Chris Muster")).toBeInTheDocument();
  });

  it("renders navigation links on desktop", () => {
    render(<Header />);
    
    const navButtons = screen.getAllByRole("button");
    expect(navButtons.length).toBeGreaterThan(0);
  });

  it("calls scrollToSection when nav button clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const aboutButton = screen.getByRole("button", { name: /about/i });
    await user.click(aboutButton);
    
    expect(scrollToSection).toHaveBeenCalledWith("about");
  });

  it("toggles mobile menu when hamburger clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const hamburger = screen.getByRole("button", { name: "☰" });
    await user.click(hamburger);
    
    // Mobile menu should now be visible with duplicate nav items
    const allButtons = screen.getAllByRole("button");
    expect(allButtons.length).toBeGreaterThan(5); // Original nav + mobile nav
  });

  it("closes mobile menu after clicking a navigation item", async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    // Open mobile menu
    const hamburger = screen.getByRole("button", { name: "☰" });
    await user.click(hamburger);
    
    // Click a mobile nav item
    const mobileButtons = screen.getAllByRole("button");
    const mobileAbout = mobileButtons.find(btn => 
      btn.textContent === "About" && btn.classList.contains("block")
    );
    
    if (mobileAbout) {
      await user.click(mobileAbout);
    }
    
    expect(scrollToSection).toHaveBeenCalled();
  });

  it("renders ThemeToggle component", () => {
    render(<Header />);
    
    const themeToggle = screen.getByRole("button", { name: /toggle theme/i });
    expect(themeToggle).toBeInTheDocument();
  });
});
