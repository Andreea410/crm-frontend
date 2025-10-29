'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import SearchBar from '@/components/SearchBar';
import OrganizationsTable from '@/components/OrganizationsTable';

export default function OrganizationsClient() {
    const [organizations, setOrganizations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const abortRef = useRef<AbortController | null>(null);

    const fetchOrganizations = useCallback(async () => {
        if (abortRef.current) if ("abort" in abortRef.current) {
            abortRef.current.abort();
        }
        const controller = new AbortController();
        abortRef.current = controller;

        setIsLoading(true);
        try {
            const token = document.cookie
                .split('; ')
                .find((row) => row.startsWith('auth-token='))
                ?.split('=')[1];

            const base = `${process.env.NEXT_PUBLIC_API_URL}/api/organizations`;
            const url = searchQuery
                ? `${base}?search=${encodeURIComponent(searchQuery)}`
                : base;

            const res = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: token ? `Bearer ${token}` : '',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'include',
                cache: 'no-store',
                signal: controller.signal,
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const json = await res.json();
            const orgs = json?.props?.organizations?.data || [];
            setOrganizations(orgs);
        } catch (err: any) {
            if (err.name !== 'AbortError') {
                console.error('Error fetching organizations:', err);
                setOrganizations([]);
            }
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        console.log("Search query changed:", searchQuery);
        fetchOrganizations();
        return () => abortRef.current?.abort();
    }, [fetchOrganizations]);

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <SearchBar placeholder="Search organizations..." onSearch={setSearchQuery} />
                <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">
                    Create Organization
                </button>
            </div>

            <h1 className="text-3xl font-bold mb-6">Organizations</h1>

            {isLoading ? (
                <div className="text-gray-500 text-center py-8">Loading...</div>
            ) : (
                <OrganizationsTable organizations={organizations} />
            )}
        </div>
    );
}
