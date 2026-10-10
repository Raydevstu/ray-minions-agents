import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import AnimatedBackground from './AnimatedBackground';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden neural-grid">
      <AnimatedBackground />
      <Sidebar />
      <div className="flex flex-col flex-1 ml-[72px] h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
