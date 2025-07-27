'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Newspaper, LayoutGrid, Coins, Sparkles } from 'lucide-react';

const navItems = [
  { href: '/explore', label: 'Explore Survey', icon: LayoutGrid },
  { href: '/manage-survey', label: 'Manage Survey', icon: Newspaper },
  { href: '/generate-survey', label: 'Generate Survey', icon: Sparkles },
  { href: '/exchange', label: 'Point Exchange', icon: Coins },
];

export function NavUmum() {
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();

  if (!isLoggedIn) return null;

  return (
    <nav className="pt-6 w-full">
      <ul className="flex justify-center flex-wrap md:gap-4 sm:gap-3 gap-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <li key={href} className="flex-1 md:max-w-[200px]">
              <Link
                href={href}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 w-full h-full text-center rounded-lg font-semibold text-xs sm:text-sm md:text-base
                  backdrop-blur-xl border transition-all duration-200 shadow-md
                  hover:shadow-lg hover:scale-[1.02]`}
                style={{
                  background: isActive
                    ? `
                      radial-gradient(circle at top left, rgba(255, 200, 111, 0.2), transparent 70%),
                      radial-gradient(circle at bottom right, rgba(255, 200, 111, 0.15), transparent 60%)`
                    : `
                      radial-gradient(circle at top left, rgba(255, 255, 255, 0.4), transparent 70%),
                      radial-gradient(circle at bottom right, rgba(173, 216, 255, 0.3), transparent 60%)`,
                  backdropFilter: 'var(--glass-blur)',
                  borderColor: 'var(--glass-border)',
                }}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
