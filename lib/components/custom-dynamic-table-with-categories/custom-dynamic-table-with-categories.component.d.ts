import { EventEmitter, TemplateRef } from '@angular/core';
import { GroupedTableConfig, TableColumn } from '../../interfaces/components/dynamic-table.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BulkAction } from '../custom-bulk-actions/custom-bulk-actions.component';
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
    selected: Set<string | number>;
    enableAllSelection: boolean;
    selectedLabel: string;
    bulkActions: BulkAction[];
    bulkActionChange: EventEmitter<{
        action: any;
        selection: Set<string | number>;
    }>;
    selectAllChange: EventEmitter<boolean>;
    selectionChange: EventEmitter<Set<string | number>>;
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
    isSelected(id: string | number): boolean;
    toggleSelection(id: string | number, checked: boolean): void;
    toggleGroup(group: any, checked: boolean): void;
    onBulkAction(action: BulkAction): void;
    isGroupSelected(group: any): boolean;
    isGroupIndeterminate(group: any): boolean;
    toggleSelectAll(checked: boolean): void;
    isAllSelected(): boolean;
    isGroupPartial(group: any): boolean;
    removeSelections(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomDynamicTableWithCategoriesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomDynamicTableWithCategoriesComponent, "custom-dynamic-table-with-categories", never, { "config": { "alias": "config"; "required": false; }; "hasCheckBox": { "alias": "hasCheckBox"; "required": false; }; "cellTemplates": { "alias": "cellTemplates"; "required": false; }; "actionTemplates": { "alias": "actionTemplates"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "enableAllSelection": { "alias": "enableAllSelection"; "required": false; }; "selectedLabel": { "alias": "selectedLabel"; "required": false; }; "bulkActions": { "alias": "bulkActions"; "required": false; }; }, { "sortColumn": "sortColumn"; "nameClick": "nameClick"; "bulkActionChange": "bulkActionChange"; "selectAllChange": "selectAllChange"; "selectionChange": "selectionChange"; }, never, never, true, never>;
}
