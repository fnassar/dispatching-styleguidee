import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import * as i0 from "@angular/core";
export declare class PermissionGuard implements CanActivate {
    private router;
    constructor(router: Router);
    canActivate(route: ActivatedRouteSnapshot): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PermissionGuard>;
}
