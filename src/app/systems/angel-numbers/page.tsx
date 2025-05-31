
import React from 'react';
import AngelNumbersPage from '../../chaldean/angel-numbers';
import { UserInfoProvider } from '../../chaldean/UserInfoContext';

export default function AngelNumbersSystemPage() {
  return (
    <UserInfoProvider>
      <AngelNumbersPage />
    </UserInfoProvider>
  );
}
