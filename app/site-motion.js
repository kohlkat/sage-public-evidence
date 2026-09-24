"use client";

import { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import anime from "animejs/lib/anime.es.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "motion/react";

anime.suspendWhenDocumentHidden = false;

export function Reveal({ className, children }) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reduced !== false) {
    return (
      <article className={className} style={{ height: "100%" }}>
        {children}
      </article>
    );
  }

  return (
    <motion.article
      className={className}
      style={{ height: "100%" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.article>
  );
}

export function WorkflowSteps({ steps }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray(".workflow-step").forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          duration: 0.65,
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
          },
        });
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <div className="problem-copy" ref={rootRef}>
      {steps.map((step) => (
        <div className="workflow-step" key={step.number}>
          <span>{step.number}</span>
          <div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CountUp({ value, decimals = 0, suffix = "" }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return undefined;
    }

    const state = { value: 0 };
    setDisplay(0);
    const animation = anime({
      targets: state,
      value,
      easing: "easeOutCubic",
      duration: 1200,
      update: () => setDisplay(state.value),
    });

    return () => animation.pause();
  }, [value]);

  const text =
    decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString("en-US");

  return (
    <>
      {text}
      {suffix}
    </>
  );
}

export function MatrixCell({ className, programs, strength }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const { scale } = useSpring({
    scale: !reduced && active ? 1.045 : 1,
    immediate: Boolean(reduced),
  });

  return (
    <animated.span
      className={className}
      style={{
        transform: scale.to((next) => `scale(${next})`),
        "--cell-strength": strength,
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {programs}
    </animated.span>
  );
}
