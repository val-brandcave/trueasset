"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const problems = [
  {
    label: "The Reality",
    content:
      "Right now, you're floating $200K+ of client money across multiple projects. You pay subs in 45-60 days while waiting for client draws. You're using Project A's money to cover Project B's subs.",
    bgColor: "#3980A5",
    textColor: "white",
    labelColor: "white",
    rotation: -6,
    xOffset: -380,
  },
  {
    label: "The Toll",
    content:
      "You wake up at 3 AM running mental cash flow scenarios. You screen calls from subs asking when they'll get paid. You feel the constant knot in your stomach wondering if the next project will break you.",
    bgColor: "linear-gradient(229.13deg, #EEB66F -2.22%, #80471F 118.82%)",
    textColor: "white",
    labelColor: "white",
    rotation: 0,
    xOffset: 0,
  },
  {
    label: "The Truth",
    content:
      "You became a general contractor to build beautiful projects and run a profitable business. You never signed up to be an unlicensed bank. Construction deserves better financial infrastructure — the kind real estate has had for 65 years.",
    bgColor: "#2a5f7a",
    textColor: "white",
    labelColor: "white",
    rotation: 5,
    xOffset: 380,
  },
];

function ProblemCard({
  problem,
  index,
  progress,
  isMobile,
}: {
  problem: (typeof problems)[0];
  index: number;
  progress: MotionValue<number>;
  isMobile: boolean;
}) {
  // Cards spread out from center as user scrolls (only on desktop)
  const x = useTransform(progress, [0.15, 0.5], [0, isMobile ? 0 : problem.xOffset]);
  const rotate = useTransform(progress, [0.15, 0.5], [0, isMobile ? 0 : problem.rotation]);

  // Z-index: center card on top (only matters on desktop)
  const zIndex = index === 1 ? 30 : index === 0 ? 20 : 10;

  return (
    <motion.div
      style={{
        x: isMobile ? 0 : x,
        rotate: isMobile ? 0 : rotate,
        zIndex: isMobile ? 1 : zIndex,
        background: problem.bgColor,
      }}
      className="md:absolute md:left-1/2 md:-translate-x-1/2 w-full max-w-[370px] mx-auto rounded-[24px] md:rounded-[32px] border border-white/20 shadow-[4px_8px_0px_0px_rgba(0,0,0,0.3)] md:shadow-[8px_14px_0px_0px_rgba(0,0,0,0.3)] px-6 py-6 md:px-10 md:py-10 overflow-hidden"
    >
      <div className="mb-3 md:mb-4">
        <span className="text-xs font-semibold uppercase tracking-[0.5px]" style={{ color: problem.labelColor }}>
          {problem.label}
        </span>
      </div>
      <p className="text-sm md:text-base leading-relaxed" style={{ color: problem.textColor, opacity: 0.9 }}>
        "{problem.content}"
      </p>
    </motion.div>
  );
}

export function ProblemSection() {
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
    offset: ["start end", "end start"],
  });

  // Header animations
  const headerOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0.05, 0.2], [30, 0]);

  return (
    <section ref={containerRef} className="relative h-auto md:h-[280vh]">
      <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-start pt-16 md:pt-32 px-4 md:px-20 pb-16 md:pb-0">
        {/* Header */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="max-w-[900px] mb-8 md:mb-16"
        >
          <p className="text-base md:text-xl font-semibold text-[#71717a] mb-2 md:mb-4">
            The Hidden Cost
          </p>
          <h2 className="font-serif text-[24px] sm:text-[32px] md:text-[50px] leading-tight text-[#3980A5]">
            Being your client's bank is killing your&nbsp;business
          </h2>
        </motion.div>

        {/* Cards container */}
        <div className="relative md:h-[500px] w-full max-w-[1200px] mx-auto flex flex-col md:block gap-4 md:gap-0">
          {problems.map((problem, index) => (
            <ProblemCard
              key={problem.label}
              problem={problem}
              index={index}
              progress={scrollYProgress}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
