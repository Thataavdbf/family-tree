// src/app/chaldean/CycleForecast.tsx
import React, { useMemo } from 'react';
import { useUserInfo } from './UserInfoContext';
import {
  calculatePersonalYear,
  calculatePersonalMonth,
  calculatePersonalDay
} from './numerology-utils';
import NumberMeaningCard from './NumberMeaningCard';

const now = new Date(2025, 4, 29); // May 29, 2025

function getYearsRange(center: number, before = 2, after = 2) {
  return Array.from({ length: before + after + 1 }, (_, i) => center - before + i);
}

export default function CycleForecast() {
  const { userInfo } = useUserInfo();
  const { birthdate } = userInfo;
  const thisYear = now.getFullYear();
  const years = getYearsRange(thisYear, 2, 2);

  // Build forecast for 5 years (past, present, future)
  const forecast = useMemo(() => {
    if (!birthdate) return [];
    return years.map(year => {
      const date = new Date(year, now.getMonth(), now.getDate());
      const personalYear = calculatePersonalYear(birthdate, date);
      const personalMonth = calculatePersonalMonth(personalYear, date);
      const personalDay = calculatePersonalDay(personalMonth, date);
      return { year, personalYear, personalMonth, personalDay };
    });
  }, [birthdate, years]);

  return (
    <div className="w-full max-w-3xl mx-auto my-8 p-4 bg-white rounded-lg shadow-lg border">
      <h2 className="text-2xl font-bold mb-4 text-center">Cycle Forecast</h2>
      {!birthdate ? (
        <div className="text-gray-500">Enter your birthdate to see your personal year, month, and day cycles.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-center mb-4">
            <thead>
              <tr>
                <th className="border px-2 py-1">Year</th>
                <th className="border px-2 py-1">Personal Year</th>
                <th className="border px-2 py-1">Personal Month</th>
                <th className="border px-2 py-1">Personal Day</th>
              </tr>
            </thead>
            <tbody>
              {forecast.map(({ year, personalYear, personalMonth, personalDay }) => (
                <tr key={year} className={year === thisYear ? 'bg-blue-50 font-bold' : ''}>
                  <td className="border px-2 py-1">{year}</td>
                  <td className="border px-2 py-1"><NumberMeaningCard number={personalYear} label="" /></td>
                  <td className="border px-2 py-1"><NumberMeaningCard number={personalMonth} label="" /></td>
                  <td className="border px-2 py-1"><NumberMeaningCard number={personalDay} label="" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="text-xs text-gray-500 mt-2">Current year is highlighted. Each number card is clickable for details and recommendations.</div>
    </div>
  );
}
