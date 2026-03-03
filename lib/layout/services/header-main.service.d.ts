import { ApplicationRef, EnvironmentInjector } from '@angular/core';
import * as i0 from "@angular/core";
export declare class HeaderMainService {
    private appRef;
    private injector;
    private headerComponentRef?;
    constructor(appRef: ApplicationRef, injector: EnvironmentInjector);
    pushHeaderToLayout(): void;
    sideBarLoaded(): boolean;
    removeHeaderFromLayout(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HeaderMainService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HeaderMainService>;
}
