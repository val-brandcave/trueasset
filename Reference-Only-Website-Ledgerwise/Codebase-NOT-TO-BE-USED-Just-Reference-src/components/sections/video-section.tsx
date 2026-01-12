"use client";

import { motion, MotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type VideoSectionProps = {
  progress: MotionValue<number>;
};

export function VideoSection({ progress }: VideoSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Video scales up and fades in AFTER laptop animation completes
  const scale = useTransform(progress, [0.5, 0.7], [0.5, 1]);
  const opacity = useTransform(progress, [0.48, 0.6, 0.85, 0.95], [0, 1, 1, 0]);
  const borderRadius = useTransform(progress, [0.5, 0.7], [32, 0]);
  const y = useTransform(progress, [0.5, 0.7], [100, 0]);

  // Scroll indicator appears when video is full size, fades out before video fades
  const scrollIndicatorOpacity = useTransform(progress, [0.68, 0.72, 0.8, 0.85], [0, 1, 1, 0]);

  // Track when video is actually visible to enable/disable pointer events
  useMotionValueEvent(opacity, "change", (latest) => {
    setIsVisible(latest > 0.1);
  });

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
      {/* Video container - grows to full screen */}
      <motion.div
        style={{
          scale,
          opacity,
          borderRadius,
          y,
          pointerEvents: isVisible ? "auto" : "none",
        }}
        className="relative w-full h-full bg-black overflow-hidden"
      >
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0&modestbranding=1"
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </motion.div>

      {/* Scroll to see more indicator */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[70]"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
        >
          <span className="text-sm font-medium text-[#18181b]">Scroll to See More</span>
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="w-4 h-4 text-[#71717a]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
