"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ZoomIn,
  ZoomOut,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { PdfViewerProps } from "./pdfViewer.types";
import Loading from "@/components/loading/loading";
import { cleanClassNames } from "@/utils/utils";

// --------------------------------------------------
// FINAL: TURBOPACK-COMPATIBLE PDF WORKER
// MUST BE A URL STRING — NOT AN IMPORT — IN 15.5+
// --------------------------------------------------
pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.mjs";

export default function PdfViewerClient({
  fileUrl,
  linkText,
  border = false,
  shadow = false,
}: PdfViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scale PDF width
  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      if (width !== containerWidth) {
        setContainerWidth(width);
        setScale(width / 595); // PDF A4 default width
      }
    }
  }, [containerWidth]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScale, 250);
    };

    window.addEventListener("resize", handleResize);
    updateScale();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateScale]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setIsLoading(false);
    setNumPages(numPages);
  };

  // Print logic
  const handlePrint = () => {
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    iframe.src = fileUrl;
    document.body.appendChild(iframe);

    iframe.onload = () => {
      setTimeout(() => {
        iframe.contentWindow?.print();

        iframe.contentWindow?.addEventListener("afterprint", () => {
          document.body.removeChild(iframe);
        });
      }, 500);
    };
  };

  // Pagination + scroll-to-top
  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);

    setTimeout(() => {
      const top = document.getElementById("pdfTop");
      if (top) {
        const offset = top.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: offset - 20, behavior: "smooth" });
      }
    }, 100);
  };

  // Memoized Document render
  const pdfDocument = useMemo(
    () => (
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        key={fileUrl}
        loading={null}
      >
        <Page
          pageNumber={pageNumber}
          scale={scale}
          key={pageNumber}
          renderTextLayer={false}
          loading={null}
        />
      </Document>
    ),
    [fileUrl, pageNumber, scale]
  );

  const pdfShadow = shadow ? "shadow-light" : "";
  const pdfBorder = border ? "border border-gray-300 rounded-lg" : "";

  return (
    <div
      id="pdfTop"
      className={cleanClassNames(
        "flex flex-col items-center w-full max-w-4xl mx-auto p-small bg-white",
        pdfShadow,
        pdfBorder
      )}
    >
      {/* Zoom + Actions */}
      <div className="flex flex-wrap justify-between w-full mb-3 sm:gap-4 gap-2">
        <div className="flex items-center sm:gap-2 gap-1">
          <button
            onClick={() => setScale((prev) => Math.max(prev - 0.2, 0.5))}
            className="p-2 bg-[var(--color-blue)] hover:bg-blue-900 text-white rounded-md"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>

          <span className="hidden md:inline text-lg font-semibold text-[var(--color-primary)]">
            Zoom
          </span>

          <button
            onClick={() => setScale((prev) => Math.min(prev + 0.2, 2.0))}
            className="p-2 bg-[var(--color-blue)] hover:bg-blue-900 text-white rounded-md"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        <div className="flex sm:gap-2 gap-1">
          <a
            href={fileUrl}
            download
            className="sm:px-3 sm:py-2 p-2 bg-green-700 hover:bg-green-900 text-white rounded-md flex items-center gap-1"
            title="Download"
          >
            <Download className="w-5 h-5" />
            <span className="hidden md:inline">Download</span>
          </a>

          <button
            onClick={handlePrint}
            className="sm:px-3 sm:py-2 p-2 bg-gray-700 hover:bg-gray-900 text-white rounded-md flex items-center gap-1"
            title="Print"
          >
            <Printer className="w-5 h-5" />
            <span className="hidden md:inline">Print</span>
          </button>
        </div>
      </div>

      {/* Viewer */}
      <div
        ref={containerRef}
        className="border border-gray-300 shadow-lg overflow-auto w-full max-w-full"
      >
        {isLoading && <Loading />}
        {pdfDocument}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center w-full mt-3 gap-2 sm:gap-4">
        <button
          onClick={() => handlePageChange(Math.max(pageNumber - 1, 1))}
          disabled={pageNumber <= 1}
          className="p-2 bg-[var(--color-blue)] hover:bg-blue-900 text-white rounded-md disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <p className="text-sm sm:text-lg">
          <span className="hidden sm:inline">Page</span> {pageNumber} of{" "}
          {numPages}
        </p>

        <button
          onClick={() =>
            handlePageChange(Math.min(pageNumber + 1, numPages || 1))
          }
          disabled={pageNumber >= (numPages || 1)}
          className="p-2 bg-[var(--color-blue)] hover:bg-blue-900 text-white rounded-md disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <Link
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--color-primary)] hover:text-[var(--color-blue)] cursor-pointer mt-3"
      >
        {linkText || "Open in Browser"}
      </Link>
    </div>
  );
}
