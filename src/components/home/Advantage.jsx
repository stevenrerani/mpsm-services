import React from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import SectionLabel from '../layout/SectionLabel';
import { advantages } from '../../data/advantages';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function Advantage() {
  const gridRef = useScrollAnimation('stagger-cards');

  return (
    <SectionWrapper>
      <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
        <SectionLabel>WHY MPSM</SectionLabel>
        <h2>The MPSM Advantage</h2>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 mt-12">
        {advantages.map((item) => (
          <div key={item.id} className="flex flex-col items-start">
            <div className="mb-6 text-[var(--color-olive)]">
              <item.icon strokeWidth={1.5} size={32} />
            </div>
            <h3 className="mb-4">{item.title}</h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
