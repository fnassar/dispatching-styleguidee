import { ElementRef, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ToggleElementDirective implements OnInit {
    private elementRef;
    element: HTMLElement | undefined;
    private elementVisible;
    constructor(elementRef: ElementRef);
    set hideElement(hide: boolean);
    onDocumentClick(event: MouseEvent, clickedElement: HTMLElement): void;
    onClick(): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToggleElementDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ToggleElementDirective, "[toggleElement]", never, { "element": { "alias": "element"; "required": true; }; "hideElement": { "alias": "hideElement"; "required": false; }; }, {}, never, never, true, never>;
}
