import * as i0 from "@angular/core";
type ToastType = 'success' | 'warning' | 'black' | 'error' | 'info';
type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
export declare class ToastService {
    message: import("@angular/core").WritableSignal<string>;
    type: import("@angular/core").WritableSignal<ToastType>;
    position: import("@angular/core").WritableSignal<ToastPosition>;
    show: import("@angular/core").WritableSignal<boolean>;
    toast(message: string, position: ToastPosition, ToastType?: ToastType, duration?: number): void;
    showToast(): void;
    hideToast(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ToastService>;
}
export {};
