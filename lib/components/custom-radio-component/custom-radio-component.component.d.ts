import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CustomRadioComponentComponent {
    radioClass: string;
    name: string;
    value: any;
    label: string;
    disabled: boolean;
    model: any;
    modelChange: EventEmitter<any>;
    get isChecked(): boolean;
    onInputChange(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomRadioComponentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomRadioComponentComponent, "custom-radio-component", never, { "radioClass": { "alias": "radioClass"; "required": false; }; "name": { "alias": "name"; "required": true; }; "value": { "alias": "value"; "required": true; }; "label": { "alias": "label"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "model": { "alias": "model"; "required": false; }; }, { "modelChange": "modelChange"; }, never, never, true, never>;
}
