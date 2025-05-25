import { FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class CustomToggleSwitchFormComponent {
    label: string;
    labelPosition: 'left' | 'right';
    size: 'small' | 'medium' | 'large';
    onColor: string;
    offColor: string;
    thumbColor: string;
    disabled: boolean;
    parentForm: FormGroup;
    controlName: string;
    value: boolean;
    onChange: any;
    onTouched: any;
    toggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomToggleSwitchFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomToggleSwitchFormComponent, "custom-toggle-switch-form", never, { "label": { "alias": "label"; "required": false; }; "labelPosition": { "alias": "labelPosition"; "required": false; }; "size": { "alias": "size"; "required": false; }; "onColor": { "alias": "onColor"; "required": false; }; "offColor": { "alias": "offColor"; "required": false; }; "thumbColor": { "alias": "thumbColor"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "parentForm": { "alias": "parentForm"; "required": true; }; "controlName": { "alias": "controlName"; "required": true; }; }, {}, never, never, true, never>;
}
