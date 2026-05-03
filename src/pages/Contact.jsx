import React from 'react';

const ContactCard = ({ title, label, link, iconPath }) => {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="group relative flex flex-col items-center justify-center p-8 w-full h-48 md:h-64 bg-[#050001] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(242,97,63,0.2)]"
      style={{ border: '1px solid rgba(242, 97, 63, 0.3)' }}
    >
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
    </a>
  );
};

const Contact = () => {
  const contactLinks = [
    {
      title: "EMAIL",
      label: "Reach Out",
      link: "mailto:abhinanand08@gmail.com",
      iconPath: "M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"
    },
    {
      title: "LINKEDIN",
      label: "Network",
      link: "https://www.linkedin.com/in/abhinand-anand-38069527a/",
      iconPath: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"
    },
    {
      title: "GITHUB",
      label: "Codebase",
      link: "https://github.com/abhinand00",
      iconPath: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
    },
    {
      title: "RESUME",
      label: "Credentials",
      link: "/RESUME_Abhinand.pdf",
      iconPath: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6"
    }
  ];

  return (
    <div id="contact" className="relative w-full min-h-screen bg-[#0C0C0C] overflow-hidden flex flex-col">
      {/* Atmospheric Backgrounds */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#F2613F] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-[#F2613F] opacity-[0.02] blur-[180px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none overflow-hidden mt-12 md:mt-0">
          <h1 className="text-[100px] md:text-[250px] font-black leading-none opacity-10 tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px #F2613F' }}>
            CONNECT
          </h1>
        </div>
        
        <h1 className="relative z-10 text-[60px] md:text-[150px] font-bold tracking-widest drop-shadow-[0_0_20px_rgba(242,97,63,0.3)] leading-none text-white mt-20 md:mt-0">
          CONTACT
        </h1>
        <p className="relative z-10 text-[#F2613F] font-mono tracking-[0.5em] text-[10px] md:text-xs uppercase mt-4 opacity-80">
          Available for innovative architecture
        </p>
      </div>

      {/* Grid Section */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 pb-24 md:pb-36 -mt-10 md:-mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactLinks.map((contact, idx) => (
            <ContactCard key={idx} {...contact} />
          ))}
        </div>
      </div>

      {/* Footer Drift */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30">
        <p className="text-white/20 font-mono text-[8px] tracking-[0.8em] uppercase">Based in the machine</p>
      </div>
    </div>
  );
};

export default Contact;
