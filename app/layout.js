import { Providers } from '@/redux/provider';
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import TopMenu from '@/components/TopMenu';
import { Poppins } from 'next/font/google';
import Hero from '@/components/Hero';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'detinmarin',
    description: 'DetinMarin',
};

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '700'],
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${poppins.className} bg-resene`}>
                <Providers>
                    <TopMenu />
                    <Navbar />

                    {children}
                </Providers>
            </body>
        </html>
    );
}
