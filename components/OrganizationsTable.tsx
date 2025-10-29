'use client';

type Organization = {
    id: number;
    name: string;
    city: string;
    phone: string;
};

type Props = {
    organizations: Organization[];
};

export default function OrganizationsTable({ organizations }: Props) {
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
                    <td colSpan={3} className="px-4 py-6 text-center text-gray-400 text-sm">
                        No organizations found
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
}
