import React from 'react';
import { ResumeData } from '@/lib/resumeTypes';
import { Section } from '../sections/Section';
import { ContactInfo } from '../sections/ContactInfo';
import { ExperienceSection } from '../sections/ExperienceSection';
import { EducationSection } from '../sections/EducationSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { CertificationsSection } from '../sections/CertificationsSection';
import { LanguagesSection } from '../sections/LanguagesSection';
import { ResumeSkillCategory } from '@/lib/resumeTypes';

interface TemplateProps { data: ResumeData; }

const SkillBadges: React.FC<{ skills: ResumeSkillCategory[] }> = ({ skills }) => (
  <div className="space-y-3">
    {skills.map((group, i) => (
      <div key={i}>
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{group.category}</div>
        <div className="flex flex-wrap gap-1.5">
          {group.items.map((item, j) => (
            <span key={j} className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-800 text-xs font-medium border border-gray-200">
              {item}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const TechTemplate: React.FC<TemplateProps> = ({ data }) => (
  <div className="text-gray-900 leading-normal flex-1 w-full bg-white">
    {/* Header strip */}
    <div className="bg-gray-950 text-white" style={{ padding: 'var(--page-padding, 2.5rem)', paddingBottom: '1.5rem' }}>
      <div className="flex justify-between items-start gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold font-mono mb-1 text-white">{data.name}</h1>
          <p className="text-base text-emerald-400 font-mono">&gt; {data.title}</p>
        </div>
        <ContactInfo contact={data.contact} className="flex flex-col gap-1 text-sm text-gray-400 font-mono text-right"
          separator={null} />
      </div>
    </div>

    <div style={{ padding: 'var(--page-padding, 2.5rem)', paddingTop: '1.5rem' }}>
      {/* Skills first — prominent for tech roles */}
      {data.skills && data.skills.length > 0 && (
        <Section title="Tech Stack" titleClassName="text-gray-900 border-b-2 border-gray-900 font-mono">
          <SkillBadges skills={data.skills} />
        </Section>
      )}

      {data.summary && (
        <Section title="About" titleClassName="text-gray-900 border-b-2 border-gray-900 font-mono">
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </Section>
      )}

      {data.experience && data.experience.length > 0 && (
        <Section title="Experience" titleClassName="text-gray-900 border-b-2 border-gray-900 font-mono">
          <ExperienceSection experience={data.experience} />
        </Section>
      )}

      {data.projects && data.projects.length > 0 && (
        <Section title="Projects" titleClassName="text-gray-900 border-b-2 border-gray-900 font-mono">
          <ProjectsSection projects={data.projects} />
        </Section>
      )}

      {data.education && data.education.length > 0 && (
        <Section title="Education" titleClassName="text-gray-900 border-b-2 border-gray-900 font-mono">
          <EducationSection education={data.education} />
        </Section>
      )}

      <div className="grid grid-cols-2 gap-6">
        {data.certifications && data.certifications.length > 0 && (
          <Section title="Certifications" titleClassName="text-gray-900 border-b-2 border-gray-900 font-mono">
            <CertificationsSection certifications={data.certifications} />
          </Section>
        )}
        {data.languages && data.languages.length > 0 && (
          <Section title="Languages" titleClassName="text-gray-900 border-b-2 border-gray-900 font-mono">
            <LanguagesSection languages={data.languages} />
          </Section>
        )}
      </div>
    </div>
  </div>
);
