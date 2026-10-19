"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import type { PortfolioProduct } from "@/types/products";
import { ProductCarousel } from "./product-carousel";

export function ProductPanel({ product, totalProducts }: { product: PortfolioProduct; totalProducts: number }) {
  return (
    <motion.div key={product.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.32, ease: "easeOut" }} className="grid gap-4 lg:grid-cols-[minmax(190px,.95fr)_minmax(210px,1fr)] lg:gap-6">
      <ProductCarousel product={product} totalProducts={totalProducts} />
      <div className="flex flex-col py-1 sm:py-2">
        <div className="flex items-center justify-between gap-2 text-[9px] font-bold uppercase tracking-[.15em] text-[#705144] dark:text-[#d1ad98]">
          <span>{product.number} / {String(totalProducts).padStart(2, "0")} · {product.category}</span>
          <ArrowUpRight className="size-3 text-brand" />
        </div>
        <h3 className="mb-0 mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1] tracking-[-.065em] text-[#22201e] dark:text-[#f5f0eb]">{product.name}</h3>
        <p className="mb-0 mt-4 text-xs leading-[1.8] text-[#706c67] dark:text-muted-foreground lg:text-sm">{product.description}</p>
        {product.cta ? (
          <div className="mt-4">
            <a
              href={product.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground inline-flex min-h-10 items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {product.cta.label}
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </a>
          </div>
        ) : null}
        {[
          { label: "Architecture", items: product.architecture },
          { label: product.id === "carequill" ? "Technology" : "Tools & technologies", items: product.technologies },
        ].map(group => group.items?.length ? (
          <div key={group.label} className="mt-4">
            <h4 className="mb-2 text-[9px] font-bold uppercase tracking-[.14em] text-[#705144] dark:text-[#d1ad98]">{group.label}</h4>
            <div className="flex flex-wrap gap-1.5">{group.items.map(item => (
              <span key={item} className="rounded-full border border-[#dfd6cd] bg-[#fffdfa] px-2.5 py-1.5 text-[10px] text-[#5e5650] dark:border-[#554940] dark:bg-[#28231f] dark:text-[#e7ddd5]">{item}</span>
            ))}</div>
          </div>
        ) : null)}
        {product.proof.length > 0 ? <div className="mt-auto grid grid-cols-2 gap-2 border-t border-[#ded7ce] pt-4 sm:mt-6">
          {product.proof.map((item) => <div key={item.label} className="min-h-16 bg-[#fffdfa]/75 p-3 dark:bg-[#28231f]">
            <strong className="block text-base font-semibold leading-tight tracking-[-.035em] text-[#705144] dark:text-[#d1ad98]">{item.value}</strong>
            <span className="mt-1.5 block text-[10px] leading-relaxed text-[#706c67] dark:text-[#c6bcb4]">{item.label}</span>
          </div>)}
        </div> : null}
      </div>
    </motion.div>
  );
}
