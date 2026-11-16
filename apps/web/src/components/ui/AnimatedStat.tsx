"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type AnimatedStatProps = {
  value: string;
  className?: string;
};

export function AnimatedStat({ value, className = "" }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : "0");

  useEffect(() => {
    if (!inView) return;

    const numeric = Number(value.replace(/[^\d.]/g, ""));
    const suffix = value.replace(/[\d.\s]/g, "");
    if (!numeric || reduceMotion) {
      setDisplay(value);
      return;
    }

    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(numeric * eased);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, reduceMotion, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
