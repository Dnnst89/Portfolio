import { Providers } from '@/redux/provider';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Detin Marin',
    description: 'Detin Marin',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {' '}
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
