// src/app/chaldean/gematria.tsx
'use client';
import React from 'react';
import Link from 'next/link';

export default function GematriaPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="section-title bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300 mb-6">
        Gematria Numerology
      </h1>
      <div className="section-card mb-8">
        <h2 className="text-2xl font-semibold mb-4">What is Gematria?</h2>
        <p className="mb-4">
          Gematria is an alphanumeric code of assigning a numerical value to a name, word or phrase based on its letters. It is a traditional Jewish system of numerology that has been used for centuries to interpret Hebrew scriptures and texts. Each letter in the Hebrew alphabet is assigned a specific number, and the sum of these numbers can be used to find hidden meanings or connections between words.
        </p>
        <h3 className="text-xl font-semibold mb-2">Basic Gematria Table</h3>
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
                ['א', 1], ['ב', 2], ['ג', 3], ['ד', 4], ['ה', 5], ['ו', 6], ['ז', 7], ['ח', 8], ['ט', 9],
                ['י', 10], ['כ', 20], ['ל', 30], ['מ', 40], ['נ', 50], ['ס', 60], ['ע', 70], ['פ', 80], ['צ', 90],
                ['ק', 100], ['ר', 200], ['ש', 300], ['ת', 400]
              ].map(([letter, value]) => (
                <tr key={letter}>
                  <td className="border px-2 py-1 font-bold text-lg">{letter}</td>
                  <td className="border px-2 py-1">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-4">
          Gematria is often used to draw connections between words and concepts that share the same numerical value, revealing deeper or mystical meanings in texts.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/chaldean" className="btn">Back to Chaldean</Link>
        <Link href="/" className="btn-primary">Home</Link>
      </div>
    </div>
  );
}
