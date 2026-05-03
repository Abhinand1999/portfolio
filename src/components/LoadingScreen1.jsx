import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// SVG path data for each letter of "Abhinand"
// Each letter has its own viewBox-local paths (0 0 100 120)
const letterPaths = {
  A: [
    "M50 15 L20 105",
    "M50 15 L80 105",
    "M32 70 L68 70",
  ],
  b: [
    "M30 15 L30 105",
    "M30 60 C30 45, 70 45, 70 65 C70 85, 30 90, 30 105",
  ],
  h: [
    "M25 15 L25 105",
    "M25 55 C25 30, 75 30, 75 55",
    "M75 55 L75 105",
  ],
  i: [
    "M50 20 C53 20, 55 23, 55 26 C55 29, 53 32, 50 32 C47 32, 45 29, 45 26 C45 23, 47 20, 50 20",
    "M50 42 L50 105",
  ],
  n: [
    "M25 45 L25 105",
    "M25 55 C25 30, 75 30, 75 55",
    "M75 55 L75 105",
  ],
  a: [
    "M70 50 C70 30, 30 30, 30 60 C30 90, 70 90, 70 75",
    "M70 45 L70 105",
  ],
  n2: [
    "M25 45 L25 105",
    "M25 55 C25 30, 75 30, 75 55",
    "M75 55 L75 105",
  ],
  d: [
    "M70 50 C70 30, 30 30, 30 60 C30 90, 70 90, 70 75",
    "M70 15 L70 105",
  ],
};

const LETTER_ORDER = ['A', 'b', 'h', 'i', 'n', 'a', 'n2', 'd'];

// Letter widths for spacing (some letters are narrower)
const LETTER_WIDTHS = {
  A: 85,
  b: 75,
  h: 80,
  i: 60,
  n: 80,
  a: 75,
  n2: 80,
  d: 85,
};

const LoadingScreen1 = ({ onComplete }) => {
  const containerRef = useRef(null);
  const svgRefs = useRef({});
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onUpdate: () => {
        setProgress(Math.round(tl.progress() * 100));
      },
      onComplete: () => {
        setFadeOut(true);
        if (onComplete) setTimeout(onComplete, 800);
      },
    });

    // Initialize all paths as hidden (dashoffset + opacity)
    LETTER_ORDER.forEach((key) => {
      const paths = svgRefs.current[key];
      if (!paths) return;
      paths.forEach((path) => {
        if (!path) return;
        const len = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: len,
          strokeDashoffset: len + 1, // Added small buffer
          opacity: 0,
        });
      });
    });

    // Animate each letter: draw in, and erase previous letter simultaneously
    LETTER_ORDER.forEach((key, letterIdx) => {
      const paths = svgRefs.current[key];
      if (!paths || paths.length === 0) return;

      const isLast = letterIdx === LETTER_ORDER.length - 1;
      const label = `letter-${letterIdx}`;
      
      // Start this letter a bit before previous one finishes drawing
      tl.addLabel(label, letterIdx === 0 ? 0 : "-=0.35");

      // When the final letter ('d') starts, reveal all previous letters
      if (isLast) {
        LETTER_ORDER.forEach((prevKey, prevIdx) => {
          if (prevIdx === letterIdx) return;
          const prevPaths = svgRefs.current[prevKey];
          if (prevPaths) {
            prevPaths.forEach((path) => {
              if (!path) return;
              tl.to(path, {
                strokeDashoffset: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
              }, label);
            });
          }
        });
      }

      // Draw this letter in
      paths.forEach((path, i) => {
        if (!path) return;
        const len = path.getTotalLength();
        // Ensure starting state is hidden
        tl.fromTo(path,
          { strokeDashoffset: len, opacity: 1 },
          {
            strokeDashoffset: 0,
            duration: 0.7,
            ease: 'power2.inOut',
          },
          `${label}+=${i * 0.1}`
        );
      });

      // Sequential behavior: erase previous letter as current starts
      // This applies until the last letter ('d') begins to draw
      if (letterIdx > 0 && !isLast) {
        const prevKey = LETTER_ORDER[letterIdx - 1];
        const prevPaths = svgRefs.current[prevKey];
        if (prevPaths) {
          prevPaths.forEach((path) => {
            if (!path) return;
            const len = path.getTotalLength();
            tl.to(path, {
              strokeDashoffset: -len,
              duration: 0.7,
              ease: 'power2.inOut',
            }, label);
          });
        }
      }
    });

    // Hold the full word visible
    tl.to({}, { duration: 0.3 }, "+=0.5");

    // Final erase all letters simultaneously before finishing
    tl.addLabel('finalErase');
    LETTER_ORDER.forEach((key) => {
      const paths = svgRefs.current[key];
      if (!paths) return;
      paths.forEach((path) => {
        if (!path) return;
        const len = path.getTotalLength();
        tl.to(path, {
          strokeDashoffset: len,
          duration: 0.6,
          ease: 'power2.in',
        }, 'finalErase');
      });
    });

    return () => tl.kill();
  }, [onComplete]);

  const registerPath = (letterKey, index, el) => {
    if (!el) return;
    if (!svgRefs.current[letterKey]) {
      svgRefs.current[letterKey] = [];
    }
    svgRefs.current[letterKey][index] = el;
  };

  // Calculate total width and positions
  const gap = 4;
  let positions = [];
  let xOffset = 0;
  LETTER_ORDER.forEach((key) => {
    positions.push(xOffset);
    xOffset += LETTER_WIDTHS[key] + gap;
  });
  const totalWidth = xOffset - gap;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#000' }}
    >
      {/* Horizontal layout of all letters */}
      <svg
        viewBox={`0 0 ${totalWidth} 120`}
        style={{ width: Math.min(totalWidth * 1.5, 700), height: 'auto' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {LETTER_ORDER.map((key, idx) => {
          const paths = letterPaths[key];
          const x = positions[idx];
          return (
            <g key={key} transform={`translate(${x}, 0)`}>
              {paths.map((d, i) => (
                <path
                  key={`${key}-${i}`}
                  ref={(el) => registerPath(key, i, el)}
                  d={d}
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  style={{ opacity: 0 }} // Start invisible to prevent white dot artifacts
                />
              ))}
            </g>
          );
        })}
      </svg>

      {/* Progress Indicator */}
      <div className="absolute bottom-12 right-12 flex items-baseline gap-1 font-mono">
        <span className="text-white/30 text-xs uppercase tracking-[0.3em] mb-1">Loading</span>
        <span className="text-white text-8xl font-extralight tabular-nums leading-none">
          {String(progress).padStart(2, '0')}
        </span>
        {/* <span className="text-white/40 text-2xl font-light ml-1">%</span> */}
      </div>
    </div>
  );
};

export default LoadingScreen1;