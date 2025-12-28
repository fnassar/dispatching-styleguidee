import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CustomToggleSwitchComponent {
    value: boolean;
    label: string;
    labelPosition: 'left' | 'right';
    disabled: boolean;
    size: 'small' | 'medium' | 'large';
    onColor: string;
    offColor: string;
    thumbColor: string;
    valueChange: EventEmitter<boolean>;
    toggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomToggleSwitchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomToggleSwitchComponent, "custom-toggle-switch", never, { "value": { "alias": "value"; "required": true; }; "label": { "alias": "label"; "required": false; }; "labelPosition": { "alias": "labelPosition"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "size": { "alias": "size"; "required": true; }; "onColor": { "alias": "onColor"; "required": false; }; "offColor": { "alias": "offColor"; "required": false; }; "thumbColor": { "alias": "thumbColor"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
