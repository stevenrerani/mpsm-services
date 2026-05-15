import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SectionWrapper from '../ui/SectionWrapper';
import SectionLabel from '../layout/SectionLabel';
import ImagePlaceholder from '../ui/ImagePlaceholder';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function DivisionHero({ data }) {
  const headlineRef = useRef(null);
  const textRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !headlineRef.current) return;

    const words = headlineRef.current.querySelectorAll('.word');
    
    gsap.from(words, {
      y: 40,
      opacity: 0,
      stagger: 0.05,
      duration: 0.7,
      ease: "power2.out",
      delay: 0.2
    });

    gsap.from(textRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.5
    });
  }, [prefersReducedMotion]);

  const wrapWords = (text) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="inline-block overflow-hidden pb-2 -mb-2">
        <span className="word inline-block">{word}&nbsp;</span>
      </span>
    ));
  };

  return (
    <SectionWrapper dark className="py-20 md:py-32">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        <div className="w-full lg:w-[60%] flex flex-col items-start">
          <SectionLabel>{data.title}</SectionLabel>
          
          <h1 ref={headlineRef} className="text-[var(--color-text-on-dark)] mb-8 max-w-3xl">
            {wrapWords(data.headline)}
          </h1>
          
          <p ref={textRef} className="text-[var(--color-bg-secondary)] text-lg max-w-xl">
            {data.overview}
          </p>
        </div>

        <div className="w-full lg:w-[40%] h-[400px] lg:h-[500px]">
          <ImagePlaceholder shape={3} />
        </div>
        
      </div>
    </SectionWrapper>
  );
}
