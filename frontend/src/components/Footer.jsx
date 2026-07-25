export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
              L
            </span>
            <span className="font-semibold text-white">LeadDesk Mini</span>
          </div>
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} LeadDesk Mini. All rights reserved.
          </p>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-6 text-center text-sm text-slate-400">
          Built for Digital Heroes Training Task &middot;{' '}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary-400 hover:text-primary-300"
          >
            digitalheroesco.com
          </a>
        </div>
      </div>
    </footer>
  );
}
