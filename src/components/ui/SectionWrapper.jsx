import React from 'react';

export default function SectionWrapper({ 
  children, 
  className = '', 
  id,
  dark = false,
  secondary = false,
  padding = 'both' // 'both', 'top', 'bottom', 'none'
}) {
  const getBgClass = () => {
    if (dark) return 'bg-[var(--color-bg-dark)] text-[var(--color-text-on-dark)]';
    if (secondary) return 'bg-[var(--color-bg-secondary)]';
    return 'bg-[var(--color-bg-primary)]';
  };

  const getPaddingClass = () => {
    if (padding === 'both') return 'section-padding';
    if (padding === 'top') return 'section-padding-top';
    if (padding === 'bottom') return 'section-padding-bottom';
    return '';
  };

  return (
    <section id={id} className={`w-full ${getBgClass()} ${getPaddingClass()} ${className}`.trim()}>
      <div className="container">
        {children}
      </div>
    </section>
  );
}
