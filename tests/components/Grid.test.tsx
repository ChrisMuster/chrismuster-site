import { render, screen } from "@testing-library/react";
import Grid from "@/components/grid/grid";

describe("Grid Component", () => {
  it("renders children", () => {
    render(
      <Grid>
        <div>Child 1</div>
        <div>Child 2</div>
      </Grid>
    );
    
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  it("applies default medium gap", () => {
    const { container } = render(
      <Grid>
        <div>Content</div>
      </Grid>
    );
    
    expect(container.firstChild).toHaveClass("gap-6");
  });

  it("applies small gap", () => {
    const { container } = render(
      <Grid gap="small">
        <div>Content</div>
      </Grid>
    );
    
    expect(container.firstChild).toHaveClass("gap-4");
  });

  it("applies large gap", () => {
    const { container } = render(
      <Grid gap="large">
        <div>Content</div>
      </Grid>
    );
    
    expect(container.firstChild).toHaveClass("gap-8");
  });

  it("applies responsive grid columns", () => {
    const { container } = render(
      <Grid sm={1} md={2} lg={3} xl={4}>
        <div>Content</div>
      </Grid>
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveClass("grid-cols-1");
    expect(gridElement).toHaveClass("md:grid-cols-2");
    expect(gridElement).toHaveClass("lg:grid-cols-3");
    expect(gridElement).toHaveClass("xl:grid-cols-4");
  });

  it("applies only specified breakpoints", () => {
    const { container } = render(
      <Grid sm={2} lg={4}>
        <div>Content</div>
      </Grid>
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toHaveClass("grid-cols-2");
    expect(gridElement).toHaveClass("lg:grid-cols-4");
    expect(gridElement.className).not.toContain("md:grid-cols");
    expect(gridElement.className).not.toContain("xl:grid-cols");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Grid className="custom-grid">
        <div>Content</div>
      </Grid>
    );
    
    expect(container.firstChild).toHaveClass("custom-grid");
    expect(container.firstChild).toHaveClass("grid");
  });

  it("handles all grid column options", () => {
    const { container: grid1 } = render(<Grid sm={1}><div>1</div></Grid>);
    expect(grid1.firstChild).toHaveClass("grid-cols-1");

    const { container: grid2 } = render(<Grid sm={2}><div>2</div></Grid>);
    expect(grid2.firstChild).toHaveClass("grid-cols-2");

    const { container: grid3 } = render(<Grid sm={3}><div>3</div></Grid>);
    expect(grid3.firstChild).toHaveClass("grid-cols-3");

    const { container: grid4 } = render(<Grid sm={4}><div>4</div></Grid>);
    expect(grid4.firstChild).toHaveClass("grid-cols-4");

    const { container: grid5 } = render(<Grid sm={5}><div>5</div></Grid>);
    expect(grid5.firstChild).toHaveClass("grid-cols-5");

    const { container: grid6 } = render(<Grid sm={6}><div>6</div></Grid>);
    expect(grid6.firstChild).toHaveClass("grid-cols-6");
  });
});
