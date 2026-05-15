'use client';

import React from 'react';
import { ResumeData, ResumeExperience, ResumeEducation, ResumeSkillCategory, ResumeProject, ResumeCertification, ResumeLanguage } from '@/lib/resumeTypes';
import { Plus, Trash2 } from 'lucide-react';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

/* ─── Small helpers ─────────────────────────────── */
const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-app-text-muted uppercase tracking-wider">{label}</label>
    {children}
  </div>
);

const inputCls = "w-full rounded-md border border-app-border bg-app-bg text-app-text text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-app-primary/50 focus:border-app-primary transition-colors placeholder:text-app-text-muted/50";
const sectionHeadCls = "text-xs font-bold uppercase tracking-widest text-app-text-muted mb-3 flex items-center gap-2";

const AddBtn: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button type="button" onClick={onClick}
    className="flex items-center gap-1.5 text-xs font-semibold text-app-primary hover:text-app-primary-hover transition-colors mt-2">
    <Plus size={13} /> {label}
  </button>
);

const DeleteBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button type="button" onClick={onClick}
    className="text-gray-400 hover:text-red-500 transition-colors shrink-0">
    <Trash2 size={14} />
  </button>
);

const CardWrap: React.FC<{ children: React.ReactNode; onDelete: () => void }> = ({ children, onDelete }) => (
  <div className="relative border border-app-border rounded-lg p-3 bg-app-bg/50 space-y-2.5 group">
    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
      <DeleteBtn onClick={onDelete} />
    </div>
    {children}
  </div>
);

