import React from 'react';
import PythagoreanPage from '../../chaldean/pythagorean';
import { UserInfoProvider } from '../../chaldean/UserInfoContext';

export default function PythagoreanSystemPage() {
  return (
    <UserInfoProvider>
      <PythagoreanPage />
    </UserInfoProvider>
  );
}
