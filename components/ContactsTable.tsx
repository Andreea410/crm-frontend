'use client';

import { useState, useEffect } from 'react';

type Contact = {
    id: number;
    name: string;
    city: string;
    organization: {
        name: string;
    } | null;
};

export default function ContactsTable() {
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const token = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('auth-token='))
                    ?.split('=')[1];

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                    credentials: 'include',
                    cache: 'no-store',
                });

                if (!res.ok) throw new Error('Failed to fetch contacts');

                const json = await res.json();
                const contacts = json?.props?.contacts?.data || [];

                console.log('Fetched contacts:', contacts);
                setContacts(contacts);
            } catch (err) {
                console.error(err);
                setContacts([]);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="bg-white rounded-lg border shadow-sm">
            <table className="min-w-full">
                <thead>
                <tr className="border-b bg-gray-50 text-left text-sm font-medium text-gray-700">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Organization</th>
                    <th className="px-4 py-3">City</th>
                </tr>
                </thead>
                <tbody className="divide-y">
                {contacts.length > 0 ? (
                    contacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900">
                                {contact.name}
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                                {contact.organization?.name || '—'}
                            </td>
                            <td className="px-4 py-3 text-gray-600">{contact.city}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={3}
                            className="px-4 py-6 text-center text-gray-400 text-sm"
                        >
                            No contacts found
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
