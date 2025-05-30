// src/app/chaldean/personal-year.tsx
'use client';

import React from 'react';
import { useUserInfo } from './UserInfoContext';
import {
  calculatePersonalYear,
  calculatePersonalMonth,
  calculatePersonalDay
} from './numerology-utils';
import NumberMeaningCard from './NumberMeaningCard';
export default function PersonalYearPage() {
  const { userInfo } = useUserInfo();
  const { birthdate } = userInfo;
  const now = new Date(2025, 4, 29); // May 29, 2025 (0-based month)
  const personalYear = birthdate ? calculatePersonalYear(birthdate, now) : undefined;
  const personalMonth = birthdate && typeof personalYear === 'number' ? calculatePersonalMonth(personalYear, now) : undefined;
  const personalDay = birthdate && typeof personalMonth === 'number' ? calculatePersonalDay(personalMonth, now) : undefined;
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="section-title bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-green-300 mb-6">
        Personal Year, Month, and Day Numbers
      </h1>
      <div className="section-card mb-8">
        <h2 className="text-xl font-bold mb-4">Your Personal Year, Month, and Day</h2>
        <div className="mb-6 space-y-4">
          <div>
            <div className="font-semibold">Personal Year:</div>
            {typeof personalYear === 'number' ? (
              <NumberMeaningCard number={personalYear} label="Personal Year" />
            ) : (
              <span className="text-gray-400">(enter birthdate)</span>
            )}
          </div>
          <div>
            <div className="font-semibold">Personal Month:</div>
            {typeof personalMonth === 'number' ? (
              <NumberMeaningCard number={personalMonth} label="Personal Month" />
            ) : (
              <span className="text-gray-400">(enter birthdate)</span>
            )}
          </div>
          <div>
            <div className="font-semibold">Personal Day:</div>
            {typeof personalDay === 'number' ? (
              <NumberMeaningCard number={personalDay} label="Personal Day" />
            ) : (
              <span className="text-gray-400">(enter birthdate)</span>
            )}
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="mb-4">
          In numerology, your Personal Year, Month, and Day numbers are calculated from your birth date and the current date. They are used to forecast trends, opportunities, and challenges for specific periods in your life.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Personal Year reveals the theme for the year</li>
          <li>Personal Month and Day give more specific guidance</li>
          <li>Helps with planning, decision-making, and self-awareness</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">How to Calculate</h3>
        <ul className="list-decimal pl-6 mb-4 space-y-2">
          <li><strong>Personal Year:</strong> Add your birth month + birth day + current year, then reduce to a single digit.</li>
          <li><strong>Personal Month:</strong> Add your Personal Year + current month, then reduce to a single digit.</li>
          <li><strong>Personal Day:</strong> Add your Personal Month + current day, then reduce to a single digit.</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Worked Example</h3>
        <p className="mb-2"><strong>Birthdate:</strong> June 15</p>
        <p className="mb-2"><strong>Current Date:</strong> May 29, 2025</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Personal Year: 6 (June) + 15 (day) + 2025 = 6 + 1 + 5 + 2 + 0 + 2 + 5 = 21 → 2 + 1 = 3</li>
          <li>Personal Month: 3 (Personal Year) + 5 (May) = 8</li>
          <li>Personal Day: 8 (Personal Month) + 2 + 9 = 19 → 1 + 9 = 10 → 1 + 0 = 1</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Interpretation Table</h3>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border text-center">
            <thead>
              <tr>
                <th className="border px-2 py-1">Number</th>
                <th className="border px-2 py-1">Theme</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border px-2 py-1">1</td><td className="border px-2 py-1">New beginnings, independence</td></tr>
              <tr><td className="border px-2 py-1">2</td><td className="border px-2 py-1">Cooperation, patience</td></tr>
              <tr><td className="border px-2 py-1">3</td><td className="border px-2 py-1">Creativity, joy, self-expression</td></tr>
              <tr><td className="border px-2 py-1">4</td><td className="border px-2 py-1">Stability, hard work</td></tr>
              <tr><td className="border px-2 py-1">5</td><td className="border px-2 py-1">Change, freedom, adventure</td></tr>
              <tr><td className="border px-2 py-1">6</td><td className="border px-2 py-1">Responsibility, family, harmony</td></tr>
              <tr><td className="border px-2 py-1">7</td><td className="border px-2 py-1">Reflection, spirituality</td></tr>
              <tr><td className="border px-2 py-1">8</td><td className="border px-2 py-1">Power, achievement</td></tr>
              <tr><td className="border px-2 py-1">9</td><td className="border px-2 py-1">Completion, letting go</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-xl font-semibold mb-2 mt-6">Further Reading</h3>
        <ul className="list-disc pl-6 mb-2">
          <li><a href="https://www.numerology.com/numerology-numbers/personal-year" className="underline text-blue-500" target="_blank" rel="noopener noreferrer">Numerology.com: Personal Year Numbers</a></li>
          <li><a href="https://www.numerology.com/numerology-numbers/personal-month" className="underline text-blue-500" target="_blank" rel="noopener noreferrer">Numerology.com: Personal Month Numbers</a></li>
        </ul>
      </div>
    </div>
  );
}
