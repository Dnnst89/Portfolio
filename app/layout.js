import { Providers } from '@/redux/provider';
import './globals.css';
import { Inter } from 'next/font/google';
import { Poppins } from 'next/font/google';

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
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
