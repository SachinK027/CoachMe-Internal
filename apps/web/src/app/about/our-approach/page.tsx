import type { Metadata } from "next";
import { approachPage, founder } from "@coachme/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: approachPage.seo.title.replace(" | CoachME Advisory", ""),
  description: approachPage.seo.description,
};

export default function OurApproachPage() {
  return (
    <div className="surface-ivory">
      <section className="container-page section-pad">
        <Breadcrumbs
          items={[
            { label: "About", href: "/about" },
            { label: "Our Approach" },
          ]}
        />
        <Reveal>
          <p className="eyebrow">Our Approach</p>
          <h1 className="display mt-4 max-w-4xl text-5xl md:text-6xl">{approachPage.headline}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{approachPage.intro}</p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {approachPage.principles.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 0.08}>
              <article className="h-full rounded-[1.75rem] border border-line bg-white p-8">
                <p className="text-xs tracking-[0.18em] text-champagne">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="display mt-4 text-3xl">{principle.title}</h2>
                <p className="mt-4 leading-relaxed text-muted">{principle.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 rounded-[2rem] surface-forest grain p-10 md:p-14">
          <div className="relative z-10 max-w-3xl">
            <SectionHeading
              invert
              eyebrow="From founder philosophy"
              title="Look beyond the immediate problem."
              description={founder.story[4]}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about/inp-method" variant="inverse">
                See the INP Method
              </Button>
              <Button
                href="/booking/strategic-introduction-call"
                variant="secondary"
                className="border-ivory/30 text-ivory hover:border-ivory hover:bg-white/10"
              >
                Book Introduction Call
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
