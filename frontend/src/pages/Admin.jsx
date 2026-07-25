import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios.js';
import StatsCards from '../components/admin/StatsCards.jsx';
import LeadsTable from '../components/admin/LeadsTable.jsx';
import LoadingSpinner from '../components/admin/LoadingSpinner.jsx';
import EmptyState from '../components/admin/EmptyState.jsx';

const BUDGET_OPTIONS = [
  'Below ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000 – ₹50,000',
  'Above ₹50,000',
];

const STATUS_OPTIONS = ['New', 'Contacted', 'Closed'];

export default function Admin() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const [nameSearch, setNameSearch] = useState('');
  const [emailSearch, setEmailSearch] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');

  const fetchStats = useCallback(async () => {
    try {
      const res = await api.get('/stats');
      setStats(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (nameSearch) params.name = nameSearch;
      if (emailSearch) params.email = emailSearch;
      if (budgetFilter) params.budget = budgetFilter;
      if (statusFilter) params.status = statusFilter;
      params.sort = sortOrder === 'latest' ? 'latest' : 'oldest';

      const res = await api.get('/leads', { params });
      setLeads(res.data.data);
    } catch (err) {
      setError('Failed to load leads. Please try again.');
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  }, [nameSearch, emailSearch, budgetFilter, statusFilter, sortOrder]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchLeads();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fetchLeads]);

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    const previous = leads;
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    try {
      await api.patch(`/leads/${id}`, { status });
      toast.success('Status updated');
      fetchStats();
    } catch (err) {
      setLeads(previous);
      toast.error('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const clearFilters = () => {
    setNameSearch('');
    setEmailSearch('');
    setBudgetFilter('');
    setStatusFilter('');
    setSortOrder('latest');
  };

  const hasActiveFilters = nameSearch || emailSearch || budgetFilter || statusFilter || sortOrder !== 'latest';

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-sm text-slate-500">Manage and track all incoming leads</p>
          </div>
          <Link to="/" className="btn-secondary">
            &larr; Back to Site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-6 py-8 lg:px-8">
        <StatsCards stats={stats} />

        <div className="card p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <input
              type="text"
              placeholder="Search by name..."
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Search by email..."
              value={emailSearch}
              onChange={(e) => setEmailSearch(e.target.value)}
              className="input-field"
            />
            <select value={budgetFilter} onChange={(e) => setBudgetFilter(e.target.value)} className="input-field">
              <option value="">All Budgets</option>
              {BUDGET_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-field">
              <option value="">All Statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="input-field">
              <option value="latest">Sort: Latest First</option>
              <option value="oldest">Sort: Oldest First</option>
            </select>
          </div>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="mt-3 text-sm font-medium text-primary-600 hover:text-primary-700">
              Clear all filters
            </button>
          )}
        </div>

        {loading ? (
          <LoadingSpinner label="Loading leads..." />
        ) : error ? (
          <div className="card p-10 text-center">
            <p className="text-sm font-medium text-red-600">{error}</p>
            <button onClick={fetchLeads} className="btn-primary mt-4">
              Retry
            </button>
          </div>
        ) : leads.length === 0 ? (
          <EmptyState
            title={hasActiveFilters ? 'No matching leads' : 'No leads yet'}
            subtitle={
              hasActiveFilters
                ? 'Try adjusting your search or filters.'
                : 'Leads submitted from the landing page will appear here.'
            }
          />
        ) : (
          <LeadsTable leads={leads} onStatusChange={handleStatusChange} updatingId={updatingId} />
        )}
      </main>
    </div>
  );
}
