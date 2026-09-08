'use client';

import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { usePathname } from 'next/navigation';

const titles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/contracts': 'Contracts Workspace',
  '/documents': 'Document Library',
  '/compliance': 'Compliance Audits',
  '/milestones': 'Milestones',
  '/payments': 'Payments',
  '/settings': 'Settings',
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const getTitle = () => {
    for (const key in titles) {
      if (pathname.startsWith(key)) return titles[key];
    }
    return 'Dashboard';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#fafafa]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title={getTitle()} />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
