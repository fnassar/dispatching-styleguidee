import { StorageService } from './storage.services';
import { ILocalData, ILoginData, ISessionData } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class AuthContextService {
    private storageService;
    userLocalData$: import("@angular/core").WritableSignal<ILocalData | null>;
    userPermissionsAndRoles$: import("@angular/core").WritableSignal<ISessionData | null>;
    constructor(storageService: StorageService);
    saveTokens(data: ILoginData): void;
    savePermissionsAndRoles(data: ISessionData): void;
    clearData(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthContextService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthContextService>;
}
