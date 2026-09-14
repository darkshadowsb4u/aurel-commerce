"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface AcousticWaveformCanvasProps {
  className?: string;
  opacity?: number;
}

export function AcousticWaveformCanvas({ className = "", opacity = 0.4 }: AcousticWaveformCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 15, 35);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Interactive Waveform Particle Field Grid
    const ROWS = 45;
    const COLS = 65;
    const count = ROWS * COLS;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    let i = 0;
    for (let ix = 0; ix < COLS; ix++) {
      for (let iy = 0; iy < ROWS; iy++) {
        positions[i] = (ix - COLS / 2) * 1.1; // x
        positions[i + 1] = 0; // y
        positions[i + 2] = (iy - ROWS / 2) * 1.1; // z
        scales[ix * ROWS + iy] = 1;
        i += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const isDarkMode = !document.documentElement.classList.contains("light");
    const particleColor = isDarkMode ? 0xd4af37 : 0x8c877d;

    const material = new THREE.PointsMaterial({
      color: particleColor,
      size: 0.18,
      transparent: true,
      opacity: opacity,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener("mousemove", handlePointerMove);

    // Animation Loop
    let animationFrameId: number;
    let countTime = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      countTime += 0.04;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const pos = geometry.attributes.position.array as Float32Array;

      let idx = 0;
      for (let ix = 0; ix < COLS; ix++) {
        for (let iy = 0; iy < ROWS; iy++) {
          // Double sine wave acoustic displacement calculation
          const waveX = Math.sin((ix + countTime) * 0.3) * 1.2;
          const waveY = Math.cos((iy + countTime) * 0.5) * 1.2;
          const interactiveFactor = Math.sin(ix * 0.1 + mouseX * 3) * Math.cos(iy * 0.1 + mouseY * 3) * 2.2;

          pos[idx + 1] = waveX + waveY + interactiveFactor;
          idx += 3;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = countTime * 0.02 + mouseX * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [opacity]);

  return <div ref={containerRef} className={`relative w-full h-full pointer-events-none overflow-hidden ${className}`} />;
}
