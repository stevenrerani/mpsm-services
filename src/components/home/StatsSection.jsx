import React from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import Counter from '../ui/Counter';
import { stats } from '../../data/advantages';

export default function StatsSection() {
  return (
    <SectionWrapper dark>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="font-serif text-5xl md:text-6xl text-[var(--color-text-on-dark)] mb-4 flex items-center">
              {stat.prefix && <span>{stat.prefix}</span>}
              <Counter end={parseInt(stat.value, 10)} />
              {stat.suffix && <span>{stat.suffix}</span>}
            </div>
            <div className="font-sans font-medium text-sm tracking-widest uppercase text-[var(--color-bg-secondary)]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
