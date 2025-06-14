import { EventEmitter } from '@angular/core';
import { IDropdownOption } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomDropdownComponent {
    label?: string;
    labelClass: string;
    dropdownOptionsClass: string;
    dropdownHeaderClass: string;
    dropdownContainerClass: string;
    placeholder: string;
    enableFilter: boolean;
    showClear: boolean;
    options: IDropdownOption[];
    name?: string;
    value: any;
    valueChange: EventEmitter<any>;
    isOpen: boolean;
    filteredOptions: IDropdownOption[];
    filterText: string;
    ngOnInit(): void;
    get selectedOption(): IDropdownOption | null;
    toggleDropdown(): void;
    selectOption(option: IDropdownOption): void;
    clearSelection(event: Event): void;
    filterOptions(): void;
    set reset(value: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomDropdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomDropdownComponent, "custom-dropdown", never, { "label": { "alias": "label"; "required": false; }; "labelClass": { "alias": "labelClass"; "required": false; }; "dropdownOptionsClass": { "alias": "dropdownOptionsClass"; "required": false; }; "dropdownHeaderClass": { "alias": "dropdownHeaderClass"; "required": false; }; "dropdownContainerClass": { "alias": "dropdownContainerClass"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "enableFilter": { "alias": "enableFilter"; "required": false; }; "showClear": { "alias": "showClear"; "required": false; }; "options": { "alias": "options"; "required": true; }; "name": { "alias": "name"; "required": true; }; "value": { "alias": "value"; "required": true; }; "reset": { "alias": "reset"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
