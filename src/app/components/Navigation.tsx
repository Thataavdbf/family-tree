
'use client';
import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/overview', label: 'Overview' },
  { href: '/profiles', label: 'Profiles' },
  { href: '/systems', label: 'Systems' },
  { href: '/family-tree', label: 'Family Tree' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [visited, setVisited] = React.useState<{ [href: string]: boolean }>({});

  // On mount, load visited links from sessionStorage
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const visitedLinks: { [href: string]: boolean } = {};
    links.forEach(link => {
      if (sessionStorage.getItem('visited-' + link.href)) {
        visitedLinks[link.href] = true;
      }
    });
    setVisited(visitedLinks);
  }, []);

  // Mark current page as visited in sessionStorage and state
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem('visited-' + pathname, '1');
    setVisited(prev => ({ ...prev, [pathname]: true }));
  }, [pathname]);

  return (
    <nav className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-sm sticky top-0 z-50 mb-8">
      <div className="w-full flex flex-col items-center justify-center px-4 py-3">
        <Link href="/" className="w-full flex items-center justify-center">
          <span className="text-5xl font-extrabold section-title" style={{ letterSpacing: '0.1em' }}>
            FAMOLOGY
          </span>
        </Link>
        <div className="flex gap-8 md:gap-16 mt-6 mb-2 justify-center items-center">
          {links.map(link => {
            const isActive = pathname === link.href;
            const isVisited = !!visited[link.href];
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link${isActive ? ' nav-link-active' : ''}${isVisited ? ' visited' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
