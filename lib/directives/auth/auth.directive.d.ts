import { TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthContextService, AuthService } from '../../services';
import * as i0 from "@angular/core";
export declare class AuthDirective {
    private authService;
    private templateRef;
    private viewContainer;
    private authContextService;
    canDoAction: import("@angular/core").InputSignal<string[]>;
    constructor(authService: AuthService, templateRef: TemplateRef<any>, viewContainer: ViewContainerRef, authContextService: AuthContextService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AuthDirective, "[canDoAction]", never, { "canDoAction": { "alias": "canDoAction"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
