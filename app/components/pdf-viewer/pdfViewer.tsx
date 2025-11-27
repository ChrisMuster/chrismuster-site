import dynamic from "next/dynamic";

// Turbopack MUST NOT SSR the PDF viewer
const PdfViewerClient = dynamic(() => import("./PdfViewerClient"), {
  ssr: false,
  loading: () => <p>Loading PDF viewer…</p>,
});

export default PdfViewerClient;
