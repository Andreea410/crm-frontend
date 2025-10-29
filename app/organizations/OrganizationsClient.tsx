'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import OrganizationsTable from '@/components/OrganizationsTable';
import Pagination from '@/components/Pagination';
import FilterSearchBar from '@/components/FilterSearchBar';


export default function OrganizationsClient() {
    const [organizations, setOrganizations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [trashed, setTrashed] = useState('');
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const abortRef = useRef<AbortController | null>(null);
    const router = useRouter();

    const fetchOrganizations = useCallback(async () => {
        setIsLoading(true);

        try {
            const token = document.cookie
                .split('; ')
                .find((row) => row.startsWith('auth-token='))
                ?.split('=')[1];

            const params = new URLSearchParams();
            if (searchQuery) params.append('search', searchQuery);
            if (trashed) params.append('trashed', trashed);
            params.append('page', String(page));

            const url = `${process.env.NEXT_PUBLIC_API_URL}/api/organizations?${params.toString()}`;

            const res = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: token ? `Bearer ${token}` : '',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'include',
            });

            if (!res.ok) throw new Error(`HTTP error ${res.status}`);
            const json = await res.json();
            const orgs = json?.props?.organizations?.data || [];

            setOrganizations(orgs);
            setLastPage(json?.props?.organizations?.last_page || 1);
        } catch (err) {
            console.error('Error fetching organizations:', err);
            setOrganizations([]);
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery, trashed, page]);

    useEffect(() => {
        fetchOrganizations();
        return () => abortRef.current?.abort();
    }, [fetchOrganizations]);

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <FilterSearchBar
                    trashed={trashed}
                    onTrashedChange={(value) => {
                        setTrashed(value);
                        setPage(1); // reset to first page when filter changes
                    }}
                    searchValue={searchQuery}
                    onSearchChange={(value) => {
                        setSearchQuery(value);
                        setPage(1);
                    }}
                    onReset={() => {
                        setTrashed('');
                        setSearchQuery('');
                        setPage(1);
                    }}
                />

                <button
                    onClick={() => router.push('/organizations/create')}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                >
                    Create Organization
                </button>
            </div>

            <h1 className="text-3xl font-bold mb-6">Organizations</h1>

            {isLoading ? (
                <div className="text-gray-500 text-center py-8">Loading...</div>
            ) : (
                <>
                    <OrganizationsTable organizations={organizations} />
                    <Pagination
                        currentPage={page}
                        lastPage={lastPage}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                </>
            )}
        </div>
    );
}
