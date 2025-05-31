

import React from 'react';
import Link from 'next/link';
import OnboardingForm from './components/OnboardingForm';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="section-title bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">FAMOLOGY</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="section-card">
          <h2 className="text-2xl font-semibold mb-4">WHAT EVEN IS FAMOLOGY???</h2>
          <p className="mb-4" style={{whiteSpace: 'pre-line'}}>
            “FAMOLOGY” is the study of how our immediate families come together to form one gigantic extended family. (INCOMING RANT) When enough people join, you’ll begin to see the “scientific” approach I took, as coincidences start to shift from random chances to repeated instances. When documented properly—like I’ve been doing—this has the potential power to break generational curses.

I don’t claim to have all the answers. I just want to do my part, half as good as Aunt Va… (hard gulp, and a constant thought of how she always entertained my constant curiosity). Aunt Vicky knew so much, and NOW I can fulfill my part in giving people THAT KNOW a place to go. No house fire, flood, or robbery can take this away.

So please, take some time out of your day to show your cousin in 2089 how we got down back in the day. Once you see that everything isn’t as black and white as it’s portrayed, and you start to study family relationships, quirks, and how generations evolve—this could be a playful and educational app, but truly, I REALLY made this to see how far we can trace our roots.
          </p>
        </div>

        <div className="section-card flex flex-col gap-4 items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4">Onboarding</h2>
          <OnboardingForm />
        </div>

        <div className="section-card">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Interactive family tree with numerological insights</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Add extended family members and create relationship connections</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Automatic calculation of Life Path Numbers</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Western and Eastern astrological sign determination</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Chaldean numerology calculations and interpretations</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Compatibility analysis between family members</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link href="/overview" className="section-card hover:bg-white/5 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Numerology Overview</h3>
          <p className="text-sm opacity-80">
            Explore the fundamental principles of numerology and how they apply to your family.
          </p>
        </Link>
        
        <Link href="/profiles" className="section-card hover:bg-white/5 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Individual Profiles</h3>
          <p className="text-sm opacity-80">
            View detailed numerological profiles for each family member.
          </p>
        </Link>
        
        <Link href="/family-tree" className="section-card hover:bg-white/5 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Family Tree</h3>
          <p className="text-sm opacity-80">
            Visualize your family connections with integrated numerological insights.
          </p>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link href="/systems" className="section-card hover:bg-white/5 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Numerology Systems</h3>
          <p className="text-sm opacity-80">
            Learn about different numerology systems including Pythagorean and Kabbalah.
          </p>
        </Link>
        
        <Link href="/chaldean" className="section-card hover:bg-white/5 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Chaldean Numerology</h3>
          <p className="text-sm opacity-80">
            Discover the ancient Chaldean system of numerology and its unique insights.
          </p>
        </Link>
      </div>
      
      <div className="section-card mb-12">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <ol className="space-y-3 list-decimal pl-5">
          <li>
            <strong>Explore the Family Tree:</strong> Visit the Family Tree page to see the existing family structure with numerological data.
          </li>
          <li>
            <strong>Add Family Members:</strong> Use the "Add Family Member" tab to expand your family tree with new members.
          </li>
          <li>
            <strong>Compare Numerology Systems:</strong> Check both Pythagorean and Chaldean calculations for each family member.
          </li>
          <li>
            <strong>View Detailed Profiles:</strong> Click on any family member to see their complete numerological profile.
          </li>
          <li>
            <strong>Save Your Work:</strong> Your family tree is automatically saved in your browser's local storage.
          </li>
        </ol>
      </div>
    </div>
  );
}
