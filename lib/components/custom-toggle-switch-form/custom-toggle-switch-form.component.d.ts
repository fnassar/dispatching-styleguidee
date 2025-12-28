import { FormGroup } from '@angular/forms';
import { IComponentFormError, IDropdownOption } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomToggleSwitchFormComponent {
    label: string;
    size: 'small' | 'medium' | 'large';
    onColor: string;
    offColor: string;
    thumbColor: string;
    disabled: boolean;
    parentForm: FormGroup;
    controlName: string;
    validation: IComponentFormError[];
    trueValue: IDropdownOption;
    falseValue: IDropdownOption;
    height: string;
    value: boolean;
    private destroy$;
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggle(): void;
    private isTrue;
    containRequiredError(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomToggleSwitchFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomToggleSwitchFormComponent, "custom-toggle-switch-form", never, { "label": { "alias": "label"; "required": false; }; "size": { "alias": "size"; "required": false; }; "onColor": { "alias": "onColor"; "required": false; }; "offColor": { "alias": "offColor"; "required": false; }; "thumbColor": { "alias": "thumbColor"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "parentForm": { "alias": "parentForm"; "required": true; }; "controlName": { "alias": "controlName"; "required": true; }; "validation": { "alias": "validation"; "required": false; }; "trueValue": { "alias": "trueValue"; "required": false; }; "falseValue": { "alias": "falseValue"; "required": false; }; "height": { "alias": "height"; "required": false; }; }, {}, never, never, true, never>;
}
