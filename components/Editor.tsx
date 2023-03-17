'use client';

import useMDEditor from '@/editor/Editor';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';
import EditorHead from './EditorHead';
import HTMLPreview from './HTMLPreview';
import { createSnote } from '@/lib/idb';

const initialDoc = `# Heading 1
## Heading 2
### Heading 2

Body Text

\`\`\`js
const a = 1;
\`\`\`
`;

async function handleNoteCreation(doc: string): Promise<void> {
    await createSnote(doc);
}

export type ViewState = 'editor' | 'preview';

export default function Editor() {
    const [viewState, setViewState] = useState<ViewState>('editor');
    const [doc, setDoc] = useState('');
    const router = useRouter();
    const [refContainer, Editor] = useMDEditor(setDoc, initialDoc);

    return (
        <div>
            <div className='flex items-center'>
                <div className='flex-1'>
                    <EditorHead setViewState={setViewState} viewState={viewState} />
                </div>
                <div className=''>
                    <Button
                        onClick={async () => {
                            createSnote(doc);
                            router.push('/');
                        }}
                        className='py-2 ml-auto'
                    >
                        Create
                    </Button>
                </div>
            </div>
            <div className='my-4'>
                <div className={`${viewState !== 'editor' && 'hidden'} h-full`} ref={refContainer}></div>
                {viewState === 'preview' && <HTMLPreview mdText={doc} />}
            </div>
        </div>
    );
}
