'use client';

import { useState, useEffect } from 'react';

type Organization = {
    id: number;
    name: string;
    city: string;
    phone: string;
};

export default function OrganizationsTable() {
    const [organizations, setOrganizations] = useState<Organization[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const token = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('auth-token='))
                    ?.split('=')[1];

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organizations`, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                    credentials: 'include',
                    cache: 'no-store',
                });

                if (!res.ok) throw new Error('Failed to fetch organizations');

                const json = await res.json();

                const organizations = json?.props?.organizations?.data || [];

                console.log('Fetched organizations:', organizations);
                setOrganizations(organizations);
            } catch (err) {
                console.error(err);
                setOrganizations([]);
            }
        }

        fetchData();
    }, []);


    return (
        <table className="min-w-full border rounded-lg bg-white">
            <thead>
            <tr className="border-b bg-gray-50 text-left text-sm font-medium text-gray-700">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Phone</th>
            </tr>
            </thead>
            <tbody className="divide-y">
            {organizations.length > 0 ? (
                organizations.map((org) => (
                    <tr key={org.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{org.name}</td>
                        <td className="px-4 py-3 text-gray-600">{org.city}</td>
                        <td className="px-4 py-3 text-gray-600">{org.phone}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td
                        colSpan={3}
                        className="px-4 py-6 text-center text-gray-400 text-sm"
                    >
                        No organizations found
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
}
