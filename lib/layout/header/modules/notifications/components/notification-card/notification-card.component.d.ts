import { EventEmitter } from '@angular/core';
import { INotification } from '../../interfaces/main.notif.interfaces';
import * as i0 from "@angular/core";
export declare class NotificationCardComponent {
    assetUrl: (path: string) => string;
    private router;
    delete: EventEmitter<void>;
    read: EventEmitter<void>;
    notification: import("@angular/core").InputSignal<INotification>;
    notificationAction: Record<import("../../enums/main.notif.enums").NOTIF_ENUM, import("../../interfaces/main.notif.interfaces").INotificationAction>;
    readNotification(): void;
    getDate(value: string | number[]): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NotificationCardComponent, "notification-card", never, { "notification": { "alias": "notification"; "required": false; "isSignal": true; }; }, { "delete": "delete"; "read": "read"; }, never, never, true, never>;
}
