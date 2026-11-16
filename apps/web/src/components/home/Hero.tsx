"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { founder, homepage } from "@coachme/content";
import { Button } from "@/components/ui/Button";
import { ExperienceBadge } from "@/components/ui/ExperienceBadge";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { hero } = homepage;

  return (
    <section className="relative overflow-hidden surface-forest grain min-h-[92vh]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(245,241,233,0.55) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="container-page relative z-10 grid min-h-[92vh] items-center gap-12 py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            className="display mt-5 text-4xl text-white md:text-5xl lg:text-[3.55rem] lg:leading-[1.08]"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
          >
            <span className="block text-white">{hero.headline}</span>
            <span className="mt-2 block italic text-[var(--accent)]">
              {hero.supportingLine}
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-white/88 md:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
          >
            {hero.supporting}{" "}
            <strong className="font-semibold text-white">
              We diagnose first. Then we intervene.
            </strong>
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            <Button href={hero.primaryCta.href} variant="accent">
              {hero.primaryCta.label} →
            </Button>
            <Button href={hero.secondaryCta.href} variant="outlineLight">
              {hero.secondaryCta.label}
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.18 }}
        >
          <div className="absolute -left-3 -top-3 z-20 md:-left-5 md:-top-5">
            <ExperienceBadge />
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--accent)]/70 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <div className="relative aspect-[4/5]">
              <Image
                src={hero.image}
                alt={`${founder.name}, founder of CoachME Advisory`}
                fill
                priority
                className="object-cover object-[center_18%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="display text-2xl text-white md:text-3xl">{founder.name}</p>
                <p className="mt-1 text-sm text-white/85">{founder.role}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
