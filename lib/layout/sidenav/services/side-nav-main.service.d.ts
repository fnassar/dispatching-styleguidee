import { ApplicationRef, EnvironmentInjector } from '@angular/core';
import * as i0 from "@angular/core";
export declare class SidenavMainService {
    private appRef;
    private injector;
    private sidebarComponentRef?;
    constructor(appRef: ApplicationRef, injector: EnvironmentInjector);
    pushSidebarToLayout(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SidenavMainService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SidenavMainService>;
}
