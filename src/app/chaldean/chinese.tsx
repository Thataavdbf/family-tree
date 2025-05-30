// src/app/chaldean/chinese.tsx
'use client';

import React from 'react';
import { useUserInfo } from './UserInfoContext';
import NumberMeaningCard from './NumberMeaningCard';

export default function ChineseNumerologyPage() {
  const { userInfo } = useUserInfo();
  const { birthdate } = userInfo;
  // Lo Shu Grid calculation: count digits 1-9 in birthdate
  const digitCounts: Record<string, number> = {};
  if (birthdate) {
    const digits = birthdate.replace(/[^1-9]/g, '').split('');
    for (let d = 1; d <= 9; d++) {
      digitCounts[d] = digits.filter(x => x === String(d)).length;
    }
  }
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="section-title bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-yellow-300 mb-6">
        Chinese Numerology
      </h1>
      <div className="section-card mb-8">
        <h2 className="text-xl font-bold mb-4">Your Lo Shu Grid</h2>
        {birthdate ? (
          <>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-[200px] border text-center mx-auto">
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">{digitCounts[4]}</td>
                    <td className="border px-4 py-2">{digitCounts[9]}</td>
                    <td className="border px-4 py-2">{digitCounts[2]}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">{digitCounts[3]}</td>
                    <td className="border px-4 py-2">{digitCounts[5]}</td>
                    <td className="border px-4 py-2">{digitCounts[7]}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">{digitCounts[8]}</td>
                    <td className="border px-4 py-2">{digitCounts[1]}</td>
                    <td className="border px-4 py-2">{digitCounts[6]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1,2,3,4,5,6,7,8,9].map(n => (
                digitCounts[n] > 0 ? (
                  <NumberMeaningCard key={n} number={n} label={`Lo Shu: ${n}`} />
                ) : null
              ))}
            </div>
          </>
        ) : (
          <div className="mb-6 text-gray-400">(enter birthdate)</div>
        )}
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="mb-4">
          Chinese numerology interprets numbers based on their pronunciation, symbolism, and traditional beliefs. It is deeply woven into Chinese culture, influencing everything from phone numbers to addresses and wedding dates. The Lo Shu Grid and the concept of lucky/unlucky numbers are central to this system.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Numbers are considered lucky or unlucky based on their sound and meaning</li>
          <li>The Lo Shu Grid is used for personality analysis</li>
          <li>Widely used in Feng Shui and daily life decisions</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">The Lo Shu Grid</h3>
        <p className="mb-4">The Lo Shu Grid is a 3x3 magic square used to analyze a person&apos;s birth date. Each number from 1 to 9 is placed in the grid based on its occurrence in the birth date.</p>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-[200px] border text-center mx-auto">
            <tbody>
              <tr>
                <td className="border px-4 py-2">4</td>
                <td className="border px-4 py-2">9</td>
                <td className="border px-4 py-2">2</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">3</td>
                <td className="border px-4 py-2">5</td>
                <td className="border px-4 py-2">7</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">8</td>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">6</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-xl font-semibold mb-2 mt-6">How to Calculate</h3>
        <ul className="list-decimal pl-6 mb-4 space-y-2">
          <li>Write out your full birth date in digits (e.g., 12/14/1990 → 1,2,1,4,1,9,9,0)</li>
          <li>Count how many times each digit (1–9) appears</li>
          <li>Fill the Lo Shu Grid with the count for each number</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Worked Example</h3>
        <p className="mb-2"><strong>Birthdate:</strong> 12/14/1990</p>
        <ul className="list-disc pl-6 mb-4">
          <li>1 appears 3 times, 2 appears 1 time, 4 appears 1 time, 9 appears 2 times, 0 is ignored</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Interpretation</h3>
        <p className="mb-4">Each number in the grid represents a personality trait. Missing numbers indicate areas for growth. For example, 1 = leadership, 2 = cooperation, 3 = creativity, etc.</p>
        <h3 className="text-xl font-semibold mb-2 mt-6">Lucky and Unlucky Numbers</h3>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Lucky:</strong> 8 (wealth), 6 (smooth progress), 9 (longevity)</li>
          <li><strong>Unlucky:</strong> 4 (death), 7 (loss), 5 (nothingness)</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Cultural/Spiritual Significance</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Numbers influence major life decisions in Chinese culture</li>
          <li>Used in Feng Shui to harmonize environments</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Further Reading</h3>
        <ul className="list-disc pl-6 mb-2">
          <li><a href="https://en.wikipedia.org/wiki/Chinese_numerology" className="underline text-blue-500" target="_blank" rel="noopener noreferrer">Wikipedia: Chinese numerology</a></li>
          <li><a href="https://www.yourchinesenumber.com/" className="underline text-blue-500" target="_blank" rel="noopener noreferrer">YourChineseNumber.com</a></li>
        </ul>
      </div>
    </div>
  );
}
