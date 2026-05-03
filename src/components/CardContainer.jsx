import { memo } from 'react';

// Asset imports
import Html from "../assets/Skills/html-5_5968267.png";
import Redux from "../assets/Skills/icons8-redux-96.png";
import Mysql from "../assets/Skills/mysql-logo.png";
import Nodejs from "../assets/Skills/icons8-nodejs-96.png";
import Postman from "../assets/Skills/pngwing.com (10).png";
import Tailwind from "../assets/Skills/icons8-tailwindcss-96.png";
import TS from "../assets/Skills/icons8-typescript-96.png";
import JS from "../assets/Skills/icons8-javascript-96.png";
import CSS from "../assets/Skills/css-3_5968242.png";
import git from "../assets/Skills/icons8-git-96.png";
import rt from "../assets/Skills/programing_15484268.png";
import AWS from "../assets/Skills/icons8-awslambda-96.png";

const Card = memo(({ title, img }) => (
  <div className="group relative shadow-[0_0_15px_rgba(242,97,63,0.15)] hover:shadow-[0_0_30px_rgba(242,97,63,0.4)] rounded-xl p-4 w-36 md:w-44 h-36 md:h-44 flex-shrink-0 flex flex-col items-center justify-center mx-4 transition-all duration-500 hover:-translate-y-2 cursor-pointer bg-[#050001] border border-[#F2613F]/30 hover:border-[#F2613F]">
    <div className="absolute inset-0 bg-[#F2613F] opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 rounded-xl pointer-events-none" />
    <img src={img} alt={title} className="w-16 h-16 md:w-20 md:h-20 mb-4 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 drop-shadow-md" />
    <p className="text-xs md:text-sm font-mono tracking-widest text-center text-[#F2613F]/60 group-hover:text-[#F2613F] transition-colors uppercase">{title}</p>
  </div>
));

Card.displayName = 'Card';

const CardContainer = () => {
  const cards = [
    { title: "HTML5", img: Html },
    { title: "Redux", img: Redux },
    { title: "MySQL", img: Mysql },
    { title: "Node.js", img: Nodejs },
    { title: "Postman", img: Postman },
    { title: "Tailwind CSS", img: Tailwind },
    { title: "TypeScript", img: TS },
    { title: "JavaScript", img: JS },
    { title: "Git", img: git },
    { title: "CSS3", img: CSS },
    { title: "RT Prog", img: rt },
    { title: "AWS Lambda", img: AWS },
  ];

  /* Duplicate the array twice to ensure super smooth looping across large displays */
  const repeatedCards = [...cards, ...cards, ...cards]; 

  return (
    <div className="relative w-full bg-[#0C0C0C] py-24 md:py-32 overflow-hidden border-t-2 border-[#F2613F]/10">
      
      {/* Title Subheader */}
      <div className="w-full text-center mb-16 relative z-20">
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-[0.2em] mb-2 drop-shadow-[0_0_10px_rgba(242,97,63,0.5)]">ARSENAL</h2>
        <p className="text-[#F2613F] font-mono tracking-[0.3em] text-[10px] md:text-xs opacity-80 uppercase">Tools & Technologies</p>
      </div>

      {/* Cinematic Edge Fading */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-10 pointer-events-none" />

      {/* CSS Native Marquee Animation */}
      <style>
        {`
          @keyframes infiniteScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% / 3)); }
          }
          .animate-infinite-scroll {
            animation: infiniteScroll 50s linear infinite;
            will-change: transform;
          }
          .animate-infinite-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      
      <div className="flex w-max h-62 items-center animate-infinite-scroll relative z-0">
        {repeatedCards.map((card, index) => (
          <Card key={index} title={card.title} img={card.img} />
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
