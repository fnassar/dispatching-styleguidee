import { EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownOption } from '../../interfaces';
import * as i0 from "@angular/core";
export interface IDynamicFilterConfig {
    id: string;
    label: string;
    type: 'text' | 'date' | 'multiselect';
    placeholder?: string;
    options?: IDropdownOption[];
    validation?: {
        required?: boolean;
        minDate?: Date;
        maxDate?: Date;
    };
}
export declare class CustomFilterDynamicFormComponent {
    private fb;
    config: import("@angular/core").InputSignal<IDynamicFilterConfig[]>;
    formChanged: EventEmitter<any>;
    filterForm: FormGroup;
    filters: import("@angular/core").WritableSignal<IDynamicFilterConfig[]>;
    private destroy$;
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    private buildForm;
    private buildValidators;
    get form(): FormGroup;
    reset(): void;
    control(name: string): AbstractControl | null;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomFilterDynamicFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomFilterDynamicFormComponent, "custom-filter-dynamic-form", never, { "config": { "alias": "config"; "required": false; "isSignal": true; }; }, { "formChanged": "formChanged"; }, never, never, true, never>;
}
