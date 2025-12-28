import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CustomTextareaComponent {
    class: string;
    labelClass: string;
    label: string;
    placeholder: string;
    name: string;
    value: any;
    valueChange: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomTextareaComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomTextareaComponent, "custom-textarea", never, { "class": { "alias": "class"; "required": false; }; "labelClass": { "alias": "labelClass"; "required": false; }; "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "name": { "alias": "name"; "required": false; }; "value": { "alias": "value"; "required": true; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
