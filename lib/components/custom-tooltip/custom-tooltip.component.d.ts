import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CustomTooltipComponent {
    customClass: string;
    text: string;
    delay: number;
    position: 'top' | 'bottom' | 'left' | 'right';
    tooltipTemplate: TemplateRef<any>;
    visible: boolean;
    private timeoutId;
    show(): void;
    hide(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomTooltipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomTooltipComponent, "custom-tooltip", never, { "customClass": { "alias": "customClass"; "required": false; }; "text": { "alias": "text"; "required": false; }; "delay": { "alias": "delay"; "required": false; }; "position": { "alias": "position"; "required": false; }; }, {}, ["tooltipTemplate"], ["*"], true, never>;
}
