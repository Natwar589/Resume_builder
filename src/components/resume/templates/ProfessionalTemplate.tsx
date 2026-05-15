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

export const ProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="text-gray-900 leading-normal flex-1 w-full bg-white" style={{ padding: 'var(--page-padding, 2.5rem)' }}>
      {/* Header Block with background */}
      <div className="bg-gray-800 text-white p-6 -mx-10 -mt-10 mb-8" style={{ margin: 'calc(var(--page-padding, 2.5rem) * -1)', marginBottom: '2rem', padding: 'var(--page-padding, 2.5rem)' }}>
        <h1 className="text-4xl font-bold tracking-tight mb-2">{data.name}</h1>
        <p className="text-xl text-blue-200 font-medium mb-4">{data.title}</p>
        <ContactInfo 
          contact={data.contact} 
          className="flex flex-wrap gap-4 text-sm text-gray-300"
          itemClassName="hover:text-white transition-colors"
          separator={<span className="text-gray-500">|</span>}
        />
      </div>

      <div className="grid grid-cols-1 gap-5">
        {data.summary && (
          <Section title="Professional Summary" titleClassName="text-blue-900 border-blue-900 border-b-2">
            <p className="text-sm leading-relaxed">{data.summary}</p>
          </Section>
        )}

        {data.experience && data.experience.length > 0 && (
          <Section title="Professional Experience" titleClassName="text-blue-900 border-blue-900 border-b-2">
            <ExperienceSection experience={data.experience} />
          </Section>
        )}

        {data.projects && data.projects.length > 0 && (
          <Section title="Key Projects" titleClassName="text-blue-900 border-blue-900 border-b-2">
            <ProjectsSection projects={data.projects} />
          </Section>
        )}

        <div className="grid grid-cols-2 gap-6">
          <div>
            {data.education && data.education.length > 0 && (
              <Section title="Education" titleClassName="text-blue-900 border-blue-900 border-b-2">
                <EducationSection education={data.education} />
              </Section>
            )}
            
            {data.certifications && data.certifications.length > 0 && (
              <Section title="Certifications" titleClassName="text-blue-900 border-blue-900 border-b-2">
                <CertificationsSection certifications={data.certifications} />
              </Section>
            )}
          </div>
          <div>
            {data.skills && data.skills.length > 0 && (
              <Section title="Core Competencies" titleClassName="text-blue-900 border-blue-900 border-b-2">
                <SkillsSection skills={data.skills} />
              </Section>
            )}

            {data.languages && data.languages.length > 0 && (
              <Section title="Languages" titleClassName="text-blue-900 border-blue-900 border-b-2">
                <LanguagesSection languages={data.languages} />
              </Section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
