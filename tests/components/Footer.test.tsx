import { render, screen } from "@testing-library/react";
import Footer from "@/components/footer/footer";
import "@testing-library/jest-dom";

// Mock the JSON content
jest.mock("@/app/data/content.json", () => ({
  footer: {
    logo: "/images/logos/CM-full-logo.png",
    copyright: "Chris Muster. All rights reserved.",
  },
}));

describe("Footer Component", () => {
  it("renders the logo image with alt text", () => {
    render(<Footer />);
    const logo = screen.getByAltText("Chris Muster Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/images/logos/CM-full-logo.png");
  });

  it("renders the copyright text with current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`${currentYear} Chris Muster. All rights reserved.`, "i"))
    ).toBeInTheDocument();
  });
});
