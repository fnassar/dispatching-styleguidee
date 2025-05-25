import { ToastService } from '../../services/ui/toast.service';
import * as i0 from "@angular/core";
export declare class CustomToastComponent {
    positionClass: string;
    colorClass: string;
    toastService: ToastService;
    constructor();
    private updatePositionClass;
    private updateColorClass;
    hideToast(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomToastComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomToastComponent, "custom-toast", never, {}, {}, never, never, true, never>;
}
