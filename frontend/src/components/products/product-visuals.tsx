import { ArrowDown, Database, LockKeyhole, ShieldCheck, ArrowRight, Gamepad2, HeartHandshake, Leaf, Sparkles, Workflow } from "lucide-react";
import type { PortfolioProduct, ProductId } from "@/types/products";

export function ProductMark({ id }: { id: ProductId }) {
  if (id === "chatgiopt") return <Sparkles className="size-3" />;
  if (id === "carequill") return <Workflow className="size-3" />;
  if (id === "gum") return <Gamepad2 className="size-3" />;
  if (id === "flowfree" || id === "giving") return <HeartHandshake className="size-3" />;
  return <Leaf className="size-3" />;
}

export function PrimaryProductVisual({ product }: { product: PortfolioProduct }) {
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

export function AlternateProductVisual({ product }: { product: PortfolioProduct }) {
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
