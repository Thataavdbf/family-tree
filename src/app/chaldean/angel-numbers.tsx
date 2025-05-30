// src/app/chaldean/angel-numbers.tsx
'use client';

import React from 'react';
import { useUserInfo } from './UserInfoContext';
import NumberMeaningCard from './NumberMeaningCard';

export default function AngelNumbersPage() {
  const { userInfo } = useUserInfo();
  const { birthdate } = userInfo;
  // Show a special message if today matches a repeating number in the date
  const today = new Date(2025, 4, 29); // May 29, 2025
  const dayStr = String(today.getDate()).padStart(2, '0');
  let angelMessage = '';
  if (dayStr[0] === dayStr[1]) {
    angelMessage = `Today (${today.toLocaleDateString()}) is an angel number day: ${dayStr}${dayStr}${dayStr}`;
  }
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="section-title bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300 mb-6">
        Angel Numbers
      </h1>
      <div className="section-card mb-8">
        {angelMessage && (
          <div className="mb-6 text-green-600 font-semibold">{angelMessage}</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[111,222,333,444,555,666,777,888,999].map(n => (
            <NumberMeaningCard key={n} number={String(n).slice(0,1)} label={`Angel: ${n}`} />
          ))}
        </div>
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="mb-4">
          Angel numbers are repeating number sequences (like 111, 222, 333) that are believed to carry spiritual messages from angels or the universe. Each sequence is thought to have a unique meaning and guidance for your life.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Noticed during significant moments or when seeking guidance</li>
          <li>Each number sequence has a unique spiritual meaning</li>
          <li>Common in modern spiritual and New Age communities</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Common Angel Numbers & Meanings</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>111:</strong> New beginnings, manifestation, alignment</li>
          <li><strong>222:</strong> Balance, harmony, trust in the process</li>
          <li><strong>333:</strong> Support, encouragement, spiritual growth</li>
          <li><strong>444:</strong> Protection, stability, foundation</li>
          <li><strong>555:</strong> Change, transformation, adventure</li>
          <li><strong>666:</strong> Reflection, balance between material and spiritual</li>
          <li><strong>777:</strong> Luck, spiritual awakening, divine guidance</li>
          <li><strong>888:</strong> Abundance, success, financial prosperity</li>
          <li><strong>999:</strong> Completion, closure, new cycles</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">How to Notice and Interpret Angel Numbers</h3>
        <ul className="list-decimal pl-6 mb-4 space-y-2">
          <li>Pay attention to repeating numbers in daily life (clocks, receipts, addresses, etc.)</li>
          <li>Reflect on your thoughts and feelings when you see the number</li>
          <li>Look up the meaning or trust your intuition for guidance</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Spiritual Significance</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Seen as messages of support and encouragement from the universe or angels</li>
          <li>Encourage mindfulness and spiritual growth</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Further Reading</h3>
        <ul className="list-disc pl-6 mb-2">
          <li><a href="https://en.wikipedia.org/wiki/Angel_numbers" className="underline text-blue-500" target="_blank" rel="noopener noreferrer">Wikipedia: Angel numbers</a></li>
          <li><a href="https://www.numerology.com/angel-numbers" className="underline text-blue-500" target="_blank" rel="noopener noreferrer">Numerology.com: Angel Numbers</a></li>
        </ul>
      </div>
    </div>
  );
}
