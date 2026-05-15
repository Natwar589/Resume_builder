import React from 'react';
import { ResumeExperience } from '@/lib/resumeTypes';

interface ExperienceSectionProps {
  experience: ResumeExperience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <div className="space-y-4">
      {experience.map((exp, index) => (
        <div key={index} className="break-inside-avoid">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-semibold text-gray-900">{exp.role}</h3>
            <span className="text-sm text-gray-600 whitespace-nowrap">{exp.period}</span>
          </div>
          <div className="text-gray-700 italic mb-2">{exp.company}</div>
          <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-800">
            {exp.bullets.map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
