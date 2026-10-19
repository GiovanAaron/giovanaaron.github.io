"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ComponentType } from "react";
import type { PortfolioProduct, ProductSlide, ProductVisualId } from "@/types/products";
import { ProductImageVisual } from "./product-image";
import { AlternateProductVisual, PrimaryProductVisual, ProductMark } from "./product-visuals";

const visualComponents = {
  primary: PrimaryProductVisual,
  alternate: AlternateProductVisual,
} satisfies Record<ProductVisualId, ComponentType<{ product: PortfolioProduct }>>;

function ProductSlideVisual({ slide, product }: { slide: ProductSlide; product: PortfolioProduct }) {
  if (slide.kind === "image") return <ProductImageVisual key={slide.src} slide={slide} />;
  const Visual = visualComponents[slide.visual];
  return <Visual product={product} />;
}

export function ProductCarousel({ product, totalProducts }: { product: PortfolioProduct; totalProducts: number }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [rotationMode, setRotationMode] = useState<"automatic" | "manual">("automatic");
  const rotationTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduceMotion = useReducedMotion();
  const slideCount = product.slides.length;
  const slide = product.slides[activeSlide] ?? product.slides[0];
  // The keyed product panel resets both the slide and rotation mode on selection.
  useEffect(() => {
    if (rotationMode !== "automatic" || slideCount < 2) return;
    rotationTimerRef.current = setInterval(() => {
      setActiveSlide(current => (current + 1) % slideCount);
    }, 5000);
    return () => {
      if (rotationTimerRef.current !== null) clearInterval(rotationTimerRef.current);
      rotationTimerRef.current = null;
    };
  }, [product.id, slideCount, rotationMode]);

  function enableManualRotation() {
    if (rotationTimerRef.current !== null) clearInterval(rotationTimerRef.current);
    rotationTimerRef.current = null;
    setRotationMode("manual");
  }
  function moveSlide(direction: number) {
    setActiveSlide(current => (current + direction + slideCount) % slideCount);
  }
  return (
    <div role="region" aria-roledescription="carousel" aria-label={`${product.name} visuals`}
      onPointerDownCapture={enableManualRotation}
      onClickCapture={enableManualRotation}
      className={`relative flex min-h-64 flex-col justify-between bg-[#eee7df] p-4 sm:min-h-80 sm:p-5 dark:bg-[#29231f] ${slide.kind === "image" ? "overflow-hidden lg:overflow-visible" : "overflow-hidden"}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-12 -top-14 size-36 rounded-full border border-white/60 sm:size-48" />
      <div className="absolute -bottom-20 -left-16 size-40 rounded-full border border-white/50 sm:size-56" />
      </div>
      <div className="relative z-20 flex items-start justify-between gap-3">
        <span className="text-[9px] font-bold uppercase tracking-[.16em] text-[#705144] dark:text-[#d1ad98]">Product visual study</span>
        <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[#705144]/20 bg-[#f8f7f5]/70 text-[#705144] dark:bg-[#29231f] dark:text-[#d1ad98]"><ProductMark id={product.id} /></span>
      </div>
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={`${product.id}-${slide.id}`} role="group" aria-roledescription="slide" aria-label={`${activeSlide + 1} of ${slideCount}: ${slide.label}`} className={`w-full ${slide.kind === "image" ? "lg:relative lg:min-h-64" : ""}`} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 22, scale: 0.98 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -22, scale: 0.98 }} transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}>
            <ProductSlideVisual slide={slide} product={product} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3">
        <span className="text-[10px] uppercase tracking-[.14em] text-[#706c67] dark:text-[#c6bcb4]">{product.number} / {String(totalProducts).padStart(2, "0")} · {product.category}</span>
        {slideCount > 1 ? (
          <div className="flex min-w-0 max-w-full items-center gap-1" role="group" aria-label={`${product.name} slide controls`}>
            <button type="button" aria-label="Previous slide" onClick={() => moveSlide(-1)} className="text-primary flex size-8 shrink-0 items-center justify-center rounded-full hover:bg-background/60 focus-visible:outline-2 focus-visible:outline-primary">
              <ChevronLeft className="size-3" />
            </button>
            <div className="flex min-w-0 items-center gap-1 overflow-x-auto px-1">
              {product.slides.map((item, index) => (
                <button key={item.id} type="button" aria-label={`Show ${item.label}, ${index + 1} of ${slideCount}`} aria-pressed={activeSlide === index} onClick={() => setActiveSlide(index)} className="flex size-8 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-primary">
                  <span className={`h-2 rounded-full transition-all duration-200 ${activeSlide === index ? "w-4 bg-[#705144] dark:bg-[#d1ad98]" : "w-2 bg-[#b6a99c] hover:bg-[#705144]/70"}`} />
                </button>
              ))}
            </div>
            <button type="button" aria-label="Next slide" onClick={() => moveSlide(1)} className="text-primary flex size-8 shrink-0 items-center justify-center rounded-full hover:bg-background/60 focus-visible:outline-2 focus-visible:outline-primary">
              <ChevronRight className="size-3" />
            </button>
          </div>
        ) : null}
        <span className="sr-only" aria-live={rotationMode === "automatic" ? "off" : "polite"} aria-atomic="true">Slide {activeSlide + 1} of {slideCount}: {slide.label}</span>
      </div>
    </div>
  );
}
