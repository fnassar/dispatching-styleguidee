import { NgZone, OnInit } from '@angular/core';
import { NotificationsStateService } from '../../services/notifications.state.service';
import { NotificationSocketService } from '../../../../core/services/notification-socket.service';
import { LoadingService } from '../../../../../../services';
import * as i0 from "@angular/core";
export declare class NotificationsManagementComponent implements OnInit {
    protected state: NotificationsStateService;
    protected loadingService: LoadingService;
    unreadCount?: number;
    notificationSocketService: NotificationSocketService;
    ngZone: NgZone;
    constructor(state: NotificationsStateService, loadingService: LoadingService);
    ngOnInit(): void;
    markNotificationRead(id: string): void;
    deleteNotification(id: string): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationsManagementComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NotificationsManagementComponent, "app-notifications-management", never, { "unreadCount": { "alias": "unreadCount"; "required": false; }; }, {}, never, never, true, never>;
}
