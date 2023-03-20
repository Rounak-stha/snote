'use client';

import React from 'react';
import { ViewState } from './Editor';
import HTMLPreview from './HTMLPreview';

interface Props {
    viewState: ViewState;
    refContainer: React.RefObject<HTMLDivElement>;
    doc: string;
}

export default function EditorAndPreview({ viewState, refContainer, doc }: Props) {
    return (
        <>
            <div className={`${viewState !== 'editor' && 'hidden'} h-full`} ref={refContainer}></div>
            {viewState === 'preview' && <HTMLPreview mdText={doc} />}
        </>
    );
}
