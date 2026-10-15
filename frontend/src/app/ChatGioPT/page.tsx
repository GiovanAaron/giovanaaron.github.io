import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { PortfolioHeroImage } from "@/components/portfolio-hero-image";
import { GioPTChat } from "@/components/giopt-chat";

export const metadata: Metadata = {
  title: "ChatGioPT — Giovan Aaron",
  description: "Chat with Giovan’s portfolio assistant about his projects, skills and experience.",
};

export default function ChatGioPTPage() {
  return (
    <>
      <main className="bg-background min-h-screen overflow-hidden">
        <header className="relative z-30 mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
          <Link href="/" className="flex items-center gap-3" aria-label="Portfolio home">
            <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full"><Logo /></span>
            <span className="text-base font-semibold tracking-tight">Portfolio</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            <nav aria-label="Main navigation" className="flex items-center gap-6 text-sm sm:gap-8">
              <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">Home</Link>
              <Link href="/ChatGioPT" aria-current="page" className="text-foreground font-medium">ChatGioPT</Link>
            </nav>
            <ThemeToggle />
          </div>
        </header>
        <div className="relative mx-auto grid min-h-[610px] w-full max-w-[1440px] lg:grid-cols-[52%_48%]">
          <div className="relative z-20 flex items-center px-5 py-8 sm:px-8 lg:px-14"><GioPTChat /></div>
          <div className="relative min-h-[590px] overflow-hidden bg-[#e9e9e9] transition-colors dark:bg-[#292929] lg:min-h-0 lg:rounded-bl-[150px]">
            <PortfolioHeroImage />
          </div>
        </div>
      </main>
      <footer className="bg-background text-muted-foreground px-5 text-center text-sm sm:px-8">
        <div className="mx-auto max-w-[70%] border-t border-border/40 py-4 dark:border-white/15">© 2026 Gio Automate Ltd. All rights reserved.</div>
      </footer>
    </>
  );
}
