// src/app/chaldean/UserInfoContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserInfo = {
  name: string;
  birthdate: string; // MM/DD/YYYY
};

const defaultUserInfo: UserInfo = {
  name: '',
  birthdate: '',
};

const UserInfoContext = createContext<{
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
} | undefined>(undefined);

export function UserInfoProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfoState] = useState<UserInfo>(defaultUserInfo);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('userInfo') : null;
    if (saved) {
      try {
        setUserInfoState(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const setUserInfo = (info: UserInfo) => {
    setUserInfoState(info);
    if (typeof window !== 'undefined') {
      localStorage.setItem('userInfo', JSON.stringify(info));
    }
  };

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfo() {
  const ctx = useContext(UserInfoContext);
  if (!ctx) throw new Error('useUserInfo must be used within UserInfoProvider');
  return ctx;
}
