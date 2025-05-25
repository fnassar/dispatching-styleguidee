import { ElementRef, OnChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BlurBackdropDirective implements OnChanges {
    private el;
    showBackdrop: boolean;
    constructor(el: ElementRef);
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BlurBackdropDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BlurBackdropDirective, "[blurBackdrop]", never, { "showBackdrop": { "alias": "showBackdrop"; "required": false; }; }, {}, never, never, true, never>;
}
