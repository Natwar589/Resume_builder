'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface CustomDropdownProps {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  width?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  icon,
  width = 'w-44',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className={`relative ${width}`} ref={ref}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className={`
          w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm font-medium
          bg-app-surface border border-app-border text-app-text
          hover:border-app-primary hover:bg-app-bg
          transition-all duration-200 shadow-sm
          ${open ? 'border-app-primary ring-2 ring-app-primary/20' : ''}
        `}
      >
        <div className="flex items-center gap-2 truncate">
          {icon && <span className="text-app-text-muted shrink-0">{icon}</span>}
          <div className="truncate text-left">
            <div className="text-xs text-app-text-muted leading-none mb-0.5">{label}</div>
            <div className="truncate font-semibold text-app-text">{selected?.label ?? value}</div>
          </div>
        </div>
        <ChevronDown
          size={14}
          className={`shrink-0 text-app-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="
          absolute z-50 top-full mt-1.5 left-0 right-0
          bg-app-surface border border-app-border rounded-xl shadow-xl
          overflow-hidden
          animate-in fade-in slide-in-from-top-2 duration-150
        ">
          <div className="p-1 max-h-64 overflow-y-auto">
            {options.map(option => (
              <button
                key={option.value}
                onClick={() => { onChange(option.value); setOpen(false); }}
                className={`
                  w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-left text-sm
                  transition-colors duration-150 group
                  ${value === option.value
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'hover:bg-app-bg text-app-text'
                  }
                `}
              >
                <div>
                  <div className="font-medium">{option.label}</div>
                  {option.description && (
                    <div className="text-xs text-app-text-muted mt-0.5">{option.description}</div>
                  )}
                </div>
                {value === option.value && (
                  <Check size={14} className="shrink-0 text-blue-600 dark:text-blue-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
