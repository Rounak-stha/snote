import React from 'react';

interface Props {
    Icon: React.FC;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function IconLabelButton({ Icon, className, children, disabled, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className={`bg-blue-500 rounded-md flex items-center px-4 py-2 active:scale-95 ${
                disabled && 'cursor-not-allowed'
            } ${className}`}
        >
            <span className='font-bold mr-2'>{children}</span>
            <span className='h-6 w-6'>
                <Icon />
            </span>
        </button>
    );
}
