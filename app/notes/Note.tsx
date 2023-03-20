import IconButton from '@/components/IconButton';
import HTMLPreview from '@/components/HTMLPreview';
import ArchiveIcon from '@/Icons/ArchiveIcon';
import DeleteIcon from '@/Icons/DeleteIcon';
import EditIcon from '@/Icons/EditIcon';
import { changeSnoteArchiveState, deleteSnote } from '@/lib/idb';
import { useRouter } from 'next/navigation';

// Type
import type { SnoteData } from '@/lib/idb';
import type { NoteActionToIconMap, SnoteActionsType } from './NotesTypes';

const IconMap: NoteActionToIconMap = {
    edit: EditIcon,
    delete: DeleteIcon,
    archive: ArchiveIcon
};

const snoteActionNames = Object.keys(IconMap);

export default function Note({ snote, snoteActions }: { snote: SnoteData; snoteActions: SnoteActionsType }) {
    const router = useRouter();
    return (
        <div
            key={snote.id}
            className='cursor-pointer transition-transform duration-200 hover:scale-[.98] flex gap-6 my-4 p-6 border border-slate-700 rounded-md'
        >
            <div className='flex flex-col justify-center gap-2'>
                {snoteActionNames.map((option) => (
                    <IconButton
                        key={option}
                        onClick={() => {
                            snoteActions[option as keyof SnoteActionsType](snote.id as number);
                        }}
                        Icon={IconMap[option as keyof NoteActionToIconMap]}
                        className={`${option == 'edit' && 'hover:border-green-500 hover:text-green-500'} ${
                            option == 'delete' && 'hover:border-red-500 hover:text-red-500'
                        } ${option == 'archive' && 'hover:border-blue-500 hover:text-blue-500'}
                            `}
                    />
                ))}
            </div>
            <div className='flex-1'>
                <HTMLPreview mdText={snote.md_note} />
            </div>
        </div>
    );
}
