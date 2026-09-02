"use client";

import { Navbar, Sidebar } from "@/components/layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-slate-50">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
