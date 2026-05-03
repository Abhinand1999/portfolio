import { useLayoutEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cardsData } from "./ProjectData";

gsap.registerPlugin(ScrollTrigger);

const Project = () => {
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    // Scroll Setup
    const lenis = new Lenis({
      smooth: true,
      direction: 'vertical',
    });
    let animationFrameId;

    const raf = (time) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };
    animationFrameId = requestAnimationFrame(raf);

    // Animating
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        // Every card except the last one will scale down and fade slightly as the NEXT card comes up
        if (index < cardsRef.current.length - 1) {
          const nextCard = cardsRef.current[index + 1];
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.3,
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top bottom", 
              end: "top top",
              scrub: true,
            }
          });
        }
      });
      
      // Animate the Title to drift upwards smoothly slightly as we enter
      gsap.fromTo(
        ".project-header-text",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
      );
    });

    return () => {
      ctx.revert();
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div id="project" className="relative w-full bg-[#0C0C0C] min-h-screen">
      {/* Background glow */}
      <div className="absolute top-[50vh] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#F2613F] opacity-[0.05] blur-[150px] pointer-events-none rounded-full" />

      {/* Title Section */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center text-center project-header-text px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none overflow-hidden">
          <h1 className="text-[120px] md:text-[250px] font-black leading-none opacity-10 tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px #F2613F' }}>
            CREATIONS
          </h1>
        </div>

        <h1 className="relative z-10 text-[60px] md:text-[150px] font-bold tracking-widest drop-shadow-[0_0_20px_rgba(242,97,63,0.3)] leading-none text-white">PROJECTS</h1>
        <p className="relative z-10 text-[#F2613F] font-mono tracking-[0.3em] text-xs md:text-sm opacity-80 uppercase mt-4">Discover The Unseen</p>
      </div>

      {/* Cards Stacking Section */}
      <div className="relative z-20 w-full pb-[20vh] px-4 md:px-0">
        {cardsData.map((card, idx) => {
          const [firstWord, ...rest] = card.title.split(" ");
          // Sticky top offset creates the fanned out stacking effect
          const topOffset = `calc(10vh + ${idx * 2}vh)`; 
          
          return (
            <div
              key={idx}
              ref={el => cardsRef.current[idx] = el}
              className="sticky w-full max-w-5xl mx-auto h-[70vh] rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(242,97,63,0.15)] mb-[20vh]"
              style={{
                top: topOffset,
                border: `2px solid rgba(242, 97, 63, 0.6)`
              }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                style={{ backgroundImage: `url(${card.bg})` }}
              />
              
              {/* Dark Gradient Overlay for cinematic readablility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/40 to-transparent opacity-95" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-14 flex flex-col justify-end">
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-[#F2613F] text-black font-bold uppercase tracking-widest text-[10px] md:text-xs px-5 py-2 rounded-full shadow-[0_0_15px_rgba(242,97,63,0.4)]">
                    Phase #{card.id}
                  </span>
                  <span className="text-white/70 font-mono text-[10px] md:text-xs tracking-widest uppercase border border-[#F2613F]/50 px-5 py-2 rounded-full backdrop-blur-sm">
                    {card.date}
                  </span>
                </div>
                
                <h2 className="text-5xl md:text-8xl font-serif text-white tracking-wider drop-shadow-[0_0_15px_rgba(242,97,63,0.3)]">
                  {firstWord} <br className="hidden md:block" />
                  <span className="text-transparent" style={{ WebkitTextStroke: '2px #F2613F' }}>{rest.join(" ")}</span>
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
