"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { homepage } from "@coachme/content";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { hero } = homepage;

  return (
    <section className="relative overflow-hidden surface-forest grain min-h-[92vh]">
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt="CoachME Advisory founder portrait"
          fill
          priority
          className="object-cover object-[center_20%] opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/85 to-forest/35" />
      </div>

      <div className="container-page relative z-10 flex min-h-[92vh] items-end pb-20 pt-28 md:items-center md:pb-24">
        <div className="max-w-3xl">
          <motion.p
            className="eyebrow text-champagne before:bg-champagne"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {hero.brand}
          </motion.p>
          <motion.h1
            className="display mt-6 text-5xl text-ivory md:text-6xl lg:text-7xl"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {hero.headline}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/80 md:text-xl"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {hero.supporting}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button href={hero.primaryCta.href} variant="inverse">
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="secondary"
              className="border-ivory/30 text-ivory hover:border-ivory hover:bg-white/10"
            >
              {hero.secondaryCta.label}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
