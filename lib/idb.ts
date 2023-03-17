'use client';

export const db_metadata = {
    name: 'snote_db',
    storeName: 'snotes',
    version: 1
};

export interface SnoteData {
    id?: number;
    md_note: string;
    archived: 0 | 1;
    created_at: string;
    updated_at: string;
}

const openRequest: IDBOpenDBRequest = window.indexedDB.open(db_metadata.name, db_metadata.version);

openRequest.onupgradeneeded = () => {
    let db = openRequest.result;
    const store = db.createObjectStore(db_metadata.storeName, { keyPath: 'id', autoIncrement: true });
    store.createIndex('archived', 'archived', { unique: false });
    store.createIndex('time', ['created_at', 'updated_at'], { unique: false });
    db.close();
};

openRequest.onerror = function (e) {
    console.log(e);
    alert('Allow use of Indexed DB');
};

export async function createSnote(doc: string): Promise<void> {
    const openRequest = window.indexedDB.open(db_metadata.name, db_metadata.version);
    await new Promise<void>((resolve, reject) => {
        openRequest.onsuccess = () => {
            const db = openRequest.result;
            const store = db.transaction(db_metadata.storeName, 'readwrite').objectStore(db_metadata.storeName);
            const dateTime = new Date();
            const newNote: SnoteData = {
                md_note: doc,
                archived: 0,
                created_at: dateTime.toLocaleString(),
                updated_at: dateTime.toLocaleString()
            };
            store.put(newNote);
            db.close();
            resolve();
        };

        openRequest.onerror = function (e) {
            alert('Allow use of Indexed DB');
            reject();
        };
    });
}

export async function getAllSnotes(): Promise<SnoteData[]> {
    const openRequest = window.indexedDB.open(db_metadata.name, db_metadata.version);
    return await new Promise<SnoteData[]>((resolve, reject) => {
        openRequest.onsuccess = () => {
            const db = openRequest.result;
            const store = db.transaction(db_metadata.storeName, 'readwrite').objectStore(db_metadata.storeName);
            const dateTime = new Date();
            const res = store.getAll();
            res.onsuccess = () => {
                resolve(res.result as SnoteData[]);
                db.close();
            };
        };

        openRequest.onerror = function (e) {
            alert('Allow use of Indexed DB');
            reject();
        };
    });
}
