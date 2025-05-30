// src/app/chaldean/vedic.tsx
'use client';

import React from 'react';
import { useUserInfo } from './UserInfoContext';
import { calculateLifePath, calculatePythagoreanNumber } from './numerology-utils';
import NumberMeaningCard from './NumberMeaningCard';

export default function VedicNumerologyPage() {
  const { userInfo } = useUserInfo();
  const { name, birthdate } = userInfo;
  // Vedic system uses similar mapping as Chaldean/Pythagorean for demo
  const vedicNameNumber = calculatePythagoreanNumber(name);
  const vedicLifePath = calculateLifePath(birthdate);
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="section-title bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-yellow-300 mb-6">
        Vedic Numerology (Indian Numerology)
      </h1>
      <div className="section-card mb-8">
        <h2 className="text-xl font-bold mb-4">Your Vedic Numbers</h2>
        <div className="mb-6 space-y-4">
          <div>
            <div className="font-semibold">Name Number:</div>
            {vedicNameNumber ? (
              <NumberMeaningCard number={vedicNameNumber} label="Name Number" />
            ) : (
              <span className="text-gray-400">(enter name)</span>
            )}
          </div>
          <div>
            <div className="font-semibold">Life Path:</div>
            {vedicLifePath ? (
              <NumberMeaningCard number={vedicLifePath} label="Life Path" />
            ) : (
              <span className="text-gray-400">(enter birthdate)</span>
            )}
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="mb-4">
          Vedic numerology, also known as Indian numerology, is based on ancient Indian traditions and is closely linked to Vedic astrology. It assigns numbers to letters and uses birth dates to reveal personality traits, life purpose, and destiny. Each number is also associated with a planet.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Uses a similar letter-to-number mapping as Chaldean</li>
          <li>Numbers are linked to planets and karma</li>
          <li>Often used with Vedic astrology for holistic analysis</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Vedic Letter-Number Table</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-center mb-4">
            <thead>
              <tr>
                <th className="border px-2 py-1">Letter</th>
                <th className="border px-2 py-1">Value</th>
                <th className="border px-2 py-1">Planet</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['A', 1, 'Sun'], ['I', 1, 'Sun'], ['J', 1, 'Sun'], ['Q', 1, 'Sun'], ['Y', 1, 'Sun'],
                ['B', 2, 'Moon'], ['K', 2, 'Moon'], ['R', 2, 'Moon'],
                ['C', 3, 'Jupiter'], ['G', 3, 'Jupiter'], ['L', 3, 'Jupiter'], ['S', 3, 'Jupiter'],
                ['D', 4, 'Rahu'], ['M', 4, 'Rahu'], ['T', 4, 'Rahu'],
                ['E', 5, 'Mercury'], ['H', 5, 'Mercury'], ['N', 5, 'Mercury'], ['X', 5, 'Mercury'],
                ['U', 6, 'Venus'], ['V', 6, 'Venus'], ['W', 6, 'Venus'],
                ['O', 7, 'Ketu'], ['Z', 7, 'Ketu'],
                ['F', 8, 'Saturn'], ['P', 8, 'Saturn']
              ].map(([letter, value, planet]) => (
                <tr key={letter}>
                  <td className="border px-2 py-1 font-bold text-lg">{letter}</td>
                  <td className="border px-2 py-1">{value}</td>
                  <td className="border px-2 py-1">{planet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-xl font-semibold mb-2 mt-6">How to Calculate</h3>
        <ul className="list-decimal pl-6 mb-4 space-y-2">
          <li>Write out your full birth name</li>
          <li>Assign each letter its Vedic value using the table above</li>
          <li>Add the values together and reduce to a single digit</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Worked Example</h3>
        <p className="mb-2"><strong>Name:</strong> RAVI</p>
        <ul className="list-disc pl-6 mb-4">
          <li>R(2) + A(1) + V(6) + I(1) = 10 → 1 + 0 = 1</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Interpretation</h3>
        <p className="mb-4">Each number is associated with a planet and has a unique meaning. For example, 1 = Sun (leadership), 2 = Moon (emotions), 3 = Jupiter (wisdom), etc.</p>
        <h3 className="text-xl font-semibold mb-2 mt-6">Cultural/Spiritual Significance</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Used to determine auspicious names and dates</li>
          <li>Believed to influence karma and destiny</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Further Reading</h3>
        <ul className="list-disc pl-6 mb-2">
          <li><a href="https://en.wikipedia.org/wiki/Indian_numerology" className="underline text-blue-500" target="_blank" rel="noopener noreferrer">Wikipedia: Indian numerology</a></li>
          <li><a href="https://www.astrosage.com/numerology/vedic-numerology.asp" className="underline text-blue-500" target="_blank" rel="noopener noreferrer">AstroSage: Vedic Numerology</a></li>
        </ul>
      </div>
    </div>
  );
}
