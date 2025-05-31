'use client';

import React, { ReactNode } from 'react';
import Navigation from './components/Navigation';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>FAMOLOGY</title>
        <meta name="description" content="Explore family connections through numerology, including Chaldean, Pythagorean, and other numerology systems for families" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
        <Navigation />
        <main className="px-4 py-6">
          {children}
        </main>
        <footer className="mt-12 py-6 border-t border-white/10 text-center text-sm opacity-70">
          <div className="max-w-6xl mx-auto px-4">
            <p>© 2025 FAMOLOGY</p>
            <p className="mt-2">All family data is stored locally in your browser and is not transmitted to any server.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
