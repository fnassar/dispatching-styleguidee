import { EventEmitter, ModelSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IComponentFormError, IDropdownOption } from '../../interfaces';
import { ComponentFormErrorConstant } from '../../enums';
import * as i0 from "@angular/core";
export type FilterType = 'multiselect' | 'date' | 'text' | 'dateRange';
export interface FilterConfig extends IDropdownOption {
    type: FilterType;
    label: string;
    options?: IDropdownOption[];
    placeholder?: string;
    constraints?: IPossibleConstrains;
    reset: boolean;
    validation: IComponentFormError[];
    disabled: boolean;
}
export interface IPossibleConstrains {
    minDate?: Date;
    maxDate?: Date;
    minVal?: number;
}
export type FilterValues = Record<string, any>;
export type FilterRow = {
    filterId?: string | number;
    filterConfig?: FilterConfig;
    controlName: string;
};
export declare class CustomFilterDropdownComponent {
    private fb;
    filtersConfig: FilterConfig[];
    filtersChanged: EventEmitter<FilterValues>;
    activeFilters: ModelSignal<{
        main: FilterRow[];
        filteredValues: FilterValues;
    }>;
    filterOptions: IDropdownOption[];
    filterForm: FormGroup;
    emptyOptions: IDropdownOption[];
    nullValidation: IComponentFormError[];
    protected readonly errorConstant: typeof ComponentFormErrorConstant;
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    getDefaultInitialValue(type: FilterType): "" | never[] | null;
    getValidatorsFromConfig(validations?: IComponentFormError[]): (typeof Validators.required)[];
    getAvailableOptions(activeIndex: number): IDropdownOption[];
    addFilterRow(): void;
    onFilterDropdownChange(selectedId: IDropdownOption | null, rowIndex: number): void;
    removeFilterRow(rowIndex: number): void;
    clearAll(): void;
    onDateChange(event: any, name: string): void;
    onMultiSelectChange(event: any, name: string): void;
    onDropdownChange(event: any, name: string): void;
    filtersChangedEmit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomFilterDropdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomFilterDropdownComponent, "custom-filter-dropdown", never, { "filtersConfig": { "alias": "filtersConfig"; "required": true; }; "activeFilters": { "alias": "activeFilters"; "required": false; "isSignal": true; }; }, { "filtersChanged": "filtersChanged"; "activeFilters": "activeFiltersChange"; }, never, never, true, never>;
}
