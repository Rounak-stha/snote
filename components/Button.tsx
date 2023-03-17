interface Props {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    disabled?: boolean;
    children: React.ReactNode;
}

export default function Button({
    onClick,
    className,
    disabled = false,
    children
}: Props) {
    return (
        <button
            onClick={onClick}
            type='button'
            className={`py-[8px] px-6 text-[0.96em] bg-blue-500 text-white font-semibold ${
                !disabled && 'hover:shadow-around-md'
            } ${
                disabled && 'cursor-not-allowed'
            } hover:shadow-emerald-500/50 rounded-md ${
                !disabled && 'active:scale-95'
            } ${className}`}
        >
            {children}
        </button>
    );
}
