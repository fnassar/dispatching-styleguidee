import { IBreadcrumb } from '../../interfaces/components/breadcrumb.interface';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
export declare class CustomBreadcrumbComponent {
    private router;
    breadcrumbItems: Array<IBreadcrumb>;
    breadcrumbItemClicked: (item: IBreadcrumb) => void;
    constructor(router: Router);
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomBreadcrumbComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomBreadcrumbComponent, "custom-breadcrumb", never, { "breadcrumbItems": { "alias": "breadcrumbItems"; "required": true; }; }, { "breadcrumbItemClicked": "breadcrumbItemClicked"; }, never, never, true, never>;
}
