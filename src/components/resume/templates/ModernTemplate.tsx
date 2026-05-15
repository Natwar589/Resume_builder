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

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="text-gray-800 leading-relaxed flex-1 w-full" style={{ padding: 'var(--page-padding, 2.5rem)' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">{data.name}</h1>
        <p className="text-xl text-blue-600 font-medium mb-3">{data.title}</p>
        <ContactInfo contact={data.contact} className="flex flex-wrap gap-3 text-sm text-gray-600" separator={null} />
      </div>

      {/* Summary */}
      {data.summary && (
        <Section title="Summary" titleClassName="text-blue-600 border-blue-600 border-b">
          <p className="text-sm">{data.summary}</p>
        </Section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <Section title="Experience" titleClassName="text-blue-600 border-blue-600 border-b">
          <ExperienceSection experience={data.experience} />
        </Section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <Section title="Projects" titleClassName="text-blue-600 border-blue-600 border-b">
          <ProjectsSection projects={data.projects} />
        </Section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <Section title="Education" titleClassName="text-blue-600 border-blue-600 border-b">
          <EducationSection education={data.education} />
        </Section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <Section title="Skills" titleClassName="text-blue-600 border-blue-600 border-b">
          <SkillsSection skills={data.skills} />
        </Section>
      )}

      <div className="grid grid-cols-2 gap-4">
        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <Section title="Certifications" titleClassName="text-blue-600 border-blue-600 border-b">
            <CertificationsSection certifications={data.certifications} />
          </Section>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <Section title="Languages" titleClassName="text-blue-600 border-blue-600 border-b">
            <LanguagesSection languages={data.languages} />
          </Section>
        )}
      </div>
    </div>
  );
};
