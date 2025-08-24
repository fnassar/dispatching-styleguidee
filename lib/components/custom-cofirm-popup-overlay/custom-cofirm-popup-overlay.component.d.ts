import { EventEmitter } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import * as i0 from "@angular/core";
export declare class CustomCofirmPopupOverlayComponent {
    private overlayReference;
    successMessage: string;
    message: string;
    type: 'info' | 'delete';
    showSuccessScreen: boolean;
    confirmButtonText: string;
    cancelButtonText: string;
    userDecision: EventEmitter<boolean>;
    constructor(overlayReference: OverlayRef);
    handleConfirm(): void;
    handleCancel(): void;
    handleOverlayClick(_: unknown): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomCofirmPopupOverlayComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomCofirmPopupOverlayComponent, "lib-custom-cofirm-popup-overlay", never, { "successMessage": { "alias": "successMessage"; "required": false; }; "message": { "alias": "message"; "required": false; }; "type": { "alias": "type"; "required": false; }; "showSuccessScreen": { "alias": "showSuccessScreen"; "required": false; }; "confirmButtonText": { "alias": "confirmButtonText"; "required": false; }; "cancelButtonText": { "alias": "cancelButtonText"; "required": false; }; }, { "userDecision": "userDecision"; }, never, never, true, never>;
}
