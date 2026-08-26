"use client";

import { useEffect, useRef, useState } from "react";

const AVATAR_SOURCE = "/assets/new-me-red.svg";
const EXPRESSION_SOURCE = "/assets/me-red-animated.svg";
const BREATHS_BEFORE_SMILE = { min: 2, max: 6 };

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function randomWholeNumber(min: number, max: number) {
  return Math.floor(randomBetween(min, max + 1));
}

function prepareInlineSvg(source: string, expressionSource: string) {
  const document = new DOMParser().parseFromString(source, "image/svg+xml");
  const expressionDocument = new DOMParser().parseFromString(
    expressionSource,
    "image/svg+xml",
  );
  const svg = document.documentElement;

  // Timing is owned by this component, not by the standalone asset.
  svg.querySelector("style")?.remove();
  expressionDocument
    .querySelectorAll<SVGAnimateElement>(
      "#animated-avatar-neutral animate[attributeName='d']",
    )
    .forEach((sourceAnimation) => {
      const sourcePath = sourceAnimation.parentElement;
      const targetPath = sourcePath?.id
        ? svg.querySelector(`#${sourcePath.id}`)
        : null;
      if (targetPath) {
        const animation = document.importNode(sourceAnimation, true);
        const values = animation.getAttribute("values")?.split(";") ?? [];
        const newNeutralPath = targetPath.getAttribute("d");
        if (newNeutralPath && values.length >= 3) {
          values[0] = newNeutralPath;
          values[1] = newNeutralPath;
          values[values.length - 2] = newNeutralPath;
          values[values.length - 1] = newNeutralPath;
          animation.setAttribute("values", values.join(";"));
        }
        targetPath.appendChild(animation);
      }
    });

  svg.querySelectorAll("animate").forEach((animation) => {
    animation.setAttribute("begin", "indefinite");
    animation.setAttribute("repeatCount", "1");
    animation.setAttribute("fill", "freeze");
  });
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("preserveAspectRatio", "xMidYMax meet");
  svg.setAttribute("style", "display:block");

  // The new artwork splits the upper arm and hand/forearm into separate
  // branches. Wrapping their shared parent keeps every branch attached during
  // breathing without imposing a second transform on either arm segment.
  const neutral = svg.querySelector("#animated-avatar-neutral");
  if (neutral?.parentNode) {
    const breath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g",
    );
    breath.id = "animated-avatar-breath";
    neutral.parentNode.insertBefore(breath, neutral);
    breath.appendChild(neutral);
  }

  return new XMLSerializer().serializeToString(svg);
}

