import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import OrganizationsTable from '@/components/OrganizationsTable';

export default async function OrganizationsPage() {
    const token = (await cookies()).get('auth-token')?.value;
    if (!token) redirect('/login');

    return (
        <div className="md:flex md:flex-col md:h-screen">
            <Topbar />
            <div className="md:flex md:grow md:overflow-hidden">
                <Sidebar />
                <main className="px-4 py-8 md:flex-1 md:p-12 md:overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold">Organizations</h1>
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                            Create Organization
                        </button>
                    </div>
                    <OrganizationsTable />
                </main>
            </div>
        </div>
    );
}
