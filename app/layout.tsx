import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campist",
  description:
    "Connected camp operations for facilitators and managers — reporting, staff visibility, and cross-team coordination in one platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
