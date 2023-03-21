import { Roboto_Mono } from 'next/font/google';
import './globals.css';

const robotoMono = Roboto_Mono({
    weight: ['200', '300', '400', '500', '600', '700'],
    subsets: ['latin']
});

export const metadata = {
    title: 'Snote',
    description: 'Create Your Short Notes'
};

const FooterData: { name: string; link: string }[] = [
    {
        name: 'GitHub',
        link: 'https://github.com/Rounak-stha/snote'
    },
    {
        name: 'MD_Editor',
        link: 'https://github.com/rounak-stha/markdown-editor'
    },
    {
        name: 'Developer',
        link: 'https://www.rounakstha.me'
    }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={robotoMono.className}>
                <div className='h-screen flex flex-col xl:w-[800px] lg:w-2/3 sm:w-4/5 mx-auto pt-4 px-4 sm:px-8'>
                    <div className='flex-1'>{children}</div>
                    <div className='flex justify-around flex-wrap text-gray-400 my-4 pt-3 border-t-2 border-slate-700'>
                        {FooterData.map(({ name, link }) => (
                            <a
                                key={name}
                                className='hover:underline hover:text-blue-500'
                                target='_blank'
                                rel='noopener noreferrer'
                                href={link}
                            >
                                {name}
                            </a>
                        ))}
                    </div>
                </div>
            </body>
        </html>
    );
}
