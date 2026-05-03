import React, { useEffect } from "react";
import "./Loader.css";
import Preloader from "./Preloader";
import SplitOverlay from "./SplitOverlay";
import gsapAnimations from "./gsapAnimations";

const Container = () => {
    return (
        <div className="container">
            <div className="card">
                <h3>Welcome</h3>
            </div>
        </div>
    );
};

const Loader = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        gsapAnimations();

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <>
            <Preloader />
            <SplitOverlay />
            <Container />
        </>
    );
};

export default Loader;
