import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Gamepad2, HeartHandshake, Leaf } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type ComponentType } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import gumHome from "@/assets/case_studies/dont_touch_my_gum_home.svg";
import gumCode from "@/assets/case_studies/dont_touch_my_gum_code.gif";
import gumMusicProduction from "@/assets/case_studies/dont_touch_my_gum_musicprod.png";
import rendescoPrototype from "@/assets/case_studies/rendesco_protoype.svg";
import rendescoFlowHome from "@/assets/case_studies/rendesco_flow_home_view.svg";
import unifyGivingApp from "@/assets/case_studies/unify_giving_app.png";

type ProductId = "gum" | "flowfree" | "rendesco" | "giving";

type ProductProof = { value: string; label: string };

type ProductSlide = {
  id: string;
  label: string;
} & (
  | { kind: "html"; component: ComponentType<{ product: PortfolioProduct }> }
  | { kind: "image"; src: string; alt: string; fit?: "contain" | "cover"; caption?: string }
);

type PortfolioProduct = {
  id: ProductId;
  number: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  cta?: { label: string; href: string };
  technologies: string[];
  proof: ProductProof[];
  slides: [ProductSlide, ...ProductSlide[]];
};

const products: PortfolioProduct[] = [
  {
    id: "rendesco",
    slides: [
      { id: "overview", label: "Energy overview", kind: "html", component: PrimaryProductVisual },
      { id: "prototype", label: "HEMS prototype", kind: "image", src: rendescoPrototype.src, alt: "Rendesco home energy management prototype", fit: "contain" },
      { id: "solar", label: "Solar generation", kind: "html", component: AlternateProductVisual },
      { id: "flow-home", label: "Flow home view", kind: "image", src: rendescoFlowHome.src, alt: "Rendesco Flow home view", fit: "contain" },
    ],
    number: "01",
    name: "Home Energy Management",
    shortName: "Rendesco Flow",
    cta: { label: "Learn more", href: "https://www.rendesco.com/rendescocare" },
    category: "Clean energy",
    description: "A customer-facing energy app shaped around household solar, electric vehicle and heat-pump data. I contributed to mobile interface design and supporting APIs.",
    technologies: ["React Native", "FastAPI", "Azure", "PostgreSQL"],
    proof: [
      { value: "Solar", label: "generation insights" },
      { value: "EV + heat pump", label: "home energy data" },
    ],
  },
  {
    id: "gum",
    slides: [
      { id: "game", label: "Game artwork", kind: "html", component: PrimaryProductVisual },
      { id: "home", label: "Home screen", kind: "image", src: gumHome.src, alt: "Don’t Touch My Gum! home screen", fit: "contain" },
      { id: "code", label: "Game code", kind: "image", src: gumCode.src, alt: "Animated view of the Don’t Touch My Gum! code", fit: "contain" },
      { id: "levels", label: "Level select", kind: "html", component: AlternateProductVisual },
      { id: "music-production", label: "Music production", kind: "image", src: gumMusicProduction.src, alt: "Music production for Don’t Touch My Gum!", fit: "contain" },
    ],
    number: "02",
    name: "Don’t Touch My Gum!",
    shortName: "Don’t Touch My Gum!",
    category: "Independent game",
    description: "A desktop mini-game I took from idea to release, bringing together code, illustration, interface design and electronic music production.",
    technologies: ["Python", "PyGame", "Figma", "Procreate", "Ableton"],
    proof: [
      { value: "100+", label: "players in its first month" },
      { value: "44", label: "peak concurrent players" },
      { value: "Featured", label: "in the PyGame WebAssembly Collection" },
    ],
    cta: { label: "Play Now", href: "https://giovanaaron.itch.io/dont-touch-my-gum-cv" },
  },
  {
    id: "giving",
    slides: [
      { id: "causes", label: "Choose a cause", kind: "html", component: PrimaryProductVisual },
      { id: "app", label: "Unify Giving app", kind: "image", src: unifyGivingApp.src, alt: "Unify Giving mobile app", fit: "contain" },
      { id: "confirmation", label: "Donation confirmation", kind: "html", component: AlternateProductVisual },
    ],
    number: "03",
    name: "Unify Giving",
    shortName: "Unify Giving",
    cta: { label: "Learn more", href: "https://unifygiving.com/about/" },
    category: "Digital giving",
    description: "A mobile donation platform where I helped ship Stripe payments, improve API performance and refine the giving experience.",
    technologies: ["React Native", "Node.js", "PostgreSQL", "Stripe"],
    proof: [
      { value: "60%", label: "API performance improvement" },
      { value: "Stripe", label: "donations launched on mobile" },
    ],
  },
  // FlowFree is temporarily hidden. Uncomment to restore it as the last product.
  // {
  //   id: "flowfree",
  //   slides: [
  //     { id: "chat", label: "Private conversation", kind: "html", component: PrimaryProductVisual },
  //     { id: "home", label: "Your space", kind: "html", component: AlternateProductVisual },
  //   ],
  //   number: "04",
  //   name: "FlowFree",
  //   shortName: "FlowFree",
  //   category: "Mental wellbeing",
  //   description: "An anonymous peer-support platform connecting employees with trained Champions. I worked on private chat, accessible journeys and real-time safety feedback.",
  //   technologies: ["React", "Socket.IO", "FastAPI", "MongoDB"],
  //   proof: [
  //     { value: "Anonymous", label: "peer-support conversations" },
  //     { value: "Real time", label: "moderation and safety feedback" },
  //   ],
  // },

];

