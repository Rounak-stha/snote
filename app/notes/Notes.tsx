'use client';

import { changeSnoteArchiveState, deleteSnote, getAllSnotes, SnoteData } from '@/lib/idb';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import LoadingNotes from './LoadingNote';
import NoNotesPage from './NoNotesPage';
import Note from './Note';
import { SnoteActionsType } from './NotesTypes';

interface Props {
    archiveState: 'archived' | 'unarchived';
}

export default function Notes({ archiveState }: Props) {
    const [snotes, setSnotes] = useState<SnoteData[]>([]);
    const [loadingNotes, setLoadingNotes] = useState<boolean>(true);
    const router = useRouter();

    const snoteActions: SnoteActionsType = {
        delete: useCallback(
            (id: number) => {
                const deleted = deleteSnote(id);
                if (!deleted) console.error('Could not delete note');
                else setSnotes(snotes.filter((snote: SnoteData) => snote.id != id));
            },
            [snotes, setSnotes]
        ),

        archive: useCallback(
            (id: number) => {
                const archived = changeSnoteArchiveState(id);
                if (!archived) console.error('Could not delete note');
                else setSnotes(snotes.filter((snote: SnoteData) => snote.id != id));
            },
            [snotes, setSnotes]
        ),

        edit: useCallback((id: number) => {
            router.push(`new?edit=${id}`);
        }, [])
    };

    useEffect(() => {
        (async function () {
            const allSnotes = await getAllSnotes(archiveState);
            setLoadingNotes(false);
            setSnotes(allSnotes);
        })();
    }, [archiveState]);

    return (
        <>
            {loadingNotes ? (
                <LoadingNotes />
            ) : snotes.length ? (
                snotes.map((snote) => <Note key={snote.id} snote={snote} snoteActions={snoteActions} />)
            ) : (
                <NoNotesPage archiveState={archiveState} />
            )}
        </>
    );
}
