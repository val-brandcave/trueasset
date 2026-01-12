"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Content animations
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const headlineScale = useTransform(scrollYProgress, [0.2, 0.5], [0.95, 1]);

  return (
    <section ref={containerRef} className="relative h-[200vh] md:h-[250vh]">
      {/* Gradient transition from light to dark */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-[#fafafa] to-[#3980A5] pointer-events-none" />

      {/* Dark background */}
      <div className="absolute top-[50vh] bottom-0 left-0 right-0 bg-[#3980A5]" />

      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="w-full max-w-4xl mx-auto px-4 md:px-8 text-center"
        >
          {/* Headline */}
          <motion.h2
            style={{ scale: headlineScale }}
            className="font-serif text-[32px] sm:text-[42px] md:text-[52px] lg:text-[64px] leading-[1.1] tracking-tight text-white mb-6 md:mb-8"
          >
            Stop Running a Bank.
            <br />
            Start Running a Business.
          </motion.h2>

          {/* Supporting copy */}
          <p className="text-base md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-8 md:mb-12">
            Every day you wait, you're floating more money, taking more risk, and losing more sleep.
            LedgerWise gives you the financial infrastructure your business deserves.
          </p>

          {/* CTA Button */}
          <motion.a
            href="/request-early-access"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block px-8 py-4 md:px-10 md:py-5 btn-brand-orange text-base md:text-lg font-semibold transition-colors"
          >
            Request Early Access
          </motion.a>

          {/* Reassurance text */}
          <p className="text-sm text-white/60 mt-4 md:mt-6">
            No obligation. No pressure. Just answers.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
