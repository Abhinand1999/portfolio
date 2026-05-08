
import Scrolle from '../components/Scrolle'
import AboutContent from '../pageContent/AboutContent'

const About = () => {
  return (
    <div id="about" className="relative overflow-hidden bg-[#0C0C0C]">
      {/* Background Aesthetic Elements */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#F2613F] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-[#F2613F] opacity-[0.02] blur-[180px] rounded-full pointer-events-none" />

      {/* Main Hero Section */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none overflow-hidden">
           <h1 className="text-[60px] sm:text-[120px] md:text-[250px] font-black leading-none opacity-10 tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px #F2613F' }}>
            BEYOND
          </h1>
        </div>
        
        <h1 className="relative z-10 text-[30px] sm:text-[80px] md:text-[180px] font-bold tracking-widest drop-shadow-[0_0_20px_rgba(242,97,63,0.3)] leading-none text-white">
          ABOUT
        </h1>
        <p className="relative z-10 text-[#F2613F] font-mono tracking-[0.5em] text-xs md:text-sm uppercase mt-4 opacity-80">
          The architect behind the machine
        </p>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <Scrolle />
        </div>
      </div>

      {/* Detailed Content Segment */}
      <div className="relative z-20 border-t border-[#F2613F]/10">
        <AboutContent />
      </div>
    </div>
  );
};

export default About