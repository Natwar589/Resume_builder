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

export const SidebarTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="text-gray-900 leading-normal flex flex-1 w-full bg-white">
      <style>{`
        .dark-sidebar .text-gray-900 { color: #f3f4f6 !important; }
        .dark-sidebar .text-gray-700 { color: #9ca3af !important; }
        .dark-sidebar .text-gray-600 { color: #9ca3af !important; }
      `}</style>

      {/* Left Sidebar - Dark Theme */}
      <div className="w-1/3 bg-gray-900 text-white dark-sidebar" style={{ padding: 'var(--page-padding, 1.5rem)' }}>
        <h1 className="text-3xl font-bold uppercase mb-2 tracking-wide text-white">{data.name}</h1>
        <p className="text-lg text-blue-300 mb-8 font-medium">{data.title}</p>
        
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-400 border-b border-gray-700 pb-1">Contact</h3>
          <ContactInfo 
            contact={data.contact} 
            className="flex flex-col gap-2 text-sm text-gray-300"
            itemClassName="hover:text-white transition-colors"
            separator={null}
          />
        </div>

        {data.skills && data.skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-400 border-b border-gray-700 pb-1">Skills</h3>
            <SkillsSection skills={data.skills} />
          </div>
        )}

        {data.languages && data.languages.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-400 border-b border-gray-700 pb-1">Languages</h3>
            <LanguagesSection languages={data.languages} />
          </div>
        )}
      </div>

      {/* Right Content Area */}
      <div className="w-2/3" style={{ padding: 'var(--page-padding, 1.5rem)' }}>
        {data.summary && (
          <Section title="Summary" titleClassName="text-gray-900 border-b-2 border-blue-600">
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </Section>
        )}

        {data.experience && data.experience.length > 0 && (
          <Section title="Experience" titleClassName="text-gray-900 border-b-2 border-blue-600">
            <ExperienceSection experience={data.experience} />
          </Section>
        )}

        {data.projects && data.projects.length > 0 && (
          <Section title="Projects" titleClassName="text-gray-900 border-b-2 border-blue-600">
            <ProjectsSection projects={data.projects} />
          </Section>
        )}

        {data.education && data.education.length > 0 && (
          <Section title="Education" titleClassName="text-gray-900 border-b-2 border-blue-600">
            <EducationSection education={data.education} />
          </Section>
        )}
        
        {data.certifications && data.certifications.length > 0 && (
          <Section title="Certifications" titleClassName="text-gray-900 border-b-2 border-blue-600">
            <CertificationsSection certifications={data.certifications} />
          </Section>
        )}
      </div>
    </div>
  );
};
