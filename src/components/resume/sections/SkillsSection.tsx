import React from 'react';
import { ResumeSkillCategory } from '@/lib/resumeTypes';

interface SkillsSectionProps {
  skills: ResumeSkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="space-y-2">
      {skills.map((skillGroup, index) => (
        <div key={index} className="break-inside-avoid text-sm">
          <span className="font-semibold text-gray-900 mr-2">{skillGroup.category}:</span>
          <span className="text-gray-700">{skillGroup.items.join(', ')}</span>
        </div>
      ))}
    </div>
  );
};
