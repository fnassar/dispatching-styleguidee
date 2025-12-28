import { SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IComponentFormError } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomFieldsFormComponent {
    private fb;
    parentForm: FormGroup;
    controlName: string;
    addTitle: string;
    autoPruneEmpty: boolean;
    addOneField: import("@angular/core").InputSignal<boolean>;
    requiredField: IComponentFormError[];
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    ngOnChanges(_: SimpleChanges): void;
    private hydrateFromExistingValue;
    private isEmptyGroup;
    private pruneEmptyGroups;
    get fieldsFormArray(): FormArray;
    get fieldsFormArrayControllers(): FormGroup[];
    addField(): void;
    removeField(index: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomFieldsFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomFieldsFormComponent, "custom-fields-form", never, { "parentForm": { "alias": "parentForm"; "required": true; }; "controlName": { "alias": "controlName"; "required": true; }; "addTitle": { "alias": "addTitle"; "required": false; }; "addOneField": { "alias": "addOneField"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
