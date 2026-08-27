"use client";

import { useEffect, useRef, useState } from "react";

import {
  AVATAR_LIGHT_REACTION_EVENT,
  AVATAR_SLEEPING_EVENT,
  AVATAR_THINKING_EVENT,
} from "@/lib/avatar-state";

const AVATAR_SOURCE = "/assets/new-me-red.svg";
const EXPRESSION_SOURCE = "/assets/me-red-animated.svg";
const THINKING_SOURCE = "/assets/me-red-animated-thinking.svg";
const THINKING_EXPRESSION_SOURCE = "/assets/me-red-thinking-expression.svg";
const CLOSED_EYES_SOURCE = "/assets/me-red-thinking-eyes-closed.svg";
const ALTERNATE_NEUTRAL_SOURCE = "/assets/me-red-neutral-expression-warm.svg";
const SECONDARY_NEUTRAL_SOURCE = "/assets/me-red-neutral-expression-warm-2.svg";
const SLEEPING_SOURCE = "/assets/me-red-sleeping.svg";
const HUFF_SOURCE = "/assets/me-red-huff.svg";
const TIRED_SOURCE = "/assets/me-red-tired-expression.svg";
const HUFF_RECOIL_SOURCE = "/assets/me-red-huff-recoil.svg";
const EYEROLL_SOURCE = "/assets/me-red-eyeroll-expression.svg";
const BREATHS_BEFORE_SMILE = { min: 4, max: 6 };
const THINKING_EXPRESSION_PATHS = [
  "neutral-glasses-fill",
  "neutral-left-pupil",
  "neutral-moustach-mouth",
  "neutral-right-eye-lid",
  "neutral-right-pupil",
];
const BLINK_PATHS = ["neutral-left-pupil", "neutral-right-pupil"];
const HUFF_PATHS = [
  "neutral-eyebrow",
  "neutral-left-pupil",
  "neutral-right-pupil",
];
const TIRED_PATHS = [
  "neutral-chin-crease",
  "neutral-right-pupil",
  "neutral-left-pupil",
  "neutral-chingoatee",
  "neutral-moustach-mouth",
  "neutral-nose",
];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function randomWholeNumber(min: number, max: number) {
  return Math.floor(randomBetween(min, max + 1));
}

function rotateSimplePath(
  path: string,
  angleDegrees: number,
  pivotX: number,
  pivotY: number,
) {
  const tokens = path.match(/[A-Za-z]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? [];
  const angle = (angleDegrees * Math.PI) / 180;
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  const transformed: string[] = [];

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (/^[A-Za-z]$/.test(token)) {
      transformed.push(token);
      continue;
    }

    const nextToken = tokens[index + 1];
    if (!nextToken || /^[A-Za-z]$/.test(nextToken)) return path;
    const x = Number(token) - pivotX;
    const y = Number(nextToken) - pivotY;
    transformed.push(
      String(Number((pivotX + x * cosine - y * sine).toFixed(3))),
      String(Number((pivotY + x * sine + y * cosine).toFixed(3))),
    );
    index += 1;
  }

  return transformed.join(" ");
}

function translateSimplePath(path: string, deltaX: number, deltaY: number) {
  const tokens = path.match(/[A-Za-z]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? [];
  const transformed: string[] = [];

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (/^[A-Za-z]$/.test(token)) {
      transformed.push(token);
      continue;
    }

    const nextToken = tokens[index + 1];
    if (!nextToken || /^[A-Za-z]$/.test(nextToken)) return path;
    transformed.push(
      String(Number((Number(token) + deltaX).toFixed(3))),
      String(Number((Number(nextToken) + deltaY).toFixed(3))),
    );
    index += 1;
  }

  return transformed.join(" ");
}

