import type { Metadata } from "next";
import Image from "next/image";
import { founder, verifiedStats } from "@coachme/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Meet the Founder",
  description: founder.shortBio,
};

export default function AboutPage() {
  return (
    <div className="surface-ivory">
      <section className="container-page section-pad pb-10">
        <Breadcrumbs items={[{ label: "About" }]} />
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image src={founder.image} alt={founder.name} fill className="object-cover" priority />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Meet the Founder</p>
            <h1 className="display mt-4 text-5xl md:text-6xl">{founder.name}</h1>
            <p className="mt-3 text-lg text-forest">
              {founder.role} · {founder.credentials}
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{founder.shortBio}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="container-page grid gap-8 py-12 md:grid-cols-2">
          {verifiedStats.map((stat) => (
            <div key={stat.label} className="border-l-2 border-champagne pl-6">
              <p className="display text-5xl text-forest">{stat.value}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-muted">{stat.label}</p>
              {stat.sourceNote ? <p className="mt-2 text-sm text-muted">{stat.sourceNote}</p> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Professional journey" title="Why CoachME exists." />
          <div className="space-y-5">
            {founder.story.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Advisory process" title="How engagements typically unfold." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {founder.advisoryProcess.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.08}>
                <article className="h-full rounded-[1.75rem] border border-line bg-ivory p-8">
                  <p className="text-xs tracking-[0.18em] text-sage">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="display mt-4 text-3xl">{step.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Button href="/about/our-approach">Our Approach</Button>
            <Button href="/about/inp-method" variant="secondary">
              INP Method
            </Button>
            <Button href="/booking/strategic-introduction-call" variant="secondary">
              Book Introduction Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
