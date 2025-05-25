import { IBreadcrumb } from '../../interfaces/components/breadcrumb.interface';
import * as i0 from "@angular/core";
export declare class CustomBreadcrumbComponent {
    breadcrumbItems: Array<IBreadcrumb>;
    breadcrumbItemClicked: (item: IBreadcrumb) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomBreadcrumbComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomBreadcrumbComponent, "custom-breadcrumb", never, { "breadcrumbItems": { "alias": "breadcrumbItems"; "required": true; }; }, { "breadcrumbItemClicked": "breadcrumbItemClicked"; }, never, never, true, never>;
}
