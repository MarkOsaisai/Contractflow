import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  Flag,
  CreditCard,
  Settings,
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Contracts', href: '/contracts', icon: FileText },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Compliance', href: '/compliance', icon: ShieldCheck },
  { name: 'Milestones', href: '/milestones', icon: Flag },
  { name: 'Payments', href: '/payments', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-[#111111] text-zinc-400">
      <div className="flex h-16 shrink-0 items-center px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
            {/* Logo placeholder */}
          </div>
          <span className="text-xl font-semibold text-white">ContractFlow</span>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-4 py-6">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={twMerge(
                clsx(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-indigo-500 text-white'
                    : 'hover:bg-zinc-800 hover:text-white'
                )
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full bg-white" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Sarah Jenkins</span>
            <span className="text-xs text-zinc-500">Lead Portfolio PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
