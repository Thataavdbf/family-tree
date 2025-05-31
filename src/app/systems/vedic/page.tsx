
import React from 'react';
import VedicNumerologyPage from '../../chaldean/vedic';
import { UserInfoProvider } from '../../chaldean/UserInfoContext';

export default function VedicSystemPage() {
  return (
    <UserInfoProvider>
      <VedicNumerologyPage />
    </UserInfoProvider>
  );
}
