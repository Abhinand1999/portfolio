import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./ScrollCursor.css";

const ScrollCursor = () => {
  const cursorRef = useRef(null);
  const progressRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // Mouse movement tracking with GSAP for smoothness
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Scroll progress calculation
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (winScroll / height) * 100;
      
      // Update SVG dash offset
      // Radius = 12, Circumference = 2 * PI * 12 = 75.398
      const radius = 12;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (scrolled / 100) * circumference;
      
      if (progressRef.current) {
        progressRef.current.style.strokeDashoffset = offset;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="scroll-cursor-container" ref={cursorRef}>
      <div className="scroll-cursor-dot" ref={dotRef} />
      <svg className="scroll-cursor-svg" width="30" height="30" viewBox="0 0 30 30">
        <circle
          className="scroll-cursor-circle-bg"
          cx="15"
          cy="15"
          r="12"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="2"
        />
        <circle
          className="scroll-cursor-circle-progress"
          ref={progressRef}
          cx="15"
          cy="15"
          r="12"
          fill="none"
          stroke="#F2613F" // Salmon/Reddish color from the project
          strokeWidth="2"
          strokeDasharray="75.398"
          strokeDashoffset="75.398"
          strokeLinecap="round"
          transform="rotate(-90 15 15)"
        />
      </svg>
    </div>
  );
};

export default ScrollCursor;
