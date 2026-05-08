import React, { Suspense, lazy } from 'react';
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Scrolle from "./components/Scrolle";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Project from "./pages/Project/Project";
import CardContainer from "./components/CardContainer.jsx";
import Experience from './pages/Experience.jsx';

const WaterPage = lazy(() => import("./pages/Home/WaterPage"));

const Leyer = () => {
  return (
    <div>
      <NavigationBar />
      <Suspense>
        <WaterPage />
      </Suspense>
      <About />
      {/* <Home /> */}
      <Experience />
      <Project />
      <CardContainer />
      <Contact />
    </div>
  )
}

export default Leyer;
