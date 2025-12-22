import { EventEmitter, TemplateRef } from '@angular/core';
import { IStatusCol, ITableHeader } from '../../interfaces';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class CustomTableComponent<T extends Record<string, any>> {
    private sanitizer;
    tableData: T[];
    tableHeader: ITableHeader<T>[];
    cellTemplates: {
        [key: string]: TemplateRef<any>;
    };
    expandedCellTemplates: {
        [key: string]: TemplateRef<any>;
    };
    expandedChildAccessor: ((row: T) => any[]) | null;
    expandable: boolean;
    showStatusColumn: boolean;
    showActionColumn: boolean;
    showNumberCol: boolean;
    sortedKey: string;
    pagination: any;
    enableEdit: boolean;
    enableDelete: boolean;
    enableView: boolean;
    rowClass: string;
    headerClass: string;
    statusCol: IStatusCol<T>;
    actions?: {
        label: string;
        icon?: string;
        class?: string;
        callback: (ctx: any) => void;
    }[];
    onEdit: EventEmitter<T>;
    onView: EventEmitter<T>;
    onDelete: EventEmitter<T>;
    onRowClick: EventEmitter<T>;
    sortColumn: EventEmitter<string | number | symbol | undefined>;
    cellEditStart: EventEmitter<{
        row: any;
        col: ITableHeader<T>;
        isChild: boolean;
        parent?: any;
    }>;
    cellEditEnd: EventEmitter<{
        row: any;
        col: ITableHeader<T>;
        isChild: boolean;
        parent?: any;
    }>;
    cellEditCancel: EventEmitter<void>;
    expandedRows: Set<number>;
    checkedSortIcon: SafeHtml;
    checkedActionViewSvg: SafeHtml;
    checkedActionEditSvg: SafeHtml;
    checkedActionDeleteSvg: SafeHtml;
    private editingCell;
    constructor(sanitizer: DomSanitizer);
    canExpandRow(row: T): boolean;
    toggleRow(i: number): void;
    isRowExpanded(i: number): boolean;
    getCellValue(row: T, col: ITableHeader<T>): any;
    private getRowKey;
    private getColKey;
    isCellEditing(row: any, col: ITableHeader<T>, rowIndex: number, isChild: boolean, parent?: any): boolean;
    canInlineEdit(col: ITableHeader<T>, row: any): boolean;
    onCellClick(ev: MouseEvent, row: any, col: ITableHeader<T>, rowIndex: number, isChild: boolean, parent?: any): void;
    endEditing(row: any, col: ITableHeader<T>, isChild: boolean, parent?: any): void;
    clearEditing(): void;
    cancelEditing(): void;
    onContainerClick(ev: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomTableComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomTableComponent<any>, "custom-table", never, { "tableData": { "alias": "tableData"; "required": false; }; "tableHeader": { "alias": "tableHeader"; "required": false; }; "cellTemplates": { "alias": "cellTemplates"; "required": false; }; "expandedCellTemplates": { "alias": "expandedCellTemplates"; "required": false; }; "expandedChildAccessor": { "alias": "expandedChildAccessor"; "required": false; }; "expandable": { "alias": "expandable"; "required": false; }; "showStatusColumn": { "alias": "showStatusColumn"; "required": false; }; "showActionColumn": { "alias": "showActionColumn"; "required": false; }; "showNumberCol": { "alias": "showNumberCol"; "required": false; }; "sortedKey": { "alias": "sortedKey"; "required": false; }; "pagination": { "alias": "pagination"; "required": false; }; "enableEdit": { "alias": "enableEdit"; "required": false; }; "enableDelete": { "alias": "enableDelete"; "required": false; }; "enableView": { "alias": "enableView"; "required": false; }; "rowClass": { "alias": "rowClass"; "required": false; }; "headerClass": { "alias": "headerClass"; "required": false; }; "statusCol": { "alias": "statusCol"; "required": false; }; "actions": { "alias": "actions"; "required": false; }; }, { "onEdit": "onEdit"; "onView": "onView"; "onDelete": "onDelete"; "onRowClick": "onRowClick"; "sortColumn": "sortColumn"; "cellEditStart": "cellEditStart"; "cellEditEnd": "cellEditEnd"; "cellEditCancel": "cellEditCancel"; }, never, never, true, never>;
}
