import { EventEmitter } from '@angular/core';
import { StepperService } from '../../services';
import * as i0 from "@angular/core";
export declare class CustomSteppersControllersComponent {
    stepperService: StepperService;
    disabledNext: import("@angular/core").InputSignal<boolean>;
    nextLabel: import("@angular/core").InputSignal<string>;
    prevLabel: import("@angular/core").InputSignal<string>;
    cancelLabel: import("@angular/core").InputSignal<string>;
    sendLabel: import("@angular/core").InputSignal<string>;
    onNext: EventEmitter<boolean>;
    onPerv: EventEmitter<boolean>;
    onCancel: EventEmitter<boolean>;
    onSubmit: EventEmitter<boolean>;
    nextStep(): void;
    previousStep(): void;
    cancel(): void;
    submit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomSteppersControllersComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomSteppersControllersComponent, "custom-steppers-controllers", never, { "disabledNext": { "alias": "disabledNext"; "required": false; "isSignal": true; }; "nextLabel": { "alias": "nextLabel"; "required": false; "isSignal": true; }; "prevLabel": { "alias": "prevLabel"; "required": false; "isSignal": true; }; "cancelLabel": { "alias": "cancelLabel"; "required": false; "isSignal": true; }; "sendLabel": { "alias": "sendLabel"; "required": false; "isSignal": true; }; }, { "onNext": "onNext"; "onPerv": "onPerv"; "onCancel": "onCancel"; "onSubmit": "onSubmit"; }, never, never, true, never>;
}
