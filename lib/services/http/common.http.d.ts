import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CommonHttpService {
    private http;
    constructor(http: HttpClient);
    CommonPostRequests(model: any, url: string): Observable<any>;
    CommonPutRequests(model: any, url: string): Observable<any>;
    CommonGetRequests(url: string): Observable<any>;
    CommonDeleteRequest(url: string): Observable<any>;
    CommonGetRequestsWithQuery(url: string, Model: any): Observable<any>;
    CommonPostRequestsWithQuery(url: string, Model: any, body: any): Observable<any>;
    CommonPutRequestsWithQuery(url: string, Model: any, body: any): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CommonHttpService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CommonHttpService>;
}
