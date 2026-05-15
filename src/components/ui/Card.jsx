import React from 'react';

export default function Card({ children, className = '', dark = false, ...props }) {
  return (
    <div className={`card ${dark ? 'card-dark' : ''} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
