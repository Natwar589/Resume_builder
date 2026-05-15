import React from 'react';
import { resumeFonts } from '@/lib/fonts';
import { CustomDropdown } from '@/components/ui/CustomDropdown';
import { Type } from 'lucide-react';

interface FontSelectorProps {
  selectedFontId: string;
  onChange: (fontId: string) => void;
}

export const FontSelector: React.FC<FontSelectorProps> = ({ selectedFontId, onChange }) => {
  const options = resumeFonts.map(f => ({
    value: f.id,
    label: f.name,
  }));

  return (
    <CustomDropdown
      label="Font"
      options={options}
      value={selectedFontId}
      onChange={onChange}
      icon={<Type size={14} />}
      width="w-44"
    />
  );
};
