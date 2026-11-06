import type { Metadata } from "next";
import { inpMethod } from "@coachme/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "INP Method",
  description:
    "Identify, Navigate and Perform — CoachME Advisory’s practical three-step approach.",
};

export default function InpMethodPage() {
  return (
    <div className="surface-ivory">
      <section className="container-page section-pad">
        <Breadcrumbs
          items={[
            { label: "About", href: "/about" },
            { label: "INP Method" },
          ]}
        />
        <Reveal>
          <p className="eyebrow">INP Method</p>
          <h1 className="display mt-4 max-w-4xl text-5xl md:text-6xl">
            Identify. Navigate. Perform.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            A practical 3-step approach to identifying challenges, navigating change and improving
            performance across people, processes and business operations.
          </p>
        </Reveal>

        <div className="mt-16 space-y-8">
          {inpMethod.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08}>
              <article className="grid overflow-hidden rounded-[2rem] border border-line bg-white md:grid-cols-[0.35fr_1fr]">
                <div className="flex items-end bg-forest p-8 text-ivory md:p-10">
                  <div>
                    <p className="text-xs tracking-[0.18em] text-champagne">{step.step}</p>
                    <h2 className="display mt-3 text-4xl md:text-5xl">{step.title}</h2>
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <p className="text-xl text-forest">{step.summary}</p>
                  <p className="mt-4 leading-relaxed text-muted">{step.detail}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-14">
          <Button href="/booking/strategic-introduction-call">Book Introduction Call</Button>
        </div>
      </section>
    </div>
  );
}
