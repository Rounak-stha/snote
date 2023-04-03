// Type
import type { SnoteData } from '@/lib/idb'
import type { NoteActionToIconMap, SnoteActionsType } from './NotesTypes'

import { useRef, useState } from 'react'
import IconButton from '@/components/IconButton'
import HTMLPreview from '@/components/HTMLPreview'
import ArchiveIcon from '@/Icons/ArchiveIcon'
import DeleteIcon from '@/Icons/DeleteIcon'
import EditIcon from '@/Icons/EditIcon'
import DownIcon from '@/Icons/DownIcon'
import UpIcon from '@/Icons/UpIcon'
import useCheckOverflow from '@/lib/useCheckOverflow'

const IconMap: NoteActionToIconMap = {
    edit: EditIcon,
    delete: DeleteIcon,
    archive: ArchiveIcon
}

const snoteActionNames = Object.keys(IconMap)

export default function Note({ snote, snoteActions }: { snote: SnoteData; snoteActions: SnoteActionsType }) {
    const noteContainer = useRef<HTMLDivElement | null>(null)
    const noteOverflows = useCheckOverflow(noteContainer)
    const [noteExpanded, setNoteExpanded] = useState(false)
    return (
        <div
            key={snote.id}
            className='cursor-pointer transition-transform duration-200 hover:scale-[.98] flex gap-6 my-4 border border-slate-700 rounded-md px-6'
        >
            <div className='flex flex-col justify-center gap-2 py-6'>
                {snoteActionNames.map((option) => (
                    <IconButton
                        key={option}
                        onClick={() => {
                            snoteActions[option as keyof SnoteActionsType](snote.id as number)
                        }}
                        Icon={IconMap[option as keyof NoteActionToIconMap]}
                        className={`${option == 'edit' && 'hover:border-green-500 hover:text-green-500'} ${
                            option == 'delete' && 'hover:border-red-500 hover:text-red-500'
                        } ${option == 'archive' && 'hover:border-blue-500 hover:text-blue-500'}
                            `}
                    />
                ))}
            </div>
            <div className={`flex-1 py-6 ${noteOverflows && 'pb-0'}`}>
                <div
                    ref={noteContainer}
                    className={`${noteOverflows && noteExpanded ? 'h-fit' : 'h-28'} overflow-hidden`}
                >
                    <HTMLPreview mdText={snote.md_note} />
                </div>
                {noteOverflows && (
                    <div
                        onClick={() => setNoteExpanded((prev) => !prev)}
                        className='rounded-sm h-7 py-1 my-2 flex justify-center items-center hover:bg-[#22262a]'
                    >
                        <span className='text-slate-500 inline-block h-4 w-4'>
                            {noteExpanded ? <UpIcon /> : <DownIcon />}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
