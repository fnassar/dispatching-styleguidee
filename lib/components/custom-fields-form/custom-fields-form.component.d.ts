import { OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class CustomFieldsFormComponent implements OnInit {
    private fb;
    parentForm: FormGroup;
    controlName: string;
    constructor(fb: FormBuilder);
    get fieldsFormArray(): FormArray;
    get fieldsFormArrayControllers(): FormGroup[];
    ngOnInit(): void;
    addField(): void;
    removeField(index: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomFieldsFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomFieldsFormComponent, "custom-fields-form", never, { "parentForm": { "alias": "parentForm"; "required": true; }; "controlName": { "alias": "controlName"; "required": true; }; }, {}, never, never, true, never>;
}
