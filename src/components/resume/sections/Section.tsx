import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, className = "", titleClassName = "" }) => {
  return (
    <section className={`mb-4 break-inside-avoid ${className}`}>
      <h2 className={`text-lg font-bold uppercase tracking-wider mb-2 border-b-2 border-gray-800 pb-1 ${titleClassName}`}>
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
};
