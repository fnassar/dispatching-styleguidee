import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CustomPopUpComponent {
    popUpClass: string;
    message: string;
    icon: string;
    overlayClass: string;
    messageClass: string;
    iconClass: string;
    isOpen: boolean;
    onHide: EventEmitter<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomPopUpComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomPopUpComponent, "custom-pop-up", never, { "popUpClass": { "alias": "popUpClass"; "required": false; }; "message": { "alias": "message"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "overlayClass": { "alias": "overlayClass"; "required": false; }; "messageClass": { "alias": "messageClass"; "required": false; }; "iconClass": { "alias": "iconClass"; "required": false; }; "isOpen": { "alias": "isOpen"; "required": true; }; }, { "onHide": "onHide"; }, never, ["*"], true, never>;
}
