'use client';

import { useState } from 'react';
import Notes from './notes/Notes';
import NoteCreateNavBtn from '@/components/NoteCreateNavBtn';

export type ArchiveState = 'unarchived' | 'archived';

export default function Home() {
    const [archiveState, setArchiveState] = useState<ArchiveState>('unarchived');
    return (
        <>
            <div className='flex items-center'>
                <div className='flex gap-6 flex-1 text-xl'>
                    <h1
                        className={`cursor-pointer py-1 ${
                            archiveState == 'unarchived' && 'border-b-[3px] border-blue-500'
                        }`}
                        onClick={() => setArchiveState('unarchived')}
                    >
                        All
                    </h1>
                    <h1
                        className={`cursor-pointer py-1 ${
                            archiveState == 'archived' && 'border-b-[3px] border-blue-500'
                        }`}
                        onClick={() => setArchiveState('archived')}
                    >
                        Archived
                    </h1>
                </div>
                <NoteCreateNavBtn />
            </div>
            <div className='my-6 [&>:first-child]:mt-0'>
                <Notes archiveState={archiveState} />
            </div>
        </>
    );
}
