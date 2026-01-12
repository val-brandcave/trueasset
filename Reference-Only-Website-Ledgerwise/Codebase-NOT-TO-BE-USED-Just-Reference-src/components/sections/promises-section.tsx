"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Building2, Shield, Clock, RotateCcw } from "lucide-react";
import Image from "next/image";

const promises = [
  {
    icon: Building2,
    title: "Backed by JP Morgan",
    description: "Your funds are held in FDIC-insured accounts at one of the world's most trusted financial institutions.",
  },
  {
    icon: Shield,
    title: "Licensed & Bonded",
    description: "Fully licensed payment infrastructure with proper regulatory compliance in every state we operate.",
  },
  {
    icon: Clock,
    title: "65+ Years Proven",
    description: "A model that's worked in California construction for decades. Now modernized for everyone.",
  },
];

function FlipCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  delay?: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-[100px] md:h-[280px] cursor-pointer group"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Ambient glow behind card - always visible, stronger on hover */}
      <div
        className="absolute -inset-3 md:-inset-4 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
        style={{
          background: "radial-gradient(ellipse at center, rgba(238, 182, 111, 0.35), transparent 70%)"
        }}
      />

      {/* Secondary blue glow accent */}
      <div
        className="absolute -inset-2 md:-inset-3 rounded-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-xl"
        style={{
          background: "radial-gradient(ellipse at bottom right, rgba(57, 128, 165, 0.25), transparent 60%)"
        }}
      />

      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden bg-white border border-[#e4e4e7] shadow-[0_4px_32px_-8px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.03)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Inner gradient highlight at top */}
          <div
            className="absolute inset-x-0 top-0 h-1/2 opacity-50"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%)"
            }}
          />

          {/* Animated shine sweep */}
          <motion.div
            className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden pointer-events-none"
          >
            <motion.div
              className="absolute w-[200%] h-full"
              style={{
                background: "linear-gradient(90deg, transparent 0%, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%, transparent 100%)",
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay + 1,
                repeatDelay: 3,
              }}
            />
          </motion.div>

          {/* Card content */}
          <div className="relative h-full px-4 py-3 md:p-8 flex flex-row md:flex-col items-center justify-start md:justify-center gap-3 md:gap-0">
            {/* Icon */}
            <div className="flex-shrink-0 md:mb-6">
              <div
                className="inline-flex items-center justify-center w-10 h-10 md:w-[72px] md:h-[72px] rounded-xl md:rounded-2xl"
                style={{
                  background: "linear-gradient(229.13deg, #EEB66F -2.22%, #80471F 118.82%)",
                }}
              >
                <Icon className="w-5 h-5 md:w-9 md:h-9 text-white" strokeWidth={1.5} />
              </div>
            </div>

            <h3 className="text-sm md:text-xl font-semibold text-[#18181b] text-left md:text-center">
              {title}
            </h3>

            {/* Flip indicator */}
            <div className="absolute bottom-2 right-3 md:bottom-5 md:right-5 flex items-center gap-1.5 text-[#a1a1aa] group-hover:text-[#71717a] transition-colors">
              <RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="text-[10px] md:text-xs font-medium hidden md:inline">Hover to flip</span>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_8px_32px_-8px_rgba(57,128,165,0.4)]"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #4A9BC4 0%, #3980A5 50%, #2d6a8a 100%)",
          }}
        >
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative h-full flex flex-col items-center justify-center px-4 py-3 md:p-8 text-center">
            <p className="text-white leading-snug md:leading-relaxed text-xs md:text-base drop-shadow-sm">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function PromisesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Header animations
  const headerOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0.1, 0.25], [40, 0]);

  // Stagger each card
  const card1Opacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const card2Opacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const card3Opacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);

  const card1Y = useTransform(scrollYProgress, [0.15, 0.3], [60, 0]);
  const card2Y = useTransform(scrollYProgress, [0.2, 0.35], [60, 0]);
  const card3Y = useTransform(scrollYProgress, [0.25, 0.4], [60, 0]);

  const cardAnimations = [
    { opacity: card1Opacity, y: card1Y },
    { opacity: card2Opacity, y: card2Y },
    { opacity: card3Opacity, y: card3Y },
  ];

  // Ticker opacity - fades in after cards
  const tickerOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[180vh] md:h-[250vh]">
      <div className="sticky top-16 md:top-0 h-[calc(100vh-64px)] md:h-screen flex flex-col bg-white">
        <div className="flex-1 flex items-center justify-center px-4 md:px-8">
          <div className="w-full max-w-5xl mx-auto">
            {/* Section header */}
            <motion.div
              style={{ opacity: headerOpacity, y: headerY }}
              className="text-center mb-6 md:mb-12"
            >
              <p className="text-xs md:text-sm font-medium text-[#71717a] uppercase tracking-wider mb-2 md:mb-4">
                Why Trust LedgerWise
              </p>
              <h2 className="font-serif text-[24px] md:text-[48px] leading-[1.15] tracking-tight text-[#18181b]">
                Built on Trust, Proven by Time
              </h2>
            </motion.div>

            {/* Promise cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
              {promises.map((promise, index) => (
                <motion.div
                  key={promise.title}
                  style={{
                    opacity: cardAnimations[index].opacity,
                    y: cardAnimations[index].y,
                  }}
                >
                  <FlipCard
                    icon={promise.icon}
                    title={promise.title}
                    description={promise.description}
                    delay={index * 0.5}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling ticker at bottom */}
        <motion.div
          style={{ opacity: tickerOpacity }}
          className="w-full py-3 md:py-6 bg-[#3980A5] overflow-hidden"
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8 md:mx-24 text-xs md:text-base font-medium text-white flex items-center gap-2 md:gap-4">
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white/60" />
                Partnering with
                <Image
                  src="/J_P_Morgan_Logo_2008_1.svg"
                  alt="JP Morgan"
                  width={100}
                  height={24}
                  className="h-4 md:h-6 w-auto brightness-0 invert"
                />
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
