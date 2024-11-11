import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cakes by Naty',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
