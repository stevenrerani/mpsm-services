import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Counter({ end, duration = 1.5, className = '' }) {
  const counterRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion || !counterRef.current) {
      if (counterRef.current) counterRef.current.innerText = end;
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(counterRef.current, {
        innerText: 0,
        duration: duration,
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: counterRef.current,
          start: 'top 85%',
        }
      });
    }, counterRef);

    return () => ctx.revert();
  }, [end, duration, prefersReducedMotion]);

  return <span ref={counterRef} className={className}>{end}</span>;
}
