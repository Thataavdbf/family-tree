'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/overview', label: 'Overview' },
  { href: '/profiles', label: 'Profiles' },
  { href: '/systems', label: 'Systems' },
  { href: '/chaldean', label: 'Chaldean' },
  { href: '/family-tree', label: 'Family Tree' },
];

export default function Navigation() {
  const pathname = usePathname();
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
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link${pathname === link.href ? ' nav-link-active' : ''}`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
