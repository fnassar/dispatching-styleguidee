import { EventEmitter } from '@angular/core';
import { TableSelection } from '../../interfaces';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export interface BulkAction {
    label: string;
    icon?: string;
    class?: string;
    callback: (selection: TableSelection) => void;
}
export declare class CustomBulkActionsComponent {
    private sanitizer;
    selections: number;
    selectedLabel: string;
    actions: BulkAction[];
    actionClick: EventEmitter<any>;
    removeSelection: EventEmitter<any>;
    constructor(sanitizer: DomSanitizer);
    sanitizeSvg(svg: string): SafeHtml;
    onRemoveSelection(): void;
    onActionClick(action: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomBulkActionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomBulkActionsComponent, "custom-bulk-actions", never, { "selections": { "alias": "selections"; "required": false; }; "selectedLabel": { "alias": "selectedLabel"; "required": false; }; "actions": { "alias": "actions"; "required": false; }; }, { "actionClick": "actionClick"; "removeSelection": "removeSelection"; }, never, never, true, never>;
}
