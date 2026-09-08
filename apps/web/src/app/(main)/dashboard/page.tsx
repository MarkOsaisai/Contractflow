'use client';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Contracts</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">47</p>
          <p className="mt-1 text-xs text-gray-400">All agreements</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Active Contracts</p>
          <p className="mt-2 text-3xl font-bold text-emerald-500">32</p>
          <p className="mt-1 text-xs text-gray-400">Pending execution</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Pending Payments</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">$125,400</p>
          <p className="mt-1 text-xs text-gray-400">Due next 30 days</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Overdue Receivables</p>
          <p className="mt-2 text-3xl font-bold text-red-500">$18,200</p>
          <p className="mt-1 text-xs text-gray-400">Needs immediate action</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="col-span-2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Revenue Flow (Receivables vs Payments)</h2>
          <div className="mt-6 flex h-64 items-end justify-between px-8">
            {/* Placeholder Chart Columns */}
            {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((month, i) => (
              <div key={month} className="flex flex-col items-center gap-2">
                <div className="flex items-end gap-1">
                  <div className={`w-4 bg-indigo-500 rounded-t-sm`} style={{ height: `${40 + i * 10}px` }}></div>
                  <div className={`w-4 bg-gray-500 rounded-t-sm`} style={{ height: `${30 + (i%2) * 20}px` }}></div>
                </div>
                <span className="text-xs text-gray-400">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones Area */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Milestones</h2>
          <div className="mt-4 space-y-4">
            {[
              { date: 'Oct 15', title: 'Mobilization Audit Sign-Off', amount: '$45,000' },
              { date: 'Oct 22', title: 'HSE Drill Certificate Sign', amount: '--' },
              { date: 'Nov 02', title: 'Initial Compliance Review', amount: '$20,000' },
            ].map((m) => (
              <div key={m.title} className="flex justify-between border-b border-gray-100 pb-4 last:border-0">
                <div>
                  <p className="text-xs font-semibold text-indigo-500">{m.date}</p>
                  <p className="text-sm font-medium text-gray-900">{m.title}</p>
                </div>
                <p className="text-sm font-bold text-gray-900">{m.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Contracts Activity</h2>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-y border-gray-100 bg-gray-50 text-xs text-gray-500 uppercase">
              <th className="px-6 py-3">Client Name</th>
              <th className="px-6 py-3">Value</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Due Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { name: 'Apex Builders Ltd.', value: '$85,000', status: 'Active', date: 'Oct 24, 2024' },
              { name: 'Centrex Infrastructure', value: '$120,400', status: 'Pending', date: 'Nov 02, 2024' },
              { name: 'Global Logistics Group', value: '$45,000', status: 'Active', date: 'Oct 15, 2024' },
            ].map((row) => (
              <tr key={row.name}>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{row.name}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">{row.value}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