/* ─── Main Form ─────────────────────────────────── */
export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange }) => {
  const set = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) =>
    onChange({ ...data, [key]: value });

  const setContact = (key: keyof ResumeData['contact'], value: string) =>
    onChange({ ...data, contact: { ...data.contact, [key]: value || null } });

  /* Experience */
  const addExp = () => set('experience', [...(data.experience ?? []), { role: '', company: '', period: '', bullets: [''] }]);
  const updateExp = (i: number, patch: Partial<ResumeExperience>) => {
    const arr = [...(data.experience ?? [])];
    arr[i] = { ...arr[i], ...patch };
    set('experience', arr);
  };
  const removeExp = (i: number) => set('experience', (data.experience ?? []).filter((_, j) => j !== i));

  /* Education */
  const addEdu = () => set('education', [...(data.education ?? []), { degree: '', institution: '', year: '', gpa: null }]);
  const updateEdu = (i: number, patch: Partial<ResumeEducation>) => {
    const arr = [...(data.education ?? [])];
    arr[i] = { ...arr[i], ...patch };
    set('education', arr);
  };
  const removeEdu = (i: number) => set('education', (data.education ?? []).filter((_, j) => j !== i));

  /* Skills */
  const addSkill = () => set('skills', [...(data.skills ?? []), { category: '', items: [''] }]);
  const updateSkill = (i: number, patch: Partial<ResumeSkillCategory>) => {
    const arr = [...(data.skills ?? [])];
    arr[i] = { ...arr[i], ...patch };
    set('skills', arr);
  };
  const removeSkill = (i: number) => set('skills', (data.skills ?? []).filter((_, j) => j !== i));

  /* Projects */
  const addProject = () => set('projects', [...(data.projects ?? []), { name: '', description: '', stack: '' }]);
  const updateProject = (i: number, patch: Partial<ResumeProject>) => {
    const arr = [...(data.projects ?? [])];
    arr[i] = { ...arr[i], ...patch };
    set('projects', arr);
  };
  const removeProject = (i: number) => set('projects', (data.projects ?? []).filter((_, j) => j !== i));

  /* Certifications */
  const addCert = () => set('certifications', [...(data.certifications ?? []), { name: '', issuer: '', year: '' }]);
  const updateCert = (i: number, patch: Partial<ResumeCertification>) => {
    const arr = [...(data.certifications ?? [])];
    arr[i] = { ...arr[i], ...patch };
    set('certifications', arr);
  };
  const removeCert = (i: number) => set('certifications', (data.certifications ?? []).filter((_, j) => j !== i));

  /* Languages */
  const addLang = () => set('languages', [...(data.languages ?? []), { language: '', level: '' }]);
  const updateLang = (i: number, patch: Partial<ResumeLanguage>) => {
    const arr = [...(data.languages ?? [])];
    arr[i] = { ...arr[i], ...patch };
    set('languages', arr);
  };
  const removeLang = (i: number) => set('languages', (data.languages ?? []).filter((_, j) => j !== i));

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">

      {/* ── Basics ── */}
      <section>
        <p className={sectionHeadCls}><span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />Basics</p>
        <div className="space-y-2.5">
          <Field label="Full Name"><input className={inputCls} value={data.name} onChange={e => set('name', e.target.value)} placeholder="Natwar Rathor" /></Field>
          <Field label="Job Title"><input className={inputCls} value={data.title} onChange={e => set('title', e.target.value)} placeholder="MERN Stack Developer" /></Field>
          <Field label="Summary"><textarea className={`${inputCls} resize-none`} rows={3} value={data.summary} onChange={e => set('summary', e.target.value)} placeholder="A brief professional summary..." /></Field>
        </div>
      </section>

      {/* ── Contact ── */}
      <section>
        <p className={sectionHeadCls}><span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />Contact</p>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Email"><input className={inputCls} value={data.contact.email ?? ''} onChange={e => setContact('email', e.target.value)} placeholder="you@email.com" /></Field>
          <Field label="Phone"><input className={inputCls} value={data.contact.phone ?? ''} onChange={e => setContact('phone', e.target.value)} placeholder="+91 9999999999" /></Field>
          <Field label="Location"><input className={inputCls} value={data.contact.location ?? ''} onChange={e => setContact('location', e.target.value)} placeholder="Indore, India" /></Field>
          <Field label="LinkedIn"><input className={inputCls} value={data.contact.linkedin ?? ''} onChange={e => setContact('linkedin', e.target.value)} placeholder="linkedin.com/in/..." /></Field>
          <Field label="GitHub"><input className={inputCls} value={data.contact.github ?? ''} onChange={e => setContact('github', e.target.value)} placeholder="github.com/..." /></Field>
          <Field label="Portfolio"><input className={inputCls} value={data.contact.portfolio ?? ''} onChange={e => setContact('portfolio', e.target.value)} placeholder="yoursite.com" /></Field>
        </div>
      </section>

      {/* ── Experience ── */}
      <section>
        <p className={sectionHeadCls}><span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" />Experience</p>
        <div className="space-y-3">
          {(data.experience ?? []).map((exp, i) => (
            <CardWrap key={i} onDelete={() => removeExp(i)}>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Role"><input className={inputCls} value={exp.role} onChange={e => updateExp(i, { role: e.target.value })} placeholder="Software Engineer" /></Field>
                <Field label="Company"><input className={inputCls} value={exp.company} onChange={e => updateExp(i, { company: e.target.value })} placeholder="Google" /></Field>
              </div>
              <Field label="Period"><input className={inputCls} value={exp.period} onChange={e => updateExp(i, { period: e.target.value })} placeholder="Jan 2023 – Present" /></Field>
              <Field label="Bullet Points (one per line)">
                <textarea className={`${inputCls} resize-none`} rows={3}
                  value={exp.bullets.join('\n')}
                  onChange={e => updateExp(i, { bullets: e.target.value.split('\n') })}
                  placeholder="Built a feature that..." />
              </Field>
            </CardWrap>
          ))}
          <AddBtn label="Add Experience" onClick={addExp} />
        </div>
      </section>

      {/* ── Education ── */}
      <section>
        <p className={sectionHeadCls}><span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block" />Education</p>
        <div className="space-y-3">
          {(data.education ?? []).map((edu, i) => (
            <CardWrap key={i} onDelete={() => removeEdu(i)}>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Degree"><input className={inputCls} value={edu.degree} onChange={e => updateEdu(i, { degree: e.target.value })} placeholder="B.Tech in CSE" /></Field>
                <Field label="Institution"><input className={inputCls} value={edu.institution} onChange={e => updateEdu(i, { institution: e.target.value })} placeholder="IIT Bombay" /></Field>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Year"><input className={inputCls} value={edu.year} onChange={e => updateEdu(i, { year: e.target.value })} placeholder="2025" /></Field>
                <Field label="GPA (optional)"><input className={inputCls} value={edu.gpa ?? ''} onChange={e => updateEdu(i, { gpa: e.target.value || null })} placeholder="8.5" /></Field>
              </div>
            </CardWrap>
          ))}
          <AddBtn label="Add Education" onClick={addEdu} />
        </div>
      </section>

      {/* ── Skills ── */}
      <section>
        <p className={sectionHeadCls}><span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />Skills</p>
        <div className="space-y-3">
          {(data.skills ?? []).map((skill, i) => (
            <CardWrap key={i} onDelete={() => removeSkill(i)}>
              <Field label="Category"><input className={inputCls} value={skill.category} onChange={e => updateSkill(i, { category: e.target.value })} placeholder="Frontend" /></Field>
              <Field label="Items (comma-separated)">
                <input className={inputCls} value={skill.items.join(', ')}
                  onChange={e => updateSkill(i, { items: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  placeholder="React, Next.js, Tailwind" />
              </Field>
            </CardWrap>
          ))}
          <AddBtn label="Add Skill Category" onClick={addSkill} />
        </div>
      </section>

      {/* ── Projects ── */}
      <section>
        <p className={sectionHeadCls}><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 inline-block" />Projects</p>
        <div className="space-y-3">
          {(data.projects ?? []).map((proj, i) => (
            <CardWrap key={i} onDelete={() => removeProject(i)}>
              <Field label="Project Name"><input className={inputCls} value={proj.name} onChange={e => updateProject(i, { name: e.target.value })} placeholder="AI Chat App" /></Field>
              <Field label="Description"><textarea className={`${inputCls} resize-none`} rows={2} value={proj.description} onChange={e => updateProject(i, { description: e.target.value })} placeholder="Built a real-time AI chat..." /></Field>
              <Field label="Stack"><input className={inputCls} value={proj.stack} onChange={e => updateProject(i, { stack: e.target.value })} placeholder="React, Node.js, OpenAI" /></Field>
            </CardWrap>
          ))}
          <AddBtn label="Add Project" onClick={addProject} />
        </div>
      </section>

      {/* ── Certifications ── */}
      <section>
        <p className={sectionHeadCls}><span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />Certifications</p>
        <div className="space-y-3">
          {(data.certifications ?? []).map((cert, i) => (
            <CardWrap key={i} onDelete={() => removeCert(i)}>
              <Field label="Certification Name"><input className={inputCls} value={cert.name} onChange={e => updateCert(i, { name: e.target.value })} placeholder="AWS Solutions Architect" /></Field>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Issuer"><input className={inputCls} value={cert.issuer} onChange={e => updateCert(i, { issuer: e.target.value })} placeholder="Amazon" /></Field>
                <Field label="Year"><input className={inputCls} value={cert.year} onChange={e => updateCert(i, { year: e.target.value })} placeholder="2024" /></Field>
              </div>
            </CardWrap>
          ))}
          <AddBtn label="Add Certification" onClick={addCert} />
        </div>
      </section>

      {/* ── Languages ── */}
      <section>
        <p className={sectionHeadCls}><span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />Languages</p>
        <div className="space-y-3">
          {(data.languages ?? []).map((lang, i) => (
            <CardWrap key={i} onDelete={() => removeLang(i)}>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Language"><input className={inputCls} value={lang.language} onChange={e => updateLang(i, { language: e.target.value })} placeholder="English" /></Field>
                <Field label="Level"><input className={inputCls} value={lang.level} onChange={e => updateLang(i, { level: e.target.value })} placeholder="Professional" /></Field>
              </div>
            </CardWrap>
          ))}
          <AddBtn label="Add Language" onClick={addLang} />
        </div>
      </section>

    </div>
  );
};
