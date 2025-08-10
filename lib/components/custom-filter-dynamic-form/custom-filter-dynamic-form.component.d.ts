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
    config: IDynamicFilterConfig[];
    formChanged: EventEmitter<any>;
    filterForm: FormGroup;
    filters: import("@angular/core").WritableSignal<IDynamicFilterConfig[]>;
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    private buildForm;
    private buildValidators;
    getMinDate(field: IDynamicFilterConfig): string | null;
    getMaxDate(field: IDynamicFilterConfig): string | null;
    get form(): FormGroup;
    control(name: string): AbstractControl | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomFilterDynamicFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomFilterDynamicFormComponent, "custom-filter-dynamic-form", never, { "config": { "alias": "config"; "required": true; }; }, { "formChanged": "formChanged"; }, never, never, true, never>;
}
