import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useState } from 'react';
import api from '../api/axios.js';

const BUDGET_OPTIONS = [
  'Below ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000 – ₹50,000',
  'Above ₹50,000',
];

export default function LeadForm() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await api.post('/leads', data);
      toast.success("Thanks! We've received your details.");
      reset();
    } catch (err) {
      const message =
        err.response?.data?.errors?.[0]?.message ||
        err.response?.data?.message ||
        'Something went wrong. Please try again.';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Let's talk about your project</h2>
          <p className="mt-4 text-lg text-slate-600">
            Fill out the form below and our team will get back to you shortly.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="card mt-12 space-y-5 p-8">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Jane Doe"
              className="input-field"
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
              })}
            />
            {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="jane@example.com"
              className="input-field"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
            />
            {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-slate-700">
              Budget
            </label>
            <select
              id="budget"
              defaultValue=""
              className="input-field"
              {...register('budget', { required: 'Please select a budget range' })}
            >
              <option value="" disabled>
                Select a budget range
              </option>
              {BUDGET_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            {errors.budget && <p className="mt-1.5 text-sm text-red-600">{errors.budget.message}</p>}
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Tell us a bit about what you need..."
              className="input-field resize-none"
              {...register('message', {
                required: 'Message is required',
                minLength: { value: 10, message: 'Message must be at least 10 characters' },
              })}
            />
            {errors.message && <p className="mt-1.5 text-sm text-red-600">{errors.message.message}</p>}
          </div>

          <button type="submit" disabled={submitting} className="btn-primary w-full py-3 text-base">
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  );
}
