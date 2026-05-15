import React from 'react';
import { ResumeData } from '@/lib/resumeTypes';
import { Section } from '../sections/Section';
import { ContactInfo } from '../sections/ContactInfo';
import { ExperienceSection } from '../sections/ExperienceSection';
import { EducationSection } from '../sections/EducationSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { CertificationsSection } from '../sections/CertificationsSection';
import { LanguagesSection } from '../sections/LanguagesSection';

interface TemplateProps {
  data: ResumeData;
}

export const MinimalistTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="text-gray-800 leading-relaxed flex-1 w-full" style={{ padding: 'var(--page-padding, 2.5rem)' }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-1">{data.name}</h1>
          <p className="text-lg font-medium text-gray-500">{data.title}</p>
        </div>
        <div className="text-right text-sm text-gray-600">
          <ContactInfo 
            contact={data.contact} 
            className="flex flex-col gap-1 text-right"
            separator={null}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Summary */}
        {data.summary && (
          <Section title="Summary" titleClassName="!border-0 text-gray-400 text-sm font-bold tracking-widest mb-1 uppercase">
            <p className="text-sm">{data.summary}</p>
          </Section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <Section title="Experience" titleClassName="!border-0 text-gray-400 text-sm font-bold tracking-widest mb-2 uppercase">
            <ExperienceSection experience={data.experience} />
          </Section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <Section title="Projects" titleClassName="!border-0 text-gray-400 text-sm font-bold tracking-widest mb-2 uppercase">
            <ProjectsSection projects={data.projects} />
          </Section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <Section title="Education" titleClassName="!border-0 text-gray-400 text-sm font-bold tracking-widest mb-2 uppercase">
            <EducationSection education={data.education} />
          </Section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <Section title="Skills" titleClassName="!border-0 text-gray-400 text-sm font-bold tracking-widest mb-2 uppercase">
            <SkillsSection skills={data.skills} />
          </Section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <Section title="Certifications" titleClassName="!border-0 text-gray-400 text-sm font-bold tracking-widest mb-2 uppercase">
            <CertificationsSection certifications={data.certifications} />
          </Section>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <Section title="Languages" titleClassName="!border-0 text-gray-400 text-sm font-bold tracking-widest mb-2 uppercase">
            <LanguagesSection languages={data.languages} />
          </Section>
        )}
      </div>
    </div>
  );
};
