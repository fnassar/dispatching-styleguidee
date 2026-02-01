import { EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IComponentFormError } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomPlateNumberInputFormComponent implements OnInit {
    class: string;
    labelClass: string;
    label: string;
    parentForm: FormGroup;
    controlName: string;
    validation: IComponentFormError[];
    mainValidation: IComponentFormError[];
    maxNumberLength: number;
    maxLetterLength: number;
    valueChange: EventEmitter<string>;
    PlateInputForm: FormGroup;
    ngOnInit(): void;
    containRequiredError(): boolean;
    updateParentForm(event?: Event | any): void;
    getCombinedPlateNumber(): string;
    patchValuesToForm(plateNumber: string): void;
    resetForm(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomPlateNumberInputFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomPlateNumberInputFormComponent, "custom-plate-input-form", never, { "class": { "alias": "class"; "required": false; }; "labelClass": { "alias": "labelClass"; "required": false; }; "label": { "alias": "label"; "required": false; }; "parentForm": { "alias": "parentForm"; "required": true; }; "controlName": { "alias": "controlName"; "required": true; }; "validation": { "alias": "validation"; "required": true; }; "mainValidation": { "alias": "mainValidation"; "required": false; }; "maxNumberLength": { "alias": "maxNumberLength"; "required": false; }; "maxLetterLength": { "alias": "maxLetterLength"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
