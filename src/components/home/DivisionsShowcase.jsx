import React from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import SectionLabel from '../layout/SectionLabel';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { divisions } from '../../data/divisions';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function DivisionsShowcase() {
  const gridRef = useScrollAnimation('stagger-cards');

  return (
    <SectionWrapper id="divisions" secondary>
      <div className="flex flex-col items-start mb-16">
        <SectionLabel>OUR SERVICES</SectionLabel>
        <h2>Four Pillars of Enterprise Solutions</h2>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {divisions.map((division) => (
          <Card key={division.id} className="flex flex-col h-full group">
            <span className="font-sans font-medium text-sm tracking-widest text-[var(--color-text-muted)] mb-4">
              {division.number}
            </span>
            
            <h3 className="mb-4 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
              {division.title}
            </h3>
            
            <p className="text-[var(--color-text-secondary)] mb-8 flex-grow">
              {division.overview}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-10">
              {division.capabilities.map((cap) => (
                <span 
                  key={cap}
                  className="px-3 py-1 rounded-full bg-[rgba(74,103,65,0.08)] text-[var(--color-olive)] text-xs font-medium uppercase tracking-wide"
                >
                  {cap}
                </span>
              ))}
            </div>
            
            <div className="mt-auto pt-6 border-t border-[var(--color-border-light)] flex flex-col items-start gap-3">
              <Button variant="ghost" to={division.href}>
                Explore →
              </Button>
              {division.externalLink && (
                <a 
                  href={`https://${division.externalLink}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  Visit {division.externalLink} →
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
