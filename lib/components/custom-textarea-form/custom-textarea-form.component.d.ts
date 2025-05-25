import { FormGroup } from '@angular/forms';
import { IComponentFormError } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomTextareaFormComponent {
    class: string;
    labelClass: string;
    label: string;
    placeholder: string;
    name: string;
    controlName: string;
    parentForm: FormGroup | any;
    validation: IComponentFormError[];
    containRequiredError(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomTextareaFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomTextareaFormComponent, "custom-textarea-form", never, { "class": { "alias": "class"; "required": false; }; "labelClass": { "alias": "labelClass"; "required": false; }; "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "name": { "alias": "name"; "required": true; }; "controlName": { "alias": "controlName"; "required": true; }; "parentForm": { "alias": "parentForm"; "required": true; }; "validation": { "alias": "validation"; "required": true; }; }, {}, never, never, true, never>;
}
