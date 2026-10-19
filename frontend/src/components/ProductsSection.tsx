"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/data/products";
import type { RootProjectId } from "@/lib/root-navigation";
import { ProductPanel } from "@/components/products/product-panel";

export default function ProductsSection({ selectedProductId, onProductChange }: {
  selectedProductId: RootProjectId;
  onProductChange: (product: RootProjectId) => void;
}) {
  const selectedProduct = products.find((product) => product.id === selectedProductId) ?? products[0];
  return (
    <section id="products" className="scroll-mt-6 border-t border-[#e2dbd3] bg-[rgb(241,238,233)] py-8 text-left sm:py-8 dark:border-[#443b34] dark:bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <div className="mb-7 grid gap-4 md:mb-9 md:grid-cols-[1.1fr_.8fr] md:items-end">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.16em] text-[#705144] before:h-px before:w-4 before:bg-[#cba58b] dark:text-[#d1ad98] dark:before:bg-[#d1ad98] sm:text-[10px]">Selected work</div>
            <h2 className="mb-0 mt-5 max-w-2xl text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1] tracking-[-.065em] text-[#22201e] dark:text-[#f5f0eb]">Ideas, care and <em className="font-[Georgia,serif] font-normal text-[#705144] dark:text-[#d1ad98]">things I’ve made.</em></h2>
          </div>
          {/* <p className="mb-1 max-w-96 text-xs leading-[1.8] text-[#706c67] dark:text-muted-foreground md:justify-self-end lg:text-sm">Selected product engineering work spanning independently launched products and cross-functional teams, with a focus on wellbeing, clean energy, social impact and play.</p> */}
        </div>

        <Tabs value={selectedProductId} onValueChange={(value) => {
          if (products.some(product => product.id === value)) onProductChange(value as RootProjectId);
        }} orientation="vertical" className="gap-0">
          <div className="grid gap-4 md:grid-cols-[minmax(145px,.7fr)_minmax(0,2fr)] md:gap-6 lg:grid-cols-[minmax(155px,.72fr)_minmax(0,2.2fr)] lg:gap-8">
            <TabsList aria-label="Select a product" className="h-auto w-full flex-row items-stretch justify-start overflow-x-auto rounded-none border-0 border-b border-[#ded7ce] bg-transparent p-0 md:col-start-1 md:flex-col md:overflow-visible md:border-b-0 md:pr-3">
              {products.map((product) => (
                <TabsTrigger key={product.id} value={product.id} className="h-auto min-w-max flex-1 justify-start gap-2 rounded-none border-b-2 border-transparent px-2 py-3 text-left data-[state=active]:border-[#705144] data-[state=active]:bg-transparent data-[state=active]:text-[#705144] md:flex-none md:border-b md:px-1.5 md:py-4 dark:data-[state=active]:border-[#d1ad98] dark:data-[state=active]:text-[#d1ad98]">
                  <span className="mt-0.5 self-start font-mono text-[9px] tracking-wider text-[#9c9085]">{product.number}</span>
                  <span className="flex min-w-0 flex-1 flex-col items-start gap-1">
                    <span className="whitespace-nowrap text-xs font-semibold tracking-[-.02em] text-[#22201e] dark:text-[#f5f0eb]">{product.shortName}</span>
                    <span className="text-[9px] font-normal uppercase tracking-[.12em] text-[#93877c]">{product.category}</span>
                  </span>
                  <ArrowRight className="hidden size-2 shrink-0 text-brand md:block" />
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={selectedProductId} forceMount className="data-[state=inactive]:hidden">
              <AnimatePresence mode="wait" initial={false}>
                <ProductPanel key={selectedProduct.id} product={selectedProduct} totalProducts={products.length} />
              </AnimatePresence>
            </TabsContent>
          </div>
        </Tabs>
        <div className="mt-8 flex flex-col gap-1.5 border-t border-[#ded7ce] pt-4 text-[10px] text-[#706c67] dark:border-[#443b34] dark:text-[#c6bcb4] sm:flex-row sm:items-center sm:justify-between">
          <span>Illustrative product visuals, paired with details from my portfolio.</span>
          <span>Selected work · 2023 to 2025</span>
        </div>
      </div>
    </section>
  );
}
