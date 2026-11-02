import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Scrolle from '../../components/Scrolle';

const MobileHome = () => {
  const lettersRef = useRef([]);
  const containerRef = useRef(null);
  const scanlineRef = useRef(null);

  const letters = ['A', 'B', 'H', 'I', 'N', 'A', 'N', 'D'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for letters
      gsap.fromTo(
        lettersRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.8,
          rotateX: -45,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          stagger: 0.08,
          duration: 1,
          ease: 'back.out(2)',
          delay: 0.2,
        }
      );

      // Continuous subtle laser scan sweep
      if (scanlineRef.current) {
        gsap.to(scanlineRef.current, {
          y: '100%',
          duration: 3.5,
          repeat: -1,
          ease: 'power1.inOut',
          yoyo: true,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] bg-[#0C0C0C] flex flex-col justify-between items-center px-6 py-8 overflow-hidden select-none"
    >
      {/* Background Cybernetic Matrix Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(242, 97, 63, 0.35) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Atmospheric Neon Orbs */}
      <div className="absolute top-[15%] -left-[20%] w-[320px] h-[320px] bg-[#F2613F] opacity-[0.06] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] -right-[20%] w-[350px] h-[350px] bg-[#F2613F] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />

      {/* Top HUD Status Bar */}
      <div className="relative z-10 w-full flex items-center justify-between pt-2">

      </div>

      {/* Center Stage: Animated Name & Hero Identity */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto">
        {/* Subtle Background Watermark */}
        <h2
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[96px] sm:text-[120px] font-black text-transparent opacity-[0.05] tracking-tighter pointer-events-none select-none whitespace-nowrap"
          style={{ WebkitTextStroke: '2px #F2613F' }}
        >
          ABHINAND
        </h2>

        {/* Framing Corner Tech Brackets */}
        <div className="relative p-6 sm:p-8 flex flex-col items-center">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#F2613F]/50 pointer-events-none" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#F2613F]/50 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#F2613F]/50 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#F2613F]/50 pointer-events-none" />

          {/* Sub-label above Name */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#F2613F]/60" />
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-[#F2613F] uppercase">
              Full Stack Developer
            </span>
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#F2613F]/60" />
          </div>

          {/* Animated "ABHINAND" Text */}
          <div className="relative flex items-center justify-center gap-1 sm:gap-2 my-2 py-1">
            {/* Ambient Laser Scanline over text */}
            <div
              ref={scanlineRef}
              className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#F2613F] to-transparent opacity-40 pointer-events-none"
            />

            {letters.map((char, index) => (
              <span
                key={index}
                ref={(el) => (lettersRef.current[index] = el)}
                className="inline-block text-[42px] xs:text-[48px] sm:text-[64px] font-bold tracking-tight text-white transition-all duration-300"
                style={{
                  fontFamily: 'sans-serif',
                  color: 'transparent',
                  WebkitTextStroke: '1.75px #F2613F',
                  filter: 'drop-shadow(0 0 16px rgba(242, 97, 63, 0.45))',
                  animation: `letterPulse 3.5s ease-in-out infinite`,
                  animationDelay: `${index * 0.18}s`,
                }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Glowing Center Line */}
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#F2613F]/70 to-transparent my-3 shadow-[0_0_8px_#F2613F]" />

          {/* Tagline */}
          <p className="font-mono text-[10px] sm:text-xs text-white/70 uppercase tracking-[0.25em] text-center max-w-[280px]">
            Shaping raw code into functional art
          </p>

          {/* Micro Tech Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            {['REACT', 'NODE.JS', 'THREE.JS', 'AWS'].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-[#050001] border border-[#F2613F]/25 text-[#F2613F]/80 font-mono text-[8px] sm:text-[9px] tracking-widest uppercase shadow-[0_0_10px_rgba(242,97,63,0.08)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center pb-2">
        <Scrolle />
      </div>

      {/* CSS Keyframe Animations for Mobile Hero */}
      <style>{`
        @keyframes letterPulse {
          0%, 100% {
            transform: translateY(0px) scale(1);
            filter: drop-shadow(0 0 12px rgba(242, 97, 63, 0.4));
          }
          50% {
            transform: translateY(-5px) scale(1.04);
            filter: drop-shadow(0 0 24px rgba(242, 97, 63, 0.85));
          }
        }
      `}</style>
    </div>
  );
};

export default MobileHome;
