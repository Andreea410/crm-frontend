'use client';

type Contact = {
    id: number;
    name: string;
    organization?: { name: string };
    city?: string;
};

export default function ContactsTable({ contacts }: { contacts: Contact[] }) {
    if (!contacts.length) {
        return (
            <div className="text-center text-gray-500 py-8">
                No contacts found.
            </div>
        );
    }

    return (
        <table className="min-w-full border rounded-lg bg-white">
            <thead>
            <tr className="border-b bg-gray-50 text-left text-sm font-medium text-gray-700">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Organization</th>
                <th className="px-4 py-3">City</th>
            </tr>
            </thead>
            <tbody className="divide-y">
            {contacts.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                    <td className="px-4 py-3 text-gray-600">{c.organization?.name || '-'}</td>
                    <td className="px-4 py-3 text-gray-600">{c.city || '-'}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
