"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShinyBorder } from "@/components/shiny-border";
import { Building2, HardHat, Landmark, Users } from "lucide-react";

type HeroBackgroundProps = {
  scrollProgress?: MotionValue<number>;
};

export function HeroBackground({ scrollProgress }: HeroBackgroundProps) {
  // Gradient fades in when laptop reaches center (around 12% scroll)
  const gradientOpacity = scrollProgress
    ? useTransform(scrollProgress, [0.10, 0.18], [0, 1])
    : undefined;

  // Blue background fades in when avatars converge (around 35-45% scroll)
  const blueGlowOpacity = scrollProgress
    ? useTransform(scrollProgress, [0.32, 0.42, 0.52, 0.58], [0, 1, 1, 0])
    : undefined;

  // Full blue screen fades in as video comes in
  const blueScreenOpacity = scrollProgress
    ? useTransform(scrollProgress, [0.48, 0.55, 0.75, 0.85], [0, 1, 1, 0])
    : undefined;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-white">
      <motion.div
        className="absolute inset-0"
        style={{ opacity: gradientOpacity }}
      >
        {/* Blue-teal gradient blob - left side */}
        <div
          className="absolute left-[-200px] top-[200px] w-[800px] h-[800px] rounded-full"
          style={{
            background: 'rgba(57, 128, 165, 0.15)',
            filter: 'blur(250px)',
          }}
        />
        {/* Amber gradient blob - right side */}
        <div
          className="absolute right-[-100px] bottom-[-200px] w-[900px] h-[900px] rounded-full"
          style={{
            background: 'rgba(219, 163, 97, 0.25)',
            filter: 'blur(250px)',
          }}
        />
      </motion.div>

      {/* Blue background when avatars converge */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: blueGlowOpacity }}
      >
        {/* Main blue radial glow from center */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(57, 128, 165, 0.4) 0%, rgba(57, 128, 165, 0.25) 25%, rgba(57, 128, 165, 0.1) 50%, transparent 70%)',
          }}
        />
        {/* Top accent */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[100vw] h-[60vh]"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(57, 128, 165, 0.2) 0%, transparent 70%)',
          }}
        />
        {/* Blue corners */}
        <div
          className="absolute right-0 bottom-0 w-[80vw] h-[80vh]"
          style={{
            background: 'radial-gradient(ellipse at bottom right, rgba(45, 106, 138, 0.2) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute left-0 bottom-0 w-[60vw] h-[60vh]"
          style={{
            background: 'radial-gradient(ellipse at bottom left, rgba(57, 128, 165, 0.15) 0%, transparent 50%)',
          }}
        />
      </motion.div>

      {/* Full blue screen as video comes in */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: blueScreenOpacity,
          background: 'linear-gradient(135deg, #3980A5 0%, #2d6a8a 50%, #245770 100%)'
        }}
      />
    </div>
  );
}

type HeroSectionProps = {
  contentScale?: MotionValue<number>;
  contentOpacity?: MotionValue<number>;
  scrollProgress?: MotionValue<number>;
};

