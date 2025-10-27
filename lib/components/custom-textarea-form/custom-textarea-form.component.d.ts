import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IComponentFormError } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomTextareaFormComponent {
    class: string;
    labelClass: string;
    label: string;
    placeholder: string;
    resizable: import("@angular/core").InputSignal<"none" | "both" | "horizontal" | "vertical">;
    customHeight: import("@angular/core").InputSignal<string>;
    name: string;
    controlName: string;
    parentForm: FormGroup | any;
    validation: IComponentFormError[];
    viewType: 'base' | 'ai-plan';
    row: string;
    disabled: boolean;
    valueChange: EventEmitter<string>;
    containRequiredError(): boolean;
    onValueChange(): void;
    getMaxLength(): number | null;
    getMinLength(): number | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomTextareaFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomTextareaFormComponent, "custom-textarea-form", never, { "class": { "alias": "class"; "required": false; }; "labelClass": { "alias": "labelClass"; "required": false; }; "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "resizable": { "alias": "resizable"; "required": false; "isSignal": true; }; "customHeight": { "alias": "customHeight"; "required": false; "isSignal": true; }; "name": { "alias": "name"; "required": true; }; "controlName": { "alias": "controlName"; "required": true; }; "parentForm": { "alias": "parentForm"; "required": true; }; "validation": { "alias": "validation"; "required": true; }; "viewType": { "alias": "viewType"; "required": false; }; "row": { "alias": "row"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
