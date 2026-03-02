import { EventEmitter } from '@angular/core';
import { MainTab, SubTab } from '../../../enums/tabData';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { CollapseService } from '../services/collapse.service';
import { SidenavService } from '../../../../services/side-nav-collapse.service';
import * as i0 from "@angular/core";
export declare class ExpandedBarComponent {
    protected collapseService: CollapseService;
    private sanitizer;
    protected sidenav: SidenavService;
    protected readonly assetUrl: (string: string) => string;
    tab: import("@angular/core").InputSignal<MainTab>;
    collapseAll: EventEmitter<MainTab>;
    arrowDownIcon: SafeHtml;
    constructor(collapseService: CollapseService, sanitizer: DomSanitizer, sidenav: SidenavService);
    ngOnInit(): void;
    isExpanded(tab: MainTab): boolean;
    isActiveTab(tab: MainTab): boolean;
    isActiveSubTab(tab: MainTab, subTab: SubTab): boolean;
    getIcon(icon: string): SafeHtml;
    getDarkIcon(icon: string): SafeHtml;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpandedBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExpandedBarComponent, "app-expanded-bar", never, { "tab": { "alias": "tab"; "required": false; "isSignal": true; }; }, { "collapseAll": "collapseAll"; }, never, never, true, never>;
}
