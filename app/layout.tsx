import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

import Layout from "@/components/layout/layout";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Chris Muster - Portfolio",
  description: "Chris Muster's Web Development Portfolio | About | Code Snippets | Websites and Games | Contact",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicons/android-chrome-512x512.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${roboto.variable} antialiased`}>
        <Layout>{children}</Layout>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
