import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class StepperService {
    currentStep: import("@angular/core").WritableSignal<number>;
    totalSteps: import("@angular/core").WritableSignal<number>;
    notifyCancel$: BehaviorSubject<boolean>;
    hasPrevious: import("@angular/core").Signal<boolean>;
    hasNext: import("@angular/core").Signal<boolean>;
    setTotalSteps(steps: number): void;
    setStep(step: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StepperService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StepperService>;
}
