import React from 'react';
import { ResumeData } from '@/lib/resumeTypes';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { CompactTemplate } from './templates/CompactTemplate';
import { TwoColumnTemplate } from './templates/TwoColumnTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { SidebarTemplate } from './templates/SidebarTemplate';
import { BoldTemplate } from './templates/BoldTemplate';

interface ResumeRendererProps {
  data: ResumeData;
  templateId: string;
}

export const ResumeRenderer: React.FC<ResumeRendererProps> = ({ data, templateId }) => {
  switch (templateId) {
    case 'sidebar':
      return <SidebarTemplate data={data} />;
    case 'bold':
      return <BoldTemplate data={data} />;
    case 'minimalist':
      return <MinimalistTemplate data={data} />;
    case 'professional':
      return <ProfessionalTemplate data={data} />;
    case 'executive':
      return <ExecutiveTemplate data={data} />;
    case 'modern':
      return <ModernTemplate data={data} />;
    case 'compact':
      return <CompactTemplate data={data} />;
    case 'two-column':
      return <TwoColumnTemplate data={data} />;
    case 'classic':
    default:
      return <ClassicTemplate data={data} />;
  }
};
