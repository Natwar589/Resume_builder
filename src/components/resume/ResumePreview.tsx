import React, { useState } from 'react';
import { ResumeData } from '@/lib/resumeTypes';
import { resumeFonts } from '@/lib/fonts';
import { ResumeRenderer } from './ResumeRenderer';
import { Printer } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  templateId: string;
  fontId: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, templateId, fontId }) => {
  const [pageSize, setPageSize] = useState<'A4' | 'Letter' | 'Legal' | 'Executive' | 'A5'>('A4');
  const [marginSize, setMarginSize] = useState<'Standard' | 'Narrow' | 'Wide'>('Standard');
  const [fontSizeScale, setFontSizeScale] = useState<'Small' | 'Standard' | 'Large'>('Standard');

  const handlePrint = () => {
    window.print();
  };

  const dimensions = {
    A4: { width: '210mm', height: '297mm' },
    Letter: { width: '8.5in', height: '11in' },
    Legal: { width: '8.5in', height: '14in' },
    Executive: { width: '7.25in', height: '10.5in' },
    A5: { width: '148mm', height: '210mm' }
  };

  const marginValues = {
    Narrow: '1.5rem',
    Standard: '2.5rem',
    Wide: '3.5rem'
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
            .page-mask {
              -webkit-mask-image: none !important;
              mask-image: none !important;
            }
            .page-shadow {
              filter: none !important;
            }
          }
        `}
      </style>

      <div className="mb-4 flex flex-wrap justify-between items-center w-full max-w-[210mm] print:hidden px-4 gap-4">
        <h2 className="text-xl font-bold text-app-text shrink-0">Live Preview</h2>
        
        <div className="flex items-center gap-3">
          <select
            value={fontSizeScale}
            onChange={(e) => setFontSizeScale(e.target.value as 'Small' | 'Standard' | 'Large')}
            className="rounded-md border-app-border shadow-sm focus:border-app-primary focus:ring-app-primary sm:text-sm p-1.5 border bg-app-surface text-app-text transition-colors duration-300"
          >
            <option value="Small">Small Font</option>
            <option value="Standard">Standard Font</option>
            <option value="Large">Large Font</option>
          </select>

          <select
            value={marginSize}
            onChange={(e) => setMarginSize(e.target.value as 'Standard' | 'Narrow' | 'Wide')}
            className="rounded-md border-app-border shadow-sm focus:border-app-primary focus:ring-app-primary sm:text-sm p-1.5 border bg-app-surface text-app-text transition-colors duration-300"
          >
            <option value="Narrow">Narrow Margin</option>
            <option value="Standard">Standard Margin</option>
            <option value="Wide">Wide Margin</option>
          </select>

          <select
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value as 'A4' | 'Letter' | 'Legal' | 'Executive' | 'A5')}
            className="rounded-md border-app-border shadow-sm focus:border-app-primary focus:ring-app-primary sm:text-sm p-1.5 border bg-app-surface text-app-text transition-colors duration-300"
          >
            <option value="A4">A4 Size</option>
            <option value="Letter">US Letter</option>
            <option value="Legal">US Legal</option>
            <option value="Executive">Executive</option>
            <option value="A5">A5 Size</option>
          </select>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-app-primary hover:bg-app-primary-hover text-white px-4 py-2 rounded-md shadow-sm transition-colors text-sm font-semibold shrink-0"
          >
            <Printer size={16} />
            Print / PDF
          </button>
        </div>
      </div>

      {/* Page Container wrapped with a shadow that follows the mask */}
      <div className="mx-auto text-black shrink-0 flex flex-col page-shadow pb-[24px] print:pb-0"
        style={{ 
          width: dimensions[pageSize].width, 
          minHeight: dimensions[pageSize].height,
          fontFamily: selectedFont.family
        }}
      >
        {/* The actual page content, masked to create visual gaps between pages */}
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
