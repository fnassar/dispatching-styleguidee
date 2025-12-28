import { ILocalData, ISessionData } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class StorageService {
    constructor();
    setLocalStorage(data: ILocalData): void;
    setSession(data: ISessionData): void;
    addLocalStorageItem(key: string, value: any): void;
    addSessionItem(key: string, value: any): void;
    clearLocalStorage(): void;
    clearSession(): void;
    clearAll(): void;
    getLocalStorageAll(): Record<string, any>;
    getsessionAll(): Record<string, any>;
    getLocalStorageItem(item: string): string;
    getsessionItem(item: string | Permissions): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<StorageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StorageService>;
}
