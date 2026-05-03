import React from 'react';

const AboutContent = () => {
  return (
    <div className="w-full min-h-screen bg-[#0C0C0C] flex items-center justify-center py-20 px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Visual/Title Segment */}
        <div className="relative group">
          <div className="absolute -top-10 -left-10 w-40 h-40 border-t-2 border-l-2 border-[#F2613F]/30 rounded-tl-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 border-b-2 border-r-2 border-[#F2613F]/30 rounded-br-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col gap-4">
            <h4 className="text-[#F2613F] font-mono tracking-[0.4em] text-xs uppercase opacity-80">
              Identity // Full Stack Alchemist
            </h4>
            <h2 className="text-4xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Shaping raw <span className="text-transparent" style={{ WebkitTextStroke: '1px #F2613F' }}>code</span> into functional art.
            </h2>
            
            <div className="flex gap-12 mt-8">
              <div className="flex flex-col">
                <span className="text-[#F2613F] font-bold text-2xl tracking-tighter">1.7+</span>
                <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Years Exp.</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#F2613F] font-bold text-2xl tracking-tighter">8+</span>
                <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Story Segment */}
        <div className="relative">
          <div className="relative z-10 space-y-8">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.5)]">
               <p className="text-white/80 text-lg md:text-xl leading-relaxed font-light first-letter:text-5xl first-letter:font-bold first-letter:text-[#F2613F] first-letter:mr-3 first-letter:float-left">
                I am a Full Stack Developer with a deep-seated passion for architectural integrity and user-centric design. Over the last 1.7 years, I have navigated the complexities of the digital realm, breathing life into responsive web applications and engineering scalable backend systems.
              </p>
            </div>
            
            <p className="text-white/60 text-base md:text-lg leading-relaxed pl-4 border-l-2 border-[#F2613F]/50 italic">
              Specializing in the nexus between robust Node.js logic and fluid React interactions, I solve complex puzzles through optimization and modern technological stacks.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <span className="px-5 py-2 rounded-full bg-[#F2613F]/5 border border-[#F2613F]/20 text-[#F2613F] text-[10px] font-mono tracking-widest uppercase">
                Optimizing Performance
              </span>
              <span className="px-5 py-2 rounded-full bg-[#F2613F]/5 border border-[#F2613F]/20 text-[#F2613F] text-[10px] font-mono tracking-widest uppercase">
                Scalable Architectures
              </span>
              <span className="px-5 py-2 rounded-full bg-[#F2613F]/5 border border-[#F2613F]/20 text-[#F2613F] text-[10px] font-mono tracking-widest uppercase">
                Modern UX
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutContent;
