"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, prefersReducedMotion } from "@/lib/animations";
import { submitPreorderInterest } from "@/lib/preorder";

gsap.registerPlugin(ScrollTrigger);

type Step = "invite" | "form" | "received";

const fieldClass =
  "w-full border-0 border-b border-ink/25 bg-transparent py-2 font-sans text-[13px] font-light tracking-[0.02em] text-ink outline-none transition-colors duration-500 placeholder:text-ink-faint focus:border-ink/70";

const labelClass =
  "font-sans text-[9px] uppercase tracking-[0.32em] text-ink-faint";

export default function ExpectedPriceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const priceRef = useRef<HTMLParagraphElement>(null);
  const supportingRef = useRef<HTMLParagraphElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<Step>("invite");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();
    const section = sectionRef.current;
    const price = priceRef.current;
    const supporting = supportingRef.current;

    if (!section || !price || !supporting) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([price, supporting], { opacity: 1, y: 0 });
        return;
      }

      gsap.set([price, supporting], { opacity: 0, y: 28 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: EASE.soft },
        })
        .to(price, { opacity: 1, y: 0, duration: 1.4 }, 0)
        .to(supporting, { opacity: 1, y: 0, duration: 1.2 }, 0.16);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || step === "invite" || prefersReducedMotion()) return;

    gsap.fromTo(
      panel,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power1.out" },
    );
  }, [step]);

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPending(true);
    setError(null);

    const result = await submitPreorderInterest({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      country: String(data.get("country") ?? ""),
    });

    setPending(false);
    if (result.ok) {
      setStep("received");
      return;
    }
    setError(result.error);
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="price-heading"
      data-surface="stone"
      className="relative overflow-x-hidden bg-stone text-ink"
    >
      <div className="relative mx-auto flex min-h-[75svh] max-w-[100vw] flex-col justify-center px-6 py-[18vh] md:px-[8vw] md:py-[22vh]">
        <p
          id="price-heading"
          ref={priceRef}
          className="font-serif text-[clamp(4rem,14vw,9rem)] font-light leading-[0.9] tracking-[-0.04em] text-ink"
        >
          £895
        </p>

        <p
          ref={supportingRef}
          className="mt-8 max-w-[280px] font-sans text-[11px] font-light leading-[1.9] tracking-[0.05em] text-ink-muted md:mt-10 md:text-[12px]"
        >
          Expected retail price: £895 per pair.
        </p>

        <p className="mt-6 font-sans text-[9px] uppercase tracking-[0.42em] text-ink-faint md:mt-7 md:text-[10px]">
          MADE IN JAPAN
        </p>

        <div className="mt-10 max-w-[320px] md:mt-12">
          {step === "invite" ? (
            <button
              type="button"
              onClick={() => setStep("form")}
              className="group text-left font-sans text-[10px] uppercase tracking-[0.34em] text-ink"
            >
              PRE-ORDER HUG →
              <span
                aria-hidden="true"
                className="mt-3 block h-px w-8 bg-ink/35 transition-all duration-700 ease-out group-hover:w-full group-hover:bg-ink/70"
              />
            </button>
          ) : (
            <div ref={panelRef}>
              {step === "form" ? (
                <form onSubmit={submitRequest} className="flex flex-col gap-6">
                  <p className="font-sans text-[10px] uppercase tracking-[0.34em] text-ink">
                    PRE-ORDER HUG
                  </p>

                  <label className="flex flex-col gap-2">
                    <span className={labelClass}>Name</span>
                    <input
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className={fieldClass}
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className={labelClass}>Email</span>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={fieldClass}
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className={labelClass}>Country</span>
                    <input
                      name="country"
                      type="text"
                      required
                      autoComplete="country-name"
                      className={fieldClass}
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={pending}
                    aria-busy={pending}
                    className="group mt-2 w-fit text-left font-sans text-[10px] uppercase tracking-[0.34em] text-ink disabled:opacity-100"
                  >
                    CONTINUE →
                    <span
                      aria-hidden="true"
                      className="mt-3 block h-px w-8 bg-ink/35 transition-all duration-700 ease-out group-hover:w-full group-hover:bg-ink/70"
                    />
                  </button>
                  {error ? (
                    <p
                      role="alert"
                      className="font-sans text-[11px] font-light leading-[1.9] tracking-[0.04em] text-ink-muted"
                    >
                      {error}
                    </p>
                  ) : null}
                </form>
              ) : (
                <div aria-live="polite">
                  <p className="font-sans text-[10px] uppercase tracking-[0.34em] text-ink">
                    THANK YOU.
                  </p>
                  <p className="mt-5 max-w-[280px] font-sans text-[11px] font-light leading-[1.9] tracking-[0.04em] text-ink-muted md:text-[12px]">
                    Your interest in HUG has been received.
                  </p>
                  <p className="mt-3 max-w-[280px] font-sans text-[11px] font-light leading-[1.9] tracking-[0.04em] text-ink-muted md:text-[12px]">
                    We will be in touch with the next steps.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
