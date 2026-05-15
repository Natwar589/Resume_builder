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

export const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="text-gray-900 leading-normal flex-1 w-full" style={{ padding: 'var(--page-padding, 2.5rem)' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase mb-1">{data.name}</h1>
        <p className="text-xl text-gray-700 mb-2">{data.title}</p>
        <ContactInfo contact={data.contact} />
      </div>

      {/* Summary */}
      {data.summary && (
        <Section title="Summary">
          <p className="text-sm text-gray-800">{data.summary}</p>
        </Section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <Section title="Experience">
          <ExperienceSection experience={data.experience} />
        </Section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <Section title="Projects">
          <ProjectsSection projects={data.projects} />
        </Section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <Section title="Education">
          <EducationSection education={data.education} />
        </Section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <Section title="Skills">
          <SkillsSection skills={data.skills} />
        </Section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <Section title="Certifications">
          <CertificationsSection certifications={data.certifications} />
        </Section>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <Section title="Languages">
          <LanguagesSection languages={data.languages} />
        </Section>
      )}
    </div>
  );
};
