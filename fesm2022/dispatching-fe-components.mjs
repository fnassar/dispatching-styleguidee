import * as i0 from '@angular/core';
import { Injectable, signal, InjectionToken, Inject, computed, Optional, inject, input, Input, Component, EventEmitter, Output, HostListener, Directive, PLATFORM_ID, effect, HostBinding, ViewChild, ContentChild, ViewEncapsulation, model } from '@angular/core';
import { retry, catchError, BehaviorSubject, Observable, map, throwError, finalize, tap, Subscription, fromEvent, filter, Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import * as i1 from '@angular/common/http';
import { HttpContextToken, HttpContext, HttpResponse } from '@angular/common/http';
import * as i3 from '@angular/router';
import { Router } from '@angular/router';
import * as i3$1 from '@ngx-translate/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import * as i1$1 from '@angular/forms';
import { FormsModule, ReactiveFormsModule, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import * as i2 from '@angular/common';
import { isPlatformBrowser, CommonModule, NgStyle, NgClass, NgComponentOutlet, NgTemplateOutlet, DecimalPipe } from '@angular/common';
import { trigger, transition, style, animate, state, keyframes, group, query } from '@angular/animations';
import * as i1$2 from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const ModuleRoutes = {
    AUTH: 'auth',
    USER_PROFILE: `profile`,
    MAIN_PAGE: `main`, // overview
    PLAN_MANAGEMENT_HOME: `plan-management`,
    ASSET_MANAGEMENT_HOME: `asset-management`,
    USER_MANAGEMENT_HOME: `user-management`,
};

const assignTaskSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="white"/>
<rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="currentColor"/>
<path d="M8 12H16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 16V8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const actionAssignTaskSvg = `
<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.7793 9V6.5" stroke="currentColor" stroke-width="0.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 7.75H3.5" stroke="currentColor" stroke-width="0.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 1V2.5" stroke="currentColor" stroke-width="0.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 1V2.5" stroke="currentColor" stroke-width="0.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.90492 1.70996C9.57492 1.76996 10.4199 2.38496 10.4699 4.73496L10.5349 7.81996C10.5749 9.87996 10.0999 10.915 7.59992 10.97L4.59992 11.03C2.09992 11.08 1.57992 10.06 1.53992 8.00496L1.46992 4.91496C1.41992 2.56496 2.24492 1.91496 3.90492 1.78996L7.90492 1.70996Z" stroke="currentColor" stroke-width="0.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`;
const actionEdiSquaretSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="white"/>
<rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="currentColor"/>
<path d="M11.334 5.3335H10.0007C6.66732 5.3335 5.33398 6.66683 5.33398 10.0002V14.0002C5.33398 17.3335 6.66732 18.6668 10.0007 18.6668H14.0007C17.334 18.6668 18.6673 17.3335 18.6673 14.0002V12.6668" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.6933 6.01326L9.43992 11.2666C9.23992 11.4666 9.03992 11.8599 8.99992 12.1466L8.71325 14.1533C8.60659 14.8799 9.11992 15.3866 9.84659 15.2866L11.8533 14.9999C12.1333 14.9599 12.5266 14.7599 12.7333 14.5599L17.9866 9.30659C18.8933 8.39992 19.3199 7.34659 17.9866 6.01326C16.6533 4.67992 15.5999 5.10659 14.6933 6.01326Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.9395 6.7666C14.3861 8.35993 15.6328 9.6066 17.2328 10.0599" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const actionEditSvg$1 = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.9036 1.05725L14.7646 2.9182L8.25154 9.43122L6.39059 7.57027L12.9036 1.05725Z" fill="currentColor"/>
<path d="M6.09528 8.00006L5.38099 9.66673L4.66671 11.3334L8.00004 9.90482L6.09528 8.00006Z" fill="currentColor"/>
<path d="M13.3334 6.00006V13.3334H2.66671V2.66673H10V1.33339H2.66671C1.93033 1.33339 1.33337 1.93035 1.33337 2.66673V13.3334C1.33337 14.0698 1.93033 14.6667 2.66671 14.6667H13.3334C14.0698 14.6667 14.6667 14.0698 14.6667 13.3334V6.00006H13.3334Z" fill="currentColor"/>
</svg>`;
const actionRenameSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="white"/>
<rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="currentColor"/>
<path d="M12.8396 6.39982L7.36624 12.1932C7.15958 12.4132 6.95958 12.8465 6.91958 13.1465L6.67291 15.3065C6.58624 16.0865 7.14624 16.6198 7.91958 16.4865L10.0662 16.1198C10.3662 16.0665 10.7862 15.8465 10.9929 15.6198L16.4662 9.82649C17.4129 8.82649 17.8396 7.68649 16.3662 6.29315C14.8996 4.91315 13.7862 5.39982 12.8396 6.39982Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.9258 7.3667C12.2124 9.2067 13.7058 10.6134 15.5591 10.8" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 18.6667H18" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const actionDeleteSvg$1 = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 3.98665C11.78 3.76665 9.54667 3.65332 7.32 3.65332C6 3.65332 4.68 3.71999 3.36 3.85332L2 3.98665" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.66602 3.3135L5.81268 2.44016C5.91935 1.80683 5.99935 1.3335 7.12602 1.3335H8.87268C9.99935 1.3335 10.086 1.8335 10.186 2.44683L10.3327 3.3135" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.5669 6.09326L12.1336 12.8066C12.0603 13.8533 12.0003 14.6666 10.1403 14.6666H5.86026C4.00026 14.6666 3.94026 13.8533 3.86693 12.8066L3.43359 6.09326" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.88672 11H9.10672" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.33398 8.33301H9.66732" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const actionDuplicateSvg = '<svg width="auto" height="inherit" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const viewIconSVG = `<svg width="auto" height="inherit" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0001 0.75C14.9429 0.75 19.055 4.30645 19.9172 9C19.055 13.6935 14.9429 17.25 10.0001 17.25C5.05728 17.25 0.945142 13.6935 0.0830078 9C0.945142 4.30645 5.05728 0.75 10.0001 0.75ZM10.0001 15.4167C13.8827 15.4167 17.2051 12.7143 18.0461 9C17.2051 5.28569 13.8827 2.58333 10.0001 2.58333C6.11739 2.58333 2.79504 5.28569 1.95405 9C2.79504 12.7143 6.11739 15.4167 10.0001 15.4167ZM10.0001 13.125C7.7219 13.125 5.87508 11.2782 5.87508 9C5.87508 6.72183 7.7219 4.875 10.0001 4.875C12.2782 4.875 14.1251 6.72183 14.1251 9C14.1251 11.2782 12.2782 13.125 10.0001 13.125ZM10.0001 11.2917C11.2658 11.2917 12.2918 10.2656 12.2918 9C12.2918 7.73436 11.2658 6.70833 10.0001 6.70833C8.73447 6.70833 7.70841 7.73436 7.70841 9C7.70841 10.2656 8.73447 11.2917 10.0001 11.2917Z" fill="#9E9595"></path></svg>`;

// export interface IGlobalPaginatedRes<T> {
//   timestamp: string;
//   status: string;
//   message: string;
//   data: T[];
// }
// export interface IErrorResponse {
//   errorCode: "BAD_REQUEST" | string;
//   errorMessage: string;
//   errorTime: string;
//   customErrorCode: "EQUIPMENT_ALREADY_ASSIGNED" | string;
//   extraData: {
//     date: string;
//     equipmentId: string;
//   };
// }

var AuthConstant;
(function (AuthConstant) {
    AuthConstant["TOKEN"] = "accessToken";
    AuthConstant["REFRESH_TOKEN"] = "refreshToken";
    AuthConstant["USER_DATA"] = "user";
    AuthConstant["USER_PERMISSIONS"] = "permissions";
    AuthConstant["USER_ROLES"] = "roles";
    AuthConstant["EXPIRES_AT"] = "expiresIn";
})(AuthConstant || (AuthConstant = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "ACTIVE";
    UserStatus["INACTIVE"] = "INACTIVE";
    UserStatus["SUSPENDED"] = "SUSPENDED";
    // PENDING_ACTIVATION = 'PENDING_ACTIVATION',
})(UserStatus || (UserStatus = {}));
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "ADMIN";
    Roles["SUPER_ADMIN"] = "SUPER_ADMIN";
    Roles["PLANNER"] = "PLANNER";
    Roles["SUPERVISOR"] = "SUPERVISOR";
    Roles["OPERATOR"] = "OPERATOR";
})(Roles || (Roles = {}));
var Types;
(function (Types) {
    Types["ADMIN"] = "ADMIN";
    Types["PLANNER"] = "PLANNER";
    Types["SUPERVISOR"] = "SUPERVISOR";
    Types["OPERATOR"] = "OPERATOR";
})(Types || (Types = {}));
var Resources;
(function (Resources) {
    Resources["USER"] = "user";
    Resources["TASK"] = "task";
    Resources["PLAN"] = "plan";
    Resources["VEHICLE"] = "vehicle";
    Resources["EQUIPMENT"] = "Equipment";
    // TODO: Check if needed
    Resources["MOBILE_TASK"] = "mobile:task";
    Resources["MOBILE_USER"] = "mobile:user";
    Resources["MOBILE_LANDING"] = "mobile:landing";
})(Resources || (Resources = {}));
var actionPermission;
(function (actionPermission) {
    actionPermission["VIEW_DETAILS"] = "view-details";
    actionPermission["CREATE"] = "create";
    actionPermission["VIEW_LIST"] = "view-list";
    actionPermission["UPDATE"] = "update";
    actionPermission["DELETE"] = "delete";
    actionPermission["START"] = "start";
    actionPermission["PAUSE"] = "pause";
    actionPermission["RESUME"] = "resume";
    actionPermission["STOP"] = "stop";
    actionPermission["VIEW_PROFILE"] = "view-profile";
    actionPermission["VIEW_LANDING"] = "view-landing";
})(actionPermission || (actionPermission = {}));
var Permissions;
(function (Permissions) {
    // all user access
    Permissions["all"] = "all";
    // User
    Permissions["UserReadSelf"] = "user:read:self";
    Permissions["UserViewProfileSelf"] = "user:view-profile:self";
    Permissions["UserViewListOrganization"] = "user:view-list:ORGANIZATION";
    Permissions["UserCreateOrganization"] = "user:create:ORGANIZATION";
    // team
    Permissions["teamViewListORGANIZATION"] = "team:view-list:ORGANIZATION";
    Permissions["teamCreateORGANIZATION"] = "team:create:ORGANIZATION";
    // zone
    Permissions["zoneCreateTeam"] = "zone:create:team";
    Permissions["zoneViewListTeam"] = "zone:view-list:team";
    Permissions["zoneCreateBulkTeam"] = "zone:create-bulk:team";
    // Task
    Permissions["TaskCreateTeam"] = "task:create:team";
    Permissions["TaskViewListSelf"] = "task:view-list:self";
    Permissions["TaskViewDetailsSelf"] = "task:view-details:self";
    // Plan
    Permissions["PlanCreateDraftTeam"] = "plan:create-draft:team";
    Permissions["PlanCreatePublishTeam"] = "plan:create-publish:team";
    Permissions["PlanViewGanttChartSelf"] = "plan:view-gantt-chart:self";
    Permissions["PlanViewDetailsSelf"] = "plan:view-details:self";
    Permissions["PlanUpdateSelf"] = "plan:update:self";
    // Vehicle
    Permissions["VehicleCreateOrganization"] = "vehicle:create:organization";
    Permissions["VehicleViewListOrganization"] = "vehicle:view-list:organization";
    // Equipment
    Permissions["EquipmentCreateOrganization"] = "equipment:create:organization";
    Permissions["EquipmentViewListOrganization"] = "equipment:view-list:organization";
    // Mobile User
    Permissions["MobileUserViewProfileSelf"] = "mobile:user:view-profile:self";
    // Mobile Landing
    Permissions["MobileLandingViewLandingSelf"] = "mobile:landing:view-landing:self";
    // Mobile Task
    Permissions["MobileTaskViewListSelf"] = "mobile:task:view-list:self";
    Permissions["MobileTaskViewDetailsSelf"] = "mobile:task:view-details:self";
    Permissions["MobileTaskStartSelf"] = "mobile:task:start:self";
    Permissions["MobileTaskPauseSelf"] = "mobile:task:pause:self";
    Permissions["MobileTaskResumeSelf"] = "mobile:task:resume:self";
    Permissions["MobileTaskStopSelf"] = "mobile:task:stop:self";
})(Permissions || (Permissions = {}));

var ComponentFormErrorConstant;
(function (ComponentFormErrorConstant) {
    ComponentFormErrorConstant["REQUIRED"] = "required";
    ComponentFormErrorConstant["MINLENGTH"] = "minlength";
    ComponentFormErrorConstant["MAXLENGTH"] = "maxlength";
    ComponentFormErrorConstant["PATTERN"] = "pattern";
    ComponentFormErrorConstant["EMAIL"] = "email";
    ComponentFormErrorConstant["MIN"] = "min";
    ComponentFormErrorConstant["MAX"] = "max";
})(ComponentFormErrorConstant || (ComponentFormErrorConstant = {}));

var I18nConstant;
(function (I18nConstant) {
    I18nConstant["LANGUAGE"] = "language";
    I18nConstant["EN"] = "en";
    I18nConstant["AR"] = "ar";
    I18nConstant["FR"] = "fr";
    I18nConstant["DE"] = "de";
    I18nConstant["ES"] = "es";
    I18nConstant["IT"] = "it";
    I18nConstant["PT"] = "pt";
    I18nConstant["RU"] = "ru";
    I18nConstant["ZH"] = "zh";
    I18nConstant["JA"] = "ja";
    I18nConstant["KO"] = "ko";
    I18nConstant["HI"] = "hi";
    I18nConstant["TR"] = "tr";
    I18nConstant["NL"] = "nl";
    I18nConstant["SV"] = "sv";
    I18nConstant["DA"] = "da";
    I18nConstant["NO"] = "no";
    I18nConstant["FI"] = "fi";
    I18nConstant["PL"] = "pl";
    I18nConstant["CS"] = "cs";
    I18nConstant["HU"] = "hu";
})(I18nConstant || (I18nConstant = {}));

class StorageService {
    constructor() { }
    setLocalStorage(data) {
        for (const [key, value] of Object.entries(data)) {
            if (typeof value === 'object') {
                localStorage.setItem(key, JSON.stringify(value));
            }
            else {
                localStorage.setItem(key, String(value));
            }
        }
    }
    setSession(data) {
        if (data.permissions && data.permissions.length > 0) {
            sessionStorage.clear();
        }
        for (const [key, value] of Object.entries(data)) {
            if (typeof value === 'object') {
                sessionStorage.setItem(key, JSON.stringify(value));
            }
            else {
                sessionStorage.setItem(key, String(value));
            }
        }
    }
    addLocalStorageItem(key, value) {
        if (typeof value === 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        }
        else {
            localStorage.setItem(key, String(value));
        }
    }
    addSessionItem(key, value) {
        if (typeof value === 'object') {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
        else {
            sessionStorage.setItem(key, String(value));
        }
    }
    clearLocalStorage() {
        localStorage.clear();
    }
    clearSession() {
        sessionStorage.clear();
    }
    clearAll() {
        this.clearLocalStorage();
        this.clearSession();
    }
    getLocalStorageAll() {
        const localStorageData = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                const value = localStorage.getItem(key);
                try {
                    localStorageData[key] = JSON.parse(value);
                }
                catch {
                    localStorageData[key] = value;
                }
            }
        }
        return localStorageData;
    }
    getsessionAll() {
        const sessionData = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key) {
                const value = sessionStorage.getItem(key);
                try {
                    sessionData[key] = JSON.parse(value);
                }
                catch {
                    sessionData[key] = value;
                }
            }
        }
        return sessionData;
    }
    getLocalStorageItem(item) {
        return localStorage.getItem(item) ?? '';
    }
    getsessionItem(item) {
        return sessionStorage.getItem(item);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: StorageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: StorageService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: StorageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });

class AuthContextService {
    storageService;
    userLocalData$ = signal(null);
    userPermissionsAndRoles$ = signal(null);
    constructor(storageService) {
        this.storageService = storageService;
    }
    saveTokens(data) {
        let localData = {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            user: data.user,
        };
        this.userLocalData$.set(localData);
        this.storageService.setLocalStorage(localData);
    }
    savePermissionsAndRoles(data) {
        let permissions = {
            roles: data.roles,
            permissions: data.permissions,
        };
        this.userPermissionsAndRoles$.set(permissions);
        this.storageService.setSession(permissions);
    }
    clearData() {
        this.userLocalData$.set(null);
        this.userPermissionsAndRoles$.set(null);
        this.storageService.clearAll();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AuthContextService, deps: [{ token: StorageService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AuthContextService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AuthContextService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: StorageService }] });

const USE_TOKEN = new HttpContextToken(() => true);
const SKIP_TOKEN = new HttpContextToken(() => false);
const SKIP_LOADER = new HttpContextToken(() => false);
const SHOW_SUCCESS_TOASTER = new HttpContextToken(() => true);

const API_BASE_URL$1 = new InjectionToken('API_BASE_URL', {
    providedIn: 'root',
    factory: () => window?.env?.backendBaseUrl ??
        'https://dispatching-api-gateway-821cc537b8b6.herokuapp.com',
});

class AuthBeService {
    http;
    authContextService;
    router;
    baseUrl;
    constructor(http, authContextService, router, baseUrl) {
        this.http = http;
        this.authContextService = authContextService;
        this.router = router;
        this.baseUrl = baseUrl;
    }
    login(data) {
        return this.http.post(`${this.baseUrl}/api/v1/idm/auth/login`, { username: data.username, password: data.password }, {
            context: new HttpContext().set(SKIP_TOKEN, true),
        });
    }
    forgetPassword(data) {
        return this.http.post(`${this.baseUrl}/api/v1/idm/auth/forgot-password`, { email: data.email }, {
            context: new HttpContext().set(SKIP_TOKEN, true),
        });
    }
    resetPassword(data) {
        return this.http.post(`${this.baseUrl}/api/v1/idm/auth/reset-password`, { ...data }, {
            context: new HttpContext().set(SKIP_TOKEN, true),
        });
    }
    logout() {
        return this.http.post(`${this.baseUrl}/api/v1/idm/auth/logout`, {});
    }
    refreshToken(refreshToken) {
        return this.http.post(`${this.baseUrl}/api/v1/idm/auth/refresh`, refreshToken, {
            context: new HttpContext().set(SKIP_TOKEN, true),
        });
    }
    validateToken() {
        return this.http
            .post(`${this.baseUrl}/api/v1/idm/auth/validate`, {})
            .pipe(retry(3), catchError((error) => {
            console.error('Request failed after 3 retries', error);
            this.authContextService.clearData();
            window.dispatchEvent(new CustomEvent('auth-logout'));
            this.router.navigate(['/auth/login']);
            throw error;
        }));
    }
    getCurrUser() {
        return this.http.get(`${this.baseUrl}/api/v1/idm/auth/me`);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AuthBeService, deps: [{ token: i1.HttpClient }, { token: AuthContextService }, { token: i3.Router }, { token: API_BASE_URL$1 }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AuthBeService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AuthBeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }, { type: AuthContextService }, { type: i3.Router }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [API_BASE_URL$1]
                }] }] });

class ToastService {
    message = signal('Default message');
    type = signal('info');
    position = signal('top-right');
    show = signal(false);
    toast(message, position, ToastType = 'info', duration) {
        this.message.update(() => message);
        this.type.update(() => ToastType);
        this.position.update(() => position);
        this.showToast();
        if (duration) {
            setTimeout(() => {
                this.hideToast();
            }, duration);
        }
    }
    showToast() {
        this.show.update(() => true);
    }
    hideToast() {
        this.show.update(() => false);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ToastService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ToastService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ToastService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class AuthService {
    authContextService;
    authBeService;
    router;
    storageService;
    toastService;
    Roles = Roles;
    Permissions = Permissions;
    constructor(authContextService, authBeService, router, storageService, toastService) {
        this.authContextService = authContextService;
        this.authBeService = authBeService;
        this.router = router;
        this.storageService = storageService;
        this.toastService = toastService;
    }
    login(data) {
        this.authBeService.login(data).subscribe({
            next: (res) => {
                if (res.success) {
                    this.authContextService.saveTokens(res.data);
                    //window.dispatchEvent(new CustomEvent('auth-login'));
                    //           window.history.pushState({}, '', window.location.pathname);
                    // window.dispatchEvent(new PopStateEvent('popstate', {}));
                    this.router.navigate(['/']);
                    window.location.reload();
                }
            },
        });
    }
    forgetPassword(data) {
        this.authBeService.forgetPassword(data).subscribe({
            next: (res) => {
                if (res.success) {
                    this.router.navigate(['/auth/login']);
                }
            },
        });
    }
    resetPassword(data) {
        this.authBeService.resetPassword(data).subscribe({
            next: (res) => {
                if (res.success) {
                    this.router.navigate(['/auth/login']);
                }
            },
        });
    }
    logOutUser() {
        this.authContextService.clearData();
        // window.dispatchEvent(new CustomEvent('auth-logout'));
        this.router.navigate(['/auth/login']);
        window.location.reload();
    }
    logout() {
        this.authBeService.logout().subscribe({
            next: (res) => {
                if (res.success) {
                    this.logOutUser();
                }
            },
        });
    }
    handleRefreshToken() {
        const body = {
            refreshToken: this.getRefreshToken(),
        };
        this.authBeService.refreshToken(body).subscribe({
            next: (res) => {
                if (res.success) {
                    this.authContextService.saveTokens(res.data);
                    window.location.reload();
                }
                else {
                    this.logOutUser();
                }
            },
            error: () => {
                this.logOutUser();
            },
        });
    }
    handlePermissionConfig() {
        this.authBeService.validateToken().subscribe({
            next: (res) => {
                if (res.success) {
                    this.authContextService.savePermissionsAndRoles(res.data);
                }
                else {
                    this.toastService.toast(`You do not have permission to perform this action`, 'top-center', 'error', 2000);
                }
            },
        });
        // const dummySessionData: ISessionData = {
        //   roles: [Roles.ADMIN],
        //   permissions: [
        //     Permissions.UserReadSelf,
        //     Permissions.VehicleCreateOrganization,
        //     Permissions.EquipmentViewListOrganization,
        //     Permissions.MobileTaskStartSelf,
        //     Permissions.MobileTaskResumeSelf,
        //     Permissions.MobileTaskViewListSelf,
        //     Permissions.TaskViewListSelf,
        //     Permissions.MobileUserViewProfileSelf,
        //     Permissions.PlanCreatePublishTeam,
        //     Permissions.TaskCreateTeam,
        //     Permissions.EquipmentCreateOrganization,
        //     Permissions.PlanCreateDraftTeam,
        //     Permissions.MobileTaskPauseSelf,
        //     Permissions.MobileLandingViewLandingSelf,
        //     Permissions.PlanUpdateSelf,
        //     Permissions.MobileTaskStopSelf,
        //     Permissions.VehicleViewListOrganization,
        //     Permissions.MobileTaskViewDetailsSelf,
        //     Permissions.TaskViewDetailsSelf,
        //     Permissions.PlanViewGanttChartSelf,
        //     Permissions.PlanViewDetailsSelf,
        //   ],
        // };
        //     setTimeout(()=>{
        //       this.authContextService.savePermissionsAndRoles(  dummySessionData as ISessionData)
        //     },500)
    }
    // Get Auth Data
    isLoggedIn() {
        return localStorage.getItem(AuthConstant.TOKEN) !== null;
    }
    getToken() {
        return this.storageService.getLocalStorageItem(AuthConstant.TOKEN);
    }
    getRefreshToken() {
        return this.storageService.getLocalStorageItem(AuthConstant.REFRESH_TOKEN);
    }
    getCurrentUser() {
        const userData = this.storageService.getLocalStorageItem(AuthConstant.USER_DATA);
        return this.authContextService.userLocalData$() || userData
            ? JSON.parse(userData)
            : {};
    }
    //   hasAnyRole(targetRoles: Roles[]): boolean {
    //   const currentUser = this.getCurrentUser();
    //   if (!currentUser || !Array.isArray(currentUser.roles)) {
    //     return false;
    //   }
    //   return currentUser.roles.some(role =>
    //     targetRoles.includes(role.name as Roles)
    //   );
    // }
    getCurrentPermissions() {
        return (this.authContextService.userPermissionsAndRoles$()?.permissions ||
            JSON.parse(this.storageService.getsessionItem(AuthConstant.USER_PERMISSIONS) ||
                '[]'));
    }
    getCurrentRoles() {
        return (JSON.parse(this.storageService.getsessionItem(AuthConstant.USER_ROLES) ||
            '[]'));
    }
    hasAnyCurrentRole(targetRoles) {
        const currentRoles = this.getCurrentRoles();
        if (!Array.isArray(currentRoles) || currentRoles.length === 0) {
            return false;
        }
        return currentRoles.some(role => targetRoles.includes(role));
    }
    // PERMISSION MANAGEMENT
    hasCategory(route) {
        // console.log('route: ', route);
        // const user = this.getCurrentUser();
        const requiredPermissions = route.data['permissions'] || [];
        const listOfPermissions = this.getCurrentPermissions() || [];
        if (listOfPermissions && listOfPermissions.length > 0) {
            const permissionSet = new Set(listOfPermissions);
            const hasPermission = requiredPermissions.some((permission) => permissionSet.has(permission));
            return hasPermission;
        }
        return false;
    }
    canDoAction(action) {
        // const user = this.getCurrentUser();
        const requiredAction = action;
        const permissionsList = this.getCurrentPermissions() || [];
        // console.log('list of roles', permissionsList);
        if (permissionsList && permissionsList.length > 0) {
            const permissionsSet = new Set(permissionsList);
            return requiredAction.some((action) => permissionsSet.has(action));
        }
        return false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AuthService, deps: [{ token: AuthContextService }, { token: AuthBeService }, { token: i3.Router }, { token: StorageService }, { token: ToastService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AuthService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: AuthContextService }, { type: AuthBeService }, { type: i3.Router }, { type: StorageService }, { type: ToastService }] });

class UserDataService {
    // Private signal for user data
    userDataSignal = signal(null);
    // Public read-only signals
    userData = this.userDataSignal.asReadonly();
    isAuthenticated = computed(() => !!this.userDataSignal());
    constructor() {
        this.loadUserData();
    }
    /**
     * Get current user data (synchronous)
     */
    get currentUser() {
        return this.userDataSignal();
    }
    /**
     * Load user data from localStorage
     */
    loadUserData() {
        try {
            const userData = localStorage.getItem(AuthConstant.USER_DATA);
            this.userDataSignal.set(userData ? JSON.parse(userData) : null);
        }
        catch (error) {
            console.error('Error loading user data:', error);
            this.clearUserData();
        }
    }
    /**
     * Update user data
     * @param data New user data
     */
    updateUserData(data) {
        this.userDataSignal.set(data);
        localStorage.setItem(AuthConstant.USER_DATA, JSON.stringify(data));
    }
    /**
     * Clear user data
     */
    clearUserData() {
        this.userDataSignal.set(null);
        localStorage.removeItem(AuthConstant.USER_DATA);
    }
    /**
     * Create a computed signal for specific user properties
     * @param selector Function to select the property
     */
    select(selector) {
        return computed(() => selector(this.userDataSignal()));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: UserDataService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: UserDataService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: UserDataService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

// In your library, e.g., src/lib/api-base-url.token.ts
const API_BASE_URL = new InjectionToken('API_BASE_URL');

class CommonHttpService {
    http;
    baseUrl;
    constructor(http, baseUrl) {
        this.http = http;
        this.baseUrl = baseUrl;
    }
    buildUrl(endpoint) {
        if (!this.baseUrl) {
            throw new Error('API_BASE_URL is not provided!');
        }
        endpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
        return `${this.baseUrl}/${endpoint}`;
    }
    CommonPostRequests(url, body, options) {
        return this.http.post(this.buildUrl(url), body, options);
    }
    CommonPutRequests(url, body, options) {
        return this.http.put(this.buildUrl(url), body, options);
    }
    CommonGetRequests(url, options) {
        return this.http.get(this.buildUrl(url), options);
    }
    CommonDeleteRequest(url, options) {
        return this.http.delete(this.buildUrl(url), options);
    }
    CommonPatchRequests(url, body, options) {
        return this.http.patch(this.buildUrl(url), body, options);
    }
    CommonGetRequestsWithQuery(url, Model, options) {
        if (Model) {
            let queryString = Object.keys(Model)
                .map((key) => Model[key] != null && Model[key] != '' && Model[key] != undefined
                ? key + '=' + Model[key]
                : null)
                .filter((x) => x != null)
                .join('&');
            url += queryString == '' ? '' : '?' + queryString;
        }
        return this.http.get(this.buildUrl(url), options);
    }
    CommonPostRequestsWithQuery(url, Model, body, options) {
        if (Model) {
            let queryString = Object.keys(Model)
                .map((key) => (Model[key] != null && Model[key] != '' && Model[key] != undefined) ||
                Model[key] === false
                ? key + '=' + Model[key]
                : null)
                .filter((x) => x != null)
                .join('&');
            url += queryString == '' ? '' : '?' + queryString;
        }
        return this.http.post(this.buildUrl(url), body, options);
    }
    CommonPutRequestsWithQuery(url, Model, body, options) {
        if (Model) {
            let queryString = Object.keys(Model)
                .map((key) => (Model[key] != null && Model[key] != '' && Model[key] != undefined) ||
                Model[key] === false
                ? key + '=' + Model[key]
                : null)
                .filter((x) => x != null)
                .join('&');
            url += queryString == '' ? '' : '?' + queryString;
        }
        return this.http.put(this.buildUrl(url), body, options);
    }
    CommonPatchRequestsWithQuery(url, Model, body, options) {
        if (Model) {
            let queryString = Object.keys(Model)
                .map((key) => (Model[key] != null && Model[key] != '' && Model[key] != undefined) ||
                Model[key] === false
                ? key + '=' + Model[key]
                : null)
                .filter((x) => x != null)
                .join('&');
            url += queryString == '' ? '' : '?' + queryString;
        }
        return this.http.patch(this.buildUrl(url), body, options);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CommonHttpService, deps: [{ token: i1.HttpClient }, { token: API_BASE_URL, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CommonHttpService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CommonHttpService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [API_BASE_URL]
                }] }] });

class LoadingService {
    loading = signal(false);
    currentLoadingSection = signal(null);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: LoadingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: LoadingService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: LoadingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class StepperService {
    currentStep = signal(1);
    totalSteps = signal(0);
    notifyCancel$ = new BehaviorSubject(false);
    hasPrevious = computed(() => this.currentStep() > 1);
    hasNext = computed(() => this.currentStep() < this.totalSteps());
    setTotalSteps(steps) {
        this.totalSteps.set(steps);
    }
    setStep(step) {
        this.currentStep.set(step);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: StepperService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: StepperService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: StepperService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

// shared-lib/translation.service.ts
class TranslationService {
    translate = inject(TranslateService);
    initialize(defaultLang = 'en') {
        this.translate.setDefaultLang(defaultLang);
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang?.match(/en|es/) ? browserLang : defaultLang);
    }
    changeLanguage(lang) {
        this.translate.use(lang);
    }
    get(key, params) {
        return this.translate.instant(key, params);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: TranslationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: TranslationService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: TranslationService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class SidenavService {
    _isCollapsed = signal(false);
    constructor() {
        // Initialize from sessionStorage on service creation
        const storedState = sessionStorage.getItem('isCollapsed');
        if (storedState === 'true') {
            this._isCollapsed.set(true);
        }
        this.listenToWindowResize();
    }
    get isCollapsed() {
        return this._isCollapsed();
    }
    toggle() {
        const newVal = !this._isCollapsed();
        sessionStorage.setItem('isCollapsed', newVal.toString());
        this._isCollapsed.set(newVal);
    }
    collapse() {
        this._isCollapsed.set(true);
        sessionStorage.setItem('isCollapsed', 'true');
    }
    expand() {
        this._isCollapsed.set(false);
        sessionStorage.setItem('isCollapsed', 'false');
    }
    listenToWindowResize() {
        const handleResize = () => {
            const width = window.innerWidth;
            // Always collapse when < 900px
            if (width < 900) {
                this._isCollapsed.set(true);
                sessionStorage.setItem('isCollapsed', 'true');
            }
            // Always expand when >= 700px
            else {
                this._isCollapsed.set(false);
                sessionStorage.setItem('isCollapsed', 'false');
            }
        };
        // Initial check
        handleResize();
        // Listen to resize
        window.addEventListener('resize', handleResize);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: SidenavService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: SidenavService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: SidenavService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });

class GeoLocationService {
    getCurrentPosition() {
        return new Observable((observer) => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    observer.next(position);
                    observer.complete();
                }, (error) => {
                    observer.error(error);
                });
            }
            else {
                observer.error('Geolocation is not supported by this browser.');
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: GeoLocationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: GeoLocationService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: GeoLocationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

// Auth services

/**
 * Checks if any fields in an object contain data (not empty string or undefined)
 * @param {any} obj - The object to check
 * @returns {boolean} True if any field has data, false otherwise
 */
const someFieldsContainData = (obj) => Object.values(obj).some((value) => value !== '' && value !== undefined);
/**
 * Generates a random HSL color based on an index value
 * @param {number} index - The index used to generate unique hue
 * @param {number} lightness - The lightness percentage (0-100)
 * @returns {string} HSL color string (e.g., "hsl(120, 70%, 50%)")
 */
const generateRandomColor = (index, lightness) => {
    const hue = (index * 137.508) % 360;
    const saturation = 70;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
/**
 * Formats a timestamp into a human-readable time string
 * @param {string} timestamp - ISO date string
 * @returns {string} Formatted time string (e.g., "Sent at 2:30 PM")
 */
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours % 12 || 12;
    const period = hours < 12 ? 'AM' : 'PM';
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `Sent at ${formattedHours}:${formattedMinutes} ${period}`;
};
/**
 * Recursively flattens a tree structure into a single array
 * @param {any[]} nodes - Array of nodes with potential children
 * @param {any[]} [result=[]] - Accumulator array (used internally for recursion)
 * @returns {any[]} Flattened array of all nodes
 */
const flattenTree = (nodes, result = []) => {
    nodes.forEach((node) => {
        result.push(node);
        if (node.children && node.children.length > 0) {
            flattenTree(node.children, result);
        }
    });
    return result;
};
/**
 * Converts a date string to YYYY-MM-DD format
 * @param {any} inputDate - Date string or object
 * @returns {string} Formatted date string (e.g., "2023-05-15")
 */
const convertDateFormat = (inputDate) => {
    const dateObject = new Date(inputDate);
    const year = dateObject.getFullYear();
    const month = `0${dateObject.getMonth() + 1}`.slice(-2);
    const day = `0${dateObject.getDate()}`.slice(-2);
    const convertedDate = `${year}-${month}-${day}`;
    return convertedDate;
};
/**
 * Converts Excel serial date number to JavaScript Date object
 * @param {number} serial - Excel serial date number
 * @returns {Date} JavaScript Date object
 */
const excelDateToJSDate = (serial) => {
    const excelStartDate = new Date(1900, 0, 1);
    const jsDate = new Date(excelStartDate.getTime() + (serial - 1) * 24 * 60 * 60 * 1000);
    return jsDate;
};
/**
 * Formats a date to YYYY-MM-DD format
 * @param {any} inputDate - Date string or object
 * @returns {string} Formatted date string (e.g., "2023-05-15")
 */
function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
/**
 * Formats a date to YYYY-MM-DD HH:MM:SS format
 * @param {any} inputDate - Date string or object
 * @returns {string} Formatted datetime string (e.g., "2023-05-15 14:30:45")
 */
function formatDateWithTime(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
/**
 * Generates a unique number based on current timestamp and index
 * @param {number} index - Additional number to ensure uniqueness
 * @returns {string} Unique number string combining timestamp and index
 */
function generateUniqueNumber(index) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const second = currentDate.getSeconds();
    const millisecond = currentDate.getMilliseconds();
    const uniqueNumber = `${year}${month}${day}${hour}${minute}${second}${millisecond}${index}`;
    return uniqueNumber;
}
/**
 * Calculates time difference between two dates in hours and minutes
 * @param {Date} start - Start date
 * @param {Date} end - End date
 * @returns {string} Formatted time difference (e.g., "2 H and 30 M")
 */
function diffTime(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    if (diffHours >= 1) {
        return `${diffHours} H and ${diffMinutes} M`;
    }
    if (diffHours < 1 && diffMinutes >= 1) {
        return `${diffMinutes} M`;
    }
    return '0 M';
}
/**
 * Converts a File object to Base64 string (Note: currently incomplete implementation)
 * @param {any} selectedFile - File object to convert
 * @returns {any} Should return Base64 string (implementation needs fixing)
 */
function convertFileToBase64(selectedFile) {
    const reader = new FileReader();
    reader.onload = (e) => e.target.result;
    reader.readAsDataURL(selectedFile);
}
/**
 * Converts a date to relative time string (e.g., "2 hours ago")
 * @param {any} date - Date to compare with current time
 * @returns {string} Relative time string
 */
function timeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const units = [
        { name: 'year', seconds: 31536000 },
        { name: 'month', seconds: 2592000 },
        { name: 'week', seconds: 604800 },
        { name: 'day', seconds: 86400 },
        { name: 'hour', seconds: 3600 },
        { name: 'minute', seconds: 60 },
        { name: 'second', seconds: 1 },
    ];
    for (const unit of units) {
        const interval = Math.floor(diffInSeconds / unit.seconds);
        if (interval >= 1) {
            return ` ${interval} ${unit.name}${interval !== 1 ? 's' : ''} ago`;
        }
    }
    return 'just now';
}
/**
 * Formats a timestamp to HH:MM:SS format (UTC time)
 * @param {string} timestamp - ISO date string
 * @returns {string} Formatted time string (e.g., "14:30:45")
 */
function formatinitialTakeTime(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
// File type checking utilities
const imageExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'tiff',
    'webp',
    'svg',
];
const videoExtensions = [
    'mp4',
    'avi',
    'mov',
    'wmv',
    'flv',
    'mkv',
    'webm',
];
const documentExtensions = ['pdf', 'docx'];
/**
 * Checks if a file path has an image extension
 * @param {string} path - File path to check
 * @returns {boolean} True if path ends with image extension
 */
function isImagePath(path) {
    if (!path) {
        return false;
    }
    const parts = path.split('.');
    if (parts.length < 2) {
        return false;
    }
    const extension = parts.pop()?.toLowerCase() || '';
    return imageExtensions.includes(extension);
}
/**
 * Checks if a file path has a video extension
 * @param {string} path - File path to check
 * @returns {boolean} True if path ends with video extension
 */
function isVedioPath(path) {
    if (!path) {
        return false;
    }
    const parts = path.split('.');
    if (parts.length < 2) {
        return false;
    }
    const extension = parts.pop()?.toLowerCase() || '';
    return videoExtensions.includes(extension);
}
/**
 * Checks if a file path has a document extension
 * @param {string} path - File path to check
 * @returns {boolean} True if path ends with document extension
 */
function isDocumentPath(path) {
    if (!path) {
        return false;
    }
    const parts = path.split('.');
    if (parts.length < 2) {
        return false;
    }
    const extension = parts.pop()?.toLowerCase() || '';
    return documentExtensions.includes(extension);
}
/**
 * Converts Base64 data URI to Blob object
 * @param {string} dataURI - Base64 encoded data URI
 * @returns {Blob} Blob object representing the image
 */
// export function b64toBlob(dataURI: string, mimeType: string): Blob {
//   const byteString = atob(dataURI);
//   const ab = new ArrayBuffer(byteString.length);
//   const ia = new Uint8Array(ab);
//   for (let i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }
//   return new Blob([ab], { type: mimeType });
// }
function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
}
/**
 * Initiates a download of a given Blob object by creating a temporary anchor element
 * and triggering a click event on it. The file will be saved with the specified file name.
 *
 * @param blob - The Blob object to be downloaded.
 * @param fileName - The desired name for the downloaded file. Defaults to 'download' if not provided.
 */
function downloadBlob(blob, fileName) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'download';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
}
/**
 * Converts a Blob object to Base64 data URI
 * @param {Blob} blob - Blob object to convert
 * @returns {Promise<string>} Promise resolving to Base64 encoded data URI
 */
function blobToB64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                // Remove the data URL prefix if present
                const base64 = reader.result.replace(/^data:.*;base64,/, '');
                resolve(base64);
            }
            else {
                reject(new Error('Failed to convert Blob to Base64'));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
/**
 * Simple logger function that console.logs the input
 * @param {any} [data=''] - Data to log (defaults to empty string)
 */
function logger(data = '') {
    console.log(data);
}
/**
 * Extracts all validation errors from a FormGroup
 * @param {FormGroup} form - Angular FormGroup to inspect
 * @returns {Array} Array of error objects containing control name, error type and value
 */
function getFormValidationErrors(form) {
    const result = [];
    Object.keys(form.controls).forEach((key) => {
        const controlErrors = form.get(key)?.errors ?? null;
        if (controlErrors) {
            Object.keys(controlErrors).forEach((keyError) => {
                result.push({
                    control: key,
                    error: keyError,
                    value: controlErrors[keyError],
                });
            });
        }
    });
    return result;
}
/**
 * Converts FormGroup values to FormData (handles File objects specially)
 * @param {FormGroup} formGroup - Angular FormGroup to convert
 * @returns {FormData} FormData object containing all form values
 */
function convertFormGroupToFormData(formGroup) {
    const formData = new FormData();
    Object.keys(formGroup.controls).forEach((key) => {
        const control = formGroup.get(key);
        if (control) {
            if (control.value instanceof File) {
                formData.append(key, control.value);
            }
            else {
                formData.append(key, control.value == null ? '' : control.value);
            }
        }
    });
    return formData;
}

const AuthInterceptor = (request, next) => {
    const token = localStorage.getItem(AuthConstant.TOKEN);
    const translate = localStorage.getItem(I18nConstant.LANGUAGE);
    const skipToken = request.context.get(SKIP_TOKEN);
    const showSuccessToaster = request.context.get(SHOW_SUCCESS_TOASTER);
    const toastService = inject(ToastService);
    // 'Content-Type': 'application/json',
    const headersConfig = {
        'accept-language': translate === I18nConstant.EN ? 'en-US' : 'e.g',
    };
    if (!skipToken) {
        headersConfig['Authorization'] = `Bearer ${token}`;
    }
    const clonedRequest = request.clone({
        setHeaders: headersConfig,
    });
    return next(clonedRequest).pipe(map((event) => {
        //&& isPlatformBrowser(PLATFORM_ID)
        if (event instanceof HttpResponse) {
            const body = event.body;
            if (body.status === 'SUCCESS' || body.success) {
                body['success'] = true;
            }
            else {
                body['success'] = false;
            }
            //  body['statusCode'] = event.status;
            // console.log('body: ', body['success'] );
            //    console.log('request.method: ', request.method);
            if (body &&
                body.success &&
                (request.method === 'POST' ||
                    request.method === 'PUT' ||
                    request.method === 'DELETE')) {
                if (showSuccessToaster) {
                    toastService.toast(`${body.message}`, 'top-center', 'success', 4000);
                }
                // if (!body.success) {
                //   if (body.errors && body.errors.length > 0) {
                //     body.errors.forEach((error) => {
                //       toastService.toast(`${error.msg}`, 'top-center', 'error', 2000);
                //     });
                //   } else {
                //     toastService.toast(`Unknown Error`, 'top-center', 'error', 2000);
                //   }
                // }
            }
        }
        return event;
    }));
};

const ErrorInterceptor = (req, next) => {
    let authService = inject(AuthService);
    let authContextService = inject(AuthContextService);
    let router = inject(Router);
    let toastService = inject(ToastService);
    return next(req).pipe(
    // retry({
    //   count: 3,
    //   delay: (error) => {
    //     if (error.status === 503) {
    //       // Retry logic for 503 errors
    //       return timer(1000); // Retry after 1 second
    //     }
    //     return throwError(() => error);
    //   },
    // }),
    catchError((error) => {
        // if (error && isPlatformBrowser(PLATFORM_ID)) {
        // } else {
        // }
        //      if (error.status === 503) {
        //   toastService.toast('Service unavailable. Please try again later.', 'top-center', 'error', 2000);
        // }
        switch (error.status) {
            case 400:
                toastService.toast(error.error.errorMessage, 'top-center', 'error', 2000);
                break;
            case 401:
                // access token expired / au auth
                authService.handleRefreshToken();
                //  authContextService.clearData();
                // window.dispatchEvent(new CustomEvent('auth-logout'));
                // router.navigate(['/auth/login']);
                break;
            case 403:
                // no permission
                toastService.toast(`User don't have permission`, 'top-center', 'error', 2000);
                authService.handlePermissionConfig();
                console.error('No Permission');
                break;
            case 406:
                // refresh expired
                authContextService.clearData();
                window.dispatchEvent(new CustomEvent('auth-logout'));
                router.navigate(['/auth/login']);
                break;
            case 404:
                console.error('End Point Not Found');
                break;
            case 503:
                toastService.toast(`Please Contact Support Team`, 'top-center', 'error', 2000);
                break;
            default:
                toastService.toast(`Please Contact Support Team`, 'top-center', 'error', 2000);
        }
        // refresh token + code
        // access token
        // 503 -- service idle -- error message
        // 404 -- end point not found // /
        // if (error.error && isPlatformBrowser(PLATFORM_ID)) {
        //   if (error.error.errors) {
        //     const errorMessages = Object.values(error.error.errors).flat();
        //     errorMessages.forEach((errorMessage: any) => {
        //       console.error(errorMessage);
        //     });
        //   } else if (error?.error?.message) {
        //     console.error(error.error.message);
        //   } else {
        //     console.error('Something went wrong');
        //   }
        // }
        return throwError(error);
    }));
};

let totalRequests = 0;
const loadingInterceptor = (req, next) => {
    const loadingService = inject(LoadingService);
    // console.log('loadingService: ', loadingService);
    // If the custom header is present, skip the loader
    // by this =>     context: new HttpContext().set(SKIP_LOADER, true),
    const skipLoader = req.context.get(SKIP_LOADER);
    if (skipLoader) {
        return next(req);
    }
    totalRequests++;
    loadingService.loading.set(true);
    return next(req).pipe(finalize(() => {
        totalRequests--;
        if (totalRequests == 0) {
            loadingService.loading.set(false);
            loadingService.currentLoadingSection.set(null);
        }
    }));
};

const NetworkConnectionInterceptor = (req, next) => {
    const startTime = Date.now();
    return next(req).pipe(tap(() => {
        const elapsedTime = Date.now() - startTime;
        const threshold = 5000;
        if (elapsedTime > threshold) {
            console.log('Slow network detected');
        }
    }));
};

class CustomAppErrorComponent {
    control;
    validation = [];
    name = '';
    showErrors = input(false);
    shouldShowError(item) {
        return item.errorType.some((error) => (this.control.hasError(error) &&
            this.control.invalid &&
            (this.control.touched || this.control.dirty)) ||
            this.showErrors());
    }
    getErrorMessage(item) {
        const activeError = item.errorType.find((error) => this.control.hasError(error));
        return activeError ? item.errorMessage : '';
    }
    hasAnyErrorToShow() {
        return this.validation.some((item) => this.shouldShowError(item) && this.getErrorMessage(item).length > 0);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomAppErrorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomAppErrorComponent, isStandalone: true, selector: "custom-app-error", inputs: { control: { classPropertyName: "control", publicName: "control", isSignal: false, isRequired: true, transformFunction: null }, validation: { classPropertyName: "validation", publicName: "validation", isSignal: false, isRequired: true, transformFunction: null }, name: { classPropertyName: "name", publicName: "name", isSignal: false, isRequired: true, transformFunction: null }, showErrors: { classPropertyName: "showErrors", publicName: "showErrors", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "@if(hasAnyErrorToShow()){\n<div class=\"error-container\">\n  @if(this.control.invalid && (this.control.touched || this.control.dirty) &&\n  this.getErrorMessage.length>0){\n  <div class=\"input-error-message\">\n    <span class=\"input-error-pointer\"></span>\n    @for (item of validation; track $index) { @if (shouldShowError(item)) {\n\n    <span class=\"error-message\">\n      {{ getErrorMessage(item) | translate }}\n    </span>\n    }}\n  </div>\n  }\n</div>\n}\n", styles: [".error-message{color:#fff!important;font-size:.81em;font-weight:500;display:block;position:relative}.input-error-message{position:relative;background:#e55658;color:#fff;font-size:1.1em;padding:.25em .4375em;border-radius:.3em;width:fit-content;z-index:1;top:-.5em;right:1em;display:flex;justify-content:center;align-items:center;flex-direction:column}.input-error-pointer{position:absolute;left:calc(100% - 1.38em);top:-.45em;width:0;height:0;border-left:.3em solid transparent;border-right:.3em solid transparent;border-bottom:.5em solid #e55658;content:\"\";display:block}.error-container{width:100%;display:flex;justify-content:end;align-items:flex-end}\n"], dependencies: [{ kind: "ngmodule", type: TranslateModule }, { kind: "pipe", type: i3$1.TranslatePipe, name: "translate" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomAppErrorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-app-error', imports: [TranslateModule], standalone: true, template: "@if(hasAnyErrorToShow()){\n<div class=\"error-container\">\n  @if(this.control.invalid && (this.control.touched || this.control.dirty) &&\n  this.getErrorMessage.length>0){\n  <div class=\"input-error-message\">\n    <span class=\"input-error-pointer\"></span>\n    @for (item of validation; track $index) { @if (shouldShowError(item)) {\n\n    <span class=\"error-message\">\n      {{ getErrorMessage(item) | translate }}\n    </span>\n    }}\n  </div>\n  }\n</div>\n}\n", styles: [".error-message{color:#fff!important;font-size:.81em;font-weight:500;display:block;position:relative}.input-error-message{position:relative;background:#e55658;color:#fff;font-size:1.1em;padding:.25em .4375em;border-radius:.3em;width:fit-content;z-index:1;top:-.5em;right:1em;display:flex;justify-content:center;align-items:center;flex-direction:column}.input-error-pointer{position:absolute;left:calc(100% - 1.38em);top:-.45em;width:0;height:0;border-left:.3em solid transparent;border-right:.3em solid transparent;border-bottom:.5em solid #e55658;content:\"\";display:block}.error-container{width:100%;display:flex;justify-content:end;align-items:flex-end}\n"] }]
        }], propDecorators: { control: [{
                type: Input,
                args: [{ required: true }]
            }], validation: [{
                type: Input,
                args: [{ required: true }]
            }], name: [{
                type: Input,
                args: [{ required: true }]
            }] } });

class CustomButtonComponent {
    disabled = false;
    type = 'button';
    buttonClick = new EventEmitter();
    class = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: CustomButtonComponent, isStandalone: true, selector: "custom-button", inputs: { disabled: "disabled", type: "type", class: "class" }, outputs: { buttonClick: "buttonClick" }, ngImport: i0, template: "<button\n  (click)=\"buttonClick.emit()\"\n  type=\"{{ type }}\"\n  [class]=\"'custom-button ' + class\"\n  [disabled]=\"disabled\"\n>\n  <div class=\"inner-text\">\n    <ng-content></ng-content>\n  </div>\n</button>\n", styles: [".custom-button{border:none;border-radius:.625em;cursor:pointer;text-align:center;display:flex;justify-content:center;align-items:center;font-size:1em;padding:.6em 1.45em;min-height:2.8em}.custom-button:hover{box-shadow:inset 0 0 0 1000px #fff5}.custom-button:disabled{box-shadow:inset 0 0 #fff5;cursor:not-allowed!important;opacity:.5}.inner-text{font-size:1.074em}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-button', imports: [], standalone: true, template: "<button\n  (click)=\"buttonClick.emit()\"\n  type=\"{{ type }}\"\n  [class]=\"'custom-button ' + class\"\n  [disabled]=\"disabled\"\n>\n  <div class=\"inner-text\">\n    <ng-content></ng-content>\n  </div>\n</button>\n", styles: [".custom-button{border:none;border-radius:.625em;cursor:pointer;text-align:center;display:flex;justify-content:center;align-items:center;font-size:1em;padding:.6em 1.45em;min-height:2.8em}.custom-button:hover{box-shadow:inset 0 0 0 1000px #fff5}.custom-button:disabled{box-shadow:inset 0 0 #fff5;cursor:not-allowed!important;opacity:.5}.inner-text{font-size:1.074em}\n"] }]
        }], propDecorators: { disabled: [{
                type: Input
            }], type: [{
                type: Input
            }], buttonClick: [{
                type: Output
            }], class: [{
                type: Input,
                args: [{ required: true }]
            }] } });

class ToggleElementDirective {
    elementRef;
    element;
    elementVisible;
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    // eslint-disable-next-line accessor-pairs
    set hideElement(hide) {
        if (hide && this.element) {
            this.element.classList.replace('block', 'hidden');
        }
    }
    onDocumentClick(event, clickedElement) {
        if (!clickedElement) {
            return;
        }
        if (this.element && this.elementVisible) {
            const clickedInside = this.elementRef.nativeElement.contains(clickedElement)
                || this.element.querySelector('#element-container')?.contains(clickedElement);
            if (!clickedInside) {
                this.element.classList.replace('block', 'hidden');
                this.elementVisible = false;
            }
        }
    }
    onClick() {
        if (!this.element) {
            return;
        }
        const isCurrentlyVisible = this.element.classList.contains('block');
        const ariaDisabled = this.element.getAttribute('aria-disabled');
        const isDisabled = ariaDisabled ? JSON.parse(ariaDisabled) : false;
        if (isDisabled) {
            return;
        }
        if (isCurrentlyVisible) {
            this.element.classList.replace('block', 'hidden');
        }
        else {
            this.element.classList.replace('hidden', 'block');
        }
        this.elementVisible = !isCurrentlyVisible;
    }
    ngOnInit() {
        this.elementVisible = this.element?.className.includes('block');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ToggleElementDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: ToggleElementDirective, isStandalone: true, selector: "[toggleElement]", inputs: { element: "element", hideElement: "hideElement" }, host: { listeners: { "document:click": "onDocumentClick($event,$event.target)", "click": "onClick()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ToggleElementDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[toggleElement]',
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { element: [{
                type: Input,
                args: [{ required: true }]
            }], hideElement: [{
                type: Input
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event', '$event.target']]
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });

class AllowNumberOnlyDirective {
    el;
    regex = new RegExp(/^[0-9]*$/);
    specialKeys = [
        'Backspace',
        'Tab',
        'End',
        'Home',
        'ArrowLeft',
        'ArrowRight',
    ];
    constructor(el) {
        this.el = el;
    }
    onKeyDown(event) {
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        const current = this.el.nativeElement.value;
        const next = current.concat(event.key);
        if (!String(next).match(this.regex)) {
            event.preventDefault();
        }
    }
    onPaste(event) {
        const pastedInput = event.clipboardData?.getData('text') || '';
        if (!pastedInput.match(this.regex)) {
            event.preventDefault();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AllowNumberOnlyDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: AllowNumberOnlyDirective, isStandalone: true, selector: "[appAllowNumberOnly]", host: { listeners: { "keydown": "onKeyDown($event)", "paste": "onPaste($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AllowNumberOnlyDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[appAllowNumberOnly]',
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], onPaste: [{
                type: HostListener,
                args: ['paste', ['$event']]
            }] } });

class ClickOutsideDirective {
    elementReference;
    zone;
    platform;
    constructor(elementReference, zone, platform) {
        this.elementReference = elementReference;
        this.zone = zone;
        this.platform = platform;
    }
    clickOutside;
    clickOutsideEmitter = new EventEmitter();
    isFirstTime = true;
    destroySubscription = new Subscription();
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platform)) {
            // Delay subscription to avoid catching the opening click
            setTimeout(() => {
                this.zone.runOutsideAngular(() => {
                    const documentClick$ = fromEvent(document, 'click'); //,{ capture: true }
                    const subscription = documentClick$
                        .pipe(filter((event) => {
                        // Only emit if click is outside the host element
                        return !this.elementReference.nativeElement.contains(event.target);
                    }))
                        .subscribe(() => {
                        this.zone.run(() => {
                            this.clickOutsideEmitter.emit();
                        });
                    });
                    this.destroySubscription = subscription;
                });
            }, 0);
        }
    }
    ngOnDestroy() {
        this.destroySubscription.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClickOutsideDirective, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: ClickOutsideDirective, isStandalone: true, selector: "[clickOutside]", inputs: { clickOutside: "clickOutside" }, outputs: { clickOutsideEmitter: "clickOutsideEmitter" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ClickOutsideDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[clickOutside]',
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }], propDecorators: { clickOutside: [{
                type: Input
            }], clickOutsideEmitter: [{
                type: Output
            }] } });

/* eslint-disable @typescript-eslint/no-explicit-any */
class EnglishOnlyDirective {
    el;
    constructor(el) {
        this.el = el;
    }
    onInputChange(event) {
        const initialValue = this.el.nativeElement.value;
        const englishOnlyRegex = new RegExp(/^[a-zA-Z\s]*$/);
        if (!englishOnlyRegex.test(initialValue)) {
            const newValue = initialValue.replace(/[^a-zA-Z\s]/g, '');
            this.el.nativeElement.value = newValue;
            event.preventDefault();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: EnglishOnlyDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: EnglishOnlyDirective, isStandalone: true, selector: "[appEnglishOnly]", host: { listeners: { "input": "onInputChange($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: EnglishOnlyDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[appEnglishOnly]',
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { onInputChange: [{
                type: HostListener,
                args: ['input', ['$event']]
            }] } });

/* eslint-disable @typescript-eslint/no-explicit-any */
class ArabicOnlyDirective {
    el;
    constructor(el) {
        this.el = el;
    }
    onInputChange(event) {
        const initialValue = this.el.nativeElement.value;
        const arabicOnlyRegex = new RegExp(/^[\u0621-\u064A\s]*$/);
        if (!arabicOnlyRegex.test(initialValue)) {
            const newValue = initialValue.replace(/[^\u0621-\u064A\s]/g, '');
            this.el.nativeElement.value = newValue;
            event.preventDefault();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ArabicOnlyDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: ArabicOnlyDirective, isStandalone: true, selector: "[appArabicOnly]", host: { listeners: { "input": "onInputChange($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: ArabicOnlyDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[appArabicOnly]',
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { onInputChange: [{
                type: HostListener,
                args: ['input', ['$event']]
            }] } });

class BlurBackdropDirective {
    el;
    showBackdrop = false;
    constructor(el) {
        this.el = el;
    }
    ngOnChanges() {
        if (this.showBackdrop) {
            this.el.nativeElement.className = 'absolute inset-0 backdrop-blur-md transition-all z-1000';
            this.el.nativeElement.parentElement.classList.add('p-5');
        }
        else {
            this.el.nativeElement.className = '';
            this.el.nativeElement.parentElement.classList.add('transition-all');
            this.el.nativeElement.parentElement.classList.remove('p-5');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: BlurBackdropDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: BlurBackdropDirective, isStandalone: true, selector: "[blurBackdrop]", inputs: { showBackdrop: "showBackdrop" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: BlurBackdropDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[blurBackdrop]',
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { showBackdrop: [{
                type: Input
            }] } });

class AuthDirective {
    authService;
    templateRef;
    viewContainer;
    authContextService;
    // private action: string = '';
    canDoAction = input([]);
    constructor(authService, templateRef, viewContainer, authContextService) {
        this.authService = authService;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.authContextService = authContextService;
        effect(() => {
            if (this.authContextService.userPermissionsAndRoles$() ||
                this.canDoAction().length > 0) {
                const allowed = this.authService.canDoAction(this.canDoAction());
                if (allowed && this.viewContainer.length === 0) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                }
                else if (!allowed) {
                    this.viewContainer.clear();
                }
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AuthDirective, deps: [{ token: AuthService }, { token: i0.TemplateRef }, { token: i0.ViewContainerRef }, { token: AuthContextService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "19.2.15", type: AuthDirective, isStandalone: true, selector: "[canDoAction]", inputs: { canDoAction: { classPropertyName: "canDoAction", publicName: "canDoAction", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AuthDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[canDoAction]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: AuthService }, { type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: AuthContextService }] });

const dropdownAnimation = trigger('dropdown', [
    transition(':enter', [
        style({ height: '0', opacity: 0, overflow: 'hidden' }),
        animate('250ms ease-out', style({ height: '*', opacity: 1 })),
    ]),
    transition(':leave', [
        style({ height: '*', opacity: 1, overflow: 'hidden' }),
        animate('200ms ease-in', style({ height: '0', opacity: 0 })),
    ]),
]);
class DropdownsAnimationDirective {
    isOpen = false;
    // HostBinding attaches the trigger
    get dropdown() {
        return this.isOpen ? true : false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DropdownsAnimationDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.15", type: DropdownsAnimationDirective, isStandalone: true, selector: "[DropdownAnimationObject]", inputs: { isOpen: ["DropdownAnimationObject", "isOpen"] }, host: { properties: { "@dropdown": "this.dropdown" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DropdownsAnimationDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[DropdownAnimationObject]',
                    standalone: true,
                    host: {
                        '[@dropdown]': 'isOpen',
                    },
                }]
        }], propDecorators: { isOpen: [{
                type: Input,
                args: ['DropdownAnimationObject']
            }], dropdown: [{
                type: HostBinding,
                args: ['@dropdown']
            }] } });

class CustomCalendarComponent {
    label = '';
    placeholder = 'Select date';
    labelClass = '';
    calendarPopUpClass = '';
    calendarInputClass = '';
    calendarContainerClass = '';
    minDate = null;
    maxDate = null;
    value = null;
    valueChange = new EventEmitter();
    height = '3.6em';
    showCalendar = false;
    currentMonth = new Date();
    days = [];
    weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    constructor() {
        this.generateCalendar();
    }
    toggleCalendar() {
        this.showCalendar = !this.showCalendar;
    }
    selectDate(date) {
        this.value = date;
        this.valueChange.emit(date);
        this.showCalendar = false;
    }
    prevMonth() {
        this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
        this.generateCalendar();
    }
    nextMonth() {
        this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
        this.generateCalendar();
    }
    generateCalendar() {
        this.days = [];
        const year = this.currentMonth.getFullYear();
        const month = this.currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        // Previous month days
        const prevMonthDays = firstDay.getDay();
        for (let i = prevMonthDays - 1; i >= 0; i--) {
            this.days.push(new Date(year, month, -i));
        }
        // Current month days
        for (let i = 1; i <= lastDay.getDate(); i++) {
            this.days.push(new Date(year, month, i));
        }
        // Next month days
        const nextMonthDays = 6 - lastDay.getDay();
        for (let i = 1; i <= nextMonthDays; i++) {
            this.days.push(new Date(year, month + 1, i));
        }
    }
    isSelected(date) {
        if (!this.value)
            return false;
        return (date.getDate() === this.value.getDate() &&
            date.getMonth() === this.value.getMonth() &&
            date.getFullYear() === this.value.getFullYear());
    }
    isCurrentMonth(date) {
        return date.getMonth() === this.currentMonth.getMonth();
    }
    isDisabled(date) {
        const isBeforeMin = this.minDate ? date < this.minDate : false;
        const isAfterMax = this.maxDate ? date > this.maxDate : false;
        return isBeforeMin || isAfterMax;
    }
    getMonthName() {
        return this.currentMonth.toLocaleString('default', { month: 'long' });
    }
    getYear() {
        return this.currentMonth.getFullYear();
    }
    formatDisplayDate() {
        if (!this.value)
            return '';
        return this.value.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomCalendarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomCalendarComponent, isStandalone: true, selector: "custom-calendar", inputs: { label: "label", placeholder: "placeholder", labelClass: "labelClass", calendarPopUpClass: "calendarPopUpClass", calendarInputClass: "calendarInputClass", calendarContainerClass: "calendarContainerClass", minDate: "minDate", maxDate: "maxDate", value: "value", height: "height" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div [class]=\"'custom-calendar-container ' + calendarContainerClass\">\n  @if(label){\n  <label [class]=\"'custom-label ' + labelClass\">{{ label }}</label>\n  }\n\n  <div\n    [class]=\"'custom-calendar-input ' + calendarInputClass\"\n    (click)=\"toggleCalendar()\"\n    [ngStyle]=\"{ '--height': height }\"\n  >\n    <span class=\"placeholder\" *ngIf=\"!value\">{{ placeholder }}</span>\n    <span *ngIf=\"value\">{{ formatDisplayDate() }}</span>\n    <span class=\"calendar-icon\">\n      <svg\n        width=\"inherit\"\n        height=\"24\"\n        viewBox=\"0 0 24 24\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M8 2V5\"\n          stroke=\"#999999\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M16 2V5\"\n          stroke=\"#999999\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M3.5 9.08984H20.5\"\n          stroke=\"#999999\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z\"\n          stroke=\"#999999\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M15.6947 13.7002H15.7037\"\n          stroke=\"#999999\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M15.6947 16.7002H15.7037\"\n          stroke=\"#999999\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M11.9955 13.7002H12.0045\"\n          stroke=\"#999999\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M11.9955 16.7002H12.0045\"\n          stroke=\"#999999\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M8.29431 13.7002H8.30329\"\n          stroke=\"#999999\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M8.29431 16.7002H8.30329\"\n          stroke=\"#999999\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n    </span>\n  </div>\n\n  @if(showCalendar) {\n  <div\n    [class]=\"'calendar-popup ' + calendarPopUpClass\"\n    #calendarPopup\n    [clickOutside]=\"calendarPopup\"\n    (clickOutsideEmitter)=\"showCalendar = false\"\n    [DropdownAnimationObject]=\"showCalendar\"\n  >\n    <div class=\"calendar-header\">\n      <button type=\"button\" class=\"nav-button\" (click)=\"prevMonth()\">\n        <svg\n          width=\"8\"\n          height=\"12\"\n          viewBox=\"0 0 8 12\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M6.5 11L1.5 6L6.5 1\"\n            stroke=\"black\"\n            stroke-opacity=\"0.72\"\n            stroke-width=\"1.66667\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </button>\n      <div class=\"month-title\">{{ getMonthName() }} {{ getYear() }}</div>\n      <button type=\"button\" class=\"nav-button\" (click)=\"nextMonth()\">\n        <svg\n          width=\"8\"\n          height=\"12\"\n          viewBox=\"0 0 8 12\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M1.5 11L6.5 6L1.5 1\"\n            stroke=\"black\"\n            stroke-opacity=\"0.72\"\n            stroke-width=\"1.66667\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </button>\n    </div>\n\n    <div class=\"weekdays\">\n      @for(weekday of weekdays; track weekday) {\n      <div class=\"weekday\">{{ weekday }}</div>\n      }\n    </div>\n\n    <div class=\"days-grid\">\n      @for(day of days; track day) {\n      <div\n        class=\"day\"\n        [class.current-month]=\"isCurrentMonth(day)\"\n        [class.selected]=\"isSelected(day)\"\n        [class.disabled]=\"isDisabled(day)\"\n        (click)=\"$event.stopPropagation(); !isDisabled(day) && selectDate(day)\"\n      >\n        {{ day.getDate() }}\n      </div>\n      }\n    </div>\n  </div>\n  }\n</div>\n", styles: [".custom-calendar-container{position:relative;width:100%}.custom-label{display:block;font-size:1em;font-weight:500;color:#707070;margin-bottom:.3em}.custom-calendar-input{position:relative;height:var(--height);width:100%;border:1px solid #82828233;border-radius:6px;padding:0 12px;display:flex;align-items:center;cursor:pointer;background-color:#fff}.placeholder{color:#82828250;font-size:.95em}.calendar-icon{position:absolute;right:12px;height:calc(var(--height) / 2.4)}.fullWidth{width:100%}.calendar-popup{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #82828233;border-radius:.375em;margin-top:4px;padding:1rem;z-index:10;box-shadow:0 4px 6px #0000001a}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.month-title{font-weight:600}.nav-button{background:none;border:none;font-size:16px;cursor:pointer;padding:4px 8px}.weekdays{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-weight:500;font-size:12px;margin-bottom:8px}.days-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.day{height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;cursor:pointer;font-size:14px}.day.current-month{color:#111827}.day:not(.current-month){color:#9ca3af}.day.selected{background-color:#602650;color:#fff}.day.disabled{color:#d1d5db;cursor:not-allowed!important;text-decoration:line-through}.day:not(.disabled):not(.selected):hover{background-color:#f3f4f6}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: DropdownsAnimationDirective, selector: "[DropdownAnimationObject]", inputs: ["DropdownAnimationObject"] }], animations: [dropdownAnimation] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomCalendarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-calendar', standalone: true, imports: [
                        FormsModule,
                        ClickOutsideDirective,
                        CommonModule,
                        DropdownsAnimationDirective,
                    ], animations: [dropdownAnimation], template: "<div [class]=\"'custom-calendar-container ' + calendarContainerClass\">\n  @if(label){\n  <label [class]=\"'custom-label ' + labelClass\">{{ label }}</label>\n  }\n\n  <div\n    [class]=\"'custom-calendar-input ' + calendarInputClass\"\n    (click)=\"toggleCalendar()\"\n    [ngStyle]=\"{ '--height': height }\"\n  >\n    <span class=\"placeholder\" *ngIf=\"!value\">{{ placeholder }}</span>\n    <span *ngIf=\"value\">{{ formatDisplayDate() }}</span>\n    <span class=\"calendar-icon\">\n      <svg\n        width=\"inherit\"\n        height=\"24\"\n        viewBox=\"0 0 24 24\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M8 2V5\"\n          stroke=\"#999999\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M16 2V5\"\n          stroke=\"#999999\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M3.5 9.08984H20.5\"\n          stroke=\"#999999\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z\"\n          stroke=\"#999999\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M15.6947 13.7002H15.7037\"\n          stroke=\"#999999\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M15.6947 16.7002H15.7037\"\n          stroke=\"#999999\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M11.9955 13.7002H12.0045\"\n          stroke=\"#999999\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M11.9955 16.7002H12.0045\"\n          stroke=\"#999999\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M8.29431 13.7002H8.30329\"\n          stroke=\"#999999\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M8.29431 16.7002H8.30329\"\n          stroke=\"#999999\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n    </span>\n  </div>\n\n  @if(showCalendar) {\n  <div\n    [class]=\"'calendar-popup ' + calendarPopUpClass\"\n    #calendarPopup\n    [clickOutside]=\"calendarPopup\"\n    (clickOutsideEmitter)=\"showCalendar = false\"\n    [DropdownAnimationObject]=\"showCalendar\"\n  >\n    <div class=\"calendar-header\">\n      <button type=\"button\" class=\"nav-button\" (click)=\"prevMonth()\">\n        <svg\n          width=\"8\"\n          height=\"12\"\n          viewBox=\"0 0 8 12\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M6.5 11L1.5 6L6.5 1\"\n            stroke=\"black\"\n            stroke-opacity=\"0.72\"\n            stroke-width=\"1.66667\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </button>\n      <div class=\"month-title\">{{ getMonthName() }} {{ getYear() }}</div>\n      <button type=\"button\" class=\"nav-button\" (click)=\"nextMonth()\">\n        <svg\n          width=\"8\"\n          height=\"12\"\n          viewBox=\"0 0 8 12\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M1.5 11L6.5 6L1.5 1\"\n            stroke=\"black\"\n            stroke-opacity=\"0.72\"\n            stroke-width=\"1.66667\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </button>\n    </div>\n\n    <div class=\"weekdays\">\n      @for(weekday of weekdays; track weekday) {\n      <div class=\"weekday\">{{ weekday }}</div>\n      }\n    </div>\n\n    <div class=\"days-grid\">\n      @for(day of days; track day) {\n      <div\n        class=\"day\"\n        [class.current-month]=\"isCurrentMonth(day)\"\n        [class.selected]=\"isSelected(day)\"\n        [class.disabled]=\"isDisabled(day)\"\n        (click)=\"$event.stopPropagation(); !isDisabled(day) && selectDate(day)\"\n      >\n        {{ day.getDate() }}\n      </div>\n      }\n    </div>\n  </div>\n  }\n</div>\n", styles: [".custom-calendar-container{position:relative;width:100%}.custom-label{display:block;font-size:1em;font-weight:500;color:#707070;margin-bottom:.3em}.custom-calendar-input{position:relative;height:var(--height);width:100%;border:1px solid #82828233;border-radius:6px;padding:0 12px;display:flex;align-items:center;cursor:pointer;background-color:#fff}.placeholder{color:#82828250;font-size:.95em}.calendar-icon{position:absolute;right:12px;height:calc(var(--height) / 2.4)}.fullWidth{width:100%}.calendar-popup{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #82828233;border-radius:.375em;margin-top:4px;padding:1rem;z-index:10;box-shadow:0 4px 6px #0000001a}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.month-title{font-weight:600}.nav-button{background:none;border:none;font-size:16px;cursor:pointer;padding:4px 8px}.weekdays{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-weight:500;font-size:12px;margin-bottom:8px}.days-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.day{height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;cursor:pointer;font-size:14px}.day.current-month{color:#111827}.day:not(.current-month){color:#9ca3af}.day.selected{background-color:#602650;color:#fff}.day.disabled{color:#d1d5db;cursor:not-allowed!important;text-decoration:line-through}.day:not(.disabled):not(.selected):hover{background-color:#f3f4f6}\n"] }]
        }], ctorParameters: () => [], propDecorators: { label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], labelClass: [{
                type: Input
            }], calendarPopUpClass: [{
                type: Input
            }], calendarInputClass: [{
                type: Input
            }], calendarContainerClass: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], value: [{
                type: Input,
                args: [{ required: true }]
            }], valueChange: [{
                type: Output
            }], height: [{
                type: Input
            }] } });

class CustomCalenderFormComponent {
    // TODO: implement ControlValueAccessor properly
    // Inputs
    label = '';
    placeholder = 'Select date';
    labelClass = '';
    calendarPopUpClass = '';
    calendarInputClass = '';
    calendarContainerClass = '';
    componentClass = '';
    minDate = null;
    maxDate = null;
    controlName = '';
    parentForm;
    validation = [];
    name = '';
    disabled = false;
    valueChange = new EventEmitter();
    height = '3.6em';
    viewType = 'base';
    // Calendar state
    showCalendarForm = false;
    currentMonth = new Date();
    days = [];
    weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    // ControlValueAccessor implementation
    _value = null;
    onChange = () => { };
    onTouched = () => { };
    constructor() {
        this.generateCalendar();
    }
    ngOnInit() {
        if (this.parentForm && this.controlName) {
            const control = this.parentForm.get(this.controlName);
            if (control) {
                this.value = control.value;
                control.valueChanges.subscribe((value) => {
                    this.value = value;
                });
            }
        }
    }
    // Getters and setters
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
        this.onChange(val);
        this.onTouched();
    }
    // ControlValueAccessor methods
    writeValue(value) {
        this._value = value;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // Calendar navigation
    // toggleCalendar(): void {
    //   this.showCalendarForm = !this.showCalendarForm;
    // }
    toggleCalendar() {
        this.showCalendarForm = !this.showCalendarForm;
        if (!this.showCalendarForm) {
            this.parentForm.get(this.controlName)?.markAsTouched();
        }
    }
    closeCalendar() {
        this.showCalendarForm = false;
        this.parentForm.get(this.controlName)?.markAsTouched();
    }
    prevMonth() {
        this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
        this.generateCalendar();
    }
    nextMonth() {
        this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
        this.generateCalendar();
    }
    // Calendar generation
    generateCalendar() {
        this.days = [];
        const year = this.currentMonth.getFullYear();
        const month = this.currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        // Previous month days
        const prevMonthDays = firstDay.getDay();
        for (let i = prevMonthDays - 1; i >= 0; i--) {
            this.days.push(new Date(year, month, -i));
        }
        // Current month days
        for (let i = 1; i <= lastDay.getDate(); i++) {
            this.days.push(new Date(year, month, i));
        }
        // Next month days
        const nextMonthDays = 6 - lastDay.getDay();
        for (let i = 1; i <= nextMonthDays; i++) {
            this.days.push(new Date(year, month + 1, i));
        }
    }
    // Date selection
    selectDate(date) {
        const normalized = this.normalizeToMidnightUTC(date);
        this.applyDate(normalized);
    }
    normalizeToMidnightUTC(date) {
        // Create a UTC-based date at 00:00:00 of the selected local date
        const utcTimestamp = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        return new Date(utcTimestamp);
    }
    applyDate(date) {
        this._value = date;
        this.showCalendarForm = false;
        this.parentForm.get(this.controlName)?.setValue(date);
        this.parentForm.get(this.controlName)?.markAsTouched();
        this.valueChange.emit(date);
    }
    // Utility methods
    isSelected(date) {
        if (!this.value)
            return false;
        return (date.getDate() === this.value.getDate() &&
            date.getMonth() === this.value.getMonth() &&
            date.getFullYear() === this.value.getFullYear());
    }
    isCurrentMonth(date) {
        return date.getMonth() === this.currentMonth.getMonth();
    }
    isDisabled(date) {
        const isBeforeMin = this.minDate
            ? date.setHours(0, 0, 0, 0) < this.minDate.setHours(0, 0, 0, 0)
            : false;
        const isAfterMax = this.maxDate
            ? date.setHours(0, 0, 0, 0) > this.maxDate.setHours(0, 0, 0, 0)
            : false;
        return isBeforeMin || isAfterMax;
    }
    getMonthName() {
        return this.currentMonth.toLocaleString('default', { month: 'long' });
    }
    getYear() {
        return this.currentMonth.getFullYear();
    }
    formatDisplayDate() {
        if (!this.value)
            return '';
        try {
            //   console.log(    this.value.toLocaleDateString('en-GB', {
            //   day: '2-digit',
            //   month: '2-digit',
            //   year: 'numeric'
            // }))
            return this.value.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
        }
        catch (error) {
            return '';
        }
    }
    containRequiredError() {
        return this.validation.some((error) => error.errorType.includes(ComponentFormErrorConstant.REQUIRED));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomCalenderFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomCalenderFormComponent, isStandalone: true, selector: "custom-calender-form", inputs: { label: "label", placeholder: "placeholder", labelClass: "labelClass", calendarPopUpClass: "calendarPopUpClass", calendarInputClass: "calendarInputClass", calendarContainerClass: "calendarContainerClass", componentClass: "componentClass", minDate: "minDate", maxDate: "maxDate", controlName: "controlName", parentForm: "parentForm", validation: "validation", name: "name", disabled: "disabled", height: "height", viewType: "viewType" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div\n  [class]=\"'fullWidth ' + componentClass + ' ' + viewType\"\n  [formGroup]=\"parentForm\"\n  [class.has-error]=\"\n    parentForm.controls[controlName].invalid &&\n    parentForm.controls[controlName].touched\n  \"\n  [ngClass]=\"{ disabled: disabled }\"\n>\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\" [title]=\"label\">\n    {{ label }}\n    @if(containRequiredError()){\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\">*</span>\n    } @else{\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n\n  <div [class]=\"'custom-calendar-container ' + calendarContainerClass\">\n    <div class=\"calendar-error-container\">\n      <custom-app-error\n        [control]=\"parentForm.controls[controlName]\"\n        [validation]=\"validation\"\n        [name]=\"name\"\n      />\n    </div>\n\n    <div\n      [class]=\"'custom-calendar-input ' + calendarInputClass\"\n      [class.disabled]=\"disabled\"\n      [attr.aria-disabled]=\"disabled\"\n      (click)=\"!disabled && toggleCalendar()\"\n      [class.has-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched\n      \"\n      [ngStyle]=\"{ '--height': height }\"\n    >\n      <span class=\"placeholder\" *ngIf=\"!value\">{{ placeholder }}</span>\n      <span class=\"date-value\" *ngIf=\"value\">{{ formatDisplayDate() }}</span>\n      <span class=\"calendar-icon\">\n        <svg\n          width=\"inherit\"\n          height=\"inherit\"\n          viewBox=\"0 0 24 24\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M8 2V5\"\n            stroke=\"#999999\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M16 2V5\"\n            stroke=\"#999999\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M3.5 9.08984H20.5\"\n            stroke=\"#999999\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z\"\n            stroke=\"#999999\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M15.6947 13.7002H15.7037\"\n            stroke=\"#999999\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M15.6947 16.7002H15.7037\"\n            stroke=\"#999999\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11.9955 13.7002H12.0045\"\n            stroke=\"#999999\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11.9955 16.7002H12.0045\"\n            stroke=\"#999999\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M8.29431 13.7002H8.30329\"\n            stroke=\"#999999\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M8.29431 16.7002H8.30329\"\n            stroke=\"#999999\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </span>\n    </div>\n\n    @if(showCalendarForm && !disabled) {\n    <div\n      [class]=\"'calendar-popup ' + calendarPopUpClass\"\n      #calendarPopUpForm\n      [clickOutside]=\"calendarPopUpForm\"\n      (clickOutsideEmitter)=\"closeCalendar()\"\n      [DropdownAnimationObject]=\"showCalendarForm\"\n    >\n      <div class=\"calendar-header\">\n        <button type=\"button\" class=\"nav-button\" (click)=\"prevMonth()\">\n          <svg\n            width=\"8\"\n            height=\"12\"\n            viewBox=\"0 0 8 12\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M6.5 11L1.5 6L6.5 1\"\n              stroke=\"black\"\n              stroke-opacity=\"0.72\"\n              stroke-width=\"1.66667\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </svg>\n        </button>\n        <div class=\"month-title\">{{ getMonthName() }} {{ getYear() }}</div>\n        <button type=\"button\" class=\"nav-button\" (click)=\"nextMonth()\">\n          <svg\n            width=\"8\"\n            height=\"12\"\n            viewBox=\"0 0 8 12\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M1.5 11L6.5 6L1.5 1\"\n              stroke=\"black\"\n              stroke-opacity=\"0.72\"\n              stroke-width=\"1.66667\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </svg>\n        </button>\n      </div>\n\n      <div class=\"weekdays\">\n        @for(weekday of weekdays; track weekday) {\n        <div class=\"weekday\">{{ weekday }}</div>\n        }\n      </div>\n\n      <div class=\"days-grid\">\n        @for(day of days; track day) {\n        <div\n          class=\"day\"\n          [class.current-month]=\"isCurrentMonth(day)\"\n          [class.selected]=\"isSelected(day)\"\n          [class.disabled]=\"isDisabled(day) || disabled\"\n          (click)=\"\n            $event.stopPropagation();\n            !isDisabled(day) && !disabled && selectDate(day)\n          \"\n        >\n          {{ day.getDate() }}\n        </div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n</div>\n", styles: [".base.fullWidth{width:100%}.base .custom-label{display:block;font-size:1em;font-weight:500;color:#707070;margin-bottom:.3em}.base .custom-calendar-container{position:relative;width:100%}.base .custom-calendar-container .calendar-error-container{position:absolute;top:100%;left:.73em;width:100%}.base .custom-calendar-container .calendar-error-container custom-app-error{pointer-events:none}.base .custom-calendar-container .custom-calendar-input{position:relative;height:var(--height);width:100%;border:1px solid rgba(130,130,130,.2);border-radius:6px;padding:0 12px;display:flex;align-items:center;cursor:pointer;background-color:#fff}.base .custom-calendar-container .custom-calendar-input .placeholder{color:#82828250;font-size:.95em}.base .custom-calendar-container .custom-calendar-input .calendar-icon{position:absolute;right:12px;height:calc(var(--height) / 2.4)}.base .custom-calendar-container .custom-calendar-input.has-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.base .calendar-popup{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid rgba(130,130,130,.2);border-radius:.375em;margin-top:4px;padding:1rem;z-index:10;box-shadow:0 4px 6px #0000001a}.base .calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.base .month-title{font-weight:600}.base .nav-button{background:none;border:none;font-size:16px;cursor:pointer;padding:4px 8px}.base .weekdays{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-weight:500;font-size:12px;margin-bottom:8px}.base .days-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.base .day{height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;cursor:pointer;font-size:14px}.base .day.current-month{color:#111827}.base .day:not(.current-month){color:#9ca3af}.base .day.selected{background-color:#602650;color:#fff}.base .day.disabled{color:#d1d5db;cursor:not-allowed!important;text-decoration:line-through}.base .day:not(.disabled):not(.selected):hover{background-color:#f3f4f6}.base .custom-calendar-input.disabled{background:#f3f3f3!important;color:#b0b0b0;cursor:not-allowed!important;border-color:#e0e0e0}.ai-plan{border:1px solid #d1d1d1;border-radius:1.25em;padding:.93em;height:5.1875em;box-shadow:0 4px 7px #0000000d}.ai-plan.fullWidth{width:100%}.ai-plan.has-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.ai-plan .custom-label{font-size:.9em;text-overflow:ellipsis;text-wrap:nowrap;overflow:hidden;display:block;width:110%;line-height:1;color:#06203c99;margin-bottom:.5em;font-family:var(--FM-Light)}.ai-plan .custom-calendar-container{position:relative;width:100%}.ai-plan .custom-calendar-container .calendar-error-container{position:absolute;top:160%;left:1.6em;width:100%}.ai-plan .custom-calendar-container .calendar-error-container custom-app-error{pointer-events:none}.ai-plan .custom-calendar-container .custom-calendar-input{position:relative;width:100%;padding:0;display:flex;align-items:center;cursor:pointer;font-weight:530;font-family:var(--FM-Bold)}.ai-plan .custom-calendar-container .custom-calendar-input .placeholder{color:#82828250;font-size:.975em}.ai-plan .custom-calendar-container .custom-calendar-input .date-value{padding:0 0 0 1.6em}@media (max-width: 1400px){.ai-plan .custom-calendar-container .custom-calendar-input .date-value{padding:0 0 0 1.3em}}@media (min-width: 1200px){.ai-plan .custom-calendar-container .custom-calendar-input .date-value{padding:0 0 0 1.6em}}.ai-plan .custom-calendar-container .custom-calendar-input .calendar-icon{position:absolute;left:0;height:1.2em}.ai-plan .calendar-popup{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid rgba(130,130,130,.2);border-radius:.375em;margin-top:4px;padding:1rem;z-index:10;box-shadow:0 4px 6px #0000001a;min-width:17em}.ai-plan .calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.ai-plan .month-title{font-weight:600}.ai-plan .nav-button{background:none;border:none;font-size:16px;cursor:pointer;padding:4px 8px}.ai-plan .weekdays{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-weight:500;font-size:12px;margin-bottom:8px}.ai-plan .days-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.ai-plan .day{height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;cursor:pointer;font-size:14px}.ai-plan .day.current-month{color:#111827}.ai-plan .day:not(.current-month){color:#9ca3af}.ai-plan .day.selected{background-color:#602650;color:#fff}.ai-plan .day.disabled{color:#d1d5db;cursor:not-allowed!important;text-decoration:line-through}.ai-plan .day:not(.disabled):not(.selected):hover{background-color:#f3f4f6}.ai-plan .custom-calendar-input.disabled{background:#f3f3f3!important;color:#b0b0b0;cursor:not-allowed!important;border-color:#e0e0e0}\n"], dependencies: [{ kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name", "showErrors"] }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: DropdownsAnimationDirective, selector: "[DropdownAnimationObject]", inputs: ["DropdownAnimationObject"] }], animations: [dropdownAnimation] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomCalenderFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-calender-form', standalone: true, imports: [
                        CustomAppErrorComponent,
                        ClickOutsideDirective,
                        ReactiveFormsModule,
                        CommonModule,
                        DropdownsAnimationDirective,
                    ], animations: [dropdownAnimation], template: "<div\n  [class]=\"'fullWidth ' + componentClass + ' ' + viewType\"\n  [formGroup]=\"parentForm\"\n  [class.has-error]=\"\n    parentForm.controls[controlName].invalid &&\n    parentForm.controls[controlName].touched\n  \"\n  [ngClass]=\"{ disabled: disabled }\"\n>\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\" [title]=\"label\">\n    {{ label }}\n    @if(containRequiredError()){\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\">*</span>\n    } @else{\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n\n  <div [class]=\"'custom-calendar-container ' + calendarContainerClass\">\n    <div class=\"calendar-error-container\">\n      <custom-app-error\n        [control]=\"parentForm.controls[controlName]\"\n        [validation]=\"validation\"\n        [name]=\"name\"\n      />\n    </div>\n\n    <div\n      [class]=\"'custom-calendar-input ' + calendarInputClass\"\n      [class.disabled]=\"disabled\"\n      [attr.aria-disabled]=\"disabled\"\n      (click)=\"!disabled && toggleCalendar()\"\n      [class.has-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched\n      \"\n      [ngStyle]=\"{ '--height': height }\"\n    >\n      <span class=\"placeholder\" *ngIf=\"!value\">{{ placeholder }}</span>\n      <span class=\"date-value\" *ngIf=\"value\">{{ formatDisplayDate() }}</span>\n      <span class=\"calendar-icon\">\n        <svg\n          width=\"inherit\"\n          height=\"inherit\"\n          viewBox=\"0 0 24 24\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M8 2V5\"\n            stroke=\"#999999\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M16 2V5\"\n            stroke=\"#999999\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M3.5 9.08984H20.5\"\n            stroke=\"#999999\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z\"\n            stroke=\"#999999\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M15.6947 13.7002H15.7037\"\n            stroke=\"#999999\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M15.6947 16.7002H15.7037\"\n            stroke=\"#999999\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11.9955 13.7002H12.0045\"\n            stroke=\"#999999\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11.9955 16.7002H12.0045\"\n            stroke=\"#999999\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M8.29431 13.7002H8.30329\"\n            stroke=\"#999999\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M8.29431 16.7002H8.30329\"\n            stroke=\"#999999\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </span>\n    </div>\n\n    @if(showCalendarForm && !disabled) {\n    <div\n      [class]=\"'calendar-popup ' + calendarPopUpClass\"\n      #calendarPopUpForm\n      [clickOutside]=\"calendarPopUpForm\"\n      (clickOutsideEmitter)=\"closeCalendar()\"\n      [DropdownAnimationObject]=\"showCalendarForm\"\n    >\n      <div class=\"calendar-header\">\n        <button type=\"button\" class=\"nav-button\" (click)=\"prevMonth()\">\n          <svg\n            width=\"8\"\n            height=\"12\"\n            viewBox=\"0 0 8 12\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M6.5 11L1.5 6L6.5 1\"\n              stroke=\"black\"\n              stroke-opacity=\"0.72\"\n              stroke-width=\"1.66667\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </svg>\n        </button>\n        <div class=\"month-title\">{{ getMonthName() }} {{ getYear() }}</div>\n        <button type=\"button\" class=\"nav-button\" (click)=\"nextMonth()\">\n          <svg\n            width=\"8\"\n            height=\"12\"\n            viewBox=\"0 0 8 12\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M1.5 11L6.5 6L1.5 1\"\n              stroke=\"black\"\n              stroke-opacity=\"0.72\"\n              stroke-width=\"1.66667\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </svg>\n        </button>\n      </div>\n\n      <div class=\"weekdays\">\n        @for(weekday of weekdays; track weekday) {\n        <div class=\"weekday\">{{ weekday }}</div>\n        }\n      </div>\n\n      <div class=\"days-grid\">\n        @for(day of days; track day) {\n        <div\n          class=\"day\"\n          [class.current-month]=\"isCurrentMonth(day)\"\n          [class.selected]=\"isSelected(day)\"\n          [class.disabled]=\"isDisabled(day) || disabled\"\n          (click)=\"\n            $event.stopPropagation();\n            !isDisabled(day) && !disabled && selectDate(day)\n          \"\n        >\n          {{ day.getDate() }}\n        </div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n</div>\n", styles: [".base.fullWidth{width:100%}.base .custom-label{display:block;font-size:1em;font-weight:500;color:#707070;margin-bottom:.3em}.base .custom-calendar-container{position:relative;width:100%}.base .custom-calendar-container .calendar-error-container{position:absolute;top:100%;left:.73em;width:100%}.base .custom-calendar-container .calendar-error-container custom-app-error{pointer-events:none}.base .custom-calendar-container .custom-calendar-input{position:relative;height:var(--height);width:100%;border:1px solid rgba(130,130,130,.2);border-radius:6px;padding:0 12px;display:flex;align-items:center;cursor:pointer;background-color:#fff}.base .custom-calendar-container .custom-calendar-input .placeholder{color:#82828250;font-size:.95em}.base .custom-calendar-container .custom-calendar-input .calendar-icon{position:absolute;right:12px;height:calc(var(--height) / 2.4)}.base .custom-calendar-container .custom-calendar-input.has-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.base .calendar-popup{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid rgba(130,130,130,.2);border-radius:.375em;margin-top:4px;padding:1rem;z-index:10;box-shadow:0 4px 6px #0000001a}.base .calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.base .month-title{font-weight:600}.base .nav-button{background:none;border:none;font-size:16px;cursor:pointer;padding:4px 8px}.base .weekdays{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-weight:500;font-size:12px;margin-bottom:8px}.base .days-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.base .day{height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;cursor:pointer;font-size:14px}.base .day.current-month{color:#111827}.base .day:not(.current-month){color:#9ca3af}.base .day.selected{background-color:#602650;color:#fff}.base .day.disabled{color:#d1d5db;cursor:not-allowed!important;text-decoration:line-through}.base .day:not(.disabled):not(.selected):hover{background-color:#f3f4f6}.base .custom-calendar-input.disabled{background:#f3f3f3!important;color:#b0b0b0;cursor:not-allowed!important;border-color:#e0e0e0}.ai-plan{border:1px solid #d1d1d1;border-radius:1.25em;padding:.93em;height:5.1875em;box-shadow:0 4px 7px #0000000d}.ai-plan.fullWidth{width:100%}.ai-plan.has-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.ai-plan .custom-label{font-size:.9em;text-overflow:ellipsis;text-wrap:nowrap;overflow:hidden;display:block;width:110%;line-height:1;color:#06203c99;margin-bottom:.5em;font-family:var(--FM-Light)}.ai-plan .custom-calendar-container{position:relative;width:100%}.ai-plan .custom-calendar-container .calendar-error-container{position:absolute;top:160%;left:1.6em;width:100%}.ai-plan .custom-calendar-container .calendar-error-container custom-app-error{pointer-events:none}.ai-plan .custom-calendar-container .custom-calendar-input{position:relative;width:100%;padding:0;display:flex;align-items:center;cursor:pointer;font-weight:530;font-family:var(--FM-Bold)}.ai-plan .custom-calendar-container .custom-calendar-input .placeholder{color:#82828250;font-size:.975em}.ai-plan .custom-calendar-container .custom-calendar-input .date-value{padding:0 0 0 1.6em}@media (max-width: 1400px){.ai-plan .custom-calendar-container .custom-calendar-input .date-value{padding:0 0 0 1.3em}}@media (min-width: 1200px){.ai-plan .custom-calendar-container .custom-calendar-input .date-value{padding:0 0 0 1.6em}}.ai-plan .custom-calendar-container .custom-calendar-input .calendar-icon{position:absolute;left:0;height:1.2em}.ai-plan .calendar-popup{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid rgba(130,130,130,.2);border-radius:.375em;margin-top:4px;padding:1rem;z-index:10;box-shadow:0 4px 6px #0000001a;min-width:17em}.ai-plan .calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.ai-plan .month-title{font-weight:600}.ai-plan .nav-button{background:none;border:none;font-size:16px;cursor:pointer;padding:4px 8px}.ai-plan .weekdays{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-weight:500;font-size:12px;margin-bottom:8px}.ai-plan .days-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.ai-plan .day{height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;cursor:pointer;font-size:14px}.ai-plan .day.current-month{color:#111827}.ai-plan .day:not(.current-month){color:#9ca3af}.ai-plan .day.selected{background-color:#602650;color:#fff}.ai-plan .day.disabled{color:#d1d5db;cursor:not-allowed!important;text-decoration:line-through}.ai-plan .day:not(.disabled):not(.selected):hover{background-color:#f3f4f6}.ai-plan .custom-calendar-input.disabled{background:#f3f3f3!important;color:#b0b0b0;cursor:not-allowed!important;border-color:#e0e0e0}\n"] }]
        }], ctorParameters: () => [], propDecorators: { label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], labelClass: [{
                type: Input
            }], calendarPopUpClass: [{
                type: Input
            }], calendarInputClass: [{
                type: Input
            }], calendarContainerClass: [{
                type: Input
            }], componentClass: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], controlName: [{
                type: Input,
                args: [{ required: true }]
            }], parentForm: [{
                type: Input,
                args: [{ required: true }]
            }], validation: [{
                type: Input,
                args: [{ required: true }]
            }], name: [{
                type: Input,
                args: [{ required: true }]
            }], disabled: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], height: [{
                type: Input
            }], viewType: [{
                type: Input
            }] } });

class CustomCheckBoxComponent {
    checkboxClass = '';
    labelClass = '';
    componentClass = '';
    label = '';
    disabled = false;
    name = '';
    value = false;
    valueChange = new EventEmitter();
    onChange(event) {
        if (this.disabled) {
            event.target.checked = this.value;
            return;
        }
        const checked = event.target.checked;
        this.value = checked;
        this.valueChange.emit(checked);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomCheckBoxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomCheckBoxComponent, isStandalone: true, selector: "custom-check-box", inputs: { checkboxClass: "checkboxClass", labelClass: "labelClass", componentClass: "componentClass", label: "label", disabled: "disabled", name: "name", value: "value" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div [class]=\"'checkBox-style ' + componentClass\" [class.pointer-events-none]=\"disabled\">\n  <input [id]=\"label\" type=\"checkbox\" [name]=\"name\" [class]=\"'custom-checkbox ' + checkboxClass\" [checked]=\"value\"\n    [disabled]=\"disabled\" (change)=\"onChange($event)\" />\n\n  @if (label) {\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\" [class.opacity-50]=\"disabled\"\n    [class.cursor-not-allowed]=\"disabled\">\n    {{ label }}\n  </label>\n  }\n</div>", styles: [":host{--checkbox-size: clamp(14px, .83vw, 20px);--checkmark-width: clamp(7px, .42vw, 10px);--checkmark-height: clamp(10px, .63vw, 15px);--border-width: clamp(1.5px, .1vw, 2px);--font-size: clamp(.95em, .52vw, 1.1em);--checkmark-stroke: calc(var(--checkbox-size) * .1875);--checkmark-left: calc(var(--checkbox-size) * .1875);--checkmark-top: calc(var(--checkbox-size) * -.125)}.checkBox-style{width:100%;display:flex;align-items:center;gap:.5rem}.custom-checkbox{appearance:none;width:var(--checkbox-size);height:var(--checkbox-size);border:var(--border-width) solid #ccc;border-radius:3px;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease,background-color .3s ease;flex-shrink:0}.custom-checkbox:checked{background-color:#1db3a9;border:0}.custom-checkbox:checked:after{content:\"\";position:absolute;top:0;left:calc(var(--checkbox-size) * .25);width:var(--checkmark-width);height:var(--checkmark-height);border:solid white;border-width:0 var(--checkmark-stroke) var(--checkmark-stroke) 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#1db3a9}.custom-label{font-size:var(--font-size);color:#707070;font-weight:500;line-height:1.4;cursor:pointer}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomCheckBoxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-check-box', imports: [FormsModule], standalone: true, template: "<div [class]=\"'checkBox-style ' + componentClass\" [class.pointer-events-none]=\"disabled\">\n  <input [id]=\"label\" type=\"checkbox\" [name]=\"name\" [class]=\"'custom-checkbox ' + checkboxClass\" [checked]=\"value\"\n    [disabled]=\"disabled\" (change)=\"onChange($event)\" />\n\n  @if (label) {\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\" [class.opacity-50]=\"disabled\"\n    [class.cursor-not-allowed]=\"disabled\">\n    {{ label }}\n  </label>\n  }\n</div>", styles: [":host{--checkbox-size: clamp(14px, .83vw, 20px);--checkmark-width: clamp(7px, .42vw, 10px);--checkmark-height: clamp(10px, .63vw, 15px);--border-width: clamp(1.5px, .1vw, 2px);--font-size: clamp(.95em, .52vw, 1.1em);--checkmark-stroke: calc(var(--checkbox-size) * .1875);--checkmark-left: calc(var(--checkbox-size) * .1875);--checkmark-top: calc(var(--checkbox-size) * -.125)}.checkBox-style{width:100%;display:flex;align-items:center;gap:.5rem}.custom-checkbox{appearance:none;width:var(--checkbox-size);height:var(--checkbox-size);border:var(--border-width) solid #ccc;border-radius:3px;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease,background-color .3s ease;flex-shrink:0}.custom-checkbox:checked{background-color:#1db3a9;border:0}.custom-checkbox:checked:after{content:\"\";position:absolute;top:0;left:calc(var(--checkbox-size) * .25);width:var(--checkmark-width);height:var(--checkmark-height);border:solid white;border-width:0 var(--checkmark-stroke) var(--checkmark-stroke) 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#1db3a9}.custom-label{font-size:var(--font-size);color:#707070;font-weight:500;line-height:1.4;cursor:pointer}\n"] }]
        }], propDecorators: { checkboxClass: [{
                type: Input
            }], labelClass: [{
                type: Input
            }], componentClass: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }], name: [{
                type: Input,
                args: [{ required: true }]
            }], value: [{
                type: Input,
                args: [{ required: true }]
            }], valueChange: [{
                type: Output
            }] } });

class CustomCheckBoxFormComponent {
    checkboxClass = '';
    componentClass = '';
    labelClass = '';
    label = '';
    name = '';
    controlName = '';
    parentForm;
    validation = [];
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomCheckBoxFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomCheckBoxFormComponent, isStandalone: true, selector: "custom-check-box-form", inputs: { checkboxClass: "checkboxClass", componentClass: "componentClass", labelClass: "labelClass", label: "label", name: "name", controlName: "controlName", parentForm: "parentForm", validation: "validation" }, ngImport: i0, template: "<div class=\"full-width\" [formGroup]=\"parentForm\">\n  <div [ngClass]=\"'checkBox-style' + componentClass\">\n    <div class=\"check-error-container\">\n      <custom-app-error\n        [control]=\"parentForm.controls[controlName]\"\n        [validation]=\"validation\"\n        [name]=\"name\"\n      />\n    </div>\n    <input\n      [id]=\"label\"\n      type=\"checkbox\"\n      [name]=\"name\"\n      [class]=\"'custom-checkbox ' + checkboxClass\"\n      [formControlName]=\"controlName\"\n    />\n\n    @if(label){\n    <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n      {{ label }}\n    </label>\n    }\n  </div>\n</div>\n", styles: [".custom-checkbox{appearance:none;width:16px;height:16px;border:1px solid #8c92ab;border-radius:4px;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease,background-color .3s ease}.fullWidth{width:100%}.checkBox-style{position:relative;width:100%;display:flex;align-items:center;gap:4px;justify-content:center}.custom-checkbox:checked{background-color:#1db3a9;border-color:#1db3a9}.custom-checkbox:checked:after{content:\"\";position:absolute;top:0;left:4px;width:6px;height:12px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#1db3a9}.custom-label{font-size:1em;color:#707070;margin-bottom:.3em;font-weight:500;margin-top:5px}.check-error-container{position:absolute;top:calc(100% + .5em);left:35%;width:100%}.check-error-container custom-app-error{pointer-events:none}\n"], dependencies: [{ kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name", "showErrors"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomCheckBoxFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-check-box-form', standalone: true, imports: [CustomAppErrorComponent, ReactiveFormsModule, CommonModule], template: "<div class=\"full-width\" [formGroup]=\"parentForm\">\n  <div [ngClass]=\"'checkBox-style' + componentClass\">\n    <div class=\"check-error-container\">\n      <custom-app-error\n        [control]=\"parentForm.controls[controlName]\"\n        [validation]=\"validation\"\n        [name]=\"name\"\n      />\n    </div>\n    <input\n      [id]=\"label\"\n      type=\"checkbox\"\n      [name]=\"name\"\n      [class]=\"'custom-checkbox ' + checkboxClass\"\n      [formControlName]=\"controlName\"\n    />\n\n    @if(label){\n    <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n      {{ label }}\n    </label>\n    }\n  </div>\n</div>\n", styles: [".custom-checkbox{appearance:none;width:16px;height:16px;border:1px solid #8c92ab;border-radius:4px;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease,background-color .3s ease}.fullWidth{width:100%}.checkBox-style{position:relative;width:100%;display:flex;align-items:center;gap:4px;justify-content:center}.custom-checkbox:checked{background-color:#1db3a9;border-color:#1db3a9}.custom-checkbox:checked:after{content:\"\";position:absolute;top:0;left:4px;width:6px;height:12px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#1db3a9}.custom-label{font-size:1em;color:#707070;margin-bottom:.3em;font-weight:500;margin-top:5px}.check-error-container{position:absolute;top:calc(100% + .5em);left:35%;width:100%}.check-error-container custom-app-error{pointer-events:none}\n"] }]
        }], propDecorators: { checkboxClass: [{
                type: Input
            }], componentClass: [{
                type: Input
            }], labelClass: [{
                type: Input
            }], label: [{
                type: Input
            }], name: [{
                type: Input,
                args: [{ required: true }]
            }], controlName: [{
                type: Input,
                args: [{ required: true }]
            }], parentForm: [{
                type: Input,
                args: [{ required: true }]
            }], validation: [{
                type: Input,
                args: [{ required: true }]
            }] } });

class CustomDropdownComponent {
    label;
    labelClass = '';
    dropdownOptionsClass = '';
    dropdownHeaderClass = '';
    selectedClass = '';
    dropdownContainerClass = '';
    placeholder = 'Select an option';
    enableFilter = false;
    showClear = true;
    options = [];
    name;
    value;
    valueChange = new EventEmitter();
    height = '3.6em';
    isOpen = false;
    filteredOptions = [];
    filterText = '';
    init = false;
    ngOnInit() {
        this.init = true;
        this.filteredOptions = [...this.options];
    }
    get selectedOption() {
        return this.filteredOptions.find((opt) => opt.id === this.value) || null;
    }
    toggleDropdown() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.filterText = '';
            this.filterOptions();
        }
    }
    selectOption(option) {
        this.value = option.id;
        this.valueChange.emit(option);
        this.isOpen = false;
    }
    clearSelection(event) {
        console.log('event', event);
        event.stopPropagation();
        console.log(this.value);
        this.value = 0;
        this.valueChange.emit(null);
    }
    filterOptions() {
        if (!this.filterText) {
            this.filteredOptions = [...this.options];
        }
        else {
            const searchText = this.filterText.toLowerCase();
            this.filteredOptions = this.options.filter((option) => option.nameEn.toLowerCase().includes(searchText));
        }
    }
    set reset(value) {
        if (value) {
            this.value = 0;
            this.filterText = '';
            this.filterOptions();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomDropdownComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomDropdownComponent, isStandalone: true, selector: "custom-dropdown", inputs: { label: "label", labelClass: "labelClass", dropdownOptionsClass: "dropdownOptionsClass", dropdownHeaderClass: "dropdownHeaderClass", selectedClass: "selectedClass", dropdownContainerClass: "dropdownContainerClass", placeholder: "placeholder", enableFilter: "enableFilter", showClear: "showClear", options: "options", name: "name", value: "value", height: "height", reset: "reset" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "@if(init){<!-- custom-dropdown.component.html -->\n<div style=\"width: 100%; height: auto\" [ngStyle]=\"{ '--height': height }\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n\n  <div [class]=\"'dropdown-container ' + dropdownContainerClass\">\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      (click)=\"$event.stopImmediatePropagation(); toggleDropdown()\"\n    >\n      <span [class]=\"'selected-value ' + selectedClass\">\n        {{ selectedOption?.nameEn || placeholder }}\n      </span>\n      <div class=\"dropdown-icons\">\n        @if(selectedOption && showClear){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"inherit\"\n            height=\"inherit\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#999999\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#999999\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1710\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n        </span>\n        }\n        <svg\n          style=\"min-height: 12px\"\n          width=\"100%\"\n          height=\"100%\"\n          viewBox=\"0 0 12 12\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <g opacity=\"0.5\">\n            <path\n              d=\"M10.5 4.125L6.79545 8.25885C6.35795 8.74705 5.64205 8.74705 5.20455 8.25885L1.5 4.125\"\n              stroke=\"#828282\"\n              stroke-miterlimit=\"10\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </g>\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen){\n    <div\n      #dropdownOptions\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptions\"\n      (clickOutsideEmitter)=\"isOpen = false\"\n      [DropdownAnimationObject]=\"isOpen\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n        />\n      </div>\n      }\n\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <div\n          class=\"dropdown-option\"\n          [class.selected]=\"option.id === value\"\n          (click)=\"$event.stopPropagation(); selectOption(option)\"\n        >\n          {{ option.nameEn }}\n        </div>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n</div>\n}\n", styles: [".dropdown-container{position:relative;width:100%}.dropdown-header{height:var(--height);width:100%;border-radius:.375em;border:1px solid #82828233;padding:0 1em;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151;font-size:.95em}.dropdown-icons{display:flex;align-items:center;gap:8px;height:calc(var(--height) / 3)}.clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer;height:calc(var(--height) / 2)}.clear-icon:hover{color:#6b7280}.dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:16em;overflow-y:auto;background-color:#fff;border:1px solid #82828233;border-radius:.375em;margin-top:4px;z-index:1000;box-shadow:0 4px 6px #0000001a}.filter-container{padding:8px;border-bottom:1px solid #e5e7eb}.filter-input{width:100%;padding:8px;border:1px solid #82828233;border-radius:.25rem;outline:none}.options-list{padding:4px 0}.dropdown-option{cursor:pointer;height:var(--height);width:100%;display:flex;justify-content:start;align-items:center;font-family:var(--FM-Light);padding:.3em .5em}.dropdown-option:hover{background-color:#f3f4f6}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.custom-label{font-size:1em;color:#707070;margin-bottom:.3em;font-weight:500;display:block}\n"], dependencies: [{ kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "directive", type: DropdownsAnimationDirective, selector: "[DropdownAnimationObject]", inputs: ["DropdownAnimationObject"] }], animations: [dropdownAnimation] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-dropdown', standalone: true, imports: [
                        NgStyle,
                        FormsModule,
                        ClickOutsideDirective,
                        DropdownsAnimationDirective,
                    ], animations: [dropdownAnimation], template: "@if(init){<!-- custom-dropdown.component.html -->\n<div style=\"width: 100%; height: auto\" [ngStyle]=\"{ '--height': height }\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n\n  <div [class]=\"'dropdown-container ' + dropdownContainerClass\">\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      (click)=\"$event.stopImmediatePropagation(); toggleDropdown()\"\n    >\n      <span [class]=\"'selected-value ' + selectedClass\">\n        {{ selectedOption?.nameEn || placeholder }}\n      </span>\n      <div class=\"dropdown-icons\">\n        @if(selectedOption && showClear){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"inherit\"\n            height=\"inherit\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#999999\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#999999\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1710\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n        </span>\n        }\n        <svg\n          style=\"min-height: 12px\"\n          width=\"100%\"\n          height=\"100%\"\n          viewBox=\"0 0 12 12\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <g opacity=\"0.5\">\n            <path\n              d=\"M10.5 4.125L6.79545 8.25885C6.35795 8.74705 5.64205 8.74705 5.20455 8.25885L1.5 4.125\"\n              stroke=\"#828282\"\n              stroke-miterlimit=\"10\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </g>\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen){\n    <div\n      #dropdownOptions\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptions\"\n      (clickOutsideEmitter)=\"isOpen = false\"\n      [DropdownAnimationObject]=\"isOpen\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n        />\n      </div>\n      }\n\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <div\n          class=\"dropdown-option\"\n          [class.selected]=\"option.id === value\"\n          (click)=\"$event.stopPropagation(); selectOption(option)\"\n        >\n          {{ option.nameEn }}\n        </div>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n</div>\n}\n", styles: [".dropdown-container{position:relative;width:100%}.dropdown-header{height:var(--height);width:100%;border-radius:.375em;border:1px solid #82828233;padding:0 1em;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151;font-size:.95em}.dropdown-icons{display:flex;align-items:center;gap:8px;height:calc(var(--height) / 3)}.clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer;height:calc(var(--height) / 2)}.clear-icon:hover{color:#6b7280}.dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:16em;overflow-y:auto;background-color:#fff;border:1px solid #82828233;border-radius:.375em;margin-top:4px;z-index:1000;box-shadow:0 4px 6px #0000001a}.filter-container{padding:8px;border-bottom:1px solid #e5e7eb}.filter-input{width:100%;padding:8px;border:1px solid #82828233;border-radius:.25rem;outline:none}.options-list{padding:4px 0}.dropdown-option{cursor:pointer;height:var(--height);width:100%;display:flex;justify-content:start;align-items:center;font-family:var(--FM-Light);padding:.3em .5em}.dropdown-option:hover{background-color:#f3f4f6}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.custom-label{font-size:1em;color:#707070;margin-bottom:.3em;font-weight:500;display:block}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], labelClass: [{
                type: Input
            }], dropdownOptionsClass: [{
                type: Input
            }], dropdownHeaderClass: [{
                type: Input
            }], selectedClass: [{
                type: Input
            }], dropdownContainerClass: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], enableFilter: [{
                type: Input
            }], showClear: [{
                type: Input
            }], options: [{
                type: Input,
                args: [{ required: true }]
            }], name: [{
                type: Input,
                args: [{ required: true }]
            }], value: [{
                type: Input,
                args: [{ required: true }]
            }], valueChange: [{
                type: Output
            }], height: [{
                type: Input
            }], reset: [{
                type: Input
            }] } });

class CustomDropdownFormComponent {
    parentForm;
    controlName;
    label;
    labelClass = '';
    dropdownOptionsClass = '';
    dropdownHeaderClass = '';
    dropdownContainerClass = '';
    placeholder = 'Select an option';
    enableFilter = false;
    showClear = true;
    options = [];
    name = '';
    validation = [];
    disabled = false;
    height = '3.6em';
    viewType = 'base';
    valueChange = new EventEmitter();
    isOpen = false;
    selectedOption = null;
    filteredOptions = [];
    filterText = '';
    value;
    ngOnInit() {
        this.filteredOptions = [...this.options];
        this.setupFormControlSubscription();
        // if (this.disabled) {
        //   this.parentForm.controls[this.controlName].disable();
        // }
    }
    ngOnChanges(changes) {
        // This will trigger when options are loaded from the parent
        if (changes['options'] && changes['options'].currentValue) {
            this.filteredOptions = [...this.options];
            this.updateSelectedOptionFromFormValue();
        }
    }
    setupFormControlSubscription() {
        if (this.parentForm && this.controlName) {
            const control = this.parentForm.get(this.controlName);
            if (control) {
                // Set initial value
                if (control.value) {
                    this.value = control.value;
                    this.updateSelectedOptionFromFormValue();
                }
                // Subscribe to future changes
                control.valueChanges.subscribe((value) => {
                    this.value = value;
                    this.updateSelectedOptionFromFormValue();
                });
            }
        }
    }
    updateSelectedOptionFromFormValue() {
        const currentValue = this.parentForm.get(this.controlName)?.value;
        // console.log("Updating selected option:", {
        //   currentValue,
        //   options: this.options,
        //   controlName: this.controlName,
        // });
        if (currentValue && this.options.length > 0) {
            this.selectedOption =
                this.options.find((opt) => opt.id === currentValue) || null;
            // console.log("Found selected option:", this.selectedOption);
        }
        else {
            this.selectedOption = null;
        }
    }
    toggleDropdown() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.filterText = '';
            this.filterOptions();
        }
        else {
            this.parentForm.get(this.controlName)?.markAsTouched();
        }
    }
    closeDropdown() {
        this.isOpen = false;
        this.parentForm.get(this.controlName)?.markAsTouched();
    }
    writeValue(value) {
        this.value = value;
    }
    selectOption(option) {
        // console.log("option", option);
        this.selectedOption = option;
        this.parentForm.get(this.controlName)?.setValue(option.id);
        this.isOpen = false;
        this.valueChange.emit(option);
    }
    clearSelection(event) {
        event.stopPropagation();
        this.selectedOption = null;
        this.parentForm.get(this.controlName)?.setValue(null);
        this.valueChange.emit(null);
    }
    filterOptions() {
        if (!this.filterText) {
            this.filteredOptions = [...this.options];
        }
        else {
            const searchText = this.filterText.toLowerCase();
            this.filteredOptions = this.options.filter((option) => option.nameEn.toLowerCase().includes(searchText));
        }
    }
    set reset(value) {
        if (value) {
            this.selectedOption = null;
            this.filterText = '';
            this.filterOptions();
        }
    }
    containRequiredError() {
        return this.validation.some((error) => error.errorType.includes(ComponentFormErrorConstant.REQUIRED));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomDropdownFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomDropdownFormComponent, isStandalone: true, selector: "custom-dropdown-form", inputs: { parentForm: "parentForm", controlName: "controlName", label: "label", labelClass: "labelClass", dropdownOptionsClass: "dropdownOptionsClass", dropdownHeaderClass: "dropdownHeaderClass", dropdownContainerClass: "dropdownContainerClass", placeholder: "placeholder", enableFilter: "enableFilter", showClear: "showClear", options: "options", name: "name", validation: "validation", disabled: "disabled", height: "height", viewType: "viewType", reset: "reset" }, outputs: { valueChange: "valueChange" }, usesOnChanges: true, ngImport: i0, template: "<div\n  style=\"width: 100%\"\n  [formGroup]=\"parentForm\"\n  [class]=\"viewType\"\n  [class.has-error]=\"\n    parentForm.controls[controlName].invalid &&\n    parentForm.controls[controlName].touched &&\n    validation.length > 0\n  \"\n  [class.disabled]=\"disabled\"\n>\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\" [title]=\"label\">\n    {{ label }}\n    @if(containRequiredError()){\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\">*</span>\n    } @else{\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n\n  <div\n    [class]=\"'dropdown-container ' + dropdownContainerClass\"\n    [class.disabled]=\"disabled\"\n  >\n    <div class=\"dropdown-error-container\">\n      <custom-app-error\n        [control]=\"parentForm.controls[controlName]\"\n        [validation]=\"validation\"\n        [name]=\"name\"\n      />\n    </div>\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      [class.disabled]=\"disabled\"\n      (click)=\"!disabled && toggleDropdown()\"\n      [style.cursor]=\"disabled ? 'not-allowed' : 'pointer'\"\n      [class.has-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched &&\n        validation.length > 0\n      \"\n      [ngStyle]=\"{ '--height': height }\"\n    >\n      @if (selectedOption && selectedOption.nameEn){\n      <span class=\"selected-value\"> {{ selectedOption.nameEn }} </span>} @else {\n      <span class=\"selected-value placeholder\">\n        {{ placeholder }}\n      </span>\n      }\n      <div class=\"dropdown-icons\">\n        @if(selectedOption && showClear && !disabled){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"inherit\"\n            height=\"inherit\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#999999\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#999999\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1710\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n        </span>\n        }\n        <svg\n          style=\"min-height: 12px\"\n          width=\"inherit\"\n          height=\"inherit\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#999999\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen && !disabled){\n    <div\n      #dropdownOptions\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptions\"\n      (clickOutsideEmitter)=\"closeDropdown()\"\n      [DropdownAnimationObject]=\"isOpen\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n          [disabled]=\"disabled\"\n        />\n      </div>\n      }\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <div\n          class=\"dropdown-option\"\n          [class.selected]=\"option.id === selectedOption?.id\"\n          (click)=\"$event.stopPropagation(); selectOption(option)\"\n        >\n          {{ option.nameEn }}\n        </div>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n\n  <input\n    type=\"hidden\"\n    [id]=\"label\"\n    [name]=\"name\"\n    [formControlName]=\"controlName\"\n    [disabled]=\"disabled\"\n  />\n</div>\n", styles: [".base .custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.base .dropdown-container{position:relative;width:100%}.base .dropdown-container .dropdown-error-container{position:absolute;top:100%;left:.7em;width:100%}.base .dropdown-container .dropdown-error-container custom-app-error{pointer-events:none}.base .dropdown-container .dropdown-header{height:var(--height);width:100%;border-radius:.375em;border:1px solid rgba(130,130,130,.2);padding:0 1em;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.base .dropdown-container .dropdown-header.disabled{background-color:#f3f3f3!important;cursor:not-allowed!important}.base .dropdown-container .dropdown-header .selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151;font-size:.95em}.base .dropdown-container .dropdown-header .selected-value.placeholder{color:#82828250}.base .dropdown-container .dropdown-header .dropdown-icons{display:flex;align-items:center;gap:8px;height:calc(var(--height) / 3)}.base .dropdown-container .dropdown-header .clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer;height:calc(var(--height) / 2)}.base .dropdown-container .dropdown-header .clear-icon:hover{color:#6b7280}.base .dropdown-container .dropdown-header.has-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.base .dropdown-container .dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:16em;overflow-y:auto;background-color:#fff;border:1px solid rgba(130,130,130,.2);border-radius:.375em;margin-top:4px;z-index:1000;box-shadow:0 4px 6px #0000001a}.base .dropdown-container .dropdown-options .filter-container{padding:80px;border-bottom:1px solid #e5e7eb;background-color:red}.base .dropdown-container .dropdown-options .filter-container .filter-input{width:100%;padding:8px;border:1px solid rgba(130,130,130,.2);border-radius:.25rem;outline:none}.base .dropdown-container .dropdown-options .options-list{padding:4px 0}.base .dropdown-container .dropdown-options .options-list .dropdown-option{cursor:pointer;height:var(--height);width:100%;display:flex;justify-content:start;align-items:center;font-family:var(--FM-Light);padding:.3em .5em}.base .dropdown-container .dropdown-options .options-list .dropdown-option:hover{background-color:#f3f4f6}.base .dropdown-container .dropdown-options .options-list .dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.base .dropdown-container .dropdown-options .options-list .no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.base .dropdown-container.disabled{background-color:#f3f4f6!important}.ai-plan{border:1px solid #d1d1d1;border-radius:1.25em;padding:.93em;height:5.1875em;box-shadow:0 4px 7px #0000000d}.ai-plan.has-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.ai-plan .custom-label{font-size:.9em;text-overflow:ellipsis;text-wrap:nowrap;overflow:hidden;display:block;width:110%;line-height:1;font-size:.975em;color:#06203c99;margin-bottom:.5em;font-family:var(--FM-Light)}.ai-plan .dropdown-container{position:relative;width:100%}.ai-plan .dropdown-container .dropdown-error-container{position:absolute;top:160%;left:1.6em;width:100%}.ai-plan .dropdown-container .dropdown-error-container custom-app-error{pointer-events:none}.ai-plan .dropdown-container .dropdown-header{width:100%;padding:0;display:flex;align-items:center;justify-content:space-between;font-family:var(--FM-Bold)}.ai-plan .dropdown-container .dropdown-header .selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151;font-size:.95em}.ai-plan .dropdown-container .dropdown-header .selected-value.placeholder{color:#82828250}.ai-plan .dropdown-container .dropdown-header .dropdown-icons{display:flex;align-items:center;gap:8px;height:calc(var(--height) / 3)}.ai-plan .dropdown-container .dropdown-header .clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer;height:calc(var(--height) / 2)}.ai-plan .dropdown-container .dropdown-header .clear-icon:hover{color:#6b7280}.ai-plan .dropdown-container .dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:16em;overflow-y:auto;background-color:#fff;border:1px solid rgba(130,130,130,.2);border-radius:.375em;margin-top:4px;z-index:1000;box-shadow:0 4px 6px #0000001a;min-width:17em}.ai-plan .dropdown-container .dropdown-options .filter-container{padding:80px;border-bottom:1px solid #e5e7eb;background-color:red}.ai-plan .dropdown-container .dropdown-options .filter-container .filter-input{width:100%;padding:8px;border:1px solid rgba(130,130,130,.2);border-radius:.25rem;outline:none}.ai-plan .dropdown-container .dropdown-options .options-list{padding:4px 0}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option{cursor:pointer;height:var(--height);width:100%;display:flex;justify-content:start;align-items:center;font-family:var(--FM-Light);padding:.3em .5em}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option:hover{background-color:#f3f4f6}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.ai-plan .dropdown-container .dropdown-options .options-list .no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.ai-plan .dropdown-container.disabled{background-color:#f3f4f6!important}\n"], dependencies: [{ kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name", "showErrors"] }, { kind: "directive", type: DropdownsAnimationDirective, selector: "[DropdownAnimationObject]", inputs: ["DropdownAnimationObject"] }], animations: [dropdownAnimation] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomDropdownFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-dropdown-form', standalone: true, imports: [
                        NgStyle,
                        FormsModule,
                        ReactiveFormsModule,
                        ClickOutsideDirective,
                        CustomAppErrorComponent,
                        DropdownsAnimationDirective,
                    ], animations: [dropdownAnimation], template: "<div\n  style=\"width: 100%\"\n  [formGroup]=\"parentForm\"\n  [class]=\"viewType\"\n  [class.has-error]=\"\n    parentForm.controls[controlName].invalid &&\n    parentForm.controls[controlName].touched &&\n    validation.length > 0\n  \"\n  [class.disabled]=\"disabled\"\n>\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\" [title]=\"label\">\n    {{ label }}\n    @if(containRequiredError()){\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\">*</span>\n    } @else{\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n\n  <div\n    [class]=\"'dropdown-container ' + dropdownContainerClass\"\n    [class.disabled]=\"disabled\"\n  >\n    <div class=\"dropdown-error-container\">\n      <custom-app-error\n        [control]=\"parentForm.controls[controlName]\"\n        [validation]=\"validation\"\n        [name]=\"name\"\n      />\n    </div>\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      [class.disabled]=\"disabled\"\n      (click)=\"!disabled && toggleDropdown()\"\n      [style.cursor]=\"disabled ? 'not-allowed' : 'pointer'\"\n      [class.has-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched &&\n        validation.length > 0\n      \"\n      [ngStyle]=\"{ '--height': height }\"\n    >\n      @if (selectedOption && selectedOption.nameEn){\n      <span class=\"selected-value\"> {{ selectedOption.nameEn }} </span>} @else {\n      <span class=\"selected-value placeholder\">\n        {{ placeholder }}\n      </span>\n      }\n      <div class=\"dropdown-icons\">\n        @if(selectedOption && showClear && !disabled){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"inherit\"\n            height=\"inherit\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#999999\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#999999\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1710\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n        </span>\n        }\n        <svg\n          style=\"min-height: 12px\"\n          width=\"inherit\"\n          height=\"inherit\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#999999\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen && !disabled){\n    <div\n      #dropdownOptions\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptions\"\n      (clickOutsideEmitter)=\"closeDropdown()\"\n      [DropdownAnimationObject]=\"isOpen\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n          [disabled]=\"disabled\"\n        />\n      </div>\n      }\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <div\n          class=\"dropdown-option\"\n          [class.selected]=\"option.id === selectedOption?.id\"\n          (click)=\"$event.stopPropagation(); selectOption(option)\"\n        >\n          {{ option.nameEn }}\n        </div>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n\n  <input\n    type=\"hidden\"\n    [id]=\"label\"\n    [name]=\"name\"\n    [formControlName]=\"controlName\"\n    [disabled]=\"disabled\"\n  />\n</div>\n", styles: [".base .custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.base .dropdown-container{position:relative;width:100%}.base .dropdown-container .dropdown-error-container{position:absolute;top:100%;left:.7em;width:100%}.base .dropdown-container .dropdown-error-container custom-app-error{pointer-events:none}.base .dropdown-container .dropdown-header{height:var(--height);width:100%;border-radius:.375em;border:1px solid rgba(130,130,130,.2);padding:0 1em;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.base .dropdown-container .dropdown-header.disabled{background-color:#f3f3f3!important;cursor:not-allowed!important}.base .dropdown-container .dropdown-header .selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151;font-size:.95em}.base .dropdown-container .dropdown-header .selected-value.placeholder{color:#82828250}.base .dropdown-container .dropdown-header .dropdown-icons{display:flex;align-items:center;gap:8px;height:calc(var(--height) / 3)}.base .dropdown-container .dropdown-header .clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer;height:calc(var(--height) / 2)}.base .dropdown-container .dropdown-header .clear-icon:hover{color:#6b7280}.base .dropdown-container .dropdown-header.has-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.base .dropdown-container .dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:16em;overflow-y:auto;background-color:#fff;border:1px solid rgba(130,130,130,.2);border-radius:.375em;margin-top:4px;z-index:1000;box-shadow:0 4px 6px #0000001a}.base .dropdown-container .dropdown-options .filter-container{padding:80px;border-bottom:1px solid #e5e7eb;background-color:red}.base .dropdown-container .dropdown-options .filter-container .filter-input{width:100%;padding:8px;border:1px solid rgba(130,130,130,.2);border-radius:.25rem;outline:none}.base .dropdown-container .dropdown-options .options-list{padding:4px 0}.base .dropdown-container .dropdown-options .options-list .dropdown-option{cursor:pointer;height:var(--height);width:100%;display:flex;justify-content:start;align-items:center;font-family:var(--FM-Light);padding:.3em .5em}.base .dropdown-container .dropdown-options .options-list .dropdown-option:hover{background-color:#f3f4f6}.base .dropdown-container .dropdown-options .options-list .dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.base .dropdown-container .dropdown-options .options-list .no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.base .dropdown-container.disabled{background-color:#f3f4f6!important}.ai-plan{border:1px solid #d1d1d1;border-radius:1.25em;padding:.93em;height:5.1875em;box-shadow:0 4px 7px #0000000d}.ai-plan.has-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.ai-plan .custom-label{font-size:.9em;text-overflow:ellipsis;text-wrap:nowrap;overflow:hidden;display:block;width:110%;line-height:1;font-size:.975em;color:#06203c99;margin-bottom:.5em;font-family:var(--FM-Light)}.ai-plan .dropdown-container{position:relative;width:100%}.ai-plan .dropdown-container .dropdown-error-container{position:absolute;top:160%;left:1.6em;width:100%}.ai-plan .dropdown-container .dropdown-error-container custom-app-error{pointer-events:none}.ai-plan .dropdown-container .dropdown-header{width:100%;padding:0;display:flex;align-items:center;justify-content:space-between;font-family:var(--FM-Bold)}.ai-plan .dropdown-container .dropdown-header .selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151;font-size:.95em}.ai-plan .dropdown-container .dropdown-header .selected-value.placeholder{color:#82828250}.ai-plan .dropdown-container .dropdown-header .dropdown-icons{display:flex;align-items:center;gap:8px;height:calc(var(--height) / 3)}.ai-plan .dropdown-container .dropdown-header .clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer;height:calc(var(--height) / 2)}.ai-plan .dropdown-container .dropdown-header .clear-icon:hover{color:#6b7280}.ai-plan .dropdown-container .dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:16em;overflow-y:auto;background-color:#fff;border:1px solid rgba(130,130,130,.2);border-radius:.375em;margin-top:4px;z-index:1000;box-shadow:0 4px 6px #0000001a;min-width:17em}.ai-plan .dropdown-container .dropdown-options .filter-container{padding:80px;border-bottom:1px solid #e5e7eb;background-color:red}.ai-plan .dropdown-container .dropdown-options .filter-container .filter-input{width:100%;padding:8px;border:1px solid rgba(130,130,130,.2);border-radius:.25rem;outline:none}.ai-plan .dropdown-container .dropdown-options .options-list{padding:4px 0}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option{cursor:pointer;height:var(--height);width:100%;display:flex;justify-content:start;align-items:center;font-family:var(--FM-Light);padding:.3em .5em}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option:hover{background-color:#f3f4f6}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.ai-plan .dropdown-container .dropdown-options .options-list .no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.ai-plan .dropdown-container.disabled{background-color:#f3f4f6!important}\n"] }]
        }], propDecorators: { parentForm: [{
                type: Input,
                args: [{ required: true }]
            }], controlName: [{
                type: Input,
                args: [{ required: true }]
            }], label: [{
                type: Input
            }], labelClass: [{
                type: Input
            }], dropdownOptionsClass: [{
                type: Input
            }], dropdownHeaderClass: [{
                type: Input
            }], dropdownContainerClass: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], enableFilter: [{
                type: Input
            }], showClear: [{
                type: Input
            }], options: [{
                type: Input,
                args: [{ required: true }]
            }], name: [{
                type: Input,
                args: [{ required: true }]
            }], validation: [{
                type: Input,
                args: [{ required: true }]
            }], disabled: [{
                type: Input
            }], height: [{
                type: Input
            }], viewType: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], reset: [{
                type: Input
            }] } });

class CustomInputComponent {
    class = '';
    labelClass = '';
    label = '';
    placeholder = '';
    name = '';
    type = 'text';
    value;
    valueChange = new EventEmitter();
    showConfirmButton = false;
    confirmLabel = 'Save';
    inputEl;
    ngAfterViewInit() {
        this.focusAtEnd();
    }
    focusAtEnd() {
        const input = this.inputEl?.nativeElement;
        if (!input)
            return;
        requestAnimationFrame(() => {
            input.focus();
            const len = input.value.length;
            input.setSelectionRange(len, len);
            input.scrollLeft = input.scrollWidth;
        });
    }
    onConfirm() {
        this.valueChange.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomInputComponent, isStandalone: true, selector: "custom-input", inputs: { class: "class", labelClass: "labelClass", label: "label", placeholder: "placeholder", name: "name", type: "type", value: "value", showConfirmButton: "showConfirmButton", confirmLabel: "confirmLabel" }, outputs: { valueChange: "valueChange" }, viewQueries: [{ propertyName: "inputEl", first: true, predicate: ["inputEl"], descendants: true }], ngImport: i0, template: "<div class=\"custom-input-wrapper\">\n\n  @if (label) {\n    <label\n      [for]=\"label || name\"\n      [class]=\"'custom-label ' + labelClass\">\n      {{ label }}\n    </label>\n  }\n\n  <div class=\"input-shell\">\n    <input\n      #inputEl\n      [id]=\"label || name\"\n      [type]=\"type\"\n      [name]=\"name\"\n      [placeholder]=\"placeholder\"\n      [class]=\"'custom-input ' + class\"\n      [(ngModel)]=\"value\"\n      (ngModelChange)=\"showConfirmButton ? null : valueChange.emit($event)\"\n    />\n\n    @if (showConfirmButton) {\n      <button\n        type=\"button\"\n        class=\"input-btn\"\n        (click)=\"onConfirm()\">\n        {{ confirmLabel }}\n      </button>\n    }\n  </div>\n\n</div>\n", styles: [".custom-input-wrapper{width:100%}.input-shell{position:relative;width:100%}.custom-input{width:100%;border-radius:.375em;border:1px solid #82828233;font-size:1em;font-weight:400;padding:.93em 6.5em .93em 1em}.custom-input:focus{outline:none}.custom-input::placeholder{color:#82828250}.custom-label{font-size:1em;font-weight:500;color:#707070;display:block;margin-bottom:.3em}.input-btn{position:absolute;top:50%;right:.4em;transform:translateY(-50%);height:calc(100% - .35em);padding:.25em;border:none;border-radius:.3em;background-color:#26c7bc;color:#fff;font-size:.85em;font-weight:500;cursor:pointer}.input-btn:hover{background-color:#147a72}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-input', standalone: true, imports: [FormsModule], template: "<div class=\"custom-input-wrapper\">\n\n  @if (label) {\n    <label\n      [for]=\"label || name\"\n      [class]=\"'custom-label ' + labelClass\">\n      {{ label }}\n    </label>\n  }\n\n  <div class=\"input-shell\">\n    <input\n      #inputEl\n      [id]=\"label || name\"\n      [type]=\"type\"\n      [name]=\"name\"\n      [placeholder]=\"placeholder\"\n      [class]=\"'custom-input ' + class\"\n      [(ngModel)]=\"value\"\n      (ngModelChange)=\"showConfirmButton ? null : valueChange.emit($event)\"\n    />\n\n    @if (showConfirmButton) {\n      <button\n        type=\"button\"\n        class=\"input-btn\"\n        (click)=\"onConfirm()\">\n        {{ confirmLabel }}\n      </button>\n    }\n  </div>\n\n</div>\n", styles: [".custom-input-wrapper{width:100%}.input-shell{position:relative;width:100%}.custom-input{width:100%;border-radius:.375em;border:1px solid #82828233;font-size:1em;font-weight:400;padding:.93em 6.5em .93em 1em}.custom-input:focus{outline:none}.custom-input::placeholder{color:#82828250}.custom-label{font-size:1em;font-weight:500;color:#707070;display:block;margin-bottom:.3em}.input-btn{position:absolute;top:50%;right:.4em;transform:translateY(-50%);height:calc(100% - .35em);padding:.25em;border:none;border-radius:.3em;background-color:#26c7bc;color:#fff;font-size:.85em;font-weight:500;cursor:pointer}.input-btn:hover{background-color:#147a72}\n"] }]
        }], propDecorators: { class: [{
                type: Input
            }], labelClass: [{
                type: Input
            }], label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], name: [{
                type: Input
            }], type: [{
                type: Input
            }], value: [{
                type: Input,
                args: [{ required: true }]
            }], valueChange: [{
                type: Output
            }], showConfirmButton: [{
                type: Input
            }], confirmLabel: [{
                type: Input
            }], inputEl: [{
                type: ViewChild,
                args: ['inputEl']
            }] } });

class CustomInputFormComponent {
    class = '';
    labelClass = '';
    label = '';
    placeholder = '';
    name = '';
    type = 'text';
    controlName = '';
    parentForm;
    validation = [];
    pattern = '';
    valueChange = new EventEmitter();
    height = '3.6em';
    disabled = false;
    viewType = 'base';
    isFocused = false;
    onFocus() {
        this.isFocused = true;
    }
    onBlur() {
        this.isFocused = false;
    }
    containRequiredError() {
        return this.validation.some((error) => error.errorType.includes(ComponentFormErrorConstant.REQUIRED));
    }
    onValueChange() {
        if (!this.disabled &&
            this.parentForm.controls[this.controlName].value?.length > 0) {
            this.parentForm.controls[this.controlName].markAsTouched();
        }
    }
    ngOnInit() {
        // TODO: CHECK if should remove
        if (this.disabled) {
            this.parentForm.controls[this.controlName].disable();
        }
    }
    getMaxLength() {
        const control = this.parentForm.controls[this.controlName];
        if (!control || !control.validator) {
            return null;
        }
        // Trigger maxLength error with an infinitely long value
        const validatorResult = control.validator({
            value: { length: Infinity },
        });
        // If maxLength validator exists, it will return an error with requiredLength
        if (validatorResult && validatorResult['maxlength']) {
            return validatorResult['maxlength'].requiredLength;
        }
        return null;
    }
    getMinLength() {
        const control = this.parentForm.controls[this.controlName];
        if (!control || !control.validator) {
            return null;
        }
        // Trigger minLength error with an infinitely long value
        const validatorResult = control.validator({
            value: { length: Infinity },
        });
        // If minLength validator exists, it will return an error with requiredLength
        if (validatorResult && validatorResult['minlength']) {
            return validatorResult['minlength'].requiredLength;
        }
        return null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomInputFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomInputFormComponent, isStandalone: true, selector: "custom-input-form", inputs: { class: "class", labelClass: "labelClass", label: "label", placeholder: "placeholder", name: "name", type: "type", controlName: "controlName", parentForm: "parentForm", validation: "validation", pattern: "pattern", height: "height", disabled: "disabled", viewType: "viewType" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div\n  style=\"width: 100%\"\n  [formGroup]=\"parentForm\"\n  class=\"input-wrapper\"\n  [class]=\"viewType\"\n>\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\">*</span>\n    } @else{\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n\n  <div\n    class=\"input-container\"\n    [class.has-error]=\"\n      parentForm.controls[controlName].invalid &&\n      parentForm.controls[controlName].touched &&\n      !disabled\n    \"\n    [ngStyle]=\"{ '--height': height }\"\n    style=\"position: relative\"\n  >\n    <div class=\"input-error-container\">\n      @if( parentForm.controls[controlName].invalid &&\n      parentForm.controls[controlName].touched && !disabled ){\n      <custom-app-error\n        [control]=\"parentForm.controls[controlName]\"\n        [validation]=\"validation\"\n        [name]=\"name\"\n      />\n      }\n    </div>\n\n    <input\n      [id]=\"label || name\"\n      [type]=\"type\"\n      [name]=\"name\"\n      [placeholder]=\"placeholder\"\n      [class]=\"'custom-input ' + class\"\n      [formControlName]=\"controlName\"\n      (ngModelChange)=\"valueChange.emit($event); onValueChange()\"\n      [pattern]=\"pattern\"\n      [class.input-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched &&\n        !disabled\n      \"\n      (focus)=\"onFocus()\"\n      (blur)=\"onBlur()\"\n      [disabled]=\"disabled\"\n      [maxlength]=\"getMaxLength()\"\n      [minlength]=\"getMinLength()\"\n    />\n\n    <div\n      style=\"\n        position: absolute;\n        font-size: 0.65em;\n        right: 0.5em;\n        color: red;\n        top: -1.5em;\n        display: flex;\n        gap: 1em;\n      \"\n    >\n      @if(isFocused && (getMaxLength())){\n      <p>Max length is {{ getMaxLength() }} char</p>\n\n      } @if(isFocused && (getMinLength())){\n      <p>Min length is {{ getMinLength() }} char</p>\n      }\n    </div>\n\n    <!-- Error icon (SVG) -->\n    @if( parentForm.controls[controlName].invalid &&\n    parentForm.controls[controlName].touched && !disabled ){\n    <span class=\"input-icon\"\n      ><svg\n        width=\"1.08em\"\n        height=\"1.08em\"\n        viewBox=\"0 0 22 22\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <g clip-path=\"url(#clip0_9085_34629)\">\n          <path\n            d=\"M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 7V11\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 15H11.01\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n        <defs>\n          <clipPath id=\"clip0_9085_34629\">\n            <rect width=\"22\" height=\"22\" fill=\"white\" />\n          </clipPath>\n        </defs>\n      </svg>\n    </span>\n    }\n  </div>\n</div>\n", styles: [".base .input-wrapper{position:relative}.base .input-container{position:relative;height:var(--height)}.base .custom-input{height:100%;width:100%;border-radius:.375em;border:1px solid rgba(130,130,130,.2);outline:none!important;box-shadow:none;font-size:1em;font-weight:400;transition:border-color .2s;padding:.2em 1em}.base .custom-input:disabled{background-color:#f3f3f3!important;cursor:not-allowed!important}.base .custom-input.input-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826;padding:.2em 4em .2em 1em}.base .input-icon{position:absolute;right:1em;top:50%;transform:translateY(-50%);color:#e55658;font-size:1.5em;pointer-events:none}.base .custom-input::placeholder{color:#82828233;font-size:1em;font-weight:400}.base .custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.base .input-error-container{position:absolute;top:100%;left:0;width:100%}.base .input-error-container custom-app-error{pointer-events:none}.base input[type=password]::-ms-reveal{display:none!important}.base input[type=password]::-ms-clear{display:none!important}.ai-plan{border:1px solid #d1d1d1;border-radius:1.25em;padding:.93em;height:5.1875em;box-shadow:0 4px 7px #0000000d}.ai-plan.has-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.ai-plan .custom-label{font-size:.9em;text-overflow:ellipsis;text-wrap:nowrap;overflow:hidden;display:block;width:110%;line-height:1;font-size:.975em;color:#06203c99;margin-bottom:.5em;font-family:var(--FM-Light)}.ai-plan .input-container{position:relative;width:100%}.ai-plan .input-container .input-error-container{position:absolute;top:160%;left:1.6em;width:100%}.ai-plan .input-container .input-error-container custom-app-error{pointer-events:none}.ai-plan .input-container .custom-input{width:100%;padding:0;border:none;box-shadow:none;background:transparent;font-family:var(--FM-Bold);height:auto}.ai-plan .input-container .custom-input.input-error{border:none;box-shadow:none;padding:0}.ai-plan .input-container .custom-input::placeholder{color:#82828250}.ai-plan .input-container.disabled{background-color:#f3f4f6!important}\n"], dependencies: [{ kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.MinLengthValidator, selector: "[minlength][formControlName],[minlength][formControl],[minlength][ngModel]", inputs: ["minlength"] }, { kind: "directive", type: i1$1.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i1$1.PatternValidator, selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]", inputs: ["pattern"] }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name", "showErrors"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomInputFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-input-form', standalone: true, imports: [NgStyle, ReactiveFormsModule, CustomAppErrorComponent], template: "<div\n  style=\"width: 100%\"\n  [formGroup]=\"parentForm\"\n  class=\"input-wrapper\"\n  [class]=\"viewType\"\n>\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\">*</span>\n    } @else{\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n\n  <div\n    class=\"input-container\"\n    [class.has-error]=\"\n      parentForm.controls[controlName].invalid &&\n      parentForm.controls[controlName].touched &&\n      !disabled\n    \"\n    [ngStyle]=\"{ '--height': height }\"\n    style=\"position: relative\"\n  >\n    <div class=\"input-error-container\">\n      @if( parentForm.controls[controlName].invalid &&\n      parentForm.controls[controlName].touched && !disabled ){\n      <custom-app-error\n        [control]=\"parentForm.controls[controlName]\"\n        [validation]=\"validation\"\n        [name]=\"name\"\n      />\n      }\n    </div>\n\n    <input\n      [id]=\"label || name\"\n      [type]=\"type\"\n      [name]=\"name\"\n      [placeholder]=\"placeholder\"\n      [class]=\"'custom-input ' + class\"\n      [formControlName]=\"controlName\"\n      (ngModelChange)=\"valueChange.emit($event); onValueChange()\"\n      [pattern]=\"pattern\"\n      [class.input-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched &&\n        !disabled\n      \"\n      (focus)=\"onFocus()\"\n      (blur)=\"onBlur()\"\n      [disabled]=\"disabled\"\n      [maxlength]=\"getMaxLength()\"\n      [minlength]=\"getMinLength()\"\n    />\n\n    <div\n      style=\"\n        position: absolute;\n        font-size: 0.65em;\n        right: 0.5em;\n        color: red;\n        top: -1.5em;\n        display: flex;\n        gap: 1em;\n      \"\n    >\n      @if(isFocused && (getMaxLength())){\n      <p>Max length is {{ getMaxLength() }} char</p>\n\n      } @if(isFocused && (getMinLength())){\n      <p>Min length is {{ getMinLength() }} char</p>\n      }\n    </div>\n\n    <!-- Error icon (SVG) -->\n    @if( parentForm.controls[controlName].invalid &&\n    parentForm.controls[controlName].touched && !disabled ){\n    <span class=\"input-icon\"\n      ><svg\n        width=\"1.08em\"\n        height=\"1.08em\"\n        viewBox=\"0 0 22 22\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <g clip-path=\"url(#clip0_9085_34629)\">\n          <path\n            d=\"M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 7V11\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 15H11.01\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n        <defs>\n          <clipPath id=\"clip0_9085_34629\">\n            <rect width=\"22\" height=\"22\" fill=\"white\" />\n          </clipPath>\n        </defs>\n      </svg>\n    </span>\n    }\n  </div>\n</div>\n", styles: [".base .input-wrapper{position:relative}.base .input-container{position:relative;height:var(--height)}.base .custom-input{height:100%;width:100%;border-radius:.375em;border:1px solid rgba(130,130,130,.2);outline:none!important;box-shadow:none;font-size:1em;font-weight:400;transition:border-color .2s;padding:.2em 1em}.base .custom-input:disabled{background-color:#f3f3f3!important;cursor:not-allowed!important}.base .custom-input.input-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826;padding:.2em 4em .2em 1em}.base .input-icon{position:absolute;right:1em;top:50%;transform:translateY(-50%);color:#e55658;font-size:1.5em;pointer-events:none}.base .custom-input::placeholder{color:#82828233;font-size:1em;font-weight:400}.base .custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.base .input-error-container{position:absolute;top:100%;left:0;width:100%}.base .input-error-container custom-app-error{pointer-events:none}.base input[type=password]::-ms-reveal{display:none!important}.base input[type=password]::-ms-clear{display:none!important}.ai-plan{border:1px solid #d1d1d1;border-radius:1.25em;padding:.93em;height:5.1875em;box-shadow:0 4px 7px #0000000d}.ai-plan.has-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.ai-plan .custom-label{font-size:.9em;text-overflow:ellipsis;text-wrap:nowrap;overflow:hidden;display:block;width:110%;line-height:1;font-size:.975em;color:#06203c99;margin-bottom:.5em;font-family:var(--FM-Light)}.ai-plan .input-container{position:relative;width:100%}.ai-plan .input-container .input-error-container{position:absolute;top:160%;left:1.6em;width:100%}.ai-plan .input-container .input-error-container custom-app-error{pointer-events:none}.ai-plan .input-container .custom-input{width:100%;padding:0;border:none;box-shadow:none;background:transparent;font-family:var(--FM-Bold);height:auto}.ai-plan .input-container .custom-input.input-error{border:none;box-shadow:none;padding:0}.ai-plan .input-container .custom-input::placeholder{color:#82828250}.ai-plan .input-container.disabled{background-color:#f3f4f6!important}\n"] }]
        }], propDecorators: { class: [{
                type: Input
            }], labelClass: [{
                type: Input
            }], label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], name: [{
                type: Input,
                args: [{ required: true }]
            }], type: [{
                type: Input
            }], controlName: [{
                type: Input,
                args: [{ required: true }]
            }], parentForm: [{
                type: Input,
                args: [{ required: true }]
            }], validation: [{
                type: Input,
                args: [{ required: true }]
            }], pattern: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], height: [{
                type: Input
            }], disabled: [{
                type: Input
            }], viewType: [{
                type: Input
            }] } });

class CustomMultiSelectDropdownComponent {
    dropdownOptionsClass = '';
    dropdownContainerClass = '';
    enableFilter = false;
    options = [];
    value = []; // Array of selected IDs
    valueChange = new EventEmitter();
    filteredOptions = [];
    filterText = '';
    ngOnInit() {
        this.filteredOptions = [...this.options];
    }
    toggleOptionSelection(option) {
        if (this.isSelected(option.id)) {
            this.value = this.value.filter((id) => id !== option.id);
        }
        else {
            this.value = [...this.value, option.id];
        }
        this.valueChange.emit(this.value);
    }
    isSelected(id) {
        return this.value.includes(id);
    }
    filterOptions() {
        if (!this.filterText) {
            this.filteredOptions = [...this.options];
        }
        else {
            const searchText = this.filterText.toLowerCase();
            this.filteredOptions = this.options.filter((option) => option.nameEn.toLowerCase().includes(searchText));
        }
    }
    set reset(value) {
        if (value) {
            this.value = [];
            this.filterText = '';
            this.filterOptions();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomMultiSelectDropdownComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomMultiSelectDropdownComponent, isStandalone: true, selector: "custom-multi-select-dropdown", inputs: { dropdownOptionsClass: "dropdownOptionsClass", dropdownContainerClass: "dropdownContainerClass", enableFilter: "enableFilter", options: "options", value: "value", reset: "reset" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div #dropdownOptions [class]=\"'dropdown-options ' + dropdownOptionsClass\">\n  @if(enableFilter){\n  <div class=\"filter-container\">\n    <input\n      type=\"text\"\n      class=\"filter-input\"\n      placeholder=\"Filter options...\"\n      #filterInput\n      (input)=\"filterText = filterInput.value; filterOptions()\"\n    />\n  </div>\n  }\n\n  <div class=\"options-list\">\n    @for(option of filteredOptions; track option.id){\n    <div class=\"dropdown-option\" (click)=\"toggleOptionSelection(option)\">\n      <input\n        type=\"checkbox\"\n        class=\"custom-checkbox\"\n        [checked]=\"isSelected(option.id)\"\n        (click)=\"toggleOptionSelection(option); $event.stopPropagation()\"\n      />\n      <span>{{ option.nameEn }}</span>\n    </div>\n    } @if(filteredOptions.length === 0){\n    <div class=\"no-options\">No options found</div>\n    }\n  </div>\n</div>\n", styles: [".dropdown-options{display:flex;flex-direction:column;max-height:20em;overflow:hidden;z-index:1000}.filter-container{position:sticky;top:0;background-color:#fff;z-index:1;padding:.5em;border-bottom:1px solid #e5e7eb}.filter-input{width:100%;padding:.5em .625em;border:1px solid #82828233;border-radius:.35em;box-sizing:border-box}.options-list{padding:.25em 0;overflow-y:auto;flex:1}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.option-label{flex:1}.custom-checkbox{appearance:none;width:calc(var(--height) / 3.15);height:calc(var(--height) / 3.15);min-width:1.25em;min-height:1.25em;border:1.5px solid #9ca3af;border-radius:4px;background-color:#fff;display:inline-block;position:relative}.custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.custom-checkbox:checked:after{content:\"\";position:absolute;top:5%;left:30%;width:40%;height:80%;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#25c7bc}.dropdown-option{display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;transition:background-color .2s}.dropdown-option:hover{background-color:#e7f9f8}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:.75em 1em;color:#6b7280;font-style:italic;text-align:center}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomMultiSelectDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-multi-select-dropdown', standalone: true, imports: [FormsModule], template: "<div #dropdownOptions [class]=\"'dropdown-options ' + dropdownOptionsClass\">\n  @if(enableFilter){\n  <div class=\"filter-container\">\n    <input\n      type=\"text\"\n      class=\"filter-input\"\n      placeholder=\"Filter options...\"\n      #filterInput\n      (input)=\"filterText = filterInput.value; filterOptions()\"\n    />\n  </div>\n  }\n\n  <div class=\"options-list\">\n    @for(option of filteredOptions; track option.id){\n    <div class=\"dropdown-option\" (click)=\"toggleOptionSelection(option)\">\n      <input\n        type=\"checkbox\"\n        class=\"custom-checkbox\"\n        [checked]=\"isSelected(option.id)\"\n        (click)=\"toggleOptionSelection(option); $event.stopPropagation()\"\n      />\n      <span>{{ option.nameEn }}</span>\n    </div>\n    } @if(filteredOptions.length === 0){\n    <div class=\"no-options\">No options found</div>\n    }\n  </div>\n</div>\n", styles: [".dropdown-options{display:flex;flex-direction:column;max-height:20em;overflow:hidden;z-index:1000}.filter-container{position:sticky;top:0;background-color:#fff;z-index:1;padding:.5em;border-bottom:1px solid #e5e7eb}.filter-input{width:100%;padding:.5em .625em;border:1px solid #82828233;border-radius:.35em;box-sizing:border-box}.options-list{padding:.25em 0;overflow-y:auto;flex:1}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.option-label{flex:1}.custom-checkbox{appearance:none;width:calc(var(--height) / 3.15);height:calc(var(--height) / 3.15);min-width:1.25em;min-height:1.25em;border:1.5px solid #9ca3af;border-radius:4px;background-color:#fff;display:inline-block;position:relative}.custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.custom-checkbox:checked:after{content:\"\";position:absolute;top:5%;left:30%;width:40%;height:80%;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#25c7bc}.dropdown-option{display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;transition:background-color .2s}.dropdown-option:hover{background-color:#e7f9f8}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:.75em 1em;color:#6b7280;font-style:italic;text-align:center}\n"] }]
        }], propDecorators: { dropdownOptionsClass: [{
                type: Input
            }], dropdownContainerClass: [{
                type: Input
            }], enableFilter: [{
                type: Input
            }], options: [{
                type: Input,
                args: [{ required: true }]
            }], value: [{
                type: Input,
                args: [{ required: true }]
            }], valueChange: [{
                type: Output
            }], reset: [{
                type: Input
            }] } });

class CustomMultiSelectFormComponent {
    parentForm;
    controlName;
    label;
    labelClass = '';
    dropdownOptionsClass = '';
    dropdownHeaderClass = '';
    dropdownContainerClass = '';
    placeholder = 'Select options';
    enableFilter = false;
    filterDesign = false;
    showClear = true;
    height = '3.6em';
    viewType = 'base';
    disabled = false;
    options = [];
    name = '';
    validation = [];
    valueChange = new EventEmitter();
    isOpen = false;
    filteredOptions = [];
    filterText = '';
    ngOnInit() {
        this.filteredOptions = [...this.options];
        const ctrl = this.parentForm.get(this.controlName);
        if (!Array.isArray(ctrl?.value)) {
            ctrl?.setValue([]);
        }
    }
    get selectedIds() {
        return this.parentForm.get(this.controlName)?.value ?? [];
    }
    get selectedOptions() {
        if (this.selectedIds.length === 0) {
            return [];
        }
        const ids = new Set(this.selectedIds?.map(String));
        return this.options.filter((o) => ids.has(String(o.id)));
    }
    getSelectedLabels() {
        return this.selectedOptions.map((o) => o.nameEn);
    }
    isSelected(id) {
        return this.selectedIds.some((v) => String(v) === String(id));
    }
    toggleDropdown() {
        if (this.disabled)
            return;
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.filterText = '';
            this.filterOptions();
        }
        else {
            this.parentForm.get(this.controlName)?.markAsTouched();
        }
    }
    closeDropdown() {
        this.isOpen = false;
        this.parentForm.get(this.controlName)?.markAsTouched();
    }
    toggleOptionSelection(option) {
        const ctrl = this.parentForm.get(this.controlName);
        if (!ctrl)
            return;
        const current = this.selectedIds;
        const exists = this.isSelected(option.id);
        const next = exists
            ? current.filter((id) => String(id) !== String(option.id))
            : [...current, option.id];
        ctrl.setValue(next);
        this.valueChange.emit(next);
    }
    clearSelection(event) {
        event.stopPropagation();
        this.parentForm.get(this.controlName)?.setValue([]);
        this.valueChange.emit([]);
    }
    filterOptions() {
        if (!this.filterText) {
            this.filteredOptions = [...this.options];
            return;
        }
        const searchText = this.filterText.toLowerCase();
        this.filteredOptions = this.options.filter((option) => option.nameEn.toLowerCase().includes(searchText));
    }
    set reset(value) {
        if (value) {
            this.parentForm.get(this.controlName)?.setValue([]);
            this.filterText = '';
            this.filterOptions();
        }
    }
    containRequiredError() {
        return this.validation.some((error) => error.errorType.includes(ComponentFormErrorConstant.REQUIRED));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomMultiSelectFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomMultiSelectFormComponent, isStandalone: true, selector: "custom-multi-select-form", inputs: { parentForm: "parentForm", controlName: "controlName", label: "label", labelClass: "labelClass", dropdownOptionsClass: "dropdownOptionsClass", dropdownHeaderClass: "dropdownHeaderClass", dropdownContainerClass: "dropdownContainerClass", placeholder: "placeholder", enableFilter: "enableFilter", filterDesign: "filterDesign", showClear: "showClear", height: "height", viewType: "viewType", disabled: "disabled", options: "options", name: "name", validation: "validation", reset: "reset" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div\n  style=\"width: 100%; font-size: 1em\"\n  [formGroup]=\"parentForm\"\n  [ngStyle]=\"{ '--height': height }\"\n  [class]=\"viewType\"\n  [class.has-error]=\"\n    parentForm.controls[controlName].invalid &&\n    parentForm.controls[controlName].touched\n  \"\n  [class.disabled]=\"disabled\"\n>\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\" [title]=\"label\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\">*</span>\n    } @else{\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n  <div\n    [class]=\"'dropdown-container ' + dropdownContainerClass\"\n    [class.disabled]=\"disabled\"\n  >\n    <div class=\"dropdown-error-container\">\n      <custom-app-error\n        [control]=\"parentForm.controls[controlName]\"\n        [validation]=\"validation\"\n        [name]=\"name\"\n      />\n    </div>\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      (click)=\"!disabled && toggleDropdown()\"\n      [style.cursor]=\"disabled ? 'not-allowed' : 'pointer'\"\n      [class.disabled]=\"disabled\"\n      [class.has-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched\n      \"\n    >\n      <div class=\"selected-option-container\">\n        @if (selectedOptions.length > 0) { @for (opt of selectedOptions; track\n        opt){\n        <span class=\"selected-tag\" [ngClass]=\"{ 'filter-tag': filterDesign }\">\n          <p style=\"color: #fff\">{{ opt.nameEn }}</p>\n          <span\n            class=\"remove-tag\"\n            (click)=\"\n              !disabled && $event.stopPropagation();\n              !disabled && toggleOptionSelection(opt)\n            \"\n            [style.cursor]=\"disabled ? 'not-allowed' : 'pointer'\"\n            [class.disabled]=\"disabled\"\n            ><svg\n              width=\"8\"\n              height=\"8\"\n              viewBox=\"0 0 8 8\"\n              fill=\"none\"\n              xmlns=\"http://www.w3.org/2000/svg\"\n            >\n              <g clip-path=\"url(#clip0_9203_8209)\">\n                <path\n                  d=\"M7.42843 0.571289L0.571289 7.42843\"\n                  stroke=\"white\"\n                  stroke-linecap=\"round\"\n                  stroke-linejoin=\"round\"\n                />\n                <path\n                  d=\"M0.571289 0.571289L7.42843 7.42843\"\n                  stroke=\"white\"\n                  stroke-linecap=\"round\"\n                  stroke-linejoin=\"round\"\n                />\n              </g>\n              <defs>\n                <clipPath id=\"clip0_9203_8209\">\n                  <rect width=\"8\" height=\"8\" fill=\"white\" />\n                </clipPath>\n              </defs>\n            </svg>\n          </span>\n        </span>\n        } } @else {\n        <span class=\"selected-value placeholder\">\n          {{ placeholder }}\n        </span>\n        }\n      </div>\n      <div class=\"dropdown-icons\">\n        @if(!disabled && selectedOptions.length > 0 && showClear){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"inherit\"\n            height=\"inherit\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#999999\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#999999\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n          </svg>\n        </span>\n        }\n        <svg\n          style=\"min-height: 12px\"\n          width=\"inherit\"\n          height=\"inherit\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#999999\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen){\n    <div\n      #dropdownOptionsMultiSelectForm\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptionsMultiSelectForm\"\n      (clickOutsideEmitter)=\"closeDropdown()\"\n      [DropdownAnimationObject]=\"isOpen\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <div class=\"search-icon\">\n          <svg\n            width=\"inherit\"\n            height=\"inherit\"\n            viewBox=\"0 0 18 18\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M8.45536 15.3748C12.1718 15.3748 15.1845 12.3621 15.1845 8.64567C15.1845 4.92925 12.1718 1.9165 8.45536 1.9165C4.73895 1.9165 1.7262 4.92925 1.7262 8.64567C1.7262 12.3621 4.73895 15.3748 8.45536 15.3748Z\"\n              stroke=\"#292D32\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n            <path\n              d=\"M15.8929 16.0832L14.4762 14.6665\"\n              stroke=\"#292D32\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </svg>\n        </div>\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Search\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n        />\n      </div>\n      }\n\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <label\n          class=\"dropdown-option\"\n          [ngClass]=\"{ 'filter-design': filterDesign }\"\n        >\n          <input\n            type=\"checkbox\"\n            class=\"custom-checkbox\"\n            [checked]=\"isSelected(option.id)\"\n            (change)=\"toggleOptionSelection(option)\"\n          />\n          <span class=\"option-label\">{{ option.nameEn }}</span>\n        </label>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n\n  <input\n    type=\"hidden\"\n    [id]=\"label\"\n    [name]=\"name\"\n    [formControlName]=\"controlName\"\n  />\n</div>\n\n<!--  -->\n", styles: [".base .custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.base .dropdown-container{position:relative;width:100%}.base .dropdown-container .dropdown-error-container{position:absolute;top:100%;left:.7em;width:100%}.base .dropdown-container .dropdown-error-container custom-app-error{pointer-events:none}.base .dropdown-container .dropdown-header{height:var(--height);width:100%;border-radius:.375em;border:1px solid rgba(130,130,130,.2);padding:0 1em;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.base .dropdown-container .dropdown-header.has-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.base .dropdown-container .dropdown-header.disabled{background-color:#f3f3f3!important}.base .dropdown-container .dropdown-header .selected-option-container{display:flex;overflow-y:auto;max-height:100%;width:80%;flex-wrap:wrap}.base .dropdown-container .dropdown-header .selected-option-container .selected-tag{display:flex;align-items:center;justify-content:space-between;gap:.2em;background-color:#25c7bc;color:#374151;font-size:.85em;border-radius:.375em;padding:.25em .01em .25em .5em;margin:2px;height:calc(var(--height) / 1.2)}.base .dropdown-container .dropdown-header .selected-option-container .selected-tag p{padding:.4em .05em .4em .4em}.base .dropdown-container .dropdown-header .selected-option-container .selected-tag.filter-tag{padding:.1em .01em .1em 1em;margin:2px;height:2em}.base .dropdown-container .dropdown-header .selected-option-container .selected-tag .remove-tag{align-self:flex-start;padding:.2em .4em;font-weight:700}.base .dropdown-container .dropdown-header .selected-option-container .selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151;font-size:.95em}.base .dropdown-container .dropdown-header .selected-option-container .selected-value.placeholder{color:#82828250}.base .dropdown-container .dropdown-header .dropdown-icons{display:flex;align-items:center;gap:8px;height:calc(var(--height) / 3)}.base .dropdown-container .dropdown-header .dropdown-icons .clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer;height:calc(var(--height) / 2)}.base .dropdown-container .dropdown-header .dropdown-icons .clear-icon:hover{color:#6b7280}.base .dropdown-container .dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:16em;overflow-y:auto;background-color:#fff;border:1px solid rgba(130,130,130,.2);border-radius:.375em;margin-top:4px;z-index:1000;box-shadow:0 4px 6px #0000001a}.base .dropdown-container .dropdown-options .filter-container{margin:.5em;padding:.5em;border-bottom:1px solid #e5e7eb;display:flex;justify-content:start;align-items:center;font-size:.85em;height:var(--height)}.base .dropdown-container .dropdown-options .filter-container .search-icon{width:1.2em;opacity:40%}.base .dropdown-container .dropdown-options .filter-container .search-icon svg{width:100%!important;height:auto;display:block}.base .dropdown-container .dropdown-options .filter-container .filter-input{padding:.3em;border-radius:.5em;border:none;color:#374151;font-size:1.3em}.base .dropdown-container .dropdown-options .filter-container .filter-input:focus,.base .dropdown-container .dropdown-options .filter-container .filter-input:active,.base .dropdown-container .dropdown-options .filter-container .filter-input:hover{border:none;outline:none}.base .dropdown-container .dropdown-options .options-list{padding:4px 0}.base .dropdown-container .dropdown-options .options-list .dropdown-option{padding:8px 16px;cursor:pointer;height:var(--height)}.base .dropdown-container .dropdown-options .options-list .dropdown-option .custom-checkbox{appearance:none;width:calc(var(--height) / 3.15);height:calc(var(--height) / 3.15);min-width:1.25em;min-height:1.25em;border:1.5px solid #9ca3af;border-radius:4px;background-color:#fff;display:inline-block;position:relative}.base .dropdown-container .dropdown-options .options-list .dropdown-option .custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.base .dropdown-container .dropdown-options .options-list .dropdown-option .custom-checkbox:checked:after{content:\"\";position:absolute;top:5%;left:30%;width:40%;height:80%;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.base .dropdown-container .dropdown-options .options-list .dropdown-option .custom-checkbox:focus{border-color:#25c7bc}.base .dropdown-container .dropdown-options .options-list .dropdown-option .option-label{flex:1}.base .dropdown-container .dropdown-options .options-list .dropdown-option{display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;transition:background-color .2s}.base .dropdown-container .dropdown-options .options-list .dropdown-option:hover{background-color:#e7f9f8}.base .dropdown-container .dropdown-options .options-list .dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.base .dropdown-container .dropdown-options .options-list .filter-design{flex-direction:row-reverse;justify-content:space-between}.base .dropdown-container .dropdown-options .options-list .no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.base .dropdown-container .dropdown-options .options-list .no-options{padding:12px 16px;color:#6b7280;font-style:italic;text-align:center}.ai-plan{border:1px solid #d1d1d1;border-radius:1.25em;padding:.75em 1.25em;height:5.625em;box-shadow:0 4px 7px #0000000d}.ai-plan.has-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.ai-plan .custom-label{font-size:.9em;text-overflow:ellipsis;text-wrap:nowrap;overflow:hidden;display:block;width:110%;line-height:1;font-size:.975em;color:#06203c99;margin-bottom:.5em;font-family:var(--FM-Light)}.ai-plan .dropdown-container{position:relative;width:100%}.ai-plan .dropdown-container .dropdown-error-container{position:absolute;top:160%;left:1.6em;width:100%}.ai-plan .dropdown-container .dropdown-error-container custom-app-error{pointer-events:none}.ai-plan .dropdown-container .dropdown-header{width:100%;padding:0;display:flex;align-items:center;justify-content:space-between;font-family:var(--FM-Bold);height:2.5em}.ai-plan .dropdown-container .dropdown-header.disabled{background-color:#f3f4f6!important}.ai-plan .dropdown-container .dropdown-header .selected-option-container{display:flex;overflow-x:auto;max-height:100%;width:90%;flex-wrap:nowrap;overflow-y:hidden}.ai-plan .dropdown-container .dropdown-header .selected-option-container .selected-tag{display:flex;align-items:center;justify-content:space-between;gap:.2em;background-color:#25c7bc;color:#374151;font-size:.85em;border-radius:.375em;padding:.25em .01em .25em .5em;margin:2px;height:calc(var(--height) / 1.2)}.ai-plan .dropdown-container .dropdown-header .selected-option-container .selected-tag p{padding:.4em .05em .4em .4em}.ai-plan .dropdown-container .dropdown-header .selected-option-container .selected-tag.filter-tag{padding:.1em .01em .1em 1em;margin:2px;height:2em}.ai-plan .dropdown-container .dropdown-header .selected-option-container .selected-tag .remove-tag{align-self:flex-start;padding:.2em .4em;font-weight:700}.ai-plan .dropdown-container .dropdown-header .selected-option-container .selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151;font-size:.95em}.ai-plan .dropdown-container .dropdown-header .selected-option-container .selected-value.placeholder{color:#82828250}.ai-plan .dropdown-container .dropdown-header .dropdown-icons{display:flex;align-items:center;gap:8px;height:calc(var(--height) / 3)}.ai-plan .dropdown-container .dropdown-header .dropdown-icons .clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer;height:calc(var(--height) / 2)}.ai-plan .dropdown-container .dropdown-header .dropdown-icons .clear-icon:hover{color:#6b7280}.ai-plan .dropdown-container .dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:16em;overflow-y:auto;background-color:#fff;border:1px solid rgba(130,130,130,.2);border-radius:.375em;margin-top:4px;z-index:1000;box-shadow:0 4px 6px #0000001a}.ai-plan .dropdown-container .dropdown-options .filter-container{margin:.5em;padding:.5em;border-bottom:1px solid #e5e7eb;display:flex;justify-content:start;align-items:center;font-size:.85em;height:var(--height)}.ai-plan .dropdown-container .dropdown-options .filter-container .search-icon{width:1.2em;opacity:40%}.ai-plan .dropdown-container .dropdown-options .filter-container .search-icon svg{width:100%!important;height:auto;display:block}.ai-plan .dropdown-container .dropdown-options .filter-container .filter-input{padding:.3em;border-radius:.5em;border:none;color:#374151;font-size:1.3em}.ai-plan .dropdown-container .dropdown-options .filter-container .filter-input:focus,.ai-plan .dropdown-container .dropdown-options .filter-container .filter-input:active,.ai-plan .dropdown-container .dropdown-options .filter-container .filter-input:hover{border:none;outline:none}.ai-plan .dropdown-container .dropdown-options .options-list{padding:4px 0}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option{padding:8px 16px;cursor:pointer;height:var(--height)}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option .custom-checkbox{appearance:none;width:calc(var(--height) / 3.15);height:calc(var(--height) / 3.15);min-width:1.25em;min-height:1.25em;border:1.5px solid #9ca3af;border-radius:4px;background-color:#fff;display:inline-block;position:relative}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option .custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option .custom-checkbox:checked:after{content:\"\";position:absolute;top:5%;left:30%;width:40%;height:80%;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option .custom-checkbox:focus{border-color:#25c7bc}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option .option-label{flex:1}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option{display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;transition:background-color .2s}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option:hover{background-color:#e7f9f8}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.ai-plan .dropdown-container .dropdown-options .options-list .filter-design{flex-direction:row-reverse;justify-content:space-between}.ai-plan .dropdown-container .dropdown-options .options-list .no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.ai-plan .dropdown-container .dropdown-options .options-list .no-options{padding:12px 16px;color:#6b7280;font-style:italic;text-align:center}\n"], dependencies: [{ kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name", "showErrors"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: DropdownsAnimationDirective, selector: "[DropdownAnimationObject]", inputs: ["DropdownAnimationObject"] }], animations: [dropdownAnimation] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomMultiSelectFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-multi-select-form', standalone: true, imports: [
                        NgStyle,
                        FormsModule,
                        ReactiveFormsModule,
                        ClickOutsideDirective,
                        CustomAppErrorComponent,
                        NgClass,
                        DropdownsAnimationDirective,
                    ], animations: [dropdownAnimation], template: "<div\n  style=\"width: 100%; font-size: 1em\"\n  [formGroup]=\"parentForm\"\n  [ngStyle]=\"{ '--height': height }\"\n  [class]=\"viewType\"\n  [class.has-error]=\"\n    parentForm.controls[controlName].invalid &&\n    parentForm.controls[controlName].touched\n  \"\n  [class.disabled]=\"disabled\"\n>\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\" [title]=\"label\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\">*</span>\n    } @else{\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n  <div\n    [class]=\"'dropdown-container ' + dropdownContainerClass\"\n    [class.disabled]=\"disabled\"\n  >\n    <div class=\"dropdown-error-container\">\n      <custom-app-error\n        [control]=\"parentForm.controls[controlName]\"\n        [validation]=\"validation\"\n        [name]=\"name\"\n      />\n    </div>\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      (click)=\"!disabled && toggleDropdown()\"\n      [style.cursor]=\"disabled ? 'not-allowed' : 'pointer'\"\n      [class.disabled]=\"disabled\"\n      [class.has-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched\n      \"\n    >\n      <div class=\"selected-option-container\">\n        @if (selectedOptions.length > 0) { @for (opt of selectedOptions; track\n        opt){\n        <span class=\"selected-tag\" [ngClass]=\"{ 'filter-tag': filterDesign }\">\n          <p style=\"color: #fff\">{{ opt.nameEn }}</p>\n          <span\n            class=\"remove-tag\"\n            (click)=\"\n              !disabled && $event.stopPropagation();\n              !disabled && toggleOptionSelection(opt)\n            \"\n            [style.cursor]=\"disabled ? 'not-allowed' : 'pointer'\"\n            [class.disabled]=\"disabled\"\n            ><svg\n              width=\"8\"\n              height=\"8\"\n              viewBox=\"0 0 8 8\"\n              fill=\"none\"\n              xmlns=\"http://www.w3.org/2000/svg\"\n            >\n              <g clip-path=\"url(#clip0_9203_8209)\">\n                <path\n                  d=\"M7.42843 0.571289L0.571289 7.42843\"\n                  stroke=\"white\"\n                  stroke-linecap=\"round\"\n                  stroke-linejoin=\"round\"\n                />\n                <path\n                  d=\"M0.571289 0.571289L7.42843 7.42843\"\n                  stroke=\"white\"\n                  stroke-linecap=\"round\"\n                  stroke-linejoin=\"round\"\n                />\n              </g>\n              <defs>\n                <clipPath id=\"clip0_9203_8209\">\n                  <rect width=\"8\" height=\"8\" fill=\"white\" />\n                </clipPath>\n              </defs>\n            </svg>\n          </span>\n        </span>\n        } } @else {\n        <span class=\"selected-value placeholder\">\n          {{ placeholder }}\n        </span>\n        }\n      </div>\n      <div class=\"dropdown-icons\">\n        @if(!disabled && selectedOptions.length > 0 && showClear){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"inherit\"\n            height=\"inherit\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#999999\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#999999\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n          </svg>\n        </span>\n        }\n        <svg\n          style=\"min-height: 12px\"\n          width=\"inherit\"\n          height=\"inherit\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#999999\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen){\n    <div\n      #dropdownOptionsMultiSelectForm\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptionsMultiSelectForm\"\n      (clickOutsideEmitter)=\"closeDropdown()\"\n      [DropdownAnimationObject]=\"isOpen\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <div class=\"search-icon\">\n          <svg\n            width=\"inherit\"\n            height=\"inherit\"\n            viewBox=\"0 0 18 18\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M8.45536 15.3748C12.1718 15.3748 15.1845 12.3621 15.1845 8.64567C15.1845 4.92925 12.1718 1.9165 8.45536 1.9165C4.73895 1.9165 1.7262 4.92925 1.7262 8.64567C1.7262 12.3621 4.73895 15.3748 8.45536 15.3748Z\"\n              stroke=\"#292D32\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n            <path\n              d=\"M15.8929 16.0832L14.4762 14.6665\"\n              stroke=\"#292D32\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </svg>\n        </div>\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Search\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n        />\n      </div>\n      }\n\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <label\n          class=\"dropdown-option\"\n          [ngClass]=\"{ 'filter-design': filterDesign }\"\n        >\n          <input\n            type=\"checkbox\"\n            class=\"custom-checkbox\"\n            [checked]=\"isSelected(option.id)\"\n            (change)=\"toggleOptionSelection(option)\"\n          />\n          <span class=\"option-label\">{{ option.nameEn }}</span>\n        </label>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n\n  <input\n    type=\"hidden\"\n    [id]=\"label\"\n    [name]=\"name\"\n    [formControlName]=\"controlName\"\n  />\n</div>\n\n<!--  -->\n", styles: [".base .custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.base .dropdown-container{position:relative;width:100%}.base .dropdown-container .dropdown-error-container{position:absolute;top:100%;left:.7em;width:100%}.base .dropdown-container .dropdown-error-container custom-app-error{pointer-events:none}.base .dropdown-container .dropdown-header{height:var(--height);width:100%;border-radius:.375em;border:1px solid rgba(130,130,130,.2);padding:0 1em;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.base .dropdown-container .dropdown-header.has-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.base .dropdown-container .dropdown-header.disabled{background-color:#f3f3f3!important}.base .dropdown-container .dropdown-header .selected-option-container{display:flex;overflow-y:auto;max-height:100%;width:80%;flex-wrap:wrap}.base .dropdown-container .dropdown-header .selected-option-container .selected-tag{display:flex;align-items:center;justify-content:space-between;gap:.2em;background-color:#25c7bc;color:#374151;font-size:.85em;border-radius:.375em;padding:.25em .01em .25em .5em;margin:2px;height:calc(var(--height) / 1.2)}.base .dropdown-container .dropdown-header .selected-option-container .selected-tag p{padding:.4em .05em .4em .4em}.base .dropdown-container .dropdown-header .selected-option-container .selected-tag.filter-tag{padding:.1em .01em .1em 1em;margin:2px;height:2em}.base .dropdown-container .dropdown-header .selected-option-container .selected-tag .remove-tag{align-self:flex-start;padding:.2em .4em;font-weight:700}.base .dropdown-container .dropdown-header .selected-option-container .selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151;font-size:.95em}.base .dropdown-container .dropdown-header .selected-option-container .selected-value.placeholder{color:#82828250}.base .dropdown-container .dropdown-header .dropdown-icons{display:flex;align-items:center;gap:8px;height:calc(var(--height) / 3)}.base .dropdown-container .dropdown-header .dropdown-icons .clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer;height:calc(var(--height) / 2)}.base .dropdown-container .dropdown-header .dropdown-icons .clear-icon:hover{color:#6b7280}.base .dropdown-container .dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:16em;overflow-y:auto;background-color:#fff;border:1px solid rgba(130,130,130,.2);border-radius:.375em;margin-top:4px;z-index:1000;box-shadow:0 4px 6px #0000001a}.base .dropdown-container .dropdown-options .filter-container{margin:.5em;padding:.5em;border-bottom:1px solid #e5e7eb;display:flex;justify-content:start;align-items:center;font-size:.85em;height:var(--height)}.base .dropdown-container .dropdown-options .filter-container .search-icon{width:1.2em;opacity:40%}.base .dropdown-container .dropdown-options .filter-container .search-icon svg{width:100%!important;height:auto;display:block}.base .dropdown-container .dropdown-options .filter-container .filter-input{padding:.3em;border-radius:.5em;border:none;color:#374151;font-size:1.3em}.base .dropdown-container .dropdown-options .filter-container .filter-input:focus,.base .dropdown-container .dropdown-options .filter-container .filter-input:active,.base .dropdown-container .dropdown-options .filter-container .filter-input:hover{border:none;outline:none}.base .dropdown-container .dropdown-options .options-list{padding:4px 0}.base .dropdown-container .dropdown-options .options-list .dropdown-option{padding:8px 16px;cursor:pointer;height:var(--height)}.base .dropdown-container .dropdown-options .options-list .dropdown-option .custom-checkbox{appearance:none;width:calc(var(--height) / 3.15);height:calc(var(--height) / 3.15);min-width:1.25em;min-height:1.25em;border:1.5px solid #9ca3af;border-radius:4px;background-color:#fff;display:inline-block;position:relative}.base .dropdown-container .dropdown-options .options-list .dropdown-option .custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.base .dropdown-container .dropdown-options .options-list .dropdown-option .custom-checkbox:checked:after{content:\"\";position:absolute;top:5%;left:30%;width:40%;height:80%;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.base .dropdown-container .dropdown-options .options-list .dropdown-option .custom-checkbox:focus{border-color:#25c7bc}.base .dropdown-container .dropdown-options .options-list .dropdown-option .option-label{flex:1}.base .dropdown-container .dropdown-options .options-list .dropdown-option{display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;transition:background-color .2s}.base .dropdown-container .dropdown-options .options-list .dropdown-option:hover{background-color:#e7f9f8}.base .dropdown-container .dropdown-options .options-list .dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.base .dropdown-container .dropdown-options .options-list .filter-design{flex-direction:row-reverse;justify-content:space-between}.base .dropdown-container .dropdown-options .options-list .no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.base .dropdown-container .dropdown-options .options-list .no-options{padding:12px 16px;color:#6b7280;font-style:italic;text-align:center}.ai-plan{border:1px solid #d1d1d1;border-radius:1.25em;padding:.75em 1.25em;height:5.625em;box-shadow:0 4px 7px #0000000d}.ai-plan.has-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.ai-plan .custom-label{font-size:.9em;text-overflow:ellipsis;text-wrap:nowrap;overflow:hidden;display:block;width:110%;line-height:1;font-size:.975em;color:#06203c99;margin-bottom:.5em;font-family:var(--FM-Light)}.ai-plan .dropdown-container{position:relative;width:100%}.ai-plan .dropdown-container .dropdown-error-container{position:absolute;top:160%;left:1.6em;width:100%}.ai-plan .dropdown-container .dropdown-error-container custom-app-error{pointer-events:none}.ai-plan .dropdown-container .dropdown-header{width:100%;padding:0;display:flex;align-items:center;justify-content:space-between;font-family:var(--FM-Bold);height:2.5em}.ai-plan .dropdown-container .dropdown-header.disabled{background-color:#f3f4f6!important}.ai-plan .dropdown-container .dropdown-header .selected-option-container{display:flex;overflow-x:auto;max-height:100%;width:90%;flex-wrap:nowrap;overflow-y:hidden}.ai-plan .dropdown-container .dropdown-header .selected-option-container .selected-tag{display:flex;align-items:center;justify-content:space-between;gap:.2em;background-color:#25c7bc;color:#374151;font-size:.85em;border-radius:.375em;padding:.25em .01em .25em .5em;margin:2px;height:calc(var(--height) / 1.2)}.ai-plan .dropdown-container .dropdown-header .selected-option-container .selected-tag p{padding:.4em .05em .4em .4em}.ai-plan .dropdown-container .dropdown-header .selected-option-container .selected-tag.filter-tag{padding:.1em .01em .1em 1em;margin:2px;height:2em}.ai-plan .dropdown-container .dropdown-header .selected-option-container .selected-tag .remove-tag{align-self:flex-start;padding:.2em .4em;font-weight:700}.ai-plan .dropdown-container .dropdown-header .selected-option-container .selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151;font-size:.95em}.ai-plan .dropdown-container .dropdown-header .selected-option-container .selected-value.placeholder{color:#82828250}.ai-plan .dropdown-container .dropdown-header .dropdown-icons{display:flex;align-items:center;gap:8px;height:calc(var(--height) / 3)}.ai-plan .dropdown-container .dropdown-header .dropdown-icons .clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer;height:calc(var(--height) / 2)}.ai-plan .dropdown-container .dropdown-header .dropdown-icons .clear-icon:hover{color:#6b7280}.ai-plan .dropdown-container .dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:16em;overflow-y:auto;background-color:#fff;border:1px solid rgba(130,130,130,.2);border-radius:.375em;margin-top:4px;z-index:1000;box-shadow:0 4px 6px #0000001a}.ai-plan .dropdown-container .dropdown-options .filter-container{margin:.5em;padding:.5em;border-bottom:1px solid #e5e7eb;display:flex;justify-content:start;align-items:center;font-size:.85em;height:var(--height)}.ai-plan .dropdown-container .dropdown-options .filter-container .search-icon{width:1.2em;opacity:40%}.ai-plan .dropdown-container .dropdown-options .filter-container .search-icon svg{width:100%!important;height:auto;display:block}.ai-plan .dropdown-container .dropdown-options .filter-container .filter-input{padding:.3em;border-radius:.5em;border:none;color:#374151;font-size:1.3em}.ai-plan .dropdown-container .dropdown-options .filter-container .filter-input:focus,.ai-plan .dropdown-container .dropdown-options .filter-container .filter-input:active,.ai-plan .dropdown-container .dropdown-options .filter-container .filter-input:hover{border:none;outline:none}.ai-plan .dropdown-container .dropdown-options .options-list{padding:4px 0}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option{padding:8px 16px;cursor:pointer;height:var(--height)}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option .custom-checkbox{appearance:none;width:calc(var(--height) / 3.15);height:calc(var(--height) / 3.15);min-width:1.25em;min-height:1.25em;border:1.5px solid #9ca3af;border-radius:4px;background-color:#fff;display:inline-block;position:relative}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option .custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option .custom-checkbox:checked:after{content:\"\";position:absolute;top:5%;left:30%;width:40%;height:80%;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option .custom-checkbox:focus{border-color:#25c7bc}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option .option-label{flex:1}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option{display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;transition:background-color .2s}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option:hover{background-color:#e7f9f8}.ai-plan .dropdown-container .dropdown-options .options-list .dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.ai-plan .dropdown-container .dropdown-options .options-list .filter-design{flex-direction:row-reverse;justify-content:space-between}.ai-plan .dropdown-container .dropdown-options .options-list .no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.ai-plan .dropdown-container .dropdown-options .options-list .no-options{padding:12px 16px;color:#6b7280;font-style:italic;text-align:center}\n"] }]
        }], propDecorators: { parentForm: [{
                type: Input,
                args: [{ required: true }]
            }], controlName: [{
                type: Input,
                args: [{ required: true }]
            }], label: [{
                type: Input
            }], labelClass: [{
                type: Input
            }], dropdownOptionsClass: [{
                type: Input
            }], dropdownHeaderClass: [{
                type: Input
            }], dropdownContainerClass: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], enableFilter: [{
                type: Input
            }], filterDesign: [{
                type: Input
            }], showClear: [{
                type: Input
            }], height: [{
                type: Input
            }], viewType: [{
                type: Input
            }], disabled: [{
                type: Input
            }], options: [{
                type: Input,
                args: [{ required: true }]
            }], name: [{
                type: Input,
                args: [{ required: true }]
            }], validation: [{
                type: Input,
                args: [{ required: true }]
            }], valueChange: [{
                type: Output
            }], reset: [{
                type: Input
            }] } });

class CustomPaginationComponent {
    maxVisiblePages = 10;
    set page(value) {
        this._page.set(value);
    }
    _page = signal(1); // local writable signal
    get page() {
        return this._page(); // expose signal-like access
    }
    pageSize = input(10);
    totalCount = input(0);
    pageChange = new EventEmitter();
    baseValue = 10;
    hideTotalCount = input(false);
    showPageSize = true;
    pageSizeOptions = computed(() => {
        // depends on baseValue only
        return Array.from({ length: 4 }, (_, i) => this.baseValue * Math.pow(2, i));
    });
    totalPageCount = computed(() => Math.ceil(this.totalCount() / this.pageSize()));
    totalPages = computed(() => {
        const pageCount = Math.ceil(this.totalCount() / this.pageSize());
        const pages = [];
        if (pageCount <= this.maxVisiblePages) {
            for (let i = 1; i <= pageCount; i++) {
                pages.push(i);
            }
        }
        else {
            const half = Math.floor(this.maxVisiblePages / 2);
            let start = Math.max(this.page - half, 1);
            let end = start + this.maxVisiblePages - 1;
            if (end > pageCount) {
                end = pageCount;
                start = Math.max(end - this.maxVisiblePages + 1, 1);
            }
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }
        return pages;
    });
    prevPage() {
        if (this.page > 1) {
            // this._page.set(this.page - 1);
            this.page--;
            // this.calculateTotalPages(); // 🟢 recalculate visible range
            this.pageChange.emit({
                page: this.page <= this.totalPageCount()
                    ? this.page
                    : this.totalPageCount(),
                pageSize: this.pageSize(),
            });
        }
    }
    nextPage() {
        const pageCount = Math.ceil(this.totalCount() / this.pageSize());
        if (this.page < pageCount) {
            this.page++;
            // this.calculateTotalPages(); // 🟢 update
            this.pageChange.emit({
                page: this.page <= this.totalPageCount()
                    ? this.page
                    : this.totalPageCount(),
                pageSize: this.pageSize(),
            });
        }
    }
    changePage(index) {
        this.page = index;
        // this.calculateTotalPages(); // 🟢 update visible pagination window
        this.pageChange.emit({
            page: this.page <= this.totalPageCount() ? this.page : this.totalPageCount(),
            pageSize: this.pageSize(),
        });
    }
    firstPage() {
        if (this.page > 1) {
            this.page = 1;
            // this.calculateTotalPages();
            this.pageChange.emit({
                page: this.page <= this.totalPageCount()
                    ? this.page
                    : this.totalPageCount(),
                pageSize: this.pageSize(),
            });
        }
    }
    lastPage() {
        const pageCount = Math.ceil(this.totalCount() / this.pageSize());
        if (this.page < pageCount) {
            this.page = pageCount;
            // this.calculateTotalPages();
            this.pageChange.emit({
                page: this.page <= this.totalPageCount()
                    ? this.page
                    : this.totalPageCount(),
                pageSize: this.pageSize(),
            });
        }
    }
    onPageSizeChange(event) {
        const selectElement = +event.target.value;
        const maxPageNum = Math.ceil(this.totalCount() / selectElement);
        this.pageChange.emit({
            page: this.page <= maxPageNum
                ? this.page >= 1
                    ? this.page
                    : 1
                : maxPageNum >= 1
                    ? maxPageNum
                    : 1,
            pageSize: selectElement,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomPaginationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomPaginationComponent, isStandalone: true, selector: "custom-pagination", inputs: { maxVisiblePages: { classPropertyName: "maxVisiblePages", publicName: "maxVisiblePages", isSignal: false, isRequired: false, transformFunction: null }, page: { classPropertyName: "page", publicName: "page", isSignal: false, isRequired: false, transformFunction: null }, pageSize: { classPropertyName: "pageSize", publicName: "pageSize", isSignal: true, isRequired: false, transformFunction: null }, totalCount: { classPropertyName: "totalCount", publicName: "totalCount", isSignal: true, isRequired: false, transformFunction: null }, baseValue: { classPropertyName: "baseValue", publicName: "baseValue", isSignal: false, isRequired: false, transformFunction: null }, hideTotalCount: { classPropertyName: "hideTotalCount", publicName: "hideTotalCount", isSignal: true, isRequired: false, transformFunction: null }, showPageSize: { classPropertyName: "showPageSize", publicName: "showPageSize", isSignal: false, isRequired: false, transformFunction: null } }, outputs: { pageChange: "pageChange" }, ngImport: i0, template: "<div class=\"pagination\">\n  @if(!hideTotalCount()) {\n\n  <p class=\"totalCount\">A total of {{ totalCount() }} data</p>\n  }\n\n  <div class=\"page-container\">\n    <!-- <div\n      class=\"page\"\n      (click)=\"firstPage()\"\n      [ngClass]=\"{ disabled: 1 === page }\"\n    >\n      <svg\n        width=\"10\"\n        height=\"8\"\n        viewBox=\"0 0 10 8\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          fill-rule=\"evenodd\"\n          clip-rule=\"evenodd\"\n          d=\"M9.63255 7.81586C9.40287 8.05473 9.02305 8.06218 8.78418 7.8325L5.18418 4.4325C5.06653 4.31938 5.00005 4.16321 5.00005 4C5.00005 3.83679 5.06653 3.68062 5.18418 3.5675L8.78418 0.1675C9.02304 -0.0621766 9.40287 -0.0547285 9.63255 0.184134C9.86222 0.422997 9.85478 0.802823 9.61591 1.0325L6.46571 4L9.61591 6.9675C9.85478 7.19718 9.86222 7.577 9.63255 7.81586ZM4.83255 7.81586C4.60287 8.05473 4.22305 8.06218 3.98418 7.8325L0.384182 4.4325C0.266534 4.31938 0.200047 4.16321 0.200047 4C0.200047 3.83679 0.266534 3.68062 0.384182 3.5675L3.98418 0.1675C4.22304 -0.0621762 4.60287 -0.0547281 4.83255 0.184134C5.06222 0.422997 5.05478 0.802823 4.81591 1.0325L1.66571 4L4.81591 6.9675C5.05478 7.19718 5.06222 7.577 4.83255 7.81586Z\"\n          fill=\"#595959\"\n        />\n      </svg>\n    </div> -->\n    <!-- @if(totalPages().length >= 2){ -->\n    <div\n      class=\"page\"\n      (click)=\"prevPage()\"\n      [ngClass]=\"{\n        disabled: 1 === (page <= totalPageCount() ? page : totalPageCount())\n      }\"\n    >\n      <svg\n        width=\"16\"\n        height=\"17\"\n        viewBox=\"0 0 16 17\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M10 12.0728L6 8.07275L10 4.07275\"\n          stroke=\"#595959\"\n          stroke-width=\"1.25\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n    </div>\n\n    @for(item of totalPages(); track item) {\n    <div\n      (click)=\"changePage(item)\"\n      class=\"page\"\n      [ngClass]=\"{\n        active: item === (page <= totalPageCount() ? page : totalPageCount())\n      }\"\n    >\n      {{ item }}\n    </div>\n\n    }\n    <div\n      class=\"page\"\n      (click)=\"nextPage()\"\n      [ngClass]=\"{\n        disabled:\n          totalPages().length ===\n          (page <= totalPageCount() ? page : totalPageCount())\n      }\"\n    >\n      <svg\n        width=\"17\"\n        height=\"17\"\n        viewBox=\"0 0 17 17\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M6.51001 12.0728L10.51 8.07275L6.51001 4.07275\"\n          stroke=\"#595959\"\n          stroke-width=\"1.25\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n    </div>\n    <!-- } -->\n    <!-- <div\n      class=\"page\"\n      (click)=\"lastPage()\"\n      [ngClass]=\"{ disabled: totalPages().length === page }\"\n    >\n      <svg\n        width=\"10\"\n        height=\"8\"\n        viewBox=\"0 0 10 8\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M0.384087 6.9675C0.145224 7.19718 0.137776 7.577 0.367452 7.81587C0.597128 8.05473 0.976954 8.06218 1.21582 7.8325L4.81582 4.4325C4.93347 4.31938 4.99995 4.16321 4.99995 4C4.99995 3.83679 4.93347 3.68062 4.81582 3.5675L1.21582 0.167501C0.976954 -0.0621752 0.597128 -0.0547274 0.367452 0.184135C0.137776 0.422999 0.145224 0.802824 0.384087 1.0325L3.53429 4L0.384087 6.9675Z\"\n          fill=\"#595959\"\n        />\n        <path\n          d=\"M5.18409 6.9675C4.94522 7.19718 4.93778 7.577 5.16745 7.81587C5.39713 8.05473 5.77695 8.06218 6.01582 7.8325L9.61582 4.4325C9.73347 4.31938 9.79995 4.16321 9.79995 4C9.79995 3.83679 9.73347 3.68062 9.61582 3.5675L6.01582 0.167501C5.77695 -0.0621752 5.39713 -0.0547274 5.16745 0.184135C4.93778 0.422999 4.94522 0.802824 5.18409 1.0325L8.33429 4L5.18409 6.9675Z\"\n          fill=\"#595959\"\n        />\n      </svg>\n    </div> -->\n    @if(showPageSize) {\n    <div class=\"pageSize\">\n      <select\n        class=\"pageSizeSelect\"\n        [ngModel]=\"pageSize()\"\n        (change)=\"onPageSizeChange($event)\"\n      >\n        @for(option of pageSizeOptions(); track option){\n        <option [value]=\"option\">{{ option }} Items / Page</option>\n        }\n      </select>\n    </div>\n    }\n  </div>\n</div>\n", styles: [".pagination{display:flex;justify-content:space-between;align-items:center;width:100%;max-height:50px;margin:5px 0;padding:0 10px 0 0}.totalCount{font-size:.875em;color:#595959;font-weight:500}.page-container{display:flex;align-items:center;gap:.2em;max-height:50px}.page{width:2.4rem;height:2.4rem;max-width:2.4rem;max-height:2.4rem;border-radius:.3em;border:1px solid rgba(217,217,217,1);color:#595959;font-size:.8em;font-weight:500;display:flex;justify-content:center;align-items:center;cursor:pointer}.page.active{border:1px solid #602450;background-color:#6024502e}.page.disabled{border:1px solid #d9d9d9;background-color:#f2f2f2;cursor:auto}.pageSizeSelect{height:2.4rem;border-radius:.3em;border:1px solid rgba(217,217,217,1);color:#595959;font-size:.8em;font-weight:500;display:flex;justify-content:center;align-items:center;cursor:pointer;padding:0 5px}select:focus-visible{outline:none;border:1px solid rgba(217,217,217,1)}.pageSizeSelect:focus-visible{outline:none;border:1px solid rgba(217,217,217,1)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1$1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1$1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomPaginationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-pagination', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"pagination\">\n  @if(!hideTotalCount()) {\n\n  <p class=\"totalCount\">A total of {{ totalCount() }} data</p>\n  }\n\n  <div class=\"page-container\">\n    <!-- <div\n      class=\"page\"\n      (click)=\"firstPage()\"\n      [ngClass]=\"{ disabled: 1 === page }\"\n    >\n      <svg\n        width=\"10\"\n        height=\"8\"\n        viewBox=\"0 0 10 8\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          fill-rule=\"evenodd\"\n          clip-rule=\"evenodd\"\n          d=\"M9.63255 7.81586C9.40287 8.05473 9.02305 8.06218 8.78418 7.8325L5.18418 4.4325C5.06653 4.31938 5.00005 4.16321 5.00005 4C5.00005 3.83679 5.06653 3.68062 5.18418 3.5675L8.78418 0.1675C9.02304 -0.0621766 9.40287 -0.0547285 9.63255 0.184134C9.86222 0.422997 9.85478 0.802823 9.61591 1.0325L6.46571 4L9.61591 6.9675C9.85478 7.19718 9.86222 7.577 9.63255 7.81586ZM4.83255 7.81586C4.60287 8.05473 4.22305 8.06218 3.98418 7.8325L0.384182 4.4325C0.266534 4.31938 0.200047 4.16321 0.200047 4C0.200047 3.83679 0.266534 3.68062 0.384182 3.5675L3.98418 0.1675C4.22304 -0.0621762 4.60287 -0.0547281 4.83255 0.184134C5.06222 0.422997 5.05478 0.802823 4.81591 1.0325L1.66571 4L4.81591 6.9675C5.05478 7.19718 5.06222 7.577 4.83255 7.81586Z\"\n          fill=\"#595959\"\n        />\n      </svg>\n    </div> -->\n    <!-- @if(totalPages().length >= 2){ -->\n    <div\n      class=\"page\"\n      (click)=\"prevPage()\"\n      [ngClass]=\"{\n        disabled: 1 === (page <= totalPageCount() ? page : totalPageCount())\n      }\"\n    >\n      <svg\n        width=\"16\"\n        height=\"17\"\n        viewBox=\"0 0 16 17\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M10 12.0728L6 8.07275L10 4.07275\"\n          stroke=\"#595959\"\n          stroke-width=\"1.25\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n    </div>\n\n    @for(item of totalPages(); track item) {\n    <div\n      (click)=\"changePage(item)\"\n      class=\"page\"\n      [ngClass]=\"{\n        active: item === (page <= totalPageCount() ? page : totalPageCount())\n      }\"\n    >\n      {{ item }}\n    </div>\n\n    }\n    <div\n      class=\"page\"\n      (click)=\"nextPage()\"\n      [ngClass]=\"{\n        disabled:\n          totalPages().length ===\n          (page <= totalPageCount() ? page : totalPageCount())\n      }\"\n    >\n      <svg\n        width=\"17\"\n        height=\"17\"\n        viewBox=\"0 0 17 17\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M6.51001 12.0728L10.51 8.07275L6.51001 4.07275\"\n          stroke=\"#595959\"\n          stroke-width=\"1.25\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n    </div>\n    <!-- } -->\n    <!-- <div\n      class=\"page\"\n      (click)=\"lastPage()\"\n      [ngClass]=\"{ disabled: totalPages().length === page }\"\n    >\n      <svg\n        width=\"10\"\n        height=\"8\"\n        viewBox=\"0 0 10 8\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M0.384087 6.9675C0.145224 7.19718 0.137776 7.577 0.367452 7.81587C0.597128 8.05473 0.976954 8.06218 1.21582 7.8325L4.81582 4.4325C4.93347 4.31938 4.99995 4.16321 4.99995 4C4.99995 3.83679 4.93347 3.68062 4.81582 3.5675L1.21582 0.167501C0.976954 -0.0621752 0.597128 -0.0547274 0.367452 0.184135C0.137776 0.422999 0.145224 0.802824 0.384087 1.0325L3.53429 4L0.384087 6.9675Z\"\n          fill=\"#595959\"\n        />\n        <path\n          d=\"M5.18409 6.9675C4.94522 7.19718 4.93778 7.577 5.16745 7.81587C5.39713 8.05473 5.77695 8.06218 6.01582 7.8325L9.61582 4.4325C9.73347 4.31938 9.79995 4.16321 9.79995 4C9.79995 3.83679 9.73347 3.68062 9.61582 3.5675L6.01582 0.167501C5.77695 -0.0621752 5.39713 -0.0547274 5.16745 0.184135C4.93778 0.422999 4.94522 0.802824 5.18409 1.0325L8.33429 4L5.18409 6.9675Z\"\n          fill=\"#595959\"\n        />\n      </svg>\n    </div> -->\n    @if(showPageSize) {\n    <div class=\"pageSize\">\n      <select\n        class=\"pageSizeSelect\"\n        [ngModel]=\"pageSize()\"\n        (change)=\"onPageSizeChange($event)\"\n      >\n        @for(option of pageSizeOptions(); track option){\n        <option [value]=\"option\">{{ option }} Items / Page</option>\n        }\n      </select>\n    </div>\n    }\n  </div>\n</div>\n", styles: [".pagination{display:flex;justify-content:space-between;align-items:center;width:100%;max-height:50px;margin:5px 0;padding:0 10px 0 0}.totalCount{font-size:.875em;color:#595959;font-weight:500}.page-container{display:flex;align-items:center;gap:.2em;max-height:50px}.page{width:2.4rem;height:2.4rem;max-width:2.4rem;max-height:2.4rem;border-radius:.3em;border:1px solid rgba(217,217,217,1);color:#595959;font-size:.8em;font-weight:500;display:flex;justify-content:center;align-items:center;cursor:pointer}.page.active{border:1px solid #602450;background-color:#6024502e}.page.disabled{border:1px solid #d9d9d9;background-color:#f2f2f2;cursor:auto}.pageSizeSelect{height:2.4rem;border-radius:.3em;border:1px solid rgba(217,217,217,1);color:#595959;font-size:.8em;font-weight:500;display:flex;justify-content:center;align-items:center;cursor:pointer;padding:0 5px}select:focus-visible{outline:none;border:1px solid rgba(217,217,217,1)}.pageSizeSelect:focus-visible{outline:none;border:1px solid rgba(217,217,217,1)}\n"] }]
        }], propDecorators: { maxVisiblePages: [{
                type: Input
            }], page: [{
                type: Input
            }], pageChange: [{
                type: Output
            }], baseValue: [{
                type: Input
            }], showPageSize: [{
                type: Input
            }] } });

class CustomPopUpComponent {
    popUpClass = '';
    message = '';
    icon = '';
    overlayClass = '';
    messageClass = '';
    iconClass = '';
    isOpen = false;
    onHide = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomPopUpComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomPopUpComponent, isStandalone: true, selector: "custom-pop-up", inputs: { popUpClass: "popUpClass", message: "message", icon: "icon", overlayClass: "overlayClass", messageClass: "messageClass", iconClass: "iconClass", isOpen: "isOpen" }, outputs: { onHide: "onHide" }, ngImport: i0, template: "@if(isOpen){\n<div [class]=\"'overlay ' + overlayClass\">\n  <!-- [class]=\"'custom-pop-up-container ' + popUpClass\" -->\n  <div\n    class=\"pop-up-container\"\n    #popUp\n    (click)=\"$event.stopPropagation()\"\n    [clickOutside]=\"popUp\"\n    (clickOutsideEmitter)=\"onHide.emit()\"\n    [DropdownAnimationObject]=\"isOpen\"\n  >\n    <!-- <img [src]=\"icon\" [class]=\"iconClass\" alt=\"\" />\n    <p [class]=\"'message ' + messageClass\">{{ message }}</p> -->\n    <ng-content></ng-content>\n  </div>\n</div>\n}\n", styles: [".overlay{position:fixed;inset:0;background-color:#000000b3;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:50;cursor:pointer}.custom-pop-up-container{width:38rem;border-radius:1rem;padding:5rem;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2rem}.message{font-size:1.2rem;color:#fff;font-weight:500;text-align:center}.pop-up-container{border-radius:.625em;overflow:hidden}\n"], dependencies: [{ kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "directive", type: DropdownsAnimationDirective, selector: "[DropdownAnimationObject]", inputs: ["DropdownAnimationObject"] }], animations: [dropdownAnimation] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomPopUpComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-pop-up', standalone: true, imports: [ClickOutsideDirective, DropdownsAnimationDirective], animations: [dropdownAnimation], template: "@if(isOpen){\n<div [class]=\"'overlay ' + overlayClass\">\n  <!-- [class]=\"'custom-pop-up-container ' + popUpClass\" -->\n  <div\n    class=\"pop-up-container\"\n    #popUp\n    (click)=\"$event.stopPropagation()\"\n    [clickOutside]=\"popUp\"\n    (clickOutsideEmitter)=\"onHide.emit()\"\n    [DropdownAnimationObject]=\"isOpen\"\n  >\n    <!-- <img [src]=\"icon\" [class]=\"iconClass\" alt=\"\" />\n    <p [class]=\"'message ' + messageClass\">{{ message }}</p> -->\n    <ng-content></ng-content>\n  </div>\n</div>\n}\n", styles: [".overlay{position:fixed;inset:0;background-color:#000000b3;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:50;cursor:pointer}.custom-pop-up-container{width:38rem;border-radius:1rem;padding:5rem;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2rem}.message{font-size:1.2rem;color:#fff;font-weight:500;text-align:center}.pop-up-container{border-radius:.625em;overflow:hidden}\n"] }]
        }], propDecorators: { popUpClass: [{
                type: Input
            }], message: [{
                type: Input
            }], icon: [{
                type: Input
            }], overlayClass: [{
                type: Input
            }], messageClass: [{
                type: Input
            }], iconClass: [{
                type: Input
            }], isOpen: [{
                type: Input,
                args: [{ required: true }]
            }], onHide: [{
                type: Output
            }] } });

class OverlayManagerService {
    currentlyOpen = null;
    register(panel) {
        if (this.currentlyOpen && this.currentlyOpen !== panel) {
            this.currentlyOpen.closeDropdown();
        }
        this.currentlyOpen = panel;
    }
    unregister(panel) {
        if (this.currentlyOpen === panel) {
            this.currentlyOpen = null;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: OverlayManagerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: OverlayManagerService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: OverlayManagerService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class OverlayPanelComponent {
    overlayManager;
    overlayClass = '';
    expandSide = 'RIGHT';
    minWidth = '15em';
    targetTemplate;
    overlayTemplate;
    isOpen = false;
    isNearTop = false;
    isNearBottom = false;
    constructor(overlayManager) {
        this.overlayManager = overlayManager;
    }
    toggleDropdown(event, triggerEl) {
        event.stopPropagation();
        if (!this.isOpen) {
            this.overlayManager.register(this);
            this.isOpen = true;
            this.detectVerticalPosition(triggerEl);
        }
        else {
            this.closeDropdown();
        }
    }
    closeDropdown() {
        this.isOpen = false;
        this.overlayManager.unregister(this);
    }
    detectVerticalPosition(triggerEl) {
        const hoveredRect = triggerEl.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const distanceFromTop = hoveredRect.top;
        const distanceFromBottom = viewportHeight - hoveredRect.bottom;
        const threshold = 250;
        if (distanceFromTop < threshold) {
            this.isNearTop = true;
            this.isNearBottom = false;
        }
        else if (distanceFromBottom < threshold) {
            this.isNearBottom = true;
            this.isNearTop = false;
        }
        else {
            this.isNearTop = false;
            this.isNearBottom = false;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: OverlayPanelComponent, deps: [{ token: OverlayManagerService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: OverlayPanelComponent, isStandalone: true, selector: "overlay-panel", inputs: { overlayClass: "overlayClass", expandSide: "expandSide", minWidth: "minWidth" }, queries: [{ propertyName: "targetTemplate", first: true, predicate: ["target"], descendants: true }, { propertyName: "overlayTemplate", first: true, predicate: ["overlay"], descendants: true }], ngImport: i0, template: "<div class=\"overlay-container\" [style]=\"{ '--min-width': minWidth }\">\n  <div #trigger (click)=\"toggleDropdown($event, trigger)\">\n    <ng-container *ngIf=\"targetTemplate\">\n      <ng-container *ngTemplateOutlet=\"targetTemplate\"></ng-container>\n    </ng-container>\n  </div>\n\n  @if (isOpen) {\n    <div\n      #overlayPanel\n      class=\"overlay\"\n      [class.show]=\"isOpen\"\n      [class.right]=\"expandSide === 'RIGHT'\"\n      [class.left]=\"expandSide === 'LEFT'\"\n      [class.popup-above]=\"isNearBottom\"\n      [class.popup-below]=\"isNearTop || !isNearBottom\"\n      [class]=\"overlayClass\"\n      [clickOutside]=\"overlayPanel\"\n      (clickOutsideEmitter)=\"closeDropdown()\"\n      [DropdownAnimationObject]=\"isOpen\"\n    >\n      <ng-container *ngIf=\"overlayTemplate\">\n        <ng-container *ngTemplateOutlet=\"overlayTemplate\"></ng-container>\n      </ng-container>\n    </div>\n  }\n</div>\n", styles: [".overlay-container{position:relative;display:inline-block}.overlay{position:absolute;min-width:var(--min-width, 15em);max-height:60vh;background-color:#fff;border-radius:.625em;z-index:10000000;box-shadow:0 0 4px #0000001a;opacity:0;transform:translateY(-10px);pointer-events:none;transition:opacity .2s ease,transform .2s ease;overflow:hidden;padding-block:.2em}.overlay.show{opacity:1;transform:translateY(0);pointer-events:auto}.overlay.right{right:0;left:auto}.overlay.left{left:0;right:auto}.overlay.popup-below{top:100%;margin-top:.4em}.overlay.popup-above{bottom:100%;margin-bottom:.4em}\n"], dependencies: [{ kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: DropdownsAnimationDirective, selector: "[DropdownAnimationObject]", inputs: ["DropdownAnimationObject"] }], animations: [dropdownAnimation] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: OverlayPanelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'overlay-panel', imports: [ClickOutsideDirective, CommonModule, DropdownsAnimationDirective], animations: [dropdownAnimation], template: "<div class=\"overlay-container\" [style]=\"{ '--min-width': minWidth }\">\n  <div #trigger (click)=\"toggleDropdown($event, trigger)\">\n    <ng-container *ngIf=\"targetTemplate\">\n      <ng-container *ngTemplateOutlet=\"targetTemplate\"></ng-container>\n    </ng-container>\n  </div>\n\n  @if (isOpen) {\n    <div\n      #overlayPanel\n      class=\"overlay\"\n      [class.show]=\"isOpen\"\n      [class.right]=\"expandSide === 'RIGHT'\"\n      [class.left]=\"expandSide === 'LEFT'\"\n      [class.popup-above]=\"isNearBottom\"\n      [class.popup-below]=\"isNearTop || !isNearBottom\"\n      [class]=\"overlayClass\"\n      [clickOutside]=\"overlayPanel\"\n      (clickOutsideEmitter)=\"closeDropdown()\"\n      [DropdownAnimationObject]=\"isOpen\"\n    >\n      <ng-container *ngIf=\"overlayTemplate\">\n        <ng-container *ngTemplateOutlet=\"overlayTemplate\"></ng-container>\n      </ng-container>\n    </div>\n  }\n</div>\n", styles: [".overlay-container{position:relative;display:inline-block}.overlay{position:absolute;min-width:var(--min-width, 15em);max-height:60vh;background-color:#fff;border-radius:.625em;z-index:10000000;box-shadow:0 0 4px #0000001a;opacity:0;transform:translateY(-10px);pointer-events:none;transition:opacity .2s ease,transform .2s ease;overflow:hidden;padding-block:.2em}.overlay.show{opacity:1;transform:translateY(0);pointer-events:auto}.overlay.right{right:0;left:auto}.overlay.left{left:0;right:auto}.overlay.popup-below{top:100%;margin-top:.4em}.overlay.popup-above{bottom:100%;margin-bottom:.4em}\n"] }]
        }], ctorParameters: () => [{ type: OverlayManagerService }], propDecorators: { overlayClass: [{
                type: Input
            }], expandSide: [{
                type: Input
            }], minWidth: [{
                type: Input
            }], targetTemplate: [{
                type: ContentChild,
                args: ['target']
            }], overlayTemplate: [{
                type: ContentChild,
                args: ['overlay']
            }] } });

class CustomActionsDropdownComponent {
    sanitizer;
    menuPosition = {
        top: 0,
        left: 0,
    };
    actions = [];
    hoverEffect = false;
    context;
    horizontalDots = false;
    isOpen = false;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    sanitizeSvg(svg) {
        return this.sanitizer.bypassSecurityTrustHtml(svg);
    }
    openDropdown(triggerEl) {
        this.isOpen = true;
        requestAnimationFrame(() => {
            const rect = triggerEl.getBoundingClientRect();
            this.menuPosition = {
                top: rect.bottom,
                left: rect.right - 100,
            };
        });
    }
    toggleDropdown(triggerEl) {
        if (this.isOpen) {
            this.closeDropdown();
        }
        else {
            this.openDropdown(triggerEl);
        }
    }
    closeDropdown() {
        this.isOpen = false;
    }
    onClickAction(action, event) {
        event.stopPropagation();
        action.callback(this.context);
        this.closeDropdown();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomActionsDropdownComponent, deps: [{ token: i1$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomActionsDropdownComponent, isStandalone: true, selector: "custom-actions-dropdown", inputs: { actions: "actions", hoverEffect: "hoverEffect", context: "context", horizontalDots: "horizontalDots" }, ngImport: i0, template: "<div\n  class=\"action-dropdown\"\n  #trigger\n  (click)=\"\n    $event.stopPropagation();\n    $event.stopImmediatePropagation();\n    toggleDropdown(trigger)\n  \"\n>\n  <!-- #clickOutsideParent\n[clickOutside]=\"clickOutsideParent\"\n(clickOutsideEmitter)=\"closeDropdown()\" -->\n  <!--  -->\n  <!--  -->\n\n  <overlay-panel [minWidth]=\"'8em'\" #dropdownActionOverlay>\n    <ng-template #target>\n      @if (horizontalDots) {\n        <div class=\"horizontal-dots\">\n          <svg\n            width=\"20\"\n            height=\"5\"\n            viewBox=\"0 0 20 5\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M19.1616 2.70166C19.1616 1.60166 18.2455 0.70166 17.1257 0.70166C16.0059 0.70166 15.0898 1.60166 15.0898 2.70166C15.0898 3.80166 16.0059 4.70166 17.1257 4.70166C18.2455 4.70166 19.1616 3.80166 19.1616 2.70166ZM4.91012 2.70166C4.91012 1.60166 3.99396 0.701661 2.8742 0.701661C1.75444 0.701661 0.838268 1.60166 0.838268 2.70166C0.838268 3.80166 1.75444 4.70166 2.8742 4.70166C3.99396 4.70166 4.91012 3.80166 4.91012 2.70166ZM12.0359 2.70166C12.0359 1.60166 11.1197 0.701661 9.99994 0.701661C8.88018 0.701661 7.96402 1.60166 7.96402 2.70166C7.96402 3.80166 8.88018 4.70166 9.99994 4.70166C11.1197 4.70166 12.0359 3.80166 12.0359 2.70166Z\"\n              fill=\"#06213D\"\n            />\n          </svg>\n        </div>\n      } @else {\n        <div class=\"mutlti-action-icon icon-wrapper\">\n          <svg\n            xmlns=\"http://www.w3.org/2000/svg\"\n            width=\"auto\"\n            height=\"auto\"\n            viewBox=\"0 0 4 12\"\n            fill=\"none\"\n          >\n            <path\n              d=\"M0.666707 1.33333C0.666707 2.06971 1.26366 2.66667 2.00004 2.66667C2.73642 2.66667 3.33337 2.06971 3.33337 1.33333C3.33337 0.596954 2.73642 -2.60937e-08 2.00004 -5.82819e-08C1.26366 -9.047e-08 0.666707 0.596954 0.666707 1.33333Z\"\n              fill=\"#8E8E8E\"\n            />\n            <path\n              d=\"M2.00004 7.33333C1.26366 7.33333 0.666707 6.73638 0.666707 6C0.666707 5.26362 1.26366 4.66667 2.00004 4.66667C2.73642 4.66667 3.33337 5.26362 3.33337 6C3.33337 6.73638 2.73642 7.33333 2.00004 7.33333Z\"\n              fill=\"#8E8E8E\"\n            />\n            <path\n              d=\"M2.00004 12C1.26366 12 0.666707 11.403 0.666707 10.6667C0.666707 9.93029 1.26366 9.33333 2.00004 9.33333C2.73642 9.33333 3.33337 9.93029 3.33337 10.6667C3.33337 11.403 2.73642 12 2.00004 12Z\"\n              fill=\"#8E8E8E\"\n            />\n          </svg>\n        </div>\n      }\n    </ng-template>\n    <ng-template #overlay>\n      @if (actions.length > 0) {\n        <!-- [style.top.px]=\"menuPosition.top\"\n    [style.right.px]=\"menuPosition.left\" -->\n        <ul>\n          @for (action of actions; track $index) {\n            <li class=\"dropdown-item\" (click)=\"onClickAction(action, $event)\">\n              @if (action.icon) {\n                <span\n                  [class]=\"'action-icon-inline ' + action.class\"\n                  [innerHTML]=\"sanitizeSvg(action.icon)\"\n                ></span>\n              }\n              <p [class]=\"'action-label ' + action.class\">\n                {{ action.label }}\n              </p>\n            </li>\n          }\n        </ul>\n      }\n    </ng-template>\n  </overlay-panel>\n</div>\n", styles: [".action-dropdown{position:relative;display:inline-block;display:flex;align-items:center;justify-content:center;width:3em}.mutlti-action-icon{width:1.25em;height:1.25em;cursor:pointer;opacity:85%}.dropdown-menu{position:absolute;top:90%;inset-inline-end:2em;background-color:#fff;border:1px solid #d1d5db;box-shadow:0 4px 6px #0000001a;border-radius:.5em;z-index:999999999999999;padding:.25em 0;overflow:hidden}.dropdown-item{display:flex;align-items:center;padding:.5em .8em;font-size:.8em;cursor:pointer;transition:background-color .2s;color:#06213d;background-color:#fff;gap:.3em}.dropdown-item:hover{background-color:#f3f4f6}.action-icon-inline{display:inline-flex;align-items:center;justify-content:center;margin-inline-end:.5em;width:1.2em;height:1.2em}.action-icon-inline svg{width:100%;height:100%;fill:currentColor}.icon-wrapper{width:.3em;height:auto}.icon-wrapper svg{width:100%!important;height:auto;display:block}.action-label{text-wrap:nowrap}.horizontal-dots{width:1.25em;height:.9375em;opacity:70%;cursor:pointer}\n"], dependencies: [{ kind: "component", type: 
                // DropdownsAnimationDirective,
                // ClickOutsideDirective,
                OverlayPanelComponent, selector: "overlay-panel", inputs: ["overlayClass", "expandSide", "minWidth"] }], animations: [dropdownAnimation] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomActionsDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-actions-dropdown', imports: [
                        // DropdownsAnimationDirective,
                        // ClickOutsideDirective,
                        OverlayPanelComponent,
                    ], animations: [dropdownAnimation], template: "<div\n  class=\"action-dropdown\"\n  #trigger\n  (click)=\"\n    $event.stopPropagation();\n    $event.stopImmediatePropagation();\n    toggleDropdown(trigger)\n  \"\n>\n  <!-- #clickOutsideParent\n[clickOutside]=\"clickOutsideParent\"\n(clickOutsideEmitter)=\"closeDropdown()\" -->\n  <!--  -->\n  <!--  -->\n\n  <overlay-panel [minWidth]=\"'8em'\" #dropdownActionOverlay>\n    <ng-template #target>\n      @if (horizontalDots) {\n        <div class=\"horizontal-dots\">\n          <svg\n            width=\"20\"\n            height=\"5\"\n            viewBox=\"0 0 20 5\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M19.1616 2.70166C19.1616 1.60166 18.2455 0.70166 17.1257 0.70166C16.0059 0.70166 15.0898 1.60166 15.0898 2.70166C15.0898 3.80166 16.0059 4.70166 17.1257 4.70166C18.2455 4.70166 19.1616 3.80166 19.1616 2.70166ZM4.91012 2.70166C4.91012 1.60166 3.99396 0.701661 2.8742 0.701661C1.75444 0.701661 0.838268 1.60166 0.838268 2.70166C0.838268 3.80166 1.75444 4.70166 2.8742 4.70166C3.99396 4.70166 4.91012 3.80166 4.91012 2.70166ZM12.0359 2.70166C12.0359 1.60166 11.1197 0.701661 9.99994 0.701661C8.88018 0.701661 7.96402 1.60166 7.96402 2.70166C7.96402 3.80166 8.88018 4.70166 9.99994 4.70166C11.1197 4.70166 12.0359 3.80166 12.0359 2.70166Z\"\n              fill=\"#06213D\"\n            />\n          </svg>\n        </div>\n      } @else {\n        <div class=\"mutlti-action-icon icon-wrapper\">\n          <svg\n            xmlns=\"http://www.w3.org/2000/svg\"\n            width=\"auto\"\n            height=\"auto\"\n            viewBox=\"0 0 4 12\"\n            fill=\"none\"\n          >\n            <path\n              d=\"M0.666707 1.33333C0.666707 2.06971 1.26366 2.66667 2.00004 2.66667C2.73642 2.66667 3.33337 2.06971 3.33337 1.33333C3.33337 0.596954 2.73642 -2.60937e-08 2.00004 -5.82819e-08C1.26366 -9.047e-08 0.666707 0.596954 0.666707 1.33333Z\"\n              fill=\"#8E8E8E\"\n            />\n            <path\n              d=\"M2.00004 7.33333C1.26366 7.33333 0.666707 6.73638 0.666707 6C0.666707 5.26362 1.26366 4.66667 2.00004 4.66667C2.73642 4.66667 3.33337 5.26362 3.33337 6C3.33337 6.73638 2.73642 7.33333 2.00004 7.33333Z\"\n              fill=\"#8E8E8E\"\n            />\n            <path\n              d=\"M2.00004 12C1.26366 12 0.666707 11.403 0.666707 10.6667C0.666707 9.93029 1.26366 9.33333 2.00004 9.33333C2.73642 9.33333 3.33337 9.93029 3.33337 10.6667C3.33337 11.403 2.73642 12 2.00004 12Z\"\n              fill=\"#8E8E8E\"\n            />\n          </svg>\n        </div>\n      }\n    </ng-template>\n    <ng-template #overlay>\n      @if (actions.length > 0) {\n        <!-- [style.top.px]=\"menuPosition.top\"\n    [style.right.px]=\"menuPosition.left\" -->\n        <ul>\n          @for (action of actions; track $index) {\n            <li class=\"dropdown-item\" (click)=\"onClickAction(action, $event)\">\n              @if (action.icon) {\n                <span\n                  [class]=\"'action-icon-inline ' + action.class\"\n                  [innerHTML]=\"sanitizeSvg(action.icon)\"\n                ></span>\n              }\n              <p [class]=\"'action-label ' + action.class\">\n                {{ action.label }}\n              </p>\n            </li>\n          }\n        </ul>\n      }\n    </ng-template>\n  </overlay-panel>\n</div>\n", styles: [".action-dropdown{position:relative;display:inline-block;display:flex;align-items:center;justify-content:center;width:3em}.mutlti-action-icon{width:1.25em;height:1.25em;cursor:pointer;opacity:85%}.dropdown-menu{position:absolute;top:90%;inset-inline-end:2em;background-color:#fff;border:1px solid #d1d5db;box-shadow:0 4px 6px #0000001a;border-radius:.5em;z-index:999999999999999;padding:.25em 0;overflow:hidden}.dropdown-item{display:flex;align-items:center;padding:.5em .8em;font-size:.8em;cursor:pointer;transition:background-color .2s;color:#06213d;background-color:#fff;gap:.3em}.dropdown-item:hover{background-color:#f3f4f6}.action-icon-inline{display:inline-flex;align-items:center;justify-content:center;margin-inline-end:.5em;width:1.2em;height:1.2em}.action-icon-inline svg{width:100%;height:100%;fill:currentColor}.icon-wrapper{width:.3em;height:auto}.icon-wrapper svg{width:100%!important;height:auto;display:block}.action-label{text-wrap:nowrap}.horizontal-dots{width:1.25em;height:.9375em;opacity:70%;cursor:pointer}\n"] }]
        }], ctorParameters: () => [{ type: i1$2.DomSanitizer }], propDecorators: { actions: [{
                type: Input
            }], hoverEffect: [{
                type: Input
            }], context: [{
                type: Input
            }], horizontalDots: [{
                type: Input
            }] } });

const sortSvg = '<svg width="inherit" height="inherit" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.4"><path d="M1.53516 11.4792L5.6671 15.6112L9.79905 11.4792" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.53516 6.52086L5.6671 2.38892L9.79905 6.52086" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></g></svg>';
const actionViewSvg = '<svg width="auto" height="15" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0001 0.75C14.9429 0.75 19.055 4.30645 19.9172 9C19.055 13.6935 14.9429 17.25 10.0001 17.25C5.05728 17.25 0.945142 13.6935 0.0830078 9C0.945142 4.30645 5.05728 0.75 10.0001 0.75ZM10.0001 15.4167C13.8827 15.4167 17.2051 12.7143 18.0461 9C17.2051 5.28569 13.8827 2.58333 10.0001 2.58333C6.11739 2.58333 2.79504 5.28569 1.95405 9C2.79504 12.7143 6.11739 15.4167 10.0001 15.4167ZM10.0001 13.125C7.7219 13.125 5.87508 11.2782 5.87508 9C5.87508 6.72183 7.7219 4.875 10.0001 4.875C12.2782 4.875 14.1251 6.72183 14.1251 9C14.1251 11.2782 12.2782 13.125 10.0001 13.125ZM10.0001 11.2917C11.2658 11.2917 12.2918 10.2656 12.2918 9C12.2918 7.73436 11.2658 6.70833 10.0001 6.70833C8.73447 6.70833 7.70841 7.73436 7.70841 9C7.70841 10.2656 8.73447 11.2917 10.0001 11.2917Z" fill="#25C7BC"/></svg>';
const actionEditSvg = '<svg width="auto" height="15" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M13.6745 12.0231L14.7622 10.9354C14.9321 10.7654 15.2278 10.8844 15.2278 11.1291V16.0713C15.2278 16.9721 14.497 17.7029 13.5963 17.7029H1.63155C0.7308 17.7029 0 16.9721 0 16.0713V4.10663C0 3.20587 0.7308 2.47507 1.63155 2.47507H10.928C11.1693 2.47507 11.2917 2.76739 11.1218 2.94074L10.0341 4.02845C9.98307 4.07943 9.91508 4.10663 9.8403 4.10663H1.63155V16.0713H13.5963V12.2134C13.5963 12.142 13.6235 12.074 13.6745 12.0231ZM18.9974 5.16374L10.0714 14.0897L6.99868 14.4296C6.10813 14.5282 5.35013 13.777 5.44871 12.8796L5.78861 9.80686L14.7146 0.880909C15.493 0.102522 16.7506 0.102522 17.5256 0.880909L18.994 2.34931C19.7724 3.12769 19.7724 4.38875 18.9974 5.16374ZM15.6391 6.21405L13.6643 4.23919L7.34879 10.5581L7.10065 12.7777L9.32025 12.5295L15.6391 6.21405ZM17.8417 3.50499L16.3733 2.03659C16.234 1.89723 16.0062 1.89723 15.8703 2.03659L14.8199 3.0869L16.7948 5.06176L17.8451 4.01145C17.9811 3.86869 17.9811 3.64435 17.8417 3.50499Z" fill="#444A6D"/></g></svg>';
const actionDeleteSvg = '<svg width="auto" height="15" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8955_16606)"><path d="M15.0485 1.32129L1.69141 14.6784" stroke="#F43F5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.69141 1.32129L15.0485 14.6784" stroke="#F43F5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_8955_16606"><rect width="15.5833" height="15.5833" fill="white" transform="translate(0.578125 0.208252)"/></clipPath></defs></svg>';
const expandIcon = `<svg width="auto" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 0.999999L7 7L13 1" stroke="#202020" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

class CustomBulkActionsComponent {
    sanitizer;
    selections;
    selectedLabel;
    actions = [];
    actionClick = new EventEmitter();
    removeSelection = new EventEmitter();
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    sanitizeSvg(svg) {
        return this.sanitizer.bypassSecurityTrustHtml(svg);
    }
    onRemoveSelection() {
        this.removeSelection.next(true);
    }
    onActionClick(action) {
        this.actionClick.emit(action);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomBulkActionsComponent, deps: [{ token: i1$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomBulkActionsComponent, isStandalone: true, selector: "custom-bulk-actions", inputs: { selections: "selections", selectedLabel: "selectedLabel", actions: "actions" }, outputs: { actionClick: "actionClick", removeSelection: "removeSelection" }, ngImport: i0, template: "@if(selections){\n<div class=\"bulk-actions-container\">\n\n    <div class=\"bulk-actions-content\">\n        <div class=\"selected-label\">\n            <h2>\n                {{selections}} {{selectedLabel}} Selected\n            </h2>\n            <div (click)=\"onRemoveSelection()\" class=\"cursor-pointer\">\n                <svg class=\"w-[1.5em] h-[1.5em]\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M9.16992 14.8299L14.8299 9.16992\" stroke=\"white\" stroke-linecap=\"round\"\n                        stroke-linejoin=\"round\" />\n                    <path d=\"M14.8299 14.8299L9.16992 9.16992\" stroke=\"white\" stroke-linecap=\"round\"\n                        stroke-linejoin=\"round\" />\n                </svg>\n            </div>\n        </div>\n        <div class=\"actions\">\n            @for (item of actions; track $index) {\n            <div class=\"action-item\" (click)=\"onActionClick(item)\">\n                <span [class]=\"'action-icon-inline '+item.class\" [innerHTML]=\"sanitizeSvg(item.icon!)\"></span>\n                <span class=\"cursor-pointer\">{{item.label}}</span>\n            </div>\n            }\n        </div>\n    </div>\n\n</div>\n}", styles: [".bulk-actions-container{position:fixed;bottom:2em;left:45%;z-index:1000}.bulk-actions-content{position:relative;display:flex;height:2.875em;padding:.4em;justify-content:center;align-items:center;gap:4em;border-radius:.625em;background:#202020}.selected-label{display:flex;align-items:center;justify-content:center;padding:.25em .5em;gap:.5em;border-radius:.375em;border:1px solid #DBDBDB}.actions{padding:0 1.5em}.selected-label h2,.action-item span{color:#fff;font-size:1em;font-style:normal;font-weight:500;line-height:normal}.action-item{cursor:pointer;display:flex;align-items:center;gap:.5em}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomBulkActionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-bulk-actions', imports: [CommonModule], template: "@if(selections){\n<div class=\"bulk-actions-container\">\n\n    <div class=\"bulk-actions-content\">\n        <div class=\"selected-label\">\n            <h2>\n                {{selections}} {{selectedLabel}} Selected\n            </h2>\n            <div (click)=\"onRemoveSelection()\" class=\"cursor-pointer\">\n                <svg class=\"w-[1.5em] h-[1.5em]\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M9.16992 14.8299L14.8299 9.16992\" stroke=\"white\" stroke-linecap=\"round\"\n                        stroke-linejoin=\"round\" />\n                    <path d=\"M14.8299 14.8299L9.16992 9.16992\" stroke=\"white\" stroke-linecap=\"round\"\n                        stroke-linejoin=\"round\" />\n                </svg>\n            </div>\n        </div>\n        <div class=\"actions\">\n            @for (item of actions; track $index) {\n            <div class=\"action-item\" (click)=\"onActionClick(item)\">\n                <span [class]=\"'action-icon-inline '+item.class\" [innerHTML]=\"sanitizeSvg(item.icon!)\"></span>\n                <span class=\"cursor-pointer\">{{item.label}}</span>\n            </div>\n            }\n        </div>\n    </div>\n\n</div>\n}", styles: [".bulk-actions-container{position:fixed;bottom:2em;left:45%;z-index:1000}.bulk-actions-content{position:relative;display:flex;height:2.875em;padding:.4em;justify-content:center;align-items:center;gap:4em;border-radius:.625em;background:#202020}.selected-label{display:flex;align-items:center;justify-content:center;padding:.25em .5em;gap:.5em;border-radius:.375em;border:1px solid #DBDBDB}.actions{padding:0 1.5em}.selected-label h2,.action-item span{color:#fff;font-size:1em;font-style:normal;font-weight:500;line-height:normal}.action-item{cursor:pointer;display:flex;align-items:center;gap:.5em}\n"] }]
        }], ctorParameters: () => [{ type: i1$2.DomSanitizer }], propDecorators: { selections: [{
                type: Input,
                args: ['selections']
            }], selectedLabel: [{
                type: Input,
                args: ['selectedLabel']
            }], actions: [{
                type: Input
            }], actionClick: [{
                type: Output
            }], removeSelection: [{
                type: Output,
                args: ['removeSelection']
            }] } });

class CustomTableComponent {
    sanitizer;
    tableData;
    tableHeader;
    cellTemplates = {};
    expandedCellTemplates = {};
    expandedChildAccessor = null;
    expandable = false;
    showStatusColumn = false;
    showActionColumn = false;
    showNumberCol = false;
    sortedKey = '';
    pagination = {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
    };
    enableEdit = true;
    enableDelete = true;
    enableView = true;
    rowClass = '';
    headerClass = '';
    statusCol = {
        header: 'status',
        trueValue: true,
        trueText: 'Active',
        falseText: 'Inactive',
        sort: false,
    };
    actions = [];
    onEdit = new EventEmitter();
    onView = new EventEmitter();
    onDelete = new EventEmitter();
    onRowClick = new EventEmitter();
    sortColumn = new EventEmitter();
    cellEditStart = new EventEmitter();
    cellEditEnd = new EventEmitter();
    cellEditCancel = new EventEmitter();
    // Selection
    enableSelection = false;
    enableAllSelection = false;
    selection;
    selectAll = false;
    selectedLabel = '';
    bulkActions = [];
    selectionChange = new EventEmitter();
    selectAllChange = new EventEmitter();
    bulkAction = new EventEmitter();
    expandedRows = new Set();
    checkedSortIcon = '';
    checkedActionViewSvg = '';
    checkedActionEditSvg = '';
    checkedActionDeleteSvg = '';
    editingCell = null;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        console.log('CustomTableComponent initialized');
        this.checkedSortIcon = this.sanitizer.bypassSecurityTrustHtml(sortSvg);
        this.checkedActionViewSvg =
            this.sanitizer.bypassSecurityTrustHtml(actionViewSvg);
        this.checkedActionEditSvg =
            this.sanitizer.bypassSecurityTrustHtml(actionEdiSquaretSvg);
        this.checkedActionDeleteSvg =
            this.sanitizer.bypassSecurityTrustHtml(actionDeleteSvg$1);
    }
    // ----------------------------
    // Expand logic
    // ----------------------------
    canExpandRow(row) {
        if (!this.expandable || !this.expandedChildAccessor)
            return false;
        const children = this.expandedChildAccessor(row);
        return Array.isArray(children) && children.length > 0;
    }
    toggleRow(i) {
        this.expandedRows.has(i)
            ? this.expandedRows.delete(i)
            : this.expandedRows.add(i);
    }
    isRowExpanded(i) {
        return this.expandedRows.has(i);
    }
    // ----------------------------
    // Cell value
    // ----------------------------
    getCellValue(row, col) {
        if (!col.body)
            return null;
        return row[col.body];
    }
    // ----------------------------
    // Inline edit logic
    // ----------------------------
    getRowKey(row, fallbackIndex, parent) {
        const id = row?.id ?? row?.uuid ?? row?._id;
        if (id !== undefined && id !== null)
            return String(id);
        if (parent) {
            const pid = parent?.id ?? parent?.uuid ?? parent?._id ?? 'parent';
            return `${pid}__${fallbackIndex}`;
        }
        return String(fallbackIndex);
    }
    getColKey(col) {
        return String(col.body);
    }
    isCellEditing(row, col, rowIndex, isChild, parent) {
        if (!this.editingCell)
            return false;
        const rowKey = this.getRowKey(row, rowIndex, parent);
        const colKey = this.getColKey(col);
        return (this.editingCell.rowKey === rowKey &&
            this.editingCell.colKey === colKey &&
            this.editingCell.isChild === isChild &&
            (isChild
                ? this.editingCell.parentKey === this.getRowKey(parent, -1)
                : true));
    }
    canInlineEdit(col, row) {
        if (!col.isEditable)
            return false;
        if (col.canEdit)
            return !!col.canEdit(row);
        return true;
    }
    onCellClick(ev, row, col, rowIndex, isChild, parent) {
        if (!this.canInlineEdit(col, row))
            return;
        ev.stopPropagation();
        const rowKey = this.getRowKey(row, rowIndex, parent);
        const colKey = this.getColKey(col);
        const sameCell = this.editingCell &&
            this.editingCell.rowKey === rowKey &&
            this.editingCell.colKey === colKey &&
            this.editingCell.isChild === isChild &&
            (!isChild || this.editingCell.parentKey === this.getRowKey(parent, -1));
        if (sameCell) {
            this.endEditing(row, col, isChild, parent);
            return;
        }
        if (this.editingCell) {
            this.editingCell = null;
        }
        this.editingCell = {
            rowKey,
            colKey,
            isChild,
            parentKey: isChild ? this.getRowKey(parent, -1) : undefined,
        };
        this.cellEditStart.emit({ row, col, isChild, parent });
    }
    endEditing(row, col, isChild, parent) {
        this.editingCell = null;
        this.cellEditEnd.emit({ row, col, isChild, parent });
    }
    clearEditing() {
        this.cancelEditing();
    }
    cancelEditing() {
        if (!this.editingCell)
            return;
        this.editingCell = null;
        this.cellEditCancel.emit();
    }
    onContainerClick(ev) {
        if (ev.target === ev.currentTarget) {
            this.clearEditing();
        }
    }
    // ---------- Selection helpers ----------
    getKey(row, index, parent) {
        return this.getRowKey(row, index, parent);
    }
    isParentSelected(row, index) {
        return this.selection?.parents.has(this.getKey(row, index));
    }
    isChildSelected(child, index, parent) {
        return this.selection?.children.has(this.getKey(child, index, parent));
    }
    toggleParent(row, index, event) {
        event.stopPropagation();
        const key = this.getKey(row, index);
        if (this.selection.children.size > 0)
            return;
        const parents = new Set(this.selection.parents);
        parents.has(key) ? parents.delete(key) : parents.add(key);
        this.selectionChange.emit({
            parents,
            children: new Set(this.selection.children),
        });
    }
    toggleChild(child, index, parent, event) {
        event.stopPropagation();
        if (this.selection.parents.size > 0)
            return;
        const key = this.getKey(child, index, parent);
        const children = new Set(this.selection.children);
        children.has(key) ? children.delete(key) : children.add(key);
        this.selectionChange.emit({
            parents: new Set(this.selection.parents),
            children,
        });
    }
    toggleSelectAll() {
        this.selectAllChange.emit(!this.selectAll);
    }
    removeSelections() {
        this.selectionChange.emit({
            parents: new Set(),
            children: new Set(),
        });
        if (this.enableAllSelection) {
            this.selectAllChange.emit(false);
        }
    }
    onBulkAction(action) {
        if (!action || typeof action.callback !== 'function')
            return;
        this.bulkAction.emit({
            action,
            selection: this.selection,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomTableComponent, deps: [{ token: i1$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomTableComponent, isStandalone: true, selector: "custom-table", inputs: { tableData: "tableData", tableHeader: "tableHeader", cellTemplates: "cellTemplates", expandedCellTemplates: "expandedCellTemplates", expandedChildAccessor: "expandedChildAccessor", expandable: "expandable", showStatusColumn: "showStatusColumn", showActionColumn: "showActionColumn", showNumberCol: "showNumberCol", sortedKey: "sortedKey", pagination: "pagination", enableEdit: "enableEdit", enableDelete: "enableDelete", enableView: "enableView", rowClass: "rowClass", headerClass: "headerClass", statusCol: "statusCol", actions: "actions", enableSelection: "enableSelection", enableAllSelection: "enableAllSelection", selection: "selection", selectAll: "selectAll", selectedLabel: "selectedLabel", bulkActions: "bulkActions" }, outputs: { onEdit: "onEdit", onView: "onView", onDelete: "onDelete", onRowClick: "onRowClick", sortColumn: "sortColumn", cellEditStart: "cellEditStart", cellEditEnd: "cellEditEnd", cellEditCancel: "cellEditCancel", selectionChange: "selectionChange", selectAllChange: "selectAllChange", bulkAction: "bulkAction" }, ngImport: i0, template: "<div class=\"table-scroll-x table-y-overflow\">\n  <div class=\"table-container\" (click)=\"onContainerClick($event)\">\n    <table class=\"striped-table\">\n      <!-- ================= HEADER ================= -->\n      <thead [class]=\"headerClass\">\n        <tr>\n          @if (enableAllSelection) {\n            <custom-check-box\n              name=\"select-all\"\n              [value]=\"selectAll\"\n              (click)=\"$event.stopPropagation(); toggleSelectAll()\"\n            >\n            </custom-check-box>\n          }\n          @if (showNumberCol) {\n            <th class=\"number-col\">\n              <div class=\"table-header-cell\">\n                @if (enableAllSelection) {\n                  <custom-check-box\n                    name=\"select-all\"\n                    [value]=\"selectAll\"\n                    (click)=\"$event.stopPropagation(); toggleSelectAll()\"\n                  >\n                  </custom-check-box>\n                }\n                #\n              </div>\n            </th>\n          }\n          @for (col of tableHeader; track $index; let colIndex = $index) {\n            <th\n              [style.width]=\"col.width ?? 'auto'\"\n              [class]=\"{ 'sorted-column': sortedKey == col.body }\"\n              (click)=\"col.sort ? sortColumn.emit(col.body) : null\"\n            >\n              <div\n                class=\"table-header-cell\"\n                [class]=\"{\n                  'justify-center': col.align == 'center',\n                  'justify-start': col.align == 'left' || !col.align,\n                  'justify-end': col.align == 'right',\n                }\"\n              >\n                @if (colIndex === 0 && enableAllSelection) {\n                  <custom-check-box\n                    name=\"select-all\"\n                    [value]=\"selectAll\"\n                    (click)=\"$event.stopPropagation(); toggleSelectAll()\"\n                  >\n                  </custom-check-box>\n                }\n                {{ col.header }}\n                @if (col.sort) {\n                  <span class=\"sort-icon\" [innerHTML]=\"checkedSortIcon\"></span>\n                }\n              </div>\n            </th>\n          }\n          @if (showStatusColumn) {\n            <th class=\"text-center\">Status</th>\n          }\n          @if (showActionColumn) {\n            <th class=\"text-center\">Actions</th>\n          }\n        </tr>\n      </thead>\n\n      <tbody>\n        @for (item of tableData; track $index; let rowIndex = $index) {\n          <tr\n            [class]=\"rowClass\"\n            (click)=\"onRowClick.emit(item); $event.stopPropagation()\"\n          >\n            @if (showNumberCol) {\n              <td class=\"table-td-number\">\n                @if (enableSelection) {\n                  <custom-check-box\n                    [name]=\"'select-parent-' + rowIndex\"\n                    [value]=\"isParentSelected(item, rowIndex)\"\n                    [disabled]=\"selection.children.size > 0\"\n                    [checkboxClass]=\"\n                      selection.children.size > 0\n                        ? '!cursor-not-allowed opacity-50'\n                        : ''\n                    \"\n                    (click)=\"\n                      selection.children.size === 0\n                        ? toggleParent(item, rowIndex, $event)\n                        : null\n                    \"\n                  >\n                  </custom-check-box>\n                }\n                {{\n                  rowIndex + 1 + (pagination.pageNum - 1) * pagination.pageSize\n                }}\n              </td>\n            }\n            <!--  -->\n            @for (col of tableHeader; track $index; let colIndex = $index) {\n              <!--  -->\n              @if (col.htmlRef && cellTemplates[col.htmlRef]) {\n                <td\n                  class=\"table-td\"\n                  (click)=\"onCellClick($event, item, col, rowIndex, false)\"\n                  [class.cursor-pointer]=\"col.isEditable\"\n                >\n                  <div class=\"flex items-center justify-center\">\n                    @if (colIndex === 0 && !showNumberCol && enableSelection) {\n                      <custom-check-box\n                        [name]=\"'select-parent-' + rowIndex\"\n                        [value]=\"isParentSelected(item, rowIndex)\"\n                        class=\"w-[1em] h-[1em]\"\n                        [disabled]=\"selection.children.size > 0\"\n                        [checkboxClass]=\"\n                          selection.children.size > 0\n                            ? '!cursor-not-allowed opacity-50'\n                            : ''\n                        \"\n                        (click)=\"\n                          selection.children.size === 0\n                            ? toggleParent(item, rowIndex, $event)\n                            : null\n                        \"\n                      >\n                      </custom-check-box>\n                    }\n                    @if (colIndex == 0 && expandable) {\n                      <div\n                        class=\"w-[1.5em] h-[1em] flex items-center justify-end\"\n                      >\n                        @if (canExpandRow(item)) {\n                          <span\n                            style=\"cursor: pointer\"\n                            (click)=\"\n                              toggleRow(rowIndex); $event.stopPropagation()\n                            \"\n                            class=\"cursor-pointer hover:scale-105 rotate-270\"\n                            [class]=\"{ 'rotate-none': isRowExpanded(rowIndex) }\"\n                          >\n                            <svg\n                              class=\"w-[1em] h-[1em]\"\n                              viewBox=\"0 0 16 16\"\n                              fill=\"none\"\n                            >\n                              <path\n                                d=\"M4 6L8 10L12 6\"\n                                stroke=\"#120710\"\n                                stroke-width=\"1.5\"\n                                stroke-linecap=\"round\"\n                                stroke-linejoin=\"round\"\n                              />\n                            </svg>\n                          </span>\n                        } @else {\n                          <span\n                            class=\"inline-block w-[1.38em] h-[1em] opacity-0\"\n                          ></span>\n                        }\n                      </div>\n                    }\n\n                    <ng-template\n                      [ngTemplateOutlet]=\"cellTemplates[col.htmlRef]\"\n                      [ngTemplateOutletContext]=\"{\n                        $implicit: item,\n                        col: col,\n                        cancelEditing: cancelEditing.bind(this),\n                        editing: isCellEditing(item, col, rowIndex, false),\n                      }\"\n                    >\n                    </ng-template>\n                  </div>\n                </td>\n              } @else if (col.inputTransform) {\n                <td\n                  class=\"table-td\"\n                  (click)=\"onCellClick($event, item, col, rowIndex, false)\"\n                  [class.cursor-pointer]=\"col.isEditable\"\n                  [title]=\"col.inputTransform(item)\"\n                >\n                  <span>{{ col.inputTransform(item) }}</span>\n                </td>\n              } @else {\n                <td\n                  class=\"table-td\"\n                  (click)=\"onCellClick($event, item, col, rowIndex, false)\"\n                  [class.cursor-pointer]=\"col.isEditable\"\n                  [title]=\"getCellValue(item, col)\"\n                >\n                  <span>{{ getCellValue(item, col) }}</span>\n                </td>\n              }\n            }\n            @if (showStatusColumn) {\n              <td class=\"status-td\">\n                <div class=\"status\">\n                  @if (item[statusCol.header] === statusCol.trueValue) {\n                    <div class=\"true\">{{ statusCol.trueText }}</div>\n                  } @else {\n                    <div class=\"false\">{{ statusCol.falseText }}</div>\n                  }\n                </div>\n              </td>\n            }\n            @if (showActionColumn) {\n              <td class=\"table-td\" (click)=\"$event.stopPropagation()\">\n                <div class=\"actions\">\n                  <custom-actions-dropdown\n                    [actions]=\"actions\"\n                    [context]=\"item\"\n                  />\n                </div>\n              </td>\n            }\n          </tr>\n\n          @if (expandable && isRowExpanded(rowIndex) && canExpandRow(item)) {\n            @for (\n              child of expandedChildAccessor!(item);\n              track child.id;\n              let childIndex = $index\n            ) {\n              <tr class=\"expanded-child-row\" (click)=\"$event.stopPropagation()\">\n                @if (showNumberCol) {\n                  <td>\n                    @if (enableSelection) {\n                      <custom-check-box\n                        [name]=\"'select-child-' + childIndex\"\n                        [value]=\"isChildSelected(child, childIndex, item)\"\n                        [disabled]=\"selection.parents.size > 0\"\n                        [checkboxClass]=\"\n                          selection.parents.size > 0\n                            ? '!cursor-not-allowed opacity-50'\n                            : ' '\n                        \"\n                        (click)=\"\n                          isParentSelected(item, rowIndex)\n                            ? null\n                            : toggleChild(child, childIndex, item, $event)\n                        \"\n                      >\n                      </custom-check-box>\n                    }\n                  </td>\n                }\n                <!--  -->\n                @for (col of tableHeader; track $index; let colIndex = $index) {\n                  <td\n                    class=\"table-td\"\n                    [style.text-align]=\"col.align ?? 'left'\"\n                    (click)=\"\n                      onCellClick($event, child, col, childIndex, true, item)\n                    \"\n                    [class.cursor-pointer]=\"col.isEditable\"\n                  >\n                    <div class=\"flex items-center justify-center\">\n                      @if (\n                        colIndex === 0 && !showNumberCol && enableSelection\n                      ) {\n                        <custom-check-box\n                          [name]=\"'select-child-' + childIndex\"\n                          [value]=\"isChildSelected(child, childIndex, item)\"\n                          class=\"ml-[1.5em]\"\n                          [disabled]=\"selection.parents.size > 0\"\n                          [checkboxClass]=\"\n                            selection.parents.size > 0\n                              ? '!cursor-not-allowed opacity-50'\n                              : ''\n                          \"\n                          (click)=\"\n                            isParentSelected(item, rowIndex)\n                              ? null\n                              : toggleChild(child, childIndex, item, $event)\n                          \"\n                        >\n                        </custom-check-box>\n                      }\n                      <!--  -->\n                      @if (\n                        col.expandedHtmlRef &&\n                        expandedCellTemplates[col.expandedHtmlRef]\n                      ) {\n                        <ng-template\n                          [ngTemplateOutlet]=\"\n                            expandedCellTemplates[col.expandedHtmlRef!]\n                          \"\n                          [ngTemplateOutletContext]=\"{\n                            $implicit: child,\n                            parent: item,\n                            col: col,\n                            cancelEditing: cancelEditing.bind(this),\n                            editing: isCellEditing(\n                              child,\n                              col,\n                              childIndex,\n                              true,\n                              item\n                            ),\n                          }\"\n                        ></ng-template>\n                      } @else if (col.htmlRef && cellTemplates[col.htmlRef]) {\n                        <ng-template\n                          [ngTemplateOutlet]=\"cellTemplates[col.htmlRef]\"\n                          [ngTemplateOutletContext]=\"{\n                            $implicit: child,\n                            parent: item,\n                            col: col,\n                            cancelEditing: cancelEditing.bind(this),\n                            editing: isCellEditing(\n                              child,\n                              col,\n                              childIndex,\n                              true,\n                              item\n                            ),\n                          }\"\n                        ></ng-template>\n                      } @else if (col.inputTransform) {\n                        {{ col.inputTransform(getCellValue(child, col)) }}\n                      } @else {\n                        {{ getCellValue(child, col) }}\n                      }\n                    </div>\n                  </td>\n                }\n                @if (showStatusColumn) {\n                  <td></td>\n                }\n                @if (showActionColumn) {\n                  <td></td>\n                }\n              </tr>\n            }\n          }\n        }\n      </tbody>\n    </table>\n  </div>\n  @if (enableSelection || enableAllSelection) {\n    <custom-bulk-actions\n      [actions]=\"bulkActions\"\n      [selectedLabel]=\"selectedLabel\"\n      [selections]=\"selection.parents.size + selection.children.size\"\n      (actionClick)=\"onBulkAction($event)\"\n      (removeSelection)=\"removeSelections()\"\n    />\n  }\n</div>\n", styles: [".table-scroll-x{overflow-x:visible;width:100%}.table-y-overflow{overflow-y:visible;width:100%}.table-container{overflow:visible;width:100%;max-width:100%}.striped-table{width:100%;min-width:900px;background-color:#fff}.actions-icon-wrapper{width:2em;height:1.4em}.actions-icon-wrapper svg{width:100%;height:auto;display:block}.table-header-cell{display:flex;flex-direction:row;gap:.5em;align-items:center;font-size:1em;cursor:pointer}.sorted-column{background-color:#f2f1ef!important}.table-header-cell:not(:first-child){justify-content:center}.sort-icon{width:1em;cursor:pointer;height:1.125em}.sort-icon svg{width:100%!important;height:auto;display:block}.toggle-button{background:none;border:none;color:#25c7bc;cursor:pointer;font-weight:600}.actions{display:flex;justify-content:center;align-items:center;gap:10px;width:100%;cursor:pointer}.status-td{padding:.1em .4em!important}.status{height:100%;display:flex;justify-content:center;align-items:center}.status div{display:flex;justify-content:center;align-items:center;padding:.25em 0;border:0px solid transparent;border-radius:1em;width:6em;font-family:var(--FM-Bold)}.true{color:#0d7d0b;background-color:#c8ffc7}.false{color:#d2344f;background-color:#ffe0e5}.striped-table th{padding:.35em 1em;border-bottom:1px solid var(--grey-500);font-size:1em;font-family:var(--FM-Medium);line-height:1.5em;height:2.5em;color:var(--grey-800);font-weight:500}.striped-table tbody tr{font-weight:500;font-size:1em}.striped-table td{padding:0 1em;color:var(--grey-800);height:2.5em;border-bottom:1px solid var(--grey-500);overflow:visible}.table-td span{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:inline-block}.active{background-color:#c8ffc7;width:85px;height:28px;border-radius:100px;display:flex;justify-self:center;align-items:center;font-size:.67em;font-weight:500;color:#0d7d0b;text-align:center}.inactive{background-color:#ffe0e5;width:85px;height:28px;border-radius:100px;display:flex;justify-content:center;align-items:center;font-size:.67em;font-weight:500;color:#d2344f;text-align:center}.table-td{font-family:var(--FM-Medium);font-size:1em;color:var(--grey-800);text-overflow:ellipsis;text-wrap:nowrap;max-width:min(300px,20em);z-index:1;overflow:visible}tr:has(>td.table-td-number:first-child)>td:nth-child(2){background-color:#fcfbfb;font-family:var(--FM-Medium)!important;border-left:0px solid #eeeeee}tr:not(:has(>td.table-td-number:first-child))>td:first-child{font-family:var(--FM-Medium)!important;border-left:0px solid #eeeeee;text-align:start}.child-cell{font-family:var(--FM-Medium)!important;font-size:1.15em}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: CustomActionsDropdownComponent, selector: "custom-actions-dropdown", inputs: ["actions", "hoverEffect", "context", "horizontalDots"] }, { kind: "component", type: CustomCheckBoxComponent, selector: "custom-check-box", inputs: ["checkboxClass", "labelClass", "componentClass", "label", "disabled", "name", "value"], outputs: ["valueChange"] }, { kind: "component", type: CustomBulkActionsComponent, selector: "custom-bulk-actions", inputs: ["selections", "selectedLabel", "actions"], outputs: ["actionClick", "removeSelection"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-table', standalone: true, imports: [
                        CommonModule,
                        CustomActionsDropdownComponent,
                        CustomCheckBoxComponent,
                        CustomBulkActionsComponent,
                    ], template: "<div class=\"table-scroll-x table-y-overflow\">\n  <div class=\"table-container\" (click)=\"onContainerClick($event)\">\n    <table class=\"striped-table\">\n      <!-- ================= HEADER ================= -->\n      <thead [class]=\"headerClass\">\n        <tr>\n          @if (enableAllSelection) {\n            <custom-check-box\n              name=\"select-all\"\n              [value]=\"selectAll\"\n              (click)=\"$event.stopPropagation(); toggleSelectAll()\"\n            >\n            </custom-check-box>\n          }\n          @if (showNumberCol) {\n            <th class=\"number-col\">\n              <div class=\"table-header-cell\">\n                @if (enableAllSelection) {\n                  <custom-check-box\n                    name=\"select-all\"\n                    [value]=\"selectAll\"\n                    (click)=\"$event.stopPropagation(); toggleSelectAll()\"\n                  >\n                  </custom-check-box>\n                }\n                #\n              </div>\n            </th>\n          }\n          @for (col of tableHeader; track $index; let colIndex = $index) {\n            <th\n              [style.width]=\"col.width ?? 'auto'\"\n              [class]=\"{ 'sorted-column': sortedKey == col.body }\"\n              (click)=\"col.sort ? sortColumn.emit(col.body) : null\"\n            >\n              <div\n                class=\"table-header-cell\"\n                [class]=\"{\n                  'justify-center': col.align == 'center',\n                  'justify-start': col.align == 'left' || !col.align,\n                  'justify-end': col.align == 'right',\n                }\"\n              >\n                @if (colIndex === 0 && enableAllSelection) {\n                  <custom-check-box\n                    name=\"select-all\"\n                    [value]=\"selectAll\"\n                    (click)=\"$event.stopPropagation(); toggleSelectAll()\"\n                  >\n                  </custom-check-box>\n                }\n                {{ col.header }}\n                @if (col.sort) {\n                  <span class=\"sort-icon\" [innerHTML]=\"checkedSortIcon\"></span>\n                }\n              </div>\n            </th>\n          }\n          @if (showStatusColumn) {\n            <th class=\"text-center\">Status</th>\n          }\n          @if (showActionColumn) {\n            <th class=\"text-center\">Actions</th>\n          }\n        </tr>\n      </thead>\n\n      <tbody>\n        @for (item of tableData; track $index; let rowIndex = $index) {\n          <tr\n            [class]=\"rowClass\"\n            (click)=\"onRowClick.emit(item); $event.stopPropagation()\"\n          >\n            @if (showNumberCol) {\n              <td class=\"table-td-number\">\n                @if (enableSelection) {\n                  <custom-check-box\n                    [name]=\"'select-parent-' + rowIndex\"\n                    [value]=\"isParentSelected(item, rowIndex)\"\n                    [disabled]=\"selection.children.size > 0\"\n                    [checkboxClass]=\"\n                      selection.children.size > 0\n                        ? '!cursor-not-allowed opacity-50'\n                        : ''\n                    \"\n                    (click)=\"\n                      selection.children.size === 0\n                        ? toggleParent(item, rowIndex, $event)\n                        : null\n                    \"\n                  >\n                  </custom-check-box>\n                }\n                {{\n                  rowIndex + 1 + (pagination.pageNum - 1) * pagination.pageSize\n                }}\n              </td>\n            }\n            <!--  -->\n            @for (col of tableHeader; track $index; let colIndex = $index) {\n              <!--  -->\n              @if (col.htmlRef && cellTemplates[col.htmlRef]) {\n                <td\n                  class=\"table-td\"\n                  (click)=\"onCellClick($event, item, col, rowIndex, false)\"\n                  [class.cursor-pointer]=\"col.isEditable\"\n                >\n                  <div class=\"flex items-center justify-center\">\n                    @if (colIndex === 0 && !showNumberCol && enableSelection) {\n                      <custom-check-box\n                        [name]=\"'select-parent-' + rowIndex\"\n                        [value]=\"isParentSelected(item, rowIndex)\"\n                        class=\"w-[1em] h-[1em]\"\n                        [disabled]=\"selection.children.size > 0\"\n                        [checkboxClass]=\"\n                          selection.children.size > 0\n                            ? '!cursor-not-allowed opacity-50'\n                            : ''\n                        \"\n                        (click)=\"\n                          selection.children.size === 0\n                            ? toggleParent(item, rowIndex, $event)\n                            : null\n                        \"\n                      >\n                      </custom-check-box>\n                    }\n                    @if (colIndex == 0 && expandable) {\n                      <div\n                        class=\"w-[1.5em] h-[1em] flex items-center justify-end\"\n                      >\n                        @if (canExpandRow(item)) {\n                          <span\n                            style=\"cursor: pointer\"\n                            (click)=\"\n                              toggleRow(rowIndex); $event.stopPropagation()\n                            \"\n                            class=\"cursor-pointer hover:scale-105 rotate-270\"\n                            [class]=\"{ 'rotate-none': isRowExpanded(rowIndex) }\"\n                          >\n                            <svg\n                              class=\"w-[1em] h-[1em]\"\n                              viewBox=\"0 0 16 16\"\n                              fill=\"none\"\n                            >\n                              <path\n                                d=\"M4 6L8 10L12 6\"\n                                stroke=\"#120710\"\n                                stroke-width=\"1.5\"\n                                stroke-linecap=\"round\"\n                                stroke-linejoin=\"round\"\n                              />\n                            </svg>\n                          </span>\n                        } @else {\n                          <span\n                            class=\"inline-block w-[1.38em] h-[1em] opacity-0\"\n                          ></span>\n                        }\n                      </div>\n                    }\n\n                    <ng-template\n                      [ngTemplateOutlet]=\"cellTemplates[col.htmlRef]\"\n                      [ngTemplateOutletContext]=\"{\n                        $implicit: item,\n                        col: col,\n                        cancelEditing: cancelEditing.bind(this),\n                        editing: isCellEditing(item, col, rowIndex, false),\n                      }\"\n                    >\n                    </ng-template>\n                  </div>\n                </td>\n              } @else if (col.inputTransform) {\n                <td\n                  class=\"table-td\"\n                  (click)=\"onCellClick($event, item, col, rowIndex, false)\"\n                  [class.cursor-pointer]=\"col.isEditable\"\n                  [title]=\"col.inputTransform(item)\"\n                >\n                  <span>{{ col.inputTransform(item) }}</span>\n                </td>\n              } @else {\n                <td\n                  class=\"table-td\"\n                  (click)=\"onCellClick($event, item, col, rowIndex, false)\"\n                  [class.cursor-pointer]=\"col.isEditable\"\n                  [title]=\"getCellValue(item, col)\"\n                >\n                  <span>{{ getCellValue(item, col) }}</span>\n                </td>\n              }\n            }\n            @if (showStatusColumn) {\n              <td class=\"status-td\">\n                <div class=\"status\">\n                  @if (item[statusCol.header] === statusCol.trueValue) {\n                    <div class=\"true\">{{ statusCol.trueText }}</div>\n                  } @else {\n                    <div class=\"false\">{{ statusCol.falseText }}</div>\n                  }\n                </div>\n              </td>\n            }\n            @if (showActionColumn) {\n              <td class=\"table-td\" (click)=\"$event.stopPropagation()\">\n                <div class=\"actions\">\n                  <custom-actions-dropdown\n                    [actions]=\"actions\"\n                    [context]=\"item\"\n                  />\n                </div>\n              </td>\n            }\n          </tr>\n\n          @if (expandable && isRowExpanded(rowIndex) && canExpandRow(item)) {\n            @for (\n              child of expandedChildAccessor!(item);\n              track child.id;\n              let childIndex = $index\n            ) {\n              <tr class=\"expanded-child-row\" (click)=\"$event.stopPropagation()\">\n                @if (showNumberCol) {\n                  <td>\n                    @if (enableSelection) {\n                      <custom-check-box\n                        [name]=\"'select-child-' + childIndex\"\n                        [value]=\"isChildSelected(child, childIndex, item)\"\n                        [disabled]=\"selection.parents.size > 0\"\n                        [checkboxClass]=\"\n                          selection.parents.size > 0\n                            ? '!cursor-not-allowed opacity-50'\n                            : ' '\n                        \"\n                        (click)=\"\n                          isParentSelected(item, rowIndex)\n                            ? null\n                            : toggleChild(child, childIndex, item, $event)\n                        \"\n                      >\n                      </custom-check-box>\n                    }\n                  </td>\n                }\n                <!--  -->\n                @for (col of tableHeader; track $index; let colIndex = $index) {\n                  <td\n                    class=\"table-td\"\n                    [style.text-align]=\"col.align ?? 'left'\"\n                    (click)=\"\n                      onCellClick($event, child, col, childIndex, true, item)\n                    \"\n                    [class.cursor-pointer]=\"col.isEditable\"\n                  >\n                    <div class=\"flex items-center justify-center\">\n                      @if (\n                        colIndex === 0 && !showNumberCol && enableSelection\n                      ) {\n                        <custom-check-box\n                          [name]=\"'select-child-' + childIndex\"\n                          [value]=\"isChildSelected(child, childIndex, item)\"\n                          class=\"ml-[1.5em]\"\n                          [disabled]=\"selection.parents.size > 0\"\n                          [checkboxClass]=\"\n                            selection.parents.size > 0\n                              ? '!cursor-not-allowed opacity-50'\n                              : ''\n                          \"\n                          (click)=\"\n                            isParentSelected(item, rowIndex)\n                              ? null\n                              : toggleChild(child, childIndex, item, $event)\n                          \"\n                        >\n                        </custom-check-box>\n                      }\n                      <!--  -->\n                      @if (\n                        col.expandedHtmlRef &&\n                        expandedCellTemplates[col.expandedHtmlRef]\n                      ) {\n                        <ng-template\n                          [ngTemplateOutlet]=\"\n                            expandedCellTemplates[col.expandedHtmlRef!]\n                          \"\n                          [ngTemplateOutletContext]=\"{\n                            $implicit: child,\n                            parent: item,\n                            col: col,\n                            cancelEditing: cancelEditing.bind(this),\n                            editing: isCellEditing(\n                              child,\n                              col,\n                              childIndex,\n                              true,\n                              item\n                            ),\n                          }\"\n                        ></ng-template>\n                      } @else if (col.htmlRef && cellTemplates[col.htmlRef]) {\n                        <ng-template\n                          [ngTemplateOutlet]=\"cellTemplates[col.htmlRef]\"\n                          [ngTemplateOutletContext]=\"{\n                            $implicit: child,\n                            parent: item,\n                            col: col,\n                            cancelEditing: cancelEditing.bind(this),\n                            editing: isCellEditing(\n                              child,\n                              col,\n                              childIndex,\n                              true,\n                              item\n                            ),\n                          }\"\n                        ></ng-template>\n                      } @else if (col.inputTransform) {\n                        {{ col.inputTransform(getCellValue(child, col)) }}\n                      } @else {\n                        {{ getCellValue(child, col) }}\n                      }\n                    </div>\n                  </td>\n                }\n                @if (showStatusColumn) {\n                  <td></td>\n                }\n                @if (showActionColumn) {\n                  <td></td>\n                }\n              </tr>\n            }\n          }\n        }\n      </tbody>\n    </table>\n  </div>\n  @if (enableSelection || enableAllSelection) {\n    <custom-bulk-actions\n      [actions]=\"bulkActions\"\n      [selectedLabel]=\"selectedLabel\"\n      [selections]=\"selection.parents.size + selection.children.size\"\n      (actionClick)=\"onBulkAction($event)\"\n      (removeSelection)=\"removeSelections()\"\n    />\n  }\n</div>\n", styles: [".table-scroll-x{overflow-x:visible;width:100%}.table-y-overflow{overflow-y:visible;width:100%}.table-container{overflow:visible;width:100%;max-width:100%}.striped-table{width:100%;min-width:900px;background-color:#fff}.actions-icon-wrapper{width:2em;height:1.4em}.actions-icon-wrapper svg{width:100%;height:auto;display:block}.table-header-cell{display:flex;flex-direction:row;gap:.5em;align-items:center;font-size:1em;cursor:pointer}.sorted-column{background-color:#f2f1ef!important}.table-header-cell:not(:first-child){justify-content:center}.sort-icon{width:1em;cursor:pointer;height:1.125em}.sort-icon svg{width:100%!important;height:auto;display:block}.toggle-button{background:none;border:none;color:#25c7bc;cursor:pointer;font-weight:600}.actions{display:flex;justify-content:center;align-items:center;gap:10px;width:100%;cursor:pointer}.status-td{padding:.1em .4em!important}.status{height:100%;display:flex;justify-content:center;align-items:center}.status div{display:flex;justify-content:center;align-items:center;padding:.25em 0;border:0px solid transparent;border-radius:1em;width:6em;font-family:var(--FM-Bold)}.true{color:#0d7d0b;background-color:#c8ffc7}.false{color:#d2344f;background-color:#ffe0e5}.striped-table th{padding:.35em 1em;border-bottom:1px solid var(--grey-500);font-size:1em;font-family:var(--FM-Medium);line-height:1.5em;height:2.5em;color:var(--grey-800);font-weight:500}.striped-table tbody tr{font-weight:500;font-size:1em}.striped-table td{padding:0 1em;color:var(--grey-800);height:2.5em;border-bottom:1px solid var(--grey-500);overflow:visible}.table-td span{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:inline-block}.active{background-color:#c8ffc7;width:85px;height:28px;border-radius:100px;display:flex;justify-self:center;align-items:center;font-size:.67em;font-weight:500;color:#0d7d0b;text-align:center}.inactive{background-color:#ffe0e5;width:85px;height:28px;border-radius:100px;display:flex;justify-content:center;align-items:center;font-size:.67em;font-weight:500;color:#d2344f;text-align:center}.table-td{font-family:var(--FM-Medium);font-size:1em;color:var(--grey-800);text-overflow:ellipsis;text-wrap:nowrap;max-width:min(300px,20em);z-index:1;overflow:visible}tr:has(>td.table-td-number:first-child)>td:nth-child(2){background-color:#fcfbfb;font-family:var(--FM-Medium)!important;border-left:0px solid #eeeeee}tr:not(:has(>td.table-td-number:first-child))>td:first-child{font-family:var(--FM-Medium)!important;border-left:0px solid #eeeeee;text-align:start}.child-cell{font-family:var(--FM-Medium)!important;font-size:1.15em}\n"] }]
        }], ctorParameters: () => [{ type: i1$2.DomSanitizer }], propDecorators: { tableData: [{
                type: Input
            }], tableHeader: [{
                type: Input
            }], cellTemplates: [{
                type: Input
            }], expandedCellTemplates: [{
                type: Input
            }], expandedChildAccessor: [{
                type: Input
            }], expandable: [{
                type: Input
            }], showStatusColumn: [{
                type: Input
            }], showActionColumn: [{
                type: Input
            }], showNumberCol: [{
                type: Input
            }], sortedKey: [{
                type: Input
            }], pagination: [{
                type: Input
            }], enableEdit: [{
                type: Input
            }], enableDelete: [{
                type: Input
            }], enableView: [{
                type: Input
            }], rowClass: [{
                type: Input
            }], headerClass: [{
                type: Input
            }], statusCol: [{
                type: Input
            }], actions: [{
                type: Input
            }], onEdit: [{
                type: Output
            }], onView: [{
                type: Output
            }], onDelete: [{
                type: Output
            }], onRowClick: [{
                type: Output
            }], sortColumn: [{
                type: Output
            }], cellEditStart: [{
                type: Output
            }], cellEditEnd: [{
                type: Output
            }], cellEditCancel: [{
                type: Output
            }], enableSelection: [{
                type: Input
            }], enableAllSelection: [{
                type: Input
            }], selection: [{
                type: Input
            }], selectAll: [{
                type: Input
            }], selectedLabel: [{
                type: Input
            }], bulkActions: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }], selectAllChange: [{
                type: Output
            }], bulkAction: [{
                type: Output
            }] } });

class CustomTextareaComponent {
    class = '';
    labelClass = '';
    label = '';
    placeholder = '';
    name = '';
    value;
    valueChange = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomTextareaComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomTextareaComponent, isStandalone: true, selector: "custom-textarea", inputs: { class: "class", labelClass: "labelClass", label: "label", placeholder: "placeholder", name: "name", value: "value" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div style=\"width: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n  <textarea\n    [id]=\"label\"\n    [name]=\"name\"\n    [placeholder]=\"placeholder\"\n    [class]=\"'custom-textarea ' + class\"\n    [(ngModel)]=\"value\"\n    (ngModelChange)=\"valueChange.emit($event)\"\n  ></textarea>\n</div>\n", styles: [".custom-textarea{width:100%;padding:12px;resize:vertical;border-radius:.375em;border:1px solid #82828233;padding-left:.5rem;padding-right:.5rem;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;min-height:4.5rem}.custom-label{font-size:1em;color:#707070;margin-bottom:.3em;font-weight:500}.custom-textarea::placeholder{color:#82828250;font-size:.95em;font-weight:400}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomTextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-textarea', standalone: true, imports: [FormsModule], template: "<div style=\"width: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n  <textarea\n    [id]=\"label\"\n    [name]=\"name\"\n    [placeholder]=\"placeholder\"\n    [class]=\"'custom-textarea ' + class\"\n    [(ngModel)]=\"value\"\n    (ngModelChange)=\"valueChange.emit($event)\"\n  ></textarea>\n</div>\n", styles: [".custom-textarea{width:100%;padding:12px;resize:vertical;border-radius:.375em;border:1px solid #82828233;padding-left:.5rem;padding-right:.5rem;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;min-height:4.5rem}.custom-label{font-size:1em;color:#707070;margin-bottom:.3em;font-weight:500}.custom-textarea::placeholder{color:#82828250;font-size:.95em;font-weight:400}\n"] }]
        }], propDecorators: { class: [{
                type: Input
            }], labelClass: [{
                type: Input
            }], label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], name: [{
                type: Input
            }], value: [{
                type: Input,
                args: [{ required: true }]
            }], valueChange: [{
                type: Output
            }] } });

class CustomTextareaFormComponent {
    class = '';
    labelClass = '';
    label = '';
    placeholder = '';
    resizable = input('both');
    customHeight = input('');
    name = '';
    controlName = '';
    parentForm;
    validation = [];
    viewType = 'base';
    row = '2';
    disabled = false;
    valueChange = new EventEmitter();
    isFocused = false;
    onFocus() {
        this.isFocused = true;
    }
    onBlur() {
        this.isFocused = false;
    }
    containRequiredError() {
        return this.validation.some((error) => error.errorType.includes(ComponentFormErrorConstant.REQUIRED));
    }
    onValueChange() {
        if (!this.disabled &&
            this.parentForm.controls[this.controlName].value?.length > 0) {
            this.parentForm.controls[this.controlName].markAsTouched();
        }
    }
    getMaxLength() {
        const control = this.parentForm.controls[this.controlName];
        if (!control || !control.validator) {
            return null;
        }
        // Trigger maxLength error with an infinitely long value
        const validatorResult = control.validator({
            value: { length: Infinity },
        });
        // If maxLength validator exists, it will return an error with requiredLength
        if (validatorResult && validatorResult['maxlength']) {
            return validatorResult['maxlength'].requiredLength;
        }
        return null;
    }
    getMinLength() {
        const control = this.parentForm.controls[this.controlName];
        if (!control || !control.validator) {
            return null;
        }
        // Trigger minLength error with an infinitely long value
        const validatorResult = control.validator({
            value: { length: Infinity },
        });
        // If minLength validator exists, it will return an error with requiredLength
        if (validatorResult && validatorResult['minlength']) {
            return validatorResult['minlength'].requiredLength;
        }
        return null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomTextareaFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomTextareaFormComponent, isStandalone: true, selector: "custom-textarea-form", inputs: { class: { classPropertyName: "class", publicName: "class", isSignal: false, isRequired: false, transformFunction: null }, labelClass: { classPropertyName: "labelClass", publicName: "labelClass", isSignal: false, isRequired: false, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: false, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: false, isRequired: false, transformFunction: null }, resizable: { classPropertyName: "resizable", publicName: "resizable", isSignal: true, isRequired: false, transformFunction: null }, customHeight: { classPropertyName: "customHeight", publicName: "customHeight", isSignal: true, isRequired: false, transformFunction: null }, name: { classPropertyName: "name", publicName: "name", isSignal: false, isRequired: true, transformFunction: null }, controlName: { classPropertyName: "controlName", publicName: "controlName", isSignal: false, isRequired: true, transformFunction: null }, parentForm: { classPropertyName: "parentForm", publicName: "parentForm", isSignal: false, isRequired: true, transformFunction: null }, validation: { classPropertyName: "validation", publicName: "validation", isSignal: false, isRequired: true, transformFunction: null }, viewType: { classPropertyName: "viewType", publicName: "viewType", isSignal: false, isRequired: false, transformFunction: null }, row: { classPropertyName: "row", publicName: "row", isSignal: false, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: false, isRequired: false, transformFunction: null } }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div\n  style=\"width: 100%\"\n  [formGroup]=\"parentForm\"\n  [class]=\"viewType\"\n  [class.has-error]=\"\n    parentForm.controls[controlName].invalid &&\n    parentForm.controls[controlName].touched\n  \"\n>\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\" [title]=\"label\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\">*</span>\n    } @else{\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n  <div\n    class=\"input-error-container\"\n    [class.has-error]=\"\n      parentForm.controls[controlName].invalid &&\n      parentForm.controls[controlName].touched\n    \"\n  >\n    @if( parentForm.controls[controlName].invalid &&\n    parentForm.controls[controlName].touched ){\n    <div class=\"text-area-error-container\">\n      <custom-app-error\n        [control]=\"parentForm.controls[controlName]\"\n        [validation]=\"validation\"\n        [name]=\"name\"\n      />\n    </div>\n    }\n    <textarea\n      [ngStyle]=\"{ resize: resizable(), height: customHeight() }\"\n      [id]=\"label\"\n      [name]=\"name\"\n      [placeholder]=\"placeholder\"\n      [class]=\"'custom-textarea ' + class\"\n      [formControlName]=\"controlName\"\n      [class.input-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched\n      \"\n      [rows]=\"row\"\n      (ngModelChange)=\"valueChange.emit($event); onValueChange()\"\n      [maxlength]=\"getMaxLength()\"\n      [minlength]=\"getMinLength()\"\n      (focus)=\"onFocus()\"\n      (blur)=\"onBlur()\"\n    >\n    </textarea>\n\n    <div\n      style=\"\n        position: absolute;\n        font-size: 0.65em;\n        right: 0.5em;\n        color: red;\n        top: -1.5em;\n        display: flex;\n        gap: 1em;\n      \"\n    >\n      @if(isFocused && (getMaxLength())){\n      <p>Max length is {{ getMaxLength() }} char</p>\n\n      } @if(isFocused && (getMinLength())){\n      <p>Min length is {{ getMinLength() }} char</p>\n      }\n    </div>\n\n    @if( parentForm.controls[controlName].invalid &&\n    parentForm.controls[controlName].touched ){\n    <span class=\"input-error-icon\">\n      <svg\n        width=\"22\"\n        height=\"22\"\n        viewBox=\"0 0 22 22\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <g clip-path=\"url(#clip0_9085_34629)\">\n          <path\n            d=\"M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 7V11\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 15H11.01\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n        <defs>\n          <clipPath id=\"clip0_9085_34629\">\n            <rect width=\"22\" height=\"22\" fill=\"white\" />\n          </clipPath>\n        </defs>\n      </svg>\n    </span>\n    }\n  </div>\n</div>\n", styles: [".base .custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.base .custom-textarea::placeholder{color:#82828250;font-size:1em;font-weight:400}.base .input-error-container{position:relative}.base .input-error-container .text-area-error-container custom-app-error{pointer-events:none}.base .input-error-container .text-area-error-container{position:absolute;top:calc(100% - 1.55em);right:-.6em;width:100%}.base .input-error-container .custom-textarea{width:100%;padding:.6em;resize:vertical;border-radius:.375em;border:1px solid rgba(130,130,130,.2);outline:none!important;box-shadow:none;font-size:1em;font-weight:400;min-height:4.5rem;transition:border-color .2s}.base .input-error-container .custom-textarea.input-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.base .input-error-container .input-error-icon{position:relative;left:calc(100% - 1.7em);top:-1.7em;transform:translateY(-50%);color:#e55658;font-size:1.5em;pointer-events:none}.ai-plan{border:1px solid #d1d1d1;border-radius:1.25em;padding:.75em 1.25em;height:100%;box-shadow:0 4px 7px #0000000d}.ai-plan.has-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.ai-plan .custom-label{font-size:.9em;text-overflow:ellipsis;text-wrap:nowrap;overflow:hidden;display:block;width:110%;line-height:1;font-size:.975em;color:#06203c99;margin-bottom:.5em;font-family:var(--FM-Light)}.ai-plan .custom-textarea::placeholder{color:#82828250;font-size:1em;font-weight:400}.ai-plan .input-error-container{position:relative}.ai-plan .input-error-container .text-area-error-container custom-app-error{pointer-events:none}.ai-plan .input-error-container .text-area-error-container{position:absolute;top:calc(100% - 1.55em);right:-.6em;width:100%}.ai-plan .input-error-container .custom-textarea{width:100%;padding:.6em;resize:vertical!important;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;min-height:9em;transition:border-color .2s}.ai-plan .input-error-container .custom-textarea.input-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.ai-plan .input-error-container .custom-textarea::-webkit-resizer{border-width:3em;border-style:solid;border-color:transparent #666 #666 transparent;background:transparent}.ai-plan .input-error-container .input-error-icon{position:relative;left:calc(100% - 1.7em);top:-1.7em;transform:translateY(-50%);color:#e55658;font-size:1.5em;pointer-events:none}\n"], dependencies: [{ kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name", "showErrors"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.MinLengthValidator, selector: "[minlength][formControlName],[minlength][formControl],[minlength][ngModel]", inputs: ["minlength"] }, { kind: "directive", type: i1$1.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomTextareaFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-textarea-form', standalone: true, imports: [CustomAppErrorComponent, ReactiveFormsModule, NgStyle], template: "<div\n  style=\"width: 100%\"\n  [formGroup]=\"parentForm\"\n  [class]=\"viewType\"\n  [class.has-error]=\"\n    parentForm.controls[controlName].invalid &&\n    parentForm.controls[controlName].touched\n  \"\n>\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\" [title]=\"label\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\">*</span>\n    } @else{\n    <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n  <div\n    class=\"input-error-container\"\n    [class.has-error]=\"\n      parentForm.controls[controlName].invalid &&\n      parentForm.controls[controlName].touched\n    \"\n  >\n    @if( parentForm.controls[controlName].invalid &&\n    parentForm.controls[controlName].touched ){\n    <div class=\"text-area-error-container\">\n      <custom-app-error\n        [control]=\"parentForm.controls[controlName]\"\n        [validation]=\"validation\"\n        [name]=\"name\"\n      />\n    </div>\n    }\n    <textarea\n      [ngStyle]=\"{ resize: resizable(), height: customHeight() }\"\n      [id]=\"label\"\n      [name]=\"name\"\n      [placeholder]=\"placeholder\"\n      [class]=\"'custom-textarea ' + class\"\n      [formControlName]=\"controlName\"\n      [class.input-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched\n      \"\n      [rows]=\"row\"\n      (ngModelChange)=\"valueChange.emit($event); onValueChange()\"\n      [maxlength]=\"getMaxLength()\"\n      [minlength]=\"getMinLength()\"\n      (focus)=\"onFocus()\"\n      (blur)=\"onBlur()\"\n    >\n    </textarea>\n\n    <div\n      style=\"\n        position: absolute;\n        font-size: 0.65em;\n        right: 0.5em;\n        color: red;\n        top: -1.5em;\n        display: flex;\n        gap: 1em;\n      \"\n    >\n      @if(isFocused && (getMaxLength())){\n      <p>Max length is {{ getMaxLength() }} char</p>\n\n      } @if(isFocused && (getMinLength())){\n      <p>Min length is {{ getMinLength() }} char</p>\n      }\n    </div>\n\n    @if( parentForm.controls[controlName].invalid &&\n    parentForm.controls[controlName].touched ){\n    <span class=\"input-error-icon\">\n      <svg\n        width=\"22\"\n        height=\"22\"\n        viewBox=\"0 0 22 22\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <g clip-path=\"url(#clip0_9085_34629)\">\n          <path\n            d=\"M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 7V11\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 15H11.01\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n        <defs>\n          <clipPath id=\"clip0_9085_34629\">\n            <rect width=\"22\" height=\"22\" fill=\"white\" />\n          </clipPath>\n        </defs>\n      </svg>\n    </span>\n    }\n  </div>\n</div>\n", styles: [".base .custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.base .custom-textarea::placeholder{color:#82828250;font-size:1em;font-weight:400}.base .input-error-container{position:relative}.base .input-error-container .text-area-error-container custom-app-error{pointer-events:none}.base .input-error-container .text-area-error-container{position:absolute;top:calc(100% - 1.55em);right:-.6em;width:100%}.base .input-error-container .custom-textarea{width:100%;padding:.6em;resize:vertical;border-radius:.375em;border:1px solid rgba(130,130,130,.2);outline:none!important;box-shadow:none;font-size:1em;font-weight:400;min-height:4.5rem;transition:border-color .2s}.base .input-error-container .custom-textarea.input-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.base .input-error-container .input-error-icon{position:relative;left:calc(100% - 1.7em);top:-1.7em;transform:translateY(-50%);color:#e55658;font-size:1.5em;pointer-events:none}.ai-plan{border:1px solid #d1d1d1;border-radius:1.25em;padding:.75em 1.25em;height:100%;box-shadow:0 4px 7px #0000000d}.ai-plan.has-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.ai-plan .custom-label{font-size:.9em;text-overflow:ellipsis;text-wrap:nowrap;overflow:hidden;display:block;width:110%;line-height:1;font-size:.975em;color:#06203c99;margin-bottom:.5em;font-family:var(--FM-Light)}.ai-plan .custom-textarea::placeholder{color:#82828250;font-size:1em;font-weight:400}.ai-plan .input-error-container{position:relative}.ai-plan .input-error-container .text-area-error-container custom-app-error{pointer-events:none}.ai-plan .input-error-container .text-area-error-container{position:absolute;top:calc(100% - 1.55em);right:-.6em;width:100%}.ai-plan .input-error-container .custom-textarea{width:100%;padding:.6em;resize:vertical!important;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;min-height:9em;transition:border-color .2s}.ai-plan .input-error-container .custom-textarea.input-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.ai-plan .input-error-container .custom-textarea::-webkit-resizer{border-width:3em;border-style:solid;border-color:transparent #666 #666 transparent;background:transparent}.ai-plan .input-error-container .input-error-icon{position:relative;left:calc(100% - 1.7em);top:-1.7em;transform:translateY(-50%);color:#e55658;font-size:1.5em;pointer-events:none}\n"] }]
        }], propDecorators: { class: [{
                type: Input
            }], labelClass: [{
                type: Input
            }], label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], name: [{
                type: Input,
                args: [{ required: true }]
            }], controlName: [{
                type: Input,
                args: [{ required: true }]
            }], parentForm: [{
                type: Input,
                args: [{ required: true }]
            }], validation: [{
                type: Input,
                args: [{ required: true }]
            }], viewType: [{
                type: Input
            }], row: [{
                type: Input
            }], disabled: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });

class CustomBreadcrumbComponent {
    router;
    breadcrumbItems = [];
    breadcrumbItemClicked = (item) => {
        // route to url
        // console.log('Breadcrumb item clicked:', item);
        this.router.navigate([item.url]);
    };
    constructor(router) {
        this.router = router;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomBreadcrumbComponent, deps: [{ token: i3.Router }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomBreadcrumbComponent, isStandalone: true, selector: "custom-breadcrumb", inputs: { breadcrumbItems: "breadcrumbItems" }, outputs: { breadcrumbItemClicked: "breadcrumbItemClicked" }, ngImport: i0, template: "<div class=\"breadcrumb\">\n  @for(item of breadcrumbItems ; track $index){\n\n  <p\n    [ngClass]=\"{\n    'first-item' : $index !== breadcrumbItems.length -1 ,\n    'last-item' : $index === breadcrumbItems.length -1 ,\n    }\"\n    (click)=\"breadcrumbItemClicked(item)\"\n  >\n    {{ item.label }}\n  </p>\n\n  @if( $index !== breadcrumbItems.length -1 ){\n    <div class=\"icon-wrapper\">\n\n      <svg\n        width=\"auto\"\n        height=\"11\"\n        viewBox=\"0 0 7 11\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          fill-rule=\"evenodd\"\n          clip-rule=\"evenodd\"\n          d=\"M0.327452 0.327391C0.652889 0.00195375 1.18053 0.00195375 1.50596 0.327391L6.0893 4.91072C6.41473 5.23616 6.41473 5.7638 6.0893 6.08923L1.50596 10.6726C1.18053 10.998 0.652889 10.998 0.327452 10.6726C0.00201478 10.3471 0.00201478 9.81949 0.327452 9.49406L4.32153 5.49998L0.327452 1.5059C0.00201478 1.18046 0.00201478 0.652828 0.327452 0.327391Z\"\n          fill=\"#147A72\"\n        />\n      </svg>\n    </div>\n\n  } }\n</div>\n", styles: [".first-item{margin:0!important;cursor:pointer;color:#06213d;font-family:var(--FM-Light)}.last-item{margin:0!important;cursor:pointer;color:#06213d;font-family:var(--FM-Medium)}.breadcrumb{display:flex;align-items:center;list-style:none;padding:.5em 0 1em;margin:0;font-size:1em;color:#1e202c;gap:.5em}.icon-wrapper{width:.5em;height:auto}.icon-wrapper svg{width:100%!important;height:auto;display:block}\n"], dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomBreadcrumbComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-breadcrumb', imports: [NgClass], template: "<div class=\"breadcrumb\">\n  @for(item of breadcrumbItems ; track $index){\n\n  <p\n    [ngClass]=\"{\n    'first-item' : $index !== breadcrumbItems.length -1 ,\n    'last-item' : $index === breadcrumbItems.length -1 ,\n    }\"\n    (click)=\"breadcrumbItemClicked(item)\"\n  >\n    {{ item.label }}\n  </p>\n\n  @if( $index !== breadcrumbItems.length -1 ){\n    <div class=\"icon-wrapper\">\n\n      <svg\n        width=\"auto\"\n        height=\"11\"\n        viewBox=\"0 0 7 11\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          fill-rule=\"evenodd\"\n          clip-rule=\"evenodd\"\n          d=\"M0.327452 0.327391C0.652889 0.00195375 1.18053 0.00195375 1.50596 0.327391L6.0893 4.91072C6.41473 5.23616 6.41473 5.7638 6.0893 6.08923L1.50596 10.6726C1.18053 10.998 0.652889 10.998 0.327452 10.6726C0.00201478 10.3471 0.00201478 9.81949 0.327452 9.49406L4.32153 5.49998L0.327452 1.5059C0.00201478 1.18046 0.00201478 0.652828 0.327452 0.327391Z\"\n          fill=\"#147A72\"\n        />\n      </svg>\n    </div>\n\n  } }\n</div>\n", styles: [".first-item{margin:0!important;cursor:pointer;color:#06213d;font-family:var(--FM-Light)}.last-item{margin:0!important;cursor:pointer;color:#06213d;font-family:var(--FM-Medium)}.breadcrumb{display:flex;align-items:center;list-style:none;padding:.5em 0 1em;margin:0;font-size:1em;color:#1e202c;gap:.5em}.icon-wrapper{width:.5em;height:auto}.icon-wrapper svg{width:100%!important;height:auto;display:block}\n"] }]
        }], ctorParameters: () => [{ type: i3.Router }], propDecorators: { breadcrumbItems: [{
                type: Input,
                args: [{ required: true }]
            }], breadcrumbItemClicked: [{
                type: Output
            }] } });

class CustomToggleSwitchComponent {
    value = false;
    label = '';
    labelPosition = 'right';
    disabled = false;
    size = 'medium';
    onColor = '#4CAF50';
    offColor = '#F43F5E';
    thumbColor = '#ffffff';
    valueChange = new EventEmitter();
    toggle() {
        if (!this.disabled) {
            this.value = !this.value;
            this.valueChange.emit(this.value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomToggleSwitchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomToggleSwitchComponent, isStandalone: true, selector: "custom-toggle-switch", inputs: { value: "value", label: "label", labelPosition: "labelPosition", disabled: "disabled", size: "size", onColor: "onColor", offColor: "offColor", thumbColor: "thumbColor" }, outputs: { valueChange: "valueChange" }, host: { listeners: { "click": "toggle()" } }, ngImport: i0, template: "<div class=\"toggle-container\" [class.disabled]=\"disabled\">\n  @if(label && labelPosition === 'left') {\n  <span class=\"toggle-label left\">{{ label }}</span>\n  }\n\n  <div\n    class=\"toggle-switch\"\n    [class.active]=\"value\"\n    [class.small]=\"size === 'small'\"\n    [class.medium]=\"size === 'medium'\"\n    [class.large]=\"size === 'large'\"\n    [style.background-color]=\"value ? onColor : offColor\"\n  >\n    <div\n      class=\"toggle-thumb\"\n      [class.active]=\"value\"\n      [class.small]=\"size === 'small'\"\n      [class.medium]=\"size === 'medium'\"\n      [class.large]=\"size === 'large'\"\n      [style.background-color]=\"thumbColor\"\n    ></div>\n  </div>\n\n  @if(label && labelPosition === 'right') {\n  <span class=\"toggle-label right\">{{ label }}</span>\n  }\n</div>\n", styles: [".toggle-container{display:inline-flex;align-items:center;gap:12px;cursor:pointer;-webkit-tap-highlight-color:transparent}.toggle-label{font-family:Segoe UI,system-ui,sans-serif;font-size:14px;font-weight:500;color:#333;transition:color .2s ease}.toggle-label.left{order:1;margin-right:12px}.toggle-label.right{order:3;margin-left:12px}.toggle-switch{order:2;position:relative;display:inline-block;border-radius:16px;transition:all .3s cubic-bezier(.34,1.56,.64,1);box-shadow:inset 0 1px 3px #0000001a;background-color:#e0e0e0}.toggle-thumb{position:absolute;border-radius:50%;transition:all .3s cubic-bezier(.34,1.56,.64,1);background-color:#fff;box-shadow:0 2px 4px #0003;top:1.5px;left:2px}.toggle-switch.active{background-color:#4caf50}.toggle-thumb.active{transform:translate(calc(100% - 2px))}.toggle-switch.small{width:36px;height:20px}.toggle-thumb.small{width:16px;height:16px}.toggle-switch.medium{width:44px;height:24px}.toggle-thumb.medium{width:20px;height:20px}.toggle-switch.large{width:52px;height:28px}.toggle-thumb.large{width:24px;height:24px}.toggle-container.disabled{cursor:not-allowed!important;opacity:.6}.toggle-container:focus-within .toggle-switch{outline:2px solid #90caf9;outline-offset:2px}@media (prefers-color-scheme: dark){.toggle-label{color:#f5f5f5}.toggle-switch:not(.active){background-color:#555}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomToggleSwitchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-toggle-switch', imports: [CommonModule], template: "<div class=\"toggle-container\" [class.disabled]=\"disabled\">\n  @if(label && labelPosition === 'left') {\n  <span class=\"toggle-label left\">{{ label }}</span>\n  }\n\n  <div\n    class=\"toggle-switch\"\n    [class.active]=\"value\"\n    [class.small]=\"size === 'small'\"\n    [class.medium]=\"size === 'medium'\"\n    [class.large]=\"size === 'large'\"\n    [style.background-color]=\"value ? onColor : offColor\"\n  >\n    <div\n      class=\"toggle-thumb\"\n      [class.active]=\"value\"\n      [class.small]=\"size === 'small'\"\n      [class.medium]=\"size === 'medium'\"\n      [class.large]=\"size === 'large'\"\n      [style.background-color]=\"thumbColor\"\n    ></div>\n  </div>\n\n  @if(label && labelPosition === 'right') {\n  <span class=\"toggle-label right\">{{ label }}</span>\n  }\n</div>\n", styles: [".toggle-container{display:inline-flex;align-items:center;gap:12px;cursor:pointer;-webkit-tap-highlight-color:transparent}.toggle-label{font-family:Segoe UI,system-ui,sans-serif;font-size:14px;font-weight:500;color:#333;transition:color .2s ease}.toggle-label.left{order:1;margin-right:12px}.toggle-label.right{order:3;margin-left:12px}.toggle-switch{order:2;position:relative;display:inline-block;border-radius:16px;transition:all .3s cubic-bezier(.34,1.56,.64,1);box-shadow:inset 0 1px 3px #0000001a;background-color:#e0e0e0}.toggle-thumb{position:absolute;border-radius:50%;transition:all .3s cubic-bezier(.34,1.56,.64,1);background-color:#fff;box-shadow:0 2px 4px #0003;top:1.5px;left:2px}.toggle-switch.active{background-color:#4caf50}.toggle-thumb.active{transform:translate(calc(100% - 2px))}.toggle-switch.small{width:36px;height:20px}.toggle-thumb.small{width:16px;height:16px}.toggle-switch.medium{width:44px;height:24px}.toggle-thumb.medium{width:20px;height:20px}.toggle-switch.large{width:52px;height:28px}.toggle-thumb.large{width:24px;height:24px}.toggle-container.disabled{cursor:not-allowed!important;opacity:.6}.toggle-container:focus-within .toggle-switch{outline:2px solid #90caf9;outline-offset:2px}@media (prefers-color-scheme: dark){.toggle-label{color:#f5f5f5}.toggle-switch:not(.active){background-color:#555}}\n"] }]
        }], propDecorators: { value: [{
                type: Input,
                args: [{ required: true }]
            }], label: [{
                type: Input
            }], labelPosition: [{
                type: Input
            }], disabled: [{
                type: Input
            }], size: [{
                type: Input,
                args: [{ required: true }]
            }], onColor: [{
                type: Input
            }], offColor: [{
                type: Input
            }], thumbColor: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], toggle: [{
                type: HostListener,
                args: ['click']
            }] } });

class CustomToggleSwitchFormComponent {
    label = '';
    size = 'medium';
    onColor = '#4CAF50';
    offColor = '#757575';
    thumbColor = '#ffffff';
    disabled = false;
    parentForm;
    controlName;
    validation = [];
    trueValue;
    falseValue;
    height = '3.6em';
    value = false;
    destroy$ = new Subject();
    ngOnInit() {
        const control = this.parentForm.get(this.controlName);
        if (!control)
            return;
        // Initialize from current value
        this.value = this.isTrue(control.value);
        // React to external changes
        control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((val) => {
            this.value = this.isTrue(val);
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    toggle() {
        if (this.disabled)
            return;
        this.value = !this.value;
        const formValue = this.value
            ? this.trueValue?.id ?? true
            : this.falseValue?.id ?? false;
        // Avoid feedback loop by setting only if different
        const control = this.parentForm.get(this.controlName);
        if (control && control.value !== formValue) {
            control.setValue(formValue);
            control.markAsDirty();
            control.markAsTouched();
        }
    }
    isTrue(val) {
        if (this.trueValue)
            return val === this.trueValue.id;
        if (this.falseValue)
            return val !== this.falseValue.id && !!val;
        return !!val;
    }
    containRequiredError() {
        return this.validation.some((error) => error.errorType.includes(ComponentFormErrorConstant.REQUIRED));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomToggleSwitchFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomToggleSwitchFormComponent, isStandalone: true, selector: "custom-toggle-switch-form", inputs: { label: "label", size: "size", onColor: "onColor", offColor: "offColor", thumbColor: "thumbColor", disabled: "disabled", parentForm: "parentForm", controlName: "controlName", validation: "validation", trueValue: "trueValue", falseValue: "falseValue", height: "height" }, ngImport: i0, template: "<div [formGroup]=\"parentForm\">\n  <div class=\"main-toggle-container\" [ngStyle]=\"{ '--height': height }\">\n    @if(label){\n    <label [for]=\"label\" [class]=\"'custom-label '\">\n      {{ label }}\n\n      @if(containRequiredError()){\n      <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\">*</span>\n      } @else{\n      <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\"\n        >&nbsp;</span\n      >\n      }\n    </label>\n    }\n    <div\n      (click)=\"toggle()\"\n      class=\"toggle-container\"\n      [class.disabled]=\"disabled\"\n    >\n      <div\n        class=\"toggle-switch\"\n        [class.active]=\"value\"\n        [class.small]=\"size === 'small'\"\n        [class.medium]=\"size === 'medium'\"\n        [class.large]=\"size === 'large'\"\n        [style.background-color]=\"value ? onColor : offColor\"\n      >\n        <div\n          class=\"toggle-thumb\"\n          [class.active]=\"value\"\n          [class.small]=\"size === 'small'\"\n          [class.medium]=\"size === 'medium'\"\n          [class.large]=\"size === 'large'\"\n          [style.background-color]=\"thumbColor\"\n        ></div>\n      </div>\n\n      @if(trueValue) {\n      <span class=\"toggle-value right\">{{\n        value ? trueValue.nameEn || \"true\" : falseValue.nameEn || \"false\"\n      }}</span>\n      }\n    </div>\n  </div>\n</div>\n", styles: [".main-toggle-container{display:flex;flex-direction:column;align-items:start;gap:.3em}.custom-label{display:block;font-size:1em;font-weight:500;color:#707070}.toggle-container{display:inline-flex;align-items:center;gap:12px;cursor:pointer;-webkit-tap-highlight-color:transparent;height:var(--height)}.toggle-value{font-family:Segoe UI,system-ui,sans-serif;font-size:14px;font-weight:500;color:#707070;transition:color .2s ease}.toggle-value.left{order:1;margin-right:12px}.toggle-value.right{order:3}.toggle-switch{order:2;position:relative;display:inline-block;border-radius:16px;transition:all .3s cubic-bezier(.34,1.56,.64,1);box-shadow:inset 0 1px 3px #0000001a;background-color:#e0e0e0}.toggle-thumb{position:absolute;border-radius:50%;transition:all .3s cubic-bezier(.34,1.56,.64,1);background-color:#fff;box-shadow:0 2px 4px #0003;top:.1em;left:.1em}.toggle-switch.active{background-color:#4caf50}.toggle-thumb.active{transform:translate(calc(100% - 2px))}.toggle-switch.small{width:36px;height:20px}.toggle-thumb.small{width:16px;height:16px}.toggle-switch.medium{width:2.75em;height:1.54em}.toggle-thumb.medium{width:1.325em;height:1.325em}.toggle-switch.large{width:52px;height:28px}.toggle-thumb.large{width:24px;height:24px}.toggle-container:focus-within .toggle-switch{outline:2px solid #90caf9;outline-offset:2px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomToggleSwitchFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-toggle-switch-form', imports: [CommonModule, ReactiveFormsModule], template: "<div [formGroup]=\"parentForm\">\n  <div class=\"main-toggle-container\" [ngStyle]=\"{ '--height': height }\">\n    @if(label){\n    <label [for]=\"label\" [class]=\"'custom-label '\">\n      {{ label }}\n\n      @if(containRequiredError()){\n      <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\">*</span>\n      } @else{\n      <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\"\n        >&nbsp;</span\n      >\n      }\n    </label>\n    }\n    <div\n      (click)=\"toggle()\"\n      class=\"toggle-container\"\n      [class.disabled]=\"disabled\"\n    >\n      <div\n        class=\"toggle-switch\"\n        [class.active]=\"value\"\n        [class.small]=\"size === 'small'\"\n        [class.medium]=\"size === 'medium'\"\n        [class.large]=\"size === 'large'\"\n        [style.background-color]=\"value ? onColor : offColor\"\n      >\n        <div\n          class=\"toggle-thumb\"\n          [class.active]=\"value\"\n          [class.small]=\"size === 'small'\"\n          [class.medium]=\"size === 'medium'\"\n          [class.large]=\"size === 'large'\"\n          [style.background-color]=\"thumbColor\"\n        ></div>\n      </div>\n\n      @if(trueValue) {\n      <span class=\"toggle-value right\">{{\n        value ? trueValue.nameEn || \"true\" : falseValue.nameEn || \"false\"\n      }}</span>\n      }\n    </div>\n  </div>\n</div>\n", styles: [".main-toggle-container{display:flex;flex-direction:column;align-items:start;gap:.3em}.custom-label{display:block;font-size:1em;font-weight:500;color:#707070}.toggle-container{display:inline-flex;align-items:center;gap:12px;cursor:pointer;-webkit-tap-highlight-color:transparent;height:var(--height)}.toggle-value{font-family:Segoe UI,system-ui,sans-serif;font-size:14px;font-weight:500;color:#707070;transition:color .2s ease}.toggle-value.left{order:1;margin-right:12px}.toggle-value.right{order:3}.toggle-switch{order:2;position:relative;display:inline-block;border-radius:16px;transition:all .3s cubic-bezier(.34,1.56,.64,1);box-shadow:inset 0 1px 3px #0000001a;background-color:#e0e0e0}.toggle-thumb{position:absolute;border-radius:50%;transition:all .3s cubic-bezier(.34,1.56,.64,1);background-color:#fff;box-shadow:0 2px 4px #0003;top:.1em;left:.1em}.toggle-switch.active{background-color:#4caf50}.toggle-thumb.active{transform:translate(calc(100% - 2px))}.toggle-switch.small{width:36px;height:20px}.toggle-thumb.small{width:16px;height:16px}.toggle-switch.medium{width:2.75em;height:1.54em}.toggle-thumb.medium{width:1.325em;height:1.325em}.toggle-switch.large{width:52px;height:28px}.toggle-thumb.large{width:24px;height:24px}.toggle-container:focus-within .toggle-switch{outline:2px solid #90caf9;outline-offset:2px}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], size: [{
                type: Input
            }], onColor: [{
                type: Input
            }], offColor: [{
                type: Input
            }], thumbColor: [{
                type: Input
            }], disabled: [{
                type: Input
            }], parentForm: [{
                type: Input,
                args: [{ required: true }]
            }], controlName: [{
                type: Input,
                args: [{ required: true }]
            }], validation: [{
                type: Input
            }], trueValue: [{
                type: Input
            }], falseValue: [{
                type: Input
            }], height: [{
                type: Input
            }] } });

class CustomToastComponent {
    positionClass = 'toast-top-right';
    colorClass = 'toast-info';
    toastService = inject(ToastService);
    constructor() {
        effect(() => {
            this.updatePositionClass(this.toastService.position());
            this.updateColorClass(this.toastService.type());
        });
    }
    updatePositionClass(position) {
        switch (position) {
            case 'top-right':
                this.positionClass = 'toast-top-right';
                break;
            case 'top-left':
                this.positionClass = 'toast-top-left';
                break;
            case 'bottom-right':
                this.positionClass = 'toast-bottom-right';
                break;
            case 'bottom-left':
                this.positionClass = 'toast-bottom-left';
                break;
            case 'top-center':
                this.positionClass = 'toast-top-center';
                break;
            case 'bottom-center':
                this.positionClass = 'toast-bottom-center';
                break;
            default:
                this.positionClass = 'toast-top-right';
                break;
        }
    }
    updateColorClass(type) {
        switch (type) {
            case 'success':
                this.colorClass = 'toast-success';
                break;
            case 'warning':
                this.colorClass = 'toast-warning';
                break;
            case 'black':
                this.colorClass = 'toast-black';
                break;
            case 'error':
                this.colorClass = 'toast-error';
                break;
            case 'info':
                this.colorClass = 'toast-info';
                break;
            default:
                this.colorClass = 'toast-info';
                break;
        }
    }
    hideToast() {
        this.toastService.hideToast();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomToastComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomToastComponent, isStandalone: true, selector: "custom-toast", ngImport: i0, template: "@if(toastService.show()){\n<div [class]=\"'custom-toast ' + positionClass + ' ' + colorClass\">\n  @if(toastService.type() === \"info\" || toastService.type() === \"black\") {\n    <svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15 3.75C8.7868 3.75 3.75 8.7868 3.75 15C3.75 21.2132 8.7868 26.25 15 26.25C21.2132 26.25 26.25 21.2132 26.25 15C26.25 8.7868 21.2132 3.75 15 3.75ZM1.25 15C1.25 7.40608 7.40608 1.25 15 1.25C22.5939 1.25 28.75 7.40608 28.75 15C28.75 22.5939 22.5939 28.75 15 28.75C7.40608 28.75 1.25 22.5939 1.25 15Z\" fill=\"white\"/>\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15 13.75C15.6904 13.75 16.25 14.3096 16.25 15V20C16.25 20.6904 15.6904 21.25 15 21.25C14.3096 21.25 13.75 20.6904 13.75 20V15C13.75 14.3096 14.3096 13.75 15 13.75Z\" fill=\"white\"/>\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.75 10C13.75 9.30964 14.3096 8.75 15 8.75H15.0125C15.7029 8.75 16.2625 9.30964 16.2625 10C16.2625 10.6904 15.7029 11.25 15.0125 11.25H15C14.3096 11.25 13.75 10.6904 13.75 10Z\" fill=\"white\"/>\n        </svg>\n        \n\n  } @else if(toastService.type() === \"success\") {\n  <svg\n    width=\"30\"\n    height=\"30\"\n    viewBox=\"0 0 30 30\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M19.5788 4.7168C17.3628 3.72943 14.887 3.48482 12.5207 4.01946C10.1544 4.5541 8.02427 5.83935 6.44807 7.68351C4.87186 9.52767 3.93401 11.8319 3.77439 14.2527C3.61477 16.6734 4.24193 19.0808 5.56233 21.116C6.88274 23.1512 8.82564 24.705 11.1013 25.5457C13.3769 26.3864 15.8634 26.469 18.1898 25.7812C20.5162 25.0933 22.5579 23.6719 24.0105 21.7289C25.4631 19.7858 26.2486 17.4253 26.25 14.9993V13.85C26.25 13.1597 26.8097 12.6 27.5 12.6C28.1904 12.6 28.75 13.1597 28.75 13.85V15C28.7483 17.9651 27.7882 20.8509 26.0128 23.2257C24.2375 25.6006 21.742 27.3379 18.8986 28.1786C16.0552 29.0193 13.0162 28.9183 10.2349 27.8908C7.45356 26.8632 5.0789 24.9641 3.46507 22.4767C1.85124 19.9893 1.08471 17.0468 1.27981 14.0882C1.4749 11.1295 2.62116 8.31318 4.54763 6.0592C6.47411 3.80523 9.07758 2.23438 11.9698 1.58093C14.8619 0.92748 17.8879 1.22644 20.5963 2.43323C21.2268 2.7142 21.5103 3.45317 21.2293 4.08377C20.9483 4.71436 20.2093 4.99777 19.5788 4.7168Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M28.3834 4.11567C28.8718 4.60359 28.8722 5.39504 28.3843 5.88344L15.8843 18.3959C15.6499 18.6306 15.3319 18.7624 15.0003 18.7625C14.6687 18.7626 14.3506 18.6309 14.1161 18.3964L10.3661 14.6464C9.87796 14.1582 9.87796 13.3668 10.3661 12.8786C10.8543 12.3905 11.6457 12.3905 12.1339 12.8786L14.9996 15.7443L26.6157 4.11656C27.1036 3.62816 27.895 3.62776 28.3834 4.11567Z\"\n      fill=\"white\"\n    />\n  </svg>\n\n  } @else if(toastService.type() === \"warning\") {\n  <svg\n    width=\"30\"\n    height=\"30\"\n    viewBox=\"0 0 30 30\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M13.1603 2.85388C13.7219 2.53769 14.3555 2.37158 15 2.37158C15.6445 2.37158 16.2782 2.53769 16.8398 2.85388C17.4014 3.17008 17.872 3.62568 18.2063 4.17673L18.2099 4.18266L28.7974 21.8577L28.8075 21.8749C29.1349 22.442 29.3082 23.0849 29.31 23.7397C29.3119 24.3944 29.1422 25.0383 28.818 25.6072C28.4937 26.176 28.0262 26.6501 27.4618 26.9822C26.8975 27.3142 26.256 27.4927 25.6013 27.4999L25.5875 27.5001L4.39879 27.5C3.74403 27.4928 3.10258 27.3142 2.53824 26.9822C1.9739 26.6501 1.50634 26.176 1.18209 25.6072C0.857833 25.0383 0.688184 24.3944 0.690017 23.7397C0.691851 23.0849 0.865103 22.442 1.19254 21.8749L1.20269 21.8577L11.7938 4.17672C12.128 3.62567 12.5987 3.17008 13.1603 2.85388ZM15 4.87158C14.7852 4.87158 14.574 4.92695 14.3868 5.03235C14.2004 5.13727 14.0441 5.28824 13.9328 5.47081L3.35338 23.1323C3.24691 23.3195 3.19061 23.5312 3.19001 23.7467C3.1894 23.9649 3.24595 24.1795 3.35403 24.3692C3.46212 24.5588 3.61797 24.7168 3.80608 24.8275C3.99255 24.9372 4.20427 24.9966 4.42052 25H25.5795C25.7958 24.9966 26.0075 24.9372 26.194 24.8275C26.3821 24.7168 26.5379 24.5588 26.646 24.3692C26.7541 24.1795 26.8107 23.9649 26.81 23.7467C26.8094 23.5312 26.7532 23.3196 26.6467 23.1324L16.0688 5.4733C16.0683 5.47247 16.0678 5.47164 16.0673 5.47081C15.9559 5.28824 15.7996 5.13727 15.6133 5.03235C15.4261 4.92695 15.2149 4.87158 15 4.87158Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M15 10C15.6904 10 16.25 10.5596 16.25 11.25V16.25C16.25 16.9404 15.6904 17.5 15 17.5C14.3096 17.5 13.75 16.9404 13.75 16.25V11.25C13.75 10.5596 14.3096 10 15 10Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M13.75 21.25C13.75 20.5596 14.3096 20 15 20H15.0125C15.7029 20 16.2625 20.5596 16.2625 21.25C16.2625 21.9404 15.7029 22.5 15.0125 22.5H15C14.3096 22.5 13.75 21.9404 13.75 21.25Z\"\n      fill=\"white\"\n    />\n  </svg>\n\n  } @else if(toastService.type() === \"error\") {\n  <svg\n    width=\"30\"\n    height=\"30\"\n    viewBox=\"0 0 30 30\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M8.94112 1.61612C9.17554 1.3817 9.49348 1.25 9.825 1.25H20.175C20.5065 1.25 20.8245 1.3817 21.0589 1.61612L28.3839 8.94112C28.6183 9.17554 28.75 9.49348 28.75 9.825V20.175C28.75 20.5065 28.6183 20.8245 28.3839 21.0589L21.0589 28.3839C20.8245 28.6183 20.5065 28.75 20.175 28.75H9.825C9.49348 28.75 9.17554 28.6183 8.94112 28.3839L1.61612 21.0589C1.3817 20.8245 1.25 20.5065 1.25 20.175V9.825C1.25 9.49348 1.3817 9.17554 1.61612 8.94112L8.94112 1.61612ZM10.3428 3.75L3.75 10.3428V19.6572L10.3428 26.25H19.6572L26.25 19.6572V10.3428L19.6572 3.75H10.3428Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M19.6339 10.3661C20.122 10.8543 20.122 11.6457 19.6339 12.1339L12.1339 19.6339C11.6457 20.122 10.8543 20.122 10.3661 19.6339C9.87796 19.1457 9.87796 18.3543 10.3661 17.8661L17.8661 10.3661C18.3543 9.87796 19.1457 9.87796 19.6339 10.3661Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M10.3661 10.3661C10.8543 9.87796 11.6457 9.87796 12.1339 10.3661L19.6339 17.8661C20.122 18.3543 20.122 19.1457 19.6339 19.6339C19.1457 20.122 18.3543 20.122 17.8661 19.6339L10.3661 12.1339C9.87796 11.6457 9.87796 10.8543 10.3661 10.3661Z\"\n      fill=\"white\"\n    />\n  </svg>\n\n  }\n\n  <p class=\"custom-toast-message\">{{ toastService.message() }}</p>\n\n  <svg class=\"close-toast\" (click)=\"hideToast()\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15.5893 4.41073C15.9147 4.73617 15.9147 5.26381 15.5893 5.58925L5.58928 15.5892C5.26384 15.9147 4.7362 15.9147 4.41076 15.5892C4.08533 15.2638 4.08533 14.7362 4.41076 14.4107L14.4108 4.41073C14.7362 4.0853 15.2638 4.0853 15.5893 4.41073Z\" fill=\"white\"/>\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.41076 4.41073C4.7362 4.0853 5.26384 4.0853 5.58928 4.41073L15.5893 14.4107C15.9147 14.7362 15.9147 15.2638 15.5893 15.5892C15.2638 15.9147 14.7362 15.9147 14.4108 15.5892L4.41076 5.58925C4.08533 5.26381 4.08533 4.73617 4.41076 4.41073Z\" fill=\"white\"/>\n    </svg>\n    \n</div>\n\n}\n", styles: [".custom-toast{width:500px;min-height:60px;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:20px;border-radius:10px}.toast-top-right{position:fixed;z-index:9999;top:20px;right:20px}.toast-top-left{position:fixed;z-index:9999;top:20px;left:20px}.toast-bottom-right{position:fixed;z-index:9999;bottom:20px;right:20px}.toast-bottom-left{position:fixed;z-index:9999;bottom:20px;left:20px}.toast-top-center{position:fixed;z-index:9999;top:20px;left:50%;transform:translate(-50%)}.toast-bottom-center{position:fixed;z-index:9999;bottom:20px;left:50%;transform:translate(-50%)}.toast-success{background-color:#19af66;color:#fff}.toast-error{background-color:#ff4d4f;color:#fff}.toast-warning{background-color:#ffbf00;color:#fff}.toast-info{background-color:#9d67aa;color:#fff}.toast-black{background-color:#000;color:#fff}.custom-toast-message{font-weight:500;font-size:16px;text-align:start;width:100%;text-wrap:wrap}.close-toast{cursor:pointer}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomToastComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-toast', imports: [], template: "@if(toastService.show()){\n<div [class]=\"'custom-toast ' + positionClass + ' ' + colorClass\">\n  @if(toastService.type() === \"info\" || toastService.type() === \"black\") {\n    <svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15 3.75C8.7868 3.75 3.75 8.7868 3.75 15C3.75 21.2132 8.7868 26.25 15 26.25C21.2132 26.25 26.25 21.2132 26.25 15C26.25 8.7868 21.2132 3.75 15 3.75ZM1.25 15C1.25 7.40608 7.40608 1.25 15 1.25C22.5939 1.25 28.75 7.40608 28.75 15C28.75 22.5939 22.5939 28.75 15 28.75C7.40608 28.75 1.25 22.5939 1.25 15Z\" fill=\"white\"/>\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15 13.75C15.6904 13.75 16.25 14.3096 16.25 15V20C16.25 20.6904 15.6904 21.25 15 21.25C14.3096 21.25 13.75 20.6904 13.75 20V15C13.75 14.3096 14.3096 13.75 15 13.75Z\" fill=\"white\"/>\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.75 10C13.75 9.30964 14.3096 8.75 15 8.75H15.0125C15.7029 8.75 16.2625 9.30964 16.2625 10C16.2625 10.6904 15.7029 11.25 15.0125 11.25H15C14.3096 11.25 13.75 10.6904 13.75 10Z\" fill=\"white\"/>\n        </svg>\n        \n\n  } @else if(toastService.type() === \"success\") {\n  <svg\n    width=\"30\"\n    height=\"30\"\n    viewBox=\"0 0 30 30\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M19.5788 4.7168C17.3628 3.72943 14.887 3.48482 12.5207 4.01946C10.1544 4.5541 8.02427 5.83935 6.44807 7.68351C4.87186 9.52767 3.93401 11.8319 3.77439 14.2527C3.61477 16.6734 4.24193 19.0808 5.56233 21.116C6.88274 23.1512 8.82564 24.705 11.1013 25.5457C13.3769 26.3864 15.8634 26.469 18.1898 25.7812C20.5162 25.0933 22.5579 23.6719 24.0105 21.7289C25.4631 19.7858 26.2486 17.4253 26.25 14.9993V13.85C26.25 13.1597 26.8097 12.6 27.5 12.6C28.1904 12.6 28.75 13.1597 28.75 13.85V15C28.7483 17.9651 27.7882 20.8509 26.0128 23.2257C24.2375 25.6006 21.742 27.3379 18.8986 28.1786C16.0552 29.0193 13.0162 28.9183 10.2349 27.8908C7.45356 26.8632 5.0789 24.9641 3.46507 22.4767C1.85124 19.9893 1.08471 17.0468 1.27981 14.0882C1.4749 11.1295 2.62116 8.31318 4.54763 6.0592C6.47411 3.80523 9.07758 2.23438 11.9698 1.58093C14.8619 0.92748 17.8879 1.22644 20.5963 2.43323C21.2268 2.7142 21.5103 3.45317 21.2293 4.08377C20.9483 4.71436 20.2093 4.99777 19.5788 4.7168Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M28.3834 4.11567C28.8718 4.60359 28.8722 5.39504 28.3843 5.88344L15.8843 18.3959C15.6499 18.6306 15.3319 18.7624 15.0003 18.7625C14.6687 18.7626 14.3506 18.6309 14.1161 18.3964L10.3661 14.6464C9.87796 14.1582 9.87796 13.3668 10.3661 12.8786C10.8543 12.3905 11.6457 12.3905 12.1339 12.8786L14.9996 15.7443L26.6157 4.11656C27.1036 3.62816 27.895 3.62776 28.3834 4.11567Z\"\n      fill=\"white\"\n    />\n  </svg>\n\n  } @else if(toastService.type() === \"warning\") {\n  <svg\n    width=\"30\"\n    height=\"30\"\n    viewBox=\"0 0 30 30\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M13.1603 2.85388C13.7219 2.53769 14.3555 2.37158 15 2.37158C15.6445 2.37158 16.2782 2.53769 16.8398 2.85388C17.4014 3.17008 17.872 3.62568 18.2063 4.17673L18.2099 4.18266L28.7974 21.8577L28.8075 21.8749C29.1349 22.442 29.3082 23.0849 29.31 23.7397C29.3119 24.3944 29.1422 25.0383 28.818 25.6072C28.4937 26.176 28.0262 26.6501 27.4618 26.9822C26.8975 27.3142 26.256 27.4927 25.6013 27.4999L25.5875 27.5001L4.39879 27.5C3.74403 27.4928 3.10258 27.3142 2.53824 26.9822C1.9739 26.6501 1.50634 26.176 1.18209 25.6072C0.857833 25.0383 0.688184 24.3944 0.690017 23.7397C0.691851 23.0849 0.865103 22.442 1.19254 21.8749L1.20269 21.8577L11.7938 4.17672C12.128 3.62567 12.5987 3.17008 13.1603 2.85388ZM15 4.87158C14.7852 4.87158 14.574 4.92695 14.3868 5.03235C14.2004 5.13727 14.0441 5.28824 13.9328 5.47081L3.35338 23.1323C3.24691 23.3195 3.19061 23.5312 3.19001 23.7467C3.1894 23.9649 3.24595 24.1795 3.35403 24.3692C3.46212 24.5588 3.61797 24.7168 3.80608 24.8275C3.99255 24.9372 4.20427 24.9966 4.42052 25H25.5795C25.7958 24.9966 26.0075 24.9372 26.194 24.8275C26.3821 24.7168 26.5379 24.5588 26.646 24.3692C26.7541 24.1795 26.8107 23.9649 26.81 23.7467C26.8094 23.5312 26.7532 23.3196 26.6467 23.1324L16.0688 5.4733C16.0683 5.47247 16.0678 5.47164 16.0673 5.47081C15.9559 5.28824 15.7996 5.13727 15.6133 5.03235C15.4261 4.92695 15.2149 4.87158 15 4.87158Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M15 10C15.6904 10 16.25 10.5596 16.25 11.25V16.25C16.25 16.9404 15.6904 17.5 15 17.5C14.3096 17.5 13.75 16.9404 13.75 16.25V11.25C13.75 10.5596 14.3096 10 15 10Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M13.75 21.25C13.75 20.5596 14.3096 20 15 20H15.0125C15.7029 20 16.2625 20.5596 16.2625 21.25C16.2625 21.9404 15.7029 22.5 15.0125 22.5H15C14.3096 22.5 13.75 21.9404 13.75 21.25Z\"\n      fill=\"white\"\n    />\n  </svg>\n\n  } @else if(toastService.type() === \"error\") {\n  <svg\n    width=\"30\"\n    height=\"30\"\n    viewBox=\"0 0 30 30\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M8.94112 1.61612C9.17554 1.3817 9.49348 1.25 9.825 1.25H20.175C20.5065 1.25 20.8245 1.3817 21.0589 1.61612L28.3839 8.94112C28.6183 9.17554 28.75 9.49348 28.75 9.825V20.175C28.75 20.5065 28.6183 20.8245 28.3839 21.0589L21.0589 28.3839C20.8245 28.6183 20.5065 28.75 20.175 28.75H9.825C9.49348 28.75 9.17554 28.6183 8.94112 28.3839L1.61612 21.0589C1.3817 20.8245 1.25 20.5065 1.25 20.175V9.825C1.25 9.49348 1.3817 9.17554 1.61612 8.94112L8.94112 1.61612ZM10.3428 3.75L3.75 10.3428V19.6572L10.3428 26.25H19.6572L26.25 19.6572V10.3428L19.6572 3.75H10.3428Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M19.6339 10.3661C20.122 10.8543 20.122 11.6457 19.6339 12.1339L12.1339 19.6339C11.6457 20.122 10.8543 20.122 10.3661 19.6339C9.87796 19.1457 9.87796 18.3543 10.3661 17.8661L17.8661 10.3661C18.3543 9.87796 19.1457 9.87796 19.6339 10.3661Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M10.3661 10.3661C10.8543 9.87796 11.6457 9.87796 12.1339 10.3661L19.6339 17.8661C20.122 18.3543 20.122 19.1457 19.6339 19.6339C19.1457 20.122 18.3543 20.122 17.8661 19.6339L10.3661 12.1339C9.87796 11.6457 9.87796 10.8543 10.3661 10.3661Z\"\n      fill=\"white\"\n    />\n  </svg>\n\n  }\n\n  <p class=\"custom-toast-message\">{{ toastService.message() }}</p>\n\n  <svg class=\"close-toast\" (click)=\"hideToast()\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15.5893 4.41073C15.9147 4.73617 15.9147 5.26381 15.5893 5.58925L5.58928 15.5892C5.26384 15.9147 4.7362 15.9147 4.41076 15.5892C4.08533 15.2638 4.08533 14.7362 4.41076 14.4107L14.4108 4.41073C14.7362 4.0853 15.2638 4.0853 15.5893 4.41073Z\" fill=\"white\"/>\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.41076 4.41073C4.7362 4.0853 5.26384 4.0853 5.58928 4.41073L15.5893 14.4107C15.9147 14.7362 15.9147 15.2638 15.5893 15.5892C15.2638 15.9147 14.7362 15.9147 14.4108 15.5892L4.41076 5.58925C4.08533 5.26381 4.08533 4.73617 4.41076 4.41073Z\" fill=\"white\"/>\n    </svg>\n    \n</div>\n\n}\n", styles: [".custom-toast{width:500px;min-height:60px;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:20px;border-radius:10px}.toast-top-right{position:fixed;z-index:9999;top:20px;right:20px}.toast-top-left{position:fixed;z-index:9999;top:20px;left:20px}.toast-bottom-right{position:fixed;z-index:9999;bottom:20px;right:20px}.toast-bottom-left{position:fixed;z-index:9999;bottom:20px;left:20px}.toast-top-center{position:fixed;z-index:9999;top:20px;left:50%;transform:translate(-50%)}.toast-bottom-center{position:fixed;z-index:9999;bottom:20px;left:50%;transform:translate(-50%)}.toast-success{background-color:#19af66;color:#fff}.toast-error{background-color:#ff4d4f;color:#fff}.toast-warning{background-color:#ffbf00;color:#fff}.toast-info{background-color:#9d67aa;color:#fff}.toast-black{background-color:#000;color:#fff}.custom-toast-message{font-weight:500;font-size:16px;text-align:start;width:100%;text-wrap:wrap}.close-toast{cursor:pointer}\n"] }]
        }], ctorParameters: () => [] });

class CustomModalComponent {
    modalTitle = '';
    showDot = false;
    headerButton = '';
    overlayClickClose = true;
    style = 'main';
    hideEvent = new EventEmitter();
    headerButtonClick = new EventEmitter();
    isVisible = false;
    open() {
        this.isVisible = true;
    }
    close() {
        this.isVisible = false;
        //  this.hideEvent.emit();
    }
    closeInternal() {
        this.isVisible = false;
        this.hideEvent.emit();
    }
    onHeaderButtonClick() {
        this.headerButtonClick.emit();
    }
    onOverlayClick(event) {
        if (event.target === event.currentTarget && this.overlayClickClose) {
            this.close();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomModalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomModalComponent, isStandalone: true, selector: "modal", inputs: { modalTitle: "modalTitle", showDot: "showDot", headerButton: "headerButton", overlayClickClose: "overlayClickClose", style: "style" }, outputs: { hideEvent: "hideEvent", headerButtonClick: "headerButtonClick" }, ngImport: i0, template: "<div *ngIf=\"isVisible\" class=\"modal-overlay\" (click)=\"onOverlayClick($event)\">\n  <!-- X button outside modal-content -->\n\n  <div style=\"display: flex; flex-direction: row\">\n    <!-- < class=\"modal-content\" (click)=\"$event.stopPropagation()\"> -->\n    <div class=\"modal-content\" [class]=\"style\">\n      @if(style !== 'empty'){\n      <div class=\"modal-header\">\n        <span *ngIf=\"showDot\" class=\"modal-dot\"></span>\n        <span class=\"modal-title\">{{ modalTitle }}</span>\n        <div *ngIf=\"headerButton\">\n          <button\n            type=\"button\"\n            class=\"btn-header\"\n            (click)=\"onHeaderButtonClick()\"\n          >\n            {{ headerButton }}\n          </button>\n        </div>\n      </div>\n      }\n\n      <div class=\"modal-main-content\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n    <div style=\"display: flex; justify-content: start\">\n      <button\n        type=\"button\"\n        class=\"btn-close\"\n        aria-label=\"Close\"\n        (click)=\"closeInternal()\"\n      >\n        <svg\n          width=\"80\"\n          height=\"80\"\n          viewBox=\"0 0 80 80\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n          aria-hidden=\"true\"\n        >\n          <line\n            x1=\"20\"\n            y1=\"20\"\n            x2=\"60\"\n            y2=\"60\"\n            stroke=\"currentColor\"\n            stroke-width=\"4\"\n            stroke-linecap=\"round\"\n          />\n          <line\n            x1=\"60\"\n            y1=\"20\"\n            x2=\"20\"\n            y2=\"60\"\n            stroke=\"currentColor\"\n            stroke-width=\"4\"\n            stroke-linecap=\"round\"\n          />\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".modal-overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000000b3;display:flex;align-items:center;justify-content:center;z-index:1000;overflow-y:auto;flex-direction:row}.btn-close{height:2.5em;width:2.5em;padding:.5em .6em;background-color:#526275;display:flex;align-items:center;border-top-right-radius:25%;border-bottom-right-radius:25%;cursor:pointer;color:#fff;outline:none;font-size:large}.btn-close:hover{background-color:#4f5a6b}.modal-content.main{position:relative;background:#fff;border-radius:10px 0 10px 10px;min-width:600px;max-width:90vw;padding:1.5em;display:flex;align-items:center;flex-direction:column;height:max-content;max-height:90vh;overflow-y:auto}.modal-content.main .modal-header{width:100%;position:relative;display:flex;align-items:center;justify-content:start;padding:0 .5em}.modal-content.main .modal-header .modal-dot{width:1em;height:1em;background:#25c7bc;border-radius:25%;margin-right:10px}.modal-content.main .modal-header .modal-title{flex:1;text-align:left;font-size:1.4em;font-weight:600;width:min-content}.modal-content.main .modal-header div .btn-header{font-family:var(--FM-Bold);font-weight:500;font-size:1.7rem;color:#637486;background-color:#f7f7f7;cursor:pointer;border:#adb5be solid 1px;border-radius:.4em;padding:.3em 1em}.modal-content.main .modal-main-content{height:100%;overflow-x:hidden;overflow-y:auto}.modal-content.empty{position:relative;background:#fff;border-radius:10px 0 10px 10px;min-width:600px;max-width:90vw;height:max-content;max-height:90vh;overflow-y:auto;min-height:15em}.modal-content.empty .modal-main-content{height:100%;overflow-x:hidden;overflow-y:auto}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'modal', standalone: true, imports: [CommonModule], template: "<div *ngIf=\"isVisible\" class=\"modal-overlay\" (click)=\"onOverlayClick($event)\">\n  <!-- X button outside modal-content -->\n\n  <div style=\"display: flex; flex-direction: row\">\n    <!-- < class=\"modal-content\" (click)=\"$event.stopPropagation()\"> -->\n    <div class=\"modal-content\" [class]=\"style\">\n      @if(style !== 'empty'){\n      <div class=\"modal-header\">\n        <span *ngIf=\"showDot\" class=\"modal-dot\"></span>\n        <span class=\"modal-title\">{{ modalTitle }}</span>\n        <div *ngIf=\"headerButton\">\n          <button\n            type=\"button\"\n            class=\"btn-header\"\n            (click)=\"onHeaderButtonClick()\"\n          >\n            {{ headerButton }}\n          </button>\n        </div>\n      </div>\n      }\n\n      <div class=\"modal-main-content\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n    <div style=\"display: flex; justify-content: start\">\n      <button\n        type=\"button\"\n        class=\"btn-close\"\n        aria-label=\"Close\"\n        (click)=\"closeInternal()\"\n      >\n        <svg\n          width=\"80\"\n          height=\"80\"\n          viewBox=\"0 0 80 80\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n          aria-hidden=\"true\"\n        >\n          <line\n            x1=\"20\"\n            y1=\"20\"\n            x2=\"60\"\n            y2=\"60\"\n            stroke=\"currentColor\"\n            stroke-width=\"4\"\n            stroke-linecap=\"round\"\n          />\n          <line\n            x1=\"60\"\n            y1=\"20\"\n            x2=\"20\"\n            y2=\"60\"\n            stroke=\"currentColor\"\n            stroke-width=\"4\"\n            stroke-linecap=\"round\"\n          />\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".modal-overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000000b3;display:flex;align-items:center;justify-content:center;z-index:1000;overflow-y:auto;flex-direction:row}.btn-close{height:2.5em;width:2.5em;padding:.5em .6em;background-color:#526275;display:flex;align-items:center;border-top-right-radius:25%;border-bottom-right-radius:25%;cursor:pointer;color:#fff;outline:none;font-size:large}.btn-close:hover{background-color:#4f5a6b}.modal-content.main{position:relative;background:#fff;border-radius:10px 0 10px 10px;min-width:600px;max-width:90vw;padding:1.5em;display:flex;align-items:center;flex-direction:column;height:max-content;max-height:90vh;overflow-y:auto}.modal-content.main .modal-header{width:100%;position:relative;display:flex;align-items:center;justify-content:start;padding:0 .5em}.modal-content.main .modal-header .modal-dot{width:1em;height:1em;background:#25c7bc;border-radius:25%;margin-right:10px}.modal-content.main .modal-header .modal-title{flex:1;text-align:left;font-size:1.4em;font-weight:600;width:min-content}.modal-content.main .modal-header div .btn-header{font-family:var(--FM-Bold);font-weight:500;font-size:1.7rem;color:#637486;background-color:#f7f7f7;cursor:pointer;border:#adb5be solid 1px;border-radius:.4em;padding:.3em 1em}.modal-content.main .modal-main-content{height:100%;overflow-x:hidden;overflow-y:auto}.modal-content.empty{position:relative;background:#fff;border-radius:10px 0 10px 10px;min-width:600px;max-width:90vw;height:max-content;max-height:90vh;overflow-y:auto;min-height:15em}.modal-content.empty .modal-main-content{height:100%;overflow-x:hidden;overflow-y:auto}\n"] }]
        }], propDecorators: { modalTitle: [{
                type: Input
            }], showDot: [{
                type: Input
            }], headerButton: [{
                type: Input
            }], overlayClickClose: [{
                type: Input
            }], style: [{
                type: Input
            }], hideEvent: [{
                type: Output
            }], headerButtonClick: [{
                type: Output
            }] } });

const uploadCloudSVG = '<svg width="inherit" height="inherit" viewBox="0 0 52 53"fill="none"xmlns="http://www.w3.org/2000/svg"class="upload-icon"><path d="M34.6666 35.1667L25.9999 26.5L17.3333 35.1667"stroke="#626264"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"/><path d="M26 26.5V46"stroke="#626264"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"/><path d="M44.1782 40.345C46.2915 39.193 47.9609 37.37 48.923 35.1637C49.8851 32.9575 50.085 30.4937 49.4914 28.1612C48.8977 25.8287 47.5441 23.7603 45.6444 22.2825C43.7446 20.8047 41.4068 20.0016 38.9999 20H36.2699C35.6141 17.4634 34.3918 15.1084 32.6948 13.1122C30.9978 11.116 28.8704 9.53039 26.4725 8.4747C24.0745 7.419 21.4684 6.92066 18.8502 7.01713C16.2319 7.11359 13.6696 7.80236 11.3558 9.03166C9.04203 10.2609 7.03705 11.9988 5.49159 14.1145C3.94613 16.2302 2.90041 18.6687 2.43304 21.2467C1.96566 23.8248 2.08881 26.4752 2.79321 28.9988C3.49761 31.5224 4.76494 33.8534 6.49991 35.8167"stroke="#626264"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"/><path d="M34.6666 35.1667L25.9999 26.5L17.3333 35.1667"stroke="#626264"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"/></svg>';
const IconAttachmentSVG = '<svg width="52" height="64" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg" > <g opacity="0.5" clip-path="url(#clip0_9617_19229)"> <path d="M17.4109 1.09814H4.17876C3.39889 1.09814 2.65097 1.41215 2.09953 1.97108C1.54808 2.53001 1.23828 3.28809 1.23828 4.07854V27.9217C1.23828 28.7121 1.54808 29.4702 2.09953 30.0291C2.65097 30.5881 3.39889 30.9021 4.17876 30.9021H21.8216C22.6015 30.9021 23.3494 30.5881 23.9008 30.0291C24.4523 29.4702 24.7621 28.7121 24.7621 27.9217V8.54912L17.4109 1.09814Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M15.9404 1.09814V7.05893C15.9404 7.84938 16.2502 8.60745 16.8017 9.16638C17.3531 9.72532 18.101 10.0393 18.8809 10.0393H24.7619" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g> <defs> <clipPath id="clip0_9617_19229"> <rect width="52" height="64" fill="white" /> </clipPath> </defs> </svg>';
const PPT_SVG = '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect width="40" height="40" rx="14" fill="#FFD7D1" /> <mask id="mask0_9617_7240" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="7" y="6" width="26" height="28" > <path  d="M30.4779 34H9.52206C8.40531 34 7.5 33.1046 7.5 32V8C7.5 6.89543 8.40531 6 9.52206 6H23.125L32.5 15.2727V32C32.5 33.1046 31.5947 34 30.4779 34Z" fill="url(#paint0_linear_9617_7240)" /> </mask> <g mask="url(#mask0_9617_7240)"> <path d="M30.4779 34H9.52206C8.40531 34 7.5 33.1046 7.5 32V8C7.5 6.89543 8.40531 6 9.52206 6H23.125L32.5 15.2727V32C32.5 33.1046 31.5947 34 30.4779 34Z" fill="url(#paint1_linear_9617_7240)" /> <g opacity="0.23" filter="url(#filter0_f_9617_7240)"> <rect x="8.87842" y="19.5454" width="22.4265" height="7.63637" fill="#E32E06" style="mix-blend-mode: darken" /> </g> <path opacity="0.12" d="M25.791 31.5454H14.21V30.4429H25.791V31.5454ZM25.791 28.8179H14.21V27.7153H25.791V28.8179ZM20 14.1802C23.3502 14.1803 26.0664 16.8964 26.0664 20.2466C26.0663 23.5967 23.3501 26.3129 20 26.313C16.6498 26.313 13.9337 23.5967 13.9336 20.2466C13.9336 16.8963 16.6497 14.1802 20 14.1802ZM19.3525 15.4507C16.9857 15.7671 15.1602 17.7932 15.1602 20.2466C15.1603 22.9194 17.3272 25.0864 20 25.0864C22.4811 25.0863 24.5251 23.2188 24.8057 20.813H19.3525V15.4507ZM20.5664 19.5991H24.7949C24.5032 17.4173 22.7593 15.6967 20.5664 15.4409V19.5991Z" fill="white" /> <mask id="path-6-outside-1_9617_7240" maskUnits="userSpaceOnUse" x="12.3711" y="20.1816" width="16" height="7" fill="black" > <rect fill="white" x="12.3711" y="20.1816" width="16" height="7" /> <path d="M13.803 26.2179C13.7111 26.2179 13.6336 26.1865 13.5707 26.1236C13.5078 26.0606 13.4763 25.9832 13.4763 25.8912V21.4474C13.4763 21.3555 13.5078 21.278 13.5707 21.2151C13.6336 21.1473 13.7111 21.1134 13.803 21.1134H15.4586C15.9184 21.1134 16.2936 21.1909 16.584 21.3458C16.8745 21.5007 17.0826 21.6992 17.2085 21.9412C17.3343 22.1832 17.3972 22.4446 17.3972 22.7254C17.3972 23.0062 17.3343 23.2675 17.2085 23.5096C17.0826 23.7516 16.8745 23.9501 16.584 24.105C16.2936 24.2599 15.9184 24.3373 15.4586 24.3373H14.137V25.8912C14.137 25.9832 14.1032 26.0606 14.0354 26.1236C13.9725 26.1865 13.895 26.2179 13.803 26.2179ZM15.3932 23.7129C15.887 23.7129 16.2331 23.6185 16.4315 23.4297C16.6348 23.2409 16.7365 23.0062 16.7365 22.7254C16.7365 22.4446 16.6348 22.2099 16.4315 22.0211C16.2331 21.8323 15.887 21.7379 15.3932 21.7379H14.137V23.7129H15.3932ZM19.1898 26.2179C19.0978 26.2179 19.0204 26.1865 18.9575 26.1236C18.8945 26.0606 18.8631 25.9832 18.8631 25.8912V21.4474C18.8631 21.3555 18.8945 21.278 18.9575 21.2151C19.0204 21.1473 19.0978 21.1134 19.1898 21.1134H20.8453C21.3052 21.1134 21.6803 21.1909 21.9708 21.3458C22.2612 21.5007 22.4694 21.6992 22.5952 21.9412C22.7211 22.1832 22.784 22.4446 22.784 22.7254C22.784 23.0062 22.7211 23.2675 22.5952 23.5096C22.4694 23.7516 22.2612 23.9501 21.9708 24.105C21.6803 24.2599 21.3052 24.3373 20.8453 24.3373H19.5238V25.8912C19.5238 25.9832 19.4899 26.0606 19.4222 26.1236C19.3592 26.1865 19.2818 26.2179 19.1898 26.2179ZM20.78 23.7129C21.2737 23.7129 21.6198 23.6185 21.8183 23.4297C22.0216 23.2409 22.1233 23.0062 22.1233 22.7254C22.1233 22.4446 22.0216 22.2099 21.8183 22.0211C21.6198 21.8323 21.2737 21.7379 20.78 21.7379H19.5238V23.7129H20.78ZM25.7529 26.2179C25.6609 26.2179 25.5835 26.1865 25.5205 26.1236C25.4576 26.0606 25.4261 25.9832 25.4261 25.8912V21.7306H23.9449C23.8577 21.7306 23.7851 21.7016 23.7271 21.6435C23.669 21.5854 23.6399 21.5128 23.6399 21.4257C23.6399 21.3385 23.669 21.2659 23.7271 21.2078C23.7851 21.1449 23.8577 21.1134 23.9449 21.1134H27.5609C27.648 21.1134 27.7206 21.1449 27.7787 21.2078C27.8416 21.2659 27.8731 21.3385 27.8731 21.4257C27.8731 21.5128 27.8416 21.5854 27.7787 21.6435C27.7206 21.7016 27.648 21.7306 27.5609 21.7306H26.0869V25.8912C26.0869 25.9832 26.053 26.0606 25.9852 26.1236C25.9223 26.1865 25.8449 26.2179 25.7529 26.2179Z" /> </mask> <path d="M13.803 26.2179C13.7111 26.2179 13.6336 26.1865 13.5707 26.1236C13.5078 26.0606 13.4763 25.9832 13.4763 25.8912V21.4474C13.4763 21.3555 13.5078 21.278 13.5707 21.2151C13.6336 21.1473 13.7111 21.1134 13.803 21.1134H15.4586C15.9184 21.1134 16.2936 21.1909 16.584 21.3458C16.8745 21.5007 17.0826 21.6992 17.2085 21.9412C17.3343 22.1832 17.3972 22.4446 17.3972 22.7254C17.3972 23.0062 17.3343 23.2675 17.2085 23.5096C17.0826 23.7516 16.8745 23.9501 16.584 24.105C16.2936 24.2599 15.9184 24.3373 15.4586 24.3373H14.137V25.8912C14.137 25.9832 14.1032 26.0606 14.0354 26.1236C13.9725 26.1865 13.895 26.2179 13.803 26.2179ZM15.3932 23.7129C15.887 23.7129 16.2331 23.6185 16.4315 23.4297C16.6348 23.2409 16.7365 23.0062 16.7365 22.7254C16.7365 22.4446 16.6348 22.2099 16.4315 22.0211C16.2331 21.8323 15.887 21.7379 15.3932 21.7379H14.137V23.7129H15.3932ZM19.1898 26.2179C19.0978 26.2179 19.0204 26.1865 18.9575 26.1236C18.8945 26.0606 18.8631 25.9832 18.8631 25.8912V21.4474C18.8631 21.3555 18.8945 21.278 18.9575 21.2151C19.0204 21.1473 19.0978 21.1134 19.1898 21.1134H20.8453C21.3052 21.1134 21.6803 21.1909 21.9708 21.3458C22.2612 21.5007 22.4694 21.6992 22.5952 21.9412C22.7211 22.1832 22.784 22.4446 22.784 22.7254C22.784 23.0062 22.7211 23.2675 22.5952 23.5096C22.4694 23.7516 22.2612 23.9501 21.9708 24.105C21.6803 24.2599 21.3052 24.3373 20.8453 24.3373H19.5238V25.8912C19.5238 25.9832 19.4899 26.0606 19.4222 26.1236C19.3592 26.1865 19.2818 26.2179 19.1898 26.2179ZM20.78 23.7129C21.2737 23.7129 21.6198 23.6185 21.8183 23.4297C22.0216 23.2409 22.1233 23.0062 22.1233 22.7254C22.1233 22.4446 22.0216 22.2099 21.8183 22.0211C21.6198 21.8323 21.2737 21.7379 20.78 21.7379H19.5238V23.7129H20.78ZM25.7529 26.2179C25.6609 26.2179 25.5835 26.1865 25.5205 26.1236C25.4576 26.0606 25.4261 25.9832 25.4261 25.8912V21.7306H23.9449C23.8577 21.7306 23.7851 21.7016 23.7271 21.6435C23.669 21.5854 23.6399 21.5128 23.6399 21.4257C23.6399 21.3385 23.669 21.2659 23.7271 21.2078C23.7851 21.1449 23.8577 21.1134 23.9449 21.1134H27.5609C27.648 21.1134 27.7206 21.1449 27.7787 21.2078C27.8416 21.2659 27.8731 21.3385 27.8731 21.4257C27.8731 21.5128 27.8416 21.5854 27.7787 21.6435C27.7206 21.7016 27.648 21.7306 27.5609 21.7306H26.0869V25.8912C26.0869 25.9832 26.053 26.0606 25.9852 26.1236C25.9223 26.1865 25.8449 26.2179 25.7529 26.2179Z" fill="white" /> <path d="M13.5707 26.1236L13.7007 25.9936L13.5707 26.1236ZM13.5707 21.2151L13.7008 21.3452L13.7054 21.3402L13.5707 21.2151ZM17.2085 21.9412L17.0454 22.026L17.2085 21.9412ZM17.2085 23.5096L17.0454 23.4248V23.4248L17.2085 23.5096ZM14.137 24.3373V24.1535H13.9532V24.3373H14.137ZM14.0354 26.1236L13.9102 25.9888L13.9054 25.9936L14.0354 26.1236ZM16.4315 23.4297L16.3064 23.295L16.3048 23.2965L16.4315 23.4297ZM16.4315 22.0211L16.3048 22.1543L16.3064 22.1558L16.4315 22.0211ZM14.137 21.7379V21.5541H13.9532V21.7379H14.137ZM14.137 23.7129H13.9532V23.8967H14.137V23.7129ZM13.803 26.2179V26.0341C13.758 26.0341 13.7279 26.0208 13.7007 25.9936L13.5707 26.1236L13.4407 26.2535C13.5394 26.3522 13.6641 26.4018 13.803 26.4018V26.2179ZM13.5707 26.1236L13.7007 25.9936C13.6735 25.9664 13.6601 25.9362 13.6601 25.8912H13.4763H13.2925C13.2925 26.0301 13.342 26.1549 13.4407 26.2535L13.5707 26.1236ZM13.4763 25.8912H13.6601V21.4474H13.4763H13.2925V25.8912H13.4763ZM13.4763 21.4474H13.6601C13.6601 21.4024 13.6735 21.3723 13.7007 21.3451L13.5707 21.2151L13.4407 21.0851C13.342 21.1838 13.2925 21.3085 13.2925 21.4474H13.4763ZM13.5707 21.2151L13.7054 21.3402C13.7338 21.3096 13.7625 21.2973 13.803 21.2973V21.1134V20.9296C13.6596 20.9296 13.5335 20.985 13.436 21.09L13.5707 21.2151ZM13.803 21.1134V21.2973H15.4586V21.1134V20.9296H13.803V21.1134ZM15.4586 21.1134V21.2973C15.8996 21.2973 16.2422 21.3718 16.4975 21.508L16.584 21.3458L16.6705 21.1836C16.345 21.01 15.9373 20.9296 15.4586 20.9296V21.1134ZM16.584 21.3458L16.4975 21.508C16.7621 21.6491 16.9399 21.8232 17.0454 22.026L17.2085 21.9412L17.3716 21.8564C17.2253 21.5751 16.9868 21.3523 16.6705 21.1836L16.584 21.3458ZM17.2085 21.9412L17.0454 22.026C17.1572 22.2411 17.2134 22.4733 17.2134 22.7254H17.3972H17.5811C17.5811 22.416 17.5114 22.1254 17.3716 21.8564L17.2085 21.9412ZM17.3972 22.7254H17.2134C17.2134 22.9775 17.1572 23.2097 17.0454 23.4248L17.2085 23.5096L17.3716 23.5944C17.5114 23.3254 17.5811 23.0348 17.5811 22.7254H17.3972ZM17.2085 23.5096L17.0454 23.4248C16.9399 23.6276 16.7621 23.8017 16.4975 23.9428L16.584 24.105L16.6705 24.2672C16.9868 24.0985 17.2253 23.8757 17.3716 23.5944L17.2085 23.5096ZM16.584 24.105L16.4975 23.9428C16.2422 24.079 15.8996 24.1535 15.4586 24.1535V24.3373V24.5212C15.9373 24.5212 16.345 24.4408 16.6705 24.2672L16.584 24.105ZM15.4586 24.3373V24.1535H14.137V24.3373V24.5212H15.4586V24.3373ZM14.137 24.3373H13.9532V25.8912H14.137H14.3209V24.3373H14.137ZM14.137 25.8912H13.9532C13.9532 25.9317 13.9409 25.9605 13.9103 25.9888L14.0354 26.1236L14.1605 26.2583C14.2655 26.1608 14.3209 26.0346 14.3209 25.8912H14.137ZM14.0354 26.1236L13.9054 25.9936C13.8782 26.0208 13.8481 26.0341 13.803 26.0341V26.2179V26.4018C13.9419 26.4018 14.0667 26.3522 14.1654 26.2535L14.0354 26.1236ZM15.3932 23.7129V23.8967C15.8998 23.8967 16.3069 23.8019 16.5582 23.5629L16.4315 23.4297L16.3048 23.2965C16.1592 23.4351 15.8741 23.5291 15.3932 23.5291V23.7129ZM16.4315 23.4297L16.5566 23.5644C16.7979 23.3404 16.9203 23.0566 16.9203 22.7254H16.7365H16.5527C16.5527 22.9557 16.4718 23.1415 16.3064 23.295L16.4315 23.4297ZM16.7365 22.7254H16.9203C16.9203 22.3942 16.7979 22.1104 16.5566 21.8864L16.4315 22.0211L16.3064 22.1558C16.4718 22.3093 16.5527 22.4951 16.5527 22.7254H16.7365ZM16.4315 22.0211L16.5582 21.8879C16.3069 21.6489 15.8998 21.5541 15.3932 21.5541V21.7379V21.9217C15.8741 21.9217 16.1592 22.0157 16.3048 22.1543L16.4315 22.0211ZM15.3932 21.7379V21.5541H14.137V21.7379V21.9217H15.3932V21.7379ZM14.137 21.7379H13.9532V23.7129H14.137H14.3209V21.7379H14.137ZM14.137 23.7129V23.8967H15.3932V23.7129V23.5291H14.137V23.7129ZM18.9575 26.1236L19.0874 25.9936L18.9575 26.1236ZM18.9575 21.2151L19.0875 21.3452L19.0922 21.3402L18.9575 21.2151ZM22.5952 21.9412L22.4321 22.026L22.5952 21.9412ZM22.5952 23.5096L22.4321 23.4248V23.4248L22.5952 23.5096ZM19.5238 24.3373V24.1535H19.34V24.3373H19.5238ZM19.4222 26.1236L19.297 25.9888L19.2922 25.9936L19.4222 26.1236ZM21.8183 23.4297L21.6932 23.295L21.6916 23.2965L21.8183 23.4297ZM21.8183 22.0211L21.6916 22.1543L21.6932 22.1558L21.8183 22.0211ZM19.5238 21.7379V21.5541H19.34V21.7379H19.5238ZM19.5238 23.7129H19.34V23.8967H19.5238V23.7129ZM19.1898 26.2179V26.0341C19.1448 26.0341 19.1146 26.0208 19.0874 25.9936L18.9575 26.1236L18.8275 26.2535C18.9262 26.3522 19.0509 26.4018 19.1898 26.4018V26.2179ZM18.9575 26.1236L19.0874 25.9936C19.0603 25.9664 19.0469 25.9362 19.0469 25.8912H18.8631H18.6792C18.6792 26.0301 18.7288 26.1549 18.8275 26.2535L18.9575 26.1236ZM18.8631 25.8912H19.0469V21.4474H18.8631H18.6792V25.8912H18.8631ZM18.8631 21.4474H19.0469C19.0469 21.4024 19.0603 21.3723 19.0874 21.3451L18.9575 21.2151L18.8275 21.0851C18.7288 21.1838 18.6792 21.3085 18.6792 21.4474H18.8631ZM18.9575 21.2151L19.0922 21.3402C19.1205 21.3096 19.1493 21.2973 19.1898 21.2973V21.1134V20.9296C19.0464 20.9296 18.9202 20.985 18.8228 21.09L18.9575 21.2151ZM19.1898 21.1134V21.2973H20.8453V21.1134V20.9296H19.1898V21.1134ZM20.8453 21.1134V21.2973C21.2863 21.2973 21.6289 21.3718 21.8843 21.508L21.9708 21.3458L22.0573 21.1836C21.7318 21.01 21.324 20.9296 20.8453 20.9296V21.1134ZM21.9708 21.3458L21.8843 21.508C22.1488 21.6491 22.3267 21.8232 22.4321 22.026L22.5952 21.9412L22.7583 21.8564C22.6121 21.5751 22.3736 21.3523 22.0573 21.1836L21.9708 21.3458ZM22.5952 21.9412L22.4321 22.026C22.544 22.2411 22.6002 22.4733 22.6002 22.7254H22.784H22.9678C22.9678 22.416 22.8982 22.1254 22.7583 21.8564L22.5952 21.9412ZM22.784 22.7254H22.6002C22.6002 22.9775 22.544 23.2097 22.4321 23.4248L22.5952 23.5096L22.7583 23.5944C22.8982 23.3254 22.9678 23.0348 22.9678 22.7254H22.784ZM22.5952 23.5096L22.4321 23.4248C22.3267 23.6276 22.1488 23.8017 21.8843 23.9428L21.9708 24.105L22.0573 24.2672C22.3736 24.0985 22.6121 23.8757 22.7583 23.5944L22.5952 23.5096ZM21.9708 24.105L21.8843 23.9428C21.6289 24.079 21.2863 24.1535 20.8453 24.1535V24.3373V24.5212C21.324 24.5212 21.7318 24.4408 22.0573 24.2672L21.9708 24.105ZM20.8453 24.3373V24.1535H19.5238V24.3373V24.5212H20.8453V24.3373ZM19.5238 24.3373H19.34V25.8912H19.5238H19.7076V24.3373H19.5238ZM19.5238 25.8912H19.34C19.34 25.9317 19.3276 25.9605 19.2971 25.9888L19.4222 26.1236L19.5473 26.2583C19.6522 26.1608 19.7076 26.0346 19.7076 25.8912H19.5238ZM19.4222 26.1236L19.2922 25.9936C19.265 26.0208 19.2349 26.0341 19.1898 26.0341V26.2179V26.4018C19.3287 26.4018 19.4535 26.3522 19.5522 26.2535L19.4222 26.1236ZM20.78 23.7129V23.8967C21.2866 23.8967 21.6937 23.8019 21.945 23.5629L21.8183 23.4297L21.6916 23.2965C21.546 23.4351 21.2609 23.5291 20.78 23.5291V23.7129ZM21.8183 23.4297L21.9434 23.5644C22.1847 23.3404 22.3071 23.0566 22.3071 22.7254H22.1233H21.9394C21.9394 22.9557 21.8586 23.1415 21.6932 23.295L21.8183 23.4297ZM22.1233 22.7254H22.3071C22.3071 22.3942 22.1847 22.1104 21.9434 21.8864L21.8183 22.0211L21.6932 22.1558C21.8586 22.3093 21.9394 22.4951 21.9394 22.7254H22.1233ZM21.8183 22.0211L21.945 21.8879C21.6937 21.6489 21.2866 21.5541 20.78 21.5541V21.7379V21.9217C21.2609 21.9217 21.546 22.0157 21.6916 22.1543L21.8183 22.0211ZM20.78 21.7379V21.5541H19.5238V21.7379V21.9217H20.78V21.7379ZM19.5238 21.7379H19.34V23.7129H19.5238H19.7076V21.7379H19.5238ZM19.5238 23.7129V23.8967H20.78V23.7129V23.5291H19.5238V23.7129ZM25.5205 26.1236L25.3905 26.2535L25.5205 26.1236ZM25.4261 21.7306H25.61V21.5468H25.4261V21.7306ZM23.7271 21.6435L23.5971 21.7735L23.5971 21.7735L23.7271 21.6435ZM23.7271 21.2078L23.8571 21.3379L23.8621 21.3325L23.7271 21.2078ZM27.7787 21.2078L27.6436 21.3325L27.6486 21.3379L27.654 21.3429L27.7787 21.2078ZM27.7787 21.6435L27.6539 21.5083L27.6487 21.5135L27.7787 21.6435ZM26.0869 21.7306V21.5468H25.9031V21.7306H26.0869ZM25.9852 26.1236L25.8601 25.9888L25.8552 25.9936L25.9852 26.1236ZM25.7529 26.2179V26.0341C25.7078 26.0341 25.6777 26.0208 25.6505 25.9936L25.5205 26.1236L25.3905 26.2535C25.4892 26.3522 25.614 26.4018 25.7529 26.4018V26.2179ZM25.5205 26.1236L25.6505 25.9936C25.6233 25.9664 25.61 25.9362 25.61 25.8912H25.4261H25.2423C25.2423 26.0301 25.2919 26.1549 25.3905 26.2535L25.5205 26.1236ZM25.4261 25.8912H25.61V21.7306H25.4261H25.2423V25.8912H25.4261ZM25.4261 21.7306V21.5468H23.9449V21.7306V21.9145H25.4261V21.7306ZM23.9449 21.7306V21.5468C23.9032 21.5468 23.8784 21.5349 23.857 21.5135L23.7271 21.6435L23.5971 21.7735C23.6919 21.8683 23.8123 21.9145 23.9449 21.9145V21.7306ZM23.7271 21.6435L23.857 21.5135C23.8357 21.4922 23.8237 21.4673 23.8237 21.4257H23.6399H23.4561C23.4561 21.5583 23.5023 21.6787 23.5971 21.7735L23.7271 21.6435ZM23.6399 21.4257H23.8237C23.8237 21.384 23.8357 21.3592 23.857 21.3378L23.7271 21.2078L23.5971 21.0779C23.5023 21.1727 23.4561 21.2931 23.4561 21.4257H23.6399ZM23.7271 21.2078L23.8621 21.3325C23.8847 21.308 23.908 21.2973 23.9449 21.2973V21.1134V20.9296C23.8075 20.9296 23.6855 20.9818 23.592 21.0832L23.7271 21.2078ZM23.9449 21.1134V21.2973H27.5609V21.1134V20.9296H23.9449V21.1134ZM27.5609 21.1134V21.2973C27.5977 21.2973 27.621 21.308 27.6436 21.3325L27.7787 21.2078L27.9138 21.0832C27.8202 20.9818 27.6983 20.9296 27.5609 20.9296V21.1134ZM27.7787 21.2078L27.654 21.3429C27.6785 21.3655 27.6893 21.3888 27.6893 21.4257H27.8731H28.0569C28.0569 21.2882 28.0048 21.1663 27.9034 21.0728L27.7787 21.2078ZM27.8731 21.4257H27.6893C27.6893 21.4625 27.6785 21.4858 27.654 21.5084L27.7787 21.6435L27.9034 21.7786C28.0048 21.685 28.0569 21.5631 28.0569 21.4257H27.8731ZM27.7787 21.6435L27.6487 21.5135C27.6274 21.5349 27.6025 21.5468 27.5609 21.5468V21.7306V21.9145C27.6935 21.9145 27.8139 21.8683 27.9087 21.7735L27.7787 21.6435ZM27.5609 21.7306V21.5468H26.0869V21.7306V21.9145H27.5609V21.7306ZM26.0869 21.7306H25.9031V25.8912H26.0869H26.2707V21.7306H26.0869ZM26.0869 25.8912H25.9031C25.9031 25.9317 25.8907 25.9605 25.8601 25.9888L25.9852 26.1236L26.1103 26.2583C26.2153 26.1608 26.2707 26.0346 26.2707 25.8912H26.0869ZM25.9852 26.1236L25.8552 25.9936C25.8281 26.0208 25.7979 26.0341 25.7529 26.0341V26.2179V26.4018C25.8918 26.4018 26.0165 26.3522 26.1152 26.2535L25.9852 26.1236Z" fill="white" mask="url(#path-6-outside-1_9617_7240)" /> <mask id="mask1_9617_7240" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="7" y="6" width="26" height="28" > <path d="M30.4779 34H9.52206C8.40531 34 7.5 33.1046 7.5 32V8C7.5 6.89543 8.40531 6 9.52206 6H23.125L32.5 15.2727V32C32.5 33.1046 31.5947 34 30.4779 34Z" fill="url(#paint2_linear_9617_7240)" /> </mask> <g mask="url(#mask1_9617_7240)"> <ellipse opacity="0.05" cx="6.16728" cy="4.86378" rx="20.5423" ry="19.5" fill="url(#paint3_linear_9617_7240)" /> <ellipse opacity="0.07" cx="6.16702" cy="4.8635" rx="12.9136" ry="12.2273" fill="url(#paint4_linear_9617_7240)" /> </g> <g filter="url(#filter1_d_9617_7240)"> <path d="M32.5 15.2727H25.1471C24.0303 15.2727 23.125 14.3674 23.125 13.2507V6L32.5 15.2727Z" fill="url(#paint5_linear_9617_7240)" /> </g> </g> <defs> <filter id="filter0_f_9617_7240" x="5.29386" y="15.9609" width="29.5954" height="14.8053" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" > <feFlood flood-opacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="1.79228" result="effect1_foregroundBlur_9617_7240" /> </filter> <filter id="filter1_d_9617_7240" x="21.011" y="3.79412" width="13.9706" height="13.8685" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" > <feFlood flood-opacity="0" result="BackgroundImageFix" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="0.183823" dy="0.0919117" /> <feGaussianBlur stdDeviation="1.1489" /> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.33 0" /> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9617_7240" /> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_9617_7240" result="shape" /> </filter> <linearGradient id="paint0_linear_9617_7240" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse" > <stop stop-color="#FF7979" /> <stop offset="1" stop-color="#E85555" /> </linearGradient> <linearGradient id="paint1_linear_9617_7240" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse" > <stop stop-color="#FF8777" /> <stop offset="1" stop-color="#F0695F" /> </linearGradient> <linearGradient id="paint2_linear_9617_7240" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse" > <stop stop-color="#FF8777" /> <stop offset="1" stop-color="#F0695F" /> </linearGradient> <linearGradient id="paint3_linear_9617_7240" x1="7.6588" y1="5.53388" x2="13.7698" y2="21.9314" gradientUnits="userSpaceOnUse" > <stop stop-color="white" stop-opacity="0" /> <stop offset="1" stop-color="white" /> </linearGradient> <linearGradient id="paint4_linear_9617_7240" x1="7.10464" y1="5.28368" x2="10.9291" y2="15.572" gradientUnits="userSpaceOnUse" > <stop stop-color="white" stop-opacity="0" /> <stop offset="1" stop-color="white" /> </linearGradient> <linearGradient id="paint5_linear_9617_7240" x1="27.8125" y1="6" x2="27.8125" y2="15.2727" gradientUnits="userSpaceOnUse" > <stop stop-color="#DA5D4C" /> <stop offset="1" stop-color="#E32900" /> </linearGradient> </defs> </svg>';
const XLS_SVG = '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect width="40" height="40" rx="14" fill="#D5FFD5" /> <mask id="mask0_9617_7268" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="7" y="6" width="26" height="28" > <path d="M30.4779 34H9.52206C8.40531 34 7.5 33.1046 7.5 32V8C7.5 6.89543 8.40531 6 9.52206 6H23.125L32.5 15.2727V32C32.5 33.1046 31.5947 34 30.4779 34Z" fill="url(#paint0_linear_9617_7268)" /> </mask> <g mask="url(#mask0_9617_7268)"> <path d="M30.4779 34H9.52206C8.40531 34 7.5 33.1046 7.5 32V8C7.5 6.89543 8.40531 6 9.52206 6H23.125L32.5 15.2727V32C32.5 33.1046 31.5947 34 30.4779 34Z" fill="url(#paint1_linear_9617_7268)" /> <g opacity="0.82" filter="url(#filter0_f_9617_7268)"> <rect x="11.9116" y="19.5454" width="16.3603" height="7.63636" fill="#0F7D56" fill-opacity="0.27" style="mix-blend-mode: darken" /> </g> <path opacity="0.12" d="M28.5312 16.5737C28.9019 16.6115 29.1914 16.9246 29.1914 17.3052V30.1724L29.1875 30.2476C29.1525 30.5937 28.8773 30.8685 28.5312 30.9038L28.4561 30.9077H11.4521L11.377 30.9038C11.0308 30.8686 10.7557 30.5938 10.7207 30.2476L10.7168 30.1724V17.3052C10.7168 16.9245 11.0062 16.6114 11.377 16.5737L11.4521 16.5698H28.4561L28.5312 16.5737ZM23.4004 26.4966V29.8052H28.0879V26.4966H23.4004ZM17.6094 29.8052H22.2979V26.4966H17.6094V29.8052ZM11.8193 29.8052H16.5068V26.4966H11.8193V29.8052ZM23.4004 22.0845V25.394H28.0879V22.0845H23.4004ZM11.8193 25.394H16.5068V22.0845H11.8193V25.394ZM17.6094 25.394H22.2979V22.0845H17.6094V25.394ZM23.4004 20.9819H28.0879V17.6724H23.4004V20.9819ZM11.8193 20.9819H16.5068V17.6724H11.8193V20.9819ZM17.6094 20.9819H22.2979V17.6724H17.6094V20.9819Z" fill="white" /> <mask id="path-6-outside-1_9617_7268" maskUnits="userSpaceOnUse" x="12.7388" y="20.1816" width="15" height="7" fill="black" > <rect fill="white" x="12.7388" y="20.1816" width="15" height="7" /> <path d="M13.3632 26.2179C13.2809 26.2179 13.2083 26.1889 13.1454 26.1308C13.0873 26.0679 13.0583 25.9953 13.0583 25.913C13.0583 25.8355 13.08 25.7678 13.1236 25.7097L14.8009 23.6475L13.1381 21.5999C13.0946 21.5418 13.0728 21.4741 13.0728 21.3966C13.0728 21.3046 13.1018 21.2296 13.1599 21.1715C13.2228 21.1086 13.3003 21.0771 13.3923 21.0771C13.4455 21.0771 13.4963 21.0892 13.5447 21.1134C13.5932 21.1376 13.6319 21.1691 13.6609 21.2078L15.193 23.1538L16.7251 21.1933C16.7783 21.1159 16.8582 21.0771 16.9647 21.0771C17.0518 21.0771 17.1269 21.1086 17.1898 21.1715C17.2527 21.2296 17.2842 21.3022 17.2842 21.3894C17.2842 21.4571 17.2648 21.5176 17.2261 21.5709L15.5488 23.6403L17.2261 25.7024C17.2697 25.7508 17.2914 25.8137 17.2914 25.8912C17.2914 25.9832 17.26 26.0606 17.197 26.1236C17.139 26.1865 17.0615 26.2179 16.9647 26.2179C16.8582 26.2179 16.7711 26.172 16.7033 26.08L15.1494 24.1268L13.6174 26.0872C13.5447 26.1744 13.46 26.2179 13.3632 26.2179ZM19.2802 26.1816C19.1544 26.1816 19.0454 26.1381 18.9535 26.0509C18.8663 25.959 18.8228 25.8501 18.8228 25.7242V21.4111C18.8228 21.3192 18.8542 21.2417 18.9172 21.1788C18.9801 21.111 19.0575 21.0771 19.1495 21.0771C19.2415 21.0771 19.3189 21.111 19.3819 21.1788C19.4496 21.2417 19.4835 21.3192 19.4835 21.4111V25.5209H21.8579C21.9499 25.5209 22.0273 25.5548 22.0902 25.6225C22.158 25.6855 22.1919 25.7629 22.1919 25.8549C22.1919 25.9469 22.158 26.0243 22.0902 26.0872C22.0273 26.1502 21.9499 26.1816 21.8579 26.1816H19.2802ZM25.1121 26.2543C24.4973 26.2543 23.9213 26.1381 23.3839 25.9057C23.3259 25.8815 23.2775 25.8428 23.2387 25.7895C23.2 25.7315 23.1806 25.6709 23.1806 25.608C23.1806 25.5257 23.2073 25.4555 23.2605 25.3974C23.3186 25.3345 23.3912 25.3031 23.4783 25.3031C23.5267 25.3031 23.5727 25.3127 23.6163 25.3321C24.0616 25.5306 24.5385 25.6298 25.0467 25.6298C25.8938 25.6298 26.3174 25.3515 26.3174 24.7948C26.3174 24.6496 26.2617 24.5285 26.1504 24.4317C26.0439 24.3349 25.9108 24.2599 25.751 24.2066C25.5913 24.1486 25.3638 24.0808 25.0685 24.0033C24.6764 23.9017 24.3593 23.8049 24.1173 23.7129C23.8753 23.6161 23.6671 23.4733 23.4929 23.2845C23.3186 23.0957 23.2315 22.844 23.2315 22.5293C23.2315 22.2534 23.3041 22.0041 23.4493 21.7815C23.5945 21.5539 23.8075 21.3748 24.0883 21.2441C24.3739 21.1086 24.7151 21.0408 25.1121 21.0408C25.6445 21.0408 26.1262 21.1207 26.557 21.2804C26.6926 21.3289 26.7603 21.4257 26.7603 21.5709C26.7603 21.6483 26.7337 21.7185 26.6805 21.7815C26.6272 21.8444 26.557 21.8758 26.4699 21.8758C26.4408 21.8758 26.4021 21.8662 26.3537 21.8468C25.9761 21.7161 25.5865 21.6508 25.1847 21.6508C24.8023 21.6508 24.49 21.7234 24.248 21.8686C24.0108 22.0138 23.8922 22.2171 23.8922 22.4785C23.8922 22.6528 23.9479 22.7956 24.0592 22.9069C24.1754 23.0134 24.3182 23.0981 24.4876 23.1611C24.6619 23.2191 24.8967 23.2821 25.1919 23.3498C25.5744 23.4418 25.8817 23.5338 26.1141 23.6258C26.3513 23.7177 26.5522 23.8605 26.7168 24.0542C26.8862 24.2478 26.9709 24.5092 26.9709 24.8384C26.9709 25.1094 26.8934 25.3539 26.7385 25.5717C26.5836 25.7847 26.3658 25.9517 26.0851 26.0727C25.8043 26.1937 25.48 26.2543 25.1121 26.2543Z" /> </mask> <path d="M13.3632 26.2179C13.2809 26.2179 13.2083 26.1889 13.1454 26.1308C13.0873 26.0679 13.0583 25.9953 13.0583 25.913C13.0583 25.8355 13.08 25.7678 13.1236 25.7097L14.8009 23.6475L13.1381 21.5999C13.0946 21.5418 13.0728 21.4741 13.0728 21.3966C13.0728 21.3046 13.1018 21.2296 13.1599 21.1715C13.2228 21.1086 13.3003 21.0771 13.3923 21.0771C13.4455 21.0771 13.4963 21.0892 13.5447 21.1134C13.5932 21.1376 13.6319 21.1691 13.6609 21.2078L15.193 23.1538L16.7251 21.1933C16.7783 21.1159 16.8582 21.0771 16.9647 21.0771C17.0518 21.0771 17.1269 21.1086 17.1898 21.1715C17.2527 21.2296 17.2842 21.3022 17.2842 21.3894C17.2842 21.4571 17.2648 21.5176 17.2261 21.5709L15.5488 23.6403L17.2261 25.7024C17.2697 25.7508 17.2914 25.8137 17.2914 25.8912C17.2914 25.9832 17.26 26.0606 17.197 26.1236C17.139 26.1865 17.0615 26.2179 16.9647 26.2179C16.8582 26.2179 16.7711 26.172 16.7033 26.08L15.1494 24.1268L13.6174 26.0872C13.5447 26.1744 13.46 26.2179 13.3632 26.2179ZM19.2802 26.1816C19.1544 26.1816 19.0454 26.1381 18.9535 26.0509C18.8663 25.959 18.8228 25.8501 18.8228 25.7242V21.4111C18.8228 21.3192 18.8542 21.2417 18.9172 21.1788C18.9801 21.111 19.0575 21.0771 19.1495 21.0771C19.2415 21.0771 19.3189 21.111 19.3819 21.1788C19.4496 21.2417 19.4835 21.3192 19.4835 21.4111V25.5209H21.8579C21.9499 25.5209 22.0273 25.5548 22.0902 25.6225C22.158 25.6855 22.1919 25.7629 22.1919 25.8549C22.1919 25.9469 22.158 26.0243 22.0902 26.0872C22.0273 26.1502 21.9499 26.1816 21.8579 26.1816H19.2802ZM25.1121 26.2543C24.4973 26.2543 23.9213 26.1381 23.3839 25.9057C23.3259 25.8815 23.2775 25.8428 23.2387 25.7895C23.2 25.7315 23.1806 25.6709 23.1806 25.608C23.1806 25.5257 23.2073 25.4555 23.2605 25.3974C23.3186 25.3345 23.3912 25.3031 23.4783 25.3031C23.5267 25.3031 23.5727 25.3127 23.6163 25.3321C24.0616 25.5306 24.5385 25.6298 25.0467 25.6298C25.8938 25.6298 26.3174 25.3515 26.3174 24.7948C26.3174 24.6496 26.2617 24.5285 26.1504 24.4317C26.0439 24.3349 25.9108 24.2599 25.751 24.2066C25.5913 24.1486 25.3638 24.0808 25.0685 24.0033C24.6764 23.9017 24.3593 23.8049 24.1173 23.7129C23.8753 23.6161 23.6671 23.4733 23.4929 23.2845C23.3186 23.0957 23.2315 22.844 23.2315 22.5293C23.2315 22.2534 23.3041 22.0041 23.4493 21.7815C23.5945 21.5539 23.8075 21.3748 24.0883 21.2441C24.3739 21.1086 24.7151 21.0408 25.1121 21.0408C25.6445 21.0408 26.1262 21.1207 26.557 21.2804C26.6926 21.3289 26.7603 21.4257 26.7603 21.5709C26.7603 21.6483 26.7337 21.7185 26.6805 21.7815C26.6272 21.8444 26.557 21.8758 26.4699 21.8758C26.4408 21.8758 26.4021 21.8662 26.3537 21.8468C25.9761 21.7161 25.5865 21.6508 25.1847 21.6508C24.8023 21.6508 24.49 21.7234 24.248 21.8686C24.0108 22.0138 23.8922 22.2171 23.8922 22.4785C23.8922 22.6528 23.9479 22.7956 24.0592 22.9069C24.1754 23.0134 24.3182 23.0981 24.4876 23.1611C24.6619 23.2191 24.8967 23.2821 25.1919 23.3498C25.5744 23.4418 25.8817 23.5338 26.1141 23.6258C26.3513 23.7177 26.5522 23.8605 26.7168 24.0542C26.8862 24.2478 26.9709 24.5092 26.9709 24.8384C26.9709 25.1094 26.8934 25.3539 26.7385 25.5717C26.5836 25.7847 26.3658 25.9517 26.0851 26.0727C25.8043 26.1937 25.48 26.2543 25.1121 26.2543Z" fill="white" /> <path d="M13.1454 26.1308L13.0103 26.2555L13.0153 26.2609L13.0207 26.2659L13.1454 26.1308ZM13.1236 25.7097L12.9809 25.5936L12.9765 25.5994L13.1236 25.7097ZM14.8009 23.6475L14.9435 23.7635L15.0378 23.6476L14.9436 23.5317L14.8009 23.6475ZM13.1381 21.5999L12.991 21.7103L12.9954 21.7158L13.1381 21.5999ZM13.1599 21.1715L13.0299 21.0415L13.0299 21.0415L13.1599 21.1715ZM13.5447 21.1134L13.627 20.949H13.627L13.5447 21.1134ZM13.6609 21.2078L13.5138 21.3182L13.5165 21.3215L13.6609 21.2078ZM15.193 23.1538L15.0486 23.2675L15.1935 23.4516L15.3378 23.267L15.193 23.1538ZM16.7251 21.1933L16.8702 21.3067L16.8766 21.2975L16.7251 21.1933ZM17.1898 21.1715L17.0597 21.3016L17.0651 21.3066L17.1898 21.1715ZM17.2261 21.5709L17.3691 21.6868L17.3748 21.679L17.2261 21.5709ZM15.5488 23.6403L15.406 23.5245L15.312 23.6405L15.4062 23.7563L15.5488 23.6403ZM17.2261 25.7024L17.0833 25.8186L17.0895 25.8254L17.2261 25.7024ZM17.197 26.1236L17.067 25.9935L17.062 25.9989L17.197 26.1236ZM16.7033 26.08L16.8514 25.9709L16.8471 25.9655L16.7033 26.08ZM15.1494 24.1268L15.2933 24.0123L15.1481 23.8299L15.0046 24.0136L15.1494 24.1268ZM13.6174 26.0872L13.7586 26.205L13.7622 26.2004L13.6174 26.0872ZM13.3632 26.2179V26.0341C13.3292 26.0341 13.3006 26.0239 13.2701 25.9957L13.1454 26.1308L13.0207 26.2659C13.1161 26.3539 13.2327 26.4018 13.3632 26.4018V26.2179ZM13.1454 26.1308L13.2805 26.0061C13.2523 25.9756 13.2421 25.947 13.2421 25.913H13.0583H12.8744C12.8744 26.0435 12.9223 26.1601 13.0103 26.2555L13.1454 26.1308ZM13.0583 25.913H13.2421C13.2421 25.8725 13.2526 25.8441 13.2707 25.82L13.1236 25.7097L12.9765 25.5994C12.9075 25.6915 12.8744 25.7986 12.8744 25.913H13.0583ZM13.1236 25.7097L13.2662 25.8257L14.9435 23.7635L14.8009 23.6475L14.6583 23.5315L12.981 25.5937L13.1236 25.7097ZM14.8009 23.6475L14.9436 23.5317L13.2808 21.4841L13.1381 21.5999L12.9954 21.7158L14.6582 23.7634L14.8009 23.6475ZM13.1381 21.5999L13.2852 21.4896C13.2671 21.4656 13.2566 21.4371 13.2566 21.3966H13.0728H12.889C12.889 21.511 12.922 21.6181 12.9911 21.7102L13.1381 21.5999ZM13.0728 21.3966H13.2566C13.2566 21.347 13.2705 21.3209 13.2899 21.3015L13.1599 21.1715L13.0299 21.0415C12.9331 21.1384 12.889 21.2623 12.889 21.3966H13.0728ZM13.1599 21.1715L13.2899 21.3015C13.3171 21.2743 13.3472 21.261 13.3923 21.261V21.0771V20.8933C13.2534 20.8933 13.1286 20.9429 13.0299 21.0415L13.1599 21.1715ZM13.3923 21.0771V21.261C13.4165 21.261 13.4392 21.2662 13.4625 21.2779L13.5447 21.1134L13.627 20.949C13.5535 20.9123 13.4745 20.8933 13.3923 20.8933V21.0771ZM13.5447 21.1134L13.4625 21.2779C13.4885 21.2908 13.5039 21.3048 13.5139 21.3181L13.6609 21.2078L13.808 21.0975C13.7599 21.0334 13.6978 20.9845 13.627 20.949L13.5447 21.1134ZM13.6609 21.2078L13.5165 21.3215L15.0486 23.2675L15.193 23.1538L15.3374 23.0401L13.8054 21.0941L13.6609 21.2078ZM15.193 23.1538L15.3378 23.267L16.8699 21.3065L16.7251 21.1933L16.5802 21.0801L15.0482 23.0406L15.193 23.1538ZM16.7251 21.1933L16.8766 21.2975C16.8905 21.2771 16.9094 21.261 16.9647 21.261V21.0771V20.8933C16.807 20.8933 16.6661 20.9546 16.5736 21.0892L16.7251 21.1933ZM16.9647 21.0771V21.261C17.0019 21.261 17.0305 21.2722 17.0598 21.3015L17.1898 21.1715L17.3198 21.0415C17.2232 20.945 17.1017 20.8933 16.9647 20.8933V21.0771ZM17.1898 21.1715L17.0651 21.3066C17.0896 21.3292 17.1004 21.3525 17.1004 21.3894H17.2842H17.468C17.468 21.2519 17.4158 21.13 17.3145 21.0365L17.1898 21.1715ZM17.2842 21.3894H17.1004C17.1004 21.4195 17.0926 21.4419 17.0774 21.4628L17.2261 21.5709L17.3748 21.679C17.437 21.5934 17.468 21.4948 17.468 21.3894H17.2842ZM17.2261 21.5709L17.0833 21.4551L15.406 23.5245L15.5488 23.6403L15.6916 23.756L17.3689 21.6866L17.2261 21.5709ZM15.5488 23.6403L15.4062 23.7563L17.0835 25.8184L17.2261 25.7024L17.3687 25.5864L15.6914 23.5243L15.5488 23.6403ZM17.2261 25.7024L17.0895 25.8254C17.0971 25.8338 17.1076 25.8501 17.1076 25.8912H17.2914H17.4753C17.4753 25.7774 17.4422 25.6678 17.3627 25.5794L17.2261 25.7024ZM17.2914 25.8912H17.1076C17.1076 25.9362 17.0942 25.9664 17.0671 25.9936L17.197 26.1236L17.327 26.2535C17.4257 26.1549 17.4753 26.0301 17.4753 25.8912H17.2914ZM17.197 26.1236L17.062 25.9989C17.0434 26.019 17.0176 26.0341 16.9647 26.0341V26.2179V26.4018C17.1054 26.4018 17.2345 26.354 17.3321 26.2482L17.197 26.1236ZM16.9647 26.2179V26.0341C16.9214 26.0341 16.8873 26.0199 16.8513 25.9709L16.7033 26.08L16.5553 26.189C16.6548 26.324 16.795 26.4018 16.9647 26.4018V26.2179ZM16.7033 26.08L16.8471 25.9655L15.2933 24.0123L15.1494 24.1268L15.0056 24.2412L16.5594 26.1944L16.7033 26.08ZM15.1494 24.1268L15.0046 24.0136L13.4725 25.9741L13.6174 26.0872L13.7622 26.2004L15.2943 24.24L15.1494 24.1268ZM13.6174 26.0872L13.4761 25.9696C13.4318 26.0228 13.3959 26.0341 13.3632 26.0341V26.2179V26.4018C13.5242 26.4018 13.6577 26.326 13.7586 26.2049L13.6174 26.0872ZM18.9535 26.0509L18.8198 26.1776L18.827 26.1844L18.9535 26.0509ZM18.9172 21.1788L19.0472 21.3089L19.0519 21.3039L18.9172 21.1788ZM19.3819 21.1788L19.2468 21.3042L19.2568 21.3135L19.3819 21.1788ZM19.4835 25.5209H19.2997V25.7047H19.4835V25.5209ZM22.0902 25.6225L21.9552 25.748L21.9652 25.7572L22.0902 25.6225ZM22.0902 26.0872L21.9651 25.9525L21.9603 25.9573L22.0902 26.0872ZM19.2802 26.1816V25.9978C19.2017 25.9978 19.138 25.9725 19.0799 25.9175L18.9535 26.0509L18.827 26.1844C18.9529 26.3036 19.107 26.3655 19.2802 26.3655V26.1816ZM18.9535 26.0509L19.0869 25.9245C19.0319 25.8664 19.0066 25.8027 19.0066 25.7242H18.8228H18.639C18.639 25.8974 18.7008 26.0515 18.82 26.1774L18.9535 26.0509ZM18.8228 25.7242H19.0066V21.4111H18.8228H18.639V25.7242H18.8228ZM18.8228 21.4111H19.0066C19.0066 21.3661 19.02 21.336 19.0472 21.3088L18.9172 21.1788L18.7872 21.0488C18.6885 21.1475 18.639 21.2722 18.639 21.4111H18.8228ZM18.9172 21.1788L19.0519 21.3039C19.0802 21.2733 19.109 21.261 19.1495 21.261V21.0771V20.8933C19.0061 20.8933 18.88 20.9487 18.7825 21.0537L18.9172 21.1788ZM19.1495 21.0771V21.261C19.1901 21.261 19.2188 21.2733 19.2472 21.3039L19.3819 21.1788L19.5166 21.0537C19.4191 20.9487 19.2929 20.8933 19.1495 20.8933V21.0771ZM19.3819 21.1788L19.2568 21.3135C19.2873 21.3419 19.2997 21.3706 19.2997 21.4111H19.4835H19.6674C19.6674 21.2677 19.6119 21.1416 19.507 21.0441L19.3819 21.1788ZM19.4835 21.4111H19.2997V25.5209H19.4835H19.6674V21.4111H19.4835ZM19.4835 25.5209V25.7047H21.8579V25.5209V25.3371H19.4835V25.5209ZM21.8579 25.5209V25.7047C21.8984 25.7047 21.9272 25.7171 21.9555 25.7476L22.0902 25.6225L22.2249 25.4975C22.1275 25.3925 22.0013 25.3371 21.8579 25.3371V25.5209ZM22.0902 25.6225L21.9652 25.7572C21.9957 25.7856 22.0081 25.8144 22.0081 25.8549H22.1919H22.3757C22.3757 25.7115 22.3203 25.5853 22.2153 25.4878L22.0902 25.6225ZM22.1919 25.8549H22.0081C22.0081 25.8954 21.9957 25.9242 21.9652 25.9525L22.0902 26.0872L22.2153 26.222C22.3203 26.1245 22.3757 25.9983 22.3757 25.8549H22.1919ZM22.0902 26.0872L21.9603 25.9573C21.9331 25.9845 21.9029 25.9978 21.8579 25.9978V26.1816V26.3655C21.9968 26.3655 22.1216 26.3159 22.2202 26.2172L22.0902 26.0872ZM21.8579 26.1816V25.9978H19.2802V26.1816V26.3655H21.8579V26.1816ZM23.3839 25.9057L23.4569 25.737L23.4546 25.736L23.3839 25.9057ZM23.2387 25.7895L23.0857 25.8916L23.0901 25.8977L23.2387 25.7895ZM23.2605 25.3974L23.1254 25.2728L23.125 25.2732L23.2605 25.3974ZM23.6163 25.3321L23.6911 25.1642L23.691 25.1641L23.6163 25.3321ZM26.1504 24.4317L26.0267 24.5678L26.0298 24.5704L26.1504 24.4317ZM25.751 24.2066L25.6882 24.3795L25.6929 24.381L25.751 24.2066ZM25.0685 24.0033L25.1151 23.8255L25.1146 23.8254L25.0685 24.0033ZM24.1173 23.7129L24.049 23.8836L24.052 23.8847L24.1173 23.7129ZM23.4929 23.2845L23.3578 23.4092L23.4929 23.2845ZM23.4493 21.7815L23.6033 21.8819L23.6042 21.8804L23.4493 21.7815ZM24.0883 21.2441L24.1658 21.4108L24.1671 21.4102L24.0883 21.2441ZM26.557 21.2804L26.4931 21.4528L26.4952 21.4536L26.557 21.2804ZM26.6805 21.7815L26.8208 21.9002V21.9002L26.6805 21.7815ZM26.3537 21.8468L26.4221 21.6759L26.4138 21.6731L26.3537 21.8468ZM24.248 21.8686L24.1534 21.711L24.152 21.7118L24.248 21.8686ZM24.0592 22.9069L23.9291 23.037L23.935 23.0424L24.0592 22.9069ZM24.4876 23.1611L24.4236 23.3335L24.4295 23.3354L24.4876 23.1611ZM25.1919 23.3498L25.2349 23.1711L25.2331 23.1707L25.1919 23.3498ZM26.1141 23.6258L26.0464 23.7967L26.0476 23.7971L26.1141 23.6258ZM26.7168 24.0542L26.5767 24.1732L26.5784 24.1752L26.7168 24.0542ZM26.7385 25.5717L26.8872 25.6798L26.8884 25.6782L26.7385 25.5717ZM26.0851 26.0727L26.1578 26.2415L26.0851 26.0727ZM25.1121 26.2543V26.0704C24.5211 26.0704 23.97 25.9589 23.4569 25.737L23.3839 25.9057L23.311 26.0744C23.8725 26.3173 24.4735 26.4381 25.1121 26.4381V26.2543ZM23.3839 25.9057L23.4546 25.736C23.4292 25.7254 23.4072 25.7087 23.3874 25.6814L23.2387 25.7895L23.0901 25.8977C23.1477 25.9769 23.2225 26.0376 23.3132 26.0754L23.3839 25.9057ZM23.2387 25.7895L23.3917 25.6876C23.3708 25.6563 23.3645 25.6307 23.3645 25.608H23.1806H22.9968C22.9968 25.7112 23.0292 25.8067 23.0858 25.8915L23.2387 25.7895ZM23.1806 25.608H23.3645C23.3645 25.5695 23.3753 25.5442 23.396 25.5217L23.2605 25.3974L23.125 25.2732C23.0392 25.3668 22.9968 25.482 22.9968 25.608H23.1806ZM23.2605 25.3974L23.3956 25.5221C23.4182 25.4976 23.4415 25.4869 23.4783 25.4869V25.3031V25.1192C23.3409 25.1192 23.219 25.1714 23.1254 25.2728L23.2605 25.3974ZM23.4783 25.3031V25.4869C23.5014 25.4869 23.5219 25.4913 23.5416 25.5001L23.6163 25.3321L23.691 25.1641C23.6235 25.1341 23.5521 25.1192 23.4783 25.1192V25.3031ZM23.6163 25.3321L23.5415 25.5C24.0114 25.7094 24.5138 25.8136 25.0467 25.8136V25.6298V25.446C24.5631 25.446 24.1119 25.3517 23.6911 25.1642L23.6163 25.3321ZM25.0467 25.6298V25.8136C25.4846 25.8136 25.8449 25.7428 26.1007 25.5747C26.3699 25.3977 26.5012 25.1278 26.5012 24.7948H26.3174H26.1336C26.1336 25.0184 26.0531 25.166 25.8988 25.2674C25.731 25.3777 25.456 25.446 25.0467 25.446V25.6298ZM26.3174 24.7948H26.5012C26.5012 24.5954 26.4218 24.4241 26.271 24.293L26.1504 24.4317L26.0298 24.5704C26.1017 24.633 26.1336 24.7037 26.1336 24.7948H26.3174ZM26.1504 24.4317L26.2741 24.2957C26.1457 24.179 25.9891 24.0922 25.8092 24.0323L25.751 24.2066L25.6929 24.381C25.8325 24.4275 25.9421 24.4908 26.0267 24.5678L26.1504 24.4317ZM25.751 24.2066L25.8139 24.0339C25.6462 23.9729 25.4123 23.9035 25.1151 23.8255L25.0685 24.0033L25.0219 24.1811C25.3152 24.2581 25.5364 24.3242 25.6882 24.3794L25.751 24.2066ZM25.0685 24.0033L25.1146 23.8254C24.7259 23.7246 24.4159 23.6297 24.1826 23.5411L24.1173 23.7129L24.052 23.8847C24.3028 23.98 24.627 24.0788 25.0224 24.1813L25.0685 24.0033ZM24.1173 23.7129L24.1856 23.5422C23.9686 23.4554 23.7834 23.3282 23.6279 23.1598L23.4929 23.2845L23.3578 23.4092C23.5509 23.6184 23.782 23.7767 24.049 23.8836L24.1173 23.7129ZM23.4929 23.2845L23.6279 23.1598C23.4917 23.0122 23.4153 22.8087 23.4153 22.5293H23.2315H23.0476C23.0476 22.8793 23.1455 23.1792 23.3578 23.4092L23.4929 23.2845ZM23.2315 22.5293H23.4153C23.4153 22.2877 23.4783 22.0735 23.6033 21.8819L23.4493 21.7815L23.2953 21.681C23.1299 21.9348 23.0476 22.2192 23.0476 22.5293H23.2315ZM23.4493 21.7815L23.6042 21.8804C23.728 21.6865 23.912 21.529 24.1658 21.4108L24.0883 21.2441L24.0107 21.0775C23.703 21.2207 23.461 21.4214 23.2943 21.6826L23.4493 21.7815ZM24.0883 21.2441L24.1671 21.4102C24.4226 21.289 24.7356 21.2247 25.1121 21.2247V21.0408V20.857C24.6946 20.857 24.3251 20.9282 24.0095 21.0781L24.0883 21.2441ZM25.1121 21.0408V21.2247C25.6261 21.2247 26.0857 21.3017 26.4931 21.4528L26.557 21.2804L26.6209 21.1081C26.1667 20.9397 25.663 20.857 25.1121 20.857V21.0408ZM26.557 21.2804L26.4952 21.4536C26.535 21.4678 26.5513 21.4839 26.5589 21.4948C26.5666 21.5058 26.5765 21.5273 26.5765 21.5709H26.7603H26.9442C26.9442 21.4693 26.9201 21.3697 26.8601 21.2839C26.8 21.198 26.7146 21.1415 26.6188 21.1073L26.557 21.2804ZM26.7603 21.5709H26.5765C26.5765 21.6019 26.5672 21.6307 26.5401 21.6627L26.6805 21.7815L26.8208 21.9002C26.9002 21.8064 26.9442 21.6947 26.9442 21.5709H26.7603ZM26.6805 21.7815L26.5401 21.6627C26.524 21.6818 26.5065 21.692 26.4699 21.692V21.8758V22.0597C26.6076 22.0597 26.7304 22.007 26.8208 21.9002L26.6805 21.7815ZM26.4699 21.8758V21.692C26.4748 21.692 26.4734 21.6927 26.4636 21.6903C26.4543 21.6879 26.4407 21.6836 26.422 21.6761L26.3537 21.8468L26.2854 22.0175C26.3411 22.0397 26.4057 22.0597 26.4699 22.0597V21.8758ZM26.3537 21.8468L26.4138 21.6731C26.0168 21.5357 25.6068 21.4669 25.1847 21.4669V21.6508V21.8346C25.5661 21.8346 25.9355 21.8966 26.2936 22.0205L26.3537 21.8468ZM25.1847 21.6508V21.4669C24.7804 21.4669 24.4324 21.5436 24.1534 21.711L24.248 21.8686L24.3426 22.0262C24.5476 21.9032 24.8242 21.8346 25.1847 21.8346V21.6508ZM24.248 21.8686L24.152 21.7118C23.8645 21.8879 23.7084 22.1483 23.7084 22.4785H23.8922H24.076C24.076 22.2859 24.1571 22.1398 24.344 22.0254L24.248 21.8686ZM23.8922 22.4785H23.7084C23.7084 22.6958 23.7796 22.8873 23.9292 23.0369L24.0592 22.9069L24.1892 22.7769C24.1162 22.7039 24.076 22.6097 24.076 22.4785H23.8922ZM24.0592 22.9069L23.935 23.0424C24.0711 23.1671 24.2352 23.2634 24.4236 23.3334L24.4876 23.1611L24.5516 22.9887C24.4012 22.9329 24.2797 22.8597 24.1834 22.7714L24.0592 22.9069ZM24.4876 23.1611L24.4295 23.3354C24.6118 23.3962 24.853 23.4606 25.1508 23.529L25.1919 23.3498L25.2331 23.1707C24.9404 23.1035 24.712 23.0421 24.5458 22.9867L24.4876 23.1611ZM25.1919 23.3498L25.149 23.5286C25.5272 23.6195 25.8253 23.7091 26.0464 23.7967L26.1141 23.6258L26.1818 23.4548C25.9382 23.3584 25.6216 23.2641 25.2349 23.1711L25.1919 23.3498ZM26.1141 23.6258L26.0476 23.7971C26.2564 23.8781 26.4319 24.0029 26.5767 24.1732L26.7168 24.0542L26.8568 23.9351C26.6724 23.7182 26.4462 23.5574 26.1806 23.4544L26.1141 23.6258ZM26.7168 24.0542L26.5784 24.1752C26.7111 24.3268 26.7871 24.5409 26.7871 24.8384H26.9709H27.1547C27.1547 24.4774 27.0613 24.1688 26.8551 23.9331L26.7168 24.0542ZM26.9709 24.8384H26.7871C26.7871 25.0718 26.7212 25.2789 26.5887 25.4652L26.7385 25.5717L26.8884 25.6782C27.0657 25.4288 27.1547 25.147 27.1547 24.8384H26.9709ZM26.7385 25.5717L26.5899 25.4636C26.4573 25.6459 26.2677 25.7938 26.0123 25.9039L26.0851 26.0727L26.1578 26.2415C26.4639 26.1096 26.71 25.9235 26.8872 25.6798L26.7385 25.5717ZM26.0851 26.0727L26.0123 25.9039C25.7587 26.0132 25.4599 26.0704 25.1121 26.0704V26.2543V26.4381C25.5 26.4381 25.8499 26.3743 26.1578 26.2415L26.0851 26.0727Z" fill="white" mask="url(#path-6-outside-1_9617_7268)" /> <mask id="mask1_9617_7268" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="7" y="6" width="26" height="28" > <path d="M30.4779 34H9.52206C8.40531 34 7.5 33.1046 7.5 32V8C7.5 6.89543 8.40531 6 9.52206 6H23.125L32.5 15.2727V32C32.5 33.1046 31.5947 34 30.4779 34Z" fill="url(#paint2_linear_9617_7268)" /> </mask> <g mask="url(#mask1_9617_7268)"> <ellipse opacity="0.05" cx="6.16728" cy="4.86377" rx="20.5423" ry="19.5" fill="url(#paint3_linear_9617_7268)" /> <ellipse opacity="0.07" cx="6.16751" cy="4.8635" rx="12.9136" ry="12.2273" fill="url(#paint4_linear_9617_7268)" /> </g> <g filter="url(#filter1_d_9617_7268)"> <path d="M32.5 15.2727H25.1471C24.0303 15.2727 23.125 14.3674 23.125 13.2507V6L32.5 15.2727Z" fill="url(#paint5_linear_9617_7268)" /> </g> </g> <defs> <filter id="filter0_f_9617_7268" x="8.32706" y="15.9609" width="23.5295" height="14.8053" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" > <feFlood flood-opacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="1.79228" result="effect1_foregroundBlur_9617_7268" /> </filter> <filter id="filter1_d_9617_7268" x="21.011" y="3.79412" width="13.9706" height="13.8685" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" > <feFlood flood-opacity="0" result="BackgroundImageFix" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dx="0.183824" dy="0.0919118" /> <feGaussianBlur stdDeviation="1.1489" /> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.33 0" /> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9617_7268" /> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_9617_7268" result="shape" /> </filter> <linearGradient id="paint0_linear_9617_7268" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse" > <stop stop-color="#FF7979" /> <stop offset="1" stop-color="#E85555" /> </linearGradient> <linearGradient id="paint1_linear_9617_7268" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse" > <stop offset="0.000265127" stop-color="#83CC70" /> <stop offset="1" stop-color="#61A850" /> </linearGradient> <linearGradient id="paint2_linear_9617_7268" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse" > <stop offset="0.000265127" stop-color="#83CC70" /> <stop offset="1" stop-color="#61A850" /> </linearGradient> <linearGradient id="paint3_linear_9617_7268" x1="7.6588" y1="5.53387" x2="13.7698" y2="21.9314" gradientUnits="userSpaceOnUse" > <stop stop-color="white" stop-opacity="0" /> <stop offset="1" stop-color="white" /> </linearGradient> <linearGradient id="paint4_linear_9617_7268" x1="7.10513" y1="5.28368" x2="10.9296" y2="15.572" gradientUnits="userSpaceOnUse" > <stop stop-color="white" stop-opacity="0" /> <stop offset="1" stop-color="white" /> </linearGradient> <linearGradient id="paint5_linear_9617_7268" x1="27.8125" y1="6" x2="27.8125" y2="15.2727" gradientUnits="userSpaceOnUse" > <stop stop-color="#3FAF43" /> <stop offset="1" stop-color="#0E8312" /> </linearGradient> </defs> </svg>';

class CustomFileUploadComponent {
    sanitizer;
    parentForm;
    FileTypes; //
    maxFileSize;
    controlName;
    // @Input() ;
    // labels for translate
    label = 'File';
    labelClass = '';
    buttonSelectLabel = 'Select File';
    FileTypesMessage = 'Remove File';
    placeholder = 'Select an option';
    gridCols = 5;
    validation = [];
    disabled = false;
    maxFileCount;
    fileInput;
    clearFileInput() {
        this.fileInput.nativeElement.value = '';
    }
    checkedUploadCloud;
    checkedGenAttachmentIcon;
    checkedPptIcon;
    checkedXlsIcon;
    _toast = inject(ToastService);
    blobUrlCache = new Map();
    mimeTypesMap = {
        '.pdf': 'application/pdf',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.xls': 'application/vnd.ms-excel',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        '.ppt': 'application/vnd.ms-powerpoint',
        '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        '.doc': 'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
    fileTypeIcons = {
        // PDF
        'application/pdf': './../../assets/icons/file-icon.svg',
        // Images
        'image/png': './../../assets/icons/file-icon.svg',
        'image/jpeg': './../../assets/icons/file-icon.svg',
        'image/gif': './../../assets/icons/file-icon.svg',
        // Excel
        'application/vnd.ms-excel': './../../assets/icons/xls-icon.svg',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': './../../assets/icons/xls-icon.svg',
        // PowerPoint
        'application/vnd.ms-powerpoint': './../../assets/icons/ppt-icon.svg',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': './../../assets/icons/ppt-icon.svg',
        // Word
        'application/msword': './../../assets/icons/word-icon.svg',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': './../../assets/icons/file-icon.svg',
    };
    defaultIcon = './../../assets/icons/file-icon.svg';
    selectedFileName = null;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        const sortSvgIcon = uploadCloudSVG;
        const IconAttachmentSVGIcon = IconAttachmentSVG;
        const PPT_SVGIcon = PPT_SVG;
        const XLS_SVGIcon = XLS_SVG;
        this.checkedUploadCloud =
            this.sanitizer.bypassSecurityTrustHtml(sortSvgIcon);
        this.checkedGenAttachmentIcon = this.sanitizer.bypassSecurityTrustHtml(IconAttachmentSVGIcon);
        this.checkedPptIcon = this.sanitizer.bypassSecurityTrustHtml(PPT_SVGIcon);
        this.checkedXlsIcon = this.sanitizer.bypassSecurityTrustHtml(XLS_SVGIcon);
    }
    fileUrl(file) {
        // Check if URL already exists in cache
        // if (this.blobUrlCache.has(file)) {
        //   return this.blobUrlCache.get(file)!;
        // }
        // Create new URL and cache it
        // const url = URL.createObjectURL(file);
        // this.blobUrlCache.set(file, url);
        // return url;
        if (typeof file === 'string') {
            return file;
        }
        if (file instanceof Blob) {
            if (this.blobUrlCache.has(file)) {
                return this.blobUrlCache.get(file);
            }
            // Create new URL and cache it
            const url = URL.createObjectURL(file);
            this.blobUrlCache.set(file, url);
            return url;
        }
        return '';
    }
    removeSelectedFile(id) {
        const attachments = this.parentForm.get(this.controlName)?.value;
        // console.log(attachments);
        if (Array.isArray(attachments)) {
            // Get the file being removed and revoke its URL
            const fileToRemove = attachments[id];
            if (fileToRemove?.blob && this.blobUrlCache.has(fileToRemove.blob)) {
                const url = this.blobUrlCache.get(fileToRemove.blob);
                URL.revokeObjectURL(url);
                this.blobUrlCache.delete(fileToRemove.blob);
            }
            const updatedAttachments = attachments.filter((_, idx) => idx !== id);
            this.parentForm.patchValue({ [this.controlName]: updatedAttachments });
            this.parentForm.get(this.controlName)?.updateValueAndValidity();
            if (updatedAttachments.length === 0) {
                this.selectedFileName = null;
            }
        }
        else {
            // Clean up single file
            const currentFile = this.parentForm.get(this.controlName)?.value;
            if (currentFile?.blob && this.blobUrlCache.has(currentFile.blob)) {
                const url = this.blobUrlCache.get(currentFile.blob);
                URL.revokeObjectURL(url);
                this.blobUrlCache.delete(currentFile.blob);
            }
            this.parentForm.patchValue({ [this.controlName]: null });
            this.parentForm.get(this.controlName)?.updateValueAndValidity();
            this.selectedFileName = null;
        }
    }
    // Clean up on component destruction
    ngOnDestroy() {
        // Revoke all cached URLs to prevent memory leaks
        this.blobUrlCache.forEach((url) => {
            URL.revokeObjectURL(url);
        });
        this.blobUrlCache.clear();
    }
    readFileAsBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                // Remove the "data:[mime];base64," prefix if you only want base64
                const base64 = result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }
    async onFileSelected($event) {
        if (!this.parentForm.get(this.controlName)?.value) {
            this.parentForm.patchValue({ [this.controlName]: [] });
        }
        if (this.maxFileCount &&
            this.parentForm.get(this.controlName)?.value &&
            this.parentForm.get(this.controlName)?.value.length >= this.maxFileCount) {
            // TODO: show error message
            console.error('max files is ', this.maxFileCount);
            return;
        }
        const input = $event.target;
        if (input.files && input.files.length > 0) {
            const allowedFiles = Array.from(input.files).filter((file) => this.mimeTypes.includes(file.type));
            if (allowedFiles.length > 0) {
                const file = allowedFiles[0];
                this.selectedFileName = file.name;
                // Save file as Blob
                //  const fileBlob = file; // file is already a Blob (File extends Blob)
                const base64Content = await this.readFileAsBase64(file);
                const fileData = {
                    fileName: file.name,
                    mimeType: file.type,
                    base64Content: base64Content,
                };
                let attachments = this.parentForm.get(this.controlName)?.value;
                if (!Array.isArray(attachments)) {
                    attachments = [];
                }
                attachments.push(fileData);
                this.parentForm.patchValue({ attachments });
                this.parentForm.get(this.controlName)?.updateValueAndValidity();
                this.clearFileInput();
            }
            else {
                const res = input.files[0].name.split('.');
                this._toast.toast(`File type ${res[res.length - 1]} not allowed`, 'top-center', 'error', 3000);
            }
        }
    }
    containRequiredError() {
        return this.validation.some((error) => error.errorType.includes(ComponentFormErrorConstant.REQUIRED));
    }
    getFileTypesText() {
        if (!this.FileTypes || this.FileTypes.length === 0) {
            return 'No file types specified';
        }
        // Remove dots and convert to uppercase
        const types = this.FileTypes.map((type) => type.replace('.', '').toUpperCase());
        if (types.length === 1) {
            return types[0];
        }
        else if (types.length === 2) {
            return `${types[0]} or ${types[1]}`;
        }
        else {
            // Join all but last with commas, add "or" before last
            const allButLast = types.slice(0, -1).join(', ');
            const last = types[types.length - 1];
            return `${allButLast} or ${last}`;
        }
    }
    get mimeTypes() {
        // console.log(
        //   this.FileTypes.map((ext) => this.mimeTypesMap[ext] || 'unknown')
        // );
        return this.FileTypes.map((ext) => this.mimeTypesMap[ext] || 'unknown');
    }
    // Get appropriate icon for file type
    getFileIconSvg(mimeType) {
        return this.fileTypeIcons[mimeType] || this.defaultIcon;
    }
    // Check if file is an image type
    isImageFile(mimeType) {
        return mimeType.startsWith('image/');
    }
    // Handle image load error
    onImageError(event) {
        event.target.src = this.defaultIcon;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomFileUploadComponent, deps: [{ token: i1$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomFileUploadComponent, isStandalone: true, selector: "custom-file-upload", inputs: { parentForm: "parentForm", FileTypes: "FileTypes", maxFileSize: "maxFileSize", controlName: "controlName", label: "label", labelClass: "labelClass", buttonSelectLabel: "buttonSelectLabel", FileTypesMessage: "FileTypesMessage", placeholder: "placeholder", gridCols: "gridCols", validation: "validation", disabled: "disabled", maxFileCount: "maxFileCount" }, viewQueries: [{ propertyName: "fileInput", first: true, predicate: ["fileInput"], descendants: true }], ngImport: i0, template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n    @if(containRequiredError()){\n    <span class=\"required-asterisk\">*</span>\n    } @else{\n    <span class=\"required-asterisk\">&nbsp;</span>\n    }\n  </label>\n  }\n  <div class=\"upload-container\">\n    <!-- Hidden file input -->\n    <input\n      #fileInput\n      type=\"file\"\n      id=\"file-upload\"\n      class=\"file-input-hidden\"\n      [accept]=\"FileTypes.join(',')\"\n      (change)=\"onFileSelected($event)\"\n      [disabled]=\"\n        maxFileCount &&\n        parentForm.get(controlName)?.value?.length >= maxFileCount\n      \"\n    />\n    <!-- Main upload area -->\n    <label\n      for=\"file-upload\"\n      [ngClass]=\"{\n        'upload-label': true,\n        disabled:\n          maxFileCount &&\n          parentForm.get(controlName)?.value?.length >= maxFileCount\n      }\"\n    >\n      <div class=\"upload-grid\">\n        <!-- Upload icon -->\n        <div class=\"icon-container\" [innerHTML]=\"checkedUploadCloud\"></div>\n        <div class=\"upload-text\">\n          <p class=\"upload-title\">{{ placeholder }}</p>\n          <span class=\"upload-subtitle\">\n            {{ getFileTypesText() }}, file size no more than {{ maxFileSize }}\n          </span>\n        </div>\n        <label\n          for=\"file-upload\"\n          [ngClass]=\"{\n            'select-button': true,\n            disabled:\n              maxFileCount &&\n              parentForm.get(controlName)?.value?.length >= maxFileCount\n          }\"\n        >\n          {{ buttonSelectLabel }}\n        </label>\n      </div>\n    </label>\n  </div>\n  @if(parentForm.controls[controlName].value?.length){\n  <div class=\"file-list-container\">\n    <ul class=\"file-grid\" [ngStyle]=\"{ '--grid-cols': gridCols }\">\n      @for (file of parentForm.controls[controlName].value; track file; let i =\n      $index) {\n      <li class=\"file-item\">\n        <div class=\"file-content\">\n          @if ((!mimeTypes.includes(file.mimeType))) {\n          <span class=\"file-name\">{{ file.fileName }}</span>\n          } @else if (!file.mimeType.includes('image')) {\n          <span class=\"file-name sm\">\n            @if (file.mimeType === 'application/vnd.ms-excel' || file.mimeType\n            ===\n            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')\n            {\n            <div class=\"file-svg-icon\" [innerHTML]=\"checkedXlsIcon\"></div>\n            } @else if (file.mimeType === 'application/vnd.ms-powerpoint' ||\n            file.mimeType ===\n            'application/vnd.openxmlformats-officedocument.presentationml.presentation')\n            {\n            <div class=\"file-svg-icon\" [innerHTML]=\"checkedPptIcon\"></div>\n            } @else {\n            <div\n              class=\"file-svg-icon\"\n              [innerHTML]=\"checkedGenAttachmentIcon\"\n            ></div>\n            }\n            <!-- @else if (file.mimeType === 'application/pdf') {\n            } -->\n            <!-- @else if (file.mimeType === 'application/msword' ||\n            'application/vnd.openxmlformats-officedocument.wordprocessingml.document')\n            {\n            } -->\n            <!-- <span class=\"file-name-text\" [title]=\"file.fileName\">{{\n              file.fileName\n            }}</span> -->\n            <span class=\"file-name-text\" [title]=\"file.fileName\">{{\n              file.fileName\n            }}</span>\n          </span>\n          } @else {\n          <img\n            [src]=\"\n              file.base64Content\n                ? 'data:' + file.mimeType + ';base64,' + file.base64Content\n                : file.imageUrl\n            \"\n            [alt]=\"file.fileName\"\n            class=\"file-image\"\n          />\n          }\n          <button\n            type=\"button\"\n            (click)=\"removeSelectedFile(i)\"\n            class=\"remove-button\"\n          >\n            <svg\n              xmlns=\"http://www.w3.org/2000/svg\"\n              class=\"remove-icon\"\n              fill=\"none\"\n              viewBox=\"0 0 24 24\"\n              stroke=\"currentColor\"\n            >\n              <path\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n                stroke-width=\"2\"\n                d=\"M6 18L18 6M6 6l12 12\"\n              />\n            </svg>\n          </button>\n        </div>\n      </li>\n      }\n    </ul>\n  </div>\n  }\n</div>\n", styles: [".required-asterisk{color:#f43f5e;font-size:15px;font-weight:500}.upload-container{display:flex;border:1px solid #82828233;border-radius:.5em;padding:.75em}.file-input-hidden{display:none}.upload-label{cursor:pointer;width:100%}.upload-label.disabled{cursor:not-allowed!important}.upload-grid{display:grid;grid-template-columns:1fr 6fr 2fr;gap:1em;align-items:center}.icon-container{display:flex;align-items:center;margin:.5em;width:3.25em}.upload-icon{height:3.25em;width:3.25em;color:#9ca3af}.upload-text{text-align:left}.upload-title{color:#111827;margin-bottom:.5em;font-size:1em}.upload-subtitle{font-size:.8em;color:#6b7280}.select-button{display:inline-flex;align-items:center;justify-content:center;padding:.5em 1.5em;border:1px solid #9d67aa;color:#9d67aa;background-color:#fff;border-radius:.5em;cursor:pointer;font-weight:500;width:10vw;text-align:center;transition:all .2s ease-in-out}.select-button.disabled{cursor:not-allowed!important}.disabled{opacity:60%}.select-button:hover{border-color:#8d579a;color:#8d579a}.file-list-container{margin-top:1em;width:100%}.file-grid{display:grid;grid-template-columns:repeat(var(--grid-cols, 5),minmax(0,1fr));gap:.5em;margin-top:1em}.file-item{display:flex;align-items:center;justify-content:space-between;background-color:#fff;border-radius:.25em;border:1px solid #e5e7eb;margin-bottom:.5em;aspect-ratio:1;height:7.2em;width:7.2em}.file-content{position:relative;width:100%;height:100%;flex:1}.file-name{display:block;width:100%;height:100%;overflow:hidden;text-overflow:ellipsis;color:#374151;padding:.5em;white-space:normal;word-break:break-words;font-size:.875em}.file-name.sm{font-size:.7em;display:inline-flex;flex-direction:column;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;align-items:center;justify-content:center;gap:.25em}.file-image{width:100%;height:100%;object-fit:cover;border-radius:.25em}.file-icon-svg{width:70%;height:70%;object-fit:cover;border-radius:.25em}.remove-button{position:absolute;top:.25em;right:.25em;color:#fff;background-color:#ef4444;border-radius:50%;padding:.25em;border:none;cursor:pointer;box-shadow:0 1px 3px #0000001a,0 1px 2px #0000000f;transition:background-color .2s ease-in-out}.remove-button:hover{background-color:#dc2626}.remove-button:focus{outline:none}.remove-icon{height:1.25em;width:1.25em}@media (max-width: 768px){.upload-grid{grid-template-columns:1fr;gap:.5em;text-align:center}.select-button{width:100%}.file-grid{grid-template-columns:repeat(3,1fr)}}@media (max-width: 480px){.file-grid{grid-template-columns:repeat(2,1fr)}}.custom-label{display:block;font-size:1em;font-weight:500;color:#707070;margin-bottom:.3em}.file-name-text{display:inline-block;max-width:90%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;position:relative}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomFileUploadComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-file-upload', imports: [FormsModule, ReactiveFormsModule, CommonModule], template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n    @if(containRequiredError()){\n    <span class=\"required-asterisk\">*</span>\n    } @else{\n    <span class=\"required-asterisk\">&nbsp;</span>\n    }\n  </label>\n  }\n  <div class=\"upload-container\">\n    <!-- Hidden file input -->\n    <input\n      #fileInput\n      type=\"file\"\n      id=\"file-upload\"\n      class=\"file-input-hidden\"\n      [accept]=\"FileTypes.join(',')\"\n      (change)=\"onFileSelected($event)\"\n      [disabled]=\"\n        maxFileCount &&\n        parentForm.get(controlName)?.value?.length >= maxFileCount\n      \"\n    />\n    <!-- Main upload area -->\n    <label\n      for=\"file-upload\"\n      [ngClass]=\"{\n        'upload-label': true,\n        disabled:\n          maxFileCount &&\n          parentForm.get(controlName)?.value?.length >= maxFileCount\n      }\"\n    >\n      <div class=\"upload-grid\">\n        <!-- Upload icon -->\n        <div class=\"icon-container\" [innerHTML]=\"checkedUploadCloud\"></div>\n        <div class=\"upload-text\">\n          <p class=\"upload-title\">{{ placeholder }}</p>\n          <span class=\"upload-subtitle\">\n            {{ getFileTypesText() }}, file size no more than {{ maxFileSize }}\n          </span>\n        </div>\n        <label\n          for=\"file-upload\"\n          [ngClass]=\"{\n            'select-button': true,\n            disabled:\n              maxFileCount &&\n              parentForm.get(controlName)?.value?.length >= maxFileCount\n          }\"\n        >\n          {{ buttonSelectLabel }}\n        </label>\n      </div>\n    </label>\n  </div>\n  @if(parentForm.controls[controlName].value?.length){\n  <div class=\"file-list-container\">\n    <ul class=\"file-grid\" [ngStyle]=\"{ '--grid-cols': gridCols }\">\n      @for (file of parentForm.controls[controlName].value; track file; let i =\n      $index) {\n      <li class=\"file-item\">\n        <div class=\"file-content\">\n          @if ((!mimeTypes.includes(file.mimeType))) {\n          <span class=\"file-name\">{{ file.fileName }}</span>\n          } @else if (!file.mimeType.includes('image')) {\n          <span class=\"file-name sm\">\n            @if (file.mimeType === 'application/vnd.ms-excel' || file.mimeType\n            ===\n            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')\n            {\n            <div class=\"file-svg-icon\" [innerHTML]=\"checkedXlsIcon\"></div>\n            } @else if (file.mimeType === 'application/vnd.ms-powerpoint' ||\n            file.mimeType ===\n            'application/vnd.openxmlformats-officedocument.presentationml.presentation')\n            {\n            <div class=\"file-svg-icon\" [innerHTML]=\"checkedPptIcon\"></div>\n            } @else {\n            <div\n              class=\"file-svg-icon\"\n              [innerHTML]=\"checkedGenAttachmentIcon\"\n            ></div>\n            }\n            <!-- @else if (file.mimeType === 'application/pdf') {\n            } -->\n            <!-- @else if (file.mimeType === 'application/msword' ||\n            'application/vnd.openxmlformats-officedocument.wordprocessingml.document')\n            {\n            } -->\n            <!-- <span class=\"file-name-text\" [title]=\"file.fileName\">{{\n              file.fileName\n            }}</span> -->\n            <span class=\"file-name-text\" [title]=\"file.fileName\">{{\n              file.fileName\n            }}</span>\n          </span>\n          } @else {\n          <img\n            [src]=\"\n              file.base64Content\n                ? 'data:' + file.mimeType + ';base64,' + file.base64Content\n                : file.imageUrl\n            \"\n            [alt]=\"file.fileName\"\n            class=\"file-image\"\n          />\n          }\n          <button\n            type=\"button\"\n            (click)=\"removeSelectedFile(i)\"\n            class=\"remove-button\"\n          >\n            <svg\n              xmlns=\"http://www.w3.org/2000/svg\"\n              class=\"remove-icon\"\n              fill=\"none\"\n              viewBox=\"0 0 24 24\"\n              stroke=\"currentColor\"\n            >\n              <path\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n                stroke-width=\"2\"\n                d=\"M6 18L18 6M6 6l12 12\"\n              />\n            </svg>\n          </button>\n        </div>\n      </li>\n      }\n    </ul>\n  </div>\n  }\n</div>\n", styles: [".required-asterisk{color:#f43f5e;font-size:15px;font-weight:500}.upload-container{display:flex;border:1px solid #82828233;border-radius:.5em;padding:.75em}.file-input-hidden{display:none}.upload-label{cursor:pointer;width:100%}.upload-label.disabled{cursor:not-allowed!important}.upload-grid{display:grid;grid-template-columns:1fr 6fr 2fr;gap:1em;align-items:center}.icon-container{display:flex;align-items:center;margin:.5em;width:3.25em}.upload-icon{height:3.25em;width:3.25em;color:#9ca3af}.upload-text{text-align:left}.upload-title{color:#111827;margin-bottom:.5em;font-size:1em}.upload-subtitle{font-size:.8em;color:#6b7280}.select-button{display:inline-flex;align-items:center;justify-content:center;padding:.5em 1.5em;border:1px solid #9d67aa;color:#9d67aa;background-color:#fff;border-radius:.5em;cursor:pointer;font-weight:500;width:10vw;text-align:center;transition:all .2s ease-in-out}.select-button.disabled{cursor:not-allowed!important}.disabled{opacity:60%}.select-button:hover{border-color:#8d579a;color:#8d579a}.file-list-container{margin-top:1em;width:100%}.file-grid{display:grid;grid-template-columns:repeat(var(--grid-cols, 5),minmax(0,1fr));gap:.5em;margin-top:1em}.file-item{display:flex;align-items:center;justify-content:space-between;background-color:#fff;border-radius:.25em;border:1px solid #e5e7eb;margin-bottom:.5em;aspect-ratio:1;height:7.2em;width:7.2em}.file-content{position:relative;width:100%;height:100%;flex:1}.file-name{display:block;width:100%;height:100%;overflow:hidden;text-overflow:ellipsis;color:#374151;padding:.5em;white-space:normal;word-break:break-words;font-size:.875em}.file-name.sm{font-size:.7em;display:inline-flex;flex-direction:column;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;align-items:center;justify-content:center;gap:.25em}.file-image{width:100%;height:100%;object-fit:cover;border-radius:.25em}.file-icon-svg{width:70%;height:70%;object-fit:cover;border-radius:.25em}.remove-button{position:absolute;top:.25em;right:.25em;color:#fff;background-color:#ef4444;border-radius:50%;padding:.25em;border:none;cursor:pointer;box-shadow:0 1px 3px #0000001a,0 1px 2px #0000000f;transition:background-color .2s ease-in-out}.remove-button:hover{background-color:#dc2626}.remove-button:focus{outline:none}.remove-icon{height:1.25em;width:1.25em}@media (max-width: 768px){.upload-grid{grid-template-columns:1fr;gap:.5em;text-align:center}.select-button{width:100%}.file-grid{grid-template-columns:repeat(3,1fr)}}@media (max-width: 480px){.file-grid{grid-template-columns:repeat(2,1fr)}}.custom-label{display:block;font-size:1em;font-weight:500;color:#707070;margin-bottom:.3em}.file-name-text{display:inline-block;max-width:90%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;position:relative}\n"] }]
        }], ctorParameters: () => [{ type: i1$2.DomSanitizer }], propDecorators: { parentForm: [{
                type: Input,
                args: [{ required: true }]
            }], FileTypes: [{
                type: Input,
                args: [{ required: true }]
            }], maxFileSize: [{
                type: Input,
                args: [{ required: true }]
            }], controlName: [{
                type: Input,
                args: [{ required: true }]
            }], label: [{
                type: Input,
                args: [{ required: true }]
            }], labelClass: [{
                type: Input
            }], buttonSelectLabel: [{
                type: Input
            }], FileTypesMessage: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], gridCols: [{
                type: Input
            }], validation: [{
                type: Input,
                args: [{ required: true }]
            }], disabled: [{
                type: Input
            }], maxFileCount: [{
                type: Input
            }], fileInput: [{
                type: ViewChild,
                args: ['fileInput']
            }] } });

const pdfSvg = '<svg width="inherit" height="inherit" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="0.5" width="40" height="40" rx="14" fill="#FFD0D2"/><mask id="mask0_14030_15920" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="6" width="26" height="29"><path d="M30.4779 34.5H9.52206C8.40531 34.5 7.5 33.6046 7.5 32.5V8.5C7.5 7.39543 8.40531 6.5 9.52206 6.5H23.125L32.5 15.7727V32.5C32.5 33.6046 31.5947 34.5 30.4779 34.5Z" fill="url(#paint0_linear_14030_15920)"/></mask><g mask="url(#mask0_14030_15920)"><path d="M30.4779 34.5H9.52206C8.40531 34.5 7.5 33.6046 7.5 32.5V8.5C7.5 7.39543 8.40531 6.5 9.52206 6.5H23.125L32.5 15.7727V32.5C32.5 33.6046 31.5947 34.5 30.4779 34.5Z" fill="url(#paint1_linear_14030_15920)"/><g opacity="0.23" filter="url(#filter0_f_14030_15920)"><rect x="8.87891" y="20.0454" width="22.4265" height="7.63637" fill="#F08487" style="mix-blend-mode:darken"/></g><path opacity="0.12" d="M25.791 32.0454H14.21V30.9429H25.791V32.0454ZM25.791 29.3179H14.21V28.2153H25.791V29.3179ZM20 14.6802C23.3502 14.6803 26.0664 17.3964 26.0664 20.7466C26.0663 24.0967 23.3501 26.8129 20 26.813C16.6498 26.813 13.9337 24.0967 13.9336 20.7466C13.9336 17.3963 16.6497 14.6802 20 14.6802ZM19.3525 15.9507C16.9857 16.2671 15.1602 18.2932 15.1602 20.7466C15.1603 23.4194 17.3272 25.5864 20 25.5864C22.4811 25.5863 24.5251 23.7188 24.8057 21.313H19.3525V15.9507ZM20.5664 20.0991H24.7949C24.5032 17.9173 22.7593 16.1967 20.5664 15.9409V20.0991Z" fill="white"/><mask id="path-6-outside-1_14030_15920" maskUnits="userSpaceOnUse" x="12.3711" y="20.6819" width="16" height="7" fill="black"><rect fill="white" x="12.3711" y="20.6819" width="16" height="7"/><path d="M13.5194 26.7182C13.4274 26.7182 13.35 26.6867 13.2871 26.6238C13.2241 26.5609 13.1927 26.4834 13.1927 26.3914V21.9477C13.1927 21.8557 13.2241 21.7783 13.2871 21.7153C13.35 21.6476 13.4274 21.6137 13.5194 21.6137H15.1749C15.5428 21.6137 15.8502 21.6621 16.0971 21.7589C16.3488 21.8509 16.5473 21.9767 16.6925 22.1365C16.8425 22.2914 16.949 22.4632 17.012 22.652C17.0797 22.8408 17.1136 23.032 17.1136 23.2256C17.1136 23.4193 17.0797 23.6105 17.012 23.7993C16.949 23.988 16.8425 24.1623 16.6925 24.3221C16.5473 24.477 16.3488 24.6028 16.0971 24.6996C15.8502 24.7916 15.5428 24.8376 15.1749 24.8376H13.8534V26.3914C13.8534 26.4834 13.8195 26.5609 13.7518 26.6238C13.6888 26.6867 13.6114 26.7182 13.5194 26.7182ZM13.8534 24.2131H15.1096C15.4726 24.2131 15.751 24.1647 15.9446 24.0679C16.1382 23.9663 16.2713 23.8404 16.3439 23.6903C16.4166 23.5354 16.4529 23.3805 16.4529 23.2256C16.4529 23.0659 16.4166 22.911 16.3439 22.7609C16.2713 22.6109 16.1382 22.4874 15.9446 22.3906C15.751 22.289 15.4726 22.2381 15.1096 22.2381H13.8534V24.2131ZM18.9062 26.6819C18.8142 26.6819 18.7368 26.6504 18.6738 26.5875C18.6109 26.5246 18.5794 26.4471 18.5794 26.3551V21.9477C18.5794 21.8557 18.6109 21.7783 18.6738 21.7153C18.7368 21.6476 18.8142 21.6137 18.9062 21.6137H20.3656C20.8013 21.6137 21.1789 21.6887 21.4984 21.8388C21.8179 21.984 22.0841 22.18 22.2971 22.4269C22.5101 22.669 22.6674 22.94 22.769 23.2402C22.8755 23.5403 22.9288 23.8428 22.9288 24.1478C22.9288 24.4527 22.8755 24.7553 22.769 25.0554C22.6674 25.3555 22.5101 25.629 22.2971 25.8759C22.0841 26.1179 21.8179 26.314 21.4984 26.4641C21.1789 26.6093 20.8013 26.6819 20.3656 26.6819H18.9062ZM19.2402 26.0647H20.2858C20.6924 26.0647 21.0433 25.9848 21.3386 25.8251C21.6387 25.6605 21.8687 25.4354 22.0284 25.1498C22.193 24.8594 22.2753 24.5254 22.2753 24.1478C22.2753 23.7702 22.193 23.4386 22.0284 23.153C21.8687 22.8626 21.6387 22.6375 21.3386 22.4777C21.0433 22.3132 20.6924 22.2309 20.2858 22.2309H19.2402V26.0647ZM24.8673 26.7182C24.7753 26.7182 24.6979 26.6867 24.635 26.6238C24.572 26.5609 24.5406 26.4834 24.5406 26.3914V21.9477C24.5406 21.8557 24.572 21.7783 24.635 21.7153C24.6979 21.6476 24.7753 21.6137 24.8673 21.6137H27.6919C27.779 21.6137 27.8516 21.6452 27.9097 21.7081C27.9726 21.7662 28.0041 21.8388 28.0041 21.9259C28.0041 22.013 27.9726 22.0857 27.9097 22.1437C27.8516 22.2018 27.779 22.2309 27.6919 22.2309H25.2013V23.8356H27.4377C27.5249 23.8356 27.5975 23.867 27.6556 23.93C27.7185 23.988 27.7499 24.0607 27.7499 24.1478C27.7499 24.2349 27.7185 24.3075 27.6556 24.3656C27.5975 24.4237 27.5249 24.4527 27.4377 24.4527H25.2013V26.3914C25.2013 26.4834 25.1674 26.5609 25.0997 26.6238C25.0367 26.6867 24.9593 26.7182 24.8673 26.7182Z"/></mask><path d="M13.5194 26.7182C13.4274 26.7182 13.35 26.6867 13.2871 26.6238C13.2241 26.5609 13.1927 26.4834 13.1927 26.3914V21.9477C13.1927 21.8557 13.2241 21.7783 13.2871 21.7153C13.35 21.6476 13.4274 21.6137 13.5194 21.6137H15.1749C15.5428 21.6137 15.8502 21.6621 16.0971 21.7589C16.3488 21.8509 16.5473 21.9767 16.6925 22.1365C16.8425 22.2914 16.949 22.4632 17.012 22.652C17.0797 22.8408 17.1136 23.032 17.1136 23.2256C17.1136 23.4193 17.0797 23.6105 17.012 23.7993C16.949 23.988 16.8425 24.1623 16.6925 24.3221C16.5473 24.477 16.3488 24.6028 16.0971 24.6996C15.8502 24.7916 15.5428 24.8376 15.1749 24.8376H13.8534V26.3914C13.8534 26.4834 13.8195 26.5609 13.7518 26.6238C13.6888 26.6867 13.6114 26.7182 13.5194 26.7182ZM13.8534 24.2131H15.1096C15.4726 24.2131 15.751 24.1647 15.9446 24.0679C16.1382 23.9663 16.2713 23.8404 16.3439 23.6903C16.4166 23.5354 16.4529 23.3805 16.4529 23.2256C16.4529 23.0659 16.4166 22.911 16.3439 22.7609C16.2713 22.6109 16.1382 22.4874 15.9446 22.3906C15.751 22.289 15.4726 22.2381 15.1096 22.2381H13.8534V24.2131ZM18.9062 26.6819C18.8142 26.6819 18.7368 26.6504 18.6738 26.5875C18.6109 26.5246 18.5794 26.4471 18.5794 26.3551V21.9477C18.5794 21.8557 18.6109 21.7783 18.6738 21.7153C18.7368 21.6476 18.8142 21.6137 18.9062 21.6137H20.3656C20.8013 21.6137 21.1789 21.6887 21.4984 21.8388C21.8179 21.984 22.0841 22.18 22.2971 22.4269C22.5101 22.669 22.6674 22.94 22.769 23.2402C22.8755 23.5403 22.9288 23.8428 22.9288 24.1478C22.9288 24.4527 22.8755 24.7553 22.769 25.0554C22.6674 25.3555 22.5101 25.629 22.2971 25.8759C22.0841 26.1179 21.8179 26.314 21.4984 26.4641C21.1789 26.6093 20.8013 26.6819 20.3656 26.6819H18.9062ZM19.2402 26.0647H20.2858C20.6924 26.0647 21.0433 25.9848 21.3386 25.8251C21.6387 25.6605 21.8687 25.4354 22.0284 25.1498C22.193 24.8594 22.2753 24.5254 22.2753 24.1478C22.2753 23.7702 22.193 23.4386 22.0284 23.153C21.8687 22.8626 21.6387 22.6375 21.3386 22.4777C21.0433 22.3132 20.6924 22.2309 20.2858 22.2309H19.2402V26.0647ZM24.8673 26.7182C24.7753 26.7182 24.6979 26.6867 24.635 26.6238C24.572 26.5609 24.5406 26.4834 24.5406 26.3914V21.9477C24.5406 21.8557 24.572 21.7783 24.635 21.7153C24.6979 21.6476 24.7753 21.6137 24.8673 21.6137H27.6919C27.779 21.6137 27.8516 21.6452 27.9097 21.7081C27.9726 21.7662 28.0041 21.8388 28.0041 21.9259C28.0041 22.013 27.9726 22.0857 27.9097 22.1437C27.8516 22.2018 27.779 22.2309 27.6919 22.2309H25.2013V23.8356H27.4377C27.5249 23.8356 27.5975 23.867 27.6556 23.93C27.7185 23.988 27.7499 24.0607 27.7499 24.1478C27.7499 24.2349 27.7185 24.3075 27.6556 24.3656C27.5975 24.4237 27.5249 24.4527 27.4377 24.4527H25.2013V26.3914C25.2013 26.4834 25.1674 26.5609 25.0997 26.6238C25.0367 26.6867 24.9593 26.7182 24.8673 26.7182Z" fill="white"/><path d="M13.2871 26.6238L13.417 26.4938L13.2871 26.6238ZM13.2871 21.7153L13.4171 21.8454L13.4218 21.8404L13.2871 21.7153ZM16.0971 21.7589L16.0299 21.9301L16.034 21.9316L16.0971 21.7589ZM16.6925 22.1365L16.5564 22.2602L16.5604 22.2644L16.6925 22.1365ZM17.012 22.652L16.8375 22.7102L16.8389 22.7141L17.012 22.652ZM17.012 23.7993L16.8389 23.7371L16.8376 23.7411L17.012 23.7993ZM16.6925 24.3221L16.5585 24.1962L16.5584 24.1963L16.6925 24.3221ZM16.0971 24.6996L16.1612 24.8719L16.1631 24.8712L16.0971 24.6996ZM13.8534 24.8376V24.6538H13.6696V24.8376H13.8534ZM13.7518 26.6238L13.6266 26.489L13.6218 26.4938L13.7518 26.6238ZM13.8534 24.2131H13.6696V24.397H13.8534V24.2131ZM15.9446 24.0679L16.0268 24.2324L16.03 24.2307L15.9446 24.0679ZM16.3439 23.6903L16.5094 23.7704L16.5104 23.7684L16.3439 23.6903ZM16.3439 22.7609L16.5094 22.6809L16.3439 22.7609ZM15.9446 22.3906L15.8591 22.5534L15.8624 22.555L15.9446 22.3906ZM13.8534 22.2381V22.0543H13.6696V22.2381H13.8534ZM13.5194 26.7182V26.5344C13.4744 26.5344 13.4442 26.521 13.417 26.4938L13.2871 26.6238L13.1571 26.7538C13.2557 26.8524 13.3805 26.902 13.5194 26.902V26.7182ZM13.2871 26.6238L13.417 26.4938C13.3898 26.4666 13.3765 26.4365 13.3765 26.3914H13.1927H13.0088C13.0088 26.5303 13.0584 26.6551 13.1571 26.7538L13.2871 26.6238ZM13.1927 26.3914H13.3765V21.9477H13.1927H13.0088V26.3914H13.1927ZM13.1927 21.9477H13.3765C13.3765 21.9027 13.3898 21.8725 13.417 21.8453L13.2871 21.7153L13.1571 21.5854C13.0584 21.684 13.0088 21.8088 13.0088 21.9477H13.1927ZM13.2871 21.7153L13.4218 21.8404C13.4501 21.8099 13.4789 21.7975 13.5194 21.7975V21.6137V21.4299C13.376 21.4299 13.2498 21.4853 13.1523 21.5903L13.2871 21.7153ZM13.5194 21.6137V21.7975H15.1749V21.6137V21.4299H13.5194V21.6137ZM15.1749 21.6137V21.7975C15.5281 21.7975 15.811 21.8442 16.03 21.93L16.0971 21.7589L16.1642 21.5878C15.8894 21.48 15.5575 21.4299 15.1749 21.4299V21.6137ZM16.0971 21.7589L16.034 21.9316C16.2644 22.0158 16.4355 22.1271 16.5565 22.2601L16.6925 22.1365L16.8285 22.0128C16.659 21.8264 16.4332 21.686 16.1602 21.5862L16.0971 21.7589ZM16.6925 22.1365L16.5604 22.2644C16.693 22.4012 16.7841 22.5496 16.8376 22.7101L17.012 22.652L17.1864 22.5939C17.114 22.3768 16.9921 22.1816 16.8245 22.0086L16.6925 22.1365ZM17.012 22.652L16.8389 22.7141C16.8998 22.8837 16.9298 23.0539 16.9298 23.2256H17.1136H17.2974C17.2974 23.0101 17.2596 22.7979 17.185 22.5899L17.012 22.652ZM17.1136 23.2256H16.9298C16.9298 23.3973 16.8998 23.5676 16.8389 23.7371L17.012 23.7993L17.185 23.8614C17.2596 23.6534 17.2974 23.4412 17.2974 23.2256H17.1136ZM17.012 23.7993L16.8376 23.7411C16.7839 23.9022 16.6922 24.0539 16.5585 24.1962L16.6925 24.3221L16.8265 24.4479C16.9929 24.2708 17.1142 24.0739 17.1864 23.8574L17.012 23.7993ZM16.6925 24.3221L16.5584 24.1963C16.4365 24.3263 16.2637 24.4386 16.0311 24.5281L16.0971 24.6996L16.1631 24.8712C16.4339 24.767 16.658 24.6276 16.8266 24.4478L16.6925 24.3221ZM16.0971 24.6996L16.0329 24.5274C15.8129 24.6093 15.5289 24.6538 15.1749 24.6538V24.8376V25.0214C15.5567 25.0214 15.8875 24.9739 16.1612 24.8719L16.0971 24.6996ZM15.1749 24.8376V24.6538H13.8534V24.8376V25.0214H15.1749V24.8376ZM13.8534 24.8376H13.6696V26.3914H13.8534H14.0372V24.8376H13.8534ZM13.8534 26.3914H13.6696C13.6696 26.432 13.6572 26.4607 13.6267 26.4891L13.7518 26.6238L13.8768 26.7585C13.9818 26.661 14.0372 26.5349 14.0372 26.3914H13.8534ZM13.7518 26.6238L13.6218 26.4938C13.5946 26.521 13.5644 26.5344 13.5194 26.5344V26.7182V26.902C13.6583 26.902 13.7831 26.8524 13.8817 26.7538L13.7518 26.6238ZM13.8534 24.2131V24.397H15.1096V24.2131V24.0293H13.8534V24.2131ZM15.1096 24.2131V24.397C15.4843 24.397 15.7959 24.3478 16.0268 24.2323L15.9446 24.0679L15.8624 23.9035C15.706 23.9817 15.461 24.0293 15.1096 24.0293V24.2131ZM15.9446 24.0679L16.03 24.2307C16.2477 24.1164 16.415 23.9655 16.5094 23.7704L16.3439 23.6903L16.1785 23.6103C16.1277 23.7153 16.0288 23.8161 15.8591 23.9052L15.9446 24.0679ZM16.3439 23.6903L16.5104 23.7684C16.5932 23.5916 16.6367 23.4102 16.6367 23.2256H16.4529H16.269C16.269 23.3509 16.2399 23.4793 16.1775 23.6123L16.3439 23.6903ZM16.4529 23.2256H16.6367C16.6367 23.0369 16.5936 22.8548 16.5094 22.6809L16.3439 22.7609L16.1785 22.841C16.2395 22.9672 16.269 23.0948 16.269 23.2256H16.4529ZM16.3439 22.7609L16.5094 22.6809C16.4145 22.4846 16.2458 22.3357 16.0268 22.2262L15.9446 22.3906L15.8624 22.555C16.0306 22.6391 16.1282 22.7371 16.1785 22.841L16.3439 22.7609ZM15.9446 22.3906L16.03 22.2279C15.7981 22.1061 15.4851 22.0543 15.1096 22.0543V22.2381V22.422C15.4602 22.422 15.7038 22.4718 15.8591 22.5534L15.9446 22.3906ZM15.1096 22.2381V22.0543H13.8534V22.2381V22.422H15.1096V22.2381ZM13.8534 22.2381H13.6696V24.2131H13.8534H14.0372V22.2381H13.8534ZM18.6738 26.5875L18.8038 26.4575L18.6738 26.5875ZM18.6738 21.7153L18.8039 21.8454L18.8085 21.8404L18.6738 21.7153ZM21.4984 21.8388L21.4202 22.0052L21.4223 22.0061L21.4984 21.8388ZM22.2971 22.4269L22.1579 22.547L22.1591 22.5484L22.2971 22.4269ZM22.769 23.2402L22.5949 23.2991L22.5958 23.3016L22.769 23.2402ZM22.769 25.0554L22.5958 24.9939L22.5949 24.9964L22.769 25.0554ZM22.2971 25.8759L22.4351 25.9974L22.4363 25.996L22.2971 25.8759ZM21.4984 26.4641L21.5744 26.6314L21.5765 26.6304L21.4984 26.4641ZM19.2402 26.0647H19.0564V26.2485H19.2402V26.0647ZM21.3386 25.8251L21.4261 25.9868L21.427 25.9863L21.3386 25.8251ZM22.0284 25.1498L21.8685 25.0592L21.868 25.0601L22.0284 25.1498ZM22.0284 23.153L21.8673 23.2416L21.8692 23.2448L22.0284 23.153ZM21.3386 22.4777L21.2491 22.6383L21.2523 22.64L21.3386 22.4777ZM19.2402 22.2309V22.0471H19.0564V22.2309H19.2402ZM18.9062 26.6819V26.4981C18.8611 26.4981 18.831 26.4847 18.8038 26.4575L18.6738 26.5875L18.5438 26.7175C18.6425 26.8161 18.7673 26.8657 18.9062 26.8657V26.6819ZM18.6738 26.5875L18.8038 26.4575C18.7766 26.4303 18.7633 26.4002 18.7633 26.3551H18.5794H18.3956C18.3956 26.494 18.4452 26.6188 18.5438 26.7175L18.6738 26.5875ZM18.5794 26.3551H18.7633V21.9477H18.5794H18.3956V26.3551H18.5794ZM18.5794 21.9477H18.7633C18.7633 21.9027 18.7766 21.8725 18.8038 21.8453L18.6738 21.7153L18.5438 21.5854C18.4452 21.684 18.3956 21.8088 18.3956 21.9477H18.5794ZM18.6738 21.7153L18.8085 21.8404C18.8369 21.8099 18.8656 21.7975 18.9062 21.7975V21.6137V21.4299C18.7628 21.4299 18.6366 21.4853 18.5391 21.5903L18.6738 21.7153ZM18.9062 21.6137V21.7975H20.3656V21.6137V21.4299H18.9062V21.6137ZM20.3656 21.6137V21.7975C20.7805 21.7975 21.1302 21.869 21.4202 22.0052L21.4984 21.8388L21.5765 21.6724C21.2275 21.5085 20.8221 21.4299 20.3656 21.4299V21.6137ZM21.4984 21.8388L21.4223 22.0061C21.7195 22.1412 21.9636 22.3218 22.1579 22.547L22.2971 22.4269L22.4363 22.3068C22.2046 22.0383 21.9163 21.8268 21.5744 21.6714L21.4984 21.8388ZM22.2971 22.4269L22.1591 22.5484C22.3563 22.7725 22.5012 23.0224 22.5949 23.2991L22.769 23.2402L22.9432 23.1812C22.8336 22.8577 22.6638 22.5654 22.4351 22.3055L22.2971 22.4269ZM22.769 23.2402L22.5958 23.3016C22.6956 23.5829 22.745 23.8647 22.745 24.1478H22.9288H23.1126C23.1126 23.821 23.0555 23.4977 22.9423 23.1787L22.769 23.2402ZM22.9288 24.1478H22.745C22.745 24.4309 22.6956 24.7127 22.5958 24.9939L22.769 25.0554L22.9423 25.1169C23.0555 24.7979 23.1126 24.4746 23.1126 24.1478H22.9288ZM22.769 25.0554L22.5949 24.9964C22.5011 25.2735 22.3559 25.5264 22.1579 25.7558L22.2971 25.8759L22.4363 25.996C22.6643 25.7317 22.8337 25.4376 22.9432 25.1144L22.769 25.0554ZM22.2971 25.8759L22.1591 25.7545C21.9643 25.9759 21.7191 26.1573 21.4202 26.2977L21.4984 26.4641L21.5765 26.6304C21.9166 26.4707 22.2039 26.26 22.4351 25.9973L22.2971 25.8759ZM21.4984 26.4641L21.4223 26.2967C21.1317 26.4288 20.7812 26.4981 20.3656 26.4981V26.6819V26.8657C20.8214 26.8657 21.226 26.7898 21.5744 26.6314L21.4984 26.4641ZM20.3656 26.6819V26.4981H18.9062V26.6819V26.8657H20.3656V26.6819ZM19.2402 26.0647V26.2485H20.2858V26.0647V25.8809H19.2402V26.0647ZM20.2858 26.0647V26.2485C20.7165 26.2485 21.0988 26.1638 21.4261 25.9868L21.3386 25.8251L21.2512 25.6634C20.9879 25.8058 20.6683 25.8809 20.2858 25.8809V26.0647ZM21.3386 25.8251L21.427 25.9863C21.7559 25.8059 22.0115 25.5567 22.1889 25.2395L22.0284 25.1498L21.868 25.0601C21.7259 25.3142 21.5216 25.5151 21.2502 25.6639L21.3386 25.8251ZM22.0284 25.1498L22.1884 25.2404C22.3706 24.9189 22.4591 24.5529 22.4591 24.1478H22.2753H22.0915C22.0915 24.4978 22.0155 24.7998 21.8685 25.0592L22.0284 25.1498ZM22.2753 24.1478H22.4591C22.4591 23.7428 22.3706 23.3786 22.1877 23.0612L22.0284 23.153L21.8692 23.2448C22.0154 23.4986 22.0915 23.7977 22.0915 24.1478H22.2753ZM22.0284 23.153L22.1895 23.0644C22.0121 22.7419 21.7558 22.4915 21.425 22.3155L21.3386 22.4777L21.2523 22.64C21.5217 22.7834 21.7253 22.9833 21.8674 23.2416L22.0284 23.153ZM21.3386 22.4777L21.4281 22.3172C21.1004 22.1345 20.7174 22.0471 20.2858 22.0471V22.2309V22.4147C20.6674 22.4147 20.9863 22.4918 21.2491 22.6383L21.3386 22.4777ZM20.2858 22.2309V22.0471H19.2402V22.2309V22.4147H20.2858V22.2309ZM19.2402 22.2309H19.0564V26.0647H19.2402H19.424V22.2309H19.2402ZM24.635 26.6238L24.7649 26.4938L24.635 26.6238ZM24.635 21.7153L24.765 21.8454L24.7697 21.8404L24.635 21.7153ZM27.9097 21.7081L27.7746 21.8328L27.7796 21.8382L27.785 21.8432L27.9097 21.7081ZM27.9097 22.1437L27.7849 22.0086L27.7797 22.0138L27.9097 22.1437ZM25.2013 22.2309V22.0471H25.0175V22.2309H25.2013ZM25.2013 23.8356H25.0175V24.0194H25.2013V23.8356ZM27.6556 23.93L27.5205 24.0546L27.5255 24.06L27.5309 24.065L27.6556 23.93ZM27.6556 24.3656L27.5308 24.2304L27.5256 24.2356L27.6556 24.3656ZM25.2013 24.4527V24.2689H25.0175V24.4527H25.2013ZM25.0997 26.6238L24.9745 26.489L24.9697 26.4938L25.0997 26.6238ZM24.8673 26.7182V26.5344C24.8223 26.5344 24.7921 26.521 24.7649 26.4938L24.635 26.6238L24.505 26.7538C24.6037 26.8524 24.7284 26.902 24.8673 26.902V26.7182ZM24.635 26.6238L24.7649 26.4938C24.7378 26.4666 24.7244 26.4365 24.7244 26.3914H24.5406H24.3567C24.3567 26.5303 24.4063 26.6551 24.505 26.7538L24.635 26.6238ZM24.5406 26.3914H24.7244V21.9477H24.5406H24.3567V26.3914H24.5406ZM24.5406 21.9477H24.7244C24.7244 21.9027 24.7378 21.8725 24.7649 21.8453L24.635 21.7153L24.505 21.5854C24.4063 21.684 24.3567 21.8088 24.3567 21.9477H24.5406ZM24.635 21.7153L24.7697 21.8404C24.798 21.8099 24.8268 21.7975 24.8673 21.7975V21.6137V21.4299C24.7239 21.4299 24.5977 21.4853 24.5003 21.5903L24.635 21.7153ZM24.8673 21.6137V21.7975H27.6919V21.6137V21.4299H24.8673V21.6137ZM27.6919 21.6137V21.7975C27.7287 21.7975 27.752 21.8083 27.7746 21.8328L27.9097 21.7081L28.0448 21.5834C27.9512 21.482 27.8293 21.4299 27.6919 21.4299V21.6137ZM27.9097 21.7081L27.785 21.8432C27.8095 21.8658 27.8203 21.8891 27.8203 21.9259H28.0041H28.1879C28.1879 21.7885 28.1357 21.6666 28.0344 21.573L27.9097 21.7081ZM28.0041 21.9259H27.8203C27.8203 21.9628 27.8095 21.9861 27.785 22.0087L27.9097 22.1437L28.0344 22.2788C28.1357 22.1852 28.1879 22.0633 28.1879 21.9259H28.0041ZM27.9097 22.1437L27.7797 22.0138C27.7583 22.0351 27.7335 22.0471 27.6919 22.0471V22.2309V22.4147C27.8245 22.4147 27.9449 22.3685 28.0397 22.2737L27.9097 22.1437ZM27.6919 22.2309V22.0471H25.2013V22.2309V22.4147H27.6919V22.2309ZM25.2013 22.2309H25.0175V23.8356H25.2013H25.3851V22.2309H25.2013ZM25.2013 23.8356V24.0194H27.4377V23.8356V23.6517H25.2013V23.8356ZM27.4377 23.8356V24.0194C27.4746 24.0194 27.4979 24.0301 27.5205 24.0546L27.6556 23.93L27.7906 23.8053C27.6971 23.7039 27.5751 23.6517 27.4377 23.6517V23.8356ZM27.6556 23.93L27.5309 24.065C27.5554 24.0876 27.5661 24.1109 27.5661 24.1478H27.7499H27.9338C27.9338 24.0104 27.8816 23.8885 27.7802 23.7949L27.6556 23.93ZM27.7499 24.1478H27.5661C27.5661 24.1846 27.5554 24.2079 27.5309 24.2305L27.6556 24.3656L27.7802 24.5007C27.8816 24.4071 27.9338 24.2852 27.9338 24.1478H27.7499ZM27.6556 24.3656L27.5256 24.2356C27.5042 24.257 27.4794 24.2689 27.4377 24.2689V24.4527V24.6366C27.5703 24.6366 27.6907 24.5904 27.7855 24.4956L27.6556 24.3656ZM27.4377 24.4527V24.2689H25.2013V24.4527V24.6366H27.4377V24.4527ZM25.2013 24.4527H25.0175V26.3914H25.2013H25.3851V24.4527H25.2013ZM25.2013 26.3914H25.0175C25.0175 26.432 25.0051 26.4607 24.9746 26.4891L25.0997 26.6238L25.2248 26.7585C25.3297 26.661 25.3851 26.5349 25.3851 26.3914H25.2013ZM25.0997 26.6238L24.9697 26.4938C24.9425 26.521 24.9124 26.5344 24.8673 26.5344V26.7182V26.902C25.0062 26.902 25.131 26.8524 25.2297 26.7538L25.0997 26.6238Z" fill="white" mask="url(#path-6-outside-1_14030_15920)"/><mask id="mask1_14030_15920" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="6" width="26" height="29"><path d="M30.4779 34.5H9.52206C8.40531 34.5 7.5 33.6046 7.5 32.5V8.5C7.5 7.39543 8.40531 6.5 9.52206 6.5H23.125L32.5 15.7727V32.5C32.5 33.6046 31.5947 34.5 30.4779 34.5Z" fill="url(#paint2_linear_14030_15920)"/></mask><g mask="url(#mask1_14030_15920)"><ellipse opacity="0.05" cx="6.16728" cy="5.36353" rx="20.5423" ry="19.5" fill="url(#paint3_linear_14030_15920)"/><ellipse opacity="0.07" cx="6.16751" cy="5.36375" rx="12.9136" ry="12.2273" fill="url(#paint4_linear_14030_15920)"/></g><g filter="url(#filter1_d_14030_15920)"><path d="M32.5 15.7727H25.1471C24.0303 15.7727 23.125 14.8674 23.125 13.7507V6.5L32.5 15.7727Z" fill="url(#paint5_linear_14030_15920)"/></g></g><defs><filter id="filter0_f_14030_15920" x="5.29435" y="16.4609" width="29.5949" height="14.8056" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="1.79228" result="effect1_foregroundBlur_14030_15920"/></filter><filter id="filter1_d_14030_15920" x="21.011" y="4.29412" width="13.9706" height="13.8683" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="0.183823" dy="0.0919117"/><feGaussianBlur stdDeviation="1.1489"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.33 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_14030_15920"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_14030_15920" result="shape"/></filter><linearGradient id="paint0_linear_14030_15920" x1="20" y1="6.5" x2="20" y2="34.5" gradientUnits="userSpaceOnUse"><stop stop-color="#FF7979"/><stop offset="1" stop-color="#E85555"/></linearGradient><linearGradient id="paint1_linear_14030_15920" x1="20" y1="6.5" x2="20" y2="34.5" gradientUnits="userSpaceOnUse"><stop stop-color="#E5252A"/><stop offset="1" stop-color="#FF7F82"/></linearGradient><linearGradient id="paint2_linear_14030_15920" x1="20" y1="6.5" x2="20" y2="34.5" gradientUnits="userSpaceOnUse"><stop stop-color="#FF8777"/><stop offset="1" stop-color="#F0695F"/></linearGradient><linearGradient id="paint3_linear_14030_15920" x1="7.6588" y1="6.03363" x2="13.7698" y2="22.4312" gradientUnits="userSpaceOnUse"><stop stop-color="white" stop-opacity="0"/><stop offset="1" stop-color="white"/></linearGradient><linearGradient id="paint4_linear_14030_15920" x1="7.10513" y1="5.78393" x2="10.9296" y2="16.0722" gradientUnits="userSpaceOnUse"><stop stop-color="white" stop-opacity="0"/><stop offset="1" stop-color="white"/></linearGradient><linearGradient id="paint5_linear_14030_15920" x1="27.8125" y1="6.5" x2="27.8125" y2="15.7727" gradientUnits="userSpaceOnUse"><stop offset="0.0384615" stop-color="#DA5D4C"/><stop offset="1" stop-color="#9C2225"/></linearGradient></defs></svg>';
const gifSvg = '<svg width="inherit" height="inherit" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="0.5" width="40" height="40" rx="14" fill="#D2FFEF"/><mask id="mask0_14030_15895" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="6" width="26" height="29"><path d="M30.4779 34.5H9.52206C8.40531 34.5 7.5 33.6046 7.5 32.5V8.5C7.5 7.39543 8.40531 6.5 9.52206 6.5H23.125L32.5 15.7727V32.5C32.5 33.6046 31.5947 34.5 30.4779 34.5Z" fill="url(#paint0_linear_14030_15895)"/></mask><g mask="url(#mask0_14030_15895)"><path d="M30.4779 34.5H9.52206C8.40531 34.5 7.5 33.6046 7.5 32.5V8.5C7.5 7.39543 8.40531 6.5 9.52206 6.5H23.125L32.5 15.7727V32.5C32.5 33.6046 31.5947 34.5 30.4779 34.5Z" fill="url(#paint1_linear_14030_15895)"/><g opacity="0.23" filter="url(#filter0_f_14030_15895)"><rect x="8.87891" y="20.0454" width="22.4265" height="7.63637" fill="#81DABB" style="mix-blend-mode:darken"/></g><g opacity="0.2" clip-path="url(#clip0_14030_15895)"><path d="M25.8725 14.4402H13.8725C12.9257 14.4402 12.1582 15.2077 12.1582 16.1545V28.1545C12.1582 29.1012 12.9257 29.8688 13.8725 29.8688H25.8725C26.8193 29.8688 27.5868 29.1012 27.5868 28.1545V16.1545C27.5868 15.2077 26.8193 14.4402 25.8725 14.4402Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.3002 21.2972C18.247 21.2972 19.0145 20.5297 19.0145 19.5829C19.0145 18.6362 18.247 17.8687 17.3002 17.8687C16.3534 17.8687 15.5859 18.6362 15.5859 19.5829C15.5859 20.5297 16.3534 21.2972 17.3002 21.2972Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/><path d="M27.5857 24.7259L24.9405 22.0808C24.619 21.7594 24.1831 21.5789 23.7285 21.5789C23.2739 21.5789 22.838 21.7594 22.5165 22.0808L14.7285 29.8688" stroke="white" stroke-linecap="round" stroke-linejoin="round"/></g><mask id="path-8-outside-1_14030_15895" maskUnits="userSpaceOnUse" x="13" y="20.6819" width="14" height="7" fill="black"><rect fill="white" x="13" y="20.6819" width="14" height="7"/><path d="M16.4479 26.7545C15.9397 26.7545 15.4943 26.6432 15.1119 26.4205C14.7295 26.1978 14.4318 25.8929 14.2188 25.5056C14.0058 25.1135 13.8993 24.6633 13.8993 24.155C13.8993 23.763 13.9647 23.4072 14.0954 23.0877C14.2261 22.7633 14.4052 22.4874 14.6327 22.2599C14.865 22.0276 15.1337 21.8509 15.4387 21.7299C15.7436 21.604 16.0728 21.5411 16.4262 21.5411C16.8376 21.5411 17.1837 21.5919 17.4645 21.6936C17.7501 21.7952 18.0066 21.9186 18.2342 22.0639C18.268 22.0832 18.2995 22.1147 18.3285 22.1583C18.3624 22.2018 18.3794 22.2575 18.3794 22.3253C18.3794 22.4027 18.3527 22.4729 18.2995 22.5358C18.2463 22.5939 18.1712 22.623 18.0744 22.623C18.0212 22.623 17.9703 22.6109 17.9219 22.5867C17.7089 22.4608 17.4887 22.3616 17.2612 22.289C17.0337 22.2164 16.7795 22.18 16.4988 22.18C16.1357 22.18 15.8065 22.2575 15.5113 22.4124C15.2208 22.5625 14.9885 22.7851 14.8142 23.0804C14.6448 23.3709 14.5601 23.7291 14.5601 24.155C14.5601 24.5278 14.6375 24.8642 14.7924 25.1643C14.9473 25.4596 15.1724 25.6944 15.4677 25.8686C15.763 26.0429 16.1188 26.13 16.5351 26.13C16.7916 26.13 17.0264 26.101 17.2394 26.0429C17.4524 25.98 17.6412 25.9025 17.8058 25.8106V24.4963H16.6077C16.5254 24.4963 16.4552 24.4673 16.3971 24.4092C16.339 24.3511 16.31 24.2809 16.31 24.1986C16.31 24.1163 16.339 24.0461 16.3971 23.988C16.4552 23.93 16.5254 23.9009 16.6077 23.9009H18.0381C18.1349 23.9009 18.2172 23.9348 18.285 24.0026C18.3527 24.0703 18.3866 24.1526 18.3866 24.2494V25.8977C18.3866 25.9993 18.36 26.0913 18.3068 26.1736C18.2584 26.2511 18.193 26.3092 18.1107 26.3479C17.8735 26.4689 17.6145 26.5681 17.3338 26.6456C17.0579 26.7182 16.7626 26.7545 16.4479 26.7545ZM20.5347 26.7182C20.4427 26.7182 20.3653 26.6867 20.3024 26.6238C20.2394 26.5609 20.208 26.4834 20.208 26.3914V21.9114C20.208 21.8194 20.2394 21.742 20.3024 21.679C20.3653 21.6113 20.4427 21.5774 20.5347 21.5774C20.6267 21.5774 20.7041 21.6113 20.7671 21.679C20.8348 21.742 20.8687 21.8194 20.8687 21.9114V26.3914C20.8687 26.4834 20.8348 26.5609 20.7671 26.6238C20.7041 26.6867 20.6267 26.7182 20.5347 26.7182ZM23.1135 26.7182C23.0215 26.7182 22.9441 26.6867 22.8812 26.6238C22.8182 26.5609 22.7868 26.4834 22.7868 26.3914V21.9477C22.7868 21.8557 22.8182 21.7783 22.8812 21.7153C22.9441 21.6476 23.0215 21.6137 23.1135 21.6137H25.938C26.0252 21.6137 26.0978 21.6452 26.1559 21.7081C26.2188 21.7662 26.2503 21.8388 26.2503 21.9259C26.2503 22.013 26.2188 22.0857 26.1559 22.1437C26.0978 22.2018 26.0252 22.2309 25.938 22.2309H23.4475V23.8356H25.6839C25.771 23.8356 25.8437 23.867 25.9017 23.93C25.9647 23.988 25.9961 24.0607 25.9961 24.1478C25.9961 24.2349 25.9647 24.3075 25.9017 24.3656C25.8437 24.4237 25.771 24.4527 25.6839 24.4527H23.4475V26.3914C23.4475 26.4834 23.4136 26.5609 23.3459 26.6238C23.2829 26.6867 23.2055 26.7182 23.1135 26.7182Z"/></mask><path d="M16.4479 26.7545C15.9397 26.7545 15.4943 26.6432 15.1119 26.4205C14.7295 26.1978 14.4318 25.8929 14.2188 25.5056C14.0058 25.1135 13.8993 24.6633 13.8993 24.155C13.8993 23.763 13.9647 23.4072 14.0954 23.0877C14.2261 22.7633 14.4052 22.4874 14.6327 22.2599C14.865 22.0276 15.1337 21.8509 15.4387 21.7299C15.7436 21.604 16.0728 21.5411 16.4262 21.5411C16.8376 21.5411 17.1837 21.5919 17.4645 21.6936C17.7501 21.7952 18.0066 21.9186 18.2342 22.0639C18.268 22.0832 18.2995 22.1147 18.3285 22.1583C18.3624 22.2018 18.3794 22.2575 18.3794 22.3253C18.3794 22.4027 18.3527 22.4729 18.2995 22.5358C18.2463 22.5939 18.1712 22.623 18.0744 22.623C18.0212 22.623 17.9703 22.6109 17.9219 22.5867C17.7089 22.4608 17.4887 22.3616 17.2612 22.289C17.0337 22.2164 16.7795 22.18 16.4988 22.18C16.1357 22.18 15.8065 22.2575 15.5113 22.4124C15.2208 22.5625 14.9885 22.7851 14.8142 23.0804C14.6448 23.3709 14.5601 23.7291 14.5601 24.155C14.5601 24.5278 14.6375 24.8642 14.7924 25.1643C14.9473 25.4596 15.1724 25.6944 15.4677 25.8686C15.763 26.0429 16.1188 26.13 16.5351 26.13C16.7916 26.13 17.0264 26.101 17.2394 26.0429C17.4524 25.98 17.6412 25.9025 17.8058 25.8106V24.4963H16.6077C16.5254 24.4963 16.4552 24.4673 16.3971 24.4092C16.339 24.3511 16.31 24.2809 16.31 24.1986C16.31 24.1163 16.339 24.0461 16.3971 23.988C16.4552 23.93 16.5254 23.9009 16.6077 23.9009H18.0381C18.1349 23.9009 18.2172 23.9348 18.285 24.0026C18.3527 24.0703 18.3866 24.1526 18.3866 24.2494V25.8977C18.3866 25.9993 18.36 26.0913 18.3068 26.1736C18.2584 26.2511 18.193 26.3092 18.1107 26.3479C17.8735 26.4689 17.6145 26.5681 17.3338 26.6456C17.0579 26.7182 16.7626 26.7545 16.4479 26.7545ZM20.5347 26.7182C20.4427 26.7182 20.3653 26.6867 20.3024 26.6238C20.2394 26.5609 20.208 26.4834 20.208 26.3914V21.9114C20.208 21.8194 20.2394 21.742 20.3024 21.679C20.3653 21.6113 20.4427 21.5774 20.5347 21.5774C20.6267 21.5774 20.7041 21.6113 20.7671 21.679C20.8348 21.742 20.8687 21.8194 20.8687 21.9114V26.3914C20.8687 26.4834 20.8348 26.5609 20.7671 26.6238C20.7041 26.6867 20.6267 26.7182 20.5347 26.7182ZM23.1135 26.7182C23.0215 26.7182 22.9441 26.6867 22.8812 26.6238C22.8182 26.5609 22.7868 26.4834 22.7868 26.3914V21.9477C22.7868 21.8557 22.8182 21.7783 22.8812 21.7153C22.9441 21.6476 23.0215 21.6137 23.1135 21.6137H25.938C26.0252 21.6137 26.0978 21.6452 26.1559 21.7081C26.2188 21.7662 26.2503 21.8388 26.2503 21.9259C26.2503 22.013 26.2188 22.0857 26.1559 22.1437C26.0978 22.2018 26.0252 22.2309 25.938 22.2309H23.4475V23.8356H25.6839C25.771 23.8356 25.8437 23.867 25.9017 23.93C25.9647 23.988 25.9961 24.0607 25.9961 24.1478C25.9961 24.2349 25.9647 24.3075 25.9017 24.3656C25.8437 24.4237 25.771 24.4527 25.6839 24.4527H23.4475V26.3914C23.4475 26.4834 23.4136 26.5609 23.3459 26.6238C23.2829 26.6867 23.2055 26.7182 23.1135 26.7182Z" fill="white"/><path d="M15.1119 26.4205L15.2044 26.2616L15.1119 26.4205ZM14.2188 25.5056L14.0573 25.5933L14.0577 25.5942L14.2188 25.5056ZM14.0954 23.0877L14.2655 23.1573L14.2659 23.1564L14.0954 23.0877ZM14.6327 22.2599L14.5027 22.1299L14.6327 22.2599ZM15.4387 21.7299L15.5065 21.9007L15.5088 21.8998L15.4387 21.7299ZM17.4645 21.6936L17.4019 21.8664L17.4028 21.8667L17.4645 21.6936ZM18.2342 22.0639L18.1351 22.219L18.143 22.2235L18.2342 22.0639ZM18.3285 22.1583L18.1752 22.2605L18.1834 22.2711L18.3285 22.1583ZM18.2995 22.5358L18.4351 22.6601L18.4398 22.6546L18.2995 22.5358ZM17.9219 22.5867L17.8282 22.7453L17.8397 22.7511L17.9219 22.5867ZM15.5113 22.4124L15.5956 22.5757L15.5967 22.5752L15.5113 22.4124ZM14.8142 23.0804L14.6559 22.987L14.6554 22.9878L14.8142 23.0804ZM14.7924 25.1643L14.6291 25.2486L14.6296 25.2497L14.7924 25.1643ZM15.4677 25.8686L15.5611 25.7103L15.4677 25.8686ZM17.2394 26.0429L17.2878 26.2203L17.2915 26.2192L17.2394 26.0429ZM17.8058 25.8106L17.8954 25.971L17.9896 25.9184V25.8106H17.8058ZM17.8058 24.4963H17.9896V24.3125H17.8058V24.4963ZM18.3068 26.1736L18.1524 26.0737L18.1509 26.0762L18.3068 26.1736ZM18.1107 26.3479L18.0324 26.1815L18.0272 26.1841L18.1107 26.3479ZM17.3338 26.6456L17.3806 26.8234L17.3827 26.8228L17.3338 26.6456ZM16.4479 26.7545V26.5707C15.9673 26.5707 15.5548 26.4656 15.2044 26.2616L15.1119 26.4205L15.0194 26.5793C15.4339 26.8207 15.9121 26.9383 16.4479 26.9383V26.7545ZM15.1119 26.4205L15.2044 26.2616C14.8508 26.0557 14.5768 25.775 14.3799 25.417L14.2188 25.5056L14.0577 25.5942C14.2868 26.0107 14.6082 26.3399 15.0194 26.5793L15.1119 26.4205ZM14.2188 25.5056L14.3803 25.4179C14.1839 25.0562 14.0831 24.637 14.0831 24.155H13.8993H13.7155C13.7155 24.6897 13.8277 25.1708 14.0573 25.5933L14.2188 25.5056ZM13.8993 24.155H14.0831C14.0831 23.7836 14.145 23.4519 14.2655 23.1573L14.0954 23.0877L13.9252 23.0181C13.7843 23.3625 13.7155 23.7423 13.7155 24.155H13.8993ZM14.0954 23.0877L14.2659 23.1564C14.3881 22.853 14.5541 22.5985 14.7627 22.3899L14.6327 22.2599L14.5027 22.1299C14.2562 22.3764 14.064 22.6737 13.9249 23.019L14.0954 23.0877ZM14.6327 22.2599L14.7627 22.3899C14.9773 22.1752 15.2248 22.0125 15.5065 21.9007L15.4387 21.7299L15.3709 21.559C15.0426 21.6893 14.7527 21.8799 14.5027 22.1299L14.6327 22.2599ZM15.4387 21.7299L15.5088 21.8998C15.79 21.7837 16.0951 21.7249 16.4262 21.7249V21.5411V21.3573C16.0505 21.3573 15.6973 21.4243 15.3685 21.5599L15.4387 21.7299ZM16.4262 21.5411V21.7249C16.8238 21.7249 17.1472 21.7742 17.4019 21.8664L17.4645 21.6936L17.5271 21.5207C17.2202 21.4096 16.8515 21.3573 16.4262 21.3573V21.5411ZM17.4645 21.6936L17.4028 21.8667C17.6769 21.9643 17.9208 22.0819 18.1352 22.2188L18.2342 22.0639L18.3331 21.9089C18.0925 21.7554 17.8232 21.6261 17.5261 21.5204L17.4645 21.6936ZM18.2342 22.0639L18.143 22.2235C18.1451 22.2247 18.1572 22.2327 18.1756 22.2602L18.3285 22.1583L18.4815 22.0563C18.4418 21.9967 18.391 21.9418 18.3254 21.9043L18.2342 22.0639ZM18.3285 22.1583L18.1834 22.2711C18.1869 22.2756 18.1955 22.2888 18.1955 22.3253H18.3794H18.5632C18.5632 22.2262 18.5379 22.128 18.4736 22.0454L18.3285 22.1583ZM18.3794 22.3253H18.1955C18.1955 22.3563 18.1863 22.385 18.1592 22.4171L18.2995 22.5358L18.4398 22.6546C18.5192 22.5608 18.5632 22.4491 18.5632 22.3253H18.3794ZM18.2995 22.5358L18.164 22.4116C18.1533 22.4233 18.1324 22.4391 18.0744 22.4391V22.623V22.8068C18.2101 22.8068 18.3392 22.7646 18.435 22.6601L18.2995 22.5358ZM18.0744 22.623V22.4391C18.0502 22.4391 18.0275 22.4339 18.0041 22.4222L17.9219 22.5867L17.8397 22.7511C17.9132 22.7878 17.9921 22.8068 18.0744 22.8068V22.623ZM17.9219 22.5867L18.0154 22.4284C17.791 22.2958 17.5582 22.1908 17.3171 22.1138L17.2612 22.289L17.2053 22.4641C17.4192 22.5324 17.6269 22.6258 17.8284 22.7449L17.9219 22.5867ZM17.2612 22.289L17.3171 22.1138C17.0686 22.0346 16.7952 21.9962 16.4988 21.9962V22.18V22.3639C16.7638 22.3639 16.9987 22.3981 17.2053 22.4641L17.2612 22.289ZM16.4988 22.18V21.9962C16.1087 21.9962 15.7498 22.0797 15.4259 22.2496L15.5113 22.4124L15.5967 22.5752C15.8633 22.4353 16.1628 22.3639 16.4988 22.3639V22.18ZM15.5113 22.4124L15.4269 22.2491C15.1042 22.4158 14.8468 22.6634 14.6559 22.987L14.8142 23.0804L14.9725 23.1738C15.1301 22.9068 15.3375 22.7091 15.5956 22.5757L15.5113 22.4124ZM14.8142 23.0804L14.6554 22.9878C14.4658 23.3129 14.3762 23.7051 14.3762 24.155H14.5601H14.7439C14.7439 23.7531 14.8238 23.4288 14.973 23.173L14.8142 23.0804ZM14.5601 24.155H14.3762C14.3762 24.554 14.4594 24.9198 14.6291 25.2486L14.7924 25.1643L14.9558 25.08C14.8157 24.8086 14.7439 24.5015 14.7439 24.155H14.5601ZM14.7924 25.1643L14.6296 25.2497C14.8009 25.5762 15.0504 25.8358 15.3743 26.027L15.4677 25.8686L15.5611 25.7103C15.2944 25.5529 15.0938 25.343 14.9552 25.0789L14.7924 25.1643ZM15.4677 25.8686L15.3743 26.027C15.7034 26.2212 16.0929 26.3139 16.5351 26.3139V26.13V25.9462C16.1446 25.9462 15.8226 25.8647 15.5611 25.7103L15.4677 25.8686ZM16.5351 26.13V26.3139C16.8054 26.3139 17.0567 26.2833 17.2878 26.2203L17.2394 26.0429L17.191 25.8656C16.9961 25.9187 16.7779 25.9462 16.5351 25.9462V26.13ZM17.2394 26.0429L17.2915 26.2192C17.5153 26.1531 17.7171 26.0707 17.8954 25.971L17.8058 25.8106L17.7161 25.6501C17.5653 25.7344 17.3895 25.8069 17.1873 25.8666L17.2394 26.0429ZM17.8058 25.8106H17.9896V24.4963H17.8058H17.6219V25.8106H17.8058ZM17.8058 24.4963V24.3125H16.6077V24.4963V24.6801H17.8058V24.4963ZM16.6077 24.4963V24.3125C16.574 24.3125 16.5506 24.3027 16.5271 24.2792L16.3971 24.4092L16.2671 24.5392C16.3598 24.6318 16.4767 24.6801 16.6077 24.6801V24.4963ZM16.3971 24.4092L16.5271 24.2792C16.5035 24.2557 16.4938 24.2322 16.4938 24.1986H16.31H16.1262C16.1262 24.3296 16.1745 24.4465 16.2671 24.5392L16.3971 24.4092ZM16.31 24.1986H16.4938C16.4938 24.165 16.5035 24.1416 16.5271 24.118L16.3971 23.988L16.2671 23.8581C16.1745 23.9507 16.1262 24.0677 16.1262 24.1986H16.31ZM16.3971 23.988L16.5271 24.118C16.5506 24.0945 16.574 24.0847 16.6077 24.0847V23.9009V23.7171C16.4767 23.7171 16.3598 23.7654 16.2671 23.8581L16.3971 23.988ZM16.6077 23.9009V24.0847H18.0381V23.9009V23.7171H16.6077V23.9009ZM18.0381 23.9009V24.0847C18.0867 24.0847 18.1221 24.0996 18.155 24.1325L18.285 24.0026L18.415 23.8726C18.3123 23.7699 18.1831 23.7171 18.0381 23.7171V23.9009ZM18.285 24.0026L18.155 24.1325C18.1879 24.1655 18.2028 24.2008 18.2028 24.2494H18.3866H18.5705C18.5705 24.1044 18.5176 23.9752 18.415 23.8726L18.285 24.0026ZM18.3866 24.2494H18.2028V25.8977H18.3866H18.5705V24.2494H18.3866ZM18.3866 25.8977H18.2028C18.2028 25.9653 18.1857 26.0224 18.1524 26.0738L18.3068 26.1736L18.4611 26.2735C18.5343 26.1603 18.5705 26.0334 18.5705 25.8977H18.3866ZM18.3068 26.1736L18.1509 26.0762C18.1211 26.1238 18.0826 26.1579 18.0324 26.1816L18.1107 26.3479L18.189 26.5142C18.3034 26.4604 18.3956 26.3783 18.4626 26.271L18.3068 26.1736ZM18.1107 26.3479L18.0272 26.1841C17.802 26.299 17.5548 26.3939 17.2849 26.4684L17.3338 26.6456L17.3827 26.8228C17.6743 26.7423 17.945 26.6388 18.1943 26.5116L18.1107 26.3479ZM17.3338 26.6456L17.287 26.4678C17.0278 26.536 16.7484 26.5707 16.4479 26.5707V26.7545V26.9383C16.7768 26.9383 17.0879 26.9004 17.3806 26.8234L17.3338 26.6456ZM20.3024 26.6238L20.4323 26.4938L20.3024 26.6238ZM20.3024 21.679L20.4324 21.8091L20.4371 21.8041L20.3024 21.679ZM20.7671 21.679L20.632 21.8045L20.642 21.8137L20.7671 21.679ZM20.7671 26.6238L20.6419 26.489L20.6371 26.4938L20.7671 26.6238ZM20.5347 26.7182V26.5344C20.4897 26.5344 20.4595 26.521 20.4323 26.4938L20.3024 26.6238L20.1724 26.7538C20.271 26.8524 20.3958 26.902 20.5347 26.902V26.7182ZM20.3024 26.6238L20.4323 26.4938C20.4051 26.4666 20.3918 26.4365 20.3918 26.3914H20.208H20.0241C20.0241 26.5303 20.0737 26.6551 20.1724 26.7538L20.3024 26.6238ZM20.208 26.3914H20.3918V21.9114H20.208H20.0241V26.3914H20.208ZM20.208 21.9114H20.3918C20.3918 21.8663 20.4051 21.8362 20.4323 21.809L20.3024 21.679L20.1724 21.5491C20.0737 21.6477 20.0241 21.7725 20.0241 21.9114H20.208ZM20.3024 21.679L20.4371 21.8041C20.4654 21.7736 20.4942 21.7612 20.5347 21.7612V21.5774V21.3936C20.3913 21.3936 20.2651 21.449 20.1676 21.554L20.3024 21.679ZM20.5347 21.5774V21.7612C20.5752 21.7612 20.604 21.7736 20.6324 21.8041L20.7671 21.679L20.9018 21.554C20.8043 21.449 20.6781 21.3936 20.5347 21.3936V21.5774ZM20.7671 21.679L20.642 21.8137C20.6725 21.8421 20.6849 21.8709 20.6849 21.9114H20.8687H21.0525C21.0525 21.768 20.9971 21.6418 20.8921 21.5443L20.7671 21.679ZM20.8687 21.9114H20.6849V26.3914H20.8687H21.0525V21.9114H20.8687ZM20.8687 26.3914H20.6849C20.6849 26.432 20.6725 26.4607 20.642 26.4891L20.7671 26.6238L20.8921 26.7585C20.9971 26.661 21.0525 26.5349 21.0525 26.3914H20.8687ZM20.7671 26.6238L20.6371 26.4938C20.6099 26.521 20.5798 26.5344 20.5347 26.5344V26.7182V26.902C20.6736 26.902 20.7984 26.8524 20.897 26.7538L20.7671 26.6238ZM22.8812 26.6238L23.0111 26.4938L22.8812 26.6238ZM22.8812 21.7153L23.0112 21.8454L23.0159 21.8404L22.8812 21.7153ZM26.1559 21.7081L26.0208 21.8328L26.0258 21.8382L26.0312 21.8432L26.1559 21.7081ZM26.1559 22.1437L26.0311 22.0086L26.0259 22.0138L26.1559 22.1437ZM23.4475 22.2309V22.0471H23.2637V22.2309H23.4475ZM23.4475 23.8356H23.2637V24.0194H23.4475V23.8356ZM25.9017 23.93L25.7667 24.0546L25.7717 24.06L25.7771 24.065L25.9017 23.93ZM25.9017 24.3656L25.777 24.2304L25.7718 24.2356L25.9017 24.3656ZM23.4475 24.4527V24.2689H23.2637V24.4527H23.4475ZM23.3459 26.6238L23.2207 26.489L23.2159 26.4938L23.3459 26.6238ZM23.1135 26.7182V26.5344C23.0685 26.5344 23.0383 26.521 23.0111 26.4938L22.8812 26.6238L22.7512 26.7538C22.8498 26.8524 22.9746 26.902 23.1135 26.902V26.7182ZM22.8812 26.6238L23.0111 26.4938C22.9839 26.4666 22.9706 26.4365 22.9706 26.3914H22.7868H22.6029C22.6029 26.5303 22.6525 26.6551 22.7512 26.7538L22.8812 26.6238ZM22.7868 26.3914H22.9706V21.9477H22.7868H22.6029V26.3914H22.7868ZM22.7868 21.9477H22.9706C22.9706 21.9027 22.9839 21.8725 23.0111 21.8453L22.8812 21.7153L22.7512 21.5854C22.6525 21.684 22.6029 21.8088 22.6029 21.9477H22.7868ZM22.8812 21.7153L23.0159 21.8404C23.0442 21.8099 23.073 21.7975 23.1135 21.7975V21.6137V21.4299C22.9701 21.4299 22.8439 21.4853 22.7464 21.5903L22.8812 21.7153ZM23.1135 21.6137V21.7975H25.938V21.6137V21.4299H23.1135V21.6137ZM25.938 21.6137V21.7975C25.9749 21.7975 25.9982 21.8083 26.0208 21.8328L26.1559 21.7081L26.291 21.5834C26.1974 21.482 26.0755 21.4299 25.938 21.4299V21.6137ZM26.1559 21.7081L26.0312 21.8432C26.0557 21.8658 26.0664 21.8891 26.0664 21.9259H26.2503H26.4341C26.4341 21.7885 26.3819 21.6666 26.2806 21.573L26.1559 21.7081ZM26.2503 21.9259H26.0664C26.0664 21.9628 26.0557 21.9861 26.0312 22.0087L26.1559 22.1437L26.2806 22.2788C26.3819 22.1852 26.4341 22.0633 26.4341 21.9259H26.2503ZM26.1559 22.1437L26.0259 22.0138C26.0045 22.0351 25.9797 22.0471 25.938 22.0471V22.2309V22.4147C26.0707 22.4147 26.191 22.3685 26.2859 22.2737L26.1559 22.1437ZM25.938 22.2309V22.0471H23.4475V22.2309V22.4147H25.938V22.2309ZM23.4475 22.2309H23.2637V23.8356H23.4475H23.6313V22.2309H23.4475ZM23.4475 23.8356V24.0194H25.6839V23.8356V23.6517H23.4475V23.8356ZM25.6839 23.8356V24.0194C25.7208 24.0194 25.7441 24.0301 25.7667 24.0546L25.9017 23.93L26.0368 23.8053C25.9432 23.7039 25.8213 23.6517 25.6839 23.6517V23.8356ZM25.9017 23.93L25.7771 24.065C25.8015 24.0876 25.8123 24.1109 25.8123 24.1478H25.9961H26.18C26.18 24.0104 26.1278 23.8885 26.0264 23.7949L25.9017 23.93ZM25.9961 24.1478H25.8123C25.8123 24.1846 25.8015 24.2079 25.7771 24.2305L25.9017 24.3656L26.0264 24.5007C26.1278 24.4071 26.18 24.2852 26.18 24.1478H25.9961ZM25.9017 24.3656L25.7718 24.2356C25.7504 24.257 25.7256 24.2689 25.6839 24.2689V24.4527V24.6366C25.8165 24.6366 25.9369 24.5904 26.0317 24.4956L25.9017 24.3656ZM25.6839 24.4527V24.2689H23.4475V24.4527V24.6366H25.6839V24.4527ZM23.4475 24.4527H23.2637V26.3914H23.4475H23.6313V24.4527H23.4475ZM23.4475 26.3914H23.2637C23.2637 26.432 23.2513 26.4607 23.2208 26.4891L23.3459 26.6238L23.4709 26.7585C23.5759 26.661 23.6313 26.5349 23.6313 26.3914H23.4475ZM23.3459 26.6238L23.2159 26.4938C23.1887 26.521 23.1585 26.5344 23.1135 26.5344V26.7182V26.902C23.2524 26.902 23.3772 26.8524 23.4758 26.7538L23.3459 26.6238Z" fill="white" mask="url(#path-8-outside-1_14030_15895)"/><mask id="mask1_14030_15895" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="6" width="26" height="29"><path d="M30.4779 34.5H9.52206C8.40531 34.5 7.5 33.6046 7.5 32.5V8.5C7.5 7.39543 8.40531 6.5 9.52206 6.5H23.125L32.5 15.7727V32.5C32.5 33.6046 31.5947 34.5 30.4779 34.5Z" fill="url(#paint2_linear_14030_15895)"/></mask><g mask="url(#mask1_14030_15895)"><ellipse opacity="0.05" cx="6.16728" cy="5.36353" rx="20.5423" ry="19.5" fill="url(#paint3_linear_14030_15895)"/><ellipse opacity="0.07" cx="6.16751" cy="5.36375" rx="12.9136" ry="12.2273" fill="url(#paint4_linear_14030_15895)"/></g><g filter="url(#filter1_d_14030_15895)"><path d="M32.5 15.7727H25.1471C24.0303 15.7727 23.125 14.8674 23.125 13.7507V6.5L32.5 15.7727Z" fill="url(#paint5_linear_14030_15895)"/></g></g><defs><filter id="filter0_f_14030_15895" x="5.29435" y="16.4609" width="29.5949" height="14.8056" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="1.79228" result="effect1_foregroundBlur_14030_15895"/></filter><filter id="filter1_d_14030_15895" x="21.011" y="4.29412" width="13.9706" height="13.8683" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="0.183823" dy="0.0919117"/><feGaussianBlur stdDeviation="1.1489"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.33 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_14030_15895"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_14030_15895" result="shape"/></filter><linearGradient id="paint0_linear_14030_15895" x1="20" y1="6.5" x2="20" y2="34.5" gradientUnits="userSpaceOnUse"><stop stop-color="#FF7979"/><stop offset="1" stop-color="#E85555"/></linearGradient><linearGradient id="paint1_linear_14030_15895" x1="20" y1="6.5" x2="20" y2="34.5" gradientUnits="userSpaceOnUse"><stop stop-color="#63E4B6"/><stop offset="1" stop-color="#2BBF8A"/></linearGradient><linearGradient id="paint2_linear_14030_15895" x1="20" y1="6.5" x2="20" y2="34.5" gradientUnits="userSpaceOnUse"><stop stop-color="#FF8777"/><stop offset="1" stop-color="#F0695F"/></linearGradient><linearGradient id="paint3_linear_14030_15895" x1="7.6588" y1="6.03363" x2="13.7698" y2="22.4312" gradientUnits="userSpaceOnUse"><stop stop-color="white" stop-opacity="0"/><stop offset="1" stop-color="white"/></linearGradient><linearGradient id="paint4_linear_14030_15895" x1="7.10513" y1="5.78393" x2="10.9296" y2="16.0722" gradientUnits="userSpaceOnUse"><stop stop-color="white" stop-opacity="0"/><stop offset="1" stop-color="white"/></linearGradient><linearGradient id="paint5_linear_14030_15895" x1="27.8125" y1="6.5" x2="27.8125" y2="15.7727" gradientUnits="userSpaceOnUse"><stop stop-color="#0C7550"/><stop offset="1" stop-color="#55C79F"/></linearGradient><clipPath id="clip0_14030_15895"><rect width="17" height="18" fill="white" transform="translate(11.5 13)"/></clipPath></defs></svg>';
const jpgSvg = '<svg width="inherit" height="inherit" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="0.5" width="40" height="40" rx="14" fill="#F5DDEF"/><mask id="mask0_14030_15791" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="6" width="26" height="29"><path d="M30.4779 34.5H9.52206C8.40531 34.5 7.5 33.6046 7.5 32.5V8.5C7.5 7.39543 8.40531 6.5 9.52206 6.5H23.125L32.5 15.7727V32.5C32.5 33.6046 31.5947 34.5 30.4779 34.5Z" fill="url(#paint0_linear_14030_15791)"/></mask><g mask="url(#mask0_14030_15791)"><path d="M30.4779 34.5H9.52206C8.40531 34.5 7.5 33.6046 7.5 32.5V8.5C7.5 7.39543 8.40531 6.5 9.52206 6.5H23.125L32.5 15.7727V32.5C32.5 33.6046 31.5947 34.5 30.4779 34.5Z" fill="url(#paint1_linear_14030_15791)"/><g opacity="0.23" filter="url(#filter0_f_14030_15791)"><rect x="8.87891" y="20.0454" width="22.4265" height="7.63637" fill="#7F3C6E" style="mix-blend-mode:darken"/></g><g opacity="0.12" clip-path="url(#clip0_14030_15791)"><path d="M25.8725 14.4402H13.8725C12.9257 14.4402 12.1582 15.2077 12.1582 16.1545V28.1545C12.1582 29.1012 12.9257 29.8688 13.8725 29.8688H25.8725C26.8193 29.8688 27.5868 29.1012 27.5868 28.1545V16.1545C27.5868 15.2077 26.8193 14.4402 25.8725 14.4402Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.3002 21.2972C18.247 21.2972 19.0145 20.5297 19.0145 19.5829C19.0145 18.6362 18.247 17.8687 17.3002 17.8687C16.3534 17.8687 15.5859 18.6362 15.5859 19.5829C15.5859 20.5297 16.3534 21.2972 17.3002 21.2972Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/><path d="M27.5857 24.7259L24.9405 22.0808C24.619 21.7594 24.1831 21.5789 23.7285 21.5789C23.2739 21.5789 22.838 21.7594 22.5165 22.0808L14.7285 29.8688" stroke="white" stroke-linecap="round" stroke-linejoin="round"/></g><mask id="path-8-outside-1_14030_15791" maskUnits="userSpaceOnUse" x="12.3711" y="20.6819" width="15" height="7" fill="black"><rect fill="white" x="12.3711" y="20.6819" width="15" height="7"/><path d="M14.2046 26.7545C14.0206 26.7545 13.8463 26.7327 13.6818 26.6891C13.522 26.6456 13.3744 26.5851 13.2388 26.5076C13.1953 26.4834 13.1565 26.4495 13.1227 26.406C13.0936 26.3624 13.0791 26.3067 13.0791 26.239C13.0791 26.1615 13.1033 26.0937 13.1517 26.0357C13.2049 25.9727 13.2727 25.9413 13.355 25.9413C13.4034 25.9413 13.447 25.9509 13.4857 25.9703C13.5825 26.0187 13.6866 26.0574 13.7979 26.0865C13.9141 26.1155 14.0351 26.13 14.161 26.13C14.3062 26.13 14.4442 26.1034 14.5749 26.0502C14.7104 25.9969 14.8217 25.8953 14.9089 25.7452C14.996 25.5903 15.0396 25.3604 15.0396 25.0554V21.9114C15.0396 21.8194 15.071 21.742 15.134 21.679C15.1969 21.6113 15.2743 21.5774 15.3663 21.5774C15.4583 21.5774 15.5357 21.6113 15.5987 21.679C15.6664 21.742 15.7003 21.8194 15.7003 21.9114V25.0118C15.7003 25.3604 15.6568 25.6484 15.5696 25.8759C15.4873 26.0986 15.3736 26.2753 15.2284 26.406C15.088 26.5318 14.9282 26.6214 14.7491 26.6746C14.57 26.7279 14.3885 26.7545 14.2046 26.7545ZM17.9064 26.7182C17.8144 26.7182 17.7369 26.6867 17.674 26.6238C17.6111 26.5609 17.5796 26.4834 17.5796 26.3914V21.9477C17.5796 21.8557 17.6111 21.7783 17.674 21.7153C17.7369 21.6476 17.8144 21.6137 17.9064 21.6137H19.5619C19.9298 21.6137 20.2372 21.6621 20.484 21.7589C20.7358 21.8509 20.9342 21.9767 21.0794 22.1365C21.2295 22.2914 21.336 22.4632 21.3989 22.652C21.4667 22.8408 21.5006 23.032 21.5006 23.2256C21.5006 23.4193 21.4667 23.6105 21.3989 23.7993C21.336 23.988 21.2295 24.1623 21.0794 24.3221C20.9342 24.477 20.7358 24.6028 20.484 24.6996C20.2372 24.7916 19.9298 24.8376 19.5619 24.8376H18.2404V26.3914C18.2404 26.4834 18.2065 26.5609 18.1387 26.6238C18.0758 26.6867 17.9983 26.7182 17.9064 26.7182ZM18.2404 24.2131H19.4965C19.8596 24.2131 20.1379 24.1647 20.3316 24.0679C20.5252 23.9663 20.6583 23.8404 20.7309 23.6903C20.8035 23.5354 20.8398 23.3805 20.8398 23.2256C20.8398 23.0659 20.8035 22.911 20.7309 22.7609C20.6583 22.6109 20.5252 22.4874 20.3316 22.3906C20.1379 22.289 19.8596 22.2381 19.4965 22.2381H18.2404V24.2131ZM25.2101 26.7545C24.7018 26.7545 24.2564 26.6432 23.874 26.4205C23.4916 26.1978 23.1939 25.8929 22.9809 25.5056C22.7679 25.1135 22.6614 24.6633 22.6614 24.155C22.6614 23.763 22.7268 23.4072 22.8575 23.0877C22.9882 22.7633 23.1673 22.4874 23.3948 22.2599C23.6272 22.0276 23.8958 21.8509 24.2008 21.7299C24.5057 21.604 24.8349 21.5411 25.1883 21.5411C25.5997 21.5411 25.9458 21.5919 26.2266 21.6936C26.5122 21.7952 26.7688 21.9186 26.9963 22.0639C27.0302 22.0832 27.0616 22.1147 27.0907 22.1583C27.1246 22.2018 27.1415 22.2575 27.1415 22.3253C27.1415 22.4027 27.1149 22.4729 27.0616 22.5358C27.0084 22.5939 26.9333 22.623 26.8365 22.623C26.7833 22.623 26.7325 22.6109 26.684 22.5867C26.4711 22.4608 26.2508 22.3616 26.0233 22.289C25.7958 22.2164 25.5416 22.18 25.2609 22.18C24.8978 22.18 24.5687 22.2575 24.2734 22.4124C23.9829 22.5625 23.7506 22.7851 23.5763 23.0804C23.4069 23.3709 23.3222 23.7291 23.3222 24.155C23.3222 24.5278 23.3996 24.8642 23.5545 25.1643C23.7094 25.4596 23.9345 25.6944 24.2298 25.8686C24.5251 26.0429 24.8809 26.13 25.2972 26.13C25.5537 26.13 25.7885 26.101 26.0015 26.0429C26.2145 25.98 26.4033 25.9025 26.5679 25.8106V24.4963H25.3698C25.2875 24.4963 25.2173 24.4673 25.1592 24.4092C25.1011 24.3511 25.0721 24.2809 25.0721 24.1986C25.0721 24.1163 25.1011 24.0461 25.1592 23.988C25.2173 23.93 25.2875 23.9009 25.3698 23.9009H26.8002C26.897 23.9009 26.9793 23.9348 27.0471 24.0026C27.1149 24.0703 27.1488 24.1526 27.1488 24.2494V25.8977C27.1488 25.9993 27.1221 26.0913 27.0689 26.1736C27.0205 26.2511 26.9551 26.3092 26.8728 26.3479C26.6356 26.4689 26.3767 26.5681 26.0959 26.6456C25.82 26.7182 25.5247 26.7545 25.2101 26.7545Z"/></mask><path d="M14.2046 26.7545C14.0206 26.7545 13.8463 26.7327 13.6818 26.6891C13.522 26.6456 13.3744 26.5851 13.2388 26.5076C13.1953 26.4834 13.1565 26.4495 13.1227 26.406C13.0936 26.3624 13.0791 26.3067 13.0791 26.239C13.0791 26.1615 13.1033 26.0937 13.1517 26.0357C13.2049 25.9727 13.2727 25.9413 13.355 25.9413C13.4034 25.9413 13.447 25.9509 13.4857 25.9703C13.5825 26.0187 13.6866 26.0574 13.7979 26.0865C13.9141 26.1155 14.0351 26.13 14.161 26.13C14.3062 26.13 14.4442 26.1034 14.5749 26.0502C14.7104 25.9969 14.8217 25.8953 14.9089 25.7452C14.996 25.5903 15.0396 25.3604 15.0396 25.0554V21.9114C15.0396 21.8194 15.071 21.742 15.134 21.679C15.1969 21.6113 15.2743 21.5774 15.3663 21.5774C15.4583 21.5774 15.5357 21.6113 15.5987 21.679C15.6664 21.742 15.7003 21.8194 15.7003 21.9114V25.0118C15.7003 25.3604 15.6568 25.6484 15.5696 25.8759C15.4873 26.0986 15.3736 26.2753 15.2284 26.406C15.088 26.5318 14.9282 26.6214 14.7491 26.6746C14.57 26.7279 14.3885 26.7545 14.2046 26.7545ZM17.9064 26.7182C17.8144 26.7182 17.7369 26.6867 17.674 26.6238C17.6111 26.5609 17.5796 26.4834 17.5796 26.3914V21.9477C17.5796 21.8557 17.6111 21.7783 17.674 21.7153C17.7369 21.6476 17.8144 21.6137 17.9064 21.6137H19.5619C19.9298 21.6137 20.2372 21.6621 20.484 21.7589C20.7358 21.8509 20.9342 21.9767 21.0794 22.1365C21.2295 22.2914 21.336 22.4632 21.3989 22.652C21.4667 22.8408 21.5006 23.032 21.5006 23.2256C21.5006 23.4193 21.4667 23.6105 21.3989 23.7993C21.336 23.988 21.2295 24.1623 21.0794 24.3221C20.9342 24.477 20.7358 24.6028 20.484 24.6996C20.2372 24.7916 19.9298 24.8376 19.5619 24.8376H18.2404V26.3914C18.2404 26.4834 18.2065 26.5609 18.1387 26.6238C18.0758 26.6867 17.9983 26.7182 17.9064 26.7182ZM18.2404 24.2131H19.4965C19.8596 24.2131 20.1379 24.1647 20.3316 24.0679C20.5252 23.9663 20.6583 23.8404 20.7309 23.6903C20.8035 23.5354 20.8398 23.3805 20.8398 23.2256C20.8398 23.0659 20.8035 22.911 20.7309 22.7609C20.6583 22.6109 20.5252 22.4874 20.3316 22.3906C20.1379 22.289 19.8596 22.2381 19.4965 22.2381H18.2404V24.2131ZM25.2101 26.7545C24.7018 26.7545 24.2564 26.6432 23.874 26.4205C23.4916 26.1978 23.1939 25.8929 22.9809 25.5056C22.7679 25.1135 22.6614 24.6633 22.6614 24.155C22.6614 23.763 22.7268 23.4072 22.8575 23.0877C22.9882 22.7633 23.1673 22.4874 23.3948 22.2599C23.6272 22.0276 23.8958 21.8509 24.2008 21.7299C24.5057 21.604 24.8349 21.5411 25.1883 21.5411C25.5997 21.5411 25.9458 21.5919 26.2266 21.6936C26.5122 21.7952 26.7688 21.9186 26.9963 22.0639C27.0302 22.0832 27.0616 22.1147 27.0907 22.1583C27.1246 22.2018 27.1415 22.2575 27.1415 22.3253C27.1415 22.4027 27.1149 22.4729 27.0616 22.5358C27.0084 22.5939 26.9333 22.623 26.8365 22.623C26.7833 22.623 26.7325 22.6109 26.684 22.5867C26.4711 22.4608 26.2508 22.3616 26.0233 22.289C25.7958 22.2164 25.5416 22.18 25.2609 22.18C24.8978 22.18 24.5687 22.2575 24.2734 22.4124C23.9829 22.5625 23.7506 22.7851 23.5763 23.0804C23.4069 23.3709 23.3222 23.7291 23.3222 24.155C23.3222 24.5278 23.3996 24.8642 23.5545 25.1643C23.7094 25.4596 23.9345 25.6944 24.2298 25.8686C24.5251 26.0429 24.8809 26.13 25.2972 26.13C25.5537 26.13 25.7885 26.101 26.0015 26.0429C26.2145 25.98 26.4033 25.9025 26.5679 25.8106V24.4963H25.3698C25.2875 24.4963 25.2173 24.4673 25.1592 24.4092C25.1011 24.3511 25.0721 24.2809 25.0721 24.1986C25.0721 24.1163 25.1011 24.0461 25.1592 23.988C25.2173 23.93 25.2875 23.9009 25.3698 23.9009H26.8002C26.897 23.9009 26.9793 23.9348 27.0471 24.0026C27.1149 24.0703 27.1488 24.1526 27.1488 24.2494V25.8977C27.1488 25.9993 27.1221 26.0913 27.0689 26.1736C27.0205 26.2511 26.9551 26.3092 26.8728 26.3479C26.6356 26.4689 26.3767 26.5681 26.0959 26.6456C25.82 26.7182 25.5247 26.7545 25.2101 26.7545Z" fill="white"/><path d="M13.6818 26.6891L13.6334 26.8665L13.6347 26.8668L13.6818 26.6891ZM13.2388 26.5076L13.33 26.348L13.3281 26.3469L13.2388 26.5076ZM13.1227 26.406L12.9693 26.5082L12.9776 26.5188L13.1227 26.406ZM13.1517 26.0357L13.0114 25.9169L13.0105 25.918L13.1517 26.0357ZM13.7979 26.0865L13.7515 26.2644L13.7534 26.2648L13.7979 26.0865ZM14.5749 26.0502L14.5076 25.8791L14.5055 25.8799L14.5749 26.0502ZM14.9089 25.7452L15.0679 25.8375L15.0691 25.8353L14.9089 25.7452ZM15.134 21.679L15.264 21.8091L15.2687 21.8041L15.134 21.679ZM15.5987 21.679L15.4636 21.8045L15.4736 21.8137L15.5987 21.679ZM15.5696 25.8759L15.3979 25.8102L15.3972 25.8122L15.5696 25.8759ZM15.2284 26.406L15.3511 26.5428L15.3513 26.5426L15.2284 26.406ZM14.7491 26.6746L14.8015 26.8508L14.7491 26.6746ZM14.2046 26.7545V26.5707C14.0352 26.5707 13.8769 26.5506 13.7288 26.5114L13.6818 26.6891L13.6347 26.8668C13.8158 26.9148 14.006 26.9383 14.2046 26.9383V26.7545ZM13.6818 26.6891L13.7301 26.5118C13.5844 26.4721 13.4513 26.4173 13.33 26.348L13.2388 26.5076L13.1476 26.6672C13.2974 26.7528 13.4596 26.8191 13.6334 26.8665L13.6818 26.6891ZM13.2388 26.5076L13.3281 26.3469C13.3084 26.336 13.2881 26.3192 13.2678 26.2931L13.1227 26.406L12.9776 26.5188C13.025 26.5798 13.0821 26.6309 13.1496 26.6683L13.2388 26.5076ZM13.1227 26.406L13.2756 26.304C13.2719 26.2984 13.2629 26.281 13.2629 26.239H13.0791H12.8953C12.8953 26.3324 12.9154 26.4264 12.9697 26.5079L13.1227 26.406ZM13.0791 26.239H13.2629C13.2629 26.2034 13.2728 26.1775 13.2929 26.1533L13.1517 26.0357L13.0105 25.918C12.9338 26.01 12.8953 26.1196 12.8953 26.239H13.0791ZM13.1517 26.0357L13.292 26.1544C13.3104 26.1327 13.3269 26.1251 13.355 26.1251V25.9413V25.7574C13.2185 25.7574 13.0995 25.8128 13.0114 25.9169L13.1517 26.0357ZM13.355 25.9413V26.1251C13.3783 26.1251 13.3932 26.1296 13.4035 26.1347L13.4857 25.9703L13.5679 25.8059C13.5008 25.7723 13.4286 25.7574 13.355 25.7574V25.9413ZM13.4857 25.9703L13.4035 26.1347C13.5124 26.1892 13.6286 26.2323 13.7515 26.2644L13.7979 26.0865L13.8443 25.9086C13.7446 25.8826 13.6526 25.8482 13.5679 25.8059L13.4857 25.9703ZM13.7979 26.0865L13.7534 26.2648C13.8848 26.2977 14.0209 26.3139 14.161 26.3139V26.13V25.9462C14.0494 25.9462 13.9434 25.9334 13.8425 25.9081L13.7979 26.0865ZM14.161 26.13V26.3139C14.3293 26.3139 14.4909 26.2829 14.6442 26.2204L14.5749 26.0502L14.5055 25.8799C14.3975 25.924 14.2831 25.9462 14.161 25.9462V26.13ZM14.5749 26.0502L14.6421 26.2213C14.8232 26.1501 14.964 26.0163 15.0678 25.8375L14.9089 25.7452L14.7499 25.6529C14.6795 25.7742 14.5976 25.8438 14.5076 25.8791L14.5749 26.0502ZM14.9089 25.7452L15.0691 25.8353C15.1791 25.6397 15.2234 25.3722 15.2234 25.0554H15.0396H14.8557C14.8557 25.3486 14.8129 25.5409 14.7487 25.6551L14.9089 25.7452ZM15.0396 25.0554H15.2234V21.9114H15.0396H14.8557V25.0554H15.0396ZM15.0396 21.9114H15.2234C15.2234 21.8663 15.2368 21.8362 15.2639 21.809L15.134 21.679L15.004 21.5491C14.9053 21.6477 14.8557 21.7725 14.8557 21.9114H15.0396ZM15.134 21.679L15.2687 21.8041C15.297 21.7736 15.3258 21.7612 15.3663 21.7612V21.5774V21.3936C15.2229 21.3936 15.0968 21.449 14.9993 21.554L15.134 21.679ZM15.3663 21.5774V21.7612C15.4069 21.7612 15.4356 21.7736 15.464 21.8041L15.5987 21.679L15.7334 21.554C15.6359 21.449 15.5097 21.3936 15.3663 21.3936V21.5774ZM15.5987 21.679L15.4736 21.8137C15.5041 21.8421 15.5165 21.8709 15.5165 21.9114H15.7003H15.8841C15.8841 21.768 15.8287 21.6418 15.7238 21.5443L15.5987 21.679ZM15.7003 21.9114H15.5165V25.0118H15.7003H15.8841V21.9114H15.7003ZM15.7003 25.0118H15.5165C15.5165 25.3468 15.4744 25.6106 15.398 25.8102L15.5696 25.8759L15.7413 25.9417C15.8391 25.6862 15.8841 25.374 15.8841 25.0118H15.7003ZM15.5696 25.8759L15.3972 25.8122C15.323 26.0129 15.2242 26.1624 15.1054 26.2693L15.2284 26.406L15.3513 26.5426C15.523 26.3881 15.6516 26.1843 15.7421 25.9396L15.5696 25.8759ZM15.2284 26.406L15.1056 26.2691C14.9853 26.377 14.8495 26.453 14.6967 26.4984L14.7491 26.6746L14.8015 26.8508C15.0069 26.7898 15.1906 26.6867 15.3511 26.5428L15.2284 26.406ZM14.7491 26.6746L14.6967 26.4984C14.5344 26.5467 14.3705 26.5707 14.2046 26.5707V26.7545V26.9383C14.4065 26.9383 14.6057 26.909 14.8015 26.8508L14.7491 26.6746ZM17.674 26.6238L17.804 26.4938L17.674 26.6238ZM17.674 21.7153L17.8041 21.8454L17.8087 21.8404L17.674 21.7153ZM20.484 21.7589L20.4169 21.9301L20.4209 21.9316L20.484 21.7589ZM21.0794 22.1365L20.9434 22.2602L20.9474 22.2644L21.0794 22.1365ZM21.3989 22.652L21.2245 22.7102L21.2259 22.7141L21.3989 22.652ZM21.3989 23.7993L21.2259 23.7371L21.2245 23.7411L21.3989 23.7993ZM21.0794 24.3221L20.9455 24.1962L20.9453 24.1963L21.0794 24.3221ZM20.484 24.6996L20.5482 24.8719L20.55 24.8712L20.484 24.6996ZM18.2404 24.8376V24.6538H18.0566V24.8376H18.2404ZM18.1387 26.6238L18.0136 26.489L18.0087 26.4938L18.1387 26.6238ZM18.2404 24.2131H18.0566V24.397H18.2404V24.2131ZM20.3316 24.0679L20.4138 24.2324L20.417 24.2307L20.3316 24.0679ZM20.7309 23.6903L20.8964 23.7704L20.8974 23.7684L20.7309 23.6903ZM20.7309 22.7609L20.8964 22.6809L20.7309 22.7609ZM20.3316 22.3906L20.2461 22.5534L20.2493 22.555L20.3316 22.3906ZM18.2404 22.2381V22.0543H18.0566V22.2381H18.2404ZM17.9064 26.7182V26.5344C17.8613 26.5344 17.8312 26.521 17.804 26.4938L17.674 26.6238L17.544 26.7538C17.6427 26.8524 17.7675 26.902 17.9064 26.902V26.7182ZM17.674 26.6238L17.804 26.4938C17.7768 26.4666 17.7634 26.4365 17.7634 26.3914H17.5796H17.3958C17.3958 26.5303 17.4454 26.6551 17.544 26.7538L17.674 26.6238ZM17.5796 26.3914H17.7634V21.9477H17.5796H17.3958V26.3914H17.5796ZM17.5796 21.9477H17.7634C17.7634 21.9027 17.7768 21.8725 17.804 21.8453L17.674 21.7153L17.544 21.5854C17.4454 21.684 17.3958 21.8088 17.3958 21.9477H17.5796ZM17.674 21.7153L17.8087 21.8404C17.8371 21.8099 17.8658 21.7975 17.9064 21.7975V21.6137V21.4299C17.763 21.4299 17.6368 21.4853 17.5393 21.5903L17.674 21.7153ZM17.9064 21.6137V21.7975H19.5619V21.6137V21.4299H17.9064V21.6137ZM19.5619 21.6137V21.7975C19.9151 21.7975 20.198 21.8442 20.4169 21.93L20.484 21.7589L20.5511 21.5878C20.2763 21.48 19.9445 21.4299 19.5619 21.4299V21.6137ZM20.484 21.7589L20.4209 21.9316C20.6514 22.0158 20.8225 22.1271 20.9434 22.2601L21.0794 22.1365L21.2155 22.0128C21.046 21.8264 20.8201 21.686 20.5471 21.5862L20.484 21.7589ZM21.0794 22.1365L20.9474 22.2644C21.0799 22.4012 21.171 22.5496 21.2245 22.7101L21.3989 22.652L21.5733 22.5939C21.501 22.3768 21.3791 22.1816 21.2115 22.0086L21.0794 22.1365ZM21.3989 22.652L21.2259 22.7141C21.2868 22.8837 21.3168 23.0539 21.3168 23.2256H21.5006H21.6844C21.6844 23.0101 21.6466 22.7979 21.5719 22.5899L21.3989 22.652ZM21.5006 23.2256H21.3168C21.3168 23.3973 21.2868 23.5676 21.2259 23.7371L21.3989 23.7993L21.5719 23.8614C21.6466 23.6534 21.6844 23.4412 21.6844 23.2256H21.5006ZM21.3989 23.7993L21.2245 23.7411C21.1708 23.9022 21.0792 24.0539 20.9455 24.1962L21.0794 24.3221L21.2134 24.4479C21.3798 24.2708 21.5012 24.0739 21.5733 23.8574L21.3989 23.7993ZM21.0794 24.3221L20.9453 24.1963C20.8235 24.3263 20.6507 24.4386 20.418 24.5281L20.484 24.6996L20.55 24.8712C20.8208 24.767 21.045 24.6276 21.2135 24.4478L21.0794 24.3221ZM20.484 24.6996L20.4199 24.5274C20.1999 24.6093 19.9159 24.6538 19.5619 24.6538V24.8376V25.0214C19.9437 25.0214 20.2744 24.9739 20.5482 24.8719L20.484 24.6996ZM19.5619 24.8376V24.6538H18.2404V24.8376V25.0214H19.5619V24.8376ZM18.2404 24.8376H18.0566V26.3914H18.2404H18.4242V24.8376H18.2404ZM18.2404 26.3914H18.0566C18.0566 26.432 18.0442 26.4607 18.0136 26.4891L18.1387 26.6238L18.2638 26.7585C18.3688 26.661 18.4242 26.5349 18.4242 26.3914H18.2404ZM18.1387 26.6238L18.0087 26.4938C17.9816 26.521 17.9514 26.5344 17.9064 26.5344V26.7182V26.902C18.0453 26.902 18.17 26.8524 18.2687 26.7538L18.1387 26.6238ZM18.2404 24.2131V24.397H19.4965V24.2131V24.0293H18.2404V24.2131ZM19.4965 24.2131V24.397C19.8712 24.397 20.1829 24.3478 20.4138 24.2323L20.3316 24.0679L20.2493 23.9035C20.093 23.9817 19.848 24.0293 19.4965 24.0293V24.2131ZM20.3316 24.0679L20.417 24.2307C20.6346 24.1164 20.802 23.9655 20.8964 23.7704L20.7309 23.6903L20.5654 23.6103C20.5146 23.7153 20.4157 23.8161 20.2461 23.9052L20.3316 24.0679ZM20.7309 23.6903L20.8974 23.7684C20.9802 23.5916 21.0237 23.4102 21.0237 23.2256H20.8398H20.656C20.656 23.3509 20.6268 23.4793 20.5645 23.6123L20.7309 23.6903ZM20.8398 23.2256H21.0237C21.0237 23.0369 20.9805 22.8548 20.8964 22.6809L20.7309 22.7609L20.5654 22.841C20.6265 22.9672 20.656 23.0948 20.656 23.2256H20.8398ZM20.7309 22.7609L20.8964 22.6809C20.8014 22.4846 20.6328 22.3357 20.4138 22.2262L20.3316 22.3906L20.2493 22.555C20.4176 22.6391 20.5152 22.7371 20.5654 22.841L20.7309 22.7609ZM20.3316 22.3906L20.417 22.2279C20.1851 22.1061 19.872 22.0543 19.4965 22.0543V22.2381V22.422C19.8471 22.422 20.0908 22.4718 20.2461 22.5534L20.3316 22.3906ZM19.4965 22.2381V22.0543H18.2404V22.2381V22.422H19.4965V22.2381ZM18.2404 22.2381H18.0566V24.2131H18.2404H18.4242V22.2381H18.2404ZM23.874 26.4205L23.9665 26.2616L23.874 26.4205ZM22.9809 25.5056L22.8194 25.5933L22.8199 25.5942L22.9809 25.5056ZM22.8575 23.0877L23.0276 23.1573L23.028 23.1564L22.8575 23.0877ZM23.3948 22.2599L23.2648 22.1299L23.3948 22.2599ZM24.2008 21.7299L24.2686 21.9007L24.2709 21.8998L24.2008 21.7299ZM26.2266 21.6936L26.164 21.8664L26.165 21.8667L26.2266 21.6936ZM26.9963 22.0639L26.8973 22.219L26.9051 22.2235L26.9963 22.0639ZM27.0907 22.1583L26.9373 22.2605L26.9456 22.2711L27.0907 22.1583ZM27.0616 22.5358L27.1972 22.6601L27.2019 22.6546L27.0616 22.5358ZM26.684 22.5867L26.5903 22.7453L26.6018 22.7511L26.684 22.5867ZM24.2734 22.4124L24.3578 22.5757L24.3588 22.5752L24.2734 22.4124ZM23.5763 23.0804L23.418 22.987L23.4175 22.9878L23.5763 23.0804ZM23.5545 25.1643L23.3912 25.2486L23.3918 25.2497L23.5545 25.1643ZM24.2298 25.8686L24.3232 25.7103L24.2298 25.8686ZM26.0015 26.0429L26.0499 26.2203L26.0536 26.2192L26.0015 26.0429ZM26.5679 25.8106L26.6575 25.971L26.7517 25.9184V25.8106H26.5679ZM26.5679 24.4963H26.7517V24.3125H26.5679V24.4963ZM27.0689 26.1736L26.9145 26.0737L26.913 26.0762L27.0689 26.1736ZM26.8728 26.3479L26.7945 26.1815L26.7893 26.1841L26.8728 26.3479ZM26.0959 26.6456L26.1427 26.8234L26.1448 26.8228L26.0959 26.6456ZM25.2101 26.7545V26.5707C24.7294 26.5707 24.3169 26.4656 23.9665 26.2616L23.874 26.4205L23.7815 26.5793C24.196 26.8207 24.6742 26.9383 25.2101 26.9383V26.7545ZM23.874 26.4205L23.9665 26.2616C23.6129 26.0557 23.3389 25.775 23.142 25.417L22.9809 25.5056L22.8199 25.5942C23.0489 26.0107 23.3704 26.3399 23.7815 26.5793L23.874 26.4205ZM22.9809 25.5056L23.1425 25.4179C22.946 25.0562 22.8453 24.637 22.8453 24.155H22.6614H22.4776C22.4776 24.6897 22.5898 25.1708 22.8194 25.5933L22.9809 25.5056ZM22.6614 24.155H22.8453C22.8453 23.7836 22.9071 23.4519 23.0276 23.1573L22.8575 23.0877L22.6873 23.0181C22.5465 23.3625 22.4776 23.7423 22.4776 24.155H22.6614ZM22.8575 23.0877L23.028 23.1564C23.1502 22.853 23.3162 22.5985 23.5248 22.3899L23.3948 22.2599L23.2648 22.1299C23.0183 22.3764 22.8261 22.6737 22.687 23.019L22.8575 23.0877ZM23.3948 22.2599L23.5248 22.3899C23.7394 22.1752 23.9869 22.0125 24.2686 21.9007L24.2008 21.7299L24.133 21.559C23.8047 21.6893 23.5149 21.8799 23.2648 22.1299L23.3948 22.2599ZM24.2008 21.7299L24.2709 21.8998C24.5521 21.7837 24.8572 21.7249 25.1883 21.7249V21.5411V21.3573C24.8126 21.3573 24.4594 21.4243 24.1306 21.5599L24.2008 21.7299ZM25.1883 21.5411V21.7249C25.5859 21.7249 25.9093 21.7742 26.164 21.8664L26.2266 21.6936L26.2892 21.5207C25.9824 21.4096 25.6136 21.3573 25.1883 21.3573V21.5411ZM26.2266 21.6936L26.165 21.8667C26.4391 21.9643 26.6829 22.0819 26.8974 22.2188L26.9963 22.0639L27.0952 21.9089C26.8546 21.7554 26.5853 21.6261 26.2882 21.5204L26.2266 21.6936ZM26.9963 22.0639L26.9051 22.2235C26.9072 22.2247 26.9193 22.2327 26.9377 22.2602L27.0907 22.1583L27.2436 22.0563C27.2039 21.9967 27.1531 21.9418 27.0875 21.9043L26.9963 22.0639ZM27.0907 22.1583L26.9456 22.2711C26.9491 22.2756 26.9577 22.2888 26.9577 22.3253H27.1415H27.3253C27.3253 22.2262 27.3 22.128 27.2358 22.0454L27.0907 22.1583ZM27.1415 22.3253H26.9577C26.9577 22.3563 26.9484 22.385 26.9213 22.4171L27.0616 22.5358L27.2019 22.6546C27.2813 22.5608 27.3253 22.4491 27.3253 22.3253H27.1415ZM27.0616 22.5358L26.9261 22.4116C26.9154 22.4233 26.8945 22.4391 26.8365 22.4391V22.623V22.8068C26.9722 22.8068 27.1013 22.7646 27.1971 22.6601L27.0616 22.5358ZM26.8365 22.623V22.4391C26.8123 22.4391 26.7896 22.4339 26.7663 22.4222L26.684 22.5867L26.6018 22.7511C26.6753 22.7878 26.7543 22.8068 26.8365 22.8068V22.623ZM26.684 22.5867L26.7776 22.4284C26.5531 22.2958 26.3203 22.1908 26.0792 22.1138L26.0233 22.289L25.9674 22.4641C26.1813 22.5324 26.389 22.6258 26.5905 22.7449L26.684 22.5867ZM26.0233 22.289L26.0792 22.1138C25.8308 22.0346 25.5574 21.9962 25.2609 21.9962V22.18V22.3639C25.5259 22.3639 25.7608 22.3981 25.9674 22.4641L26.0233 22.289ZM25.2609 22.18V21.9962C24.8708 21.9962 24.5119 22.0797 24.188 22.2496L24.2734 22.4124L24.3588 22.5752C24.6254 22.4353 24.9249 22.3639 25.2609 22.3639V22.18ZM24.2734 22.4124L24.189 22.2491C23.8663 22.4158 23.609 22.6634 23.418 22.987L23.5763 23.0804L23.7346 23.1738C23.8922 22.9068 24.0996 22.7091 24.3578 22.5757L24.2734 22.4124ZM23.5763 23.0804L23.4175 22.9878C23.2279 23.3129 23.1384 23.7051 23.1384 24.155H23.3222H23.506C23.506 23.7531 23.5859 23.4288 23.7351 23.173L23.5763 23.0804ZM23.3222 24.155H23.1384C23.1384 24.554 23.2215 24.9198 23.3912 25.2486L23.5545 25.1643L23.7179 25.08C23.5778 24.8086 23.506 24.5015 23.506 24.155H23.3222ZM23.5545 25.1643L23.3918 25.2497C23.563 25.5762 23.8125 25.8358 24.1364 26.027L24.2298 25.8686L24.3232 25.7103C24.0565 25.5529 23.8559 25.343 23.7173 25.0789L23.5545 25.1643ZM24.2298 25.8686L24.1364 26.027C24.4655 26.2212 24.8551 26.3139 25.2972 26.3139V26.13V25.9462C24.9067 25.9462 24.5847 25.8647 24.3232 25.7103L24.2298 25.8686ZM25.2972 26.13V26.3139C25.5675 26.3139 25.8188 26.2833 26.0499 26.2203L26.0015 26.0429L25.9531 25.8656C25.7582 25.9187 25.54 25.9462 25.2972 25.9462V26.13ZM26.0015 26.0429L26.0536 26.2192C26.2774 26.1531 26.4792 26.0707 26.6575 25.971L26.5679 25.8106L26.4782 25.6501C26.3274 25.7344 26.1516 25.8069 25.9494 25.8666L26.0015 26.0429ZM26.5679 25.8106H26.7517V24.4963H26.5679H26.384V25.8106H26.5679ZM26.5679 24.4963V24.3125H25.3698V24.4963V24.6801H26.5679V24.4963ZM25.3698 24.4963V24.3125C25.3362 24.3125 25.3128 24.3027 25.2892 24.2792L25.1592 24.4092L25.0292 24.5392C25.1219 24.6318 25.2389 24.6801 25.3698 24.6801V24.4963ZM25.1592 24.4092L25.2892 24.2792C25.2657 24.2557 25.2559 24.2322 25.2559 24.1986H25.0721H24.8883C24.8883 24.3296 24.9366 24.4465 25.0292 24.5392L25.1592 24.4092ZM25.0721 24.1986H25.2559C25.2559 24.165 25.2657 24.1416 25.2892 24.118L25.1592 23.988L25.0292 23.8581C24.9366 23.9507 24.8883 24.0677 24.8883 24.1986H25.0721ZM25.1592 23.988L25.2892 24.118C25.3128 24.0945 25.3362 24.0847 25.3698 24.0847V23.9009V23.7171C25.2389 23.7171 25.1219 23.7654 25.0292 23.8581L25.1592 23.988ZM25.3698 23.9009V24.0847H26.8002V23.9009V23.7171H25.3698V23.9009ZM26.8002 23.9009V24.0847C26.8488 24.0847 26.8842 24.0996 26.9171 24.1325L27.0471 24.0026L27.1771 23.8726C27.0744 23.7699 26.9452 23.7171 26.8002 23.7171V23.9009ZM27.0471 24.0026L26.9171 24.1325C26.95 24.1655 26.9649 24.2008 26.9649 24.2494H27.1488H27.3326C27.3326 24.1044 27.2797 23.9752 27.1771 23.8726L27.0471 24.0026ZM27.1488 24.2494H26.9649V25.8977H27.1488H27.3326V24.2494H27.1488ZM27.1488 25.8977H26.9649C26.9649 25.9653 26.9478 26.0224 26.9145 26.0738L27.0689 26.1736L27.2232 26.2735C27.2965 26.1603 27.3326 26.0334 27.3326 25.8977H27.1488ZM27.0689 26.1736L26.913 26.0762C26.8832 26.1238 26.8448 26.1579 26.7946 26.1816L26.8728 26.3479L26.9511 26.5142C27.0655 26.4604 27.1577 26.3783 27.2248 26.271L27.0689 26.1736ZM26.8728 26.3479L26.7893 26.1841C26.5641 26.299 26.3169 26.3939 26.047 26.4684L26.0959 26.6456L26.1448 26.8228C26.4364 26.7423 26.7071 26.6388 26.9564 26.5116L26.8728 26.3479ZM26.0959 26.6456L26.0491 26.4678C25.7899 26.536 25.5105 26.5707 25.2101 26.5707V26.7545V26.9383C25.5389 26.9383 25.85 26.9004 26.1427 26.8234L26.0959 26.6456Z" fill="white" mask="url(#path-8-outside-1_14030_15791)"/><mask id="mask1_14030_15791" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="6" width="26" height="29"><path d="M30.4779 34.5H9.52206C8.40531 34.5 7.5 33.6046 7.5 32.5V8.5C7.5 7.39543 8.40531 6.5 9.52206 6.5H23.125L32.5 15.7727V32.5C32.5 33.6046 31.5947 34.5 30.4779 34.5Z" fill="url(#paint2_linear_14030_15791)"/></mask><g mask="url(#mask1_14030_15791)"><ellipse opacity="0.05" cx="6.16728" cy="5.36353" rx="20.5423" ry="19.5" fill="url(#paint3_linear_14030_15791)"/><ellipse opacity="0.07" cx="6.16751" cy="5.36375" rx="12.9136" ry="12.2273" fill="url(#paint4_linear_14030_15791)"/></g><g filter="url(#filter1_d_14030_15791)"><path d="M32.5 15.7727H25.1471C24.0303 15.7727 23.125 14.8674 23.125 13.7507V6.5L32.5 15.7727Z" fill="url(#paint5_linear_14030_15791)"/></g></g><defs><filter id="filter0_f_14030_15791" x="5.29435" y="16.4609" width="29.5949" height="14.8056" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="1.79228" result="effect1_foregroundBlur_14030_15791"/></filter><filter id="filter1_d_14030_15791" x="21.011" y="4.29412" width="13.9706" height="13.8683" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="0.183823" dy="0.0919117"/><feGaussianBlur stdDeviation="1.1489"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.33 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_14030_15791"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_14030_15791" result="shape"/></filter><linearGradient id="paint0_linear_14030_15791" x1="20" y1="6.5" x2="20" y2="34.5" gradientUnits="userSpaceOnUse"><stop stop-color="#CA8CBA"/><stop offset="1" stop-color="#B277A3"/></linearGradient><linearGradient id="paint1_linear_14030_15791" x1="20" y1="6.5" x2="20" y2="34.5" gradientUnits="userSpaceOnUse"><stop stop-color="#AE5096"/><stop offset="1" stop-color="#BF7CAE"/></linearGradient><linearGradient id="paint2_linear_14030_15791" x1="20" y1="6.5" x2="20" y2="34.5" gradientUnits="userSpaceOnUse"><stop stop-color="#FF8777"/><stop offset="1" stop-color="#F0695F"/></linearGradient><linearGradient id="paint3_linear_14030_15791" x1="7.6588" y1="6.03363" x2="13.7698" y2="22.4312" gradientUnits="userSpaceOnUse"><stop stop-color="white" stop-opacity="0"/><stop offset="1" stop-color="white"/></linearGradient><linearGradient id="paint4_linear_14030_15791" x1="7.10513" y1="5.78393" x2="10.9296" y2="16.0722" gradientUnits="userSpaceOnUse"><stop stop-color="white" stop-opacity="0"/><stop offset="1" stop-color="white"/></linearGradient><linearGradient id="paint5_linear_14030_15791" x1="27.8125" y1="6.5" x2="27.8125" y2="15.7727" gradientUnits="userSpaceOnUse"><stop stop-color="#F3C4E7"/><stop offset="1" stop-color="#D283BE"/></linearGradient><clipPath id="clip0_14030_15791"><rect width="17" height="18" fill="white" transform="translate(11.5 13)"/></clipPath></defs></svg>';
const pngSvg = '<svg width="inherit" height="inherit" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="0.5" width="40" height="40" rx="14" fill="#C7F0FF"/><mask id="mask0_14030_15816" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="6" width="26" height="29"><path d="M30.4779 34.5H9.52206C8.40531 34.5 7.5 33.6046 7.5 32.5V8.5C7.5 7.39543 8.40531 6.5 9.52206 6.5H23.125L32.5 15.7727V32.5C32.5 33.6046 31.5947 34.5 30.4779 34.5Z" fill="url(#paint0_linear_14030_15816)"/></mask><g mask="url(#mask0_14030_15816)"><path d="M30.4779 34.5H9.52206C8.40531 34.5 7.5 33.6046 7.5 32.5V8.5C7.5 7.39543 8.40531 6.5 9.52206 6.5H23.125L32.5 15.7727V32.5C32.5 33.6046 31.5947 34.5 30.4779 34.5Z" fill="url(#paint1_linear_14030_15816)"/><g opacity="0.23" filter="url(#filter0_f_14030_15816)"><rect x="8.87891" y="20.0454" width="22.4265" height="7.63637" fill="#C7F0FF" style="mix-blend-mode:darken"/></g><g opacity="0.12" clip-path="url(#clip0_14030_15816)"><path d="M25.8725 14.4402H13.8725C12.9257 14.4402 12.1582 15.2077 12.1582 16.1545V28.1545C12.1582 29.1012 12.9257 29.8688 13.8725 29.8688H25.8725C26.8193 29.8688 27.5868 29.1012 27.5868 28.1545V16.1545C27.5868 15.2077 26.8193 14.4402 25.8725 14.4402Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.3002 21.2972C18.247 21.2972 19.0145 20.5297 19.0145 19.5829C19.0145 18.6362 18.247 17.8687 17.3002 17.8687C16.3534 17.8687 15.5859 18.6362 15.5859 19.5829C15.5859 20.5297 16.3534 21.2972 17.3002 21.2972Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/><path d="M27.5857 24.7259L24.9405 22.0808C24.619 21.7594 24.1831 21.5789 23.7285 21.5789C23.2739 21.5789 22.838 21.7594 22.5165 22.0808L14.7285 29.8688" stroke="white" stroke-linecap="round" stroke-linejoin="round"/></g><mask id="path-8-outside-1_14030_15816" maskUnits="userSpaceOnUse" x="11" y="21" width="18" height="7" fill="black"><rect fill="white" x="11" y="21" width="18" height="7"/><path d="M12.4215 27.0363C12.3295 27.0363 12.2521 27.0048 12.1891 26.9419C12.1262 26.879 12.0948 26.8015 12.0948 26.7096V22.2658C12.0948 22.1738 12.1262 22.0964 12.1891 22.0335C12.2521 21.9657 12.3295 21.9318 12.4215 21.9318H14.077C14.4449 21.9318 14.7523 21.9802 14.9992 22.077C15.2509 22.169 15.4493 22.2949 15.5946 22.4546C15.7446 22.6095 15.8511 22.7813 15.9141 22.9701C15.9818 23.1589 16.0157 23.3501 16.0157 23.5438C16.0157 23.7374 15.9818 23.9286 15.9141 24.1174C15.8511 24.3062 15.7446 24.4804 15.5946 24.6402C15.4493 24.7951 15.2509 24.9209 14.9992 25.0177C14.7523 25.1097 14.4449 25.1557 14.077 25.1557H12.7555V26.7096C12.7555 26.8015 12.7216 26.879 12.6539 26.9419C12.5909 27.0048 12.5135 27.0363 12.4215 27.0363ZM12.7555 24.5313H14.0117C14.3747 24.5313 14.6531 24.4828 14.8467 24.386C15.0403 24.2844 15.1734 24.1585 15.246 24.0085C15.3186 23.8536 15.355 23.6987 15.355 23.5438C15.355 23.384 15.3186 23.2291 15.246 23.079C15.1734 22.929 15.0403 22.8055 14.8467 22.7087C14.6531 22.6071 14.3747 22.5563 14.0117 22.5563H12.7555V24.5313ZM17.8083 27.0363C17.7163 27.0363 17.6389 27.0048 17.5759 26.9419C17.513 26.879 17.4815 26.8015 17.4815 26.7096V22.3747C17.4815 22.244 17.5275 22.1327 17.6195 22.0407C17.7115 21.9439 17.8228 21.8955 17.9535 21.8955H18.0479C18.1302 21.8955 18.2052 21.9149 18.273 21.9536C18.3408 21.9923 18.3988 22.0456 18.4472 22.1133L21.2427 26.1505V22.2295C21.2427 22.1375 21.2742 22.0601 21.3371 21.9972C21.4001 21.9294 21.4775 21.8955 21.5695 21.8955C21.6615 21.8955 21.7389 21.9294 21.8018 21.9972C21.8696 22.0601 21.9035 22.1375 21.9035 22.2295V26.5643C21.9035 26.695 21.8551 26.8064 21.7583 26.8983C21.6663 26.9903 21.555 27.0363 21.4243 27.0363H21.3371C21.2597 27.0363 21.1871 27.0194 21.1193 26.9855C21.0515 26.9468 20.9959 26.8983 20.9523 26.8403L18.1423 22.7813V26.7096C18.1423 26.8015 18.1084 26.879 18.0406 26.9419C17.9777 27.0048 17.9002 27.0363 17.8083 27.0363ZM26.0621 27.0726C25.5539 27.0726 25.1085 26.9613 24.7261 26.7386C24.3437 26.5159 24.046 26.211 23.833 25.8237C23.62 25.4316 23.5135 24.9814 23.5135 24.4732C23.5135 24.0811 23.5789 23.7253 23.7096 23.4058C23.8403 23.0815 24.0194 22.8055 24.2469 22.578C24.4792 22.3457 24.7479 22.169 25.0529 22.048C25.3578 21.9221 25.687 21.8592 26.0404 21.8592C26.4518 21.8592 26.7979 21.91 27.0787 22.0117C27.3643 22.1133 27.6208 22.2368 27.8483 22.382C27.8822 22.4013 27.9137 22.4328 27.9427 22.4764C27.9766 22.5199 27.9936 22.5756 27.9936 22.6434C27.9936 22.7208 27.9669 22.791 27.9137 22.854C27.8605 22.912 27.7854 22.9411 27.6886 22.9411C27.6354 22.9411 27.5845 22.929 27.5361 22.9048C27.3231 22.7789 27.1029 22.6797 26.8754 22.6071C26.6479 22.5345 26.3937 22.4982 26.113 22.4982C25.7499 22.4982 25.4207 22.5756 25.1255 22.7305C24.835 22.8806 24.6027 23.1032 24.4284 23.3985C24.259 23.689 24.1743 24.0472 24.1743 24.4732C24.1743 24.8459 24.2517 25.1823 24.4066 25.4824C24.5615 25.7777 24.7866 26.0125 25.0819 26.1868C25.3772 26.361 25.733 26.4482 26.1493 26.4482C26.4058 26.4482 26.6406 26.4191 26.8536 26.361C27.0666 26.2981 27.2554 26.2206 27.4199 26.1287V24.8144H26.2219C26.1396 24.8144 26.0694 24.7854 26.0113 24.7273C25.9532 24.6692 25.9242 24.599 25.9242 24.5167C25.9242 24.4344 25.9532 24.3642 26.0113 24.3062C26.0694 24.2481 26.1396 24.219 26.2219 24.219H27.6523C27.7491 24.219 27.8314 24.2529 27.8992 24.3207C27.9669 24.3884 28.0008 24.4707 28.0008 24.5676V26.2158C28.0008 26.3175 27.9742 26.4094 27.921 26.4917C27.8726 26.5692 27.8072 26.6273 27.7249 26.666C27.4877 26.787 27.2287 26.8862 26.948 26.9637C26.6721 27.0363 26.3768 27.0726 26.0621 27.0726Z"/></mask><path d="M12.4215 27.0363C12.3295 27.0363 12.2521 27.0048 12.1891 26.9419C12.1262 26.879 12.0948 26.8015 12.0948 26.7096V22.2658C12.0948 22.1738 12.1262 22.0964 12.1891 22.0335C12.2521 21.9657 12.3295 21.9318 12.4215 21.9318H14.077C14.4449 21.9318 14.7523 21.9802 14.9992 22.077C15.2509 22.169 15.4493 22.2949 15.5946 22.4546C15.7446 22.6095 15.8511 22.7813 15.9141 22.9701C15.9818 23.1589 16.0157 23.3501 16.0157 23.5438C16.0157 23.7374 15.9818 23.9286 15.9141 24.1174C15.8511 24.3062 15.7446 24.4804 15.5946 24.6402C15.4493 24.7951 15.2509 24.9209 14.9992 25.0177C14.7523 25.1097 14.4449 25.1557 14.077 25.1557H12.7555V26.7096C12.7555 26.8015 12.7216 26.879 12.6539 26.9419C12.5909 27.0048 12.5135 27.0363 12.4215 27.0363ZM12.7555 24.5313H14.0117C14.3747 24.5313 14.6531 24.4828 14.8467 24.386C15.0403 24.2844 15.1734 24.1585 15.246 24.0085C15.3186 23.8536 15.355 23.6987 15.355 23.5438C15.355 23.384 15.3186 23.2291 15.246 23.079C15.1734 22.929 15.0403 22.8055 14.8467 22.7087C14.6531 22.6071 14.3747 22.5563 14.0117 22.5563H12.7555V24.5313ZM17.8083 27.0363C17.7163 27.0363 17.6389 27.0048 17.5759 26.9419C17.513 26.879 17.4815 26.8015 17.4815 26.7096V22.3747C17.4815 22.244 17.5275 22.1327 17.6195 22.0407C17.7115 21.9439 17.8228 21.8955 17.9535 21.8955H18.0479C18.1302 21.8955 18.2052 21.9149 18.273 21.9536C18.3408 21.9923 18.3988 22.0456 18.4472 22.1133L21.2427 26.1505V22.2295C21.2427 22.1375 21.2742 22.0601 21.3371 21.9972C21.4001 21.9294 21.4775 21.8955 21.5695 21.8955C21.6615 21.8955 21.7389 21.9294 21.8018 21.9972C21.8696 22.0601 21.9035 22.1375 21.9035 22.2295V26.5643C21.9035 26.695 21.8551 26.8064 21.7583 26.8983C21.6663 26.9903 21.555 27.0363 21.4243 27.0363H21.3371C21.2597 27.0363 21.1871 27.0194 21.1193 26.9855C21.0515 26.9468 20.9959 26.8983 20.9523 26.8403L18.1423 22.7813V26.7096C18.1423 26.8015 18.1084 26.879 18.0406 26.9419C17.9777 27.0048 17.9002 27.0363 17.8083 27.0363ZM26.0621 27.0726C25.5539 27.0726 25.1085 26.9613 24.7261 26.7386C24.3437 26.5159 24.046 26.211 23.833 25.8237C23.62 25.4316 23.5135 24.9814 23.5135 24.4732C23.5135 24.0811 23.5789 23.7253 23.7096 23.4058C23.8403 23.0815 24.0194 22.8055 24.2469 22.578C24.4792 22.3457 24.7479 22.169 25.0529 22.048C25.3578 21.9221 25.687 21.8592 26.0404 21.8592C26.4518 21.8592 26.7979 21.91 27.0787 22.0117C27.3643 22.1133 27.6208 22.2368 27.8483 22.382C27.8822 22.4013 27.9137 22.4328 27.9427 22.4764C27.9766 22.5199 27.9936 22.5756 27.9936 22.6434C27.9936 22.7208 27.9669 22.791 27.9137 22.854C27.8605 22.912 27.7854 22.9411 27.6886 22.9411C27.6354 22.9411 27.5845 22.929 27.5361 22.9048C27.3231 22.7789 27.1029 22.6797 26.8754 22.6071C26.6479 22.5345 26.3937 22.4982 26.113 22.4982C25.7499 22.4982 25.4207 22.5756 25.1255 22.7305C24.835 22.8806 24.6027 23.1032 24.4284 23.3985C24.259 23.689 24.1743 24.0472 24.1743 24.4732C24.1743 24.8459 24.2517 25.1823 24.4066 25.4824C24.5615 25.7777 24.7866 26.0125 25.0819 26.1868C25.3772 26.361 25.733 26.4482 26.1493 26.4482C26.4058 26.4482 26.6406 26.4191 26.8536 26.361C27.0666 26.2981 27.2554 26.2206 27.4199 26.1287V24.8144H26.2219C26.1396 24.8144 26.0694 24.7854 26.0113 24.7273C25.9532 24.6692 25.9242 24.599 25.9242 24.5167C25.9242 24.4344 25.9532 24.3642 26.0113 24.3062C26.0694 24.2481 26.1396 24.219 26.2219 24.219H27.6523C27.7491 24.219 27.8314 24.2529 27.8992 24.3207C27.9669 24.3884 28.0008 24.4707 28.0008 24.5676V26.2158C28.0008 26.3175 27.9742 26.4094 27.921 26.4917C27.8726 26.5692 27.8072 26.6273 27.7249 26.666C27.4877 26.787 27.2287 26.8862 26.948 26.9637C26.6721 27.0363 26.3768 27.0726 26.0621 27.0726Z" fill="white"/><path d="M12.1891 26.9419L12.3191 26.8119L12.1891 26.9419ZM12.1891 22.0335L12.3192 22.1635L12.3239 22.1585L12.1891 22.0335ZM14.9992 22.077L14.932 22.2482L14.9361 22.2497L14.9992 22.077ZM15.5946 22.4546L15.4585 22.5783L15.4625 22.5825L15.5946 22.4546ZM15.9141 22.9701L15.7396 23.0283L15.741 23.0322L15.9141 22.9701ZM15.9141 24.1174L15.741 24.0552L15.7397 24.0592L15.9141 24.1174ZM15.5946 24.6402L15.4606 24.5143L15.4605 24.5144L15.5946 24.6402ZM14.9992 25.0177L15.0633 25.19L15.0652 25.1893L14.9992 25.0177ZM12.7555 25.1557V24.9719H12.5717V25.1557H12.7555ZM12.6539 26.9419L12.5287 26.8071L12.5239 26.8119L12.6539 26.9419ZM12.7555 24.5312H12.5717V24.7151H12.7555V24.5312ZM14.8467 24.386L14.9289 24.5505L14.9321 24.5488L14.8467 24.386ZM15.246 24.0085L15.4115 24.0885L15.4125 24.0865L15.246 24.0085ZM15.246 23.079L15.4115 22.999L15.246 23.079ZM14.8467 22.7087L14.7612 22.8715L14.7645 22.8731L14.8467 22.7087ZM12.7555 22.5563V22.3724H12.5717V22.5563H12.7555ZM12.4215 27.0363V26.8525C12.3765 26.8525 12.3463 26.8391 12.3191 26.8119L12.1891 26.9419L12.0592 27.0719C12.1578 27.1706 12.2826 27.2201 12.4215 27.2201V27.0363ZM12.1891 26.9419L12.3191 26.8119C12.2919 26.7847 12.2786 26.7546 12.2786 26.7096H12.0948H11.9109C11.9109 26.8485 11.9605 26.9732 12.0592 27.0719L12.1891 26.9419ZM12.0948 26.7096H12.2786V22.2658H12.0948H11.9109V26.7096H12.0948ZM12.0948 22.2658H12.2786C12.2786 22.2208 12.2919 22.1906 12.3191 22.1634L12.1891 22.0335L12.0592 21.9035C11.9605 22.0021 11.9109 22.1269 11.9109 22.2658H12.0948ZM12.1891 22.0335L12.3239 22.1585C12.3522 22.128 12.381 22.1156 12.4215 22.1156V21.9318V21.748C12.2781 21.748 12.1519 21.8034 12.0544 21.9084L12.1891 22.0335ZM12.4215 21.9318V22.1156H14.077V21.9318V21.748H12.4215V21.9318ZM14.077 21.9318V22.1156C14.4302 22.1156 14.7131 22.1623 14.9321 22.2482L14.9992 22.077L15.0663 21.9059C14.7915 21.7981 14.4596 21.748 14.077 21.748V21.9318ZM14.9992 22.077L14.9361 22.2497C15.1665 22.3339 15.3376 22.4452 15.4586 22.5782L15.5946 22.4546L15.7306 22.3309C15.5611 22.1445 15.3353 22.0041 15.0623 21.9044L14.9992 22.077ZM15.5946 22.4546L15.4625 22.5825C15.5951 22.7193 15.6862 22.8677 15.7397 23.0283L15.9141 22.9701L16.0884 22.912C16.0161 22.6949 15.8942 22.4997 15.7266 22.3267L15.5946 22.4546ZM15.9141 22.9701L15.741 23.0322C15.8019 23.2018 15.8319 23.3721 15.8319 23.5438H16.0157H16.1995C16.1995 23.3282 16.1617 23.116 16.0871 22.908L15.9141 22.9701ZM16.0157 23.5438H15.8319C15.8319 23.7155 15.8019 23.8857 15.741 24.0553L15.9141 24.1174L16.0871 24.1795C16.1617 23.9715 16.1995 23.7593 16.1995 23.5438H16.0157ZM15.9141 24.1174L15.7397 24.0592C15.686 24.2203 15.5943 24.372 15.4606 24.5143L15.5946 24.6402L15.7285 24.766C15.895 24.5889 16.0163 24.392 16.0884 24.1755L15.9141 24.1174ZM15.5946 24.6402L15.4605 24.5144C15.3386 24.6444 15.1658 24.7567 14.9332 24.8462L14.9992 25.0177L15.0652 25.1893C15.336 25.0852 15.5601 24.9457 15.7287 24.7659L15.5946 24.6402ZM14.9992 25.0177L14.935 24.8455C14.715 24.9274 14.431 24.9719 14.077 24.9719V25.1557V25.3395C14.4588 25.3395 14.7896 25.292 15.0633 25.19L14.9992 25.0177ZM14.077 25.1557V24.9719H12.7555V25.1557V25.3395H14.077V25.1557ZM12.7555 25.1557H12.5717V26.7096H12.7555H12.9393V25.1557H12.7555ZM12.7555 26.7096H12.5717C12.5717 26.7501 12.5593 26.7788 12.5288 26.8072L12.6539 26.9419L12.7789 27.0766C12.8839 26.9791 12.9393 26.853 12.9393 26.7096H12.7555ZM12.6539 26.9419L12.5239 26.8119C12.4967 26.8391 12.4665 26.8525 12.4215 26.8525V27.0363V27.2201C12.5604 27.2201 12.6852 27.1706 12.7838 27.0719L12.6539 26.9419ZM12.7555 24.5312V24.7151H14.0117V24.5312V24.3474H12.7555V24.5312ZM14.0117 24.5312V24.7151C14.3863 24.7151 14.698 24.6659 14.9289 24.5504L14.8467 24.386L14.7645 24.2216C14.6081 24.2998 14.3631 24.3474 14.0117 24.3474V24.5312ZM14.8467 24.386L14.9321 24.5488C15.1498 24.4345 15.3171 24.2836 15.4115 24.0885L15.246 24.0085L15.0806 23.9284C15.0298 24.0334 14.9309 24.1342 14.7612 24.2233L14.8467 24.386ZM15.246 24.0085L15.4125 24.0865C15.4953 23.9097 15.5388 23.7283 15.5388 23.5438H15.355H15.1711C15.1711 23.669 15.142 23.7974 15.0796 23.9304L15.246 24.0085ZM15.355 23.5438H15.5388C15.5388 23.3551 15.4957 23.1729 15.4115 22.999L15.246 23.079L15.0806 23.1591C15.1416 23.2853 15.1711 23.413 15.1711 23.5438H15.355ZM15.246 23.079L15.4115 22.999C15.3166 22.8027 15.1479 22.6538 14.9289 22.5443L14.8467 22.7087L14.7645 22.8731C14.9327 22.9573 15.0303 23.0552 15.0806 23.1591L15.246 23.079ZM14.8467 22.7087L14.9321 22.546C14.7002 22.4242 14.3872 22.3724 14.0117 22.3724V22.5563V22.7401C14.3623 22.7401 14.6059 22.7899 14.7612 22.8715L14.8467 22.7087ZM14.0117 22.5563V22.3724H12.7555V22.5563V22.7401H14.0117V22.5563ZM12.7555 22.5563H12.5717V24.5312H12.7555H12.9393V22.5563H12.7555ZM17.5759 26.9419L17.7059 26.8119L17.5759 26.9419ZM17.6195 22.0407L17.7495 22.1707L17.7528 22.1673L17.6195 22.0407ZM18.273 21.9536L18.3642 21.794L18.3642 21.794L18.273 21.9536ZM18.4472 22.1133L18.5984 22.0087L18.5968 22.0065L18.4472 22.1133ZM21.2427 26.1505L21.0916 26.2551L21.4266 26.7388V26.1505H21.2427ZM21.3371 21.9972L21.4672 22.1272L21.4718 22.1222L21.3371 21.9972ZM21.8018 21.9972L21.6668 22.1226L21.6768 22.1319L21.8018 21.9972ZM21.7583 26.8983L21.6316 26.765L21.6283 26.7684L21.7583 26.8983ZM21.1193 26.9855L21.028 27.1453L21.0371 27.1499L21.1193 26.9855ZM20.9523 26.8403L20.8011 26.945L20.8052 26.9506L20.9523 26.8403ZM18.1423 22.7813L18.2934 22.6767L17.9585 22.1929V22.7813H18.1423ZM18.0406 26.9419L17.9155 26.8071L17.9106 26.8119L18.0406 26.9419ZM17.8083 27.0363V26.8525C17.7632 26.8525 17.7331 26.8391 17.7059 26.8119L17.5759 26.9419L17.4459 27.0719C17.5446 27.1706 17.6694 27.2201 17.8083 27.2201V27.0363ZM17.5759 26.9419L17.7059 26.8119C17.6787 26.7847 17.6654 26.7546 17.6654 26.7096H17.4815H17.2977C17.2977 26.8485 17.3473 26.9732 17.4459 27.0719L17.5759 26.9419ZM17.4815 26.7096H17.6654V22.3747H17.4815H17.2977V26.7096H17.4815ZM17.4815 22.3747H17.6654C17.6654 22.2925 17.6922 22.228 17.7495 22.1707L17.6195 22.0407L17.4895 21.9107C17.3629 22.0374 17.2977 22.1955 17.2977 22.3747H17.4815ZM17.6195 22.0407L17.7528 22.1673C17.8109 22.1061 17.8744 22.0793 17.9535 22.0793V21.8955V21.7117C17.7712 21.7117 17.612 21.7817 17.4862 21.9141L17.6195 22.0407ZM17.9535 21.8955V22.0793H18.0479V21.8955V21.7117H17.9535V21.8955ZM18.0479 21.8955V22.0793C18.1 22.0793 18.1433 22.0912 18.1818 22.1132L18.273 21.9536L18.3642 21.794C18.2671 21.7385 18.1604 21.7117 18.0479 21.7117V21.8955ZM18.273 21.9536L18.1818 22.1132C18.225 22.1379 18.2636 22.1725 18.2977 22.2202L18.4472 22.1133L18.5968 22.0065C18.5341 21.9186 18.4565 21.8467 18.3642 21.794L18.273 21.9536ZM18.4472 22.1133L18.2961 22.218L21.0916 26.2551L21.2427 26.1505L21.3939 26.0458L18.5984 22.0087L18.4472 22.1133ZM21.2427 26.1505H21.4266V22.2295H21.2427H21.0589V26.1505H21.2427ZM21.2427 22.2295H21.4266C21.4266 22.1845 21.4399 22.1543 21.4671 22.1271L21.3371 21.9972L21.2072 21.8672C21.1085 21.9658 21.0589 22.0906 21.0589 22.2295H21.2427ZM21.3371 21.9972L21.4718 22.1222C21.5002 22.0917 21.529 22.0793 21.5695 22.0793V21.8955V21.7117C21.4261 21.7117 21.2999 21.7671 21.2024 21.8721L21.3371 21.9972ZM21.5695 21.8955V22.0793C21.61 22.0793 21.6388 22.0917 21.6671 22.1222L21.8018 21.9972L21.9365 21.8721C21.8391 21.7671 21.7129 21.7117 21.5695 21.7117V21.8955ZM21.8018 21.9972L21.6768 22.1319C21.7073 22.1602 21.7197 22.189 21.7197 22.2295H21.9035H22.0873C22.0873 22.0861 22.0319 21.9599 21.9269 21.8624L21.8018 21.9972ZM21.9035 22.2295H21.7197V26.5643H21.9035H22.0873V22.2295H21.9035ZM21.9035 26.5643H21.7197C21.7197 26.6434 21.6928 26.707 21.6317 26.7651L21.7583 26.8983L21.8849 27.0316C22.0173 26.9058 22.0873 26.7466 22.0873 26.5643H21.9035ZM21.7583 26.8983L21.6283 26.7684C21.571 26.8257 21.5065 26.8525 21.4243 26.8525V27.0363V27.2201C21.6035 27.2201 21.7616 27.155 21.8883 27.0283L21.7583 26.8983ZM21.4243 27.0363V26.8525H21.3371V27.0363V27.2201H21.4243V27.0363ZM21.3371 27.0363V26.8525C21.2876 26.8525 21.2432 26.8419 21.2015 26.8211L21.1193 26.9855L21.0371 27.1499C21.131 27.1968 21.2318 27.2201 21.3371 27.2201V27.0363ZM21.1193 26.9855L21.2105 26.8259C21.1629 26.7987 21.1268 26.7665 21.0994 26.73L20.9523 26.8403L20.8052 26.9506C20.865 27.0302 20.9402 27.0949 21.0281 27.1451L21.1193 26.9855ZM20.9523 26.8403L21.1034 26.7356L18.2934 22.6767L18.1423 22.7813L17.9911 22.886L20.8012 26.9449L20.9523 26.8403ZM18.1423 22.7813H17.9585V26.7096H18.1423H18.3261V22.7813H18.1423ZM18.1423 26.7096H17.9585C17.9585 26.7501 17.9461 26.7788 17.9155 26.8072L18.0406 26.9419L18.1657 27.0766C18.2707 26.9791 18.3261 26.853 18.3261 26.7096H18.1423ZM18.0406 26.9419L17.9106 26.8119C17.8835 26.8391 17.8533 26.8525 17.8083 26.8525V27.0363V27.2201C17.9472 27.2201 18.0719 27.1706 18.1706 27.0719L18.0406 26.9419ZM24.7261 26.7386L24.8186 26.5797L24.7261 26.7386ZM23.833 25.8237L23.6715 25.9115L23.6719 25.9123L23.833 25.8237ZM23.7096 23.4058L23.8797 23.4754L23.8801 23.4745L23.7096 23.4058ZM24.2469 22.578L24.1169 22.4481L24.2469 22.578ZM25.0529 22.048L25.1207 22.2189L25.123 22.2179L25.0529 22.048ZM27.0787 22.0117L27.0161 22.1845L27.017 22.1849L27.0787 22.0117ZM27.8483 22.382L27.7493 22.5371L27.7571 22.5416L27.8483 22.382ZM27.9427 22.4764L27.7894 22.5786L27.7976 22.5892L27.9427 22.4764ZM27.9137 22.854L28.0493 22.9783L28.054 22.9727L27.9137 22.854ZM27.5361 22.9048L27.4424 23.0634L27.4539 23.0692L27.5361 22.9048ZM25.1255 22.7305L25.2098 22.8938L25.2109 22.8933L25.1255 22.7305ZM24.4284 23.3985L24.2701 23.3051L24.2696 23.3059L24.4284 23.3985ZM24.4066 25.4824L24.2433 25.5668L24.2438 25.5678L24.4066 25.4824ZM25.0819 26.1868L25.1753 26.0285L25.0819 26.1868ZM26.8536 26.361L26.902 26.5384L26.9057 26.5373L26.8536 26.361ZM27.4199 26.1287L27.5096 26.2891L27.6038 26.2365V26.1287H27.4199ZM27.4199 24.8144H27.6038V24.6306H27.4199V24.8144ZM27.921 26.4917L27.7666 26.3919L27.7651 26.3943L27.921 26.4917ZM27.7249 26.666L27.6466 26.4996L27.6414 26.5022L27.7249 26.666ZM26.948 26.9637L26.9948 27.1415L26.9969 27.1409L26.948 26.9637ZM26.0621 27.0726V26.8888C25.5815 26.8888 25.169 26.7838 24.8186 26.5797L24.7261 26.7386L24.6336 26.8975C25.0481 27.1388 25.5263 27.2564 26.0621 27.2564V27.0726ZM24.7261 26.7386L24.8186 26.5797C24.465 26.3738 24.191 26.0931 23.9941 25.7351L23.833 25.8237L23.6719 25.9123C23.901 26.3288 24.2224 26.658 24.6336 26.8975L24.7261 26.7386ZM23.833 25.8237L23.9945 25.736C23.7981 25.3744 23.6973 24.9551 23.6973 24.4732H23.5135H23.3297C23.3297 25.0078 23.4419 25.4889 23.6715 25.9115L23.833 25.8237ZM23.5135 24.4732H23.6973C23.6973 24.1017 23.7592 23.77 23.8797 23.4754L23.7096 23.4058L23.5394 23.3362C23.3985 23.6806 23.3297 24.0604 23.3297 24.4732H23.5135ZM23.7096 23.4058L23.8801 23.4745C24.0023 23.1711 24.1683 22.9166 24.3769 22.708L24.2469 22.578L24.1169 22.4481C23.8704 22.6945 23.6782 22.9918 23.5391 23.3371L23.7096 23.4058ZM24.2469 22.578L24.3769 22.708C24.5915 22.4934 24.839 22.3306 25.1207 22.2188L25.0529 22.048L24.9851 21.8771C24.6568 22.0074 24.3669 22.198 24.1169 22.4481L24.2469 22.578ZM25.0529 22.048L25.123 22.2179C25.4042 22.1019 25.7093 22.043 26.0404 22.043V21.8592V21.6754C25.6647 21.6754 25.3115 21.7424 24.9827 21.8781L25.0529 22.048ZM26.0404 21.8592V22.043C26.438 22.043 26.7614 22.0923 27.0161 22.1845L27.0787 22.0117L27.1413 21.8388C26.8344 21.7277 26.4657 21.6754 26.0404 21.6754V21.8592ZM27.0787 22.0117L27.017 22.1849C27.2911 22.2824 27.535 22.4 27.7494 22.5369L27.8483 22.382L27.9473 22.227C27.7067 22.0735 27.4374 21.9442 27.1403 21.8385L27.0787 22.0117ZM27.8483 22.382L27.7571 22.5416C27.7593 22.5428 27.7714 22.5508 27.7898 22.5783L27.9427 22.4764L28.0957 22.3744C28.056 22.3148 28.0052 22.2599 27.9396 22.2224L27.8483 22.382ZM27.9427 22.4764L27.7976 22.5892C27.8011 22.5937 27.8097 22.6069 27.8097 22.6434H27.9936H28.1774C28.1774 22.5443 28.1521 22.4462 28.0878 22.3635L27.9427 22.4764ZM27.9936 22.6434H27.8097C27.8097 22.6744 27.8005 22.7032 27.7734 22.7352L27.9137 22.854L28.054 22.9727C28.1334 22.8789 28.1774 22.7672 28.1774 22.6434H27.9936ZM27.9137 22.854L27.7782 22.7297C27.7675 22.7414 27.7466 22.7573 27.6886 22.7573V22.9411V23.1249C27.8243 23.1249 27.9534 23.0827 28.0492 22.9782L27.9137 22.854ZM27.6886 22.9411V22.7573C27.6644 22.7573 27.6416 22.752 27.6183 22.7404L27.5361 22.9048L27.4539 23.0692C27.5274 23.1059 27.6063 23.1249 27.6886 23.1249V22.9411ZM27.5361 22.9048L27.6296 22.7465C27.4052 22.6139 27.1724 22.5089 26.9313 22.432L26.8754 22.6071L26.8195 22.7822C27.0334 22.8505 27.2411 22.9439 27.4426 23.063L27.5361 22.9048ZM26.8754 22.6071L26.9313 22.432C26.6828 22.3527 26.4094 22.3143 26.113 22.3143V22.4982V22.682C26.378 22.682 26.6129 22.7163 26.8195 22.7822L26.8754 22.6071ZM26.113 22.4982V22.3143C25.7229 22.3143 25.364 22.3978 25.0401 22.5677L25.1255 22.7305L25.2109 22.8933C25.4775 22.7534 25.777 22.682 26.113 22.682V22.4982ZM25.1255 22.7305L25.0411 22.5672C24.7184 22.7339 24.461 22.9816 24.2701 23.3051L24.4284 23.3985L24.5867 23.492C24.7443 23.2249 24.9517 23.0272 25.2098 22.8938L25.1255 22.7305ZM24.4284 23.3985L24.2696 23.3059C24.08 23.631 23.9904 24.0232 23.9904 24.4732H24.1743H24.3581C24.3581 24.0712 24.438 23.7469 24.5872 23.4912L24.4284 23.3985ZM24.1743 24.4732H23.9904C23.9904 24.8721 24.0736 25.238 24.2433 25.5668L24.4066 25.4824L24.57 25.3981C24.4299 25.1267 24.3581 24.8197 24.3581 24.4732H24.1743ZM24.4066 25.4824L24.2438 25.5678C24.4151 25.8943 24.6646 26.1539 24.9885 26.3451L25.0819 26.1868L25.1753 26.0285C24.9086 25.8711 24.708 25.6612 24.5694 25.397L24.4066 25.4824ZM25.0819 26.1868L24.9885 26.3451C25.3176 26.5393 25.7071 26.632 26.1493 26.632V26.4482V26.2643C25.7588 26.2643 25.4368 26.1828 25.1753 26.0285L25.0819 26.1868ZM26.1493 26.4482V26.632C26.4196 26.632 26.6709 26.6014 26.902 26.5384L26.8536 26.361L26.8052 26.1837C26.6103 26.2368 26.3921 26.2643 26.1493 26.2643V26.4482ZM26.8536 26.361L26.9057 26.5373C27.1295 26.4712 27.3313 26.3888 27.5096 26.2891L27.4199 26.1287L27.3303 25.9682C27.1795 26.0525 27.0037 26.125 26.8015 26.1847L26.8536 26.361ZM27.4199 26.1287H27.6038V24.8144H27.4199H27.2361V26.1287H27.4199ZM27.4199 24.8144V24.6306H26.2219V24.8144V24.9983H27.4199V24.8144ZM26.2219 24.8144V24.6306C26.1882 24.6306 26.1648 24.6209 26.1413 24.5973L26.0113 24.7273L25.8813 24.8573C25.974 24.9499 26.0909 24.9983 26.2219 24.9983V24.8144ZM26.0113 24.7273L26.1413 24.5973C26.1177 24.5738 26.108 24.5504 26.108 24.5167H25.9242H25.7404C25.7404 24.6477 25.7887 24.7647 25.8813 24.8573L26.0113 24.7273ZM25.9242 24.5167H26.108C26.108 24.4831 26.1177 24.4597 26.1413 24.4361L26.0113 24.3062L25.8813 24.1762C25.7887 24.2688 25.7404 24.3858 25.7404 24.5167H25.9242ZM26.0113 24.3062L26.1413 24.4361C26.1648 24.4126 26.1882 24.4028 26.2219 24.4028V24.219V24.0352C26.0909 24.0352 25.974 24.0835 25.8813 24.1762L26.0113 24.3062ZM26.2219 24.219V24.4028H27.6523V24.219V24.0352H26.2219V24.219ZM27.6523 24.219V24.4028C27.7009 24.4028 27.7363 24.4178 27.7692 24.4507L27.8992 24.3207L28.0292 24.1907C27.9265 24.0881 27.7973 24.0352 27.6523 24.0352V24.219ZM27.8992 24.3207L27.7692 24.4507C27.8021 24.4836 27.817 24.5189 27.817 24.5676H28.0008H28.1847C28.1847 24.4225 28.1318 24.2933 28.0292 24.1907L27.8992 24.3207ZM28.0008 24.5676H27.817V26.2158H28.0008H28.1847V24.5676H28.0008ZM28.0008 26.2158H27.817C27.817 26.2834 27.7999 26.3405 27.7666 26.3919L27.921 26.4917L28.0753 26.5916C28.1485 26.4784 28.1847 26.3515 28.1847 26.2158H28.0008ZM27.921 26.4917L27.7651 26.3943C27.7353 26.4419 27.6968 26.476 27.6466 26.4997L27.7249 26.666L27.8032 26.8323C27.9176 26.7785 28.0098 26.6964 28.0768 26.5892L27.921 26.4917ZM27.7249 26.666L27.6414 26.5022C27.4162 26.6171 27.169 26.712 26.8991 26.7865L26.948 26.9637L26.9969 27.1409C27.2885 27.0604 27.5592 26.9569 27.8085 26.8297L27.7249 26.666ZM26.948 26.9637L26.9012 26.7859C26.642 26.8541 26.3626 26.8888 26.0621 26.8888V27.0726V27.2564C26.391 27.2564 26.7021 27.2185 26.9948 27.1415L26.948 26.9637Z" fill="white" mask="url(#path-8-outside-1_14030_15816)"/><mask id="mask1_14030_15816" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="6" width="26" height="29"><path d="M30.4779 34.5H9.52206C8.40531 34.5 7.5 33.6046 7.5 32.5V8.5C7.5 7.39543 8.40531 6.5 9.52206 6.5H23.125L32.5 15.7727V32.5C32.5 33.6046 31.5947 34.5 30.4779 34.5Z" fill="url(#paint2_linear_14030_15816)"/></mask><g mask="url(#mask1_14030_15816)"><ellipse opacity="0.05" cx="6.16728" cy="5.36353" rx="20.5423" ry="19.5" fill="url(#paint3_linear_14030_15816)"/><ellipse opacity="0.07" cx="6.16751" cy="5.36375" rx="12.9136" ry="12.2273" fill="url(#paint4_linear_14030_15816)"/></g><g filter="url(#filter1_d_14030_15816)"><path d="M32.5 15.7727H25.1471C24.0303 15.7727 23.125 14.8674 23.125 13.7507V6.5L32.5 15.7727Z" fill="url(#paint5_linear_14030_15816)"/></g></g><defs><filter id="filter0_f_14030_15816" x="5.29435" y="16.4609" width="29.5949" height="14.8056" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="1.79228" result="effect1_foregroundBlur_14030_15816"/></filter><filter id="filter1_d_14030_15816" x="21.011" y="4.29412" width="13.9706" height="13.8683" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="0.183823" dy="0.0919117"/><feGaussianBlur stdDeviation="1.1489"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.33 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_14030_15816"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_14030_15816" result="shape"/></filter><linearGradient id="paint0_linear_14030_15816" x1="20" y1="6.5" x2="20" y2="34.5" gradientUnits="userSpaceOnUse"><stop stop-color="#FF7979"/><stop offset="1" stop-color="#E85555"/></linearGradient><linearGradient id="paint1_linear_14030_15816" x1="20" y1="6.5" x2="20" y2="34.5" gradientUnits="userSpaceOnUse"><stop stop-color="#4DB4DA"/><stop offset="1" stop-color="#3BA5CC"/></linearGradient><linearGradient id="paint2_linear_14030_15816" x1="20" y1="6.5" x2="20" y2="34.5" gradientUnits="userSpaceOnUse"><stop stop-color="#FF8777"/><stop offset="1" stop-color="#F0695F"/></linearGradient><linearGradient id="paint3_linear_14030_15816" x1="7.6588" y1="6.03363" x2="13.7698" y2="22.4312" gradientUnits="userSpaceOnUse"><stop stop-color="white" stop-opacity="0"/><stop offset="1" stop-color="white"/></linearGradient><linearGradient id="paint4_linear_14030_15816" x1="7.10513" y1="5.78393" x2="10.9296" y2="16.0722" gradientUnits="userSpaceOnUse"><stop stop-color="white" stop-opacity="0"/><stop offset="1" stop-color="white"/></linearGradient><linearGradient id="paint5_linear_14030_15816" x1="27.8125" y1="6.5" x2="27.8125" y2="15.7727" gradientUnits="userSpaceOnUse"><stop stop-color="#4CBAE2"/><stop offset="1" stop-color="#7AD4F5"/></linearGradient><clipPath id="clip0_14030_15816"><rect width="17" height="18" fill="white" transform="translate(11.5 13)"/></clipPath></defs></svg>';
const docSvg = '<svg width="inherit" height="inherit" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="0.5" width="40" height="40" rx="14" fill="#D7E9F6"/><mask id="mask0_14030_15841" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="6" width="26" height="29"><path d="M30.4779 34.5H9.52206C8.40531 34.5 7.5 33.6046 7.5 32.5V8.5C7.5 7.39543 8.40531 6.5 9.52206 6.5H23.125L32.5 15.7727V32.5C32.5 33.6046 31.5947 34.5 30.4779 34.5Z" fill="url(#paint0_linear_14030_15841)"/></mask><g mask="url(#mask0_14030_15841)"><path d="M30.4779 34.5H9.52206C8.40531 34.5 7.5 33.6046 7.5 32.5V8.5C7.5 7.39543 8.40531 6.5 9.52206 6.5H23.125L32.5 15.7727V32.5C32.5 33.6046 31.5947 34.5 30.4779 34.5Z" fill="url(#paint1_linear_14030_15841)"/><g opacity="0.23" filter="url(#filter0_f_14030_15841)"><rect x="8.87891" y="20.0454" width="22.4265" height="7.63637" fill="#B0B7BD" style="mix-blend-mode:darken"/></g><g opacity="0.12" clip-path="url(#clip0_14030_15841)"><path d="M22.9336 30.6802H10.9336" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M24.9336 18.6802H10.9336" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M28.9336 24.6802H10.9336" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><mask id="path-8-outside-1_14030_15841" maskUnits="userSpaceOnUse" x="11" y="21" width="18" height="7" fill="black"><rect fill="white" x="11" y="21" width="18" height="7"/><path d="M12.3258 27C12.2338 27 12.1563 26.9685 12.0934 26.9056C12.0305 26.8427 11.999 26.7652 11.999 26.6733V22.2658C11.999 22.1738 12.0305 22.0964 12.0934 22.0335C12.1563 21.9657 12.2338 21.9318 12.3258 21.9318H13.7852C14.2209 21.9318 14.5985 22.0068 14.918 22.1569C15.2374 22.3021 15.5037 22.4982 15.7167 22.745C15.9297 22.9871 16.087 23.2581 16.1886 23.5583C16.2951 23.8584 16.3484 24.1609 16.3484 24.4659C16.3484 24.7709 16.2951 25.0734 16.1886 25.3735C16.087 25.6737 15.9297 25.9472 15.7167 26.194C15.5037 26.4361 15.2374 26.6321 14.918 26.7822C14.5985 26.9274 14.2209 27 13.7852 27H12.3258ZM12.6598 26.3828H13.7054C14.112 26.3828 14.4629 26.3029 14.7582 26.1432C15.0583 25.9786 15.2883 25.7535 15.448 25.4679C15.6126 25.1775 15.6949 24.8435 15.6949 24.4659C15.6949 24.0883 15.6126 23.7567 15.448 23.4711C15.2883 23.1807 15.0583 22.9556 14.7582 22.7959C14.4629 22.6313 14.112 22.549 13.7054 22.549H12.6598V26.3828ZM20.2038 27.0726C19.6859 27.0726 19.2381 26.9613 18.8605 26.7386C18.483 26.5159 18.1901 26.2085 17.9819 25.8165C17.7738 25.4244 17.6649 24.9742 17.6552 24.4659C17.6649 23.9576 17.7738 23.5074 17.9819 23.1153C18.1901 22.7233 18.483 22.4159 18.8605 22.1932C19.2381 21.9705 19.6859 21.8592 20.2038 21.8592C20.7218 21.8592 21.1695 21.9705 21.5471 22.1932C21.9247 22.4159 22.2175 22.7233 22.4257 23.1153C22.6338 23.5074 22.7428 23.9576 22.7524 24.4659C22.7428 24.9742 22.6338 25.4244 22.4257 25.8165C22.2175 26.2085 21.9247 26.5159 21.5471 26.7386C21.1695 26.9613 20.7218 27.0726 20.2038 27.0726ZM20.2038 26.4554C20.6056 26.4554 20.9469 26.3683 21.2276 26.194C21.5084 26.0149 21.7214 25.7753 21.8666 25.4752C22.0167 25.1751 22.0917 24.8386 22.0917 24.4659C22.0917 24.0932 22.0167 23.7567 21.8666 23.4566C21.7214 23.1565 21.5084 22.9193 21.2276 22.745C20.9469 22.5659 20.6056 22.4764 20.2038 22.4764C19.802 22.4764 19.4608 22.5659 19.18 22.745C18.8993 22.9193 18.6838 23.1565 18.5338 23.4566C18.3886 23.7567 18.316 24.0932 18.316 24.4659C18.316 24.8386 18.3886 25.1751 18.5338 25.4752C18.6838 25.7753 18.8993 26.0149 19.18 26.194C19.4608 26.3683 19.802 26.4554 20.2038 26.4554ZM26.5973 27.0726C26.1181 27.0726 25.6849 26.9685 25.2976 26.7604C24.9152 26.5474 24.6126 26.2473 24.39 25.86C24.1673 25.4679 24.056 25.0032 24.056 24.4659C24.056 23.9237 24.1673 23.459 24.39 23.0718C24.6126 22.6845 24.9152 22.3868 25.2976 22.1787C25.6849 21.9657 26.1181 21.8592 26.5973 21.8592C26.9555 21.8592 27.2653 21.9028 27.5267 21.9899C27.7881 22.077 28.0302 22.1835 28.2528 22.3094C28.3012 22.3336 28.3376 22.3675 28.3618 22.411C28.3908 22.4498 28.4077 22.503 28.4126 22.5708C28.4174 22.6482 28.3932 22.716 28.34 22.7741C28.2867 22.8322 28.2141 22.8612 28.1221 22.8612C28.0737 22.8612 28.0302 22.8515 27.9914 22.8322C27.7978 22.7305 27.5993 22.6482 27.396 22.5853C27.1927 22.5224 26.9483 22.4909 26.6627 22.4909C26.2367 22.4909 25.8785 22.578 25.588 22.7523C25.2976 22.9266 25.0798 23.1638 24.9345 23.4639C24.7893 23.7592 24.7167 24.0932 24.7167 24.4659C24.7167 24.8386 24.7893 25.1751 24.9345 25.4752C25.0798 25.7705 25.2976 26.0052 25.588 26.1795C25.8785 26.3538 26.2367 26.4409 26.6627 26.4409C26.9483 26.4409 27.1927 26.4094 27.396 26.3465C27.5993 26.2836 27.7978 26.2013 27.9914 26.0996C28.0302 26.0803 28.0737 26.0706 28.1221 26.0706C28.2141 26.0706 28.2867 26.0996 28.34 26.1577C28.3932 26.2158 28.4174 26.2836 28.4126 26.361C28.4077 26.4288 28.3908 26.4845 28.3618 26.528C28.3376 26.5668 28.3012 26.5982 28.2528 26.6224C28.0302 26.7483 27.7881 26.8548 27.5267 26.9419C27.2653 27.029 26.9555 27.0726 26.5973 27.0726Z"/></mask><path d="M12.3258 27C12.2338 27 12.1563 26.9685 12.0934 26.9056C12.0305 26.8427 11.999 26.7652 11.999 26.6733V22.2658C11.999 22.1738 12.0305 22.0964 12.0934 22.0335C12.1563 21.9657 12.2338 21.9318 12.3258 21.9318H13.7852C14.2209 21.9318 14.5985 22.0068 14.918 22.1569C15.2374 22.3021 15.5037 22.4982 15.7167 22.745C15.9297 22.9871 16.087 23.2581 16.1886 23.5583C16.2951 23.8584 16.3484 24.1609 16.3484 24.4659C16.3484 24.7709 16.2951 25.0734 16.1886 25.3735C16.087 25.6737 15.9297 25.9472 15.7167 26.194C15.5037 26.4361 15.2374 26.6321 14.918 26.7822C14.5985 26.9274 14.2209 27 13.7852 27H12.3258ZM12.6598 26.3828H13.7054C14.112 26.3828 14.4629 26.3029 14.7582 26.1432C15.0583 25.9786 15.2883 25.7535 15.448 25.4679C15.6126 25.1775 15.6949 24.8435 15.6949 24.4659C15.6949 24.0883 15.6126 23.7567 15.448 23.4711C15.2883 23.1807 15.0583 22.9556 14.7582 22.7959C14.4629 22.6313 14.112 22.549 13.7054 22.549H12.6598V26.3828ZM20.2038 27.0726C19.6859 27.0726 19.2381 26.9613 18.8605 26.7386C18.483 26.5159 18.1901 26.2085 17.9819 25.8165C17.7738 25.4244 17.6649 24.9742 17.6552 24.4659C17.6649 23.9576 17.7738 23.5074 17.9819 23.1153C18.1901 22.7233 18.483 22.4159 18.8605 22.1932C19.2381 21.9705 19.6859 21.8592 20.2038 21.8592C20.7218 21.8592 21.1695 21.9705 21.5471 22.1932C21.9247 22.4159 22.2175 22.7233 22.4257 23.1153C22.6338 23.5074 22.7428 23.9576 22.7524 24.4659C22.7428 24.9742 22.6338 25.4244 22.4257 25.8165C22.2175 26.2085 21.9247 26.5159 21.5471 26.7386C21.1695 26.9613 20.7218 27.0726 20.2038 27.0726ZM20.2038 26.4554C20.6056 26.4554 20.9469 26.3683 21.2276 26.194C21.5084 26.0149 21.7214 25.7753 21.8666 25.4752C22.0167 25.1751 22.0917 24.8386 22.0917 24.4659C22.0917 24.0932 22.0167 23.7567 21.8666 23.4566C21.7214 23.1565 21.5084 22.9193 21.2276 22.745C20.9469 22.5659 20.6056 22.4764 20.2038 22.4764C19.802 22.4764 19.4608 22.5659 19.18 22.745C18.8993 22.9193 18.6838 23.1565 18.5338 23.4566C18.3886 23.7567 18.316 24.0932 18.316 24.4659C18.316 24.8386 18.3886 25.1751 18.5338 25.4752C18.6838 25.7753 18.8993 26.0149 19.18 26.194C19.4608 26.3683 19.802 26.4554 20.2038 26.4554ZM26.5973 27.0726C26.1181 27.0726 25.6849 26.9685 25.2976 26.7604C24.9152 26.5474 24.6126 26.2473 24.39 25.86C24.1673 25.4679 24.056 25.0032 24.056 24.4659C24.056 23.9237 24.1673 23.459 24.39 23.0718C24.6126 22.6845 24.9152 22.3868 25.2976 22.1787C25.6849 21.9657 26.1181 21.8592 26.5973 21.8592C26.9555 21.8592 27.2653 21.9028 27.5267 21.9899C27.7881 22.077 28.0302 22.1835 28.2528 22.3094C28.3012 22.3336 28.3376 22.3675 28.3618 22.411C28.3908 22.4498 28.4077 22.503 28.4126 22.5708C28.4174 22.6482 28.3932 22.716 28.34 22.7741C28.2867 22.8322 28.2141 22.8612 28.1221 22.8612C28.0737 22.8612 28.0302 22.8515 27.9914 22.8322C27.7978 22.7305 27.5993 22.6482 27.396 22.5853C27.1927 22.5224 26.9483 22.4909 26.6627 22.4909C26.2367 22.4909 25.8785 22.578 25.588 22.7523C25.2976 22.9266 25.0798 23.1638 24.9345 23.4639C24.7893 23.7592 24.7167 24.0932 24.7167 24.4659C24.7167 24.8386 24.7893 25.1751 24.9345 25.4752C25.0798 25.7705 25.2976 26.0052 25.588 26.1795C25.8785 26.3538 26.2367 26.4409 26.6627 26.4409C26.9483 26.4409 27.1927 26.4094 27.396 26.3465C27.5993 26.2836 27.7978 26.2013 27.9914 26.0996C28.0302 26.0803 28.0737 26.0706 28.1221 26.0706C28.2141 26.0706 28.2867 26.0996 28.34 26.1577C28.3932 26.2158 28.4174 26.2836 28.4126 26.361C28.4077 26.4288 28.3908 26.4845 28.3618 26.528C28.3376 26.5668 28.3012 26.5982 28.2528 26.6224C28.0302 26.7483 27.7881 26.8548 27.5267 26.9419C27.2653 27.029 26.9555 27.0726 26.5973 27.0726Z" fill="white"/><path d="M12.0934 26.9056L12.2234 26.7756L12.0934 26.9056ZM12.0934 22.0335L12.2235 22.1635L12.2281 22.1585L12.0934 22.0335ZM14.918 22.1569L14.8398 22.3233L14.8419 22.3242L14.918 22.1569ZM15.7167 22.745L15.5775 22.8651L15.5787 22.8665L15.7167 22.745ZM16.1886 23.5583L16.0145 23.6172L16.0154 23.6197L16.1886 23.5583ZM16.1886 25.3735L16.0154 25.3121L16.0145 25.3146L16.1886 25.3735ZM15.7167 26.194L15.8547 26.3155L15.8559 26.3141L15.7167 26.194ZM14.918 26.7822L14.994 26.9495L14.9961 26.9486L14.918 26.7822ZM12.6598 26.3828H12.476V26.5666H12.6598V26.3828ZM14.7582 26.1432L14.8457 26.3049L14.8466 26.3044L14.7582 26.1432ZM15.448 25.4679L15.2881 25.3773L15.2876 25.3782L15.448 25.4679ZM15.448 23.4711L15.2869 23.5597L15.2887 23.5629L15.448 23.4711ZM14.7582 22.7959L14.6687 22.9565L14.6718 22.9581L14.7582 22.7959ZM12.6598 22.549V22.3652H12.476V22.549H12.6598ZM12.3258 27V26.8162C12.2807 26.8162 12.2506 26.8028 12.2234 26.7756L12.0934 26.9056L11.9634 27.0356C12.0621 27.1343 12.1869 27.1838 12.3258 27.1838V27ZM12.0934 26.9056L12.2234 26.7756C12.1962 26.7484 12.1829 26.7183 12.1829 26.6733H11.999H11.8152C11.8152 26.8122 11.8648 26.9369 11.9634 27.0356L12.0934 26.9056ZM11.999 26.6733H12.1829V22.2658H11.999H11.8152V26.6733H11.999ZM11.999 22.2658H12.1829C12.1829 22.2208 12.1962 22.1906 12.2234 22.1634L12.0934 22.0335L11.9634 21.9035C11.8648 22.0021 11.8152 22.1269 11.8152 22.2658H11.999ZM12.0934 22.0335L12.2281 22.1585C12.2565 22.128 12.2852 22.1156 12.3258 22.1156V21.9318V21.748C12.1824 21.748 12.0562 21.8034 11.9587 21.9084L12.0934 22.0335ZM12.3258 21.9318V22.1156H13.7852V21.9318V21.748H12.3258V21.9318ZM13.7852 21.9318V22.1156C14.2001 22.1156 14.5498 22.1871 14.8398 22.3233L14.918 22.1569L14.9961 21.9905C14.6471 21.8266 14.2417 21.748 13.7852 21.748V21.9318ZM14.918 22.1569L14.8419 22.3242C15.139 22.4593 15.3832 22.6399 15.5775 22.8651L15.7167 22.745L15.8559 22.625C15.6242 22.3564 15.3358 22.1449 14.994 21.9895L14.918 22.1569ZM15.7167 22.745L15.5787 22.8665C15.7759 23.0906 15.9208 23.3405 16.0145 23.6172L16.1886 23.5583L16.3627 23.4993C16.2532 23.1758 16.0834 22.8835 15.8547 22.6236L15.7167 22.745ZM16.1886 23.5583L16.0154 23.6197C16.1152 23.901 16.1646 24.1828 16.1646 24.4659H16.3484H16.5322C16.5322 24.1391 16.4751 23.8158 16.3619 23.4968L16.1886 23.5583ZM16.3484 24.4659H16.1646C16.1646 24.749 16.1152 25.0308 16.0154 25.3121L16.1886 25.3735L16.3619 25.435C16.4751 25.116 16.5322 24.7927 16.5322 24.4659H16.3484ZM16.1886 25.3735L16.0145 25.3146C15.9207 25.5916 15.7755 25.8445 15.5775 26.0739L15.7167 26.194L15.8559 26.3141C16.0839 26.0498 16.2533 25.7557 16.3627 25.4325L16.1886 25.3735ZM15.7167 26.194L15.5787 26.0726C15.3839 26.294 15.1387 26.4754 14.8398 26.6158L14.918 26.7822L14.9961 26.9486C15.3362 26.7888 15.6235 26.5782 15.8547 26.3155L15.7167 26.194ZM14.918 26.7822L14.8419 26.6148C14.5513 26.7469 14.2008 26.8162 13.7852 26.8162V27V27.1838C14.241 27.1838 14.6456 27.1079 14.994 26.9495L14.918 26.7822ZM13.7852 27V26.8162H12.3258V27V27.1838H13.7852V27ZM12.6598 26.3828V26.5666H13.7054V26.3828V26.199H12.6598V26.3828ZM13.7054 26.3828V26.5666C14.1361 26.5666 14.5184 26.4819 14.8457 26.3049L14.7582 26.1432L14.6708 25.9815C14.4075 26.124 14.0878 26.199 13.7054 26.199V26.3828ZM14.7582 26.1432L14.8466 26.3044C15.1755 26.124 15.4311 25.8748 15.6084 25.5577L15.448 25.4679L15.2876 25.3782C15.1455 25.6323 14.9412 25.8332 14.6698 25.982L14.7582 26.1432ZM15.448 25.4679L15.6079 25.5585C15.7902 25.237 15.8787 24.871 15.8787 24.4659H15.6949H15.5111C15.5111 24.8159 15.435 25.118 15.2881 25.3773L15.448 25.4679ZM15.6949 24.4659H15.8787C15.8787 24.0609 15.7902 23.6967 15.6073 23.3794L15.448 23.4711L15.2887 23.5629C15.435 23.8168 15.5111 24.1158 15.5111 24.4659H15.6949ZM15.448 23.4711L15.6091 23.3826C15.4317 23.06 15.1754 22.8097 14.8446 22.6336L14.7582 22.7959L14.6718 22.9581C14.9413 23.1016 15.1449 23.3014 15.2869 23.5597L15.448 23.4711ZM14.7582 22.7959L14.8477 22.6353C14.52 22.4526 14.137 22.3652 13.7054 22.3652V22.549V22.7328C14.087 22.7328 14.4059 22.8099 14.6687 22.9564L14.7582 22.7959ZM13.7054 22.549V22.3652H12.6598V22.549V22.7328H13.7054V22.549ZM12.6598 22.549H12.476V26.3828H12.6598H12.8436V22.549H12.6598ZM18.8605 26.7386L18.9539 26.5803L18.8605 26.7386ZM17.9819 25.8165L17.8196 25.9026L17.9819 25.8165ZM17.6552 24.4659L17.4713 24.4624L17.4714 24.4694L17.6552 24.4659ZM17.9819 23.1153L18.1443 23.2015L17.9819 23.1153ZM18.8605 22.1932L18.7671 22.0349H18.7671L18.8605 22.1932ZM21.5471 22.1932L21.6405 22.0349L21.5471 22.1932ZM22.4257 23.1153L22.2633 23.2015H22.2633L22.4257 23.1153ZM22.7524 24.4659L22.9364 24.4694L22.9362 24.4624L22.7524 24.4659ZM22.4257 25.8165L22.2633 25.7303H22.2633L22.4257 25.8165ZM21.5471 26.7386L21.4537 26.5803L21.5471 26.7386ZM21.2276 26.194L21.3246 26.3502L21.3265 26.349L21.2276 26.194ZM21.8666 25.4752L21.7022 25.393L21.7011 25.3951L21.8666 25.4752ZM21.8666 23.4566L21.7011 23.5367L21.7022 23.5388L21.8666 23.4566ZM21.2276 22.745L21.1288 22.9L21.1307 22.9012L21.2276 22.745ZM19.18 22.745L19.277 22.9012L19.2789 22.9L19.18 22.745ZM18.5338 23.4566L18.3694 23.3744L18.3683 23.3766L18.5338 23.4566ZM18.5338 25.4752L18.3683 25.5553L18.3694 25.5574L18.5338 25.4752ZM19.18 26.194L19.0811 26.349L19.0831 26.3502L19.18 26.194ZM20.2038 27.0726V26.8888C19.7127 26.8888 19.2984 26.7834 18.9539 26.5803L18.8605 26.7386L18.7671 26.8969C19.1778 27.1391 19.659 27.2564 20.2038 27.2564V27.0726ZM18.8605 26.7386L18.9539 26.5803C18.6059 26.375 18.3368 26.0928 18.1443 25.7303L17.9819 25.8165L17.8196 25.9026C18.0434 26.3243 18.36 26.6568 18.7671 26.8969L18.8605 26.7386ZM17.9819 25.8165L18.1443 25.7303C17.9515 25.3671 17.8482 24.946 17.839 24.4624L17.6552 24.4659L17.4714 24.4694C17.4816 25.0023 17.596 25.4816 17.8196 25.9026L17.9819 25.8165ZM17.6552 24.4659L17.839 24.4694C17.8482 23.9858 17.9515 23.5647 18.1443 23.2015L17.9819 23.1153L17.8196 23.0292C17.596 23.4502 17.4816 23.9295 17.4714 24.4624L17.6552 24.4659ZM17.9819 23.1153L18.1443 23.2015C18.3368 22.839 18.6059 22.5568 18.9539 22.3515L18.8605 22.1932L18.7671 22.0349C18.36 22.275 18.0434 22.6075 17.8196 23.0292L17.9819 23.1153ZM18.8605 22.1932L18.9539 22.3515C19.2984 22.1484 19.7127 22.043 20.2038 22.043V21.8592V21.6754C19.659 21.6754 19.1778 21.7927 18.7671 22.0349L18.8605 22.1932ZM20.2038 21.8592V22.043C20.6949 22.043 21.1092 22.1484 21.4537 22.3515L21.5471 22.1932L21.6405 22.0349C21.2299 21.7927 20.7486 21.6754 20.2038 21.6754V21.8592ZM21.5471 22.1932L21.4537 22.3515C21.8017 22.5568 22.0709 22.839 22.2633 23.2015L22.4257 23.1153L22.5881 23.0292C22.3642 22.6075 22.0477 22.275 21.6405 22.0349L21.5471 22.1932ZM22.4257 23.1153L22.2633 23.2015C22.4561 23.5647 22.5594 23.9858 22.5687 24.4694L22.7524 24.4659L22.9362 24.4624C22.9261 23.9295 22.8116 23.4502 22.5881 23.0292L22.4257 23.1153ZM22.7524 24.4659L22.5687 24.4624C22.5594 24.946 22.4561 25.3671 22.2633 25.7303L22.4257 25.8165L22.5881 25.9026C22.8116 25.4816 22.9261 25.0023 22.9362 24.4694L22.7524 24.4659ZM22.4257 25.8165L22.2633 25.7303C22.0709 26.0928 21.8017 26.375 21.4537 26.5803L21.5471 26.7386L21.6405 26.8969C22.0477 26.6568 22.3642 26.3243 22.5881 25.9026L22.4257 25.8165ZM21.5471 26.7386L21.4537 26.5803C21.1092 26.7834 20.6949 26.8888 20.2038 26.8888V27.0726V27.2564C20.7486 27.2564 21.2299 27.1391 21.6405 26.8969L21.5471 26.7386ZM20.2038 26.4554V26.6392C20.6324 26.6392 21.009 26.5461 21.3246 26.3502L21.2276 26.194L21.1307 26.0378C20.8847 26.1905 20.5788 26.2716 20.2038 26.2716V26.4554ZM21.2276 26.194L21.3265 26.349C21.636 26.1516 21.872 25.886 22.0321 25.5553L21.8666 25.4752L21.7011 25.3951C21.5707 25.6646 21.3808 25.8783 21.1288 26.0391L21.2276 26.194ZM21.8666 25.4752L22.031 25.5574C22.1952 25.229 22.2755 24.864 22.2755 24.4659H22.0917H21.9079C21.9079 24.8133 21.8381 25.1211 21.7022 25.393L21.8666 25.4752ZM22.0917 24.4659H22.2755C22.2755 24.0678 22.1952 23.7028 22.031 23.3744L21.8666 23.4566L21.7022 23.5388C21.8381 23.8107 21.9079 24.1185 21.9079 24.4659H22.0917ZM21.8666 23.4566L22.0321 23.3766C21.8718 23.0454 21.6352 22.7817 21.3246 22.5889L21.2276 22.745L21.1307 22.9012C21.3816 23.0569 21.5709 23.2676 21.7011 23.5367L21.8666 23.4566ZM21.2276 22.745L21.3265 22.5901C21.0106 22.3885 20.6333 22.2926 20.2038 22.2926V22.4764V22.6602C20.5779 22.6602 20.8831 22.7433 21.1288 22.9L21.2276 22.745ZM20.2038 22.4764V22.2926C19.7743 22.2926 19.397 22.3885 19.0812 22.5901L19.18 22.745L19.2789 22.9C19.5245 22.7433 19.8298 22.6602 20.2038 22.6602V22.4764ZM19.18 22.745L19.0831 22.5889C18.7729 22.7813 18.5344 23.0444 18.3694 23.3744L18.5338 23.4566L18.6982 23.5388C18.8333 23.2686 19.0256 23.0573 19.277 22.9012L19.18 22.745ZM18.5338 23.4566L18.3683 23.3766C18.2097 23.7044 18.1321 24.0687 18.1321 24.4659H18.316H18.4998C18.4998 24.1176 18.5675 23.809 18.6993 23.5367L18.5338 23.4566ZM18.316 24.4659H18.1321C18.1321 24.8631 18.2097 25.2274 18.3683 25.5553L18.5338 25.4752L18.6993 25.3951C18.5675 25.1228 18.4998 24.8142 18.4998 24.4659H18.316ZM18.5338 25.4752L18.3694 25.5574C18.5342 25.887 18.7721 26.1519 19.0812 26.349L19.18 26.194L19.2789 26.0391C19.0264 25.878 18.8335 25.6636 18.6982 25.393L18.5338 25.4752ZM19.18 26.194L19.0831 26.3502C19.3987 26.5461 19.7752 26.6392 20.2038 26.6392V26.4554V26.2716C19.8289 26.2716 19.5229 26.1905 19.277 26.0378L19.18 26.194ZM25.2976 26.7604L25.2081 26.921L25.2106 26.9223L25.2976 26.7604ZM24.39 25.86L24.2301 25.9508L24.2306 25.9516L24.39 25.86ZM24.39 23.0718L24.5493 23.1634L24.39 23.0718ZM25.2976 22.1787L25.3855 22.3401L25.3862 22.3397L25.2976 22.1787ZM27.5267 21.9899L27.5849 21.8155L27.5267 21.9899ZM28.2528 22.3094L28.1623 22.4696L28.1706 22.4738L28.2528 22.3094ZM28.3618 22.411L28.2011 22.5003L28.2072 22.5113L28.2147 22.5213L28.3618 22.411ZM28.4126 22.5708L28.5961 22.5593L28.5959 22.5577L28.4126 22.5708ZM28.34 22.7741L28.4755 22.8983V22.8983L28.34 22.7741ZM27.9914 22.8322L27.906 22.995L27.9092 22.9966L27.9914 22.8322ZM27.396 22.5853L27.4504 22.4097L27.396 22.5853ZM25.588 22.7523L25.4935 22.5947L25.588 22.7523ZM24.9345 23.4639L25.0995 23.545L25.1 23.5439L24.9345 23.4639ZM24.9345 25.4752L24.7691 25.5553L24.7696 25.5563L24.9345 25.4752ZM25.588 26.1795L25.4935 26.3371L25.588 26.1795ZM27.396 26.3465L27.4504 26.5221L27.396 26.3465ZM27.9914 26.0996L27.9092 25.9352L27.906 25.9369L27.9914 26.0996ZM28.34 26.1577L28.4755 26.0335V26.0335L28.34 26.1577ZM28.4126 26.361L28.5959 26.3741L28.596 26.3725L28.4126 26.361ZM28.3618 26.528L28.2087 26.426L28.2059 26.4306L28.3618 26.528ZM28.2528 26.6224L28.1705 26.4578L28.1624 26.4624L28.2528 26.6224ZM27.5267 26.9419L27.5849 27.1163L27.5267 26.9419ZM26.5973 27.0726V26.8888C26.1457 26.8888 25.7428 26.791 25.3846 26.5985L25.2976 26.7604L25.2106 26.9223C25.6269 27.1461 26.0905 27.2564 26.5973 27.2564V27.0726ZM25.2976 26.7604L25.387 26.5998C25.0344 26.4034 24.7557 26.1274 24.5493 25.7684L24.39 25.86L24.2306 25.9516C24.4695 26.3672 24.796 26.6914 25.2082 26.921L25.2976 26.7604ZM24.39 25.86L24.5498 25.7692C24.3456 25.4097 24.2398 24.9775 24.2398 24.4659H24.056H23.8721C23.8721 25.0289 23.989 25.5262 24.2301 25.9508L24.39 25.86ZM24.056 24.4659H24.2398C24.2398 23.9491 24.3458 23.5174 24.5493 23.1634L24.39 23.0718L24.2306 22.9802C23.9888 23.4007 23.8721 23.8984 23.8721 24.4659H24.056ZM24.39 23.0718L24.5493 23.1634C24.7555 22.8048 25.0337 22.5316 25.3855 22.3401L25.2976 22.1787L25.2097 22.0172C24.7967 22.242 24.4697 22.5643 24.2306 22.9802L24.39 23.0718ZM25.2976 22.1787L25.3862 22.3397C25.744 22.1429 26.1464 22.043 26.5973 22.043V21.8592V21.6754C26.0898 21.6754 25.6257 21.7884 25.209 22.0176L25.2976 22.1787ZM26.5973 21.8592V22.043C26.9414 22.043 27.2306 22.0849 27.4686 22.1643L27.5267 21.9899L27.5849 21.8155C27.3001 21.7206 26.9697 21.6754 26.5973 21.6754V21.8592ZM27.5267 21.9899L27.4686 22.1643C27.7196 22.248 27.9508 22.3498 28.1624 22.4694L28.2528 22.3094L28.3433 22.1493C28.1096 22.0172 27.8566 21.9061 27.5849 21.8155L27.5267 21.9899ZM28.2528 22.3094L28.1706 22.4738C28.1889 22.4829 28.1964 22.4919 28.2011 22.5003L28.3618 22.411L28.5224 22.3218C28.4787 22.243 28.4136 22.1842 28.335 22.145L28.2528 22.3094ZM28.3618 22.411L28.2147 22.5213C28.2156 22.5226 28.2259 22.5377 28.2292 22.5839L28.4126 22.5708L28.5959 22.5577C28.5896 22.4683 28.566 22.3769 28.5088 22.3007L28.3618 22.411ZM28.4126 22.5708L28.2291 22.5822C28.2308 22.609 28.2245 22.628 28.2045 22.6499L28.34 22.7741L28.4755 22.8983C28.5619 22.804 28.6041 22.6875 28.596 22.5593L28.4126 22.5708ZM28.34 22.7741L28.2045 22.6499C28.1919 22.6635 28.172 22.6774 28.1221 22.6774V22.8612V23.045C28.2562 23.045 28.3815 23.0008 28.4755 22.8983L28.34 22.7741ZM28.1221 22.8612V22.6774C28.0989 22.6774 28.084 22.6729 28.0737 22.6678L27.9914 22.8322L27.9092 22.9966C27.9764 23.0302 28.0486 23.045 28.1221 23.045V22.8612ZM27.9914 22.8322L28.0769 22.6694C27.8736 22.5627 27.6647 22.476 27.4504 22.4097L27.396 22.5853L27.3417 22.7609C27.534 22.8204 27.722 22.8984 27.906 22.9949L27.9914 22.8322ZM27.396 22.5853L27.4504 22.4097C27.2246 22.3398 26.9608 22.3071 26.6627 22.3071V22.4909V22.6747C26.9357 22.6747 27.1608 22.7049 27.3417 22.7609L27.396 22.5853ZM26.6627 22.4909V22.3071C26.2119 22.3071 25.819 22.3994 25.4935 22.5947L25.588 22.7523L25.6826 22.9099C25.938 22.7567 26.2615 22.6747 26.6627 22.6747V22.4909ZM25.588 22.7523L25.4935 22.5947C25.1729 22.787 24.9301 23.0509 24.7691 23.3838L24.9345 23.4639L25.1 23.5439C25.2294 23.2766 25.4223 23.0661 25.6826 22.9099L25.588 22.7523ZM24.9345 23.4639L24.7696 23.3828C24.6104 23.7064 24.5329 24.0688 24.5329 24.4659H24.7167H24.9005C24.9005 24.1175 24.9683 23.8119 25.0995 23.545L24.9345 23.4639ZM24.7167 24.4659H24.5329C24.5329 24.8631 24.6104 25.2274 24.7691 25.5553L24.9345 25.4752L25.1 25.3951C24.9682 25.1228 24.9005 24.8142 24.9005 24.4659H24.7167ZM24.9345 25.4752L24.7696 25.5563C24.9309 25.8843 25.1736 26.1452 25.4935 26.3371L25.588 26.1795L25.6826 26.0219C25.4216 25.8652 25.2286 25.6566 25.0995 25.3941L24.9345 25.4752ZM25.588 26.1795L25.4935 26.3371C25.819 26.5324 26.2119 26.6247 26.6627 26.6247V26.4409V26.2571C26.2615 26.2571 25.938 26.1751 25.6826 26.0219L25.588 26.1795ZM26.6627 26.4409V26.6247C26.9608 26.6247 27.2246 26.592 27.4504 26.5221L27.396 26.3465L27.3417 26.1709C27.1608 26.2269 26.9357 26.2571 26.6627 26.2571V26.4409ZM27.396 26.3465L27.4504 26.5221C27.6647 26.4558 27.8736 26.3691 28.0769 26.2624L27.9914 26.0996L27.906 25.9369C27.722 26.0335 27.534 26.1114 27.3417 26.1709L27.396 26.3465ZM27.9914 26.0996L28.0737 26.264C28.084 26.2589 28.0989 26.2544 28.1221 26.2544V26.0706V25.8868C28.0486 25.8868 27.9764 25.9017 27.9092 25.9352L27.9914 26.0996ZM28.1221 26.0706V26.2544C28.172 26.2544 28.1919 26.2683 28.2045 26.2819L28.34 26.1577L28.4755 26.0335C28.3815 25.931 28.2562 25.8868 28.1221 25.8868V26.0706ZM28.34 26.1577L28.2045 26.2819C28.2245 26.3038 28.2308 26.3228 28.2291 26.3496L28.4126 26.361L28.596 26.3725C28.6041 26.2443 28.5619 26.1278 28.4755 26.0335L28.34 26.1577ZM28.4126 26.361L28.2292 26.3479C28.226 26.3932 28.2157 26.4157 28.2088 26.4261L28.3618 26.528L28.5147 26.63C28.5659 26.5532 28.5895 26.4644 28.5959 26.3741L28.4126 26.361ZM28.3618 26.528L28.2059 26.4306C28.2027 26.4357 28.1944 26.4461 28.1706 26.458L28.2528 26.6224L28.335 26.7868C28.4081 26.7503 28.4724 26.6978 28.5176 26.6255L28.3618 26.528ZM28.2528 26.6224L28.1624 26.4624C27.9508 26.582 27.7196 26.6838 27.4686 26.7675L27.5267 26.9419L27.5849 27.1163C27.8566 27.0257 28.1096 26.9146 28.3433 26.7825L28.2528 26.6224ZM27.5267 26.9419L27.4686 26.7675C27.2306 26.8469 26.9414 26.8888 26.5973 26.8888V27.0726V27.2564C26.9697 27.2564 27.3001 27.2112 27.5849 27.1163L27.5267 26.9419Z" fill="white" mask="url(#path-8-outside-1_14030_15841)"/><mask id="mask1_14030_15841" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="6" width="26" height="29"><path d="M30.4779 34.5H9.52206C8.40531 34.5 7.5 33.6046 7.5 32.5V8.5C7.5 7.39543 8.40531 6.5 9.52206 6.5H23.125L32.5 15.7727V32.5C32.5 33.6046 31.5947 34.5 30.4779 34.5Z" fill="url(#paint2_linear_14030_15841)"/></mask><g mask="url(#mask1_14030_15841)"><ellipse opacity="0.05" cx="6.16728" cy="5.36353" rx="20.5423" ry="19.5" fill="url(#paint3_linear_14030_15841)"/><ellipse opacity="0.07" cx="6.16751" cy="5.36375" rx="12.9136" ry="12.2273" fill="url(#paint4_linear_14030_15841)"/></g><g filter="url(#filter1_d_14030_15841)"><path d="M32.5 15.7727H25.1471C24.0303 15.7727 23.125 14.8674 23.125 13.7507V6.5L32.5 15.7727Z" fill="url(#paint5_linear_14030_15841)"/></g></g><defs><filter id="filter0_f_14030_15841" x="5.29435" y="16.4609" width="29.5949" height="14.8056" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="1.79228" result="effect1_foregroundBlur_14030_15841"/></filter><filter id="filter1_d_14030_15841" x="21.011" y="4.29412" width="13.9706" height="13.8683" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="0.183823" dy="0.0919117"/><feGaussianBlur stdDeviation="1.1489"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.33 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_14030_15841"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_14030_15841" result="shape"/></filter><linearGradient id="paint0_linear_14030_15841" x1="20" y1="6.5" x2="20" y2="34.5" gradientUnits="userSpaceOnUse"><stop stop-color="#FF7979"/><stop offset="1" stop-color="#E85555"/></linearGradient><linearGradient id="paint1_linear_14030_15841" x1="20" y1="6.5" x2="20" y2="34.5" gradientUnits="userSpaceOnUse"><stop stop-color="#576D7E"/><stop offset="1" stop-color="#7393AC"/></linearGradient><linearGradient id="paint2_linear_14030_15841" x1="20" y1="6.5" x2="20" y2="34.5" gradientUnits="userSpaceOnUse"><stop stop-color="#FF8777"/><stop offset="1" stop-color="#F0695F"/></linearGradient><linearGradient id="paint3_linear_14030_15841" x1="7.6588" y1="6.03363" x2="13.7698" y2="22.4312" gradientUnits="userSpaceOnUse"><stop stop-color="white" stop-opacity="0"/><stop offset="1" stop-color="white"/></linearGradient><linearGradient id="paint4_linear_14030_15841" x1="7.10513" y1="5.78393" x2="10.9296" y2="16.0722" gradientUnits="userSpaceOnUse"><stop stop-color="white" stop-opacity="0"/><stop offset="1" stop-color="white"/></linearGradient><linearGradient id="paint5_linear_14030_15841" x1="27.8125" y1="6.5" x2="27.8125" y2="15.7727" gradientUnits="userSpaceOnUse"><stop stop-color="#576D7E"/><stop offset="1" stop-color="#B0B7BD"/></linearGradient><clipPath id="clip0_14030_15841"><rect width="21" height="15" fill="white" transform="translate(9 17)"/></clipPath></defs></svg>';
const rawSvg = '<svg width="inherit" height="inherit" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="0.5" width="40" height="40" rx="14" fill="#FFF4F4"/><g opacity="0.3"><path opacity="0.3" d="M24.7604 12.2447C24.1043 12.244 23.4753 11.9904 23.0114 11.5394C22.5475 11.0884 22.2866 10.4768 22.286 9.839V6.5H11.2292C10.373 6.5 9.55179 6.83061 8.94623 7.41913C8.34068 8.00765 8.00032 8.80589 8 9.63834V28.564C8.00095 29.396 8.34159 30.1937 8.94708 30.7817C9.55257 31.3697 10.3734 31.7 11.2292 31.7H24.5012C24.9254 31.7002 25.3454 31.6191 25.7373 31.4614C26.1293 31.3036 26.4854 31.0724 26.7854 30.7809C27.0854 30.4893 27.3233 30.1432 27.4857 29.7622C27.648 29.3812 27.7316 28.9729 27.7316 28.5605V12.2447H24.7604Z" fill="#FF3E4C"/></g><path d="M27.7308 12.2447H24.7596C24.1035 12.244 23.4745 11.9904 23.0106 11.5394C22.5467 11.0884 22.2858 10.4768 22.2852 9.839V6.5L27.7308 12.2447Z" fill="#FF3E4C"/><path d="M30.0726 26.4033H15.0678C14.0035 26.4033 13.1406 27.2422 13.1406 28.277V32.6263C13.1406 33.6611 14.0035 34.5 15.0678 34.5H30.0726C31.137 34.5 31.9998 33.6611 31.9998 32.6263V28.277C31.9998 27.2422 31.137 26.4033 30.0726 26.4033Z" fill="#FF3E4C"/><path d="M16.7247 31.3933V32.2415H15.8223V31.3933H16.7247Z" fill="white"/><path d="M19.0325 32.2414L18.2513 30.9173H18.0521V32.2414H17.1797V28.7333H18.6701C18.9184 28.7265 19.1649 28.776 19.3901 28.8779C19.5754 28.9631 19.7301 29.1005 19.8341 29.2723C19.9346 29.4472 19.9855 29.6448 19.9817 29.8451C19.9885 30.0794 19.9122 30.3088 19.7657 30.4949C19.6041 30.6834 19.3816 30.8129 19.1345 30.8624L20.0009 32.2414H19.0325ZM18.0521 30.3363H18.5933C18.7315 30.3464 18.8685 30.3046 18.9761 30.2196C19.0187 30.176 19.0515 30.1242 19.0721 30.0675C19.0928 30.0109 19.101 29.9506 19.0961 29.8906C19.1001 29.8309 19.0916 29.771 19.071 29.7146C19.0503 29.6583 19.018 29.6066 18.9761 29.5628C18.8701 29.4766 18.7334 29.4346 18.5957 29.4461H18.0545L18.0521 30.3363Z" fill="white"/><path d="M22.6598 31.602H21.3074L21.0794 32.2413H20.1602L21.4802 28.7588H22.4858L23.8058 32.2413H22.8794L22.6598 31.602ZM22.4354 30.9568L21.9866 29.6665L21.5318 30.9568H22.4354Z" fill="white"/><path d="M29.0553 28.7332L28.1937 32.2413H27.1137L26.5365 29.8952L25.9545 32.2413H24.8745L24.0117 28.7332H24.9609L25.4253 31.2742L26.0577 28.7332H27.0177L27.6501 31.2742L28.1193 28.7332H29.0553Z" fill="white"/><path d="M15.8408 20.9269H12.9272C12.6993 20.3433 12.583 19.7242 12.584 19.0999C12.5831 18.4761 12.6994 17.8573 12.9272 17.2741C13.0179 17.0432 13.1258 16.819 13.25 16.6033L13.652 17.2741L14.7548 19.1139L15.2348 19.9236L15.8408 20.9269Z" fill="#FF3E4C"/><path d="M21.9583 22.3479C21.1492 23.3125 20.0071 23.9585 18.7447 24.1656C18.4784 24.2085 18.2093 24.2319 17.9395 24.2356L18.3643 23.5356L19.4443 21.7436L19.9339 20.9269L20.5339 19.9282L21.1219 20.9269L21.6019 21.7436L21.9583 22.3479Z" fill="#FF3E4C"/><path d="M23.1476 19.1C23.1487 19.724 23.032 20.3429 22.8032 20.9259C22.7126 21.1579 22.6047 21.3833 22.4804 21.6002L22.0844 20.9259L21.0212 19.121L20.5412 18.3044L19.9316 17.2695H22.7996C23.0302 17.8538 23.1482 18.4743 23.1476 19.1Z" fill="#FF3E4C"/><path d="M22.3989 16.4646H17.2773L17.8881 15.4286L18.3681 14.6119L18.7101 14.0286C20.0057 14.2317 21.1768 14.8973 21.9945 15.8952C22.1424 16.0759 22.2775 16.2661 22.3989 16.4646Z" fill="#FF3E4C"/><path d="M17.7893 13.9668L17.4088 14.612L16.3181 16.4646L15.8381 17.2813L15.238 18.3091L14.6213 17.2813L14.1413 16.4646L13.7812 15.8603C14.6068 14.8722 15.781 14.218 17.0752 14.0251C17.3116 13.9902 17.5502 13.9707 17.7893 13.9668Z" fill="#FF3E4C"/><path d="M18.4776 21.739L17.8776 22.726L17.3976 23.5287L17.0124 24.1704C15.752 23.9699 14.609 23.332 13.7952 22.3748C13.6249 22.1743 13.4701 21.9618 13.332 21.739H18.4776Z" fill="#FF3E4C"/></svg>';
const defaultSvg = '<svg width="auto" height="inherit" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <g opacity="0.5" clip-path="url(#clip0_11175_56159)"> <path d="M17.4109 1.09814H4.17876C3.39889 1.09814 2.65097 1.41215 2.09953 1.97108C1.54808 2.53001 1.23828 3.28809 1.23828 4.07854V27.9217C1.23828 28.7121 1.54808 29.4702 2.09953 30.0291C2.65097 30.5881 3.39889 30.9021 4.17876 30.9021H21.8216C22.6015 30.9021 23.3494 30.5881 23.9008 30.0291C24.4523 29.4702 24.7621 28.7121 24.7621 27.9217V8.54912L17.4109 1.09814Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M15.9404 1.09814V7.05893C15.9404 7.84938 16.2502 8.60745 16.8017 9.16638C17.3531 9.72532 18.101 10.0393 18.8809 10.0393H24.7619" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g> <defs> <clipPath id="clip0_11175_56159"> <rect width="26" height="32" fill="white"/> </clipPath> </defs> </svg>';
const xlsSvg = '<svg width="inherit" height="inherit" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="40" height="40" rx="14" fill="#D5FFD5"/> <mask id="mask0_11175_56131" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="6" width="26" height="28"> <path d="M30.4779 34H9.52206C8.40531 34 7.5 33.1046 7.5 32V8C7.5 6.89543 8.40531 6 9.52206 6H23.125L32.5 15.2727V32C32.5 33.1046 31.5947 34 30.4779 34Z" fill="url(#paint0_linear_11175_56131)"/> </mask> <g mask="url(#mask0_11175_56131)"> <path d="M30.4779 34H9.52206C8.40531 34 7.5 33.1046 7.5 32V8C7.5 6.89543 8.40531 6 9.52206 6H23.125L32.5 15.2727V32C32.5 33.1046 31.5947 34 30.4779 34Z" fill="url(#paint1_linear_11175_56131)"/> <g opacity="0.82" filter="url(#filter0_f_11175_56131)"> <rect x="11.9116" y="19.5454" width="16.3603" height="7.63636" fill="#0F7D56" fill-opacity="0.27" style="mix-blend-mode:darken"/> </g> <path opacity="0.12" d="M28.5312 16.5737C28.9019 16.6115 29.1914 16.9246 29.1914 17.3052V30.1724L29.1875 30.2476C29.1525 30.5937 28.8773 30.8685 28.5312 30.9038L28.4561 30.9077H11.4521L11.377 30.9038C11.0062 30.8662 10.7168 30.5531 10.7168 30.1724V17.3052C10.7168 16.9245 11.0062 16.6114 11.377 16.5737L11.4521 16.5698H28.4561L28.5312 16.5737ZM23.4004 26.4966V29.8052H28.0879V26.4966H23.4004ZM17.6094 29.8052H22.2979V26.4966H17.6094V29.8052ZM11.8193 29.8052H16.5068V26.4966H11.8193V29.8052ZM23.4004 22.0845V25.394H28.0879V22.0845H23.4004ZM11.8193 25.394H16.5068V22.0845H11.8193V25.394ZM17.6094 25.394H22.2979V22.0845H17.6094V25.394ZM23.4004 20.9819H28.0879V17.6724H23.4004V20.9819ZM11.8193 20.9819H16.5068V17.6724H11.8193V20.9819ZM17.6094 20.9819H22.2979V17.6724H17.6094V20.9819Z" fill="white"/> <mask id="path-6-outside-1_11175_56131" maskUnits="userSpaceOnUse" x="12.7388" y="20.1816" width="15" height="7" fill="black"> <rect fill="white" x="12.7388" y="20.1816" width="15" height="7"/> <path d="M13.3632 26.2179C13.2809 26.2179 13.2083 26.1889 13.1454 26.1308C13.0873 26.0679 13.0583 25.9953 13.0583 25.913C13.0583 25.8355 13.08 25.7678 13.1236 25.7097L14.8009 23.6475L13.1381 21.5999C13.0946 21.5418 13.0728 21.4741 13.0728 21.3966C13.0728 21.3046 13.1018 21.2296 13.1599 21.1715C13.2228 21.1086 13.3003 21.0771 13.3923 21.0771C13.4455 21.0771 13.4963 21.0892 13.5447 21.1134C13.5932 21.1376 13.6319 21.1691 13.6609 21.2078L15.193 23.1538L16.7251 21.1933C16.7783 21.1159 16.8582 21.0771 16.9647 21.0771C17.0518 21.0771 17.1269 21.1086 17.1898 21.1715C17.2527 21.2296 17.2842 21.3022 17.2842 21.3894C17.2842 21.4571 17.2648 21.5176 17.2261 21.5709L15.5488 23.6403L17.2261 25.7024C17.2697 25.7508 17.2914 25.8137 17.2914 25.8912C17.2914 25.9832 17.26 26.0606 17.197 26.1236C17.139 26.1865 17.0615 26.2179 16.9647 26.2179C16.8582 26.2179 16.7711 26.172 16.7033 26.08L15.1494 24.1268L13.6174 26.0872C13.5447 26.1744 13.46 26.2179 13.3632 26.2179ZM19.2802 26.1816C19.1544 26.1816 19.0454 26.1381 18.9535 26.0509C18.8663 25.959 18.8228 25.8501 18.8228 25.7242V21.4111C18.8228 21.3192 18.8542 21.2417 18.9172 21.1788C18.9801 21.111 19.0575 21.0771 19.1495 21.0771C19.2415 21.0771 19.3189 21.111 19.3819 21.1788C19.4496 21.2417 19.4835 21.3192 19.4835 21.4111V25.5209H21.8579C21.9499 25.5209 22.0273 25.5548 22.0902 25.6225C22.158 25.6855 22.1919 25.7629 22.1919 25.8549C22.1919 25.9469 22.158 26.0243 22.0902 26.0872C22.0273 26.1502 21.9499 26.1816 21.8579 26.1816H19.2802ZM25.1121 26.2543C24.4973 26.2543 23.9213 26.1381 23.3839 25.9057C23.3259 25.8815 23.2775 25.8428 23.2387 25.7895C23.2 25.7315 23.1806 25.6709 23.1806 25.608C23.1806 25.5257 23.2073 25.4555 23.2605 25.3974C23.3186 25.3345 23.3912 25.3031 23.4783 25.3031C23.5267 25.3031 23.5727 25.3127 23.6163 25.3321C24.0616 25.5306 24.5385 25.6298 25.0467 25.6298C25.8938 25.6298 26.3174 25.3515 26.3174 24.7948C26.3174 24.6496 26.2617 24.5285 26.1504 24.4317C26.0439 24.3349 25.9108 24.2599 25.751 24.2066C25.5913 24.1486 25.3638 24.0808 25.0685 24.0033C24.6764 23.9017 24.3593 23.8049 24.1173 23.7129C23.8753 23.6161 23.6671 23.4733 23.4929 23.2845C23.3186 23.0957 23.2315 22.844 23.2315 22.5293C23.2315 22.2534 23.3041 22.0041 23.4493 21.7815C23.5945 21.5539 23.8075 21.3748 24.0883 21.2441C24.3739 21.1086 24.7151 21.0408 25.1121 21.0408C25.6445 21.0408 26.1262 21.1207 26.557 21.2804C26.6926 21.3289 26.7603 21.4257 26.7603 21.5709C26.7603 21.6483 26.7337 21.7185 26.6805 21.7815C26.6272 21.8444 26.557 21.8758 26.4699 21.8758C26.4408 21.8758 26.4021 21.8662 26.3537 21.8468C25.9761 21.7161 25.5865 21.6508 25.1847 21.6508C24.8023 21.6508 24.49 21.7234 24.248 21.8686C24.0108 22.0138 23.8922 22.2171 23.8922 22.4785C23.8922 22.6528 23.9479 22.7956 24.0592 22.9069C24.1754 23.0134 24.3182 23.0981 24.4876 23.1611C24.6619 23.2191 24.8967 23.2821 25.1919 23.3498C25.5744 23.4418 25.8817 23.5338 26.1141 23.6258C26.3513 23.7177 26.5522 23.8605 26.7168 24.0542C26.8862 24.2478 26.9709 24.5092 26.9709 24.8384C26.9709 25.1094 26.8934 25.3539 26.7385 25.5717C26.5836 25.7847 26.3658 25.9517 26.0851 26.0727C25.8043 26.1937 25.48 26.2543 25.1121 26.2543Z"/> </mask> <path d="M13.3632 26.2179C13.2809 26.2179 13.2083 26.1889 13.1454 26.1308C13.0873 26.0679 13.0583 25.9953 13.0583 25.913C13.0583 25.8355 13.08 25.7678 13.1236 25.7097L14.8009 23.6475L13.1381 21.5999C13.0946 21.5418 13.0728 21.4741 13.0728 21.3966C13.0728 21.3046 13.1018 21.2296 13.1599 21.1715C13.2228 21.1086 13.3003 21.0771 13.3923 21.0771C13.4455 21.0771 13.4963 21.0892 13.5447 21.1134C13.5932 21.1376 13.6319 21.1691 13.6609 21.2078L15.193 23.1538L16.7251 21.1933C16.7783 21.1159 16.8582 21.0771 16.9647 21.0771C17.0518 21.0771 17.1269 21.1086 17.1898 21.1715C17.2527 21.2296 17.2842 21.3022 17.2842 21.3894C17.2842 21.4571 17.2648 21.5176 17.2261 21.5709L15.5488 23.6403L17.2261 25.7024C17.2697 25.7508 17.2914 25.8137 17.2914 25.8912C17.2914 25.9832 17.26 26.0606 17.197 26.1236C17.139 26.1865 17.0615 26.2179 16.9647 26.2179C16.8582 26.2179 16.7711 26.172 16.7033 26.08L15.1494 24.1268L13.6174 26.0872C13.5447 26.1744 13.46 26.2179 13.3632 26.2179ZM19.2802 26.1816C19.1544 26.1816 19.0454 26.1381 18.9535 26.0509C18.8663 25.959 18.8228 25.8501 18.8228 25.7242V21.4111C18.8228 21.3192 18.8542 21.2417 18.9172 21.1788C18.9801 21.111 19.0575 21.0771 19.1495 21.0771C19.2415 21.0771 19.3189 21.111 19.3819 21.1788C19.4496 21.2417 19.4835 21.3192 19.4835 21.4111V25.5209H21.8579C21.9499 25.5209 22.0273 25.5548 22.0902 25.6225C22.158 25.6855 22.1919 25.7629 22.1919 25.8549C22.1919 25.9469 22.158 26.0243 22.0902 26.0872C22.0273 26.1502 21.9499 26.1816 21.8579 26.1816H19.2802ZM25.1121 26.2543C24.4973 26.2543 23.9213 26.1381 23.3839 25.9057C23.3259 25.8815 23.2775 25.8428 23.2387 25.7895C23.2 25.7315 23.1806 25.6709 23.1806 25.608C23.1806 25.5257 23.2073 25.4555 23.2605 25.3974C23.3186 25.3345 23.3912 25.3031 23.4783 25.3031C23.5267 25.3031 23.5727 25.3127 23.6163 25.3321C24.0616 25.5306 24.5385 25.6298 25.0467 25.6298C25.8938 25.6298 26.3174 25.3515 26.3174 24.7948C26.3174 24.6496 26.2617 24.5285 26.1504 24.4317C26.0439 24.3349 25.9108 24.2599 25.751 24.2066C25.5913 24.1486 25.3638 24.0808 25.0685 24.0033C24.6764 23.9017 24.3593 23.8049 24.1173 23.7129C23.8753 23.6161 23.6671 23.4733 23.4929 23.2845C23.3186 23.0957 23.2315 22.844 23.2315 22.5293C23.2315 22.2534 23.3041 22.0041 23.4493 21.7815C23.5945 21.5539 23.8075 21.3748 24.0883 21.2441C24.3739 21.1086 24.7151 21.0408 25.1121 21.0408C25.6445 21.0408 26.1262 21.1207 26.557 21.2804C26.6926 21.3289 26.7603 21.4257 26.7603 21.5709C26.7603 21.6483 26.7337 21.7185 26.6805 21.7815C26.6272 21.8444 26.557 21.8758 26.4699 21.8758C26.4408 21.8758 26.4021 21.8662 26.3537 21.8468C25.9761 21.7161 25.5865 21.6508 25.1847 21.6508C24.8023 21.6508 24.49 21.7234 24.248 21.8686C24.0108 22.0138 23.8922 22.2171 23.8922 22.4785C23.8922 22.6528 23.9479 22.7956 24.0592 22.9069C24.1754 23.0134 24.3182 23.0981 24.4876 23.1611C24.6619 23.2191 24.8967 23.2821 25.1919 23.3498C25.5744 23.4418 25.8817 23.5338 26.1141 23.6258C26.3513 23.7177 26.5522 23.8605 26.7168 24.0542C26.8862 24.2478 26.9709 24.5092 26.9709 24.8384C26.9709 25.1094 26.8934 25.3539 26.7385 25.5717C26.5836 25.7847 26.3658 25.9517 26.0851 26.0727C25.8043 26.1937 25.48 26.2543 25.1121 26.2543Z" fill="white"/> <path d="M13.1454 26.1308L13.0103 26.2555L13.0153 26.2609L13.0207 26.2659L13.1454 26.1308ZM13.1236 25.7097L12.9809 25.5936L12.9765 25.5994L13.1236 25.7097ZM14.8009 23.6475L14.9435 23.7635L15.0378 23.6476L14.9436 23.5317L14.8009 23.6475ZM13.1381 21.5999L12.991 21.7103L12.9954 21.7158L13.1381 21.5999ZM13.1599 21.1715L13.0299 21.0415L13.0299 21.0415L13.1599 21.1715ZM13.5447 21.1134L13.627 20.949H13.627L13.5447 21.1134ZM13.6609 21.2078L13.5138 21.3182L13.5165 21.3215L13.6609 21.2078ZM15.193 23.1538L15.0486 23.2675L15.1935 23.4516L15.3378 23.267L15.193 23.1538ZM16.7251 21.1933L16.8702 21.3067L16.8766 21.2975L16.7251 21.1933ZM17.1898 21.1715L17.0597 21.3016L17.0651 21.3066L17.1898 21.1715ZM17.2261 21.5709L17.3691 21.6868L17.3748 21.679L17.2261 21.5709ZM15.5488 23.6403L15.406 23.5245L15.312 23.6405L15.4062 23.7563L15.5488 23.6403ZM17.2261 25.7024L17.0833 25.8186L17.0895 25.8254L17.2261 25.7024ZM17.197 26.1236L17.067 25.9935L17.062 25.9989L17.197 26.1236ZM16.7033 26.08L16.8514 25.9709L16.8471 25.9655L16.7033 26.08ZM15.1494 24.1268L15.2933 24.0123L15.1481 23.8299L15.0046 24.0136L15.1494 24.1268ZM13.6174 26.0872L13.7586 26.205L13.7622 26.2004L13.6174 26.0872ZM13.3632 26.2179V26.0341C13.3292 26.0341 13.3006 26.0239 13.2701 25.9957L13.1454 26.1308L13.0207 26.2659C13.1161 26.3539 13.2327 26.4018 13.3632 26.4018V26.2179ZM13.1454 26.1308L13.2805 26.0061C13.2523 25.9756 13.2421 25.947 13.2421 25.913H13.0583H12.8744C12.8744 26.0435 12.9223 26.1601 13.0103 26.2555L13.1454 26.1308ZM13.0583 25.913H13.2421C13.2421 25.8725 13.2526 25.8441 13.2707 25.82L13.1236 25.7097L12.9765 25.5994C12.9075 25.6915 12.8744 25.7986 12.8744 25.913H13.0583ZM13.1236 25.7097L13.2662 25.8257L14.9435 23.7635L14.8009 23.6475L14.6583 23.5315L12.981 25.5937L13.1236 25.7097ZM14.8009 23.6475L14.9436 23.5317L13.2808 21.4841L13.1381 21.5999L12.9954 21.7158L14.6582 23.7634L14.8009 23.6475ZM13.1381 21.5999L13.2852 21.4896C13.2671 21.4656 13.2566 21.4371 13.2566 21.3966H13.0728H12.889C12.889 21.511 12.922 21.6181 12.9911 21.7102L13.1381 21.5999ZM13.0728 21.3966H13.2566C13.2566 21.347 13.2705 21.3209 13.2899 21.3015L13.1599 21.1715L13.0299 21.0415C12.9331 21.1384 12.889 21.2623 12.889 21.3966H13.0728ZM13.1599 21.1715L13.2899 21.3015C13.3171 21.2743 13.3472 21.261 13.3923 21.261V21.0771V20.8933C13.2534 20.8933 13.1286 20.9429 13.0299 21.0415L13.1599 21.1715ZM13.3923 21.0771V21.261C13.4165 21.261 13.4392 21.2662 13.4625 21.2779L13.5447 21.1134L13.627 20.949C13.5535 20.9123 13.4745 20.8933 13.3923 20.8933V21.0771ZM13.5447 21.1134L13.4625 21.2779C13.4885 21.2908 13.5039 21.3048 13.5139 21.3181L13.6609 21.2078L13.808 21.0975C13.7599 21.0334 13.6978 20.9845 13.627 20.949L13.5447 21.1134ZM13.6609 21.2078L13.5165 21.3215L15.0486 23.2675L15.193 23.1538L15.3374 23.0401L13.8054 21.0941L13.6609 21.2078ZM15.193 23.1538L15.3378 23.267L16.8699 21.3065L16.7251 21.1933L16.5802 21.0801L15.0482 23.0406L15.193 23.1538ZM16.7251 21.1933L16.8766 21.2975C16.8905 21.2771 16.9094 21.261 16.9647 21.261V21.0771V20.8933C16.807 20.8933 16.6661 20.9546 16.5736 21.0892L16.7251 21.1933ZM16.9647 21.0771V21.261C17.0019 21.261 17.0305 21.2722 17.0598 21.3015L17.1898 21.1715L17.3198 21.0415C17.2232 20.945 17.1017 20.8933 16.9647 20.8933V21.0771ZM17.1898 21.1715L17.0651 21.3066C17.0896 21.3292 17.1004 21.3525 17.1004 21.3894H17.2842H17.468C17.468 21.2519 17.4158 21.13 17.3145 21.0365L17.1898 21.1715ZM17.2842 21.3894H17.1004C17.1004 21.4195 17.0926 21.4419 17.0774 21.4628L17.2261 21.5709L17.3748 21.679C17.437 21.5934 17.468 21.4948 17.468 21.3894H17.2842ZM17.2261 21.5709L17.0833 21.4551L15.406 23.5245L15.5488 23.6403L15.6916 23.756L17.3689 21.6866L17.2261 21.5709ZM15.5488 23.6403L15.4062 23.7563L17.0835 25.8184L17.2261 25.7024L17.3687 25.5864L15.6914 23.5243L15.5488 23.6403ZM17.2261 25.7024L17.0895 25.8254C17.0971 25.8338 17.1076 25.8501 17.1076 25.8912H17.2914H17.4753C17.4753 25.7774 17.4422 25.6678 17.3627 25.5794L17.2261 25.7024ZM17.2914 25.8912H17.1076C17.1076 25.9362 17.0942 25.9664 17.0671 25.9936L17.197 26.1236L17.327 26.2535C17.4257 26.1549 17.4753 26.0301 17.4753 25.8912H17.2914ZM17.197 26.1236L17.062 25.9989C17.0434 26.019 17.0176 26.0341 16.9647 26.0341V26.2179V26.4018C17.1054 26.4018 17.2345 26.354 17.3321 26.2482L17.197 26.1236ZM16.9647 26.2179V26.0341C16.9214 26.0341 16.8873 26.0199 16.8513 25.9709L16.7033 26.08L16.5553 26.189C16.6548 26.324 16.795 26.4018 16.9647 26.4018V26.2179ZM16.7033 26.08L16.8471 25.9655L15.2933 24.0123L15.1494 24.1268L15.0056 24.2412L16.5594 26.1944L16.7033 26.08ZM15.1494 24.1268L15.0046 24.0136L13.4725 25.9741L13.6174 26.0872L13.7622 26.2004L15.2943 24.24L15.1494 24.1268ZM13.6174 26.0872L13.4761 25.9696C13.4318 26.0228 13.3959 26.0341 13.3632 26.0341V26.2179V26.4018C13.5242 26.4018 13.6577 26.326 13.7586 26.2049L13.6174 26.0872ZM18.9535 26.0509L18.8198 26.1776L18.827 26.1844L18.9535 26.0509ZM18.9172 21.1788L19.0472 21.3089L19.0519 21.3039L18.9172 21.1788ZM19.3819 21.1788L19.2468 21.3042L19.2568 21.3135L19.3819 21.1788ZM19.4835 25.5209H19.2997V25.7047H19.4835V25.5209ZM22.0902 25.6225L21.9552 25.748L21.9652 25.7572L22.0902 25.6225ZM22.0902 26.0872L21.9651 25.9525L21.9603 25.9573L22.0902 26.0872ZM19.2802 26.1816V25.9978C19.2017 25.9978 19.138 25.9725 19.0799 25.9175L18.9535 26.0509L18.827 26.1844C18.9529 26.3036 19.107 26.3655 19.2802 26.3655V26.1816ZM18.9535 26.0509L19.0869 25.9245C19.0319 25.8664 19.0066 25.8027 19.0066 25.7242H18.8228H18.639C18.639 25.8974 18.7008 26.0515 18.82 26.1774L18.9535 26.0509ZM18.8228 25.7242H19.0066V21.4111H18.8228H18.639V25.7242H18.8228ZM18.8228 21.4111H19.0066C19.0066 21.3661 19.02 21.336 19.0472 21.3088L18.9172 21.1788L18.7872 21.0488C18.6885 21.1475 18.639 21.2722 18.639 21.4111H18.8228ZM18.9172 21.1788L19.0519 21.3039C19.0802 21.2733 19.109 21.261 19.1495 21.261V21.0771V20.8933C19.0061 20.8933 18.88 20.9487 18.7825 21.0537L18.9172 21.1788ZM19.1495 21.0771V21.261C19.1901 21.261 19.2188 21.2733 19.2472 21.3039L19.3819 21.1788L19.5166 21.0537C19.4191 20.9487 19.2929 20.8933 19.1495 20.8933V21.0771ZM19.3819 21.1788L19.2568 21.3135C19.2873 21.3419 19.2997 21.3706 19.2997 21.4111H19.4835H19.6674C19.6674 21.2677 19.6119 21.1416 19.507 21.0441L19.3819 21.1788ZM19.4835 21.4111H19.2997V25.5209H19.4835H19.6674V21.4111H19.4835ZM19.4835 25.5209V25.7047H21.8579V25.5209V25.3371H19.4835V25.5209ZM21.8579 25.5209V25.7047C21.8984 25.7047 21.9272 25.7171 21.9555 25.7476L22.0902 25.6225L22.2249 25.4975C22.1275 25.3925 22.0013 25.3371 21.8579 25.3371V25.5209ZM22.0902 25.6225L21.9652 25.7572C21.9957 25.7856 22.0081 25.8144 22.0081 25.8549H22.1919H22.3757C22.3757 25.7115 22.3203 25.5853 22.2153 25.4878L22.0902 25.6225ZM22.1919 25.8549H22.0081C22.0081 25.8954 21.9957 25.9242 21.9652 25.9525L22.0902 26.0872L22.2153 26.222C22.3203 26.1245 22.3757 25.9983 22.3757 25.8549H22.1919ZM22.0902 26.0872L21.9603 25.9573C21.9331 25.9845 21.9029 25.9978 21.8579 25.9978V26.1816V26.3655C21.9968 26.3655 22.1216 26.3159 22.2202 26.2172L22.0902 26.0872ZM21.8579 26.1816V25.9978H19.2802V26.1816V26.3655H21.8579V26.1816ZM23.3839 25.9057L23.4569 25.737L23.4546 25.736L23.3839 25.9057ZM23.2387 25.7895L23.0857 25.8916L23.0901 25.8977L23.2387 25.7895ZM23.2605 25.3974L23.1254 25.2728L23.125 25.2732L23.2605 25.3974ZM23.6163 25.3321L23.6911 25.1642L23.691 25.1641L23.6163 25.3321ZM26.1504 24.4317L26.0267 24.5678L26.0298 24.5704L26.1504 24.4317ZM25.751 24.2066L25.6882 24.3795L25.6929 24.381L25.751 24.2066ZM25.0685 24.0033L25.1151 23.8255L25.1146 23.8254L25.0685 24.0033ZM24.1173 23.7129L24.049 23.8836L24.052 23.8847L24.1173 23.7129ZM23.4929 23.2845L23.3578 23.4092L23.4929 23.2845ZM23.4493 21.7815L23.6033 21.8819L23.6042 21.8804L23.4493 21.7815ZM24.0883 21.2441L24.1658 21.4108L24.1671 21.4102L24.0883 21.2441ZM26.557 21.2804L26.4931 21.4528L26.4952 21.4536L26.557 21.2804ZM26.6805 21.7815L26.8208 21.9002V21.9002L26.6805 21.7815ZM26.3537 21.8468L26.4221 21.6759L26.4138 21.6731L26.3537 21.8468ZM24.248 21.8686L24.1534 21.711L24.152 21.7118L24.248 21.8686ZM24.0592 22.9069L23.9291 23.037L23.935 23.0424L24.0592 22.9069ZM24.4876 23.1611L24.4236 23.3335L24.4295 23.3354L24.4876 23.1611ZM25.1919 23.3498L25.2349 23.1711L25.2331 23.1707L25.1919 23.3498ZM26.1141 23.6258L26.0464 23.7967L26.0476 23.7971L26.1141 23.6258ZM26.7168 24.0542L26.5767 24.1732L26.5784 24.1752L26.7168 24.0542ZM26.7385 25.5717L26.8872 25.6798L26.8884 25.6782L26.7385 25.5717ZM26.0851 26.0727L26.1578 26.2415L26.0851 26.0727ZM25.1121 26.2543V26.0704C24.5211 26.0704 23.97 25.9589 23.4569 25.737L23.3839 25.9057L23.311 26.0744C23.8725 26.3173 24.4735 26.4381 25.1121 26.4381V26.2543ZM23.3839 25.9057L23.4546 25.736C23.4292 25.7254 23.4072 25.7087 23.3874 25.6814L23.2387 25.7895L23.0901 25.8977C23.1477 25.9769 23.2225 26.0376 23.3132 26.0754L23.3839 25.9057ZM23.2387 25.7895L23.3917 25.6876C23.3708 25.6563 23.3645 25.6307 23.3645 25.608H23.1806H22.9968C22.9968 25.7112 23.0292 25.8067 23.0858 25.8915L23.2387 25.7895ZM23.1806 25.608H23.3645C23.3645 25.5695 23.3753 25.5442 23.396 25.5217L23.2605 25.3974L23.125 25.2732C23.0392 25.3668 22.9968 25.482 22.9968 25.608H23.1806ZM23.2605 25.3974L23.3956 25.5221C23.4182 25.4976 23.4415 25.4869 23.4783 25.4869V25.3031V25.1192C23.3409 25.1192 23.219 25.1714 23.1254 25.2728L23.2605 25.3974ZM23.4783 25.3031V25.4869C23.5014 25.4869 23.5219 25.4913 23.5416 25.5001L23.6163 25.3321L23.691 25.1641C23.6235 25.1341 23.5521 25.1192 23.4783 25.1192V25.3031ZM23.6163 25.3321L23.5415 25.5C24.0114 25.7094 24.5138 25.8136 25.0467 25.8136V25.6298V25.446C24.5631 25.446 24.1119 25.3517 23.6911 25.1642L23.6163 25.3321ZM25.0467 25.6298V25.8136C25.4846 25.8136 25.8449 25.7428 26.1007 25.5747C26.3699 25.3977 26.5012 25.1278 26.5012 24.7948H26.3174H26.1336C26.1336 25.0184 26.0531 25.166 25.8988 25.2674C25.731 25.3777 25.456 25.446 25.0467 25.446V25.6298ZM26.3174 24.7948H26.5012C26.5012 24.5954 26.4218 24.4241 26.271 24.293L26.1504 24.4317L26.0298 24.5704C26.1017 24.633 26.1336 24.7037 26.1336 24.7948H26.3174ZM26.1504 24.4317L26.2741 24.2957C26.1457 24.179 25.9891 24.0922 25.8092 24.0323L25.751 24.2066L25.6929 24.381C25.8325 24.4275 25.9421 24.4908 26.0267 24.5678L26.1504 24.4317ZM25.751 24.2066L25.8139 24.0339C25.6462 23.9729 25.4123 23.9035 25.1151 23.8255L25.0685 24.0033L25.0219 24.1811C25.3152 24.2581 25.5364 24.3242 25.6882 24.3794L25.751 24.2066ZM25.0685 24.0033L25.1146 23.8254C24.7259 23.7246 24.4159 23.6297 24.1826 23.5411L24.1173 23.7129L24.052 23.8847C24.3028 23.98 24.627 24.0788 25.0224 24.1813L25.0685 24.0033ZM24.1173 23.7129L24.1856 23.5422C23.9686 23.4554 23.7834 23.3282 23.6279 23.1598L23.4929 23.2845L23.3578 23.4092C23.5509 23.6184 23.782 23.7767 24.049 23.8836L24.1173 23.7129ZM23.4929 23.2845L23.6279 23.1598C23.4917 23.0122 23.4153 22.8087 23.4153 22.5293H23.2315H23.0476C23.0476 22.8793 23.1455 23.1792 23.3578 23.4092L23.4929 23.2845ZM23.2315 22.5293H23.4153C23.4153 22.2877 23.4783 22.0735 23.6033 21.8819L23.4493 21.7815L23.2953 21.681C23.1299 21.9348 23.0476 22.2192 23.0476 22.5293H23.2315ZM23.4493 21.7815L23.6042 21.8804C23.728 21.6865 23.912 21.529 24.1658 21.4108L24.0883 21.2441L24.0107 21.0775C23.703 21.2207 23.461 21.4214 23.2943 21.6826L23.4493 21.7815ZM24.0883 21.2441L24.1671 21.4102C24.4226 21.289 24.7356 21.2247 25.1121 21.2247V21.0408V20.857C24.6946 20.857 24.3251 20.9282 24.0095 21.0781L24.0883 21.2441ZM25.1121 21.0408V21.2247C25.6261 21.2247 26.0857 21.3017 26.4931 21.4528L26.557 21.2804L26.6209 21.1081C26.1667 20.9397 25.663 20.857 25.1121 20.857V21.0408ZM26.557 21.2804L26.4952 21.4536C26.535 21.4678 26.5513 21.4839 26.5589 21.4948C26.5666 21.5058 26.5765 21.5273 26.5765 21.5709H26.7603H26.9442C26.9442 21.4693 26.9201 21.3697 26.8601 21.2839C26.8 21.198 26.7146 21.1415 26.6188 21.1073L26.557 21.2804ZM26.7603 21.5709H26.5765C26.5765 21.6019 26.5672 21.6307 26.5401 21.6627L26.6805 21.7815L26.8208 21.9002C26.9002 21.8064 26.9442 21.6947 26.9442 21.5709H26.7603ZM26.6805 21.7815L26.5401 21.6627C26.524 21.6818 26.5065 21.692 26.4699 21.692V21.8758V22.0597C26.6076 22.0597 26.7304 22.007 26.8208 21.9002L26.6805 21.7815ZM26.4699 21.8758V21.692C26.4748 21.692 26.4734 21.6927 26.4636 21.6903C26.4543 21.6879 26.4407 21.6836 26.422 21.6761L26.3537 21.8468L26.2854 22.0175C26.3411 22.0397 26.4057 22.0597 26.4699 22.0597V21.8758ZM26.3537 21.8468L26.4138 21.6731C26.0168 21.5357 25.6068 21.4669 25.1847 21.4669V21.6508V21.8346C25.5661 21.8346 25.9355 21.8966 26.2936 22.0205L26.3537 21.8468ZM25.1847 21.6508V21.4669C24.7804 21.4669 24.4324 21.5436 24.1534 21.711L24.248 21.8686L24.3426 22.0262C24.5476 21.9032 24.8242 21.8346 25.1847 21.8346V21.6508ZM24.248 21.8686L24.152 21.7118C23.8645 21.8879 23.7084 22.1483 23.7084 22.4785H23.8922H24.076C24.076 22.2859 24.1571 22.1398 24.344 22.0254L24.248 21.8686ZM23.8922 22.4785H23.7084C23.7084 22.6958 23.7796 22.8873 23.9292 23.0369L24.0592 22.9069L24.1892 22.7769C24.1162 22.7039 24.076 22.6097 24.076 22.4785H23.8922ZM24.0592 22.9069L23.935 23.0424C24.0711 23.1671 24.2352 23.2634 24.4236 23.3334L24.4876 23.1611L24.5516 22.9887C24.4012 22.9329 24.2797 22.8597 24.1834 22.7714L24.0592 22.9069ZM24.4876 23.1611L24.4295 23.3354C24.6118 23.3962 24.853 23.4606 25.1508 23.529L25.1919 23.3498L25.2331 23.1707C24.9404 23.1035 24.712 23.0421 24.5458 22.9867L24.4876 23.1611ZM25.1919 23.3498L25.149 23.5286C25.5272 23.6195 25.8253 23.7091 26.0464 23.7967L26.1141 23.6258L26.1818 23.4548C25.9382 23.3584 25.6216 23.2641 25.2349 23.1711L25.1919 23.3498ZM26.1141 23.6258L26.0476 23.7971C26.2564 23.8781 26.4319 24.0029 26.5767 24.1732L26.7168 24.0542L26.8568 23.9351C26.6724 23.7182 26.4462 23.5574 26.1806 23.4544L26.1141 23.6258ZM26.7168 24.0542L26.5784 24.1752C26.7111 24.3268 26.7871 24.5409 26.7871 24.8384H26.9709H27.1547C27.1547 24.4774 27.0613 24.1688 26.8551 23.9331L26.7168 24.0542ZM26.9709 24.8384H26.7871C26.7871 25.0718 26.7212 25.2789 26.5887 25.4652L26.7385 25.5717L26.8884 25.6782C27.0657 25.4288 27.1547 25.147 27.1547 24.8384H26.9709ZM26.7385 25.5717L26.5899 25.4636C26.4573 25.6459 26.2677 25.7938 26.0123 25.9039L26.0851 26.0727L26.1578 26.2415C26.4639 26.1096 26.71 25.9235 26.8872 25.6798L26.7385 25.5717ZM26.0851 26.0727L26.0123 25.9039C25.7587 26.0132 25.4599 26.0704 25.1121 26.0704V26.2543V26.4381C25.5 26.4381 25.8499 26.3743 26.1578 26.2415L26.0851 26.0727Z" fill="white" mask="url(#path-6-outside-1_11175_56131)"/> <mask id="mask1_11175_56131" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="6" width="26" height="28"> <path d="M30.4779 34H9.52206C8.40531 34 7.5 33.1046 7.5 32V8C7.5 6.89543 8.40531 6 9.52206 6H23.125L32.5 15.2727V32C32.5 33.1046 31.5947 34 30.4779 34Z" fill="url(#paint2_linear_11175_56131)"/> </mask> <g mask="url(#mask1_11175_56131)"> <ellipse opacity="0.05" cx="6.16728" cy="4.86377" rx="20.5423" ry="19.5" fill="url(#paint3_linear_11175_56131)"/> <ellipse opacity="0.07" cx="6.16751" cy="4.8635" rx="12.9136" ry="12.2273" fill="url(#paint4_linear_11175_56131)"/> </g> <g filter="url(#filter1_d_11175_56131)"> <path d="M32.5 15.2727H25.1471C24.0303 15.2727 23.125 14.3674 23.125 13.2507V6L32.5 15.2727Z" fill="url(#paint5_linear_11175_56131)"/> </g> </g> <defs> <filter id="filter0_f_11175_56131" x="8.32706" y="15.9609" width="23.5295" height="14.8053" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/> <feGaussianBlur stdDeviation="1.79228" result="effect1_foregroundBlur_11175_56131"/> </filter> <filter id="filter1_d_11175_56131" x="21.011" y="3.79412" width="13.9706" height="13.8685" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dx="0.183824" dy="0.0919118"/> <feGaussianBlur stdDeviation="1.1489"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.33 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11175_56131"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_11175_56131" result="shape"/> </filter> <linearGradient id="paint0_linear_11175_56131" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse"> <stop stop-color="#FF7979"/> <stop offset="1" stop-color="#E85555"/> </linearGradient> <linearGradient id="paint1_linear_11175_56131" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse"> <stop offset="0.000265127" stop-color="#83CC70"/> <stop offset="1" stop-color="#61A850"/> </linearGradient> <linearGradient id="paint2_linear_11175_56131" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse"> <stop offset="0.000265127" stop-color="#83CC70"/> <stop offset="1" stop-color="#61A850"/> </linearGradient> <linearGradient id="paint3_linear_11175_56131" x1="7.6588" y1="5.53387" x2="13.7698" y2="21.9314" gradientUnits="userSpaceOnUse"> <stop stop-color="white" stop-opacity="0"/> <stop offset="1" stop-color="white"/> </linearGradient> <linearGradient id="paint4_linear_11175_56131" x1="7.10513" y1="5.28368" x2="10.9296" y2="15.572" gradientUnits="userSpaceOnUse"> <stop stop-color="white" stop-opacity="0"/> <stop offset="1" stop-color="white"/> </linearGradient> <linearGradient id="paint5_linear_11175_56131" x1="27.8125" y1="6" x2="27.8125" y2="15.2727" gradientUnits="userSpaceOnUse"> <stop stop-color="#3FAF43"/> <stop offset="1" stop-color="#0E8312"/> </linearGradient> </defs> </svg>';
const pptSvg = '<svg width="inherit" height="inherit" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="40" height="40" rx="14" fill="#FFD7D1"/> <mask id="mask0_11175_56103" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="6" width="26" height="28"> <path d="M30.4779 34H9.52206C8.40531 34 7.5 33.1046 7.5 32V8C7.5 6.89543 8.40531 6 9.52206 6H23.125L32.5 15.2727V32C32.5 33.1046 31.5947 34 30.4779 34Z" fill="url(#paint0_linear_11175_56103)"/> </mask> <g mask="url(#mask0_11175_56103)"> <path d="M30.4779 34H9.52206C8.40531 34 7.5 33.1046 7.5 32V8C7.5 6.89543 8.40531 6 9.52206 6H23.125L32.5 15.2727V32C32.5 33.1046 31.5947 34 30.4779 34Z" fill="url(#paint1_linear_11175_56103)"/> <g opacity="0.23" filter="url(#filter0_f_11175_56103)"> <rect x="8.87842" y="19.5454" width="22.4265" height="7.63637" fill="#E32E06" style="mix-blend-mode:darken"/> </g> <path opacity="0.12" d="M25.791 31.5454H14.21V30.4429H25.791V31.5454ZM25.791 28.8179H14.21V27.7153H25.791V28.8179ZM20 14.1802C23.3502 14.1803 26.0664 16.8964 26.0664 20.2466C26.0663 23.5967 23.3501 26.3129 20 26.313C16.6498 26.313 13.9337 23.5967 13.9336 20.2466C13.9336 16.8963 16.6497 14.1802 20 14.1802ZM19.3525 15.4507C16.9857 15.7671 15.1602 17.7932 15.1602 20.2466C15.1603 22.9194 17.3272 25.0864 20 25.0864C22.4811 25.0863 24.5251 23.2188 24.8057 20.813H19.3525V15.4507ZM20.5664 19.5991H24.7949C24.5032 17.4173 22.7593 15.6967 20.5664 15.4409V19.5991Z" fill="white"/> <mask id="path-6-outside-1_11175_56103" maskUnits="userSpaceOnUse" x="12.3711" y="20.1816" width="16" height="7" fill="black"> <rect fill="white" x="12.3711" y="20.1816" width="16" height="7"/> <path d="M13.803 26.2179C13.7111 26.2179 13.6336 26.1865 13.5707 26.1236C13.5078 26.0606 13.4763 25.9832 13.4763 25.8912V21.4474C13.4763 21.3555 13.5078 21.278 13.5707 21.2151C13.6336 21.1473 13.7111 21.1134 13.803 21.1134H15.4586C15.9184 21.1134 16.2936 21.1909 16.584 21.3458C16.8745 21.5007 17.0826 21.6992 17.2085 21.9412C17.3343 22.1832 17.3972 22.4446 17.3972 22.7254C17.3972 23.0062 17.3343 23.2675 17.2085 23.5096C17.0826 23.7516 16.8745 23.9501 16.584 24.105C16.2936 24.2599 15.9184 24.3373 15.4586 24.3373H14.137V25.8912C14.137 25.9832 14.1032 26.0606 14.0354 26.1236C13.9725 26.1865 13.895 26.2179 13.803 26.2179ZM15.3932 23.7129C15.887 23.7129 16.2331 23.6185 16.4315 23.4297C16.6348 23.2409 16.7365 23.0062 16.7365 22.7254C16.7365 22.4446 16.6348 22.2099 16.4315 22.0211C16.2331 21.8323 15.887 21.7379 15.3932 21.7379H14.137V23.7129H15.3932ZM19.1898 26.2179C19.0978 26.2179 19.0204 26.1865 18.9575 26.1236C18.8945 26.0606 18.8631 25.9832 18.8631 25.8912V21.4474C18.8631 21.3555 18.8945 21.278 18.9575 21.2151C19.0204 21.1473 19.0978 21.1134 19.1898 21.1134H20.8453C21.3052 21.1134 21.6803 21.1909 21.9708 21.3458C22.2612 21.5007 22.4694 21.6992 22.5952 21.9412C22.7211 22.1832 22.784 22.4446 22.784 22.7254C22.784 23.0062 22.7211 23.2675 22.5952 23.5096C22.4694 23.7516 22.2612 23.9501 21.9708 24.105C21.6803 24.2599 21.3052 24.3373 20.8453 24.3373H19.5238V25.8912C19.5238 25.9832 19.4899 26.0606 19.4222 26.1236C19.3592 26.1865 19.2818 26.2179 19.1898 26.2179ZM20.78 23.7129C21.2737 23.7129 21.6198 23.6185 21.8183 23.4297C22.0216 23.2409 22.1233 23.0062 22.1233 22.7254C22.1233 22.4446 22.0216 22.2099 21.8183 22.0211C21.6198 21.8323 21.2737 21.7379 20.78 21.7379H19.5238V23.7129H20.78ZM25.7529 26.2179C25.6609 26.2179 25.5835 26.1865 25.5205 26.1236C25.4576 26.0606 25.4261 25.9832 25.4261 25.8912V21.7306H23.9449C23.8577 21.7306 23.7851 21.7016 23.7271 21.6435C23.669 21.5854 23.6399 21.5128 23.6399 21.4257C23.6399 21.3385 23.669 21.2659 23.7271 21.2078C23.7851 21.1449 23.8577 21.1134 23.9449 21.1134H27.5609C27.648 21.1134 27.7206 21.1449 27.7787 21.2078C27.8416 21.2659 27.8731 21.3385 27.8731 21.4257C27.8731 21.5128 27.8416 21.5854 27.7787 21.6435C27.7206 21.7016 27.648 21.7306 27.5609 21.7306H26.0869V25.8912C26.0869 25.9832 26.053 26.0606 25.9852 26.1236C25.9223 26.1865 25.8449 26.2179 25.7529 26.2179Z"/> </mask> <path d="M13.803 26.2179C13.7111 26.2179 13.6336 26.1865 13.5707 26.1236C13.5078 26.0606 13.4763 25.9832 13.4763 25.8912V21.4474C13.4763 21.3555 13.5078 21.278 13.5707 21.2151C13.6336 21.1473 13.7111 21.1134 13.803 21.1134H15.4586C15.9184 21.1134 16.2936 21.1909 16.584 21.3458C16.8745 21.5007 17.0826 21.6992 17.2085 21.9412C17.3343 22.1832 17.3972 22.4446 17.3972 22.7254C17.3972 23.0062 17.3343 23.2675 17.2085 23.5096C17.0826 23.7516 16.8745 23.9501 16.584 24.105C16.2936 24.2599 15.9184 24.3373 15.4586 24.3373H14.137V25.8912C14.137 25.9832 14.1032 26.0606 14.0354 26.1236C13.9725 26.1865 13.895 26.2179 13.803 26.2179ZM15.3932 23.7129C15.887 23.7129 16.2331 23.6185 16.4315 23.4297C16.6348 23.2409 16.7365 23.0062 16.7365 22.7254C16.7365 22.4446 16.6348 22.2099 16.4315 22.0211C16.2331 21.8323 15.887 21.7379 15.3932 21.7379H14.137V23.7129H15.3932ZM19.1898 26.2179C19.0978 26.2179 19.0204 26.1865 18.9575 26.1236C18.8945 26.0606 18.8631 25.9832 18.8631 25.8912V21.4474C18.8631 21.3555 18.8945 21.278 18.9575 21.2151C19.0204 21.1473 19.0978 21.1134 19.1898 21.1134H20.8453C21.3052 21.1134 21.6803 21.1909 21.9708 21.3458C22.2612 21.5007 22.4694 21.6992 22.5952 21.9412C22.7211 22.1832 22.784 22.4446 22.784 22.7254C22.784 23.0062 22.7211 23.2675 22.5952 23.5096C22.4694 23.7516 22.2612 23.9501 21.9708 24.105C21.6803 24.2599 21.3052 24.3373 20.8453 24.3373H19.5238V25.8912C19.5238 25.9832 19.4899 26.0606 19.4222 26.1236C19.3592 26.1865 19.2818 26.2179 19.1898 26.2179ZM20.78 23.7129C21.2737 23.7129 21.6198 23.6185 21.8183 23.4297C22.0216 23.2409 22.1233 23.0062 22.1233 22.7254C22.1233 22.4446 22.0216 22.2099 21.8183 22.0211C21.6198 21.8323 21.2737 21.7379 20.78 21.7379H19.5238V23.7129H20.78ZM25.7529 26.2179C25.6609 26.2179 25.5835 26.1865 25.5205 26.1236C25.4576 26.0606 25.4261 25.9832 25.4261 25.8912V21.7306H23.9449C23.8577 21.7306 23.7851 21.7016 23.7271 21.6435C23.669 21.5854 23.6399 21.5128 23.6399 21.4257C23.6399 21.3385 23.669 21.2659 23.7271 21.2078C23.7851 21.1449 23.8577 21.1134 23.9449 21.1134H27.5609C27.648 21.1134 27.7206 21.1449 27.7787 21.2078C27.8416 21.2659 27.8731 21.3385 27.8731 21.4257C27.8731 21.5128 27.8416 21.5854 27.7787 21.6435C27.7206 21.7016 27.648 21.7306 27.5609 21.7306H26.0869V25.8912C26.0869 25.9832 26.053 26.0606 25.9852 26.1236C25.9223 26.1865 25.8449 26.2179 25.7529 26.2179Z" fill="white"/> <path d="M13.5707 26.1236L13.7007 25.9936L13.5707 26.1236ZM13.5707 21.2151L13.7008 21.3452L13.7054 21.3402L13.5707 21.2151ZM17.2085 21.9412L17.0454 22.026L17.2085 21.9412ZM17.2085 23.5096L17.0454 23.4248V23.4248L17.2085 23.5096ZM14.137 24.3373V24.1535H13.9532V24.3373H14.137ZM14.0354 26.1236L13.9102 25.9888L13.9054 25.9936L14.0354 26.1236ZM16.4315 23.4297L16.3064 23.295L16.3048 23.2965L16.4315 23.4297ZM16.4315 22.0211L16.3048 22.1543L16.3064 22.1558L16.4315 22.0211ZM14.137 21.7379V21.5541H13.9532V21.7379H14.137ZM14.137 23.7129H13.9532V23.8967H14.137V23.7129ZM13.803 26.2179V26.0341C13.758 26.0341 13.7279 26.0208 13.7007 25.9936L13.5707 26.1236L13.4407 26.2535C13.5394 26.3522 13.6641 26.4018 13.803 26.4018V26.2179ZM13.5707 26.1236L13.7007 25.9936C13.6735 25.9664 13.6601 25.9362 13.6601 25.8912H13.4763H13.2925C13.2925 26.0301 13.342 26.1549 13.4407 26.2535L13.5707 26.1236ZM13.4763 25.8912H13.6601V21.4474H13.4763H13.2925V25.8912H13.4763ZM13.4763 21.4474H13.6601C13.6601 21.4024 13.6735 21.3723 13.7007 21.3451L13.5707 21.2151L13.4407 21.0851C13.342 21.1838 13.2925 21.3085 13.2925 21.4474H13.4763ZM13.5707 21.2151L13.7054 21.3402C13.7338 21.3096 13.7625 21.2973 13.803 21.2973V21.1134V20.9296C13.6596 20.9296 13.5335 20.985 13.436 21.09L13.5707 21.2151ZM13.803 21.1134V21.2973H15.4586V21.1134V20.9296H13.803V21.1134ZM15.4586 21.1134V21.2973C15.8996 21.2973 16.2422 21.3718 16.4975 21.508L16.584 21.3458L16.6705 21.1836C16.345 21.01 15.9373 20.9296 15.4586 20.9296V21.1134ZM16.584 21.3458L16.4975 21.508C16.7621 21.6491 16.9399 21.8232 17.0454 22.026L17.2085 21.9412L17.3716 21.8564C17.2253 21.5751 16.9868 21.3523 16.6705 21.1836L16.584 21.3458ZM17.2085 21.9412L17.0454 22.026C17.1572 22.2411 17.2134 22.4733 17.2134 22.7254H17.3972H17.5811C17.5811 22.416 17.5114 22.1254 17.3716 21.8564L17.2085 21.9412ZM17.3972 22.7254H17.2134C17.2134 22.9775 17.1572 23.2097 17.0454 23.4248L17.2085 23.5096L17.3716 23.5944C17.5114 23.3254 17.5811 23.0348 17.5811 22.7254H17.3972ZM17.2085 23.5096L17.0454 23.4248C16.9399 23.6276 16.7621 23.8017 16.4975 23.9428L16.584 24.105L16.6705 24.2672C16.9868 24.0985 17.2253 23.8757 17.3716 23.5944L17.2085 23.5096ZM16.584 24.105L16.4975 23.9428C16.2422 24.079 15.8996 24.1535 15.4586 24.1535V24.3373V24.5212C15.9373 24.5212 16.345 24.4408 16.6705 24.2672L16.584 24.105ZM15.4586 24.3373V24.1535H14.137V24.3373V24.5212H15.4586V24.3373ZM14.137 24.3373H13.9532V25.8912H14.137H14.3209V24.3373H14.137ZM14.137 25.8912H13.9532C13.9532 25.9317 13.9409 25.9605 13.9103 25.9888L14.0354 26.1236L14.1605 26.2583C14.2655 26.1608 14.3209 26.0346 14.3209 25.8912H14.137ZM14.0354 26.1236L13.9054 25.9936C13.8782 26.0208 13.8481 26.0341 13.803 26.0341V26.2179V26.4018C13.9419 26.4018 14.0667 26.3522 14.1654 26.2535L14.0354 26.1236ZM15.3932 23.7129V23.8967C15.8998 23.8967 16.3069 23.8019 16.5582 23.5629L16.4315 23.4297L16.3048 23.2965C16.1592 23.4351 15.8741 23.5291 15.3932 23.5291V23.7129ZM16.4315 23.4297L16.5566 23.5644C16.7979 23.3404 16.9203 23.0566 16.9203 22.7254H16.7365H16.5527C16.5527 22.9557 16.4718 23.1415 16.3064 23.295L16.4315 23.4297ZM16.7365 22.7254H16.9203C16.9203 22.3942 16.7979 22.1104 16.5566 21.8864L16.4315 22.0211L16.3064 22.1558C16.4718 22.3093 16.5527 22.4951 16.5527 22.7254H16.7365ZM16.4315 22.0211L16.5582 21.8879C16.3069 21.6489 15.8998 21.5541 15.3932 21.5541V21.7379V21.9217C15.8741 21.9217 16.1592 22.0157 16.3048 22.1543L16.4315 22.0211ZM15.3932 21.7379V21.5541H14.137V21.7379V21.9217H15.3932V21.7379ZM14.137 21.7379H13.9532V23.7129H14.137H14.3209V21.7379H14.137ZM14.137 23.7129V23.8967H15.3932V23.7129V23.5291H14.137V23.7129ZM18.9575 26.1236L19.0874 25.9936L18.9575 26.1236ZM18.9575 21.2151L19.0875 21.3452L19.0922 21.3402L18.9575 21.2151ZM22.5952 21.9412L22.4321 22.026L22.5952 21.9412ZM22.5952 23.5096L22.4321 23.4248V23.4248L22.5952 23.5096ZM19.5238 24.3373V24.1535H19.34V24.3373H19.5238ZM19.4222 26.1236L19.297 25.9888L19.2922 25.9936L19.4222 26.1236ZM21.8183 23.4297L21.6932 23.295L21.6916 23.2965L21.8183 23.4297ZM21.8183 22.0211L21.6916 22.1543L21.6932 22.1558L21.8183 22.0211ZM19.5238 21.7379V21.5541H19.34V21.7379H19.5238ZM19.5238 23.7129H19.34V23.8967H19.5238V23.7129ZM19.1898 26.2179V26.0341C19.1448 26.0341 19.1146 26.0208 19.0874 25.9936L18.9575 26.1236L18.8275 26.2535C18.9262 26.3522 19.0509 26.4018 19.1898 26.4018V26.2179ZM18.9575 26.1236L19.0874 25.9936C19.0603 25.9664 19.0469 25.9362 19.0469 25.8912H18.8631H18.6792C18.6792 26.0301 18.7288 26.1549 18.8275 26.2535L18.9575 26.1236ZM18.8631 25.8912H19.0469V21.4474H18.8631H18.6792V25.8912H18.8631ZM18.8631 21.4474H19.0469C19.0469 21.4024 19.0603 21.3723 19.0874 21.3451L18.9575 21.2151L18.8275 21.0851C18.7288 21.1838 18.6792 21.3085 18.6792 21.4474H18.8631ZM18.9575 21.2151L19.0922 21.3402C19.1205 21.3096 19.1493 21.2973 19.1898 21.2973V21.1134V20.9296C19.0464 20.9296 18.9202 20.985 18.8228 21.09L18.9575 21.2151ZM19.1898 21.1134V21.2973H20.8453V21.1134V20.9296H19.1898V21.1134ZM20.8453 21.1134V21.2973C21.2863 21.2973 21.6289 21.3718 21.8843 21.508L21.9708 21.3458L22.0573 21.1836C21.7318 21.01 21.324 20.9296 20.8453 20.9296V21.1134ZM21.9708 21.3458L21.8843 21.508C22.1488 21.6491 22.3267 21.8232 22.4321 22.026L22.5952 21.9412L22.7583 21.8564C22.6121 21.5751 22.3736 21.3523 22.0573 21.1836L21.9708 21.3458ZM22.5952 21.9412L22.4321 22.026C22.544 22.2411 22.6002 22.4733 22.6002 22.7254H22.784H22.9678C22.9678 22.416 22.8982 22.1254 22.7583 21.8564L22.5952 21.9412ZM22.784 22.7254H22.6002C22.6002 22.9775 22.544 23.2097 22.4321 23.4248L22.5952 23.5096L22.7583 23.5944C22.8982 23.3254 22.9678 23.0348 22.9678 22.7254H22.784ZM22.5952 23.5096L22.4321 23.4248C22.3267 23.6276 22.1488 23.8017 21.8843 23.9428L21.9708 24.105L22.0573 24.2672C22.3736 24.0985 22.6121 23.8757 22.7583 23.5944L22.5952 23.5096ZM21.9708 24.105L21.8843 23.9428C21.6289 24.079 21.2863 24.1535 20.8453 24.1535V24.3373V24.5212C21.324 24.5212 21.7318 24.4408 22.0573 24.2672L21.9708 24.105ZM20.8453 24.3373V24.1535H19.5238V24.3373V24.5212H20.8453V24.3373ZM19.5238 24.3373H19.34V25.8912H19.5238H19.7076V24.3373H19.5238ZM19.5238 25.8912H19.34C19.34 25.9317 19.3276 25.9605 19.2971 25.9888L19.4222 26.1236L19.5473 26.2583C19.6522 26.1608 19.7076 26.0346 19.7076 25.8912H19.5238ZM19.4222 26.1236L19.2922 25.9936C19.265 26.0208 19.2349 26.0341 19.1898 26.0341V26.2179V26.4018C19.3287 26.4018 19.4535 26.3522 19.5522 26.2535L19.4222 26.1236ZM20.78 23.7129V23.8967C21.2866 23.8967 21.6937 23.8019 21.945 23.5629L21.8183 23.4297L21.6916 23.2965C21.546 23.4351 21.2609 23.5291 20.78 23.5291V23.7129ZM21.8183 23.4297L21.9434 23.5644C22.1847 23.3404 22.3071 23.0566 22.3071 22.7254H22.1233H21.9394C21.9394 22.9557 21.8586 23.1415 21.6932 23.295L21.8183 23.4297ZM22.1233 22.7254H22.3071C22.3071 22.3942 22.1847 22.1104 21.9434 21.8864L21.8183 22.0211L21.6932 22.1558C21.8586 22.3093 21.9394 22.4951 21.9394 22.7254H22.1233ZM21.8183 22.0211L21.945 21.8879C21.6937 21.6489 21.2866 21.5541 20.78 21.5541V21.7379V21.9217C21.2609 21.9217 21.546 22.0157 21.6916 22.1543L21.8183 22.0211ZM20.78 21.7379V21.5541H19.5238V21.7379V21.9217H20.78V21.7379ZM19.5238 21.7379H19.34V23.7129H19.5238H19.7076V21.7379H19.5238ZM19.5238 23.7129V23.8967H20.78V23.7129V23.5291H19.5238V23.7129ZM25.5205 26.1236L25.3905 26.2535L25.5205 26.1236ZM25.4261 21.7306H25.61V21.5468H25.4261V21.7306ZM23.7271 21.6435L23.5971 21.7735L23.5971 21.7735L23.7271 21.6435ZM23.7271 21.2078L23.8571 21.3379L23.8621 21.3325L23.7271 21.2078ZM27.7787 21.2078L27.6436 21.3325L27.6486 21.3379L27.654 21.3429L27.7787 21.2078ZM27.7787 21.6435L27.6539 21.5083L27.6487 21.5135L27.7787 21.6435ZM26.0869 21.7306V21.5468H25.9031V21.7306H26.0869ZM25.9852 26.1236L25.8601 25.9888L25.8552 25.9936L25.9852 26.1236ZM25.7529 26.2179V26.0341C25.7078 26.0341 25.6777 26.0208 25.6505 25.9936L25.5205 26.1236L25.3905 26.2535C25.4892 26.3522 25.614 26.4018 25.7529 26.4018V26.2179ZM25.5205 26.1236L25.6505 25.9936C25.6233 25.9664 25.61 25.9362 25.61 25.8912H25.4261H25.2423C25.2423 26.0301 25.2919 26.1549 25.3905 26.2535L25.5205 26.1236ZM25.4261 25.8912H25.61V21.7306H25.4261H25.2423V25.8912H25.4261ZM25.4261 21.7306V21.5468H23.9449V21.7306V21.9145H25.4261V21.7306ZM23.9449 21.7306V21.5468C23.9032 21.5468 23.8784 21.5349 23.857 21.5135L23.7271 21.6435L23.5971 21.7735C23.6919 21.8683 23.8123 21.9145 23.9449 21.9145V21.7306ZM23.7271 21.6435L23.857 21.5135C23.8357 21.4922 23.8237 21.4673 23.8237 21.4257H23.6399H23.4561C23.4561 21.5583 23.5023 21.6787 23.5971 21.7735L23.7271 21.6435ZM23.6399 21.4257H23.8237C23.8237 21.384 23.8357 21.3592 23.857 21.3378L23.7271 21.2078L23.5971 21.0779C23.5023 21.1727 23.4561 21.2931 23.4561 21.4257H23.6399ZM23.7271 21.2078L23.8621 21.3325C23.8847 21.308 23.908 21.2973 23.9449 21.2973V21.1134V20.9296C23.8075 20.9296 23.6855 20.9818 23.592 21.0832L23.7271 21.2078ZM23.9449 21.1134V21.2973H27.5609V21.1134V20.9296H23.9449V21.1134ZM27.5609 21.1134V21.2973C27.5977 21.2973 27.621 21.308 27.6436 21.3325L27.7787 21.2078L27.9138 21.0832C27.8202 20.9818 27.6983 20.9296 27.5609 20.9296V21.1134ZM27.7787 21.2078L27.654 21.3429C27.6785 21.3655 27.6893 21.3888 27.6893 21.4257H27.8731H28.0569C28.0569 21.2882 28.0048 21.1663 27.9034 21.0728L27.7787 21.2078ZM27.8731 21.4257H27.6893C27.6893 21.4625 27.6785 21.4858 27.654 21.5084L27.7787 21.6435L27.9034 21.7786C28.0048 21.685 28.0569 21.5631 28.0569 21.4257H27.8731ZM27.7787 21.6435L27.6487 21.5135C27.6274 21.5349 27.6025 21.5468 27.5609 21.5468V21.7306V21.9145C27.6935 21.9145 27.8139 21.8683 27.9087 21.7735L27.7787 21.6435ZM27.5609 21.7306V21.5468H26.0869V21.7306V21.9145H27.5609V21.7306ZM26.0869 21.7306H25.9031V25.8912H26.0869H26.2707V21.7306H26.0869ZM26.0869 25.8912H25.9031C25.9031 25.9317 25.8907 25.9605 25.8601 25.9888L25.9852 26.1236L26.1103 26.2583C26.2153 26.1608 26.2707 26.0346 26.2707 25.8912H26.0869ZM25.9852 26.1236L25.8552 25.9936C25.8281 26.0208 25.7979 26.0341 25.7529 26.0341V26.2179V26.4018C25.8918 26.4018 26.0165 26.3522 26.1152 26.2535L25.9852 26.1236Z" fill="white" mask="url(#path-6-outside-1_11175_56103)"/> <mask id="mask1_11175_56103" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="6" width="26" height="28"> <path d="M30.4779 34H9.52206C8.40531 34 7.5 33.1046 7.5 32V8C7.5 6.89543 8.40531 6 9.52206 6H23.125L32.5 15.2727V32C32.5 33.1046 31.5947 34 30.4779 34Z" fill="url(#paint2_linear_11175_56103)"/> </mask> <g mask="url(#mask1_11175_56103)"> <ellipse opacity="0.05" cx="6.16728" cy="4.86378" rx="20.5423" ry="19.5" fill="url(#paint3_linear_11175_56103)"/> <ellipse opacity="0.07" cx="6.16702" cy="4.8635" rx="12.9136" ry="12.2273" fill="url(#paint4_linear_11175_56103)"/> </g> <g filter="url(#filter1_d_11175_56103)"> <path d="M32.5 15.2727H25.1471C24.0303 15.2727 23.125 14.3674 23.125 13.2507V6L32.5 15.2727Z" fill="url(#paint5_linear_11175_56103)"/> </g> </g> <defs> <filter id="filter0_f_11175_56103" x="5.29386" y="15.9609" width="29.5954" height="14.8053" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/> <feGaussianBlur stdDeviation="1.79228" result="effect1_foregroundBlur_11175_56103"/> </filter> <filter id="filter1_d_11175_56103" x="21.011" y="3.79412" width="13.9706" height="13.8685" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dx="0.183823" dy="0.0919117"/> <feGaussianBlur stdDeviation="1.1489"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.33 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11175_56103"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_11175_56103" result="shape"/> </filter> <linearGradient id="paint0_linear_11175_56103" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse"> <stop stop-color="#FF7979"/> <stop offset="1" stop-color="#E85555"/> </linearGradient> <linearGradient id="paint1_linear_11175_56103" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse"> <stop stop-color="#FF8777"/> <stop offset="1" stop-color="#F0695F"/> </linearGradient> <linearGradient id="paint2_linear_11175_56103" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse"> <stop stop-color="#FF8777"/> <stop offset="1" stop-color="#F0695F"/> </linearGradient> <linearGradient id="paint3_linear_11175_56103" x1="7.6588" y1="5.53388" x2="13.7698" y2="21.9314" gradientUnits="userSpaceOnUse"> <stop stop-color="white" stop-opacity="0"/> <stop offset="1" stop-color="white"/> </linearGradient> <linearGradient id="paint4_linear_11175_56103" x1="7.10464" y1="5.28368" x2="10.9291" y2="15.572" gradientUnits="userSpaceOnUse"> <stop stop-color="white" stop-opacity="0"/> <stop offset="1" stop-color="white"/> </linearGradient> <linearGradient id="paint5_linear_11175_56103" x1="27.8125" y1="6" x2="27.8125" y2="15.2727" gradientUnits="userSpaceOnUse"> <stop stop-color="#DA5D4C"/> <stop offset="1" stop-color="#E32900"/> </linearGradient> </defs> </svg>';

class CustomFileViewerComponent {
    sanitizer;
    file;
    showMenu = true;
    menuClick = new EventEmitter();
    fileClick = new EventEmitter();
    showTooltip = false;
    mimeTypesMap = {
        'application/pdf': 'PDF',
        'application/vnd.ms-powerpoint': 'PPT',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPT',
        'application/vnd.ms-excel': 'XLS',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLS',
        'application/msword': 'DOC',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOC',
        'image/png': 'PNG',
        'image/jpeg': 'JPG',
        'image/gif': 'GIF',
        'image/x-canon-cr2': 'RAW',
        'image/x-nikon-nef': 'RAW',
        'image/x-sony-arw': 'RAW',
        'image/x-adobe-dng': 'RAW',
        'image/x-panasonic-raw': 'RAW',
        'image/x-olympus-orf': 'RAW',
        'image/x-fuji-raf': 'RAW',
        'image/x-pentax-pef': 'RAW',
    };
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    getFileTypeLabel() {
        return this.mimeTypesMap[this.file.mimeType] || 'FILE';
    }
    getFileIcon() {
        const fileType = this.getFileTypeLabel();
        switch (fileType) {
            case 'PPT': //1
                return this.sanitizer.bypassSecurityTrustHtml(pptSvg);
            case 'PDF': //2
                return this.sanitizer.bypassSecurityTrustHtml(pdfSvg);
            case 'DOC': //3
                return this.sanitizer.bypassSecurityTrustHtml(docSvg);
            case 'XLS': //4
                return this.sanitizer.bypassSecurityTrustHtml(xlsSvg);
            case 'PNG': //5
                return this.sanitizer.bypassSecurityTrustHtml(pngSvg);
            case 'JPG': //6
                return this.sanitizer.bypassSecurityTrustHtml(jpgSvg);
            case 'GIF': //7
                return this.sanitizer.bypassSecurityTrustHtml(gifSvg);
            case 'RAW': //8
                return this.sanitizer.bypassSecurityTrustHtml(rawSvg);
            default:
                return this.sanitizer.bypassSecurityTrustHtml(defaultSvg);
        }
    }
    formatDate(date) {
        if (!date) {
            return '';
        }
        let thisDate = new Date(date);
        const day = thisDate.getDate().toString().padStart(2, '0');
        const month = thisDate.toLocaleString('default', { month: 'short' });
        const year = thisDate.getFullYear();
        return `${day} ${month} ${year}`;
    }
    onFileClick() {
        this.fileClick.emit(this.file);
    }
    onMenuClick(event) {
        event.stopPropagation();
        this.menuClick.emit(this.file);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomFileViewerComponent, deps: [{ token: i1$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: CustomFileViewerComponent, isStandalone: true, selector: "custom-file-viewer", inputs: { file: "file", showMenu: "showMenu" }, outputs: { menuClick: "menuClick", fileClick: "fileClick" }, ngImport: i0, template: "<div class=\"file-viewer-container\" (click)=\"onFileClick()\">\n  <div class=\"file-content\">\n    <div class=\"file-icon\" [innerHTML]=\"getFileIcon()\"></div>\n\n    <!-- File Details -->\n    <div class=\"file-details\">\n      <h3 class=\"file-name\">{{ file.fileName }}</h3>\n      <p class=\"file-meta\">\n        {{ formatDate(file.uploadTime) }} | {{ file.fileSize }}\n      </p>\n    </div>\n\n    <!-- Menu Button -->\n    <div class=\"file-menu\" *ngIf=\"showMenu\">\n      <button\n        class=\"menu-button\"\n        (mouseenter)=\"showTooltip = true\"\n        (mouseleave)=\"showTooltip = false\"\n        (focus)=\"showTooltip = true\"\n        (blur)=\"showTooltip = false\"\n        (click)=\"onMenuClick($event)\"\n        type=\"button\"\n      >\n        <svg\n          width=\"4\"\n          height=\"21\"\n          viewBox=\"0 0 4 21\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <g opacity=\"0.4\">\n            <circle cx=\"2\" cy=\"3.5\" r=\"2\" fill=\"black\" />\n            <circle cx=\"2\" cy=\"10.5\" r=\"2\" fill=\"black\" />\n            <circle cx=\"2\" cy=\"17.5\" r=\"2\" fill=\"black\" />\n          </g>\n        </svg>\n\n        <span class=\"menu-tooltip\" *ngIf=\"showTooltip\"> menu </span>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".file-viewer-container{background:#fff;border:1px solid #e5e7eb;border-radius:.9em;padding:1em .7em 1em 1em;cursor:pointer;transition:all .2s ease;box-shadow:0 1px 3px #0000001a;max-width:15.5em;height:4.9375em;display:flex;justify-content:center;align-items:center}.file-viewer-container:hover{border-color:#d1d5db;box-shadow:0 4px 6px -1px #0000001a;transform:translateY(-1px)}.file-content{display:grid;grid-template-columns:3fr 10fr 1fr;gap:.5em;align-items:center;height:100%}.file-icon{flex-shrink:0;display:flex;align-items:center;justify-content:center;height:2.5em}.file-details{min-width:0;display:flex;flex-direction:column;justify-content:space-between;gap:.125em}.file-name{font-size:1em;font-weight:600;color:#1f2937;margin:0 0 .1em;line-height:1.4;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.file-meta{font-size:.875em;color:#9ca3af;margin:0;font-weight:400}.file-menu{flex-shrink:0}.menu-button{position:relative;background:none;border:none;padding:.3em;border-radius:.1em;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background-color .2s ease}.menu-tooltip{position:absolute;left:110%;top:50%;transform:translateY(-50%);background:#111827;color:#fff;padding:4px 10px;border-radius:4px;font-size:13px;white-space:nowrap;box-shadow:0 2px 8px #00000014;z-index:10;opacity:.95;pointer-events:none}.menu-button:hover{background-color:#f3f4f6}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomFileViewerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-file-viewer', imports: [CommonModule], template: "<div class=\"file-viewer-container\" (click)=\"onFileClick()\">\n  <div class=\"file-content\">\n    <div class=\"file-icon\" [innerHTML]=\"getFileIcon()\"></div>\n\n    <!-- File Details -->\n    <div class=\"file-details\">\n      <h3 class=\"file-name\">{{ file.fileName }}</h3>\n      <p class=\"file-meta\">\n        {{ formatDate(file.uploadTime) }} | {{ file.fileSize }}\n      </p>\n    </div>\n\n    <!-- Menu Button -->\n    <div class=\"file-menu\" *ngIf=\"showMenu\">\n      <button\n        class=\"menu-button\"\n        (mouseenter)=\"showTooltip = true\"\n        (mouseleave)=\"showTooltip = false\"\n        (focus)=\"showTooltip = true\"\n        (blur)=\"showTooltip = false\"\n        (click)=\"onMenuClick($event)\"\n        type=\"button\"\n      >\n        <svg\n          width=\"4\"\n          height=\"21\"\n          viewBox=\"0 0 4 21\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <g opacity=\"0.4\">\n            <circle cx=\"2\" cy=\"3.5\" r=\"2\" fill=\"black\" />\n            <circle cx=\"2\" cy=\"10.5\" r=\"2\" fill=\"black\" />\n            <circle cx=\"2\" cy=\"17.5\" r=\"2\" fill=\"black\" />\n          </g>\n        </svg>\n\n        <span class=\"menu-tooltip\" *ngIf=\"showTooltip\"> menu </span>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".file-viewer-container{background:#fff;border:1px solid #e5e7eb;border-radius:.9em;padding:1em .7em 1em 1em;cursor:pointer;transition:all .2s ease;box-shadow:0 1px 3px #0000001a;max-width:15.5em;height:4.9375em;display:flex;justify-content:center;align-items:center}.file-viewer-container:hover{border-color:#d1d5db;box-shadow:0 4px 6px -1px #0000001a;transform:translateY(-1px)}.file-content{display:grid;grid-template-columns:3fr 10fr 1fr;gap:.5em;align-items:center;height:100%}.file-icon{flex-shrink:0;display:flex;align-items:center;justify-content:center;height:2.5em}.file-details{min-width:0;display:flex;flex-direction:column;justify-content:space-between;gap:.125em}.file-name{font-size:1em;font-weight:600;color:#1f2937;margin:0 0 .1em;line-height:1.4;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.file-meta{font-size:.875em;color:#9ca3af;margin:0;font-weight:400}.file-menu{flex-shrink:0}.menu-button{position:relative;background:none;border:none;padding:.3em;border-radius:.1em;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background-color .2s ease}.menu-tooltip{position:absolute;left:110%;top:50%;transform:translateY(-50%);background:#111827;color:#fff;padding:4px 10px;border-radius:4px;font-size:13px;white-space:nowrap;box-shadow:0 2px 8px #00000014;z-index:10;opacity:.95;pointer-events:none}.menu-button:hover{background-color:#f3f4f6}\n"] }]
        }], ctorParameters: () => [{ type: i1$2.DomSanitizer }], propDecorators: { file: [{
                type: Input,
                args: [{ required: true }]
            }], showMenu: [{
                type: Input
            }], menuClick: [{
                type: Output
            }], fileClick: [{
                type: Output
            }] } });

class CustomSvgIconComponent {
    _path;
    set path(filePath) {
        this._path = `url("${filePath}")`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomSvgIconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: CustomSvgIconComponent, isStandalone: true, selector: "custom-svg-icon", inputs: { path: "path" }, host: { properties: { "style.-webkit-mask-image": "this._path" } }, ngImport: i0, template: "\n<!-- .svg-icon{\n  width: 50px;\n  height: 50px;\n  background-color: red;\n}\n<custom-svg-icon\n[path]=\"'../../../../src/public/gear-icon.svg'\"\nclass=\"svg-icon\"\n></custom-svg-icon> -->\n", styles: [":host{display:inline-block;height:100%;width:100%;background-color:currentColor;-webkit-mask-repeat:no-repeat;-webkit-mask-size:contain;-webkit-mask-position:center}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomSvgIconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-svg-icon', imports: [], template: "\n<!-- .svg-icon{\n  width: 50px;\n  height: 50px;\n  background-color: red;\n}\n<custom-svg-icon\n[path]=\"'../../../../src/public/gear-icon.svg'\"\nclass=\"svg-icon\"\n></custom-svg-icon> -->\n", styles: [":host{display:inline-block;height:100%;width:100%;background-color:currentColor;-webkit-mask-repeat:no-repeat;-webkit-mask-size:contain;-webkit-mask-position:center}\n"] }]
        }], propDecorators: { _path: [{
                type: HostBinding,
                args: ['style.-webkit-mask-image']
            }], path: [{
                type: Input
            }] } });

class CustomLoadingSpinnerComponent {
    local = input(false);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomLoadingSpinnerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomLoadingSpinnerComponent, isStandalone: true, selector: "custom-loading-spinner", inputs: { local: { classPropertyName: "local", publicName: "local", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "@if(!local()){\n\n  <div class=\"global-loader-container \">\n\n    <span class=\"loader\"></span>\n  </div>\n}@else {\n  <div class=\"local-loader-container \">\n\n    <span class=\"loader\"></span>\n  </div>\n\n}\n", styles: [".global-loader-container{height:100vh;width:100vw;display:flex;top:0;left:0;position:absolute;justify-content:center;align-items:center;z-index:999999}.local-loader-container{height:100%;width:100%;display:flex;inset:0;position:absolute;justify-content:center;padding-top:15%;align-items:start;z-index:999999}.loader{width:48px;height:48px;border:5px solid #25c7bc;border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomLoadingSpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-loading-spinner', imports: [], template: "@if(!local()){\n\n  <div class=\"global-loader-container \">\n\n    <span class=\"loader\"></span>\n  </div>\n}@else {\n  <div class=\"local-loader-container \">\n\n    <span class=\"loader\"></span>\n  </div>\n\n}\n", styles: [".global-loader-container{height:100vh;width:100vw;display:flex;top:0;left:0;position:absolute;justify-content:center;align-items:center;z-index:999999}.local-loader-container{height:100%;width:100%;display:flex;inset:0;position:absolute;justify-content:center;padding-top:15%;align-items:start;z-index:999999}.loader{width:48px;height:48px;border:5px solid #25c7bc;border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"] }]
        }] });

const checkedIconSrc = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13" fill="none">
<path d="M15.1789 1.42682L5.81605 12.6623L0.855469 7.55999L1.81146 6.63055L5.73977 10.6711L14.1547 0.573242L15.1789 1.42682Z" fill="#602650"/>
</svg>`;

class CustomSteppersContainerComponent {
    stepperService;
    sanitizer;
    checkedIcon;
    steps = [];
    constructor(stepperService, sanitizer) {
        this.stepperService = stepperService;
        this.sanitizer = sanitizer;
        const checkSvgString = checkedIconSrc;
        this.checkedIcon = this.sanitizer.bypassSecurityTrustHtml(checkSvgString);
    }
    ngOnChanges(changes) {
        if (changes['steps']) {
            this.stepperService.setTotalSteps(this.steps.length); // Set total steps when steps change
        }
    }
    get currentStep() {
        return this.stepperService.currentStep();
    }
    get currentStepIndex() {
        return this.steps.findIndex((step) => step.value === this.currentStep);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomSteppersContainerComponent, deps: [{ token: StepperService }, { token: i1$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomSteppersContainerComponent, isStandalone: true, selector: "custom-steppers-container", inputs: { steps: "steps" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"steppers-container\">\n  @for(step of steps ; track $index){\n  <div class=\"steppers-container__step\">\n    <div class=\"steppers-container__step--data\">\n\n      @if($index < currentStep - 1){\n          <div [innerHTML]=\"checkedIcon\" class=\" step-completed steppers-container__step--circle\" > </div>\n\n      }@else {\n               <div\n          [ngClass]=\"{\n            'step-active': $index === currentStep - 1,\n            'step-upcoming': $index > currentStep - 1\n          }\"\n          class=\" steppers-container__step--circle\"\n        >\n          {{ step.value  }}\n        </div>\n      }\n\n\n      <div\n        [ngClass]=\"{\n          'label-completed': $index < currentStep - 1,\n          'label-active': $index === currentStep - 1,\n          'label-upcoming': $index > currentStep - 1\n        }\"\n        class=\"steppers-container__step--label\"\n      >\n        {{ step.label | translate }}\n      </div>\n    </div>\n    <div class=\"steppers-container__step--line-container\">\n      @if($index < steps.length - 1){\n      <div\n        [ngClass]=\"{\n          'line-completed': $index < currentStep - 1,\n          'line-active': $index === currentStep - 1,\n          'line-upcoming': $index > currentStep - 1\n        }\"class=\"steppers-container__step--line\">\n       </div>\n      }\n\n    </div>\n\n  </div>\n\n  }\n</div>\n\n<div class=\"steps-components\">\n  @for(step of steps ; track step.value){ @if($index === currentStep - 1){\n  <ng-container *ngComponentOutlet=\"step.component\"></ng-container>\n\n  } }\n</div>\n\n", styles: [".steppers-container{display:flex;align-items:center;justify-content:center;width:75%;margin:auto;font-size:1em}.steppers-container__step{display:flex;flex:1;padding:0 .5em}.steppers-container__step:last-child{flex:unset}.steppers-container__step--data{display:flex;justify-content:center;align-items:center}.steppers-container__step--line-container{display:flex;justify-content:center;align-items:center;flex:1;position:relative}.steppers-container__step--circle{width:2em;height:2em;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto;font-weight:700;color:#fff}.steppers-container__step--label{font-size:1em;font-weight:400;padding:0 .5em}.steppers-container__step--line{position:absolute;width:90%;height:2px;background-color:#e2e8f0}.step-completed{background-color:#dff7f7}.step-active{background-color:#602450}.step-upcoming{background-color:#e2e8f0}.label-completed{color:#4b4b4b}.label-active{color:#602450}.label-upcoming{color:#cbd5e0}.line-completed{background-color:#602450}.line-active,.line-upcoming{background-color:#e2e8f0}.steps-components{padding:.5em;height:100%}\n"], dependencies: [{ kind: "directive", type: NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"], exportAs: ["ngComponentOutlet"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "ngmodule", type: TranslateModule }, { kind: "pipe", type: i3$1.TranslatePipe, name: "translate" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomSteppersContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-steppers-container', imports: [NgComponentOutlet, NgClass, TranslateModule,], template: "<div class=\"steppers-container\">\n  @for(step of steps ; track $index){\n  <div class=\"steppers-container__step\">\n    <div class=\"steppers-container__step--data\">\n\n      @if($index < currentStep - 1){\n          <div [innerHTML]=\"checkedIcon\" class=\" step-completed steppers-container__step--circle\" > </div>\n\n      }@else {\n               <div\n          [ngClass]=\"{\n            'step-active': $index === currentStep - 1,\n            'step-upcoming': $index > currentStep - 1\n          }\"\n          class=\" steppers-container__step--circle\"\n        >\n          {{ step.value  }}\n        </div>\n      }\n\n\n      <div\n        [ngClass]=\"{\n          'label-completed': $index < currentStep - 1,\n          'label-active': $index === currentStep - 1,\n          'label-upcoming': $index > currentStep - 1\n        }\"\n        class=\"steppers-container__step--label\"\n      >\n        {{ step.label | translate }}\n      </div>\n    </div>\n    <div class=\"steppers-container__step--line-container\">\n      @if($index < steps.length - 1){\n      <div\n        [ngClass]=\"{\n          'line-completed': $index < currentStep - 1,\n          'line-active': $index === currentStep - 1,\n          'line-upcoming': $index > currentStep - 1\n        }\"class=\"steppers-container__step--line\">\n       </div>\n      }\n\n    </div>\n\n  </div>\n\n  }\n</div>\n\n<div class=\"steps-components\">\n  @for(step of steps ; track step.value){ @if($index === currentStep - 1){\n  <ng-container *ngComponentOutlet=\"step.component\"></ng-container>\n\n  } }\n</div>\n\n", styles: [".steppers-container{display:flex;align-items:center;justify-content:center;width:75%;margin:auto;font-size:1em}.steppers-container__step{display:flex;flex:1;padding:0 .5em}.steppers-container__step:last-child{flex:unset}.steppers-container__step--data{display:flex;justify-content:center;align-items:center}.steppers-container__step--line-container{display:flex;justify-content:center;align-items:center;flex:1;position:relative}.steppers-container__step--circle{width:2em;height:2em;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto;font-weight:700;color:#fff}.steppers-container__step--label{font-size:1em;font-weight:400;padding:0 .5em}.steppers-container__step--line{position:absolute;width:90%;height:2px;background-color:#e2e8f0}.step-completed{background-color:#dff7f7}.step-active{background-color:#602450}.step-upcoming{background-color:#e2e8f0}.label-completed{color:#4b4b4b}.label-active{color:#602450}.label-upcoming{color:#cbd5e0}.line-completed{background-color:#602450}.line-active,.line-upcoming{background-color:#e2e8f0}.steps-components{padding:.5em;height:100%}\n"] }]
        }], ctorParameters: () => [{ type: StepperService }, { type: i1$2.DomSanitizer }], propDecorators: { steps: [{
                type: Input
            }] } });

class CustomFieldsFormComponent {
    fb;
    parentForm;
    controlName;
    addTitle = 'Add Custom Field';
    autoPruneEmpty = true;
    addOneField = input(false);
    requiredField = [
        {
            errorType: [ComponentFormErrorConstant.REQUIRED],
            errorMessage: 'Field is required',
        },
    ];
    constructor(fb) {
        this.fb = fb;
    }
    ngOnInit() {
        if (!this.parentForm.get(this.controlName)) {
            this.parentForm.addControl(this.controlName, this.fb.array([]));
        }
        this.hydrateFromExistingValue();
        if (this.autoPruneEmpty)
            this.pruneEmptyGroups();
    }
    ngOnChanges(_) {
        // if parent replaces the control later (e.g. setControl), hydrate again
        this.hydrateFromExistingValue();
        if (this.autoPruneEmpty)
            this.pruneEmptyGroups();
    }
    hydrateFromExistingValue() {
        const ctrl = this.parentForm.get(this.controlName);
        if (!(ctrl instanceof FormArray))
            return;
        const arr = ctrl;
        const val = arr.value;
        // Case A: already correct (array of FormGroups) -> do nothing
        if (arr.length > 0 && arr.controls.every((c) => c instanceof FormGroup))
            return;
        // Case B: empty controls but we have raw values -> build groups
        if (Array.isArray(val) && val.length > 0) {
            arr.clear({ emitEvent: false });
            for (const item of val) {
                arr.push(this.fb.group({
                    key: [item?.key ?? '', Validators.required],
                    value: [item?.value ?? '', Validators.required],
                }), { emitEvent: false });
            }
        }
    }
    isEmptyGroup(g) {
        const key = (g.get('key')?.value ?? '').toString().trim();
        const val = (g.get('value')?.value ?? '').toString().trim();
        return !key && !val;
    }
    pruneEmptyGroups() {
        const arr = this.fieldsFormArray;
        for (let i = arr.length - 1; i >= 0; i--) {
            const g = arr.at(i);
            if (this.isEmptyGroup(g)) {
                arr.removeAt(i, { emitEvent: false });
            }
        }
    }
    get fieldsFormArray() {
        return this.parentForm.get(this.controlName);
    }
    get fieldsFormArrayControllers() {
        return this.parentForm.get(this.controlName)
            .controls;
    }
    addField() {
        if (this.autoPruneEmpty)
            this.pruneEmptyGroups();
        const group = this.fb.group({
            key: ['', Validators.required],
            value: ['', Validators.required],
        });
        this.fieldsFormArray.push(group);
    }
    removeField(index) {
        this.fieldsFormArray.removeAt(index);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomFieldsFormComponent, deps: [{ token: i1$1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomFieldsFormComponent, isStandalone: true, selector: "custom-fields-form", inputs: { parentForm: { classPropertyName: "parentForm", publicName: "parentForm", isSignal: false, isRequired: true, transformFunction: null }, controlName: { classPropertyName: "controlName", publicName: "controlName", isSignal: false, isRequired: true, transformFunction: null }, addTitle: { classPropertyName: "addTitle", publicName: "addTitle", isSignal: false, isRequired: false, transformFunction: null }, addOneField: { classPropertyName: "addOneField", publicName: "addOneField", isSignal: true, isRequired: false, transformFunction: null } }, usesOnChanges: true, ngImport: i0, template: "<div style=\"margin-top: 1em;\" [formGroup]=\"parentForm\">\n  <!-- <label class=\"custom-label\">Custom Field</label> -->\n\n  @if(addOneField()){\n\n <div class=\"title-header\">\n    <p style=\"font-size: 1em; font-weight: 500; color: #707070\">\n      {{ addTitle | translate }}\n    </p>\n\n    <div (click)=\"addField()\" class=\"plus-icon\">\n      <span class=\"svg-icon\">\n        <svg\n          width=\"14\"\n          height=\"14\"\n          viewBox=\"0 0 14 14\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <g opacity=\"0.5\" clip-path=\"url(#clip0_8646_24705)\">\n            <path\n              opacity=\"0.6\"\n              d=\"M0.852051 6.81799H12.7835\"\n              stroke=\"black\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n            <path\n              opacity=\"0.6\"\n              d=\"M6.81787 0.852234V12.7837\"\n              stroke=\"black\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </g>\n          <defs>\n            <clipPath id=\"clip0_8646_24705\">\n              <rect width=\"14\" height=\"14\" fill=\"white\" />\n            </clipPath>\n          </defs>\n        </svg>\n      </span>\n    </div>\n  </div>\n    <div formArrayName=\"controlName\">\n      @for( group of fieldsFormArrayControllers ; track $index){\n\n      <div [formGroupName]=\"$index\" class=\"field-row\">\n        <custom-input-form\n          name=\"key\"\n          controlName=\"key\"\n          [parentForm]=\"group\"\n          [label]=\"'Field Name'\"\n          [validation]=\"requiredField\"\n          class=\"w-full\"\n        ></custom-input-form>\n\n        <custom-input-form\n          name=\"value\"\n          controlName=\"value\"\n          [parentForm]=\"group\"\n          [label]=\"'Field Value'\"\n          [validation]=\"requiredField\"\n          class=\"w-full\"\n        ></custom-input-form>\n\n        <button type=\"button\" class=\"remove-btn\" (click)=\"removeField($index)\">\n          <svg\n            width=\"24\"\n            height=\"24\"\n            viewBox=\"0 0 24 24\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M11.9091 22.909C17.934 22.909 22.8182 18.0248 22.8182 11.9999C22.8182 5.97499 17.934 1.09082 11.9091 1.09082C5.88417 1.09082 1 5.97499 1 11.9999C1 18.0248 5.88417 22.909 11.9091 22.909Z\"\n              stroke=\"#F35746\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n            <path\n              d=\"M15.1818 8.72754L8.63635 15.273\"\n              stroke=\"#F35746\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n            <path\n              d=\"M8.63635 8.72754L15.1818 15.273\"\n              stroke=\"#F35746\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </svg>\n        </button>\n      </div>\n      }\n    </div>\n\n\n  }@else {\n\n  <div class=\"title-header\">\n    <p style=\"font-size: 1em; font-weight: 500; color: #707070\">\n      {{ addTitle | translate }}\n    </p>\n\n    <div (click)=\"addField()\" class=\"plus-icon\">\n      <span class=\"svg-icon\">\n        <svg\n          width=\"14\"\n          height=\"14\"\n          viewBox=\"0 0 14 14\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <g opacity=\"0.5\" clip-path=\"url(#clip0_8646_24705)\">\n            <path\n              opacity=\"0.6\"\n              d=\"M0.852051 6.81799H12.7835\"\n              stroke=\"black\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n            <path\n              opacity=\"0.6\"\n              d=\"M6.81787 0.852234V12.7837\"\n              stroke=\"black\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </g>\n          <defs>\n            <clipPath id=\"clip0_8646_24705\">\n              <rect width=\"14\" height=\"14\" fill=\"white\" />\n            </clipPath>\n          </defs>\n        </svg>\n      </span>\n    </div>\n  </div>\n\n  <div formArrayName=\"{{ controlName }}\">\n    @for( group of fieldsFormArrayControllers ; track $index){\n\n      <div class=\"inputs-container\">\n\n        <div [formGroupName]=\"$index\" class=\"field-row\">\n          <custom-input-form\n          [className]=\"'new-input left-input'\"\n            name=\"key\"\n            controlName=\"key\"\n            [parentForm]=\"group\"\n            [placeholder]=\"'Field Name'\"\n            [validation]=\"requiredField\"\n            class=\"w-full\"\n          ></custom-input-form>\n\n          <custom-input-form\n          [className]=\"'new-input right-input'\"\n            name=\"value\"\n            controlName=\"value\"\n            [parentForm]=\"group\"\n            [placeholder]=\"'Field Value'\"\n            [validation]=\"requiredField\"\n            class=\"w-full\"\n          ></custom-input-form>\n\n        </div>\n        <button type=\"button\" class=\"remove-btn\" (click)=\"removeField($index)\">\n          <svg\n            width=\"12\"\n            height=\"12\"\n            viewBox=\"0 0 12 12\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M5.25333 5.62094L0.544994 0.977656L1.38757 0.123277L6.09589 4.76651L10.7388 0.0585423L11.5933 0.901174L6.95033 5.60919L11.6586 10.2524L10.8161 11.1068L6.10776 6.46356L1.4648 11.1716L0.610365 10.3289L5.25333 5.62094Z\"\n              fill=\"#FF3C3C\"\n            />\n          </svg>\n        </button>\n      </div>\n\n    }\n  </div>\n\n  }\n</div>\n", styles: [".field-row{display:flex;align-items:start;justify-content:center;gap:0em;margin-top:1em}.inputs-container{position:relative}.remove-btn{transform:scale(1.1) translateY(-50%);margin:auto;position:absolute;inset-inline-end:1em;inset-block-start:1.9em;cursor:pointer}.new-input{border-radius:0!important;width:50%}::ng-deep .new-input input{border-radius:0!important}::ng-deep .left-input input{border-start-start-radius:5px!important;border-end-start-radius:5px!important}::ng-deep .right-input input{border-start-end-radius:5px!important;border-end-end-radius:5px!important}::ng-deep .new-input input::placeholder{color:#707070!important}.add-btn-container{margin-top:10px;text-align:end}.title-header{display:flex;justify-content:space-between;align-items:center;margin:.5 0}.plus-icon{background-color:#fff;cursor:pointer;width:fit-content;padding:.5em;border-radius:50%;border:solid 1px #e6e6e6;display:flex;justify-content:center;align-items:center}.svg-icon{transform:scale(1)}.spacing-down{transform:translateY(1.5em);width:fit-content}\n"], dependencies: [{ kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { kind: "directive", type: i1$1.FormArrayName, selector: "[formArrayName]", inputs: ["formArrayName"] }, { kind: "component", type: CustomInputFormComponent, selector: "custom-input-form", inputs: ["class", "labelClass", "label", "placeholder", "name", "type", "controlName", "parentForm", "validation", "pattern", "height", "disabled", "viewType"], outputs: ["valueChange"] }, { kind: "ngmodule", type: TranslateModule }, { kind: "pipe", type: i3$1.TranslatePipe, name: "translate" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomFieldsFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-fields-form', imports: [ReactiveFormsModule, CustomInputFormComponent, TranslateModule], template: "<div style=\"margin-top: 1em;\" [formGroup]=\"parentForm\">\n  <!-- <label class=\"custom-label\">Custom Field</label> -->\n\n  @if(addOneField()){\n\n <div class=\"title-header\">\n    <p style=\"font-size: 1em; font-weight: 500; color: #707070\">\n      {{ addTitle | translate }}\n    </p>\n\n    <div (click)=\"addField()\" class=\"plus-icon\">\n      <span class=\"svg-icon\">\n        <svg\n          width=\"14\"\n          height=\"14\"\n          viewBox=\"0 0 14 14\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <g opacity=\"0.5\" clip-path=\"url(#clip0_8646_24705)\">\n            <path\n              opacity=\"0.6\"\n              d=\"M0.852051 6.81799H12.7835\"\n              stroke=\"black\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n            <path\n              opacity=\"0.6\"\n              d=\"M6.81787 0.852234V12.7837\"\n              stroke=\"black\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </g>\n          <defs>\n            <clipPath id=\"clip0_8646_24705\">\n              <rect width=\"14\" height=\"14\" fill=\"white\" />\n            </clipPath>\n          </defs>\n        </svg>\n      </span>\n    </div>\n  </div>\n    <div formArrayName=\"controlName\">\n      @for( group of fieldsFormArrayControllers ; track $index){\n\n      <div [formGroupName]=\"$index\" class=\"field-row\">\n        <custom-input-form\n          name=\"key\"\n          controlName=\"key\"\n          [parentForm]=\"group\"\n          [label]=\"'Field Name'\"\n          [validation]=\"requiredField\"\n          class=\"w-full\"\n        ></custom-input-form>\n\n        <custom-input-form\n          name=\"value\"\n          controlName=\"value\"\n          [parentForm]=\"group\"\n          [label]=\"'Field Value'\"\n          [validation]=\"requiredField\"\n          class=\"w-full\"\n        ></custom-input-form>\n\n        <button type=\"button\" class=\"remove-btn\" (click)=\"removeField($index)\">\n          <svg\n            width=\"24\"\n            height=\"24\"\n            viewBox=\"0 0 24 24\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M11.9091 22.909C17.934 22.909 22.8182 18.0248 22.8182 11.9999C22.8182 5.97499 17.934 1.09082 11.9091 1.09082C5.88417 1.09082 1 5.97499 1 11.9999C1 18.0248 5.88417 22.909 11.9091 22.909Z\"\n              stroke=\"#F35746\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n            <path\n              d=\"M15.1818 8.72754L8.63635 15.273\"\n              stroke=\"#F35746\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n            <path\n              d=\"M8.63635 8.72754L15.1818 15.273\"\n              stroke=\"#F35746\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </svg>\n        </button>\n      </div>\n      }\n    </div>\n\n\n  }@else {\n\n  <div class=\"title-header\">\n    <p style=\"font-size: 1em; font-weight: 500; color: #707070\">\n      {{ addTitle | translate }}\n    </p>\n\n    <div (click)=\"addField()\" class=\"plus-icon\">\n      <span class=\"svg-icon\">\n        <svg\n          width=\"14\"\n          height=\"14\"\n          viewBox=\"0 0 14 14\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <g opacity=\"0.5\" clip-path=\"url(#clip0_8646_24705)\">\n            <path\n              opacity=\"0.6\"\n              d=\"M0.852051 6.81799H12.7835\"\n              stroke=\"black\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n            <path\n              opacity=\"0.6\"\n              d=\"M6.81787 0.852234V12.7837\"\n              stroke=\"black\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </g>\n          <defs>\n            <clipPath id=\"clip0_8646_24705\">\n              <rect width=\"14\" height=\"14\" fill=\"white\" />\n            </clipPath>\n          </defs>\n        </svg>\n      </span>\n    </div>\n  </div>\n\n  <div formArrayName=\"{{ controlName }}\">\n    @for( group of fieldsFormArrayControllers ; track $index){\n\n      <div class=\"inputs-container\">\n\n        <div [formGroupName]=\"$index\" class=\"field-row\">\n          <custom-input-form\n          [className]=\"'new-input left-input'\"\n            name=\"key\"\n            controlName=\"key\"\n            [parentForm]=\"group\"\n            [placeholder]=\"'Field Name'\"\n            [validation]=\"requiredField\"\n            class=\"w-full\"\n          ></custom-input-form>\n\n          <custom-input-form\n          [className]=\"'new-input right-input'\"\n            name=\"value\"\n            controlName=\"value\"\n            [parentForm]=\"group\"\n            [placeholder]=\"'Field Value'\"\n            [validation]=\"requiredField\"\n            class=\"w-full\"\n          ></custom-input-form>\n\n        </div>\n        <button type=\"button\" class=\"remove-btn\" (click)=\"removeField($index)\">\n          <svg\n            width=\"12\"\n            height=\"12\"\n            viewBox=\"0 0 12 12\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M5.25333 5.62094L0.544994 0.977656L1.38757 0.123277L6.09589 4.76651L10.7388 0.0585423L11.5933 0.901174L6.95033 5.60919L11.6586 10.2524L10.8161 11.1068L6.10776 6.46356L1.4648 11.1716L0.610365 10.3289L5.25333 5.62094Z\"\n              fill=\"#FF3C3C\"\n            />\n          </svg>\n        </button>\n      </div>\n\n    }\n  </div>\n\n  }\n</div>\n", styles: [".field-row{display:flex;align-items:start;justify-content:center;gap:0em;margin-top:1em}.inputs-container{position:relative}.remove-btn{transform:scale(1.1) translateY(-50%);margin:auto;position:absolute;inset-inline-end:1em;inset-block-start:1.9em;cursor:pointer}.new-input{border-radius:0!important;width:50%}::ng-deep .new-input input{border-radius:0!important}::ng-deep .left-input input{border-start-start-radius:5px!important;border-end-start-radius:5px!important}::ng-deep .right-input input{border-start-end-radius:5px!important;border-end-end-radius:5px!important}::ng-deep .new-input input::placeholder{color:#707070!important}.add-btn-container{margin-top:10px;text-align:end}.title-header{display:flex;justify-content:space-between;align-items:center;margin:.5 0}.plus-icon{background-color:#fff;cursor:pointer;width:fit-content;padding:.5em;border-radius:50%;border:solid 1px #e6e6e6;display:flex;justify-content:center;align-items:center}.svg-icon{transform:scale(1)}.spacing-down{transform:translateY(1.5em);width:fit-content}\n"] }]
        }], ctorParameters: () => [{ type: i1$1.FormBuilder }], propDecorators: { parentForm: [{
                type: Input,
                args: [{ required: true }]
            }], controlName: [{
                type: Input,
                args: [{ required: true }]
            }], addTitle: [{
                type: Input
            }] } });

class CustomSteppersControllersComponent {
    stepperService = inject(StepperService);
    disabledNext = input(true);
    nextLabel = input('');
    prevLabel = input('');
    cancelLabel = input('');
    sendLabel = input('');
    onNext = new EventEmitter();
    onPerv = new EventEmitter();
    onCancel = new EventEmitter();
    onSubmit = new EventEmitter();
    nextStep() {
        this.onNext.emit(true);
    }
    previousStep() {
        this.onPerv.emit(true);
    }
    cancel() {
        this.onCancel.emit(true);
        this.stepperService.notifyCancel$.next(true);
    }
    submit() {
        this.onSubmit.emit(true);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomSteppersControllersComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomSteppersControllersComponent, isStandalone: true, selector: "custom-steppers-controllers", inputs: { disabledNext: { classPropertyName: "disabledNext", publicName: "disabledNext", isSignal: true, isRequired: false, transformFunction: null }, nextLabel: { classPropertyName: "nextLabel", publicName: "nextLabel", isSignal: true, isRequired: false, transformFunction: null }, prevLabel: { classPropertyName: "prevLabel", publicName: "prevLabel", isSignal: true, isRequired: false, transformFunction: null }, cancelLabel: { classPropertyName: "cancelLabel", publicName: "cancelLabel", isSignal: true, isRequired: false, transformFunction: null }, sendLabel: { classPropertyName: "sendLabel", publicName: "sendLabel", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onNext: "onNext", onPerv: "onPerv", onCancel: "onCancel", onSubmit: "onSubmit" }, ngImport: i0, template: "<div class=\"steppers-controllers\">\n  <div class=\"steppers-controllers__left-side\">\n    <custom-button [class]=\"'cancel-btn '\" (buttonClick)=\"cancel()\">{{\n      cancelLabel() | translate\n    }}</custom-button>\n  </div>\n  <div class=\"steppers-controllers__right-side\">\n    <custom-button\n      [class]=\"'prev-btn '\"\n      (buttonClick)=\"previousStep()\"\n      [disabled]=\"!stepperService.hasPrevious()\"\n      >{{ prevLabel() | translate }}</custom-button\n    >\n\n    @if(stepperService.hasNext()){\n\n    <custom-button\n      [class]=\"'next-btn '\"\n      (buttonClick)=\"nextStep()\"\n      [disabled]=\"disabledNext()\"\n      >{{ nextLabel() | translate }}</custom-button\n    >\n    }@else{\n    <custom-button\n      [class]=\"'next-btn '\"\n      (buttonClick)=\"submit()\"\n      [disabled]=\"disabledNext()\"\n      >{{ sendLabel() | translate }}</custom-button\n    >\n\n    }\n  </div>\n</div>\n", styles: ["::ng-deep .cancel-btn{background-color:#f43f5e;color:#fff}::ng-deep .prev-btn{background-color:#06213d;color:#fff;margin-inline-end:1em}::ng-deep .prev-btn:disabled{background-color:#e4e4e4;color:#595959}::ng-deep .next-btn{background-color:#1db3a9;color:#fff}.steppers-controllers{border-top:1px solid #e6e6e6;padding:1.5em 0 0;margin-top:1.5em;display:flex;justify-content:space-between;min-height:4em}.steppers-controllers__left-side{flex:1}.steppers-controllers__right-side{display:flex}\n"], dependencies: [{ kind: "component", type: CustomButtonComponent, selector: "custom-button", inputs: ["disabled", "type", "class"], outputs: ["buttonClick"] }, { kind: "ngmodule", type: TranslateModule }, { kind: "pipe", type: i3$1.TranslatePipe, name: "translate" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomSteppersControllersComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-steppers-controllers', imports: [CustomButtonComponent, TranslateModule], template: "<div class=\"steppers-controllers\">\n  <div class=\"steppers-controllers__left-side\">\n    <custom-button [class]=\"'cancel-btn '\" (buttonClick)=\"cancel()\">{{\n      cancelLabel() | translate\n    }}</custom-button>\n  </div>\n  <div class=\"steppers-controllers__right-side\">\n    <custom-button\n      [class]=\"'prev-btn '\"\n      (buttonClick)=\"previousStep()\"\n      [disabled]=\"!stepperService.hasPrevious()\"\n      >{{ prevLabel() | translate }}</custom-button\n    >\n\n    @if(stepperService.hasNext()){\n\n    <custom-button\n      [class]=\"'next-btn '\"\n      (buttonClick)=\"nextStep()\"\n      [disabled]=\"disabledNext()\"\n      >{{ nextLabel() | translate }}</custom-button\n    >\n    }@else{\n    <custom-button\n      [class]=\"'next-btn '\"\n      (buttonClick)=\"submit()\"\n      [disabled]=\"disabledNext()\"\n      >{{ sendLabel() | translate }}</custom-button\n    >\n\n    }\n  </div>\n</div>\n", styles: ["::ng-deep .cancel-btn{background-color:#f43f5e;color:#fff}::ng-deep .prev-btn{background-color:#06213d;color:#fff;margin-inline-end:1em}::ng-deep .prev-btn:disabled{background-color:#e4e4e4;color:#595959}::ng-deep .next-btn{background-color:#1db3a9;color:#fff}.steppers-controllers{border-top:1px solid #e6e6e6;padding:1.5em 0 0;margin-top:1.5em;display:flex;justify-content:space-between;min-height:4em}.steppers-controllers__left-side{flex:1}.steppers-controllers__right-side{display:flex}\n"] }]
        }], propDecorators: { onNext: [{
                type: Output
            }], onPerv: [{
                type: Output
            }], onCancel: [{
                type: Output
            }], onSubmit: [{
                type: Output
            }] } });

class CustomRadioGroupFormComponent {
    setFirstAsDefaultValue = true;
    name = '';
    controlName = '';
    parentForm;
    validation = [];
    options = [];
    onChange = new EventEmitter();
    ngOnInit() {
        const control = this.parentForm.get(this.controlName);
        if (!control?.value) {
            if (this.setFirstAsDefaultValue && this.options.length > 0) {
                this.parentForm.get(this.controlName)?.setValue(this.options[0].value);
            }
        }
    }
    onRadioChange(event) {
        this.onChange.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomRadioGroupFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomRadioGroupFormComponent, isStandalone: true, selector: "custom-radio-group-form", inputs: { setFirstAsDefaultValue: "setFirstAsDefaultValue", name: "name", controlName: "controlName", parentForm: "parentForm", validation: "validation", options: "options" }, outputs: { onChange: "onChange" }, ngImport: i0, template: "<div class=\"radio-group\" [formGroup]=\"parentForm\">\n  @for(option of options ; track $index){\n\n  <label class=\"custom-radio-wrapper\">\n    <div class=\"radio-error-container\">\n      <custom-app-error\n        [control]=\"parentForm.controls[controlName]\"\n        [validation]=\"validation\"\n        [name]=\"name\"\n      />\n    </div>\n    <input\n      (change)=\"onRadioChange(option)\"\n      type=\"radio\"\n      [value]=\"option.value\"\n      [name]=\"name\"\n      [formControlName]=\"controlName\"\n    />\n    <span class=\"radio-custom\"></span>\n    {{ option.label }}\n  </label>\n  }\n</div>\n", styles: [":host{--radio-border-color: #d9d9d9;--radio-checked-fill-color: #1db3a9}.radio-group{display:flex;gap:1.5em;align-items:center;height:100%}.custom-radio-wrapper{display:inline-flex;align-items:center;height:100%;gap:.5em;position:relative;cursor:pointer;font-weight:500;color:#262626}.custom-radio-wrapper input[type=radio]{opacity:0;position:absolute;pointer-events:none}.radio-custom{width:1.8em;height:1.8em;border:2px solid var(--radio-border-color, #d9d9d9);border-radius:50%;display:inline-block;position:relative;transition:border-color .3s ease}.custom-radio-wrapper input[type=radio]:checked+.radio-custom{border-color:var(--radio-checked-fill-color, #1db3a9)}.custom-radio-wrapper input[type=radio]:checked+.radio-custom:after{content:\"\";width:.8em;height:.8em;background-color:var(--radio-checked-fill-color, #1db3a9);border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.radio-error-container{position:absolute;top:calc(100% + .8em);left:40%;width:100%}.radio-error-container custom-app-error{pointer-events:none}\n"], dependencies: [{ kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name", "showErrors"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomRadioGroupFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-radio-group-form', imports: [CustomAppErrorComponent, ReactiveFormsModule], template: "<div class=\"radio-group\" [formGroup]=\"parentForm\">\n  @for(option of options ; track $index){\n\n  <label class=\"custom-radio-wrapper\">\n    <div class=\"radio-error-container\">\n      <custom-app-error\n        [control]=\"parentForm.controls[controlName]\"\n        [validation]=\"validation\"\n        [name]=\"name\"\n      />\n    </div>\n    <input\n      (change)=\"onRadioChange(option)\"\n      type=\"radio\"\n      [value]=\"option.value\"\n      [name]=\"name\"\n      [formControlName]=\"controlName\"\n    />\n    <span class=\"radio-custom\"></span>\n    {{ option.label }}\n  </label>\n  }\n</div>\n", styles: [":host{--radio-border-color: #d9d9d9;--radio-checked-fill-color: #1db3a9}.radio-group{display:flex;gap:1.5em;align-items:center;height:100%}.custom-radio-wrapper{display:inline-flex;align-items:center;height:100%;gap:.5em;position:relative;cursor:pointer;font-weight:500;color:#262626}.custom-radio-wrapper input[type=radio]{opacity:0;position:absolute;pointer-events:none}.radio-custom{width:1.8em;height:1.8em;border:2px solid var(--radio-border-color, #d9d9d9);border-radius:50%;display:inline-block;position:relative;transition:border-color .3s ease}.custom-radio-wrapper input[type=radio]:checked+.radio-custom{border-color:var(--radio-checked-fill-color, #1db3a9)}.custom-radio-wrapper input[type=radio]:checked+.radio-custom:after{content:\"\";width:.8em;height:.8em;background-color:var(--radio-checked-fill-color, #1db3a9);border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.radio-error-container{position:absolute;top:calc(100% + .8em);left:40%;width:100%}.radio-error-container custom-app-error{pointer-events:none}\n"] }]
        }], propDecorators: { setFirstAsDefaultValue: [{
                type: Input
            }], name: [{
                type: Input,
                args: [{ required: true }]
            }], controlName: [{
                type: Input,
                args: [{ required: true }]
            }], parentForm: [{
                type: Input,
                args: [{ required: true }]
            }], validation: [{
                type: Input,
                args: [{ required: true }]
            }], options: [{
                type: Input,
                args: [{ required: true }]
            }], onChange: [{
                type: Output
            }] } });

const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const hours = Array.from({ length: 12 }, (_, i) => i + 1);

class CustomTimeInputFormComponent {
    parentForm;
    name = '';
    controlName = '';
    label = '';
    labelClass = '';
    inputClass = '';
    validation = [];
    defaultTime = ''; // e.g. '09:00 AM'
    timeChange = new EventEmitter();
    height = '3.6em';
    showErrors = signal(false);
    dropdownOpen = signal(false);
    hours = hours;
    minutes = minutes;
    selectedHour;
    selectedMinute;
    selectedPeriod = 'AM'; // 'AM' |'PM'
    ngOnInit() {
        if (this.defaultTime) {
            this.setTimeFromString(this.defaultTime);
        }
        const control = this.parentForm.get(this.controlName);
        if (control?.value) {
            this.setExcistValue();
        }
        else {
            this.setFormValue();
        }
    }
    toggleDropdown() {
        this.dropdownOpen.set(!this.dropdownOpen());
        const control = this.parentForm.get(this.controlName);
        if (control?.value) {
            this.setExcistValue();
        }
        else {
            this.setFormValue();
        }
        if (this.parentForm.get(this.controlName)?.invalid &&
            !this.dropdownOpen()) {
            this.showErrors.set(true);
            this.parentForm.get(this.controlName)?.markAsTouched();
        }
    }
    setExcistValue() {
        const timeString = this.parentForm.get(this.controlName)?.value; // e.g., "13:45:00"
        const [hour, minute, sec] = timeString.split(':');
        this.selectedHour = Number(hour);
        if (this.selectedHour > 12) {
            this.selectedHour = this.selectedHour - 12;
            this.selectedPeriod = 'PM';
        }
        if (this.selectedHour == 12) {
            this.selectedPeriod = 'PM';
        }
        if (hour == '00') {
            this.selectedHour = '00';
            this.selectedPeriod = 'AM';
        }
        this.selectedMinute = Number(minute);
    }
    setFormValue() {
        let targetHour = this.selectedHour;
        let taregtMin = this.selectedMinute;
        if ((this.selectedHour !== undefined || this.selectedHour !== null) &&
            (this.selectedMinute !== undefined || this.selectedMinute !== null)) {
            if (Number(this.selectedHour) < 10)
                targetHour = `0${Number(this.selectedHour)}`;
            if (Number(this.selectedMinute) < 10)
                taregtMin = `0${Number(this.selectedMinute)}`;
            this.parentForm
                .get(this.controlName)
                ?.setValue(`${targetHour}:${taregtMin}:00`);
            //   this.parentForm.get(this.controlName)?.setValue({
            //   hour: Number(this.selectedHour) ?? 0,
            //   minute:Number(this.selectedMinute)  ?? 0,
            //   second: 0,
            //   nano: 0,
            // });
        }
        else {
            this.parentForm.get(this.controlName)?.setValue(null);
        }
    }
    confirmTime() {
        this.dropdownOpen.set(false);
        let h = Number(this.selectedHour);
        const m = Number(this.selectedMinute);
        if (this.selectedPeriod == 'PM' && h != 12) {
            if (h < 12) {
                this.selectedHour = h + 12;
            }
            else {
                this.selectedHour = h;
            }
        }
        if (this.selectedPeriod == 'AM' && this.selectedHour == 12) {
            this.selectedHour = '00';
        }
        // const timeDetails: ITimeDetails = {
        //   hour: Number(this.selectedHour) ?? 0,
        //   minute: Number(this.selectedMinute) ?? 0,
        //   second: 0,
        //   nano: 0,
        // };
        // console.log('timeDetails: ', timeDetails);
        this.timeChange.emit({ hour: Number(this.selectedHour), minute: m });
        this.setFormValue();
    }
    setTimeFromString(timeStr) {
        const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
        if (match) {
            this.selectedHour = parseInt(match[1], 10);
            this.selectedMinute = parseInt(match[2], 10);
            this.selectedPeriod = match[3].toUpperCase();
        }
    }
    displayTime() {
        const hourVal = Number.isNaN(this.selectedHour) || this.selectedHour === undefined
            ? '--'
            : this.selectedHour?.toString().padStart(2, '0') ?? '--';
        const minuteVal = Number.isNaN(this.selectedMinute) || this.selectedMinute === undefined
            ? '--'
            : this.selectedMinute?.toString().padStart(2, '0') ?? '--';
        return `${hourVal}:${minuteVal}`;
    }
    checkData() {
        if ((this.selectedHour === undefined || this.selectedHour === null) &&
            (this.selectedMinute === undefined || this.selectedMinute === null)) {
            this.parentForm.get(this.controlName)?.setValue(null);
        }
        else {
            this.setFormValue();
        }
        this.toggleDropdown();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomTimeInputFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomTimeInputFormComponent, isStandalone: true, selector: "custom-time-input-form", inputs: { parentForm: "parentForm", name: "name", controlName: "controlName", label: "label", labelClass: "labelClass", inputClass: "inputClass", validation: "validation", defaultTime: "defaultTime", height: "height" }, outputs: { timeChange: "timeChange" }, ngImport: i0, template: "<div class=\"time-picker-container\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n  <div class=\"time-picker__input\">\n    <div class=\"time-error-container\">\n      <custom-app-error\n        [showErrors]=\"showErrors()\"\n        [control]=\"parentForm.controls[controlName]\"\n        [validation]=\"validation\"\n        [name]=\"controlName\"\n      />\n    </div>\n    <input\n      type=\"text\"\n      readonly\n      [class]=\"'custom-input ' + inputClass\"\n      [value]=\"displayTime() || '--:--'\"\n      (click)=\"toggleDropdown()\"\n      [attr.name]=\"name\"\n      [attr.id]=\"name\"\n      [ngStyle]=\"{ '--height': height }\"\n    />\n    <span class=\"time-picker__input--time-icon\" (click)=\"toggleDropdown()\">\n      <svg\n        width=\"22\"\n        height=\"22\"\n        viewBox=\"0 0 22 22\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <g opacity=\"0.5\" clip-path=\"url(#clip0_10062_19268)\">\n          <path\n            d=\"M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z\"\n            stroke=\"#828282\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 5V11L15 13\"\n            stroke=\"#828282\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n        <defs>\n          <clipPath id=\"clip0_10062_19268\">\n            <rect width=\"22\" height=\"22\" fill=\"white\" />\n          </clipPath>\n        </defs>\n      </svg>\n    </span>\n  </div>\n\n  @if(dropdownOpen()){\n\n  <div\n    #dropdownOptions\n    [clickOutside]=\"dropdownOptions\"\n    (clickOutsideEmitter)=\"checkData()\"\n    class=\"time-dropdown-container\"\n    [DropdownAnimationObject]=\"dropdownOpen()\"\n  >\n    <select [(ngModel)]=\"selectedHour\" class=\"time-select\">\n      @for( h of hours ;track $index){\n\n      <option [value]=\"h\">{{ h < 10 ? \"0\" + h : h }}</option>\n      }\n    </select>\n\n    <span>:</span>\n\n    <select [(ngModel)]=\"selectedMinute\" class=\"time-select\">\n      @for( m of minutes ;track $index){\n\n      <option [value]=\"m\">{{ m < 10 ? \"0\" + m : m }}</option>\n      }\n    </select>\n\n    <select [(ngModel)]=\"selectedPeriod\" class=\"time-select time-period\">\n      <option value=\"AM\">AM</option>\n      <option value=\"PM\">PM</option>\n    </select>\n\n    <button type=\"button\" (click)=\"confirmTime()\" class=\"confirm-btn\">\u2714</button>\n  </div>\n  }\n</div>\n", styles: [".time-picker-container{position:relative;width:100%;cursor:pointer;min-width:15em}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.time-picker__input{position:relative}.custom-input{height:var(--height);width:100%;border-radius:calc(var(--height) / 9.6);border:1px solid #82828233;padding-left:.5em;padding-right:.5em;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;cursor:pointer}.time-picker__input--time-icon{position:absolute;right:.5em;top:50%;transform:translateY(-50%);pointer-events:none}.time-dropdown-container{position:absolute;top:100%;inset-inline-start:0;width:100%;min-width:15em;display:flex;justify-content:space-between;align-items:center;gap:.3em;margin-top:4px;background:#fff;border-radius:.375em;border:1px solid #82828233;padding:.5em;z-index:100;box-shadow:0 4px 10px #0000000d}.time-select{width:25%;padding:.3em;font-size:1em;border-radius:.375em;border:1px solid #82828233;background:#f9f9f9}.confirm-btn{background:#1db3a9;border:none;color:#fff;font-size:.8em;border-radius:.375em;padding:.7em;cursor:pointer}.time-period{font-size:.8em}.time-error-container{position:absolute;top:100%;left:1.15em;width:100%}.time-error-container custom-app-error{pointer-events:none}\n"], dependencies: [{ kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name", "showErrors"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1$1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1$1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "directive", type: DropdownsAnimationDirective, selector: "[DropdownAnimationObject]", inputs: ["DropdownAnimationObject"] }], animations: [dropdownAnimation] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomTimeInputFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-time-input-form', imports: [
                        NgStyle,
                        CustomAppErrorComponent,
                        ReactiveFormsModule,
                        FormsModule,
                        ClickOutsideDirective,
                        DropdownsAnimationDirective,
                    ], animations: [dropdownAnimation], template: "<div class=\"time-picker-container\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n  <div class=\"time-picker__input\">\n    <div class=\"time-error-container\">\n      <custom-app-error\n        [showErrors]=\"showErrors()\"\n        [control]=\"parentForm.controls[controlName]\"\n        [validation]=\"validation\"\n        [name]=\"controlName\"\n      />\n    </div>\n    <input\n      type=\"text\"\n      readonly\n      [class]=\"'custom-input ' + inputClass\"\n      [value]=\"displayTime() || '--:--'\"\n      (click)=\"toggleDropdown()\"\n      [attr.name]=\"name\"\n      [attr.id]=\"name\"\n      [ngStyle]=\"{ '--height': height }\"\n    />\n    <span class=\"time-picker__input--time-icon\" (click)=\"toggleDropdown()\">\n      <svg\n        width=\"22\"\n        height=\"22\"\n        viewBox=\"0 0 22 22\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <g opacity=\"0.5\" clip-path=\"url(#clip0_10062_19268)\">\n          <path\n            d=\"M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z\"\n            stroke=\"#828282\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 5V11L15 13\"\n            stroke=\"#828282\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n        <defs>\n          <clipPath id=\"clip0_10062_19268\">\n            <rect width=\"22\" height=\"22\" fill=\"white\" />\n          </clipPath>\n        </defs>\n      </svg>\n    </span>\n  </div>\n\n  @if(dropdownOpen()){\n\n  <div\n    #dropdownOptions\n    [clickOutside]=\"dropdownOptions\"\n    (clickOutsideEmitter)=\"checkData()\"\n    class=\"time-dropdown-container\"\n    [DropdownAnimationObject]=\"dropdownOpen()\"\n  >\n    <select [(ngModel)]=\"selectedHour\" class=\"time-select\">\n      @for( h of hours ;track $index){\n\n      <option [value]=\"h\">{{ h < 10 ? \"0\" + h : h }}</option>\n      }\n    </select>\n\n    <span>:</span>\n\n    <select [(ngModel)]=\"selectedMinute\" class=\"time-select\">\n      @for( m of minutes ;track $index){\n\n      <option [value]=\"m\">{{ m < 10 ? \"0\" + m : m }}</option>\n      }\n    </select>\n\n    <select [(ngModel)]=\"selectedPeriod\" class=\"time-select time-period\">\n      <option value=\"AM\">AM</option>\n      <option value=\"PM\">PM</option>\n    </select>\n\n    <button type=\"button\" (click)=\"confirmTime()\" class=\"confirm-btn\">\u2714</button>\n  </div>\n  }\n</div>\n", styles: [".time-picker-container{position:relative;width:100%;cursor:pointer;min-width:15em}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.time-picker__input{position:relative}.custom-input{height:var(--height);width:100%;border-radius:calc(var(--height) / 9.6);border:1px solid #82828233;padding-left:.5em;padding-right:.5em;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;cursor:pointer}.time-picker__input--time-icon{position:absolute;right:.5em;top:50%;transform:translateY(-50%);pointer-events:none}.time-dropdown-container{position:absolute;top:100%;inset-inline-start:0;width:100%;min-width:15em;display:flex;justify-content:space-between;align-items:center;gap:.3em;margin-top:4px;background:#fff;border-radius:.375em;border:1px solid #82828233;padding:.5em;z-index:100;box-shadow:0 4px 10px #0000000d}.time-select{width:25%;padding:.3em;font-size:1em;border-radius:.375em;border:1px solid #82828233;background:#f9f9f9}.confirm-btn{background:#1db3a9;border:none;color:#fff;font-size:.8em;border-radius:.375em;padding:.7em;cursor:pointer}.time-period{font-size:.8em}.time-error-container{position:absolute;top:100%;left:1.15em;width:100%}.time-error-container custom-app-error{pointer-events:none}\n"] }]
        }], propDecorators: { parentForm: [{
                type: Input,
                args: [{ required: true }]
            }], name: [{
                type: Input,
                args: [{ required: true }]
            }], controlName: [{
                type: Input
            }], label: [{
                type: Input
            }], labelClass: [{
                type: Input
            }], inputClass: [{
                type: Input
            }], validation: [{
                type: Input
            }], defaultTime: [{
                type: Input
            }], timeChange: [{
                type: Output
            }], height: [{
                type: Input
            }] } });

class CustomSearchInputComponent {
    class = '';
    labelClass = '';
    label = '';
    placeholder = '';
    name = '';
    value;
    style = 'base'; // ps. these have effect on style and color
    // @Output() valueChange = new EventEmitter<any>();
    // @Input() model: string = '';
    modelChange = new EventEmitter();
    search = new EventEmitter();
    valueChange = new EventEmitter();
    inputSubject = new Subject();
    constructor() {
        this.inputSubject
            .pipe(debounceTime(1000), distinctUntilChanged(), takeUntilDestroyed())
            .subscribe((val) => this.search.emit(val.trim()));
    }
    onInputChange(value) {
        this.modelChange.emit(value); // for ngModel sync
        this.inputSubject.next(value); // for debounce emit
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomSearchInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomSearchInputComponent, isStandalone: true, selector: "custom-search-input", inputs: { class: "class", labelClass: "labelClass", label: "label", placeholder: "placeholder", name: "name", value: "value", style: "style" }, outputs: { modelChange: "modelChange", search: "search", valueChange: "valueChange" }, ngImport: i0, template: "<div style=\"width: 100%; min-width: 15rem; height: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n  <div\n    [class]=\"\n      'search-input-wrapper' +\n      (style === 'white' ? ' white' : style === 'grey' ? ' grey' : '')\n    \"\n  >\n    <span\n      [class]=\"\n        'search-icon' +\n        (style === 'white' ? ' white' : style === 'grey' ? ' grey' : '')\n      \"\n    >\n      <svg\n        xmlns=\"http://www.w3.org/2000/svg\"\n        width=\"17\"\n        height=\"18\"\n        viewBox=\"0 0 17 18\"\n        fill=\"none\"\n      >\n        <g opacity=\"0.2\">\n          <path\n            d=\"M8.14616 15.375C11.8626 15.375 14.8753 12.3623 14.8753 8.64585C14.8753 4.92944 11.8626 1.91669 8.14616 1.91669C4.42974 1.91669 1.41699 4.92944 1.41699 8.64585C1.41699 12.3623 4.42974 15.375 8.14616 15.375Z\"\n            stroke=\"currentColor\"\n            stroke-width=\"1.5\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M15.5837 16.0834L14.167 14.6667\"\n            stroke=\"currentColor\"\n            stroke-width=\"1.5\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n      </svg>\n    </span>\n\n    <input\n      [id]=\"label || name\"\n      type=\"text\"\n      [name]=\"name\"\n      [placeholder]=\"placeholder\"\n      [ngModel]=\"value\"\n      (ngModelChange)=\"onInputChange($event)\"\n      [class]=\"\n        'custom-input' +\n        (style === 'white' ? ' white' : style === 'grey' ? ' grey' : '') +\n        ' ' +\n        class\n      \"\n    />\n  </div>\n</div>\n", styles: [".custom-input{height:3em;width:100%;border-radius:.375em;border:1px solid #82828233;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;padding-inline-start:2.2em;padding-inline-end:.5em}.custom-input:placeholder-shown{color:#292d32;font-size:1em;font-weight:400}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.search-input-wrapper{position:relative}.search-icon{position:absolute;top:50%;inset-inline-start:.5em;transform:translateY(-50%);color:#9ca3af;pointer-events:none}.search-icon svg{color:#292d32}.custom-input.white{border-radius:.3125em;font-family:var(--FM-Light);padding-inline-start:2.6em;background-color:#fff;color:#06213d;box-shadow:0 2px 4px #0000001a;border:0 solid #82828233}.custom-input.white:placeholder-shown{color:#06213d;height:2.5em}.search-icon.white{color:#06213d;padding-inline-start:.6em}.search-icon.white svg{height:.94em;width:.94em}.custom-input.grey{height:100%;border-radius:.1875em;font-family:var(--FM-Light);padding-inline-start:2.6em;background-color:#fff;color:#06213d;border:1px solid #8282824d}.custom-input.grey:placeholder-shown{color:#292d3266;font-family:var(--FM-Light)}.search-input-wrapper.grey{height:100%}.search-icon.grey{color:#292d32;padding-inline-start:.35em}.search-icon.grey svg{height:.94em;width:.94em;color:#06213d}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomSearchInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-search-input', imports: [FormsModule], template: "<div style=\"width: 100%; min-width: 15rem; height: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n  <div\n    [class]=\"\n      'search-input-wrapper' +\n      (style === 'white' ? ' white' : style === 'grey' ? ' grey' : '')\n    \"\n  >\n    <span\n      [class]=\"\n        'search-icon' +\n        (style === 'white' ? ' white' : style === 'grey' ? ' grey' : '')\n      \"\n    >\n      <svg\n        xmlns=\"http://www.w3.org/2000/svg\"\n        width=\"17\"\n        height=\"18\"\n        viewBox=\"0 0 17 18\"\n        fill=\"none\"\n      >\n        <g opacity=\"0.2\">\n          <path\n            d=\"M8.14616 15.375C11.8626 15.375 14.8753 12.3623 14.8753 8.64585C14.8753 4.92944 11.8626 1.91669 8.14616 1.91669C4.42974 1.91669 1.41699 4.92944 1.41699 8.64585C1.41699 12.3623 4.42974 15.375 8.14616 15.375Z\"\n            stroke=\"currentColor\"\n            stroke-width=\"1.5\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M15.5837 16.0834L14.167 14.6667\"\n            stroke=\"currentColor\"\n            stroke-width=\"1.5\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n      </svg>\n    </span>\n\n    <input\n      [id]=\"label || name\"\n      type=\"text\"\n      [name]=\"name\"\n      [placeholder]=\"placeholder\"\n      [ngModel]=\"value\"\n      (ngModelChange)=\"onInputChange($event)\"\n      [class]=\"\n        'custom-input' +\n        (style === 'white' ? ' white' : style === 'grey' ? ' grey' : '') +\n        ' ' +\n        class\n      \"\n    />\n  </div>\n</div>\n", styles: [".custom-input{height:3em;width:100%;border-radius:.375em;border:1px solid #82828233;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;padding-inline-start:2.2em;padding-inline-end:.5em}.custom-input:placeholder-shown{color:#292d32;font-size:1em;font-weight:400}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.search-input-wrapper{position:relative}.search-icon{position:absolute;top:50%;inset-inline-start:.5em;transform:translateY(-50%);color:#9ca3af;pointer-events:none}.search-icon svg{color:#292d32}.custom-input.white{border-radius:.3125em;font-family:var(--FM-Light);padding-inline-start:2.6em;background-color:#fff;color:#06213d;box-shadow:0 2px 4px #0000001a;border:0 solid #82828233}.custom-input.white:placeholder-shown{color:#06213d;height:2.5em}.search-icon.white{color:#06213d;padding-inline-start:.6em}.search-icon.white svg{height:.94em;width:.94em}.custom-input.grey{height:100%;border-radius:.1875em;font-family:var(--FM-Light);padding-inline-start:2.6em;background-color:#fff;color:#06213d;border:1px solid #8282824d}.custom-input.grey:placeholder-shown{color:#292d3266;font-family:var(--FM-Light)}.search-input-wrapper.grey{height:100%}.search-icon.grey{color:#292d32;padding-inline-start:.35em}.search-icon.grey svg{height:.94em;width:.94em;color:#06213d}\n"] }]
        }], ctorParameters: () => [], propDecorators: { class: [{
                type: Input
            }], labelClass: [{
                type: Input
            }], label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], name: [{
                type: Input
            }], value: [{
                type: Input,
                args: [{ required: true }]
            }], style: [{
                type: Input
            }], modelChange: [{
                type: Output
            }], search: [{
                type: Output
            }], valueChange: [{
                type: Output
            }] } });

const infoSvg = '<svg width="170" height="inherit" viewBox="0 0 150 149" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M75.2708 136.357C41.0382 136.357 13.2873 108.606 13.2873 74.3741C13.2873 40.1415 41.0382 12.3906 75.2708 12.3906C109.503 12.3906 137.254 40.1415 137.254 74.3741C137.254 108.606 109.503 136.357 75.2708 136.357ZM75.2708 123.961C102.657 123.961 124.857 101.76 124.857 74.3741C124.857 46.988 102.657 24.7873 75.2708 24.7873C47.8847 24.7873 25.684 46.988 25.684 74.3741C25.684 101.76 47.8847 123.961 75.2708 123.961ZM69.0724 43.3823H81.4691V55.779H69.0724V43.3823ZM69.0724 68.1757H81.4691V105.366H69.0724V68.1757Z" fill="white"/></svg>';
const checkIcon = `<svg width="inherit" height="inherit" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 65C13 36.2812 36.2812 13 65 13C93.7189 13 117 36.2812 117 65C117 93.7189 93.7189 117 65 117C36.2812 117 13 93.7189 13 65ZM65 0C29.1015 0 0 29.1015 0 65C0 100.898 29.1015 130 65 130C100.898 130 130 100.898 130 65C130 29.1015 100.898 0 65 0ZM100.471 48.4712L91.2789 39.2788L58.5 72.0577L40.3462 53.9039L31.1538 63.0961L58.5 90.4423L100.471 48.4712Z" fill="white"/>
</svg>
`;

const showSuccess = [
    state('void', style({
        opacity: 0,
        height: '9.56em',
    })),
    state('visible', style({
        opacity: 1,
        height: '26.7em',
    })),
    transition('void => visible', [
        animate('2s ease-in-out', keyframes([
            style({ opacity: 0, height: '9.56em', offset: 0 }),
            style({ opacity: 0, height: '7em', offset: 0.5 }),
            style({ opacity: 1, height: '26.7em', offset: 1 }),
        ])),
    ]),
];
const hideConfirm = [
    state('void', style({})),
    state('visible', style({})),
    transition('visible => void', [
        group([
            query('.fade-element', [
                animate('1s ease-in-out', style({
                    opacity: 0,
                })),
            ], { optional: true }),
            query('.slide-element', [
                animate('2s ease-in-out', keyframes([
                    style({ opacity: 1, height: '9.56em', offset: 0 }),
                    style({ opacity: 0.5, height: '7em', offset: 0.5 }),
                    style({ opacity: 0, height: '26.7em', offset: 1 }),
                ])),
            ], { optional: true }),
        ]),
    ]),
];
// const closePopup = [
//   transition(':leave', [
//     style({
//       opacity: 1,
//       // overflow: 'hidden',
//       transform: 'translateY(0)',
//     }),
//     animate(
//       '200ms ease-in',
//       style({ opacity: 0, transform: 'translateY(-100%)' })
//     ),
//   ]),
// ];
class CustomConfirmPopupComponent {
    sanitizer;
    loadingService;
    message = '';
    type = 'info';
    confirmButtonText = 'YES';
    cancelButtonText = 'NO';
    extraButton;
    confirmEvent = new EventEmitter();
    cancelEvent = new EventEmitter();
    extraEvent = new EventEmitter();
    overlayClicked = new EventEmitter(false);
    successMsg = input('');
    checkedInfoSvg;
    checkIcon;
    // Animation states
    currentView = 'confirmation';
    successAnimationState = 'hidden';
    successPressed = false;
    isVisible = false;
    eventVal;
    _showSuccessScreen = false;
    set showSuccessScreen(value) {
        this._showSuccessScreen = value;
        if (value) {
            setTimeout(() => {
                this.isVisible = false;
                this.overlayClicked.emit(true);
            }, 6000);
        }
    }
    get showSuccessScreen() {
        return this._showSuccessScreen;
    }
    constructor(sanitizer, loadingService) {
        this.sanitizer = sanitizer;
        this.loadingService = loadingService;
        const infoSvgIcon = infoSvg;
        this.checkedInfoSvg = this.sanitizer.bypassSecurityTrustHtml(infoSvgIcon);
        this.checkIcon = this.sanitizer.bypassSecurityTrustHtml(checkIcon);
    }
    ngOnInit() {
        this.watchSuccessScreen();
    }
    watchSuccessScreen() {
        if (this.showSuccessScreen) {
            this.transitionToSuccess();
        }
    }
    ngOnChanges() {
        if (this.showSuccessScreen) {
            this.transitionToSuccess();
        }
    }
    open(event) {
        this.isVisible = true;
        this.eventVal = event;
        this.currentView = 'confirmation';
        this.successAnimationState = 'hidden';
    }
    close() {
        if (!this.showSuccessScreen) {
            this.isVisible = false;
            this.currentView = 'confirmation';
            this.successAnimationState = 'hidden';
        }
    }
    checkSuccess() {
        this.confirmEvent.emit();
        this.successPressed = true;
    }
    transitionToSuccess() {
        if (this.isVisible) {
            this.currentView = 'success';
            this.successAnimationState = 'visible';
        }
    }
    onOverlayClick(event) {
        if (event.target === event.currentTarget) {
            this.overlayClicked.emit(true);
            this.isVisible = false;
        }
    }
    startAnimation(event) {
        // console.log('START', event);
    }
    doneAnimation(event) {
        // console.log('DONE', event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomConfirmPopupComponent, deps: [{ token: i1$2.DomSanitizer }, { token: LoadingService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomConfirmPopupComponent, isStandalone: true, selector: "custom-confirm-popup", inputs: { message: { classPropertyName: "message", publicName: "message", isSignal: false, isRequired: true, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: false, isRequired: true, transformFunction: null }, confirmButtonText: { classPropertyName: "confirmButtonText", publicName: "confirmButtonText", isSignal: false, isRequired: false, transformFunction: null }, cancelButtonText: { classPropertyName: "cancelButtonText", publicName: "cancelButtonText", isSignal: false, isRequired: false, transformFunction: null }, extraButton: { classPropertyName: "extraButton", publicName: "extraButton", isSignal: false, isRequired: false, transformFunction: null }, successMsg: { classPropertyName: "successMsg", publicName: "successMsg", isSignal: true, isRequired: false, transformFunction: null }, showSuccessScreen: { classPropertyName: "showSuccessScreen", publicName: "showSuccessScreen", isSignal: false, isRequired: false, transformFunction: null } }, outputs: { confirmEvent: "confirmEvent", cancelEvent: "cancelEvent", extraEvent: "extraEvent", overlayClicked: "overlayClicked" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"popup-overlay\" *ngIf=\"isVisible\" (click)=\"onOverlayClick($event)\">\n  @if(!showSuccessScreen){\n  <div\n    style=\"\n      overflow: hidden;\n      width: 37.7em;\n      height: 25.375em;\n      position: absolute;\n      top: calc(-12.6em + 50%);\n    \"\n    [@slideAndFade]=\"currentView === 'confirmation' ? 'visible' : 'hidden'\"\n    (@slideAndFade.start)=\"startAnimation($event)\"\n    (@slideAndFade.done)=\"doneAnimation($event)\"\n  >\n    <div class=\"popup-container\" [ngClass]=\"type\">\n      <div class=\"popup-header slide-element\">\n        <div class=\"popup-icon fade-element\" [innerHTML]=\"checkedInfoSvg\"></div>\n      </div>\n      <div class=\"popup-message\">\n        <p>{{ message }}</p>\n      </div>\n      <div\n        class=\"popup-actions\"\n        [ngClass]=\"{\n          'three-buttons': extraButton,\n          'two-buttons': !extraButton\n        }\"\n      >\n        <button\n          class=\"btn no-btn\"\n          (click)=\"close(); cancelEvent.emit(); close()\"\n        >\n          {{ cancelButtonText }}\n        </button>\n        @if(extraButton) {\n        <button class=\"btn extra-btn\" (click)=\"extraEvent.emit(); close()\">\n          {{ extraButton }}\n        </button>\n        }\n\n        <button\n          class=\"btn yes-btn\"\n          [ngClass]=\"type\"\n          (click)=\"checkSuccess()\"\n          [disabled]=\"this.loadingService.loading() && successPressed\"\n        >\n          {{ confirmButtonText }}\n        </button>\n      </div>\n    </div>\n  </div>\n  }\n\n  <!-- <div style=\"position: relative; width: 37.7em; height: 26.7em\"> -->\n  @if(showSuccessScreen){\n  <div\n    class=\"success-container\"\n    [@showSuccess]=\"currentView === 'success' ? 'visible' : 'hidden'\"\n  >\n    <!-- [@closePopup]=\"isVisible\" -->\n    <div class=\"check-popup-icon\" [innerHTML]=\"checkIcon\"></div>\n    <p class=\"sucess-msg\">\n      {{ successMsg() }}\n    </p>\n  </div>\n  }\n  <!-- </div> -->\n</div>\n", styles: [".popup-overlay{position:fixed;inset:0;background:#0000001a;display:flex;align-items:center;justify-content:center;z-index:1000}.popup-container{background:#fff;border-radius:.9em;min-width:33em;max-width:95vw;box-shadow:0 4px 24px #0000001a;overflow:hidden;text-align:center;width:37.7em;height:25.375em;position:absolute}.popup-container.info .popup-header{background:#3b80aa}.popup-container.delete .popup-header{background:#f43f5e}.popup-header{padding:2em 0 1em}.popup-icon{width:110px;height:110px;margin:0 auto;display:flex;align-items:center;justify-content:center}.popup-message{padding:3em 2em 0}.popup-message p{font-size:1.3em;color:#707070;font-weight:600;margin:auto}.popup-actions{display:flex;justify-content:center;gap:24px;padding:3em 4em 4em}.popup-actions.three-buttons{gap:18px}.btn{min-width:5.5em;padding:1em 1.5em;border:none;border-radius:.7em;font-size:1.1em;font-weight:500;cursor:pointer;transition:background .2s;color:#fff}.btn:disabled{position:relative;opacity:.5!important;cursor:not-allowed!important;color:transparent}.btn:disabled:after{content:\"\";position:absolute;top:50%;left:50%;width:16px;height:16px;margin:-8px 0 0 -8px;border:2px solid rgba(0,0,0,.2);border-top-color:#0009;border-radius:50%;animation:spin 1s linear infinite;pointer-events:none}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.popup-actions .btn{margin:0}.three-buttons .no-btn{background-color:#ff4c4c}.three-buttons .yes-btn{background-color:#25c7bc}.three-buttons .extra-btn{background-color:#06213d}.two-buttons .yes-btn.info{background:#25c7bc}.two-buttons .yes-btn.delete{background:#ff4c4c}.two-buttons .no-btn{background:#06213d}.success-container{display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:#25c7bc;color:#fff;padding:1.5em 3em;border-radius:.9em;width:37.7em;height:26.7em;position:absolute;top:calc(-12.6em + 50%)}.check-popup-icon{width:11em;max-height:11em;height:80%;margin:2em auto;display:flex;align-items:center;justify-content:center}.sucess-msg{font-size:1.3em;text-align:center}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
            trigger('slideAndFade', hideConfirm),
            trigger('showSuccess', showSuccess),
            // trigger('closePopup', closePopup),
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomConfirmPopupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-confirm-popup', imports: [CommonModule], animations: [
                        trigger('slideAndFade', hideConfirm),
                        trigger('showSuccess', showSuccess),
                        // trigger('closePopup', closePopup),
                    ], template: "<div class=\"popup-overlay\" *ngIf=\"isVisible\" (click)=\"onOverlayClick($event)\">\n  @if(!showSuccessScreen){\n  <div\n    style=\"\n      overflow: hidden;\n      width: 37.7em;\n      height: 25.375em;\n      position: absolute;\n      top: calc(-12.6em + 50%);\n    \"\n    [@slideAndFade]=\"currentView === 'confirmation' ? 'visible' : 'hidden'\"\n    (@slideAndFade.start)=\"startAnimation($event)\"\n    (@slideAndFade.done)=\"doneAnimation($event)\"\n  >\n    <div class=\"popup-container\" [ngClass]=\"type\">\n      <div class=\"popup-header slide-element\">\n        <div class=\"popup-icon fade-element\" [innerHTML]=\"checkedInfoSvg\"></div>\n      </div>\n      <div class=\"popup-message\">\n        <p>{{ message }}</p>\n      </div>\n      <div\n        class=\"popup-actions\"\n        [ngClass]=\"{\n          'three-buttons': extraButton,\n          'two-buttons': !extraButton\n        }\"\n      >\n        <button\n          class=\"btn no-btn\"\n          (click)=\"close(); cancelEvent.emit(); close()\"\n        >\n          {{ cancelButtonText }}\n        </button>\n        @if(extraButton) {\n        <button class=\"btn extra-btn\" (click)=\"extraEvent.emit(); close()\">\n          {{ extraButton }}\n        </button>\n        }\n\n        <button\n          class=\"btn yes-btn\"\n          [ngClass]=\"type\"\n          (click)=\"checkSuccess()\"\n          [disabled]=\"this.loadingService.loading() && successPressed\"\n        >\n          {{ confirmButtonText }}\n        </button>\n      </div>\n    </div>\n  </div>\n  }\n\n  <!-- <div style=\"position: relative; width: 37.7em; height: 26.7em\"> -->\n  @if(showSuccessScreen){\n  <div\n    class=\"success-container\"\n    [@showSuccess]=\"currentView === 'success' ? 'visible' : 'hidden'\"\n  >\n    <!-- [@closePopup]=\"isVisible\" -->\n    <div class=\"check-popup-icon\" [innerHTML]=\"checkIcon\"></div>\n    <p class=\"sucess-msg\">\n      {{ successMsg() }}\n    </p>\n  </div>\n  }\n  <!-- </div> -->\n</div>\n", styles: [".popup-overlay{position:fixed;inset:0;background:#0000001a;display:flex;align-items:center;justify-content:center;z-index:1000}.popup-container{background:#fff;border-radius:.9em;min-width:33em;max-width:95vw;box-shadow:0 4px 24px #0000001a;overflow:hidden;text-align:center;width:37.7em;height:25.375em;position:absolute}.popup-container.info .popup-header{background:#3b80aa}.popup-container.delete .popup-header{background:#f43f5e}.popup-header{padding:2em 0 1em}.popup-icon{width:110px;height:110px;margin:0 auto;display:flex;align-items:center;justify-content:center}.popup-message{padding:3em 2em 0}.popup-message p{font-size:1.3em;color:#707070;font-weight:600;margin:auto}.popup-actions{display:flex;justify-content:center;gap:24px;padding:3em 4em 4em}.popup-actions.three-buttons{gap:18px}.btn{min-width:5.5em;padding:1em 1.5em;border:none;border-radius:.7em;font-size:1.1em;font-weight:500;cursor:pointer;transition:background .2s;color:#fff}.btn:disabled{position:relative;opacity:.5!important;cursor:not-allowed!important;color:transparent}.btn:disabled:after{content:\"\";position:absolute;top:50%;left:50%;width:16px;height:16px;margin:-8px 0 0 -8px;border:2px solid rgba(0,0,0,.2);border-top-color:#0009;border-radius:50%;animation:spin 1s linear infinite;pointer-events:none}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.popup-actions .btn{margin:0}.three-buttons .no-btn{background-color:#ff4c4c}.three-buttons .yes-btn{background-color:#25c7bc}.three-buttons .extra-btn{background-color:#06213d}.two-buttons .yes-btn.info{background:#25c7bc}.two-buttons .yes-btn.delete{background:#ff4c4c}.two-buttons .no-btn{background:#06213d}.success-container{display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:#25c7bc;color:#fff;padding:1.5em 3em;border-radius:.9em;width:37.7em;height:26.7em;position:absolute;top:calc(-12.6em + 50%)}.check-popup-icon{width:11em;max-height:11em;height:80%;margin:2em auto;display:flex;align-items:center;justify-content:center}.sucess-msg{font-size:1.3em;text-align:center}\n"] }]
        }], ctorParameters: () => [{ type: i1$2.DomSanitizer }, { type: LoadingService }], propDecorators: { message: [{
                type: Input,
                args: [{ required: true }]
            }], type: [{
                type: Input,
                args: [{ required: true }]
            }], confirmButtonText: [{
                type: Input
            }], cancelButtonText: [{
                type: Input
            }], extraButton: [{
                type: Input
            }], confirmEvent: [{
                type: Output
            }], cancelEvent: [{
                type: Output
            }], extraEvent: [{
                type: Output
            }], overlayClicked: [{
                type: Output
            }], showSuccessScreen: [{
                type: Input
            }] } });

class CustomCategoryTableComponent {
    tableHeader;
    tableData = [];
    showStatusColumn = false;
    showActionColumn = false;
    rowClass = '';
    headerClass = '';
    templates = {};
    statusCol = {
        header: 'status',
        trueValue: true,
        trueText: 'Active',
        falseText: 'Inactive',
    };
    onEdit = new EventEmitter();
    onView = new EventEmitter();
    onDelete = new EventEmitter();
    onRowClick = new EventEmitter();
    editingCell = null;
    isCellEditing(rowIndex, col) {
        return (!!this.editingCell &&
            this.editingCell.rowIndex === rowIndex &&
            this.editingCell.colKey === String(col.body));
    }
    startEditing(rowIndex, col) {
        if (!col.isEditable || !col.body)
            return;
        const colKey = String(col.body);
        const sameCell = this.editingCell &&
            this.editingCell.rowIndex === rowIndex &&
            this.editingCell.colKey === colKey;
        this.editingCell = sameCell ? null : { rowIndex, colKey };
    }
    cancelEditing() {
        this.editingCell = null;
    }
    onCellClick(event, rowIndex, col) {
        event.stopPropagation();
        this.startEditing(rowIndex, col);
    }
    getCellValue(row, col) {
        if (!col.body)
            return null;
        return row[col.body];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomCategoryTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomCategoryTableComponent, isStandalone: true, selector: "custom-category-table", inputs: { tableHeader: "tableHeader", tableData: "tableData", showStatusColumn: "showStatusColumn", showActionColumn: "showActionColumn", rowClass: "rowClass", headerClass: "headerClass", templates: "templates", statusCol: "statusCol" }, outputs: { onEdit: "onEdit", onView: "onView", onDelete: "onDelete", onRowClick: "onRowClick" }, ngImport: i0, template: "<table class=\"striped-table\">\n  <thead [class]=\"headerClass\">\n    <tr>\n      @for (col of tableHeader; track $index) {\n        <th>{{ col.header }}</th>\n      }\n\n      @if (showStatusColumn) {\n        <th>Status</th>\n      }\n\n      @if (showActionColumn) {\n        <th>Actions</th>\n      }\n    </tr>\n  </thead>\n\n  <!-- Clicking outside cells cancels editing -->\n  <tbody (click)=\"cancelEditing()\">\n    @for (item of tableData; track $index; let rowIndex = $index) {\n      <tr\n        [class]=\"rowClass\"\n        (click)=\"onRowClick.emit(item)\"\n      >\n        @for (col of tableHeader; track $index) {\n          <td\n            (click)=\"onCellClick($event, rowIndex, col)\"\n            [class.cursor-pointer]=\"col.isEditable\"\n          >\n            <!-- Editable template -->\n            @if (col.htmlRef && templates[col.htmlRef]) {\n              <ng-container\n                *ngTemplateOutlet=\"\n                  templates[col.htmlRef];\n                  context: {\n                    $implicit: item,\n                    editing: isCellEditing(rowIndex, col),\n                    cancelEditing: cancelEditing.bind(this)\n                  }\n                \"\n              >\n              </ng-container>\n            }\n\n            <!-- Plain value -->\n            @else if (col.body) {\n              {{\n                col.inputTransform\n                  ? col.inputTransform(item)\n                  : getCellValue(item, col)\n              }}\n            }\n          </td>\n        }\n\n        @if (showStatusColumn) {\n          <td>\n            @if (item[statusCol.header] === statusCol.trueValue) {\n              <span class=\"true\">{{ statusCol.trueText }}</span>\n            } @else {\n              <span class=\"false\">{{ statusCol.falseText }}</span>\n            }\n          </td>\n        }\n\n        @if (showActionColumn) {\n          <td>\n            <!-- Actions here -->\n          </td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n", styles: [".category-section{background-color:#f4f6fb}.category-header{padding:0;border-left:5px solid #25c7bc}.table-header-cell{display:flex;flex-direction:row;justify-content:flex-start;gap:.5em;align-items:center}.sort-icon{height:1.5em;display:flex;align-items:center;justify-content:center;overflow:auto;cursor:pointer}.category-header-wrapper{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;font-weight:700;background-color:#f4f6fb}.category-title{font-size:16px;color:#1a1a1a}.toggle-button{background:none;border:none;color:#25c7bc;cursor:pointer;font-weight:600}.category-item-row{background-color:#fff}.actions{display:flex;justify-content:start;align-items:center;gap:10px;cursor:pointer}.status-td{padding:.1em .4em!important}.status{height:100%;display:flex;justify-content:center;align-items:center}.status div{display:flex;justify-content:center;align-items:center;padding:.25em 0;border:0px solid transparent;border-radius:1em;width:6em}.true{color:#0d7d0b;background-color:#c8ffc7}.false{color:#d2344f;background-color:#ffe0e5}.striped-table{width:82.5em;overflow:hidden;background-color:#fff}.striped-table thead{color:#4b4b4b;text-align:left;font-size:.85em}.striped-table th{padding:10px;border:1px solid #eeeeee}.striped-table tbody tr{font-weight:500;font-size:.72em}.striped-table td{padding:.8em .5em;color:#4b4b4b;border:1px solid #eeeeee}.striped-table tbody tr td:first-child{background-color:#fcfbfb}@media (max-width: 768px){.striped-table{display:block}.striped-table thead{display:none}.striped-table tbody tr{display:block;margin-bottom:15px;border-radius:8px;box-shadow:0 2px 8px #0000001a}.striped-table td{display:block;text-align:right;padding-left:50%;position:relative;border:1px solid #e0e0e0}.striped-table td:before{content:attr(data-label);position:absolute;left:15px;width:45%;padding-right:10px;font-weight:600;text-align:left;color:#4a6fa5}}.active{background-color:#c8ffc7;width:85px;height:28px;border-radius:100px;display:flex;justify-self:center;align-items:center;font-size:.67em;font-weight:500;color:#0d7d0b;text-align:center}.inactive{background-color:#ffe0e5;width:85px;height:28px;border-radius:100px;display:flex;justify-content:center;align-items:center;font-size:.67em;font-weight:500;color:#d2344f;text-align:center}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomCategoryTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-category-table', imports: [], template: "<table class=\"striped-table\">\n  <thead [class]=\"headerClass\">\n    <tr>\n      @for (col of tableHeader; track $index) {\n        <th>{{ col.header }}</th>\n      }\n\n      @if (showStatusColumn) {\n        <th>Status</th>\n      }\n\n      @if (showActionColumn) {\n        <th>Actions</th>\n      }\n    </tr>\n  </thead>\n\n  <!-- Clicking outside cells cancels editing -->\n  <tbody (click)=\"cancelEditing()\">\n    @for (item of tableData; track $index; let rowIndex = $index) {\n      <tr\n        [class]=\"rowClass\"\n        (click)=\"onRowClick.emit(item)\"\n      >\n        @for (col of tableHeader; track $index) {\n          <td\n            (click)=\"onCellClick($event, rowIndex, col)\"\n            [class.cursor-pointer]=\"col.isEditable\"\n          >\n            <!-- Editable template -->\n            @if (col.htmlRef && templates[col.htmlRef]) {\n              <ng-container\n                *ngTemplateOutlet=\"\n                  templates[col.htmlRef];\n                  context: {\n                    $implicit: item,\n                    editing: isCellEditing(rowIndex, col),\n                    cancelEditing: cancelEditing.bind(this)\n                  }\n                \"\n              >\n              </ng-container>\n            }\n\n            <!-- Plain value -->\n            @else if (col.body) {\n              {{\n                col.inputTransform\n                  ? col.inputTransform(item)\n                  : getCellValue(item, col)\n              }}\n            }\n          </td>\n        }\n\n        @if (showStatusColumn) {\n          <td>\n            @if (item[statusCol.header] === statusCol.trueValue) {\n              <span class=\"true\">{{ statusCol.trueText }}</span>\n            } @else {\n              <span class=\"false\">{{ statusCol.falseText }}</span>\n            }\n          </td>\n        }\n\n        @if (showActionColumn) {\n          <td>\n            <!-- Actions here -->\n          </td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n", styles: [".category-section{background-color:#f4f6fb}.category-header{padding:0;border-left:5px solid #25c7bc}.table-header-cell{display:flex;flex-direction:row;justify-content:flex-start;gap:.5em;align-items:center}.sort-icon{height:1.5em;display:flex;align-items:center;justify-content:center;overflow:auto;cursor:pointer}.category-header-wrapper{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;font-weight:700;background-color:#f4f6fb}.category-title{font-size:16px;color:#1a1a1a}.toggle-button{background:none;border:none;color:#25c7bc;cursor:pointer;font-weight:600}.category-item-row{background-color:#fff}.actions{display:flex;justify-content:start;align-items:center;gap:10px;cursor:pointer}.status-td{padding:.1em .4em!important}.status{height:100%;display:flex;justify-content:center;align-items:center}.status div{display:flex;justify-content:center;align-items:center;padding:.25em 0;border:0px solid transparent;border-radius:1em;width:6em}.true{color:#0d7d0b;background-color:#c8ffc7}.false{color:#d2344f;background-color:#ffe0e5}.striped-table{width:82.5em;overflow:hidden;background-color:#fff}.striped-table thead{color:#4b4b4b;text-align:left;font-size:.85em}.striped-table th{padding:10px;border:1px solid #eeeeee}.striped-table tbody tr{font-weight:500;font-size:.72em}.striped-table td{padding:.8em .5em;color:#4b4b4b;border:1px solid #eeeeee}.striped-table tbody tr td:first-child{background-color:#fcfbfb}@media (max-width: 768px){.striped-table{display:block}.striped-table thead{display:none}.striped-table tbody tr{display:block;margin-bottom:15px;border-radius:8px;box-shadow:0 2px 8px #0000001a}.striped-table td{display:block;text-align:right;padding-left:50%;position:relative;border:1px solid #e0e0e0}.striped-table td:before{content:attr(data-label);position:absolute;left:15px;width:45%;padding-right:10px;font-weight:600;text-align:left;color:#4a6fa5}}.active{background-color:#c8ffc7;width:85px;height:28px;border-radius:100px;display:flex;justify-self:center;align-items:center;font-size:.67em;font-weight:500;color:#0d7d0b;text-align:center}.inactive{background-color:#ffe0e5;width:85px;height:28px;border-radius:100px;display:flex;justify-content:center;align-items:center;font-size:.67em;font-weight:500;color:#d2344f;text-align:center}\n"] }]
        }], propDecorators: { tableHeader: [{
                type: Input
            }], tableData: [{
                type: Input
            }], showStatusColumn: [{
                type: Input
            }], showActionColumn: [{
                type: Input
            }], rowClass: [{
                type: Input
            }], headerClass: [{
                type: Input
            }], templates: [{
                type: Input
            }], statusCol: [{
                type: Input
            }], onEdit: [{
                type: Output
            }], onView: [{
                type: Output
            }], onDelete: [{
                type: Output
            }], onRowClick: [{
                type: Output
            }] } });

class CustomDynamicTableWithCategoriesComponent {
    sanitizer;
    config;
    hasCheckBox = false;
    cellTemplates = {};
    actionTemplates = {};
    sortColumn = new EventEmitter();
    nameClick = new EventEmitter();
    selected = new Set();
    enableAllSelection = false;
    selectedLabel = '';
    bulkActions = [];
    bulkActionChange = new EventEmitter();
    selectAllChange = new EventEmitter();
    selectionChange = new EventEmitter();
    checkedSortIcon;
    checkedActionViewSvg;
    checkedActionEditSvg;
    checkedActionDeleteSvg;
    expandSvg;
    editingCell = null;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.checkedSortIcon = this.sanitizer.bypassSecurityTrustHtml(sortSvg);
        this.checkedActionViewSvg = this.sanitizer.bypassSecurityTrustHtml(actionViewSvg);
        this.checkedActionEditSvg = this.sanitizer.bypassSecurityTrustHtml(actionEditSvg);
        this.checkedActionDeleteSvg = this.sanitizer.bypassSecurityTrustHtml(actionDeleteSvg);
        this.expandSvg = this.sanitizer.bypassSecurityTrustHtml(expandIcon);
    }
    cancelEditing() {
        this.editingCell = null;
    }
    getRowKey(row, groupIndex, rowIndex) {
        const id = row?.id ?? row?.uuid ?? row?._id;
        if (id !== undefined && id !== null)
            return String(id);
        return `g${groupIndex}__r${rowIndex}`;
    }
    getColKey(col) {
        return String(col.key);
    }
    isCellEditing(row, col, groupIndex, rowIndex) {
        if (!this.editingCell)
            return false;
        const rowKey = this.getRowKey(row, groupIndex, rowIndex);
        const colKey = this.getColKey(col);
        return this.editingCell.rowKey === rowKey && this.editingCell.colKey === colKey;
    }
    onCellClick(ev, row, col, groupIndex, rowIndex) {
        ev.stopPropagation();
        if (!this.cellTemplates?.[col.key])
            return;
        const rowKey = this.getRowKey(row, groupIndex, rowIndex);
        const colKey = this.getColKey(col);
        const sameCell = this.editingCell &&
            this.editingCell.rowKey === rowKey &&
            this.editingCell.colKey === colKey;
        this.editingCell = sameCell ? null : { rowKey, colKey, groupIndex, rowIndex };
    }
    onContainerClick(ev) {
        if (ev.target === ev.currentTarget) {
            this.cancelEditing();
        }
    }
    onAction(row, handler) {
        handler(row);
    }
    getNestedValue(obj, path) {
        if (!path)
            return undefined;
        const parts = path.split(/[\.\[\]']+/).filter(Boolean);
        return parts.reduce((acc, key) => acc?.[key], obj);
    }
    isSelected(id) {
        return this.selected.has(id);
    }
    toggleSelection(id, checked) {
        const next = new Set(this.selected);
        checked ? next.add(id) : next.delete(id);
        this.selected = next;
        this.selectionChange.emit(next);
    }
    toggleGroup(group, checked) {
        const next = new Set(this.selected);
        group.items.forEach((item) => {
            checked ? next.add(item.id) : next.delete(item.id);
        });
        this.selected = next;
        this.selectionChange.emit(next);
    }
    onBulkAction(action) {
        if (!action || typeof action.callback !== 'function')
            return;
        this.bulkActionChange.emit({
            action,
            selection: this.selected,
        });
    }
    isGroupSelected(group) {
        return group.items.length && group.items.every((item) => this.selected.has(item.id));
    }
    isGroupIndeterminate(group) {
        const selectedCount = group.items.filter((i) => this.selected.has(i.id)).length;
        return selectedCount > 0 && selectedCount < group.items.length;
    }
    toggleSelectAll(checked) {
        const next = new Set();
        if (checked) {
            this.config.groupedData.forEach((group) => group.items.forEach((item) => next.add(item.id)));
        }
        this.selected = next;
        this.selectAllChange.emit(checked);
    }
    isAllSelected() {
        const allItems = this.config.groupedData.flatMap((g) => g.items);
        return allItems.length && allItems.every((i) => this.selected.has(i.id));
    }
    isGroupPartial(group) {
        const selectedCount = group.items.filter((i) => this.selected.has(i.id)).length;
        return selectedCount > 0 && selectedCount < group.items.length;
    }
    removeSelections() {
        this.selected = new Set();
        if (this.enableAllSelection) {
            this.selectAllChange.emit(false);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomDynamicTableWithCategoriesComponent, deps: [{ token: i1$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomDynamicTableWithCategoriesComponent, isStandalone: true, selector: "custom-dynamic-table-with-categories", inputs: { config: "config", hasCheckBox: "hasCheckBox", cellTemplates: "cellTemplates", actionTemplates: "actionTemplates", selected: "selected", enableAllSelection: "enableAllSelection", selectedLabel: "selectedLabel", bulkActions: "bulkActions" }, outputs: { sortColumn: "sortColumn", nameClick: "nameClick", bulkActionChange: "bulkActionChange", selectAllChange: "selectAllChange", selectionChange: "selectionChange" }, ngImport: i0, template: "<div class=\"table-container\" (click)=\"onContainerClick($event)\">\n  <table class=\"striped-table\">\n    <thead>\n      <tr>\n\n        @for (column of config.columns; track $index) {\n        <th>\n          <div class=\"table-header-cell\">\n            @if (hasCheckBox && $index==0) {\n            @if(enableAllSelection){\n            <div class=\"table-header-cell\">\n              <custom-check-box name=\"select-all\" [value]=\"isAllSelected()\" (valueChange)=\"toggleSelectAll($event)\">\n              </custom-check-box>\n            </div>\n            }\n            }\n            {{ column.label | translate }}\n\n            @if (column.sort) {\n            <div [innerHTML]=\"checkedSortIcon\" class=\"sort-icon\"\n              (click)=\"sortColumn.emit(column); $event.stopPropagation()\">\n            </div>\n            }\n          </div>\n        </th>\n        }\n\n        @if (config.actions?.length) {\n        <th class=\"actions-width\">\n          <div class=\"table-header-cell\">\n            {{ \"Actions\" | translate }}\n          </div>\n        </th>\n        }\n      </tr>\n    </thead>\n\n    <tbody>\n      @if (config.groupedData?.length) {\n      @for (group of config.groupedData; track $index; let groupIndex = $index) {\n\n      <!-- Group Header Row -->\n      <tr class=\"group-header-row\">\n\n\n        <td [attr.colspan]=\"config.columns.length + (config.actions?.length ? 1 : 0)\" class=\"group-header__wrapper\"\n          (click)=\"group.isCollapsed = !group.isCollapsed; $event.stopPropagation()\" style=\"cursor: pointer\">\n          <div class=\"group-header__title-container\">\n            <div style=\"\n                    display: flex;\n                    align-items: center;\n                    gap: 0.5em;\n                    justify-content: flex-start;\n                  \">\n              @if (hasCheckBox) {\n              <div class=\"check-box-container\">\n                <custom-check-box [name]=\"'group-' + groupIndex\" [value]=\"isGroupSelected(group)\"\n                  (valueChange)=\"toggleGroup(group, $event)\">\n                </custom-check-box>\n\n              </div>\n              }\n              <span class=\"drag-handle\" style=\"cursor: grab\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"8\" height=\"16\" fill=\"none\">\n                  <circle cx=\".5\" cy=\".5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\".5\" cy=\"7.5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\".5\" cy=\"14.5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\"7.5\" cy=\".5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\"7.5\" cy=\"7.5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\"7.5\" cy=\"14.5\" r=\".5\" fill=\"#000\" />\n                </svg>\n              </span>\n            </div>\n            <div [ngClass]=\"{ rotated: group.isCollapsed }\" [innerHTML]=\"expandSvg\" class=\"group-header__expand-icon\">\n            </div>\n            <p class=\"group-header__title\">{{ group.title }}</p>\n          </div>\n        </td>\n      </tr>\n\n      <!-- Group Task Rows -->\n      @if (!group.isCollapsed) {\n      @for (row of group.items; track $index; let rowIndex = $index) {\n      <tr [@rowFade] (click)=\"$event.stopPropagation()\">\n\n        @for (col of config.columns; track $index; let idx=$index) {\n\n        <!-- Non-actions -->\n        @if (col.type !== 'actions') {\n\n        <!-- Name columns (keep your click behavior) -->\n        @if (col.key === 'nameEn' || col.key === 'nameAr') {\n        <td style=\"min-width: 10em\">\n          <div style=\"display:flex; align-items:center;gap: 0.5em; padding-left: 1.65em;\" [class]=\"col.customClass\">\n\n            @if(idx===0){\n            <div>\n              <span class=\"drag-handle\" style=\"cursor: grab\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"8\" height=\"16\" fill=\"none\">\n                  <circle cx=\".5\" cy=\".5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\".5\" cy=\"7.5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\".5\" cy=\"14.5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\"7.5\" cy=\".5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\"7.5\" cy=\"7.5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\"7.5\" cy=\"14.5\" r=\".5\" fill=\"#000\" />\n                </svg>\n              </span>\n\n              @if (hasCheckBox) {\n              <custom-check-box [name]=\"'item-' + row.id\" [value]=\"isSelected(row.id)\"\n                (valueChange)=\"toggleSelection(row.id, $event)\">\n              </custom-check-box>\n              }\n            </div>\n            }\n\n            <span style=\"font-size:1em; color:#4b4b4b; font-family:var(--FM-Light);\" (click)=\"nameClick.emit(row); $event.stopPropagation()\">\n              {{ getNestedValue(row, col.key) }}\n            </span>\n          </div>\n        </td>\n        }\n        @else {\n        <td [class]=\"col.customClass\"\n          [class.cursor-pointer]=\"!!cellTemplates[col.key]\">\n          <div style=\"\n                        display: flex;\n                        align-items: center;\n                        gap: 0.5em;\n                      \"  [class]=\"col.customClass\">\n            @if(idx===0){\n\n            <span class=\"drag-handle\" style=\"cursor: grab\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"8\" height=\"16\" fill=\"none\">\n                <circle cx=\".5\" cy=\".5\" r=\".5\" fill=\"#000\" />\n                <circle cx=\".5\" cy=\"7.5\" r=\".5\" fill=\"#000\" />\n                <circle cx=\".5\" cy=\"14.5\" r=\".5\" fill=\"#000\" />\n                <circle cx=\"7.5\" cy=\".5\" r=\".5\" fill=\"#000\" />\n                <circle cx=\"7.5\" cy=\"7.5\" r=\".5\" fill=\"#000\" />\n                <circle cx=\"7.5\" cy=\"14.5\" r=\".5\" fill=\"#000\" />\n              </svg>\n            </span>\n\n            @if (hasCheckBox) {\n            <custom-check-box [name]=\"'item-' + row.id\" [value]=\"isSelected(row.id)\"\n              (valueChange)=\"toggleSelection(row.id, $event)\">\n            </custom-check-box>\n            }\n            }\n            <div (click)=\"onCellClick($event, row, col, groupIndex, rowIndex)\">\n            @if (cellTemplates[col.key]) {\n            <ng-template *ngTemplateOutlet=\"\n                              cellTemplates[col.key];\n                              context: {\n                                $implicit: row,\n                                col: col,\n                                editing: isCellEditing(row, col, groupIndex, rowIndex),\n                                cancelEditing: cancelEditing.bind(this)\n                              }\n                            \">\n            </ng-template>\n            }\n            @else {\n\n            <span style=\"font-size:1em; color:#4b4b4b; font-family:var(--FM-Light);\"\n              [ngClass]=\"{ 'no-wrap': col.key.toLowerCase().includes('date') }\">\n              {{ getNestedValue(row, col.key) }}\n            </span>\n            }\n            </div>\n          </div>\n\n        </td>\n        }\n        }\n\n        <!-- Actions column -->\n        @else {\n        <td>\n          <div class=\"action-buttons\">\n            <ng-template *ngTemplateOutlet=\"\n                            cellTemplates[col.key];\n                            context: { $implicit: row }\n                          \"></ng-template>\n          </div>\n        </td>\n        }\n        }\n\n        @if (config.actions?.length) {\n        <td class=\"actions-width\" (click)=\"$event.stopPropagation()\">\n          <!-- render action templates if you have them -->\n          @if (actionTemplates['actions']) {\n          <ng-template *ngTemplateOutlet=\"actionTemplates['actions']; context: { $implicit: row }\"></ng-template>\n          }\n        </td>\n        }\n      </tr>\n      }\n      }\n      }\n      }\n    </tbody>\n  </table>\n  <custom-bulk-actions [actions]=\"bulkActions\" [selectedLabel]=\"selectedLabel\" [selections]=\"selected.size\"\n    (actionClick)=\"onBulkAction($event)\" (removeSelection)=\"removeSelections()\" />\n  <custom-bulk-actions [selectedLabel]=\"selectedLabel\"></custom-bulk-actions>\n</div>", styles: [".table-container{overflow-x:auto;width:100%;max-width:100%}.striped-table{width:100%;min-width:1000px;background-color:#fff}.striped-table thead th{font-family:var(--FM-Light);color:#838383;text-align:center;border:none;border-bottom:.0625em solid rgba(112,112,112,.1);padding:.6em .8em}.striped-table .table-header-cell{display:flex;align-items:center;justify-content:start;gap:.5em;font-size:1em}.striped-table thead th:nth-child(2) .table-header-cell{text-align:left}.striped-table thead th:first-child{padding:.5em;width:2em;min-width:2em}.striped-table tbody tr{transition:background-color .2s ease;cursor:pointer;background-color:#fff;font-weight:500;font-size:1em}.striped-table tbody tr:hover{background-color:#f8f9fa}.striped-table tbody tr.selected,.striped-table tbody tr.active,.striped-table tbody tr[data-selected=true]{background-color:#e6f3ff}.striped-table tbody tr.selected:hover,.striped-table tbody tr.active:hover,.striped-table tbody tr[data-selected=true]:hover{background-color:#d4e7ff}.striped-table td{padding:.75em 0;vertical-align:middle;border:none;font-family:var(--FM-Light);font-size:1em;color:#4b4b4b;text-align:center}.striped-table td:has(.left-align-column){text-align:left}.striped-table td:first-child{padding:.5em;width:3em;min-width:3em}.group-header-row{background-color:transparent!important;border-top:.0625em solid rgba(112,112,112,.1)}.group-header-row:hover{background-color:transparent!important}.group-header__wrapper{padding:.75em .5em;text-align:left;vertical-align:middle;border:none}.group-header__title-container{display:flex;align-items:center;gap:.5em}.group-header__title{color:#72788e;font-size:1em;font-style:normal;font-weight:300;line-height:normal}.group-header__expand-icon{display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .3s;width:1em}.group-header__expand-icon svg{width:100%;height:auto}.rotated{transform:rotate(-180deg)}.drag-handle{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}.check-box-container{display:flex;justify-content:center;align-items:center}.custom-checkbox{appearance:none;width:1.2em;height:1.2em;border:1px solid #ccc;border-radius:.1em;cursor:pointer;position:relative}.custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.custom-checkbox:checked:after{content:\"\";position:absolute;top:10%;left:50%;transform:translate(-50%,-10%) rotate(45deg);width:.4em;height:.9em;border:solid white;border-width:0 .2em .2em 0}.sort-icon{width:1em;cursor:pointer}.sort-icon svg{width:100%;height:auto}.action-buttons{display:flex;align-items:center;justify-content:center}.no-wrap{white-space:nowrap}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: TranslateModule }, { kind: "pipe", type: i3$1.TranslatePipe, name: "translate" }, { kind: "component", type: CustomCheckBoxComponent, selector: "custom-check-box", inputs: ["checkboxClass", "labelClass", "componentClass", "label", "disabled", "name", "value"], outputs: ["valueChange"] }, { kind: "component", type: CustomBulkActionsComponent, selector: "custom-bulk-actions", inputs: ["selections", "selectedLabel", "actions"], outputs: ["actionClick", "removeSelection"] }], animations: [
            trigger('rowFade', [
                transition(':enter', [
                    style({ opacity: 0 }),
                    animate('1s ease-in', style({ opacity: 1 })),
                ]),
                transition(':leave', [animate('180ms ease-out', style({ opacity: 0 }))]),
            ]),
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomDynamicTableWithCategoriesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-dynamic-table-with-categories', imports: [CommonModule, TranslateModule, NgClass, NgTemplateOutlet, CustomCheckBoxComponent, CustomBulkActionsComponent], animations: [
                        trigger('rowFade', [
                            transition(':enter', [
                                style({ opacity: 0 }),
                                animate('1s ease-in', style({ opacity: 1 })),
                            ]),
                            transition(':leave', [animate('180ms ease-out', style({ opacity: 0 }))]),
                        ]),
                    ], template: "<div class=\"table-container\" (click)=\"onContainerClick($event)\">\n  <table class=\"striped-table\">\n    <thead>\n      <tr>\n\n        @for (column of config.columns; track $index) {\n        <th>\n          <div class=\"table-header-cell\">\n            @if (hasCheckBox && $index==0) {\n            @if(enableAllSelection){\n            <div class=\"table-header-cell\">\n              <custom-check-box name=\"select-all\" [value]=\"isAllSelected()\" (valueChange)=\"toggleSelectAll($event)\">\n              </custom-check-box>\n            </div>\n            }\n            }\n            {{ column.label | translate }}\n\n            @if (column.sort) {\n            <div [innerHTML]=\"checkedSortIcon\" class=\"sort-icon\"\n              (click)=\"sortColumn.emit(column); $event.stopPropagation()\">\n            </div>\n            }\n          </div>\n        </th>\n        }\n\n        @if (config.actions?.length) {\n        <th class=\"actions-width\">\n          <div class=\"table-header-cell\">\n            {{ \"Actions\" | translate }}\n          </div>\n        </th>\n        }\n      </tr>\n    </thead>\n\n    <tbody>\n      @if (config.groupedData?.length) {\n      @for (group of config.groupedData; track $index; let groupIndex = $index) {\n\n      <!-- Group Header Row -->\n      <tr class=\"group-header-row\">\n\n\n        <td [attr.colspan]=\"config.columns.length + (config.actions?.length ? 1 : 0)\" class=\"group-header__wrapper\"\n          (click)=\"group.isCollapsed = !group.isCollapsed; $event.stopPropagation()\" style=\"cursor: pointer\">\n          <div class=\"group-header__title-container\">\n            <div style=\"\n                    display: flex;\n                    align-items: center;\n                    gap: 0.5em;\n                    justify-content: flex-start;\n                  \">\n              @if (hasCheckBox) {\n              <div class=\"check-box-container\">\n                <custom-check-box [name]=\"'group-' + groupIndex\" [value]=\"isGroupSelected(group)\"\n                  (valueChange)=\"toggleGroup(group, $event)\">\n                </custom-check-box>\n\n              </div>\n              }\n              <span class=\"drag-handle\" style=\"cursor: grab\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"8\" height=\"16\" fill=\"none\">\n                  <circle cx=\".5\" cy=\".5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\".5\" cy=\"7.5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\".5\" cy=\"14.5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\"7.5\" cy=\".5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\"7.5\" cy=\"7.5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\"7.5\" cy=\"14.5\" r=\".5\" fill=\"#000\" />\n                </svg>\n              </span>\n            </div>\n            <div [ngClass]=\"{ rotated: group.isCollapsed }\" [innerHTML]=\"expandSvg\" class=\"group-header__expand-icon\">\n            </div>\n            <p class=\"group-header__title\">{{ group.title }}</p>\n          </div>\n        </td>\n      </tr>\n\n      <!-- Group Task Rows -->\n      @if (!group.isCollapsed) {\n      @for (row of group.items; track $index; let rowIndex = $index) {\n      <tr [@rowFade] (click)=\"$event.stopPropagation()\">\n\n        @for (col of config.columns; track $index; let idx=$index) {\n\n        <!-- Non-actions -->\n        @if (col.type !== 'actions') {\n\n        <!-- Name columns (keep your click behavior) -->\n        @if (col.key === 'nameEn' || col.key === 'nameAr') {\n        <td style=\"min-width: 10em\">\n          <div style=\"display:flex; align-items:center;gap: 0.5em; padding-left: 1.65em;\" [class]=\"col.customClass\">\n\n            @if(idx===0){\n            <div>\n              <span class=\"drag-handle\" style=\"cursor: grab\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"8\" height=\"16\" fill=\"none\">\n                  <circle cx=\".5\" cy=\".5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\".5\" cy=\"7.5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\".5\" cy=\"14.5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\"7.5\" cy=\".5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\"7.5\" cy=\"7.5\" r=\".5\" fill=\"#000\" />\n                  <circle cx=\"7.5\" cy=\"14.5\" r=\".5\" fill=\"#000\" />\n                </svg>\n              </span>\n\n              @if (hasCheckBox) {\n              <custom-check-box [name]=\"'item-' + row.id\" [value]=\"isSelected(row.id)\"\n                (valueChange)=\"toggleSelection(row.id, $event)\">\n              </custom-check-box>\n              }\n            </div>\n            }\n\n            <span style=\"font-size:1em; color:#4b4b4b; font-family:var(--FM-Light);\" (click)=\"nameClick.emit(row); $event.stopPropagation()\">\n              {{ getNestedValue(row, col.key) }}\n            </span>\n          </div>\n        </td>\n        }\n        @else {\n        <td [class]=\"col.customClass\"\n          [class.cursor-pointer]=\"!!cellTemplates[col.key]\">\n          <div style=\"\n                        display: flex;\n                        align-items: center;\n                        gap: 0.5em;\n                      \"  [class]=\"col.customClass\">\n            @if(idx===0){\n\n            <span class=\"drag-handle\" style=\"cursor: grab\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"8\" height=\"16\" fill=\"none\">\n                <circle cx=\".5\" cy=\".5\" r=\".5\" fill=\"#000\" />\n                <circle cx=\".5\" cy=\"7.5\" r=\".5\" fill=\"#000\" />\n                <circle cx=\".5\" cy=\"14.5\" r=\".5\" fill=\"#000\" />\n                <circle cx=\"7.5\" cy=\".5\" r=\".5\" fill=\"#000\" />\n                <circle cx=\"7.5\" cy=\"7.5\" r=\".5\" fill=\"#000\" />\n                <circle cx=\"7.5\" cy=\"14.5\" r=\".5\" fill=\"#000\" />\n              </svg>\n            </span>\n\n            @if (hasCheckBox) {\n            <custom-check-box [name]=\"'item-' + row.id\" [value]=\"isSelected(row.id)\"\n              (valueChange)=\"toggleSelection(row.id, $event)\">\n            </custom-check-box>\n            }\n            }\n            <div (click)=\"onCellClick($event, row, col, groupIndex, rowIndex)\">\n            @if (cellTemplates[col.key]) {\n            <ng-template *ngTemplateOutlet=\"\n                              cellTemplates[col.key];\n                              context: {\n                                $implicit: row,\n                                col: col,\n                                editing: isCellEditing(row, col, groupIndex, rowIndex),\n                                cancelEditing: cancelEditing.bind(this)\n                              }\n                            \">\n            </ng-template>\n            }\n            @else {\n\n            <span style=\"font-size:1em; color:#4b4b4b; font-family:var(--FM-Light);\"\n              [ngClass]=\"{ 'no-wrap': col.key.toLowerCase().includes('date') }\">\n              {{ getNestedValue(row, col.key) }}\n            </span>\n            }\n            </div>\n          </div>\n\n        </td>\n        }\n        }\n\n        <!-- Actions column -->\n        @else {\n        <td>\n          <div class=\"action-buttons\">\n            <ng-template *ngTemplateOutlet=\"\n                            cellTemplates[col.key];\n                            context: { $implicit: row }\n                          \"></ng-template>\n          </div>\n        </td>\n        }\n        }\n\n        @if (config.actions?.length) {\n        <td class=\"actions-width\" (click)=\"$event.stopPropagation()\">\n          <!-- render action templates if you have them -->\n          @if (actionTemplates['actions']) {\n          <ng-template *ngTemplateOutlet=\"actionTemplates['actions']; context: { $implicit: row }\"></ng-template>\n          }\n        </td>\n        }\n      </tr>\n      }\n      }\n      }\n      }\n    </tbody>\n  </table>\n  <custom-bulk-actions [actions]=\"bulkActions\" [selectedLabel]=\"selectedLabel\" [selections]=\"selected.size\"\n    (actionClick)=\"onBulkAction($event)\" (removeSelection)=\"removeSelections()\" />\n  <custom-bulk-actions [selectedLabel]=\"selectedLabel\"></custom-bulk-actions>\n</div>", styles: [".table-container{overflow-x:auto;width:100%;max-width:100%}.striped-table{width:100%;min-width:1000px;background-color:#fff}.striped-table thead th{font-family:var(--FM-Light);color:#838383;text-align:center;border:none;border-bottom:.0625em solid rgba(112,112,112,.1);padding:.6em .8em}.striped-table .table-header-cell{display:flex;align-items:center;justify-content:start;gap:.5em;font-size:1em}.striped-table thead th:nth-child(2) .table-header-cell{text-align:left}.striped-table thead th:first-child{padding:.5em;width:2em;min-width:2em}.striped-table tbody tr{transition:background-color .2s ease;cursor:pointer;background-color:#fff;font-weight:500;font-size:1em}.striped-table tbody tr:hover{background-color:#f8f9fa}.striped-table tbody tr.selected,.striped-table tbody tr.active,.striped-table tbody tr[data-selected=true]{background-color:#e6f3ff}.striped-table tbody tr.selected:hover,.striped-table tbody tr.active:hover,.striped-table tbody tr[data-selected=true]:hover{background-color:#d4e7ff}.striped-table td{padding:.75em 0;vertical-align:middle;border:none;font-family:var(--FM-Light);font-size:1em;color:#4b4b4b;text-align:center}.striped-table td:has(.left-align-column){text-align:left}.striped-table td:first-child{padding:.5em;width:3em;min-width:3em}.group-header-row{background-color:transparent!important;border-top:.0625em solid rgba(112,112,112,.1)}.group-header-row:hover{background-color:transparent!important}.group-header__wrapper{padding:.75em .5em;text-align:left;vertical-align:middle;border:none}.group-header__title-container{display:flex;align-items:center;gap:.5em}.group-header__title{color:#72788e;font-size:1em;font-style:normal;font-weight:300;line-height:normal}.group-header__expand-icon{display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .3s;width:1em}.group-header__expand-icon svg{width:100%;height:auto}.rotated{transform:rotate(-180deg)}.drag-handle{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}.check-box-container{display:flex;justify-content:center;align-items:center}.custom-checkbox{appearance:none;width:1.2em;height:1.2em;border:1px solid #ccc;border-radius:.1em;cursor:pointer;position:relative}.custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.custom-checkbox:checked:after{content:\"\";position:absolute;top:10%;left:50%;transform:translate(-50%,-10%) rotate(45deg);width:.4em;height:.9em;border:solid white;border-width:0 .2em .2em 0}.sort-icon{width:1em;cursor:pointer}.sort-icon svg{width:100%;height:auto}.action-buttons{display:flex;align-items:center;justify-content:center}.no-wrap{white-space:nowrap}\n"] }]
        }], ctorParameters: () => [{ type: i1$2.DomSanitizer }], propDecorators: { config: [{
                type: Input
            }], hasCheckBox: [{
                type: Input
            }], cellTemplates: [{
                type: Input
            }], actionTemplates: [{
                type: Input
            }], sortColumn: [{
                type: Output
            }], nameClick: [{
                type: Output
            }], selected: [{
                type: Input
            }], enableAllSelection: [{
                type: Input
            }], selectedLabel: [{
                type: Input
            }], bulkActions: [{
                type: Input
            }], bulkActionChange: [{
                type: Output
            }], selectAllChange: [{
                type: Output
            }], selectionChange: [{
                type: Output
            }] } });

class CustomProgressRingComponent {
    value;
    total = 100;
    width = 3.75;
    stroke = 4.8;
    color = '#25c7bc';
    bgColor = '#a9efea';
    get normalizedRadius() {
        return this.width / 2 - this.stroke * 2;
    }
    round(num, decPoints) {
        return Number(num.toFixed(decPoints));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomProgressRingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: CustomProgressRingComponent, isStandalone: true, selector: "custom-progress-ring", inputs: { value: "value", total: "total", width: "width", stroke: "stroke", color: "color", bgColor: "bgColor" }, ngImport: i0, template: "<!-- Progress Circle -->\n<div\n  class=\"progress-container\"\n  [style]=\"{\n    '--background-Color': bgColor,\n    '--progress-Color': color,\n    '--progress-stroke': stroke,\n  }\"\n>\n  <svg\n    [attr.width]=\"width + 'em'\"\n    [attr.height]=\"width + 'em'\"\n    viewBox=\"-1 -1 38 38\"\n    class=\"circular-chart\"\n  >\n    <path\n      class=\"circle-bg\"\n      d=\"M18 2.0845\n          a 15.9155 15.9155 0 0 1 0 31.831\n          a 15.9155 15.9155 0 0 1 0 -31.831\"\n    />\n    <path\n      class=\"circle\"\n      [style.stroke-dasharray]=\"(value / total) * 100 + ', 100'\"\n      d=\"M18 2.0845\n          a 15.9155 15.9155 0 0 1 0 31.831\n          a 15.9155 15.9155 0 0 1 0 -31.831\"\n    />\n  </svg>\n  <span class=\"percentage\">\n    {{ round(total ? (value / total) * 100 : 0, 1) }}%\n  </span>\n</div>\n", styles: [".progress-container{position:relative;flex-shrink:0}.progress-container .circular-chart{display:block}.progress-container .circle-bg{fill:none;stroke:var(--background-Color);stroke-width:var(--progress-stroke)}.progress-container .circle{fill:none;stroke-width:var(--progress-stroke);stroke:var(--progress-Color);stroke-linecap:round;animation:progress 1s ease-out forwards}.progress-container .percentage{font-family:var(--FM-Medium);font-size:.875em;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-anchor:middle;text-align:center}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomProgressRingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-progress-ring', imports: [], template: "<!-- Progress Circle -->\n<div\n  class=\"progress-container\"\n  [style]=\"{\n    '--background-Color': bgColor,\n    '--progress-Color': color,\n    '--progress-stroke': stroke,\n  }\"\n>\n  <svg\n    [attr.width]=\"width + 'em'\"\n    [attr.height]=\"width + 'em'\"\n    viewBox=\"-1 -1 38 38\"\n    class=\"circular-chart\"\n  >\n    <path\n      class=\"circle-bg\"\n      d=\"M18 2.0845\n          a 15.9155 15.9155 0 0 1 0 31.831\n          a 15.9155 15.9155 0 0 1 0 -31.831\"\n    />\n    <path\n      class=\"circle\"\n      [style.stroke-dasharray]=\"(value / total) * 100 + ', 100'\"\n      d=\"M18 2.0845\n          a 15.9155 15.9155 0 0 1 0 31.831\n          a 15.9155 15.9155 0 0 1 0 -31.831\"\n    />\n  </svg>\n  <span class=\"percentage\">\n    {{ round(total ? (value / total) * 100 : 0, 1) }}%\n  </span>\n</div>\n", styles: [".progress-container{position:relative;flex-shrink:0}.progress-container .circular-chart{display:block}.progress-container .circle-bg{fill:none;stroke:var(--background-Color);stroke-width:var(--progress-stroke)}.progress-container .circle{fill:none;stroke-width:var(--progress-stroke);stroke:var(--progress-Color);stroke-linecap:round;animation:progress 1s ease-out forwards}.progress-container .percentage{font-family:var(--FM-Medium);font-size:.875em;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-anchor:middle;text-align:center}\n"] }]
        }], propDecorators: { value: [{
                type: Input,
                args: [{ required: true }]
            }], total: [{
                type: Input,
                args: [{ required: true }]
            }], width: [{
                type: Input
            }], stroke: [{
                type: Input
            }], color: [{
                type: Input
            }], bgColor: [{
                type: Input
            }] } });

class CustomAvatarsComponent {
    items = [];
    size = 3; // size in em
    overlapOffset = 0.7;
    removeOutline = false;
    getInitials(name) {
        return name
            .split(' ')
            .map((part) => part.charAt(0).toUpperCase())
            .join('');
    }
    getRandomColor() {
        const colors = ['#e57373', '#64b5f6', '#81c784', '#ffd54f', '#ba68c8'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomAvatarsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomAvatarsComponent, isStandalone: true, selector: "custom-avatars", inputs: { items: "items", size: "size", overlapOffset: "overlapOffset", removeOutline: "removeOutline" }, ngImport: i0, template: "<div class=\"avatar-list\">\n  @for(item of items; track $index) { @if(item.name || item.imgPath){\n\n  <div\n    class=\"avatar-item\"\n    [style.width.em]=\"size\"\n    [style.height.em]=\"size\"\n    [title]=\"item.name\"\n    [style.transform]=\"'translateX(' + -$index * overlapOffset + 'em)'\"\n    [style.zIndex]=\"$index\"\n    [ngClass]=\"{ outline: !removeOutline }\"\n  >\n    @switch(!!item.imgPath) { @case(true) {\n    <img\n      [src]=\"item.imgPath\"\n      [alt]=\"item.name\"\n      class=\"avatar-img\"\n      [style.width.em]=\"size\"\n      [style.height.em]=\"size\"\n    />\n    } @default {\n    <div\n      style=\"letter-spacing: 0.1em\"\n      class=\"avatar-initials\"\n      [style.fontSize.em]=\"size / 3\"\n      [style.background-color]=\"'#e57373'\"\n    >\n      {{ getInitials(item.name) }}\n    </div>\n\n    } }\n  </div>\n  } }\n</div>\n", styles: [".avatar-list{display:flex;align-items:center;gap:.35em}.avatar-item{position:relative;border-radius:50%;overflow:hidden;flex-shrink:0}.outline{border:solid 2px #fff;box-shadow:0 .77px 3.079px #00000040}.avatar-img{object-fit:cover;display:block}.avatar-initials{display:flex;justify-content:center;align-items:center;background-color:#bbb;color:#fff;font-weight:700;width:100%;height:100%}\n"], dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomAvatarsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-avatars', imports: [NgClass], template: "<div class=\"avatar-list\">\n  @for(item of items; track $index) { @if(item.name || item.imgPath){\n\n  <div\n    class=\"avatar-item\"\n    [style.width.em]=\"size\"\n    [style.height.em]=\"size\"\n    [title]=\"item.name\"\n    [style.transform]=\"'translateX(' + -$index * overlapOffset + 'em)'\"\n    [style.zIndex]=\"$index\"\n    [ngClass]=\"{ outline: !removeOutline }\"\n  >\n    @switch(!!item.imgPath) { @case(true) {\n    <img\n      [src]=\"item.imgPath\"\n      [alt]=\"item.name\"\n      class=\"avatar-img\"\n      [style.width.em]=\"size\"\n      [style.height.em]=\"size\"\n    />\n    } @default {\n    <div\n      style=\"letter-spacing: 0.1em\"\n      class=\"avatar-initials\"\n      [style.fontSize.em]=\"size / 3\"\n      [style.background-color]=\"'#e57373'\"\n    >\n      {{ getInitials(item.name) }}\n    </div>\n\n    } }\n  </div>\n  } }\n</div>\n", styles: [".avatar-list{display:flex;align-items:center;gap:.35em}.avatar-item{position:relative;border-radius:50%;overflow:hidden;flex-shrink:0}.outline{border:solid 2px #fff;box-shadow:0 .77px 3.079px #00000040}.avatar-img{object-fit:cover;display:block}.avatar-initials{display:flex;justify-content:center;align-items:center;background-color:#bbb;color:#fff;font-weight:700;width:100%;height:100%}\n"] }]
        }], propDecorators: { items: [{
                type: Input
            }], size: [{
                type: Input
            }], overlapOffset: [{
                type: Input
            }], removeOutline: [{
                type: Input
            }] } });

class CustomProgressBarComponent {
    value = 0;
    color = '#D9FFF7';
    colorGradient;
    emptyColor = '#D9FFF7';
    showProgressInline = true;
    barHeight = '5px';
    showProgress = true;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomProgressBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomProgressBarComponent, isStandalone: true, selector: "custom-progress-bar", inputs: { value: "value", color: "color", colorGradient: "colorGradient", emptyColor: "emptyColor", showProgressInline: "showProgressInline", barHeight: "barHeight", showProgress: "showProgress" }, ngImport: i0, template: "<div\n  class=\"progress-bar-main\"\n  [ngClass]=\"{\n    'inline-Progress': showProgressInline && showProgress,\n    'col-Progress': !showProgressInline && showProgress,\n    'no-progress': !showProgress,\n  }\"\n>\n  <div\n    class=\"progress-bar-container\"\n    [ngStyle]=\"{\n      'background-color': emptyColor,\n      '--bar-height': barHeight\n    }\"\n  >\n    <div\n      class=\"progress-bar-fill\"\n      [ngStyle]=\"{\n        'width.%': value,\n        '--color-gradient': colorGradient,\n        '--color-main': color,\n      }\"\n      [ngClass]=\"{\n        'gradient-bg': colorGradient\n      }\"\n    ></div>\n  </div>\n  @if(showProgress){\n  <div class=\"progress-bar-label\">{{ value | number : \"1.0-1\" }}%</div>\n  }\n</div>\n", styles: [".progress-bar-main{display:flex;justify-content:center}.progress-bar-container{width:100%;background:#f0f0f0;height:var(--bar-height, 5px);border-radius:4px;overflow:hidden}.progress-bar-fill{height:100%;border-radius:4px;transition:width .3s ease;background:var(--color-main)}.progress-bar-fill.gradient-bg{background:linear-gradient(to right,var(--color-main),var(--color-gradient))}.progress-bar-label{font-size:1em;text-align:right;margin-inline-start:.5em}.inline-Progress{align-items:center;display:grid;grid-template-columns:4fr 1fr}.col-Progress{flex-direction:column-reverse;align-items:flex-end}.no-progress{flex-direction:row}\n"], dependencies: [{ kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "pipe", type: DecimalPipe, name: "number" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomProgressBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-progress-bar', imports: [NgStyle, NgClass, DecimalPipe], template: "<div\n  class=\"progress-bar-main\"\n  [ngClass]=\"{\n    'inline-Progress': showProgressInline && showProgress,\n    'col-Progress': !showProgressInline && showProgress,\n    'no-progress': !showProgress,\n  }\"\n>\n  <div\n    class=\"progress-bar-container\"\n    [ngStyle]=\"{\n      'background-color': emptyColor,\n      '--bar-height': barHeight\n    }\"\n  >\n    <div\n      class=\"progress-bar-fill\"\n      [ngStyle]=\"{\n        'width.%': value,\n        '--color-gradient': colorGradient,\n        '--color-main': color,\n      }\"\n      [ngClass]=\"{\n        'gradient-bg': colorGradient\n      }\"\n    ></div>\n  </div>\n  @if(showProgress){\n  <div class=\"progress-bar-label\">{{ value | number : \"1.0-1\" }}%</div>\n  }\n</div>\n", styles: [".progress-bar-main{display:flex;justify-content:center}.progress-bar-container{width:100%;background:#f0f0f0;height:var(--bar-height, 5px);border-radius:4px;overflow:hidden}.progress-bar-fill{height:100%;border-radius:4px;transition:width .3s ease;background:var(--color-main)}.progress-bar-fill.gradient-bg{background:linear-gradient(to right,var(--color-main),var(--color-gradient))}.progress-bar-label{font-size:1em;text-align:right;margin-inline-start:.5em}.inline-Progress{align-items:center;display:grid;grid-template-columns:4fr 1fr}.col-Progress{flex-direction:column-reverse;align-items:flex-end}.no-progress{flex-direction:row}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], color: [{
                type: Input
            }], colorGradient: [{
                type: Input
            }], emptyColor: [{
                type: Input
            }], showProgressInline: [{
                type: Input
            }], barHeight: [{
                type: Input
            }], showProgress: [{
                type: Input
            }] } });

const dropdownArrowSvg = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6L8 10L12 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

class CustomDropdownButtonComponent {
    sanitizer;
    options = [];
    selected = new EventEmitter();
    dropdownArrow;
    isOpen = false;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        const dropdownArrowSVGIcon = dropdownArrowSvg;
        this.dropdownArrow =
            this.sanitizer.bypassSecurityTrustHtml(dropdownArrowSVGIcon);
    }
    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }
    handleSelect(option) {
        this.selected.emit(option);
        this.isOpen = false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomDropdownButtonComponent, deps: [{ token: i1$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomDropdownButtonComponent, isStandalone: true, selector: "custom-dropdown-button", inputs: { options: "options" }, outputs: { selected: "selected" }, ngImport: i0, template: "<div class=\"dropdown-wrapper\">\n  <button (click)=\"toggleDropdown()\" class=\"dropdown-btn\">\n    <div class=\"dropdown-label\">\n      <ng-content select=\"[buttonLabel]\"></ng-content>\n    </div>\n    <div class=\"dropdown-label-arrow\" [innerHTML]=\"dropdownArrow\"></div>\n  </button>\n\n  @if(isOpen){\n  <div\n    #ButtonDropdown\n    class=\"dropdown-menu\"\n    [clickOutside]=\"ButtonDropdown\"\n    (clickOutsideEmitter)=\"isOpen = false\"\n    [DropdownAnimationObject]=\"isOpen\"\n  >\n    <div class=\"dropdown-options\">\n      @for (option of options; track option) {\n      <button\n        class=\"dropdown-item\"\n        (click)=\"$event.stopPropagation(); handleSelect(option)\"\n      >\n        {{ option.nameEn }}\n      </button>\n      }\n    </div>\n  </div>\n  }\n</div>\n", styles: [".dropdown-wrapper{position:relative;display:flex;text-align:left;background-color:#25c7bc;border-radius:.4em;padding:.1em;height:2.8125em;align-items:center;justify-content:center}.dropdown-btn{display:flex;align-items:center;color:#fff;font-weight:500;border:none;outline:none;cursor:pointer;overflow:hidden;min-width:9em;max-height:2.4375em;height:100%}.dropdown-label{padding:.5em;border-right:1px #ffffff33 solid;font-size:1.0625em;font-weight:530;height:100%;display:flex;justify-content:center;align-items:center;min-width:75%;font-family:var(--FM-Bold)}.dropdown-label-arrow{padding:0 .5em;height:100%;display:flex;justify-content:center;align-items:center}.dropdown-wrapper:hover{background-color:#39dbd0}.dropdown-menu{position:absolute;right:0;top:100%;margin-top:.2em;width:100%;background-color:#fff;border:1px solid #e5e7eb;border-radius:.4em;box-shadow:0 10px 15px -3px #0000001a,0 4px 6px -2px #0000000d;z-index:99999;overflow:hidden;min-width:13em}.dropdown-options{padding:.5em}.dropdown-item{display:block;width:100%;text-align:left;padding:.2em .4em;color:#374151;background:none;border:none;cursor:pointer}.dropdown-item:hover{background-color:#e9fffa}custom-dropdown-button{font-size:1em}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "directive", type: DropdownsAnimationDirective, selector: "[DropdownAnimationObject]", inputs: ["DropdownAnimationObject"] }], animations: [dropdownAnimation] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomDropdownButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-dropdown-button', imports: [CommonModule, ClickOutsideDirective, DropdownsAnimationDirective], animations: [dropdownAnimation], template: "<div class=\"dropdown-wrapper\">\n  <button (click)=\"toggleDropdown()\" class=\"dropdown-btn\">\n    <div class=\"dropdown-label\">\n      <ng-content select=\"[buttonLabel]\"></ng-content>\n    </div>\n    <div class=\"dropdown-label-arrow\" [innerHTML]=\"dropdownArrow\"></div>\n  </button>\n\n  @if(isOpen){\n  <div\n    #ButtonDropdown\n    class=\"dropdown-menu\"\n    [clickOutside]=\"ButtonDropdown\"\n    (clickOutsideEmitter)=\"isOpen = false\"\n    [DropdownAnimationObject]=\"isOpen\"\n  >\n    <div class=\"dropdown-options\">\n      @for (option of options; track option) {\n      <button\n        class=\"dropdown-item\"\n        (click)=\"$event.stopPropagation(); handleSelect(option)\"\n      >\n        {{ option.nameEn }}\n      </button>\n      }\n    </div>\n  </div>\n  }\n</div>\n", styles: [".dropdown-wrapper{position:relative;display:flex;text-align:left;background-color:#25c7bc;border-radius:.4em;padding:.1em;height:2.8125em;align-items:center;justify-content:center}.dropdown-btn{display:flex;align-items:center;color:#fff;font-weight:500;border:none;outline:none;cursor:pointer;overflow:hidden;min-width:9em;max-height:2.4375em;height:100%}.dropdown-label{padding:.5em;border-right:1px #ffffff33 solid;font-size:1.0625em;font-weight:530;height:100%;display:flex;justify-content:center;align-items:center;min-width:75%;font-family:var(--FM-Bold)}.dropdown-label-arrow{padding:0 .5em;height:100%;display:flex;justify-content:center;align-items:center}.dropdown-wrapper:hover{background-color:#39dbd0}.dropdown-menu{position:absolute;right:0;top:100%;margin-top:.2em;width:100%;background-color:#fff;border:1px solid #e5e7eb;border-radius:.4em;box-shadow:0 10px 15px -3px #0000001a,0 4px 6px -2px #0000000d;z-index:99999;overflow:hidden;min-width:13em}.dropdown-options{padding:.5em}.dropdown-item{display:block;width:100%;text-align:left;padding:.2em .4em;color:#374151;background:none;border:none;cursor:pointer}.dropdown-item:hover{background-color:#e9fffa}custom-dropdown-button{font-size:1em}\n"] }]
        }], ctorParameters: () => [{ type: i1$2.DomSanitizer }], propDecorators: { options: [{
                type: Input,
                args: [{ required: true }]
            }], selected: [{
                type: Output
            }] } });

const xMark = '<svg width="2.4rem" height="2.4rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7" clip-path="url(#clip0_8786_11454)"><path d="M22.2863 1.71429L1.71484 22.2857" stroke="#a6a6a6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.71484 1.71429L22.2863 22.2857" stroke="#a6a6a6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_8786_11454"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>';
const detailDD = '<svg width="2.8rem" height="0.6rem" viewBox="0 0 28 6" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7" clip-path="url(#clip0_8806_11768)"><path d="M14.0009 4.5C14.86 4.5 15.5564 3.82843 15.5564 3C15.5564 2.17157 14.86 1.5 14.0009 1.5C13.1418 1.5 12.4453 2.17157 12.4453 3C12.4453 3.82843 13.1418 4.5 14.0009 4.5Z" stroke="#a6a6a6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M24.8895 4.5C25.7486 4.5 26.4451 3.82843 26.4451 3C26.4451 2.17157 25.7486 1.5 24.8895 1.5C24.0304 1.5 23.334 2.17157 23.334 3C23.334 3.82843 24.0304 4.5 24.8895 4.5Z" stroke="#a6a6a6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.11024 4.5C3.96935 4.5 4.6658 3.82843 4.6658 3C4.6658 2.17157 3.96935 1.5 3.11024 1.5C2.25113 1.5 1.55469 2.17157 1.55469 3C1.55469 3.82843 2.25113 4.5 3.11024 4.5Z" stroke="#a6a6a6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_8806_11768"><rect width="28" height="6" fill="white"/></clipPath></defs></svg>';

class CustomDetailsHeaderComponent {
    sanitizer;
    showX = true;
    BreadCrumbs;
    closeContainer = new EventEmitter();
    dropdownSelectAction = new EventEmitter();
    xMarkSvg;
    DetailDDSvg;
    showDropdown = false;
    breadCrumb = [
        {
            label: 'Home',
            url: `/#`,
        },
        {
            label: 'Task',
            url: `/#`,
        },
        {
            label: 'View Task',
            url: `/#`,
        },
    ];
    actionsDropdown = input([]);
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.xMarkSvg = this.sanitizer.bypassSecurityTrustHtml(xMark);
        this.DetailDDSvg = this.sanitizer.bypassSecurityTrustHtml(detailDD);
    }
    sanitizeSvg(svg) {
        return this.sanitizer.bypassSecurityTrustHtml(svg);
    }
    toggleDropdown(event) {
        event.stopPropagation();
        this.showDropdown = !this.showDropdown;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomDetailsHeaderComponent, deps: [{ token: i1$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomDetailsHeaderComponent, isStandalone: true, selector: "custom-details-header", inputs: { showX: { classPropertyName: "showX", publicName: "showX", isSignal: false, isRequired: false, transformFunction: null }, BreadCrumbs: { classPropertyName: "BreadCrumbs", publicName: "BreadCrumbs", isSignal: false, isRequired: true, transformFunction: null }, actionsDropdown: { classPropertyName: "actionsDropdown", publicName: "actionsDropdown", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { closeContainer: "closeContainer", dropdownSelectAction: "dropdownSelectAction" }, ngImport: i0, template: "<div class=\"custom-details-header\">\n  <custom-breadcrumb [breadcrumbItems]=\"BreadCrumbs || breadCrumb\" />\n  <div class=\"header-svg\">\n    <overlay-panel [overlayClass]=\"'custom-class'\">\n      <ng-template #target>\n        <div\n          class=\"svg-element\"\n          [innerHTML]=\"DetailDDSvg\"\n          style=\"display: flex; align-items: center; height: 100%; width: 100%\"\n        ></div>\n      </ng-template>\n      <ng-template #overlay>\n        <ul class=\"flex flex-col py-1 actions-container\">\n          @for(item of actionsDropdown();track item){\n          <li\n            class=\" cursor-pointer hover-action\"\n            (click)=\"dropdownSelectAction.emit(item.id)\"\n          >\n            @if(item.icon){\n\n            <span class=\"action-icon-inline\"  [innerHTML]=\"sanitizeSvg(item.icon)\"></span>\n          }\n            {{ item.nameEn }}\n          </li>\n          }\n        </ul>\n      </ng-template>\n    </overlay-panel>\n    <!--  -->\n    @if(showX){\n    <div\n      class=\"svg-element\"\n      [innerHTML]=\"xMarkSvg\"\n      (click)=\"$event.stopPropagation(); closeContainer.emit()\"\n    ></div>\n    }\n  </div>\n</div>\n", styles: [".custom-details-header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;border-bottom:1px #e8e8e8 solid;padding:1em 1.1em 1em 1.5em}.header-svg{display:flex;flex-direction:row;justify-content:center;align-items:center}.header-svg .svg-element{padding:.5em .5em .5em .8em;cursor:pointer;position:relative}.header-dropdown-menu{position:absolute;background:#fff;border:1px solid #ccc;z-index:1000;min-width:120px;box-shadow:0 2px 8px #00000026;padding:8px 0}.actions-container{padding:.5em}.actions-container li{margin:.5em 0}.action-icon-inline{display:inline-flex;align-items:center;justify-content:center;margin-inline-end:.5em;width:1.2em;height:1.2em}.action-icon-inline svg{width:100%;height:100%;fill:currentColor}\n"], dependencies: [{ kind: "component", type: CustomBreadcrumbComponent, selector: "custom-breadcrumb", inputs: ["breadcrumbItems"], outputs: ["breadcrumbItemClicked"] }, { kind: "component", type: OverlayPanelComponent, selector: "overlay-panel", inputs: ["overlayClass", "expandSide", "minWidth"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomDetailsHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-details-header', imports: [CustomBreadcrumbComponent, OverlayPanelComponent], template: "<div class=\"custom-details-header\">\n  <custom-breadcrumb [breadcrumbItems]=\"BreadCrumbs || breadCrumb\" />\n  <div class=\"header-svg\">\n    <overlay-panel [overlayClass]=\"'custom-class'\">\n      <ng-template #target>\n        <div\n          class=\"svg-element\"\n          [innerHTML]=\"DetailDDSvg\"\n          style=\"display: flex; align-items: center; height: 100%; width: 100%\"\n        ></div>\n      </ng-template>\n      <ng-template #overlay>\n        <ul class=\"flex flex-col py-1 actions-container\">\n          @for(item of actionsDropdown();track item){\n          <li\n            class=\" cursor-pointer hover-action\"\n            (click)=\"dropdownSelectAction.emit(item.id)\"\n          >\n            @if(item.icon){\n\n            <span class=\"action-icon-inline\"  [innerHTML]=\"sanitizeSvg(item.icon)\"></span>\n          }\n            {{ item.nameEn }}\n          </li>\n          }\n        </ul>\n      </ng-template>\n    </overlay-panel>\n    <!--  -->\n    @if(showX){\n    <div\n      class=\"svg-element\"\n      [innerHTML]=\"xMarkSvg\"\n      (click)=\"$event.stopPropagation(); closeContainer.emit()\"\n    ></div>\n    }\n  </div>\n</div>\n", styles: [".custom-details-header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;border-bottom:1px #e8e8e8 solid;padding:1em 1.1em 1em 1.5em}.header-svg{display:flex;flex-direction:row;justify-content:center;align-items:center}.header-svg .svg-element{padding:.5em .5em .5em .8em;cursor:pointer;position:relative}.header-dropdown-menu{position:absolute;background:#fff;border:1px solid #ccc;z-index:1000;min-width:120px;box-shadow:0 2px 8px #00000026;padding:8px 0}.actions-container{padding:.5em}.actions-container li{margin:.5em 0}.action-icon-inline{display:inline-flex;align-items:center;justify-content:center;margin-inline-end:.5em;width:1.2em;height:1.2em}.action-icon-inline svg{width:100%;height:100%;fill:currentColor}\n"] }]
        }], ctorParameters: () => [{ type: i1$2.DomSanitizer }], propDecorators: { showX: [{
                type: Input
            }], BreadCrumbs: [{
                type: Input,
                args: [{ required: true }]
            }], closeContainer: [{
                type: Output
            }], dropdownSelectAction: [{
                type: Output
            }] } });

class CustomDetailsModalComponent {
    modalTitle = '';
    overlayClickClose = true;
    BreadCrumbs;
    headerButtonClick = new EventEmitter();
    sectionDimensions = '10fr 5fr';
    actionsDropdown = input([]);
    dropdownSelectAction = new EventEmitter();
    isVisible = true;
    mainSize = 0;
    sideSize = 0;
    ngOnInit() {
        if (this.sectionDimensions === '10fr 5fr' &&
            this.mainSize !== 0 &&
            this.sideSize !== 0) {
            this.sectionDimensions = `${this.mainSize}fr ${this.sideSize}fr`;
        }
    }
    open() {
        this.isVisible = true;
    }
    close() {
        this.isVisible = false;
        this.headerButtonClick.emit();
    }
    onOverlayClick(event) {
        if (event.target === event.currentTarget && this.overlayClickClose) {
            this.close();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomDetailsModalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomDetailsModalComponent, isStandalone: true, selector: "custom-details-modal", inputs: { modalTitle: { classPropertyName: "modalTitle", publicName: "modalTitle", isSignal: false, isRequired: false, transformFunction: null }, overlayClickClose: { classPropertyName: "overlayClickClose", publicName: "overlayClickClose", isSignal: false, isRequired: false, transformFunction: null }, BreadCrumbs: { classPropertyName: "BreadCrumbs", publicName: "BreadCrumbs", isSignal: false, isRequired: true, transformFunction: null }, sectionDimensions: { classPropertyName: "sectionDimensions", publicName: "sectionDimensions", isSignal: false, isRequired: false, transformFunction: null }, actionsDropdown: { classPropertyName: "actionsDropdown", publicName: "actionsDropdown", isSignal: true, isRequired: false, transformFunction: null }, mainSize: { classPropertyName: "mainSize", publicName: "mainSize", isSignal: false, isRequired: false, transformFunction: null }, sideSize: { classPropertyName: "sideSize", publicName: "sideSize", isSignal: false, isRequired: false, transformFunction: null } }, outputs: { headerButtonClick: "headerButtonClick", dropdownSelectAction: "dropdownSelectAction" }, ngImport: i0, template: "@if(isVisible){\n<div\n  class=\"details-modal-overlay flex flex-row justify-start align-start\"\n  (click)=\"onOverlayClick($event)\"\n  [ngStyle]=\"{ '--grid-dimensions': sectionDimensions }\"\n>\n  <!-- X button outside details-modal-content -->\n\n  <div class=\"flex flex-row\">\n    <div class=\"details-modal-body\">\n      <div class=\"details-modal-header\">\n        <custom-details-header\n          [BreadCrumbs]=\"BreadCrumbs\"\n          [actionsDropdown]=\"actionsDropdown()\"\n          (closeContainer)=\"close()\"\n          (dropdownSelectAction)=\"dropdownSelectAction.emit($event)\"\n        >\n        </custom-details-header>\n      </div>\n      <div class=\"details-modal-content\">\n        <div class=\"details-modal-section\">\n          <ng-content select=\"[mainContent]\"></ng-content>\n        </div>\n        <div\n          class=\"details-modal-section\"\n          [ngStyle]=\"{ borderLeft: '1px #00000026 solid' }\"\n        >\n          <ng-content select=\"[sideContent]\"></ng-content>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n}\n", styles: [".details-modal-overlay{font-size:1em;position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000000b3;display:flex;align-items:center;justify-content:center;z-index:1000;overflow-y:none}.details-modal-body{position:relative;background:#fff;border-radius:10px;min-width:600px;max-width:95vw;display:flex;align-items:center;flex-direction:column;height:max-content;max-height:80vh;overflow-y:none;overflow-x:none}.details-modal-header{display:block;width:100%;align-items:center;justify-content:start;position:relative;height:100%}.details-modal-content{width:100%;display:grid;grid-template-columns:var(--grid-dimensions);overflow:auto;height:100%}.details-modal-section{height:inherit;overflow-y:auto;overflow-x:hidden}.border-content{border-right:1px #00000026 solid}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: CustomDetailsHeaderComponent, selector: "custom-details-header", inputs: ["showX", "BreadCrumbs", "actionsDropdown"], outputs: ["closeContainer", "dropdownSelectAction"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomDetailsModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-details-modal', imports: [CommonModule, CustomDetailsHeaderComponent], template: "@if(isVisible){\n<div\n  class=\"details-modal-overlay flex flex-row justify-start align-start\"\n  (click)=\"onOverlayClick($event)\"\n  [ngStyle]=\"{ '--grid-dimensions': sectionDimensions }\"\n>\n  <!-- X button outside details-modal-content -->\n\n  <div class=\"flex flex-row\">\n    <div class=\"details-modal-body\">\n      <div class=\"details-modal-header\">\n        <custom-details-header\n          [BreadCrumbs]=\"BreadCrumbs\"\n          [actionsDropdown]=\"actionsDropdown()\"\n          (closeContainer)=\"close()\"\n          (dropdownSelectAction)=\"dropdownSelectAction.emit($event)\"\n        >\n        </custom-details-header>\n      </div>\n      <div class=\"details-modal-content\">\n        <div class=\"details-modal-section\">\n          <ng-content select=\"[mainContent]\"></ng-content>\n        </div>\n        <div\n          class=\"details-modal-section\"\n          [ngStyle]=\"{ borderLeft: '1px #00000026 solid' }\"\n        >\n          <ng-content select=\"[sideContent]\"></ng-content>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n}\n", styles: [".details-modal-overlay{font-size:1em;position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000000b3;display:flex;align-items:center;justify-content:center;z-index:1000;overflow-y:none}.details-modal-body{position:relative;background:#fff;border-radius:10px;min-width:600px;max-width:95vw;display:flex;align-items:center;flex-direction:column;height:max-content;max-height:80vh;overflow-y:none;overflow-x:none}.details-modal-header{display:block;width:100%;align-items:center;justify-content:start;position:relative;height:100%}.details-modal-content{width:100%;display:grid;grid-template-columns:var(--grid-dimensions);overflow:auto;height:100%}.details-modal-section{height:inherit;overflow-y:auto;overflow-x:hidden}.border-content{border-right:1px #00000026 solid}\n"] }]
        }], propDecorators: { modalTitle: [{
                type: Input
            }], overlayClickClose: [{
                type: Input
            }], BreadCrumbs: [{
                type: Input,
                args: [{ required: true }]
            }], headerButtonClick: [{
                type: Output
            }], sectionDimensions: [{
                type: Input
            }], dropdownSelectAction: [{
                type: Output
            }], mainSize: [{
                type: Input
            }], sideSize: [{
                type: Input
            }] } });

class CustomDetailsNavComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomDetailsNavComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: CustomDetailsNavComponent, isStandalone: true, selector: "custom-details-nav", ngImport: i0, template: "<p>activity<br />chat</p>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomDetailsNavComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-details-nav', imports: [], template: "<p>activity<br />chat</p>\n" }]
        }] });

class CustomTitleContentComponent {
    title;
    color = '#06213D';
    fontSize = '1.25em';
    titlePadding = '0 0 0.2em 0';
    titleMargin = '0 0 1em 0';
    separator = true;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomTitleContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: CustomTitleContentComponent, isStandalone: true, selector: "custom-title-content", inputs: { title: "title", color: "color", fontSize: "fontSize", titlePadding: "titlePadding", titleMargin: "titleMargin", separator: "separator" }, ngImport: i0, template: "<div class=\"title-content-container\">\n  <h1\n    class=\"title-styles\"\n    [ngClass]=\"{ 'title-border': separator }\"\n    [ngStyle]=\"{\n      '--title-fontSize': fontSize,\n      '--title-color': color,\n      '--padding': titlePadding,\n      '--margin': titleMargin,\n    }\"\n  >\n    {{ title }}\n  </h1>\n  <div class=\"content-section\">\n    <ng-content select=\"[content]\"></ng-content>\n  </div>\n</div>\n", styles: [".title-content-container{margin:1.5em 0;padding:0}.title-styles{font-size:var(--title-fontSize);font-family:var(--FM-Bold);color:var(--title-color);padding:var(--padding);margin:var(--margin)}.title-border{border-bottom:1px solid #00000026}.content-section{margin-top:1em;display:flex;flex-direction:column;gap:1em}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomTitleContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-title-content', imports: [CommonModule], encapsulation: ViewEncapsulation.None, template: "<div class=\"title-content-container\">\n  <h1\n    class=\"title-styles\"\n    [ngClass]=\"{ 'title-border': separator }\"\n    [ngStyle]=\"{\n      '--title-fontSize': fontSize,\n      '--title-color': color,\n      '--padding': titlePadding,\n      '--margin': titleMargin,\n    }\"\n  >\n    {{ title }}\n  </h1>\n  <div class=\"content-section\">\n    <ng-content select=\"[content]\"></ng-content>\n  </div>\n</div>\n", styles: [".title-content-container{margin:1.5em 0;padding:0}.title-styles{font-size:var(--title-fontSize);font-family:var(--FM-Bold);color:var(--title-color);padding:var(--padding);margin:var(--margin)}.title-border{border-bottom:1px solid #00000026}.content-section{margin-top:1em;display:flex;flex-direction:column;gap:1em}\n"] }]
        }], propDecorators: { title: [{
                type: Input
            }], color: [{
                type: Input
            }], fontSize: [{
                type: Input
            }], titlePadding: [{
                type: Input
            }], titleMargin: [{
                type: Input
            }], separator: [{
                type: Input
            }] } });

class CustomPlateNumberInputFormComponent {
    class = '';
    labelClass = '';
    label = '';
    parentForm;
    controlName = '';
    validation = [];
    mainValidation = [];
    maxNumberLength = 4;
    maxLetterLength = 3;
    // maxLetterLength
    valueChange = new EventEmitter();
    PlateInputForm = new FormGroup({
        plateNumberNumeric: new FormControl('', [
            Validators.required,
            Validators.pattern('[0-9]{3,4}'),
        ]),
        plateNumberLetters: new FormControl('', [
            Validators.required,
            Validators.pattern('[A-Za-z]{3,4}'),
        ]),
    });
    ngOnInit() {
        // Initialize the form with values from the parent form
        if (this.parentForm.controls[this.controlName].value?.length > 0) {
            const initialNumberValue = this.parentForm.controls[this.controlName].value.split(' ')[0] || '';
            const initialLettersValue = this.parentForm.controls[this.controlName].value.split(' ')[1] || '';
            this.PlateInputForm.patchValue({
                plateNumberNumeric: initialNumberValue,
                plateNumberLetters: initialLettersValue,
            });
            this.PlateInputForm.markAllAsTouched();
            this.PlateInputForm.updateValueAndValidity();
            this.parentForm.controls[this.controlName].updateValueAndValidity();
            this.parentForm.controls[this.controlName].markAllAsTouched();
        }
        // Subscribe to changes in the PlateInputForm to update the parent form
        this.PlateInputForm.valueChanges.subscribe(() => {
            const numberValue = this.PlateInputForm.get('plateNumberNumeric')?.value || '';
            const lettersValue = this.PlateInputForm.get('plateNumberLetters')?.value || '';
            this.parentForm.controls[this.controlName].setValue(numberValue + ' ' + lettersValue);
            this.updateParentForm();
        });
    }
    containRequiredError() {
        return this.validation.some((error) => error.errorType.includes(ComponentFormErrorConstant.REQUIRED));
    }
    updateParentForm(event = null) {
        this.valueChange.emit(this.getCombinedPlateNumber());
        const numberValue = this.PlateInputForm.get('plateNumberNumeric')?.value || '';
        const lettersValue = this.PlateInputForm.get('plateNumberLetters')?.value || '';
        const combinedValue = `${numberValue} ${lettersValue}`;
        this.parentForm.controls[this.controlName].setValue(combinedValue);
        this.parentForm.controls[this.controlName].updateValueAndValidity();
        this.parentForm.controls[this.controlName].markAllAsTouched();
        this.valueChange.emit(combinedValue);
    }
    getCombinedPlateNumber() {
        const numeric = this.PlateInputForm.get('plateNumberNumeric')?.value || '';
        const letters = this.PlateInputForm.get('plateNumberLetters')?.value || '';
        return `${numeric} ${letters}`.trim();
    }
    patchValuesToForm(plateNumber) {
        const numericPart = plateNumber.slice(0, this.maxNumberLength);
        const lettersPart = plateNumber.slice(this.maxNumberLength);
        this.PlateInputForm.patchValue({
            plateNumberNumeric: numericPart,
            plateNumberLetters: lettersPart,
        });
        this.PlateInputForm.updateValueAndValidity();
    }
    resetForm() {
        this.PlateInputForm.reset();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomPlateNumberInputFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomPlateNumberInputFormComponent, isStandalone: true, selector: "custom-plate-input-form", inputs: { class: "class", labelClass: "labelClass", label: "label", parentForm: "parentForm", controlName: "controlName", validation: "validation", mainValidation: "mainValidation", maxNumberLength: "maxNumberLength", maxLetterLength: "maxLetterLength" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<form class=\"w-[70%]\" [formGroup]=\"PlateInputForm\">\n  <div style=\"width: 100%\" [formGroup]=\"PlateInputForm\" class=\"input-wrapper\">\n    @if(label){\n    <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n      {{ label }}\n      @if(containRequiredError()){\n      <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\">*</span>\n      } @else {\n      <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\"\n        >&nbsp;</span\n      >\n      }\n    </label>\n    }\n\n    <div class=\"plate-input-row\">\n      <!-- Error Messages -->\n      @if( (PlateInputForm.get('plateNumberNumeric')?.invalid &&\n      PlateInputForm.get('plateNumberNumeric')?.touched) ||\n      (PlateInputForm.get('plateNumberLetters')?.invalid &&\n      PlateInputForm.get('plateNumberLetters')?.touched) ){\n      <div class=\"plateNumber-error-container\">\n        <custom-app-error\n          [control]=\"\n            PlateInputForm.get('plateNumberNumeric')?.invalid\n              ? PlateInputForm.get('plateNumberNumeric')!\n              : PlateInputForm.get('plateNumberLetters')!\n          \"\n          [validation]=\"validation\"\n          [name]=\"label\"\n        />\n      </div>\n      }\n      <!-- Numeric Part -->\n      <div\n        class=\"input-error-container\"\n        [class.has-error]=\"\n          (parentForm.controls[controlName].invalid ||\n            PlateInputForm.get('plateNumberNumeric')?.invalid) &&\n          PlateInputForm.get('plateNumberNumeric')?.touched\n        \"\n      >\n        <input\n          [id]=\"label + '-number'\"\n          type=\"text\"\n          name=\"plateNumberNumeric\"\n          placeholder=\"1234\"\n          [class]=\"'custom-input left plate-number-input ' + class\"\n          formControlName=\"plateNumberNumeric\"\n          (ngModelChange)=\"updateParentForm($event)\"\n          [class.input-error]=\"\n            (parentForm.controls[controlName].invalid ||\n              PlateInputForm.get('plateNumberNumeric')?.invalid) &&\n            PlateInputForm.get('plateNumberNumeric')?.touched\n          \"\n          [maxlength]=\"maxNumberLength\"\n        />\n        @if(PlateInputForm.get('plateNumberNumeric')?.invalid &&\n        PlateInputForm.get('plateNumberNumeric')?.touched){\n        <span class=\"input-error-icon\"><!-- SVG as in your original --></span>\n        }\n      </div>\n\n      <!-- Letters Part -->\n      <div\n        class=\"input-error-container\"\n        [class.has-error]=\"\n          PlateInputForm.get('plateNumberLetters')?.invalid &&\n          PlateInputForm.get('plateNumberLetters')?.touched\n        \"\n      >\n        <input\n          [id]=\"label + '-letters'\"\n          type=\"text\"\n          name=\"plateNumberLetters\"\n          placeholder=\"ABC\"\n          [class]=\"'custom-input right plate-letters-input ' + class\"\n          formControlName=\"plateNumberLetters\"\n          (ngModelChange)=\"valueChange.emit($event)\"\n          [class.input-error]=\"\n            (parentForm.controls[controlName].invalid ||\n              PlateInputForm.get('plateNumberLetters')?.invalid) &&\n            PlateInputForm.get('plateNumberLetters')?.touched\n          \"\n          [maxlength]=\"maxLetterLength\"\n        />\n        @if(PlateInputForm.get('plateNumberLetters')?.invalid &&\n        PlateInputForm.get('plateNumberLetters')?.touched){\n        <span class=\"input-error-icon\"><!-- SVG as in your original --></span>\n        }\n      </div>\n    </div>\n  </div>\n</form>\n", styles: [".plate-input-row{display:flex;gap:-.1em}.plate-number-input{width:50%}.plate-letters-input{width:40%}.input-wrapper,.input-error-container{position:relative}.custom-input{width:100%;height:100%;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;padding:.93em 1em;transition:border-color .2s;border:1px solid #e5e6e5}.custom-input.left{border-radius:.375em 0 0 .375em;border-right:1px solid #e5e6e5}.custom-input.right{border-radius:0 .375em .375em 0;margin-left:-.05em}.custom-input.input-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.input-error-icon{position:absolute;right:1em;top:50%;transform:translateY(-50%);color:#e55658;font-size:1.5em;pointer-events:none}.custom-input::placeholder{color:#e5e6e5;font-size:1em;font-weight:400}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.plateNumber-error-container{position:absolute;top:100%;left:.5em;width:100%}.plateNumber-error-container custom-app-error{pointer-events:none}\n"], dependencies: [{ kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name", "showErrors"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomPlateNumberInputFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-plate-input-form', imports: [ReactiveFormsModule, CustomAppErrorComponent], template: "<form class=\"w-[70%]\" [formGroup]=\"PlateInputForm\">\n  <div style=\"width: 100%\" [formGroup]=\"PlateInputForm\" class=\"input-wrapper\">\n    @if(label){\n    <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n      {{ label }}\n      @if(containRequiredError()){\n      <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\">*</span>\n      } @else {\n      <span style=\"color: #f43f5e; font-size: 15px; font-weight: 500\"\n        >&nbsp;</span\n      >\n      }\n    </label>\n    }\n\n    <div class=\"plate-input-row\">\n      <!-- Error Messages -->\n      @if( (PlateInputForm.get('plateNumberNumeric')?.invalid &&\n      PlateInputForm.get('plateNumberNumeric')?.touched) ||\n      (PlateInputForm.get('plateNumberLetters')?.invalid &&\n      PlateInputForm.get('plateNumberLetters')?.touched) ){\n      <div class=\"plateNumber-error-container\">\n        <custom-app-error\n          [control]=\"\n            PlateInputForm.get('plateNumberNumeric')?.invalid\n              ? PlateInputForm.get('plateNumberNumeric')!\n              : PlateInputForm.get('plateNumberLetters')!\n          \"\n          [validation]=\"validation\"\n          [name]=\"label\"\n        />\n      </div>\n      }\n      <!-- Numeric Part -->\n      <div\n        class=\"input-error-container\"\n        [class.has-error]=\"\n          (parentForm.controls[controlName].invalid ||\n            PlateInputForm.get('plateNumberNumeric')?.invalid) &&\n          PlateInputForm.get('plateNumberNumeric')?.touched\n        \"\n      >\n        <input\n          [id]=\"label + '-number'\"\n          type=\"text\"\n          name=\"plateNumberNumeric\"\n          placeholder=\"1234\"\n          [class]=\"'custom-input left plate-number-input ' + class\"\n          formControlName=\"plateNumberNumeric\"\n          (ngModelChange)=\"updateParentForm($event)\"\n          [class.input-error]=\"\n            (parentForm.controls[controlName].invalid ||\n              PlateInputForm.get('plateNumberNumeric')?.invalid) &&\n            PlateInputForm.get('plateNumberNumeric')?.touched\n          \"\n          [maxlength]=\"maxNumberLength\"\n        />\n        @if(PlateInputForm.get('plateNumberNumeric')?.invalid &&\n        PlateInputForm.get('plateNumberNumeric')?.touched){\n        <span class=\"input-error-icon\"><!-- SVG as in your original --></span>\n        }\n      </div>\n\n      <!-- Letters Part -->\n      <div\n        class=\"input-error-container\"\n        [class.has-error]=\"\n          PlateInputForm.get('plateNumberLetters')?.invalid &&\n          PlateInputForm.get('plateNumberLetters')?.touched\n        \"\n      >\n        <input\n          [id]=\"label + '-letters'\"\n          type=\"text\"\n          name=\"plateNumberLetters\"\n          placeholder=\"ABC\"\n          [class]=\"'custom-input right plate-letters-input ' + class\"\n          formControlName=\"plateNumberLetters\"\n          (ngModelChange)=\"valueChange.emit($event)\"\n          [class.input-error]=\"\n            (parentForm.controls[controlName].invalid ||\n              PlateInputForm.get('plateNumberLetters')?.invalid) &&\n            PlateInputForm.get('plateNumberLetters')?.touched\n          \"\n          [maxlength]=\"maxLetterLength\"\n        />\n        @if(PlateInputForm.get('plateNumberLetters')?.invalid &&\n        PlateInputForm.get('plateNumberLetters')?.touched){\n        <span class=\"input-error-icon\"><!-- SVG as in your original --></span>\n        }\n      </div>\n    </div>\n  </div>\n</form>\n", styles: [".plate-input-row{display:flex;gap:-.1em}.plate-number-input{width:50%}.plate-letters-input{width:40%}.input-wrapper,.input-error-container{position:relative}.custom-input{width:100%;height:100%;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;padding:.93em 1em;transition:border-color .2s;border:1px solid #e5e6e5}.custom-input.left{border-radius:.375em 0 0 .375em;border-right:1px solid #e5e6e5}.custom-input.right{border-radius:0 .375em .375em 0;margin-left:-.05em}.custom-input.input-error{border:1px solid #e55658;box-shadow:1px 0 6px #e5565826}.input-error-icon{position:absolute;right:1em;top:50%;transform:translateY(-50%);color:#e55658;font-size:1.5em;pointer-events:none}.custom-input::placeholder{color:#e5e6e5;font-size:1em;font-weight:400}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.plateNumber-error-container{position:absolute;top:100%;left:.5em;width:100%}.plateNumber-error-container custom-app-error{pointer-events:none}\n"] }]
        }], propDecorators: { class: [{
                type: Input
            }], labelClass: [{
                type: Input
            }], label: [{
                type: Input
            }], parentForm: [{
                type: Input,
                args: [{ required: true }]
            }], controlName: [{
                type: Input,
                args: [{ required: true }]
            }], validation: [{
                type: Input,
                args: [{ required: true }]
            }], mainValidation: [{
                type: Input
            }], maxNumberLength: [{
                type: Input
            }], maxLetterLength: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });

class CustomTabsComponent {
    tabsList;
    color = '#4B4B4B';
    colorSelected = '#15C5CE';
    tabClass = '';
    tabTemplates = {};
    tabRightTemplate = undefined;
    tabSelected = new EventEmitter();
    selectedTab;
    ngOnInit() {
        if (!this.selectedTab)
            this.selectedTab = this.tabsList[0];
        else
            this.selectTab(this.selectedTab);
    }
    selectTab(tab) {
        if (!tab.disabled) {
            this.selectedTab = tab;
            this.tabSelected.emit(tab);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomTabsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomTabsComponent, isStandalone: true, selector: "custom-tabs", inputs: { tabsList: "tabsList", color: "color", colorSelected: "colorSelected", tabClass: "tabClass", tabTemplates: "tabTemplates", tabRightTemplate: "tabRightTemplate", selectedTab: "selectedTab" }, outputs: { tabSelected: "tabSelected" }, ngImport: i0, template: "<!-- tab-selector.component.html -->\n<div [class]=\"'tab-container justify-between ' + tabClass\" >\n  <div class=\"tab-list\">\n  @for (tab of tabsList; track tab) {\n  <button\n    class=\"tab-button\"\n    [style.color]=\"selectedTab.id === tab.id ? colorSelected : color\"\n    [class.selected]=\"selectedTab.id === tab.id\"\n    (click)=\"selectTab(tab)\"\n    [ngStyle]=\"{ cursor: tab.disabled ? 'not-allowed' : 'pointer' }\"\n  >\n    @if(tabTemplates[tab.id]) {\n    <ng-template *ngTemplateOutlet=\"tabTemplates[tab.id]\"></ng-template>\n    } @else{\n    {{ tab.nameEn }}}\n    <span\n      class=\"underline\"\n      [style.backgroundColor]=\"colorSelected\"\n      [class.visible]=\"selectedTab.id === tab.id\"\n    ></span>\n  </button>\n  }\n  </div>\n@if(tabRightTemplate){\n    <ng-template *ngTemplateOutlet=\"tabRightTemplate\"></ng-template>\n}\n</div>\n\n", styles: [".tab-container{display:flex;width:100%;border-bottom:1px solid var(--grey-700)}.tab-list{display:flex;padding-top:.5rem;gap:1.15em}.tab-button{position:relative;padding-bottom:.95em;font-weight:300;background:none;border:none;outline:none;transition:color .2s;font-size:1em;font-family:var(--FM-Light)}.tab-button.selected{cursor:default;font-family:var(--FM-Bold)}.underline{content:\"\";position:absolute;left:0;bottom:-.15rem;height:.15em;width:100%;border-radius:4px;transform:scaleX(0);opacity:0;transition:transform .3s,opacity .3s}.underline.visible{transform:scaleX(1);opacity:1}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomTabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-tabs', imports: [CommonModule], template: "<!-- tab-selector.component.html -->\n<div [class]=\"'tab-container justify-between ' + tabClass\" >\n  <div class=\"tab-list\">\n  @for (tab of tabsList; track tab) {\n  <button\n    class=\"tab-button\"\n    [style.color]=\"selectedTab.id === tab.id ? colorSelected : color\"\n    [class.selected]=\"selectedTab.id === tab.id\"\n    (click)=\"selectTab(tab)\"\n    [ngStyle]=\"{ cursor: tab.disabled ? 'not-allowed' : 'pointer' }\"\n  >\n    @if(tabTemplates[tab.id]) {\n    <ng-template *ngTemplateOutlet=\"tabTemplates[tab.id]\"></ng-template>\n    } @else{\n    {{ tab.nameEn }}}\n    <span\n      class=\"underline\"\n      [style.backgroundColor]=\"colorSelected\"\n      [class.visible]=\"selectedTab.id === tab.id\"\n    ></span>\n  </button>\n  }\n  </div>\n@if(tabRightTemplate){\n    <ng-template *ngTemplateOutlet=\"tabRightTemplate\"></ng-template>\n}\n</div>\n\n", styles: [".tab-container{display:flex;width:100%;border-bottom:1px solid var(--grey-700)}.tab-list{display:flex;padding-top:.5rem;gap:1.15em}.tab-button{position:relative;padding-bottom:.95em;font-weight:300;background:none;border:none;outline:none;transition:color .2s;font-size:1em;font-family:var(--FM-Light)}.tab-button.selected{cursor:default;font-family:var(--FM-Bold)}.underline{content:\"\";position:absolute;left:0;bottom:-.15rem;height:.15em;width:100%;border-radius:4px;transform:scaleX(0);opacity:0;transition:transform .3s,opacity .3s}.underline.visible{transform:scaleX(1);opacity:1}\n"] }]
        }], propDecorators: { tabsList: [{
                type: Input,
                args: [{ required: true }]
            }], color: [{
                type: Input
            }], colorSelected: [{
                type: Input
            }], tabClass: [{
                type: Input
            }], tabTemplates: [{
                type: Input
            }], tabRightTemplate: [{
                type: Input
            }], tabSelected: [{
                type: Output
            }], selectedTab: [{
                type: Input
            }] } });

class CustomColorComponent {
    colorsArray = [
        '#9747FF',
        '#AC8746',
        '#8290E1',
        '#E76161',
        '#4F378B',
        '#FFD8E4',
        '#1D1B20',
        '#852221',
        '#FF8981',
        '#9887C5',
        '#3B383E',
        '#46115E',
        '#F57423',
        '#FFCB1F',
    ];
    isOpen = false;
    positionClass = '';
    title = '';
    name = '';
    hideNameInput = false;
    color = '#9747FF';
    enableColors = true;
    onSaveColor = new EventEmitter();
    onColorSelected(color) {
        if (this.color === color) {
            this.color = '';
            return;
        }
        this.color = color;
    }
    onCancel() {
        this.isOpen = false;
    }
    onSave() {
        this.onSaveColor.emit({
            color: this.color,
            name: this.name,
        });
        this.name = '';
        this.color = '';
        this.isOpen = false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomColorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomColorComponent, isStandalone: true, selector: "custom-color", inputs: { positionClass: "positionClass", title: "title", name: "name", hideNameInput: "hideNameInput", color: "color", enableColors: "enableColors" }, outputs: { onSaveColor: "onSaveColor" }, ngImport: i0, template: "<div style=\"position: relative\">\n  <div (click)=\"isOpen = !isOpen\">\n    <ng-content></ng-content>\n  </div>\n\n  @if (isOpen) {\n  <div [class]=\"'color-container ' + positionClass\">\n    <h1 class=\"title\">{{title}}</h1>\n    @if(!hideNameInput){\n\n      <input class=\"color-input\" placeholder=\"Name\" [(ngModel)]=\"name\" />\n    }\n\n\n    @if(enableColors){\n    <div\n      style=\"\n        display: flex;\n        justify-content: start;\n        align-items: center;\n        flex-wrap: wrap;\n        gap: 2px;\n      \"\n    >\n      @for (item of colorsArray; track $index) {\n      <div\n        class=\"color-box-wrapper\"\n        (click)=\"onColorSelected(item)\"\n        [class.selected]=\"color === item\"\n      >\n        <div class=\"color-box\" [ngStyle]=\"{ 'background-color': item }\"></div>\n      </div>\n\n      }\n    </div>\n\n    }\n\n    <div\n      style=\"\n        width: 100%;\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        gap: 4px;\n      \"\n    >\n      <button class=\"save-button\" (click)=\"onSave()\">Save</button>\n\n      <button class=\"cancel-button\" (click)=\"onCancel()\">Cancel</button>\n    </div>\n  </div>\n  }\n</div>\n", styles: [".color-container{display:flex;flex-direction:column;align-items:center;justify-content:center;width:230px;min-height:50px;background-color:#fff;border-radius:12px;padding:16px 12px;gap:12px;position:absolute;z-index:999}.title{width:100%;font-size:16px;font-weight:500;color:#000;text-align:start}.color-box{max-width:20px;max-height:20px;min-width:20px;min-height:20px;border-radius:50%;cursor:pointer}.color-box-wrapper{max-width:25px;max-height:25px;min-width:25px;min-height:25px;border:1px solid #fff;display:flex;align-items:center;justify-content:center;border-radius:4px}.color-box-wrapper:hover,.color-box-wrapper.selected{border:1px solid #25c7bc}.save-button{width:100px;height:36px;border-radius:12px;text-align:center;background-color:#25c7bc;color:#fff;font-size:15px;font-weight:500;cursor:pointer}.cancel-button{width:100px;height:36px;border-radius:12px;text-align:center;background-color:#fff;color:#000;font-size:15px;font-weight:500;border:1px solid #d0d0d0;cursor:pointer}.color-input{background-color:#fff;border:1px solid #d0d0d0;height:36px;width:100%;border-radius:12px;padding:8px 12px;font-size:14px;font-weight:500;color:#000}.color-input:focus{outline:none;border-color:#25c7bc}.color-input::placeholder{color:#d0d0d0}.color-input:focus::placeholder{color:#25c7bc}\n"], dependencies: [{ kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomColorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-color', imports: [NgStyle, FormsModule], template: "<div style=\"position: relative\">\n  <div (click)=\"isOpen = !isOpen\">\n    <ng-content></ng-content>\n  </div>\n\n  @if (isOpen) {\n  <div [class]=\"'color-container ' + positionClass\">\n    <h1 class=\"title\">{{title}}</h1>\n    @if(!hideNameInput){\n\n      <input class=\"color-input\" placeholder=\"Name\" [(ngModel)]=\"name\" />\n    }\n\n\n    @if(enableColors){\n    <div\n      style=\"\n        display: flex;\n        justify-content: start;\n        align-items: center;\n        flex-wrap: wrap;\n        gap: 2px;\n      \"\n    >\n      @for (item of colorsArray; track $index) {\n      <div\n        class=\"color-box-wrapper\"\n        (click)=\"onColorSelected(item)\"\n        [class.selected]=\"color === item\"\n      >\n        <div class=\"color-box\" [ngStyle]=\"{ 'background-color': item }\"></div>\n      </div>\n\n      }\n    </div>\n\n    }\n\n    <div\n      style=\"\n        width: 100%;\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        gap: 4px;\n      \"\n    >\n      <button class=\"save-button\" (click)=\"onSave()\">Save</button>\n\n      <button class=\"cancel-button\" (click)=\"onCancel()\">Cancel</button>\n    </div>\n  </div>\n  }\n</div>\n", styles: [".color-container{display:flex;flex-direction:column;align-items:center;justify-content:center;width:230px;min-height:50px;background-color:#fff;border-radius:12px;padding:16px 12px;gap:12px;position:absolute;z-index:999}.title{width:100%;font-size:16px;font-weight:500;color:#000;text-align:start}.color-box{max-width:20px;max-height:20px;min-width:20px;min-height:20px;border-radius:50%;cursor:pointer}.color-box-wrapper{max-width:25px;max-height:25px;min-width:25px;min-height:25px;border:1px solid #fff;display:flex;align-items:center;justify-content:center;border-radius:4px}.color-box-wrapper:hover,.color-box-wrapper.selected{border:1px solid #25c7bc}.save-button{width:100px;height:36px;border-radius:12px;text-align:center;background-color:#25c7bc;color:#fff;font-size:15px;font-weight:500;cursor:pointer}.cancel-button{width:100px;height:36px;border-radius:12px;text-align:center;background-color:#fff;color:#000;font-size:15px;font-weight:500;border:1px solid #d0d0d0;cursor:pointer}.color-input{background-color:#fff;border:1px solid #d0d0d0;height:36px;width:100%;border-radius:12px;padding:8px 12px;font-size:14px;font-weight:500;color:#000}.color-input:focus{outline:none;border-color:#25c7bc}.color-input::placeholder{color:#d0d0d0}.color-input:focus::placeholder{color:#25c7bc}\n"] }]
        }], propDecorators: { positionClass: [{
                type: Input,
                args: [{ required: true }]
            }], title: [{
                type: Input,
                args: [{ required: true }]
            }], name: [{
                type: Input
            }], hideNameInput: [{
                type: Input
            }], color: [{
                type: Input
            }], enableColors: [{
                type: Input
            }], onSaveColor: [{
                type: Output
            }] } });

class CustomTooltipComponent {
    customClass = '';
    text = '';
    delay = 100;
    position = 'top';
    tooltipTemplate;
    visible = false;
    timeoutId;
    show() {
        this.timeoutId = setTimeout(() => (this.visible = true), this.delay);
    }
    hide() {
        clearTimeout(this.timeoutId);
        this.visible = false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomTooltipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomTooltipComponent, isStandalone: true, selector: "custom-tooltip", inputs: { customClass: "customClass", text: "text", delay: "delay", position: "position" }, host: { listeners: { "mouseenter": "show()", "mouseleave": "hide()" }, properties: { "class.tooltip-host": "true" } }, queries: [{ propertyName: "tooltipTemplate", first: true, predicate: ["tooltipTemplate"], descendants: true }], ngImport: i0, template: "<div class=\"tooltip-wrapper\">\n  <ng-content></ng-content>\n\n  @if (visible) {\n    <div class=\"tooltip tooltip-{{position}} {{customClass}}\">\n      @if (tooltipTemplate) {\n        <ng-container [ngTemplateOutlet]=\"tooltipTemplate\"></ng-container>\n      } @else {\n        {{ text }}\n      }\n    </div>\n  }\n</div>\n", styles: [".tooltip-wrapper{position:relative;display:inline-block}.tooltip{position:absolute;z-index:1000;padding:8px 12px;border-radius:4px;background-color:#333;color:#fff;font-size:14px;line-height:1.4;white-space:nowrap;box-shadow:0 2px 4px #0003}.tooltip-top{bottom:100%;left:50%;transform:translate(-50%);margin-bottom:8px}.tooltip-top:after{content:\"\";position:absolute;top:100%;left:50%;transform:translate(-50%);border-width:5px;border-style:solid;border-color:#333 transparent transparent transparent}.tooltip-right{left:100%;top:50%;transform:translateY(-50%);margin-left:8px}.tooltip-right:after{content:\"\";position:absolute;right:100%;top:50%;transform:translateY(-50%);border-width:5px;border-style:solid;border-color:transparent #333 transparent transparent}.tooltip-bottom{top:100%;left:50%;transform:translate(-50%);margin-top:8px}.tooltip-bottom:after{content:\"\";position:absolute;bottom:100%;left:50%;transform:translate(-50%);border-width:5px;border-style:solid;border-color:transparent transparent #333 transparent}.tooltip-left{right:100%;top:50%;transform:translateY(-50%);margin-right:8px}.tooltip-left:after{content:\"\";position:absolute;left:100%;top:50%;transform:translateY(-50%);border-width:5px;border-style:solid;border-color:transparent transparent transparent #333}@keyframes fadeIn{0%{opacity:0;transform:translateY(0)}to{opacity:1;transform:translateY(0)}}\n"], dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomTooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-tooltip', imports: [NgTemplateOutlet], host: {
                        '(mouseenter)': 'show()',
                        '(mouseleave)': 'hide()',
                        '[class.tooltip-host]': 'true',
                    }, template: "<div class=\"tooltip-wrapper\">\n  <ng-content></ng-content>\n\n  @if (visible) {\n    <div class=\"tooltip tooltip-{{position}} {{customClass}}\">\n      @if (tooltipTemplate) {\n        <ng-container [ngTemplateOutlet]=\"tooltipTemplate\"></ng-container>\n      } @else {\n        {{ text }}\n      }\n    </div>\n  }\n</div>\n", styles: [".tooltip-wrapper{position:relative;display:inline-block}.tooltip{position:absolute;z-index:1000;padding:8px 12px;border-radius:4px;background-color:#333;color:#fff;font-size:14px;line-height:1.4;white-space:nowrap;box-shadow:0 2px 4px #0003}.tooltip-top{bottom:100%;left:50%;transform:translate(-50%);margin-bottom:8px}.tooltip-top:after{content:\"\";position:absolute;top:100%;left:50%;transform:translate(-50%);border-width:5px;border-style:solid;border-color:#333 transparent transparent transparent}.tooltip-right{left:100%;top:50%;transform:translateY(-50%);margin-left:8px}.tooltip-right:after{content:\"\";position:absolute;right:100%;top:50%;transform:translateY(-50%);border-width:5px;border-style:solid;border-color:transparent #333 transparent transparent}.tooltip-bottom{top:100%;left:50%;transform:translate(-50%);margin-top:8px}.tooltip-bottom:after{content:\"\";position:absolute;bottom:100%;left:50%;transform:translate(-50%);border-width:5px;border-style:solid;border-color:transparent transparent #333 transparent}.tooltip-left{right:100%;top:50%;transform:translateY(-50%);margin-right:8px}.tooltip-left:after{content:\"\";position:absolute;left:100%;top:50%;transform:translateY(-50%);border-width:5px;border-style:solid;border-color:transparent transparent transparent #333}@keyframes fadeIn{0%{opacity:0;transform:translateY(0)}to{opacity:1;transform:translateY(0)}}\n"] }]
        }], propDecorators: { customClass: [{
                type: Input
            }], text: [{
                type: Input
            }], delay: [{
                type: Input
            }], position: [{
                type: Input
            }], tooltipTemplate: [{
                type: ContentChild,
                args: ['tooltipTemplate']
            }] } });

class CustomRadioComponentComponent {
    radioClass = '';
    name = '';
    value;
    label = '';
    disabled = false;
    // Changed from checked to model
    model;
    modelChange = new EventEmitter();
    get isChecked() {
        return this.model === this.value;
    }
    onInputChange() {
        if (this.disabled)
            return;
        this.modelChange.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomRadioComponentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomRadioComponentComponent, isStandalone: true, selector: "custom-radio-component", inputs: { radioClass: "radioClass", name: "name", value: "value", label: "label", disabled: "disabled", model: "model" }, outputs: { modelChange: "modelChange" }, ngImport: i0, template: "<label class=\"custom-radio-container\">\n  <input\n    type=\"radio\"\n    [name]=\"name\"\n    [value]=\"value\"\n    [class]=\"'custom-radio ' + radioClass\"\n    [checked]=\"isChecked\"\n    [disabled]=\"disabled\"\n    (change)=\"onInputChange()\"\n  />\n  @if (label) {\n    <span class=\"radio-label\">{{ label }}</span>\n  }\n</label>\n", styles: [".custom-radio{appearance:none;width:20px;height:20px;border:2px solid #d0d0d0;border-radius:50%;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease}.custom-radio-container{display:flex;align-items:center;gap:4px;cursor:pointer}.custom-radio:checked{border-color:#25c7bc}.custom-radio:checked:after{content:\"\";position:absolute;top:50%;left:50%;width:8px;height:8px;background:#25c7bc;border-radius:50%;transform:translate(-50%,-50%)}.custom-radio:focus{box-shadow:0 0 0 2px #25c7bc33}.custom-radio:disabled{border-color:#d0d0d0;cursor:not-allowed!important}.custom-radio:disabled:after{background:#d0d0d0}.custom-radio:disabled+.radio-label{color:#fff;font-weight:400;font-size:14px;cursor:not-allowed!important}.radio-label{color:#fff;font-weight:400;font-size:14px;cursor:pointer;-webkit-user-select:none;user-select:none}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomRadioComponentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-radio-component', imports: [FormsModule], template: "<label class=\"custom-radio-container\">\n  <input\n    type=\"radio\"\n    [name]=\"name\"\n    [value]=\"value\"\n    [class]=\"'custom-radio ' + radioClass\"\n    [checked]=\"isChecked\"\n    [disabled]=\"disabled\"\n    (change)=\"onInputChange()\"\n  />\n  @if (label) {\n    <span class=\"radio-label\">{{ label }}</span>\n  }\n</label>\n", styles: [".custom-radio{appearance:none;width:20px;height:20px;border:2px solid #d0d0d0;border-radius:50%;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease}.custom-radio-container{display:flex;align-items:center;gap:4px;cursor:pointer}.custom-radio:checked{border-color:#25c7bc}.custom-radio:checked:after{content:\"\";position:absolute;top:50%;left:50%;width:8px;height:8px;background:#25c7bc;border-radius:50%;transform:translate(-50%,-50%)}.custom-radio:focus{box-shadow:0 0 0 2px #25c7bc33}.custom-radio:disabled{border-color:#d0d0d0;cursor:not-allowed!important}.custom-radio:disabled:after{background:#d0d0d0}.custom-radio:disabled+.radio-label{color:#fff;font-weight:400;font-size:14px;cursor:not-allowed!important}.radio-label{color:#fff;font-weight:400;font-size:14px;cursor:pointer;-webkit-user-select:none;user-select:none}\n"] }]
        }], propDecorators: { radioClass: [{
                type: Input
            }], name: [{
                type: Input,
                args: [{ required: true }]
            }], value: [{
                type: Input,
                args: [{ required: true }]
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }], model: [{
                type: Input
            }], modelChange: [{
                type: Output
            }] } });

class CustomReactiveSearchInputComponent {
    model = '';
    modelChange = new EventEmitter();
    search = new EventEmitter();
    containerClass = '';
    inputClass = '';
    inputPlaceholder = '';
    inputSubject = new Subject();
    constructor() {
        this.inputSubject
            .pipe(debounceTime(1000), distinctUntilChanged(), takeUntilDestroyed())
            .subscribe((val) => this.search.emit(val.trim()));
    }
    onInputChange(value) {
        this.modelChange.emit(value); // for ngModel sync
        this.inputSubject.next(value); // for debounce emit
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomReactiveSearchInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: CustomReactiveSearchInputComponent, isStandalone: true, selector: "custom-reactive-search-input", inputs: { model: "model", containerClass: "containerClass", inputClass: "inputClass", inputPlaceholder: "inputPlaceholder" }, outputs: { modelChange: "modelChange", search: "search" }, ngImport: i0, template: "<div [ngClass]=\"containerClass\">\n  <div class=\"search-icon\">\n\n      <svg\n        width=\"auto\"\n        height=\"24\"\n        viewBox=\"0 0 25 24\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M12 21C17.2467 21 21.5 16.7467 21.5 11.5C21.5 6.25329 17.2467 2 12 2C6.75329 2 2.5 6.25329 2.5 11.5C2.5 16.7467 6.75329 21 12 21Z\"\n          stroke=\"#7C8289\"\n          stroke-width=\"1.5\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M22.5 22L20.5 20\"\n          stroke=\"#7C8289\"\n          stroke-width=\"1.5\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n  </div>\n\n  <input\n    type=\"text\"\n    [ngModel]=\"model\"\n    (ngModelChange)=\"onInputChange($event)\"\n    [ngClass]=\"inputClass\"\n    [placeholder]=\"inputPlaceholder\"\n  />\n</div>\n", styles: [".search-icon{width:1.25em;height:auto}.search-icon svg{width:100%!important;height:auto;display:block}\n"], dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomReactiveSearchInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-reactive-search-input', imports: [NgClass, FormsModule], template: "<div [ngClass]=\"containerClass\">\n  <div class=\"search-icon\">\n\n      <svg\n        width=\"auto\"\n        height=\"24\"\n        viewBox=\"0 0 25 24\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M12 21C17.2467 21 21.5 16.7467 21.5 11.5C21.5 6.25329 17.2467 2 12 2C6.75329 2 2.5 6.25329 2.5 11.5C2.5 16.7467 6.75329 21 12 21Z\"\n          stroke=\"#7C8289\"\n          stroke-width=\"1.5\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M22.5 22L20.5 20\"\n          stroke=\"#7C8289\"\n          stroke-width=\"1.5\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n  </div>\n\n  <input\n    type=\"text\"\n    [ngModel]=\"model\"\n    (ngModelChange)=\"onInputChange($event)\"\n    [ngClass]=\"inputClass\"\n    [placeholder]=\"inputPlaceholder\"\n  />\n</div>\n", styles: [".search-icon{width:1.25em;height:auto}.search-icon svg{width:100%!important;height:auto;display:block}\n"] }]
        }], ctorParameters: () => [], propDecorators: { model: [{
                type: Input
            }], modelChange: [{
                type: Output
            }], search: [{
                type: Output
            }], containerClass: [{
                type: Input,
                args: [{ required: true }]
            }], inputClass: [{
                type: Input,
                args: [{ required: true }]
            }], inputPlaceholder: [{
                type: Input,
                args: [{ required: true }]
            }] } });

class CustomFilterDropdownComponent {
    fb;
    filtersConfig = [];
    filtersChanged = new EventEmitter();
    activeFilters = model({
        main: [],
        filteredValues: {},
    });
    filterOptions = [];
    filterForm;
    emptyOptions = [];
    nullValidation = {};
    errorConstant = ComponentFormErrorConstant;
    constructor(fb) {
        this.fb = fb;
        this.filterOptions = [];
    }
    ngOnInit() {
        this.filterOptions = this.filtersConfig.map((f) => ({
            id: f.id,
            nameEn: f.nameEn,
            nameAr: f.nameAr,
        }));
        this.filterForm = this.fb.group({});
        const { main, filteredValues } = this.activeFilters();
        main.forEach((row) => {
            if (row.filterConfig) {
                const initialValue = filteredValues[row.filterConfig.label] ??
                    this.getDefaultInitialValue(row.filterConfig.type);
                const validators = this.getValidatorsFromConfig(row.filterConfig.validation);
                if (row.filterConfig.type === 'date') {
                    const dateValue = new Date(initialValue);
                    this.filterForm.addControl(row.filterConfig.label, new FormControl(dateValue, validators));
                }
                else {
                    this.filterForm.addControl(row.filterConfig.label, new FormControl(initialValue, validators));
                }
            }
        });
        this.filterForm.valueChanges
            .pipe(filter((val) => !this.isFilterFormEmpty()) // only run if there's data
        )
            .subscribe((val) => {
            const transformed = { ...val };
            Object.keys(transformed).forEach((key) => {
                const cfg = this.filtersConfig.find((f) => f.label === key);
                if (cfg?.type === 'date' && transformed[key] instanceof Date) {
                    transformed[key] = transformed[key].toISOString().split('T')[0];
                }
            });
            this.activeFilters.update((current) => ({
                ...current,
                filteredValues: transformed,
            }));
            this.filtersChanged.emit(this.activeFilters().filteredValues);
        });
    }
    getDefaultInitialValue(type) {
        switch (type) {
            case 'multiselect':
                return [];
            case 'date':
                return null;
            default:
                return '';
        }
    }
    getValidatorsFromConfig(validations = []) {
        const validators = [];
        validators.push(Validators.required);
        return validators;
    }
    getAvailableOptions(activeIndex) {
        const selectedIds = this.activeFilters()
            .main.filter((row, idx) => row.filterId && idx !== activeIndex)
            .map((row) => row.filterId);
        return this.filterOptions.filter((opt) => !selectedIds.includes(opt.id));
    }
    addFilterRow() {
        this.activeFilters.update((current) => ({
            ...current,
            main: [
                ...current.main,
                { filterId: 0, controlName: `row_${Date.now()}` },
            ],
        }));
    }
    onFilterDropdownChange(selectedId, rowIndex) {
        if (!selectedId)
            return;
        const filterConfig = this.filtersConfig.find((f) => f.id === selectedId.id);
        if (!filterConfig)
            return;
        const row = this.activeFilters().main[rowIndex];
        // Remove old control if it exists
        if (row.filterConfig && this.filterForm.contains(row.filterConfig.label)) {
            this.filterForm.removeControl(row.filterConfig.label);
            // Also remove from filteredValues
            this.activeFilters.update((current) => {
                const { [row.filterConfig.label]: _, ...rest } = current.filteredValues;
                return { ...current, filteredValues: rest };
            });
        }
        // Assign new filter configuration
        row.filterId = selectedId.id;
        row.filterConfig = filterConfig;
        // Add a control for the selected filter type
        let control;
        switch (filterConfig.type) {
            case 'multiselect':
                control = new FormControl([], [Validators.required]);
                break;
            case 'date':
                control = new FormControl(null);
                break;
            default:
                control = new FormControl('');
                break;
        }
        this.filterForm.addControl(filterConfig.label, control);
    }
    removeFilterRow(rowIndex) {
        const row = this.activeFilters().main[rowIndex];
        if (row &&
            row.filterConfig &&
            this.filterForm.contains(row.filterConfig.label)) {
            this.filterForm.get(row.filterConfig.label)?.reset();
            this.filterForm.removeControl(row.filterConfig.label);
        }
        this.activeFilters().main.splice(rowIndex, 1);
        if (this.isFilterFormEmpty()) {
            this.filtersChanged.emit(this.activeFilters().filteredValues);
        }
    }
    isFilterFormEmpty() {
        const val = this.filterForm.value;
        return !Object.values(val).some((v) => {
            if (v === null || v === undefined)
                return false;
            if (typeof v === 'string')
                return v.trim() !== '';
            if (Array.isArray(v))
                return v.length > 0;
            return true;
        });
    }
    clearAll() {
        this.filterForm.reset();
        this.activeFilters.update((current) => ({
            ...current,
            filteredValues: this.filterForm.value,
            main: [],
        }));
        console.log();
        this.filtersChanged.emit(this.activeFilters().filteredValues);
    }
    onDateChange(event, name) {
        console.log('hi', event, name);
    }
    onMultiSelectChange(event, name) {
        console.log('hi', event, name);
    }
    onDropdownChange(event, name) {
        console.log('hi', event, name);
    }
    filtersChangedEmit() {
        this.activeFilters.update((current) => ({
            ...current,
            filteredValues: this.filterForm.value,
        }));
        this.filtersChanged.emit(this.activeFilters().filteredValues);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomFilterDropdownComponent, deps: [{ token: i1$1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomFilterDropdownComponent, isStandalone: true, selector: "custom-filter-dropdown", inputs: { filtersConfig: { classPropertyName: "filtersConfig", publicName: "filtersConfig", isSignal: false, isRequired: true, transformFunction: null }, activeFilters: { classPropertyName: "activeFilters", publicName: "activeFilters", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { filtersChanged: "filtersChanged", activeFilters: "activeFiltersChange" }, ngImport: i0, template: "<form [formGroup]=\"filterForm\" class=\"form-container\">\n  <div class=\"filter-header\">\n    <p>\n      {{ \"FILTER.FILTER\" | translate }}\n    </p>\n    <button class=\"clear-button\" (click)=\"clearAll()\">\n      {{ \"FILTER.CLEAR_ALL\" | translate }}\n    </button>\n  </div>\n  @for(filterRow of activeFilters().main;track filterRow; let idx = $index) {\n  <div class=\"filter-row\">\n    <!-- Custom Dropdown for selecting filter type -->\n    <custom-dropdown\n      [options]=\"getAvailableOptions(idx)\"\n      [value]=\"filterRow.filterId ?? 0\"\n      (valueChange)=\"onFilterDropdownChange($event, idx)\"\n      [placeholder]=\"'FILTER.SELECT_PLACE' | translate\"\n      [name]=\"'SelectType'\"\n      height=\"2.8em\"\n    ></custom-dropdown>\n\n    <!-- Render input if a filter is chosen -->\n    @if( filterRow.filterConfig) {\n    <ng-container>\n      @switch (filterRow.filterConfig.type) { @case('text'){\n      <custom-input-form\n        [parentForm]=\"filterForm\"\n        [placeholder]=\"filterRow.filterConfig.placeholder || ''\"\n        [controlName]=\"filterRow.filterConfig.label\"\n        [type]=\"'text'\"\n        [validation]=\"filterRow.filterConfig.validation\"\n        [name]=\"filterRow.filterConfig.nameEn\"\n        class=\"bg-white\"\n        height=\"2.8em\"\n      ></custom-input-form>\n\n      } @case('multiselect'){\n      <custom-multi-select-form\n        *ngIf=\"filterRow.filterConfig.type === 'multiselect'\"\n        [parentForm]=\"filterForm\"\n        [controlName]=\"filterRow.filterConfig.label\"\n        [options]=\"filterRow.filterConfig.options || emptyOptions\"\n        [validation]=\"filterRow.filterConfig.validation\"\n        [name]=\"filterRow.filterConfig.nameEn\"\n        (valueChange)=\"onDropdownChange($event, filterRow.filterConfig.nameEn)\"\n        [reset]=\"filterRow.filterConfig.reset\"\n        height=\"2.8em\"\n        [enableFilter]=\"true\"\n        [filterDesign]=\"true\"\n      ></custom-multi-select-form>\n      } @case('date'){\n      <custom-calender-form\n        [parentForm]=\"filterForm\"\n        [controlName]=\"filterRow.filterConfig.label\"\n        [validation]=\"filterRow.filterConfig.validation\"\n        [name]=\"filterRow.filterConfig.nameEn\"\n        (valueChange)=\"onDateChange($event, filterRow.filterConfig.nameEn)\"\n        [disabled]=\"filterRow.filterConfig.disabled || false\"\n        height=\"2.8em\"\n      ></custom-calender-form>\n      } @case('dateRange'){\n      <custom-calender-form\n        [parentForm]=\"filterForm\"\n        [controlName]=\"filterRow.filterConfig.nameEn + 'From'\"\n        [validation]=\"filterRow.filterConfig.validation\"\n        [name]=\"filterRow.filterConfig.nameEn + 'From'\"\n        (valueChange)=\"onDateChange($event, filterRow.filterConfig.nameEn)\"\n        [disabled]=\"filterRow.filterConfig.disabled || false\"\n        height=\"2.8em\"\n        [maxDate]=\"filterForm.get(filterRow.filterConfig.nameEn + 'To')?.value\"\n      ></custom-calender-form>\n\n      <custom-calender-form\n        [parentForm]=\"filterForm\"\n        [controlName]=\"filterRow.filterConfig.nameEn + 'To'\"\n        [validation]=\"filterRow.filterConfig.validation\"\n        [name]=\"filterRow.filterConfig.nameEn + 'To'\"\n        (valueChange)=\"onDateChange($event, filterRow.filterConfig.nameEn)\"\n        [disabled]=\"filterRow.filterConfig.disabled || false\"\n        height=\"2.8em\"\n        [minDate]=\"\n          filterForm.get(filterRow.filterConfig.nameEn + 'From')?.value\n        \"\n      ></custom-calender-form>\n\n      }}\n    </ng-container>\n    }\n\n    <button\n      *ngIf=\"filterRow.filterConfig\"\n      class=\"clear-button\"\n      type=\"button\"\n      (click)=\"$event.stopPropagation(); removeFilterRow(idx)\"\n    >\n      <svg\n        width=\"20\"\n        height=\"20\"\n        viewBox=\"0 0 20 20\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <g clip-path=\"url(#clip0_9185_13729)\">\n          <path\n            d=\"M10.0001 19.0909C15.0209 19.0909 19.091 15.0208 19.091 10C19.091 4.97923 15.0209 0.909088 10.0001 0.909088C4.97932 0.909088 0.90918 4.97923 0.90918 10C0.90918 15.0208 4.97932 19.0909 10.0001 19.0909Z\"\n            stroke=\"#F35746\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M12.7275 7.27274L7.27295 12.7273\"\n            stroke=\"#F35746\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M7.27295 7.27274L12.7275 12.7273\"\n            stroke=\"#F35746\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n        <defs>\n          <clipPath id=\"clip0_9185_13729\">\n            <rect width=\"20\" height=\"20\" fill=\"white\" />\n          </clipPath>\n        </defs>\n      </svg>\n    </button>\n  </div>\n  }\n\n  <!-- Add button, disabled if all filters added -->\n  <div class=\"buttons-container\">\n    <button\n      type=\"submit\"\n      (click)=\"$event.stopPropagation(); addFilterRow()\"\n      [class]=\"'buttons'\"\n      [disabled]=\"\n        activeFilters() &&\n        activeFilters().main &&\n        (activeFilters().main.length || 0) >= filterOptions.length\n      \"\n    >\n      <svg\n        width=\"16\"\n        height=\"16\"\n        viewBox=\"0 0 23 23\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <g opacity=\"0.8\">\n          <path\n            d=\"M16.6169 16.617C19.5459 13.6881 19.5459 8.93935 16.6169 6.01042C13.688 3.08149 8.93926 3.08149 6.01033 6.01042C3.0814 8.93935 3.0814 13.6881 6.01033 16.617C8.93926 19.546 13.688 19.546 16.6169 16.617Z\"\n            stroke=\"#06213D\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11.3138 8.13174V14.4957\"\n            stroke=\"#06213D\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M8.13184 11.3137H14.4958\"\n            stroke=\"#06213D\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n      </svg>\n\n      {{ \"FILTER.ADD\" | translate }}\n    </button>\n  </div>\n</form>\n", styles: [".form-container{padding:1em;width:37em;height:100%;min-height:4em;font-size:1.6rem}.filter-header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;margin-bottom:1em}.filter-row{display:grid;grid-template-columns:10fr 10fr 2fr;height:2.77em;gap:1em;margin-block:.25em;text-align:start;font-size:.8125em}.buttons{background:#f2f2f280;font-size:.8125em;color:#06213d;border-radius:.3125em;display:flex;justify-content:center;align-items:center;gap:.3em;padding:.35em .5em;cursor:pointer}.buttons:hover{box-shadow:inset 0 0 0 1000px #fff5}.buttons:disabled{box-shadow:inset 0 0 #fff5;cursor:not-allowed!important;opacity:.5}.buttons-container{display:flex;justify-content:space-between;align-items:center;padding:.4em 0;margin-top:.5em}.clear-button{font-size:.75em;color:#f35746;border-radius:.3125em;display:flex;justify-content:center;align-items:center;gap:.5em;padding:.1em .2em;cursor:pointer;font-family:var(--FM-Light)}.clear-button:hover{box-shadow:inset 0 0 0 1000px #fff5}.clear-button:disabled{box-shadow:inset 0 0 #fff5;cursor:not-allowed!important;opacity:.5}.clear-button-container{display:flex;justify-content:space-between;align-items:center}.filter-row *{font-family:var(--FM-Light)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CustomInputFormComponent, selector: "custom-input-form", inputs: ["class", "labelClass", "label", "placeholder", "name", "type", "controlName", "parentForm", "validation", "pattern", "height", "disabled", "viewType"], outputs: ["valueChange"] }, { kind: "component", type: CustomCalenderFormComponent, selector: "custom-calender-form", inputs: ["label", "placeholder", "labelClass", "calendarPopUpClass", "calendarInputClass", "calendarContainerClass", "componentClass", "minDate", "maxDate", "controlName", "parentForm", "validation", "name", "disabled", "height", "viewType"], outputs: ["valueChange"] }, { kind: "component", type: CustomMultiSelectFormComponent, selector: "custom-multi-select-form", inputs: ["parentForm", "controlName", "label", "labelClass", "dropdownOptionsClass", "dropdownHeaderClass", "dropdownContainerClass", "placeholder", "enableFilter", "filterDesign", "showClear", "height", "viewType", "disabled", "options", "name", "validation", "reset"], outputs: ["valueChange"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: CustomDropdownComponent, selector: "custom-dropdown", inputs: ["label", "labelClass", "dropdownOptionsClass", "dropdownHeaderClass", "selectedClass", "dropdownContainerClass", "placeholder", "enableFilter", "showClear", "options", "name", "value", "height", "reset"], outputs: ["valueChange"] }, { kind: "ngmodule", type: TranslateModule }, { kind: "pipe", type: i3$1.TranslatePipe, name: "translate" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomFilterDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-filter-dropdown', imports: [
                        CommonModule,
                        CustomInputFormComponent,
                        CustomCalenderFormComponent,
                        CustomMultiSelectFormComponent,
                        ReactiveFormsModule,
                        CustomDropdownComponent,
                        TranslateModule,
                    ], template: "<form [formGroup]=\"filterForm\" class=\"form-container\">\n  <div class=\"filter-header\">\n    <p>\n      {{ \"FILTER.FILTER\" | translate }}\n    </p>\n    <button class=\"clear-button\" (click)=\"clearAll()\">\n      {{ \"FILTER.CLEAR_ALL\" | translate }}\n    </button>\n  </div>\n  @for(filterRow of activeFilters().main;track filterRow; let idx = $index) {\n  <div class=\"filter-row\">\n    <!-- Custom Dropdown for selecting filter type -->\n    <custom-dropdown\n      [options]=\"getAvailableOptions(idx)\"\n      [value]=\"filterRow.filterId ?? 0\"\n      (valueChange)=\"onFilterDropdownChange($event, idx)\"\n      [placeholder]=\"'FILTER.SELECT_PLACE' | translate\"\n      [name]=\"'SelectType'\"\n      height=\"2.8em\"\n    ></custom-dropdown>\n\n    <!-- Render input if a filter is chosen -->\n    @if( filterRow.filterConfig) {\n    <ng-container>\n      @switch (filterRow.filterConfig.type) { @case('text'){\n      <custom-input-form\n        [parentForm]=\"filterForm\"\n        [placeholder]=\"filterRow.filterConfig.placeholder || ''\"\n        [controlName]=\"filterRow.filterConfig.label\"\n        [type]=\"'text'\"\n        [validation]=\"filterRow.filterConfig.validation\"\n        [name]=\"filterRow.filterConfig.nameEn\"\n        class=\"bg-white\"\n        height=\"2.8em\"\n      ></custom-input-form>\n\n      } @case('multiselect'){\n      <custom-multi-select-form\n        *ngIf=\"filterRow.filterConfig.type === 'multiselect'\"\n        [parentForm]=\"filterForm\"\n        [controlName]=\"filterRow.filterConfig.label\"\n        [options]=\"filterRow.filterConfig.options || emptyOptions\"\n        [validation]=\"filterRow.filterConfig.validation\"\n        [name]=\"filterRow.filterConfig.nameEn\"\n        (valueChange)=\"onDropdownChange($event, filterRow.filterConfig.nameEn)\"\n        [reset]=\"filterRow.filterConfig.reset\"\n        height=\"2.8em\"\n        [enableFilter]=\"true\"\n        [filterDesign]=\"true\"\n      ></custom-multi-select-form>\n      } @case('date'){\n      <custom-calender-form\n        [parentForm]=\"filterForm\"\n        [controlName]=\"filterRow.filterConfig.label\"\n        [validation]=\"filterRow.filterConfig.validation\"\n        [name]=\"filterRow.filterConfig.nameEn\"\n        (valueChange)=\"onDateChange($event, filterRow.filterConfig.nameEn)\"\n        [disabled]=\"filterRow.filterConfig.disabled || false\"\n        height=\"2.8em\"\n      ></custom-calender-form>\n      } @case('dateRange'){\n      <custom-calender-form\n        [parentForm]=\"filterForm\"\n        [controlName]=\"filterRow.filterConfig.nameEn + 'From'\"\n        [validation]=\"filterRow.filterConfig.validation\"\n        [name]=\"filterRow.filterConfig.nameEn + 'From'\"\n        (valueChange)=\"onDateChange($event, filterRow.filterConfig.nameEn)\"\n        [disabled]=\"filterRow.filterConfig.disabled || false\"\n        height=\"2.8em\"\n        [maxDate]=\"filterForm.get(filterRow.filterConfig.nameEn + 'To')?.value\"\n      ></custom-calender-form>\n\n      <custom-calender-form\n        [parentForm]=\"filterForm\"\n        [controlName]=\"filterRow.filterConfig.nameEn + 'To'\"\n        [validation]=\"filterRow.filterConfig.validation\"\n        [name]=\"filterRow.filterConfig.nameEn + 'To'\"\n        (valueChange)=\"onDateChange($event, filterRow.filterConfig.nameEn)\"\n        [disabled]=\"filterRow.filterConfig.disabled || false\"\n        height=\"2.8em\"\n        [minDate]=\"\n          filterForm.get(filterRow.filterConfig.nameEn + 'From')?.value\n        \"\n      ></custom-calender-form>\n\n      }}\n    </ng-container>\n    }\n\n    <button\n      *ngIf=\"filterRow.filterConfig\"\n      class=\"clear-button\"\n      type=\"button\"\n      (click)=\"$event.stopPropagation(); removeFilterRow(idx)\"\n    >\n      <svg\n        width=\"20\"\n        height=\"20\"\n        viewBox=\"0 0 20 20\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <g clip-path=\"url(#clip0_9185_13729)\">\n          <path\n            d=\"M10.0001 19.0909C15.0209 19.0909 19.091 15.0208 19.091 10C19.091 4.97923 15.0209 0.909088 10.0001 0.909088C4.97932 0.909088 0.90918 4.97923 0.90918 10C0.90918 15.0208 4.97932 19.0909 10.0001 19.0909Z\"\n            stroke=\"#F35746\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M12.7275 7.27274L7.27295 12.7273\"\n            stroke=\"#F35746\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M7.27295 7.27274L12.7275 12.7273\"\n            stroke=\"#F35746\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n        <defs>\n          <clipPath id=\"clip0_9185_13729\">\n            <rect width=\"20\" height=\"20\" fill=\"white\" />\n          </clipPath>\n        </defs>\n      </svg>\n    </button>\n  </div>\n  }\n\n  <!-- Add button, disabled if all filters added -->\n  <div class=\"buttons-container\">\n    <button\n      type=\"submit\"\n      (click)=\"$event.stopPropagation(); addFilterRow()\"\n      [class]=\"'buttons'\"\n      [disabled]=\"\n        activeFilters() &&\n        activeFilters().main &&\n        (activeFilters().main.length || 0) >= filterOptions.length\n      \"\n    >\n      <svg\n        width=\"16\"\n        height=\"16\"\n        viewBox=\"0 0 23 23\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <g opacity=\"0.8\">\n          <path\n            d=\"M16.6169 16.617C19.5459 13.6881 19.5459 8.93935 16.6169 6.01042C13.688 3.08149 8.93926 3.08149 6.01033 6.01042C3.0814 8.93935 3.0814 13.6881 6.01033 16.617C8.93926 19.546 13.688 19.546 16.6169 16.617Z\"\n            stroke=\"#06213D\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11.3138 8.13174V14.4957\"\n            stroke=\"#06213D\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M8.13184 11.3137H14.4958\"\n            stroke=\"#06213D\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n      </svg>\n\n      {{ \"FILTER.ADD\" | translate }}\n    </button>\n  </div>\n</form>\n", styles: [".form-container{padding:1em;width:37em;height:100%;min-height:4em;font-size:1.6rem}.filter-header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;margin-bottom:1em}.filter-row{display:grid;grid-template-columns:10fr 10fr 2fr;height:2.77em;gap:1em;margin-block:.25em;text-align:start;font-size:.8125em}.buttons{background:#f2f2f280;font-size:.8125em;color:#06213d;border-radius:.3125em;display:flex;justify-content:center;align-items:center;gap:.3em;padding:.35em .5em;cursor:pointer}.buttons:hover{box-shadow:inset 0 0 0 1000px #fff5}.buttons:disabled{box-shadow:inset 0 0 #fff5;cursor:not-allowed!important;opacity:.5}.buttons-container{display:flex;justify-content:space-between;align-items:center;padding:.4em 0;margin-top:.5em}.clear-button{font-size:.75em;color:#f35746;border-radius:.3125em;display:flex;justify-content:center;align-items:center;gap:.5em;padding:.1em .2em;cursor:pointer;font-family:var(--FM-Light)}.clear-button:hover{box-shadow:inset 0 0 0 1000px #fff5}.clear-button:disabled{box-shadow:inset 0 0 #fff5;cursor:not-allowed!important;opacity:.5}.clear-button-container{display:flex;justify-content:space-between;align-items:center}.filter-row *{font-family:var(--FM-Light)}\n"] }]
        }], ctorParameters: () => [{ type: i1$1.FormBuilder }], propDecorators: { filtersConfig: [{
                type: Input,
                args: [{ required: true }]
            }], filtersChanged: [{
                type: Output
            }] } });

class CustomFilterDynamicFormComponent {
    fb;
    config = input([]);
    values = input(null);
    formChanged = new EventEmitter();
    formReset = new EventEmitter();
    collapseState = signal({});
    filterForm;
    filters = signal([]);
    destroy$ = new Subject();
    constructor(fb) {
        this.fb = fb;
        // effect(() => {
        //   if (this.values()) {
        //      this.filterForm = this.buildForm(this.config() , this.values());
        //   }
        // });
    }
    ngOnInit() {
        const state = {};
        this.config().forEach(field => {
            state[field.id] = field.collapsed ?? false;
        });
        this.collapseState.set(state);
        this.filterForm = this.buildForm(this.config(), this.values());
        this.filterForm.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(val => {
            const payload = this.buildEmittableValues(this.config(), val);
            const baseline = this.buildEmittableValues(this.config(), this.values() ?? {});
            if (!this.isSame(payload, baseline))
                this.formChanged.emit(payload);
        });
    }
    toggleCollapse(id) {
        const state = { ...this.collapseState() };
        state[id] = !state[id];
        this.collapseState.set(state);
    }
    buildForm(config, initialValues) {
        const group = this.fb.group({});
        for (const field of config) {
            const validators = this.buildValidators(field);
            let initial = initialValues?.[field.id] ?? null;
            // Detect if the field is a date field
            const isDateField = field.type === 'date' || field.id.toLowerCase().includes('date');
            if (isDateField && initial) {
                // Convert string or timestamp to Date
                const parsedDate = new Date(initial);
                if (!isNaN(parsedDate.getTime())) {
                    initial = parsedDate;
                }
                else {
                    console.warn(`Invalid date value for ${field.id}:`, initial);
                    initial = null;
                }
            }
            group.addControl(field.id, this.fb.control(initial, validators));
        }
        return group;
    }
    isSame(a, b) {
        const normalize = (obj) => JSON.stringify(obj, (key, value) => {
            if (value instanceof Date) {
                return value.toISOString();
            }
            return value;
        });
        return normalize(a) === normalize(b);
    }
    buildEmittableValues(config, raw) {
        const out = {};
        for (const field of config) {
            const value = raw?.[field.id];
            out[field.id] = this.isDateField(field)
                ? this.toYyyyMmDd(value) // convert only date fields
                : value;
        }
        return out;
    }
    isDateField(field) {
        return field.type === 'date' || field.id.toLowerCase().includes('date');
    }
    toYyyyMmDd(value) {
        if (value == null || value === '')
            return null;
        const d = value instanceof Date ? value : new Date(value);
        if (isNaN(d.getTime()))
            return null;
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    }
    buildValidators(field) {
        const v = [];
        if (field.validation?.required)
            v.push(Validators.required);
        return v;
    }
    get form() {
        return this.filterForm;
    }
    reset() {
        this.form.reset();
        this.formReset.emit(true);
    }
    control(name) {
        return this.filterForm.get(name);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomFilterDynamicFormComponent, deps: [{ token: i1$1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: CustomFilterDynamicFormComponent, isStandalone: true, selector: "custom-filter-dynamic-form", inputs: { config: { classPropertyName: "config", publicName: "config", isSignal: true, isRequired: false, transformFunction: null }, values: { classPropertyName: "values", publicName: "values", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { formChanged: "formChanged", formReset: "formReset" }, ngImport: i0, template: "<div class=\"component-container\">\n  <div class=\"filter-header\">\n    <p class=\"title\">Filter by:</p>\n    <p (click)=\"reset()\" class=\"reset-btn\">\n      <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M14 3.98665C11.78 3.76665 9.54667 3.65332 7.32 3.65332C6 3.65332 4.68 3.71999 3.36 3.85332L2 3.98665\"\n          stroke=\"#CC4B46\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n        <path\n          d=\"M5.66602 3.3135L5.81268 2.44016C5.91935 1.80683 5.99935 1.3335 7.12602 1.3335H8.87268C9.99935 1.3335 10.086 1.8335 10.186 2.44683L10.3327 3.3135\"\n          stroke=\"#CC4B46\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n        <path\n          d=\"M12.5669 6.09326L12.1336 12.8066C12.0603 13.8533 12.0003 14.6666 10.1403 14.6666H5.86026C4.00026 14.6666 3.94026 13.8533 3.86693 12.8066L3.43359 6.09326\"\n          stroke=\"#CC4B46\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n        <path d=\"M6.88672 11H9.10672\" stroke=\"#CC4B46\" stroke-width=\"1.2\" stroke-linecap=\"round\"\n          stroke-linejoin=\"round\" />\n        <path d=\"M6.33398 8.33301H9.66732\" stroke=\"#CC4B46\" stroke-width=\"1.2\" stroke-linecap=\"round\"\n          stroke-linejoin=\"round\" />\n      </svg>\n\n    </p>\n  </div>\n\n  <form [formGroup]=\"form\" class=\"filter-form\">\n\n    @for (field of config(); track $index) {\n\n    <div class=\"filter-block\">\n\n      <div class=\"filter-label\" (click)=\"toggleCollapse(field.id)\">\n        <div class=\"flex items-center gap-x-2\">\n          <img [src]=\"field.icon\" class=\"size-[1.1em]\">\n          <span>{{ field.label }}</span>\n        </div>\n\n        <div [ngClass]=\"{'rotate-90': !collapseState()[field.id]}\">\n          <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M6.00075 11.9466L10.3474 8.93322C10.8608 8.41989 10.8608 7.57989 10.3474 7.06656L6.00075 4.05322\"\n              stroke=\"#120710\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\"\n              stroke-linejoin=\"round\" />\n          </svg>\n\n        </div>\n      </div>\n\n      <div class=\"filter-body\" [style.display]=\"collapseState()[field.id] ? 'none' : 'block'\">\n\n        @switch (field.type) {\n\n        @case('text') {\n        <custom-input-form [parentForm]=\"form\" [placeholder]=\"field.placeholder || ''\" [controlName]=\"field.id\"\n          type=\"text\" [validation]=\"[]\" [name]=\"field.id\" class=\"bg-white\" height=\"2.25em\" />\n        }\n\n        @case('date') {\n        <custom-calender-form [parentForm]=\"form\" [controlName]=\"field.id\" [placeholder]=\"field.label\" [validation]=\"[]\"\n          [name]=\"field.id\" [disabled]=\"false\" height=\"2.25em\" [maxDate]=\"field.validation?.maxDate || null\"\n          [minDate]=\"field.validation?.minDate || null\" />\n        }\n\n        @case('multiselect') {\n        <custom-multi-select-form [parentForm]=\"form\" [controlName]=\"field.id\" [placeholder]=\"field.label\"\n          [options]=\"field.options || []\" [validation]=\"[]\" [name]=\"field.id\" [reset]=\"false\" height=\"2.25em\"\n          [enableFilter]=\"true\" [filterDesign]=\"true\" [dropdownOptionsClass]=\"'muli-select-wrapper'\" />\n        }\n        @case('singleselect') {\n        <custom-dropdown-form [parentForm]=\"form\" [controlName]=\"field.id\" [placeholder]=\"field.label\"\n          [options]=\"field.options || []\" [validation]=\"[]\" [name]=\"field.id\" [reset]=\"false\"\n          [height]=\"'2.25em'\"></custom-dropdown-form>\n\n        }\n        }\n\n      </div>\n    </div>\n    }\n  </form>\n</div>", styles: [".component-container{padding:1em}.filter-header{display:flex;justify-content:space-between;align-items:center;padding:.5em 0;font-size:1em;margin-bottom:1em}.title{color:#120710;font-size:1em;font-weight:600;line-height:1.25em}.reset-btn{color:#f35746;cursor:pointer;font-family:var(--FM-Light)}.filter-form{display:flex;flex-direction:column;gap:1em;align-items:start}::ng-deep .muli-select-wrapper{font-size:.8em}.filter-form *{font-family:var(--FM-Light)}.filter-block{width:100%}.filter-label{font-weight:500;width:100%;font-size:.85em;cursor:pointer;display:flex;justify-content:space-between;margin-bottom:.25rem}.collapse-icon{font-size:12px;opacity:.7}\n"], dependencies: [{ kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: CustomInputFormComponent, selector: "custom-input-form", inputs: ["class", "labelClass", "label", "placeholder", "name", "type", "controlName", "parentForm", "validation", "pattern", "height", "disabled", "viewType"], outputs: ["valueChange"] }, { kind: "component", type: CustomCalenderFormComponent, selector: "custom-calender-form", inputs: ["label", "placeholder", "labelClass", "calendarPopUpClass", "calendarInputClass", "calendarContainerClass", "componentClass", "minDate", "maxDate", "controlName", "parentForm", "validation", "name", "disabled", "height", "viewType"], outputs: ["valueChange"] }, { kind: "component", type: CustomMultiSelectFormComponent, selector: "custom-multi-select-form", inputs: ["parentForm", "controlName", "label", "labelClass", "dropdownOptionsClass", "dropdownHeaderClass", "dropdownContainerClass", "placeholder", "enableFilter", "filterDesign", "showClear", "height", "viewType", "disabled", "options", "name", "validation", "reset"], outputs: ["valueChange"] }, { kind: "component", type: CustomDropdownFormComponent, selector: "custom-dropdown-form", inputs: ["parentForm", "controlName", "label", "labelClass", "dropdownOptionsClass", "dropdownHeaderClass", "dropdownContainerClass", "placeholder", "enableFilter", "showClear", "options", "name", "validation", "disabled", "height", "viewType", "reset"], outputs: ["valueChange"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomFilterDynamicFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-filter-dynamic-form', imports: [
                        ReactiveFormsModule,
                        CustomInputFormComponent,
                        CustomCalenderFormComponent,
                        CustomMultiSelectFormComponent,
                        CustomDropdownFormComponent,
                        NgClass
                    ], template: "<div class=\"component-container\">\n  <div class=\"filter-header\">\n    <p class=\"title\">Filter by:</p>\n    <p (click)=\"reset()\" class=\"reset-btn\">\n      <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M14 3.98665C11.78 3.76665 9.54667 3.65332 7.32 3.65332C6 3.65332 4.68 3.71999 3.36 3.85332L2 3.98665\"\n          stroke=\"#CC4B46\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n        <path\n          d=\"M5.66602 3.3135L5.81268 2.44016C5.91935 1.80683 5.99935 1.3335 7.12602 1.3335H8.87268C9.99935 1.3335 10.086 1.8335 10.186 2.44683L10.3327 3.3135\"\n          stroke=\"#CC4B46\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n        <path\n          d=\"M12.5669 6.09326L12.1336 12.8066C12.0603 13.8533 12.0003 14.6666 10.1403 14.6666H5.86026C4.00026 14.6666 3.94026 13.8533 3.86693 12.8066L3.43359 6.09326\"\n          stroke=\"#CC4B46\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n        <path d=\"M6.88672 11H9.10672\" stroke=\"#CC4B46\" stroke-width=\"1.2\" stroke-linecap=\"round\"\n          stroke-linejoin=\"round\" />\n        <path d=\"M6.33398 8.33301H9.66732\" stroke=\"#CC4B46\" stroke-width=\"1.2\" stroke-linecap=\"round\"\n          stroke-linejoin=\"round\" />\n      </svg>\n\n    </p>\n  </div>\n\n  <form [formGroup]=\"form\" class=\"filter-form\">\n\n    @for (field of config(); track $index) {\n\n    <div class=\"filter-block\">\n\n      <div class=\"filter-label\" (click)=\"toggleCollapse(field.id)\">\n        <div class=\"flex items-center gap-x-2\">\n          <img [src]=\"field.icon\" class=\"size-[1.1em]\">\n          <span>{{ field.label }}</span>\n        </div>\n\n        <div [ngClass]=\"{'rotate-90': !collapseState()[field.id]}\">\n          <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M6.00075 11.9466L10.3474 8.93322C10.8608 8.41989 10.8608 7.57989 10.3474 7.06656L6.00075 4.05322\"\n              stroke=\"#120710\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\"\n              stroke-linejoin=\"round\" />\n          </svg>\n\n        </div>\n      </div>\n\n      <div class=\"filter-body\" [style.display]=\"collapseState()[field.id] ? 'none' : 'block'\">\n\n        @switch (field.type) {\n\n        @case('text') {\n        <custom-input-form [parentForm]=\"form\" [placeholder]=\"field.placeholder || ''\" [controlName]=\"field.id\"\n          type=\"text\" [validation]=\"[]\" [name]=\"field.id\" class=\"bg-white\" height=\"2.25em\" />\n        }\n\n        @case('date') {\n        <custom-calender-form [parentForm]=\"form\" [controlName]=\"field.id\" [placeholder]=\"field.label\" [validation]=\"[]\"\n          [name]=\"field.id\" [disabled]=\"false\" height=\"2.25em\" [maxDate]=\"field.validation?.maxDate || null\"\n          [minDate]=\"field.validation?.minDate || null\" />\n        }\n\n        @case('multiselect') {\n        <custom-multi-select-form [parentForm]=\"form\" [controlName]=\"field.id\" [placeholder]=\"field.label\"\n          [options]=\"field.options || []\" [validation]=\"[]\" [name]=\"field.id\" [reset]=\"false\" height=\"2.25em\"\n          [enableFilter]=\"true\" [filterDesign]=\"true\" [dropdownOptionsClass]=\"'muli-select-wrapper'\" />\n        }\n        @case('singleselect') {\n        <custom-dropdown-form [parentForm]=\"form\" [controlName]=\"field.id\" [placeholder]=\"field.label\"\n          [options]=\"field.options || []\" [validation]=\"[]\" [name]=\"field.id\" [reset]=\"false\"\n          [height]=\"'2.25em'\"></custom-dropdown-form>\n\n        }\n        }\n\n      </div>\n    </div>\n    }\n  </form>\n</div>", styles: [".component-container{padding:1em}.filter-header{display:flex;justify-content:space-between;align-items:center;padding:.5em 0;font-size:1em;margin-bottom:1em}.title{color:#120710;font-size:1em;font-weight:600;line-height:1.25em}.reset-btn{color:#f35746;cursor:pointer;font-family:var(--FM-Light)}.filter-form{display:flex;flex-direction:column;gap:1em;align-items:start}::ng-deep .muli-select-wrapper{font-size:.8em}.filter-form *{font-family:var(--FM-Light)}.filter-block{width:100%}.filter-label{font-weight:500;width:100%;font-size:.85em;cursor:pointer;display:flex;justify-content:space-between;margin-bottom:.25rem}.collapse-icon{font-size:12px;opacity:.7}\n"] }]
        }], ctorParameters: () => [{ type: i1$1.FormBuilder }], propDecorators: { formChanged: [{
                type: Output
            }], formReset: [{
                type: Output
            }] } });

class CustomPlaceHolderComponent {
    text = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomPlaceHolderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.15", type: CustomPlaceHolderComponent, isStandalone: true, selector: "custom-place-holder", inputs: { text: "text" }, ngImport: i0, template: "<div class=\"placeholder-container\">\n  <p>{{ text }}</p>\n</div>\n", styles: [".placeholder-container{display:flex;justify-content:center;align-items:center;height:100%;width:100%;min-height:20vh;min-width:50vw}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: CustomPlaceHolderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-place-holder', imports: [], template: "<div class=\"placeholder-container\">\n  <p>{{ text }}</p>\n</div>\n", styles: [".placeholder-container{display:flex;justify-content:center;align-items:center;height:100%;width:100%;min-height:20vh;min-width:50vw}\n"] }]
        }], propDecorators: { text: [{
                type: Input
            }] } });

class TaskPriorityComponent {
    type = 'Medium';
    iconClassName = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: TaskPriorityComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.15", type: TaskPriorityComponent, isStandalone: true, selector: "lib-task-priority", inputs: { type: "type", iconClassName: "iconClassName" }, ngImport: i0, template: "<div [class]=\"iconClassName\">\n    @switch (type) {\n    @case('High') {\n    <svg width=\"16\" height=\"14\" viewBox=\"0 0 16 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect y=\"8\" width=\"4\" height=\"6\" rx=\"1\" fill=\"#FF435A\" />\n        <rect x=\"6\" y=\"4\" width=\"4\" height=\"10\" rx=\"1\" fill=\"#FF435A\" />\n        <rect x=\"12\" width=\"4\" height=\"14\" rx=\"1\" fill=\"#FF435A\" />\n    </svg>\n\n    }\n    @case('Medium') {\n    <svg width=\"16\" height=\"14\" viewBox=\"0 0 16 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect y=\"8\" width=\"4\" height=\"6\" rx=\"1\" fill=\"#FFBE78\" />\n        <rect x=\"6\" y=\"4\" width=\"4\" height=\"10\" rx=\"1\" fill=\"#FFBE78\" />\n        <rect x=\"12\" width=\"4\" height=\"14\" rx=\"1\" fill=\"#D8D8D8\" />\n    </svg>\n\n    }\n    @case('Low') {\n    <svg width=\"16\" height=\"14\" viewBox=\"0 0 16 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect y=\"8\" width=\"4\" height=\"6\" rx=\"1\" fill=\"#72788E\" />\n        <rect x=\"6\" y=\"4\" width=\"4\" height=\"10\" rx=\"1\" fill=\"#D8D8D8\" />\n        <rect x=\"12\" width=\"4\" height=\"14\" rx=\"1\" fill=\"#D8D8D8\" />\n    </svg>\n    }\n\n    }\n</div>", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: TaskPriorityComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-task-priority', imports: [], template: "<div [class]=\"iconClassName\">\n    @switch (type) {\n    @case('High') {\n    <svg width=\"16\" height=\"14\" viewBox=\"0 0 16 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect y=\"8\" width=\"4\" height=\"6\" rx=\"1\" fill=\"#FF435A\" />\n        <rect x=\"6\" y=\"4\" width=\"4\" height=\"10\" rx=\"1\" fill=\"#FF435A\" />\n        <rect x=\"12\" width=\"4\" height=\"14\" rx=\"1\" fill=\"#FF435A\" />\n    </svg>\n\n    }\n    @case('Medium') {\n    <svg width=\"16\" height=\"14\" viewBox=\"0 0 16 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect y=\"8\" width=\"4\" height=\"6\" rx=\"1\" fill=\"#FFBE78\" />\n        <rect x=\"6\" y=\"4\" width=\"4\" height=\"10\" rx=\"1\" fill=\"#FFBE78\" />\n        <rect x=\"12\" width=\"4\" height=\"14\" rx=\"1\" fill=\"#D8D8D8\" />\n    </svg>\n\n    }\n    @case('Low') {\n    <svg width=\"16\" height=\"14\" viewBox=\"0 0 16 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect y=\"8\" width=\"4\" height=\"6\" rx=\"1\" fill=\"#72788E\" />\n        <rect x=\"6\" y=\"4\" width=\"4\" height=\"10\" rx=\"1\" fill=\"#D8D8D8\" />\n        <rect x=\"12\" width=\"4\" height=\"14\" rx=\"1\" fill=\"#D8D8D8\" />\n    </svg>\n    }\n\n    }\n</div>" }]
        }], propDecorators: { type: [{
                type: Input
            }], iconClassName: [{
                type: Input
            }] } });

const authGuard = () => {
    const platformId = inject(PLATFORM_ID);
    const router = inject(Router);
    const authService = inject(AuthService);
    if (!isPlatformBrowser(platformId)) {
        return false;
    }
    if (authService.isLoggedIn()) {
        return true;
    }
    else {
        router.navigateByUrl('/auth');
        return false;
    }
};

const noAuthGuard = () => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const platformId = inject(PLATFORM_ID);
    if (!isPlatformBrowser(platformId)) {
        return false; // Exit early for non-browser platforms
    }
    if (authService.isLoggedIn()) {
        router.navigateByUrl(ModuleRoutes.MAIN_PAGE);
        return false;
    }
    return true;
};

// permission.guard.fn.ts
const PermissionGuard = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const toastService = inject(ToastService);
    const hasPermission = authService.hasCategory(route);
    if (hasPermission) {
        return true;
    }
    else {
        router.navigate(['/']);
        setTimeout(() => {
            toastService.toast(`You don't have permission`, 'top-center', 'error', 2000);
        }, 500);
        //router.navigate(['error/403']);
        return false;
    }
};

class DispatchingFeComponentsService {
    constructor() {
        alert("hii wwww");
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DispatchingFeComponentsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DispatchingFeComponentsService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: DispatchingFeComponentsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

/**
 * Generated bundle index. Do not edit.
 */

export { API_BASE_URL, AllowNumberOnlyDirective, ArabicOnlyDirective, AuthBeService, AuthConstant, AuthContextService, AuthDirective, AuthInterceptor, AuthService, BlurBackdropDirective, ClickOutsideDirective, CommonHttpService, ComponentFormErrorConstant, CustomActionsDropdownComponent, CustomAppErrorComponent, CustomAvatarsComponent, CustomBreadcrumbComponent, CustomBulkActionsComponent, CustomButtonComponent, CustomCalendarComponent, CustomCalenderFormComponent, CustomCategoryTableComponent, CustomCheckBoxComponent, CustomCheckBoxFormComponent, CustomColorComponent, CustomConfirmPopupComponent, CustomDetailsHeaderComponent, CustomDetailsModalComponent, CustomDetailsNavComponent, CustomDropdownButtonComponent, CustomDropdownComponent, CustomDropdownFormComponent, CustomDynamicTableWithCategoriesComponent, CustomFieldsFormComponent, CustomFileUploadComponent, CustomFileViewerComponent, CustomFilterDropdownComponent, CustomFilterDynamicFormComponent, CustomInputComponent, CustomInputFormComponent, CustomLoadingSpinnerComponent, CustomModalComponent, CustomMultiSelectDropdownComponent, CustomMultiSelectFormComponent, CustomPaginationComponent, CustomPlaceHolderComponent, CustomPlateNumberInputFormComponent, CustomPopUpComponent, CustomProgressBarComponent, CustomProgressRingComponent, CustomRadioComponentComponent, CustomRadioGroupFormComponent, CustomReactiveSearchInputComponent, CustomSearchInputComponent, CustomSteppersContainerComponent, CustomSteppersControllersComponent, CustomSvgIconComponent, CustomTableComponent, CustomTabsComponent, CustomTextareaComponent, CustomTextareaFormComponent, CustomTimeInputFormComponent, CustomTitleContentComponent, CustomToastComponent, CustomToggleSwitchComponent, CustomToggleSwitchFormComponent, CustomTooltipComponent, DispatchingFeComponentsService, DropdownsAnimationDirective, EnglishOnlyDirective, ErrorInterceptor, GeoLocationService, I18nConstant, LoadingService, ModuleRoutes, NetworkConnectionInterceptor, OverlayPanelComponent, PermissionGuard, Permissions, Resources, Roles, SHOW_SUCCESS_TOASTER, SKIP_LOADER, SKIP_TOKEN, SidenavService, StepperService, StorageService, TaskPriorityComponent, ToastService, ToggleElementDirective, TranslationService, Types, USE_TOKEN, UserDataService, UserStatus, actionAssignTaskSvg, actionDeleteSvg$1 as actionDeleteSvg, actionDuplicateSvg, actionEdiSquaretSvg, actionEditSvg$1 as actionEditSvg, actionPermission, actionRenameSvg, assignTaskSvg, authGuard, b64toBlob, blobToB64, convertDateFormat, convertFileToBase64, convertFormGroupToFormData, diffTime, downloadBlob, dropdownAnimation, excelDateToJSDate, flattenTree, formatDate, formatDateWithTime, formatTimestamp, formatinitialTakeTime, generateRandomColor, generateUniqueNumber, getFormValidationErrors, isDocumentPath, isImagePath, isVedioPath, loadingInterceptor, logger, noAuthGuard, someFieldsContainData, timeAgo, viewIconSVG };
//# sourceMappingURL=dispatching-fe-components.mjs.map
