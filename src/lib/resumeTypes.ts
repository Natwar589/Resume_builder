export interface ResumeContact {
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedin: string | null;
  github: string | null;
  portfolio: string | null;
}

export interface ResumeExperience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  year: string;
  gpa: string | null;
}

export interface ResumeSkillCategory {
  category: string;
  items: string[];
}

export interface ResumeProject {
  name: string;
  description: string;
  stack: string;
}

export interface ResumeCertification {
  name: string;
  issuer: string;
  year: string;
}

export interface ResumeLanguage {
  language: string;
  level: string;
}

export interface ResumeData {
  name: string;
  title: string;
  contact: ResumeContact;
  summary: string;
  experience?: ResumeExperience[];
  education?: ResumeEducation[];
  skills?: ResumeSkillCategory[];
  projects?: ResumeProject[];
  certifications?: ResumeCertification[];
  languages?: ResumeLanguage[];
}
