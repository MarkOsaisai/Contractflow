import { Bell, Search } from 'lucide-react';

export function Topbar({ title }: { title: string }) {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Workspace..."
            className="h-10 w-64 rounded-md border border-gray-200 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50">
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-10 w-10 rounded-full bg-indigo-100" />
      </div>
    </header>
  );
}
