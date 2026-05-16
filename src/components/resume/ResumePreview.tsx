import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ResumeData } from '@/lib/resumeTypes';
import { resumeFonts } from '@/lib/fonts';
import { ResumeRenderer } from './ResumeRenderer';
import { CustomDropdown } from '@/components/ui/CustomDropdown';
import { Download, FileText, AlignLeft, AArrowUp, Loader2 } from 'lucide-react';

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

// Approximate pixel widths at 96dpi
const pagePxWidth: Record<PageSize, number> = {
  A4: 794,       // 210mm
  Letter: 816,   // 8.5in
  Legal: 816,    // 8.5in
  Executive: 696, // 7.25in
  A5: 559,       // 148mm
};

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, templateId, fontId }) => {
  const [pageSize, setPageSize] = useState<PageSize>('A4');
  const [marginSize, setMarginSize] = useState<MarginSize>('Standard');
  const [fontSizeScale, setFontSizeScale] = useState<FontSizeScale>('Standard');
  const [scale, setScale] = useState(1);
  const [isExporting, setIsExporting] = useState(false);

  const outerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const recalcScale = useCallback(() => {
    if (!outerRef.current) return;
    const available = outerRef.current.offsetWidth - 32; // 16px padding each side
    const natural = pagePxWidth[pageSize];
    setScale(available < natural ? available / natural : 1);
  }, [pageSize]);

  useEffect(() => {
    recalcScale();
    const ro = new ResizeObserver(recalcScale);
    if (outerRef.current) ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, [recalcScale]);

  const handleDownloadPdf = async () => {
    if (!pageRef.current || isExporting) return;
    setIsExporting(true);
    try {
      const { toPng } = await import('html-to-image');
      const { default: jsPDF } = await import('jspdf');

      // Temporarily reset the CSS transform so we capture at natural resolution
      const el = pageRef.current;
      const prevTransform = el.style.transform;
      const prevMarginBottom = el.style.marginBottom;
      el.style.transform = 'none';
      el.style.marginBottom = '0';

      const dataUrl = await toPng(el, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        skipFonts: true,  // avoids CORS crash on cross-origin stylesheets (Google Fonts, chatbot CSS)
      });

      // Restore transform
      el.style.transform = prevTransform;
      el.style.marginBottom = prevMarginBottom;

      const pdfFormat =
        pageSize === 'Letter' ? 'letter'
        : pageSize === 'Legal' ? 'legal'
        : pageSize.toLowerCase();

      const pdf = new jsPDF({ unit: 'mm', format: pdfFormat, orientation: 'portrait' });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfW, pdfH);
      pdf.save(`${data.name.replace(/\s+/g, '_')}_Resume.pdf`);
    } finally {
      setIsExporting(false);
    }
  };

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
  const naturalW = pagePxWidth[pageSize];

  return (
    <div ref={outerRef} className="flex flex-col h-full bg-app-bg items-center overflow-auto py-6 print:py-0 print:bg-white print:overflow-visible transition-colors duration-300 w-full">
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
      <div className="mb-4 w-full print:hidden px-3 md:px-4 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base md:text-xl font-bold text-app-text">Live Preview</h2>
          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="flex items-center gap-1.5 bg-app-primary hover:bg-app-primary-hover disabled:opacity-70 text-white px-3 py-1.5 rounded-lg shadow-sm transition-colors text-xs md:text-sm font-semibold shrink-0"
          >
            {isExporting
              ? <><Loader2 size={14} className="animate-spin" /><span className="hidden sm:inline">Generating…</span></>
              : <><Download size={14} /><span className="hidden sm:inline">Download </span>PDF</>
            }
          </button>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <CustomDropdown
            label="Font Size" options={fontSizeOptions} value={fontSizeScale}
            onChange={(v) => setFontSizeScale(v as FontSizeScale)}
            icon={<AArrowUp size={14} />} width="w-32 md:w-36"
          />
          <CustomDropdown
            label="Margins" options={marginOptions} value={marginSize}
            onChange={(v) => setMarginSize(v as MarginSize)}
            icon={<AlignLeft size={14} />} width="w-32 md:w-36"
          />
          <CustomDropdown
            label="Page Size" options={pageSizeOptions} value={pageSize}
            onChange={(v) => setPageSize(v as PageSize)}
            icon={<FileText size={14} />} width="w-32 md:w-36"
          />
        </div>
      </div>

      {/* Scaling wrapper — collapses to scaled height so no clipping */}
      <div
        className="print:contents shrink-0"
        style={{
          width: scale < 1 ? `${naturalW * scale}px` : dimensions[pageSize].width,
          // When scaled, the element visually takes less height but still reserves full height.
          // We set height explicitly to the scaled value so the parent scrolls correctly.
        }}
      >
        <div
            ref={pageRef}
            className="text-black flex flex-col page-shadow pb-[24px] print:pb-0 print:transform-none origin-top-left"
            style={{
              width: dimensions[pageSize].width,
              minHeight: dimensions[pageSize].height,
              fontFamily: selectedFont.family,
              transform: scale < 1 ? `scale(${scale})` : undefined,
              transformOrigin: 'top left',
              // Compensate height so parent scroll area matches scaled visual height
              marginBottom: scale < 1 ? `${(scale - 1) * pagePxWidth[pageSize] * 1.41}px` : undefined,
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
    </div>
  );
};