export function AnimatedAvatar({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [markup, setMarkup] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    Promise.all(
      [AVATAR_SOURCE, EXPRESSION_SOURCE].map(async (source) => {
        const response = await fetch(source, { signal: controller.signal });
        if (!response.ok) throw new Error("Could not load the animated avatar");
        return response.text();
      }),
    )
      .then(([avatar, expressions]) => prepareInlineSvg(avatar, expressions))
      .then(setMarkup)
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error(error);
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !markup) return;

    const breath = host.querySelector<SVGGElement>("#animated-avatar-breath");
    const neutral = host.querySelector<SVGGElement>("#animated-avatar-neutral");
    const smile = host.querySelector<SVGGElement>("#animated-avatar-smile");
    const morphAnimations = host.querySelectorAll<SVGAnimateElement>(
      "#animated-avatar-neutral animate[attributeName='d']",
    );
    const eyeGroups = host.querySelectorAll<SVGGElement>(
      "#neutral-left-eye, #neutral-right-eye, #smile-left-eye, #smile-right-eye",
    );
    const headParts = host.querySelectorAll<SVGGElement>(
      "#neutral-head, #neutral-expression-suspicious-d362b6de, #neutral-Face, #neutral-glasses, #smile-head, #smile-expression-suspicious-d362b6de, #smile-Face, #smile-glasses",
    );

    if (!breath || !neutral) return;

    neutral.style.display = "block";
    if (smile) smile.style.display = "none";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let cancelled = false;
    let smiling = false;
    let breathsUntilSmile = randomWholeNumber(
      BREATHS_BEFORE_SMILE.min,
      BREATHS_BEFORE_SMILE.max,
    );

    breath.style.transformBox = "view-box";
    breath.style.transformOrigin = "285px 870px";
    headParts.forEach((part) => {
      part.style.transformBox = "view-box";
      part.style.transformOrigin = "285px 430px";
    });

    let gazeX = 0;
    let gazeY = 0;
    let targetGazeX = 0;
    let targetGazeY = 0;
    let gazeFrame = 0;

    const updateGazeTarget = (event: PointerEvent) => {
      const svg = host.querySelector("svg");
      if (!svg) return;

      const bounds = svg.getBoundingClientRect();
      const deltaX = event.clientX - (bounds.left + bounds.width / 2);
      const deltaY = event.clientY - (bounds.top + bounds.height * 0.32);
      const distance = Math.hypot(deltaX, deltaY) || 1;
      const strength = Math.min(distance / 260, 1);

      targetGazeX = (deltaX / distance) * 7 * strength;
      targetGazeY = (deltaY / distance) * 5 * strength;
    };

    const resetGaze = () => {
      targetGazeX = 0;
      targetGazeY = 0;
    };

    const renderGaze = () => {
      gazeX += (targetGazeX - gazeX) * 0.16;
      gazeY += (targetGazeY - gazeY) * 0.16;
      const transform = `translate(${gazeX.toFixed(2)} ${gazeY.toFixed(2)})`;
      eyeGroups.forEach((eye) => eye.setAttribute("transform", transform));
      gazeFrame = requestAnimationFrame(renderGaze);
    };

    window.addEventListener("pointermove", updateGazeTarget, { passive: true });
    window.addEventListener("pointerleave", resetGaze);
    window.addEventListener("blur", resetGaze);
    gazeFrame = requestAnimationFrame(renderGaze);

    const morphExpression = (toSmile: boolean) => {
      morphAnimations.forEach((animation) => {
        const originalValues = animation.dataset.originalValues ??
          animation.getAttribute("values") ??
          "";
        animation.dataset.originalValues = originalValues;

        const paths = originalValues.split(";");
        const neutralPath = paths[0];
        const smilePath = paths[2];
        if (!neutralPath || !smilePath) return;

        animation.setAttribute(
          "values",
          toSmile
            ? `${neutralPath};${smilePath}`
            : `${smilePath};${neutralPath}`,
        );
        animation.setAttribute("keyTimes", "0;1");
        animation.setAttribute("keySplines", ".45 0 .55 1");
        animation.setAttribute("calcMode", "spline");
        animation.setAttribute("dur", "1400ms");
        animation.beginElement();
      });
    };

    const swayAnimations = Array.from(headParts, (part) =>
      part.animate(
        [
          { transform: "translate(-2px, 0) rotate(-0.35deg)" },
          { transform: "translate(0, -3.5px) rotate(0deg)" },
          { transform: "translate(2px, 0) rotate(0.35deg)" },
          { transform: "translate(0, -3.5px) rotate(0deg)" },
          { transform: "translate(-2px, 0) rotate(-0.35deg)" },
        ],
        { duration: 18_000, easing: "ease-in-out", iterations: Infinity },
      ),
    );

    async function breathe() {
      while (!cancelled) {
        // A fresh multiplier on every breath varies all movement by ±15%.
        const amplitude = randomBetween(0.85, 1.15);
        const animation = breath!.animate(
          [
            { transform: "translateY(0) scale(1, 1)", offset: 0 },
            {
              transform: `translateY(${-1.125 * amplitude}px) scale(${1 + 0.00675 * amplitude}, ${1 + 0.0045 * amplitude})`,
              offset: 0.24,
            },
            { transform: "translateY(0) scale(1, 1)", offset: 0.62 },
            { transform: "translateY(0) scale(1, 1)", offset: 1 },
          ],
          {
            duration: randomBetween(7_200, 8_200),
            easing: "ease-in-out",
            fill: "forwards",
          },
        );

        try {
          await animation.finished;
        } catch {
          break;
        }
        if (cancelled) break;

        // Expressions only change here, after exhale and rest have completed.
        if (smiling) {
          smiling = false;
          morphExpression(false);
          breathsUntilSmile = randomWholeNumber(
            BREATHS_BEFORE_SMILE.min,
            BREATHS_BEFORE_SMILE.max,
          );
        } else {
          breathsUntilSmile -= 1;
          if (breathsUntilSmile === 0) {
            smiling = true;
            morphExpression(true);
          }
        }
      }
    }

    void breathe();

    return () => {
      cancelled = true;
      breath.getAnimations().forEach((animation) => animation.cancel());
      swayAnimations.forEach((animation) => animation.cancel());
      cancelAnimationFrame(gazeFrame);
      window.removeEventListener("pointermove", updateGazeTarget);
      window.removeEventListener("pointerleave", resetGaze);
      window.removeEventListener("blur", resetGaze);
    };
  }, [markup]);

  return (
    <div
      ref={hostRef}
      className={className}
      // The same-origin SVG is parsed first so legacy animation nodes cannot run.
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
