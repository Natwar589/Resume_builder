'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
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

interface PanelPos {
  top?: number;
  bottom?: number;
  left: number;
  width: number;
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
  const [panelPos, setPanelPos] = useState<PanelPos | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selected = options.find(o => o.value === value);

  // Needed for SSR — portals need the DOM
  useEffect(() => { setMounted(true); }, []);

  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click or scroll — but NOT when scrolling inside the panel
  useEffect(() => {
    if (!open) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !panelRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleScroll = (e: Event) => {
      // Ignore scroll events that originate inside the dropdown panel
      if (panelRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', () => setOpen(false));
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [open]);

  const handleToggle = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const panelHeight = Math.min(options.length * 56 + 8, 224);
    const spaceBelow = window.innerHeight - rect.bottom;

    if (spaceBelow >= panelHeight) {
      setPanelPos({ top: rect.bottom + 6, left: rect.left, width: rect.width });
    } else {
      setPanelPos({ bottom: window.innerHeight - rect.top + 6, left: rect.left, width: rect.width });
    }

    setOpen(prev => !prev);
  }, [options.length]);

  const panel = open && panelPos && mounted ? createPortal(
    <div
      ref={panelRef}
      className="fixed z-[9999] bg-app-surface border border-app-border rounded-xl shadow-2xl overflow-hidden"
      style={{
        top: panelPos.top !== undefined ? panelPos.top : undefined,
        bottom: panelPos.bottom !== undefined ? panelPos.bottom : undefined,
        left: panelPos.left,
        width: Math.max(panelPos.width, 160),
      }}
    >
      <div className="overflow-y-auto max-h-56 p-1">
        {options.map(option => (
          <button
            key={option.value}
            onMouseDown={(e) => {
              e.preventDefault(); // prevent losing focus before click
              onChange(option.value);
              setOpen(false);
            }}
            className={`
              w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-left text-sm
              transition-colors duration-150
              ${value === option.value
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'hover:bg-app-bg text-app-text'
              }
            `}
          >
            <div>
              <div className="font-medium leading-none">{option.label}</div>
              {option.description && (
                <div className="text-xs text-app-text-muted mt-1">{option.description}</div>
              )}
            </div>
            {value === option.value && (
              <Check size={14} className="shrink-0 text-blue-600 dark:text-blue-400" />
            )}
          </button>
        ))}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div className={`relative ${width} shrink-0`}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={handleToggle}
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

      {panel}
    </div>
  );
};
