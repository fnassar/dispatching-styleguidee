import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CustomModalComponent {
    modalTitle: string;
    showDot: boolean;
    hideEvent: EventEmitter<void>;
    isVisible: boolean;
    open(): void;
    close(): void;
    onOverlayClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomModalComponent, "modal", never, { "modalTitle": { "alias": "modalTitle"; "required": false; }; "showDot": { "alias": "showDot"; "required": false; }; }, { "hideEvent": "hideEvent"; }, never, ["*"], true, never>;
}
