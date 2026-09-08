import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
