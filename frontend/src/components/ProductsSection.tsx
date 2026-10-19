import { ArrowDown, Database, LockKeyhole, ShieldCheck, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Gamepad2, HeartHandshake, Leaf, Sparkles, Workflow } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import gumHome from "@/assets/case_studies/dont_touch_my_gum_home.svg";
import gumCode from "@/assets/case_studies/dont_touch_my_gum_code.gif";
import gumMusicProduction from "@/assets/case_studies/dont_touch_my_gum_musicprod.png";
import rendescoPrototype from "@/assets/case_studies/rendesco_protoype.svg";
import rendescoFlowHome from "@/assets/case_studies/rendesco_flow_home_view.svg";
import unifyGivingApp from "@/assets/case_studies/unify_giving_app.png";
import carequillDashboard1 from "@/assets/case_studies/carequill_ai_dashboard1.svg";
import carequillDashboard2 from "@/assets/case_studies/carequill_ai_dashboard2.svg";
import carequillDashboard3 from "@/assets/case_studies/carequill_ai_dashboard3.svg";
import carequillCalendar from "@/assets/case_studies/carequill_ai_calendar.svg";
import chatgioptApp from "@/assets/case_studies/chatgiopt_app.png";
import chatgioptDesign from "@/assets/case_studies/chatgiopt_design.png";
import type { RootProjectId } from "@/lib/root-navigation";

type ProductId = RootProjectId | "flowfree";

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
  architecture?: string[];
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
    id: "chatgiopt",
    number: "02",
    name: "ChatGioPT",
    shortName: "ChatGioPT",
    category: "AI portfolio assistant",
    description: "An illustrated portfolio assistant that helps recruiters and visitors explore my projects and professional experience through natural-language questions. I combined product design, UX/UI, custom SVG illustration, expressive animation and full-stack AI integration to make the experience approachable. Verified preset answers handle familiar questions, while retrieval-augmented generation grounds custom responses in curated portfolio records. A separate Azure Functions backend keeps retrieval, prompts and model credentials outside the publicly hosted frontend.",
    cta: { label: "Try ChatGioPT", href: "/ChatGioPT/" },
    architecture: ["Retrieval-Augmented Generation", "RAG", "Prompt Engineering", "Preset Answer Matching", "Contextual Retrieval", "Visitor Personalisation", "Serverless APIs", "Independent Deployments"],
    technologies: ["Azure OpenAI", "LangChain", "Azure Functions", "Next.js", "Figma", "TypeScript", "Tailwind CSS", "GitHub Pages"],
    proof: [],
    slides: [
      { id: "conversation", label: "Portfolio conversation", kind: "html", component: PrimaryProductVisual },
      { id: "app", label: "ChatGioPT app", kind: "image", src: chatgioptApp.src, alt: "ChatGioPT portfolio assistant interface", fit: "contain" },
      { id: "retrieval", label: "Grounded answer flow", kind: "html", component: AlternateProductVisual },
      { id: "design", label: "ChatGioPT design", kind: "image", src: chatgioptDesign.src, alt: "ChatGioPT illustration and interface design", fit: "contain" },
    ],
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
    category: "Paytech",
    description: "A mobile donation platform where I helped ship Stripe payments, improve API performance and refine the giving experience.",
    technologies: ["React Native", "Node.js", "PostgreSQL", "Stripe"],
    proof: [
      { value: "60%", label: "API performance improvement" },
      { value: "Stripe", label: "donations launched on mobile" },
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
    number: "04",
    name: "Don’t Touch My Gum!",
    shortName: "Don’t Touch My Gum!",
    category: "Indie Game",
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
    id: "carequill",
    number: "05",
    name: "Carequill AI",
    shortName: "Carequill AI",
    cta: { label: "Book consultation", href: "https://calendar.app.google/eE5FcZnghkSBCSpH8" },
    category: "Healthcare SAAS",
    description: "Private clinics often coordinate patient enquiries, appointments, payments and follow-ups across disconnected systems, making it difficult to identify stalled patients, unanswered messages and unclear ownership. This full-stack healthcare SaaS product brings those workflows into one operational view, translating clinic requirements into clear interfaces, relational data models and automated workflows. ServiceNow orchestration and a Python service layer connect risk prioritisation and responsibility routing with payment and scheduling APIs, supported by audit trails and escalation monitoring.",
    architecture: ["Event-Driven Systems", "Rules Engines", "State Machines", "Webhook Processing", "Role-Based Workflows", "Risk Prioritisation", "Audit Trails"],
    technologies: ["ServiceNow", "Python", "Stripe", "Google Calendar API", "Google Meet"],
    proof: [],
    slides: [
      { id: "workflow", label: "Workflow orchestration", kind: "html", component: PrimaryProductVisual },
      { id: "dashboard-3", label: "Dashboard 3", kind: "image", src: carequillDashboard3.src, alt: "Carequill AI dashboard, view 3", fit: "contain" },
      { id: "routing", label: "Responsibility routing", kind: "html", component: AlternateProductVisual },
      { id: "dashboard-1", label: "Dashboard 1", kind: "image", src: carequillDashboard1.src, alt: "Carequill AI dashboard, view 1", fit: "contain" },
      // { id: "dashboard-2", label: "Dashboard 2", kind: "image", src: carequillDashboard2.src, alt: "Carequill AI dashboard, view 2", fit: "contain" },
      // { id: "calendar", label: "Calendar", kind: "image", src: carequillCalendar.src, alt: "Carequill AI calendar", fit: "contain" },
    ],
  },
  // FlowFree is temporarily hidden. Uncomment to restore it as the last product.
  // {
  //   id: "flowfree",
  //   slides: [
  //     { id: "chat", label: "Private conversation", kind: "html", component: PrimaryProductVisual },
  //     { id: "home", label: "Your space", kind: "html", component: AlternateProductVisual },
  //   ],
  //   number: "06",
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
  if (id === "chatgiopt") return <Sparkles className="size-3" />;
  if (id === "carequill") return <Workflow className="size-3" />;
  if (id === "gum") return <Gamepad2 className="size-3" />;
  if (id === "flowfree" || id === "giving") return <HeartHandshake className="size-3" />;
  return <Leaf className="size-3" />;
}

