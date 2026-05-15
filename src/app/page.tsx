"use client";

import React, { useState, useEffect } from 'react';
import { defaultResumeData } from '@/lib/resumeData';
import { parseResumeJson } from '@/lib/jsonUtils';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { TemplateSelector } from '@/components/resume/TemplateSelector';
import { FontSelector } from '@/components/resume/FontSelector';
import { Sun, Moon } from 'lucide-react';

export default function ResumeBuilder() {
  const [jsonText, setJsonText] = useState(() => JSON.stringify(defaultResumeData, null, 2));
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [templateId, setTemplateId] = useState('modern');
  const [fontId, setFontId] = useState('inter');
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply dark mode class to HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleJsonChange = (newText: string) => {
    setJsonText(newText);
    const { data, error } = parseResumeJson(newText);
    if (error) {
      setError(error);
    } else {
      setError(null);
      setResumeData(data);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-app-bg text-app-text transition-colors duration-300 print:bg-white print:h-auto overflow-hidden print:overflow-visible">
      {/* Header */}
      <header className="bg-app-surface/80 backdrop-blur-md border-b border-app-border px-6 py-4 flex justify-between items-center print:hidden shrink-0 shadow-sm z-10 transition-colors duration-300">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Resume Builder
            </h1>
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm">
              ATS Friendly
            </span>
          </div>
          <p className="text-sm text-app-text-muted mt-1 font-medium">Generate, edit, and preview ATS-friendly resumes.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <FontSelector selectedFontId={fontId} onChange={setFontId} />
          <TemplateSelector selectedTemplateId={templateId} onChange={setTemplateId} />
          
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-app-bg border border-app-border text-app-text-muted hover:text-app-text transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-1 overflow-hidden print:overflow-visible flex-col md:flex-row">
        {/* Left Panel: JSON Editor */}
        <div className="w-full md:w-1/2 flex flex-col border-r border-app-border bg-app-surface print:hidden transition-colors duration-300">
          <div className="px-5 py-3 bg-app-surface border-b border-app-border flex justify-between items-center shrink-0">
            <h2 className="text-sm font-bold text-app-text uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Resume JSON
            </h2>
            {error && (
              <span className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2.5 py-1 rounded-md font-semibold border border-red-200 dark:border-red-800">
                {error}
              </span>
            )}
          </div>
          <div className="flex-1 relative p-4 bg-[#1e1e1e] overflow-hidden">
            <textarea
              className="w-full h-full font-mono text-sm resize-none focus:outline-none bg-transparent text-[#d4d4d4] selection:bg-[#264f78] p-2 leading-relaxed"
              value={jsonText}
              onChange={(e) => handleJsonChange(e.target.value)}
              spellCheck={false}
              placeholder="Paste your resume JSON here..."
            />
          </div>
        </div>

        {/* Right Panel: Live Preview */}
        <div className="w-full md:w-1/2 h-full print:w-full print:h-auto overflow-y-auto bg-app-bg relative">
          <ResumePreview data={resumeData} templateId={templateId} fontId={fontId} />
        </div>
      </main>
    </div>
  );
}
