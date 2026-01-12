"use client";

import { motion } from "framer-motion";

type ShinyBorderProps = {
  orientation?: "horizontal" | "vertical";
  delay?: number;
  duration?: number;
  color?: string;
  shineColor?: string;
  shineWidth?: number;
  className?: string;
};

export function ShinyBorder({
  orientation = "horizontal",
  delay = 0,
  duration = 3,
  color = "rgba(24, 24, 27, 0.1)",
  shineColor = "rgba(24, 24, 27, 0.4)",
  shineWidth = 200,
  className = "",
}: ShinyBorderProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={`absolute ${
        isHorizontal ? "left-0 right-0 h-px" : "top-0 bottom-0 w-px"
      } ${className}`}
    >
      {/* Base border */}
      <div
        className={`absolute ${isHorizontal ? "inset-0" : "inset-0"}`}
        style={{ backgroundColor: color }}
      />

      {/* Animated shine */}
      <motion.div
        className={`absolute ${
          isHorizontal
            ? `h-px`
            : `w-px`
        }`}
        style={{
          background: isHorizontal
            ? `linear-gradient(to right, transparent, ${shineColor}, transparent)`
            : `linear-gradient(to bottom, transparent, ${shineColor}, transparent)`,
          ...(isHorizontal
            ? { width: shineWidth, top: 0 }
            : { height: shineWidth, left: 0 }),
        }}
        animate={
          isHorizontal
            ? { left: [-shineWidth, "100%"] }
            : { top: [-shineWidth, "100%"] }
        }
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
