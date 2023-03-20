import Editor from '@/components/Editor';
import BackButton from '@/components/BackButton';
import Link from 'next/link';

export default function AddNote() {
    return (
        <>
            <div className='mb-4'>
                <Link href='/'>
                    <BackButton />
                </Link>
            </div>
            <Editor />
        </>
    );
}
