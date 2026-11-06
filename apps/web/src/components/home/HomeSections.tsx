"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  blogPosts,
  founder,
  homepage,
  inpMethod,
  services,
  siteSettings,
  verifiedStats,
} from "@coachme/content";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/utils";

export function BrandIntro() {
  const { brandIntro } = homepage;
  return (
    <section className="section-pad surface-ivory">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <Reveal>
          <p className="eyebrow">{brandIntro.eyebrow}</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">{brandIntro.headline}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-2xl leading-relaxed text-forest md:text-3xl">{brandIntro.body}</p>
          <p className="mt-5 max-w-xl text-muted leading-relaxed">{brandIntro.supporting}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-white">
      <div className="container-page grid gap-8 py-12 md:grid-cols-2">
        {verifiedStats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.08}>
            <div className="flex items-end justify-between gap-6 border-l-2 border-champagne pl-6">
              <div>
                <p className="display text-5xl text-forest md:text-6xl">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-muted">{stat.label}</p>
              </div>
              {stat.sourceNote ? (
                <p className="max-w-[12rem] text-right text-xs leading-relaxed text-muted">
                  {stat.sourceNote}
                </p>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ServicesShowcase() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="Ways we can work together"
          title="Advisory shaped around diagnosis, not generic programmes."
          description="Explore the services currently offered by CoachME Advisory."
        />
        <div className="mt-14 space-y-8">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <article className="group grid overflow-hidden rounded-[2rem] border border-line bg-white lg:grid-cols-[1.1fr_0.9fr]">
                <div className="flex flex-col justify-between p-8 md:p-10">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="display mt-4 text-3xl md:text-4xl">{service.title}</h3>
                    <p className="mt-4 max-w-xl text-muted leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <p className="mt-3 text-sm text-forest">{service.audience}</p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button href={`/services/${service.slug}`} variant="secondary">
                      Learn more
                    </Button>
                    {service.bookable ? (
                      <Button href={`/booking/${service.slug}`}>Book</Button>
                    ) : (
                      <Button href="/booking/strategic-introduction-call">
                        Start with an intro call
                      </Button>
                    )}
                  </div>
                </div>
                <div className="relative min-h-[16rem] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InpInteractive() {
  const [active, setActive] = useState(0);
  const current = inpMethod[active];

  return (
    <section className="section-pad surface-forest grain">
      <div className="container-page relative z-10">
        <SectionHeading
          invert
          eyebrow="INP Method"
          title="A practical three-step approach."
          description="Identify challenges, navigate change and improve performance across people, processes and business operations."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            {inpMethod.map((step, index) => (
              <button
                key={step.title}
                type="button"
                onClick={() => setActive(index)}
                className={`w-full rounded-2xl border px-5 py-5 text-left transition ${
                  active === index
                    ? "border-champagne bg-white/10"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                <p className="text-xs tracking-[0.18em] text-champagne">{step.step}</p>
                <p className="mt-2 display text-2xl text-ivory">{step.title}</p>
                <p className="mt-2 text-sm text-ivory/70">{step.summary}</p>
              </button>
            ))}
          </div>
          <Reveal>
            <div className="flex h-full flex-col justify-center rounded-[2rem] bg-ivory p-8 md:p-12 text-charcoal">
              <p className="eyebrow">{current.step}</p>
              <h3 className="display mt-4 text-4xl md:text-5xl">{current.title}</h3>
              <p className="mt-6 text-lg leading-relaxed text-muted">{current.detail}</p>
              <Button href="/about/inp-method" className="mt-8 w-fit" variant="secondary">
                Explore the method
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function VideoSection() {
  const video = siteSettings.video;
  if (!video) return null;

  return (
    <section className="section-pad surface-ivory">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionHeading
            eyebrow="Introduction"
            title={video.title}
            description="Video can be configured through website settings once the CMS is connected. For now this section uses the founder portrait as a premium placeholder."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem]">
            <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-forest/35" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ivory text-forest shadow-xl">
                <span className="ml-1 text-2xl">▶</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FounderTeaser() {
  return (
    <section className="section-pad">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image src={founder.image} alt={founder.name} fill className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">Founder</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">{founder.name}</h2>
          <p className="mt-2 text-forest">{founder.role} · {founder.credentials}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{founder.shortBio}</p>
          <Button href="/about" className="mt-8" variant="secondary">
            Read the founder story
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export function InsightsPreview() {
  return (
    <section className="section-pad border-t border-line bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Insights"
            title="Practical thinking on leadership, teams and communication."
          />
          <Button href="/blog" variant="secondary">
            View all articles
          </Button>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.06}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-ivory transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(37,43,41,0.08)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">
                      {formatDate(post.publishedAt)} · {post.readingTimeMinutes} min
                    </p>
                    <h3 className="mt-3 display text-2xl leading-tight group-hover:text-forest">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  const { finalCta } = homepage;
  return (
    <section className="section-pad surface-forest grain">
      <div className="container-page relative z-10 max-w-3xl text-center">
        <Reveal>
          <h2 className="display text-4xl text-ivory md:text-5xl">{finalCta.headline}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ivory/75">{finalCta.body}</p>
          <Button href={finalCta.cta.href} variant="inverse" className="mt-8">
            {finalCta.cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
