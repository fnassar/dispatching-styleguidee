import { EventEmitter, TemplateRef } from '@angular/core';
import { ITabDropdownOption } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomTabsComponent {
    tabsList: ITabDropdownOption[];
    color: string;
    colorSelected: string;
    tabTemplates: {
        [key: string]: TemplateRef<any>;
    };
    tabSelected: EventEmitter<ITabDropdownOption>;
    selectedTab: ITabDropdownOption;
    ngOnInit(): void;
    selectTab(tab: ITabDropdownOption): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomTabsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomTabsComponent, "custom-tabs", never, { "tabsList": { "alias": "tabsList"; "required": true; }; "color": { "alias": "color"; "required": false; }; "colorSelected": { "alias": "colorSelected"; "required": false; }; "tabTemplates": { "alias": "tabTemplates"; "required": false; }; }, { "tabSelected": "tabSelected"; }, never, never, true, never>;
}
