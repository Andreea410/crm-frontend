import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import OrganizationsClient from './OrganizationsClient';

export default async function OrganizationsPage() {
    const token = (await cookies()).get('auth-token')?.value;

    if (!token) {
        redirect('/login');
    }

    return (
        <div className="md:flex md:flex-col md:h-screen">
            <Topbar />
            <div className="md:flex md:grow overflow-visible relative z-[10]">
                <Sidebar />
                <main className="px-4 py-8 md:flex-1 md:p-12 overflow-visible relative z-[20]">
                    <OrganizationsClient />
                </main>
            </div>
        </div>
    );
}
