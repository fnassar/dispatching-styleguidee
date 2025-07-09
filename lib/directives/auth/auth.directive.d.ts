import { TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services';
import * as i0 from "@angular/core";
export declare class AuthDirective {
    private authService;
    private templateRef;
    private viewContainer;
    constructor(authService: AuthService, templateRef: TemplateRef<any>, viewContainer: ViewContainerRef);
    set canDoAction(actions: string[]);
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AuthDirective, "[canDoAction]", never, { "canDoAction": { "alias": "canDoAction"; "required": false; }; }, {}, never, never, true, never>;
}
