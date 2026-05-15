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

export const BoldTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="text-gray-900 leading-normal flex-1 w-full bg-white">
      {/* Heavy Header */}
      <div className="bg-gray-900 text-center text-white" style={{ padding: 'var(--page-padding, 2.5rem)' }}>
        <h1 className="text-5xl font-extrabold uppercase mb-3 tracking-wider">{data.name}</h1>
        <p className="text-2xl text-gray-300 mb-4 font-light tracking-widest uppercase">{data.title}</p>
        <ContactInfo 
          contact={data.contact} 
          className="flex flex-wrap justify-center gap-4 text-sm text-gray-400"
          itemClassName="hover:text-white transition-colors"
          separator={<span className="text-gray-600">/</span>}
        />
      </div>

      <div style={{ padding: 'var(--page-padding, 2.5rem)' }}>
        {data.summary && (
          <Section title="Profile" titleClassName="bg-gray-100 p-2 text-gray-900 border-l-4 border-gray-900 !border-b-0 uppercase tracking-widest">
            <p className="text-sm leading-relaxed mt-4">{data.summary}</p>
          </Section>
        )}

        {data.experience && data.experience.length > 0 && (
          <Section title="Experience" titleClassName="bg-gray-100 p-2 text-gray-900 border-l-4 border-gray-900 !border-b-0 uppercase tracking-widest mt-6">
            <div className="mt-4">
              <ExperienceSection experience={data.experience} />
            </div>
          </Section>
        )}

        {data.projects && data.projects.length > 0 && (
          <Section title="Projects" titleClassName="bg-gray-100 p-2 text-gray-900 border-l-4 border-gray-900 !border-b-0 uppercase tracking-widest mt-6">
            <div className="mt-4">
              <ProjectsSection projects={data.projects} />
            </div>
          </Section>
        )}

        {data.education && data.education.length > 0 && (
          <Section title="Education" titleClassName="bg-gray-100 p-2 text-gray-900 border-l-4 border-gray-900 !border-b-0 uppercase tracking-widest mt-6">
            <div className="mt-4">
              <EducationSection education={data.education} />
            </div>
          </Section>
        )}
        
        {data.skills && data.skills.length > 0 && (
          <Section title="Skills" titleClassName="bg-gray-100 p-2 text-gray-900 border-l-4 border-gray-900 !border-b-0 uppercase tracking-widest mt-6">
            <div className="mt-4">
              <SkillsSection skills={data.skills} />
            </div>
          </Section>
        )}

        <div className="grid grid-cols-2 gap-8 mt-6">
          {data.certifications && data.certifications.length > 0 && (
            <Section title="Certifications" titleClassName="bg-gray-100 p-2 text-gray-900 border-l-4 border-gray-900 !border-b-0 uppercase tracking-widest">
              <div className="mt-4">
                <CertificationsSection certifications={data.certifications} />
              </div>
            </Section>
          )}

          {data.languages && data.languages.length > 0 && (
            <Section title="Languages" titleClassName="bg-gray-100 p-2 text-gray-900 border-l-4 border-gray-900 !border-b-0 uppercase tracking-widest">
              <div className="mt-4">
                <LanguagesSection languages={data.languages} />
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
};
