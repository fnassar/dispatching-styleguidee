import { EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class CustomConfirmPopupComponent {
    private sanitizer;
    message: string;
    type: 'info' | 'delete';
    confirmButtonText: string;
    cancelButtonText: string;
    extraButton: string;
    confirmEvent: EventEmitter<any>;
    cancelEvent: EventEmitter<void>;
    extraEvent: EventEmitter<void>;
    showSucessScreen: import("@angular/core").InputSignal<boolean>;
    sucessMsg: import("@angular/core").InputSignal<string>;
    checkedInfoSvg: SafeHtml;
    checkIcon: SafeHtml;
    constructor(sanitizer: DomSanitizer);
    isVisible: boolean;
    eventVal: any;
    open(event?: any): void;
    close(): void;
    onOverlayClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomConfirmPopupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomConfirmPopupComponent, "custom-confirm-popup", never, { "message": { "alias": "message"; "required": true; }; "type": { "alias": "type"; "required": true; }; "confirmButtonText": { "alias": "confirmButtonText"; "required": false; }; "cancelButtonText": { "alias": "cancelButtonText"; "required": false; }; "extraButton": { "alias": "extraButton"; "required": false; }; "showSucessScreen": { "alias": "showSucessScreen"; "required": false; "isSignal": true; }; "sucessMsg": { "alias": "sucessMsg"; "required": false; "isSignal": true; }; }, { "confirmEvent": "confirmEvent"; "cancelEvent": "cancelEvent"; "extraEvent": "extraEvent"; }, never, never, true, never>;
}
