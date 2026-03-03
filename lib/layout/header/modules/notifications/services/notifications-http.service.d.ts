import { INotification, IPageResInterface } from '../interfaces/main.notif.interfaces';
import { Observable } from 'rxjs';
import { IUserData } from '../../../../../interfaces';
import { AuthContextService, CommonHttpService } from '../../../../../services';
import * as i0 from "@angular/core";
export declare class NotificationsHttpService {
    private commonHttp;
    private authContext;
    authUser: IUserData;
    constructor(commonHttp: CommonHttpService, authContext: AuthContextService);
    markNotifRead(id: any): Observable<any>;
    markAllNotifRead(): void;
    getAllNotif(params: any): Observable<IPageResInterface<INotification[]>>;
    getUnreadCount(): Observable<any>;
    deleteNotif(id: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotificationsHttpService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NotificationsHttpService>;
}
