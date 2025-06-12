import { EventEmitter } from '@angular/core';
import { IPageChangeEvent } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomPaginationComponent {
    page: number;
    pageSize: number;
    totalCount: number;
    pageChange: EventEmitter<IPageChangeEvent>;
    baseValue: number;
    pageSizeOptions: number[];
    totalPages: number[];
    ngOnInit(): void;
    calculateTotalPages(): void;
    generatePageSizeOptions(): void;
    prevPage(): void;
    nextPage(): void;
    firstPage(): void;
    lastPage(): void;
    onPageSizeChange(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomPaginationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomPaginationComponent, "custom-pagination", never, { "page": { "alias": "page"; "required": true; }; "pageSize": { "alias": "pageSize"; "required": false; }; "totalCount": { "alias": "totalCount"; "required": true; }; "baseValue": { "alias": "baseValue"; "required": false; }; }, { "pageChange": "pageChange"; }, never, never, true, never>;
}
