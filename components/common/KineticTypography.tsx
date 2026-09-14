"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "motion/react";

interface KineticTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  staggerDuration?: number;
}

export function KineticText({
  text,
  className = "",
  as: Component = "h1",
  delay = 0,
  staggerDuration = 0.04,
}: KineticTextProps) {
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDuration,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 35, rotateX: -20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 120,
      },
    },
  };

  const MotionComponent = motion[Component] || motion.div;

  return (
    <MotionComponent
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`inline-flex flex-wrap gap-x-[0.25em] gap-y-[0.1em] ${className}`}
    >
      {words.map((word, idx) => (
        <motion.span key={idx} variants={wordVariants} className="inline-block transform-gpu origin-bottom">
          {word}
        </motion.span>
      ))}
    </MotionComponent>
  );
}

interface ParallaxScrollProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // negative for inverse direction
}

export function ParallaxScroll({ children, className = "", speed = 40 }: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full transform-gpu">
        {children}
      </motion.div>
    </div>
  );
}
