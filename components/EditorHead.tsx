import { ViewState } from './Editor';

interface Props {
    setViewState: React.Dispatch<React.SetStateAction<ViewState>>;
    viewState: string;
}

const EditorHead: React.FC<Props> = ({ setViewState, viewState }) => {
    return (
        <>
            <div className='px-2 pt-[5px] pb-[6px] rounded-md bg-[#1c1e22] w-fit'>
                <span
                    onClick={() => {
                        console.log('Changing View to Editor');
                        setViewState('editor');
                    }}
                    className={`inline-block rounded-md px-6 py-1 cursor-pointer ${
                        viewState !== 'editor' ? 'text-gray-400' : 'bg-[#25292d]'
                    }`}
                >
                    Edit
                </span>
                <span
                    onClick={() => setViewState('preview')}
                    className={`inline-block rounded-md px-6 py-1 cursor-pointer ${
                        viewState !== 'preview' ? 'text-gray-500' : 'bg-[#25292d]'
                    }`}
                >
                    Preview
                </span>
            </div>
        </>
    );
};

export default EditorHead;
