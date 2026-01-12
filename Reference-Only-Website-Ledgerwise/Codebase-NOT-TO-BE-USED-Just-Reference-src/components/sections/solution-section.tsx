"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Shield, Clock, BarChart3, Users } from "lucide-react";
import { GradientBackground } from "@/components/gradient-background";

const benefits = [
  {
    icon: Shield,
    label: "Fund Separation",
    title: "Zero Float, Zero Stress",
    description:
      "Stop using Project A's money for Project B. Every project's funds stay separate and transparent. You finally run a construction company, not a bank.",
  },
  {
    icon: Clock,
    label: "Fast Payments",
    title: "Pay Subs in 7 Days (Or Less)",
    description:
      "Subs sign their lien waiver, we pay them immediately. You become known as the GC who pays fast. Watch your reputation — and sub loyalty — skyrocket.",
  },
  {
    icon: BarChart3,
    label: "Real-time Visibility",
    title: "Full Visibility, Confident Decisions",
    description:
      "Real-time dashboards show you exactly where every dollar is across every project. No more guesswork, no more 3 AM panic. Make decisions with clarity.",
  },
  {
    icon: Users,
    label: "Client Protection",
    title: "They Get Protection, You Get Peace",
    description:
      "Clients see their money handled professionally with full transparency. No awkward questions, no trust issues. Just clean, compliant fund management.",
  },
];

function TabletMockup({ progress, isMobile }: { progress: MotionValue<number>; isMobile: boolean }) {
  // Rotation - spins as you scroll through sections (disabled on mobile for performance)
  const rotateY = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], isMobile ? [0, 0, 0, 0, 0] : [0, 12, -12, 12, 0]);
  const rotateX = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], isMobile ? [0, 0, 0, 0, 0] : [0, -4, 4, -4, 0]);
  const rotateZ = useTransform(progress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [-2, 2, -2]);

  // Scale pulse between sections
  const scale = useTransform(
    progress,
    [0, 0.1, 0.25, 0.3, 0.5, 0.55, 0.75, 0.8, 1],
    [0.9, 1, 1, 0.98, 1, 0.98, 1, 0.98, 1]
  );

  return (
    <motion.div
      style={{
        rotateY: isMobile ? 0 : rotateY,
        rotateX: isMobile ? 0 : rotateX,
        rotateZ: isMobile ? 0 : rotateZ,
        scale,
        transformPerspective: isMobile ? undefined : 1200,
        transformStyle: isMobile ? undefined : "preserve-3d",
      }}
      className="relative w-full max-w-[520px]"
    >
      {/* Tablet body - landscape orientation */}
      <div className="relative w-full aspect-[520/340] bg-[#1c1c1e] rounded-[20px] md:rounded-[28px] p-2 md:p-3 shadow-2xl border border-[#3a3a3c]">
        {/* Screen bezel */}
        <div className="w-full h-full bg-[#09090b] rounded-[14px] md:rounded-[20px] overflow-hidden">
          {/* Placeholder screen - landscape layout */}
          <div className="w-full h-full p-3 md:p-5 flex gap-3 md:gap-5">
            {/* Sidebar placeholder */}
            <div className="w-24 md:w-40 flex-shrink-0 space-y-2 md:space-y-3">
              <div className="h-5 md:h-7 w-14 md:w-20 bg-white/20 rounded-lg" />
              <div className="space-y-1.5 md:space-y-2 mt-3 md:mt-5">
                <div className="h-6 md:h-9 w-full bg-white/10 rounded-lg" />
                <div className="h-6 md:h-9 w-full bg-white/5 rounded-lg" />
                <div className="h-6 md:h-9 w-full bg-white/5 rounded-lg" />
                <div className="h-6 md:h-9 w-full bg-white/5 rounded-lg hidden md:block" />
              </div>
            </div>
            {/* Main content placeholder */}
            <div className="flex-1 space-y-2 md:space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-4 md:h-5 w-20 md:w-28 bg-white/15 rounded-lg" />
                <div className="h-5 md:h-7 w-14 md:w-20 bg-white/10 rounded-lg" />
              </div>
              <div className="grid grid-cols-3 gap-1.5 md:gap-2 mt-2 md:mt-3">
                <div className="h-10 md:h-16 bg-white/5 rounded-xl" />
                <div className="h-10 md:h-16 bg-white/5 rounded-xl" />
                <div className="h-10 md:h-16 bg-white/5 rounded-xl" />
              </div>
              <div className="h-16 md:h-28 bg-white/5 rounded-xl mt-1.5 md:mt-2" />
            </div>
          </div>
        </div>

        {/* Camera - on the side for landscape */}
        <div className="absolute top-1/2 left-1 md:left-1.5 -translate-y-1/2 w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#3a3a3c]" />
      </div>

      {/* Reflection/glow */}
      <div className="absolute -inset-4 bg-gradient-to-b from-white/5 to-transparent rounded-[36px] -z-10 blur-xl" />
    </motion.div>
  );
}

