'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon?: string;
  visible?: (role: string) => boolean;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', visible: () => true },
  { label: 'Usuários', href: '/admin/users', visible: (role) => ['super_admin', 'admin'].includes(role) },
  { label: 'Produtos', href: '/admin/products', visible: (role) => ['super_admin', 'admin', 'vendedor'].includes(role) },
  { label: 'Pedidos', href: '/admin/orders', visible: (role) => ['super_admin', 'admin', 'vendedor'].includes(role) },
  { label: 'Clientes', href: '/admin/customers', visible: (role) => ['super_admin', 'admin', 'vendedor'].includes(role) },
  { label: 'Pagamentos', href: '/admin/payments', visible: (role) => ['super_admin', 'admin'].includes(role) },
  { label: 'Planos', href: '/admin/plans', visible: (role) => role === 'super_admin' },
  { label: 'Personalizações', href: '/admin/customization', visible: (role) => role === 'super_admin' },
  { label: 'Configurações', href: '/settings', visible: () => true },
];

export function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const visibleItems = navItems.filter((item) => item.visible?.(user.role) !== false);

  return (
    <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <nav className="p-4 space-y-2">
        {visibleItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'block px-4 py-2 rounded-lg transition-colors duration-200',
              pathname === item.href
                ? 'bg-primary-500 text-white font-medium'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
