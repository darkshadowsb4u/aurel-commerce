"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { Compass, Sparkles } from "lucide-react";

export function Hero3DObject() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = mediaQuery.matches;

    // 1. Scene & Camera
    const isDarkMode = !document.documentElement.classList.contains("light");
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDarkMode ? 0x0e0e10 : 0xf4f2eb);

    const initialWidth = container.clientWidth || 540;
    const initialHeight = container.clientHeight || initialWidth;

    const camera = new THREE.PerspectiveCamera(
      38,
      initialWidth / initialHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.4, 4.4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setSize(initialWidth, initialHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL disabled or unavailable", e);
      setIsSupported(false);
      return;
    }

    // 2. High-End Obsidian Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x222226, 1.2);
    scene.add(ambientLight);

    // Strobe Key Light (Precision highlight)
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    // Metallic Rim Light (Accents machined chamfers)
    const rimLight = new THREE.DirectionalLight(0x80bfff, 3.2);
    rimLight.position.set(-6, 3, -4);
    scene.add(rimLight);

    // Brass Uplight (Reflects gold details)
    const bounceLight = new THREE.DirectionalLight(0xd4af37, 2.5);
    bounceLight.position.set(0, -4, 3);
    scene.add(bounceLight);

    // 3. Multi-Component Industrial Design Assembly
    const objectGroup = new THREE.Group();

    // Materials
    const obsidianMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a19,
      metalness: 0.88,
      roughness: 0.28,
    });

    const brushedBrassMat = new THREE.MeshStandardMaterial({
      color: 0xc49a60,
      metalness: 0.94,
      roughness: 0.22,
    });

    const darkAcousticMeshMat = new THREE.MeshStandardMaterial({
      color: 0x111110,
      metalness: 0.6,
      roughness: 0.55,
    });

    const polishedSteelMat = new THREE.MeshStandardMaterial({
      color: 0xd8d8d8,
      metalness: 0.98,
      roughness: 0.12,
    });

    // A. Main Unibody Aluminum Monolith
    const bodyGeom = new THREE.CylinderGeometry(0.86, 0.86, 1.9, 64);
    const body = new THREE.Mesh(bodyGeom, obsidianMetalMat);
    objectGroup.add(body);

    // B. Beveled Upper Crown Ring (Machined Chamfer)
    const crownGeom = new THREE.CylinderGeometry(0.88, 0.86, 0.08, 64);
    const crown = new THREE.Mesh(crownGeom, obsidianMetalMat);
    crown.position.y = 0.95;
    objectGroup.add(crown);

    // C. Turned Solid Brass Accent Collar
    const brassCollarGeom = new THREE.CylinderGeometry(0.865, 0.865, 0.04, 64);
    const brassCollar = new THREE.Mesh(brassCollarGeom, brushedBrassMat);
    brassCollar.position.y = 0.91;
    objectGroup.add(brassCollar);

    // D. Concentric Acoustic Speaker Grille on Top
    const topGrilleGeom = new THREE.CylinderGeometry(0.83, 0.83, 0.02, 64);
    const topGrille = new THREE.Mesh(topGrilleGeom, darkAcousticMeshMat);
    topGrille.position.y = 0.99;
    objectGroup.add(topGrille);

    // Concentric acoustic detail rings
    for (let r = 0.2; r <= 0.75; r += 0.14) {
      const ringGeom = new THREE.TorusGeometry(r, 0.009, 16, 64);
      const ring = new THREE.Mesh(ringGeom, polishedSteelMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 1.002;
      objectGroup.add(ring);
    }

    // E. Central Knurled Volume Wheel
    const dialGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.1, 48);
    const dial = new THREE.Mesh(dialGeom, brushedBrassMat);
    dial.position.y = 1.04;
    objectGroup.add(dial);

    // F. Heavy Spun Weighted Base
    const baseCollarGeom = new THREE.CylinderGeometry(0.86, 0.9, 0.08, 64);
    const baseCollar = new THREE.Mesh(baseCollarGeom, obsidianMetalMat);
    baseCollar.position.y = -0.96;
    objectGroup.add(baseCollar);

    const footingGeom = new THREE.CylinderGeometry(0.82, 0.82, 0.03, 48);
    const footing = new THREE.Mesh(footingGeom, darkAcousticMeshMat);
    footing.position.y = -1.01;
    objectGroup.add(footing);

    // G. Soft Contact Shadow Disc
    const shadowGeom = new THREE.CircleGeometry(1.25, 48);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x0a0a09,
      transparent: true,
      opacity: 0.18,
    });
    const shadowDisc = new THREE.Mesh(shadowGeom, shadowMat);
    shadowDisc.rotation.x = -Math.PI / 2;
    shadowDisc.position.y = -1.05;
    scene.add(shadowDisc);

    // Initial architectural angle
    objectGroup.rotation.x = 0.22;
    objectGroup.rotation.y = -0.45;
    scene.add(objectGroup);

    // 4. Fluid Tactile Drag Controls
    let isDragging = false;
    let previousX = 0;
    let previousY = 0;
    let targetRotY = -0.45;
    let targetRotX = 0.22;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteractive(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousX = clientX;
      previousY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - previousX;
      const deltaY = clientY - previousY;

      targetRotY += deltaX * 0.007;
      targetRotX = Math.max(-0.4, Math.min(0.65, targetRotX + deltaY * 0.006));

      previousX = clientX;
      previousY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    domElement.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // 5. Continuous Kinetic Render Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging && !prefersReducedMotion) {
        targetRotY += 0.002; // slow ambient rotation
      }

      // Smooth inertia damping
      objectGroup.rotation.y += (targetRotY - objectGroup.rotation.y) * 0.07;
      objectGroup.rotation.x += (targetRotX - objectGroup.rotation.x) * 0.07;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 540;
      const h = container.clientHeight || w;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      domElement.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      domElement.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);

      bodyGeom.dispose();
      crownGeom.dispose();
      brassCollarGeom.dispose();
      topGrilleGeom.dispose();
      dialGeom.dispose();
      baseCollarGeom.dispose();
      footingGeom.dispose();
      shadowGeom.dispose();
      obsidianMetalMat.dispose();
      brushedBrassMat.dispose();
      darkAcousticMeshMat.dispose();
      polishedSteelMat.dispose();
      shadowMat.dispose();
      renderer.dispose();
      if (domElement.parentElement) {
        domElement.parentElement.removeChild(domElement);
      }
    };
  }, []);

  if (!isSupported) {
    return (
      <div className="relative w-full h-full bg-surface-stone flex items-center justify-center overflow-hidden border border-border">
        <Image
          src="https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop"
          alt="Sonus A1 Precision Speaker"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-canvas/10" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full cursor-grab active:cursor-grabbing select-none">
      <div ref={containerRef} className="w-full h-full" />

      {/* Tactile interaction cue */}
      <div className="absolute bottom-4 right-4 z-10 bg-surface/90 backdrop-blur-xs border border-border px-3 py-1.5 flex items-center gap-2 pointer-events-none text-[10px] font-mono text-ink-secondary tracking-widest uppercase shadow-subtle">
        <Compass className="w-3.5 h-3.5 text-ink-muted" />
        <span>Drag to rotate</span>
      </div>
    </div>
  );
}
