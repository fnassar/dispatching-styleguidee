import { IRoleData, IUserData } from '../../../../interfaces';
import { AuthService } from '../../../../services';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class ProfileDataComponent {
    private authService;
    private sanitizer;
    userProfile: IUserData;
    arrowDownIcon: SafeHtml;
    constructor(authService: AuthService, sanitizer: DomSanitizer);
    ngOnInit(): void;
    getRoles(roles: IRoleData[]): string | IRoleData[];
    camelCase(str: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProfileDataComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProfileDataComponent, "app-profile-data", never, {}, {}, never, never, true, never>;
}
