import Image from "next/image";

import {
  ArrowUpRight,
  ChevronDown,
  CircleDollarSign,
  PackageCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { PortfolioHeroImage } from "@/components/portfolio-hero-image";
import { PortfolioCommandMenu } from "@/components/portfolio-command-menu";
import { ThemeToggle } from "@/components/theme-toggle";

import uclLogo from "@/assets/company_logos/ucl_logo.svg";
import techReturnersLogo from "@/assets/company_logos/tech_returners_logo.svg";
import techReturnersLightLogo from "@/assets/company_logos/tech_returners_logo_light.svg";
import rendescoLogo from "@/assets/company_logos/rendesco_logo.svg";
import rendescoDarkLogo from "@/assets/company_logos/rendesco_logo_dark.svg";
import unifyGivingLogo from "@/assets/company_logos/unify_giving_logo.svg";
import nhsLogo from "@/assets/company_logos/nhs_logo.svg";
import nhirLogo from "@/assets/company_logos/nhir_logo.svg";

function MetricCard({
  className = "",
  icon,
  label,
  value,
  detail,
}: {
  className?: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: React.ReactNode;
}) {
  return (
    <article
      className={`border-border/80 bg-card text-card-foreground rounded-xl border p-4 shadow-[0_12px_35px_rgba(0,0,0,0.07)] ${className}`}
    >
      <div className="bg-muted mb-3 flex size-7 items-center justify-center rounded-md">
        {icon}
      </div>
      <p className="text-muted-foreground text-xs font-medium">{label}</p>
      <p className="mt-1 text-xl font-semibold tracking-tight">{value}</p>
      <div className="text-muted-foreground mt-2 text-[11px]">{detail}</div>
    </article>
  );
}

const companyLogos = [
  { name: "UCL", src: uclLogo },
  { name: "Tech Returners", src: techReturnersLogo, lightSrc: techReturnersLightLogo },
  { name: "Rendesco", src: rendescoDarkLogo, lightSrc: rendescoLogo },
  { name: "NHS", src: nhsLogo },
  { name: "Unify Giving", src: unifyGivingLogo },
  { name: "NHIR", src: nhirLogo },
];

const techStack = [
  "JavaScript/TypeScript",
  "React/React Native",
  "Next.js",
  "Python",
  "Django",
  "HTML/CSS",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "FastAPI",
  "AWS",
  "Azure",
  "Figma",
];

const techStackBackgrounds = [
  "bg-[#795548]/15",
  "bg-[#722F37]/15",
  "bg-[#D4AF37]/15",
];

export default function Home() {
  return (
    <>
    <main className="bg-background min-h-screen overflow-hidden">
      <header className="relative z-30 mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
        <a
          href="#"
          className="flex items-center gap-3"
          aria-label="Studio home"
        >
          <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full">
            <Sparkles className="size-4" />
          </span>
          <span className="text-base font-semibold tracking-tight">
            Portfolio
          </span>
        </a>
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <nav
            className="hidden items-center gap-8 text-sm md:flex"
            aria-label="Main navigation"
          >
            <a href="#home" className="text-foreground font-medium">
              Home
            </a>
            <a
              href="https://resisted-spoonbill-670.notion.site/Portfolio-bfa495d566854989923f98ff4c09b764"
              className="text-muted-foreground transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              Products
            </a>
            <a
              href="#about-me"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              About Me
            </a>
            {/* <a
              href="#contacts"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Contacts
            </a> */}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <section
        className="relative mx-auto grid min-h-[610px] w-full max-w-[1440px] lg:grid-cols-[52%_48%]"
        id="home"
      >
        <div className="relative z-20 flex items-center px-5 py-14 sm:px-8 lg:px-14 lg:py-8">
          <div className="max-w-[650px]">
            <span className="bg-primary text-primary-foreground inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]">
              Full-stack Development
            </span>
            <h1 className="mt-5 text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.92] font-bold tracking-[-0.055em]">
              <span className="mb-3 block text-[0.52em] leading-none tracking-[-0.04em]">
                Hello I&apos;m
              </span>
              Giovan Aaron
              <span className="mt-4 block text-[0.47em] leading-[0.95] tracking-[-0.045em]">
                Product Engineer
              </span>
            </h1>
            <p className="text-muted-foreground mt-7 max-w-[650px] text-sm leading-7 sm:text-base">
              I combine full-stack and cloud engineering with a creative UX/UI
              perspective to turn complex ideas into clear, human-centred
              digital products. My experience spans healthcare, mental
              wellbeing, clean energy and social impact, supported by an MSc in
              Management of Innovation and Professional Scrum Master
              certification.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-7">
              <a
                href="https://calendar.app.google/eE5FcZnghkSBCSpH8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground inline-flex h-12 items-center gap-3 rounded-lg px-6 text-sm font-semibold shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Let&apos;s Work Together <ArrowUpRight className="size-4" />
              </a>
              {/* <div
                className="flex items-center"
                aria-label="More than one thousand happy clients"
              >
                {["AM", "JL", "RK"].map((initials) => (
                  <span
                    key={initials}
                    className="border-background bg-secondary text-secondary-foreground -ml-2 flex size-9 first:ml-0 items-center justify-center rounded-full border-2 text-[9px] font-bold"
                  >
                    {initials}
                  </span>
                ))}
                <span className="bg-card -ml-2 flex h-9 items-center rounded-full px-3 text-xs font-semibold shadow-sm">
                  +1K
                </span>
              </div> */}
            </div>
            <ul aria-label="Tech stack" className="mt-6 flex flex-wrap gap-2">
              {techStack.map((technology, index) => (
                <li
                  key={technology}
                  className={`text-foreground inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${techStackBackgrounds[index % techStackBackgrounds.length]}`}
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative min-h-[590px] overflow-hidden bg-[#e9e9e9] transition-colors dark:bg-[#292929] lg:min-h-0 lg:rounded-bl-[150px]">
          <PortfolioHeroImage />
          {/* <MetricCard
            className="absolute top-8 left-5 w-[170px] sm:left-8 lg:-left-4 lg:top-12"
            icon={<PackageCheck className="size-4" />}
            label="Shipped Orders"
            value="42"
            detail={
              <>
                <strong className="text-foreground">+18.2%</strong> &nbsp;than
                last week
              </>
            }
          />
          <MetricCard
            className="absolute top-24 right-4 w-[178px] sm:right-8 lg:top-28 lg:-right-2"
            icon={<CircleDollarSign className="size-4" />}
            label="Total Revenue"
            value="$12,400"
            detail={
              <span className="inline-flex items-center gap-1">
                <TrendingUp className="size-3" /> 15% this month
              </span>
            }
          />
          <MetricCard
            className="absolute right-5 bottom-7 w-[158px] sm:right-10 lg:-right-1 lg:bottom-28"
            icon={<TrendingUp className="size-4" />}
            label="Total Income"
            value="$4,673"
            detail={<strong className="text-foreground">+25.2%</strong>}
          /> */}
          {/* <div className="bg-card/95 absolute bottom-8 left-5 hidden w-[190px] rounded-xl border p-4 shadow-lg sm:block lg:-left-8 lg:bottom-36">
            <div className="flex items-center justify-between text-xs font-medium">
              <span>Ratings</span>
              <span className="text-muted-foreground flex items-center gap-1 text-[10px]">
                Last 6 months <ChevronDown className="size-3" />
              </span>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <strong className="text-xl">8.14k</strong>
              <span className="text-xs font-semibold">+18.2%</span>
              <span className="bg-muted flex size-11 items-center justify-center rounded-full text-xl">
                ☺
              </span>
            </div>
          </div> */}
        </div>
      </section>
      <PortfolioCommandMenu />

      <section
        className="mx-auto w-full max-w-[1440px] px-5 pt-14 pb-12 text-center opacity-80 sm:px-8 lg:pt-0.5"
        id="products"
      >
        <p className="text-muted-foreground text-sm italic">
          Trusted by These Great Companies
        </p>
        <div className="mx-auto mt-4 flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {companyLogos.map((company) => (
            <span key={company.name}>
              {company.lightSrc && (
                <Image
                  src={company.lightSrc}
                  alt={company.name}
                  className="h-8 w-auto max-w-[120px] object-contain sm:h-10 dark:hidden"
                />
              )}
              <Image
                src={company.src}
                alt={company.name}
                className={`h-8 w-auto max-w-[120px] object-contain sm:h-10 ${company.lightSrc ? "hidden dark:block" : ""}`}
              />
            </span>
          ))}
        </div>
      </section>
      <span id="about-us" className="sr-only">
        About Us
      </span>
      <span id="contacts" className="sr-only">
        Contacts
      </span>
      <span id="contact" className="sr-only">
        Contact
      </span>
    </main>
    <footer className="bg-background text-muted-foreground px-5 text-center text-sm sm:px-8">
      <div className="mx-auto max-w-[70%] border-t border-border/40 py-4 dark:border-white/15">
        © 2026 Gio Automate Ltd. All rights reserved.
      </div>
    </footer>
    </>
  );
}
