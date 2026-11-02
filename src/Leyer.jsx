import React, { Suspense, lazy, useState, useEffect } from 'react';
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Scrolle from "./components/Scrolle";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Project from "./pages/Project/Project";
import CardContainer from "./components/CardContainer.jsx";
import Experience from './pages/Experience.jsx';
import MobileHome from './pages/Home/MobileHome';

const WaterPage = lazy(() => import("./pages/Home/WaterPage"));

const Leyer = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-[#0C0C0C] min-h-screen">
      <NavigationBar />
      {isMobile ? (
        <MobileHome />
      ) : (
        <Suspense fallback={<div className="w-full h-screen bg-[#0C0C0C]" />}>
          <WaterPage />
        </Suspense>
      )}
      <About />
      {/* <Home /> */}
      <Experience />
      <Project />
      <CardContainer />
      <Contact />
    </div>
  );
};

export default Leyer;
