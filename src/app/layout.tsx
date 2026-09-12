import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clickly AI — AI Receptionist",
  description: "AI phone receptionists for modern businesses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
