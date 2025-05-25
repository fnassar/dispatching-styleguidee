import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class OverlayPanelComponent {
    overlayClass: string;
    targetTemplate: TemplateRef<any>;
    overlayTemplate: TemplateRef<any>;
    isOpen: boolean;
    ngAfterContentInit(): void;
    toggleDropdown(event: Event): void;
    closeDropdown(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OverlayPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OverlayPanelComponent, "overlay-panel", never, { "overlayClass": { "alias": "overlayClass"; "required": false; }; }, {}, ["targetTemplate", "overlayTemplate"], never, true, never>;
}
