import Link from "next/link";
import { ArrowUpRight, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const photos = {
  film: "https://u.cubeupload.com/giovan/filmphoto.png",
  park: "https://u.cubeupload.com/giovan/menaturalpark3u27ju3.jpg",
  collage: "https://u.cubeupload.com/giovan/mebbc07dq0x7m0xvr.png",
};

function BrandMark() {
  return (
    <a className="inline-flex items-center gap-3 text-[18px] font-semibold tracking-[-.04em] text-ink no-underline" href="#top" aria-label="Giovan Aaron portfolio">
      <span className="grid size-10 place-items-center rounded-full bg-brand font-display text-xl text-white">GA</span>
      <span>Portfolio</span>
    </a>
  );
}



function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.16em] text-[#705144] before:h-px before:w-6 before:bg-[#cba58b] dark:text-[#d1ad98] sm:text-xs">{children}</div>;
}

function EditorialLayout() {
  return (
    <>
      <div className="grid items-center gap-12 text-left lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-[clamp(4rem,10vw,12rem)]">
        <div className="max-w-[620px]">
          <Eyebrow>A little more about me</Eyebrow>
          <h1 className="mt-7 max-w-[8.5ch] text-[clamp(3.5rem,6.4vw,6.5rem)] font-se leading-[1] tracking-[-.065em] text-[#22201e] dark:text-[#f5f0eb]">Curious by nature.<br /><em className="block font-[Georgia,serif] font-normal tracking-[-.06em] text-[#705144] dark:text-[#d1ad98]">Creative by default.</em></h1>
          <p className="mt-8 max-w-[620px] text-base leading-[1.8] text-[#706c67] dark:text-muted-foreground lg:text-lg">My route into software wasn’t a straight line. I graduated with a MSc Management of Innovation, then moved from project delivery at University College London towards building products myself. That mix still shapes me: I enjoy seeing the bigger picture, caring about the details, and asking whether what we make is genuinely useful to people.</p>
          <p className="mt-5 max-w-[620px] text-base leading-[1.8] text-[#706c67] dark:text-muted-foreground lg:text-lg">I’m drawn to work where care and craft matter, and where technology can feel clear, thoughtful and welcoming. Outside product work, I build games and produce electronic music, two ways I keep experimenting and telling stories.</p>
          {/* <div className="mt-7 font-[Georgia,serif] text-[clamp(1.35rem,1.8vw,1.75rem)] font-semibold italic text-[#705144] dark:text-[#d1ad98]">Good ideas deserve a human touch.</div> */}
        </div>
        <div className="relative mx-auto aspect-[.94] w-full max-w-[580px] overflow-hidden rounded-t-[50%] rounded-b-sm bg-[#eee7df]">
          <img
            width={580}
            height={440}
            className="size-full object-cover object-[center_42%] saturate-[.89]"
            src={photos.film}
            alt="Giovan smiling in a grainy film photograph"
          />
          <div className="absolute bottom-5 left-6 text-[9px] tracking-[.17em] text-white drop-shadow">me</div>
          <div className="absolute bottom-[11%] -left-6 max-w-[205px] -rotate-3 bg-[#fffaf3] px-5 py-4 shadow-[0_15px_35px_rgba(48,39,31,.12)] sm:-left-4">
            <small className="block text-[9px] uppercase tracking-[.16em] text-[#958271]">Off the clock</small>
            <span className="mt-1.5 block font-[Georgia,serif] text-xl leading-tight text-[#44362e]">Tori Amos #1 fan</span>
          </div>
        </div>
      </div>
      <div className="my-14 grid grid-cols-2 gap-y-5 border-y border-line py-6 md:my-20 md:grid-cols-[.65fr_1fr_1fr_1fr] md:items-center md:gap-5 md:py-7">
        <h2 className="col-span-2 m-0 text-[10px] font-bold uppercase tracking-[.15em] text-[#988c81] md:col-span-1">What matters to me</h2>
        {[
          ["Useful over flashy", "Care in the details", "Room for play"],
        ][0].map((value) => <div key={value} className="font-display text-base text-[#4c4642] sm:text-lg">{value}</div>)}
      </div>
      <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="m-0 font-display text-2xl font-normal tracking-[-.04em] sm:text-[27px]">A few frames from life beyond the screen</h2>
        <p className="m-0 text-[11px] text-[#8a827b]">Outside, on set, and somewhere in between.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-[.88fr_1.22fr]">
        <figure className="group relative m-0 h-[270px] overflow-hidden bg-cream md:h-[345px]">
          <img className="size-full object-cover object-[center_62%] transition-transform duration-500 group-hover:scale-[1.02]" src={photos.park} alt="Giovan on a trail in a green Italian natural park" />
          <figcaption className="absolute bottom-3.5 left-3.5 rounded-sm bg-[#fffdf9e8] px-2.5 py-2 text-[10px] text-[#4a423b]">A day out in the Italian countryside</figcaption>
        </figure>
        <figure className="group relative m-0 h-[270px] overflow-hidden bg-cream md:h-[345px]">
          <img className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" src={photos.collage} alt="Three-panel collage showing Giovan at a BBC News set, on an event carpet, and beside a green screen" />
          <figcaption className="absolute bottom-3.5 left-3.5 rounded-sm bg-[#fffdf9e8] px-2.5 py-2 text-[10px] text-[#4a423b]">My alter ego as a BBC News reporter</figcaption>
        </figure>
      </div>
      <div className="mt-10 flex flex-col gap-3 border-t border-line py-7 text-[13px] text-[#756d66] sm:flex-row sm:items-center sm:justify-between md:mt-[60px]">
        {/* <span><strong className="font-semibold text-brand">Curiosity takes different forms.</strong> Sometimes it’s a prototype, a game, or a new sound.</span><span>London · UK</span> */}
      </div>
    </>
  );
}