function ProductMark({ id }: { id: ProductId }) {
  if (id === "gum") return <Gamepad2 className="size-3" />;
  if (id === "flowfree" || id === "giving") return <HeartHandshake className="size-3" />;
  return <Leaf className="size-3" />;
}

function PrimaryProductVisual({ product }: { product: PortfolioProduct }) {
  return (
    <>
      {product.id === "gum" && (
        <div className="relative z-10 mx-auto my-3 flex min-h-44 w-[88%] max-w-64 -rotate-2 flex-col justify-between overflow-hidden bg-[#705144] p-4 text-[#f8f7f5] shadow-[0_18px_35px_rgba(53,39,31,.18)] sm:min-h-52 sm:p-5">
          <span className="text-[9px] uppercase tracking-[.17em] text-[#ead9c9]">A little indie game</span>
          <div className="relative py-3">
            <div className="absolute -right-3 top-1 size-18 rounded-full bg-[#f4b0a3] shadow-[inset_-12px_-8px_0_rgba(144,68,62,.18)] sm:size-24" />
            <div className="relative text-2xl sm:text-4xl font-semibold uppercase leading-[.88] tracking-[-.07em]">Don’t<br />touch<br /><span className="font-[Georgia,serif] font-normal italic text-[#f4b0a3]">my gum!</span></div>
          </div>
          <span className="text-[9px] uppercase tracking-[.16em] text-[#ead9c9]">Play nice. Protect your gum.</span>
        </div>
      )}

      {product.id === "flowfree" && (
        <div className="relative z-10 mx-auto my-3 w-[90%] max-w-64 rotate-1 rounded-2xl border border-[#e7e1d9] bg-[#fbfaf7] p-3 shadow-[0_18px_35px_rgba(53,39,31,.13)] sm:p-4">
          <div className="flex items-center justify-between border-b border-line pb-2"><span className="font-display text-sm text-brand">flowfree</span><span className="size-1.5 rounded-full bg-[#88a28b]" /></div>
          <div className="py-3"><span className="rounded-full bg-[#eee8df] px-2 py-1 text-[9px] uppercase tracking-wider text-[#827870]">Check-in</span><p className="mt-2 font-display text-base leading-snug text-ink">How are things feeling today?</p></div>
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[#e9eee7] px-2.5 py-2 text-[10px] leading-relaxed text-[#48584a]">A bit heavy, but talking it through might help.</div>
          <div className="mt-2 max-w-[75%] rounded-2xl rounded-bl-sm bg-[#f0ece7] px-2.5 py-2 text-[10px] leading-relaxed text-[#5f5650]">Thanks for sharing that with me.</div>
          <div className="mt-4 flex items-center gap-1.5 border-t border-line pt-2"><span className="h-1.5 flex-1 rounded-full bg-[#d7dfd4]" /><span className="text-[9px] text-muted">Private by design</span></div>
        </div>
      )}

      {product.id === "rendesco" && (
        <div className="relative z-10 mx-auto my-3 w-[90%] max-w-64 -rotate-1 rounded-xl border border-[#e0dacf] bg-[#fbfaf7] p-3 shadow-[0_18px_35px_rgba(53,39,31,.13)] sm:p-4">
          <div className="flex items-center justify-between"><div><span className="text-[9px] uppercase tracking-[.15em] text-[#8c8278]">Your home</span><p className="mt-1 font-display text-base text-ink">Energy overview</p></div><span className="grid size-7 place-items-center rounded-full bg-[#e8eee5] text-[#61755e]"><Leaf className="size-3" /></span></div>
          <div className="my-4 flex h-18 items-end gap-1.5 border-b border-[#e5dfd7] px-1.5 sm:h-20">{[38, 60, 47, 77, 54, 88, 64, 75, 48, 67, 91, 58].map((height, index) => <span key={index} className="flex-1 rounded-t-sm bg-[#8aa180]/80" style={{ height: `${height}%` }} />)}</div>
          <div className="grid grid-cols-3 gap-1.5 text-center">{["Solar", "EV", "Heating"].map((item) => <div key={item} className="rounded-md bg-[#f1eee8] px-1.5 py-2 text-[10px] text-[#5f6558]">{item}</div>)}</div>
          <p className="mb-0 mt-3 text-[9px] uppercase tracking-[.12em] text-[#92877e]">Illustrative interface study</p>
        </div>
      )}

      {product.id === "giving" && (
        <div className="relative z-10 mx-auto my-3 w-[90%] max-w-64 rotate-1 rounded-2xl border border-[#e7e1d9] bg-[#fbfaf7] p-3 shadow-[0_18px_35px_rgba(53,39,31,.13)] sm:p-4">
          <span className="text-[9px] uppercase tracking-[.15em] text-[#8c8278]">Give a little good</span>
          <h3 className="mb-3 mt-1.5 font-display text-lg leading-tight text-ink">Choose a cause<br /><em className="text-brand">close to your heart.</em></h3>
          <div className="space-y-2">{["Community care", "Young people", "Local environment"].map((item, index) => <div key={item} className="flex items-center gap-2 rounded-lg border border-[#ece7e0] p-2"><span className={`grid size-6 place-items-center rounded-full ${index === 0 ? "bg-[#eaded1] text-brand" : "bg-[#f1eee8] text-[#81756c]"}`}><HeartHandshake className="size-3" /></span><span className="text-[10px] text-[#504943]">{item}</span><ArrowRight className="ml-auto size-2 text-[#9c8c7f]" /></div>)}</div>
          <p className="mb-0 mt-3 text-[9px] uppercase tracking-[.12em] text-[#92877e]">Illustrative interface study</p>
        </div>
      )}

    </>
  );
}

function AlternateProductVisual({ product }: { product: PortfolioProduct }) {
  const common = "relative z-10 mx-auto my-3 w-[90%] max-w-64 rounded-2xl border border-[#e7e1d9] bg-[#fbfaf7] p-4 shadow-[0_18px_35px_rgba(53,39,31,.13)] sm:p-5";
  if (product.id === "gum") return (
    <div className={`${common} rotate-2`}>
      <div className="flex items-center justify-between"><span className="text-[9px] uppercase tracking-[.16em] text-[#8c8278]">Level select</span><Gamepad2 className="size-3 text-brand" /></div>
      <h3 className="mb-4 mt-2 text-lg font-semibold leading-tight tracking-[-.04em] text-[#22201e]">One tiny gum.<br /><em className="font-[Georgia,serif] font-normal text-[#705144]">A lot of trouble.</em></h3>
      <div className="grid grid-cols-3 gap-1.5">{["01", "02", "03"].map((level, i) => <div key={level} className={`grid aspect-square place-items-center rounded-xl ${i === 0 ? "bg-[#f4b0a3] text-brand" : "bg-[#eee8df] text-[#9a8c80]"}`}><span className="font-display text-base">{level}</span></div>)}</div>
      <p className="mb-0 mt-3 text-[9px] uppercase tracking-[.12em] text-[#92877e]">Illustrative game menu study</p>
    </div>
  );
  if (product.id === "flowfree") return (
    <div className={`${common} -rotate-1`}>
      <div className="flex items-center justify-between border-b border-[#e3dcd4] pb-2"><span className="text-sm font-semibold tracking-[-.04em] text-[#705144]">flowfree</span><span className="text-[9px] uppercase tracking-wider text-[#8c8278]">Your space</span></div>
      <h3 className="mb-3 mt-3 font-display text-base leading-snug text-ink">A private space to talk, at your pace.</h3>
      <div className="space-y-2">{[["Today", "A gentle check-in"], ["Messages", "Continue a conversation"], ["Resources", "Find a little support"]].map(([title, detail]) => <div key={title} className="flex items-center gap-2 rounded-lg bg-[#f1eee8] p-2"><span className="size-1.5 rounded-full bg-[#88a28b]" /><span><strong className="block text-[10px] font-medium text-[#504943]">{title}</strong><small className="text-[10px] text-[#817870]">{detail}</small></span><ArrowRight className="ml-auto size-2 text-[#9c8c7f]" /></div>)}</div>
      <p className="mb-0 mt-3 text-[9px] uppercase tracking-[.12em] text-[#92877e]">Illustrative product view</p>
    </div>
  );
  if (product.id === "rendesco") return (
    <div className={`${common} rotate-1`}>
      <div className="flex items-center justify-between"><div><span className="text-[9px] uppercase tracking-[.15em] text-[#8c8278]">Today at home</span><p className="mt-1 text-base font-semibold tracking-[-.035em] text-[#22201e]">Energy in balance</p></div><span className="grid size-7 place-items-center rounded-full bg-[#e8eee5] text-[#61755e]"><Leaf className="size-3" /></span></div>
      <div className="my-4 rounded-xl bg-[#eef1e9] p-3"><span className="text-[9px] uppercase tracking-[.12em] text-[#75806b]">Solar generation</span><strong className="mt-1 block font-display text-2xl font-normal text-[#506548]">8.4 <small className="text-xs">kWh</small></strong><div className="mt-3 flex h-10 items-end gap-1.5">{[35, 58, 44, 76, 61, 94, 71, 84, 60, 73, 98, 67].map((height, i) => <span key={i} className="flex-1 rounded-t-sm bg-[#8aa180]/80" style={{ height: `${height}%` }} />)}</div></div>
      <div className="flex justify-between text-[10px] text-[#5f6558]"><span>Home battery</span><span>Charging · 72%</span></div>
      <p className="mb-0 mt-3 text-[9px] uppercase tracking-[.12em] text-[#92877e]">Illustrative interface study</p>
    </div>
  );
  return (
    <div className={`${common} -rotate-1`}>
      <span className="text-[9px] uppercase tracking-[.15em] text-[#8c8278]">Thank you for giving</span>
      <div className="mx-auto my-4 grid size-12 place-items-center rounded-full bg-[#e8eee5] text-[#61755e]"><HeartHandshake className="size-5" /></div>
      <h3 className="mb-0 text-center text-lg font-semibold leading-tight tracking-[-.04em] text-[#22201e]">Your kindness<br /><em className="font-[Georgia,serif] font-normal text-[#705144]">moves us forward.</em></h3>
      <p className="mb-0 mt-2 text-center text-[10px] text-[#817870]">Donation complete · Thank you for making a difference.</p>
      <p className="mb-0 mt-4 text-center text-[9px] uppercase tracking-[.12em] text-[#92877e]">Illustrative confirmation screen</p>
    </div>
  );
}

function ProductImageVisual({ slide }: { slide: Extract<ProductSlide, { kind: "image" }> }) {
  const [hasError, setHasError] = useState(false);
  return (
    <figure className="mx-auto my-3 w-full max-w-sm lg:absolute lg:left-1/2 lg:top-1/2 lg:my-0 lg:w-[115%] lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2">
      {hasError ? (
        <div role="status" className="bg-background/70 text-muted-foreground flex aspect-[4/3] items-center justify-center rounded-lg p-4 text-center text-xs">
          Image unavailable: {slide.alt}
        </div>
      ) : (
        // Source images intentionally use native img alongside the HTML/CSS slides.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={slide.src}
          alt={slide.alt}
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
          className={`mx-auto aspect-[4/3] w-full max-w-[90%] rounded-lg lg:aspect-auto lg:h-80 ${slide.fit === "cover" ? "object-cover" : "object-contain"}`}
        />
      )}
      {slide.caption ? <figcaption className="text-muted-foreground mt-2 text-center text-[10px]">{slide.caption}</figcaption> : null}
    </figure>
  );
}

function ProductSlideVisual({ slide, product }: { slide: ProductSlide; product: PortfolioProduct }) {
  if (slide.kind === "image") return <ProductImageVisual slide={slide} />;
  const Visual = slide.component;
  return <Visual product={product} />;
}

function ProductArtwork({ product }: { product: PortfolioProduct }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const reduceMotion = useReducedMotion();
  const slideCount = product.slides.length;
  const slide = product.slides[activeSlide] ?? product.slides[0];
  function moveSlide(direction: number) {
    setActiveSlide(current => (current + direction + slideCount) % slideCount);
  }
  return (
    <div role="region" aria-roledescription="carousel" aria-label={`${product.name} visuals`} className={`relative flex min-h-64 flex-col justify-between bg-[#eee7df] p-4 sm:min-h-80 sm:p-5 dark:bg-[#29231f] ${slide.kind === "image" ? "overflow-hidden lg:overflow-visible" : "overflow-hidden"}`}>
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
        <span className="text-[10px] uppercase tracking-[.14em] text-[#706c67] dark:text-[#c6bcb4]">{product.number} / {String(products.length).padStart(2, "0")} · {product.category}</span>
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
        <span className="sr-only" aria-live="polite" aria-atomic="true">Slide {activeSlide + 1} of {slideCount}: {slide.label}</span>
      </div>
    </div>
  );
}

function ProductPanel({ product }: { product: PortfolioProduct }) {
  return (
    <motion.div key={product.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.32, ease: "easeOut" }} className="grid gap-4 lg:grid-cols-[minmax(190px,.95fr)_minmax(210px,1fr)] lg:gap-6">
      <ProductArtwork product={product} />
      <div className="flex flex-col py-1 sm:py-2">
        <div className="flex items-center justify-between gap-2 text-[9px] font-bold uppercase tracking-[.15em] text-[#705144] dark:text-[#d1ad98]">
          <span>{product.number} / {String(products.length).padStart(2, "0")} · {product.category}</span>
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
        <div className="mt-4">
          <h4 className="mb-2 text-[9px] font-bold uppercase tracking-[.14em] text-[#705144] dark:text-[#d1ad98]">Tools & technologies</h4>
          <div className="flex flex-wrap gap-1.5">{product.technologies.map((tech) => <span key={tech} className="rounded-full border border-[#dfd6cd] bg-[#fffdfa] px-2.5 py-1.5 text-[10px] text-[#5e5650] dark:border-[#554940] dark:bg-[#28231f] dark:text-[#e7ddd5]">{tech}</span>)}</div>
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 border-t border-[#ded7ce] pt-4 sm:mt-6">
          {product.proof.map((item) => <div key={item.label} className="min-h-16 bg-[#fffdfa]/75 p-3 dark:bg-[#28231f]">
            <strong className="block text-base font-semibold leading-tight tracking-[-.035em] text-[#705144] dark:text-[#d1ad98]">{item.value}</strong>
            <span className="mt-1.5 block text-[10px] leading-relaxed text-[#706c67] dark:text-[#c6bcb4]">{item.label}</span>
          </div>)}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductsSection() {
  const [selectedProductId, setSelectedProductId] = useState<ProductId>("rendesco");
  const selectedProduct = products.find((product) => product.id === selectedProductId) ?? products[0];
  return (
    <section id="products" className="scroll-mt-6 border-t border-[#e2dbd3] bg-[rgb(241,238,233)] py-8 text-left sm:py-8 dark:border-[#443b34] dark:bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <div className="mb-7 grid gap-4 md:mb-9 md:grid-cols-[1.1fr_.8fr] md:items-end">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.16em] text-[#705144] before:h-px before:w-4 before:bg-[#cba58b] dark:text-[#d1ad98] dark:before:bg-[#d1ad98] sm:text-[10px]">Selected work</div>
            <h2 className="mb-0 mt-5 max-w-2xl text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1] tracking-[-.065em] text-[#22201e] dark:text-[#f5f0eb]">Ideas, care and <em className="font-[Georgia,serif] font-normal text-[#705144] dark:text-[#d1ad98]">things I’ve made.</em></h2>
          </div>
          <p className="mb-1 max-w-96 text-xs leading-[1.8] text-[#706c67] dark:text-muted-foreground md:justify-self-end lg:text-sm">Independent creative work and product teams, from playful games to tools for wellbeing, energy and giving.</p>
        </div>

        <Tabs value={selectedProductId} onValueChange={(value) => setSelectedProductId(value as ProductId)} orientation="vertical" className="gap-0">
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
                <ProductPanel key={selectedProduct.id} product={selectedProduct} />
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
