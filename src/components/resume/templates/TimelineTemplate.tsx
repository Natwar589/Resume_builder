import React from 'react';
import { ResumeData } from '@/lib/resumeTypes';
import { ContactInfo } from '../sections/ContactInfo';
import { ExperienceSection } from '../sections/ExperienceSection';
import { EducationSection } from '../sections/EducationSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { CertificationsSection } from '../sections/CertificationsSection';
import { LanguagesSection } from '../sections/LanguagesSection';

interface TemplateProps { data: ResumeData; }

const TSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="relative pl-6 mb-6 break-inside-avoid">
    {/* Vertical line */}
    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300" />
    {/* Dot */}
    <div className="absolute left-[-4px] top-1 w-[9px] h-[9px] rounded-full bg-gray-800 border-2 border-white ring-1 ring-gray-400" />
    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">{title}</h2>
    {children}
  </div>
);

export const TimelineTemplate: React.FC<TemplateProps> = ({ data }) => (
  <div className="text-gray-900 leading-normal flex-1 w-full bg-white" style={{ padding: 'var(--page-padding, 2.5rem)' }}>
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-1">{data.name}</h1>
      <p className="text-lg text-gray-500 font-medium mb-3">{data.title}</p>
      <ContactInfo contact={data.contact} className="flex flex-wrap gap-3 text-sm text-gray-600"
        separator={<span className="text-gray-300">·</span>} />
    </div>

    {data.summary && <TSection title="Summary"><p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p></TSection>}
    {data.experience && data.experience.length > 0 && <TSection title="Experience"><ExperienceSection experience={data.experience} /></TSection>}
    {data.projects && data.projects.length > 0 && <TSection title="Projects"><ProjectsSection projects={data.projects} /></TSection>}
    {data.education && data.education.length > 0 && <TSection title="Education"><EducationSection education={data.education} /></TSection>}
    {data.skills && data.skills.length > 0 && <TSection title="Skills"><SkillsSection skills={data.skills} /></TSection>}
    {data.certifications && data.certifications.length > 0 && <TSection title="Certifications"><CertificationsSection certifications={data.certifications} /></TSection>}
    {data.languages && data.languages.length > 0 && <TSection title="Languages"><LanguagesSection languages={data.languages} /></TSection>}
  </div>
);
