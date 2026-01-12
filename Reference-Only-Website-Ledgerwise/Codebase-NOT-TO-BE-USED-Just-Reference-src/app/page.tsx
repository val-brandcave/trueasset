"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HeroSection, HeroBackground } from "@/components/hero-section";
import { Navigation } from "@/components/navigation";
import { PromisesSection } from "@/components/sections/promises-section";
import { VideoSection } from "@/components/sections/video-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/footer";

// Words to reveal in Section 2
const subtitle = "The Hidden Cost of Being Your Client's Bank";
const mainText = "You're floating client money. Losing sleep over cash flow. Running a bank instead of a business. It doesn't have to be this way.";
const words = mainText.split(" ");

function WordReveal({ word, progress, index, total }: { word: string; progress: any; index: number; total: number }) {
  // Each word fades in during its portion of the scroll
  // Complete all reveals by 50% of scroll so text is fully visible before section fades
  const revealEnd = 0.5;
  const start = (index / total) * revealEnd;
  const end = start + (revealEnd / total);

  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.3em]">
      {word}
    </motion.span>
  );
}

export default function Home() {
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: section2Progress } = useScroll({
    target: section2Ref,
    offset: ["start end", "end start"],
  });

  // Hero text fades out early, but wrapper stays visible for laptop animation
  const heroOpacity = useTransform(heroProgress, [0.42, 0.48], [1, 0]);
  const heroTextScale = useTransform(heroProgress, [0, 0.10], [1, 0.8]);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.08], [1, 0]);

  // Subtitle opacity
  const subtitleOpacity = useTransform(section2Progress, [0, 0.1], [0, 1]);

  // Dot grid opacity - fades in as section 2 begins, fades out as it ends
  const dotGridOpacity = useTransform(section2Progress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Section 2 content fades out at the end
  const section2ContentOpacity = useTransform(section2Progress, [0.7, 0.9], [1, 0]);

  return (
    <main>
      {/* Navigation */}
      <Navigation />

      {/* Fixed gradient background */}
      <HeroBackground scrollProgress={heroProgress} />

      {/* Hero scroll container */}
      <div ref={heroContainerRef} className="h-[350vh] relative">
        {/* Video scales in as hero scrolls out */}
        <VideoSection progress={heroProgress} />

        <motion.div
          className="sticky top-0 z-[2]"
          style={{ opacity: heroOpacity }}
        >
          <HeroSection contentScale={heroTextScale} contentOpacity={heroTextOpacity} scrollProgress={heroProgress} />
        </motion.div>
      </div>

      {/* Promises section - after video */}
      <PromisesSection />

      {/* Section 2 - Why Unloop (tall for scroll reveal) */}
      <section ref={section2Ref} className="relative z-10 h-[300vh] md:h-[450vh] bg-white">
        {/* Dot grid overlay */}
        <motion.div
          style={{ opacity: dotGridOpacity }}
          className="fixed inset-0 z-[1] pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(24, 24, 27, 0.15) 1.5px, transparent 1.5px)`,
              backgroundSize: '24px 24px',
            }}
          />
        </motion.div>

        <motion.div
          className="sticky top-0 h-screen flex items-center px-4 sm:px-8 md:px-20 z-[2]"
          style={{ opacity: section2ContentOpacity }}
        >
          <div className="max-w-[1200px]">
            <motion.p
              style={{ opacity: subtitleOpacity }}
              className="text-base md:text-lg text-[#71717a] mb-4 md:mb-6"
            >
              {subtitle}
            </motion.p>
            <h2 className="font-serif text-[28px] sm:text-[40px] md:text-[68px] leading-[1.2] tracking-tight text-[#2a5f7a]">
              {words.map((word, i) => (
                <WordReveal
                  key={i}
                  word={word}
                  progress={section2Progress}
                  index={i}
                  total={words.length}
                />
              ))}
            </h2>
          </div>
        </motion.div>
      </section>

      {/* Section 3 - Problem/Agitation */}
      <ProblemSection />

      {/* Section 4 - Solution/Value Proposition */}
      <SolutionSection />

      {/* Section 5 - Social Proof / Trust */}
      <SocialProofSection />

      {/* Section 6 - FAQ */}
      <FAQSection />

      {/* Section 7 - Final CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
