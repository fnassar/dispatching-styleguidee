import { EventEmitter } from '@angular/core';
import { IDropdownOption } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomMultiSelectDropdownComponent {
    dropdownOptionsClass: string;
    dropdownContainerClass: string;
    enableFilter: boolean;
    options: IDropdownOption[];
    value: any[];
    valueChange: EventEmitter<any[]>;
    filteredOptions: IDropdownOption[];
    filterText: string;
    ngOnInit(): void;
    toggleOptionSelection(option: IDropdownOption): void;
    isSelected(id: any): boolean;
    filterOptions(): void;
    set reset(value: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomMultiSelectDropdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomMultiSelectDropdownComponent, "custom-multi-select-dropdown", never, { "dropdownOptionsClass": { "alias": "dropdownOptionsClass"; "required": false; }; "dropdownContainerClass": { "alias": "dropdownContainerClass"; "required": false; }; "enableFilter": { "alias": "enableFilter"; "required": false; }; "options": { "alias": "options"; "required": true; }; "value": { "alias": "value"; "required": true; }; "reset": { "alias": "reset"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
