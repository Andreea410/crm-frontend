'use client';

import { useState, useEffect, useRef } from 'react';

type SearchInputProps = {
    placeholder?: string;
    value: string;
    onChange: (query: string) => void;
    debounceTime?: number;
};

export default function SearchBar({
                                        placeholder = 'Search…',
                                        value,
                                        onChange,
                                        debounceTime = 300,
                                    }: SearchInputProps) {
    const [inputValue, setInputValue] = useState(value);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            onChange(inputValue.trim());
        }, debounceTime);
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [inputValue, debounceTime, onChange]);

    return (
        <input
            type="text"
            name="search"
            autoComplete="off"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="relative px-6 py-3 w-full rounded-r focus:shadow-outline focus:outline-none"
        />
    );
}
