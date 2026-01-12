"use client";

import { ShinyBorder } from "./shiny-border";

type GridIntersectionProps = {
  className?: string;
};

function GridIntersection({ className = "" }: GridIntersectionProps) {
  return (
    <div className={`absolute ${className}`}>
      <svg
        width="9"
        height="9"
        viewBox="0 0 9 9"
        fill="none"
        className="-translate-x-1/2 -translate-y-1/2"
      >
        {/* 4-point star */}
        <path
          d="M4.5 0L5.2 3.8L9 4.5L5.2 5.2L4.5 9L3.8 5.2L0 4.5L3.8 3.8L4.5 0Z"
          fill="rgba(24, 24, 27, 0.3)"
        />
      </svg>
    </div>
  );
}

type GridBackgroundProps = {
  children: React.ReactNode;
  className?: string;
};

export function GridBackground({ children, className = "" }: GridBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Full-height vertical lines */}
      <ShinyBorder orientation="vertical" className="left-0" delay={0} />
      <ShinyBorder orientation="vertical" className="right-0" delay={1.5} />

      {/* Full-width horizontal lines */}
      <ShinyBorder orientation="horizontal" className="top-0" delay={0.5} />
      <ShinyBorder orientation="horizontal" className="bottom-0" delay={2} />

      {/* Intersection stars */}
      <GridIntersection className="top-0 left-0" />
      <GridIntersection className="top-0 right-0" />
      <GridIntersection className="bottom-0 left-0" />
      <GridIntersection className="bottom-0 right-0" />

      {/* Content */}
      {children}
    </div>
  );
}
