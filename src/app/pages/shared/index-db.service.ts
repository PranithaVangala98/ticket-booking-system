import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private dbName = 'trainAppDB';
  private dbVersion = 1;
  private db!: IDBDatabase;

  // 1️⃣ Open database
  openDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;

        // users table
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'username' });
        }

        // trains table
        if (!db.objectStoreNames.contains('trains')) {
          db.createObjectStore('trains', { keyPath: 'id' });
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onerror = () => reject('Failed to open DB');
    });
  }
  add(storeName: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).add(data);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject();
    });
  }

  // Get all records
  getAll(storeName: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const req = tx.objectStore(storeName).getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject();
    });
  }
}
