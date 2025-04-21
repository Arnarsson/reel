// "use client" // Removed directive

import React from 'react'

export function HeroLines() {
  const colors = [
    '#A855F7', // Purple
    '#3B82F6', // Blue
    '#22D3EE', // Cyan
    '#10B981', // Emerald
    '#FACC15', // Yellow
    '#F97316', // Orange
    '#EF4444'  // Red
  ];

  // Base path - converging towards the center then straightening
  const basePath = (yOffset) => 
    `M -50 ${250 + yOffset} Q 720 ${250 + yOffset * 0.2} 1490 ${250 + yOffset * 0.1}`;

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1440 500" // Adjusted viewBox for better positioning
        preserveAspectRatio="xMidYMid slice"
        className="absolute bottom-0 left-0 w-full h-auto translate-y-1/4" // Position slightly lower
      >
        <defs>
          {/* Optional: Define gradients or filters if needed later */}
        </defs>
        <g>
          {colors.map((color, index) => {
            const yOffset = (index - Math.floor(colors.length / 2)) * 25; // Spread lines vertically
            return (
              <path 
                key={index}
                d={basePath(yOffset)}
                stroke={color}
                strokeWidth="3" // Slightly thicker lines
                fill="none"
              />
            );
          })}
        </g>
      </svg>
    </div>
  )
} 