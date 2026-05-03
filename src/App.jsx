import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./App.css";
import Leyer from "./Leyer.jsx";
import ScrollCursor from "./components/ScrollCursor/ScrollCursor";
import LoadingScreen from "./components/LoadingScreen";
import LoadingScreen1 from "./components/LoadingScreen1.jsx";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force scroll to top on page refresh
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis();
    
    const lenisRaf = (t) => {
      lenis.raf(t * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenisRaf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="custom-cursor">
      {loading && <LoadingScreen1 onComplete={() => setLoading(false)} />}
      {/* {loading && <LoadingScreen onComplete={() => setLoading(false)} />} */}
      <ScrollCursor />
      <Leyer />
    </div>
  );
}

export default App;
