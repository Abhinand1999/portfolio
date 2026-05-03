import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const nameSuffix = "bhinand";

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 800);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-800 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="flex items-center relative gap-0 md:gap-1">
        {/* Abstract Star-A with Glowing Stroke */}
        <div className="relative w-20 h-20 md:w-25 md:h-25">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Geometric Star-inspired A */}
            <path
              d="M50 5 L95 95 L50 70 L5 95 Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-light"
              style={{
                strokeDasharray: 400,
                strokeDashoffset: 400,
              }}
            />
          </svg>
        </div>

        {/* Name with Light Reveal */}
        <h1
          className="text-4xl md:text-6xl text-white font-thin select-none leading-none relative"
          style={{
            fontFamily: "'Dancing Script', cursive",
            letterSpacing: '0.02em',
            fontWeight: '100',
          }}
        >
          {nameSuffix.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block animate-light-reveal"
              style={{
                animationDelay: `${1.2 + index * 0.15}s`,
                opacity: 0,
                filter: 'blur(8px)',
                animationFillMode: 'forwards'
              }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>

      <style jsx="true">{`
        @keyframes draw-light {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes light-reveal {
          0% { opacity: 0; filter: blur(8px); transform: scale(0.9); }
          100% { opacity: 1; filter: blur(0); transform: scale(1); }
        }

        .animate-draw-light {
          animation: draw-light 1.2s ease-in-out forwards;
        }

        .animate-light-reveal {
          animation: light-reveal 1s cubic-bezier(0.23, 1, 0.32, 1);
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
