"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export function QuoteSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-8 md:px-20">
      <motion.div
        className="max-w-[800px] mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Decorative quote mark */}
        <motion.div variants={itemVariants} className="mb-8">
          <svg
            width="64"
            height="64"
            viewBox="0 0 48 48"
            fill="none"
            className="mx-auto text-[#18181b]/15"
          >
            <path
              d="M14 24H8C8 17.373 13.373 12 20 12V18C16.686 18 14 20.686 14 24V36H2V24C2 14.059 10.059 6 20 6V12C13.373 12 8 17.373 8 24H14V24ZM38 24H32C32 17.373 37.373 12 44 12V18C40.686 18 38 20.686 38 24V36H26V24C26 14.059 34.059 6 44 6V12C37.373 12 32 17.373 32 24H38V24Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-3xl md:text-4xl font-serif leading-relaxed text-[#18181b] mb-8"
        >
          You've accepted this as "just how construction works." Like chronic
          pain you learn to live with, you've normalized the stress, the float,
          the chaos.
        </motion.p>

        <motion.p variants={itemVariants} className="text-xl text-[#71717a] mb-12">
          The biggest challenge isn't the problem itself. It's that you've been
          conditioned to accept it as normal.
        </motion.p>

        <motion.div variants={itemVariants}>
          <p className="text-2xl font-serif text-[#18181b]">
            What if we told you it doesn't have to be this way?
          </p>
          <p className="text-[#71717a] mt-3">
            There's a better way — and it's been proven for over 65 years.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
