
import { LayoutProps } from "@/components/layout/layout.types";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import BackToTop from "@/components/top-button/BackToTop";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content (children) */}
      <main className="flex-grow pt-20">{children}</main>

      <BackToTop />

      {/* Footer */}
      <Footer />
    </div>
  );
}
