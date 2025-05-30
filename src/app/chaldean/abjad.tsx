// src/app/chaldean/abjad.tsx
'use client';

import React from 'react';
import { useUserInfo } from './UserInfoContext';
import NumberMeaningCard from './NumberMeaningCard';

export default function AbjadPage() {
  const { userInfo } = useUserInfo();
  const { name } = userInfo;
  // Simple Abjad calculation (Arabic letters only, demo)
  const abjadTable: Record<string, number> = {
    'ا': 1, 'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'و': 6, 'ز': 7, 'ح': 8, 'ط': 9,
    'ي': 10, 'ك': 20, 'ل': 30, 'م': 40, 'ن': 50, 'س': 60, 'ع': 70, 'ف': 80, 'ص': 90,
    'ق': 100, 'ر': 200, 'ش': 300, 'ت': 400, 'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000
  };
  let abjadSum = 0;
  if (name) {
    for (const char of name) {
      if (abjadTable[char]) abjadSum += abjadTable[char];
    }
  }
  return (
    <div className={'max-w-3xl mx-auto py-8'}>
      <h1 className={'section-title bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 mb-6'}>
        Abjad Numerals (Arabic Numerology)
      </h1>
      <div className={'section-card mb-8'}>
        <h2 className={'text-xl font-bold mb-4'}>Your Abjad Value</h2>
        <div className={'mb-6'}>
          {name ? (
            <>
              <div className={'font-bold text-lg mb-2'}>{abjadSum}</div>
              {/* Show meaning if available for the reduced value */}
              <NumberMeaningCard number={abjadSum % 10 || abjadSum} label={'Abjad (reduced)'} />
            </>
          ) : <span className={'text-gray-400'}>(enter Arabic name)</span>}
        </div>
        <h2 className={'text-2xl font-semibold mb-4'}>Overview</h2>
        <p className={'mb-4'}>
          The Abjad numerals are a decimal numeral system in which the 28 letters of the Arabic alphabet are assigned numerical values. This system is used in Islamic numerology and for assigning mystical meanings to words and phrases in Arabic. It is especially important in Sufism and Islamic mysticism.
        </p>
        <ul className={'list-disc pl-6 mb-4 space-y-2'}>
          <li>Each Arabic letter has a numeric value</li>
          <li>Used for divination, talismans, and interpreting sacred texts</li>
          <li>Still used in some Islamic cultures today</li>
        </ul>
        <h3 className={'text-xl font-semibold mb-2 mt-6'}>Abjad Letter-Number Table</h3>
        <div className={'overflow-x-auto'}>
          <table className={'min-w-full border text-center mb-4'}>
            <thead>
              <tr>
                <th className="border px-2 py-1">Letter</th>
                <th className="border px-2 py-1">Value</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['ا', 1], ['ب', 2], ['ج', 3], ['د', 4], ['ه', 5], ['و', 6], ['ز', 7], ['ح', 8], ['ط', 9],
                ['ي', 10], ['ك', 20], ['ل', 30], ['م', 40], ['ن', 50], ['س', 60], ['ع', 70], ['ف', 80], ['ص', 90],
                ['ق', 100], ['ر', 200], ['ش', 300], ['ت', 400], ['ث', 500], ['خ', 600], ['ذ', 700], ['ض', 800], ['ظ', 900], ['غ', 1000]
              ].map(([letter, value]) => (
                <tr key={letter}>
                  <td className="border px-2 py-1 font-bold text-lg">{letter}</td>
                  <td className="border px-2 py-1">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-xl font-semibold mb-2 mt-6">How to Calculate</h3>
        <ul className="list-decimal pl-6 mb-4 space-y-2">
          <li>Write out the Arabic word or phrase.</li>
          <li>Assign each letter its Abjad value using the table above.</li>
          <li>Add the values together to get the total.</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Worked Example</h3>
        <p className="mb-2"><strong>Example:</strong> كلمة (kalima = "word")</p>
        <ul className="list-disc pl-6 mb-4">
          <li>ك (20) + ل (30) + م (40) + ة (400) = 490</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Interpretation</h3>
        <p className="mb-4">Words or phrases with the same total are believed to have a mystical connection. The Abjad system is used to find hidden meanings in the Quran and poetry.</p>
        <h3 className="text-xl font-semibold mb-2 mt-6">Cultural/Spiritual Significance</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Used in Sufi poetry and Islamic talismans</li>
          <li>Believed to reveal hidden truths and divine messages</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Further Reading</h3>
        <ul className="list-disc pl-6 mb-2">
          <li><a href="https://en.wikipedia.org/wiki/Abjad_numerals" className="underline text-blue-500" target="_blank" rel="noopener noreferrer">Wikipedia: Abjad numerals</a></li>
          <li><a href="https://www.alislam.org/library/books/Introduction-to-the-study-of-the-Holy-Quran.pdf" className="underline text-blue-500" target="_blank" rel="noopener noreferrer">Introduction to the Study of the Holy Quran (PDF)</a></li>
        </ul>
      </div>
    </div>
  );
}