export function SolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Tablet entrance and exit
  const tabletOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  // Tablet flips sides: right → left (solution 2) → right (solution 3) → left (solution 4) - only on desktop
  const tabletX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.28, 0.45, 0.53, 0.7, 0.78, 1],
    isMobile ? ["0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%"] : ["0%", "0%", "-110%", "-110%", "0%", "0%", "-110%", "-110%"]
  );

  // Text mirrors tablet movement - only on desktop
  const textX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.28, 0.45, 0.53, 0.7, 0.78, 1],
    isMobile ? ["0%", "0%", "0%", "0%", "0%", "0%", "0%", "0%"] : ["0%", "0%", "110%", "110%", "0%", "0%", "110%", "110%"]
  );

  // Benefit text animations - each takes ~25% of scroll
  const benefit0Opacity = useTransform(scrollYProgress, [0.05, 0.12, 0.25, 0.3], [0, 1, 1, 0]);
  const benefit1Opacity = useTransform(scrollYProgress, [0.25, 0.32, 0.45, 0.5], [0, 1, 1, 0]);
  const benefit2Opacity = useTransform(scrollYProgress, [0.5, 0.57, 0.72, 0.77], [0, 1, 1, 0]);
  const benefit3Opacity = useTransform(scrollYProgress, [0.72, 0.79, 0.92, 1], [0, 1, 1, 1]);

  const benefit0Y = useTransform(scrollYProgress, [0.05, 0.12], [30, 0]);
  const benefit1Y = useTransform(scrollYProgress, [0.25, 0.32], [30, 0]);
  const benefit2Y = useTransform(scrollYProgress, [0.5, 0.57], [30, 0]);
  const benefit3Y = useTransform(scrollYProgress, [0.72, 0.79], [30, 0]);

  const benefitAnimations = [
    { opacity: benefit0Opacity, y: benefit0Y },
    { opacity: benefit1Opacity, y: benefit1Y },
    { opacity: benefit2Opacity, y: benefit2Y },
    { opacity: benefit3Opacity, y: benefit3Y },
  ];

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-[#fafafa]">
      <GradientBackground
        bluePosition={{ x: '-300px', y: '100px' }}
        amberPosition={{ x: '-100px', y: '200px' }}
      />
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-16">
          {/* Two column layout on desktop, stacked on mobile */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left column - Text content */}
            <motion.div
              style={{ x: isMobile ? 0 : textX }}
              className="relative h-[280px] md:h-[320px] order-2 md:order-1"
            >
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    style={{
                      opacity: benefitAnimations[index].opacity,
                      y: benefitAnimations[index].y,
                    }}
                    className="absolute inset-0"
                  >
                    <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#3980A5] flex items-center justify-center">
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <span className="text-xs md:text-sm font-medium text-[#71717a] uppercase tracking-wider">
                        {benefit.label}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-semibold text-[#18181b] mb-3 md:mb-4 leading-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-base md:text-lg text-[#71717a] leading-relaxed max-w-lg">
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Right column - Tablet */}
            <motion.div
              style={{ x: isMobile ? 0 : tabletX, opacity: tabletOpacity }}
              className="flex items-center justify-center order-1 md:order-2"
            >
              <TabletMockup progress={scrollYProgress} isMobile={isMobile} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
