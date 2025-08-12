import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class CustomActionsDropdownComponent {
    private sanitizer;
    actions: {
        label: string;
        icon?: string;
        callback: (ctx: any) => void;
    }[];
    context: any;
    horizontalDots: boolean;
    isOpen: boolean;
    constructor(sanitizer: DomSanitizer);
    sanitizeSvg(svg: string): SafeHtml;
    openDropdown(): void;
    closeDropdown(): void;
    onClickAction(action: {
        callback: (ctx: any) => void;
    }, event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomActionsDropdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomActionsDropdownComponent, "custom-actions-dropdown", never, { "actions": { "alias": "actions"; "required": false; }; "context": { "alias": "context"; "required": false; }; "horizontalDots": { "alias": "horizontalDots"; "required": false; }; }, {}, never, never, true, never>;
}
