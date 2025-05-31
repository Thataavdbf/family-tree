"use client";
import React from 'react';
import InteractiveCalculator from '../../chaldean/InteractiveCalculator';
import { UserInfoProvider } from '../../chaldean/UserInfoContext';
import UserInfoForm from '../../chaldean/UserInfoForm';
import { PartnerInfoProvider } from '../../chaldean/PartnerInfoContext';
import PartnerInfoForm from '../../chaldean/PartnerInfoForm';
import CompatibilityChart from '../../chaldean/CompatibilityChart';
import NameChangeAnalysis from '../../chaldean/NameChangeAnalysis';
import CycleForecast from '../../chaldean/CycleForecast';
import NumerologySummaryChart from '../../chaldean/NumerologySummaryChart';

export default function ChaldeanSystemPage() {
  return (
    <UserInfoProvider>
      <PartnerInfoProvider>
        <UserInfoForm />
        <div className="max-w-6xl mx-auto">
          <h1 className="section-title bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
            Chaldean Numerology
          </h1>
          <NumerologySummaryChart />
          <div className="my-6 space-y-10">
            <section aria-labelledby="partner-info-heading">
              <h2 id="partner-info-heading" className="text-xl font-bold mb-2">Partner/Friend Compatibility</h2>
              <PartnerInfoForm />
              <CompatibilityChart />
            </section>
            <section aria-labelledby="name-change-heading">
              <h2 id="name-change-heading" className="text-xl font-bold mb-2">Name Change Analysis</h2>
              <NameChangeAnalysis />
            </section>
            <section aria-labelledby="cycle-forecast-heading">
              <h2 id="cycle-forecast-heading" className="text-xl font-bold mb-2">Cycle Forecast</h2>
              <CycleForecast />
            </section>
            <section aria-labelledby="interactive-calculator-heading">
              <h2 id="interactive-calculator-heading" className="text-xl font-bold mb-2">Interactive Calculator</h2>
              <InteractiveCalculator />
            </section>
          </div>
        </div>
      </PartnerInfoProvider>
    </UserInfoProvider>
  );
}
