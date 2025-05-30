// src/app/chaldean/pythagorean.tsx
'use client';

import React from 'react';
import { useUserInfo } from './UserInfoContext';
import {
  calculatePythagoreanNumber,
  calculatePythagoreanSoulUrge,
  calculatePythagoreanPersonality,
  calculateLifePath
} from './numerology-utils';
import NumberMeaningCard from './NumberMeaningCard';

export default function PythagoreanPage() {
  const { userInfo } = useUserInfo();
  const { name, birthdate } = userInfo;
  const lifePath = calculateLifePath(birthdate);
  const destiny = calculatePythagoreanNumber(name);
  const soulUrge = calculatePythagoreanSoulUrge(name);
  const personality = calculatePythagoreanPersonality(name);
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="section-title bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-green-300 mb-6">
        Pythagorean Numerology
      </h1>
      <div className="section-card mb-8">
        <h2 className="text-xl font-bold mb-4">Your Pythagorean Numbers</h2>
        <div className="mb-6 space-y-4">
          <div>
            <div className="font-semibold">Life Path:</div>
            {lifePath ? (
              <NumberMeaningCard number={lifePath} label="Life Path" />
            ) : (
              <span className="text-gray-400">(enter birthdate)</span>
            )}
          </div>
          <div>
            <div className="font-semibold">Destiny (Expression):</div>
            {destiny ? (
              <NumberMeaningCard number={destiny} label="Destiny (Expression)" />
            ) : (
              <span className="text-gray-400">(enter name)</span>
            )}
          </div>
          <div>
            <div className="font-semibold">Soul Urge:</div>
            {soulUrge ? (
              <NumberMeaningCard number={soulUrge} label="Soul Urge" />
            ) : (
              <span className="text-gray-400">(enter name)</span>
            )}
          </div>
          <div>
            <div className="font-semibold">Personality:</div>
            {personality ? (
              <NumberMeaningCard number={personality} label="Personality" />
            ) : (
              <span className="text-gray-400">(enter name)</span>
            )}
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="mb-4">
          Pythagorean numerology, also known as Western numerology, is the most widely used numerology system in the world. It assigns numbers 1-9 to the letters of the alphabet in sequence and is based on the teachings of the ancient Greek philosopher Pythagoras (c. 570–495 BCE).
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Uses numbers 1–9 for letter assignments</li>
          <li>Focuses on core numbers: Life Path, Destiny, Soul Urge, Personality</li>
          <li>Emphasizes single-digit reduction, except for master numbers (11, 22, 33)</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Letter-to-Number Table</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-center mb-4">
            <thead>
              <tr>
                <th className="border px-2 py-1">Letter</th>
                <th className="border px-2 py-1">Value</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['A', 1], ['B', 2], ['C', 3], ['D', 4], ['E', 5], ['F', 6], ['G', 7], ['H', 8], ['I', 9],
                ['J', 1], ['K', 2], ['L', 3], ['M', 4], ['N', 5], ['O', 6], ['P', 7], ['Q', 8], ['R', 9],
                ['S', 1], ['T', 2], ['U', 3], ['V', 4], ['W', 5], ['X', 6], ['Y', 7], ['Z', 8]
              ].map(([letter, value]) => (
                <tr key={letter}>
                  <td className="border px-2 py-1 font-bold text-lg">{letter}</td>
                  <td className="border px-2 py-1">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-xl font-semibold mb-2 mt-6">How to Calculate Core Numbers</h3>
        <ul className="list-decimal pl-6 mb-4 space-y-2">
          <li><strong>Life Path Number:</strong> Add all digits of your birth date (MM/DD/YYYY) and reduce to a single digit or master number.</li>
          <li><strong>Destiny (Expression) Number:</strong> Add the values of all letters in your full birth name, reduce to a single digit or master number.</li>
          <li><strong>Soul Urge Number:</strong> Add the values of all vowels in your full name, reduce.</li>
          <li><strong>Personality Number:</strong> Add the values of all consonants in your full name, reduce.</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Worked Example</h3>
        <p className="mb-2"><strong>Life Path Example:</strong> Birthdate: 12/14/1990</p>
        <ul className="list-disc pl-6 mb-4">
          <li>1 + 2 + 1 + 4 + 1 + 9 + 9 + 0 = 27</li>
          <li>2 + 7 = 9 (Life Path Number: 9)</li>
        </ul>
        <p className="mb-2"><strong>Destiny Example:</strong> Name: JOHN SMITH</p>
        <ul className="list-disc pl-6 mb-4">
          <li>J(1) + O(6) + H(8) + N(5) + S(1) + M(4) + I(9) + T(2) + H(8) = 44</li>
          <li>4 + 4 = 8 (Destiny Number: 8)</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Interpretation</h3>
        <p className="mb-4">Each number (1–9, 11, 22, 33) has a unique meaning. For example:</p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>1:</strong> Leadership, independence</li>
          <li><strong>2:</strong> Cooperation, sensitivity</li>
          <li><strong>3:</strong> Creativity, joy</li>
          <li><strong>4:</strong> Stability, order</li>
          <li><strong>5:</strong> Freedom, adventure</li>
          <li><strong>6:</strong> Responsibility, nurturing</li>
          <li><strong>7:</strong> Spirituality, analysis</li>
          <li><strong>8:</strong> Power, success</li>
          <li><strong>9:</strong> Compassion, completion</li>
          <li><strong>11:</strong> Intuition, inspiration (master number)</li>
          <li><strong>22:</strong> Master builder, achievement (master number)</li>
          <li><strong>33:</strong> Master teacher, compassion (master number)</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Comparison to Chaldean</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Pythagorean uses 1–9 for all letters; Chaldean uses 1–8 (9 is sacred).</li>
          <li>Pythagorean is more mathematical; Chaldean is more mystical.</li>
          <li>Pythagorean reduces all numbers except master numbers; Chaldean emphasizes compound numbers.</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-6">Further Reading</h3>
        <ul className="list-disc pl-6 mb-2">
          <li><a href="https://en.wikipedia.org/wiki/Pythagorean_numerology" className="underline text-blue-500" target="_blank" rel="noopener noreferrer">Wikipedia: Pythagorean Numerology</a></li>
          <li><a href="https://www.numerology.com/numerology-numbers" className="underline text-blue-500" target="_blank" rel="noopener noreferrer">Numerology.com: Numbers</a></li>
        </ul>
      </div>
    </div>
  );
}