export function HeroSection({ contentScale, contentOpacity, scrollProgress }: HeroSectionProps) {
  // App screen animation:
  // Phase 1 (0-10%): Slides up from bottom peek to center
  // Phase 2 (10-55%): Holds at center while streams animate (extended duration)
  // Phase 3 (55-62%): Zooms out and fades away
  const appY = useTransform(scrollProgress!, [0, 0.10], ["60vh", "0vh"]);
  const appScale = useTransform(scrollProgress!, [0, 0.10, 0.55, 0.62], [0.9, 0.85, 0.85, 0.6]);
  const appOpacity = useTransform(scrollProgress!, [0, 0.10, 0.55, 0.60], [1, 1, 1, 0]);

  // Streams fade in and animate when laptop is centered (extended duration)
  const streamsOpacity = useTransform(scrollProgress!, [0.10, 0.15, 0.52, 0.57], [0, 1, 1, 0]);
  const streamProgress = useTransform(scrollProgress!, [0.12, 0.52], [0, 1]);

  // Blue glow behind laptop - only shows when avatars are close to center
  const laptopGlowOpacity = useTransform(scrollProgress!, [0.35, 0.42, 0.52, 0.58], [0, 1, 1, 0]);

  // Icon positions along paths (0 = start, 1 = end/center)
  // Significant delay so icons don't move until streams are well established
  const icon1Progress = useTransform(streamProgress, [0.4, 0.95], [0, 1]);
  const icon2Progress = useTransform(streamProgress, [0.45, 0.97], [0, 1]);
  const icon3Progress = useTransform(streamProgress, [0.5, 0.98], [0, 1]);
  const icon4Progress = useTransform(streamProgress, [0.55, 0.99], [0, 1]);

  // Calculate positions along bezier curves using percentage coordinates
  // Path 1: M 0 150 Q 150 150, 250 250 T 500 300 (viewBox 1000x600 → percentages)
  // Points calculated along the quadratic bezier with smooth continuation
  const icon1X = useTransform(icon1Progress, [0, 0.25, 0.5, 0.75, 1], ["0%", "8%", "20%", "35%", "50%"]);
  const icon1Y = useTransform(icon1Progress, [0, 0.25, 0.5, 0.75, 1], ["25%", "26%", "35%", "44%", "50%"]);

  // Path 2: M 1000 120 Q 850 120, 750 220 T 500 300 (top-right to center)
  const icon2X = useTransform(icon2Progress, [0, 0.25, 0.5, 0.75, 1], ["100%", "92%", "80%", "65%", "50%"]);
  const icon2Y = useTransform(icon2Progress, [0, 0.25, 0.5, 0.75, 1], ["20%", "22%", "32%", "42%", "50%"]);

  // Path 3: M 0 480 Q 150 480, 250 380 T 500 300 (bottom-left to center)
  const icon3X = useTransform(icon3Progress, [0, 0.25, 0.5, 0.75, 1], ["0%", "8%", "20%", "35%", "50%"]);
  const icon3Y = useTransform(icon3Progress, [0, 0.25, 0.5, 0.75, 1], ["80%", "78%", "68%", "58%", "50%"]);

  // Path 4: M 1000 450 Q 850 450, 750 370 T 500 300 (bottom-right to center)
  const icon4X = useTransform(icon4Progress, [0, 0.25, 0.5, 0.75, 1], ["100%", "92%", "80%", "65%", "50%"]);
  const icon4Y = useTransform(icon4Progress, [0, 0.25, 0.5, 0.75, 1], ["75%", "73%", "65%", "56%", "50%"]);

  return (
    <section className="relative h-screen w-screen overflow-hidden">
      {/* Vertical lines - full height */}
      <ShinyBorder orientation="vertical" className="left-[5vw]" delay={0} />
      <ShinyBorder orientation="vertical" className="right-[5vw]" delay={1.5} />

      {/* Bottom horizontal line */}
      <ShinyBorder orientation="horizontal" className="bottom-[5vh]" delay={0.5} />

      {/* Streams container - SVG curved lines (hidden on mobile) */}
      <motion.div
        style={{ opacity: streamsOpacity }}
        className="absolute inset-0 z-[2] pointer-events-none hidden md:block"
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
          <defs>
            {/* Gradient for top-left stream (blue) */}
            <linearGradient id="streamGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
            {/* Gradient for top-right stream (purple) */}
            <linearGradient id="streamGradient2" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
            {/* Gradient for bottom-left stream (amber) */}
            <linearGradient id="streamGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            {/* Gradient for bottom-right stream (rose) */}
            <linearGradient id="streamGradient4" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#fda4af" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>

            {/* Glow filter for shine effect */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Top-left curve (Project Owner) - starts left, S-curves to center */}
          <motion.path
            d="M 0 150 Q 150 150, 250 250 T 500 300"
            fill="none"
            stroke="url(#streamGradient1)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              pathLength: useTransform(streamProgress, [0, 0.6], [0, 1]),
            }}
          />
          {/* Shine effect for stream 1 - blue */}
          <motion.path
            d="M 0 150 Q 150 150, 250 250 T 500 300"
            fill="none"
            stroke="#bfdbfe"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="30 600"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -630 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Top-right curve (Lender) - starts right, S-curves to center */}
          <motion.path
            d="M 1000 120 Q 850 120, 750 220 T 500 300"
            fill="none"
            stroke="url(#streamGradient2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              pathLength: useTransform(streamProgress, [0.1, 0.7], [0, 1]),
            }}
          />
          {/* Shine effect for stream 2 - purple */}
          <motion.path
            d="M 1000 120 Q 850 120, 750 220 T 500 300"
            fill="none"
            stroke="#ddd6fe"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="30 600"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -630 }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "linear",
              delay: 0.4,
            }}
          />

          {/* Bottom-left curve (Home Builder) - starts left, S-curves up to center */}
          <motion.path
            d="M 0 480 Q 150 480, 250 380 T 500 300"
            fill="none"
            stroke="url(#streamGradient3)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              pathLength: useTransform(streamProgress, [0.15, 0.75], [0, 1]),
            }}
          />
          {/* Shine effect for stream 3 - amber */}
          <motion.path
            d="M 0 480 Q 150 480, 250 380 T 500 300"
            fill="none"
            stroke="#fef08a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="30 600"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -630 }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "linear",
              delay: 0.2,
            }}
          />

          {/* Bottom-right curve (Subcontractor) - starts right, S-curves up to center */}
          <motion.path
            d="M 1000 450 Q 850 450, 750 370 T 500 300"
            fill="none"
            stroke="url(#streamGradient4)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              pathLength: useTransform(streamProgress, [0.2, 0.8], [0, 1]),
            }}
          />
          {/* Shine effect for stream 4 - rose */}
          <motion.path
            d="M 1000 450 Q 850 450, 750 370 T 500 300"
            fill="none"
            stroke="#fecdd3"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="30 600"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -630 }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "linear",
              delay: 0.6,
            }}
          />
        </svg>

        {/* Traveling icons with tooltip labels underneath */}
        {/* Icon 1 - Project Owner (blue) - follows top-left curve */}
        <motion.div
          style={{
            left: icon1X,
            top: icon1Y,
            opacity: useTransform(streamProgress, [0.35, 0.43, 0.92, 0.98], [0, 1, 1, 0]),
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 z-10"
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shadow-md">
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <span className="text-xs font-medium text-[#71717a] bg-white/90 px-2 py-0.5 rounded-full whitespace-nowrap">
            Project Owner
          </span>
        </motion.div>

        {/* Icon 2 - Lender (purple) - follows top-right curve */}
        <motion.div
          style={{
            left: icon2X,
            top: icon2Y,
            opacity: useTransform(streamProgress, [0.40, 0.48, 0.94, 0.99], [0, 1, 1, 0]),
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 z-10"
        >
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shadow-md">
            <Landmark className="w-5 h-5 text-purple-500" />
          </div>
          <span className="text-xs font-medium text-[#71717a] bg-white/90 px-2 py-0.5 rounded-full whitespace-nowrap">
            Lender
          </span>
        </motion.div>

        {/* Icon 3 - Home Builder (amber) - follows bottom-left curve */}
        <motion.div
          style={{
            left: icon3X,
            top: icon3Y,
            opacity: useTransform(streamProgress, [0.45, 0.53, 0.96, 1], [0, 1, 1, 0]),
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 z-10"
        >
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shadow-md">
            <Building2 className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-xs font-medium text-[#71717a] bg-white/90 px-2 py-0.5 rounded-full whitespace-nowrap">
            Home Builder
          </span>
        </motion.div>

        {/* Icon 4 - Subcontractor (rose) - follows bottom-right curve */}
        <motion.div
          style={{
            left: icon4X,
            top: icon4Y,
            opacity: useTransform(streamProgress, [0.50, 0.58, 0.97, 1], [0, 1, 1, 0]),
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 z-10"
        >
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shadow-md">
            <HardHat className="w-5 h-5 text-rose-500" />
          </div>
          <span className="text-xs font-medium text-[#71717a] bg-white/90 px-2 py-0.5 rounded-full whitespace-nowrap">
            Subcontractor
          </span>
        </motion.div>
      </motion.div>

      {/* App screen - peeks from bottom, scrolls to center, holds, then zooms out */}
      <motion.div
        style={{ y: appY, scale: appScale, opacity: appOpacity }}
        className="absolute left-1/2 -translate-x-1/2 top-[55%] md:top-[50%] -translate-y-1/2 w-[92%] md:w-[85%] max-w-[900px] aspect-[16/10] z-[3]"
      >
        {/* Blue glow behind laptop - fades in when laptop reaches center */}
        <motion.div
          className="absolute -inset-16 md:-inset-32 pointer-events-none"
          style={{
            opacity: laptopGlowOpacity,
            background: "radial-gradient(ellipse at center, rgba(57, 128, 165, 0.8) 0%, rgba(57, 128, 165, 0.5) 25%, rgba(57, 128, 165, 0.2) 50%, transparent 70%)",
            filter: "blur(50px)"
          }}
        />
        <div className="relative z-10 w-full h-full rounded-lg md:rounded-xl overflow-hidden shadow-2xl border border-[#e4e4e7]">
          {/* Browser chrome */}
          <div className="bg-[#f4f4f5] px-2 py-2 md:px-4 md:py-3 flex items-center gap-2 border-b border-[#e4e4e7]">
            <div className="flex gap-1 md:gap-1.5">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#fca5a5]" />
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#fcd34d]" />
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#86efac]" />
            </div>
            <div className="flex-1 mx-2 md:mx-4">
              <div className="bg-white rounded-md px-2 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs text-[#a1a1aa] text-center max-w-[200px] md:max-w-[300px] mx-auto border border-[#e4e4e7]">
                app.ledgerwise.com
              </div>
            </div>
          </div>
          {/* Screen content placeholder */}
          <div className="bg-gradient-to-br from-[#fafafa] to-[#f4f4f5] h-full p-3 md:p-6">
            <div className="space-y-2 md:space-y-4">
              <div className="h-5 md:h-8 bg-[#e4e4e7] rounded-lg w-1/3" />
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                <div className="h-14 md:h-24 bg-white rounded-lg border border-[#e4e4e7] shadow-sm" />
                <div className="h-14 md:h-24 bg-white rounded-lg border border-[#e4e4e7] shadow-sm" />
                <div className="h-14 md:h-24 bg-white rounded-lg border border-[#e4e4e7] shadow-sm" />
              </div>
              <div className="h-16 md:h-32 bg-white rounded-lg border border-[#e4e4e7] shadow-sm" />
            </div>
          </div>
        </div>
      </motion.div>


      {/* Content - fills space between grid lines */}
      <div className="absolute inset-x-8 sm:inset-x-[5vw] top-[100px] md:top-[120px] bottom-[30vh] flex flex-col items-center justify-center">
        <motion.div
          className="flex max-w-[960px] flex-col items-center gap-5 md:gap-8 px-2"
          style={{ scale: contentScale, opacity: contentOpacity }}
        >
          {/* Headline */}
          <div className="text-center">
            <h1 className="font-serif text-[32px] sm:text-[48px] md:text-[72px] leading-[1.1] tracking-tight text-[#18181b]">
              You Manage the Build.
            </h1>
            <h1 className="font-serif text-[32px] sm:text-[48px] md:text-[72px] leading-[1.1] tracking-tight text-[#18181b]">
              We Manage the Money.
            </h1>
          </div>

          {/* Subtitle */}
          <p className="max-w-[680px] text-center text-base md:text-xl leading-7 md:leading-8 text-[#71717a]">
            Dedicated payment infrastructure for construction. Subs get paid in days,
            not months. Client funds stay protected. You stay focused on building.
          </p>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto px-6 py-4 md:px-8 md:py-6 text-base md:text-lg">
              Request Early Access
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 py-4 md:px-8 md:py-6 text-base md:text-lg">
              See How It Works
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
