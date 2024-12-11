export class IndexedDBService {
    private dbName = 'photoOrderDB';
    private dbVersion = 1;
    private storeName = 'pendingUploads';

    async initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = (event: any) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'uid' });
                }
            };
        });
    }

    async saveToIndexedDB(files: any[]) {
        const db: IDBDatabase = await this.initDB() as IDBDatabase;
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);

        return Promise.all(
            files.map(file => {
                return new Promise((resolve, reject) => {
                    const request = store.put({
                        uid: file.uid,
                        file: file.originFileObj,
                        quantity: file.quantity || 1,
                        name: file.name,
                        type: file.type
                    });

                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () => reject(request.error);
                })
            })
        );
    }

    async getFromIndexedDB() {
        const db: IDBDatabase = await this.initDB() as IDBDatabase;
        const transaction = db.transaction(this.storeName, 'readonly');
        const store = transaction.objectStore(this.storeName);

        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async deleteFromIndexedDB(uid: string) {
    const db: IDBDatabase = await this.initDB() as IDBDatabase;
    const transaction = db.transaction(this.storeName, 'readwrite');
    const store = transaction.objectStore(this.storeName);

    return new Promise((resolve, reject) => {
        const request = store.delete(uid);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

    async clearIndexedDB() {
        const db: IDBDatabase = await this.initDB() as IDBDatabase;
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);

        return new Promise((resolve, reject) => {
            const request = store.clear();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}