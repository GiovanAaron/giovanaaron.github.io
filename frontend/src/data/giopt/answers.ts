import type { PresetAnswer } from "@/types/giopt"

export const presetAnswers: PresetAnswer[] = [
  {
    id: "healthcare-experience",
    suggestedQuestion:
      "What healthcare experience does Giovan have?",

    answer:
      "Giovan has developed products across healthcare and mental wellbeing. His recent work includes a CRM workflow automation service for a psychiatry provider, designed to reduce patient abandonment across appointments, prescriptions, payments, reports and follow-ups.",

    keywords: [
      "healthcare",
      "healthtech",
      "patient",
      "psychiatry",
      "medical",
      "mental health",
    ],

    phrases: [
      "healthcare experience",
      "worked in healthcare",
      "health technology",
      "patient software",
      "mental health software",
    ],

    industries: ["healthtech", "tech_for_good_nonprofit"],

    audiences: ["talent_partner_agency", "internal_recruitment_specialist"],

    // links: [
    //   {
    //     label: "View healthcare experience",
    //     href: "/experience#healthcare",
    //   },
    // ],

  },

  {
    id: "climate-experience",
    suggestedQuestion:
      "What has Giovan built in climate technology?",

    answer:
      "Giovan created Gio/Grid, an Elexon API-powered application that turns complex UK electricity data into a clear visual breakdown. It helps users identify when reducing or delaying non-essential electricity use may be beneficial.",

    keywords: [
      "climate",
      "energy",
      "electricity",
      "sustainability",
      "green",
      "elexon",
      "gio grid",
    ],

    phrases: [
      "climate technology",
      "climate tech",
      "clean energy",
      "energy project",
      "sustainability experience",
    ],

    industries: ["greentech_renewable_energy", "energy", "tech_for_good_nonprofit"],

    audiences: ["talent_partner_agency", "internal_recruitment_specialist"],

    links: [
      {
        label: "Explore Gio/Grid",
        href: "https://giovanaaron.github.io/Gio-Grid/",
      },
    ],

  },

  {
    id: "independent-projects",
    suggestedQuestion:
      "What has Giovan launched independently?",

    answer:
      "Giovan independently designed, developed and released Don’t Touch My Gum!, a desktop mini-game that attracted more than 100 users in its first month and peaked at 44 users in one day. It was also featured in the Pygame WebAssembly Collection.",

    keywords: [
      "independent",
      "launched",
      "game",
      "pygame",
      "self starter",
      "ownership",
    ],

    phrases: [
      "launched independently",
      "independent project",
      "built by himself",
      "end to end ownership",
      "self starter",
    ],

    industries: ["ai", "retail", "media_publishing", "b2b"],

    audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],

    links: [
      {
        label: "View Don’t Touch My Gum!",
        href: "https://giovanaaron.itch.io/dont-touch-my-gum-cv",
      },
    ],
  },
   {
    id: "professional-summary",
    suggestedQuestion: "How would you summarise Giovan's professional profile?",
    answer:
      "Giovan is a full-stack software engineer and PSM I Certified Scrum practitioner who builds AI-powered, SaaS and cloud-native products. His commercial experience spans TypeScript, JavaScript, Python, React, React Native, Node.js, FastAPI, SQL databases, secure APIs and user-centred product delivery.",
    keywords: ["full stack", "software engineer", "product engineer", "saas", "cloud native", "psm i"],
    phrases: ["tell me about giovan", "professional summary", "candidate overview", "what does giovan do", "about giovan"],
    industries: ["ai", "retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],
  },
  {
    id: "core-technology-stack",
    suggestedQuestion: "What is Giovan's core technology stack?",
    answer:
      "Giovan's core stack is TypeScript, JavaScript, Python and SQL, with React, React Native, Next.js and Vue.js on the front end; Node.js, Express, FastAPI, Flask and Django on the back end; and PostgreSQL, MongoDB, Redis, Docker, AWS and Azure-related services across data and delivery.",
    keywords: ["typescript", "javascript", "python", "sql", "react", "node", "fastapi", "full stack"],
    phrases: ["core stack", "technical skills", "technology experience", "programming languages", "main technologies"],
    industries: ["ai", "retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],
  },
  {
    id: "frontend-experience",
    suggestedQuestion: "What front-end experience does Giovan have?",
    answer:
      "Giovan has delivered web and mobile interfaces with React, React Native, Next.js, Vue.js, TypeScript, JavaScript, HTML and CSS. His work includes accessible onboarding and chat experiences, energy-data visualisations, reusable components, navigation and state-management improvements, design systems and conversion-focused customer journeys.",
    keywords: ["frontend", "react", "react native", "next.js", "vue", "typescript", "accessibility", "ui"],
    phrases: ["front end experience", "react experience", "ui development", "web development", "mobile frontend"],
    industries: ["ai", "retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],
  },
  {
    id: "backend-api-experience",
    suggestedQuestion: "What back-end and API experience does Giovan have?",
    answer:
      "Giovan has built REST APIs and service integrations with Node.js, Express, FastAPI, Flask and Django. His experience includes authentication, role-based access, payment webhooks, real-time services, Pydantic validation, Prisma ORM, PostgreSQL, MongoDB, Swagger documentation, caching and automated API testing.",
    keywords: ["backend", "api", "rest", "node.js", "express", "fastapi", "prisma", "swagger"],
    phrases: ["back end experience", "api development", "rest api", "server side", "backend engineer"],
    industries: ["ai", "retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],
  },
  {
    id: "ai-nlp-experience",
    suggestedQuestion: "What AI experience does Giovan have?",
    answer:
      "Giovan has application-layer AI and NLP experience. At FlowFree he developed a FastAPI and Hugging Face sentiment-analysis microservice that produced live moderation feedback, escalation logic, soft warnings and alerts during mental-wellness support sessions. He does not position this as model training, fine-tuning or MLOps ownership.",
    keywords: ["ai", "nlp", "hugging face", "sentiment analysis", "fastapi", "moderation"],
    phrases: ["ai experience", "machine learning experience", "nlp project", "artificial intelligence", "hugging face"],
    industries: ["ai", "healthtech", "tech_for_good_nonprofit"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],

  },
  {
    id: "trustworthy-ai-speaking",
    suggestedQuestion: "Has Giovan contributed to the wider AI and healthcare community?",
    answer:
      "Giovan was invited by NIHR and NHS England to speak at King's College London about building trustworthy AI-powered health services and creating patient-centred digital experiences.",
    keywords: ["nihr", "nhs england", "speaker", "trustworthy ai", "kings college london", "health services"],
    phrases: ["public speaking", "ai speaker", "healthcare event", "thought leadership", "nhs experience"],
    industries: ["ai", "healthtech", "tech_for_good_nonprofit"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],

  },
  {
    id: "healthcare-experience",
    suggestedQuestion: "What healthcare experience does Giovan have?",
    answer:
      "Giovan has developed products across healthcare and mental wellbeing. His recent work includes a CRM workflow automation service for a psychiatry provider, designed to reduce patient abandonment across appointments, prescriptions, payments, reports and follow-ups.",
    keywords: ["healthcare", "healthtech", "patient", "psychiatry", "medical", "mental health"],
    phrases: ["healthcare experience", "worked in healthcare", "health technology", "patient software", "mental health software"],
    industries: ["healthtech", "tech_for_good_nonprofit"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist"],
    // links: [{ label: "View healthcare experience", href: "/experience#healthcare" }],

  },
  {
    id: "mental-wellbeing-saas",
    suggestedQuestion: "What did Giovan build at FlowFree?",
    answer:
      "Giovan contributed to the MVP of FlowFree, an anonymous mental-wellness SaaS platform connecting employees with trained peer supporters. He built privacy-first real-time chat, an AI-assisted moderation service, accessible onboarding and feedback flows, secure APIs and GDPR-aware data patterns for sensitive interactions.",
    keywords: ["flowfree", "wellbeing", "saas", "anonymous chat", "peer support", "gdpr"],
    phrases: ["flowfree experience", "mental wellness platform", "health and wellbeing saas", "anonymous support", "employee wellbeing"],
    industries: ["healthtech", "tech_for_good_nonprofit", "ai"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist"],

  },
  {
    id: "climate-experience",
    suggestedQuestion: "What has Giovan built in climate technology?",
    answer:
      "Giovan created Gio/Grid, an Elexon API-powered application that turns complex UK electricity data into a clear visual breakdown. It helps users identify when reducing or delaying non-essential electricity use may be beneficial.",
    keywords: ["climate", "energy", "electricity", "sustainability", "green", "elexon", "gio grid"],
    phrases: ["climate technology", "climate tech", "clean energy", "energy project", "sustainability experience"],
    industries: ["greentech_renewable_energy", "energy", "tech_for_good_nonprofit"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist"],
    links: [{ label: "Explore Gio/Grid", href: "https://giovanaaron.github.io/Gio-Grid/" }],

  },
  {
    id: "commercial-clean-energy",
    suggestedQuestion: "What commercial clean-energy experience does Giovan have?",
    answer:
      "At Rendesco, Giovan collaborated with technology and product leadership on a B2C Home Energy Management System. He worked across React Native, FastAPI and supporting web infrastructure, designed real-time solar, EV and heat-pump visualisations, created Grafana dashboards, implemented Azure OAuth workflows and containerised documented services.",
    keywords: ["rendesco", "clean energy", "solar", "ev", "heat pump", "energy management", "grafana"],
    phrases: ["commercial climate experience", "rendesco experience", "home energy management", "energy software", "sustainability work"],
    industries: ["greentech_renewable_energy", "energy", "tech_for_good_nonprofit"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist"],

  },
  {
    id: "fintech-payments-experience",
    suggestedQuestion: "What fintech and payments experience does Giovan have?",
    answer:
      "At Unify Giving, Giovan launched Stripe donation flows with payment-intent verification, webhooks and real-time confirmation. He also built Node.js and Express APIs backed by PostgreSQL and Prisma, improved mobile product workflows and implemented PCI-aware payment handling alongside JWT, OAuth and role-based access controls.",
    keywords: ["fintech", "paytech", "payments", "stripe", "webhooks", "pci", "donations"],
    phrases: ["payments experience", "fintech experience", "stripe integration", "payment api", "paytech"],
    industries: ["retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist"],
  },
  {
    id: "performance-optimisation",
    suggestedQuestion: "Can Giovan demonstrate measurable performance improvement?",
    answer:
      "Yes. At Unify Giving, Giovan improved API performance by 60% using pagination, indexing, selective field fetching and Redis caching for frequently used endpoints.",
    keywords: ["performance", "optimisation", "60%", "redis", "caching", "indexing", "pagination"],
    phrases: ["performance improvement", "api optimisation", "measurable impact", "scalability example", "improved speed"],
    industries: ["ai", "retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],
  },
  {
    id: "realtime-systems",
    suggestedQuestion: "Has Giovan built real-time product features?",
    answer:
      "Yes. Giovan built privacy-first chat functionality with WebSockets and Socket.IO, connected it to live sentiment-analysis feedback and escalation behaviour, and has also delivered real-time payment confirmations and operational dashboards.",
    keywords: ["real time", "websockets", "socket.io", "chat", "live feedback", "event driven"],
    phrases: ["real-time experience", "websocket experience", "chat systems", "live updates", "socket io"],
    industries: ["ai", "healthtech", "retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist"],
  },
  {
    id: "data-database-experience",
    suggestedQuestion: "What database and data-layer experience does Giovan have?",
    answer:
      "Giovan works with PostgreSQL, MongoDB, Redis and SQL, including Prisma-backed relational APIs, GDPR-aware NoSQL schemas, indexing, pagination, selective field retrieval and caching. His experience covers transactional product data, sensitive wellbeing interactions, analytics and operational monitoring.",
    keywords: ["database", "postgresql", "mongodb", "redis", "sql", "prisma", "data modelling"],
    phrases: ["database experience", "sql experience", "data layer", "postgres experience", "nosql experience"],
    industries: ["ai", "retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist"],
  },
  {
    id: "cloud-devops-delivery",
    suggestedQuestion: "What cloud and delivery experience does Giovan have?",
    answer:
      "Giovan has worked with AWS S3, AWS Lambda, Docker, Netlify and Azure OAuth, and understands CI/CD and Infrastructure as Code principles. He has containerised services and supported modern deployment workflows, but does not claim production Kubernetes, platform-engineering or DevOps ownership.",
    keywords: ["cloud", "aws", "lambda", "s3", "docker", "netlify", "ci/cd", "infrastructure as code"],
    phrases: ["cloud experience", "deployment experience", "devops experience", "docker experience", "aws experience"],
    industries: ["ai", "retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist"],
  },
  {
    id: "authentication-security",
    suggestedQuestion: "What authentication and secure-delivery experience does Giovan have?",
    answer:
      "Giovan has implemented JWT, Google OAuth, Azure OAuth, role-based access control and Bcrypt password hashing. He has also worked with PCI-aware Stripe flows, GDPR-aware data patterns, auto-deletion of sensitive interactions and privacy-first product design. This is secure application development experience, not specialist security-engineering ownership.",
    keywords: ["authentication", "oauth", "jwt", "rbac", "bcrypt", "gdpr", "pci", "privacy"],
    phrases: ["security experience", "authentication experience", "oauth experience", "data privacy", "secure software"],
    industries: ["healthtech", "ai", "retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist"],
  },
  {
    id: "testing-quality",
    suggestedQuestion: "What testing and quality experience does Giovan have?",
    answer:
      "Giovan has written unit, integration and API tests using Jest and Supertest, strengthened automated test coverage, documented APIs with Swagger and used Docker to make services more consistent across delivery environments.",
    keywords: ["testing", "jest", "supertest", "unit tests", "integration tests", "api testing", "quality"],
    phrases: ["testing experience", "automated tests", "quality assurance", "test coverage", "api tests"],
    industries: ["ai", "retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist"],
  },
  {
    id: "product-ux-experience",
    suggestedQuestion: "How strong is Giovan's product and UX capability?",
    answer:
      "Giovan combines engineering with product and UX judgement. He has designed in Figma, conducted user-centred product work, created accessible interfaces, mapped onboarding and conversion journeys, planned KPIs, analysed behaviour data and translated stakeholder needs into deliverable product features.",
    keywords: ["product", "ux", "figma", "user research", "accessibility", "customer journey", "kpi"],
    phrases: ["product thinking", "ux experience", "design skills", "user-centred", "product engineer"],
    industries: ["ai", "retail", "media_publishing", "b2b", "tech_for_good_nonprofit"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],
  },
  {
    id: "analytics-growth",
    suggestedQuestion: "Has Giovan used analytics to support growth?",
    answer:
      "Yes. For an independent creative media brand, Giovan built custom analytics and tracking systems that contributed to 13,277 monthly sessions, 3,000% month-on-month growth and clearer funnel visibility. He also used Wix, TikTok and campaign data to guide landing-page, signup-flow and UX decisions.",
    keywords: ["analytics", "growth", "tracking", "conversion", "funnel", "wix", "tiktok"],
    phrases: ["growth experience", "product analytics", "conversion optimisation", "marketing technology", "user acquisition"],
    industries: ["retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist"],
  },
  {
    id: "agile-leadership",
    suggestedQuestion: "What agile delivery and leadership experience does Giovan have?",
    answer:
      "Giovan is PSM I Certified and has hands-on Scrum and scaled-agile delivery experience. As an IT Project Manager at University College London, he led PI Planning, Inspect and Adapt workshops, Scrum of Scrums and PO Sync activities, managed dependencies and impediments, and supported prioritised product backlogs.",
    keywords: ["agile", "scrum", "psm i", "safe", "pi planning", "leadership", "delivery"],
    phrases: ["agile experience", "scrum master", "delivery leadership", "project management", "psm certification"],
    industries: ["retail", "media_publishing", "b2b", "tech_for_good_nonprofit"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],
  },
  {
    id: "stakeholder-collaboration",
    suggestedQuestion: "How does Giovan work with stakeholders and cross-functional teams?",
    answer:
      "Giovan has collaborated with product and technology leaders, product owners, technical teams and operational stakeholders. He translates business needs into user stories and prioritised work, communicates through roadmaps and documentation, manages dependencies and delivers iteratively against user and organisational goals.",
    keywords: ["stakeholders", "collaboration", "cross functional", "product owner", "user stories", "roadmap"],
    phrases: ["stakeholder management", "team collaboration", "cross-functional experience", "communication skills", "working with product"],
    industries: ["retail", "media_publishing", "b2b", "tech_for_good_nonprofit"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],
  },
  {
    id: "project-programme-delivery",
    suggestedQuestion: "Does Giovan have experience beyond hands-on software development?",
    answer:
      "Yes. Before his software-development roles, Giovan worked as an IT Project Manager at University College London, managing cloud migration and large-scale upgrade projects involving more than 12 system integrations. That experience strengthens his delivery planning, dependency management and stakeholder communication as an engineer.",
    keywords: ["project manager", "ucl", "cloud migration", "system integrations", "programme delivery", "roadmaps"],
    phrases: ["previous experience", "project management background", "delivery experience", "cloud migration", "enterprise experience"],
    industries: ["retail", "media_publishing", "b2b", "tech_for_good_nonprofit"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist"],
  },
  {
    id: "mvp-startup-delivery",
    suggestedQuestion: "Can Giovan deliver MVPs in fast-moving environments?",
    answer:
      "Yes. Giovan has contributed to healthcare, wellbeing, event-management, payments and energy products in contract, MVP and fast-paced delivery settings. His experience covers moving from user and stakeholder needs through design, APIs, interfaces, integrations, testing and deployment-ready product increments.",
    keywords: ["mvp", "startup", "scaleup", "fast paced", "contract", "ownership", "delivery"],
    phrases: ["startup experience", "mvp delivery", "fast-moving environment", "wear many hats", "end-to-end delivery"],
    industries: ["ai", "retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist"],
  },
  {
    id: "calendar-integrations",
    suggestedQuestion: "What third-party integration experience does Giovan have?",
    answer:
      "Giovan has integrated Stripe payments and webhooks, Google Calendar, Google OAuth, Azure OAuth, Gmail and Google Workspace mailboxes, AWS services, Wix and analytics platforms. He has worked with status-triggered communication flows, domain email routing and external API-backed products.",
    keywords: ["integrations", "google calendar", "stripe", "gmail", "google workspace", "oauth", "webhooks"],
    phrases: ["third-party integrations", "external api", "calendar integration", "email integration", "saas integrations"],
    industries: ["ai", "retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist"],
  },
  {
    id: "independent-projects",
    suggestedQuestion: "What has Giovan launched independently?",
    answer:
      "Giovan independently designed, developed and released Don't Touch My Gum!, a desktop mini-game that attracted more than 100 users in its first month and peaked at 44 users in one day. It was also featured in the Pygame WebAssembly Collection.",
    keywords: ["independent", "launched", "game", "pygame", "self starter", "ownership"],
    phrases: ["launched independently", "independent project", "built by himself", "end to end ownership", "self starter"],
    industries: ["ai", "retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],
    links: [{ label: "View Don't Touch My Gum!", href: "https://giovanaaron.itch.io/dont-touch-my-gum-cv" }],
  },
  {
    id: "education-certifications",
    suggestedQuestion: "What are Giovan's qualifications and certifications?",
    answer:
      "Giovan holds an MSc in Management of Innovation from Goldsmiths, University of London, and the Professional Scrum Master I certification. He also completed intensive software-development training with Northcoders.",
    keywords: ["education", "msc", "goldsmiths", "psm i", "northcoders", "certification"],
    phrases: ["qualifications", "education history", "certifications", "degree", "scrum master certification"],
    industries: ["retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],
  },
  {
    id: "languages-location",
    suggestedQuestion: "Where is Giovan based and which languages does he speak?",
    answer:
      "Giovan is based in London, UK, and speaks English and Spanish.",
    keywords: ["london", "uk", "english", "spanish", "languages", "location"],
    phrases: ["where is giovan based", "location", "languages spoken", "spanish speaking", "uk based"],
    industries: ["retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],
  },
  {
    id: "role-fit",
    suggestedQuestion: "What kinds of roles are the strongest match for Giovan?",
    answer:
      "Giovan is strongest for full-stack, product-engineering and application-layer AI roles centred on JavaScript or TypeScript, Python, SQL, APIs, React-based interfaces and cloud-enabled product delivery. He is particularly well aligned with SaaS, healthcare, mental wellbeing, climate, payments and public-impact products.",
    keywords: ["role fit", "full stack", "product engineer", "ai engineer", "saas", "healthtech", "climate tech"],
    phrases: ["best roles", "what role suits giovan", "candidate fit", "ideal position", "strongest match"],
    industries: ["ai", "healthtech", "greentech_renewable_energy", "energy", "tech_for_good_nonprofit", "retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],
  },
  {
    id: "transferable-technologies",
    suggestedQuestion: "How should recruiters interpret adjacent technologies on Giovan's profile?",
    answer:
      "Giovan's strongest evidence is in his listed commercial stack. Adjacent tools should be framed as transferable knowledge, for example Node.js, Express and TypeScript experience transferring to NestJS environments, or Swagger experience transferring to OpenAPI. He should not be represented as having production Kubernetes, platform engineering, MLOps, model-training or unsupported language experience.",
    keywords: ["transferable", "adjacent technology", "nestjs", "openapi", "kubernetes", "mlops", "skills match"],
    phrases: ["missing technology", "transferable skills", "adjacent stack", "can he learn", "technology gap"],
    industries: ["ai", "retail", "media_publishing", "b2b"],
    audiences: ["talent_partner_agency", "internal_recruitment_specialist"],
  },
  {
  id: "what-makes-giovan-unique",
  suggestedQuestion: "What makes Giovan unique?",
  answer:
    "Giovan combines software engineering, product thinking, UX judgement and delivery leadership. He can move between understanding the user, designing an experience, building the underlying system and helping a team organise delivery. His work across healthcare, mental wellbeing, clean energy, payments and independent game development also gives him an unusually broad product perspective.",
  keywords: [
    "unique",
    "special",
    "different",
    "stand out",
    "strengths",
  ],
  phrases: [
    "what makes giovan unique",
    "what makes him special",
    "why does he stand out",
    "what is different about giovan",
  ],
  industries: ["retail", "media_publishing", "b2b"],
  audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],
},
{
  id: "what-giovan-is-good-at",
  suggestedQuestion: "What is Giovan good at?",
  answer:
    "Giovan is particularly good at turning loosely defined product problems into clear, usable software. His strengths include full-stack development, API design, accessible interfaces, product and UX thinking, stakeholder communication and connecting technical decisions to measurable user or business outcomes.",
  keywords: [
    "good at",
    "strengths",
    "best skills",
    "capabilities",
    "talents",
  ],
  phrases: [
    "what is giovan good at",
    "what are his strengths",
    "best thing about giovan",
    "where does he excel",
  ],
  industries: ["retail", "media_publishing", "b2b"],
  audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],
},
{
  id: "what-giovan-is-bad-at",
  suggestedQuestion: "What is Giovan bad at?",
  answer:
    "Well,Giovan is not a specialist in every technical discipline. His strongest experience is in full-stack product engineering with JavaScript, TypeScript, Python, SQL and application-layer AI.",
  keywords: [
    "bad at",
    "weakness",
    "limitations",
    "skills gap",
    "not experienced",
  ],
  phrases: [
    "what is giovan bad at",
    "why is giovan so bad",
    "what are his weaknesses",
    "where is he less experienced",
  ],
  industries: ["retail", "media_publishing", "b2b"],
  audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],
},
{
  id: "creative-interests",
  suggestedQuestion: "What are Giovan's creative interests?",
  answer:
    "Giovan enjoys combining technology with game design, visual design and music. He independently created Don't Touch My Gum!, designing its gameplay and visual assets with Pygame, Figma and Procreate, while also using Ableton in the creative process.",
  keywords: [
    "hobbies",
    "interests",
    "creative",
    "games",
    "music",
    "design",
    "pygame",
  ],
  phrases: [
    "what are giovan's hobbies",
    "what does he do outside work",
    "creative interests",
    "does giovan make games",
    "is he interested in music",
  ],
  industries: ["retail", "media_publishing", "b2b"],
  audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],
},
{
  id: "engineer-designer-product-thinker",
  suggestedQuestion:
    "Is Giovan an engineer, designer or product thinker?",
  answer:
    "Primarily, Giovan is a software engineer, but his product-management and UX background shapes how he builds. He thinks about the user journey, accessibility, business goal and delivery risk alongside the code, which makes him particularly suited to product-engineering roles.",
  keywords: [
    "engineer",
    "designer",
    "product thinker",
    "product engineer",
    "multidisciplinary",
  ],
  phrases: [
    "engineer or designer",
    "what kind of developer is giovan",
    "is he a product thinker",
    "how does giovan think",
  ],
  industries: ["retail", "media_publishing", "b2b"],
  audiences: ["talent_partner_agency", "internal_recruitment_specialist", "other"],
}
]
