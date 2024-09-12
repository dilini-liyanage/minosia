import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

const ubernist = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Minosia',
  description: 'Created by Sampath ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ubernist.className}>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
