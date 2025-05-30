"use client";
import InteractiveCalculator from './InteractiveCalculator';
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { OverviewPanel, HistoryPanel, SystemPanel, CalculatorPanel, ComparisonPanel } from './TabPanels';
import { UserInfoProvider } from './UserInfoContext';
import UserInfoForm from './UserInfoForm';
import { PartnerInfoProvider } from './PartnerInfoContext';
import PartnerInfoForm from './PartnerInfoForm';
import CompatibilityChart from './CompatibilityChart';
import NameChangeAnalysis from './NameChangeAnalysis';
import CycleForecast from './CycleForecast';
import { Separator } from '../../components/ui/separator';
import { TabButton } from './TabButton';
import { trackTabChange } from './analytics';

export type TabKey =
  | 'overview'
  | 'history'
  | 'system'
  | 'calculator'
  | 'comparison'
  | 'gematria'
  | 'pythagorean'
  | 'abjad'
  | 'chinese'
  | 'vedic'
  | 'angel-numbers'
  | 'personal-year';

function ChaldeanPage() {
  // --- Tab Data ---
  // Dynamic panels for code-split tabs
  const GematriaPanel = React.useMemo(() =>
    React.memo(React.forwardRef<HTMLDivElement, any>((props, ref) => {
      const Gematria = require('./gematria').default;
      return (
        <div ref={ref} {...props}>
          <Gematria />
        </div>
      );
    })),
    []
  );
  const PythagoreanPanel = React.useMemo(() =>
    React.memo(React.forwardRef<HTMLDivElement, any>((props, ref) => {
      const Pythagorean = require('./pythagorean').default;
      return (
        <div ref={ref} {...props}>
          <Pythagorean />
        </div>
      );
    })),
    []
  );
  const AbjadPanel = React.useMemo(() =>
    React.memo(React.forwardRef<HTMLDivElement, any>((props, ref) => {
      const Abjad = require('./abjad').default;
      return (
        <div ref={ref} {...props}>
          <Abjad />
        </div>
      );
    })),
    []
  );
  const ChinesePanel = React.useMemo(() =>
    React.memo(React.forwardRef<HTMLDivElement, any>((props, ref) => {
      const Chinese = require('./chinese').default;
      return (
        <div ref={ref} {...props}>
          <Chinese />
        </div>
      );
    })),
    []
  );
  const VedicPanel = React.useMemo(() =>
    React.memo(React.forwardRef<HTMLDivElement, any>((props, ref) => {
      const Vedic = require('./vedic').default;
      return (
        <div ref={ref} {...props}>
          <Vedic />
        </div>
      );
    })),
    []
  );
  const AngelNumbersPanel = React.useMemo(() =>
    React.memo(React.forwardRef<HTMLDivElement, any>((props, ref) => {
      const AngelNumbers = require('./angel-numbers').default;
      return (
        <div ref={ref} {...props}>
          <AngelNumbers />
        </div>
      );
    })),
    []
  );
  const PersonalYearPanel = React.useMemo(() =>
    React.memo(React.forwardRef<HTMLDivElement, any>((props, ref) => {
      const PersonalYear = require('./personal-year').default;
      return (
        <div ref={ref} {...props}>
          <PersonalYear />
        </div>
      );
    })),
    []
  );

  const TAB_LIST = useMemo(() => ([
    { key: 'overview', label: 'Overview', Panel: OverviewPanel },
    { key: 'history', label: 'History & Origins', Panel: HistoryPanel },
    { key: 'system', label: 'Number System', Panel: SystemPanel },
    { key: 'calculator', label: 'Calculator', Panel: CalculatorPanel },
    { key: 'comparison', label: 'Chaldean vs Pythagorean', Panel: ComparisonPanel },
    { key: 'gematria', label: 'Gematria', Panel: GematriaPanel },
    { key: 'pythagorean', label: 'Pythagorean', Panel: PythagoreanPanel },
    { key: 'abjad', label: 'Abjad', Panel: AbjadPanel },
    { key: 'chinese', label: 'Chinese', Panel: ChinesePanel },
    { key: 'vedic', label: 'Vedic', Panel: VedicPanel },
    { key: 'angel-numbers', label: 'Angel Numbers', Panel: AngelNumbersPanel },
    { key: 'personal-year', label: 'Personal Year/Month/Day', Panel: PersonalYearPanel },
  ]) as { key: TabKey; label: string; Panel: React.MemoExoticComponent<React.ForwardRefExoticComponent<any>>; }[], []);

  // --- State ---
  const defaultTabs: TabKey[] = useMemo(() => TAB_LIST.map(t => t.key), [TAB_LIST]);
  const [visibleTabs, setVisibleTabs] = useState<TabKey[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('chaldeanTabs');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.every(k => defaultTabs.includes(k))) {
            return parsed;
          }
        } catch {}
      }
    }
    return defaultTabs;
  });
  const [activeTab, setActiveTab] = useState<TabKey>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      if (defaultTabs.includes(hash as TabKey)) return hash as TabKey;
    }
    return 'overview';
  });

  // --- Persistence ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('chaldeanTabs', JSON.stringify(visibleTabs));
    }
  }, [visibleTabs]);

  // --- URL Hash Sync ---
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      if (visibleTabs.includes(hash as TabKey)) {
        setActiveTab(hash as TabKey);
      }
    }
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (visibleTabs.includes(hash as TabKey)) {
        setActiveTab(hash as TabKey);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleTabs]);

  // --- Keyboard Shortcuts (Ctrl+1, Ctrl+2, ...) ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
        const idx = parseInt(e.key, 10) - 1;
        if (!isNaN(idx) && idx >= 0 && idx < visibleTabs.length) {
          setActiveTab(visibleTabs[idx]);
          e.preventDefault();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [visibleTabs]);

  // --- Tab Button Refs ---
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // --- Tab Close ---
  const handleCloseTab = useCallback((key: TabKey) => {
    setVisibleTabs(prev => {
      const newTabs = prev.filter(k => k !== key);
      if (activeTab === key && newTabs.length > 0) {
        setActiveTab(newTabs[0]);
      }
      return newTabs;
    });
  }, [activeTab]);

  // --- Tab Drag & Drop ---
  const dragTabIdx = useRef<number | null>(null);
  const handleDragStart = (idx: number) => {
    dragTabIdx.current = idx;
  };
  const handleDragOver = (idx: number, e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  const handleDrop = (idx: number) => {
    if (dragTabIdx.current === null || dragTabIdx.current === idx) return;
    setVisibleTabs(prev => {
      const newTabs = [...prev];
      const [removed] = newTabs.splice(dragTabIdx.current!, 1);
      newTabs.splice(idx, 0, removed);
      return newTabs;
    });
    dragTabIdx.current = null;
  };
  const handleDragEnd = () => {
    dragTabIdx.current = null;
  };

  // --- Reset Tabs ---
  const handleResetTabs = () => {
    setVisibleTabs(defaultTabs);
    setActiveTab('overview');
    if (typeof window !== 'undefined') {
      window.location.hash = '#overview';
    }
  };

  // --- Tab Click ---
  const handleTabClick = useCallback((key: TabKey, e: React.MouseEvent<HTMLButtonElement>) => {
    (window as any).__lastTabEvent = e;
    setActiveTab(key);
    // Analytics event
    trackTabChange(key);
    // Update URL hash
    if (typeof window !== 'undefined') {
      window.location.hash = `#${key}`;
    }
    // Focus the tab panel heading after click
    setTimeout(() => {
      const panel = document.getElementById(`tabpanel-${key}`);
      if (panel) {
        const heading = panel.querySelector('h2');
        if (heading) (heading as HTMLElement).focus();
      }
    }, 0);
  }, []);

  // --- Tab Keyboard Navigation ---
  const handleTabKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    (window as any).__lastTabEvent = e;
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    let nextIdx = idx;
    if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + visibleTabs.length) % visibleTabs.length;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % visibleTabs.length;
    if (e.key === 'Home') nextIdx = 0;
    if (e.key === 'End') nextIdx = visibleTabs.length - 1;
    setActiveTab(visibleTabs[nextIdx]);
    setTimeout(() => {
      tabButtonRefs.current[nextIdx]?.focus();
    }, 0);
  }, [visibleTabs]);

  // --- Panel Ref for Focus ---
  const getPanelRef = useCallback((tabKey: TabKey) => (el: HTMLDivElement | null) => {
    if (el && activeTab === tabKey) {
      const lastEvent = (window as any).__lastTabEvent;
      if (lastEvent && lastEvent.type === 'keydown') {
        const heading = el.querySelector('h2');
        if (heading) (heading as HTMLElement).focus();
      }
    }
  }, [activeTab]);

  // Import summary chart lazily to avoid hydration mismatch
  const NumerologySummaryChart = React.useMemo(() => {
    return require('./NumerologySummaryChart').default;
  }, []);

  return (
    <UserInfoProvider>
      <PartnerInfoProvider>
        <UserInfoForm />
        <div className="max-w-6xl mx-auto">
          <h1 className="section-title bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
            Chaldean Numerology
          </h1>

          {/* Summary Chart always visible at the top */}
          <NumerologySummaryChart />

          {/* Partner/Friend Info, Compatibility, Name Change Analysis, Cycle Forecast, and Interactive Calculator */}
          <div className="my-6 space-y-10">
            <section aria-labelledby="partner-info-heading">
              <h2 id="partner-info-heading" className="text-xl font-bold mb-2">Partner/Friend Compatibility</h2>
              <PartnerInfoForm />
              <CompatibilityChart />
            </section>
            <Separator className="my-6" />
            <section aria-labelledby="name-change-heading">
              <h2 id="name-change-heading" className="text-xl font-bold mb-2">Name Change Analysis</h2>
              <NameChangeAnalysis />
            </section>
            <Separator className="my-6" />
            <section aria-labelledby="cycle-forecast-heading">
              <h2 id="cycle-forecast-heading" className="text-xl font-bold mb-2">Cycle Forecast</h2>
              <CycleForecast />
            </section>
            <Separator className="my-6" />
            <section aria-labelledby="interactive-calculator-heading">
              <h2 id="interactive-calculator-heading" className="text-xl font-bold mb-2">Interactive Calculator</h2>
              <InteractiveCalculator />
            </section>
          </div>

          <div
            className="mb-8 flex flex-wrap gap-2 items-center"
            role="tablist"
            aria-orientation="horizontal"
            aria-label="Chaldean Numerology Tabs"
          >
            {/* Reset Tabs Button */}
            <button
              onClick={handleResetTabs}
              className="ml-4 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm border border-gray-300"
              aria-label="Reset tabs to default order"
              type="button"
            >
              Reset Tabs
            </button>
          </div>

          {/* Render only the active tab panel as a memoized component, with fade-in animation */}
          {visibleTabs.map((tabKey: TabKey) => {
            if (activeTab !== tabKey) return null;
            const tab = TAB_LIST.find((t) => t.key === tabKey)!;
            const Panel = tab.Panel;
            return (
              <div
                key={tab.key}
                style={{ animation: 'fadein 0.4s' }}
              >
                <Panel
                  id={`tabpanel-${tab.key}`}
                  ariaLabelledBy={`tab-${tab.key}`}
                  hidden={activeTab !== tab.key}
                  ariaHidden={activeTab !== tab.key}
                  tabIndex={0}
                  className="section-card"
                  ref={getPanelRef(tab.key)}
                />
              </div>
            );
          })}

          {/* Simple fade-in animation for tab panels */}
          <style>{`
            @keyframes fadein {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
        </div>
      </PartnerInfoProvider>
    </UserInfoProvider>
  );
}

export default ChaldeanPage;
