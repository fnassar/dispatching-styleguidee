import { IDropdownOption } from './../../interfaces/components/dropdown.interface';
import { EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export interface IActionsList extends IDropdownOption {
    icon?: string;
}
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
    actionsDropdown: import("@angular/core").InputSignal<IActionsList[]>;
    constructor(sanitizer: DomSanitizer);
    sanitizeSvg(svg: string): SafeHtml;
    toggleDropdown(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomDetailsHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomDetailsHeaderComponent, "custom-details-header", never, { "showX": { "alias": "showX"; "required": false; }; "BreadCrumbs": { "alias": "BreadCrumbs"; "required": true; }; "actionsDropdown": { "alias": "actionsDropdown"; "required": false; "isSignal": true; }; }, { "closeContainer": "closeContainer"; "dropdownSelectAction": "dropdownSelectAction"; }, never, never, true, never>;
}
