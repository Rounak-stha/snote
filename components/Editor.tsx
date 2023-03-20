'use client';

import useMDEditor from '@/editor/Editor';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import EditorHead from './EditorHead';
import { createSnote, getSnoteById, updateSnote } from '@/lib/idb';
import EditorAndPreview from './EditorAndPreview';

// Types
import type { SnoteData } from '@/lib/idb';
import IconLabelButton from './IconLabelButton';
import NoteIcon from '@/Icons/NoteIcon';

export type ViewState = 'editor' | 'preview';

export default function Editor() {
    const [viewState, setViewState] = useState<ViewState>('editor');
    const [doc, setDoc] = useState('');
    const [refContainer, Editor] = useMDEditor(setDoc);
    const [currSnote, setCurrSnote] = useState<SnoteData>();
    const router = useRouter();
    const getSearchParams = useSearchParams().get;

    let docId = 0;

    if (getSearchParams('edit')) docId = parseInt(getSearchParams('edit') as string);

    // Auto Focus Editor
    // https://discuss.codemirror.net/t/how-to-autofocus-in-cm6/2966/2
    useEffect(() => {
        setTimeout(() => {
            Editor?.focus();
        }, 500);
    }, [Editor]);

    useEffect(() => {
        if (!docId) return;
        (async () => {
            const snote = await getSnoteById(docId);
            if (!snote) return;
            // Editor Changes updates the { doc } calling { setDoc }
            setCurrSnote(snote);
            Editor?.dispatch({
                changes: {
                    from: 0,
                    to: doc.length,
                    insert: snote.md_note
                }
            });
        })();
    }, [docId, Editor]);

    return (
        <div>
            <div className='flex items-center'>
                <div className='flex-1'>
                    <EditorHead setViewState={setViewState} viewState={viewState} />
                </div>
                <div className=''>
                    <IconLabelButton
                        Icon={NoteIcon}
                        disabled={!doc}
                        onClick={async () => {
                            if (!doc) return;
                            if (docId) updateSnote(docId, doc);
                            else createSnote(doc);
                            router.push('/');
                        }}
                        className='py-2 ml-auto'
                    >
                        {docId ? 'Update' : 'Create'}
                    </IconLabelButton>
                </div>
            </div>
            <div className='my-4'>
                <EditorAndPreview refContainer={refContainer} doc={doc} viewState={viewState} />
            </div>
        </div>
    );
}
