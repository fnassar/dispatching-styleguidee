import { Observable } from 'rxjs';
import { ILoginData, IUserData } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { IGlobalAuthResponse } from '../../interfaces/auth/gloal-res.interface';
import { AuthContextService } from './auth-context.service';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
export declare class AuthBeService {
    private http;
    private authContextService;
    private router;
    private baseUrl;
    constructor(http: HttpClient, authContextService: AuthContextService, router: Router, baseUrl: string);
    login(data: {
        username: string;
        password: string;
    }): Observable<IGlobalAuthResponse<ILoginData>>;
    logout(): Observable<IGlobalAuthResponse<any>>;
    refreshToken(refreshToken: {
        refreshToken: string;
    }): Observable<IGlobalAuthResponse<ILoginData>>;
    validateToken(): Observable<IGlobalAuthResponse<any>>;
    getCurrUser(): Observable<IGlobalAuthResponse<IUserData>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthBeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthBeService>;
}
