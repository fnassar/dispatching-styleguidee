import { DomSanitizer } from '@angular/platform-browser';
import { IFunctionDropdown } from '../../../enums/profile.enum';
import { Router } from '@angular/router';
import { IUserData } from '../../../../../interfaces';
import { AuthService } from '../../../../../services';
import * as i0 from "@angular/core";
export declare class ProfileDropdownComponent {
    private authService;
    private router;
    private sanitizer;
    darkMode: boolean;
    userProfile: IUserData;
    profileDropDown: IFunctionDropdown[];
    constructor(authService: AuthService, router: Router, sanitizer: DomSanitizer);
    getSafeHtml(iconConst: string): import("@angular/platform-browser").SafeHtml;
    ngOnInit(): void;
    routePage(path: string): void;
    toggleDark(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProfileDropdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProfileDropdownComponent, "app-profile-dropdown", never, { "userProfile": { "alias": "userProfile"; "required": false; }; }, {}, never, never, true, never>;
}
