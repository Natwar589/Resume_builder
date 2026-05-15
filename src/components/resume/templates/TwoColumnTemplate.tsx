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

export const TwoColumnTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="text-gray-900 leading-normal flex flex-1 w-full">
      {/* Left Column */}
      <div className="w-1/3 bg-gray-50 border-r border-gray-200" style={{ padding: 'var(--page-padding, 1.5rem)' }}>
        <h1 className="text-3xl font-bold uppercase mb-1 text-gray-900">{data.name}</h1>
        <p className="text-lg text-gray-600 mb-6 font-medium">{data.title}</p>
        
        <Section title="Contact" titleClassName="text-sm border-gray-300">
          <ContactInfo contact={data.contact} className="flex flex-col gap-2 text-sm text-gray-700" separator={null} />
        </Section>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <Section title="Skills" className="mt-6" titleClassName="text-sm border-gray-300">
            <SkillsSection skills={data.skills} />
          </Section>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <Section title="Languages" className="mt-6" titleClassName="text-sm border-gray-300">
            <LanguagesSection languages={data.languages} />
          </Section>
        )}
      </div>

      {/* Right Column */}
      <div className="w-2/3 bg-white" style={{ padding: 'var(--page-padding, 1.5rem)' }}>
        {/* Summary */}
        {data.summary && (
          <Section title="Summary" titleClassName="text-gray-800">
            <p className="text-sm">{data.summary}</p>
          </Section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <Section title="Experience" className="mt-6" titleClassName="text-gray-800">
            <ExperienceSection experience={data.experience} />
          </Section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <Section title="Projects" className="mt-6" titleClassName="text-gray-800">
            <ProjectsSection projects={data.projects} />
          </Section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <Section title="Education" className="mt-6" titleClassName="text-gray-800">
            <EducationSection education={data.education} />
          </Section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <Section title="Certifications" className="mt-6" titleClassName="text-gray-800">
            <CertificationsSection certifications={data.certifications} />
          </Section>
        )}
      </div>
    </div>
  );
};
