"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 65, suffix: "+", label: "Years proven" },
  { value: 85, suffix: "%", label: "Funds flow downstream" },
  { value: 100, suffix: "+", label: "Companies per project" },
  { value: 7, suffix: " days", label: "Payment cycle" },
];

export function SocialProofSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayValues, setDisplayValues] = useState([0, 0, 0, 0]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Trigger count-up when scroll reaches the stats area
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.2 && !hasAnimated) {
      setHasAnimated(true);
    }
  });

  // Run animation when hasAnimated becomes true
  useEffect(() => {
    if (!hasAnimated) return;

    stats.forEach((stat, index) => {
      const timeout = setTimeout(() => {
        const controls = animate(0, stat.value, {
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (value) => {
            setDisplayValues((prev) => {
              const newValues = [...prev];
              newValues[index] = Math.round(value);
              return newValues;
            });
          },
        });
        return () => controls.stop();
      }, index * 200);

      return () => clearTimeout(timeout);
    });
  }, [hasAnimated]);

  // Header - appears after gradient transition (~20% in)
  const headerOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0.15, 0.25], [40, 0]);

  // Stats stagger - appear after header
  const stat0Opacity = useTransform(scrollYProgress, [0.22, 0.32], [0, 1]);
  const stat1Opacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
  const stat2Opacity = useTransform(scrollYProgress, [0.28, 0.38], [0, 1]);
  const stat3Opacity = useTransform(scrollYProgress, [0.31, 0.41], [0, 1]);

  const stat0Y = useTransform(scrollYProgress, [0.22, 0.32], [30, 0]);
  const stat1Y = useTransform(scrollYProgress, [0.25, 0.35], [30, 0]);
  const stat2Y = useTransform(scrollYProgress, [0.28, 0.38], [30, 0]);
  const stat3Y = useTransform(scrollYProgress, [0.31, 0.41], [30, 0]);

  const statAnimations = [
    { opacity: stat0Opacity, y: stat0Y },
    { opacity: stat1Opacity, y: stat1Y },
    { opacity: stat2Opacity, y: stat2Y },
    { opacity: stat3Opacity, y: stat3Y },
  ];

  // Exit fade - before bottom gradient transition
  const exitOpacity = useTransform(scrollYProgress, [0.65, 0.78], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh] md:h-[400vh]">
      {/* Top gradient transition */}
      <div className="absolute top-0 left-0 right-0 h-[60vh] md:h-[80vh] bg-gradient-to-b from-[#fafafa] to-[#3980A5] pointer-events-none" />

      {/* Dark background */}
      <div className="absolute top-[60vh] md:top-[80vh] bottom-[60vh] md:bottom-[80vh] left-0 right-0 bg-[#3980A5]" />

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] md:h-[80vh] bg-gradient-to-b from-[#3980A5] to-[#fafafa] pointer-events-none" />

      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: exitOpacity }}
          className="w-full max-w-6xl mx-auto px-4 md:px-8"
        >
          {/* Section Header */}
          <motion.div
            style={{ opacity: headerOpacity, y: headerY }}
            className="text-center mb-10 md:mb-16"
          >
            <p className="text-xs md:text-sm font-medium text-white/70 uppercase tracking-wider mb-3 md:mb-4">
              Built on Proven Infrastructure
            </p>
            <h2 className="font-serif text-[28px] md:text-[48px] leading-[1.15] tracking-tight text-white">
              The Numbers Behind the Problem
            </h2>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                style={{
                  opacity: statAnimations[index].opacity,
                  y: statAnimations[index].y,
                }}
                className="text-center"
              >
                <div className="text-3xl md:text-5xl font-semibold text-white mb-1 md:mb-2">
                  {displayValues[index]}{stat.suffix}
                </div>
                <div className="text-sm md:text-base text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
