import React from 'react';

// Decorative wreath SVG component for Cluster Fascination theme
export const WreathDecoration = ({ size = 150, style = {} }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...style }}
    >
      {/* Main wreath circle */}
      <circle
        cx="100"
        cy="100"
        r="70"
        stroke="#1A1A1A"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4 4"
      />
      
      {/* Leaves around the wreath */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x = 100 + 70 * Math.cos(angle);
        const y = 100 + 70 * Math.sin(angle);
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="8"
            ry="4"
            fill="#B9EAD8"
            opacity="0.8"
            transform={`rotate(${i * 30} ${x} ${y})`}
          />
        );
      })}
      
      {/* Decorative flowers */}
      <circle cx="100" cy="30" r="5" fill="#F5D5D8" />
      <circle cx="170" cy="100" r="4" fill="#E8DCC9" />
      <circle cx="30" cy="100" r="4" fill="#F5D5D8" />
      <circle cx="100" cy="170" r="5" fill="#E8DCC9" />
    </svg>
  );
};

// Simple flower accent
export const FlowerAccent = ({ size = 30, color = '#F5D5D8', style = {} }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...style }}
    >
      <circle cx="25" cy="25" r="4" fill={color} />
      {[...Array(5)].map((_, i) => {
        const angle = (i * 72 * Math.PI) / 180;
        const x = 25 + 10 * Math.cos(angle);
        const y = 25 + 10 * Math.sin(angle);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="6"
            fill={color}
            opacity="0.7"
          />
        );
      })}
    </svg>
  );
};

// Leaf decoration
export const LeafDecoration = ({ size = 40, style = {} }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...style }}
    >
      <path
        d="M10 50 Q 20 30, 30 10 Q 40 30, 50 50 Q 35 45, 30 40 Q 25 45, 10 50 Z"
        fill="#B9EAD8"
        opacity="0.8"
        stroke="#8FD4BB"
        strokeWidth="1"
      />
      <path
        d="M30 10 L30 40"
        stroke="#7BC8A4"
        strokeWidth="1.5"
      />
    </svg>
  );
};

// Minimalist branch decoration
export const BranchDecoration = ({ width = 100, style = {} }) => {
  return (
    <svg
      width={width}
      height="40"
      viewBox="0 0 100 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...style }}
    >
      <path
        d="M0 20 Q 25 15, 50 20 Q 75 25, 100 20"
        stroke="#1A1A1A"
        strokeWidth="2"
        fill="none"
      />
      {/* Small leaves on the branch */}
      <ellipse cx="20" cy="15" rx="6" ry="3" fill="#B9EAD8" transform="rotate(-30 20 15)" />
      <ellipse cx="40" cy="18" rx="6" ry="3" fill="#B9EAD8" transform="rotate(20 40 18)" />
      <ellipse cx="60" cy="22" rx="6" ry="3" fill="#B9EAD8" transform="rotate(-25 60 22)" />
      <ellipse cx="80" cy="19" rx="6" ry="3" fill="#B9EAD8" transform="rotate(15 80 19)" />
      
      {/* Tiny flowers */}
      <circle cx="30" cy="17" r="2" fill="#F5D5D8" />
      <circle cx="70" cy="21" r="2" fill="#E8DCC9" />
    </svg>
  );
};

// Decorative corner element
export const CornerDecoration = ({ size = 80, style = {} }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...style }}
    >
      {/* Corner leaves */}
      <path
        d="M10 10 Q 30 15, 40 40"
        stroke="#B9EAD8"
        strokeWidth="3"
        fill="none"
      />
      <ellipse cx="15" cy="15" rx="8" ry="4" fill="#B9EAD8" opacity="0.7" transform="rotate(-45 15 15)" />
      <ellipse cx="25" cy="20" rx="8" ry="4" fill="#8FD4BB" opacity="0.6" transform="rotate(-30 25 20)" />
      <ellipse cx="32" cy="28" rx="8" ry="4" fill="#B9EAD8" opacity="0.7" transform="rotate(-20 32 28)" />
      
      {/* Small flower accent */}
      <circle cx="20" cy="25" r="3" fill="#F5D5D8" />
      <circle cx="16" cy="27" r="2" fill="#F5D5D8" opacity="0.7" />
      <circle cx="24" cy="27" r="2" fill="#F5D5D8" opacity="0.7" />
      <circle cx="20" cy="31" r="2" fill="#F5D5D8" opacity="0.7" />
    </svg>
  );
};

// Section divider with leaves
export const SectionDivider = ({ width = 200, style = {} }) => {
  return (
    <svg
      width={width}
      height="30"
      viewBox="0 0 200 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...style }}
    >
      {/* Center flower */}
      <circle cx="100" cy="15" r="5" fill="#F5D5D8" />
      <circle cx="95" cy="15" r="3" fill="#E8DCC9" opacity="0.7" />
      <circle cx="105" cy="15" r="3" fill="#E8DCC9" opacity="0.7" />
      <circle cx="100" cy="10" r="3" fill="#E8DCC9" opacity="0.7" />
      <circle cx="100" cy="20" r="3" fill="#E8DCC9" opacity="0.7" />
      
      {/* Leaves extending from center */}
      <ellipse cx="80" cy="15" rx="10" ry="4" fill="#B9EAD8" opacity="0.8" />
      <ellipse cx="60" cy="15" rx="10" ry="4" fill="#8FD4BB" opacity="0.7" />
      <ellipse cx="40" cy="15" rx="10" ry="4" fill="#B9EAD8" opacity="0.6" />
      
      <ellipse cx="120" cy="15" rx="10" ry="4" fill="#B9EAD8" opacity="0.8" />
      <ellipse cx="140" cy="15" rx="10" ry="4" fill="#8FD4BB" opacity="0.7" />
      <ellipse cx="160" cy="15" rx="10" ry="4" fill="#B9EAD8" opacity="0.6" />
      
      {/* Connecting line */}
      <line x1="20" y1="15" x2="180" y2="15" stroke="#B9EAD8" strokeWidth="1" opacity="0.5" />
    </svg>
  );
};

export default {
  WreathDecoration,
  FlowerAccent,
  LeafDecoration,
  BranchDecoration,
  CornerDecoration,
  SectionDivider
};

