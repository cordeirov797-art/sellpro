'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg" />
            <span className="font-bold text-lg text-gray-900 dark:text-white">SellPro</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {user.role === 'super_admin' && (
              <Link href="/admin" className="text-gray-700 dark:text-gray-300 hover:text-primary-500">
                Admin
              </Link>
            )}
            {['super_admin', 'vendedor'].includes(user.role) && (
              <Link href="/seller" className="text-gray-700 dark:text-gray-300 hover:text-primary-500">
                Meus Produtos
              </Link>
            )}
            <Link href="/settings" className="text-gray-700 dark:text-gray-300 hover:text-primary-500">
              Configurações
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              Sair
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {user.role === 'super_admin' && (
              <Link href="/admin" className="block text-gray-700 dark:text-gray-300 hover:text-primary-500 py-2">
                Admin
              </Link>
            )}
            {['super_admin', 'vendedor'].includes(user.role) && (
              <Link href="/seller" className="block text-gray-700 dark:text-gray-300 hover:text-primary-500 py-2">
                Meus Produtos
              </Link>
            )}
            <Link href="/settings" className="block text-gray-700 dark:text-gray-300 hover:text-primary-500 py-2">
              Configurações
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="w-full justify-start">
              Sair
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
