'use client';

import { useState, useRef, useEffect } from 'react';

type FilterDropdownProps = {
    trashed: string;
    onTrashedChange: (value: string) => void;
};

export default function FilterDropdown({ trashed, onTrashedChange }: FilterDropdownProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);


    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="focus:z-10 px-4 md:px-6 hover:bg-gray-100 border-r focus:border-white rounded-l focus:ring flex items-center bg-white text-gray-700"
            >
                <div className="flex items-baseline">
                    <span className="hidden md:inline font-medium">Filter</span>
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

            {open && (
                <div
                    className="absolute left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-[9999]"
                >
                    <div className="p-4">
                        <label
                            htmlFor="trashed"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
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
                </div>
            )}
        </div>
    );
}
