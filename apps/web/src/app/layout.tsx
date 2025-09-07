import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StudyHub - Digital Study Materials Marketplace',
  description: 'Premium digital study materials for IELTS, GRE, TOEFL, GMAT and more. Download PDFs, ZIP files, and comprehensive study guides.',
  keywords: 'study materials, IELTS, GRE, TOEFL, GMAT, digital downloads, exam preparation',
  authors: [{ name: 'StudyHub Team' }],
  openGraph: {
    title: 'StudyHub - Digital Study Materials Marketplace',
    description: 'Premium digital study materials for IELTS, GRE, TOEFL, GMAT and more.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudyHub - Digital Study Materials Marketplace',
    description: 'Premium digital study materials for IELTS, GRE, TOEFL, GMAT and more.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}