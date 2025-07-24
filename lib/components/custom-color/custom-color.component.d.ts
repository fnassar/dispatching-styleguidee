import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CustomColorComponent {
    colorsArray: string[];
    isOpen: boolean;
    positionClass: string;
    title: string;
    name: string;
    hideNameInput: boolean;
    color: string;
    enableColors: boolean;
    onSaveColor: EventEmitter<{
        color?: string;
        name?: string;
    }>;
    onColorSelected(color: string): void;
    onCancel(): void;
    onSave(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomColorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomColorComponent, "custom-color", never, { "positionClass": { "alias": "positionClass"; "required": true; }; "title": { "alias": "title"; "required": true; }; "name": { "alias": "name"; "required": false; }; "hideNameInput": { "alias": "hideNameInput"; "required": false; }; "color": { "alias": "color"; "required": false; }; "enableColors": { "alias": "enableColors"; "required": false; }; }, { "onSaveColor": "onSaveColor"; }, never, ["*"], true, never>;
}
