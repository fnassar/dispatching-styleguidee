import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IComponentFormError } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomTimeInputFormComponent {
    parentForm: FormGroup;
    name: string;
    controlName: string;
    label: string;
    labelClass: string;
    inputClass: string;
    validation: IComponentFormError[];
    defaultTime: string;
    timeChange: EventEmitter<{
        hour: number;
        minute: number;
    }>;
    height: string;
    showErrors: import("@angular/core").WritableSignal<boolean>;
    dropdownOpen: import("@angular/core").WritableSignal<boolean>;
    hours: number[];
    minutes: number[];
    selectedHour: number | string;
    selectedMinute: number | string;
    selectedPeriod: 'AM' | 'PM';
    ngOnInit(): void;
    toggleDropdown(): void;
    setExcistValue(): void;
    setFormValue(): void;
    confirmTime(): void;
    private setTimeFromString;
    displayTime(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomTimeInputFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomTimeInputFormComponent, "custom-time-input-form", never, { "parentForm": { "alias": "parentForm"; "required": true; }; "name": { "alias": "name"; "required": true; }; "controlName": { "alias": "controlName"; "required": false; }; "label": { "alias": "label"; "required": false; }; "labelClass": { "alias": "labelClass"; "required": false; }; "inputClass": { "alias": "inputClass"; "required": false; }; "validation": { "alias": "validation"; "required": false; }; "defaultTime": { "alias": "defaultTime"; "required": false; }; "height": { "alias": "height"; "required": false; }; }, { "timeChange": "timeChange"; }, never, never, true, never>;
}