function prepareInlineSvg(
  source: string,
  expressionSource: string,
  thinkingSource: string,
  thinkingExpressionSource: string,
  closedEyesSource: string,
  alternateNeutralSource: string,
  secondaryNeutralSource: string,
  sleepingSource: string,
  huffSource: string,
  tiredSource: string,
  huffRecoilSource: string,
  eyeRollSource: string,
) {
  const document = new DOMParser().parseFromString(source, "image/svg+xml");
  const expressionDocument = new DOMParser().parseFromString(
    expressionSource,
    "image/svg+xml",
  );
  const thinkingDocument = new DOMParser().parseFromString(
    thinkingSource,
    "image/svg+xml",
  );
  const thinkingExpressionDocument = new DOMParser().parseFromString(
    thinkingExpressionSource,
    "image/svg+xml",
  );
  const closedEyesDocument = new DOMParser().parseFromString(
    closedEyesSource,
    "image/svg+xml",
  );
  const alternateNeutralDocument = new DOMParser().parseFromString(
    alternateNeutralSource,
    "image/svg+xml",
  );
  const secondaryNeutralDocument = new DOMParser().parseFromString(
    secondaryNeutralSource,
    "image/svg+xml",
  );
  const sleepingDocument = new DOMParser().parseFromString(
    sleepingSource,
    "image/svg+xml",
  );
  const huffDocument = new DOMParser().parseFromString(
    huffSource,
    "image/svg+xml",
  );
  const tiredDocument = new DOMParser().parseFromString(
    tiredSource,
    "image/svg+xml",
  );
  const huffRecoilDocument = new DOMParser().parseFromString(
    huffRecoilSource,
    "image/svg+xml",
  );
  const eyeRollDocument = new DOMParser().parseFromString(
    eyeRollSource,
    "image/svg+xml",
  );
  const svg = document.documentElement;

  // Warm 2 is the underlying neutral pose; the resting cycle spends most of
  // its time in the primary warm expression and occasionally returns here.
  ["neutral-right-eye-lid", "neutral-moustach-mouth"].forEach((id) => {
    const targetPath = svg.querySelector(`#${id}`);
    const secondaryPath = secondaryNeutralDocument.querySelector(`#${id}`);
    const pathData = secondaryPath?.getAttribute("d");
    if (targetPath && pathData) targetPath.setAttribute("d", pathData);
  });

  // Timing is owned by this component, not by the standalone asset.
  svg.querySelector("style")?.remove();
  const importPathAnimations = (
    sourceDocument: Document,
    selector: string,
  ) => {
    sourceDocument
      .querySelectorAll<SVGAnimateElement>(selector)
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
  };

  importPathAnimations(
    expressionDocument,
    "#animated-avatar-neutral animate[attributeName='d']",
  );

  THINKING_EXPRESSION_PATHS.forEach((id) => {
    const targetPath = svg.querySelector(`#${id}`);
    const expressionPath = thinkingExpressionDocument.querySelector(`#${id}`);
    let neutralPath = targetPath?.getAttribute("d");
    const thinkingPath = expressionPath?.getAttribute("d");
    if (!targetPath || !neutralPath || !thinkingPath || neutralPath === thinkingPath) {
      return;
    }

    // The edited eyelid replaces two horizontal commands with equivalent
    // line commands. Normalize the neutral path so SMIL can interpolate it.
    if (id === "neutral-right-eye-lid") {
      neutralPath = neutralPath
        .replace("H212.271", "L212.271 261.965")
        .replace("H261.871", "L261.871 255.565");
      targetPath.setAttribute("d", neutralPath);
    }

    const animation = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate",
    );
    animation.setAttribute("attributeName", "d");
    animation.setAttribute("values", `${neutralPath};${thinkingPath}`);
    animation.setAttribute("data-avatar-animation", "thinking-expression");
    targetPath.appendChild(animation);
  });

  BLINK_PATHS.forEach((id) => {
    const targetPath = svg.querySelector(`#${id}`);
    const closedPath = closedEyesDocument.querySelector(`#${id}`);
    const openPathData = targetPath?.getAttribute("d");
    const closedPathData = closedPath?.getAttribute("d");
    if (!targetPath || !openPathData || !closedPathData) return;

    const animation = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate",
    );
    animation.setAttribute("attributeName", "d");
    animation.setAttribute("values", `${openPathData};${closedPathData}`);
    animation.setAttribute("data-avatar-animation", "blink");
    targetPath.appendChild(animation);
  });

  const restingEyelid = svg.querySelector("#neutral-right-eye-lid");
  const alternateRestingEyelid =
    alternateNeutralDocument.querySelector("#neutral-right-eye-lid") ??
    alternateNeutralDocument.querySelectorAll("path")[18];
  const restingEyelidPath = restingEyelid?.getAttribute("d");
  const alternateRestingEyelidPath =
    alternateRestingEyelid?.getAttribute("d");
  if (restingEyelid && restingEyelidPath && alternateRestingEyelidPath) {
    const animation = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate",
    );
    animation.setAttribute("attributeName", "d");
    animation.setAttribute(
      "values",
      `${restingEyelidPath};${alternateRestingEyelidPath}`,
    );
    animation.setAttribute("data-avatar-animation", "resting-expression");
    restingEyelid.appendChild(animation);
  }

  const neutralMouth = svg.querySelector("#neutral-moustach-mouth");
  const warmMouth = alternateNeutralDocument.querySelector(
    "#neutral-moustach-mouth",
  );
  const warmMouthPath = warmMouth?.getAttribute("d");
  const baseMouthPath = neutralMouth?.getAttribute("d");
  if (neutralMouth && baseMouthPath && warmMouthPath) {
    const animation = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate",
    );
    animation.setAttribute("attributeName", "d");
    animation.setAttribute("values", `${baseMouthPath};${warmMouthPath}`);
    animation.setAttribute("data-avatar-animation", "resting-expression");
    neutralMouth.appendChild(animation);
  }

  const sleepingMouth =
    sleepingDocument.querySelector("#neutral-moustach-mouth") ??
    sleepingDocument.querySelectorAll("path")[22];
  const neutralMouthPath = neutralMouth?.getAttribute("d");
  const bakedSleepingMouthPath = sleepingMouth?.getAttribute("d");
  if (neutralMouth && neutralMouthPath && bakedSleepingMouthPath) {
    const sleepingMouthPath = rotateSimplePath(
      bakedSleepingMouthPath,
      19.237,
      331.414,
      470.816,
    );
    const animation = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate",
    );
    animation.setAttribute("attributeName", "d");
    animation.setAttribute(
      "values",
      `${neutralMouthPath};${sleepingMouthPath}`,
    );
    animation.setAttribute("data-avatar-animation", "sleeping-mouth");
    neutralMouth.appendChild(animation);
  }

  HUFF_PATHS.forEach((id) => {
    const targetPath = svg.querySelector(`#${id}`);
    const huffPath = huffDocument.querySelector(`#${id}`);
    let neutralPath = targetPath?.getAttribute("d");
    const huffPathData = huffPath?.getAttribute("d");
    if (!targetPath || !neutralPath || !huffPathData) return;

    if (id === "neutral-eyebrow") {
      neutralPath = neutralPath.replace(
        "H169.899",
        "L169.899 260.974",
      );
      targetPath.setAttribute("d", neutralPath);
    }

    const animation = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate",
    );
    animation.setAttribute("attributeName", "d");
    animation.setAttribute("values", `${neutralPath};${huffPathData}`);
    animation.setAttribute("data-avatar-animation", "huff-expression");
    targetPath.appendChild(animation);
  });

  TIRED_PATHS.forEach((id) => {
    const targetPath = svg.querySelector(`#${id}`);
    const tiredPath = tiredDocument.querySelector(`#${id}`);
    const neutralPath = targetPath?.getAttribute("d");
    const tiredPathData = tiredPath?.getAttribute("d");
    if (!targetPath || !neutralPath || !tiredPathData) return;

    const animation = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate",
    );
    animation.setAttribute("attributeName", "d");
    animation.setAttribute(
      "values",
      `${neutralPath};${tiredPathData}`,
    );
    animation.setAttribute("data-avatar-animation", "tired-expression");
    targetPath.appendChild(animation);

    const eyeRollPathData = eyeRollDocument
      .querySelector(`#${id}`)
      ?.getAttribute("d");
    if (!eyeRollPathData) return;
    const eyeRollAnimation = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate",
    );
    eyeRollAnimation.setAttribute("attributeName", "d");
    eyeRollAnimation.setAttribute(
      "values",
      `${neutralPath};${eyeRollPathData}`,
    );
    eyeRollAnimation.setAttribute("data-avatar-animation", "eyeroll-expression");
    targetPath.appendChild(eyeRollAnimation);
  });

  TIRED_PATHS.forEach((id) => {
    const targetPath = svg.querySelector(`#${id}`);
    const bakedHuffRecoilPathData = huffRecoilDocument
      .querySelector(`#${id}`)
      ?.getAttribute("d");
    const neutralPath = targetPath?.getAttribute("d");
    if (!targetPath || !neutralPath || !bakedHuffRecoilPathData) return;

    const huffRecoilPathData = translateSimplePath(
      bakedHuffRecoilPathData,
      -38,
      -39,
    );
    const animation = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate",
    );
    animation.setAttribute("attributeName", "d");
    animation.setAttribute("values", `${neutralPath};${huffRecoilPathData}`);
    animation.setAttribute("data-avatar-animation", "huff-recoil-expression");
    targetPath.appendChild(animation);
  });
  importPathAnimations(
    thinkingDocument,
    "#neutral-upper-arm-outline > animate[attributeName='d']",
  );

  svg.querySelectorAll("animate").forEach((animation) => {
    animation.setAttribute("begin", "indefinite");
    animation.setAttribute("repeatCount", "1");
    animation.setAttribute(
      "fill",
      animation.getAttribute("data-avatar-animation") === "blink"
        ? "remove"
        : "freeze",
    );
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

  const headNodes = [
    "neutral-head",
    "neutral-expression-suspicious-d362b6de",
    "neutral-Face",
    "neutral-glasses",
  ]
    .map((id) => svg.querySelector(`#${id}`))
    .filter((node): node is Element => Boolean(node));
  const firstHeadNode = headNodes[0];
  if (firstHeadNode?.parentNode && headNodes.length === 4) {
    const sway = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const tilt = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const sleepMotion = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g",
    );
    sway.id = "animated-avatar-head-sway";
    tilt.id = "animated-avatar-head-tilt";
    sleepMotion.id = "animated-avatar-sleep-motion";
    firstHeadNode.parentNode.insertBefore(sway, firstHeadNode);
    sway.appendChild(tilt);
    tilt.appendChild(sleepMotion);
    headNodes.forEach((node) => sleepMotion.appendChild(node));
  }

  return new XMLSerializer().serializeToString(svg);
}

