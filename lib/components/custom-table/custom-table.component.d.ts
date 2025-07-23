import { EventEmitter, TemplateRef } from '@angular/core';
import { IStatusCol, ITableCategory, ITableHeader } from '../../interfaces';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class CustomTableComponent<T> {
    private sanitizer;
    path: string;
    tableData: T[] | null;
    tableCategories: ITableCategory<T>[] | null;
    cellTemplates: {
        [key: string]: TemplateRef<any>;
    };
    tableHeader: ITableHeader<T>[];
    showStatusColumn: boolean;
    showActionColumn: boolean;
    showNumberCol: boolean;
    pagination: any;
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
    sortColumn: EventEmitter<string | number | symbol | undefined>;
    checkedSortIcon: SafeHtml;
    checkedActionViewSvg: SafeHtml;
    checkedActionEditSvg: SafeHtml;
    checkedActionDeleteSvg: SafeHtml;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomTableComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomTableComponent<any>, "custom-table", never, { "tableData": { "alias": "tableData"; "required": false; }; "tableCategories": { "alias": "tableCategories"; "required": false; }; "cellTemplates": { "alias": "cellTemplates"; "required": false; }; "tableHeader": { "alias": "tableHeader"; "required": true; }; "showStatusColumn": { "alias": "showStatusColumn"; "required": true; }; "showActionColumn": { "alias": "showActionColumn"; "required": true; }; "showNumberCol": { "alias": "showNumberCol"; "required": false; }; "pagination": { "alias": "pagination"; "required": false; }; "statusCol": { "alias": "statusCol"; "required": false; }; "rowClass": { "alias": "rowClass"; "required": false; }; "headerClass": { "alias": "headerClass"; "required": false; }; "templates": { "alias": "templates"; "required": false; }; "enableEdit": { "alias": "enableEdit"; "required": false; }; "enableDelete": { "alias": "enableDelete"; "required": false; }; "enableView": { "alias": "enableView"; "required": false; }; }, { "onEdit": "onEdit"; "onView": "onView"; "onDelete": "onDelete"; "onRowClick": "onRowClick"; "sortColumn": "sortColumn"; }, never, never, true, never>;
}
