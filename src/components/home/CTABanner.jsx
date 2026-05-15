import React from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import Button from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function CTABanner() {
  const contentRef = useScrollAnimation('fade-up');

  return (
    <SectionWrapper className="bg-[var(--color-accent)] !py-24 md:!py-32">
      <div 
        ref={contentRef} 
        className="flex flex-col items-center text-center max-w-3xl mx-auto"
      >
        <h2 className="text-[var(--color-bg-primary)] mb-6 text-4xl md:text-5xl lg:text-6xl">
          Ready to Partner With Us?
        </h2>
        
        <p className="text-[var(--color-bg-secondary)] text-lg md:text-xl mb-10 max-w-xl opacity-90">
          Let's discuss how our end-to-end solutions can drive sustainable growth for your enterprise.
        </p>
        
        <Button 
          variant="primary" 
          to="/contact" 
          className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] text-lg"
        >
          Get in Touch →
        </Button>
      </div>
    </SectionWrapper>
  );
}
