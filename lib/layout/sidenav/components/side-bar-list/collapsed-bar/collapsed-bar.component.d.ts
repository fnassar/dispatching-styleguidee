import { EventEmitter } from '@angular/core';
import { MainTab, SubTab } from '../../../enums/tabData';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CollapseService } from '../services/collapse.service';
import { SidenavService } from '../../../../services/side-nav-collapse.service';
import * as i0 from "@angular/core";
export declare class CollapsedBarComponent {
    protected collapseService: CollapseService;
    private sanitizer;
    protected sidenav: SidenavService;
    tab: import("@angular/core").InputSignal<MainTab>;
    collapseAll: EventEmitter<MainTab>;
    arrowDownSmallIcon: SafeHtml;
    constructor(collapseService: CollapseService, sanitizer: DomSanitizer, sidenav: SidenavService);
    ngOnInit(): void;
    getIcon(icon: string): SafeHtml;
    getDarkIcon(icon: string): SafeHtml;
    isExpanded(tab: MainTab): boolean;
    isActiveTab(tab: MainTab): boolean;
    isActiveSubTab(tab: MainTab, subTab: SubTab): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CollapsedBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CollapsedBarComponent, "app-collapsed-bar", never, { "tab": { "alias": "tab"; "required": false; "isSignal": true; }; }, { "collapseAll": "collapseAll"; }, never, never, true, never>;
}
