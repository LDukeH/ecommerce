import type { Metadata } from "next";
import "./globals.css";

import kumbhSans from "./font";

export const metadata: Metadata = {
  title: "E-commerce App",
  description: "An e-commerce application built with Next.js",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kumbhSans.className} antialiased`}>{children}</body>
    </html>
  );
}
