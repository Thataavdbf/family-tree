// src/app/chaldean/NumerologySummaryChart.tsx
import React from 'react';
import { useUserInfo } from './UserInfoContext';
import {
  calculateLifePath,
  calculatePythagoreanNumber,
  calculatePythagoreanSoulUrge,
  calculatePythagoreanPersonality,
  calculatePersonalYear,
  calculatePersonalMonth,
  calculatePersonalDay
} from './numerology-utils';

import NumberMeaningCard from './NumberMeaningCard';
import { getWesternZodiac, getChineseZodiac } from './zodiac-utils';

const now = new Date(2025, 4, 29); // May 29, 2025

export const NumerologySummaryChart: React.FC = () => {
  const { userInfo } = useUserInfo();
  const { name, birthdate } = userInfo;

  // Core numbers
  const lifePath = calculateLifePath(birthdate);
  const destiny = calculatePythagoreanNumber(name);
  const soulUrge = calculatePythagoreanSoulUrge(name);
  const personality = calculatePythagoreanPersonality(name);
  // Personal cycle
  const personalYear = birthdate ? calculatePersonalYear(birthdate, now) : undefined;
  const personalMonth = birthdate && typeof personalYear === 'number' ? calculatePersonalMonth(personalYear, now) : undefined;
  const personalDay = birthdate && typeof personalMonth === 'number' ? calculatePersonalDay(personalMonth, now) : undefined;

  // Zodiac
  const western = getWesternZodiac(birthdate);
  const chinese = getChineseZodiac(birthdate);

  return (
    <div className="w-full max-w-2xl mx-auto my-8 p-4 bg-white rounded-lg shadow-lg border">
      <h2 className="text-2xl font-bold mb-4 text-center">Numerology Summary Chart</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-4 justify-center items-center">
        {western && (
          <div className="flex flex-col items-center p-2 border rounded bg-blue-50 min-w-[140px]">
            <span className="text-3xl">{western.symbol}</span>
            <span className="font-bold">{western.sign}</span>
            <span className="text-xs text-gray-500">{western.range}</span>
            <span className="text-sm text-gray-700 mt-1">{western.description}</span>
          </div>
        )}
        {chinese && (
          <div className="flex flex-col items-center p-2 border rounded bg-yellow-50 min-w-[140px]">
            <span className="text-3xl">{chinese.symbol}</span>
            <span className="font-bold">{chinese.animal} (Chinese Zodiac)</span>
            <span className="text-sm text-gray-700 mt-1">{chinese.description}</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberMeaningCard number={lifePath} label="Life Path" />
        <NumberMeaningCard number={destiny} label="Destiny (Expression)" />
        <NumberMeaningCard number={soulUrge} label="Soul Urge" />
        <NumberMeaningCard number={personality} label="Personality" />
        <NumberMeaningCard number={personalYear ?? ''} label="Personal Year" />
        <NumberMeaningCard number={personalMonth ?? ''} label="Personal Month" />
        <NumberMeaningCard number={personalDay ?? ''} label="Personal Day" />
      </div>
    </div>
  );
};

export default NumerologySummaryChart;
