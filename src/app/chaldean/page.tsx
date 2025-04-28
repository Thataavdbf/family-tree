'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ChaldeanPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="section-title bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
        Chaldean Numerology
      </h1>

      <div className="mb-8 flex flex-wrap gap-2">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History & Origins
        </button>
        <button 
          className={`tab-button ${activeTab === 'system' ? 'active' : ''}`}
          onClick={() => setActiveTab('system')}
        >
          Number System
        </button>
        <button 
          className={`tab-button ${activeTab === 'calculator' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculator')}
        >
          Calculator
        </button>
        <button 
          className={`tab-button ${activeTab === 'comparison' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparison')}
        >
          Chaldean vs Pythagorean
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="section-card">
          <h2 className="text-2xl font-semibold mb-4">Chaldean Numerology Overview</h2>
          <p className="mb-4">
            Chaldean Numerology is one of the most ancient and accurate forms of numerology, originating from the Chaldean civilization in Mesopotamia (modern-day Iraq). Unlike the more common Pythagorean system, Chaldean numerology is based on the vibrational properties of each letter rather than its position in the alphabet.
          </p>
          <p className="mb-4">
            This system is considered more mystical and spiritually oriented, as it was developed by ancient Babylonian astrologers who believed in the connection between cosmic vibrations, numbers, and human destiny. Many numerologists consider Chaldean numerology to be more accurate and in-depth than other systems.
          </p>
          <p className="mb-4">
            Key characteristics of Chaldean numerology include:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Uses numbers 1-8 for letter assignments (9 is considered sacred and used only in final calculations)</li>
            <li>Based on the vibrational energy of letters rather than alphabetical position</li>
            <li>Considers both the name and birth date for a complete analysis</li>
            <li>Provides insights into personality, destiny, and life challenges</li>
            <li>Incorporates mystical and spiritual elements from ancient Babylonian traditions</li>
          </ul>
          <p>
            Explore the other tabs to learn more about the history, number system, and how to calculate your Chaldean numbers.
          </p>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="section-card">
          <h2 className="text-2xl font-semibold mb-4">History & Origins of Chaldean Numerology</h2>
          <p className="mb-4">
            Chaldean numerology originated in ancient Mesopotamia (modern-day Iraq) with the Chaldean civilization, which flourished from approximately 800-539 BCE. The Chaldeans were renowned for their advanced knowledge of astronomy, astrology, and mathematics.
          </p>
          <p className="mb-4">
            The system was developed by Chaldean astrologer-priests who served in the court of Nebuchadnezzar II. These scholars were deeply interested in the connection between celestial bodies and earthly events, and they developed numerology as a tool to understand these relationships.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3">Key Historical Developments:</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Babylonian Influence:</strong> The Chaldeans inherited and refined the mathematical and astrological knowledge of the Babylonians.</li>
            <li><strong>Integration with Astrology:</strong> Chaldean numerology was closely tied to their sophisticated astrological systems.</li>
            <li><strong>Preservation through Jewish Scholars:</strong> After the fall of Babylon, Jewish scholars preserved and transmitted much of the Chaldean knowledge.</li>
            <li><strong>Medieval Transmission:</strong> The system was further developed and preserved by Arabic and Persian scholars during the medieval period.</li>
            <li><strong>Modern Revival:</strong> In the late 19th and early 20th centuries, Western occultists and numerologists revived interest in Chaldean numerology.</li>
          </ul>
          <p className="mb-4">
            The Chaldeans believed that each letter and number carried a specific vibration or energy that could influence human affairs. Their system was designed to decode these vibrations and provide insights into personality, destiny, and spiritual development.
          </p>
          <p>
            Unlike the Pythagorean system which was developed later and based on philosophical principles, Chaldean numerology emerged from practical astrological observations and was used for divination and understanding cosmic patterns.
          </p>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="section-card">
          <h2 className="text-2xl font-semibold mb-4">Chaldean Number System</h2>
          <p className="mb-4">
            The Chaldean numerology system assigns numbers 1-8 to letters based on their vibrational energy rather than their alphabetical position. The number 9 is considered sacred and is only used in final calculations, never in letter assignments.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Chaldean Letter-Number Assignments:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="font-semibold mb-2">Number 1:</p>
              <p>A, I, J, Q, Y</p>
              <p className="mt-2 text-sm opacity-80">Represents: Leadership, independence, originality, self-confidence</p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="font-semibold mb-2">Number 2:</p>
              <p>B, K, R</p>
              <p className="mt-2 text-sm opacity-80">Represents: Cooperation, diplomacy, sensitivity, balance</p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="font-semibold mb-2">Number 3:</p>
              <p>C, G, L, S</p>
              <p className="mt-2 text-sm opacity-80">Represents: Expression, creativity, joy, communication</p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="font-semibold mb-2">Number 4:</p>
              <p>D, M, T</p>
              <p className="mt-2 text-sm opacity-80">Represents: Stability, practicality, organization, determination</p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="font-semibold mb-2">Number 5:</p>
              <p>E, H, N, X</p>
              <p className="mt-2 text-sm opacity-80">Represents: Freedom, change, adventure, versatility</p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="font-semibold mb-2">Number 6:</p>
              <p>U, V, W</p>
              <p className="mt-2 text-sm opacity-80">Represents: Harmony, responsibility, nurturing, healing</p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="font-semibold mb-2">Number 7:</p>
              <p>O, Z</p>
              <p className="mt-2 text-sm opacity-80">Represents: Analysis, wisdom, spirituality, introspection</p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="font-semibold mb-2">Number 8:</p>
              <p>F, P</p>
              <p className="mt-2 text-sm opacity-80">Represents: Power, ambition, achievement, material success</p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Key Numbers in Chaldean Numerology:</h3>
          
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Name Number:</strong> Calculated from the numerical values of all letters in your full birth name.</li>
            <li><strong>Destiny Number:</strong> Derived from your birth date, revealing your life purpose and destiny.</li>
            <li><strong>Compound Numbers:</strong> Double-digit numbers that aren't reduced (like 10, 11, 19) have special meanings.</li>
            <li><strong>Psychic Number:</strong> Calculated from your birth day only (date of the month you were born).</li>
            <li><strong>Intensification Numbers:</strong> Letters that appear multiple times in your name create intensified energies.</li>
          </ul>
          
          <p>
            Unlike the Pythagorean system, Chaldean numerology places special emphasis on compound numbers, considering them to have unique vibrations that shouldn't always be reduced to a single digit.
          </p>
        </div>
      )}

      {activeTab === 'calculator' && (
        <div className="section-card">
          <h2 className="text-2xl font-semibold mb-4">Chaldean Numerology Calculator</h2>
          <p className="mb-6">
            Use this guide to calculate your Chaldean numerology numbers. The Chaldean system uses a different letter-to-number assignment than the Pythagorean system and places special emphasis on compound numbers.
          </p>
          
          <h3 className="text-xl font-semibold mb-3">How to Calculate Your Chaldean Name Number:</h3>
          
          <ol className="list-decimal pl-6 mb-6 space-y-3">
            <li>Write out your full birth name (as it appears on your birth certificate).</li>
            <li>Assign each letter its Chaldean numerical value using the chart in the "Number System" tab.</li>
            <li>Add all the numbers together to get a sum.</li>
            <li>If the sum is a compound number (double-digit), it's usually kept as is, as compound numbers have special meanings in Chaldean numerology.</li>
            <li>However, for final interpretation, you may also reduce it to a single digit by adding the digits together.</li>
          </ol>
          
          <div className="bg-white/5 p-4 rounded-lg mb-6">
            <p className="font-semibold mb-2">Example: "JOHN SMITH"</p>
            <p>J(1) + O(7) + H(5) + N(5) = 18</p>
            <p>S(3) + M(4) + I(1) + T(4) + H(5) = 17</p>
            <p>Total: 18 + 17 = 35</p>
            <p>Compound Number: 35</p>
            <p>Reduced Number: 3 + 5 = 8</p>
          </div>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">How to Calculate Your Chaldean Destiny Number:</h3>
          
          <ol className="list-decimal pl-6 mb-6 space-y-3">
            <li>Write out your birth date in MM/DD/YYYY format.</li>
            <li>Add all the digits together.</li>
            <li>If the result is a double-digit number, add those digits together to get a single digit.</li>
          </ol>
          
          <div className="bg-white/5 p-4 rounded-lg mb-6">
            <p className="font-semibold mb-2">Example: Birth Date June 15, 1985 (06/15/1985)</p>
            <p>0 + 6 + 1 + 5 + 1 + 9 + 8 + 5 = 35</p>
            <p>Compound Number: 35</p>
            <p>Reduced Number: 3 + 5 = 8</p>
          </div>
          
          <p className="mb-4">
            In Chaldean numerology, both the compound number (35) and the reduced number (8) are important. The compound number provides deeper insights into specific challenges and opportunities, while the reduced number represents the core energy.
          </p>
          
          <p>
            For a complete Chaldean numerology profile, you would analyze multiple numbers including your Name Number, Destiny Number, and various compound numbers that appear in your calculations.
          </p>
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="section-card">
          <h2 className="text-2xl font-semibold mb-4">Chaldean vs. Pythagorean Numerology</h2>
          <p className="mb-6">
            While both Chaldean and Pythagorean numerology systems aim to reveal insights about personality and destiny through numbers, they differ in several key aspects. Understanding these differences can help you choose which system resonates more with you.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full mb-6">
              <thead>
                <tr className="bg-white/10">
                  <th className="p-3 text-left">Aspect</th>
                  <th className="p-3 text-left">Chaldean Numerology</th>
                  <th className="p-3 text-left">Pythagorean Numerology</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/10">
                  <td className="p-3 font-semibold">Origin</td>
                  <td className="p-3">Ancient Babylon/Mesopotamia (Chaldean civilization)</td>
                  <td className="p-3">Ancient Greece (Pythagoras and his followers)</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="p-3 font-semibold">Age</td>
                  <td className="p-3">Older system (circa 800-539 BCE)</td>
                  <td className="p-3">Newer system (circa 570-495 BCE)</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="p-3 font-semibold">Number Range</td>
                  <td className="p-3">Uses numbers 1-8 (9 is sacred and only used in final calculations)</td>
                  <td className="p-3">Uses numbers 1-9</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="p-3 font-semibold">Letter Assignment</td>
                  <td className="p-3">Based on vibration/energy of letters</td>
                  <td className="p-3">Based on alphabetical position</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="p-3 font-semibold">Compound Numbers</td>
                  <td className="p-3">Emphasizes compound numbers (double digits) as having special meanings</td>
                  <td className="p-3">Generally reduces all numbers to a single digit (except master numbers 11, 22, 33)</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="p-3 font-semibold">Approach</td>
                  <td className="p-3">More mystical and spiritually oriented</td>
                  <td className="p-3">More mathematical and philosophical</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="p-3 font-semibold">Perceived Accuracy</td>
                  <td className="p-3">Often considered more accurate by professional numerologists</td>
                  <td className="p-3">More widely used and accessible</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="p-3 font-semibold">Complexity</td>
                  <td className="p-3">More complex and nuanced</td>
                  <td className="p-3">Simpler and more straightforward</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Key Differences in Practice:</h3>
          
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Letter Values:</strong> The same name will yield different numerical values in each system.</li>
            <li><strong>Interpretation Depth:</strong> Chaldean system typically provides more layers of interpretation through compound numbers.</li>
            <li><strong>Name Usage:</strong> Chaldean traditionally uses birth name, while Pythagorean can work with current legal name.</li>
            <li><strong>Calculation Method:</strong> Chaldean calculations are more complex but considered more precise.</li>
          </ul>
          
          <p className="mb-4">
            Many numerologists recommend using both systems for a comprehensive analysis. The Pythagorean system provides a broad overview of personality and life path, while the Chaldean system offers deeper insights into spiritual aspects and specific life challenges.
          </p>
          
          <p>
            In our family tree analysis, we provide calculations using both systems to give you the most complete understanding of each family member's numerological profile.
          </p>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <Link href="/" className="btn">
          Back to Home
        </Link>
        <Link href="/family-tree" className="btn-primary">
          Explore Family Tree
        </Link>
      </div>
    </div>
  );
}
