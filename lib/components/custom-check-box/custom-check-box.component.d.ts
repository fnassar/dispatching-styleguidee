import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CustomCheckBoxComponent {
    checkboxClass: string;
    labelClass: string;
    componentClass: string;
    label: string;
    disabled: boolean;
    name: string;
    value: boolean;
    valueChange: EventEmitter<boolean>;
    onChange(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomCheckBoxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomCheckBoxComponent, "custom-check-box", never, { "checkboxClass": { "alias": "checkboxClass"; "required": false; }; "labelClass": { "alias": "labelClass"; "required": false; }; "componentClass": { "alias": "componentClass"; "required": false; }; "label": { "alias": "label"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "name": { "alias": "name"; "required": true; }; "value": { "alias": "value"; "required": true; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
