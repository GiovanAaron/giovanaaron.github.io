"use client";

import { useEffect, useRef, useState } from "react";
import type { ProductSlide } from "@/types/products";

export function ProductImageVisual({ slide }: { slide: Extract<ProductSlide, { kind: "image" }> }) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;
    let active = true;
    let decoding = false;
    let failed = false;

    function fail() {
      failed = true;
      if (active) setStatus("error");
    }
    async function reveal() {
      if (!image || decoding || failed) return;
      decoding = true;
      try {
        if (typeof image.decode === "function") await image.decode();
        else await Promise.resolve();
        if (active && !failed) setStatus(image.naturalWidth > 0 ? "ready" : "error");
      } catch {
        // Some browsers reject decode() for otherwise displayable images.
        if (active && !failed) setStatus(image.naturalWidth > 0 ? "ready" : "error");
      }
    }
    image.addEventListener("load", reveal);
    image.addEventListener("error", fail);
    // Cached images may already be loaded before the listeners are attached.
    if (image.complete) {
      if (image.naturalWidth > 0) void reveal();
      else void Promise.resolve().then(() => { if (active) fail(); });
    }
    return () => {
      active = false;
      image.removeEventListener("load", reveal);
      image.removeEventListener("error", fail);
    };
  }, [slide.src]);

  return (
    <figure aria-busy={status === "loading"} className="mx-auto my-3 w-full max-w-sm lg:absolute lg:left-1/2 lg:top-1/2 lg:my-0 lg:w-[115%] lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2">
      <div className="relative mx-auto w-full max-w-[90%]">
      {status === "error" ? (
        <div role="status" className="bg-background/70 text-muted-foreground flex aspect-[4/3] items-center justify-center rounded-lg p-4 text-center text-xs lg:aspect-auto lg:h-80">
          Image unavailable: {slide.alt}
        </div>
      ) : (
        <>
        {status === "loading" ? (
          <div role="status" className="bg-background/80 text-muted-foreground absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border border-border/60 p-4">
            <div aria-hidden="true" className="w-full max-w-40 animate-pulse space-y-3 motion-reduce:animate-none">
              <div className="bg-muted h-20 rounded-md" />
              <div className="bg-muted h-2 w-3/4 rounded-full" />
              <div className="bg-muted h-2 w-1/2 rounded-full" />
            </div>
            <span className="text-xs">Loading image…</span>
          </div>
        ) : null}
        {/* Source images intentionally use native img alongside the HTML/CSS slides. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imageRef}
          src={slide.src}
          alt={slide.alt}
          loading="lazy"
          decoding="async"
          className={`aspect-[4/3] w-full rounded-lg transition-opacity duration-300 motion-reduce:transition-none lg:aspect-auto lg:h-80 ${status === "ready" ? "opacity-100" : "opacity-0"} ${slide.fit === "cover" ? "object-cover" : "object-contain"}`}
        />
        </>
      )}
      </div>
      {slide.caption ? <figcaption className="text-muted-foreground mt-2 text-center text-[10px]">{slide.caption}</figcaption> : null}
    </figure>
  );
}
