import React from 'react';
import { resumeFonts } from '@/lib/fonts';

interface FontSelectorProps {
  selectedFontId: string;
  onChange: (fontId: string) => void;
}

export const FontSelector: React.FC<FontSelectorProps> = ({ selectedFontId, onChange }) => {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="font-select" className="font-semibold text-sm text-app-text-muted">
        Font:
      </label>
      <select
        id="font-select"
        value={selectedFontId}
        onChange={(e) => onChange(e.target.value)}
        className="block w-40 rounded-md border-app-border shadow-sm focus:border-app-primary focus:ring-app-primary sm:text-sm p-2 border bg-app-surface text-app-text transition-colors duration-300"
      >
        {resumeFonts.map((font) => (
          <option key={font.id} value={font.id} style={{ fontFamily: font.family }}>
            {font.name}
          </option>
        ))}
      </select>
    </div>
  );
};
