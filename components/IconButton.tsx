interface Props {
    Icon: React.FC;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function IconButton({ Icon, className, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className={`h-7 w-7 p-[6px] border border-slate-700 text-slate-700 rounded-full ${className}`}
        >
            <Icon />
        </button>
    );
}
