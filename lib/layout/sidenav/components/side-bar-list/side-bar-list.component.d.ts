import { OnInit } from '@angular/core';
import { CollapseService } from './services/collapse.service';
import { AuthContextService, AuthService } from '../../../../services';
import { SidenavService } from '../../../services/side-nav-collapse.service';
import * as i0 from "@angular/core";
export declare class SideBarListComponent implements OnInit {
    private authService;
    private authContextService;
    protected sidenav: SidenavService;
    protected collapseService: CollapseService;
    constructor(authService: AuthService, authContextService: AuthContextService, sidenav: SidenavService, collapseService: CollapseService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SideBarListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SideBarListComponent, "app-side-bar-list", never, {}, {}, never, never, true, never>;
}
