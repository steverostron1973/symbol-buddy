import { useState, type FormEvent } from 'react';

interface Props {
  category?: string;
  placeholder?: string;
}

export default function SearchBar({
  category,
  placeholder = 'Search laundry, recycling, dashboard lights, hazard symbols…',
}: Props) {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) return;

    const params = new URLSearchParams({ q: trimmed });
    if (category) {
      params.set('category', category);
    }

    window.location.href = `/search?${params.toString()}`;
  };

  return (
    <form onSubmit={handleSubmit} className="w-full" role="search">
      <label htmlFor="symbol-search" className="sr-only">
        Search symbols
      </label>
      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-5 text-secondary/40" aria-hidden="true">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          id="symbol-search"
          type="search"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-slate-200/80 bg-card py-4 pl-14 pr-32 text-base text-secondary shadow-sm outline-none transition-all placeholder:text-secondary/40 focus:border-primary focus:ring-4 focus:ring-primary/10 sm:py-5 sm:text-lg"
        />
        <button
          type="submit"
          className="absolute right-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 sm:px-6 sm:py-3 sm:text-base"
        >
          Search
        </button>
      </div>
    </form>
  );
}
