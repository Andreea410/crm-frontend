'use client';

import { useState, useEffect, useRef } from 'react';

type SearchBarProps = {
    placeholder?: string;
    onSearch: (query: string) => void;
    debounceTime?: number;
};

export default function SearchBar({
                                      placeholder = 'Search...',
                                      onSearch,
                                      debounceTime = 300,
                                  }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Clear old debounce
        if (debounceRef.current) clearTimeout(debounceRef.current);

        // Debounce logic
        debounceRef.current = setTimeout(() => {
            onSearch(query.trim());
        }, debounceTime);

        // Cleanup
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [query, debounceTime, onSearch]);

    const handleReset = () => {
        setQuery('');
        onSearch(''); // trigger immediate reset
    };

    return (
        <div className="flex items-center gap-2">
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-64 rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
            />
            {query && (
                <button
                    onClick={handleReset}
                    className="text-sm text-gray-500 hover:text-gray-700"
                >
                    Reset
                </button>
            )}
        </div>
    );
}
