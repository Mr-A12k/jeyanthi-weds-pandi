import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollAnimation
 * Attach a GSAP scroll-triggered animation to a ref.
 *
 * @param {object} options
 *   type      – 'fade' | 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale'
 *   duration  – seconds (default 0.8)
 *   delay     – seconds (default 0)
 *   ease      – GSAP ease string (default 'power2.out')
 *   start     – ScrollTrigger start (default 'top 85%')
 *   stagger   – stagger value when selector is set (default 0)
 *   selector  – CSS selector for child targets (default null → animate el itself)
 */
export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      type = 'fade',
      duration = 0.8,
      delay = 0,
      ease = 'power2.out',
      start = 'top 85%',
      stagger = 0,
      selector = null,
    } = options;

    const targets = selector ? el.querySelectorAll(selector) : [el];
    if (!targets.length) return;

    let fromVars = { opacity: 0 };
    let toVars = { opacity: 1, duration, delay, ease };

    if (type === 'fadeUp')    { fromVars = { opacity: 0, y: 40 };  toVars = { ...toVars, y: 0 }; }
    if (type === 'fadeDown')  { fromVars = { opacity: 0, y: -40 }; toVars = { ...toVars, y: 0 }; }
    if (type === 'fadeLeft')  { fromVars = { opacity: 0, x: -50 }; toVars = { ...toVars, x: 0 }; }
    if (type === 'fadeRight') { fromVars = { opacity: 0, x: 50 };  toVars = { ...toVars, x: 0 }; }
    if (type === 'scale')     { fromVars = { opacity: 0, scale: 0.85 }; toVars = { ...toVars, scale: 1 }; }

    if (stagger > 0) toVars.stagger = stagger;

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, fromVars, {
        ...toVars,
        scrollTrigger: { trigger: el, start, once: true },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

/**
 * useParallax
 * Applies a vertical parallax offset to a ref element on scroll.
 *
 * @param {number} speed  – 0 = stationary, 0.3 = subtle, 0.6 = strong
 */
export const useParallax = (speed = 0.3) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
};

/**
 * useCountdown
 * Returns a live { days, hours, minutes, seconds } object updating every second.
 *
 * @param {string} targetDate  – ISO date string, e.g. "2026-12-14T08:00:00"
 */
export const useCountdown = (targetDate) => {
  const calcTime = (date) => {
    const diff = new Date(date) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(() => calcTime(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTime(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};