function PrimaryProductVisual({ product }: { product: PortfolioProduct }) {
  return (
    <>
      {product.id === "chatgiopt" && (
        <div className="relative z-10 mx-auto my-3 w-[90%] max-w-64 -rotate-1 rounded-2xl border border-[#e7e1d9] bg-[#fbfaf7] p-4 text-stone-600 shadow-lg">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
            <span className="grid size-7 place-items-center rounded-full bg-[#e5d8c9] text-[#705144]"><Sparkles className="size-3" /></span>
            <div><h3 className="text-sm font-semibold text-[#705144]">ChatGioPT</h3><p className="text-[9px] text-stone-500">A little personality. Grounded answers.</p></div>
          </div>
          <div className="mt-4 ml-auto max-w-[90%] rounded-xl rounded-br-sm bg-[#705144] px-3 py-2 text-[10px] leading-relaxed text-white">What kind of products has Giovan worked on?</div>
          <div className="mt-3 max-w-[95%] rounded-xl rounded-bl-sm bg-[#eee8df] px-3 py-2 text-[10px] leading-relaxed">Explore healthcare workflows, clean energy, digital giving and independent games.</div>
          <div className="mt-4 flex flex-wrap gap-1.5">{["Projects", "Experience", "Skills"].map(label => <span key={label} className="rounded-full border border-stone-200 px-2 py-1 text-[9px]">{label}</span>)}</div>
          <p className="mt-3 text-[9px] uppercase tracking-wider text-stone-500">Illustrative conversation study</p>
        </div>
      )}
      {product.id === "carequill" && (
    <div className="relative z-10 mx-auto my-3 w-[90%] max-w-64 -rotate-1 rounded-2xl border border-[#e7e1d9] bg-[#fbfaf7] p-4 text-stone-600 shadow-lg">
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <span className="font-display text-base text-[#705144]">Carequill AI</span>
        <Workflow className="size-4 text-[#705144]" />
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-tight">Care, coordinated.</h3>
      <p className="mt-1 text-[10px] text-stone-500">From intake to the right next action.</p>
      <ol className="mt-4 space-y-2">
        {["Capture workflow event", "Evaluate risk and priority", "Route to the responsible team", "Monitor SLA and escalation"].map((label, index) => (
          <li key={label} className="flex items-center gap-2 rounded-lg bg-[#f1eee8] p-2 text-[10px]">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#e5d8c9] text-[#705144]">{index + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[9px] uppercase tracking-wider text-stone-500">Illustrative workflow study</p>
    </div>
      )}
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
          <div className="flex items-center justify-between"><div><span className="text-[9px] uppercase tracking-[.15em] text-[#8c8278]">Your home</span><p className="mt-1 font-display text-base text-ink dark:text-stone-600">Energy overview</p></div><span className="grid size-7 place-items-center rounded-full bg-[#e8eee5] text-[#61755e]"><Leaf className="size-3" /></span></div>
          <div className="my-4 flex h-18 items-end gap-1.5 border-b border-[#e5dfd7] px-1.5 sm:h-20">{[38, 60, 47, 77, 54, 88, 64, 75, 48, 67, 91, 58].map((height, index) => <span key={index} className="flex-1 rounded-t-sm bg-[#8aa180]/80" style={{ height: `${height}%` }} />)}</div>
          <div className="grid grid-cols-3 gap-1.5 text-center">{["Solar", "EV", "Heating"].map((item) => <div key={item} className="rounded-md bg-[#f1eee8] px-1.5 py-2 text-[10px] text-[#5f6558]">{item}</div>)}</div>
          <p className="mb-0 mt-3 text-[9px] uppercase tracking-[.12em] text-[#92877e]">Illustrative interface study</p>
        </div>
      )}

      {product.id === "giving" && (
        <div className="relative z-10 mx-auto my-3 w-[90%] max-w-64 rotate-1 rounded-2xl border border-[#e7e1d9] bg-[#fbfaf7] p-3 shadow-[0_18px_35px_rgba(53,39,31,.13)] sm:p-4">
          <span className="text-[9px] uppercase tracking-[.15em] text-[#8c8278]">Give a little good</span>
          <h3 className="mb-3 mt-1.5 font-display text-lg leading-tight text-ink dark:text-stone-600">Choose a cause<br /><em className="text-brand dark:text-stone-600">close to your heart.</em></h3>
          <div className="space-y-2">{["Community care", "Young people", "Local environment"].map((item, index) => <div key={item} className="flex items-center gap-2 rounded-lg border border-[#ece7e0] p-2"><span className={`grid size-6 place-items-center rounded-full ${index === 0 ? "bg-[#eaded1] text-brand" : "bg-[#f1eee8] text-[#81756c]"}`}><HeartHandshake className="size-3" /></span><span className="text-[10px] text-[#504943]">{item}</span><ArrowRight className="ml-auto size-2 text-[#9c8c7f]" /></div>)}</div>
          <p className="mb-0 mt-3 text-[9px] uppercase tracking-[.12em] text-[#92877e]">Illustrative interface study</p>
        </div>
      )}

    </>
  );
}

function AlternateProductVisual({ product }: { product: PortfolioProduct }) {
  if (product.id === "chatgiopt") return (
    <figure className="relative z-10 mx-auto my-3 w-full max-w-sm overflow-hidden rounded-xl border border-[#455950] bg-[#17211f] p-4 text-[#e8eee8] shadow-xl">
      <div className="mb-4 flex items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div>
          <span className="font-mono text-[8px] uppercase tracking-[.15em] text-[#a5b7ac]">ChatGioPT / system architecture</span>
          <h3 className="mt-1 text-sm font-semibold tracking-tight">Retrieve. Validate. Respond.</h3>
        </div>
        <ShieldCheck className="size-5 shrink-0 text-[#b8cdb9]" aria-hidden="true" />
      </div>

      <div className="rounded-lg border border-white/15 bg-white/[.03] p-3">
        <span className="font-mono text-[8px] uppercase tracking-widest text-[#a5b7ac]">01 / Public client · GitHub Pages</span>
        <div className="mt-2 rounded border border-[#728d7b]/50 bg-[#24352c] px-2 py-2 text-center text-[10px] font-medium">Question + visitor context</div>
        <ArrowDown className="mx-auto my-1 size-3 text-[#a5b7ac]" aria-hidden="true" />
        <div className="rounded border border-[#bba58c]/50 bg-[#34332b] px-2 py-2 text-center text-[10px] font-medium">Intent gate → preset confidence score</div>
        <div className="mx-auto h-2 w-px bg-[#728d7b]" aria-hidden="true" />
        <div className="grid grid-cols-2 gap-2 border-t border-[#728d7b] pt-2">
          <div className="rounded border border-[#728d7b]/50 bg-[#24352c] px-2 py-2 text-center">
            <span className="block font-mono text-[8px] uppercase text-[#b8cdb9]">Local match</span>
            <span className="mt-1 block text-[10px]">Verified answer</span>
            <span className="mt-1 block text-[8px] text-[#a5b7ac]">No model request</span>
          </div>
          <div className="rounded border border-[#bba58c]/50 bg-[#34332b] px-2 py-2 text-center">
            <span className="block font-mono text-[8px] uppercase text-[#e0c9ac]">Low confidence</span>
            <span className="mt-1 block text-[10px]">POST /api/chat</span>
            <span className="mt-1 block text-[8px] text-[#c6bbab]">Selected context only</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 py-2 pr-6 font-mono text-[8px] text-[#c5d5c7]">
        <LockKeyhole className="size-3" aria-hidden="true" /> HTTPS <ArrowDown className="size-3" aria-hidden="true" />
      </div>
      <div className="rounded-lg border border-dashed border-[#96b59b] bg-[#1c2d23] p-3">
        <div className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-widest text-[#b8cdb9]">
          <ShieldCheck className="size-3" aria-hidden="true" /> 02 / Server boundary · Azure Functions
        </div>
        <div className="mt-2 rounded border border-white/15 bg-black/15 px-2 py-2 text-center text-[10px]">Request validation + abuse checks</div>
        <ArrowDown className="mx-auto my-1 size-3 text-[#a5b7ac]" aria-hidden="true" />
        <div className="flex items-center gap-1.5">
          <div className="flex min-w-0 flex-1 flex-col items-center rounded border border-white/15 bg-black/15 px-1.5 py-2 text-center">
            <Database className="mb-1 size-3 text-[#b8cdb9]" aria-hidden="true" />
            <span className="text-[10px]">Curated records</span>
            <span className="text-[8px] text-[#a5b7ac]">LangChain retrieval</span>
          </div>
          <ArrowRight className="size-3 shrink-0 text-[#b8cdb9]" aria-hidden="true" />
          <div className="flex min-w-0 flex-1 flex-col items-center rounded border border-[#bba58c]/50 bg-[#34332b] px-1.5 py-2 text-center">
            <Sparkles className="mb-1 size-3 text-[#e0c9ac]" aria-hidden="true" />
            <span className="text-[10px]">Azure OpenAI</span>
            <span className="text-[8px] text-[#c6bbab]">Grounded generation</span>
          </div>
        </div>
        <div className="mt-2 flex items-start gap-1.5 rounded bg-black/20 px-2 py-2 text-[9px] leading-relaxed text-[#bfd0c2]">
          <LockKeyhole className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
          Prompts, retrieval rules and model credentials stay server-side.
        </div>
      </div>
      <ArrowDown className="mx-auto my-1.5 size-3 text-[#a5b7ac]" aria-hidden="true" />
      <div className="rounded border border-[#728d7b]/50 px-2 py-2 text-center text-[10px]">Grounded answer + validated references</div>
      <figcaption className="mt-3 font-mono text-[8px] uppercase tracking-widest text-[#91a397]">Illustrative architecture · client / server separation</figcaption>
    </figure>
  );
  if (product.id === "carequill") return (
    <div className="relative z-10 mx-auto my-3 w-[90%] max-w-64 rotate-1 rounded-2xl border border-[#e7e1d9] bg-[#fbfaf7] p-4 text-stone-600 shadow-lg">
      <span className="text-[9px] uppercase tracking-wider text-[#705144]">Carequill AI · Responsibility routing</span>
      <h3 className="mt-3 text-lg font-semibold leading-tight">Every event.<br />A clear next step.</h3>
      <div className="mt-4 space-y-2">
        {[
          ["Payment webhook", "Validate → process once → update state"],
          ["Scheduling event", "Calendar → meeting → workflow update"],
          ["Risk threshold", "Prioritise → assign → escalate"],
        ].map(([title, detail]) => (
          <div key={title} className="rounded-lg border border-stone-200 p-2.5">
            <strong className="block text-xs font-medium">{title}</strong>
            <span className="mt-1 block text-[10px] text-stone-500">{detail}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[9px] uppercase tracking-wider text-stone-500">Illustrative routing study</p>
    </div>
  );
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

function ProductSlideVisual({ slide, product }: { slide: ProductSlide; product: PortfolioProduct }) {
  if (slide.kind === "image") return <ProductImageVisual key={slide.src} slide={slide} />;
  const Visual = slide.component;
  return <Visual product={product} />;
}

function ProductArtwork({ product }: { product: PortfolioProduct }) {
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
        <span className="sr-only" aria-live={rotationMode === "automatic" ? "off" : "polite"} aria-atomic="true">Slide {activeSlide + 1} of {slideCount}: {slide.label}</span>
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
