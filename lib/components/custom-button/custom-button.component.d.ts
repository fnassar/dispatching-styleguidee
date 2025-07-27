import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CustomButtonComponent {
    disabled: boolean;
    type: 'button' | 'submit' | 'reset';
    buttonClick: EventEmitter<void>;
    class: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomButtonComponent, "custom-button", never, { "disabled": { "alias": "disabled"; "required": false; }; "type": { "alias": "type"; "required": false; }; "class": { "alias": "class"; "required": true; }; }, { "buttonClick": "buttonClick"; }, never, ["*"], true, never>;
}
