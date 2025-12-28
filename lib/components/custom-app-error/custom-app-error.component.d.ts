import { AbstractControl } from '@angular/forms';
import { IComponentFormError } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomAppErrorComponent {
    control: AbstractControl;
    validation: IComponentFormError[];
    name: string;
    showErrors: import("@angular/core").InputSignal<boolean>;
    shouldShowError(item: IComponentFormError): boolean;
    getErrorMessage(item: IComponentFormError): string;
    hasAnyErrorToShow(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomAppErrorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomAppErrorComponent, "custom-app-error", never, { "control": { "alias": "control"; "required": true; }; "validation": { "alias": "validation"; "required": true; }; "name": { "alias": "name"; "required": true; }; "showErrors": { "alias": "showErrors"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
