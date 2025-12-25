import { AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CustomInputComponent implements AfterViewInit {
    class: string;
    labelClass: string;
    label: string;
    placeholder: string;
    name: string;
    type: 'text' | 'email' | 'password' | 'number';
    value: any;
    valueChange: EventEmitter<any>;
    showConfirmButton: boolean;
    confirmLabel: string;
    inputEl: ElementRef<HTMLInputElement>;
    ngAfterViewInit(): void;
    private focusAtEnd;
    onConfirm(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomInputComponent, "custom-input", never, { "class": { "alias": "class"; "required": false; }; "labelClass": { "alias": "labelClass"; "required": false; }; "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "name": { "alias": "name"; "required": false; }; "type": { "alias": "type"; "required": false; }; "value": { "alias": "value"; "required": true; }; "showConfirmButton": { "alias": "showConfirmButton"; "required": false; }; "confirmLabel": { "alias": "confirmLabel"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
