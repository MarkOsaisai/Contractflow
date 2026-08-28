import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ContractFlow",
  description: "Oil and gas contract operations",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
