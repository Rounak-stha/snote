export default function LoadingNotes() {
    return (
        <>
            <div className='my-6 p-6 border border-slate-700 rounded-md'>
                <div role='status' className='w-full animate-pulse'>
                    <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2'></div>{' '}
                    <div className='h-20 bg-gray-200 rounded-sm dark:bg-gray-700'></div>
                </div>
            </div>
            <div className='my-6 p-6 border border-slate-700 rounded-md'>
                <div role='status' className='w-full animate-pulse'>
                    <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2'></div>
                    <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5'></div>
                    <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
                </div>
            </div>
            <div className='my-6 p-6 border border-slate-700 rounded-md'>
                <div role='status' className='w-full animate-pulse'>
                    <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2'></div>
                    <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5'></div>
                    <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5'></div>
                    <div className='h-20 bg-gray-200 rounded-sm dark:bg-gray-700'></div>
                </div>
            </div>
        </>
    );
}
