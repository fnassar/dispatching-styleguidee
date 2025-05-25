import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CustomInputComponent {
    class: string;
    labelClass: string;
    label: string;
    placeholder: string;
    name: string;
    type: 'text' | 'email' | 'password' | 'number';
    value: any;
    valueChange: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomInputComponent, "custom-input", never, { "class": { "alias": "class"; "required": false; }; "labelClass": { "alias": "labelClass"; "required": false; }; "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "name": { "alias": "name"; "required": false; }; "type": { "alias": "type"; "required": false; }; "value": { "alias": "value"; "required": true; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
