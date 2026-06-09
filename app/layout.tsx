import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Youth Ops Platform",
  description:
    "Secure operations platform for youth program staff, incidents, evaluations, surveys, and AI support.",
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
