import { Router } from '@angular/router';
import { MainTab, SubTab } from '../../../enums/tabData';
import { AuthService } from '../../../../../services';
import * as i0 from "@angular/core";
export declare class CollapseService {
    private authService;
    private router;
    filteredTabs: MainTab[];
    activeTab: MainTab | null;
    activeSubTab: SubTab | null;
    constructor(authService: AuthService, router: Router);
    isExpanded(tab: MainTab): boolean;
    isActiveTab(tab: MainTab): boolean;
    isActiveSubTab(tab: MainTab, subTab: SubTab): boolean;
    filterTabs(): void;
    onMainTabClick(tab: MainTab): void;
    closeAllTabs(tab?: MainTab): void;
    toggleTab(tab: MainTab): void;
    routeModules(link: string): void;
    onSubTabClick(subTab: SubTab): void;
    private getCurrentUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<CollapseService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CollapseService>;
}
