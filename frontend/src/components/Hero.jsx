export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white">
      <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary-100 blur-3xl opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center animate-fadeInUp">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-xs font-semibold text-primary-700">
            🚀 Lead capture, simplified
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Turn visitors into leads,
            <span className="block text-primary-600">without the clutter.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            LeadDesk Mini gives you a beautiful capture form and a live admin dashboard
            to track, filter and manage every lead — in one lightweight app.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#contact" className="btn-primary px-8 py-3 text-base">
              Get Started Free
            </a>
            <a href="/admin" className="btn-secondary px-8 py-3 text-base">
              View Admin Dashboard
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
