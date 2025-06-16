import { Type } from '@angular/core';
import { StepperService } from '../../services';
export interface IStepConfig {
    label: string;
    value: number;
    component: Type<any>;
}
export interface IStepperComponentsContainer {
    steps: IStepConfig[];
}
export interface IStepperComponent {
    stepperService: StepperService;
    nextStep(): void;
    previousStep(): void;
}
