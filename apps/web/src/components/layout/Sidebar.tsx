"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

interface SidebarItem {
  label: string;
  href: string;
  icon?: string;
}

const workspaceMenus: Record<string, SidebarItem[]> = {
  contractor: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "My Contracts", href: "/contracts" },
    { label: "Documents", href: "/documents" },
    { label: "Payments", href: "/payments" },
    { label: "Activities", href: "/activities" },
  ],
  client_pm: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/contracts" },
    { label: "Contractors", href: "/contractors" },
    { label: "Approvals", href: "/approvals" },
    { label: "Reports", href: "/reports" },
  ],
  hse: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Compliance", href: "/compliance" },
    { label: "Certifications", href: "/certifications" },
    { label: "Incidents", href: "/incidents" },
    { label: "Audit Log", href: "/audit" },
  ],
  finance: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Invoices", href: "/invoices" },
    { label: "Payments", href: "/payments" },
    { label: "Reports", href: "/reports" },
    { label: "Budgets", href: "/budgets" },
  ],
};

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const role = user?.role || "CONTRACTOR_PM";
  const roleToWorkspace: Record<string, string> = {
    CONTRACTOR_PM: "contractor",
    CLIENT_PM: "client_pm",
    HSE_OFFICER: "hse",
    FINANCE_OFFICER: "finance",
    ORGANIZATION_ADMIN: "contractor",
    PLATFORM_ADMIN: "contractor",
    VIEWER: "contractor",
  };

  const workspace = roleToWorkspace[role];
  const menuItems = workspaceMenus[workspace] || workspaceMenus.contractor;

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-sm font-semibold text-slate-400 uppercase">
          {workspace.replace("_", " ")}
        </h2>
        <p className="text-xs text-slate-500 mt-1">Workspace</p>
      </div>

      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 w-64">
        <Link
          href="/settings"
          className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          Settings
        </Link>
      </div>
    </aside>
  );
}
