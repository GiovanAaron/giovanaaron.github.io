"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import {
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import AboutMe from "@/components/about-me";
import { PortfolioHeroImage } from "@/components/portfolio-hero-image";
import { PortfolioCommandMenu } from "@/components/portfolio-command-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import Logo from "@/components/ui/logo"

import uclLogo from "@/assets/company_logos/ucl_logo.svg";
import techReturnersLogo from "@/assets/company_logos/tech_returners_logo.svg";
import techReturnersLightLogo from "@/assets/company_logos/tech_returners_logo_light.svg";
import rendescoLogo from "@/assets/company_logos/rendesco_logo.svg";
import rendescoDarkLogo from "@/assets/company_logos/rendesco_logo_dark.svg";
import unifyGivingLogo from "@/assets/company_logos/unify_giving_logo.svg";
import nhsLogo from "@/assets/company_logos/nhs_logo.svg";
import nhirLogo from "@/assets/company_logos/nhir_logo.svg";


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
  const [isAboutActive, setIsAboutActive] = useState(false);
  const reduceMotion = useReducedMotion();
  const sectionTransition = {
    duration: reduceMotion ? 0 : 0.6,
    ease: "easeInOut" as const,
  };

  return (
    <>
    <main className="bg-background min-h-screen overflow-hidden">
      <header className="relative z-30 mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
        <a
          href="#"
          onClick={() => setIsAboutActive(false)}
          className="flex items-center gap-3"
          aria-label="Studio home"
        >
          <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full">
            <Logo />
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
            <a href="#home" onClick={() => setIsAboutActive(false)} aria-current={!isAboutActive ? "page" : undefined} className={`transition-colors hover:text-foreground ${!isAboutActive ? "text-foreground font-medium" : "text-muted-foreground font-normal"}`}>
              Home
            </a>
             <a
              href="#about-me"
              onClick={(event) => {
                event.preventDefault();
                setIsAboutActive(true);
              }}
              aria-current={isAboutActive ? "page" : undefined}
              className={`transition-colors hover:text-foreground ${isAboutActive ? "text-foreground font-medium" : "text-muted-foreground font-normal"}`}
            >
              About Me
            </a>
            <a
              href="https://resisted-spoonbill-670.notion.site/Portfolio-bfa495d566854989923f98ff4c09b764"
              className="text-muted-foreground transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              Products
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

      <AnimatePresence mode="wait" initial={false}>
      {!isAboutActive ? (
      <motion.div key="home-view" exit="exit">
      <motion.section
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: reduceMotion ? 0 : "-100vw", opacity: 0 }}
        transition={sectionTransition}
        inert={isAboutActive}
        aria-hidden={isAboutActive}
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
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://calendar.app.google/eE5FcZnghkSBCSpH8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground inline-flex h-12 items-center gap-3 rounded-lg px-6 text-sm font-semibold shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Let&apos;s Work Together <ArrowUpRight className="size-4" />
              </a>
              <div className="text-primary flex items-center gap-2 transition-colors">
                <a
                  href="https://github.com/GiovanAaron"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit my GitHub profile"
                  className="opacity-60 rounded-sm transition-opacity hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                <svg
                  role="img"
                  aria-label="GitHub"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M12 .297a12 12 0 0 0-3.793 23.385c.6.111.82-.261.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 6.006 0c2.291-1.552 3.297-1.23 3.297-1.23.654 1.652.243 2.873.119 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.625-5.479 5.922.43.372.823 1.102.823 2.222v3.293c0 .319.216.694.825.576A12.001 12.001 0 0 0 12 .297Z" />
                </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/giovan-aaron-8410751b5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit my LinkedIn profile"
                  className="opacity-60 rounded-sm transition-opacity hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                <svg
                  role="img"
                  aria-label="LinkedIn"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                </svg>
                </a>
              </div>

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
      </motion.section>
        <PortfolioCommandMenu />
      <motion.section
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 0.8 }}
        exit={{ x: reduceMotion ? 0 : "100vw", opacity: 0 }}
        transition={{ ...sectionTransition, delay: reduceMotion ? 0 : 0.08 }}
        inert={isAboutActive}
        aria-hidden={isAboutActive}
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
      </motion.section>
      </motion.div>
      ) : (
      <motion.section
        key="about-view"
        initial={{ x: reduceMotion ? 0 : "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: reduceMotion ? 0 : "100vw", opacity: 0 }}
        transition={sectionTransition}
        className="mx-auto w-full pt-8 pb-12 text-left sm:pt-10"
        id="about-me"
      >
   
        <AboutMe />

        <div className="mx-auto  flex w-full max-w-[1440px] justify-start px-5 sm:px-8 lg:px-14">
          <button
            type="button"
            onClick={() => setIsAboutActive(false)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </button>
        </div>
        
      </motion.section>
      )}
      </AnimatePresence>
    
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
