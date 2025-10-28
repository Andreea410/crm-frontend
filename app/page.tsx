import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default async function HomePage() {
  const token = (await cookies()).get('auth-token')?.value;
  if (!token) redirect('/login');

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) redirect('/login');

  return (
    <div className="md:flex md:flex-col md:h-screen">
      <Topbar />
      <div className="md:flex md:grow md:overflow-hidden">
        <Sidebar />
        <main className="px-4 py-8 md:flex-1 md:p-12 md:overflow-y-auto">
          <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
          <p className="mb-8 leading-normal">
            Hey there! Welcome to Ping CRM, a demo app designed to help illustrate how{' '}
            <a
              className="text-indigo-500 hover:text-orange-600 underline"
              href="https://inertiajs.com"
            >
              Inertia.js
            </a>{' '}
            works.
          </p>
        </main>
      </div>
    </div>
  );
}
