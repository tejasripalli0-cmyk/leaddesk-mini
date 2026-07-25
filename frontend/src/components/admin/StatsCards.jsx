const CARD_CONFIG = [
  { key: 'totalLeads', label: 'Total Leads', accent: 'bg-slate-900', icon: '📋' },
  { key: 'newLeads', label: 'New', accent: 'bg-primary-600', icon: '🆕' },
  { key: 'contactedLeads', label: 'Contacted', accent: 'bg-amber-500', icon: '📞' },
  { key: 'closedLeads', label: 'Closed', accent: 'bg-emerald-600', icon: '✅' },
];

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CARD_CONFIG.map((c) => (
        <div key={c.key} className="card flex items-center gap-4 p-5">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg text-white ${c.accent}`}>
            {c.icon}
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{stats?.[c.key] ?? 0}</p>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{c.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
