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

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="text-gray-800 leading-relaxed flex-1 w-full bg-white" style={{ padding: 'var(--page-padding, 2.5rem)' }}>
      {/* Header */}
      <div className="border-b-4 border-gray-900 pb-6 mb-6 text-center">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2 uppercase tracking-widest">{data.name}</h1>
        <p className="text-xl font-medium text-gray-600 uppercase tracking-widest mb-4">{data.title}</p>
        <ContactInfo 
          contact={data.contact} 
          className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-gray-700"
          separator={<span className="text-gray-400">♦</span>}
        />
      </div>

      <div className="space-y-6">
        {data.summary && (
          <Section title="Executive Summary" titleClassName="text-gray-900 border-b border-gray-300 font-serif font-bold">
            <p className="text-sm leading-relaxed text-justify">{data.summary}</p>
          </Section>
        )}

        {data.experience && data.experience.length > 0 && (
          <Section title="Professional Experience" titleClassName="text-gray-900 border-b border-gray-300 font-serif font-bold">
            <ExperienceSection experience={data.experience} />
          </Section>
        )}

        {data.projects && data.projects.length > 0 && (
          <Section title="Notable Projects" titleClassName="text-gray-900 border-b border-gray-300 font-serif font-bold">
            <ProjectsSection projects={data.projects} />
          </Section>
        )}

        <div className="grid grid-cols-2 gap-8">
          <div>
            {data.education && data.education.length > 0 && (
              <Section title="Education" titleClassName="text-gray-900 border-b border-gray-300 font-serif font-bold">
                <EducationSection education={data.education} />
              </Section>
            )}
            
            {data.certifications && data.certifications.length > 0 && (
              <Section title="Certifications" titleClassName="text-gray-900 border-b border-gray-300 font-serif font-bold">
                <CertificationsSection certifications={data.certifications} />
              </Section>
            )}
          </div>
          <div>
            {data.skills && data.skills.length > 0 && (
              <Section title="Areas of Expertise" titleClassName="text-gray-900 border-b border-gray-300 font-serif font-bold">
                <SkillsSection skills={data.skills} />
              </Section>
            )}

            {data.languages && data.languages.length > 0 && (
              <Section title="Languages" titleClassName="text-gray-900 border-b border-gray-300 font-serif font-bold">
                <LanguagesSection languages={data.languages} />
              </Section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
