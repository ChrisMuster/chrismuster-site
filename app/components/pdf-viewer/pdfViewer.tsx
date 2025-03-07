"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ZoomIn, ZoomOut, Download, Printer, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import { PdfViewerProps } from "@/components/pdf-viewer/pdfViewer.types";
import Loading from '@/components/loading/loading';

import { cleanClassNames } from "@/utils/utils";

// Set PDF Worker Path
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;

export default function PdfViewer({ fileUrl, border = false, shadow = false }: PdfViewerProps) {
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      if (width !== containerWidth) {
        setContainerWidth(width);
        setScale(width / 595); // PDF.js A4 default width is 595px
      }
    }
  }, [containerWidth]);

  // Debounce scale updates
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScale, 250);
    };

    window.addEventListener("resize", handleResize);
    updateScale(); // Ensure it runs on initial load

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateScale]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setIsLoading(false); // Hide loader when PDF is loaded
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

  // Memoized PDF Document to prevent unnecessary re-renders
  const pdfDocument = useMemo(() => (
    <Document 
      file={fileUrl} 
      onLoadSuccess={onDocumentLoadSuccess} 
      key={fileUrl}
      loading={null} // stops default loading message
    >
      <Page 
        pageNumber={pageNumber} 
        scale={scale} 
        key={pageNumber} 
        renderTextLayer={false} // stops rerendering of text which has not changed
        loading={null} // stops default loading message
      />
    </Document>
  ), [fileUrl, pageNumber, scale]);

  const pdfShadow = shadow ? "shadow-light" : "";
  const pdfBorder = border ? "border border-gray-300 rounded-lg" : "";

  return (
    <div id="pdfTop" className={cleanClassNames("flex flex-col items-center w-full max-w-4xl mx-auto p-small bg-white", pdfShadow, pdfBorder)}>
      {/* Zoom & Actions at the Top */}
      <div className="flex flex-wrap justify-between w-full mb-3 sm:gap-4 gap-2">
        <div className="flex items-center sm:gap-2 gap-1">
          <button
            onClick={() => setScale((prev) => Math.max(prev - 0.2, 0.5))}
            className="p-2 bg-[var(--color-blue)] hover:bg-blue-900 text-white rounded-md flex items-center"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="hidden md:inline text-lg font-semibold text-[var(--color-primary)]">Zoom</span>
          <button
            onClick={() => setScale((prev) => Math.min(prev + 0.2, 2.0))}
            className="p-2 bg-[var(--color-blue)] hover:bg-blue-900 text-white rounded-md flex items-center"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        {/* Download & Print Buttons */}
        <div className="flex sm:gap-2 gap-1">
          <a href={fileUrl} download className="sm:px-3 sm:py-2 p-2 bg-green-700 hover:bg-green-900 text-white rounded-md flex items-center gap-1" title="Download">
            <Download className="w-5 h-5" /> <span className="hidden md:inline">Download</span>
          </a>

          <button onClick={handlePrint} className="sm:px-3 sm:py-2 p-2 bg-gray-700 hover:bg-gray-900 text-white rounded-md flex items-center gap-1" title="Print">
            <Printer className="w-5 h-5" /> <span className="hidden md:inline">Print</span>
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div ref={containerRef} className="border border-gray-300 shadow-lg overflow-auto w-full max-w-full">
        {isLoading && <Loading />}
          {pdfDocument}
      </div>

      {/* Pagination at the Bottom */}
      <div className="flex justify-center items-center w-full mt-3 gap-2 sm:gap-4">
        <button
          onClick={() => handlePageChange(Math.max(pageNumber - 1, 1))}
          className="p-2 bg-[var(--color-blue)] hover:bg-blue-900 text-white rounded-md flex items-center disabled:opacity-50"
          disabled={pageNumber <= 1}
          title="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <p className="text-sm sm:text-lg"><span className="hidden sm:inline">Page</span> {pageNumber} of {numPages}</p>

        <button
          onClick={() => handlePageChange(Math.min(pageNumber + 1, numPages || 1))}
          className="p-2 bg-[var(--color-blue)] hover:bg-blue-900 text-white rounded-md flex items-center disabled:opacity-50"
          disabled={pageNumber >= (numPages || 1)}
          title="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      {/* Open PDF in browser default PDF viewer */}
      <Link
        href="/documents/Chris-CV-Feb2025.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-[var(--color-blue)] cursor-pointer mt-3"
      >
        Open PDF in Browser View
      </Link>
    </div>
  );
}
