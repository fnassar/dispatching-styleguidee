import { EventEmitter } from '@angular/core';
import { IPageChangeEvent } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomPaginationComponent {
    maxVisiblePages: number;
    set page(value: number);
    _page: import("@angular/core").WritableSignal<number>;
    get page(): number;
    pageSize: import("@angular/core").InputSignal<number>;
    totalCount: import("@angular/core").InputSignal<number>;
    pageChange: EventEmitter<IPageChangeEvent>;
    baseValue: number;
    hideTotalCount: import("@angular/core").InputSignal<boolean>;
    showPageSize: boolean;
    pageSizeOptions: import("@angular/core").Signal<number[]>;
    totalPageCount: import("@angular/core").Signal<number>;
    totalPages: import("@angular/core").Signal<number[]>;
    prevPage(): void;
    nextPage(): void;
    changePage(index: number): void;
    firstPage(): void;
    lastPage(): void;
    onPageSizeChange(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomPaginationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomPaginationComponent, "custom-pagination", never, { "maxVisiblePages": { "alias": "maxVisiblePages"; "required": false; }; "page": { "alias": "page"; "required": false; }; "pageSize": { "alias": "pageSize"; "required": false; "isSignal": true; }; "totalCount": { "alias": "totalCount"; "required": false; "isSignal": true; }; "baseValue": { "alias": "baseValue"; "required": false; }; "hideTotalCount": { "alias": "hideTotalCount"; "required": false; "isSignal": true; }; "showPageSize": { "alias": "showPageSize"; "required": false; }; }, { "pageChange": "pageChange"; }, never, never, true, never>;
}
