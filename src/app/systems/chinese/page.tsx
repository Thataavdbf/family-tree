
import React from 'react';
import ChineseNumerologyPage from '../../chaldean/chinese';
import { UserInfoProvider } from '../../chaldean/UserInfoContext';

export default function ChineseSystemPage() {
  return (
    <UserInfoProvider>
      <ChineseNumerologyPage />
    </UserInfoProvider>
  );
}
