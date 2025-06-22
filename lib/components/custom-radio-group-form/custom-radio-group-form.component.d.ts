import { EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IComponentFormError } from '../../interfaces';
import { IRadioInputOption } from '../../interfaces/components/radioInuptOption.interface';
import * as i0 from "@angular/core";
export declare class CustomRadioGroupFormComponent implements OnInit {
    setFirstAsDefaultValue: boolean;
    name: string;
    controlName: string;
    parentForm: FormGroup;
    validation: IComponentFormError[];
    options: IRadioInputOption[];
    onChange: EventEmitter<IRadioInputOption>;
    ngOnInit(): void;
    onRadioChange(event: IRadioInputOption): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomRadioGroupFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomRadioGroupFormComponent, "custom-radio-group-form", never, { "setFirstAsDefaultValue": { "alias": "setFirstAsDefaultValue"; "required": false; }; "name": { "alias": "name"; "required": true; }; "controlName": { "alias": "controlName"; "required": true; }; "parentForm": { "alias": "parentForm"; "required": true; }; "validation": { "alias": "validation"; "required": true; }; "options": { "alias": "options"; "required": true; }; }, { "onChange": "onChange"; }, never, never, true, never>;
}
