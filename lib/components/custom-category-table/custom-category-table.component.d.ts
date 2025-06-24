import { EventEmitter, TemplateRef } from '@angular/core';
import { IStatusCol, ITableCategory, ITableHeader } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomCategoryTableComponent<T> {
    path: string;
    tableCategories: ITableCategory<T>[] | null;
    tableHeader: ITableHeader<T>[];
    showStatusColumn: boolean;
    showActionColumn: boolean;
    statusCol: IStatusCol<T>;
    rowClass: string;
    headerClass: string;
    templates: {
        [key: string]: TemplateRef<any>;
    };
    enableEdit: boolean;
    enableDelete: boolean;
    enableView: boolean;
    onEdit: EventEmitter<T>;
    onView: EventEmitter<T>;
    onDelete: EventEmitter<T>;
    onRowClick: EventEmitter<T>;
    tableData: T[];
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomCategoryTableComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomCategoryTableComponent<any>, "custom-category-table", never, { "tableCategories": { "alias": "tableCategories"; "required": false; }; "tableHeader": { "alias": "tableHeader"; "required": true; }; "showStatusColumn": { "alias": "showStatusColumn"; "required": true; }; "showActionColumn": { "alias": "showActionColumn"; "required": true; }; "statusCol": { "alias": "statusCol"; "required": false; }; "rowClass": { "alias": "rowClass"; "required": false; }; "headerClass": { "alias": "headerClass"; "required": false; }; "templates": { "alias": "templates"; "required": false; }; "enableEdit": { "alias": "enableEdit"; "required": false; }; "enableDelete": { "alias": "enableDelete"; "required": false; }; "enableView": { "alias": "enableView"; "required": false; }; "tableData": { "alias": "tableData"; "required": false; }; }, { "onEdit": "onEdit"; "onView": "onView"; "onDelete": "onDelete"; "onRowClick": "onRowClick"; }, never, never, true, never>;
}
