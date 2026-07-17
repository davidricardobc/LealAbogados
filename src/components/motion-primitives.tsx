"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const subtleScaleVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.975 },
  visible: { opacity: 1, scale: 1 },
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -72px 0px" }}
      transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1], delay }}
      variants={revealVariants}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}

export function RevealFrame({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -72px 0px" }}
      transition={{ duration: 0.86, ease: [0.22, 1, 0.36, 1], delay }}
      variants={subtleScaleVariants}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className, delay = 0 }: StaggerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -72px 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.11,
          },
        },
      }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: StaggerProps) {
  return (
    <motion.div
      className={cn("motion-safe:will-change-transform", className)}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      variants={revealVariants}
    >
      {children}
    </motion.div>
  );
}
