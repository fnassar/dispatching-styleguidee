import { EventEmitter, TemplateRef } from '@angular/core';
import { IStatusCol, ITableHeader } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomCategoryTableComponent<T> {
    tableHeader: ITableHeader<T>[];
    tableData: T[];
    showStatusColumn: boolean;
    showActionColumn: boolean;
    rowClass: string;
    headerClass: string;
    templates: {
        [key: string]: TemplateRef<any>;
    };
    statusCol: IStatusCol<T>;
    onEdit: EventEmitter<T>;
    onView: EventEmitter<T>;
    onDelete: EventEmitter<T>;
    onRowClick: EventEmitter<T>;
    editingCell: {
        rowIndex: number;
        colKey: string;
    } | null;
    isCellEditing(rowIndex: number, col: ITableHeader<T>): boolean;
    startEditing(rowIndex: number, col: ITableHeader<T>): void;
    cancelEditing(): void;
    onCellClick(event: MouseEvent, rowIndex: number, col: ITableHeader<T>): void;
    getCellValue(row: T, col: ITableHeader<T>): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomCategoryTableComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomCategoryTableComponent<any>, "custom-category-table", never, { "tableHeader": { "alias": "tableHeader"; "required": false; }; "tableData": { "alias": "tableData"; "required": false; }; "showStatusColumn": { "alias": "showStatusColumn"; "required": false; }; "showActionColumn": { "alias": "showActionColumn"; "required": false; }; "rowClass": { "alias": "rowClass"; "required": false; }; "headerClass": { "alias": "headerClass"; "required": false; }; "templates": { "alias": "templates"; "required": false; }; "statusCol": { "alias": "statusCol"; "required": false; }; }, { "onEdit": "onEdit"; "onView": "onView"; "onDelete": "onDelete"; "onRowClick": "onRowClick"; }, never, never, true, never>;
}
