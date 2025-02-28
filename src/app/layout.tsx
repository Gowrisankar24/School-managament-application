import type { Metadata } from 'next';
import { Work_Sans, Roboto_Serif } from 'next/font/google';
import './globals.css';

const inter = Work_Sans({
    subsets: ['latin'],
    variable: '--font-work-sans',
    display: 'swap',
});

const roboto_mono = Roboto_Serif({
    subsets: ['latin'],
    variable: '--font-roboto-serif',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'School Management Dashboard',
    description: 'School Management Dashboard Application',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${roboto_mono.variable} overflow-hidden`}>
                {children}
            </body>
        </html>
    );
}
