import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IComponentFormError } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomInputFormComponent {
    class: string;
    labelClass: string;
    label: string;
    placeholder: string;
    name: string;
    type: 'text' | 'email' | 'password' | 'number';
    controlName: string;
    parentForm: FormGroup;
    validation: IComponentFormError[];
    pattern: string;
    valueChange: EventEmitter<string>;
    height: string;
    disabled: boolean;
    containRequiredError(): boolean;
    onValueChange(): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomInputFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomInputFormComponent, "custom-input-form", never, { "class": { "alias": "class"; "required": false; }; "labelClass": { "alias": "labelClass"; "required": false; }; "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "name": { "alias": "name"; "required": true; }; "type": { "alias": "type"; "required": false; }; "controlName": { "alias": "controlName"; "required": true; }; "parentForm": { "alias": "parentForm"; "required": true; }; "validation": { "alias": "validation"; "required": true; }; "pattern": { "alias": "pattern"; "required": false; }; "height": { "alias": "height"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
