// src/app/chaldean/TabButton.tsx
import React from 'react';

import type { TabKey } from './page';

interface TabButtonProps {
  tabKey: TabKey;
  label: string;
  isActive: boolean;
  idx: number;
  visibleTabs: TabKey[];
  tabButtonRef: (el: HTMLButtonElement | null) => void;
  onClick: (key: TabKey, e: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => void;
  onClose: (key: TabKey) => void;
}

export const TabButton: React.FC<TabButtonProps> = ({
  tabKey,
  label,
  isActive,
  idx,
  visibleTabs,
  tabButtonRef,
  onClick,
  onKeyDown,
  onClose,
}) => (
  <div
    style={{ position: 'relative', display: 'inline-block' }}
    draggable={visibleTabs.length > 1}
    tabIndex={-1}
  >
    <button
      id={`tab-${tabKey}`}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${tabKey}`}
      tabIndex={isActive ? 0 : -1}
      className={`tab-button${isActive ? ' active' : ''}`}
      onClick={e => onClick(tabKey, e)}
      onKeyDown={e => onKeyDown(e, idx)}
      ref={tabButtonRef}
      style={{ cursor: visibleTabs.length > 1 ? 'grab' : undefined }}
      draggable={false}
    >
      {label}
      {tabKey === 'comparison' && (
        <span className="ml-2 inline-block bg-pink-500 text-white text-xs rounded-full px-2 align-middle">
          {visibleTabs.length}
        </span>
      )}
    </button>
    {idx > 0 && (
      <button
        aria-label={`Close ${label} tab`}
        onClick={() => onClose(tabKey)}
        style={{
          position: 'absolute',
          top: 2,
          right: 2,
          background: 'transparent',
          border: 'none',
          color: '#888',
          cursor: 'pointer',
          fontSize: 14,
          padding: 0,
          lineHeight: 1,
        }}
        tabIndex={-1}
        title={`Close ${label} tab`}
      >
        ×
      </button>
    )}
  </div>
);
