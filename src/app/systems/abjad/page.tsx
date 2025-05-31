import React from 'react';
import AbjadPage from '../../chaldean/abjad';
import { UserInfoProvider } from '../../chaldean/UserInfoContext';

export default function AbjadSystemPage() {
  return (
    <UserInfoProvider>
      <AbjadPage />
    </UserInfoProvider>
  );
}
