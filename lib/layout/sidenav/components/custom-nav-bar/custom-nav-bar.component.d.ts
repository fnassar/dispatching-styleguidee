import { Router } from '@angular/router';
import { AuthService } from '../../../../services';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { SidenavService } from '../../../services/side-nav-collapse.service';
import * as i0 from "@angular/core";
export declare const collapseAnimation: import("@angular/animations").AnimationTriggerMetadata;
export declare class CustomNavBarComponent {
    sidenav: SidenavService;
    private authService;
    private router;
    private domSanitizer;
    headerLogo: SafeHtml;
    collapseIcon: SafeHtml;
    collapseDarkIcon: SafeHtml;
    logoutIcon: SafeHtml;
    settingsIcon: SafeHtml;
    settingsDarkIcon: SafeHtml;
    constructor(sidenav: SidenavService, authService: AuthService, router: Router, domSanitizer: DomSanitizer);
    logout(): void;
    openSettings(): void;
    isSettingsActive(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomNavBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomNavBarComponent, "app-custom-nav-bar", never, {}, {}, never, never, true, never>;
}
