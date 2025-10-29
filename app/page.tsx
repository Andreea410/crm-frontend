import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
		<div className="flex min-h-screen bg-gray-100">
			<aside className="hidden md:flex md:flex-col w-56 bg-indigo-800 text-white">
				<div className="flex items-center justify-center py-4 border-b border-indigo-700">
					<img src="/ping-logo.svg" alt="Ping CRM" className="h-8" />
				</div>

          <nav className="flex-1 p-4">
            <a href="/" className="block py-3 px-2 bg-indigo-900 rounded-md text-white">
              Dashboard
            </a>
            <a href="/contacts" className="block py-3 px-2 text-indigo-300 hover:bg-indigo-700 hover:text-white rounded-md">
              Contacts
            </a>
            <a href="/organizations" className="block py-3 px-2 text-indigo-300 hover:bg-indigo-700 hover:text-white rounded-md">
              Organizations
            </a>
            <a href="/reports" className="block py-3 px-2 text-indigo-300 hover:bg-indigo-700 hover:text-white rounded-md">
              Reports
            </a>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <div className="font-semibold text-gray-700">Acme Corporation</div>
            <div className="text-gray-700">John Doe</div>
          </header>

          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here’s your Ping CRM dashboard overview.
          </p>
        </main>
      </div>
  );
}
