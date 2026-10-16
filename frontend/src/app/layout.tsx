import type { Metadata } from "next";
import { VisitorProvider } from "@/components/visitor-provider";
import openGraphImage from "./meta/opengraph-image.png";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://giovanaaron.github.io"),
  title: "Giovan Aaron — Product Engineer",
  description: "Full-stack and cloud engineering with a creative UX/UI perspective.",
  openGraph: {
    type: "website",
    siteName: "Giovan Aaron",
    title: "Giovan Aaron — Product Engineer",
    description: "Explore my projects, experience and approach to building products.",
    images: [{
      url: openGraphImage.src,
      width: openGraphImage.width,
      height: openGraphImage.height,
      alt: "Giovan Aaron — Product Engineer portfolio",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Giovan Aaron — Product Engineer",
    description: "Explore my projects, experience and approach to building products.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <VisitorProvider>{children}</VisitorProvider>
      </body>
    </html>
  );
}
