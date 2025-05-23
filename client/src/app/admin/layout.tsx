export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <header className="bg-gray-800 text-white p-4 shadow">
        <h1 className="text-lg font-bold">Admin Panel</h1>
      </header>

      <main className="flex-grow p-6">
        {children}
      </main>

      <footer className="bg-gray-800 text-white text-sm p-4 text-center">
        &copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.
      </footer>
    </div>
  );
}
