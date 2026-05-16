"use client";

import React, { useState, useEffect } from 'react';
import { defaultResumeData } from '@/lib/resumeData';
import { parseResumeJson } from '@/lib/jsonUtils';
import { ResumeData } from '@/lib/resumeTypes';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { TemplateSelector } from '@/components/resume/TemplateSelector';
import { FontSelector } from '@/components/resume/FontSelector';
import { ResumeForm } from '@/components/resume/ResumeForm';
import { AIAssistant } from '@/components/resume/AIAssistant';
import { Sun, Moon, Code2, FormInput, Eye, Pencil, Sparkles, Copy, CheckCheck, WrapText } from 'lucide-react';

type EditorMode = 'form' | 'json' | 'ai';
type MobileTab = 'editor' | 'preview';

export default function ResumeBuilder() {
  const [editorMode, setEditorMode] = useState<EditorMode>('form');
  const [mobileTab, setMobileTab] = useState<MobileTab>('editor');
  const [jsonText, setJsonText] = useState(() => JSON.stringify(defaultResumeData, null, 2));
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [templateId, setTemplateId] = useState('modern');
  const [fontId, setFontId] = useState('inter');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
      setJsonError(null);
    } catch {
      // keep existing error displayed
    }
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(jsonText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select all text
    }
  };

  const handleAiResumeUpdate = (data: ResumeData) => {
    setIsUpdating(true);
    // slight delay so loader is visible before heavy re-render
    setTimeout(() => {
      setResumeData(data);
      setJsonText(JSON.stringify(data, null, 2));
      setJsonError(null);
      setIsUpdating(false);
    }, 600);
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

        {/* ── Left Panel: Editor (Form / JSON / AI) ── */}
        <div className={`
          w-full md:w-1/2 flex-col border-r border-app-border bg-app-surface print:hidden transition-colors duration-300
          ${mobileTab === 'editor' ? 'flex' : 'hidden md:flex'}
        `}>
          {/* Tab Bar */}
          <div className="px-4 pt-3 pb-0 bg-app-surface border-b border-app-border flex items-center justify-between shrink-0">
            <div className="flex gap-1">
              <button
                onClick={() => switchMode('form')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
                  editorMode === 'form'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-app-bg'
                    : 'border-transparent text-app-text-muted hover:text-app-text hover:bg-app-bg/50'
                }`}
              >
                <FormInput size={14} /> Form
              </button>
              <button
                onClick={() => switchMode('json')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
                  editorMode === 'json'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-app-bg'
                    : 'border-transparent text-app-text-muted hover:text-app-text hover:bg-app-bg/50'
                }`}
              >
                <Code2 size={14} /> JSON
              </button>
              <button
                onClick={() => switchMode('ai')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
                  editorMode === 'ai'
                    ? 'border-violet-600 text-violet-600 dark:text-violet-400 bg-app-bg'
                    : 'border-transparent text-app-text-muted hover:text-app-text hover:bg-app-bg/50'
                }`}
              >
                <Sparkles size={14} />
                <span>AI</span>
                <span className="hidden sm:inline-block bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                  NEW
                </span>
              </button>
            </div>
            {editorMode === 'json' && (
              <div className="flex items-center gap-1.5 ml-auto">
                {jsonError && (
                  <span className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md font-semibold border border-red-200 dark:border-red-800 truncate max-w-[130px]">
                    {jsonError}
                  </span>
                )}
                <button
                  onClick={handleFormatJson}
                  title="Format JSON"
                  className="flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-md border border-app-border text-app-text-muted hover:text-app-text hover:bg-app-bg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <WrapText size={13} />
                  <span className="hidden sm:inline">Format</span>
                </button>
                <button
                  onClick={handleCopyJson}
                  title={copied ? 'Copied!' : 'Copy JSON'}
                  className={`flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-md border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    copied
                      ? 'border-green-500 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
                      : 'border-app-border text-app-text-muted hover:text-app-text hover:bg-app-bg'
                  }`}
                >
                  {copied ? <CheckCheck size={13} /> : <Copy size={13} />}
                  <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Panel Content */}
          {editorMode === 'form' && (
            <ResumeForm data={resumeData} onChange={handleFormChange} />
          )}
          {editorMode === 'json' && (
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
          {editorMode === 'ai' && (
            <AIAssistant onResumeUpdate={handleAiResumeUpdate} />
          )}
        </div>

        {/* ── Right Panel: Preview ── */}
        <div
          id="resume-preview-panel"
          className={`
          w-full md:w-1/2 h-full print:w-full print:h-auto overflow-y-auto bg-app-bg relative
          ${mobileTab === 'preview' ? 'flex flex-col' : 'hidden md:flex md:flex-col'}
        `}>
          <ResumePreview data={resumeData} templateId={templateId} fontId={fontId} />

          {/* AI update loader overlay */}
          {isUpdating && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 backdrop-blur-sm bg-app-bg/70 pointer-events-none">
              {/* Spinner */}
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-4 border-violet-200 dark:border-violet-900/50" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 animate-spin" />
                <div className="absolute inset-[6px] rounded-full border-4 border-transparent border-t-indigo-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.7s' }} />
              </div>
              {/* Label */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-base font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent animate-pulse">
                  Updating Resume…
                </span>
                <span className="text-xs text-app-text-muted">
                  Applying AI suggestions
                </span>
              </div>
            </div>
          )}
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
