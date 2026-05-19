import { OnDestroy } from '@angular/core';
import { IGenericSocketResponse } from '../../modules/notifications/interfaces/sockets.notif.interfaces';
import { Observable } from 'rxjs';
import { INotification } from '../../modules/notifications/interfaces/main.notif.interfaces';
import * as i0 from "@angular/core";
export declare class NotificationSocketService implements OnDestroy {
    private baseUrl;
    private socket$;
    private authUser;
    incomingNotifications$: Observable<IGenericSocketResponse<INotification>>;
    badgeUpdate$: Observable<IGenericSocketResponse<{
        userId: string;
        unreadCount: number;
    }>>;
    connectionStatus$: import("@angular/core").WritableSignal<"ERROR" | "OPEN" | "CLOSED">;
    baseUrlTemp: import("@angular/core").InjectionToken<string>;
    private readonly WS_URL;
    constructor(baseUrl: string);
    /**
     * Send subscription message to server
     */
    subscribe(userId: number): void;
    /**
     * Send unSubscription message to server
     */
    unsubscribe(userId: number): void;
    /**
     * Graceful cleanup
     */
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationSocketService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NotificationSocketService>;
}
