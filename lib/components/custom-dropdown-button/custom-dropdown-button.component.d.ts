import { EventEmitter } from '@angular/core';
import { IDropdownOption } from '../../interfaces/';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class CustomDropdownButtonComponent {
    private sanitizer;
    options: IDropdownOption[];
    selected: EventEmitter<IDropdownOption>;
    dropdownArrow: SafeHtml;
    isOpen: boolean;
    constructor(sanitizer: DomSanitizer);
    toggleDropdown(): void;
    handleSelect(option: IDropdownOption): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomDropdownButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomDropdownButtonComponent, "custom-dropdown-button", never, { "options": { "alias": "options"; "required": true; }; }, { "selected": "selected"; }, never, ["[buttonLabel]"], true, never>;
}
