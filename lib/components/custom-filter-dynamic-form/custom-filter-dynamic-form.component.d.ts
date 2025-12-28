import { EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownOption } from '../../interfaces';
import * as i0 from "@angular/core";
export interface IDynamicFilterConfig {
    id: string;
    label: string;
    type: 'text' | 'date' | 'multiselect' | 'singleselect';
    placeholder?: string;
    options?: IDropdownOption[];
    collapsed?: boolean;
    icon?: string;
    validation?: {
        required?: boolean;
        minDate?: Date;
        maxDate?: Date;
    };
}
export declare class CustomFilterDynamicFormComponent {
    private fb;
    config: import("@angular/core").InputSignal<IDynamicFilterConfig[]>;
    values: import("@angular/core").InputSignal<Record<string, any> | null>;
    formChanged: EventEmitter<any>;
    formReset: EventEmitter<any>;
    collapseState: import("@angular/core").WritableSignal<Record<string, boolean>>;
    filterForm: FormGroup;
    filters: import("@angular/core").WritableSignal<IDynamicFilterConfig[]>;
    private destroy$;
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    toggleCollapse(id: string): void;
    private buildForm;
    private isSame;
    private buildEmittableValues;
    private isDateField;
    private toYyyyMmDd;
    private buildValidators;
    get form(): FormGroup;
    reset(): void;
    control(name: string): AbstractControl | null;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomFilterDynamicFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomFilterDynamicFormComponent, "custom-filter-dynamic-form", never, { "config": { "alias": "config"; "required": false; "isSignal": true; }; "values": { "alias": "values"; "required": false; "isSignal": true; }; }, { "formChanged": "formChanged"; "formReset": "formReset"; }, never, never, true, never>;
}
