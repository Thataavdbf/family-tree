// src/app/chaldean/NameChangeAnalysis.tsx
import React, { useState } from 'react';
import {
  calculatePythagoreanNumber,
  calculatePythagoreanSoulUrge,
  calculatePythagoreanPersonality,
  calculateLifePath
} from './numerology-utils';
import NumberMeaningCard from './NumberMeaningCard';

export default function NameChangeAnalysis() {
  const [inputName, setInputName] = useState('');
  const [inputBirthdate, setInputBirthdate] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Calculated numbers for the alternate name
  const destiny = calculatePythagoreanNumber(inputName);
  const soulUrge = calculatePythagoreanSoulUrge(inputName);
  const personality = calculatePythagoreanPersonality(inputName);
  const lifePath = calculateLifePath(inputBirthdate);

  return (
    <div className="w-full max-w-xl mx-auto my-8 p-4 bg-white rounded-lg shadow-lg border">
      <h2 className="text-xl font-bold mb-4 text-center">Name Change Analysis</h2>
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Alternate Name</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={inputName}
            onChange={e => setInputName(e.target.value)}
            placeholder="Enter new or alternate name"
          />
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-1">Birthdate (optional)</label>
          <input
            className="w-full border rounded px-2 py-1"
            type="date"
            value={inputBirthdate}
            onChange={e => setInputBirthdate(e.target.value)}
            placeholder="YYYY-MM-DD"
          />
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => setShowResults(true)}
        disabled={!inputName}
      >
        Analyze
      </button>
      {showResults && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberMeaningCard number={lifePath} label="Life Path" />
          <NumberMeaningCard number={destiny} label="Destiny (Expression)" />
          <NumberMeaningCard number={soulUrge} label="Soul Urge" />
          <NumberMeaningCard number={personality} label="Personality" />
        </div>
      )}
    </div>
  );
}
