import React from 'react';
import { ResumeLanguage } from '@/lib/resumeTypes';

interface LanguagesSectionProps {
  languages: ResumeLanguage[];
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({ languages }) => {
  if (!languages || languages.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-4 text-sm">
      {languages.map((lang, index) => (
        <div key={index} className="break-inside-avoid">
          <span className="font-semibold text-gray-900">{lang.language}</span>
          <span className="text-gray-600 ml-1">({lang.level})</span>
        </div>
      ))}
    </div>
  );
};
