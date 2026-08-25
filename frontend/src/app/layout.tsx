import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Smith — Creative UI/UX Designer",
  description: "Portfolio of John Smith, a creative UI/UX designer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
