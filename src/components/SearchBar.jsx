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
      <div className="flex overflow-hidden rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/5">
        <div className="relative flex flex-1 items-center">
          <span className="pointer-events-none absolute left-5 text-slate-400" aria-hidden="true">
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
            className="w-full border-0 bg-transparent py-4 pl-14 pr-4 text-base text-[#0F172A] outline-none placeholder:text-slate-400 sm:text-lg"
          />
        </div>
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-[#2563EB] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
        >
          Search
        </button>
      </div>
    </form>
  );
}
