"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, CheckCircle2, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: Calendar,
    title: "Schedule Your Demo",
    description: "See exactly how our payment infrastructure works for a project like yours. We'll answer every question and show you the numbers.",
  },
  {
    number: "02",
    icon: CheckCircle2,
    title: "Onboard Your First Project",
    description: "We handle all the setup and client communication. You'll be up and running in days, not weeks.",
  },
  {
    number: "03",
    icon: Hammer,
    title: "Focus on Building",
    description: "We manage the money flow, you manage the build. Get real-time visibility without the stress of being the bank.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="min-h-screen flex items-center py-32 px-8 bg-[#18181b]/[0.02]">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <p className="text-sm font-medium text-[#18181b]/60 uppercase tracking-wider mb-4">
              Your Path Forward
            </p>
            <h2 className="font-serif text-[56px] leading-[1.15] tracking-tight text-[#18181b]">
              Three Simple Steps
            </h2>
          </motion.div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#18181b]/20 to-transparent" />
                )}

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white border border-[#18181b]/10 mb-6 relative">
                    <span className="absolute -top-2 -right-2 text-xs font-bold text-[#18181b]/40">
                      {step.number}
                    </span>
                    <step.icon className="w-12 h-12 text-[#18181b]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#18181b] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#71717a] leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <Button size="lg" className="px-8 py-6 text-lg">
              Request Early Access
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
