import React from 'react';

const Scrolle = () => {
  return (
    <div className="flex flex-col items-center gap-4 group cursor-default select-none transition-opacity duration-700 opacity-60 hover:opacity-100">
      {/* Scroll Label */}
      <span className="text-[#F2613F] font-mono text-[8px] md:text-[10px] tracking-[0.6em] uppercase translate-x-[0.3em]">
        Scroll
      </span>
      
      {/* Mouse/Indicator Track */}
      <div className="relative w-[18px] md:w-[22px] h-[35px] md:h-[40px] rounded-full overflow-hidden border-[1px] border-[#F2613F]/30 bg-[#050001]">
        {/* Animated Flow Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[#F2613F] to-transparent animate-scroll-flow" />
        
        {/* Glowing Tip */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#F2613F] rounded-full shadow-[0_0_8px_#F2613F]" />
      </div>

      <style jsx>{`
        @keyframes scroll-flow {
          0% { transform: translate(-50%, -100%); }
          100% { transform: translate(-50%, 100%); }
        }
        .animate-scroll-flow {
          animation: scroll-flow 2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Scrolle;