import { INotification, IPageResInterface } from '../interfaces/main.notif.interfaces';
import { NotificationsHttpService } from './notifications-http.service';
import { LoadingService } from '../../../../../services';
import * as i0 from "@angular/core";
export declare class NotificationsStateService {
    private notificationsHttpService;
    private loadingService;
    notifications: import("@angular/core").WritableSignal<INotification[]>;
    notificationCount: import("@angular/core").WritableSignal<number>;
    private readonly _toast;
    pagination: import("@angular/core").WritableSignal<{
        pageNum: number;
        pageSize: number;
    }>;
    totalCount: import("@angular/core").WritableSignal<number>;
    constructor(notificationsHttpService: NotificationsHttpService, loadingService: LoadingService);
    clearData(): void;
    loadNotifications(newLoad: boolean): void;
    markNotificationRead(id: string): void;
    deleteNotification(id: string): void;
    addToNotifications(res: IPageResInterface<INotification[]>): void;
    setNotifications(res: IPageResInterface<INotification[]>): void;
    addNewSocketNotification(notif: INotification): void;
    updateUnreadCount(count: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationsStateService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NotificationsStateService>;
}
