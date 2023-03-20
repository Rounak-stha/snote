import NoteCreateNavBtn from '@/components/NoteCreateNavBtn';
import { ArchiveState } from '../page';

export default function NoNotesPage({ archiveState }: { archiveState: ArchiveState }) {
    return (
        <div className='mt-24 w-full mx-auto'>
            <div className='flex flex-col gap-6 items-center'>
                <h1 className='text-[1.8rem]'>You do not have any {archiveState == 'archived' && 'archived'} notes.</h1>
                <p>Create a new note!</p>
                <NoteCreateNavBtn />
            </div>
        </div>
    );
}
