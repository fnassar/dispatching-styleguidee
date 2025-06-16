import { OnChanges, SimpleChanges } from '@angular/core';
import { IStepConfig } from '../../interfaces/components/steppers.interface';
import { StepperService } from '../../services/ui/stepper.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class CustomSteppersContainerComponent implements OnChanges {
    private stepperService;
    private sanitizer;
    checkedIcon: SafeHtml;
    steps: IStepConfig[];
    constructor(stepperService: StepperService, sanitizer: DomSanitizer);
    ngOnChanges(changes: SimpleChanges): void;
    get currentStep(): number;
    get currentStepIndex(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomSteppersContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomSteppersContainerComponent, "custom-steppers-container", never, { "steps": { "alias": "steps"; "required": false; }; }, {}, never, never, true, never>;
}
