import React from 'react';
import { ResumeEducation } from '@/lib/resumeTypes';

interface EducationSectionProps {
  education: ResumeEducation[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  if (!education || education.length === 0) return null;

  return (
    <div className="space-y-3">
      {education.map((edu, index) => (
        <div key={index} className="break-inside-avoid">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
            <span className="text-sm text-gray-600 whitespace-nowrap">{edu.year}</span>
          </div>
          <div className="text-gray-700">{edu.institution}</div>
          {edu.gpa && <div className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</div>}
        </div>
      ))}
    </div>
  );
};
