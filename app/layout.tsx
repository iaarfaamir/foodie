import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Foodie | Delicious food delivered',
  description: 'Foodie is a restaurant ordering platform built with Next.js, Tailwind CSS, and MongoDB.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-background text-text">
      <body>{children}</body>
    </html>
  );
}
