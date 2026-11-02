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
    // Allow vertical touch scrolling through the canvas and remove inline baseline gap
    renderer.domElement.style.touchAction = "pan-y";
    renderer.domElement.style.display = "block";

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

      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // Mobile-specific layout:
        // 1. Dynamic font size tailored to phone screen width (~78-82% width)
        const mobileFontSize = Math.min(Math.max(window.innerWidth * 0.185, 68), 90);
        
        // 2. Weight 700 with 2 * DPR stroke for crisp, clean neon contours (eliminates the muddy/overly bold look)
        ctx.font = `700 ${Math.round(mobileFontSize * DPR)}px sans-serif`;
        ctx.textAlign = "center";
        if ('letterSpacing' in ctx) {
          ctx.letterSpacing = "0px";
        }
        ctx.strokeStyle = "rgba(242, 97, 63, 0.2)";
        ctx.lineWidth = 2 * DPR;

        // 3. True visual centering using exact glyph bounding box metrics
        const metrics = ctx.measureText("ABHINAND");
        if (metrics.actualBoundingBoxAscent !== undefined && metrics.actualBoundingBoxDescent !== undefined) {
          ctx.textBaseline = "alphabetic";
          const textY = height / 2 + (metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2;
          ctx.strokeText("ABHINAND", width / 2, textY);
        } else {
          ctx.textBaseline = "middle";
          ctx.strokeText("ABHINAND", width / 2, height / 2);
        }
      } else {
        // Desktop view: 100% original & untouched
        const fontSize = 150;
        ctx.font = `900 ${Math.round(fontSize * DPR)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if ('letterSpacing' in ctx) {
          ctx.letterSpacing = "-0.05em";
        }

        ctx.strokeStyle = "rgba(242, 97, 63, 0.15)";
        ctx.lineWidth = 5 * DPR;
        ctx.strokeText("ABHINAND", width / 2, height / 2);
      }
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

    // Unified function to update mouse position from an event
    const updateMouseFromEvent = (clientX, clientY) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = (clientX - rect.left) * DPR;
      const y = (clientY - rect.top) * DPR;

      const w = rect.width * DPR;
      const h = rect.height * DPR;

      mouse.x = x / w;
      mouse.y = 1.0 - y / h;
    };

    const handleMouseMove = (e) => {
      updateMouseFromEvent(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      mouse.set(-1, -1);
    };

    // Touch event handlers for mobile water effect
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateMouseFromEvent(touch.clientX, touch.clientY);
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateMouseFromEvent(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      mouse.set(-1, -1);
    };

    window.addEventListener("resize", handleResize);
    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mouseleave", handleMouseLeave);
    // Touch events - passive so they don't block scrolling
    renderer.domElement.addEventListener("touchstart", handleTouchStart, { passive: true });
    renderer.domElement.addEventListener("touchmove", handleTouchMove, { passive: true });
    renderer.domElement.addEventListener("touchend", handleTouchEnd, { passive: true });

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
      renderer.domElement.removeEventListener("touchstart", handleTouchStart);
      renderer.domElement.removeEventListener("touchmove", handleTouchMove);
      renderer.domElement.removeEventListener("touchend", handleTouchEnd);
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
