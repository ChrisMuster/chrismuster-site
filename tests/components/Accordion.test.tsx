import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion, AccordionTab } from "@/components/accordion/accordion";

describe("Accordion Component", () => {
  it("renders the Accordion and its children", () => {
    render(
      <Accordion>
        <AccordionTab title="Test Tab">Content goes here</AccordionTab>
      </Accordion>
    );

    expect(screen.getByText("Test Tab")).toBeInTheDocument();
  });

  it("starts closed by default", () => {
    render(
      <Accordion>
        <AccordionTab title="Hidden Tab">Hidden Content</AccordionTab>
      </Accordion>
    );

    // The container should be in the DOM but have style max-height: 0 (hidden)
    const content = screen.getByTestId("accordion-content");
    expect(content).toHaveClass("max-h-0");
  });

  it("opens when clicked", async () => {
    const user = userEvent.setup();

    render(
      <Accordion>
        <AccordionTab title="Toggle Tab">Visible Content</AccordionTab>
      </Accordion>
    );

    const button = screen.getByRole("button");
    await user.click(button);

    const content = screen.getByTestId("accordion-content");
    expect(content).toHaveClass("max-h-[fit]");
  });

  it("respects openByDefault", () => {
    render(
      <Accordion>
        <AccordionTab title="Open Tab" openByDefault>
          Pre-opened Content
        </AccordionTab>
      </Accordion>
    );

    const content = screen.getByTestId("accordion-content");
    expect(content).toHaveClass("max-h-[fit]");
  });
});
