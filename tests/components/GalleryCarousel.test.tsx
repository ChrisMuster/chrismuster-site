import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GalleryCarousel from "@/components/gallery-carousel/gallery-carousel";

// Sample mock images
const mockImages = [
  { src: "/images/Coder.png", alt: "Image 1", title: "First Image" },
  { src: "/images/Coder1.png", alt: "Image 2", title: "Second Image" },
  { src: "/images/Coder3.png", alt: "Image 3", title: "Third Image" },
];

describe("GalleryCarousel", () => {
  it("renders the main image", () => {
    render(<GalleryCarousel images={mockImages} />);
    const mainImage = screen.getByTestId("main-image");
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute("alt", "Image 1");
  });

  it("shows caption if showCaptions is true", () => {
    render(<GalleryCarousel images={mockImages} showCaptions />);
    expect(screen.getByText("First Image")).toBeInTheDocument();
  });

  it("navigates to the next image", async () => {
    const user = userEvent.setup();
    render(<GalleryCarousel images={mockImages} />);
    await user.click(screen.getByTestId("nav-next"));
    expect(screen.getByTestId("main-image")).toHaveAttribute("alt", "Image 2");
  });

  it("navigates to the previous image", async () => {
    const user = userEvent.setup();
    render(<GalleryCarousel images={mockImages} />);
    await user.click(screen.getByTestId("nav-next"));
    await user.click(screen.getByTestId("nav-prev"));
    expect(screen.getByTestId("main-image")).toHaveAttribute("alt", "Image 1");
  });

  it("changes image on thumbnail click", async () => {
    const user = userEvent.setup();
    render(<GalleryCarousel images={mockImages} />);
    await user.click(screen.getByTestId("thumbnail-1"));
    expect(screen.getByTestId("main-image")).toHaveAttribute("alt", "Image 2");
  });

  it("opens and closes modal", async () => {
    const user = userEvent.setup();
    render(<GalleryCarousel images={mockImages} />);

    fireEvent.mouseEnter(screen.getByTestId("main-image"));
    await user.click(screen.getByTestId("expand-button"));

    const modalImage = await screen.findByTestId("modal-image");
    expect(modalImage).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByTestId("modal-image")).not.toBeInTheDocument();
  });

  it("navigates via modal arrows", async () => {
    const user = userEvent.setup();
    render(<GalleryCarousel images={mockImages} />);

    fireEvent.mouseEnter(screen.getByTestId("main-image"));
    await user.click(screen.getByTestId("expand-button"));

    const nextBtn = await screen.findByTestId("modal-next");
    await user.click(nextBtn);
    expect(await screen.findByTestId("modal-image")).toHaveAttribute("alt", "Image 2");

    const prevBtn = screen.getByTestId("modal-prev");
    await user.click(prevBtn);
    expect(await screen.findByTestId("modal-image")).toHaveAttribute("alt", "Image 1");
  });

  it("navigates using dot buttons in modal", async () => {
    const user = userEvent.setup();
    render(<GalleryCarousel images={mockImages} />);

    fireEvent.mouseEnter(screen.getByTestId("main-image"));
    await user.click(screen.getByTestId("expand-button"));

    const dot = await screen.findByTestId("modal-dot-2");
    await user.click(dot);

    expect(await screen.findByTestId("modal-image")).toHaveAttribute("alt", "Image 3");
  });
});
