'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import ContactsTable from '@/components/ContactsTable';
import Pagination from '@/components/Pagination';
import FilterSearchBar from '@/components/FilterSearchBar';
import {useRouter, useSearchParams} from "next/navigation";

export default function ContactsClient() {
    const [contacts, setContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [trashed, setTrashed] = useState('');
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const abortRef = useRef<AbortController | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (searchParams.get('success') === '1') {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
                const url = new URL(window.location.href);
                url.searchParams.delete('success');
                router.replace(url.toString(), { scroll: false });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [searchParams, router]);

    const fetchContacts = useCallback(async () => {
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

            const url = `${process.env.NEXT_PUBLIC_API_URL}/api/contacts?${params.toString()}`;

            const res = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: token ? `Bearer ${token}` : '',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'include',
                cache: 'no-store',
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();

            const data = json?.props?.contacts?.data || [];
            setContacts(data);
            setLastPage(json?.props?.contacts?.last_page || 1);
        } catch (err) {
            console.error('Error fetching contacts:', err);
            setContacts([]);
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery, trashed, page]);

    useEffect(() => {
        fetchContacts();
        return () => abortRef.current?.abort();
    }, [fetchContacts]);

    return (
        <div>
            {showSuccess && (
                <div className="mb-6 flex items-center justify-between rounded-md bg-green-500 px-4 py-3 text-white shadow">
                    <div className="flex items-center space-x-2">
                        <svg
                            className="w-5 h-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Contact created.</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowSuccess(false)}
                        className="text-white hover:text-gray-200"
                    >
                        ×
                    </button>
                </div>
            )}

            <div className="flex items-center justify-between mb-6">
                <FilterSearchBar
                    trashed={trashed}
                    onTrashedChange={(value) => {
                        setTrashed(value);
                        setPage(1);
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
                    onClick={() => router.push('/contacts/create')}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">
                    Create Contact
                </button>
            </div>

            <h1 className="text-3xl font-bold mb-6">Contacts</h1>

            {isLoading ? (
                <div className="text-gray-500 text-center py-8">Loading...</div>
            ) : (
                <>
                    <ContactsTable contacts={contacts} />
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
