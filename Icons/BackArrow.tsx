interface Props {
    color?: string;
}
function BackArrow({ color }: Props) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fillRule='evenodd'
            clipRule='evenodd'
            imageRendering='optimizeQuality'
            shapeRendering='geometricPrecision'
            textRendering='geometricPrecision'
            viewBox='0 0 512 376.83'
            fill='currentColor'
        >
            <path
                fillRule='nonzero'
                d='M156.88 372.7a12.026 12.026 0 0017.09 1.06c5-4.47 5.46-12.2 1.04-17.25L38.96 200.69h460.89c6.71 0 12.15-5.5 12.15-12.28 0-6.77-5.44-12.27-12.15-12.27H38.95L175.01 20.32c4.42-5.05 3.96-12.78-1.04-17.25-5.01-4.47-12.66-4-17.09 1.05l-153.67 176c-4.17 4.55-4.32 11.64-.17 16.39L156.88 372.7z'
            ></path>
        </svg>
    );
}

export default BackArrow;
