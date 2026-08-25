import {
  ArrowUpRight,
  Box,
  ChevronDown,
  CircleDollarSign,
  MoveUpRight,
  Sparkles,
  Star,
} from "lucide-react"
import type { ReactNode } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const companies = [
  "daily.dev",
  "Y Combinator",
  "bestofjs",
  "Product Hunt",
  "reddit",
  "Medium",
  "DEV",
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <header className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-14">
        <a href="#home" className="flex items-center gap-3 font-semibold">
          <span className="grid size-8 place-items-center rounded-full bg-zinc-950 text-white">
            <Sparkles className="size-4" />
          </span>
          <span className="text-lg">shadcn/studio</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-zinc-500 md:flex">
          <a href="#home" className="font-medium text-zinc-950">Home</a>
          <a href="#products" className="transition-colors hover:text-zinc-950">Products</a>
          <a href="#about" className="transition-colors hover:text-zinc-950">About Us</a>
          <a href="#contact" className="transition-colors hover:text-zinc-950">Contacts</a>
        </nav>

    
      </header>

      <section
        id="home"
        className="mx-auto grid min-h-[660px] max-w-[1440px] items-center px-6 lg:grid-cols-[1fr_1.03fr] lg:px-14"
      >
        <div className="relative z-10 py-16 lg:pr-10">
          <Badge className="mb-5 rounded-full bg-zinc-950 px-2.5 py-1 text-[11px] text-white">
            UI/UX
          </Badge>

       <h1 className="mt-5 text-[clamp(2.8rem,7vw,5.8rem)] leading-[0.88] font-bold tracking-[-0.065em]">
              <span className="mb-3 block text-[0.52em] leading-none tracking-[-0.04em]">Hello I&apos;m</span>
              Giovan Aaron
              <span className="mt-4 block text-[0.47em] leading-[0.95] tracking-[-0.045em]">Creative UI/UX Designer</span>
            </h1>
            <p className="text-muted-foreground mt-7 max-w-[650px] text-sm leading-7 sm:text-base">A UI/UX Designer focused on creating user-friendly interfaces and optimizing the overall user experience by understanding user needs and behaviors. I combine visual design with research and testing to ensure digital products are functional and engaging.</p>
  

          <Button id="contact" className="mt-7 rounded-md px-6 py-6">
            Let&apos;s Work Together
          </Button>

          <div className="mt-8 flex items-center" aria-label="More than one thousand clients">
            {["JS", "UX", "UI"].map((name, index) => (
              <Avatar key={name} className={index ? "-ml-2.5 border-2 border-white" : "border-2 border-white"}>
                <AvatarFallback className="bg-zinc-200 text-xs font-semibold">{name}</AvatarFallback>
              </Avatar>
            ))}
            <span className="ml-2 text-sm font-medium">+1K</span>
          </div>
        </div>

        <div
          id="products"
          className="relative min-h-[540px] overflow-hidden rounded-tl-[90px] bg-zinc-100 lg:min-h-[600px] lg:rounded-tl-[150px]"
        >
          <img
            src="/reference.png"
            alt="John Smith"
            className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover object-[70%_48%] grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-100/70 via-transparent to-transparent" />

          <MetricCard className="left-4 top-5 w-52 lg:-left-6">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span className="grid size-6 place-items-center rounded-md bg-zinc-100"><Box className="size-3.5" /></span>
              42
            </div>
            <p className="mt-3 text-xs font-semibold">Shipped Orders</p>
            <p className="mt-2 text-[10px] text-zinc-500"><b className="text-zinc-950">+18.2%</b> &nbsp;than last week</p>
          </MetricCard>

          <MetricCard className="right-[-28px] top-24 w-60">
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-2"><CircleDollarSign className="size-4" /> Total Revenue</span>
              <span className="flex items-center gap-1">30 Days <ChevronDown className="size-3" /></span>
            </div>
            <p className="mt-4 text-xl font-bold">$12,400 <Change>15%</Change></p>
          </MetricCard>

          <MetricCard className="bottom-40 left-2 w-52 lg:-left-16">
            <p className="text-[11px]">Ratings</p>
            <Badge variant="secondary" className="mt-1 px-1.5 py-0 text-[9px]">Last 6 months</Badge>
            <div className="mt-4 flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3 fill-zinc-950" />)}</div>
            <p className="mt-1 text-lg font-bold">8.14k <Change>18.2%</Change></p>
          </MetricCard>

          <MetricCard className="bottom-28 right-[-30px] w-40">
            <MoveUpRight className="size-4" />
            <p className="mt-4 text-xs font-semibold">Total Income</p>
            <p className="mt-2 text-[10px] text-zinc-500">Last week</p>
            <p className="mt-1 font-bold">$4,673</p>
            <Change>25.2%</Change>
          </MetricCard>

          <div className="absolute bottom-12 left-[-35px] size-44 rounded-full border border-dashed border-zinc-400" aria-hidden="true">
            <ArrowUpRight className="absolute -right-6 -top-5 size-7" />
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-[1440px] px-6 py-16 text-center lg:px-14">
        <p className="mb-8 text-sm text-zinc-500">Trusted by these great Companies</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 text-lg font-semibold text-zinc-500 grayscale">
          {companies.map((company) => <span key={company}>{company}</span>)}
        </div>
      </section>
    </main>
  )
}

function MetricCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <Card className={`absolute z-10 border-zinc-200 bg-white/95 shadow-sm backdrop-blur ${className}`}>
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  )
}

function Change({ children }: { children: ReactNode }) {
  return (
    <Badge variant="secondary" className="ml-1 rounded-full px-1.5 py-0 text-[9px] font-medium">
      ↗ {children}
    </Badge>
  )
}
