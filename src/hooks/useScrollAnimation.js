import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(type = 'fade-up', options = {}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion || !ref.current) return;

    const ctx = gsap.context(() => {
      const el = ref.current;

      switch (type) {
        case 'fade-up':
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              ...options.scrollTrigger
            },
            ...options
          });
          break;
          
        case 'stagger-cards':
          gsap.from(el.children, {
            y: 40,
            opacity: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              ...options.scrollTrigger
            },
            ...options
          });
          break;

        case 'parallax':
          gsap.to(el, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              scrub: 1,
              ...options.scrollTrigger
            },
            ...options
          });
          break;

        case 'draw-in':
          gsap.from(el, {
            x: -20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              ...options.scrollTrigger
            },
            ...options
          });
          break;

        default:
          break;
      }
    }, ref);

    return () => ctx.revert();
  }, [type, options, prefersReducedMotion]);

  return ref;
}
