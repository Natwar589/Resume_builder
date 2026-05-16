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

export const CompactTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="text-gray-900 text-xs leading-snug flex-1 w-full" style={{ padding: 'var(--page-padding, 2rem)' }}>
      {/* Header */}
      <div className="text-center mb-3">
        <h1 className="text-2xl font-bold uppercase mb-0.5">{data.name}</h1>
        <p className="text-sm font-medium mb-1">{data.title}</p>
        <ContactInfo contact={data.contact} className="flex flex-wrap justify-center gap-1.5 text-xs text-gray-700" />
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-3 break-inside-avoid">
          <p className="text-xs">{data.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 space-y-3">
          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <Section title="Experience" className="mb-3" titleClassName="text-sm mb-1 pb-0.5">
              <ExperienceSection experience={data.experience} />
            </Section>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <Section title="Projects" className="mb-3" titleClassName="text-sm mb-1 pb-0.5">
              <ProjectsSection projects={data.projects} />
            </Section>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <Section title="Skills" className="mb-3" titleClassName="text-sm mb-1 pb-0.5">
              <SkillsSection skills={data.skills} />
            </Section>
          )}

        </div>

        <div className="col-span-4 space-y-3">
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <Section title="Education" className="mb-3" titleClassName="text-sm mb-1 pb-0.5">
              <EducationSection education={data.education} />
            </Section>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <Section title="Certifications" className="mb-3" titleClassName="text-sm mb-1 pb-0.5">
              <CertificationsSection certifications={data.certifications} />
            </Section>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <Section title="Languages" className="mb-3" titleClassName="text-sm mb-1 pb-0.5">
              <LanguagesSection languages={data.languages} />
            </Section>
          )}
        </div>
      </div>
    </div>
  );
};
