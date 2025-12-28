import { ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class AllowNumberOnlyDirective {
    private el;
    private regex;
    private specialKeys;
    constructor(el: ElementRef<HTMLInputElement>);
    onKeyDown(event: KeyboardEvent): void;
    onPaste(event: ClipboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AllowNumberOnlyDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AllowNumberOnlyDirective, "[appAllowNumberOnly]", never, {}, {}, never, never, true, never>;
}
