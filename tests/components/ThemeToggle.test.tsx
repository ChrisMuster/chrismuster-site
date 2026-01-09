import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "@/components/theme-toggle/theme-toggle";

describe("ThemeToggle Component", () => {
  let mockLocalStorage: { [key: string]: string } = {};

  beforeEach(() => {
    // Mock localStorage
    mockLocalStorage = {};
    
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn((key: string) => mockLocalStorage[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          mockLocalStorage[key] = value;
        }),
        removeItem: jest.fn((key: string) => {
          delete mockLocalStorage[key];
        }),
        clear: jest.fn(() => {
          mockLocalStorage = {};
        }),
      },
      writable: true,
    });

    // Clear document classes
    document.documentElement.classList.remove("dark");
  });

  it("renders theme toggle button", () => {
    render(<ThemeToggle />);
    
    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
  });

  it("starts with light theme by default", () => {
    render(<ThemeToggle />);
    
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("loads dark theme from localStorage", async () => {
    mockLocalStorage["theme"] = "dark";
    
    render(<ThemeToggle />);
    
    await waitFor(() => {
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeChecked();
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
  });

  it("toggles theme when clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    
    const button = screen.getByRole("button");
    await user.click(button);
    
    await waitFor(() => {
      expect(mockLocalStorage["theme"]).toBe("dark");
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
    
    // Toggle back to light
    await user.click(button);
    
    await waitFor(() => {
      expect(mockLocalStorage["theme"]).toBe("light");
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });
  });

  it("persists theme choice to localStorage", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    
    const button = screen.getByRole("button");
    await user.click(button);
    
    await waitFor(() => {
      expect(window.localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
    });
  });

  it("applies dark class to document element", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    
    const button = screen.getByRole("button");
    await user.click(button);
    
    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
  });
});
