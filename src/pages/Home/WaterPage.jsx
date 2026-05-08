import { useEffect, useRef } from "react";
import * as THREE from "three";

import {
  simulationVertexShader,
  simulationFragmentShader,
  renderVertexShader,
  renderFragmentShader,
} from "./shaders";

const WaterPage = () => {
  const containerRef = useRef();

  useEffect(() => {
    const DPR = Math.min(window.devicePixelRatio, 2);
    const mouse = new THREE.Vector2(-1, -1);
    let frame = 0;
    let animationId = null;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(DPR);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const simScene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const getSize = () => ({
      width: window.innerWidth * DPR,
      height: window.innerHeight * DPR,
    });

    let { width, height } = getSize();

    const renderTargetOptions = {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
      depthBuffer: false,
    };

    let rtA = new THREE.WebGLRenderTarget(width, height, renderTargetOptions);
    let rtB = new THREE.WebGLRenderTarget(width, height, renderTargetOptions);

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        mouse: { value: mouse },
        resolution: { value: new THREE.Vector2(width, height) },
        time: { value: 0 },
        frame: { value: 0 },
      },
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });

    const renderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        textureB: { value: null },
      },
      vertexShader: renderVertexShader,
      fragmentShader: renderFragmentShader,
      transparent: true,
    });

    const plane = new THREE.PlaneGeometry(2, 2);
    const simQuad = new THREE.Mesh(plane, simMaterial);
    const renderQuad = new THREE.Mesh(plane, renderMaterial);
    simScene.add(simQuad);
    scene.add(renderQuad);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: true });

    const drawTextTexture = () => {
      const { width, height } = getSize();
      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = "#0C0C0C";
      ctx.fillRect(0, 0, width, height);

      // Determine responsive size similar to md:text-[250px] text-[100px]
      const isMobile = window.innerWidth < 768;
      const fontSize = isMobile ? 60 : 150; // Reduced size

      ctx.font = `900 ${Math.round(fontSize * DPR)}px sans-serif`; // max font weight (900)
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // tracking-tighter equivalent, if supported
      if ('letterSpacing' in ctx) {
        ctx.letterSpacing = "-0.05em";
      }

      // No fill, faint neon red outline
      ctx.strokeStyle = "rgba(242, 97, 63, 0.15)"; // '#F2613F' with slightly boosted opacity for the bold effect
      ctx.lineWidth = 5 * DPR; // Increased stroke width for a bolder appearance
      ctx.strokeText("ABHINAND", width / 2, height / 2);
    };

    drawTextTexture();
    const textTexture = new THREE.CanvasTexture(canvas);
    textTexture.minFilter = THREE.LinearFilter;
    textTexture.magFilter = THREE.LinearFilter;

    const handleResize = () => {
      const { width: newWidth, height: newHeight } = getSize();

      renderer.setSize(window.innerWidth, window.innerHeight);
      rtA.setSize(newWidth, newHeight);
      rtB.setSize(newWidth, newHeight);
      simMaterial.uniforms.resolution.value.set(newWidth, newHeight);

      drawTextTexture();
      textTexture.needsUpdate = true;
    };

    const handleMouseMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = (e.clientX - rect.left) * DPR;
      const y = (e.clientY - rect.top) * DPR;

      const width = rect.width * DPR;
      const height = rect.height * DPR;

      mouse.x = x / width;
      mouse.y = 1.0 - y / height;
    };

    const handleMouseLeave = () => {
      mouse.set(-1, -1);
    };

    window.addEventListener("resize", handleResize);
    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      simMaterial.uniforms.frame.value = frame++;
      simMaterial.uniforms.time.value = performance.now() / 1000;
      simMaterial.uniforms.textureA.value = rtA.texture;

      renderer.setRenderTarget(rtB);
      renderer.render(simScene, camera);

      renderMaterial.uniforms.textureA.value = rtB.texture;
      renderMaterial.uniforms.textureB.value = textTexture;
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      [rtA, rtB] = [rtB, rtA];

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mouseleave", handleMouseLeave);
      renderer.dispose();
      rtA.dispose();
      rtB.dispose();
      simMaterial.dispose();
      renderMaterial.dispose();
      plane.dispose();
      textTexture.dispose();
    };
  }, []);

  return <div ref={containerRef} className="three-container" />;
};

export default WaterPage;
