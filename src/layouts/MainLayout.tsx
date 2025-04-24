
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const showSidebar = !['/', '/login', '/signup'].includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-background">
      {showSidebar && <Sidebar />}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
