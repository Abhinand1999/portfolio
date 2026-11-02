import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NavigationBar = () => {
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const primaryNavRef = useRef(null);
  const stickyNavRef = useRef(null);
  const navItemsRef = useRef([]);

  const navItems = ['About', 'Experience', 'Project', 'Contact'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate desktop primary nav items
      if (primaryNavRef.current) {
        gsap.from(primaryNavRef.current.querySelectorAll('li'), {
          duration: 0.8,
          y: -30,
          opacity: 0,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          delay: 0.3,
        });
      }

      // Magnetic hover effect on desktop items
      navItemsRef.current.forEach((item) => {
        if (!item) return;

        const dot = item.querySelector('span:last-child');

        const onEnter = () => {
          gsap.to(item, {
            y: -3,
            duration: 0.3,
            ease: 'power2.out',
          });
          if (dot) {
            gsap.to(dot, {
              scale: 1.5,
              opacity: 1,
              duration: 0.2,
              ease: 'power2.out',
            });
          }
        };

        const onLeave = () => {
          gsap.to(item, {
            y: 0,
            duration: 0.4,
            ease: 'elastic.out(1, 0.5)',
          });
          if (dot) {
            gsap.to(dot, {
              scale: 1,
              opacity: 0,
              duration: 0.3,
            });
          }
        };

        item.addEventListener('mouseenter', onEnter);
        item.addEventListener('mouseleave', onLeave);

        item._gsapHandlers = { onEnter, onLeave };
      });

      // Scroll trigger for desktop sticky nav appearance
      ScrollTrigger.create({
        start: '100px top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          setShowStickyNav(self.progress > 0);
        },
      });
    }, primaryNavRef);

    return () => {
      ctx.revert();

      // Clean up hover event listeners
      navItemsRef.current.forEach((item) => {
        if (item && item._gsapHandlers) {
          item.removeEventListener('mouseenter', item._gsapHandlers.onEnter);
          item.removeEventListener('mouseleave', item._gsapHandlers.onLeave);
        }
      });
    };
  }, []);

  // Desktop sticky nav animation
  useEffect(() => {
    if (!stickyNavRef.current) return;

    if (showStickyNav) {
      gsap.fromTo(
        stickyNavRef.current,
        { y: -80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
          onComplete: () => {
            gsap.to(stickyNavRef.current, {
              scale: 1.02,
              duration: 0.3,
              repeat: 1,
              yoyo: true,
              ease: 'power1.inOut',
            });
          },
        }
      );
    } else {
      gsap.to(stickyNavRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [showStickyNav]);

  // Close mobile drawer when window resizes to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <div style={{ backgroundColor: '#0C0C0C' }}>
      {/* Primary Navigation - Desktop */}
      <nav ref={primaryNavRef} className="hidden md:block w-full py-4 px-4 sm:px-8 md:px-16 lg:px-24">
        <ul className="hidden md:flex flex-wrap justify-end gap-6 md:gap-8">
          {navItems.map((item, index) => (
            <li
              key={item}
              ref={(el) => (navItemsRef.current[index] = el)}
              className="group flex flex-col items-center cursor-pointer text-sm sm:text-base"
              onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative inline-block" style={{ color: '#F2613F' }}>
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brown group-hover:w-full transition-all duration-300 ease-out"></span>
              </span>
              <span className="w-2 h-2 mt-1 rounded-full bg-brown opacity-0 transform scale-0"></span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sticky Navigation - Desktop Only */}
      <nav
        ref={stickyNavRef}
        className="hidden md:block fixed top-0 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] md:max-w-xl mt-3 p-2 md:p-3 rounded-2xl z-50 shadow-lg"
        style={{ opacity: 0, transform: 'translateY(-20px)', backgroundColor: '#481E14', color: '#F2613F' }}
      >
        <ul className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8">
          {navItems.map((item) => (
            <li
              key={`${item}-sticky`}
              className="group flex flex-col items-center cursor-pointer px-2 sm:px-4 py-1 rounded-lg hover:bg-rgb(72, 30, 20) transition-colors text-xs sm:text-sm md:text-base"
              onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative inline-block" style={{ backgroundColor: '#481E14' }}>
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 ease-out"></span>
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Icon (Hamburger / Close Toggle) - Mobile Only */}
      <button
        type="button"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMobileMenuOpen}
        className="fixed top-4 right-4 z-[100] md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#050001]/90 border border-[#F2613F]/40 text-[#F2613F] backdrop-blur-md shadow-[0_0_15px_rgba(242,97,63,0.25)] active:scale-95 transition-all focus:outline-none"
      >
        <span
          className={`h-0.5 bg-[#F2613F] rounded-full transition-all duration-300 origin-center ${
            isMobileMenuOpen ? 'w-5 translate-y-2 rotate-45' : 'w-5'
          }`}
        />
        <span
          className={`h-0.5 bg-[#F2613F] rounded-full transition-all duration-300 ${
            isMobileMenuOpen ? 'w-5 opacity-0 scale-0' : 'w-4'
          }`}
        />
        <span
          className={`h-0.5 bg-[#F2613F] rounded-full transition-all duration-300 origin-center ${
            isMobileMenuOpen ? 'w-5 -translate-y-2 -rotate-45' : 'w-5'
          }`}
        />
      </button>

      {/* Mobile Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/75 backdrop-blur-sm z-[90] md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Slide-in Drawer */}
      <aside
        data-lenis-prevent="true"
        aria-hidden={!isMobileMenuOpen}
        className={`fixed top-0 right-0 bottom-0 w-[82%] max-w-xs h-full bg-[#050001]/95 backdrop-blur-2xl border-l border-[#F2613F]/30 z-[95] md:hidden flex flex-col justify-between p-6 sm:p-8 transition-transform duration-300 ease-out shadow-[-15px_0_40px_rgba(0,0,0,0.85)] ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        {/* Drawer Header */}
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#F2613F] animate-pulse shadow-[0_0_8px_#F2613F]" />
            <span className="text-[#F2613F] font-mono text-[11px] tracking-[0.4em] uppercase">
              Navigation
            </span>
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-[#F2613F]/40 via-[#F2613F]/10 to-transparent" />
        </div>

        {/* Drawer Nav Items */}
        <nav className="my-auto py-6">
          <ul className="flex flex-col gap-2">
            {navItems.map((item, idx) => (
              <li key={`mobile-${item}`}>
                <button
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className="group flex items-center justify-between w-full py-3.5 px-3 rounded-lg text-left transition-all duration-300 hover:bg-[#F2613F]/10 border-b border-[#F2613F]/15 hover:border-[#F2613F]/50"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-[#F2613F]/50 group-hover:text-[#F2613F] transition-colors">
                      0{idx + 1}
                    </span>
                    <span className="text-xl font-bold tracking-widest text-white group-hover:text-[#F2613F] transition-colors">
                      {item}
                    </span>
                  </div>
                  <span className="text-[#F2613F] opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    →
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer Footer */}
        <div className="border-t border-[#F2613F]/20 pt-4">
          <p className="text-white/40 font-mono text-[9px] uppercase tracking-[0.3em]">
            Abhinand // Portfolio
          </p>
          <p className="text-[#F2613F]/70 font-mono text-[8px] uppercase tracking-widest mt-1">
            Full Stack Developer
          </p>
        </div>
      </aside>
    </div>
  );
};

export default NavigationBar;
