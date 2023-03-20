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

(async function initDB() {
    if (typeof window !== 'undefined') {
        const openRequest: IDBOpenDBRequest = window.indexedDB.open(db_metadata.name, db_metadata.version);
        openRequest.onupgradeneeded = (e) => {
            let db = openRequest.result;
            const store = db.createObjectStore(db_metadata.storeName, { keyPath: 'id', autoIncrement: true });
            store.createIndex('archived', 'archived', { unique: false });
            store.createIndex('time', ['created_at', 'updated_at'], { unique: false });
            db.close();
        };

        openRequest.onsuccess = () => openRequest.result.close();

        /* openRequest.onerror = () => {
            alert(
                'This app uses IndexedDB to store your notes and currently the access to db is not allowed. May be you disallowed it in settings or you are using Firefox in private mode.'
            );
            window.location.href = '/error';
        }; */
    }
})();

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
            reject();
        };
    });
}

export async function getSnoteById(id: number): Promise<SnoteData | null> {
    const openRequest = window.indexedDB.open(db_metadata.name, db_metadata.version);
    return await new Promise<SnoteData | null>((resolve, reject) => {
        openRequest.onsuccess = () => {
            const db = openRequest.result;
            const store = db.transaction(db_metadata.storeName, 'readwrite').objectStore(db_metadata.storeName);
            const res = store.get(id);
            res.onsuccess = () => {
                resolve(res.result as SnoteData);
                db.close();
            };

            res.onerror = () => {
                console.error('Note Not Found');
                resolve(null);
            };
        };

        openRequest.onerror = function (e) {
            alert('Allow use of Indexed DB');
            reject();
        };
    });
}

export async function updateSnote(id: number, doc: string): Promise<boolean> {
    const openRequest = window.indexedDB.open(db_metadata.name, db_metadata.version);
    return await new Promise<boolean>((resolve, reject) => {
        openRequest.onsuccess = () => {
            const db = openRequest.result;
            const handleError = () => {
                resolve(false);
                db.close();
            };
            const store = db.transaction(db_metadata.storeName, 'readwrite').objectStore(db_metadata.storeName);
            const editingSnoteRequest = store.get(id);

            editingSnoteRequest.onsuccess = () => {
                console.log('Edit Success');
                const currentDateTime = new Date();
                const res = store.put({
                    ...editingSnoteRequest.result,
                    md_note: doc,
                    updated_at: currentDateTime.toLocaleString()
                });
                res.onsuccess = () => {
                    resolve(true);
                    db.close();
                };

                res.onerror = () => handleError();
            };

            editingSnoteRequest.onerror = () => handleError();
        };

        openRequest.onerror = function (e) {
            reject();
        };
    });
}

export async function getAllSnotes(type: 'unarchived' | 'archived'): Promise<SnoteData[]> {
    const openRequest = window.indexedDB.open(db_metadata.name, db_metadata.version);
    return await new Promise<SnoteData[]>((resolve, reject) => {
        openRequest.onsuccess = () => {
            const archivedQuery = type ? (type == 'archived' ? 1 : 0) : 0;
            const db = openRequest.result;
            const store = db.transaction(db_metadata.storeName, 'readwrite').objectStore(db_metadata.storeName);
            const storeByIndex = store.index('archived');
            const res = storeByIndex.getAll(archivedQuery);
            res.onsuccess = () => {
                resolve(res.result.sort((note1, note2) => parseInt(note2.id) - parseInt(note1.id)) as SnoteData[]);
                db.close();
            };
        };

        openRequest.onerror = function (e) {
            reject();
        };
    });
}

export async function deleteSnote(id: number): Promise<boolean> {
    const openRequest = window.indexedDB.open(db_metadata.name, db_metadata.version);
    return await new Promise<boolean>((resolve, reject) => {
        openRequest.onsuccess = () => {
            const db = openRequest.result;
            const store = db.transaction(db_metadata.storeName, 'readwrite').objectStore(db_metadata.storeName);
            const res = store.delete(id);
            res.onsuccess = () => {
                resolve(true);
                db.close();
            };

            res.onerror = () => {
                resolve(false);
                db.close();
            };
        };

        openRequest.onerror = function (e) {
            console.error('Allow use of Indexed DB');
            reject(false);
        };
    });
}

export async function changeSnoteArchiveState(id: number): Promise<boolean> {
    const openRequest = window.indexedDB.open(db_metadata.name, db_metadata.version);
    return await new Promise<boolean>((resolve, reject) => {
        openRequest.onsuccess = () => {
            const db = openRequest.result;
            const store = db.transaction(db_metadata.storeName, 'readwrite').objectStore(db_metadata.storeName);
            const res = store.get(id);
            res.onsuccess = () => {
                const snote = res.result;
                snote.archived = snote.archived == 1 ? 0 : 1;
                const updateRequest = store.put(snote);
                updateRequest.onsuccess = () => {
                    resolve(true);
                    db.close();
                };

                updateRequest.onerror = () => {
                    resolve(false);
                    db.close();
                };
            };

            res.onerror = () => {
                resolve(false);
                db.close();
            };
        };

        openRequest.onerror = function (e) {
            console.error('Allow use of Indexed DB');
            reject(false);
        };
    });
}