export function AnimatedAvatar({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [markup, setMarkup] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    Promise.all(
      [
        AVATAR_SOURCE,
        EXPRESSION_SOURCE,
        THINKING_SOURCE,
        THINKING_EXPRESSION_SOURCE,
        CLOSED_EYES_SOURCE,
        ALTERNATE_NEUTRAL_SOURCE,
        SECONDARY_NEUTRAL_SOURCE,
        SLEEPING_SOURCE,
        HUFF_SOURCE,
        TIRED_SOURCE,
        HUFF_RECOIL_SOURCE,
        EYEROLL_SOURCE,
      ].map(async (source) => {
        const response = await fetch(source, { signal: controller.signal });
        if (!response.ok) {
          // The legacy wake-up huff is optional. Keeping its empty document in
          // the argument slot lets the avatar render when that asset is removed.
          if (source === HUFF_SOURCE && response.status === 404) {
            return "<svg xmlns=\"http://www.w3.org/2000/svg\" />";
          }
          throw new Error(
            `Could not load the animated avatar asset: ${source} (${response.status})`,
          );
        }
        return response.text();
      }),
    )
      .then(
        ([
          avatar,
          expressions,
          thinking,
          thinkingExpression,
          closedEyes,
          alternateNeutral,
          secondaryNeutral,
          sleeping,
          huff,
          tired,
          huffRecoil,
          eyeRoll,
        ]) =>
          prepareInlineSvg(
            avatar,
            expressions,
            thinking,
            thinkingExpression,
            closedEyes,
            alternateNeutral,
            secondaryNeutral,
            sleeping,
            huff,
            tired,
            huffRecoil,
            eyeRoll,
          ),
      )
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
      "#neutral-eyebrow > animate[attributeName='d'], #neutral-moustach-mouth > animate[attributeName='d']",
    );
    const armMorphAnimation = host.querySelector<SVGAnimateElement>(
      "#neutral-upper-arm-outline > animate[attributeName='d']",
    );
    const thinkingExpressionAnimations = host.querySelectorAll<SVGAnimateElement>(
      "animate[data-avatar-animation='thinking-expression']",
    );
    const blinkAnimations = host.querySelectorAll<SVGAnimateElement>(
      "animate[data-avatar-animation='blink']",
    );
    const restingExpressionAnimations = host.querySelectorAll<SVGAnimateElement>(
      "animate[data-avatar-animation='resting-expression']",
    );
    const restingEyelidAnimation = host.querySelector<SVGAnimateElement>(
      "#neutral-right-eye-lid > animate[data-avatar-animation='resting-expression']",
    );
    const restingMouthAnimation = host.querySelector<SVGAnimateElement>(
      "#neutral-moustach-mouth > animate[data-avatar-animation='resting-expression']",
    );
    const sleepingMouthAnimation = host.querySelector<SVGAnimateElement>(
      "animate[data-avatar-animation='sleeping-mouth']",
    );
    const huffAnimations = host.querySelectorAll<SVGAnimateElement>(
      "animate[data-avatar-animation='huff-expression']",
    );
    const tiredAnimations = host.querySelectorAll<SVGAnimateElement>(
      "animate[data-avatar-animation='tired-expression']",
    );
    const huffRecoilAnimations = host.querySelectorAll<SVGAnimateElement>(
      "animate[data-avatar-animation='huff-recoil-expression']",
    );
    const eyeRollAnimations = host.querySelectorAll<SVGAnimateElement>(
      "animate[data-avatar-animation='eyeroll-expression']",
    );
    const thinkingArm = host.querySelector<SVGGElement>(
      "#neutral-right-hand-and-forearm",
    );
    const thinkingElbow = host.querySelector<SVGGElement>(
      "#neutral-elbow-anchor",
    );
    const thinkingHead = host.querySelector<SVGGElement>(
      "#animated-avatar-head-tilt",
    );
    const sleepMotion = host.querySelector<SVGGElement>(
      "#animated-avatar-sleep-motion",
    );
    const eyeGroups = host.querySelectorAll<SVGGElement>(
      "#neutral-left-eye, #neutral-right-eye, #smile-left-eye, #smile-right-eye",
    );
    const headParts = host.querySelectorAll<SVGGElement>(
      "#animated-avatar-head-sway",
    );

    if (!breath || !neutral) return;

    neutral.style.display = "block";
    if (smile) smile.style.display = "none";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let cancelled = false;
    let smiling = false;
    let thinkingActive = false;
    let sleepingActive = false;
    let blinkTimer = 0;
    let eyelidTimer = 0;
    let sleepTimer = 0;
    let lightReactionTimer = 0;
    let alternateEyelidActive = false;
    let breathsUntilSmile = randomWholeNumber(
      BREATHS_BEFORE_SMILE.min,
      BREATHS_BEFORE_SMILE.max,
    );

    const removeFrozenAnimation = (animation: SVGAnimateElement) => {
      animation.setAttribute("fill", "remove");
      try {
        animation.endElement();
      } catch {
        // The animation may already be inactive; fill="remove" is sufficient.
      }
    };

    const resetSmilAnimation = (animation: SVGAnimateElement) => {
      const neutralPath =
        animation.dataset.originalValues?.split(";")[0] ??
        animation.getAttribute("values")?.split(";")[0];
      if (!neutralPath) {
        removeFrozenAnimation(animation);
        return;
      }

      animation.setAttribute("restart", "always");
      animation.setAttribute("values", `${neutralPath};${neutralPath}`);
      animation.setAttribute("keyTimes", "0;1");
      animation.setAttribute("calcMode", "linear");
      animation.setAttribute("dur", "1ms");
      animation.setAttribute("fill", "remove");
      animation.beginElement();
    };

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
        let neutralPath = paths[0];
        const smilePath = paths[2];
        if (!neutralPath || !smilePath) return;

        if (
          alternateEyelidActive &&
          animation.parentElement?.id === "neutral-moustach-mouth"
        ) {
          neutralPath =
            restingMouthAnimation?.dataset.originalValues?.split(";")[1] ??
            restingMouthAnimation?.getAttribute("values")?.split(";")[1] ??
            neutralPath;
        }

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

    let armAnimation: Animation | null = null;
    let elbowAnimation: Animation | null = null;
    let headTiltAnimation: Animation | null = null;
    let thinkingFidgetAnimation: Animation | null = null;

    if (thinkingElbow) {
      thinkingElbow.style.transformBox = "view-box";
      thinkingElbow.style.transformOrigin = "486.739px 652.787px";
      thinkingElbow.style.transform = "translate(-10px, -33px)";
    }

    const setThinkingPosture = (isThinking: boolean) => {
      if (
        !thinkingArm ||
        !thinkingElbow ||
        !thinkingHead ||
        reducedMotion.matches
      ) {
        return;
      }

      const postureDuration = isThinking ? 790 : 1_600;

      // If submission lands during a smile, smoothly release the eyebrow while
      // the thinking-specific mouth morph takes precedence below.
      if (isThinking && smiling) morphExpression(false);

      thinkingExpressionAnimations.forEach((animation) => {
        const originalValues =
          animation.dataset.originalValues ??
          animation.getAttribute("values") ??
          "";
        animation.dataset.originalValues = originalValues;
        const [neutralPath, thinkingPath] = originalValues.split(";");
        if (!neutralPath || !thinkingPath) return;

        let startPath = isThinking ? neutralPath : thinkingPath;
        let endPath = isThinking ? thinkingPath : neutralPath;
        if (animation.parentElement?.id === "neutral-right-eye-lid") {
          const alternatePath =
            restingEyelidAnimation?.getAttribute("values")?.split(";")[1];
          if (alternateEyelidActive && alternatePath) {
            if (isThinking) startPath = alternatePath;
            else endPath = alternatePath;
          }
        } else if (
          alternateEyelidActive &&
          animation.parentElement?.id === "neutral-moustach-mouth"
        ) {
          const warmPath =
            restingMouthAnimation?.dataset.originalValues?.split(";")[1] ??
            restingMouthAnimation?.getAttribute("values")?.split(";")[1];
          if (warmPath) {
            if (isThinking) startPath = warmPath;
            else endPath = warmPath;
          }
        }
        if (
          isThinking &&
          smiling &&
          animation.parentElement?.id === "neutral-moustach-mouth"
        ) {
          const smileAnimation = animation.parentElement.querySelector<SVGAnimateElement>(
            "animate:not([data-avatar-animation])",
          );
          startPath =
            smileAnimation?.dataset.originalValues?.split(";")[2] ?? startPath;
        }

        animation.setAttribute(
          "values",
          `${startPath};${endPath}`,
        );
        animation.setAttribute("keyTimes", "0;1");
        animation.setAttribute("keySplines", ".45 0 .55 1");
        animation.setAttribute("calcMode", "spline");
        animation.setAttribute("dur", `${postureDuration}ms`);
        animation.beginElement();
      });

      armAnimation?.cancel();
      elbowAnimation?.cancel();
      headTiltAnimation?.cancel();
      thinkingFidgetAnimation?.cancel();
      thinkingFidgetAnimation = null;
      thinkingArm.style.transformBox = "view-box";
      thinkingArm.style.transformOrigin = "486.739px 652.787px";
      armAnimation = thinkingArm.animate(
        isThinking
          ? [
              {
                transform: "rotate(0deg)",
                offset: 0,
                easing: "cubic-bezier(.22, .61, .36, 1)",
              },
              { transform: "rotate(127deg)", offset: 0.9, easing: "ease-out" },
              { transform: "rotate(125.869deg)", offset: 1 },
            ]
          : [
              {
                transform: "rotate(125.869deg)",
                offset: 0,
                easing: "cubic-bezier(.45, 0, .25, 1)",
              },
              { transform: "rotate(-0.55deg)", offset: 0.92, easing: "ease-out" },
              { transform: "rotate(0deg)", offset: 1 },
            ],
        {
          duration: postureDuration,
          easing: "linear",
          fill: "forwards",
        },
      );
      if (isThinking) {
        void armAnimation.finished
          .then(() => {
            if (!thinkingActive) return;
            thinkingFidgetAnimation = thinkingArm.animate(
              [
                {
                  transform: "rotate(125.869deg) translate(0, 0)",
                  offset: 0,
                },
                {
                  transform: "rotate(126.05deg) translate(1.4px, -0.9px)",
                  offset: 0.035,
                },
                {
                  transform: "rotate(125.82deg) translate(0.5px, -1.65px)",
                  offset: 0.07,
                },
                {
                  transform: "rotate(125.65deg) translate(-1.25px, -0.5px)",
                  offset: 0.105,
                },
                {
                  transform: "rotate(125.78deg) translate(-0.65px, 1.15px)",
                  offset: 0.14,
                },
                {
                  transform: "rotate(126.02deg) translate(1.15px, 0.5px)",
                  offset: 0.175,
                },
                {
                  transform: "rotate(125.869deg) translate(0, 0)",
                  offset: 0.21,
                },
                {
                  transform: "rotate(125.869deg) translate(0, 0)",
                  offset: 1,
                },
              ],
              {
                duration: 2_600,
                easing: "linear",
                iterations: Infinity,
              },
            );
          })
          .catch(() => {
            // A posture change intentionally cancels the entry animation.
          });
      }
      elbowAnimation = thinkingElbow.animate(
        isThinking
          ? [
              {
                transform: "translate(-10px, -33px)",
                offset: 0,
                easing: "cubic-bezier(.22, .61, .36, 1)",
              },
              {
                transform: "translate(0.35px, 0.7px)",
                offset: 0.9,
                easing: "ease-out",
              },
              { transform: "translate(0, 0)", offset: 1 },
            ]
          : [
              {
                transform: "translate(0, 0)",
                offset: 0,
                easing: "cubic-bezier(.45, 0, .25, 1)",
              },
              {
                transform: "translate(-10.2px, -33.5px)",
                offset: 0.92,
                easing: "ease-out",
              },
              { transform: "translate(-10px, -33px)", offset: 1 },
            ],
        {
          duration: postureDuration,
          easing: "linear",
          fill: "forwards",
        },
      );
      thinkingHead.style.transformBox = "view-box";
      thinkingHead.style.transformOrigin = "201.224px 270.292px";
      headTiltAnimation = thinkingHead.animate(
        isThinking
          ? [
              {
                transform: "rotate(0deg)",
                offset: 0,
                easing: "cubic-bezier(.22, .61, .36, 1)",
              },
              {
                transform: "rotate(11.18deg)",
                offset: 0.9,
                easing: "ease-out",
              },
              { transform: "rotate(10.983deg)", offset: 1 },
            ]
          : [
              {
                transform: "rotate(10.983deg)",
                offset: 0,
                easing: "cubic-bezier(.45, 0, .25, 1)",
              },
              { transform: "rotate(-0.1deg)", offset: 0.92, easing: "ease-out" },
              { transform: "rotate(0deg)", offset: 1 },
            ],
        {
          duration: postureDuration,
          easing: "linear",
          fill: "forwards",
        },
      );

      if (armMorphAnimation) {
        const originalValues =
          armMorphAnimation.dataset.originalValues ??
          armMorphAnimation.getAttribute("values") ??
          "";
        armMorphAnimation.dataset.originalValues = originalValues;
        const paths = originalValues.split(";");
        const neutralPath = paths[0];
        const thinkingPath = paths[2];
        if (neutralPath && thinkingPath) {
          armMorphAnimation.setAttribute(
            "values",
            isThinking
              ? `${neutralPath};${thinkingPath}`
              : `${thinkingPath};${neutralPath}`,
          );
          armMorphAnimation.setAttribute("keyTimes", "0;1");
          armMorphAnimation.setAttribute("keySplines", ".45 0 .55 1");
          armMorphAnimation.setAttribute("calcMode", "spline");
          armMorphAnimation.setAttribute("dur", `${postureDuration}ms`);
          armMorphAnimation.beginElement();
        }
      }
    };

    const handleThinkingChange = (event: Event) => {
      thinkingActive = (event as CustomEvent<boolean>).detail;
      window.clearTimeout(eyelidTimer);
      setThinkingPosture(thinkingActive);
      if (thinkingActive) {
        smiling = false;
        breathsUntilSmile = randomWholeNumber(
          BREATHS_BEFORE_SMILE.min,
          BREATHS_BEFORE_SMILE.max,
        );
      } else {
        scheduleRestingEyelid();
      }
    };
    window.addEventListener(AVATAR_THINKING_EVENT, handleThinkingChange);

    const setRestingEyelid = (useAlternate: boolean) => {
      if (
        !restingExpressionAnimations.length ||
        smiling ||
        thinkingActive ||
        sleepingActive
      ) {
        return;
      }
      restingExpressionAnimations.forEach((animation) => {
        const originalValues =
          animation.dataset.originalValues ??
          animation.getAttribute("values") ??
          "";
        animation.dataset.originalValues = originalValues;
        const [currentPath, alternatePath] = originalValues.split(";");
        if (!currentPath || !alternatePath) return;

        animation.setAttribute(
          "values",
          useAlternate
            ? `${currentPath};${alternatePath}`
            : `${alternatePath};${currentPath}`,
        );
        animation.setAttribute("keyTimes", "0;1");
        animation.setAttribute("keySplines", ".45 0 .55 1");
        animation.setAttribute("calcMode", "spline");
        animation.setAttribute("dur", "900ms");
        animation.beginElement();
      });
      alternateEyelidActive = useAlternate;
      scheduleRestingEyelid();
    };

    function scheduleRestingEyelid() {
      if (smiling || thinkingActive || sleepingActive) return;
      const dwell = alternateEyelidActive
        ? randomBetween(9_000, 15_000)
        : randomBetween(3_000, 5_000);
      eyelidTimer = window.setTimeout(
        () => setRestingEyelid(!alternateEyelidActive),
        dwell,
      );
    }

    eyelidTimer = window.setTimeout(() => setRestingEyelid(true), 900);

    const blink = () => {
      if (sleepingActive) return;
      blinkAnimations.forEach((animation) => {
        const originalValues =
          animation.dataset.originalValues ??
          animation.getAttribute("values") ??
          "";
        animation.dataset.originalValues = originalValues;
        const [neutralOpenPath, closedPath] = originalValues.split(";");
        if (!neutralOpenPath || !closedPath) return;

        let openPath = neutralOpenPath;
        if (thinkingActive) {
          const thinkingAnimation =
            animation.parentElement?.querySelector<SVGAnimateElement>(
              "animate[data-avatar-animation='thinking-expression']",
            );
          openPath =
            thinkingAnimation?.dataset.originalValues?.split(";")[1] ??
            thinkingAnimation?.getAttribute("values")?.split(";")[1] ??
            openPath;
        }

        animation.setAttribute(
          "values",
          `${openPath};${closedPath};${closedPath};${openPath}`,
        );
        animation.setAttribute("keyTimes", "0;.32;.68;1");
        animation.setAttribute(
          "keySplines",
          ".4 0 .6 1;.4 0 .6 1;.4 0 .6 1",
        );
        animation.setAttribute("calcMode", "spline");
        animation.setAttribute("dur", "240ms");
        animation.beginElement();
      });

      const doubleBlink = Math.random() < 0.18;
      blinkTimer = window.setTimeout(
        blink,
        doubleBlink
          ? 420
          : randomBetween(thinkingActive ? 2_400 : 4_000, 7_000),
      );
    };

    blinkTimer = window.setTimeout(blink, randomBetween(4_000, 7_000));

    let sleepAnimations: Animation[] = [];
    const startSleeping = () => {
      if (!thinkingHead || !sleepMotion) return;

      window.clearTimeout(lightReactionTimer);
      window.clearTimeout(sleepTimer);
      window.clearTimeout(blinkTimer);
      window.clearTimeout(eyelidTimer);
      lightReactionAnimations.forEach((animation) => animation.cancel());
      lightReactionAnimations = [];
      sleepAnimations.forEach((animation) => animation.cancel());
      sleepAnimations = [];
      huffRecoilAnimations.forEach(removeFrozenAnimation);
      blinkAnimations.forEach(removeFrozenAnimation);
      eyeRollAnimations.forEach(removeFrozenAnimation);
      sleepingActive = true;

      if (thinkingActive) {
        thinkingActive = false;
        setThinkingPosture(false);
      }
      if (smiling) {
        morphExpression(false);
        smiling = false;
      }

      tiredAnimations.forEach((animation) => {
        const originalValues =
          animation.dataset.originalValues ??
          animation.getAttribute("values") ??
          "";
        animation.dataset.originalValues = originalValues;
        animation.setAttribute("values", originalValues);
        animation.setAttribute("keyTimes", "0;1");
        animation.setAttribute("keySplines", ".42 0 1 1");
        animation.setAttribute("calcMode", "spline");
        animation.setAttribute("dur", "440ms");
        animation.setAttribute("fill", "freeze");
        animation.beginElement();
      });

      thinkingHead.style.transformBox = "view-box";
      thinkingHead.style.transformOrigin = "331.414px 470.816px";
      sleepAnimations.push(
        thinkingHead.animate(
          [
            { transform: "translateY(0) rotate(0deg) scale(1)" },
            { transform: "translateY(-9px) rotate(2.4deg) scale(1.025)" },
          ],
          {
            duration: 440,
            easing: "ease-in",
            fill: "forwards",
          },
        ),
      );

      sleepTimer = window.setTimeout(() => {
        headTiltAnimation?.cancel();
        tiredAnimations.forEach((animation) => {
          const id = animation.parentElement?.id;
          if (id?.includes("pupil") || id === "neutral-moustach-mouth") return;
          const [neutralPath, tiredPath] =
            animation.dataset.originalValues?.split(";") ?? [];
          if (!neutralPath || !tiredPath) return;
          animation.setAttribute("values", `${tiredPath};${neutralPath}`);
          animation.setAttribute("keyTimes", "0;1");
          animation.setAttribute("keySplines", ".25 .1 .25 1");
          animation.setAttribute("dur", "650ms");
          animation.beginElement();
        });
      thinkingHead.style.transformBox = "view-box";
      thinkingHead.style.transformOrigin = "331.414px 470.816px";
      sleepAnimations.push(
        thinkingHead.animate(
          [
            {
              transform:
                "translateY(-9px) rotate(2.4deg) scale(1.025)",
            },
            { transform: "rotate(-19.237deg)" },
          ],
          {
            duration: 650,
            easing: "ease",
            fill: "forwards",
          },
        ),
      );

      blinkAnimations.forEach((animation) => {
        const originalValues =
          animation.dataset.originalValues ??
          animation.getAttribute("values") ??
          "";
        animation.dataset.originalValues = originalValues;
        const [openPath, closedPath] = originalValues.split(";");
        if (!openPath || !closedPath) return;
        const tiredPupil = Array.from(tiredAnimations).find(
          (tiredAnimation) =>
            tiredAnimation.parentElement?.id === animation.parentElement?.id,
        );
        const tiredPath =
          tiredPupil?.dataset.originalValues?.split(";")[1] ?? openPath;
        animation.setAttribute("values", `${tiredPath};${closedPath}`);
        animation.setAttribute("keyTimes", "0;1");
        animation.setAttribute("keySplines", ".45 0 .55 1");
        animation.setAttribute("calcMode", "spline");
        animation.setAttribute("dur", "650ms");
        animation.setAttribute("fill", "freeze");
        animation.beginElement();
      });

      if (sleepingMouthAnimation) {
        const originalValues =
          sleepingMouthAnimation.dataset.originalValues ??
          sleepingMouthAnimation.getAttribute("values") ??
          "";
        sleepingMouthAnimation.dataset.originalValues = originalValues;
        sleepingMouthAnimation.setAttribute("fill", "freeze");
        const [neutralMouthPath, sleepingMouthPath] = originalValues.split(";");
        if (neutralMouthPath && sleepingMouthPath) {
          const tiredMouth = Array.from(tiredAnimations).find(
            (animation) =>
              animation.parentElement?.id === "neutral-moustach-mouth",
          );
          const startingMouthPath =
            tiredMouth?.dataset.originalValues?.split(";")[1] ??
            neutralMouthPath;

          sleepingMouthAnimation.setAttribute(
            "values",
            `${startingMouthPath};${sleepingMouthPath}`,
          );
          sleepingMouthAnimation.setAttribute("keyTimes", "0;1");
          sleepingMouthAnimation.setAttribute("keySplines", ".45 0 .55 1");
          sleepingMouthAnimation.setAttribute("calcMode", "spline");
          sleepingMouthAnimation.setAttribute("dur", "650ms");
          sleepingMouthAnimation.beginElement();
        }
      }

      sleepTimer = window.setTimeout(() => {
        sleepMotion.style.transformBox = "view-box";
        sleepMotion.style.transformOrigin = "220px 300px";
        const snoreAnimation = sleepMotion.animate(
          [
            { transform: "translateY(0) rotate(0deg) scale(1, 1)" },
            {
              transform:
                "translateY(1.4px) rotate(-0.18deg) scale(1.003, 1.006)",
            },
            { transform: "translateY(0) rotate(0deg) scale(1, 1)" },
          ],
          {
            duration: 750,
            easing: "ease-in-out",
            iterations: 4,
          },
        );
        sleepAnimations.push(
          snoreAnimation,
        );

        sleepTimer = window.setTimeout(() => {
          snoreAnimation.cancel();

          // A rapid wake-up flutter happens while the sleeping pose is held.
          blinkAnimations.forEach((animation) => {
            const [openPath, closedPath] =
              animation.dataset.originalValues?.split(";") ?? [];
            if (!openPath || !closedPath) return;
            animation.setAttribute(
              "values",
              `${closedPath};${openPath};${closedPath};${openPath};${closedPath};${openPath};${closedPath};${closedPath}`,
            );
            animation.setAttribute("keyTimes", "0;.13;.26;.39;.52;.65;.78;1");
            animation.setAttribute(
              "keySplines",
              ".35 0 .65 1;.35 0 .65 1;.35 0 .65 1;.35 0 .65 1;.35 0 .65 1;.35 0 .65 1;.35 0 .65 1",
            );
            animation.setAttribute("dur", "900ms");
            animation.beginElement();
          });

          sleepTimer = window.setTimeout(() => {
            sleepAnimations.push(
              thinkingHead.animate(
                [
                  { transform: "rotate(-19.237deg)" },
                  { transform: "rotate(0deg)" },
                ],
                {
                  duration: 650,
                  easing: "cubic-bezier(.45, 0, .25, 1)",
                  fill: "forwards",
                },
              ),
            );
            huffAnimations.forEach((animation) => {
              const originalValues =
                animation.dataset.originalValues ??
                animation.getAttribute("values") ??
                "";
              animation.dataset.originalValues = originalValues;
              animation.setAttribute("fill", "freeze");
              const [neutralPath, huffPath] = originalValues.split(";");
              if (!neutralPath || !huffPath) return;

              let startingPath = neutralPath;
              if (animation.parentElement?.id.includes("pupil")) {
                const blinkAnimation = Array.from(blinkAnimations).find(
                  (blink) => blink.parentElement?.id === animation.parentElement?.id,
                );
                startingPath =
                  blinkAnimation?.dataset.originalValues?.split(";")[1] ??
                  startingPath;
              }
              animation.setAttribute("values", `${startingPath};${huffPath}`);
              animation.setAttribute("keyTimes", "0;1");
              animation.setAttribute("keySplines", ".45 0 .55 1");
              animation.setAttribute("dur", "650ms");
              animation.beginElement();
            });
            if (sleepingMouthAnimation) {
              const [neutralMouthPath, sleepingMouthPath] =
                sleepingMouthAnimation.dataset.originalValues?.split(";") ?? [];
              if (neutralMouthPath && sleepingMouthPath) {
                const restingMouthPath = alternateEyelidActive
                  ? restingMouthAnimation?.dataset.originalValues?.split(
                      ";",
                    )[1] ??
                    restingMouthAnimation
                      ?.getAttribute("values")
                      ?.split(";")[1]
                  : undefined;
                sleepingMouthAnimation.setAttribute(
                  "values",
                  `${sleepingMouthPath};${restingMouthPath ?? neutralMouthPath}`,
                );
                sleepingMouthAnimation.setAttribute("dur", "650ms");
                sleepingMouthAnimation.beginElement();
              }
            }

            sleepTimer = window.setTimeout(() => {
              const huffVibration = sleepMotion.animate(
                [
                  { transform: "translate(0, 0) rotate(0deg)" },
                  { transform: "translate(-4.2px, 0.9px) rotate(-0.54deg)" },
                  { transform: "translate(4.5px, -0.9px) rotate(0.6deg)" },
                  { transform: "translate(-3.3px, 0.6px) rotate(-0.42deg)" },
                  { transform: "translate(3.75px, -0.54px) rotate(0.48deg)" },
                  { transform: "translate(0, 0) rotate(0deg)" },
                ],
                {
                  duration: 100,
                  iterations: 5,
                  easing: "linear",
                },
              );
              sleepAnimations.push(huffVibration);

              sleepTimer = window.setTimeout(() => {
                huffVibration.cancel();
                huffAnimations.forEach((animation) => {
                  const [neutralPath, huffPath] =
                    animation.dataset.originalValues?.split(";") ?? [];
                  if (!neutralPath || !huffPath) return;
                  animation.setAttribute("values", `${huffPath};${neutralPath}`);
                  animation.setAttribute("dur", "500ms");
                  animation.beginElement();
                });

                sleepTimer = window.setTimeout(() => {
                  sleepAnimations.forEach((animation) => animation.cancel());
                  sleepAnimations = [];
                  blinkAnimations.forEach(resetSmilAnimation);
                  tiredAnimations.forEach(resetSmilAnimation);
                  huffAnimations.forEach(resetSmilAnimation);
                  if (sleepingMouthAnimation) {
                    resetSmilAnimation(sleepingMouthAnimation);
                  }
                  sleepingActive = false;
                  sleepTimer = window.setTimeout(() => {
                    scheduleRestingEyelid();
                    blinkTimer = window.setTimeout(
                      blink,
                      randomBetween(4_000, 7_000),
                    );
                  }, 20);
                }, 500);
              }, 500);
            }, 650);
          }, 900);
        }, 3_000);
        }, 650);
      }, 440);
    };

    window.addEventListener(AVATAR_SLEEPING_EVENT, startSleeping);

    let lightReactionAnimations: Animation[] = [];
    const startLightReaction = () => {
      if (!thinkingHead) return;

      window.clearTimeout(sleepTimer);
      window.clearTimeout(blinkTimer);
      window.clearTimeout(eyelidTimer);
      window.clearTimeout(lightReactionTimer);
      sleepAnimations.forEach((animation) => animation.cancel());
      sleepAnimations = [];
      lightReactionAnimations.forEach((animation) => animation.cancel());
      lightReactionAnimations = [];
      if (sleepingMouthAnimation) {
        removeFrozenAnimation(sleepingMouthAnimation);
      }
      huffAnimations.forEach(removeFrozenAnimation);
      tiredAnimations.forEach(removeFrozenAnimation);
      blinkAnimations.forEach(removeFrozenAnimation);
      sleepingActive = true;

      if (thinkingActive) {
        thinkingActive = false;
        setThinkingPosture(false);
      }
      if (smiling) {
        smiling = false;
        morphExpression(false);
      }

      huffRecoilAnimations.forEach((animation) => {
        const originalValues =
          animation.dataset.originalValues ??
          animation.getAttribute("values") ??
          "";
        animation.dataset.originalValues = originalValues;
        const [neutralPath, recoilPath] = originalValues.split(";");
        if (!neutralPath || !recoilPath) return;
        const restingAnimation = alternateEyelidActive
          ? Array.from(restingExpressionAnimations).find(
              (resting) =>
                resting.parentElement?.id === animation.parentElement?.id,
            )
          : undefined;
        const warmRestingPath =
          restingAnimation?.dataset.originalValues?.split(";")[1] ??
          restingAnimation?.getAttribute("values")?.split(";")[1];
        animation.setAttribute(
          "values",
          `${warmRestingPath ?? neutralPath};${recoilPath}`,
        );
        animation.setAttribute("keyTimes", "0;1");
        animation.setAttribute("keySplines", ".42 0 1 1");
        animation.setAttribute("calcMode", "spline");
        animation.setAttribute("dur", "360ms");
        animation.setAttribute("fill", "freeze");
        animation.beginElement();
      });

      thinkingHead.style.transformBox = "view-box";
      thinkingHead.style.transformOrigin = "331.414px 470.816px";
      lightReactionAnimations.push(
        thinkingHead.animate(
          [
            { transform: "translateY(0) rotate(0deg) scale(1)" },
            { transform: "translate(38px, 39px)" },
          ],
          { duration: 360, easing: "ease-in", fill: "forwards" },
        ),
      );

      lightReactionTimer = window.setTimeout(() => {
        blinkAnimations.forEach((animation) => {
          const [, closedPath] =
            animation.dataset.originalValues?.split(";") ?? [];
          const recoilPupil = Array.from(huffRecoilAnimations).find(
            (recoilAnimation) =>
              recoilAnimation.parentElement?.id === animation.parentElement?.id,
          );
          const recoilPath =
            recoilPupil?.dataset.originalValues?.split(";")[1];
          if (!recoilPath || !closedPath) return;
          animation.setAttribute(
            "values",
            `${recoilPath};${closedPath};${recoilPath};${closedPath};${recoilPath};${closedPath};${recoilPath};${closedPath};${recoilPath}`,
          );
          animation.setAttribute(
            "keyTimes",
            "0;.125;.25;.375;.5;.625;.75;.875;1",
          );
          animation.setAttribute("calcMode", "linear");
          animation.setAttribute("dur", "640ms");
          animation.setAttribute("fill", "freeze");
          animation.beginElement();
        });

        lightReactionTimer = window.setTimeout(() => {
          lightReactionAnimations.push(
            thinkingHead.animate(
              [
                { transform: "translate(38px, 39px)" },
                { transform: "translate(0, 0)" },
              ],
              { duration: 420, easing: "ease", fill: "forwards" },
            ),
          );
          eyeRollAnimations.forEach((animation) => {
            const originalValues =
              animation.dataset.originalValues ??
              animation.getAttribute("values") ??
              "";
            animation.dataset.originalValues = originalValues;
            const [, eyeRollPath] = originalValues.split(";");
            const recoilAnimation = Array.from(huffRecoilAnimations).find(
              (recoil) =>
                recoil.parentElement?.id === animation.parentElement?.id,
            );
            const recoilPath =
              recoilAnimation?.dataset.originalValues?.split(";")[1];
            if (!recoilPath || !eyeRollPath) return;
            animation.setAttribute("values", `${recoilPath};${eyeRollPath}`);
            animation.setAttribute("keyTimes", "0;1");
            animation.setAttribute("keySplines", ".25 .1 .25 1");
            animation.setAttribute("calcMode", "spline");
            animation.setAttribute("dur", "420ms");
            animation.setAttribute("fill", "freeze");
            animation.beginElement();
          });

          lightReactionTimer = window.setTimeout(() => {
            eyeRollAnimations.forEach((animation) => {
              const [neutralPath, eyeRollPath] =
                animation.dataset.originalValues?.split(";") ?? [];
              if (!neutralPath || !eyeRollPath) return;
              const warmMouthPath =
                animation.parentElement?.id === "neutral-moustach-mouth" &&
                alternateEyelidActive
                  ? restingMouthAnimation?.dataset.originalValues?.split(
                      ";",
                    )[1] ??
                    restingMouthAnimation
                      ?.getAttribute("values")
                      ?.split(";")[1]
                  : undefined;
              animation.setAttribute(
                "values",
                `${eyeRollPath};${warmMouthPath ?? neutralPath}`,
              );
              animation.setAttribute("dur", "650ms");
              animation.beginElement();
            });
            lightReactionTimer = window.setTimeout(() => {
              lightReactionAnimations.forEach((animation) =>
                animation.cancel(),
              );
              lightReactionAnimations = [];
              huffRecoilAnimations.forEach(resetSmilAnimation);
              blinkAnimations.forEach(resetSmilAnimation);
              eyeRollAnimations.forEach(resetSmilAnimation);
              sleepingActive = false;
              lightReactionTimer = window.setTimeout(() => {
                scheduleRestingEyelid();
                blinkTimer = window.setTimeout(
                  blink,
                  randomBetween(4_000, 7_000),
                );
              }, 20);
            }, 650);
          }, 700);
        }, 640);
      }, 360);
    };

    window.addEventListener(AVATAR_LIGHT_REACTION_EVENT, startLightReaction);

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

        if (thinkingActive || sleepingActive) continue;

        // Expressions only change here, after exhale and rest have completed.
        if (smiling) {
          smiling = false;
          morphExpression(false);
          breathsUntilSmile = randomWholeNumber(
            BREATHS_BEFORE_SMILE.min,
            BREATHS_BEFORE_SMILE.max,
          );
          scheduleRestingEyelid();
        } else {
          breathsUntilSmile -= 1;
          if (breathsUntilSmile === 0) {
            window.clearTimeout(eyelidTimer);
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
      armAnimation?.cancel();
      elbowAnimation?.cancel();
      headTiltAnimation?.cancel();
      thinkingFidgetAnimation?.cancel();
      cancelAnimationFrame(gazeFrame);
      window.clearTimeout(blinkTimer);
      window.clearTimeout(eyelidTimer);
      window.clearTimeout(sleepTimer);
      window.clearTimeout(lightReactionTimer);
      sleepAnimations.forEach((animation) => animation.cancel());
      lightReactionAnimations.forEach((animation) => animation.cancel());
      window.removeEventListener("pointermove", updateGazeTarget);
      window.removeEventListener("pointerleave", resetGaze);
      window.removeEventListener("blur", resetGaze);
      window.removeEventListener(AVATAR_THINKING_EVENT, handleThinkingChange);
      window.removeEventListener(AVATAR_SLEEPING_EVENT, startSleeping);
      window.removeEventListener(
        AVATAR_LIGHT_REACTION_EVENT,
        startLightReaction,
      );
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
