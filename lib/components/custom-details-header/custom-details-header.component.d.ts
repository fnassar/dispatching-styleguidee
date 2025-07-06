import { EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IDropdownOption } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomDetailsHeaderComponent {
    private sanitizer;
    showX: boolean;
    BreadCrumbs: {
        label: string;
        url: string;
    }[];
    closeContainer: EventEmitter<void>;
    dropdownSelectAction: EventEmitter<string | number>;
    xMarkSvg: SafeHtml;
    DetailDDSvg: SafeHtml;
    showDropdown: boolean;
    breadCrumb: {
        label: string;
        url: string;
    }[];
    dropdownOptions: IDropdownOption[];
    constructor(sanitizer: DomSanitizer);
    toggleDropdown(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomDetailsHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomDetailsHeaderComponent, "custom-details-header", never, { "showX": { "alias": "showX"; "required": false; }; "BreadCrumbs": { "alias": "BreadCrumbs"; "required": true; }; }, { "closeContainer": "closeContainer"; "dropdownSelectAction": "dropdownSelectAction"; }, never, never, true, never>;
}
