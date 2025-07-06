import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CustomDetailsModalComponent {
    modalTitle: string;
    overlayClickClose: boolean;
    BreadCrumbs: {
        label: string;
        url: string;
    }[];
    headerButtonClick: EventEmitter<void>;
    isVisible: boolean;
    open(): void;
    close(): void;
    onOverlayClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomDetailsModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomDetailsModalComponent, "custom-details-modal", never, { "modalTitle": { "alias": "modalTitle"; "required": false; }; "overlayClickClose": { "alias": "overlayClickClose"; "required": false; }; "BreadCrumbs": { "alias": "BreadCrumbs"; "required": false; }; }, { "headerButtonClick": "headerButtonClick"; }, never, ["[mainContent]", "[sideContent]"], true, never>;
}
