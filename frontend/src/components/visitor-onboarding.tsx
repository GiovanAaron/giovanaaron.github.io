"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { useVisitor } from "@/components/visitor-provider";
import type { Industry, Role, VisitorType, VisitorProfile } from "@/types/visitor";

const visitorOptions: { label: string; value: VisitorType }[] = [
  { label: "Talent Partner/ Agency", value: "talent_partner_agency" },
  { label: "Internal Recruitment Specialist", value: "internal_recruitment_specialist" },
  { label: "Other", value: "other" },
];
const industryOptions: { label: string; value: Industry; description?: string }[] = [
  { label: "AI", value: "ai" },
  { label: "Healthtech", value: "healthtech" },
  { label: "Tech for good / Nonprofit", value: "tech_for_good_nonprofit" },
  { label: "Finance / Banking", value: "finance_banking" },
  { label: "Greentech / Renewable energy", value: "greentech_renewable_energy" },
  { label: "Energy", value: "energy" },
  { label: "Retail", value: "retail" },
  { label: "Media / Publishing", value: "media_publishing" },
  { label: "B2B", value: "b2b" },
  { label: "None of the above", value: "ai", 
    // description: "Use the default AI CV for your selected role." 
  },
];
const roleOptions: { label: string; value: Role }[] = [
  { label: "Full Stack Development", value: "full_stack" },
  { label: "Backend Development", value: "backend" },
  { label: "Frontend Development", value: "frontend" },
  { label: "Mobile Development", value: "mobile" },
];

export function VisitorOnboarding({ purpose = "question", onComplete, onCancel }: {
  purpose?: "question" | "resume";
  onComplete: (profile: VisitorProfile) => void;
  onCancel: () => void;
}) {
  const visitor = useVisitor();
  const [step, setStep] = useState<"visitor" | "industry" | "role">(
    !visitor.visitorType ? "visitor" : !visitor.requestedIndustry ? "industry" : "role",
  );
  const [isCompleting, setIsCompleting] = useState(false);
  const complete = useEffectEvent(() => onComplete(visitor));
  const ready = visitor.visitorType === "other" || Boolean(visitor.visitorType && visitor.requestedIndustry && visitor.role);
  useEffect(() => {
    if (!isCompleting || !ready) return;
    const timer = window.setTimeout(() => complete(), 0);
    return () => window.clearTimeout(timer);
  }, [isCompleting, ready]);

  return (
    <section aria-label={purpose === "resume" ? "Resume preferences" : "Your background"}
      className="bg-background/95 border-border max-h-[65dvh] overflow-y-auto rounded-2xl border p-5 shadow-lg backdrop-blur-xl">
      <p className="text-muted-foreground text-xs">Step {step === "visitor" ? "1" : step === "industry" ? "2" : "3"} of 3</p>
      <h2 key={step} ref={node => { node?.focus(); }} tabIndex={-1}
        className="mt-2 text-base font-semibold outline-none">
        {step === "visitor" ? "Are you a…?" : step === "industry" ? "Which industry are you recruiting for?" : "Which type of role are you recruiting for?"}
      </h2>
      <p className="text-muted-foreground mt-1 text-sm">
        {purpose === "resume" ? "To access my CV, please complete the following questions." : "A little context helps me answer your question."}
      </p>
      <div className={`mt-4 gap-2 ${step === "industry" ? "grid grid-cols-2" : "flex flex-col"}`}>
        {step === "visitor" ? visitorOptions.map(option => (
          <Button key={option.value} type="button" variant="outline" disabled={isCompleting}
            className="h-auto min-h-11 justify-start whitespace-normal px-3 py-2 text-left"
            onClick={() => {
              visitor.setVisitorType(option.value);
              if (option.value === "other") setIsCompleting(true);
              else setStep("industry");
            }}>{option.label}</Button>
        )) : step === "industry" ? industryOptions.map(option => (
          <Button key={option.label} type="button" variant="outline"
            className="h-auto min-h-11 min-w-0 justify-start whitespace-normal px-3 py-2 text-left"
            onClick={() => { visitor.setIndustry(option.value); setStep("role"); }}>
            <span className="min-w-0 break-words">{option.label}{option.description ? <span className="text-muted-foreground mt-1 block text-xs font-normal">{option.description}</span> : null}</span>
          </Button>
        )) : roleOptions.map(option => (
          <Button key={option.value} type="button" variant="outline" disabled={isCompleting}
            className="h-auto min-h-11 justify-start whitespace-normal px-3 py-2 text-left"
            onClick={() => { visitor.setRole(option.value); setIsCompleting(true); }}>{option.label}</Button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        {step !== "visitor" ? <Button type="button" variant="ghost" disabled={isCompleting}
          onClick={() => setStep(step === "role" ? "industry" : "visitor")}>Back</Button> : null}
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </section>
  );
}
