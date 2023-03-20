import { Roboto_Mono } from 'next/font/google';
import splitbee from '@splitbee/web';
import './globals.css';

const robotoMono = Roboto_Mono({
    weight: ['200', '300', '400', '500', '600', '700'],
    subsets: ['latin']
});

export const metadata = {
    title: 'Snote',
    description: 'Create Your Short Notes'
};

// Initialize Splitbee
splitbee.init();

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={robotoMono.className}>
                <div className='h-full xl:w-[800px] lg:w-2/3 sm:w-4/5 mx-auto pt-4 px-4 sm:px-8'>{children}</div>
            </body>
        </html>
    );
}
