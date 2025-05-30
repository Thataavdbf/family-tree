// src/app/chaldean/CompatibilityChart.tsx
import React from 'react';
import { useUserInfo } from './UserInfoContext';
import { usePartnerInfo } from './PartnerInfoContext';
import {
  calculateLifePath,
  calculatePythagoreanNumber,
  calculatePythagoreanSoulUrge,
  calculatePythagoreanPersonality
} from './numerology-utils';
import NumberMeaningCard from './NumberMeaningCard';

function getCompatibilityDescription(num1: string | number, num2: string | number, label: string) {
  // Simple compatibility logic for demo; can be expanded for nuance
  if (!num1 || !num2) return '';
  if (num1 === num2) return `Both share the same ${label} number. This often brings natural understanding and harmony.`;
  const diff = Math.abs(Number(num1) - Number(num2));
  if (diff === 1) return `These ${label} numbers are adjacent, suggesting complementary strengths and some differences.`;
  if (diff >= 4) return `These ${label} numbers are quite different, which can bring both challenge and growth.`;
  return `These ${label} numbers have a mix of similarities and differences.`;
}

export default function CompatibilityChart() {
  const { userInfo } = useUserInfo();
  const { partnerInfo } = usePartnerInfo();
  const { name, birthdate } = userInfo;
  const { name: partnerName, birthdate: partnerBirthdate } = partnerInfo;

  if (!partnerName || !partnerBirthdate) return null;

  type NumberLabel = 'Life Path' | 'Destiny' | 'Soul Urge' | 'Personality';

  const userNumbers: Record<NumberLabel, number> = {
    'Life Path': calculateLifePath(birthdate),
    'Destiny': calculatePythagoreanNumber(name),
    'Soul Urge': calculatePythagoreanSoulUrge(name),
    'Personality': calculatePythagoreanPersonality(name)
  };
  const partnerNumbers: Record<NumberLabel, number> = {
    'Life Path': calculateLifePath(partnerBirthdate),
    'Destiny': calculatePythagoreanNumber(partnerName),
    'Soul Urge': calculatePythagoreanSoulUrge(partnerName),
    'Personality': calculatePythagoreanPersonality(partnerName)
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 p-4 bg-white rounded-lg shadow-lg border">
      <h2 className="text-2xl font-bold mb-4 text-center">Compatibility Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">You</h3>
          {Object.entries(userNumbers).map(([label, num]) => (
            <NumberMeaningCard key={label} number={num} label={label} />
          ))}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{partnerName}</h3>
          {Object.entries(partnerNumbers).map(([label, num]) => (
            <NumberMeaningCard key={label} number={num} label={label} />
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Compatibility Insights</h3>
        <ul className="list-disc pl-6 space-y-2">
          {(Object.keys(userNumbers) as NumberLabel[]).map(label => (
            <li key={label}>
              <span className="font-bold">{label}:</span> {getCompatibilityDescription(userNumbers[label], partnerNumbers[label], label)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
