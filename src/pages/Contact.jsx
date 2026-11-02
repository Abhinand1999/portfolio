import React, { useState } from 'react';

const ContactCard = ({ title, label, link, iconPath, onClick }) => {
  const content = (
    <>
      {/* Background Glow Overlay */}
      <div className="absolute inset-0 bg-[#F2613F] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500" />
      
      {/* Icon/Visual Element */}
      <div className="relative z-10 mb-6 group-hover:scale-110 transition-transform duration-500">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F2613F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 transition-opacity">
          <path d={iconPath} />
        </svg>
      </div>

      {/* Text Content */}
      <span className="relative z-10 text-white/40 font-mono text-[10px] uppercase tracking-[0.3em] mb-2">{label}</span>
      <h3 className="relative z-10 text-white text-xl font-bold tracking-widest">{title}</h3>

      {/* Decorative Border Glow on Hover */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-[#F2613F] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
    </>
  );

  const className = "group relative flex flex-col items-center justify-center p-8 w-full h-48 md:h-64 bg-[#050001] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(242,97,63,0.2)]";
  const style = { border: '1px solid rgba(242, 97, 63, 0.3)' };

  if (onClick) {
    return (
      <button onClick={onClick} className={className} style={style}>
        {content}
      </button>
    );
  }

  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={className}
      style={style}
    >
      {content}
    </a>
  );
};

const Contact = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("abhinandhari999@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const contactLinks = [
    {
      title: "EMAIL",
      label: "Reach Out",
      link: "mailto:abhinandhari999@gmail.com",
      iconPath: "M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"
    },
    {
      title: "LINKEDIN",
      label: "Network",
      link: "https://www.linkedin.com/in/abhinand-h-85b56a229/",
      iconPath: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"
    },
    {
      title: "GITHUB",
      label: "Codebase",
      link: "https://github.com/abhinand1999",
      iconPath: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
    },
    {
      title: "RESUME",
      label: "Credentials",
      link: "/Abhinand.pdf",
      iconPath: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6"
    }
  ];

  return (
    <div id="contact" className="relative w-full min-h-screen bg-[#0C0C0C] overflow-x-hidden flex flex-col">
      {/* Atmospheric Backgrounds */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#F2613F] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-[#F2613F] opacity-[0.02] blur-[180px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] flex flex-col items-center justify-center text-center px-4 mt-10 md:mt-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none overflow-hidden mt-6 md:mt-0">
          <h1 className="text-[60px] sm:text-[100px] md:text-[250px] font-black leading-none opacity-10 tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px #F2613F' }}>
            CONNECT
          </h1>
        </div>
        
        <h1 className="relative z-10 text-[35px] sm:text-[60px] md:text-[150px] font-bold tracking-widest drop-shadow-[0_0_20px_rgba(242,97,63,0.3)] leading-none text-white mt-10 md:mt-0">
          CONTACT
        </h1>
        <p className="relative z-10 text-[#F2613F] font-mono tracking-[0.3em] sm:tracking-[0.5em] text-[8px] sm:text-[10px] md:text-xs uppercase mt-4 md:mt-6 opacity-80 max-w-[80vw] text-center">
          Available for innovative architecture
        </p>
      </div>

      {/* Desktop Grid Section (>= md) */}
      <div className="hidden md:block relative z-20 w-full max-w-6xl mx-auto px-6 pb-24 md:pb-36 -mt-10 md:-mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactLinks.map((contact, idx) => (
            <ContactCard 
              key={idx} 
              {...contact} 
              onClick={contact.title === "RESUME" ? () => setIsResumeModalOpen(true) : undefined}
            />
          ))}
        </div>
      </div>

      {/* Mobile Design Model: Cyber Transmission Console (Only on < md) */}
      <div className="block md:hidden relative z-20 w-full px-5 pb-28 -mt-4">
        {/* HUD Status Header */}
        <div className="w-full bg-[#050001]/90 border border-[#F2613F]/30 rounded-2xl p-4 mb-4 backdrop-blur-md flex items-center justify-between shadow-[0_0_20px_rgba(242,97,63,0.1)]">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2613F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F2613F]"></span>
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[#F2613F] uppercase">Channel: Open</span>
          </div>
          {/* <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">Direct Connect // 2026</span> */}
        </div>

        {/* Primary Action Card: Email Dispatch Console */}
        <div className="relative bg-[#050001] border border-[#F2613F]/40 rounded-2xl p-5 mb-4 overflow-hidden shadow-[0_0_25px_rgba(242,97,63,0.12)]">
          {/* Corner Tech Brackets */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#F2613F]/50 pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#F2613F]/50 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#F2613F]/50 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#F2613F]/50 pointer-events-none" />

          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[9px] text-white/50 tracking-[0.25em] uppercase">Primary Dispatch</span>
            <span className="text-[10px] font-mono text-[#F2613F] bg-[#F2613F]/10 border border-[#F2613F]/30 px-2 py-0.5 rounded-full font-bold">EMAIL</span>
          </div>

          <h3 className="text-white text-lg font-bold tracking-wider mb-1">Let's Build Something</h3>
          <p className="text-white/60 text-xs font-mono break-all mb-4">abhinandhari999@gmail.com</p>

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href="mailto:abhinandhari999@gmail.com"
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#F2613F] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(242,97,63,0.35)] active:scale-95 transition-transform"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
              </svg>
              Send Mail
            </a>
            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-[#F2613F]/30 text-white font-mono text-xs uppercase tracking-wider rounded-xl active:scale-95 transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F2613F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Dual Social Network Deck (2 columns) */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/in/abhinand-h-85b56a229/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between p-4 bg-[#050001] border border-[#F2613F]/30 rounded-2xl h-36 active:scale-95 transition-all shadow-[0_0_15px_rgba(242,97,63,0.08)]"
          >
            <div className="flex justify-between items-start">
              <div className="w-9 h-9 rounded-xl bg-[#F2613F]/10 border border-[#F2613F]/20 flex items-center justify-center text-[#F2613F]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" />
                </svg>
              </div>
              <span className="text-white/40 group-hover:text-[#F2613F] transition-colors text-xs">↗</span>
            </div>
            <div>
              <span className="block text-white/40 font-mono text-[8px] uppercase tracking-widest">Network</span>
              <h4 className="text-white font-bold text-sm tracking-wider">LINKEDIN</h4>
              <p className="text-[#F2613F]/80 font-mono text-[9px] truncate">@abhinand-h</p>
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/abhinand1999"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between p-4 bg-[#050001] border border-[#F2613F]/30 rounded-2xl h-36 active:scale-95 transition-all shadow-[0_0_15px_rgba(242,97,63,0.08)]"
          >
            <div className="flex justify-between items-start">
              <div className="w-9 h-9 rounded-xl bg-[#F2613F]/10 border border-[#F2613F]/20 flex items-center justify-center text-[#F2613F]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </div>
              <span className="text-white/40 group-hover:text-[#F2613F] transition-colors text-xs">↗</span>
            </div>
            <div>
              <span className="block text-white/40 font-mono text-[8px] uppercase tracking-widest">Codebase</span>
              <h4 className="text-white font-bold text-sm tracking-wider">GITHUB</h4>
              <p className="text-[#F2613F]/80 font-mono text-[9px] truncate">@abhinand1999</p>
            </div>
          </a>
        </div>

        {/* Credentials Capsule: Resume Deck */}
        <div className="relative bg-[#050001] border border-[#F2613F]/40 rounded-2xl p-4 overflow-hidden shadow-[0_0_20px_rgba(242,97,63,0.1)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F2613F]/10 border border-[#F2613F]/30 flex items-center justify-center text-[#F2613F]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" />
                </svg>
              </div>
              <div>
                <span className="block text-white/40 font-mono text-[8px] uppercase tracking-widest">Credentials</span>
                <h4 className="text-white font-bold text-base tracking-wider">CURRICULUM VITAE</h4>
              </div>
            </div>
            <span className="font-mono text-[9px] text-[#F2613F] bg-[#F2613F]/10 border border-[#F2613F]/30 px-2 py-0.5 rounded-full font-bold">PDF</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#F2613F]/50 text-white font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              Preview
            </button>
            <a
              href="/Abhinand.pdf"
              download="Abhinand_Resume.pdf"
              className="py-2.5 px-3 rounded-xl bg-[#F2613F]/15 border border-[#F2613F]/50 text-[#F2613F] font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </a>
          </div>
        </div>
      </div>

      {/* Footer Drift */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30">
        <p className="text-white/20 font-mono text-[8px] tracking-[0.8em] uppercase">Based in the machine</p>
      </div>

      {/* Resume Modal */}
      {isResumeModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-8 bg-black/80 backdrop-blur-md" 
          onClick={() => setIsResumeModalOpen(false)}
          data-lenis-prevent="true"
        >
          <div 
            className="relative w-full max-w-5xl h-[85vh] sm:h-[95vh] bg-[#050001] flex flex-col rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(242,97,63,0.15)]"
            style={{ border: '1px solid rgba(242, 97, 63, 0.3)' }}
            onClick={e => e.stopPropagation()}
            data-lenis-prevent="true"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-[rgba(242,97,63,0.2)] bg-[#050001] shrink-0">
              <h3 className="text-white text-xl font-bold tracking-widest uppercase">Resume</h3>
              <div className="flex gap-6 items-center">
                <a 
                  href="/Abhinand.pdf" 
                  download="Abhinand_Resume.pdf"
                  className="flex items-center flex-row gap-2 text-[#F2613F] hover:text-white transition-colors text-sm font-mono tracking-widest uppercase"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button 
                  onClick={() => setIsResumeModalOpen(false)}
                  className="text-white/50 hover:text-white hover:rotate-90 transition-all duration-300"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="flex-grow w-full bg-white relative overflow-y-auto" data-lenis-prevent="true" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="absolute inset-0 flex items-center justify-center z-0 bg-[#0C0C0C]">
                <span className="text-[#F2613F] font-mono tracking-widest uppercase animate-pulse flex text-center px-4 text-xs md:text-base">Loading Document...</span>
              </div>
              <object 
                data="/Abhinand.pdf" 
                type="application/pdf"
                className="w-full h-full relative z-10 min-h-[600px] md:min-h-full"
                data-lenis-prevent="true"
              >
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <p className="text-white/70 font-mono text-sm">Unable to display PDF inline.</p>
                  <a 
                    href="/Abhinand.pdf" 
                    download="Abhinand_Resume.pdf"
                    className="px-6 py-2 border border-[#F2613F] text-[#F2613F] hover:bg-[#F2613F] hover:text-white transition-all font-mono text-sm uppercase tracking-widest rounded"
                  >
                    Download Resume
                  </a>
                </div>
              </object>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
