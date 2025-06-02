import { EventEmitter, TemplateRef } from '@angular/core';
import { PlanObjectType } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class CustomNotionPopupComponent {
    isOpen: boolean;
    data: PlanObjectType;
    buttons: TemplateRef<any> | undefined;
    closePanel: EventEmitter<void>;
    downloadAtt: EventEmitter<string | number>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomNotionPopupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomNotionPopupComponent, "custom-notion-popup", never, { "isOpen": { "alias": "isOpen"; "required": false; }; "data": { "alias": "data"; "required": false; }; "buttons": { "alias": "buttons"; "required": false; }; }, { "closePanel": "closePanel"; "downloadAtt": "downloadAtt"; }, never, never, true, never>;
}
