import React from 'react';
import Scrolle from '../components/Scrolle'
import ExperienceContent from '../pageContent/ExperienceContent';


const Experience = () => {
    return (
        <div id="experience" className="relative overflow-x-hidden bg-[#0C0C0C]">
             {/* Background Aesthetic Elements */}
            <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-[#F2613F] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-[#F2613F] opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

            {/* Main Hero Section */}
            <div className="relative w-full h-[60vh] md:h-screen flex flex-col items-center justify-center text-center px-4 mt-10 md:mt-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none overflow-hidden mt-6 md:mt-0">
                    <h1 className="text-[60px] sm:text-[100px] md:text-[250px] font-black leading-none opacity-10 tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px #F2613F' }}>
                        HISTORY
                    </h1>
                </div>
                
                <h1 className="relative z-10 text-[30px] sm:text-[60px] md:text-[150px] font-bold tracking-widest drop-shadow-[0_0_20px_rgba(242,97,63,0.3)] leading-none text-white mt-10 md:mt-0">
                    EXPERIENCE
                </h1>
                <p className="relative z-10 text-[#F2613F] font-mono tracking-[0.3em] sm:tracking-[0.5em] text-[8px] sm:text-[10px] md:text-xs uppercase mt-4 md:mt-6 opacity-80 max-w-[80vw] mx-auto text-center">
                    The Chronicles Of Growth
                </p>
                
                {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                    <Scrolle />
                </div> */}
            </div>

            {/* Tarot Cards Section */}
            <div className="relative z-20 border-t border-[#F2613F]/10">
                <ExperienceContent />
            </div>
        </div>
    );
};

export default Experience;
