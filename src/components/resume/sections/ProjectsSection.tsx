import React from 'react';
import { ResumeProject } from '@/lib/resumeTypes';

interface ProjectsSectionProps {
  projects: ResumeProject[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="space-y-3">
      {projects.map((project, index) => (
        <div key={index} className="break-inside-avoid">
          <div className="flex items-baseline mb-1">
            <h3 className="font-semibold text-gray-900 mr-2">{project.name}</h3>
            {project.stack && <span className="text-sm text-gray-600 italic">| {project.stack}</span>}
          </div>
          <p className="text-sm text-gray-800">{project.description}</p>
        </div>
      ))}
    </div>
  );
};
