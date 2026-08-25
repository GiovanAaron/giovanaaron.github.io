"use client";

import Image from "next/image";
import { Rotate3D } from "lucide-react";
import { useState } from "react";

import { AnimatedAvatar } from "@/components/animated-avatar";

export function PortfolioHeroImage() {
  const [isFlipped, setIsFlipped] = useState(true);

  return (
    <>
      <div className="absolute inset-0 perspective-distant">
        <div
          className={`relative size-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] motion-reduce:transition-none ${
            isFlipped ? "transform-[rotateY(180deg)]" : ""
          }`}
        >
          <div className="absolute inset-0 backface-hidden">
            <Image
              src="/assets/tall-hero.png"
              alt="John Smith, creative UI/UX designer"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover object-top"
            />
          </div>

          <div className="absolute inset-0 backface-hidden transform-[rotateY(180deg)]">
            <AnimatedAvatar className="size-full" />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsFlipped((current) => !current)}
        className="bg-primary text-primary-foreground absolute bottom-6 left-1/2 z-30 flex size-11 -translate-x-1/2 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={isFlipped ? "Show photographic portrait" : "Show illustrated portrait"}
        aria-pressed={isFlipped}
      >
        <Rotate3D className="size-5" aria-hidden="true" />
      </button>
    </>
  );
}
