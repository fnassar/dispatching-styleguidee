import { AfterViewInit, ElementRef, EventEmitter, NgZone, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ClickOutsideDirective implements AfterViewInit, OnDestroy {
    private readonly elementReference;
    private readonly zone;
    private platform;
    constructor(elementReference: ElementRef<HTMLElement>, zone: NgZone, platform: object);
    clickOutside: HTMLElement;
    clickOutsideEmitter: EventEmitter<void>;
    isFirstTime: boolean;
    private destroySubscription;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClickOutsideDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ClickOutsideDirective, "[clickOutside]", never, { "clickOutside": { "alias": "clickOutside"; "required": false; }; }, { "clickOutsideEmitter": "clickOutsideEmitter"; }, never, never, true, never>;
}
