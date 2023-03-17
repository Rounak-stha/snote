'use client';

import HTMLPreview from '@/components/HTMLPreview';
import { getAllSnotes, SnoteData } from '@/lib/idb';
import { useEffect, useState } from 'react';

export default function Home() {
    const [snotes, setSnotes] = useState<SnoteData[]>();
    useEffect(() => {
        (async function () {
            const allSnotes = await getAllSnotes();
            setSnotes(allSnotes);
        })();
    }, []);
    return (
        <>
            <h1 className=''>All Notes</h1>
            {snotes &&
                snotes.map((snote) => (
                    <div key={snote.id} className='p-4 my-2'>
                        <HTMLPreview mdText={snote.md_note} />
                    </div>
                ))}
        </>
    );
}
