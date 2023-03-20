export interface NoteActionToIconMap {
    edit: React.FC;
    delete: React.FC;
    archive: React.FC;
}

export type SnoteActionsType =
    {
    // prettier-ignore
    [key in 'edit' | 'archive' | 'delete']: (id: number, ...rest: any[]) => void;
};
