import BackArrow from '@/Icons/BackArrow';
import React from 'react';

interface Props {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function BackButton({ onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className='flex items-center rounded-full p-2 bold h-10 w-10 bg-slate-900'
        >
            <BackArrow />
        </button>
    );
}

export default BackButton;
