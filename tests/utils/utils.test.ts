import { capitalize, scrollToSection, cleanClassNames } from "@/utils/utils";

describe("Utility Functions", () => {
  describe("capitalize", () => {
    it("capitalizes first letter of word", () => {
      expect(capitalize("hello")).toBe("Hello");
      expect(capitalize("world")).toBe("World");
    });

    it("handles single letter", () => {
      expect(capitalize("a")).toBe("A");
    });

    it("preserves rest of the word", () => {
      expect(capitalize("hELLO")).toBe("HELLO");
      expect(capitalize("JavaScript")).toBe("JavaScript");
    });

    it("handles empty string", () => {
      expect(capitalize("")).toBe("");
    });

    it("handles already capitalized word", () => {
      expect(capitalize("Hello")).toBe("Hello");
    });
  });

  describe("scrollToSection", () => {
    let mockScrollIntoView: jest.Mock;

    beforeEach(() => {
      mockScrollIntoView = jest.fn();
      
      // Mock getElementById
      document.getElementById = jest.fn((id: string) => {
        if (id === "existing-section") {
          return {
            scrollIntoView: mockScrollIntoView,
          } as unknown as HTMLElement;
        }
        return null;
      });
    });

    it("scrolls to element with given id", () => {
      scrollToSection("existing-section");
      
      expect(document.getElementById).toHaveBeenCalledWith("existing-section");
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    });

    it("does nothing if element not found", () => {
      scrollToSection("non-existent");
      
      expect(document.getElementById).toHaveBeenCalledWith("non-existent");
      expect(mockScrollIntoView).not.toHaveBeenCalled();
    });

    it("uses smooth scrolling behavior", () => {
      scrollToSection("existing-section");
      
      expect(mockScrollIntoView).toHaveBeenCalledWith(
        expect.objectContaining({ behavior: "smooth" })
      );
    });
  });

  describe("cleanClassNames", () => {
    it("joins valid class names with spaces", () => {
      expect(cleanClassNames("class1", "class2", "class3")).toBe("class1 class2 class3");
    });

    it("filters out undefined values", () => {
      expect(cleanClassNames("class1", undefined, "class2")).toBe("class1 class2");
    });

    it("filters out null values", () => {
      expect(cleanClassNames("class1", null, "class2")).toBe("class1 class2");
    });

    it("filters out false boolean values", () => {
      expect(cleanClassNames("class1", false, "class2")).toBe("class1 class2");
    });

    it("filters out empty strings", () => {
      expect(cleanClassNames("class1", "", "class2")).toBe("class1 class2");
    });

    it("handles all falsy values", () => {
      expect(cleanClassNames("valid", undefined, null, false, "", "another")).toBe("valid another");
    });

    it("returns empty string when all values are falsy", () => {
      expect(cleanClassNames(undefined, null, false, "")).toBe("");
    });

    it("handles single class name", () => {
      expect(cleanClassNames("single")).toBe("single");
    });

    it("handles no arguments", () => {
      expect(cleanClassNames()).toBe("");
    });

    it("handles conditional classes", () => {
      const isActive = true;
      const isDisabled = false;
      
      expect(
        cleanClassNames(
          "base-class",
          isActive && "active-class",
          isDisabled && "disabled-class"
        )
      ).toBe("base-class active-class");
    });

    it("preserves class names with special characters", () => {
      expect(cleanClassNames("hover:bg-blue-500", "md:text-lg")).toBe("hover:bg-blue-500 md:text-lg");
    });
  });
});
