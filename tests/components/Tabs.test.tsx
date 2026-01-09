import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tabs from "@/components/tabs/tabs";

describe("Tabs Component", () => {
  const mockTabs = [
    { id: "tab1", label: "First Tab" },
    { id: "tab2", label: "Second Tab" },
    { id: "tab3", label: "Third Tab" },
  ];

  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all tabs", () => {
    render(
      <Tabs 
        tabs={mockTabs} 
        activeTab="tab1" 
        onTabChange={mockOnTabChange} 
      />
    );
    
    expect(screen.getByText("First Tab")).toBeInTheDocument();
    expect(screen.getByText("Second Tab")).toBeInTheDocument();
    expect(screen.getByText("Third Tab")).toBeInTheDocument();
  });

  it("highlights the active tab", () => {
    render(
      <Tabs 
        tabs={mockTabs} 
        activeTab="tab2" 
        onTabChange={mockOnTabChange} 
      />
    );
    
    const secondTab = screen.getByText("Second Tab");
    expect(secondTab).toHaveClass("bg-[var(--background)]");
    expect(secondTab).toHaveClass("border-b-[var(--background)]");
  });

  it("calls onTabChange when tab is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Tabs 
        tabs={mockTabs} 
        activeTab="tab1" 
        onTabChange={mockOnTabChange} 
      />
    );
    
    const secondTab = screen.getByText("Second Tab");
    await user.click(secondTab);
    
    expect(mockOnTabChange).toHaveBeenCalledWith("tab2");
  });

  it("does not call onTabChange when active tab is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Tabs 
        tabs={mockTabs} 
        activeTab="tab1" 
        onTabChange={mockOnTabChange} 
      />
    );
    
    const firstTab = screen.getByText("First Tab");
    await user.click(firstTab);
    
    // Handler should still be called even for active tab
    expect(mockOnTabChange).toHaveBeenCalledWith("tab1");
  });

  it("renders single tab correctly", () => {
    render(
      <Tabs 
        tabs={[{ id: "single", label: "Only Tab" }]} 
        activeTab="single" 
        onTabChange={mockOnTabChange} 
      />
    );
    
    expect(screen.getByText("Only Tab")).toBeInTheDocument();
  });
});
