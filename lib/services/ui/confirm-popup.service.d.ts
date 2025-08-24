import { InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
export interface ConfirmOptions {
    successMsg?: string;
    message: string;
    type?: 'info' | 'delete';
    showSuccessScreen?: boolean;
    confirmButtonText?: string;
    cancelButtonText?: string;
}
export declare const CONFIRM_POPUP_DEFAULTS: InjectionToken<Partial<ConfirmOptions>>;
export declare class ConfirmPopupService {
    private isOpenSignal;
    private optionsSignal;
    private resolver;
    /** Read-only view model for the host component */
    readonly viewModel: import("@angular/core").Signal<{
        isOpen: boolean;
        options: ConfirmOptions | null;
    }>;
    open(options: ConfirmOptions): Promise<boolean>;
    confirm(): void;
    cancel(): void;
    overlayClick(): void;
    private resolveAndCleanup;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmPopupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfirmPopupService>;
}
