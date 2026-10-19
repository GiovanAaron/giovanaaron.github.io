import type { PortfolioProduct } from "@/types/products";
import gumHome from "@/assets/case_studies/dont_touch_my_gum_home.svg";
import gumCode from "@/assets/case_studies/dont_touch_my_gum_code.gif";
import gumMusicProduction from "@/assets/case_studies/dont_touch_my_gum_musicprod.png";
import rendescoPrototype from "@/assets/case_studies/rendesco_protoype.svg";
import rendescoFlowHome from "@/assets/case_studies/rendesco_flow_home_view.svg";
import unifyGivingApp from "@/assets/case_studies/unify_giving_app.png";
import carequillDashboard1 from "@/assets/case_studies/carequill_ai_dashboard1.svg";
// import carequillDashboard2 from "@/assets/case_studies/carequill_ai_dashboard2.svg";
import carequillDashboard3 from "@/assets/case_studies/carequill_ai_dashboard3.svg";
// import carequillCalendar from "@/assets/case_studies/carequill_ai_calendar.svg";
import chatgioptApp from "@/assets/case_studies/chatgiopt_app.png";
import chatgioptDesign from "@/assets/case_studies/chatgiopt_design.png";

export const products: PortfolioProduct[] = [
  {
    id: "rendesco",
    slides: [
      { id: "overview", label: "Energy overview", kind: "html", visual: "primary" },
      { id: "prototype", label: "HEMS prototype", kind: "image", src: rendescoPrototype.src, alt: "Rendesco home energy management prototype", fit: "contain" },
      { id: "solar", label: "Solar generation", kind: "html", visual: "alternate" },
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
      { id: "conversation", label: "Portfolio conversation", kind: "html", visual: "primary" },
      { id: "app", label: "ChatGioPT app", kind: "image", src: chatgioptApp.src, alt: "ChatGioPT portfolio assistant interface", fit: "contain" },
      { id: "retrieval", label: "Grounded answer flow", kind: "html", visual: "alternate" },
      { id: "design", label: "ChatGioPT design", kind: "image", src: chatgioptDesign.src, alt: "ChatGioPT illustration and interface design", fit: "contain" },
    ],
  },
  {
    id: "giving",
    slides: [
      { id: "causes", label: "Choose a cause", kind: "html", visual: "primary" },
      { id: "app", label: "Unify Giving app", kind: "image", src: unifyGivingApp.src, alt: "Unify Giving mobile app", fit: "contain" },
      { id: "confirmation", label: "Donation confirmation", kind: "html", visual: "alternate" },
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
      { id: "game", label: "Game artwork", kind: "html", visual: "primary" },
      { id: "home", label: "Home screen", kind: "image", src: gumHome.src, alt: "Don’t Touch My Gum! home screen", fit: "contain" },
      { id: "code", label: "Game code", kind: "image", src: gumCode.src, alt: "Animated view of the Don’t Touch My Gum! code", fit: "contain" },
      { id: "levels", label: "Level select", kind: "html", visual: "alternate" },
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
      { id: "workflow", label: "Workflow orchestration", kind: "html", visual: "primary" },
      { id: "dashboard-3", label: "Dashboard 3", kind: "image", src: carequillDashboard3.src, alt: "Carequill AI dashboard, view 3", fit: "contain" },
      { id: "routing", label: "Responsibility routing", kind: "html", visual: "alternate" },
      { id: "dashboard-1", label: "Dashboard 1", kind: "image", src: carequillDashboard1.src, alt: "Carequill AI dashboard, view 1", fit: "contain" },
      // { id: "dashboard-2", label: "Dashboard 2", kind: "image", src: carequillDashboard2.src, alt: "Carequill AI dashboard, view 2", fit: "contain" },
      // { id: "calendar", label: "Calendar", kind: "image", src: carequillCalendar.src, alt: "Carequill AI calendar", fit: "contain" },
    ],
  },
  // FlowFree is temporarily hidden. Uncomment to restore it as the last product.
  // {
  //   id: "flowfree",
  //   slides: [
  //     { id: "chat", label: "Private conversation", kind: "html", visual: "primary" },
  //     { id: "home", label: "Your space", kind: "html", visual: "alternate" },
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
