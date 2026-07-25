const STATUS_STYLES = {
  New: 'bg-primary-50 text-primary-700 border-primary-200',
  Contacted: 'bg-amber-50 text-amber-700 border-amber-200',
  Closed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const STATUS_OPTIONS = ['New', 'Contacted', 'Closed'];

export default function LeadsTable({ leads, onStatusChange, updatingId }) {
  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {['Name', 'Email', 'Budget', 'Message', 'Status', 'Created Date'].map((h) => (
                <th
                  key={h}
                  className="whitespace-nowrap px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="transition-colors hover:bg-slate-50">
                <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">{lead.name}</td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">{lead.email}</td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">{lead.budget}</td>
                <td className="max-w-xs px-5 py-4 text-sm text-slate-600">
                  <span className="line-clamp-2">{lead.message}</span>
                </td>
                <td className="whitespace-nowrap px-5 py-4">
                  <select
                    value={lead.status}
                    disabled={updatingId === lead.id}
                    onChange={(e) => onStatusChange(lead.id, e.target.value)}
                    className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold shadow-sm transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-100 ${
                      STATUS_STYLES[lead.status] || 'bg-slate-50 text-slate-700 border-slate-200'
                    } ${updatingId === lead.id ? 'opacity-50' : ''}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">{formatDate(lead.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
