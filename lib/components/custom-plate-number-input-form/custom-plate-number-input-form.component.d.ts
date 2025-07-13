import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IComponentFormError } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomPlateNumberInputFormComponent {
    class: string;
    labelClass: string;
    label: string;
    parentForm: FormGroup;
    numberControlName: string;
    lettersControlName: string;
    validation: IComponentFormError[];
    maxNumberLength: number;
    maxLetterLength: number;
    valueChange: EventEmitter<string>;
    containRequiredError(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomPlateNumberInputFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomPlateNumberInputFormComponent, "custom-plate-input-form", never, { "class": { "alias": "class"; "required": false; }; "labelClass": { "alias": "labelClass"; "required": false; }; "label": { "alias": "label"; "required": false; }; "parentForm": { "alias": "parentForm"; "required": true; }; "numberControlName": { "alias": "numberControlName"; "required": true; }; "lettersControlName": { "alias": "lettersControlName"; "required": true; }; "validation": { "alias": "validation"; "required": true; }; "maxNumberLength": { "alias": "maxNumberLength"; "required": false; }; "maxLetterLength": { "alias": "maxLetterLength"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
