export class StorageService {
  static getItem(key: string) {
    const item = localStorage.getItem(key);
    return item;
  }

  static setItem(key: string, object: string) {
    localStorage.setItem(key, object);
  }
}
