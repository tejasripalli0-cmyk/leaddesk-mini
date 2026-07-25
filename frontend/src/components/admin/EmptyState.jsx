export default function EmptyState({ title = 'No leads found', subtitle = 'Try adjusting your filters or search terms.' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
        📭
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="max-w-sm text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}
