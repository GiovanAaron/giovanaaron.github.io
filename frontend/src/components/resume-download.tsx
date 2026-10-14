"use client";

import { useEffect, useRef, useState } from "react";
import { VisitorOnboarding } from "@/components/visitor-onboarding";
import { useVisitor } from "@/components/visitor-provider";
import { Button } from "@/components/ui/button";

export function ResumeDownload() {
  const { visitorType, resolution } = useVisitor();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [isReadyToDownload, setIsReadyToDownload] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => {
          setError("");
          setIsReadyToDownload(Boolean(visitorType && resolution));
          setIsOpen(true);
        }}
        className="bg-primary text-primary-foreground inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Request my resume 📁
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Request my resume"
        onCancel={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
        className="bg-background text-foreground fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-xl rounded-2xl p-0 backdrop:bg-black/40"
      >
        {isOpen && isReadyToDownload && resolution ? (
          <section className="border-border rounded-2xl border p-5">
            <h2
              ref={(node) => { node?.focus(); }}
              tabIndex={-1}
              className="text-base font-semibold outline-none"
            >
              Your resume is ready
            </h2>
            {/* <p className="text-muted-foreground mt-2 text-sm">
              Download my CV below.
            </p> */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={`/cv/${encodeURIComponent(resolution.asset.filename)}`}
                download={resolution.asset.filename}
                className="bg-primary text-primary-foreground inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Download
              </a>
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </section>
        ) : isOpen ? (
          <VisitorOnboarding
            purpose="resume"
            onCancel={() => setIsOpen(false)}
            onComplete={(profile) => {
              if (!profile.resolution) {
                setError("A CV is currently unavailable for these preferences.");
                return;
              }
              setIsReadyToDownload(true);
            }}
          />
        ) : null}
        {error ? <p role="alert" className="px-5 pb-5 text-sm">{error}</p> : null}
      </dialog>
    </>
  );
}
