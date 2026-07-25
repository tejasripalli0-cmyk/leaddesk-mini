const FEATURES = [
  {
    title: 'Instant Lead Capture',
    desc: 'A clean, validated form that captures name, email, budget and message in seconds.',
    icon: '⚡',
  },
  {
    title: 'Live Admin Dashboard',
    desc: 'See every lead the moment it comes in, with real-time stats and status tracking.',
    icon: '📊',
  },
  {
    title: 'Search & Filter',
    desc: 'Instantly find leads by name, email, budget range or status.',
    icon: '🔍',
  },
  {
    title: 'One-Click Status Updates',
    desc: 'Move leads from New to Contacted to Closed with a single dropdown.',
    icon: '✅',
  },
  {
    title: 'Lightweight SQLite',
    desc: 'No external database setup — your data lives in a single portable file.',
    icon: '🗄️',
  },
  {
    title: 'Built to Deploy',
    desc: 'Ready-made configs for Vercel and Render — ship in minutes.',
    icon: '🚀',
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Everything you need to manage leads</h2>
        <p className="mt-4 text-lg text-slate-600">
          Simple, fast, and focused on what actually matters — capturing and converting leads.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="card group p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-2xl transition-transform group-hover:scale-110">
              {f.icon}
            </div>
            <h3 className="mt-5 text-lg font-semibold text-slate-900">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
