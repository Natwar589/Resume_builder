import React, { useState } from 'react';
import { ResumeData } from '@/lib/resumeTypes';
import { resumeFonts } from '@/lib/fonts';
import { ResumeRenderer } from './ResumeRenderer';
import { CustomDropdown } from '@/components/ui/CustomDropdown';
import { Printer, FileText, AlignLeft, AArrowUp } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  templateId: string;
  fontId: string;
}

const pageSizeOptions = [
  { value: 'A4', label: 'A4', description: '210 × 297 mm' },
  { value: 'Letter', label: 'US Letter', description: '8.5 × 11 in' },
  { value: 'Legal', label: 'US Legal', description: '8.5 × 14 in' },
  { value: 'Executive', label: 'Executive', description: '7.25 × 10.5 in' },
  { value: 'A5', label: 'A5', description: '148 × 210 mm' },
];

const marginOptions = [
  { value: 'Narrow', label: 'Narrow', description: 'Compact spacing' },
  { value: 'Standard', label: 'Standard', description: 'Balanced spacing' },
  { value: 'Wide', label: 'Wide', description: 'Spacious layout' },
];

const fontSizeOptions = [
  { value: 'Small', label: 'Small', description: 'Fits more content' },
  { value: 'Standard', label: 'Standard', description: 'Default size' },
  { value: 'Large', label: 'Large', description: 'Enhanced readability' },
];

type PageSize = 'A4' | 'Letter' | 'Legal' | 'Executive' | 'A5';
type MarginSize = 'Standard' | 'Narrow' | 'Wide';
type FontSizeScale = 'Small' | 'Standard' | 'Large';

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, templateId, fontId }) => {
  const [pageSize, setPageSize] = useState<PageSize>('A4');
  const [marginSize, setMarginSize] = useState<MarginSize>('Standard');
  const [fontSizeScale, setFontSizeScale] = useState<FontSizeScale>('Standard');

  const handlePrint = () => window.print();

  const dimensions: Record<PageSize, { width: string; height: string }> = {
    A4: { width: '210mm', height: '297mm' },
    Letter: { width: '8.5in', height: '11in' },
    Legal: { width: '8.5in', height: '14in' },
    Executive: { width: '7.25in', height: '10.5in' },
    A5: { width: '148mm', height: '210mm' },
  };

  const marginValues: Record<MarginSize, string> = {
    Narrow: '1.5rem',
    Standard: '2.5rem',
    Wide: '3.5rem',
  };

  const selectedFont = resumeFonts.find(f => f.id === fontId) || resumeFonts[0];

  return (
    <div className="flex flex-col h-full bg-app-bg items-center overflow-auto py-8 print:py-0 print:bg-white print:overflow-visible transition-colors duration-300">
      {/* Inject Google Font dynamically */}
      <link href={selectedFont.url} rel="stylesheet" />

      <style>
        {`
          .page-mask {
            -webkit-mask-image: repeating-linear-gradient(to bottom, black 0, black ${dimensions[pageSize].height}, transparent ${dimensions[pageSize].height}, transparent calc(${dimensions[pageSize].height} + 24px));
            mask-image: repeating-linear-gradient(to bottom, black 0, black ${dimensions[pageSize].height}, transparent ${dimensions[pageSize].height}, transparent calc(${dimensions[pageSize].height} + 24px));
          }
          .page-shadow {
            filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1)) drop-shadow(0 4px 6px rgba(0,0,0,0.05));
          }
          @media print {
            .page-mask { -webkit-mask-image: none !important; mask-image: none !important; }
            .page-shadow { filter: none !important; }
          }
        `}
      </style>

      {/* Toolbar */}
      <div className="mb-5 flex flex-wrap justify-between items-center w-full max-w-[210mm] print:hidden px-4 gap-3">
        <h2 className="text-xl font-bold text-app-text shrink-0">Live Preview</h2>

        <div className="flex items-center gap-2 flex-wrap">
          <CustomDropdown
            label="Font Size"
            options={fontSizeOptions}
            value={fontSizeScale}
            onChange={(v) => setFontSizeScale(v as FontSizeScale)}
            icon={<AArrowUp size={14} />}
            width="w-36"
          />
          <CustomDropdown
            label="Margins"
            options={marginOptions}
            value={marginSize}
            onChange={(v) => setMarginSize(v as MarginSize)}
            icon={<AlignLeft size={14} />}
            width="w-36"
          />
          <CustomDropdown
            label="Page Size"
            options={pageSizeOptions}
            value={pageSize}
            onChange={(v) => setPageSize(v as PageSize)}
            icon={<FileText size={14} />}
            width="w-36"
          />

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-app-primary hover:bg-app-primary-hover text-white px-4 py-2 rounded-lg shadow-sm transition-colors text-sm font-semibold shrink-0 h-full"
          >
            <Printer size={16} />
            Print / PDF
          </button>
        </div>
      </div>

      {/* Page Container */}
      <div
        className="mx-auto text-black shrink-0 flex flex-col page-shadow pb-[24px] print:pb-0"
        style={{
          width: dimensions[pageSize].width,
          minHeight: dimensions[pageSize].height,
          fontFamily: selectedFont.family,
        }}
      >
        <div
          className={`bg-white w-full flex flex-col flex-1 page-mask print:bg-transparent ${fontSizeScale === 'Standard' ? '' : `font-scale-${fontSizeScale.toLowerCase()}`}`}
          style={{ '--page-padding': marginValues[marginSize] } as React.CSSProperties}
        >
          <ResumeRenderer data={data} templateId={templateId} />
        </div>
      </div>
    </div>
  );
};
