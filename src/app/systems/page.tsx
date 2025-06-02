import React from 'react';
import Link from 'next/link';

const systems = [
  { key: 'chaldean', label: 'Chaldean Numerology', description: 'Ancient Babylonian system with unique letter-number assignments.' },
  { key: 'pythagorean', label: 'Pythagorean Numerology', description: 'Greek system based on the teachings of Pythagoras.' },
  { key: 'vedic', label: 'Vedic Numerology', description: 'Indian numerology system linked to Vedic astrology.' },
  { key: 'chinese', label: 'Chinese Numerology', description: 'System based on Chinese traditions, Lo Shu Grid, and lucky numbers.' },
  { key: 'abjad', label: 'Abjad Numerology', description: 'Arabic system using the Abjad letter values.' },
  { key: 'angel-numbers', label: 'Angel Numbers', description: 'Modern spiritual system interpreting repeating numbers.' },
  { key: 'gematria', label: 'Gematria', description: 'Hebrew system assigning numbers to letters.' },
  { key: 'personal-year', label: 'Personal Year/Month/Day', description: 'Forecasting system based on your birthdate and the current year.' },
];

console.log('[DEBUG] SystemsPage loaded. systems:', systems);

export default function SystemsPage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-green-300">Numerology Systems</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {systems.map(system => {
          const href = `/systems/${system.key}`;
          console.log(`[DEBUG] Rendering system link:`, { key: system.key, href });
          return (
            <Link key={system.key} href={href} className="block p-6 rounded-lg shadow-lg bg-white/10 hover:bg-white/20 transition">
              <h2 className="text-xl font-semibold mb-2">{system.label}</h2>
              <p className="text-sm opacity-80">{system.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
