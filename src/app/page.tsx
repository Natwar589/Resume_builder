"use client";

import React, { useState, useEffect } from 'react';
import { defaultResumeData } from '@/lib/resumeData';
import { parseResumeJson } from '@/lib/jsonUtils';
import { ResumeData } from '@/lib/resumeTypes';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { TemplateSelector } from '@/components/resume/TemplateSelector';
import { FontSelector } from '@/components/resume/FontSelector';
import { ResumeForm } from '@/components/resume/ResumeForm';
import { Sun, Moon, Code2, FormInput, Eye, Pencil } from 'lucide-react';

type EditorMode = 'form' | 'json';
type MobileTab = 'editor' | 'preview';

export default function ResumeBuilder() {
  const [editorMode, setEditorMode] = useState<EditorMode>('form');
  const [mobileTab, setMobileTab] = useState<MobileTab>('editor');
  const [jsonText, setJsonText] = useState(() => JSON.stringify(defaultResumeData, null, 2));
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [templateId, setTemplateId] = useState('modern');
  const [fontId, setFontId] = useState('inter');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleFormChange = (data: ResumeData) => {
    setResumeData(data);
    setJsonText(JSON.stringify(data, null, 2));
  };

  const handleJsonChange = (newText: string) => {
    setJsonText(newText);
    const { data, error } = parseResumeJson(newText);
    if (error) { setJsonError(error); }
    else { setJsonError(null); setResumeData(data); }
  };

  const switchMode = (mode: EditorMode) => {
    if (mode === 'json') setJsonText(JSON.stringify(resumeData, null, 2));
    setEditorMode(mode);
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-app-bg text-app-text transition-colors duration-300 print:bg-white print:h-auto overflow-hidden print:overflow-visible">

      {/* ── Header ── */}
      <header className="bg-app-surface/90 backdrop-blur-md border-b border-app-border px-4 md:px-6 py-3 flex justify-between items-center print:hidden shrink-0 shadow-sm z-20 transition-colors duration-300 gap-3">
        {/* Brand */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
              AI Resume Builder
            </h1>
            <span className="hidden sm:inline bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
              ATS Friendly
            </span>
          </div>
          <p className="hidden md:block text-sm text-app-text-muted mt-0.5 font-medium">Generate, edit, and preview ATS-friendly resumes.</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Hide font/template on very small screens — accessible via dropdown in preview */}
          <div className="hidden sm:flex items-center gap-2">
            <FontSelector selectedFontId={fontId} onChange={setFontId} />
            <TemplateSelector selectedTemplateId={templateId} onChange={setTemplateId} />
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-app-bg border border-app-border text-app-text-muted hover:text-app-text transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>

      {/* ── Mobile: Template + Font Bar ── */}
      <div className="sm:hidden flex items-center gap-2 px-3 py-2 bg-app-surface border-b border-app-border overflow-x-auto print:hidden shrink-0">
        <FontSelector selectedFontId={fontId} onChange={setFontId} />
        <TemplateSelector selectedTemplateId={templateId} onChange={setTemplateId} />
      </div>

      {/* ── Main ── */}
      <main className="flex flex-1 overflow-hidden print:overflow-visible">

        {/* ── Desktop: Left Panel (always visible) ── */}
        {/* ── Mobile: Only show when mobileTab === 'editor' ── */}
        <div className={`
          w-full md:w-1/2 flex-col border-r border-app-border bg-app-surface print:hidden transition-colors duration-300
          ${mobileTab === 'editor' ? 'flex' : 'hidden md:flex'}
        `}>
          {/* Tab Bar */}
          <div className="px-4 pt-3 pb-0 bg-app-surface border-b border-app-border flex items-center justify-between shrink-0">
            <div className="flex gap-1">
              <button
                onClick={() => switchMode('form')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
                  editorMode === 'form'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-app-bg'
                    : 'border-transparent text-app-text-muted hover:text-app-text hover:bg-app-bg/50'
                }`}
              >
                <FormInput size={14} /> Form
              </button>
              <button
                onClick={() => switchMode('json')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
                  editorMode === 'json'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-app-bg'
                    : 'border-transparent text-app-text-muted hover:text-app-text hover:bg-app-bg/50'
                }`}
              >
                <Code2 size={14} /> JSON
              </button>
            </div>
            {editorMode === 'json' && jsonError && (
              <span className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md font-semibold border border-red-200 dark:border-red-800 truncate max-w-[140px]">
                {jsonError}
              </span>
            )}
          </div>

          {/* Panel Content */}
          {editorMode === 'form' ? (
            <ResumeForm data={resumeData} onChange={handleFormChange} />
          ) : (
            <div className="flex-1 relative p-4 bg-[#1e1e1e] overflow-hidden">
              <textarea
                className="w-full h-full font-mono text-sm resize-none focus:outline-none bg-transparent text-[#d4d4d4] selection:bg-[#264f78] p-2 leading-relaxed"
                value={jsonText}
                onChange={(e) => handleJsonChange(e.target.value)}
                spellCheck={false}
                placeholder="Paste your resume JSON here..."
              />
            </div>
          )}
        </div>

        {/* ── Right Panel: Preview ── */}
        <div className={`
          w-full md:w-1/2 h-full print:w-full print:h-auto overflow-y-auto bg-app-bg relative
          ${mobileTab === 'preview' ? 'flex flex-col' : 'hidden md:flex md:flex-col'}
        `}>
          <ResumePreview data={resumeData} templateId={templateId} fontId={fontId} />
        </div>
      </main>

      {/* ── Mobile Bottom Tab Bar ── */}
      <div className="md:hidden flex items-stretch border-t border-app-border bg-app-surface shrink-0 print:hidden z-20">
        <button
          onClick={() => setMobileTab('editor')}
          className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 text-xs font-semibold transition-colors ${
            mobileTab === 'editor'
              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
              : 'text-app-text-muted hover:text-app-text'
          }`}
        >
          <Pencil size={18} />
          Edit
        </button>
        <div className="w-px bg-app-border" />
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 text-xs font-semibold transition-colors ${
            mobileTab === 'preview'
              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
              : 'text-app-text-muted hover:text-app-text'
          }`}
        >
          <Eye size={18} />
          Preview
        </button>
      </div>
    </div>
  );
}
