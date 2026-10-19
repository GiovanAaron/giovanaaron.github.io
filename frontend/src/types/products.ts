import type { RootProjectId } from "@/lib/root-navigation";

export type ProductId = RootProjectId | "flowfree";

export type ProductProof = { value: string; label: string };

export type ProductVisualId = "primary" | "alternate";

export type ProductSlide = {
  id: string;
  label: string;
} & (
  | { kind: "html"; visual: ProductVisualId }
  | { kind: "image"; src: string; alt: string; fit?: "contain" | "cover"; caption?: string }
);

export type PortfolioProduct = {
  id: ProductId;
  number: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  cta?: { label: string; href: string };
  technologies: string[];
  architecture?: string[];
  proof: ProductProof[];
  slides: [ProductSlide, ...ProductSlide[]];
};
