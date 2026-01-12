"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ShinyBorder } from "@/components/shiny-border";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="min-h-[80vh] flex items-center py-32 px-8 bg-[#18181b] relative overflow-hidden">
      {/* Decorative elements */}
      <ShinyBorder orientation="horizontal" className="top-0" shineColor="rgba(255,255,255,0.3)" color="rgba(255,255,255,0.1)" />
      <ShinyBorder orientation="horizontal" className="bottom-0" shineColor="rgba(255,255,255,0.3)" color="rgba(255,255,255,0.1)" delay={1.5} />

      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p
            variants={itemVariants}
            className="text-sm font-medium text-white/50 uppercase tracking-wider mb-6"
          >
            Take the Next Step
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="font-serif text-[56px] leading-[1.1] tracking-tight text-white mb-6"
          >
            Don't Let Cash Flow Chaos Run Your Business.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Every day you wait, you're floating more money, taking more risk, and losing more sleep. LedgerWise gives you the financial infrastructure your business deserves.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="px-10 py-7 text-lg bg-white text-[#18181b] hover:bg-white/90"
            >
              Request Early Access
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-10 py-7 text-lg border-white/30 text-white hover:bg-white/10"
            >
              See How It Works
            </Button>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-sm text-white/40"
          >
            No obligation. No pressure. Just answers.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
