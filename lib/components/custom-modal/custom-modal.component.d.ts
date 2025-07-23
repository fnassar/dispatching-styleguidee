import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CustomModalComponent {
    modalTitle: string;
    showDot: boolean;
    headerButton: string;
    overlayClickClose: boolean;
    hideEvent: EventEmitter<void>;
    headerButtonClick: EventEmitter<void>;
    isVisible: boolean;
    open(): void;
    close(): void;
    closeInternal(): void;
    onHeaderButtonClick(): void;
    onOverlayClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomModalComponent, "modal", never, { "modalTitle": { "alias": "modalTitle"; "required": false; }; "showDot": { "alias": "showDot"; "required": false; }; "headerButton": { "alias": "headerButton"; "required": false; }; "overlayClickClose": { "alias": "overlayClickClose"; "required": false; }; }, { "hideEvent": "hideEvent"; "headerButtonClick": "headerButtonClick"; }, never, ["*"], true, never>;
}
