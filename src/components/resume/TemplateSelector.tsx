import React from 'react';
import { resumeTemplates } from '@/lib/templates';
import { CustomDropdown } from '@/components/ui/CustomDropdown';
import { LayoutTemplate } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplateId: string;
  onChange: (templateId: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplateId, onChange }) => {
  const options = resumeTemplates.map(t => ({
    value: t.id,
    label: t.name,
    description: t.description,
  }));

  return (
    <CustomDropdown
      label="Template"
      options={options}
      value={selectedTemplateId}
      onChange={onChange}
      icon={<LayoutTemplate size={14} />}
      width="w-48"
    />
  );
};
