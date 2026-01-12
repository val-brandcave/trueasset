"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check } from "lucide-react";

const withoutItems = [
  "Cash flow chaos continues",
  "Lien surprises months after completion",
  "Subs avoid your calls",
  "Clients question where their money is",
  "3 AM wake-ups running scenarios",
  "One project's money covers another's bills",
  "You're running a bank, not a construction company",
];

const withItems = [
  "Cash flow clarity and confidence",
  "Automatic lien waivers, zero surprises",
  "Subs call YOU for the next project",
  "Clients see real-time transparency",
  "Sleep soundly every night",
  "Every project stands on its own",
  "You run a construction company, not a bank",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export function StakesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="min-h-screen flex items-center py-32 px-8 bg-[#18181b]/[0.02]">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-[#18181b]/60 uppercase tracking-wider mb-4">
              The Choice Is Yours
            </p>
            <h2 className="font-serif text-[48px] leading-[1.15] tracking-tight text-[#18181b]">
              Two Paths Forward
            </h2>
          </div>

          {/* Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Without LedgerWise */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="p-10 rounded-3xl bg-white border border-red-100"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-[#18181b]">
                  Without LedgerWise
                </h3>
              </div>

              <ul className="space-y-4">
                {withoutItems.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-3"
                  >
                    <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-[#71717a]">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* With LedgerWise */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="p-10 rounded-3xl bg-[#18181b] text-white"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold">
                  With LedgerWise
                </h3>
              </div>

              <ul className="space-y-4">
                {withItems.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
