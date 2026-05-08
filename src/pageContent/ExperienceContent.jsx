import React from 'react'

const TarotCard = ({ numeral, title, role, company, content, period, transformClass, zIndexClass }) => {
    return (
        <div
            className={`group relative md:absolute top-auto md:top-1/2 left-auto md:left-1/2 md:-ml-[11rem] md:-mt-[16rem] w-[20rem] sm:w-[22rem] h-[28rem] sm:h-[32rem] flex-shrink-0 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:!rotate-0 hover:!translate-x-0 hover:!-translate-y-4 md:hover:!-translate-y-8 hover:!z-50 hover:scale-[1.02] md:hover:scale-[1.08] rounded-2xl overflow-hidden bg-[#050001] shadow-[0_0_20px_rgba(242,97,63,0.1)] hover:shadow-[0_0_60px_rgba(242,97,63,0.3)] ${transformClass} ${zIndexClass}`}
            style={{ border: '1px solid rgba(242, 97, 63, 0.4)' }}
        >
            {/* Geometric Card Face (SVG) */}
            <div className="absolute inset-0 pointer-events-none p-4 opacity-80 group-hover:opacity-10 transition-opacity duration-700">
                <svg width="100%" height="100%" viewBox="0 0 300 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="5" width="290" height="440" rx="10" stroke="#F2613F" strokeWidth="1" strokeOpacity="0.5" />
                    <rect x="12" y="12" width="276" height="426" rx="4" stroke="#F2613F" strokeWidth="0.5" strokeOpacity="0.3" />
                    
                    {/* Intricate Corner Geometry */}
                    <path d="M12 40 V12 H40" stroke="#F2613F" strokeWidth="1" />
                    <path d="M260 12 H288 V40" stroke="#F2613F" strokeWidth="1" />
                    <path d="M12 410 V438 H40" stroke="#F2613F" strokeWidth="1" />
                    <path d="M260 438 H288 V410" stroke="#F2613F" strokeWidth="1" />

                    {/* Central Eye / Seal Alignment */}
                    <circle cx="150" cy="225" r="70" stroke="#F2613F" strokeWidth="0.5" strokeDasharray="4 4" strokeOpacity="0.4" />
                    <circle cx="150" cy="225" r="50" stroke="#F2613F" strokeWidth="1" strokeOpacity="0.6" />
                    
                    {/* Pulsing Eye */}
                    <g className="animate-pulse">
                        <path d="M90 225 Q150 160 210 225 Q150 290 90 225" stroke="#F2613F" strokeWidth="2" />
                        <circle cx="150" cy="225" r="15" stroke="#F2613F" strokeWidth="1" fill="#F2613F" fillOpacity="0.2" />
                        <circle cx="150" cy="225" r="5" fill="#F2613F" />
                    </g>

                    {/* Numerical Tab Top */}
                    <path d="M130 12 L130 35 L150 50 L170 35 L170 12" stroke="#F2613F" strokeWidth="1" fill="#050001" />
                    <text x="150" y="38" fill="white" fontSize="20" fontFamily="serif" textAnchor="middle" className="font-bold tracking-widest">{numeral}</text>

                    {/* Decorative Lines */}
                    <line x1="150" y1="50" x2="150" y2="155" stroke="#F2613F" strokeWidth="0.5" strokeOpacity="0.5" />
                    <line x1="150" y1="295" x2="150" y2="400" stroke="#F2613F" strokeWidth="0.5" strokeOpacity="0.5" />
                    
                    <path d="M40 150 L80 150 M220 150 L260 150" stroke="#F2613F" strokeWidth="0.5" strokeOpacity="0.5" />
                    <path d="M40 300 L80 300 M220 300 L260 300" stroke="#F2613F" strokeWidth="0.5" strokeOpacity="0.5" />
                </svg>
            </div>

            {/* Hover Content: The Narrative */}
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-10 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0 bg-[#050001]/90 backdrop-blur-md">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-[#F2613F] font-mono text-[10px] tracking-[0.4em] uppercase">{period}</span>
                        <span className="text-white/20 font-serif text-xl italic">{numeral}</span>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl font-bold text-white leading-tight tracking-wide">
                        {title}
                    </h2>
                    
                    <div className="flex flex-col gap-1">
                        <h4 className="text-[#F2613F] font-mono text-sm uppercase tracking-widest">{role}</h4>
                        <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">{company}</span>
                    </div>
                </div>

                <div className="border-t border-[#F2613F]/20 pt-6">
                    <p className="text-white/70 text-sm leading-relaxed font-light italic">
                        {content}
                    </p>
                </div>
            </div>

            {/* Subtle Overlay Glow on Hover */}
            <div className="absolute inset-0 bg-[#F2613F] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none" />
        </div>
    );
};

const ExperienceContent = () => {
const cards = [
    {
        numeral: 'I',
        title: 'Server-Side Development',
        role: 'Node.js Developer Intern',
        company: 'Apps Team Technologies',
        content: 'Designed and deployed robust server-side architectures, optimizing RESTful API endpoints and improving database transaction speeds through advanced indexing.',
        period: 'JUL — SEP 2023',
        transformClass: 'md:-rotate-[8deg] md:-translate-x-[16rem] md:translate-y-6',
        zIndexClass: 'z-10'
    },
    {
        numeral: 'II',
        title: 'Full Stack Development',
        role: 'Software Developer Trainee',
        company: 'Selacto Solutions Pvt. Ltd.',
        content: 'Pioneered serverless AWS integrations and built sophisticated front-end ecosystems using React, focusing on high-performance state management and user journey optimization.',
        period: 'DEC 2024 — JUN 2025',
        transformClass: 'rotate-0',
        zIndexClass: 'z-20'
    },
    {
        numeral: 'III',
        title: 'Full Stack Development',
        role: 'Fullstack Developer',
        company: 'Inciem',
        content: 'Working on complex enterprise applications, maintaining atomic design consistency and building real-time notification systems.',
        period: 'AUG 2025 — PRESENT',
        transformClass: 'md:rotate-[8deg] md:translate-x-[16rem] md:translate-y-6',
        zIndexClass: 'z-10'
    }
];

    return (
        <div className="relative min-h-screen bg-[#0C0C0C] flex flex-col justify-center items-center py-20 md:py-48 overflow-x-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120vh] pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F2613F] opacity-[0.04] blur-[180px] rounded-full" />
            </div>

            {/* Intricate Frame for Card Collection */}
            <div className="relative z-10 w-full max-w-6xl md:h-[40rem] flex flex-col md:block items-center justify-center gap-10 md:gap-0 scale-90 sm:scale-100 mt-10 md:mt-0">
                {cards.map((card, index) => (
                    <TarotCard key={index} {...card} />
                ))}
            </div>

            {/* Esoteric Sub-caption */}
            <div className="mt-20 relative z-20 text-center opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-default">
                <p className="text-[#F2613F] font-mono text-[10px] tracking-[0.6em] uppercase">Seek the alignment of time and skill</p>
            </div>
        </div>
    );
}

export default ExperienceContent;