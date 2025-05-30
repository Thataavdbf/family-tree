// src/app/chaldean/PartnerInfoContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PartnerInfo {
  name: string;
  birthdate: string;
}

interface PartnerInfoContextType {
  partnerInfo: PartnerInfo;
  setPartnerInfo: (info: PartnerInfo) => void;
}

const defaultPartnerInfo: PartnerInfo = {
  name: '',
  birthdate: '',
};

const PartnerInfoContext = createContext<PartnerInfoContextType | undefined>(undefined);

export const PartnerInfoProvider = ({ children }: { children: ReactNode }) => {
  const [partnerInfo, setPartnerInfo] = useState<PartnerInfo>(defaultPartnerInfo);
  return (
    <PartnerInfoContext.Provider value={{ partnerInfo, setPartnerInfo }}>
      {children}
    </PartnerInfoContext.Provider>
  );
};

export function usePartnerInfo() {
  const ctx = useContext(PartnerInfoContext);
  if (!ctx) throw new Error('usePartnerInfo must be used within a PartnerInfoProvider');
  return ctx;
}
