import { ViewState } from './Editor';

interface Props {
    setViewState: React.Dispatch<React.SetStateAction<ViewState>>;
    viewState: string;
}

const EditorHead: React.FC<Props> = ({ setViewState, viewState }) => {
    return (
        <>
            <div className='px-2 py-1 rounded-md bg-slate-800 w-fit'>
                <span
                    onClick={() => {
                        console.log('Changing View to Editor');
                        setViewState('editor');
                    }}
                    className={`inline-block rounded-md px-6 py-1 cursor-pointer ${
                        viewState !== 'editor'
                            ? 'text-gray-400'
                            : 'bg-slate-900'
                    }`}
                >
                    Edit
                </span>
                <span
                    onClick={() => setViewState('preview')}
                    className={`inline-block rounded-md px-6 py-1 cursor-pointer ${
                        viewState !== 'preview'
                            ? 'text-gray-500'
                            : 'bg-slate-900'
                    }`}
                >
                    Preview
                </span>
            </div>
        </>
    );
};

export default EditorHead;
