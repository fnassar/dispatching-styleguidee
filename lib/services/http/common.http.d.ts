import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CommonHttpService {
    private http;
    private baseUrl?;
    constructor(http: HttpClient, baseUrl?: string | undefined);
    private buildUrl;
    CommonPostRequests(url: string, body: any): Observable<any>;
    CommonPutRequests(url: string, body: any): Observable<any>;
    CommonGetRequests(url: string, body?: any): Observable<any>;
    CommonDeleteRequest(url: string): Observable<any>;
    CommonGetRequestsWithQuery(url: string, Model: any, body?: any): Observable<any>;
    CommonPostRequestsWithQuery(url: string, Model: any, body: any): Observable<any>;
    CommonPutRequestsWithQuery(url: string, Model: any, body: any): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CommonHttpService, [null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CommonHttpService>;
}
