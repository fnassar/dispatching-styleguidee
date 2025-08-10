import { TemplateRef } from '@angular/core';
import { OverlayManagerService } from './overlay-panel.service';
import * as i0 from "@angular/core";
export declare class OverlayPanelComponent {
    private overlayManager;
    overlayClass: string;
    targetTemplate: TemplateRef<any>;
    overlayTemplate: TemplateRef<any>;
    isOpen: boolean;
    expandSide: 'LEFT' | 'RIGHT';
    constructor(overlayManager: OverlayManagerService);
    ngAfterContentInit(): void;
    toggleDropdown(event: Event): void;
    closeDropdown(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OverlayPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OverlayPanelComponent, "overlay-panel", never, { "overlayClass": { "alias": "overlayClass"; "required": false; }; "expandSide": { "alias": "expandSide"; "required": false; }; }, {}, ["targetTemplate", "overlayTemplate"], never, true, never>;
}
