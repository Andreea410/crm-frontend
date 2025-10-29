'use client';

import { useState, useRef, useEffect } from 'react';

type FilterSearchBarProps = {
    trashed: string;
    onTrashedChange: (value: string) => void;
    searchValue: string;
    onSearchChange: (value: string) => void;
    onReset: () => void;
};

export default function FilterSearchBar({
                                            trashed,
                                            onTrashedChange,
                                            searchValue,
                                            onSearchChange,
                                            onReset,
                                        }: FilterSearchBarProps) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => document.removeEventListener('click', handleClickOutside, true);
    }, []);

    return (
        <div ref={containerRef} className="relative flex items-center mr-4 w-full max-w-md z-[100]">
            <div className="flex w-full bg-white rounded shadow">
                <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    className="focus:z-10 px-4 hover:bg-gray-100 border-r focus:border-white rounded-l focus:ring md:px-6 flex items-center"
                >
                    <div className="flex items-baseline">
                        <span className="hidden text-gray-700 md:inline">Filter</span>
                        <svg
                            className={`w-2 h-2 fill-gray-700 md:ml-2 transition-transform ${
                                open ? 'rotate-180' : ''
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 961.243 599.998"
                        >
                            <path d="M239.998 239.999L0 0h961.243L721.246 240c-131.999 132-240.28 240-240.624 239.999-.345-.001-108.625-108.001-240.624-240z"></path>
                        </svg>
                    </div>
                </button>

                <input
                    className="relative px-6 py-3 w-full rounded-r focus:shadow-outline focus:outline-none text-gray-700"
                    autoComplete="off"
                    type="text"
                    name="search"
                    placeholder="Search…"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            {/* Reset button */}
            <button
                onClick={onReset}
                className="ml-3 text-gray-500 hover:text-gray-700 focus:text-indigo-500 text-sm"
                type="button"
            >
                Reset
            </button>

            {open && (
                <div className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 w-56 p-4 z-[9999]">
                    <label htmlFor="trashed" className="block text-sm font-medium text-gray-700 mb-2">
                        Trashed:
                    </label>
                    <select
                        id="trashed"
                        value={trashed}
                        onChange={(e) => {
                            onTrashedChange(e.target.value);
                            setOpen(false);
                        }}
                        className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    >
                        <option value="">—</option>
                        <option value="with">With Trashed</option>
                        <option value="only">Only Trashed</option>
                    </select>
                </div>
            )}
        </div>
    );
}
