import type { Metadata } from "next";
import "./globals.css";

import kumbhSans from "./font";

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
