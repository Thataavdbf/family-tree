'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-sm sticky top-0 z-50 mb-8">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
              Family Numerology
            </span>
          </Link>
          
          <div className="flex space-x-1 md:space-x-4">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/overview" className="nav-link">Overview</Link>
            <Link href="/profiles" className="nav-link">Profiles</Link>
            <Link href="/systems" className="nav-link">Systems</Link>
            <Link href="/chaldean" className="nav-link">Chaldean</Link>
            <Link href="/family-tree" className="nav-link">Family Tree</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
