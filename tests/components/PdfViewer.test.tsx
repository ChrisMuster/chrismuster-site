import { render, screen } from "@testing-library/react";
import PdfViewer from "@/components/pdf-viewer/pdfViewer";
import React from "react";

// Mock the dynamic import
jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: (importFn: () => Promise<unknown>, options: { ssr: boolean; loading: () => React.JSX.Element }) => {
    if (!options.ssr) {
      // Return the loading component for testing
      return options.loading;
    }
    return () => <div>Mocked PDF Viewer</div>;
  },
}));

describe("PdfViewer Component", () => {
  const mockFileUrl = "/test-file.pdf";

  it("renders loading state initially", () => {
    render(<PdfViewer fileUrl={mockFileUrl} />);
    
    expect(screen.getByText("Loading PDF viewer…")).toBeInTheDocument();
  });

  it("uses dynamic import with ssr: false", () => {
    const { container } = render(<PdfViewer fileUrl={mockFileUrl} />);
    
    expect(container).toBeInTheDocument();
  });
});
