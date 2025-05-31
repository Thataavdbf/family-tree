// src/app/chaldean/InteractiveCalculator.tsx
import React, { useState } from 'react';
import {
  calculatePythagoreanNumber,
  calculatePythagoreanSoulUrge,
  calculatePythagoreanPersonality,
  calculateLifePath
} from './numerology-utils';
import NumberMeaningCard from './NumberMeaningCard';

export default function InteractiveCalculator() {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [showResults, setShowResults] = useState(false);

  const lifePath = calculateLifePath(birthdate);
  const destiny = calculatePythagoreanNumber(name);
  const soulUrge = calculatePythagoreanSoulUrge(name);
  const personality = calculatePythagoreanPersonality(name);

  return (
    <div className="w-full max-w-xl mx-auto my-8 p-4 bg-white rounded-lg shadow-lg border">
      <h2 className="text-xl font-bold mb-4 text-center">Interactive Numerology Calculator</h2>
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="ic-name" className="block font-semibold mb-1">Name</label>
          <input
            id="ic-name"
            className="w-full border rounded px-2 py-1"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter any name"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="ic-birthdate" className="block font-semibold mb-1">Birthdate</label>
          <input
            id="ic-birthdate"
            className="w-full border rounded px-2 py-1"
            type="date"
            value={birthdate}
            onChange={e => setBirthdate(e.target.value)}
            placeholder="YYYY-MM-DD"
          />
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => setShowResults(true)}
        disabled={!name && !birthdate}
      >
        Calculate
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
