
import React from 'react';
import PersonalYearPage from '../../chaldean/personal-year';
import { UserInfoProvider } from '../../chaldean/UserInfoContext';

export default function PersonalYearSystemPage() {
  return (
    <UserInfoProvider>
      <PersonalYearPage />
    </UserInfoProvider>
  );
}
