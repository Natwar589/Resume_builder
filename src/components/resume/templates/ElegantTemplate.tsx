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

const ESection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-6 break-inside-avoid">
    <div className="flex items-center gap-3 mb-3">
      <div className="flex-1 h-px bg-gray-300" />
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 px-2">{title}</h2>
      <div className="flex-1 h-px bg-gray-300" />
    </div>
    {children}
  </section>
);

export const ElegantTemplate: React.FC<TemplateProps> = ({ data }) => (
  <div className="text-gray-800 leading-relaxed flex-1 w-full bg-white" style={{ padding: 'var(--page-padding, 2.5rem)' }}>
    {/* Centered Header */}
    <div className="text-center mb-8 pb-6 border-b border-gray-200">
      <h1 className="text-4xl font-bold tracking-widest uppercase mb-2 text-gray-900">{data.name}</h1>
      <p className="text-base text-gray-500 tracking-widest uppercase mb-4 font-light">{data.title}</p>
      <ContactInfo contact={data.contact} className="flex flex-wrap justify-center gap-4 text-sm text-gray-500"
        separator={<span className="text-gray-300">|</span>} />
    </div>

    {data.summary && <ESection title="Profile"><p className="text-sm text-center text-gray-700 leading-relaxed italic">{data.summary}</p></ESection>}
    {data.experience && data.experience.length > 0 && <ESection title="Experience"><ExperienceSection experience={data.experience} /></ESection>}
    {data.projects && data.projects.length > 0 && <ESection title="Projects"><ProjectsSection projects={data.projects} /></ESection>}
    {data.education && data.education.length > 0 && <ESection title="Education"><EducationSection education={data.education} /></ESection>}
    {data.skills && data.skills.length > 0 && <ESection title="Skills"><SkillsSection skills={data.skills} /></ESection>}
    {data.certifications && data.certifications.length > 0 && <ESection title="Certifications"><CertificationsSection certifications={data.certifications} /></ESection>}
    {data.languages && data.languages.length > 0 && <ESection title="Languages"><LanguagesSection languages={data.languages} /></ESection>}
  </div>
);
