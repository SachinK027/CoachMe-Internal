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
import { AnimatedStat } from "@/components/ui/AnimatedStat";
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
          <h2 className="display mt-4 text-4xl text-charcoal md:text-5xl">
            {brandIntro.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-2xl leading-relaxed text-forest md:text-3xl">{brandIntro.body}</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {brandIntro.supporting}
          </p>
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
            <div className="flex items-end justify-between gap-6 border-l-2 border-[var(--accent)] pl-6">
              <div>
                <p className="display text-5xl text-forest md:text-6xl">
                  <AnimatedStat value={stat.value} />
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-muted">
                  {stat.label}
                </p>
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
    <section className="section-pad surface-ivory">
      <div className="container-page">
        <SectionHeading
          eyebrow="Ways we can work together"
          title="Advisory shaped around diagnosis, not generic programmes."
          description="Four clear ways to engage — from a first conversation to deeper advisory work."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <Link href={`/services/${service.slug}`} className="group block h-full">
                <article className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-[#eef3ee] p-7 transition-all duration-400 hover:-translate-y-1 hover:border-transparent hover:bg-forest hover:shadow-[0_28px_60px_rgba(38,63,56,0.28)] md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <p className="display text-4xl text-forest/20 transition group-hover:text-[var(--accent)]/70 md:text-5xl">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-forest/15 text-forest transition group-hover:border-[var(--accent)]/40 group-hover:text-[var(--accent)]">
                      ↗
                    </span>
                  </div>

                  <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-[1.25rem]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="display mt-6 text-2xl text-charcoal transition group-hover:text-white md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted transition group-hover:text-white/80 md:text-base">
                    {service.shortDescription}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-forest transition group-hover:text-[var(--accent)]">
                      {service.bookable ? "Book / learn more" : "Learn more"}
                    </span>
                    {service.priceLabel ? (
                      <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-forest transition group-hover:bg-white/10 group-hover:text-white">
                        {service.priceLabel}
                      </span>
                    ) : null}
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

export function InpInteractive() {
  const [active, setActive] = useState(1);

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our method"
          title="The INP Method"
          description="A practical 3-step approach to identifying challenges, navigating change and improving performance across people, processes and business operations."
        />

        <div className="mt-8 h-px w-full overflow-hidden bg-line">
          <div
            className="h-full bg-forest transition-all duration-500"
            style={{ width: `${((active + 1) / inpMethod.length) * 100}%` }}
          />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {inpMethod.map((step, index) => {
            const isActive = active === index;
            return (
              <button
                key={step.title}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`rounded-[1.75rem] border p-7 text-left transition-all duration-400 md:min-h-[17rem] md:p-8 ${
                  isActive
                    ? "border-transparent bg-forest text-white shadow-[0_28px_60px_rgba(38,63,56,0.28)]"
                    : "border-transparent bg-[#eef3ee] text-charcoal hover:-translate-y-1"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p
                    className={`display text-4xl md:text-5xl ${
                      isActive ? "text-[var(--accent)]" : "text-forest/20"
                    }`}
                  >
                    {step.step}
                  </p>
                  <span
                    className={`text-lg ${isActive ? "text-[var(--accent)]" : "text-forest/40"}`}
                  >
                    ↗
                  </span>
                </div>
                <h3
                  className={`display mt-8 text-3xl ${isActive ? "text-white" : "text-forest"}`}
                >
                  {step.title}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed md:text-base ${
                    isActive ? "text-white/80" : "text-muted"
                  }`}
                >
                  {step.summary}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <Button href="/about/inp-method" variant="secondary">
            Explore the method
          </Button>
        </div>
      </div>
    </section>
  );
}

export function VideoSection() {
  const video = siteSettings.video;
  if (!video) return null;

  return (
    <section className="section-pad surface-forest grain">
      <div className="container-page relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            Introduction
          </p>
          <h2 className="display mt-4 text-4xl text-white md:text-5xl">
            Get to know CoachME
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 md:text-lg">
            Understand how we approach business challenges, leadership and organisational
            performance.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem]">
            <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-forest/45" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                aria-label="Play introduction video"
                className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent)] text-forest shadow-[0_0_0_8px_rgba(201,217,108,0.2),0_18px_40px_rgba(0,0,0,0.28)] transition hover:scale-105 hover:shadow-[0_0_0_10px_rgba(201,217,108,0.28),0_22px_48px_rgba(0,0,0,0.32)]"
              >
                <span className="ml-1 text-2xl">▶</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FounderTeaser() {
  return (
    <section className="section-pad surface-ivory">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image src={founder.image} alt={founder.name} fill className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">Founder</p>
          <h2 className="display mt-4 text-4xl text-charcoal md:text-5xl">{founder.name}</h2>
          <p className="mt-2 text-forest">
            {founder.role} · {founder.credentials}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{founder.shortBio}</p>
          <Button href="/about" className="mt-8" variant="secondary">
            Read the founder story
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export function VoicesPlaceholder() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <SectionHeading eyebrow="Voices" title="What clients say" />
        <Reveal>
          <div className="mt-10 rounded-[2rem] bg-[#e7efe8] p-8 md:p-12">
            <p className="display text-6xl leading-none text-forest/25">&ldquo;</p>
            <p className="display mt-4 max-w-3xl text-2xl text-forest md:text-3xl">
              Client testimonial to be added. Share a short quote describing the impact of working
              with CoachME.
            </p>
            <p className="mt-6 text-sm text-muted">Client name — Role, organisation</p>
            <p className="mt-8 text-xs text-muted">
              Placeholder — real testimonials to be supplied. No fabricated quotes are shown.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function InsightsPreview() {
  return (
    <section className="section-pad border-t border-line surface-ivory">
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
                <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(37,43,41,0.08)]">
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
                    <h3 className="mt-3 display text-2xl leading-tight text-charcoal group-hover:text-forest">
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
          <h2 className="display text-4xl text-white md:text-5xl">{finalCta.headline}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">{finalCta.body}</p>
          <Button href={finalCta.cta.href} variant="accent" className="mt-8">
            {finalCta.cta.label} →
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
