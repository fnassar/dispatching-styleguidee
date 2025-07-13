import { OverlayPanelComponent } from './overlay-panel.component';
import * as i0 from "@angular/core";
export declare class OverlayManagerService {
    private currentlyOpen;
    register(panel: OverlayPanelComponent): void;
    unregister(panel: OverlayPanelComponent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OverlayManagerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OverlayManagerService>;
}
