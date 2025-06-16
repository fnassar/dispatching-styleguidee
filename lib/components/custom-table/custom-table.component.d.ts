import { EventEmitter, TemplateRef } from '@angular/core';
import { ITableCategory, ITableHeader } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomTableComponent<T> {
    path: string;
    tableData: T[] | null;
    tableCategories: ITableCategory<T>[] | null;
    tableHeader: ITableHeader<T>[];
    showStatusColumn: boolean;
    showActionColumn: boolean;
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
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomTableComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomTableComponent<any>, "custom-table", never, { "tableData": { "alias": "tableData"; "required": false; }; "tableCategories": { "alias": "tableCategories"; "required": false; }; "tableHeader": { "alias": "tableHeader"; "required": true; }; "showStatusColumn": { "alias": "showStatusColumn"; "required": true; }; "showActionColumn": { "alias": "showActionColumn"; "required": true; }; "rowClass": { "alias": "rowClass"; "required": false; }; "headerClass": { "alias": "headerClass"; "required": false; }; "templates": { "alias": "templates"; "required": false; }; "enableEdit": { "alias": "enableEdit"; "required": false; }; "enableDelete": { "alias": "enableDelete"; "required": false; }; "enableView": { "alias": "enableView"; "required": false; }; }, { "onEdit": "onEdit"; "onView": "onView"; "onDelete": "onDelete"; "onRowClick": "onRowClick"; }, never, never, true, never>;
}
