type GradientBackgroundProps = {
  bluePosition?: { x: string; y: string };
  amberPosition?: { x: string; y: string };
  className?: string;
};

export function GradientBackground({
  bluePosition = { x: '-200px', y: '200px' },
  amberPosition = { x: '-100px', y: '-200px' },
  className = '',
}: GradientBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Blue-teal gradient blob */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          left: bluePosition.x,
          top: bluePosition.y,
          background: 'rgba(57, 128, 165, 0.15)',
          filter: 'blur(250px)',
        }}
      />
      {/* Amber gradient blob */}
      <div
        className="absolute w-[900px] h-[900px] rounded-full"
        style={{
          right: amberPosition.x,
          bottom: amberPosition.y,
          background: 'rgba(219, 163, 97, 0.25)',
          filter: 'blur(250px)',
        }}
      />
    </div>
  );
}
