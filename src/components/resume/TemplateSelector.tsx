import React from 'react';
import { resumeTemplates } from '@/lib/templates';

interface TemplateSelectorProps {
  selectedTemplateId: string;
  onChange: (templateId: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplateId, onChange }) => {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="template-select" className="font-semibold text-sm text-app-text-muted">
        Template:
      </label>
      <select
        id="template-select"
        value={selectedTemplateId}
        onChange={(e) => onChange(e.target.value)}
        className="block w-48 rounded-md border-app-border shadow-sm focus:border-app-primary focus:ring-app-primary sm:text-sm p-2 border bg-app-surface text-app-text transition-colors duration-300"
      >
        {resumeTemplates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name} - {template.description}
          </option>
        ))}
      </select>
    </div>
  );
};
