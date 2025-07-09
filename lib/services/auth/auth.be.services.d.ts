import { Observable } from 'rxjs';
import { ILoginData, IUserData } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { IGlobalResponse } from '../../interfaces/auth/gloal-res.interface';
import * as i0 from "@angular/core";
export declare class AuthBeService {
    private http;
    constructor(http: HttpClient);
    login(data: {
        username: string;
        password: string;
    }): Observable<IGlobalResponse<ILoginData>>;
    logout(): Observable<IGlobalResponse<any>>;
    refreshToken(refreshToken: any): Observable<IGlobalResponse<ILoginData>>;
    validateToken(): Observable<IGlobalResponse<any>>;
    getCurrUser(): Observable<IGlobalResponse<IUserData>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthBeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthBeService>;
}
