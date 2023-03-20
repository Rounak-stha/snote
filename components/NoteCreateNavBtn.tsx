import IconLabelButton from './IconLabelButton';
import NoteIcon from '@/Icons/NoteIcon';
import Link from 'next/link';

export default function NoteCreateNavBtn() {
    return (
        <Link href='/new'>
            <IconLabelButton Icon={NoteIcon}>New</IconLabelButton>
        </Link>
    );
}
