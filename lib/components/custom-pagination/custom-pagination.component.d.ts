import { EventEmitter } from '@angular/core';
import { IPageChangeEvent } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomPaginationComponent {
    maxVisiblePages: number;
    page: number;
    pageSize: number;
    private _totalCount;
    set totalCount(value: number);
    get totalCount(): number;
    pageChange: EventEmitter<IPageChangeEvent>;
    baseValue: number;
    pageSizeOptions: import("@angular/core").WritableSignal<number[]>;
    totalPages: import("@angular/core").WritableSignal<number[]>;
    hideTotalCount: import("@angular/core").InputSignal<boolean>;
    constructor();
    ngOnInit(): void;
    calculateTotalPages(): void;
    generatePageSizeOptions(): void;
    prevPage(): void;
    nextPage(): void;
    changePage(index: number): void;
    firstPage(): void;
    lastPage(): void;
    onPageSizeChange(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomPaginationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomPaginationComponent, "custom-pagination", never, { "maxVisiblePages": { "alias": "maxVisiblePages"; "required": false; }; "page": { "alias": "page"; "required": true; }; "pageSize": { "alias": "pageSize"; "required": false; }; "totalCount": { "alias": "totalCount"; "required": true; }; "baseValue": { "alias": "baseValue"; "required": false; }; "hideTotalCount": { "alias": "hideTotalCount"; "required": false; "isSignal": true; }; }, { "pageChange": "pageChange"; }, never, never, true, never>;
}
