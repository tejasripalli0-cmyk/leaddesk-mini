const REASONS = [
  {
    title: 'No Login Friction',
    desc: 'Your team accesses the admin dashboard instantly — no authentication headaches to set up.',
  },
  {
    title: 'Zero External Dependencies',
    desc: 'SQLite ships inside the app itself, so there is nothing extra to provision or pay for.',
  },
  {
    title: 'Production-Ready Code',
    desc: 'Validated, modular, and structured the way real full-stack teams ship software.',
  },
  {
    title: 'Deploy in Minutes',
    desc: 'Pre-configured for Vercel (frontend) and Render (backend) out of the box.',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Why teams choose LeadDesk Mini</h2>
            <p className="mt-4 text-lg text-slate-600">
              We stripped away the complexity of typical CRM tools and kept only what matters:
              capturing leads and acting on them quickly.
            </p>
            <div className="mt-8 space-y-6">
              {REASONS.map((r) => (
                <div key={r.title} className="flex gap-4">
                  <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{r.title}</h4>
                    <p className="mt-1 text-sm text-slate-600">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-8">
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Setup Time', value: '< 5 min' },
                { label: 'Dependencies', value: 'SQLite only' },
                { label: 'Auth Required', value: 'None' },
                { label: 'Deploy Targets', value: 'Vercel + Render' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-primary-50 p-5 text-center">
                  <div className="text-2xl font-extrabold text-primary-700">{s.value}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
