"use client";

import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PdfViewerProps } from "@/components/pdf-viewer/pdfViewer.types";

import { ZoomIn, ZoomOut, Download, Printer, ChevronLeft, ChevronRight } from "lucide-react";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Set PDF Worker Path
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;

export default function PdfViewer({ fileUrl }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-adjust zoom to fit A4 PDF properly
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const pdfA4Width = 595; // PDF.js uses 595px as the standard width for A4 (8.27 inches)
        setScale(width / pdfA4Width);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  // Print Only the PDF
  const handlePrint = () => {
    const printIframe = document.createElement("iframe");
    printIframe.style.position = "absolute";
    printIframe.style.width = "0px";
    printIframe.style.height = "0px";
    printIframe.style.border = "none";
    printIframe.src = fileUrl; // Embed the actual PDF file

    document.body.appendChild(printIframe);

    printIframe.onload = () => {
      setTimeout(() => {
        printIframe.contentWindow?.print();

        // Keep iframe open until user prints or cancels
        printIframe.contentWindow?.addEventListener("afterprint", () => {
          document.body.removeChild(printIframe);
        });
      }, 500);
    };
  };

  // Scroll to PDF Container on Page Change
  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);

    setTimeout(() => {
      const pdfTopElement = document.getElementById("pdfTop");
      if (pdfTopElement) {
        const offsetTop = pdfTopElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: offsetTop - 20, behavior: "smooth" });
      }
    }, 100); // Delay ensures the DOM is updated before scrolling
  };

  return (
    <div id="pdfTop" className="flex flex-col items-center w-full max-w-4xl mx-auto p-medium bg-white border border-gray-300 rounded-lg shadow-light">
      {/* Zoom & Actions at the Top */}
      <div className="flex justify-between w-full mb-small items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale((prev) => Math.max(prev - 0.2, 0.5))}
            className="p-2 bg-[var(--color-blue)] hover:bg-blue-900 text-white rounded-md flex items-center"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-lg font-semibold text-[var(--color-primary)]">Zoom</span>
          <button
            onClick={() => setScale((prev) => Math.min(prev + 0.2, 2.0))}
            className="p-2 bg-[var(--color-blue)] hover:bg-blue-900 text-white rounded-md flex items-center"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2">
          <a href={fileUrl} download className="px-3 py-2 bg-green-600 hover:bg-green-900 text-white rounded-md flex items-center gap-1">
            <Download className="w-5 h-5" /> Download
          </a>

          <button onClick={handlePrint} className="px-3 py-2 bg-gray-700 hover:bg-gray-900 text-white rounded-md flex items-center gap-1">
            <Printer className="w-5 h-5" /> Print
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div ref={containerRef} className="border border-gray-300 shadow-lg overflow-auto w-full">
        <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </div>

      {/* Pagination at the Bottom */}
      <div className="flex justify-center items-center w-full mt-small gap-4">
        <button
          onClick={() => handlePageChange(Math.max(pageNumber - 1, 1))}
          className="p-2 bg-[var(--color-blue)] hover:bg-blue-900 text-white rounded-md flex items-center disabled:opacity-50"
          disabled={pageNumber <= 1}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <p className="text-lg">Page {pageNumber} of {numPages}</p>

        <button
          onClick={() => handlePageChange(Math.min(pageNumber + 1, numPages || 1))}
          className="p-2 bg-[var(--color-blue)] hover:bg-blue-900 text-white rounded-md flex items-center disabled:opacity-50"
          disabled={pageNumber >= (numPages || 1)}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
