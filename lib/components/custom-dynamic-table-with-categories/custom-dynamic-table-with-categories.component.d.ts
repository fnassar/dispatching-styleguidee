import { EventEmitter, TemplateRef } from '@angular/core';
import { GroupedTableConfig, TableColumn } from '../../interfaces/components/dynamic-table.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class CustomDynamicTableWithCategoriesComponent {
    private sanitizer;
    config: GroupedTableConfig | any;
    hasCheckBox: boolean;
    cellTemplates: {
        [key: string]: TemplateRef<any>;
    };
    actionTemplates: {
        [key: string]: TemplateRef<any>;
    };
    sortColumn: EventEmitter<string | number | symbol | undefined>;
    nameClick: EventEmitter<any>;
    checkedSortIcon: SafeHtml;
    checkedActionViewSvg: SafeHtml;
    checkedActionEditSvg: SafeHtml;
    checkedActionDeleteSvg: SafeHtml;
    expandSvg: SafeHtml;
    private editingCell;
    constructor(sanitizer: DomSanitizer);
    cancelEditing(): void;
    private getRowKey;
    private getColKey;
    isCellEditing(row: any, col: TableColumn, groupIndex: number, rowIndex: number): boolean;
    onCellClick(ev: MouseEvent, row: any, col: TableColumn, groupIndex: number, rowIndex: number): void;
    onContainerClick(ev: MouseEvent): void;
    onAction(row: any, handler: (row: any) => void): void;
    getNestedValue(obj: any, path: string): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomDynamicTableWithCategoriesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomDynamicTableWithCategoriesComponent, "custom-dynamic-table-with-categories", never, { "config": { "alias": "config"; "required": false; }; "hasCheckBox": { "alias": "hasCheckBox"; "required": false; }; "cellTemplates": { "alias": "cellTemplates"; "required": false; }; "actionTemplates": { "alias": "actionTemplates"; "required": false; }; }, { "sortColumn": "sortColumn"; "nameClick": "nameClick"; }, never, never, true, never>;
}