function PhotoLedLayout() {
  return (
    <div className="grid items-start gap-9 md:grid-cols-[minmax(0,1.15fr)_minmax(310px,.75fr)] md:gap-12 lg:gap-[7vw]">
      <div className="grid grid-cols-[1.2fr_.8fr] grid-rows-[280px_175px] gap-2.5 sm:grid-rows-[350px_230px] md:grid-rows-[minmax(280px,400px)_270px] md:gap-3.5">
        <figure className="group relative col-span-2 m-0 overflow-hidden bg-cream">
          <img className="size-full object-cover object-[center_55%] transition-transform duration-500 group-hover:scale-[1.02]" src={photos.collage} alt="Three-panel collage showing Giovan presenting at a BBC News set, at an event, and on a green-screen set" />
          <figcaption className="absolute bottom-2 left-2 bg-[#f9f7f2eb] px-2.5 py-2 text-[9px] text-[#514840] sm:bottom-3 sm:left-3 sm:text-[10px]">Behind the scenes, and the moment it came together</figcaption>
        </figure>
        <figure className="group relative m-0 overflow-hidden bg-cream">
          <img className="size-full object-cover object-[center_40%] transition-transform duration-500 group-hover:scale-[1.02]" src={photos.film} alt="Giovan smiling in a film photograph" />
          <figcaption className="absolute bottom-2 left-2 bg-[#f9f7f2eb] px-2 py-1.5 text-[9px] text-[#514840] sm:bottom-3 sm:left-3 sm:px-2.5 sm:text-[10px]">Grain, light, good company</figcaption>
        </figure>
        <figure className="group relative m-0 overflow-hidden bg-cream">
          <img className="size-full object-cover object-[center_58%] transition-transform duration-500 group-hover:scale-[1.02]" src={photos.park} alt="Giovan surrounded by green hills and a lake in Italy" />
          <figcaption className="absolute bottom-2 left-2 bg-[#f9f7f2eb] px-2 py-1.5 text-[9px] text-[#514840] sm:bottom-3 sm:left-3 sm:px-2.5 sm:text-[10px]">A slower day outdoors</figcaption>
        </figure>
      </div>
      <div className="pt-4 md:pt-6">
        <Eyebrow>Beyond the job title</Eyebrow>
        <h1 className="mt-6 text-[clamp(3rem,5.2vw,4.6rem)] font-medium leading-[.98] tracking-[-.075em]">People first.<br /><em className="font-display font-normal tracking-[-.07em] text-brand">Always curious.</em></h1>
        <p className="mt-6 text-[14px] leading-[1.8] text-[#706c67] dark:text-muted-foreground sm:text-[15px]">I didn’t take a straight route into software. After studying Management of Innovation at Goldsmiths and working in project delivery, I found myself wanting to get closer to the making: shaping ideas, testing them, and seeing how they feel in real life.</p>
        <blockquote className="my-7 border-l-2 border-tan py-1 pl-5 font-display text-lg leading-relaxed text-brand sm:my-8 sm:text-xl">“I care about the feeling a product leaves people with, as much as the problem it solves.”</blockquote>
        <p className="text-[14px] leading-[1.8] text-[#706c67] dark:text-muted-foreground sm:text-[15px]">That’s why I value empathy, collaboration and the small details that make something easier to use. Away from product work, I make games and work with audio. Both keep me playful, and remind me that a little personality can go a long way.</p>
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5">
          <div><h2 className="mb-2 text-[9px] font-bold uppercase tracking-[.14em] text-[#8f8074]">What I value</h2><p className="m-0 text-[11px] leading-relaxed text-[#706c67] dark:text-muted-foreground sm:text-xs">Thoughtful work, open minds, and technology that respects the people using it.</p></div>
          <div><h2 className="mb-2 text-[9px] font-bold uppercase tracking-[.14em] text-[#8f8074]">What I do for fun</h2><p className="m-0 text-[11px] leading-relaxed text-[#706c67] dark:text-muted-foreground sm:text-xs">I love to dance sala, listen to flamenco music, and the occasional five-a-aside kickabout ⚽️</p></div>
        </div>
        {/* <div className="mt-7 flex flex-col gap-2 text-[#827870] sm:flex-row sm:items-center sm:justify-between">
          <span className="font-display text-lg italic text-brand">Making room for the human side.</span><span className="text-[11px]">Giovan Aaron · London</span>
        </div> */}
      </div>
    </div>
  );
}

export default function AboutMe() {
  return (
    <div id="top" className="min-h-screen bg-[#f8f7f5] text-left dark:bg-background">
      <Tabs defaultValue="editorial" className="gap-0">
        <div className="mx-auto mb-7 flex w-full max-w-[1440px] justify-end gap-3 px-5 sm:mb-10 sm:items-center sm:px-8 lg:px-[5.2%]">
          {/* <span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#92877e]">About page · layout studies</span> */}
          <TabsList aria-label="Choose a layout direction">
            <TabsTrigger value="editorial">01 · Editorial</TabsTrigger>
            <TabsTrigger value="photo-led">02 · Photo-led</TabsTrigger>
          </TabsList>
        </div>
        <main id="about" className="mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-20 lg:px-[5.2%] lg:pb-0">
          <TabsContent value="editorial"><EditorialLayout /></TabsContent>
          <TabsContent value="photo-led"><PhotoLedLayout /></TabsContent>
        </main>
      </Tabs>
    

    </div>
  );
}
