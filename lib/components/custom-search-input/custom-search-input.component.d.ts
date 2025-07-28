import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CustomSearchInputComponent {
    class: string;
    labelClass: string;
    label: string;
    placeholder: string;
    name: string;
    value: any;
    style: 'base' | 'white' | 'grey';
    valueChange: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomSearchInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomSearchInputComponent, "custom-search-input", never, { "class": { "alias": "class"; "required": false; }; "labelClass": { "alias": "labelClass"; "required": false; }; "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "name": { "alias": "name"; "required": false; }; "value": { "alias": "value"; "required": true; }; "style": { "alias": "style"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
