import * as i0 from '@angular/core';
import { Injectable, signal, computed, InjectionToken, Optional, Inject, inject, PLATFORM_ID, input, Input, Component, EventEmitter, Output, HostListener, Directive, effect, ContentChild, ViewChild, HostBinding } from '@angular/core';
import { retry, catchError, BehaviorSubject, map, throwError, finalize, tap, Subscription, fromEvent, filter } from 'rxjs';
import * as i1 from '@angular/common/http';
import { HttpContextToken, HttpContext, HttpResponse } from '@angular/common/http';
import * as i3 from '@angular/router';
import { Router } from '@angular/router';
import * as i2$1 from '@ngx-translate/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import * as i2 from '@angular/common';
import { isPlatformBrowser, CommonModule, NgStyle, NgClass, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import * as i1$1 from '@angular/forms';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as i1$2 from '@angular/platform-browser';

class ModuleRoutes {
    static AUTH = 'auth';
    static USER_PROFILE = `profile`;
    static MAIN_PAGE = `main`; // overview
    static PLAN_MANAGEMENT_HOME = `plan-management`;
    static ASSET_MANAGEMENT_HOME = `asset-management`;
}

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
})(UserStatus || (UserStatus = {}));
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "ADMIN";
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: StorageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: StorageService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: StorageService, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: AuthContextService, deps: [{ token: StorageService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: AuthContextService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: AuthContextService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: StorageService }] });

const USE_TOKEN = new HttpContextToken(() => true);
const SKIP_TOKEN = new HttpContextToken(() => false);
const SKIP_LOADER = new HttpContextToken(() => false);
const SHOW_SUCCESS_TOASTER = new HttpContextToken(() => true);

class AuthBeService {
    http;
    authContextService;
    router;
    constructor(http, authContextService, router) {
        this.http = http;
        this.authContextService = authContextService;
        this.router = router;
    }
    login(data) {
        return this.http.post('https://dispatching-api-gateway-821cc537b8b6.herokuapp.com/api/v1/idm/auth/login', { username: data.username, password: data.password }, {
            context: new HttpContext().set(SKIP_TOKEN, true),
        });
    }
    logout() {
        return this.http.post('https://dispatching-api-gateway-821cc537b8b6.herokuapp.com/api/v1/idm/auth/logout', {});
    }
    refreshToken(refreshToken) {
        return this.http.post('https://dispatching-api-gateway-821cc537b8b6.herokuapp.com/api/v1/idm/auth/refresh', refreshToken);
    }
    validateToken() {
        return this.http
            .post('https://dispatching-api-gateway-821cc537b8b6.herokuapp.com/api/v1/idm/auth/validate', {})
            .pipe(retry(3), catchError((error) => {
            console.error('Request failed after 3 retries', error);
            this.authContextService.clearData();
            window.dispatchEvent(new CustomEvent('auth-logout'));
            this.router.navigate(['/auth/login']);
            throw error;
        }));
    }
    getCurrUser() {
        return this.http.get('https://dispatching-api-gateway-821cc537b8b6.herokuapp.com/api/v1/idm/auth/me');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: AuthBeService, deps: [{ token: i1.HttpClient }, { token: AuthContextService }, { token: i3.Router }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: AuthBeService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: AuthBeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }, { type: AuthContextService }, { type: i3.Router }] });

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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: ToastService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: ToastService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: ToastService, decorators: [{
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
                    this.toastService.toast(`Permissions Request Faild`, 'top-center', 'error', 2000);
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
    getCurrentPermissions() {
        return (this.authContextService.userPermissionsAndRoles$()?.permissions ||
            JSON.parse(this.storageService.getsessionItem(AuthConstant.USER_PERMISSIONS) ||
                '[]'));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: AuthService, deps: [{ token: AuthContextService }, { token: AuthBeService }, { token: i3.Router }, { token: StorageService }, { token: ToastService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: AuthService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: AuthService, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: UserDataService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: UserDataService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: UserDataService, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CommonHttpService, deps: [{ token: i1.HttpClient }, { token: API_BASE_URL, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CommonHttpService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CommonHttpService, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: LoadingService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: LoadingService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: LoadingService, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: StepperService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: StepperService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: StepperService, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: TranslationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: TranslationService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: TranslationService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
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
    const headersConfig = {
        'accept-language': translate === I18nConstant.EN ? 'en-US' : 'e.g',
        'Content-Type': 'application/json',
    };
    if (!skipToken) {
        headersConfig['Authorization'] = `Bearer ${token}`;
    }
    const clonedRequest = request.clone({
        setHeaders: headersConfig,
    });
    return next(clonedRequest).pipe(map((event) => {
        if (event instanceof HttpResponse && isPlatformBrowser(PLATFORM_ID)) {
            const body = event.body;
            if (body.status === 'SUCCESS' || body.success) {
                body['success'] = true;
            }
            else {
                body['success'] = false;
            }
            //  body['statusCode'] = event.status;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomAppErrorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomAppErrorComponent, isStandalone: true, selector: "custom-app-error", inputs: { control: { classPropertyName: "control", publicName: "control", isSignal: false, isRequired: true, transformFunction: null }, validation: { classPropertyName: "validation", publicName: "validation", isSignal: false, isRequired: true, transformFunction: null }, name: { classPropertyName: "name", publicName: "name", isSignal: false, isRequired: true, transformFunction: null }, showErrors: { classPropertyName: "showErrors", publicName: "showErrors", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"error-container\">\n  @for (item of validation; track $index) { @if (shouldShowError(item)) {\n  <div class=\"input-error-message\">\n    <span class=\"input-error-pointer\"></span>\n\n    <span class=\"error-message\">\n      {{ getErrorMessage(item) }}\n    </span>\n  </div>\n  } }\n</div>\n", styles: [".error-message{color:#fff!important;font-size:.81em;font-weight:500;display:block;position:relative;top:-.3rem}.input-error-message{position:relative;background:#d70c0c;color:#fff;font-size:1.1em;padding:.4em 1.2em;border-radius:.3em;width:fit-content;z-index:1;top:-.5em;right:1em}.input-error-pointer{position:relative;left:calc(100% - .17em);top:-1.4rem;width:0;height:0;border-left:.3em solid transparent;border-right:.3em solid transparent;border-bottom:.5em solid #d70c0c;content:\"\";display:block}.error-container{width:100%;display:flex;justify-content:end;align-items:flex-end}\n"], dependencies: [{ kind: "ngmodule", type: TranslateModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomAppErrorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-app-error', imports: [TranslateModule], standalone: true, template: "<div class=\"error-container\">\n  @for (item of validation; track $index) { @if (shouldShowError(item)) {\n  <div class=\"input-error-message\">\n    <span class=\"input-error-pointer\"></span>\n\n    <span class=\"error-message\">\n      {{ getErrorMessage(item) }}\n    </span>\n  </div>\n  } }\n</div>\n", styles: [".error-message{color:#fff!important;font-size:.81em;font-weight:500;display:block;position:relative;top:-.3rem}.input-error-message{position:relative;background:#d70c0c;color:#fff;font-size:1.1em;padding:.4em 1.2em;border-radius:.3em;width:fit-content;z-index:1;top:-.5em;right:1em}.input-error-pointer{position:relative;left:calc(100% - .17em);top:-1.4rem;width:0;height:0;border-left:.3em solid transparent;border-right:.3em solid transparent;border-bottom:.5em solid #d70c0c;content:\"\";display:block}.error-container{width:100%;display:flex;justify-content:end;align-items:flex-end}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: CustomButtonComponent, isStandalone: true, selector: "custom-button", inputs: { disabled: "disabled", type: "type", class: "class" }, outputs: { buttonClick: "buttonClick" }, ngImport: i0, template: "<button\n  (click)=\"buttonClick.emit()\"\n  type=\"{{ type }}\"\n  [class]=\"'custom-button ' + class\"\n  [disabled]=\"disabled\"\n>\n  <ng-content></ng-content>\n</button>\n", styles: [".custom-button{border:none;border-radius:.4em;cursor:pointer;text-align:center;display:flex;justify-content:center;align-items:center;font-size:1em;padding:.6em 1.2em}.custom-button:disabled{cursor:not-allowed;opacity:.5}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-button', imports: [], standalone: true, template: "<button\n  (click)=\"buttonClick.emit()\"\n  type=\"{{ type }}\"\n  [class]=\"'custom-button ' + class\"\n  [disabled]=\"disabled\"\n>\n  <ng-content></ng-content>\n</button>\n", styles: [".custom-button{border:none;border-radius:.4em;cursor:pointer;text-align:center;display:flex;justify-content:center;align-items:center;font-size:1em;padding:.6em 1.2em}.custom-button:disabled{cursor:not-allowed;opacity:.5}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: ToggleElementDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: ToggleElementDirective, isStandalone: true, selector: "[toggleElement]", inputs: { element: "element", hideElement: "hideElement" }, host: { listeners: { "document:click": "onDocumentClick($event,$event.target)", "click": "onClick()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: ToggleElementDirective, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: AllowNumberOnlyDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: AllowNumberOnlyDirective, isStandalone: true, selector: "[appAllowNumberOnly]", host: { listeners: { "keydown": "onKeyDown($event)", "paste": "onPaste($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: AllowNumberOnlyDirective, decorators: [{
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
                    const documentClick$ = fromEvent(document, 'click');
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: ClickOutsideDirective, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: ClickOutsideDirective, isStandalone: true, selector: "[clickOutside]", inputs: { clickOutside: "clickOutside" }, outputs: { clickOutsideEmitter: "clickOutsideEmitter" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: ClickOutsideDirective, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: EnglishOnlyDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: EnglishOnlyDirective, isStandalone: true, selector: "[appEnglishOnly]", host: { listeners: { "input": "onInputChange($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: EnglishOnlyDirective, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: ArabicOnlyDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: ArabicOnlyDirective, isStandalone: true, selector: "[appArabicOnly]", host: { listeners: { "input": "onInputChange($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: ArabicOnlyDirective, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: BlurBackdropDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.14", type: BlurBackdropDirective, isStandalone: true, selector: "[blurBackdrop]", inputs: { showBackdrop: "showBackdrop" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: BlurBackdropDirective, decorators: [{
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
                // console.log('needed action', this.canDoAction());
                // console.log('ALLOWED', allowed);
                if (allowed) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                }
                else {
                    this.viewContainer.clear();
                }
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: AuthDirective, deps: [{ token: AuthService }, { token: i0.TemplateRef }, { token: i0.ViewContainerRef }, { token: AuthContextService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "19.2.14", type: AuthDirective, isStandalone: true, selector: "[canDoAction]", inputs: { canDoAction: { classPropertyName: "canDoAction", publicName: "canDoAction", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: AuthDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[canDoAction]',
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: AuthService }, { type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: AuthContextService }] });

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
        return this.value.toLocaleDateString();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomCalendarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomCalendarComponent, isStandalone: true, selector: "custom-calendar", inputs: { label: "label", placeholder: "placeholder", labelClass: "labelClass", calendarPopUpClass: "calendarPopUpClass", calendarInputClass: "calendarInputClass", calendarContainerClass: "calendarContainerClass", minDate: "minDate", maxDate: "maxDate", value: "value" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div [class]=\"'custom-calendar-container ' + calendarContainerClass\">\n  @if(label){\n  <label [class]=\"'custom-label ' + labelClass\">{{ label }}</label>\n  }\n\n  <div\n    [class]=\"'custom-calendar-input ' + calendarInputClass\"\n    (click)=\"toggleCalendar()\"\n  >\n    <span class=\"placeholder\" *ngIf=\"!value\">{{ placeholder }}</span>\n    <span *ngIf=\"value\">{{ formatDisplayDate() }}</span>\n    <span class=\"calendar-icon\">\n      <svg\n        width=\"24\"\n        height=\"24\"\n        viewBox=\"0 0 24 24\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M8 2V5\"\n          stroke=\"#602650\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M16 2V5\"\n          stroke=\"#602650\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M3.5 9.08984H20.5\"\n          stroke=\"#602650\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z\"\n          stroke=\"#602650\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M15.6947 13.7002H15.7037\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M15.6947 16.7002H15.7037\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M11.9955 13.7002H12.0045\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M11.9955 16.7002H12.0045\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M8.29431 13.7002H8.30329\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M8.29431 16.7002H8.30329\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n    </span>\n  </div>\n\n  @if(showCalendar) {\n  <div\n    [class]=\"'calendar-popup ' + calendarPopUpClass\"\n    #calendarPopup\n    [clickOutside]=\"calendarPopup\"\n    (clickOutsideEmitter)=\"showCalendar = false\"\n  >\n    <div class=\"calendar-header\">\n      <button type=\"button\" class=\"nav-button\" (click)=\"prevMonth()\">\n        <svg\n          width=\"8\"\n          height=\"12\"\n          viewBox=\"0 0 8 12\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M6.5 11L1.5 6L6.5 1\"\n            stroke=\"black\"\n            stroke-opacity=\"0.72\"\n            stroke-width=\"1.66667\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </button>\n      <div class=\"month-title\">{{ getMonthName() }} {{ getYear() }}</div>\n      <button type=\"button\" class=\"nav-button\" (click)=\"nextMonth()\">\n        <svg\n          width=\"8\"\n          height=\"12\"\n          viewBox=\"0 0 8 12\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M1.5 11L6.5 6L1.5 1\"\n            stroke=\"black\"\n            stroke-opacity=\"0.72\"\n            stroke-width=\"1.66667\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </button>\n    </div>\n\n    <div class=\"weekdays\">\n      @for(weekday of weekdays; track weekday) {\n      <div class=\"weekday\">{{ weekday }}</div>\n      }\n    </div>\n\n    <div class=\"days-grid\">\n      @for(day of days; track day) {\n      <div\n        class=\"day\"\n        [class.current-month]=\"isCurrentMonth(day)\"\n        [class.selected]=\"isSelected(day)\"\n        [class.disabled]=\"isDisabled(day)\"\n        (click)=\"!isDisabled(day) && selectDate(day)\"\n      >\n        {{ day.getDate() }}\n      </div>\n      }\n    </div>\n  </div>\n  }\n</div>\n", styles: [".custom-calendar-container{position:relative;width:100%}.custom-label{display:block;font-size:1em;font-weight:500;color:#707070;margin-bottom:.3em}.custom-calendar-input{position:relative;height:3.6em;width:100%;border:1px solid #82828233;border-radius:6px;padding:0 12px;display:flex;align-items:center;cursor:pointer;background-color:#fff}.placeholder{color:#82828250;font-size:.95em}.calendar-icon{position:absolute;right:12px}.fullWidth{width:100%}.calendar-popup{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #82828233;border-radius:.375em;margin-top:4px;padding:1rem;z-index:10;box-shadow:0 4px 6px #0000001a}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.month-title{font-weight:600}.nav-button{background:none;border:none;font-size:16px;cursor:pointer;padding:4px 8px}.weekdays{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-weight:500;font-size:12px;margin-bottom:8px}.days-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.day{height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;cursor:pointer;font-size:14px}.day.current-month{color:#111827}.day:not(.current-month){color:#9ca3af}.day.selected{background-color:#602650;color:#fff}.day.disabled{color:#d1d5db;cursor:not-allowed;text-decoration:line-through}.day:not(.disabled):not(.selected):hover{background-color:#f3f4f6}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomCalendarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-calendar', standalone: true, imports: [FormsModule, ClickOutsideDirective, CommonModule], template: "<div [class]=\"'custom-calendar-container ' + calendarContainerClass\">\n  @if(label){\n  <label [class]=\"'custom-label ' + labelClass\">{{ label }}</label>\n  }\n\n  <div\n    [class]=\"'custom-calendar-input ' + calendarInputClass\"\n    (click)=\"toggleCalendar()\"\n  >\n    <span class=\"placeholder\" *ngIf=\"!value\">{{ placeholder }}</span>\n    <span *ngIf=\"value\">{{ formatDisplayDate() }}</span>\n    <span class=\"calendar-icon\">\n      <svg\n        width=\"24\"\n        height=\"24\"\n        viewBox=\"0 0 24 24\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M8 2V5\"\n          stroke=\"#602650\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M16 2V5\"\n          stroke=\"#602650\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M3.5 9.08984H20.5\"\n          stroke=\"#602650\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z\"\n          stroke=\"#602650\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M15.6947 13.7002H15.7037\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M15.6947 16.7002H15.7037\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M11.9955 13.7002H12.0045\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M11.9955 16.7002H12.0045\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M8.29431 13.7002H8.30329\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M8.29431 16.7002H8.30329\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n    </span>\n  </div>\n\n  @if(showCalendar) {\n  <div\n    [class]=\"'calendar-popup ' + calendarPopUpClass\"\n    #calendarPopup\n    [clickOutside]=\"calendarPopup\"\n    (clickOutsideEmitter)=\"showCalendar = false\"\n  >\n    <div class=\"calendar-header\">\n      <button type=\"button\" class=\"nav-button\" (click)=\"prevMonth()\">\n        <svg\n          width=\"8\"\n          height=\"12\"\n          viewBox=\"0 0 8 12\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M6.5 11L1.5 6L6.5 1\"\n            stroke=\"black\"\n            stroke-opacity=\"0.72\"\n            stroke-width=\"1.66667\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </button>\n      <div class=\"month-title\">{{ getMonthName() }} {{ getYear() }}</div>\n      <button type=\"button\" class=\"nav-button\" (click)=\"nextMonth()\">\n        <svg\n          width=\"8\"\n          height=\"12\"\n          viewBox=\"0 0 8 12\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M1.5 11L6.5 6L1.5 1\"\n            stroke=\"black\"\n            stroke-opacity=\"0.72\"\n            stroke-width=\"1.66667\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </button>\n    </div>\n\n    <div class=\"weekdays\">\n      @for(weekday of weekdays; track weekday) {\n      <div class=\"weekday\">{{ weekday }}</div>\n      }\n    </div>\n\n    <div class=\"days-grid\">\n      @for(day of days; track day) {\n      <div\n        class=\"day\"\n        [class.current-month]=\"isCurrentMonth(day)\"\n        [class.selected]=\"isSelected(day)\"\n        [class.disabled]=\"isDisabled(day)\"\n        (click)=\"!isDisabled(day) && selectDate(day)\"\n      >\n        {{ day.getDate() }}\n      </div>\n      }\n    </div>\n  </div>\n  }\n</div>\n", styles: [".custom-calendar-container{position:relative;width:100%}.custom-label{display:block;font-size:1em;font-weight:500;color:#707070;margin-bottom:.3em}.custom-calendar-input{position:relative;height:3.6em;width:100%;border:1px solid #82828233;border-radius:6px;padding:0 12px;display:flex;align-items:center;cursor:pointer;background-color:#fff}.placeholder{color:#82828250;font-size:.95em}.calendar-icon{position:absolute;right:12px}.fullWidth{width:100%}.calendar-popup{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #82828233;border-radius:.375em;margin-top:4px;padding:1rem;z-index:10;box-shadow:0 4px 6px #0000001a}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.month-title{font-weight:600}.nav-button{background:none;border:none;font-size:16px;cursor:pointer;padding:4px 8px}.weekdays{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-weight:500;font-size:12px;margin-bottom:8px}.days-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.day{height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;cursor:pointer;font-size:14px}.day.current-month{color:#111827}.day:not(.current-month){color:#9ca3af}.day.selected{background-color:#602650;color:#fff}.day.disabled{color:#d1d5db;cursor:not-allowed;text-decoration:line-through}.day:not(.disabled):not(.selected):hover{background-color:#f3f4f6}\n"] }]
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
    toggleCalendar() {
        this.showCalendarForm = !this.showCalendarForm;
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
        if (!this.isDisabled(date)) {
            this.value = date;
            this.showCalendarForm = false;
            if (this.parentForm && this.controlName) {
                this.parentForm.get(this.controlName)?.setValue(date);
                this.parentForm.get(this.controlName)?.markAsTouched();
            }
        }
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
        try {
            return this.value.toLocaleDateString();
        }
        catch (error) {
            return '';
        }
    }
    containRequiredError() {
        return this.validation.some((error) => error.errorType.includes(ComponentFormErrorConstant.REQUIRED));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomCalenderFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomCalenderFormComponent, isStandalone: true, selector: "custom-calender-form", inputs: { label: "label", placeholder: "placeholder", labelClass: "labelClass", calendarPopUpClass: "calendarPopUpClass", calendarInputClass: "calendarInputClass", calendarContainerClass: "calendarContainerClass", componentClass: "componentClass", minDate: "minDate", maxDate: "maxDate", controlName: "controlName", parentForm: "parentForm", validation: "validation", name: "name", disabled: "disabled" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div [class]=\"'fullWidth ' + componentClass\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    } @else{\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n\n  <div [class]=\"'custom-calendar-container ' + calendarContainerClass\">\n    <div\n      [class]=\"'custom-calendar-input ' + calendarInputClass\"\n      [class.disabled]=\"disabled\"\n      [attr.aria-disabled]=\"disabled\"\n      (click)=\"!disabled && toggleCalendar()\"\n      [class.has-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched\n      \"\n    >\n      <span class=\"placeholder\" *ngIf=\"!value\">{{ placeholder }}</span>\n      <span *ngIf=\"value\">{{ formatDisplayDate() }}</span>\n      <span class=\"calendar-icon\">\n        <svg\n          width=\"24\"\n          height=\"24\"\n          viewBox=\"0 0 24 24\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M8 2V5\"\n            stroke=\"#602650\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M16 2V5\"\n            stroke=\"#602650\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M3.5 9.08984H20.5\"\n            stroke=\"#602650\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z\"\n            stroke=\"#602650\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M15.6947 13.7002H15.7037\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M15.6947 16.7002H15.7037\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11.9955 13.7002H12.0045\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11.9955 16.7002H12.0045\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M8.29431 13.7002H8.30329\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M8.29431 16.7002H8.30329\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </span>\n    </div>\n\n    @if(showCalendarForm && !disabled) {\n    <div\n      [class]=\"'calendar-popup ' + calendarPopUpClass\"\n      #calendarPopUpForm\n      [clickOutside]=\"calendarPopUpForm\"\n      (clickOutsideEmitter)=\"showCalendarForm = false\"\n    >\n      <div class=\"calendar-header\">\n        <button type=\"button\" class=\"nav-button\" (click)=\"prevMonth()\">\n          <svg\n            width=\"8\"\n            height=\"12\"\n            viewBox=\"0 0 8 12\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M6.5 11L1.5 6L6.5 1\"\n              stroke=\"black\"\n              stroke-opacity=\"0.72\"\n              stroke-width=\"1.66667\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </svg>\n        </button>\n        <div class=\"month-title\">{{ getMonthName() }} {{ getYear() }}</div>\n        <button type=\"button\" class=\"nav-button\" (click)=\"nextMonth()\">\n          <svg\n            width=\"8\"\n            height=\"12\"\n            viewBox=\"0 0 8 12\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M1.5 11L6.5 6L1.5 1\"\n              stroke=\"black\"\n              stroke-opacity=\"0.72\"\n              stroke-width=\"1.66667\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </svg>\n        </button>\n      </div>\n\n      <div class=\"weekdays\">\n        @for(weekday of weekdays; track weekday) {\n        <div class=\"weekday\">{{ weekday }}</div>\n        }\n      </div>\n\n      <div class=\"days-grid\">\n        @for(day of days; track day) {\n        <div\n          class=\"day\"\n          [class.current-month]=\"isCurrentMonth(day)\"\n          [class.selected]=\"isSelected(day)\"\n          [class.disabled]=\"isDisabled(day) || disabled\"\n          (click)=\"!isDisabled(day) && !disabled && selectDate(day)\"\n        >\n          {{ day.getDate() }}\n        </div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n\n  <div class=\"calendar-error-container\">\n    <custom-app-error\n      [control]=\"parentForm.controls[controlName]\"\n      [validation]=\"validation\"\n      [name]=\"name\"\n    />\n  </div>\n</div>\n", styles: [".custom-calendar-container{position:relative;width:100%}.fullWidth{width:100%}.custom-label{display:block;font-size:1em;font-weight:500;color:#707070;margin-bottom:.3em}.custom-calendar-input{position:relative;height:46px;width:100%;border:1px solid #82828233;border-radius:6px;padding:0 12px;display:flex;align-items:center;cursor:pointer;background-color:#fff}.custom-calendar-input.has-error{border:1px solid #d70c0c;box-shadow:1px 0 6px #d70c0c26}.placeholder{color:#82828250;font-size:.95em}.calendar-icon{position:absolute;right:12px}.calendar-popup{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #82828233;border-radius:.375em;margin-top:4px;padding:1rem;z-index:10;box-shadow:0 4px 6px #0000001a}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.month-title{font-weight:600}.nav-button{background:none;border:none;font-size:16px;cursor:pointer;padding:4px 8px}.weekdays{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-weight:500;font-size:12px;margin-bottom:8px}.days-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.day{height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;cursor:pointer;font-size:14px}.day.current-month{color:#111827}.day:not(.current-month){color:#9ca3af}.day.selected{background-color:#602650;color:#fff}.day.disabled{color:#d1d5db;cursor:not-allowed;text-decoration:line-through}.day:not(.disabled):not(.selected):hover{background-color:#f3f4f6}.custom-calendar-input.disabled{background:#f3f3f3;color:#b0b0b0;cursor:not-allowed;border-color:#e0e0e0}.calendar-error-container{position:relative;right:-.37em}\n"], dependencies: [{ kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name", "showErrors"] }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomCalenderFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-calender-form', standalone: true, imports: [
                        CustomAppErrorComponent,
                        ClickOutsideDirective,
                        ReactiveFormsModule,
                        CommonModule,
                    ], template: "<div [class]=\"'fullWidth ' + componentClass\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    } @else{\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n\n  <div [class]=\"'custom-calendar-container ' + calendarContainerClass\">\n    <div\n      [class]=\"'custom-calendar-input ' + calendarInputClass\"\n      [class.disabled]=\"disabled\"\n      [attr.aria-disabled]=\"disabled\"\n      (click)=\"!disabled && toggleCalendar()\"\n      [class.has-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched\n      \"\n    >\n      <span class=\"placeholder\" *ngIf=\"!value\">{{ placeholder }}</span>\n      <span *ngIf=\"value\">{{ formatDisplayDate() }}</span>\n      <span class=\"calendar-icon\">\n        <svg\n          width=\"24\"\n          height=\"24\"\n          viewBox=\"0 0 24 24\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M8 2V5\"\n            stroke=\"#602650\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M16 2V5\"\n            stroke=\"#602650\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M3.5 9.08984H20.5\"\n            stroke=\"#602650\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z\"\n            stroke=\"#602650\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M15.6947 13.7002H15.7037\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M15.6947 16.7002H15.7037\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11.9955 13.7002H12.0045\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11.9955 16.7002H12.0045\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M8.29431 13.7002H8.30329\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M8.29431 16.7002H8.30329\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </span>\n    </div>\n\n    @if(showCalendarForm && !disabled) {\n    <div\n      [class]=\"'calendar-popup ' + calendarPopUpClass\"\n      #calendarPopUpForm\n      [clickOutside]=\"calendarPopUpForm\"\n      (clickOutsideEmitter)=\"showCalendarForm = false\"\n    >\n      <div class=\"calendar-header\">\n        <button type=\"button\" class=\"nav-button\" (click)=\"prevMonth()\">\n          <svg\n            width=\"8\"\n            height=\"12\"\n            viewBox=\"0 0 8 12\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M6.5 11L1.5 6L6.5 1\"\n              stroke=\"black\"\n              stroke-opacity=\"0.72\"\n              stroke-width=\"1.66667\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </svg>\n        </button>\n        <div class=\"month-title\">{{ getMonthName() }} {{ getYear() }}</div>\n        <button type=\"button\" class=\"nav-button\" (click)=\"nextMonth()\">\n          <svg\n            width=\"8\"\n            height=\"12\"\n            viewBox=\"0 0 8 12\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M1.5 11L6.5 6L1.5 1\"\n              stroke=\"black\"\n              stroke-opacity=\"0.72\"\n              stroke-width=\"1.66667\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </svg>\n        </button>\n      </div>\n\n      <div class=\"weekdays\">\n        @for(weekday of weekdays; track weekday) {\n        <div class=\"weekday\">{{ weekday }}</div>\n        }\n      </div>\n\n      <div class=\"days-grid\">\n        @for(day of days; track day) {\n        <div\n          class=\"day\"\n          [class.current-month]=\"isCurrentMonth(day)\"\n          [class.selected]=\"isSelected(day)\"\n          [class.disabled]=\"isDisabled(day) || disabled\"\n          (click)=\"!isDisabled(day) && !disabled && selectDate(day)\"\n        >\n          {{ day.getDate() }}\n        </div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n\n  <div class=\"calendar-error-container\">\n    <custom-app-error\n      [control]=\"parentForm.controls[controlName]\"\n      [validation]=\"validation\"\n      [name]=\"name\"\n    />\n  </div>\n</div>\n", styles: [".custom-calendar-container{position:relative;width:100%}.fullWidth{width:100%}.custom-label{display:block;font-size:1em;font-weight:500;color:#707070;margin-bottom:.3em}.custom-calendar-input{position:relative;height:46px;width:100%;border:1px solid #82828233;border-radius:6px;padding:0 12px;display:flex;align-items:center;cursor:pointer;background-color:#fff}.custom-calendar-input.has-error{border:1px solid #d70c0c;box-shadow:1px 0 6px #d70c0c26}.placeholder{color:#82828250;font-size:.95em}.calendar-icon{position:absolute;right:12px}.calendar-popup{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #82828233;border-radius:.375em;margin-top:4px;padding:1rem;z-index:10;box-shadow:0 4px 6px #0000001a}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.month-title{font-weight:600}.nav-button{background:none;border:none;font-size:16px;cursor:pointer;padding:4px 8px}.weekdays{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-weight:500;font-size:12px;margin-bottom:8px}.days-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.day{height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;cursor:pointer;font-size:14px}.day.current-month{color:#111827}.day:not(.current-month){color:#9ca3af}.day.selected{background-color:#602650;color:#fff}.day.disabled{color:#d1d5db;cursor:not-allowed;text-decoration:line-through}.day:not(.disabled):not(.selected):hover{background-color:#f3f4f6}.custom-calendar-input.disabled{background:#f3f3f3;color:#b0b0b0;cursor:not-allowed;border-color:#e0e0e0}.calendar-error-container{position:relative;right:-.37em}\n"] }]
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
            }] } });

class CustomCheckBoxComponent {
    checkboxClass = '';
    labelClass = '';
    componentClass = '';
    label = '';
    name = '';
    value = false;
    valueChange = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomCheckBoxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomCheckBoxComponent, isStandalone: true, selector: "custom-check-box", inputs: { checkboxClass: "checkboxClass", labelClass: "labelClass", componentClass: "componentClass", label: "label", name: "name", value: "value" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div [style]=\"'checkBox-style '+ componentClass\">\n  <input\n    [id]=\"label\"\n    type=\"checkbox\"\n    [name]=\"name\"\n    [class]=\"'custom-checkbox ' + checkboxClass\"\n    [(ngModel)]=\"value\"\n    (ngModelChange)=\"valueChange.emit($event)\"\n  />\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n</div>\n", styles: [".custom-checkbox{appearance:none;width:25px;height:25px;border:2px solid #ccc;border-radius:3px;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease,background-color .3s ease}.checkBox-style{width:100%;display:flex;align-items:center;gap:4px}.custom-checkbox:checked{background-color:#1db3a9;border-color:#1db3a9}.custom-checkbox:checked:after{content:\"\";position:absolute;top:0;left:8px;width:8px;height:18px;border:solid white;border-width:0 4px 4px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#1db3a9}.custom-label{font-size:1em;color:#707070;font-weight:500;margin-top:5px}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomCheckBoxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-check-box', imports: [FormsModule], standalone: true, template: "<div [style]=\"'checkBox-style '+ componentClass\">\n  <input\n    [id]=\"label\"\n    type=\"checkbox\"\n    [name]=\"name\"\n    [class]=\"'custom-checkbox ' + checkboxClass\"\n    [(ngModel)]=\"value\"\n    (ngModelChange)=\"valueChange.emit($event)\"\n  />\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n</div>\n", styles: [".custom-checkbox{appearance:none;width:25px;height:25px;border:2px solid #ccc;border-radius:3px;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease,background-color .3s ease}.checkBox-style{width:100%;display:flex;align-items:center;gap:4px}.custom-checkbox:checked{background-color:#1db3a9;border-color:#1db3a9}.custom-checkbox:checked:after{content:\"\";position:absolute;top:0;left:8px;width:8px;height:18px;border:solid white;border-width:0 4px 4px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#1db3a9}.custom-label{font-size:1em;color:#707070;font-weight:500;margin-top:5px}\n"] }]
        }], propDecorators: { checkboxClass: [{
                type: Input
            }], labelClass: [{
                type: Input
            }], componentClass: [{
                type: Input
            }], label: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomCheckBoxFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomCheckBoxFormComponent, isStandalone: true, selector: "custom-check-box-form", inputs: { checkboxClass: "checkboxClass", componentClass: "componentClass", labelClass: "labelClass", label: "label", name: "name", controlName: "controlName", parentForm: "parentForm", validation: "validation" }, ngImport: i0, template: "<div class=\"full-width\" [formGroup]=\"parentForm\">\n  <div [ngClass]=\"'checkBox-style' + componentClass\">\n    <input\n      [id]=\"label\"\n      type=\"checkbox\"\n      [name]=\"name\"\n      [class]=\"'custom-checkbox ' + checkboxClass\"\n      [formControlName]=\"controlName\"\n    />\n\n    @if(label){\n    <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n      {{ label }}\n    </label>\n    }\n  </div>\n\n  <custom-app-error\n    [control]=\"parentForm.controls[controlName]\"\n    [validation]=\"validation\"\n    [name]=\"name\"\n  />\n</div>\n", styles: [".custom-checkbox{appearance:none;width:16px;height:16px;border:1px solid #8c92ab;border-radius:4px;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease,background-color .3s ease}.fullWidth{width:100%}.checkBox-style{width:100%;display:flex;align-items:center;gap:4px;justify-content:center}.custom-checkbox:checked{background-color:#1db3a9;border-color:#1db3a9}.custom-checkbox:checked:after{content:\"\";position:absolute;top:0;left:4px;width:6px;height:12px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#1db3a9}.custom-label{font-size:1em;color:#707070;margin-bottom:.3em;font-weight:500;margin-top:5px}\n"], dependencies: [{ kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name", "showErrors"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomCheckBoxFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-check-box-form', standalone: true, imports: [CustomAppErrorComponent, ReactiveFormsModule, CommonModule], template: "<div class=\"full-width\" [formGroup]=\"parentForm\">\n  <div [ngClass]=\"'checkBox-style' + componentClass\">\n    <input\n      [id]=\"label\"\n      type=\"checkbox\"\n      [name]=\"name\"\n      [class]=\"'custom-checkbox ' + checkboxClass\"\n      [formControlName]=\"controlName\"\n    />\n\n    @if(label){\n    <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n      {{ label }}\n    </label>\n    }\n  </div>\n\n  <custom-app-error\n    [control]=\"parentForm.controls[controlName]\"\n    [validation]=\"validation\"\n    [name]=\"name\"\n  />\n</div>\n", styles: [".custom-checkbox{appearance:none;width:16px;height:16px;border:1px solid #8c92ab;border-radius:4px;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease,background-color .3s ease}.fullWidth{width:100%}.checkBox-style{width:100%;display:flex;align-items:center;gap:4px;justify-content:center}.custom-checkbox:checked{background-color:#1db3a9;border-color:#1db3a9}.custom-checkbox:checked:after{content:\"\";position:absolute;top:0;left:4px;width:6px;height:12px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#1db3a9}.custom-label{font-size:1em;color:#707070;margin-bottom:.3em;font-weight:500;margin-top:5px}\n"] }]
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
    dropdownContainerClass = '';
    placeholder = 'Select an option';
    enableFilter = false;
    showClear = true;
    options = [];
    name;
    value;
    valueChange = new EventEmitter();
    isOpen = false;
    filteredOptions = [];
    filterText = '';
    ngOnInit() {
        this.filteredOptions = [...this.options];
    }
    get selectedOption() {
        return this.options.find((opt) => opt.id === this.value) || null;
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
        this.valueChange.emit(option.id);
        this.isOpen = false;
    }
    clearSelection(event) {
        event.stopPropagation();
        this.value = null;
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
            this.value = null;
            this.filterText = '';
            this.filterOptions();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomDropdownComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomDropdownComponent, isStandalone: true, selector: "custom-dropdown", inputs: { label: "label", labelClass: "labelClass", dropdownOptionsClass: "dropdownOptionsClass", dropdownHeaderClass: "dropdownHeaderClass", dropdownContainerClass: "dropdownContainerClass", placeholder: "placeholder", enableFilter: "enableFilter", showClear: "showClear", options: "options", name: "name", value: "value", reset: "reset" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<!-- custom-dropdown.component.html -->\n<div style=\"width: 100%; height: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n\n  <div [class]=\"'dropdown-container ' + dropdownContainerClass\">\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      (click)=\"toggleDropdown()\"\n    >\n      <span class=\"selected-value\">\n        {{ selectedOption?.nameEn || placeholder }}\n      </span>\n      <div class=\"dropdown-icons\">\n        @if(selectedOption && showClear){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"12\"\n            height=\"12\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1710\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n        </span>\n        }\n        <svg\n          width=\"17\"\n          height=\"16\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#602650\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen){\n    <div\n      #dropdownOptions\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptions\"\n      (clickOutsideEmitter)=\"isOpen = false\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n        />\n      </div>\n      }\n\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <div\n          class=\"dropdown-option\"\n          [class.selected]=\"option.id === value\"\n          (click)=\"selectOption(option)\"\n        >\n          {{ option.nameEn }}\n        </div>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n</div>\n", styles: [".dropdown-container{position:relative;width:100%;height:100%}.dropdown-header{height:3.6em;width:100%;border-radius:.375em;border:1px solid #82828233;padding:0 1em;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff;font-size:1em}.selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151;font-size:.95em}.dropdown-icons{display:flex;align-items:center;gap:8px}.clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer}.clear-icon:hover{color:#6b7280}.dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #82828233;border-radius:.375em;margin-top:4px;z-index:10;box-shadow:0 4px 6px #0000001a}.filter-container{padding:8px;border-bottom:1px solid #e5e7eb}.filter-input{width:100%;padding:8px;border:1px solid #82828233;border-radius:.25rem;outline:none}.options-list{padding:4px 0}.dropdown-option{padding:8px 16px;cursor:pointer}.dropdown-option:hover{background-color:#f3f4f6}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.custom-label{font-size:1em;color:#707070;margin-bottom:.3em;font-weight:500;display:block}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-dropdown', standalone: true, imports: [FormsModule, ClickOutsideDirective], template: "<!-- custom-dropdown.component.html -->\n<div style=\"width: 100%; height: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n\n  <div [class]=\"'dropdown-container ' + dropdownContainerClass\">\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      (click)=\"toggleDropdown()\"\n    >\n      <span class=\"selected-value\">\n        {{ selectedOption?.nameEn || placeholder }}\n      </span>\n      <div class=\"dropdown-icons\">\n        @if(selectedOption && showClear){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"12\"\n            height=\"12\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1710\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n        </span>\n        }\n        <svg\n          width=\"17\"\n          height=\"16\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#602650\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen){\n    <div\n      #dropdownOptions\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptions\"\n      (clickOutsideEmitter)=\"isOpen = false\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n        />\n      </div>\n      }\n\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <div\n          class=\"dropdown-option\"\n          [class.selected]=\"option.id === value\"\n          (click)=\"selectOption(option)\"\n        >\n          {{ option.nameEn }}\n        </div>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n</div>\n", styles: [".dropdown-container{position:relative;width:100%;height:100%}.dropdown-header{height:3.6em;width:100%;border-radius:.375em;border:1px solid #82828233;padding:0 1em;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff;font-size:1em}.selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151;font-size:.95em}.dropdown-icons{display:flex;align-items:center;gap:8px}.clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer}.clear-icon:hover{color:#6b7280}.dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #82828233;border-radius:.375em;margin-top:4px;z-index:10;box-shadow:0 4px 6px #0000001a}.filter-container{padding:8px;border-bottom:1px solid #e5e7eb}.filter-input{width:100%;padding:8px;border:1px solid #82828233;border-radius:.25rem;outline:none}.options-list{padding:4px 0}.dropdown-option{padding:8px 16px;cursor:pointer}.dropdown-option:hover{background-color:#f3f4f6}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.custom-label{font-size:1em;color:#707070;margin-bottom:.3em;font-weight:500;display:block}\n"] }]
        }], propDecorators: { label: [{
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
            }], value: [{
                type: Input,
                args: [{ required: true }]
            }], valueChange: [{
                type: Output
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
    valueChange = new EventEmitter();
    isOpen = false;
    selectedOption = null;
    filteredOptions = [];
    filterText = '';
    value;
    ngOnInit() {
        this.filteredOptions = [...this.options];
        this.setupFormControlSubscription();
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomDropdownFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomDropdownFormComponent, isStandalone: true, selector: "custom-dropdown-form", inputs: { parentForm: "parentForm", controlName: "controlName", label: "label", labelClass: "labelClass", dropdownOptionsClass: "dropdownOptionsClass", dropdownHeaderClass: "dropdownHeaderClass", dropdownContainerClass: "dropdownContainerClass", placeholder: "placeholder", enableFilter: "enableFilter", showClear: "showClear", options: "options", name: "name", validation: "validation", disabled: "disabled", reset: "reset" }, outputs: { valueChange: "valueChange" }, usesOnChanges: true, ngImport: i0, template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    } @else{\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n\n  <div\n    [class]=\"'dropdown-container ' + dropdownContainerClass\"\n    [class.disabled]=\"disabled\"\n  >\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      [class.disabled]=\"disabled\"\n      (click)=\"!disabled && toggleDropdown()\"\n      [style.cursor]=\"disabled ? 'not-allowed' : 'pointer'\"\n      [class.has-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched\n      \"\n    >\n      @if (selectedOption && selectedOption.nameEn){\n      <span class=\"selected-value\"> {{ selectedOption.nameEn }} </span>} @else {\n      <span class=\"selected-value placeholder\">\n        {{ placeholder }}\n      </span>\n      }\n      <div class=\"dropdown-icons\">\n        @if(selectedOption && showClear && !disabled){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"12\"\n            height=\"12\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1710\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n        </span>\n        }\n        <svg\n          width=\"17\"\n          height=\"16\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#602650\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n    @if(isOpen && !disabled){\n    <div\n      #dropdownOptions\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptions\"\n      (clickOutsideEmitter)=\"isOpen = false\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n          [disabled]=\"disabled\"\n        />\n      </div>\n      }\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <div\n          class=\"dropdown-option\"\n          [class.selected]=\"option.id === selectedOption?.id\"\n          (click)=\"selectOption(option)\"\n        >\n          {{ option.nameEn }}\n        </div>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n\n  <input\n    type=\"hidden\"\n    [id]=\"label\"\n    [name]=\"name\"\n    [formControlName]=\"controlName\"\n    [disabled]=\"disabled\"\n  />\n\n  <div class=\"dropdown-error-container\">\n    <custom-app-error\n      [control]=\"parentForm.controls[controlName]\"\n      [validation]=\"validation\"\n      [name]=\"name\"\n    />\n  </div>\n</div>\n", styles: [".dropdown-container{position:relative;width:100%}.dropdown-header{height:3.6em;width:100%;border-radius:.375em;border:1px solid #82828233;padding:0 1em;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.dropdown-header.has-error{border:1px solid #d70c0c;box-shadow:1px 0 6px #d70c0c26}.selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151;font-size:.95em}.selected-value.placeholder{color:#82828250}.dropdown-icons{display:flex;align-items:center;gap:8px}.clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer}.clear-icon:hover{color:#6b7280}.dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #82828233;border-radius:.375em;margin-top:4px;z-index:10;box-shadow:0 4px 6px #0000001a}.filter-container{padding:80px;border-bottom:1px solid #e5e7eb;background-color:red}.filter-input{width:100%;padding:8px;border:1px solid #82828233;border-radius:.25rem;outline:none}.options-list{padding:4px 0}.dropdown-option{padding:8px 16px;cursor:pointer;font-family:var(--FM-Light)}.dropdown-option:hover{background-color:#f3f4f6}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.disabled{background-color:#f3f4f6}.dropdown-error-container{position:relative;right:-.5em}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name", "showErrors"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomDropdownFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-dropdown-form', standalone: true, imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        ClickOutsideDirective,
                        CustomAppErrorComponent,
                    ], template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    } @else{\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n\n  <div\n    [class]=\"'dropdown-container ' + dropdownContainerClass\"\n    [class.disabled]=\"disabled\"\n  >\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      [class.disabled]=\"disabled\"\n      (click)=\"!disabled && toggleDropdown()\"\n      [style.cursor]=\"disabled ? 'not-allowed' : 'pointer'\"\n      [class.has-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched\n      \"\n    >\n      @if (selectedOption && selectedOption.nameEn){\n      <span class=\"selected-value\"> {{ selectedOption.nameEn }} </span>} @else {\n      <span class=\"selected-value placeholder\">\n        {{ placeholder }}\n      </span>\n      }\n      <div class=\"dropdown-icons\">\n        @if(selectedOption && showClear && !disabled){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"12\"\n            height=\"12\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1710\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n        </span>\n        }\n        <svg\n          width=\"17\"\n          height=\"16\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#602650\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n    @if(isOpen && !disabled){\n    <div\n      #dropdownOptions\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptions\"\n      (clickOutsideEmitter)=\"isOpen = false\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n          [disabled]=\"disabled\"\n        />\n      </div>\n      }\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <div\n          class=\"dropdown-option\"\n          [class.selected]=\"option.id === selectedOption?.id\"\n          (click)=\"selectOption(option)\"\n        >\n          {{ option.nameEn }}\n        </div>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n\n  <input\n    type=\"hidden\"\n    [id]=\"label\"\n    [name]=\"name\"\n    [formControlName]=\"controlName\"\n    [disabled]=\"disabled\"\n  />\n\n  <div class=\"dropdown-error-container\">\n    <custom-app-error\n      [control]=\"parentForm.controls[controlName]\"\n      [validation]=\"validation\"\n      [name]=\"name\"\n    />\n  </div>\n</div>\n", styles: [".dropdown-container{position:relative;width:100%}.dropdown-header{height:3.6em;width:100%;border-radius:.375em;border:1px solid #82828233;padding:0 1em;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.dropdown-header.has-error{border:1px solid #d70c0c;box-shadow:1px 0 6px #d70c0c26}.selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151;font-size:.95em}.selected-value.placeholder{color:#82828250}.dropdown-icons{display:flex;align-items:center;gap:8px}.clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer}.clear-icon:hover{color:#6b7280}.dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #82828233;border-radius:.375em;margin-top:4px;z-index:10;box-shadow:0 4px 6px #0000001a}.filter-container{padding:80px;border-bottom:1px solid #e5e7eb;background-color:red}.filter-input{width:100%;padding:8px;border:1px solid #82828233;border-radius:.25rem;outline:none}.options-list{padding:4px 0}.dropdown-option{padding:8px 16px;cursor:pointer;font-family:var(--FM-Light)}.dropdown-option:hover{background-color:#f3f4f6}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.disabled{background-color:#f3f4f6}.dropdown-error-container{position:relative;right:-.5em}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomInputComponent, isStandalone: true, selector: "custom-input", inputs: { class: "class", labelClass: "labelClass", label: "label", placeholder: "placeholder", name: "name", type: "type", value: "value" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "\n\n<div style=\"width: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n  <input\n    [id]=\"label || name\"\n    [type]=\"type\"\n    [name]=\"name\"\n    [placeholder]=\"placeholder\"\n    [class]=\"'custom-input ' + class\"\n    [(ngModel)]=\"value\"\n    (ngModelChange)=\"valueChange.emit($event)\"\n  />\n</div>\n", styles: [".custom-input{width:100%;border-radius:.375em;border:1px solid #82828233;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;padding:1em}.custom-input::placeholder{color:#82828250;font-size:1em;font-weight:400}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-input', standalone: true, imports: [FormsModule], template: "\n\n<div style=\"width: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n  <input\n    [id]=\"label || name\"\n    [type]=\"type\"\n    [name]=\"name\"\n    [placeholder]=\"placeholder\"\n    [class]=\"'custom-input ' + class\"\n    [(ngModel)]=\"value\"\n    (ngModelChange)=\"valueChange.emit($event)\"\n  />\n</div>\n", styles: [".custom-input{width:100%;border-radius:.375em;border:1px solid #82828233;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;padding:1em}.custom-input::placeholder{color:#82828250;font-size:1em;font-weight:400}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}\n"] }]
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
    containRequiredError() {
        return this.validation.some((error) => error.errorType.includes(ComponentFormErrorConstant.REQUIRED));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomInputFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomInputFormComponent, isStandalone: true, selector: "custom-input-form", inputs: { class: "class", labelClass: "labelClass", label: "label", placeholder: "placeholder", name: "name", type: "type", controlName: "controlName", parentForm: "parentForm", validation: "validation", pattern: "pattern" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\" class=\"input-wrapper\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    } @else{\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n\n  <div\n    class=\"input-error-container\"\n    [class.has-error]=\"\n      parentForm.controls[controlName].invalid &&\n      parentForm.controls[controlName].touched\n    \"\n  >\n    <input\n      [id]=\"label || name\"\n      [type]=\"type\"\n      [name]=\"name\"\n      [placeholder]=\"placeholder\"\n      [class]=\"'custom-input ' + class\"\n      [formControlName]=\"controlName\"\n      (ngModelChange)=\"valueChange.emit($event)\"\n      [pattern]=\"pattern\"\n      [class.input-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched\n      \"\n    />\n    <!-- Error icon (SVG) -->\n    @if( parentForm.controls[controlName].invalid &&\n    parentForm.controls[controlName].touched ){\n    <span class=\"input-error-icon\"\n      ><svg\n        width=\"1.08em\"\n        height=\"1.08em\"\n        viewBox=\"0 0 22 22\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <g clip-path=\"url(#clip0_9085_34629)\">\n          <path\n            d=\"M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 7V11\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 15H11.01\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n        <defs>\n          <clipPath id=\"clip0_9085_34629\">\n            <rect width=\"22\" height=\"22\" fill=\"white\" />\n          </clipPath>\n        </defs>\n      </svg>\n    </span>\n    }\n  </div>\n\n  @if( parentForm.controls[controlName].invalid &&\n  parentForm.controls[controlName].touched ){\n  <custom-app-error\n    [control]=\"parentForm.controls[controlName]\"\n    [validation]=\"validation\"\n    [name]=\"name\"\n  />\n  }\n</div>\n", styles: [".input-wrapper,.input-error-container{position:relative}.custom-input{width:100%;border-radius:.375em;border:1px solid #82828233;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;padding:1em;transition:border-color .2s}.custom-input.input-error{border:1px solid #d70c0c;box-shadow:1px 0 6px #d70c0c26}.input-error-icon{position:absolute;right:1em;top:50%;transform:translateY(-50%);color:#d70c0c;font-size:1.5em;pointer-events:none}.custom-input::placeholder{color:#82828233;font-size:1em;font-weight:400}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}\n"], dependencies: [{ kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.PatternValidator, selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]", inputs: ["pattern"] }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name", "showErrors"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomInputFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-input-form', standalone: true, imports: [ReactiveFormsModule, CustomAppErrorComponent], template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\" class=\"input-wrapper\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    } @else{\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n\n  <div\n    class=\"input-error-container\"\n    [class.has-error]=\"\n      parentForm.controls[controlName].invalid &&\n      parentForm.controls[controlName].touched\n    \"\n  >\n    <input\n      [id]=\"label || name\"\n      [type]=\"type\"\n      [name]=\"name\"\n      [placeholder]=\"placeholder\"\n      [class]=\"'custom-input ' + class\"\n      [formControlName]=\"controlName\"\n      (ngModelChange)=\"valueChange.emit($event)\"\n      [pattern]=\"pattern\"\n      [class.input-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched\n      \"\n    />\n    <!-- Error icon (SVG) -->\n    @if( parentForm.controls[controlName].invalid &&\n    parentForm.controls[controlName].touched ){\n    <span class=\"input-error-icon\"\n      ><svg\n        width=\"1.08em\"\n        height=\"1.08em\"\n        viewBox=\"0 0 22 22\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <g clip-path=\"url(#clip0_9085_34629)\">\n          <path\n            d=\"M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 7V11\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 15H11.01\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n        <defs>\n          <clipPath id=\"clip0_9085_34629\">\n            <rect width=\"22\" height=\"22\" fill=\"white\" />\n          </clipPath>\n        </defs>\n      </svg>\n    </span>\n    }\n  </div>\n\n  @if( parentForm.controls[controlName].invalid &&\n  parentForm.controls[controlName].touched ){\n  <custom-app-error\n    [control]=\"parentForm.controls[controlName]\"\n    [validation]=\"validation\"\n    [name]=\"name\"\n  />\n  }\n</div>\n", styles: [".input-wrapper,.input-error-container{position:relative}.custom-input{width:100%;border-radius:.375em;border:1px solid #82828233;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;padding:1em;transition:border-color .2s}.custom-input.input-error{border:1px solid #d70c0c;box-shadow:1px 0 6px #d70c0c26}.input-error-icon{position:absolute;right:1em;top:50%;transform:translateY(-50%);color:#d70c0c;font-size:1.5em;pointer-events:none}.custom-input::placeholder{color:#82828233;font-size:1em;font-weight:400}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}\n"] }]
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
            }] } });

class CustomMultiSelectComponent {
    label;
    labelClass = '';
    dropdownOptionsClass = '';
    dropdownHeaderClass = '';
    dropdownContainerClass = '';
    placeholder = 'Select options';
    enableFilter = false;
    showClear = true;
    options = [];
    value = []; // Array of selected IDs
    valueChange = new EventEmitter();
    isOpen = false;
    filteredOptions = [];
    filterText = '';
    ngOnInit() {
        this.filteredOptions = [...this.options];
    }
    get selectedOptions() {
        return this.options.filter((opt) => this.value.includes(opt.id));
    }
    getSelectedLabels() {
        return this.selectedOptions.map((opt) => opt.nameEn).join(', ');
    }
    toggleDropdown() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.filterText = '';
            this.filterOptions();
        }
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
    clearSelection(event) {
        event.stopPropagation();
        this.value = [];
        this.valueChange.emit([]);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomMultiSelectComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomMultiSelectComponent, isStandalone: true, selector: "custom-multi-select", inputs: { label: "label", labelClass: "labelClass", dropdownOptionsClass: "dropdownOptionsClass", dropdownHeaderClass: "dropdownHeaderClass", dropdownContainerClass: "dropdownContainerClass", placeholder: "placeholder", enableFilter: "enableFilter", showClear: "showClear", options: "options", value: "value", reset: "reset" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div style=\"width: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n\n  <div [class]=\"'dropdown-container ' + dropdownContainerClass\">\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      (click)=\"toggleDropdown()\"\n    >\n      <span class=\"selected-value\">\n        {{ selectedOptions.length > 0 ? getSelectedLabels() : placeholder }}\n      </span>\n      <div class=\"dropdown-icons\">\n        @if(selectedOptions.length > 0 && showClear){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"12\"\n            height=\"12\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1710\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n        </span>\n        }\n        <svg\n          width=\"17\"\n          height=\"16\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#602650\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen){\n    <div\n      #dropdownOptions\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptions\"\n      (clickOutsideEmitter)=\"isOpen = false\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n        />\n      </div>\n      }\n\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <div class=\"dropdown-option\" (click)=\"toggleOptionSelection(option)\">\n          <input\n            type=\"checkbox\"\n            class=\"custom-checkbox\"\n            [checked]=\"isSelected(option.id)\"\n            (click)=\"$event.stopPropagation()\"\n          />\n          <span>{{ option.nameEn }}</span>\n        </div>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n</div>\n", styles: [".dropdown-container{position:relative;width:100%}.dropdown-header{height:46px;width:100%;border-radius:.375em;border:1px solid #82828233;padding:0 1em;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151;font-size:.95em}.dropdown-icons{display:flex;align-items:center;gap:8px}.clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer}.clear-icon:hover{color:#6b7280}.dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #82828233;border-radius:.375em;margin-top:4px;z-index:10;box-shadow:0 4px 6px #0000001a}.filter-container{padding:8px;border-bottom:1px solid #e5e7eb}.filter-input{width:100%;padding:8px;border:1px solid #82828233;border-radius:.25rem;outline:none}.options-list{padding:4px 0}.dropdown-option{padding:8px 16px;cursor:pointer}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.dropdown-option{display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;transition:background-color .2s}.dropdown-option:hover{background-color:#f3f4f6}.option-label{flex:1}.custom-checkbox{appearance:none;width:20px;height:20px;border:2px solid #ccc;border-radius:3px;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease,background-color .3s ease;flex-shrink:0}.custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.custom-checkbox:checked:after{content:\"\";position:absolute;top:0;left:5px;width:6px;height:12px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#25c7bc}.dropdown-option.selected{background-color:#e5e7eb}.no-options{padding:12px 16px;color:#6b7280;font-style:italic;text-align:center}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomMultiSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-multi-select', standalone: true, imports: [FormsModule, ClickOutsideDirective], template: "<div style=\"width: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n\n  <div [class]=\"'dropdown-container ' + dropdownContainerClass\">\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      (click)=\"toggleDropdown()\"\n    >\n      <span class=\"selected-value\">\n        {{ selectedOptions.length > 0 ? getSelectedLabels() : placeholder }}\n      </span>\n      <div class=\"dropdown-icons\">\n        @if(selectedOptions.length > 0 && showClear){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"12\"\n            height=\"12\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1710\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n        </span>\n        }\n        <svg\n          width=\"17\"\n          height=\"16\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#602650\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen){\n    <div\n      #dropdownOptions\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptions\"\n      (clickOutsideEmitter)=\"isOpen = false\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n        />\n      </div>\n      }\n\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <div class=\"dropdown-option\" (click)=\"toggleOptionSelection(option)\">\n          <input\n            type=\"checkbox\"\n            class=\"custom-checkbox\"\n            [checked]=\"isSelected(option.id)\"\n            (click)=\"$event.stopPropagation()\"\n          />\n          <span>{{ option.nameEn }}</span>\n        </div>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n</div>\n", styles: [".dropdown-container{position:relative;width:100%}.dropdown-header{height:46px;width:100%;border-radius:.375em;border:1px solid #82828233;padding:0 1em;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151;font-size:.95em}.dropdown-icons{display:flex;align-items:center;gap:8px}.clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer}.clear-icon:hover{color:#6b7280}.dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #82828233;border-radius:.375em;margin-top:4px;z-index:10;box-shadow:0 4px 6px #0000001a}.filter-container{padding:8px;border-bottom:1px solid #e5e7eb}.filter-input{width:100%;padding:8px;border:1px solid #82828233;border-radius:.25rem;outline:none}.options-list{padding:4px 0}.dropdown-option{padding:8px 16px;cursor:pointer}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.dropdown-option{display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;transition:background-color .2s}.dropdown-option:hover{background-color:#f3f4f6}.option-label{flex:1}.custom-checkbox{appearance:none;width:20px;height:20px;border:2px solid #ccc;border-radius:3px;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease,background-color .3s ease;flex-shrink:0}.custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.custom-checkbox:checked:after{content:\"\";position:absolute;top:0;left:5px;width:6px;height:12px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#25c7bc}.dropdown-option.selected{background-color:#e5e7eb}.no-options{padding:12px 16px;color:#6b7280;font-style:italic;text-align:center}\n"] }]
        }], propDecorators: { label: [{
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
    showClear = true;
    options = [];
    name = '';
    validation = [];
    isOpen = false;
    filteredOptions = [];
    filterText = '';
    ngOnInit() {
        this.filteredOptions = [...this.options];
        // Initialize with current form value if any
        const currentValue = this.parentForm.get(this.controlName)?.value;
        if (currentValue && currentValue.length > 0) {
            // Ensure form control has array value
            if (!Array.isArray(currentValue)) {
                this.parentForm.get(this.controlName)?.setValue([]);
            }
        }
        else {
            this.parentForm.get(this.controlName)?.setValue([]);
        }
    }
    get selectedOptions() {
        const value = this.parentForm.get(this.controlName)?.value || [];
        return this.options.filter((opt) => value.includes(opt.id));
    }
    getSelectedLabels() {
        return this.selectedOptions.map((opt) => opt.nameEn);
    }
    isSelected(id) {
        const value = this.parentForm.get(this.controlName)?.value || [];
        return value.includes(id);
    }
    toggleDropdown() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.filterText = '';
            this.filterOptions();
        }
    }
    toggleOptionSelection(option) {
        const currentValue = this.parentForm.get(this.controlName)?.value || [];
        let newValue;
        if (this.isSelected(option.id)) {
            newValue = currentValue.filter((id) => id !== option.id);
        }
        else {
            newValue = [...currentValue, option.id];
        }
        this.parentForm.get(this.controlName)?.setValue(newValue);
    }
    clearSelection(event) {
        event.stopPropagation();
        this.parentForm.get(this.controlName)?.setValue([]);
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
            this.parentForm.get(this.controlName)?.setValue([]);
            this.filterText = '';
            this.filterOptions();
        }
    }
    containRequiredError() {
        return this.validation.some((error) => error.errorType.includes(ComponentFormErrorConstant.REQUIRED));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomMultiSelectFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomMultiSelectFormComponent, isStandalone: true, selector: "custom-multi-select-form", inputs: { parentForm: "parentForm", controlName: "controlName", label: "label", labelClass: "labelClass", dropdownOptionsClass: "dropdownOptionsClass", dropdownHeaderClass: "dropdownHeaderClass", dropdownContainerClass: "dropdownContainerClass", placeholder: "placeholder", enableFilter: "enableFilter", showClear: "showClear", options: "options", name: "name", validation: "validation", reset: "reset" }, ngImport: i0, template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    } @else{\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n  <div [class]=\"'dropdown-container ' + dropdownContainerClass\">\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      (click)=\"toggleDropdown()\"\n      [class.has-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched\n      \"\n    >\n      <div class=\"selected-option-container\">\n        @if (selectedOptions.length > 0) { @for (opt of selectedOptions; track\n        opt){\n        <span class=\"selected-tag\">\n          <p style=\"color: #fff\">{{ opt.nameEn }}</p>\n          <span\n            class=\"remove-tag\"\n            (click)=\"$event.stopPropagation(); toggleOptionSelection(opt)\"\n            ><svg\n              width=\"8\"\n              height=\"8\"\n              viewBox=\"0 0 8 8\"\n              fill=\"none\"\n              xmlns=\"http://www.w3.org/2000/svg\"\n            >\n              <g clip-path=\"url(#clip0_9203_8209)\">\n                <path\n                  d=\"M7.42843 0.571289L0.571289 7.42843\"\n                  stroke=\"white\"\n                  stroke-linecap=\"round\"\n                  stroke-linejoin=\"round\"\n                />\n                <path\n                  d=\"M0.571289 0.571289L7.42843 7.42843\"\n                  stroke=\"white\"\n                  stroke-linecap=\"round\"\n                  stroke-linejoin=\"round\"\n                />\n              </g>\n              <defs>\n                <clipPath id=\"clip0_9203_8209\">\n                  <rect width=\"8\" height=\"8\" fill=\"white\" />\n                </clipPath>\n              </defs>\n            </svg>\n          </span>\n        </span>\n        } } @else {\n        <span class=\"selected-value placeholder\">\n          {{ placeholder }}\n        </span>\n        }\n      </div>\n      <div class=\"dropdown-icons\">\n        @if(selectedOptions.length > 0 && showClear){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"12\"\n            height=\"12\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n          </svg>\n        </span>\n        }\n        <svg\n          width=\"17\"\n          height=\"16\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#602650\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen){\n    <div\n      #dropdownOptionsMultiSelectForm\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptionsMultiSelectForm\"\n      (clickOutsideEmitter)=\"toggleDropdown()\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n        />\n      </div>\n      }\n\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <label class=\"dropdown-option\">\n          <input\n            type=\"checkbox\"\n            class=\"custom-checkbox\"\n            [checked]=\"isSelected(option.id)\"\n            (change)=\"toggleOptionSelection(option)\"\n          />\n          <span class=\"option-label\">{{ option.nameEn }}</span>\n        </label>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n\n  <input\n    type=\"hidden\"\n    [id]=\"label\"\n    [name]=\"name\"\n    [formControlName]=\"controlName\"\n  />\n\n  <div class=\"dropdown-error-container\">\n    <custom-app-error\n      [control]=\"parentForm.controls[controlName]\"\n      [validation]=\"validation\"\n      [name]=\"name\"\n    />\n  </div>\n</div>\n", styles: [".dropdown-container{position:relative;width:100%}.dropdown-header{height:46px;width:100%;border-radius:.375em;border:1px solid #82828233;padding:0 1em;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.dropdown-header.has-error{border:1px solid #d70c0c;box-shadow:1px 0 6px #d70c0c26}.remove-tag{cursor:pointer;padding:0 .3em;align-self:flex-start}.selected-option-container{display:flex;flex-direction:row;flex-wrap:wrap}.selected-tag{display:flex;align-items:center;justify-content:space-between;gap:.2em;background-color:#25c7bc;color:#374151;font-size:.85em;border-radius:.375em;padding:.25em .01em .25em .5em;margin:2px}.selected-tag p{padding:.4em .05em .4em .4em}.remove-tag{padding:.2em .4em;cursor:pointer;font-weight:700}.selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151;font-size:.95em}.placeholder{color:#82828250}.dropdown-icons{display:flex;align-items:center;gap:8px}.clear-icon{color:#9ca3af;font-size:1.2em;cursor:pointer}.clear-icon:hover{color:#6b7280}.dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #82828233;border-radius:.375em;margin-top:4px;z-index:10;box-shadow:0 4px 6px #0000001a}.filter-container{padding:8px;border-bottom:1px solid #e5e7eb}.filter-input{padding:10px;border-radius:.5em;border:1px solid #d1d5db;font-size:.9em;color:#374151}.options-list{padding:4px 0}.dropdown-option{padding:8px 16px;cursor:pointer}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.dropdown-option{display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;transition:background-color .2s}.dropdown-option:hover{background-color:#f3f4f6}.option-label{flex:1}.custom-checkbox{appearance:none;width:18px;height:18px;border:1.5px solid #9ca3af;border-radius:4px;background-color:#fff;display:inline-block;position:relative}.custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.custom-checkbox:checked:after{content:\"\";position:absolute;top:2px;left:5px;width:5px;height:10px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#25c7bc}.dropdown-option.selected{background-color:#e5e7eb}.no-options{padding:12px 16px;color:#6b7280;font-style:italic;text-align:center}.dropdown-error-container{position:relative;right:-.5em}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name", "showErrors"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomMultiSelectFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-multi-select-form', standalone: true, imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        ClickOutsideDirective,
                        CustomAppErrorComponent,
                    ], template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    } @else{\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n  <div [class]=\"'dropdown-container ' + dropdownContainerClass\">\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      (click)=\"toggleDropdown()\"\n      [class.has-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched\n      \"\n    >\n      <div class=\"selected-option-container\">\n        @if (selectedOptions.length > 0) { @for (opt of selectedOptions; track\n        opt){\n        <span class=\"selected-tag\">\n          <p style=\"color: #fff\">{{ opt.nameEn }}</p>\n          <span\n            class=\"remove-tag\"\n            (click)=\"$event.stopPropagation(); toggleOptionSelection(opt)\"\n            ><svg\n              width=\"8\"\n              height=\"8\"\n              viewBox=\"0 0 8 8\"\n              fill=\"none\"\n              xmlns=\"http://www.w3.org/2000/svg\"\n            >\n              <g clip-path=\"url(#clip0_9203_8209)\">\n                <path\n                  d=\"M7.42843 0.571289L0.571289 7.42843\"\n                  stroke=\"white\"\n                  stroke-linecap=\"round\"\n                  stroke-linejoin=\"round\"\n                />\n                <path\n                  d=\"M0.571289 0.571289L7.42843 7.42843\"\n                  stroke=\"white\"\n                  stroke-linecap=\"round\"\n                  stroke-linejoin=\"round\"\n                />\n              </g>\n              <defs>\n                <clipPath id=\"clip0_9203_8209\">\n                  <rect width=\"8\" height=\"8\" fill=\"white\" />\n                </clipPath>\n              </defs>\n            </svg>\n          </span>\n        </span>\n        } } @else {\n        <span class=\"selected-value placeholder\">\n          {{ placeholder }}\n        </span>\n        }\n      </div>\n      <div class=\"dropdown-icons\">\n        @if(selectedOptions.length > 0 && showClear){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"12\"\n            height=\"12\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n          </svg>\n        </span>\n        }\n        <svg\n          width=\"17\"\n          height=\"16\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#602650\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen){\n    <div\n      #dropdownOptionsMultiSelectForm\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptionsMultiSelectForm\"\n      (clickOutsideEmitter)=\"toggleDropdown()\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n        />\n      </div>\n      }\n\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <label class=\"dropdown-option\">\n          <input\n            type=\"checkbox\"\n            class=\"custom-checkbox\"\n            [checked]=\"isSelected(option.id)\"\n            (change)=\"toggleOptionSelection(option)\"\n          />\n          <span class=\"option-label\">{{ option.nameEn }}</span>\n        </label>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n\n  <input\n    type=\"hidden\"\n    [id]=\"label\"\n    [name]=\"name\"\n    [formControlName]=\"controlName\"\n  />\n\n  <div class=\"dropdown-error-container\">\n    <custom-app-error\n      [control]=\"parentForm.controls[controlName]\"\n      [validation]=\"validation\"\n      [name]=\"name\"\n    />\n  </div>\n</div>\n", styles: [".dropdown-container{position:relative;width:100%}.dropdown-header{height:46px;width:100%;border-radius:.375em;border:1px solid #82828233;padding:0 1em;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.dropdown-header.has-error{border:1px solid #d70c0c;box-shadow:1px 0 6px #d70c0c26}.remove-tag{cursor:pointer;padding:0 .3em;align-self:flex-start}.selected-option-container{display:flex;flex-direction:row;flex-wrap:wrap}.selected-tag{display:flex;align-items:center;justify-content:space-between;gap:.2em;background-color:#25c7bc;color:#374151;font-size:.85em;border-radius:.375em;padding:.25em .01em .25em .5em;margin:2px}.selected-tag p{padding:.4em .05em .4em .4em}.remove-tag{padding:.2em .4em;cursor:pointer;font-weight:700}.selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151;font-size:.95em}.placeholder{color:#82828250}.dropdown-icons{display:flex;align-items:center;gap:8px}.clear-icon{color:#9ca3af;font-size:1.2em;cursor:pointer}.clear-icon:hover{color:#6b7280}.dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #82828233;border-radius:.375em;margin-top:4px;z-index:10;box-shadow:0 4px 6px #0000001a}.filter-container{padding:8px;border-bottom:1px solid #e5e7eb}.filter-input{padding:10px;border-radius:.5em;border:1px solid #d1d5db;font-size:.9em;color:#374151}.options-list{padding:4px 0}.dropdown-option{padding:8px 16px;cursor:pointer}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.dropdown-option{display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;transition:background-color .2s}.dropdown-option:hover{background-color:#f3f4f6}.option-label{flex:1}.custom-checkbox{appearance:none;width:18px;height:18px;border:1.5px solid #9ca3af;border-radius:4px;background-color:#fff;display:inline-block;position:relative}.custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.custom-checkbox:checked:after{content:\"\";position:absolute;top:2px;left:5px;width:5px;height:10px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#25c7bc}.dropdown-option.selected{background-color:#e5e7eb}.no-options{padding:12px 16px;color:#6b7280;font-style:italic;text-align:center}.dropdown-error-container{position:relative;right:-.5em}\n"] }]
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
            }], reset: [{
                type: Input
            }] } });

class CustomPaginationComponent {
    page = 1;
    pageSize = 10;
    totalCount = 0;
    pageChange = new EventEmitter();
    baseValue = 10;
    pageSizeOptions = [];
    totalPages = signal([]);
    ngOnInit() {
        this.calculateTotalPages();
    }
    calculateTotalPages() {
        this.generatePageSizeOptions();
        this.totalPages.set(Array.from({ length: Math.ceil(this.totalCount / this.pageSize) }, (_, i) => i + 1));
    }
    generatePageSizeOptions() {
        this.pageSizeOptions = [];
        for (let i = 0; i < 4; i++) {
            this.pageSizeOptions.push(this.baseValue * Math.pow(2, i));
        }
    }
    prevPage() {
        if (this.page > 1) {
            this.page--;
            this.pageChange.emit({ page: this.page, pageSize: this.pageSize });
        }
    }
    nextPage() {
        if (this.page < this.totalPages.length) {
            this.page++;
            this.pageChange.emit({ page: this.page, pageSize: this.pageSize });
        }
    }
    firstPage() {
        if (this.page > 1) {
            this.page = 1;
            this.pageChange.emit({ page: this.page, pageSize: this.pageSize });
        }
    }
    lastPage() {
        if (this.page < this.totalPages.length) {
            this.page = this.totalPages.length;
            this.pageChange.emit({ page: this.page, pageSize: this.pageSize });
        }
    }
    onPageSizeChange(event) {
        const selectElement = event.target;
        this.pageChange.emit({
            page: this.page,
            pageSize: +selectElement.value, // The + converts string to number
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomPaginationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomPaginationComponent, isStandalone: true, selector: "custom-pagination", inputs: { page: "page", pageSize: "pageSize", totalCount: "totalCount", baseValue: "baseValue" }, outputs: { pageChange: "pageChange" }, ngImport: i0, template: "<div class=\"pagination\">\n  <p class=\"totalCount\" >A total of {{ totalCount }} data</p>\n  @if(totalPages().length >= 2){\n\n  <div class=\"page-container\">\n    <div\n      class=\"page\"\n      (click)=\"firstPage()\"\n      [ngClass]=\"{ disabled: 1 === page }\"\n    >\n      <svg\n        width=\"10\"\n        height=\"8\"\n        viewBox=\"0 0 10 8\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          fill-rule=\"evenodd\"\n          clip-rule=\"evenodd\"\n          d=\"M9.63255 7.81586C9.40287 8.05473 9.02305 8.06218 8.78418 7.8325L5.18418 4.4325C5.06653 4.31938 5.00005 4.16321 5.00005 4C5.00005 3.83679 5.06653 3.68062 5.18418 3.5675L8.78418 0.1675C9.02304 -0.0621766 9.40287 -0.0547285 9.63255 0.184134C9.86222 0.422997 9.85478 0.802823 9.61591 1.0325L6.46571 4L9.61591 6.9675C9.85478 7.19718 9.86222 7.577 9.63255 7.81586ZM4.83255 7.81586C4.60287 8.05473 4.22305 8.06218 3.98418 7.8325L0.384182 4.4325C0.266534 4.31938 0.200047 4.16321 0.200047 4C0.200047 3.83679 0.266534 3.68062 0.384182 3.5675L3.98418 0.1675C4.22304 -0.0621762 4.60287 -0.0547281 4.83255 0.184134C5.06222 0.422997 5.05478 0.802823 4.81591 1.0325L1.66571 4L4.81591 6.9675C5.05478 7.19718 5.06222 7.577 4.83255 7.81586Z\"\n          fill=\"#595959\"\n        />\n      </svg>\n    </div>\n\n    <div class=\"page\" (click)=\"prevPage()\" [ngClass]=\"{ disabled: 1 === page }\">\n      <svg\n        width=\"16\"\n        height=\"17\"\n        viewBox=\"0 0 16 17\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M10 12.0728L6 8.07275L10 4.07275\"\n          stroke=\"#595959\"\n          stroke-width=\"1.25\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n    </div>\n\n    @for(item of totalPages(); track $index) {\n    <div\n      (click)=\"pageChange.emit({ page: $index + 1, pageSize: pageSize })\"\n      class=\"page\"\n      [ngClass]=\"{ active: $index + 1 === page }\"\n    >\n      {{ $index + 1 }}\n    </div>\n\n    }\n    <div\n      class=\"page\"\n      (click)=\"nextPage()\"\n      [ngClass]=\"{ disabled: totalPages().length === page }\"\n    >\n      <svg\n        width=\"17\"\n        height=\"17\"\n        viewBox=\"0 0 17 17\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M6.51001 12.0728L10.51 8.07275L6.51001 4.07275\"\n          stroke=\"#595959\"\n          stroke-width=\"1.25\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n    </div>\n\n    <div\n      class=\"page\"\n      (click)=\"lastPage()\"\n      [ngClass]=\"{ disabled: totalPages().length === page }\"\n    >\n      <svg\n        width=\"10\"\n        height=\"8\"\n        viewBox=\"0 0 10 8\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M0.384087 6.9675C0.145224 7.19718 0.137776 7.577 0.367452 7.81587C0.597128 8.05473 0.976954 8.06218 1.21582 7.8325L4.81582 4.4325C4.93347 4.31938 4.99995 4.16321 4.99995 4C4.99995 3.83679 4.93347 3.68062 4.81582 3.5675L1.21582 0.167501C0.976954 -0.0621752 0.597128 -0.0547274 0.367452 0.184135C0.137776 0.422999 0.145224 0.802824 0.384087 1.0325L3.53429 4L0.384087 6.9675Z\"\n          fill=\"#595959\"\n        />\n        <path\n          d=\"M5.18409 6.9675C4.94522 7.19718 4.93778 7.577 5.16745 7.81587C5.39713 8.05473 5.77695 8.06218 6.01582 7.8325L9.61582 4.4325C9.73347 4.31938 9.79995 4.16321 9.79995 4C9.79995 3.83679 9.73347 3.68062 9.61582 3.5675L6.01582 0.167501C5.77695 -0.0621752 5.39713 -0.0547274 5.16745 0.184135C4.93778 0.422999 4.94522 0.802824 5.18409 1.0325L8.33429 4L5.18409 6.9675Z\"\n          fill=\"#595959\"\n        />\n      </svg>\n    </div>\n\n    <div class=\"pageSize\">\n      <select class=\"pageSizeSelect\" (change)=\"onPageSizeChange($event)\">\n        @for(option of pageSizeOptions; track option){\n        <option [value]=\"option\">{{ option }} Items / Page</option>\n        }\n      </select>\n    </div>\n  </div>\n  }\n</div>\n", styles: [".pagination{display:flex;justify-content:space-between;align-items:center;width:100%;max-height:50px;margin:5px 0;padding:0 10px 0 0}.totalCount{font-size:.875em;color:#595959;font-weight:500}.page-container{display:flex;align-items:center;gap:.2em;max-height:50px}.page{width:2.4rem;height:2.4rem;max-width:2.4rem;max-height:2.4rem;border-radius:4px;border:1px solid rgba(217,217,217,1);color:#595959;font-size:.75em;font-weight:500;display:flex;justify-content:center;align-items:center;cursor:pointer}.page.active{border:1px solid #602450;background-color:#6024502e}.page.disabled{border:1px solid #d9d9d9;background-color:#f2f2f2;cursor:auto}.pageSizeSelect{height:2.4rem;border-radius:4px;border:1px solid rgba(217,217,217,1);color:#595959;font-size:.75em;font-weight:500;display:flex;justify-content:center;align-items:center;cursor:pointer;padding:0 5px}select:focus-visible{outline:none;border:1px solid rgba(217,217,217,1)}.pageSizeSelect:focus-visible{outline:none;border:1px solid rgba(217,217,217,1)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomPaginationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-pagination', standalone: true, imports: [CommonModule], template: "<div class=\"pagination\">\n  <p class=\"totalCount\" >A total of {{ totalCount }} data</p>\n  @if(totalPages().length >= 2){\n\n  <div class=\"page-container\">\n    <div\n      class=\"page\"\n      (click)=\"firstPage()\"\n      [ngClass]=\"{ disabled: 1 === page }\"\n    >\n      <svg\n        width=\"10\"\n        height=\"8\"\n        viewBox=\"0 0 10 8\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          fill-rule=\"evenodd\"\n          clip-rule=\"evenodd\"\n          d=\"M9.63255 7.81586C9.40287 8.05473 9.02305 8.06218 8.78418 7.8325L5.18418 4.4325C5.06653 4.31938 5.00005 4.16321 5.00005 4C5.00005 3.83679 5.06653 3.68062 5.18418 3.5675L8.78418 0.1675C9.02304 -0.0621766 9.40287 -0.0547285 9.63255 0.184134C9.86222 0.422997 9.85478 0.802823 9.61591 1.0325L6.46571 4L9.61591 6.9675C9.85478 7.19718 9.86222 7.577 9.63255 7.81586ZM4.83255 7.81586C4.60287 8.05473 4.22305 8.06218 3.98418 7.8325L0.384182 4.4325C0.266534 4.31938 0.200047 4.16321 0.200047 4C0.200047 3.83679 0.266534 3.68062 0.384182 3.5675L3.98418 0.1675C4.22304 -0.0621762 4.60287 -0.0547281 4.83255 0.184134C5.06222 0.422997 5.05478 0.802823 4.81591 1.0325L1.66571 4L4.81591 6.9675C5.05478 7.19718 5.06222 7.577 4.83255 7.81586Z\"\n          fill=\"#595959\"\n        />\n      </svg>\n    </div>\n\n    <div class=\"page\" (click)=\"prevPage()\" [ngClass]=\"{ disabled: 1 === page }\">\n      <svg\n        width=\"16\"\n        height=\"17\"\n        viewBox=\"0 0 16 17\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M10 12.0728L6 8.07275L10 4.07275\"\n          stroke=\"#595959\"\n          stroke-width=\"1.25\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n    </div>\n\n    @for(item of totalPages(); track $index) {\n    <div\n      (click)=\"pageChange.emit({ page: $index + 1, pageSize: pageSize })\"\n      class=\"page\"\n      [ngClass]=\"{ active: $index + 1 === page }\"\n    >\n      {{ $index + 1 }}\n    </div>\n\n    }\n    <div\n      class=\"page\"\n      (click)=\"nextPage()\"\n      [ngClass]=\"{ disabled: totalPages().length === page }\"\n    >\n      <svg\n        width=\"17\"\n        height=\"17\"\n        viewBox=\"0 0 17 17\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M6.51001 12.0728L10.51 8.07275L6.51001 4.07275\"\n          stroke=\"#595959\"\n          stroke-width=\"1.25\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n    </div>\n\n    <div\n      class=\"page\"\n      (click)=\"lastPage()\"\n      [ngClass]=\"{ disabled: totalPages().length === page }\"\n    >\n      <svg\n        width=\"10\"\n        height=\"8\"\n        viewBox=\"0 0 10 8\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M0.384087 6.9675C0.145224 7.19718 0.137776 7.577 0.367452 7.81587C0.597128 8.05473 0.976954 8.06218 1.21582 7.8325L4.81582 4.4325C4.93347 4.31938 4.99995 4.16321 4.99995 4C4.99995 3.83679 4.93347 3.68062 4.81582 3.5675L1.21582 0.167501C0.976954 -0.0621752 0.597128 -0.0547274 0.367452 0.184135C0.137776 0.422999 0.145224 0.802824 0.384087 1.0325L3.53429 4L0.384087 6.9675Z\"\n          fill=\"#595959\"\n        />\n        <path\n          d=\"M5.18409 6.9675C4.94522 7.19718 4.93778 7.577 5.16745 7.81587C5.39713 8.05473 5.77695 8.06218 6.01582 7.8325L9.61582 4.4325C9.73347 4.31938 9.79995 4.16321 9.79995 4C9.79995 3.83679 9.73347 3.68062 9.61582 3.5675L6.01582 0.167501C5.77695 -0.0621752 5.39713 -0.0547274 5.16745 0.184135C4.93778 0.422999 4.94522 0.802824 5.18409 1.0325L8.33429 4L5.18409 6.9675Z\"\n          fill=\"#595959\"\n        />\n      </svg>\n    </div>\n\n    <div class=\"pageSize\">\n      <select class=\"pageSizeSelect\" (change)=\"onPageSizeChange($event)\">\n        @for(option of pageSizeOptions; track option){\n        <option [value]=\"option\">{{ option }} Items / Page</option>\n        }\n      </select>\n    </div>\n  </div>\n  }\n</div>\n", styles: [".pagination{display:flex;justify-content:space-between;align-items:center;width:100%;max-height:50px;margin:5px 0;padding:0 10px 0 0}.totalCount{font-size:.875em;color:#595959;font-weight:500}.page-container{display:flex;align-items:center;gap:.2em;max-height:50px}.page{width:2.4rem;height:2.4rem;max-width:2.4rem;max-height:2.4rem;border-radius:4px;border:1px solid rgba(217,217,217,1);color:#595959;font-size:.75em;font-weight:500;display:flex;justify-content:center;align-items:center;cursor:pointer}.page.active{border:1px solid #602450;background-color:#6024502e}.page.disabled{border:1px solid #d9d9d9;background-color:#f2f2f2;cursor:auto}.pageSizeSelect{height:2.4rem;border-radius:4px;border:1px solid rgba(217,217,217,1);color:#595959;font-size:.75em;font-weight:500;display:flex;justify-content:center;align-items:center;cursor:pointer;padding:0 5px}select:focus-visible{outline:none;border:1px solid rgba(217,217,217,1)}.pageSizeSelect:focus-visible{outline:none;border:1px solid rgba(217,217,217,1)}\n"] }]
        }], propDecorators: { page: [{
                type: Input,
                args: [{ required: true }]
            }], pageSize: [{
                type: Input
            }], totalCount: [{
                type: Input,
                args: [{ required: true }]
            }], pageChange: [{
                type: Output
            }], baseValue: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomPopUpComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomPopUpComponent, isStandalone: true, selector: "custom-pop-up", inputs: { popUpClass: "popUpClass", message: "message", icon: "icon", overlayClass: "overlayClass", messageClass: "messageClass", iconClass: "iconClass", isOpen: "isOpen" }, outputs: { onHide: "onHide" }, ngImport: i0, template: "@if(isOpen){\n<div [class]=\"'overlay ' + overlayClass\">\n  <div\n    [class]=\"'custom-pop-up-container ' + popUpClass\"\n    #popUp\n    [clickOutside]=\"popUp\"\n    (clickOutsideEmitter)=\"onHide.emit()\"\n  >\n    <img [src]=\"icon\" [class]=\"iconClass\" alt=\"\" />\n    <p [class]=\"'message ' + messageClass\">{{ message }}</p>\n    <ng-content></ng-content>\n  </div>\n</div>\n}\n", styles: [".overlay{position:fixed;inset:0;background-color:#000000b3;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:50;cursor:pointer}.custom-pop-up-container{width:38rem;border-radius:1rem;padding:5rem;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2rem}.message{font-size:1.2rem;color:#fff;font-weight:500;text-align:center}\n"], dependencies: [{ kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomPopUpComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-pop-up', standalone: true, imports: [ClickOutsideDirective], template: "@if(isOpen){\n<div [class]=\"'overlay ' + overlayClass\">\n  <div\n    [class]=\"'custom-pop-up-container ' + popUpClass\"\n    #popUp\n    [clickOutside]=\"popUp\"\n    (clickOutsideEmitter)=\"onHide.emit()\"\n  >\n    <img [src]=\"icon\" [class]=\"iconClass\" alt=\"\" />\n    <p [class]=\"'message ' + messageClass\">{{ message }}</p>\n    <ng-content></ng-content>\n  </div>\n</div>\n}\n", styles: [".overlay{position:fixed;inset:0;background-color:#000000b3;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:50;cursor:pointer}.custom-pop-up-container{width:38rem;border-radius:1rem;padding:5rem;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2rem}.message{font-size:1.2rem;color:#fff;font-weight:500;text-align:center}\n"] }]
        }], propDecorators: { popUpClass: [{
                type: Input,
                args: [{ required: true }]
            }], message: [{
                type: Input,
                args: [{ required: true }]
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

const sortSvg$1 = '<svg width="10" height="15" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.4"><path d="M1.53516 11.4792L5.6671 15.6112L9.79905 11.4792" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.53516 6.52086L5.6671 2.38892L9.79905 6.52086" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></g></svg>';
const actionViewSvg$1 = '<svg width="auto" height="15" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0001 0.75C14.9429 0.75 19.055 4.30645 19.9172 9C19.055 13.6935 14.9429 17.25 10.0001 17.25C5.05728 17.25 0.945142 13.6935 0.0830078 9C0.945142 4.30645 5.05728 0.75 10.0001 0.75ZM10.0001 15.4167C13.8827 15.4167 17.2051 12.7143 18.0461 9C17.2051 5.28569 13.8827 2.58333 10.0001 2.58333C6.11739 2.58333 2.79504 5.28569 1.95405 9C2.79504 12.7143 6.11739 15.4167 10.0001 15.4167ZM10.0001 13.125C7.7219 13.125 5.87508 11.2782 5.87508 9C5.87508 6.72183 7.7219 4.875 10.0001 4.875C12.2782 4.875 14.1251 6.72183 14.1251 9C14.1251 11.2782 12.2782 13.125 10.0001 13.125ZM10.0001 11.2917C11.2658 11.2917 12.2918 10.2656 12.2918 9C12.2918 7.73436 11.2658 6.70833 10.0001 6.70833C8.73447 6.70833 7.70841 7.73436 7.70841 9C7.70841 10.2656 8.73447 11.2917 10.0001 11.2917Z" fill="#25C7BC"/></svg>';
const actionEditSvg$1 = '<svg width="auto" height="15" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M13.6745 12.0231L14.7622 10.9354C14.9321 10.7654 15.2278 10.8844 15.2278 11.1291V16.0713C15.2278 16.9721 14.497 17.7029 13.5963 17.7029H1.63155C0.7308 17.7029 0 16.9721 0 16.0713V4.10663C0 3.20587 0.7308 2.47507 1.63155 2.47507H10.928C11.1693 2.47507 11.2917 2.76739 11.1218 2.94074L10.0341 4.02845C9.98307 4.07943 9.91508 4.10663 9.8403 4.10663H1.63155V16.0713H13.5963V12.2134C13.5963 12.142 13.6235 12.074 13.6745 12.0231ZM18.9974 5.16374L10.0714 14.0897L6.99868 14.4296C6.10813 14.5282 5.35013 13.777 5.44871 12.8796L5.78861 9.80686L14.7146 0.880909C15.493 0.102522 16.7506 0.102522 17.5256 0.880909L18.994 2.34931C19.7724 3.12769 19.7724 4.38875 18.9974 5.16374ZM15.6391 6.21405L13.6643 4.23919L7.34879 10.5581L7.10065 12.7777L9.32025 12.5295L15.6391 6.21405ZM17.8417 3.50499L16.3733 2.03659C16.234 1.89723 16.0062 1.89723 15.8703 2.03659L14.8199 3.0869L16.7948 5.06176L17.8451 4.01145C17.9811 3.86869 17.9811 3.64435 17.8417 3.50499Z" fill="#444A6D"/></g></svg>';
const actionDeleteSvg$1 = '<svg width="auto" height="15" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8955_16606)"><path d="M15.0485 1.32129L1.69141 14.6784" stroke="#F43F5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.69141 1.32129L15.0485 14.6784" stroke="#F43F5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_8955_16606"><rect width="15.5833" height="15.5833" fill="white" transform="translate(0.578125 0.208252)"/></clipPath></defs></svg>';

class CustomTableComponent {
    sanitizer;
    path = '../../../../src/public/gear-icon.png';
    tableData;
    tableCategories;
    tableHeader;
    showStatusColumn;
    showActionColumn;
    statusCol = {
        header: 'status',
        trueValue: true,
        trueText: 'Active',
        falseText: 'InActive',
        sort: false,
    };
    rowClass = '';
    headerClass = '';
    templates = {};
    enableEdit = true;
    enableDelete = true;
    enableView = true;
    onEdit = new EventEmitter();
    onView = new EventEmitter();
    onDelete = new EventEmitter();
    onRowClick = new EventEmitter();
    sortColumn = new EventEmitter();
    checkedSortIcon;
    checkedActionViewSvg;
    checkedActionEditSvg;
    checkedActionDeleteSvg;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        const sortSvgIcon = sortSvg$1;
        this.checkedSortIcon = this.sanitizer.bypassSecurityTrustHtml(sortSvgIcon);
        const ActionView = actionViewSvg$1;
        this.checkedActionViewSvg =
            this.sanitizer.bypassSecurityTrustHtml(ActionView);
        const ActionEdit = actionEditSvg$1;
        this.checkedActionEditSvg =
            this.sanitizer.bypassSecurityTrustHtml(ActionEdit);
        const ActionDelete = actionDeleteSvg$1;
        this.checkedActionDeleteSvg =
            this.sanitizer.bypassSecurityTrustHtml(ActionDelete);
    }
    ngOnInit() {
        if (!this.tableHeader) {
            throw new Error('tableHeader input is required.');
        }
        if (!this.tableData && !this.tableCategories) {
            throw new Error('You need to log tableCategories or tableData');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomTableComponent, deps: [{ token: i1$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomTableComponent, isStandalone: true, selector: "custom-table", inputs: { tableData: "tableData", tableCategories: "tableCategories", tableHeader: "tableHeader", showStatusColumn: "showStatusColumn", showActionColumn: "showActionColumn", statusCol: "statusCol", rowClass: "rowClass", headerClass: "headerClass", templates: "templates", enableEdit: "enableEdit", enableDelete: "enableDelete", enableView: "enableView" }, outputs: { onEdit: "onEdit", onView: "onView", onDelete: "onDelete", onRowClick: "onRowClick", sortColumn: "sortColumn" }, ngImport: i0, template: "<table class=\"striped-table\">\n  <thead [class]=\"headerClass\">\n    <tr>\n      @for(item of tableHeader; track $index) {\n      <th>\n        <div class=\"table-header-cell\">\n          {{ item.header }} @if(item.sort){\n          <div\n            [innerHTML]=\"checkedSortIcon\"\n            class=\"sort-icon\"\n            (click)=\"sortColumn.emit(item.body)\"\n          ></div>\n          }\n        </div>\n      </th>\n      } @if(showStatusColumn) {\n      <th>\n        <div class=\"table-header-cell\">\n          Status @if(statusCol.sort){\n          <div\n            [innerHTML]=\"checkedSortIcon\"\n            class=\"step-completed steppers-container__step--circle\"\n            (click)=\"sortColumn.emit('status')\"\n          ></div>\n\n          }\n        </div>\n      </th>\n      } @if(showActionColumn) {\n      <th>Actions</th>\n      }\n    </tr>\n  </thead>\n  <tbody>\n    @for(item of tableData; track $index) {\n    <tr (click)=\"onRowClick.emit(item)\" [class]=\"rowClass\">\n      @for(col of tableHeader; track $index) { @if(col.htmlRef) {\n      <td>\n        <ng-template\n          *ngTemplateOutlet=\"col.htmlRef; context: { $implicit: item }\"\n        ></ng-template>\n      </td>\n      } @else if (col.inputTransform) {\n      <td>{{ col.inputTransform(item) }}</td>\n      } @else if(col.body) {\n      <td>{{ item[col.body] }}</td>\n      } } @if(showStatusColumn) {\n      <td class=\"status-td\" data-label=\"Status\">\n        <div class=\"status\">\n          @if(item[statusCol.header] === statusCol.trueValue) {\n          <div class=\"true\">{{ statusCol.trueText }}</div>\n          } @else {\n          <div class=\"false\">{{ statusCol.falseText }}</div>\n          }\n        </div>\n      </td>\n      } @if(showActionColumn) {\n      <td>\n        <div\n          style=\"\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            gap: 10px;\n            height: 1.2em;\n          \"\n        >\n          @if(enableView){\n          <div\n            style=\"cursor: pointer\"\n            (click)=\"$event.stopPropagation(); onView.emit(item)\"\n            [innerHTML]=\"checkedActionViewSvg\"\n          ></div>\n          } @if(enableEdit){\n          <div\n            style=\"cursor: pointer\"\n            (click)=\"$event.stopPropagation(); onEdit.emit(item)\"\n            [innerHTML]=\"checkedActionEditSvg\"\n          ></div>\n\n          } @if(enableDelete){\n          <div\n            style=\"cursor: pointer\"\n            (click)=\"$event.stopPropagation(); onDelete.emit(item)\"\n            [innerHTML]=\"checkedActionDeleteSvg\"\n          ></div>\n          }\n        </div>\n      </td>\n      }\n    </tr>\n    }\n  </tbody>\n</table>\n<!-- <tr (click)=\"onRowClick.emit(item)\" [class]=\"rowClass\">\n      @for(col of tableHeader; track $index) { @if(col.htmlRef) {\n      <td>\n        <ng-container\n          *ngTemplateOutlet=\"col.htmlRef; context: { $implicit: item }\"\n        ></ng-container>\n      </td>\n      }@else if(col.body) { @if(showStatusColumn) {\n      <td data-label=\"Status\">\n        @if(item[statusCol.header] === statusCol.trueValue) {\n        <div class=\"true\">{{ statusCol.trueText }}</div>\n        } @else {\n        <div class=\"false\">{{ statusCol.falseText }}</div>\n        }\n      </td>\n      } @else{\n      <!-- <td>{{ item[col.body] }}</td> --/>\n      } }\n      <!-- <td>\n        <ng-container\n          *ngTemplateOutlet=\"\n            templates[col.htmlRef];\n            context: { $implicit: item }\n          \"\n        ></ng-container>\n      </td> -->\n\n<!-- @else if(col.body) {\n        <td>{{ item[col.body] }}</td>\n        }  --/>\n      }\n      <!-- @if(showActionColumn) {\n      <td>\n        <div\n          style=\"\n            display: flex;\n            justify-content: start;\n            align-items: center;\n            gap: 10px;\n            cursor: pointer;\n          \"\n        >\n          @if(enableView){\n\n          <svg\n            (click)=\"$event.stopPropagation(); onView.emit()\"\n            width=\"21\"\n            height=\"18\"\n            viewBox=\"0 0 21 18\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M10.8336 0.75C15.7764 0.75 19.8885 4.30645 20.7507 9C19.8885 13.6935 15.7764 17.25 10.8336 17.25C5.89078 17.25 1.77864 13.6935 0.916504 9C1.77864 4.30645 5.89078 0.75 10.8336 0.75ZM10.8336 15.4167C14.7162 15.4167 18.0386 12.7143 18.8796 9C18.0386 5.28569 14.7162 2.58333 10.8336 2.58333C6.95088 2.58333 3.62854 5.28569 2.78755 9C3.62854 12.7143 6.95088 15.4167 10.8336 15.4167ZM10.8336 13.125C8.5554 13.125 6.70857 11.2782 6.70857 9C6.70857 6.72183 8.5554 4.875 10.8336 4.875C13.1117 4.875 14.9586 6.72183 14.9586 9C14.9586 11.2782 13.1117 13.125 10.8336 13.125ZM10.8336 11.2917C12.0993 11.2917 13.1253 10.2656 13.1253 9C13.1253 7.73436 12.0993 6.70833 10.8336 6.70833C9.56797 6.70833 8.54191 7.73436 8.54191 9C8.54191 10.2656 9.56797 11.2917 10.8336 11.2917Z\"\n              fill=\"#25C7BC\"\n            />\n          </svg>\n          } @if(enableEdit){\n\n          <svg\n            (click)=\"$event.stopPropagation(); onEdit.emit()\"\n            width=\"20\"\n            height=\"19\"\n            viewBox=\"0 0 20 19\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M14.0631 12.6426L15.1508 11.5549C15.3208 11.3849 15.6165 11.5039 15.6165 11.7486V16.6909C15.6165 17.5916 14.8857 18.3224 13.9849 18.3224H2.02022C1.11947 18.3224 0.388672 17.5916 0.388672 16.6909V4.72616C0.388672 3.82541 1.11947 3.09461 2.02022 3.09461H11.3167C11.558 3.09461 11.6804 3.38693 11.5104 3.56028L10.4227 4.64798C10.3717 4.69897 10.3038 4.72616 10.229 4.72616H2.02022V16.6909H13.9849V12.8329C13.9849 12.7616 14.0121 12.6936 14.0631 12.6426ZM19.3861 5.78327L10.4601 14.7092L7.38735 15.0491C6.4968 15.1477 5.73881 14.3965 5.83738 13.4992L6.17729 10.4264L15.1032 1.50045C15.8816 0.72206 17.1393 0.72206 17.9143 1.50045L19.3827 2.96884C20.1611 3.74723 20.1611 5.00829 19.3861 5.78327ZM16.0278 6.83359L14.0529 4.85873L7.73746 11.1776L7.48933 13.3972L9.70892 13.1491L16.0278 6.83359ZM18.2304 4.12453L16.762 2.65613C16.6226 2.51677 16.3949 2.51677 16.2589 2.65613L15.2086 3.70644L17.1835 5.6813L18.2338 4.63099C18.3697 4.48823 18.3697 4.26389 18.2304 4.12453Z\"\n              fill=\"#444A6D\"\n            />\n          </svg>\n          } @if(enableDelete){\n          <svg\n            (click)=\"$event.stopPropagation(); onDelete.emit()\"\n            width=\"17\"\n            height=\"17\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1766)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#F43F5E\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#F43F5E\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1766\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n          }\n        </div>\n      </td>\n      } --/>\n    </tr> -->\n", styles: [".category-section{background-color:#f4f6fb}.category-header{padding:0;border-left:5px solid #25c7bc}.table-header-cell{display:flex;flex-direction:row;justify-content:flex-start;gap:.5em;align-items:center}.sort-icon{height:1.5em;display:flex;align-items:center;justify-content:center;overflow:auto;cursor:pointer}.category-header-wrapper{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;font-weight:700;background-color:#f4f6fb}.category-title{font-size:16px;color:#1a1a1a}.toggle-button{background:none;border:none;color:#25c7bc;cursor:pointer;font-weight:600}.category-item-row{background-color:#fff}.actions{display:flex;justify-content:start;align-items:center;gap:10px;cursor:pointer}.status-td{padding:.1em .4em!important}.status{height:100%;display:flex;justify-content:center;align-items:center}.status div{display:flex;justify-content:center;align-items:center;padding:.25em 0;border:0px solid transparent;border-radius:1em;width:6em}.true{color:#0d7d0b;background-color:#c8ffc7}.false{color:#d2344f;background-color:#ffe0e5}.striped-table{width:100%;overflow:hidden;background-color:#fff}.striped-table thead{color:#4b4b4b;text-align:left;border-bottom:2px solid #eeeeee;font-size:.85em}.striped-table th{padding:10px;border:1px solid #eeeeee}.striped-table tbody tr{font-weight:500;font-size:.72em}.striped-table td{padding:.8em .5em;color:#4b4b4b;border:1px solid #eeeeee}.striped-table tbody tr td:first-child{background-color:#fcfbfb}@media (max-width: 768px){.striped-table{display:block}.striped-table thead{display:none}.striped-table tbody tr{display:block;margin-bottom:15px;border-radius:8px;box-shadow:0 2px 8px #0000001a}.striped-table td{display:block;text-align:right;padding-left:50%;position:relative;border:1px solid #e0e0e0}.striped-table td:before{content:attr(data-label);position:absolute;left:15px;width:45%;padding-right:10px;font-weight:600;text-align:left;color:#4a6fa5}}.active{background-color:#c8ffc7;width:85px;height:28px;border-radius:100px;display:flex;justify-self:center;align-items:center;font-size:.67em;font-weight:500;color:#0d7d0b;text-align:center}.inactive{background-color:#ffe0e5;width:85px;height:28px;border-radius:100px;display:flex;justify-content:center;align-items:center;font-size:.67em;font-weight:500;color:#d2344f;text-align:center}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-table', standalone: true, imports: [CommonModule], template: "<table class=\"striped-table\">\n  <thead [class]=\"headerClass\">\n    <tr>\n      @for(item of tableHeader; track $index) {\n      <th>\n        <div class=\"table-header-cell\">\n          {{ item.header }} @if(item.sort){\n          <div\n            [innerHTML]=\"checkedSortIcon\"\n            class=\"sort-icon\"\n            (click)=\"sortColumn.emit(item.body)\"\n          ></div>\n          }\n        </div>\n      </th>\n      } @if(showStatusColumn) {\n      <th>\n        <div class=\"table-header-cell\">\n          Status @if(statusCol.sort){\n          <div\n            [innerHTML]=\"checkedSortIcon\"\n            class=\"step-completed steppers-container__step--circle\"\n            (click)=\"sortColumn.emit('status')\"\n          ></div>\n\n          }\n        </div>\n      </th>\n      } @if(showActionColumn) {\n      <th>Actions</th>\n      }\n    </tr>\n  </thead>\n  <tbody>\n    @for(item of tableData; track $index) {\n    <tr (click)=\"onRowClick.emit(item)\" [class]=\"rowClass\">\n      @for(col of tableHeader; track $index) { @if(col.htmlRef) {\n      <td>\n        <ng-template\n          *ngTemplateOutlet=\"col.htmlRef; context: { $implicit: item }\"\n        ></ng-template>\n      </td>\n      } @else if (col.inputTransform) {\n      <td>{{ col.inputTransform(item) }}</td>\n      } @else if(col.body) {\n      <td>{{ item[col.body] }}</td>\n      } } @if(showStatusColumn) {\n      <td class=\"status-td\" data-label=\"Status\">\n        <div class=\"status\">\n          @if(item[statusCol.header] === statusCol.trueValue) {\n          <div class=\"true\">{{ statusCol.trueText }}</div>\n          } @else {\n          <div class=\"false\">{{ statusCol.falseText }}</div>\n          }\n        </div>\n      </td>\n      } @if(showActionColumn) {\n      <td>\n        <div\n          style=\"\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            gap: 10px;\n            height: 1.2em;\n          \"\n        >\n          @if(enableView){\n          <div\n            style=\"cursor: pointer\"\n            (click)=\"$event.stopPropagation(); onView.emit(item)\"\n            [innerHTML]=\"checkedActionViewSvg\"\n          ></div>\n          } @if(enableEdit){\n          <div\n            style=\"cursor: pointer\"\n            (click)=\"$event.stopPropagation(); onEdit.emit(item)\"\n            [innerHTML]=\"checkedActionEditSvg\"\n          ></div>\n\n          } @if(enableDelete){\n          <div\n            style=\"cursor: pointer\"\n            (click)=\"$event.stopPropagation(); onDelete.emit(item)\"\n            [innerHTML]=\"checkedActionDeleteSvg\"\n          ></div>\n          }\n        </div>\n      </td>\n      }\n    </tr>\n    }\n  </tbody>\n</table>\n<!-- <tr (click)=\"onRowClick.emit(item)\" [class]=\"rowClass\">\n      @for(col of tableHeader; track $index) { @if(col.htmlRef) {\n      <td>\n        <ng-container\n          *ngTemplateOutlet=\"col.htmlRef; context: { $implicit: item }\"\n        ></ng-container>\n      </td>\n      }@else if(col.body) { @if(showStatusColumn) {\n      <td data-label=\"Status\">\n        @if(item[statusCol.header] === statusCol.trueValue) {\n        <div class=\"true\">{{ statusCol.trueText }}</div>\n        } @else {\n        <div class=\"false\">{{ statusCol.falseText }}</div>\n        }\n      </td>\n      } @else{\n      <!-- <td>{{ item[col.body] }}</td> --/>\n      } }\n      <!-- <td>\n        <ng-container\n          *ngTemplateOutlet=\"\n            templates[col.htmlRef];\n            context: { $implicit: item }\n          \"\n        ></ng-container>\n      </td> -->\n\n<!-- @else if(col.body) {\n        <td>{{ item[col.body] }}</td>\n        }  --/>\n      }\n      <!-- @if(showActionColumn) {\n      <td>\n        <div\n          style=\"\n            display: flex;\n            justify-content: start;\n            align-items: center;\n            gap: 10px;\n            cursor: pointer;\n          \"\n        >\n          @if(enableView){\n\n          <svg\n            (click)=\"$event.stopPropagation(); onView.emit()\"\n            width=\"21\"\n            height=\"18\"\n            viewBox=\"0 0 21 18\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M10.8336 0.75C15.7764 0.75 19.8885 4.30645 20.7507 9C19.8885 13.6935 15.7764 17.25 10.8336 17.25C5.89078 17.25 1.77864 13.6935 0.916504 9C1.77864 4.30645 5.89078 0.75 10.8336 0.75ZM10.8336 15.4167C14.7162 15.4167 18.0386 12.7143 18.8796 9C18.0386 5.28569 14.7162 2.58333 10.8336 2.58333C6.95088 2.58333 3.62854 5.28569 2.78755 9C3.62854 12.7143 6.95088 15.4167 10.8336 15.4167ZM10.8336 13.125C8.5554 13.125 6.70857 11.2782 6.70857 9C6.70857 6.72183 8.5554 4.875 10.8336 4.875C13.1117 4.875 14.9586 6.72183 14.9586 9C14.9586 11.2782 13.1117 13.125 10.8336 13.125ZM10.8336 11.2917C12.0993 11.2917 13.1253 10.2656 13.1253 9C13.1253 7.73436 12.0993 6.70833 10.8336 6.70833C9.56797 6.70833 8.54191 7.73436 8.54191 9C8.54191 10.2656 9.56797 11.2917 10.8336 11.2917Z\"\n              fill=\"#25C7BC\"\n            />\n          </svg>\n          } @if(enableEdit){\n\n          <svg\n            (click)=\"$event.stopPropagation(); onEdit.emit()\"\n            width=\"20\"\n            height=\"19\"\n            viewBox=\"0 0 20 19\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M14.0631 12.6426L15.1508 11.5549C15.3208 11.3849 15.6165 11.5039 15.6165 11.7486V16.6909C15.6165 17.5916 14.8857 18.3224 13.9849 18.3224H2.02022C1.11947 18.3224 0.388672 17.5916 0.388672 16.6909V4.72616C0.388672 3.82541 1.11947 3.09461 2.02022 3.09461H11.3167C11.558 3.09461 11.6804 3.38693 11.5104 3.56028L10.4227 4.64798C10.3717 4.69897 10.3038 4.72616 10.229 4.72616H2.02022V16.6909H13.9849V12.8329C13.9849 12.7616 14.0121 12.6936 14.0631 12.6426ZM19.3861 5.78327L10.4601 14.7092L7.38735 15.0491C6.4968 15.1477 5.73881 14.3965 5.83738 13.4992L6.17729 10.4264L15.1032 1.50045C15.8816 0.72206 17.1393 0.72206 17.9143 1.50045L19.3827 2.96884C20.1611 3.74723 20.1611 5.00829 19.3861 5.78327ZM16.0278 6.83359L14.0529 4.85873L7.73746 11.1776L7.48933 13.3972L9.70892 13.1491L16.0278 6.83359ZM18.2304 4.12453L16.762 2.65613C16.6226 2.51677 16.3949 2.51677 16.2589 2.65613L15.2086 3.70644L17.1835 5.6813L18.2338 4.63099C18.3697 4.48823 18.3697 4.26389 18.2304 4.12453Z\"\n              fill=\"#444A6D\"\n            />\n          </svg>\n          } @if(enableDelete){\n          <svg\n            (click)=\"$event.stopPropagation(); onDelete.emit()\"\n            width=\"17\"\n            height=\"17\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1766)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#F43F5E\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#F43F5E\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1766\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n          }\n        </div>\n      </td>\n      } --/>\n    </tr> -->\n", styles: [".category-section{background-color:#f4f6fb}.category-header{padding:0;border-left:5px solid #25c7bc}.table-header-cell{display:flex;flex-direction:row;justify-content:flex-start;gap:.5em;align-items:center}.sort-icon{height:1.5em;display:flex;align-items:center;justify-content:center;overflow:auto;cursor:pointer}.category-header-wrapper{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;font-weight:700;background-color:#f4f6fb}.category-title{font-size:16px;color:#1a1a1a}.toggle-button{background:none;border:none;color:#25c7bc;cursor:pointer;font-weight:600}.category-item-row{background-color:#fff}.actions{display:flex;justify-content:start;align-items:center;gap:10px;cursor:pointer}.status-td{padding:.1em .4em!important}.status{height:100%;display:flex;justify-content:center;align-items:center}.status div{display:flex;justify-content:center;align-items:center;padding:.25em 0;border:0px solid transparent;border-radius:1em;width:6em}.true{color:#0d7d0b;background-color:#c8ffc7}.false{color:#d2344f;background-color:#ffe0e5}.striped-table{width:100%;overflow:hidden;background-color:#fff}.striped-table thead{color:#4b4b4b;text-align:left;border-bottom:2px solid #eeeeee;font-size:.85em}.striped-table th{padding:10px;border:1px solid #eeeeee}.striped-table tbody tr{font-weight:500;font-size:.72em}.striped-table td{padding:.8em .5em;color:#4b4b4b;border:1px solid #eeeeee}.striped-table tbody tr td:first-child{background-color:#fcfbfb}@media (max-width: 768px){.striped-table{display:block}.striped-table thead{display:none}.striped-table tbody tr{display:block;margin-bottom:15px;border-radius:8px;box-shadow:0 2px 8px #0000001a}.striped-table td{display:block;text-align:right;padding-left:50%;position:relative;border:1px solid #e0e0e0}.striped-table td:before{content:attr(data-label);position:absolute;left:15px;width:45%;padding-right:10px;font-weight:600;text-align:left;color:#4a6fa5}}.active{background-color:#c8ffc7;width:85px;height:28px;border-radius:100px;display:flex;justify-self:center;align-items:center;font-size:.67em;font-weight:500;color:#0d7d0b;text-align:center}.inactive{background-color:#ffe0e5;width:85px;height:28px;border-radius:100px;display:flex;justify-content:center;align-items:center;font-size:.67em;font-weight:500;color:#d2344f;text-align:center}\n"] }]
        }], ctorParameters: () => [{ type: i1$2.DomSanitizer }], propDecorators: { tableData: [{
                type: Input,
                args: [{ required: false }]
            }], tableCategories: [{
                type: Input,
                args: [{ required: false }]
            }], tableHeader: [{
                type: Input,
                args: [{ required: true }]
            }], showStatusColumn: [{
                type: Input,
                args: [{ required: true }]
            }], showActionColumn: [{
                type: Input,
                args: [{ required: true }]
            }], statusCol: [{
                type: Input
            }], rowClass: [{
                type: Input
            }], headerClass: [{
                type: Input
            }], templates: [{
                type: Input
            }], enableEdit: [{
                type: Input
            }], enableDelete: [{
                type: Input
            }], enableView: [{
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
            }] } });

class CustomTextareaComponent {
    class = '';
    labelClass = '';
    label = '';
    placeholder = '';
    name = '';
    value;
    valueChange = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomTextareaComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomTextareaComponent, isStandalone: true, selector: "custom-textarea", inputs: { class: "class", labelClass: "labelClass", label: "label", placeholder: "placeholder", name: "name", value: "value" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div style=\"width: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n  <textarea\n    [id]=\"label\"\n    [name]=\"name\"\n    [placeholder]=\"placeholder\"\n    [class]=\"'custom-textarea ' + class\"\n    [(ngModel)]=\"value\"\n    (ngModelChange)=\"valueChange.emit($event)\"\n  ></textarea>\n</div>\n", styles: [".custom-textarea{width:100%;padding:12px;resize:vertical;border-radius:.375em;border:1px solid #82828233;padding-left:.5rem;padding-right:.5rem;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;min-height:4.5rem}.custom-label{font-size:1em;color:#707070;margin-bottom:.3em;font-weight:500}.custom-textarea::placeholder{color:#82828250;font-size:.95em;font-weight:400}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomTextareaComponent, decorators: [{
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
    containRequiredError() {
        return this.validation.some((error) => error.errorType.includes(ComponentFormErrorConstant.REQUIRED));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomTextareaFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomTextareaFormComponent, isStandalone: true, selector: "custom-textarea-form", inputs: { class: { classPropertyName: "class", publicName: "class", isSignal: false, isRequired: false, transformFunction: null }, labelClass: { classPropertyName: "labelClass", publicName: "labelClass", isSignal: false, isRequired: false, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: false, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: false, isRequired: false, transformFunction: null }, resizable: { classPropertyName: "resizable", publicName: "resizable", isSignal: true, isRequired: false, transformFunction: null }, customHeight: { classPropertyName: "customHeight", publicName: "customHeight", isSignal: true, isRequired: false, transformFunction: null }, name: { classPropertyName: "name", publicName: "name", isSignal: false, isRequired: true, transformFunction: null }, controlName: { classPropertyName: "controlName", publicName: "controlName", isSignal: false, isRequired: true, transformFunction: null }, parentForm: { classPropertyName: "parentForm", publicName: "parentForm", isSignal: false, isRequired: true, transformFunction: null }, validation: { classPropertyName: "validation", publicName: "validation", isSignal: false, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    } @else{\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n  <div\n    class=\"input-error-container\"\n    [class.has-error]=\"\n      parentForm.controls[controlName].invalid &&\n      parentForm.controls[controlName].touched\n    \"\n  >\n    <textarea\n      [ngStyle]=\"{ resize: resizable(), height: customHeight() }\"\n      [id]=\"label\"\n      [name]=\"name\"\n      [placeholder]=\"placeholder\"\n      [class]=\"'custom-textarea ' + class\"\n      [formControlName]=\"controlName\"\n      [class.input-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched\n      \"\n    >\n    </textarea>\n    @if( parentForm.controls[controlName].invalid &&\n    parentForm.controls[controlName].touched ){\n    <span class=\"input-error-icon\">\n      <svg\n        width=\"22\"\n        height=\"22\"\n        viewBox=\"0 0 22 22\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <g clip-path=\"url(#clip0_9085_34629)\">\n          <path\n            d=\"M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 7V11\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 15H11.01\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n        <defs>\n          <clipPath id=\"clip0_9085_34629\">\n            <rect width=\"22\" height=\"22\" fill=\"white\" />\n          </clipPath>\n        </defs>\n      </svg>\n    </span>\n    }\n  </div>\n\n  @if( parentForm.controls[controlName].invalid &&\n  parentForm.controls[controlName].touched ){\n  <div class=\"app-error-container\">\n    <custom-app-error\n      [control]=\"parentForm.controls[controlName]\"\n      [validation]=\"validation\"\n      [name]=\"name\"\n    />\n  </div>\n  }\n</div>\n", styles: [".custom-textarea{width:100%;padding:.6em;resize:vertical;border-radius:.375em;border:1px solid #82828233;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;min-height:4.5rem;transition:border-color .2s}.custom-textarea.input-error{border:1px solid #d70c0c;box-shadow:1px 0 6px #d70c0c26}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.custom-textarea::placeholder{color:#82828250;font-size:1em;font-weight:400}.input-error-container{position:relative}.custom-input.input-error{border:1px solid #d70c0c;box-shadow:1px 0 6px #d70c0c26}.input-error-icon{position:relative;left:calc(100% - 1.7em);top:-1.7em;transform:translateY(-50%);color:#d70c0c;font-size:1.5em;pointer-events:none}.app-error-container{position:relative;top:-1.5em;right:-.6em}\n"], dependencies: [{ kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name", "showErrors"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomTextareaFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-textarea-form', standalone: true, imports: [CustomAppErrorComponent, ReactiveFormsModule, NgStyle], template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    } @else{\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n  <div\n    class=\"input-error-container\"\n    [class.has-error]=\"\n      parentForm.controls[controlName].invalid &&\n      parentForm.controls[controlName].touched\n    \"\n  >\n    <textarea\n      [ngStyle]=\"{ resize: resizable(), height: customHeight() }\"\n      [id]=\"label\"\n      [name]=\"name\"\n      [placeholder]=\"placeholder\"\n      [class]=\"'custom-textarea ' + class\"\n      [formControlName]=\"controlName\"\n      [class.input-error]=\"\n        parentForm.controls[controlName].invalid &&\n        parentForm.controls[controlName].touched\n      \"\n    >\n    </textarea>\n    @if( parentForm.controls[controlName].invalid &&\n    parentForm.controls[controlName].touched ){\n    <span class=\"input-error-icon\">\n      <svg\n        width=\"22\"\n        height=\"22\"\n        viewBox=\"0 0 22 22\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <g clip-path=\"url(#clip0_9085_34629)\">\n          <path\n            d=\"M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 7V11\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 15H11.01\"\n            stroke=\"#EB0000\"\n            stroke-width=\"1.3\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n        <defs>\n          <clipPath id=\"clip0_9085_34629\">\n            <rect width=\"22\" height=\"22\" fill=\"white\" />\n          </clipPath>\n        </defs>\n      </svg>\n    </span>\n    }\n  </div>\n\n  @if( parentForm.controls[controlName].invalid &&\n  parentForm.controls[controlName].touched ){\n  <div class=\"app-error-container\">\n    <custom-app-error\n      [control]=\"parentForm.controls[controlName]\"\n      [validation]=\"validation\"\n      [name]=\"name\"\n    />\n  </div>\n  }\n</div>\n", styles: [".custom-textarea{width:100%;padding:.6em;resize:vertical;border-radius:.375em;border:1px solid #82828233;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;min-height:4.5rem;transition:border-color .2s}.custom-textarea.input-error{border:1px solid #d70c0c;box-shadow:1px 0 6px #d70c0c26}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.custom-textarea::placeholder{color:#82828250;font-size:1em;font-weight:400}.input-error-container{position:relative}.custom-input.input-error{border:1px solid #d70c0c;box-shadow:1px 0 6px #d70c0c26}.input-error-icon{position:relative;left:calc(100% - 1.7em);top:-1.7em;transform:translateY(-50%);color:#d70c0c;font-size:1.5em;pointer-events:none}.app-error-container{position:relative;top:-1.5em;right:-.6em}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomBreadcrumbComponent, deps: [{ token: i3.Router }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomBreadcrumbComponent, isStandalone: true, selector: "custom-breadcrumb", inputs: { breadcrumbItems: "breadcrumbItems" }, outputs: { breadcrumbItemClicked: "breadcrumbItemClicked" }, ngImport: i0, template: "<div class=\"breadcrumb\">\n  @for(item of breadcrumbItems ; track $index){\n\n  <p\n    [ngClass]=\"{\n    'first-item' : $index !== breadcrumbItems.length -1 ,\n    'last-item' : $index === breadcrumbItems.length -1 ,\n    }\"\n    (click)=\"breadcrumbItemClicked(item)\"\n  >\n    {{ item.label }}\n  </p>\n\n  @if( $index !== breadcrumbItems.length -1 ){\n  <svg\n    width=\"7\"\n    height=\"11\"\n    viewBox=\"0 0 7 11\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M0.327452 0.327391C0.652889 0.00195375 1.18053 0.00195375 1.50596 0.327391L6.0893 4.91072C6.41473 5.23616 6.41473 5.7638 6.0893 6.08923L1.50596 10.6726C1.18053 10.998 0.652889 10.998 0.327452 10.6726C0.00201478 10.3471 0.00201478 9.81949 0.327452 9.49406L4.32153 5.49998L0.327452 1.5059C0.00201478 1.18046 0.00201478 0.652828 0.327452 0.327391Z\"\n      fill=\"#25C7BC\"\n    />\n  </svg>\n\n  } }\n</div>\n", styles: [".first-item{font-weight:400;margin:0!important;cursor:pointer}.last-item{font-weight:700;margin:0!important;cursor:pointer}.breadcrumb{display:flex;align-items:center;list-style:none;padding:.5em 0;margin:0;font-size:1em;color:#1e202c;gap:.5em}\n"], dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomBreadcrumbComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-breadcrumb', imports: [NgClass], template: "<div class=\"breadcrumb\">\n  @for(item of breadcrumbItems ; track $index){\n\n  <p\n    [ngClass]=\"{\n    'first-item' : $index !== breadcrumbItems.length -1 ,\n    'last-item' : $index === breadcrumbItems.length -1 ,\n    }\"\n    (click)=\"breadcrumbItemClicked(item)\"\n  >\n    {{ item.label }}\n  </p>\n\n  @if( $index !== breadcrumbItems.length -1 ){\n  <svg\n    width=\"7\"\n    height=\"11\"\n    viewBox=\"0 0 7 11\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M0.327452 0.327391C0.652889 0.00195375 1.18053 0.00195375 1.50596 0.327391L6.0893 4.91072C6.41473 5.23616 6.41473 5.7638 6.0893 6.08923L1.50596 10.6726C1.18053 10.998 0.652889 10.998 0.327452 10.6726C0.00201478 10.3471 0.00201478 9.81949 0.327452 9.49406L4.32153 5.49998L0.327452 1.5059C0.00201478 1.18046 0.00201478 0.652828 0.327452 0.327391Z\"\n      fill=\"#25C7BC\"\n    />\n  </svg>\n\n  } }\n</div>\n", styles: [".first-item{font-weight:400;margin:0!important;cursor:pointer}.last-item{font-weight:700;margin:0!important;cursor:pointer}.breadcrumb{display:flex;align-items:center;list-style:none;padding:.5em 0;margin:0;font-size:1em;color:#1e202c;gap:.5em}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomToggleSwitchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomToggleSwitchComponent, isStandalone: true, selector: "custom-toggle-switch", inputs: { value: "value", label: "label", labelPosition: "labelPosition", disabled: "disabled", size: "size", onColor: "onColor", offColor: "offColor", thumbColor: "thumbColor" }, outputs: { valueChange: "valueChange" }, host: { listeners: { "click": "toggle()" } }, ngImport: i0, template: "<div class=\"toggle-container\" [class.disabled]=\"disabled\">\n  @if(label && labelPosition === 'left') {\n  <span class=\"toggle-label left\">{{ label }}</span>\n  }\n\n  <div\n    class=\"toggle-switch\"\n    [class.active]=\"value\"\n    [class.small]=\"size === 'small'\"\n    [class.medium]=\"size === 'medium'\"\n    [class.large]=\"size === 'large'\"\n    [style.background-color]=\"value ? onColor : offColor\"\n  >\n    <div\n      class=\"toggle-thumb\"\n      [class.active]=\"value\"\n      [class.small]=\"size === 'small'\"\n      [class.medium]=\"size === 'medium'\"\n      [class.large]=\"size === 'large'\"\n      [style.background-color]=\"thumbColor\"\n    ></div>\n  </div>\n\n  @if(label && labelPosition === 'right') {\n  <span class=\"toggle-label right\">{{ label }}</span>\n  }\n</div>\n", styles: [".toggle-container{display:inline-flex;align-items:center;gap:12px;cursor:pointer;-webkit-tap-highlight-color:transparent}.toggle-label{font-family:Segoe UI,system-ui,sans-serif;font-size:14px;font-weight:500;color:#333;transition:color .2s ease}.toggle-label.left{order:1;margin-right:12px}.toggle-label.right{order:3;margin-left:12px}.toggle-switch{order:2;position:relative;display:inline-block;border-radius:16px;transition:all .3s cubic-bezier(.34,1.56,.64,1);box-shadow:inset 0 1px 3px #0000001a;background-color:#e0e0e0}.toggle-thumb{position:absolute;border-radius:50%;transition:all .3s cubic-bezier(.34,1.56,.64,1);background-color:#fff;box-shadow:0 2px 4px #0003;top:1.5px;left:2px}.toggle-switch.active{background-color:#4caf50}.toggle-thumb.active{transform:translate(calc(100% - 2px))}.toggle-switch.small{width:36px;height:20px}.toggle-thumb.small{width:16px;height:16px}.toggle-switch.medium{width:44px;height:24px}.toggle-thumb.medium{width:20px;height:20px}.toggle-switch.large{width:52px;height:28px}.toggle-thumb.large{width:24px;height:24px}.toggle-container.disabled{cursor:not-allowed;opacity:.6}.toggle-container:focus-within .toggle-switch{outline:2px solid #90caf9;outline-offset:2px}@media (prefers-color-scheme: dark){.toggle-label{color:#f5f5f5}.toggle-switch:not(.active){background-color:#555}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomToggleSwitchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-toggle-switch', imports: [CommonModule], template: "<div class=\"toggle-container\" [class.disabled]=\"disabled\">\n  @if(label && labelPosition === 'left') {\n  <span class=\"toggle-label left\">{{ label }}</span>\n  }\n\n  <div\n    class=\"toggle-switch\"\n    [class.active]=\"value\"\n    [class.small]=\"size === 'small'\"\n    [class.medium]=\"size === 'medium'\"\n    [class.large]=\"size === 'large'\"\n    [style.background-color]=\"value ? onColor : offColor\"\n  >\n    <div\n      class=\"toggle-thumb\"\n      [class.active]=\"value\"\n      [class.small]=\"size === 'small'\"\n      [class.medium]=\"size === 'medium'\"\n      [class.large]=\"size === 'large'\"\n      [style.background-color]=\"thumbColor\"\n    ></div>\n  </div>\n\n  @if(label && labelPosition === 'right') {\n  <span class=\"toggle-label right\">{{ label }}</span>\n  }\n</div>\n", styles: [".toggle-container{display:inline-flex;align-items:center;gap:12px;cursor:pointer;-webkit-tap-highlight-color:transparent}.toggle-label{font-family:Segoe UI,system-ui,sans-serif;font-size:14px;font-weight:500;color:#333;transition:color .2s ease}.toggle-label.left{order:1;margin-right:12px}.toggle-label.right{order:3;margin-left:12px}.toggle-switch{order:2;position:relative;display:inline-block;border-radius:16px;transition:all .3s cubic-bezier(.34,1.56,.64,1);box-shadow:inset 0 1px 3px #0000001a;background-color:#e0e0e0}.toggle-thumb{position:absolute;border-radius:50%;transition:all .3s cubic-bezier(.34,1.56,.64,1);background-color:#fff;box-shadow:0 2px 4px #0003;top:1.5px;left:2px}.toggle-switch.active{background-color:#4caf50}.toggle-thumb.active{transform:translate(calc(100% - 2px))}.toggle-switch.small{width:36px;height:20px}.toggle-thumb.small{width:16px;height:16px}.toggle-switch.medium{width:44px;height:24px}.toggle-thumb.medium{width:20px;height:20px}.toggle-switch.large{width:52px;height:28px}.toggle-thumb.large{width:24px;height:24px}.toggle-container.disabled{cursor:not-allowed;opacity:.6}.toggle-container:focus-within .toggle-switch{outline:2px solid #90caf9;outline-offset:2px}@media (prefers-color-scheme: dark){.toggle-label{color:#f5f5f5}.toggle-switch:not(.active){background-color:#555}}\n"] }]
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
    labelPosition = 'right';
    size = 'medium';
    onColor = '#4CAF50';
    offColor = '#e0e0e0';
    thumbColor = '#ffffff';
    disabled = false;
    parentForm;
    controlName;
    value = false;
    onChange = () => { };
    onTouched = () => { };
    toggle() {
        if (!this.disabled) {
            this.value = !this.value;
            this.parentForm.controls[this.controlName].setValue(this.value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomToggleSwitchFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomToggleSwitchFormComponent, isStandalone: true, selector: "custom-toggle-switch-form", inputs: { label: "label", labelPosition: "labelPosition", size: "size", onColor: "onColor", offColor: "offColor", thumbColor: "thumbColor", disabled: "disabled", parentForm: "parentForm", controlName: "controlName" }, host: { listeners: { "click": "toggle()" } }, ngImport: i0, template: "<div [formGroup]=\"parentForm\">\n  <div class=\"toggle-container\" [class.disabled]=\"disabled\">\n    @if(label && labelPosition === 'left') {\n    <span class=\"toggle-label left\">{{ label }}</span>\n    }\n\n    <div\n      class=\"toggle-switch\"\n      [class.active]=\"value\"\n      [class.small]=\"size === 'small'\"\n      [class.medium]=\"size === 'medium'\"\n      [class.large]=\"size === 'large'\"\n      [style.background-color]=\"value ? onColor : offColor\"\n    >\n      <div\n        class=\"toggle-thumb\"\n        [class.active]=\"value\"\n        [class.small]=\"size === 'small'\"\n        [class.medium]=\"size === 'medium'\"\n        [class.large]=\"size === 'large'\"\n        [style.background-color]=\"thumbColor\"\n      ></div>\n    </div>\n\n    @if(label && labelPosition === 'right') {\n    <span class=\"toggle-label right\">{{ label }}</span>\n    }\n  </div>\n</div>\n", styles: [".toggle-container{display:inline-flex;align-items:center;gap:12px;cursor:pointer;-webkit-tap-highlight-color:transparent}.toggle-label{font-family:Segoe UI,system-ui,sans-serif;font-size:14px;font-weight:500;color:#333;transition:color .2s ease}.toggle-label.left{order:1;margin-right:12px}.toggle-label.right{order:3;margin-left:12px}.toggle-switch{order:2;position:relative;display:inline-block;border-radius:16px;transition:all .3s cubic-bezier(.34,1.56,.64,1);box-shadow:inset 0 1px 3px #0000001a;background-color:#e0e0e0}.toggle-thumb{position:absolute;border-radius:50%;transition:all .3s cubic-bezier(.34,1.56,.64,1);background-color:#fff;box-shadow:0 2px 4px #0003;top:1.5px;left:2px}.toggle-switch.active{background-color:#4caf50}.toggle-thumb.active{transform:translate(calc(100% - 2px))}.toggle-switch.small{width:36px;height:20px}.toggle-thumb.small{width:16px;height:16px}.toggle-switch.medium{width:44px;height:24px}.toggle-thumb.medium{width:20px;height:20px}.toggle-switch.large{width:52px;height:28px}.toggle-thumb.large{width:24px;height:24px}.toggle-container:focus-within .toggle-switch{outline:2px solid #90caf9;outline-offset:2px}@media (prefers-color-scheme: dark){.toggle-label{color:#f5f5f5}.toggle-switch:not(.active){background-color:#555}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomToggleSwitchFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-toggle-switch-form', imports: [CommonModule, ReactiveFormsModule], template: "<div [formGroup]=\"parentForm\">\n  <div class=\"toggle-container\" [class.disabled]=\"disabled\">\n    @if(label && labelPosition === 'left') {\n    <span class=\"toggle-label left\">{{ label }}</span>\n    }\n\n    <div\n      class=\"toggle-switch\"\n      [class.active]=\"value\"\n      [class.small]=\"size === 'small'\"\n      [class.medium]=\"size === 'medium'\"\n      [class.large]=\"size === 'large'\"\n      [style.background-color]=\"value ? onColor : offColor\"\n    >\n      <div\n        class=\"toggle-thumb\"\n        [class.active]=\"value\"\n        [class.small]=\"size === 'small'\"\n        [class.medium]=\"size === 'medium'\"\n        [class.large]=\"size === 'large'\"\n        [style.background-color]=\"thumbColor\"\n      ></div>\n    </div>\n\n    @if(label && labelPosition === 'right') {\n    <span class=\"toggle-label right\">{{ label }}</span>\n    }\n  </div>\n</div>\n", styles: [".toggle-container{display:inline-flex;align-items:center;gap:12px;cursor:pointer;-webkit-tap-highlight-color:transparent}.toggle-label{font-family:Segoe UI,system-ui,sans-serif;font-size:14px;font-weight:500;color:#333;transition:color .2s ease}.toggle-label.left{order:1;margin-right:12px}.toggle-label.right{order:3;margin-left:12px}.toggle-switch{order:2;position:relative;display:inline-block;border-radius:16px;transition:all .3s cubic-bezier(.34,1.56,.64,1);box-shadow:inset 0 1px 3px #0000001a;background-color:#e0e0e0}.toggle-thumb{position:absolute;border-radius:50%;transition:all .3s cubic-bezier(.34,1.56,.64,1);background-color:#fff;box-shadow:0 2px 4px #0003;top:1.5px;left:2px}.toggle-switch.active{background-color:#4caf50}.toggle-thumb.active{transform:translate(calc(100% - 2px))}.toggle-switch.small{width:36px;height:20px}.toggle-thumb.small{width:16px;height:16px}.toggle-switch.medium{width:44px;height:24px}.toggle-thumb.medium{width:20px;height:20px}.toggle-switch.large{width:52px;height:28px}.toggle-thumb.large{width:24px;height:24px}.toggle-container:focus-within .toggle-switch{outline:2px solid #90caf9;outline-offset:2px}@media (prefers-color-scheme: dark){.toggle-label{color:#f5f5f5}.toggle-switch:not(.active){background-color:#555}}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], labelPosition: [{
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
            }], toggle: [{
                type: HostListener,
                args: ['click']
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: OverlayManagerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: OverlayManagerService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: OverlayManagerService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class OverlayPanelComponent {
    overlayManager;
    overlayClass = '';
    targetTemplate;
    overlayTemplate;
    isOpen = false;
    constructor(overlayManager) {
        this.overlayManager = overlayManager;
    }
    ngAfterContentInit() {
        if (!this.targetTemplate) {
            console.error('OverlayPanelComponent: #target template is required');
        }
        if (!this.overlayTemplate) {
            console.error('OverlayPanelComponent: #overlay template is required');
        }
    }
    toggleDropdown(event) {
        // event.stopPropagation();
        // this.isOpen = !this.isOpen;
        event.stopPropagation();
        if (!this.isOpen) {
            this.overlayManager.register(this);
        }
        this.isOpen = !this.isOpen;
        if (!this.isOpen) {
            this.overlayManager.unregister(this);
        }
    }
    closeDropdown() {
        this.isOpen = false;
        this.overlayManager.unregister(this);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: OverlayPanelComponent, deps: [{ token: OverlayManagerService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: OverlayPanelComponent, isStandalone: true, selector: "overlay-panel", inputs: { overlayClass: "overlayClass" }, queries: [{ propertyName: "targetTemplate", first: true, predicate: ["target"], descendants: true }, { propertyName: "overlayTemplate", first: true, predicate: ["overlay"], descendants: true }], ngImport: i0, template: "<div class=\"overlay-container\">\n  <!-- Target content -->\n  <div (click)=\"toggleDropdown($event)\">\n    <ng-container *ngIf=\"targetTemplate\">\n      <ng-container *ngTemplateOutlet=\"targetTemplate\"></ng-container>\n    </ng-container>\n  </div>\n\n  <!-- Overlay content -->\n  @if(isOpen) {\n  <div\n    #overlayPanel\n    class=\"overlay\"\n    [class]=\"'overlay ' + overlayClass\"\n    [class.show]=\"isOpen\"\n    [clickOutside]=\"overlayPanel\"\n    (clickOutsideEmitter)=\"closeDropdown()\"\n  >\n    <ng-container *ngIf=\"overlayTemplate\">\n      <ng-container *ngTemplateOutlet=\"overlayTemplate\"></ng-container>\n    </ng-container>\n  </div>\n  }\n</div>\n", styles: [".overlay-container{position:relative;display:inline-block}.overlay{position:absolute;top:100%;right:0;min-width:80%;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #82828233;border-radius:.375em;margin-top:.5rem;z-index:50;box-shadow:0 4px 6px #0000001a;opacity:0;transform:translateY(-10px);pointer-events:none;transition:opacity .2s ease,transform .2s ease;text-align:center}.overlay.show{opacity:1;transform:translateY(0);pointer-events:auto}\n"], dependencies: [{ kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: OverlayPanelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'overlay-panel', imports: [ClickOutsideDirective, CommonModule], template: "<div class=\"overlay-container\">\n  <!-- Target content -->\n  <div (click)=\"toggleDropdown($event)\">\n    <ng-container *ngIf=\"targetTemplate\">\n      <ng-container *ngTemplateOutlet=\"targetTemplate\"></ng-container>\n    </ng-container>\n  </div>\n\n  <!-- Overlay content -->\n  @if(isOpen) {\n  <div\n    #overlayPanel\n    class=\"overlay\"\n    [class]=\"'overlay ' + overlayClass\"\n    [class.show]=\"isOpen\"\n    [clickOutside]=\"overlayPanel\"\n    (clickOutsideEmitter)=\"closeDropdown()\"\n  >\n    <ng-container *ngIf=\"overlayTemplate\">\n      <ng-container *ngTemplateOutlet=\"overlayTemplate\"></ng-container>\n    </ng-container>\n  </div>\n  }\n</div>\n", styles: [".overlay-container{position:relative;display:inline-block}.overlay{position:absolute;top:100%;right:0;min-width:80%;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #82828233;border-radius:.375em;margin-top:.5rem;z-index:50;box-shadow:0 4px 6px #0000001a;opacity:0;transform:translateY(-10px);pointer-events:none;transition:opacity .2s ease,transform .2s ease;text-align:center}.overlay.show{opacity:1;transform:translateY(0);pointer-events:auto}\n"] }]
        }], ctorParameters: () => [{ type: OverlayManagerService }], propDecorators: { overlayClass: [{
                type: Input
            }], targetTemplate: [{
                type: ContentChild,
                args: ['target']
            }], overlayTemplate: [{
                type: ContentChild,
                args: ['overlay']
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomToastComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomToastComponent, isStandalone: true, selector: "custom-toast", ngImport: i0, template: "@if(toastService.show()){\n<div [class]=\"'custom-toast ' + positionClass + ' ' + colorClass\">\n  @if(toastService.type() === \"info\" || toastService.type() === \"black\") {\n    <svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15 3.75C8.7868 3.75 3.75 8.7868 3.75 15C3.75 21.2132 8.7868 26.25 15 26.25C21.2132 26.25 26.25 21.2132 26.25 15C26.25 8.7868 21.2132 3.75 15 3.75ZM1.25 15C1.25 7.40608 7.40608 1.25 15 1.25C22.5939 1.25 28.75 7.40608 28.75 15C28.75 22.5939 22.5939 28.75 15 28.75C7.40608 28.75 1.25 22.5939 1.25 15Z\" fill=\"white\"/>\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15 13.75C15.6904 13.75 16.25 14.3096 16.25 15V20C16.25 20.6904 15.6904 21.25 15 21.25C14.3096 21.25 13.75 20.6904 13.75 20V15C13.75 14.3096 14.3096 13.75 15 13.75Z\" fill=\"white\"/>\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.75 10C13.75 9.30964 14.3096 8.75 15 8.75H15.0125C15.7029 8.75 16.2625 9.30964 16.2625 10C16.2625 10.6904 15.7029 11.25 15.0125 11.25H15C14.3096 11.25 13.75 10.6904 13.75 10Z\" fill=\"white\"/>\n        </svg>\n        \n\n  } @else if(toastService.type() === \"success\") {\n  <svg\n    width=\"30\"\n    height=\"30\"\n    viewBox=\"0 0 30 30\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M19.5788 4.7168C17.3628 3.72943 14.887 3.48482 12.5207 4.01946C10.1544 4.5541 8.02427 5.83935 6.44807 7.68351C4.87186 9.52767 3.93401 11.8319 3.77439 14.2527C3.61477 16.6734 4.24193 19.0808 5.56233 21.116C6.88274 23.1512 8.82564 24.705 11.1013 25.5457C13.3769 26.3864 15.8634 26.469 18.1898 25.7812C20.5162 25.0933 22.5579 23.6719 24.0105 21.7289C25.4631 19.7858 26.2486 17.4253 26.25 14.9993V13.85C26.25 13.1597 26.8097 12.6 27.5 12.6C28.1904 12.6 28.75 13.1597 28.75 13.85V15C28.7483 17.9651 27.7882 20.8509 26.0128 23.2257C24.2375 25.6006 21.742 27.3379 18.8986 28.1786C16.0552 29.0193 13.0162 28.9183 10.2349 27.8908C7.45356 26.8632 5.0789 24.9641 3.46507 22.4767C1.85124 19.9893 1.08471 17.0468 1.27981 14.0882C1.4749 11.1295 2.62116 8.31318 4.54763 6.0592C6.47411 3.80523 9.07758 2.23438 11.9698 1.58093C14.8619 0.92748 17.8879 1.22644 20.5963 2.43323C21.2268 2.7142 21.5103 3.45317 21.2293 4.08377C20.9483 4.71436 20.2093 4.99777 19.5788 4.7168Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M28.3834 4.11567C28.8718 4.60359 28.8722 5.39504 28.3843 5.88344L15.8843 18.3959C15.6499 18.6306 15.3319 18.7624 15.0003 18.7625C14.6687 18.7626 14.3506 18.6309 14.1161 18.3964L10.3661 14.6464C9.87796 14.1582 9.87796 13.3668 10.3661 12.8786C10.8543 12.3905 11.6457 12.3905 12.1339 12.8786L14.9996 15.7443L26.6157 4.11656C27.1036 3.62816 27.895 3.62776 28.3834 4.11567Z\"\n      fill=\"white\"\n    />\n  </svg>\n\n  } @else if(toastService.type() === \"warning\") {\n  <svg\n    width=\"30\"\n    height=\"30\"\n    viewBox=\"0 0 30 30\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M13.1603 2.85388C13.7219 2.53769 14.3555 2.37158 15 2.37158C15.6445 2.37158 16.2782 2.53769 16.8398 2.85388C17.4014 3.17008 17.872 3.62568 18.2063 4.17673L18.2099 4.18266L28.7974 21.8577L28.8075 21.8749C29.1349 22.442 29.3082 23.0849 29.31 23.7397C29.3119 24.3944 29.1422 25.0383 28.818 25.6072C28.4937 26.176 28.0262 26.6501 27.4618 26.9822C26.8975 27.3142 26.256 27.4927 25.6013 27.4999L25.5875 27.5001L4.39879 27.5C3.74403 27.4928 3.10258 27.3142 2.53824 26.9822C1.9739 26.6501 1.50634 26.176 1.18209 25.6072C0.857833 25.0383 0.688184 24.3944 0.690017 23.7397C0.691851 23.0849 0.865103 22.442 1.19254 21.8749L1.20269 21.8577L11.7938 4.17672C12.128 3.62567 12.5987 3.17008 13.1603 2.85388ZM15 4.87158C14.7852 4.87158 14.574 4.92695 14.3868 5.03235C14.2004 5.13727 14.0441 5.28824 13.9328 5.47081L3.35338 23.1323C3.24691 23.3195 3.19061 23.5312 3.19001 23.7467C3.1894 23.9649 3.24595 24.1795 3.35403 24.3692C3.46212 24.5588 3.61797 24.7168 3.80608 24.8275C3.99255 24.9372 4.20427 24.9966 4.42052 25H25.5795C25.7958 24.9966 26.0075 24.9372 26.194 24.8275C26.3821 24.7168 26.5379 24.5588 26.646 24.3692C26.7541 24.1795 26.8107 23.9649 26.81 23.7467C26.8094 23.5312 26.7532 23.3196 26.6467 23.1324L16.0688 5.4733C16.0683 5.47247 16.0678 5.47164 16.0673 5.47081C15.9559 5.28824 15.7996 5.13727 15.6133 5.03235C15.4261 4.92695 15.2149 4.87158 15 4.87158Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M15 10C15.6904 10 16.25 10.5596 16.25 11.25V16.25C16.25 16.9404 15.6904 17.5 15 17.5C14.3096 17.5 13.75 16.9404 13.75 16.25V11.25C13.75 10.5596 14.3096 10 15 10Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M13.75 21.25C13.75 20.5596 14.3096 20 15 20H15.0125C15.7029 20 16.2625 20.5596 16.2625 21.25C16.2625 21.9404 15.7029 22.5 15.0125 22.5H15C14.3096 22.5 13.75 21.9404 13.75 21.25Z\"\n      fill=\"white\"\n    />\n  </svg>\n\n  } @else if(toastService.type() === \"error\") {\n  <svg\n    width=\"30\"\n    height=\"30\"\n    viewBox=\"0 0 30 30\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M8.94112 1.61612C9.17554 1.3817 9.49348 1.25 9.825 1.25H20.175C20.5065 1.25 20.8245 1.3817 21.0589 1.61612L28.3839 8.94112C28.6183 9.17554 28.75 9.49348 28.75 9.825V20.175C28.75 20.5065 28.6183 20.8245 28.3839 21.0589L21.0589 28.3839C20.8245 28.6183 20.5065 28.75 20.175 28.75H9.825C9.49348 28.75 9.17554 28.6183 8.94112 28.3839L1.61612 21.0589C1.3817 20.8245 1.25 20.5065 1.25 20.175V9.825C1.25 9.49348 1.3817 9.17554 1.61612 8.94112L8.94112 1.61612ZM10.3428 3.75L3.75 10.3428V19.6572L10.3428 26.25H19.6572L26.25 19.6572V10.3428L19.6572 3.75H10.3428Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M19.6339 10.3661C20.122 10.8543 20.122 11.6457 19.6339 12.1339L12.1339 19.6339C11.6457 20.122 10.8543 20.122 10.3661 19.6339C9.87796 19.1457 9.87796 18.3543 10.3661 17.8661L17.8661 10.3661C18.3543 9.87796 19.1457 9.87796 19.6339 10.3661Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M10.3661 10.3661C10.8543 9.87796 11.6457 9.87796 12.1339 10.3661L19.6339 17.8661C20.122 18.3543 20.122 19.1457 19.6339 19.6339C19.1457 20.122 18.3543 20.122 17.8661 19.6339L10.3661 12.1339C9.87796 11.6457 9.87796 10.8543 10.3661 10.3661Z\"\n      fill=\"white\"\n    />\n  </svg>\n\n  }\n\n  <p class=\"custom-toast-message\">{{ toastService.message() }}</p>\n\n  <svg class=\"close-toast\" (click)=\"hideToast()\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15.5893 4.41073C15.9147 4.73617 15.9147 5.26381 15.5893 5.58925L5.58928 15.5892C5.26384 15.9147 4.7362 15.9147 4.41076 15.5892C4.08533 15.2638 4.08533 14.7362 4.41076 14.4107L14.4108 4.41073C14.7362 4.0853 15.2638 4.0853 15.5893 4.41073Z\" fill=\"white\"/>\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.41076 4.41073C4.7362 4.0853 5.26384 4.0853 5.58928 4.41073L15.5893 14.4107C15.9147 14.7362 15.9147 15.2638 15.5893 15.5892C15.2638 15.9147 14.7362 15.9147 14.4108 15.5892L4.41076 5.58925C4.08533 5.26381 4.08533 4.73617 4.41076 4.41073Z\" fill=\"white\"/>\n    </svg>\n    \n</div>\n\n}\n", styles: [".custom-toast{width:500px;min-height:60px;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:20px;border-radius:10px}.toast-top-right{position:fixed;z-index:9999;top:20px;right:20px}.toast-top-left{position:fixed;z-index:9999;top:20px;left:20px}.toast-bottom-right{position:fixed;z-index:9999;bottom:20px;right:20px}.toast-bottom-left{position:fixed;z-index:9999;bottom:20px;left:20px}.toast-top-center{position:fixed;z-index:9999;top:20px;left:50%;transform:translate(-50%)}.toast-bottom-center{position:fixed;z-index:9999;bottom:20px;left:50%;transform:translate(-50%)}.toast-success{background-color:#19af66;color:#fff}.toast-error{background-color:#ff4d4f;color:#fff}.toast-warning{background-color:#ffbf00;color:#fff}.toast-info{background-color:#9d67aa;color:#fff}.toast-black{background-color:#000;color:#fff}.custom-toast-message{font-weight:500;font-size:16px;text-align:start;width:100%;text-wrap:wrap}.close-toast{cursor:pointer}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomToastComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-toast', imports: [], template: "@if(toastService.show()){\n<div [class]=\"'custom-toast ' + positionClass + ' ' + colorClass\">\n  @if(toastService.type() === \"info\" || toastService.type() === \"black\") {\n    <svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15 3.75C8.7868 3.75 3.75 8.7868 3.75 15C3.75 21.2132 8.7868 26.25 15 26.25C21.2132 26.25 26.25 21.2132 26.25 15C26.25 8.7868 21.2132 3.75 15 3.75ZM1.25 15C1.25 7.40608 7.40608 1.25 15 1.25C22.5939 1.25 28.75 7.40608 28.75 15C28.75 22.5939 22.5939 28.75 15 28.75C7.40608 28.75 1.25 22.5939 1.25 15Z\" fill=\"white\"/>\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15 13.75C15.6904 13.75 16.25 14.3096 16.25 15V20C16.25 20.6904 15.6904 21.25 15 21.25C14.3096 21.25 13.75 20.6904 13.75 20V15C13.75 14.3096 14.3096 13.75 15 13.75Z\" fill=\"white\"/>\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.75 10C13.75 9.30964 14.3096 8.75 15 8.75H15.0125C15.7029 8.75 16.2625 9.30964 16.2625 10C16.2625 10.6904 15.7029 11.25 15.0125 11.25H15C14.3096 11.25 13.75 10.6904 13.75 10Z\" fill=\"white\"/>\n        </svg>\n        \n\n  } @else if(toastService.type() === \"success\") {\n  <svg\n    width=\"30\"\n    height=\"30\"\n    viewBox=\"0 0 30 30\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M19.5788 4.7168C17.3628 3.72943 14.887 3.48482 12.5207 4.01946C10.1544 4.5541 8.02427 5.83935 6.44807 7.68351C4.87186 9.52767 3.93401 11.8319 3.77439 14.2527C3.61477 16.6734 4.24193 19.0808 5.56233 21.116C6.88274 23.1512 8.82564 24.705 11.1013 25.5457C13.3769 26.3864 15.8634 26.469 18.1898 25.7812C20.5162 25.0933 22.5579 23.6719 24.0105 21.7289C25.4631 19.7858 26.2486 17.4253 26.25 14.9993V13.85C26.25 13.1597 26.8097 12.6 27.5 12.6C28.1904 12.6 28.75 13.1597 28.75 13.85V15C28.7483 17.9651 27.7882 20.8509 26.0128 23.2257C24.2375 25.6006 21.742 27.3379 18.8986 28.1786C16.0552 29.0193 13.0162 28.9183 10.2349 27.8908C7.45356 26.8632 5.0789 24.9641 3.46507 22.4767C1.85124 19.9893 1.08471 17.0468 1.27981 14.0882C1.4749 11.1295 2.62116 8.31318 4.54763 6.0592C6.47411 3.80523 9.07758 2.23438 11.9698 1.58093C14.8619 0.92748 17.8879 1.22644 20.5963 2.43323C21.2268 2.7142 21.5103 3.45317 21.2293 4.08377C20.9483 4.71436 20.2093 4.99777 19.5788 4.7168Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M28.3834 4.11567C28.8718 4.60359 28.8722 5.39504 28.3843 5.88344L15.8843 18.3959C15.6499 18.6306 15.3319 18.7624 15.0003 18.7625C14.6687 18.7626 14.3506 18.6309 14.1161 18.3964L10.3661 14.6464C9.87796 14.1582 9.87796 13.3668 10.3661 12.8786C10.8543 12.3905 11.6457 12.3905 12.1339 12.8786L14.9996 15.7443L26.6157 4.11656C27.1036 3.62816 27.895 3.62776 28.3834 4.11567Z\"\n      fill=\"white\"\n    />\n  </svg>\n\n  } @else if(toastService.type() === \"warning\") {\n  <svg\n    width=\"30\"\n    height=\"30\"\n    viewBox=\"0 0 30 30\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M13.1603 2.85388C13.7219 2.53769 14.3555 2.37158 15 2.37158C15.6445 2.37158 16.2782 2.53769 16.8398 2.85388C17.4014 3.17008 17.872 3.62568 18.2063 4.17673L18.2099 4.18266L28.7974 21.8577L28.8075 21.8749C29.1349 22.442 29.3082 23.0849 29.31 23.7397C29.3119 24.3944 29.1422 25.0383 28.818 25.6072C28.4937 26.176 28.0262 26.6501 27.4618 26.9822C26.8975 27.3142 26.256 27.4927 25.6013 27.4999L25.5875 27.5001L4.39879 27.5C3.74403 27.4928 3.10258 27.3142 2.53824 26.9822C1.9739 26.6501 1.50634 26.176 1.18209 25.6072C0.857833 25.0383 0.688184 24.3944 0.690017 23.7397C0.691851 23.0849 0.865103 22.442 1.19254 21.8749L1.20269 21.8577L11.7938 4.17672C12.128 3.62567 12.5987 3.17008 13.1603 2.85388ZM15 4.87158C14.7852 4.87158 14.574 4.92695 14.3868 5.03235C14.2004 5.13727 14.0441 5.28824 13.9328 5.47081L3.35338 23.1323C3.24691 23.3195 3.19061 23.5312 3.19001 23.7467C3.1894 23.9649 3.24595 24.1795 3.35403 24.3692C3.46212 24.5588 3.61797 24.7168 3.80608 24.8275C3.99255 24.9372 4.20427 24.9966 4.42052 25H25.5795C25.7958 24.9966 26.0075 24.9372 26.194 24.8275C26.3821 24.7168 26.5379 24.5588 26.646 24.3692C26.7541 24.1795 26.8107 23.9649 26.81 23.7467C26.8094 23.5312 26.7532 23.3196 26.6467 23.1324L16.0688 5.4733C16.0683 5.47247 16.0678 5.47164 16.0673 5.47081C15.9559 5.28824 15.7996 5.13727 15.6133 5.03235C15.4261 4.92695 15.2149 4.87158 15 4.87158Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M15 10C15.6904 10 16.25 10.5596 16.25 11.25V16.25C16.25 16.9404 15.6904 17.5 15 17.5C14.3096 17.5 13.75 16.9404 13.75 16.25V11.25C13.75 10.5596 14.3096 10 15 10Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M13.75 21.25C13.75 20.5596 14.3096 20 15 20H15.0125C15.7029 20 16.2625 20.5596 16.2625 21.25C16.2625 21.9404 15.7029 22.5 15.0125 22.5H15C14.3096 22.5 13.75 21.9404 13.75 21.25Z\"\n      fill=\"white\"\n    />\n  </svg>\n\n  } @else if(toastService.type() === \"error\") {\n  <svg\n    width=\"30\"\n    height=\"30\"\n    viewBox=\"0 0 30 30\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M8.94112 1.61612C9.17554 1.3817 9.49348 1.25 9.825 1.25H20.175C20.5065 1.25 20.8245 1.3817 21.0589 1.61612L28.3839 8.94112C28.6183 9.17554 28.75 9.49348 28.75 9.825V20.175C28.75 20.5065 28.6183 20.8245 28.3839 21.0589L21.0589 28.3839C20.8245 28.6183 20.5065 28.75 20.175 28.75H9.825C9.49348 28.75 9.17554 28.6183 8.94112 28.3839L1.61612 21.0589C1.3817 20.8245 1.25 20.5065 1.25 20.175V9.825C1.25 9.49348 1.3817 9.17554 1.61612 8.94112L8.94112 1.61612ZM10.3428 3.75L3.75 10.3428V19.6572L10.3428 26.25H19.6572L26.25 19.6572V10.3428L19.6572 3.75H10.3428Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M19.6339 10.3661C20.122 10.8543 20.122 11.6457 19.6339 12.1339L12.1339 19.6339C11.6457 20.122 10.8543 20.122 10.3661 19.6339C9.87796 19.1457 9.87796 18.3543 10.3661 17.8661L17.8661 10.3661C18.3543 9.87796 19.1457 9.87796 19.6339 10.3661Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M10.3661 10.3661C10.8543 9.87796 11.6457 9.87796 12.1339 10.3661L19.6339 17.8661C20.122 18.3543 20.122 19.1457 19.6339 19.6339C19.1457 20.122 18.3543 20.122 17.8661 19.6339L10.3661 12.1339C9.87796 11.6457 9.87796 10.8543 10.3661 10.3661Z\"\n      fill=\"white\"\n    />\n  </svg>\n\n  }\n\n  <p class=\"custom-toast-message\">{{ toastService.message() }}</p>\n\n  <svg class=\"close-toast\" (click)=\"hideToast()\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15.5893 4.41073C15.9147 4.73617 15.9147 5.26381 15.5893 5.58925L5.58928 15.5892C5.26384 15.9147 4.7362 15.9147 4.41076 15.5892C4.08533 15.2638 4.08533 14.7362 4.41076 14.4107L14.4108 4.41073C14.7362 4.0853 15.2638 4.0853 15.5893 4.41073Z\" fill=\"white\"/>\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.41076 4.41073C4.7362 4.0853 5.26384 4.0853 5.58928 4.41073L15.5893 14.4107C15.9147 14.7362 15.9147 15.2638 15.5893 15.5892C15.2638 15.9147 14.7362 15.9147 14.4108 15.5892L4.41076 5.58925C4.08533 5.26381 4.08533 4.73617 4.41076 4.41073Z\" fill=\"white\"/>\n    </svg>\n    \n</div>\n\n}\n", styles: [".custom-toast{width:500px;min-height:60px;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:20px;border-radius:10px}.toast-top-right{position:fixed;z-index:9999;top:20px;right:20px}.toast-top-left{position:fixed;z-index:9999;top:20px;left:20px}.toast-bottom-right{position:fixed;z-index:9999;bottom:20px;right:20px}.toast-bottom-left{position:fixed;z-index:9999;bottom:20px;left:20px}.toast-top-center{position:fixed;z-index:9999;top:20px;left:50%;transform:translate(-50%)}.toast-bottom-center{position:fixed;z-index:9999;bottom:20px;left:50%;transform:translate(-50%)}.toast-success{background-color:#19af66;color:#fff}.toast-error{background-color:#ff4d4f;color:#fff}.toast-warning{background-color:#ffbf00;color:#fff}.toast-info{background-color:#9d67aa;color:#fff}.toast-black{background-color:#000;color:#fff}.custom-toast-message{font-weight:500;font-size:16px;text-align:start;width:100%;text-wrap:wrap}.close-toast{cursor:pointer}\n"] }]
        }], ctorParameters: () => [] });

class CustomModalComponent {
    modalTitle = '';
    showDot = false;
    headerButton = '';
    overlayClickClose = true;
    hideEvent = new EventEmitter();
    headerButtonClick = new EventEmitter();
    isVisible = false;
    open() {
        this.isVisible = true;
    }
    close() {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomModalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: CustomModalComponent, isStandalone: true, selector: "modal", inputs: { modalTitle: "modalTitle", showDot: "showDot", headerButton: "headerButton", overlayClickClose: "overlayClickClose" }, outputs: { hideEvent: "hideEvent", headerButtonClick: "headerButtonClick" }, ngImport: i0, template: "<div\n  *ngIf=\"isVisible\"\n  class=\"modal-overlay flex flex-row justify-start align-start\"\n  (click)=\"onOverlayClick($event)\"\n>\n  <!-- X button outside modal-content -->\n\n  <div class=\"flex flex-row\">\n        <!-- < class=\"modal-content\" (click)=\"$event.stopPropagation()\"> -->\n    <div class=\"modal-content\" >\n      <div class=\"modal-header\">\n        <span *ngIf=\"showDot\" class=\"modal-dot\"></span>\n        <span class=\"modal-title\">{{ modalTitle }}</span>\n        <div *ngIf=\"headerButton\">\n          <button\n            type=\"button\"\n            class=\"btn-header\"\n            (click)=\"onHeaderButtonClick()\"\n          >\n            {{ headerButton }}\n          </button>\n        </div>\n      </div>\n      <ng-content></ng-content>\n    </div>\n    <div class=\"flex justify-start\">\n      <button\n        type=\"button\"\n        class=\"btn-close\"\n        aria-label=\"Close\"\n        (click)=\"close()\"\n      >\n        <svg\n          width=\"80\"\n          height=\"80\"\n          viewBox=\"0 0 80 80\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n          aria-hidden=\"true\"\n        >\n          <line\n            x1=\"20\"\n            y1=\"20\"\n            x2=\"60\"\n            y2=\"60\"\n            stroke=\"currentColor\"\n            stroke-width=\"4\"\n            stroke-linecap=\"round\"\n          />\n          <line\n            x1=\"60\"\n            y1=\"20\"\n            x2=\"20\"\n            y2=\"60\"\n            stroke=\"currentColor\"\n            stroke-width=\"4\"\n            stroke-linecap=\"round\"\n          />\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".modal-overlay{font-size:1em;position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000000b3;display:flex;align-items:center;justify-content:center;z-index:1000;overflow-y:auto}.modal-content{position:relative;background:#fff;border-radius:10px 0 10px 10px;min-width:600px;max-width:90vw;padding:2vh 1em;display:flex;align-items:center;flex-direction:column;height:max-content;max-height:90vh;overflow-y:auto}.modal-header{display:flex;width:100%;align-items:center;justify-content:start;padding:24px 24px 0;position:relative}.btn-header{font-family:var(--FM-Bold);font-weight:500;font-size:1.7rem;color:#637486;background-color:#f7f7f7;cursor:pointer;border:#adb5be solid 1px;border-radius:.4em;padding:.3em 1em}.modal-title{flex:1;text-align:left;font-size:1.4em;font-weight:600;width:min-content}.modal-dot{width:1em;height:1em;background:#25c7bc;border-radius:25%;margin-right:10px}.btn-close{height:2.5em;width:2.5em;padding:.5em .6em;background-color:#526275;display:flex;align-items:center;border-top-right-radius:25%;border-bottom-right-radius:25%;cursor:pointer;color:#fff;outline:none;font-size:large}.btn-close:hover{background-color:#4f5a6b}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'modal', standalone: true, imports: [CommonModule], template: "<div\n  *ngIf=\"isVisible\"\n  class=\"modal-overlay flex flex-row justify-start align-start\"\n  (click)=\"onOverlayClick($event)\"\n>\n  <!-- X button outside modal-content -->\n\n  <div class=\"flex flex-row\">\n        <!-- < class=\"modal-content\" (click)=\"$event.stopPropagation()\"> -->\n    <div class=\"modal-content\" >\n      <div class=\"modal-header\">\n        <span *ngIf=\"showDot\" class=\"modal-dot\"></span>\n        <span class=\"modal-title\">{{ modalTitle }}</span>\n        <div *ngIf=\"headerButton\">\n          <button\n            type=\"button\"\n            class=\"btn-header\"\n            (click)=\"onHeaderButtonClick()\"\n          >\n            {{ headerButton }}\n          </button>\n        </div>\n      </div>\n      <ng-content></ng-content>\n    </div>\n    <div class=\"flex justify-start\">\n      <button\n        type=\"button\"\n        class=\"btn-close\"\n        aria-label=\"Close\"\n        (click)=\"close()\"\n      >\n        <svg\n          width=\"80\"\n          height=\"80\"\n          viewBox=\"0 0 80 80\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n          aria-hidden=\"true\"\n        >\n          <line\n            x1=\"20\"\n            y1=\"20\"\n            x2=\"60\"\n            y2=\"60\"\n            stroke=\"currentColor\"\n            stroke-width=\"4\"\n            stroke-linecap=\"round\"\n          />\n          <line\n            x1=\"60\"\n            y1=\"20\"\n            x2=\"20\"\n            y2=\"60\"\n            stroke=\"currentColor\"\n            stroke-width=\"4\"\n            stroke-linecap=\"round\"\n          />\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".modal-overlay{font-size:1em;position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000000b3;display:flex;align-items:center;justify-content:center;z-index:1000;overflow-y:auto}.modal-content{position:relative;background:#fff;border-radius:10px 0 10px 10px;min-width:600px;max-width:90vw;padding:2vh 1em;display:flex;align-items:center;flex-direction:column;height:max-content;max-height:90vh;overflow-y:auto}.modal-header{display:flex;width:100%;align-items:center;justify-content:start;padding:24px 24px 0;position:relative}.btn-header{font-family:var(--FM-Bold);font-weight:500;font-size:1.7rem;color:#637486;background-color:#f7f7f7;cursor:pointer;border:#adb5be solid 1px;border-radius:.4em;padding:.3em 1em}.modal-title{flex:1;text-align:left;font-size:1.4em;font-weight:600;width:min-content}.modal-dot{width:1em;height:1em;background:#25c7bc;border-radius:25%;margin-right:10px}.btn-close{height:2.5em;width:2.5em;padding:.5em .6em;background-color:#526275;display:flex;align-items:center;border-top-right-radius:25%;border-bottom-right-radius:25%;cursor:pointer;color:#fff;outline:none;font-size:large}.btn-close:hover{background-color:#4f5a6b}\n"] }]
        }], propDecorators: { modalTitle: [{
                type: Input
            }], showDot: [{
                type: Input
            }], headerButton: [{
                type: Input
            }], overlayClickClose: [{
                type: Input
            }], hideEvent: [{
                type: Output
            }], headerButtonClick: [{
                type: Output
            }] } });

const uploadCloudSVG = '<svg width="52"height="53"viewBox="0 0 52 53"fill="none"xmlns="http://www.w3.org/2000/svg"class="upload-icon"><path d="M34.6666 35.1667L25.9999 26.5L17.3333 35.1667"stroke="#626264"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"/><path d="M26 26.5V46"stroke="#626264"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"/><path d="M44.1782 40.345C46.2915 39.193 47.9609 37.37 48.923 35.1637C49.8851 32.9575 50.085 30.4937 49.4914 28.1612C48.8977 25.8287 47.5441 23.7603 45.6444 22.2825C43.7446 20.8047 41.4068 20.0016 38.9999 20H36.2699C35.6141 17.4634 34.3918 15.1084 32.6948 13.1122C30.9978 11.116 28.8704 9.53039 26.4725 8.4747C24.0745 7.419 21.4684 6.92066 18.8502 7.01713C16.2319 7.11359 13.6696 7.80236 11.3558 9.03166C9.04203 10.2609 7.03705 11.9988 5.49159 14.1145C3.94613 16.2302 2.90041 18.6687 2.43304 21.2467C1.96566 23.8248 2.08881 26.4752 2.79321 28.9988C3.49761 31.5224 4.76494 33.8534 6.49991 35.8167"stroke="#626264"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"/><path d="M34.6666 35.1667L25.9999 26.5L17.3333 35.1667"stroke="#626264"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"/></svg>';
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomFileUploadComponent, deps: [{ token: i1$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomFileUploadComponent, isStandalone: true, selector: "custom-file-upload", inputs: { parentForm: "parentForm", FileTypes: "FileTypes", maxFileSize: "maxFileSize", controlName: "controlName", label: "label", labelClass: "labelClass", buttonSelectLabel: "buttonSelectLabel", FileTypesMessage: "FileTypesMessage", placeholder: "placeholder", gridCols: "gridCols", validation: "validation", disabled: "disabled", maxFileCount: "maxFileCount" }, viewQueries: [{ propertyName: "fileInput", first: true, predicate: ["fileInput"], descendants: true }], ngImport: i0, template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n    @if(containRequiredError()){\n    <span class=\"required-asterisk\">*</span>\n    } @else{\n    <span class=\"required-asterisk\">&nbsp;</span>\n    }\n  </label>\n  }\n  <div class=\"upload-container\">\n    <!-- Hidden file input -->\n    <input\n      #fileInput\n      type=\"file\"\n      id=\"file-upload\"\n      class=\"file-input-hidden\"\n      [accept]=\"FileTypes.join(',')\"\n      (change)=\"onFileSelected($event)\"\n      [disabled]=\"\n        maxFileCount &&\n        parentForm.get(controlName)?.value?.length >= maxFileCount\n      \"\n    />\n    <!-- Main upload area -->\n    <label\n      for=\"file-upload\"\n      [ngClass]=\"{\n        'upload-label': true,\n        disabled:\n          maxFileCount &&\n          parentForm.get(controlName)?.value?.length >= maxFileCount\n      }\"\n    >\n      <div class=\"upload-grid\">\n        <!-- Upload icon -->\n        <div class=\"icon-container\" [innerHTML]=\"checkedUploadCloud\"></div>\n        <div class=\"upload-text\">\n          <p class=\"upload-title\">{{ placeholder }}</p>\n          <span class=\"upload-subtitle\">\n            {{ getFileTypesText() }}, file size no more than {{ maxFileSize }}\n          </span>\n        </div>\n        <label\n          for=\"file-upload\"\n          [ngClass]=\"{\n            'select-button': true,\n            disabled:\n              maxFileCount &&\n              parentForm.get(controlName)?.value?.length >= maxFileCount\n          }\"\n        >\n          {{ buttonSelectLabel }}\n        </label>\n      </div>\n    </label>\n  </div>\n  @if(parentForm.controls[controlName].value?.length){\n  <div class=\"file-list-container\">\n    <ul class=\"file-grid\" [ngStyle]=\"{ '--grid-cols': gridCols }\">\n      @for (file of parentForm.controls[controlName].value; track file; let i =\n      $index) {\n      <li class=\"file-item\">\n        <div class=\"file-content\">\n          @if ((!mimeTypes.includes(file.mimeType))) {\n          <span class=\"file-name\">{{ file.fileName }}</span>\n          } @else if (!file.mimeType.includes('image')) {\n          <span class=\"file-name sm\">\n            @if (file.mimeType === 'application/vnd.ms-excel' || file.mimeType\n            ===\n            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')\n            {\n            <div class=\"file-svg-icon\" [innerHTML]=\"checkedXlsIcon\"></div>\n            } @else if (file.mimeType === 'application/vnd.ms-powerpoint' ||\n            file.mimeType ===\n            'application/vnd.openxmlformats-officedocument.presentationml.presentation')\n            {\n            <div class=\"file-svg-icon\" [innerHTML]=\"checkedPptIcon\"></div>\n            } @else {\n            <div\n              class=\"file-svg-icon\"\n              [innerHTML]=\"checkedGenAttachmentIcon\"\n            ></div>\n            }\n            <!-- @else if (file.mimeType === 'application/pdf') {\n            } -->\n            <!-- @else if (file.mimeType === 'application/msword' ||\n            'application/vnd.openxmlformats-officedocument.wordprocessingml.document')\n            {\n            } -->\n            <!-- <span class=\"file-name-text\" [title]=\"file.fileName\">{{\n              file.fileName\n            }}</span> -->\n            <span class=\"file-name-text\" [title]=\"file.fileName\">{{\n              file.fileName\n            }}</span>\n          </span>\n          } @else {\n          <img\n            [src]=\"'data:' + file.mimeType + ';base64,' + file.base64Content\"\n            [alt]=\"file.fileName\"\n            class=\"file-image\"\n          />\n          }\n          <button\n            type=\"button\"\n            (click)=\"removeSelectedFile(i)\"\n            class=\"remove-button\"\n          >\n            <svg\n              xmlns=\"http://www.w3.org/2000/svg\"\n              class=\"remove-icon\"\n              fill=\"none\"\n              viewBox=\"0 0 24 24\"\n              stroke=\"currentColor\"\n            >\n              <path\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n                stroke-width=\"2\"\n                d=\"M6 18L18 6M6 6l12 12\"\n              />\n            </svg>\n          </button>\n        </div>\n      </li>\n      }\n    </ul>\n  </div>\n  }\n</div>\n", styles: [".required-asterisk{color:#f43f5e;font-size:15px;font-weight:500}.upload-container{display:flex;border:1px solid #82828233;border-radius:.5em;padding:.75em}.file-input-hidden{display:none}.upload-label{cursor:pointer;width:100%}.upload-label.disabled{cursor:not-allowed}.upload-grid{display:grid;grid-template-columns:1fr 6fr 2fr;gap:1em;align-items:center}.icon-container{display:flex;align-items:center;margin:.5em}.upload-icon{height:3.25em;width:3.25em;color:#9ca3af}.upload-text{text-align:left}.upload-title{color:#111827;margin-bottom:.5em;font-size:1em}.upload-subtitle{font-size:.8em;color:#6b7280}.select-button{display:inline-flex;align-items:center;justify-content:center;padding:.5em 1.5em;border:1px solid #9d67aa;color:#9d67aa;background-color:#fff;border-radius:.5em;cursor:pointer;font-weight:500;width:10vw;text-align:center;transition:all .2s ease-in-out}.select-button.disabled{cursor:not-allowed}.disabled{opacity:60%}.select-button:hover{border-color:#8d579a;color:#8d579a}.file-list-container{margin-top:1em;width:100%}.file-grid{display:grid;grid-template-columns:repeat(var(--grid-cols, 5),minmax(0,1fr));gap:.5em;margin-top:1em}.file-item{display:flex;align-items:center;justify-content:space-between;background-color:#fff;border-radius:.25em;border:1px solid #e5e7eb;margin-bottom:.5em;aspect-ratio:1;height:7.2em;width:7.2em}.file-content{position:relative;width:100%;height:100%;flex:1}.file-name{display:block;width:100%;height:100%;overflow:hidden;text-overflow:ellipsis;color:#374151;padding:.5em;white-space:normal;word-break:break-words;font-size:.875em}.file-name.sm{font-size:.7em;display:inline-flex;flex-direction:column;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;align-items:center;justify-content:center;gap:.25em}.file-image{width:100%;height:100%;object-fit:cover;border-radius:.25em}.file-icon-svg{width:70%;height:70%;object-fit:cover;border-radius:.25em}.remove-button{position:absolute;top:.25em;right:.25em;color:#fff;background-color:#ef4444;border-radius:50%;padding:.25em;border:none;cursor:pointer;box-shadow:0 1px 3px #0000001a,0 1px 2px #0000000f;transition:background-color .2s ease-in-out}.remove-button:hover{background-color:#dc2626}.remove-button:focus{outline:none}.remove-icon{height:1.25em;width:1.25em}@media (max-width: 768px){.upload-grid{grid-template-columns:1fr;gap:.5em;text-align:center}.select-button{width:100%}.file-grid{grid-template-columns:repeat(3,1fr)}}@media (max-width: 480px){.file-grid{grid-template-columns:repeat(2,1fr)}}.custom-label{display:block;font-size:1em;font-weight:500;color:#707070;margin-bottom:.3em}.file-name-text{display:inline-block;max-width:90%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;position:relative}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomFileUploadComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-file-upload', imports: [FormsModule, ReactiveFormsModule, CommonModule], template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n    @if(containRequiredError()){\n    <span class=\"required-asterisk\">*</span>\n    } @else{\n    <span class=\"required-asterisk\">&nbsp;</span>\n    }\n  </label>\n  }\n  <div class=\"upload-container\">\n    <!-- Hidden file input -->\n    <input\n      #fileInput\n      type=\"file\"\n      id=\"file-upload\"\n      class=\"file-input-hidden\"\n      [accept]=\"FileTypes.join(',')\"\n      (change)=\"onFileSelected($event)\"\n      [disabled]=\"\n        maxFileCount &&\n        parentForm.get(controlName)?.value?.length >= maxFileCount\n      \"\n    />\n    <!-- Main upload area -->\n    <label\n      for=\"file-upload\"\n      [ngClass]=\"{\n        'upload-label': true,\n        disabled:\n          maxFileCount &&\n          parentForm.get(controlName)?.value?.length >= maxFileCount\n      }\"\n    >\n      <div class=\"upload-grid\">\n        <!-- Upload icon -->\n        <div class=\"icon-container\" [innerHTML]=\"checkedUploadCloud\"></div>\n        <div class=\"upload-text\">\n          <p class=\"upload-title\">{{ placeholder }}</p>\n          <span class=\"upload-subtitle\">\n            {{ getFileTypesText() }}, file size no more than {{ maxFileSize }}\n          </span>\n        </div>\n        <label\n          for=\"file-upload\"\n          [ngClass]=\"{\n            'select-button': true,\n            disabled:\n              maxFileCount &&\n              parentForm.get(controlName)?.value?.length >= maxFileCount\n          }\"\n        >\n          {{ buttonSelectLabel }}\n        </label>\n      </div>\n    </label>\n  </div>\n  @if(parentForm.controls[controlName].value?.length){\n  <div class=\"file-list-container\">\n    <ul class=\"file-grid\" [ngStyle]=\"{ '--grid-cols': gridCols }\">\n      @for (file of parentForm.controls[controlName].value; track file; let i =\n      $index) {\n      <li class=\"file-item\">\n        <div class=\"file-content\">\n          @if ((!mimeTypes.includes(file.mimeType))) {\n          <span class=\"file-name\">{{ file.fileName }}</span>\n          } @else if (!file.mimeType.includes('image')) {\n          <span class=\"file-name sm\">\n            @if (file.mimeType === 'application/vnd.ms-excel' || file.mimeType\n            ===\n            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')\n            {\n            <div class=\"file-svg-icon\" [innerHTML]=\"checkedXlsIcon\"></div>\n            } @else if (file.mimeType === 'application/vnd.ms-powerpoint' ||\n            file.mimeType ===\n            'application/vnd.openxmlformats-officedocument.presentationml.presentation')\n            {\n            <div class=\"file-svg-icon\" [innerHTML]=\"checkedPptIcon\"></div>\n            } @else {\n            <div\n              class=\"file-svg-icon\"\n              [innerHTML]=\"checkedGenAttachmentIcon\"\n            ></div>\n            }\n            <!-- @else if (file.mimeType === 'application/pdf') {\n            } -->\n            <!-- @else if (file.mimeType === 'application/msword' ||\n            'application/vnd.openxmlformats-officedocument.wordprocessingml.document')\n            {\n            } -->\n            <!-- <span class=\"file-name-text\" [title]=\"file.fileName\">{{\n              file.fileName\n            }}</span> -->\n            <span class=\"file-name-text\" [title]=\"file.fileName\">{{\n              file.fileName\n            }}</span>\n          </span>\n          } @else {\n          <img\n            [src]=\"'data:' + file.mimeType + ';base64,' + file.base64Content\"\n            [alt]=\"file.fileName\"\n            class=\"file-image\"\n          />\n          }\n          <button\n            type=\"button\"\n            (click)=\"removeSelectedFile(i)\"\n            class=\"remove-button\"\n          >\n            <svg\n              xmlns=\"http://www.w3.org/2000/svg\"\n              class=\"remove-icon\"\n              fill=\"none\"\n              viewBox=\"0 0 24 24\"\n              stroke=\"currentColor\"\n            >\n              <path\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n                stroke-width=\"2\"\n                d=\"M6 18L18 6M6 6l12 12\"\n              />\n            </svg>\n          </button>\n        </div>\n      </li>\n      }\n    </ul>\n  </div>\n  }\n</div>\n", styles: [".required-asterisk{color:#f43f5e;font-size:15px;font-weight:500}.upload-container{display:flex;border:1px solid #82828233;border-radius:.5em;padding:.75em}.file-input-hidden{display:none}.upload-label{cursor:pointer;width:100%}.upload-label.disabled{cursor:not-allowed}.upload-grid{display:grid;grid-template-columns:1fr 6fr 2fr;gap:1em;align-items:center}.icon-container{display:flex;align-items:center;margin:.5em}.upload-icon{height:3.25em;width:3.25em;color:#9ca3af}.upload-text{text-align:left}.upload-title{color:#111827;margin-bottom:.5em;font-size:1em}.upload-subtitle{font-size:.8em;color:#6b7280}.select-button{display:inline-flex;align-items:center;justify-content:center;padding:.5em 1.5em;border:1px solid #9d67aa;color:#9d67aa;background-color:#fff;border-radius:.5em;cursor:pointer;font-weight:500;width:10vw;text-align:center;transition:all .2s ease-in-out}.select-button.disabled{cursor:not-allowed}.disabled{opacity:60%}.select-button:hover{border-color:#8d579a;color:#8d579a}.file-list-container{margin-top:1em;width:100%}.file-grid{display:grid;grid-template-columns:repeat(var(--grid-cols, 5),minmax(0,1fr));gap:.5em;margin-top:1em}.file-item{display:flex;align-items:center;justify-content:space-between;background-color:#fff;border-radius:.25em;border:1px solid #e5e7eb;margin-bottom:.5em;aspect-ratio:1;height:7.2em;width:7.2em}.file-content{position:relative;width:100%;height:100%;flex:1}.file-name{display:block;width:100%;height:100%;overflow:hidden;text-overflow:ellipsis;color:#374151;padding:.5em;white-space:normal;word-break:break-words;font-size:.875em}.file-name.sm{font-size:.7em;display:inline-flex;flex-direction:column;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;align-items:center;justify-content:center;gap:.25em}.file-image{width:100%;height:100%;object-fit:cover;border-radius:.25em}.file-icon-svg{width:70%;height:70%;object-fit:cover;border-radius:.25em}.remove-button{position:absolute;top:.25em;right:.25em;color:#fff;background-color:#ef4444;border-radius:50%;padding:.25em;border:none;cursor:pointer;box-shadow:0 1px 3px #0000001a,0 1px 2px #0000000f;transition:background-color .2s ease-in-out}.remove-button:hover{background-color:#dc2626}.remove-button:focus{outline:none}.remove-icon{height:1.25em;width:1.25em}@media (max-width: 768px){.upload-grid{grid-template-columns:1fr;gap:.5em;text-align:center}.select-button{width:100%}.file-grid{grid-template-columns:repeat(3,1fr)}}@media (max-width: 480px){.file-grid{grid-template-columns:repeat(2,1fr)}}.custom-label{display:block;font-size:1em;font-weight:500;color:#707070;margin-bottom:.3em}.file-name-text{display:inline-block;max-width:90%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;position:relative}\n"] }]
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
            case 'PPT':
                return this.sanitizer
                    .bypassSecurityTrustHtml(`<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="12" fill="#FF6B4A"/>
          <path d="M14 16h20v16H14z" fill="white" fill-opacity="0.2"/>
          <text x="24" y="28" text-anchor="middle" font-size="10" fill="white" font-weight="bold">PPT</text>
        </svg>`);
            case 'PDF':
                return this.sanitizer
                    .bypassSecurityTrustHtml(`<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="12" fill="#dc2626"/>
          <path d="M14 16h20v16H14z" fill="white" fill-opacity="0.2"/>
          <text x="24" y="28" text-anchor="middle" font-size="10" fill="white" font-weight="bold">PDF</text>
        </svg>`);
            case 'DOC':
                return this.sanitizer
                    .bypassSecurityTrustHtml(`<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="12" fill="#2563eb"/>
          <path d="M14 16h20v16H14z" fill="white" fill-opacity="0.2"/>
          <text x="24" y="28" text-anchor="middle" font-size="10" fill="white" font-weight="bold">DOC</text>
        </svg>`);
            case 'XLS':
                return this.sanitizer
                    .bypassSecurityTrustHtml(`<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="12" fill="#059669"/>
          <path d="M14 16h20v16H14z" fill="white" fill-opacity="0.2"/>
          <text x="24" y="28" text-anchor="middle" font-size="10" fill="white" font-weight="bold">XLS</text>
        </svg>`);
            default:
                return this.sanitizer.bypassSecurityTrustHtml(`<svg width="26" height="32" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <g opacity="0.5" clip-path="url(#clip0_9617_19229)"> <path d="M17.4109 1.09814H4.17876C3.39889 1.09814 2.65097 1.41215 2.09953 1.97108C1.54808 2.53001 1.23828 3.28809 1.23828 4.07854V27.9217C1.23828 28.7121 1.54808 29.4702 2.09953 30.0291C2.65097 30.5881 3.39889 30.9021 4.17876 30.9021H21.8216C22.6015 30.9021 23.3494 30.5881 23.9008 30.0291C24.4523 29.4702 24.7621 28.7121 24.7621 27.9217V8.54912L17.4109 1.09814Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M15.9404 1.09814V7.05893C15.9404 7.84938 16.2502 8.60745 16.8017 9.16638C17.3531 9.72532 18.101 10.0393 18.8809 10.0393H24.7619" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g> <defs> <clipPath id="clip0_9617_19229"> <rect width="26" height="32" fill="white"/> </clipPath> </defs> </svg>`);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomFileViewerComponent, deps: [{ token: i1$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: CustomFileViewerComponent, isStandalone: true, selector: "custom-file-viewer", inputs: { file: "file", showMenu: "showMenu" }, outputs: { menuClick: "menuClick", fileClick: "fileClick" }, ngImport: i0, template: "<div class=\"file-viewer-container\" (click)=\"onFileClick()\">\n  <div class=\"file-content\">\n    <div class=\"file-icon\" [innerHTML]=\"getFileIcon()\"></div>\n\n    <!-- File Details -->\n    <div class=\"file-details\">\n      <h3 class=\"file-name\">{{ file.fileName }}</h3>\n      <p class=\"file-meta\">\n        {{ formatDate(file.uploadTime) }} | {{ file.fileSize }}\n      </p>\n    </div>\n\n    <!-- Menu Button -->\n    <div class=\"file-menu\" *ngIf=\"showMenu\">\n      <button\n        class=\"menu-button\"\n        (mouseenter)=\"showTooltip = true\"\n        (mouseleave)=\"showTooltip = false\"\n        (focus)=\"showTooltip = true\"\n        (blur)=\"showTooltip = false\"\n        (click)=\"onMenuClick($event)\"\n        type=\"button\"\n      >\n        <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\n          <circle cx=\"10\" cy=\"4\" r=\"1.5\" fill=\"#9CA3AF\" />\n          <circle cx=\"10\" cy=\"10\" r=\"1.5\" fill=\"#9CA3AF\" />\n          <circle cx=\"10\" cy=\"16\" r=\"1.5\" fill=\"#9CA3AF\" />\n        </svg>\n        <span class=\"menu-tooltip\" *ngIf=\"showTooltip\"> menu </span>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".file-viewer-container{background:#fff;border:1px solid #e5e7eb;border-radius:.7em;padding:.6em;cursor:pointer;transition:all .2s ease;box-shadow:0 1px 3px #0000001a;max-width:15em}.file-viewer-container:hover{border-color:#d1d5db;box-shadow:0 4px 6px -1px #0000001a;transform:translateY(-1px)}.file-content{display:grid;grid-template-columns:3fr 10fr 1fr;gap:.6em;align-items:center}.file-icon{flex-shrink:0;display:flex;align-items:center;justify-content:center}.file-details{flex:1;min-width:0}.file-name{font-size:.8em;font-weight:600;color:#1f2937;margin:0 0 .1em;line-height:1.4;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.file-meta{font-size:.65em;color:#9ca3af;margin:0;font-weight:400}.file-menu{flex-shrink:0}.menu-button{position:relative;background:none;border:none;padding:.3em;border-radius:.1em;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background-color .2s ease}.menu-tooltip{position:absolute;left:110%;top:50%;transform:translateY(-50%);background:#111827;color:#fff;padding:4px 10px;border-radius:4px;font-size:13px;white-space:nowrap;box-shadow:0 2px 8px #00000014;z-index:10;opacity:.95;pointer-events:none}.menu-button:hover{background-color:#f3f4f6}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomFileViewerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-file-viewer', imports: [CommonModule], template: "<div class=\"file-viewer-container\" (click)=\"onFileClick()\">\n  <div class=\"file-content\">\n    <div class=\"file-icon\" [innerHTML]=\"getFileIcon()\"></div>\n\n    <!-- File Details -->\n    <div class=\"file-details\">\n      <h3 class=\"file-name\">{{ file.fileName }}</h3>\n      <p class=\"file-meta\">\n        {{ formatDate(file.uploadTime) }} | {{ file.fileSize }}\n      </p>\n    </div>\n\n    <!-- Menu Button -->\n    <div class=\"file-menu\" *ngIf=\"showMenu\">\n      <button\n        class=\"menu-button\"\n        (mouseenter)=\"showTooltip = true\"\n        (mouseleave)=\"showTooltip = false\"\n        (focus)=\"showTooltip = true\"\n        (blur)=\"showTooltip = false\"\n        (click)=\"onMenuClick($event)\"\n        type=\"button\"\n      >\n        <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\n          <circle cx=\"10\" cy=\"4\" r=\"1.5\" fill=\"#9CA3AF\" />\n          <circle cx=\"10\" cy=\"10\" r=\"1.5\" fill=\"#9CA3AF\" />\n          <circle cx=\"10\" cy=\"16\" r=\"1.5\" fill=\"#9CA3AF\" />\n        </svg>\n        <span class=\"menu-tooltip\" *ngIf=\"showTooltip\"> menu </span>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".file-viewer-container{background:#fff;border:1px solid #e5e7eb;border-radius:.7em;padding:.6em;cursor:pointer;transition:all .2s ease;box-shadow:0 1px 3px #0000001a;max-width:15em}.file-viewer-container:hover{border-color:#d1d5db;box-shadow:0 4px 6px -1px #0000001a;transform:translateY(-1px)}.file-content{display:grid;grid-template-columns:3fr 10fr 1fr;gap:.6em;align-items:center}.file-icon{flex-shrink:0;display:flex;align-items:center;justify-content:center}.file-details{flex:1;min-width:0}.file-name{font-size:.8em;font-weight:600;color:#1f2937;margin:0 0 .1em;line-height:1.4;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.file-meta{font-size:.65em;color:#9ca3af;margin:0;font-weight:400}.file-menu{flex-shrink:0}.menu-button{position:relative;background:none;border:none;padding:.3em;border-radius:.1em;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background-color .2s ease}.menu-tooltip{position:absolute;left:110%;top:50%;transform:translateY(-50%);background:#111827;color:#fff;padding:4px 10px;border-radius:4px;font-size:13px;white-space:nowrap;box-shadow:0 2px 8px #00000014;z-index:10;opacity:.95;pointer-events:none}.menu-button:hover{background-color:#f3f4f6}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomSvgIconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: CustomSvgIconComponent, isStandalone: true, selector: "custom-svg-icon", inputs: { path: "path" }, host: { properties: { "style.-webkit-mask-image": "this._path" } }, ngImport: i0, template: "\n<!-- .svg-icon{\n  width: 50px;\n  height: 50px;\n  background-color: red;\n}\n<custom-svg-icon\n[path]=\"'../../../../src/public/gear-icon.svg'\"\nclass=\"svg-icon\"\n></custom-svg-icon> -->\n", styles: [":host{display:inline-block;height:100%;width:100%;background-color:currentColor;-webkit-mask-repeat:no-repeat;-webkit-mask-size:contain;-webkit-mask-position:center}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomSvgIconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-svg-icon', imports: [], template: "\n<!-- .svg-icon{\n  width: 50px;\n  height: 50px;\n  background-color: red;\n}\n<custom-svg-icon\n[path]=\"'../../../../src/public/gear-icon.svg'\"\nclass=\"svg-icon\"\n></custom-svg-icon> -->\n", styles: [":host{display:inline-block;height:100%;width:100%;background-color:currentColor;-webkit-mask-repeat:no-repeat;-webkit-mask-size:contain;-webkit-mask-position:center}\n"] }]
        }], propDecorators: { _path: [{
                type: HostBinding,
                args: ['style.-webkit-mask-image']
            }], path: [{
                type: Input
            }] } });

class CustomLoadingSpinnerComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomLoadingSpinnerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: CustomLoadingSpinnerComponent, isStandalone: true, selector: "custom-loading-spinner", ngImport: i0, template: "<div class=\"loader-container \">\n\n  <span class=\"loader\"></span>\n</div>\n", styles: [".loader-container{height:100vh;width:100vw;display:flex;top:0;left:0;position:absolute;justify-content:center;align-items:center;z-index:999999}.loader{width:48px;height:48px;border:5px solid #25c7bc;border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomLoadingSpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-loading-spinner', imports: [], template: "<div class=\"loader-container \">\n\n  <span class=\"loader\"></span>\n</div>\n", styles: [".loader-container{height:100vh;width:100vw;display:flex;top:0;left:0;position:absolute;justify-content:center;align-items:center;z-index:999999}.loader{width:48px;height:48px;border:5px solid #25c7bc;border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomSteppersContainerComponent, deps: [{ token: StepperService }, { token: i1$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomSteppersContainerComponent, isStandalone: true, selector: "custom-steppers-container", inputs: { steps: "steps" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"steppers-container\">\n  @for(step of steps ; track $index){\n  <div class=\"steppers-container__step\">\n    <div class=\"steppers-container__step--data\">\n\n      @if($index < currentStep - 1){\n          <div [innerHTML]=\"checkedIcon\" class=\" step-completed steppers-container__step--circle\" > </div>\n\n      }@else {\n               <div\n          [ngClass]=\"{\n            'step-active': $index === currentStep - 1,\n            'step-upcoming': $index > currentStep - 1\n          }\"\n          class=\" steppers-container__step--circle\"\n        >\n          {{ step.value  }}\n        </div>\n      }\n\n\n      <div\n        [ngClass]=\"{\n          'label-completed': $index < currentStep - 1,\n          'label-active': $index === currentStep - 1,\n          'label-upcoming': $index > currentStep - 1\n        }\"\n        class=\"steppers-container__step--label\"\n      >\n        {{ step.label | translate }}\n      </div>\n    </div>\n    <div class=\"steppers-container__step--line-container\">\n      @if($index < steps.length - 1){\n      <div\n        [ngClass]=\"{\n          'line-completed': $index < currentStep - 1,\n          'line-active': $index === currentStep - 1,\n          'line-upcoming': $index > currentStep - 1\n        }\"class=\"steppers-container__step--line\">\n       </div>\n      }\n\n    </div>\n\n  </div>\n\n  }\n</div>\n\n<div class=\"steps-components\">\n  @for(step of steps ; track $index){ @if($index === currentStep - 1){\n  <ng-container *ngComponentOutlet=\"step.component\"></ng-container>\n\n  } }\n</div>\n\n", styles: [".steppers-container{display:flex;align-items:center;justify-content:center;width:75%;margin:auto;font-size:1em}.steppers-container__step{display:flex;flex:1;padding:0 .5em}.steppers-container__step:last-child{flex:unset}.steppers-container__step--data{display:flex;justify-content:center;align-items:center}.steppers-container__step--line-container{display:flex;justify-content:center;align-items:center;flex:1;position:relative}.steppers-container__step--circle{width:2em;height:2em;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto;font-weight:700;color:#fff}.steppers-container__step--label{font-size:1em;font-weight:400;padding:0 .5em}.steppers-container__step--line{position:absolute;width:90%;height:2px;background-color:#e2e8f0}.step-completed{background-color:#dff7f7}.step-active{background-color:#602450}.step-upcoming{background-color:#e2e8f0}.label-completed{color:#4b4b4b}.label-active{color:#602450}.label-upcoming{color:#cbd5e0}.line-completed{background-color:#602450}.line-active,.line-upcoming{background-color:#e2e8f0}.steps-components{padding:1em;height:100%}\n"], dependencies: [{ kind: "directive", type: NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"], exportAs: ["ngComponentOutlet"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "ngmodule", type: TranslateModule }, { kind: "pipe", type: i2$1.TranslatePipe, name: "translate" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomSteppersContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-steppers-container', imports: [NgComponentOutlet, NgClass, TranslateModule,], template: "<div class=\"steppers-container\">\n  @for(step of steps ; track $index){\n  <div class=\"steppers-container__step\">\n    <div class=\"steppers-container__step--data\">\n\n      @if($index < currentStep - 1){\n          <div [innerHTML]=\"checkedIcon\" class=\" step-completed steppers-container__step--circle\" > </div>\n\n      }@else {\n               <div\n          [ngClass]=\"{\n            'step-active': $index === currentStep - 1,\n            'step-upcoming': $index > currentStep - 1\n          }\"\n          class=\" steppers-container__step--circle\"\n        >\n          {{ step.value  }}\n        </div>\n      }\n\n\n      <div\n        [ngClass]=\"{\n          'label-completed': $index < currentStep - 1,\n          'label-active': $index === currentStep - 1,\n          'label-upcoming': $index > currentStep - 1\n        }\"\n        class=\"steppers-container__step--label\"\n      >\n        {{ step.label | translate }}\n      </div>\n    </div>\n    <div class=\"steppers-container__step--line-container\">\n      @if($index < steps.length - 1){\n      <div\n        [ngClass]=\"{\n          'line-completed': $index < currentStep - 1,\n          'line-active': $index === currentStep - 1,\n          'line-upcoming': $index > currentStep - 1\n        }\"class=\"steppers-container__step--line\">\n       </div>\n      }\n\n    </div>\n\n  </div>\n\n  }\n</div>\n\n<div class=\"steps-components\">\n  @for(step of steps ; track $index){ @if($index === currentStep - 1){\n  <ng-container *ngComponentOutlet=\"step.component\"></ng-container>\n\n  } }\n</div>\n\n", styles: [".steppers-container{display:flex;align-items:center;justify-content:center;width:75%;margin:auto;font-size:1em}.steppers-container__step{display:flex;flex:1;padding:0 .5em}.steppers-container__step:last-child{flex:unset}.steppers-container__step--data{display:flex;justify-content:center;align-items:center}.steppers-container__step--line-container{display:flex;justify-content:center;align-items:center;flex:1;position:relative}.steppers-container__step--circle{width:2em;height:2em;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto;font-weight:700;color:#fff}.steppers-container__step--label{font-size:1em;font-weight:400;padding:0 .5em}.steppers-container__step--line{position:absolute;width:90%;height:2px;background-color:#e2e8f0}.step-completed{background-color:#dff7f7}.step-active{background-color:#602450}.step-upcoming{background-color:#e2e8f0}.label-completed{color:#4b4b4b}.label-active{color:#602450}.label-upcoming{color:#cbd5e0}.line-completed{background-color:#602450}.line-active,.line-upcoming{background-color:#e2e8f0}.steps-components{padding:1em;height:100%}\n"] }]
        }], ctorParameters: () => [{ type: StepperService }, { type: i1$2.DomSanitizer }], propDecorators: { steps: [{
                type: Input
            }] } });

class CustomFieldsFormComponent {
    fb;
    parentForm;
    controlName;
    addTitle = 'Add Custom Field';
    addOneField = input(false);
    requiredField = [
        {
            errorType: [ComponentFormErrorConstant.REQUIRED],
            errorMessage: "Field is required",
        },
    ];
    constructor(fb) {
        this.fb = fb;
    }
    get fieldsFormArray() {
        return this.parentForm.get(this.controlName);
    }
    get fieldsFormArrayControllers() {
        const formArray = this.parentForm.get(this.controlName);
        return formArray.controls;
    }
    ngOnInit() {
        // Ensure the FormArray is initialized
        if (!this.parentForm.get(this.controlName)) {
            this.parentForm.addControl(this.controlName, this.fb.array([]));
        }
    }
    addField() {
        const group = this.fb.group({
            key: ['', Validators.required],
            value: ['', Validators.required]
        });
        this.fieldsFormArray.push(group);
    }
    removeField(index) {
        this.fieldsFormArray.removeAt(index);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomFieldsFormComponent, deps: [{ token: i1$1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomFieldsFormComponent, isStandalone: true, selector: "custom-fields-form", inputs: { parentForm: { classPropertyName: "parentForm", publicName: "parentForm", isSignal: false, isRequired: true, transformFunction: null }, controlName: { classPropertyName: "controlName", publicName: "controlName", isSignal: false, isRequired: true, transformFunction: null }, addTitle: { classPropertyName: "addTitle", publicName: "addTitle", isSignal: false, isRequired: false, transformFunction: null }, addOneField: { classPropertyName: "addOneField", publicName: "addOneField", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div style=\"margin-top: 1em;\" [formGroup]=\"parentForm\">\n  <!-- <label class=\"custom-label\">Custom Field</label> -->\n\n  @if(addOneField()){\n\n <div class=\"title-header\">\n    <p style=\"font-size: 1em; font-weight: 500; color: #707070\">\n      {{ addTitle | translate }}\n    </p>\n\n    <div (click)=\"addField()\" class=\"plus-icon\">\n      <span class=\"svg-icon\">\n        <svg\n          width=\"14\"\n          height=\"14\"\n          viewBox=\"0 0 14 14\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <g opacity=\"0.5\" clip-path=\"url(#clip0_8646_24705)\">\n            <path\n              opacity=\"0.6\"\n              d=\"M0.852051 6.81799H12.7835\"\n              stroke=\"black\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n            <path\n              opacity=\"0.6\"\n              d=\"M6.81787 0.852234V12.7837\"\n              stroke=\"black\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </g>\n          <defs>\n            <clipPath id=\"clip0_8646_24705\">\n              <rect width=\"14\" height=\"14\" fill=\"white\" />\n            </clipPath>\n          </defs>\n        </svg>\n      </span>\n    </div>\n  </div>\n    <div formArrayName=\"{{ controlName }}\">\n      @for( group of fieldsFormArrayControllers ; track $index){\n\n      <div [formGroupName]=\"$index\" class=\"field-row\">\n        <custom-input-form\n          name=\"key\"\n          controlName=\"key\"\n          [parentForm]=\"group\"\n          [label]=\"'Field Name'\"\n          [validation]=\"requiredField\"\n          class=\"w-full\"\n        ></custom-input-form>\n\n        <custom-input-form\n          name=\"value\"\n          controlName=\"value\"\n          [parentForm]=\"group\"\n          [label]=\"'Field Value'\"\n          [validation]=\"requiredField\"\n          class=\"w-full\"\n        ></custom-input-form>\n\n        <button type=\"button\" class=\"remove-btn\" (click)=\"removeField($index)\">\n          <svg\n            width=\"24\"\n            height=\"24\"\n            viewBox=\"0 0 24 24\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M11.9091 22.909C17.934 22.909 22.8182 18.0248 22.8182 11.9999C22.8182 5.97499 17.934 1.09082 11.9091 1.09082C5.88417 1.09082 1 5.97499 1 11.9999C1 18.0248 5.88417 22.909 11.9091 22.909Z\"\n              stroke=\"#F35746\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n            <path\n              d=\"M15.1818 8.72754L8.63635 15.273\"\n              stroke=\"#F35746\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n            <path\n              d=\"M8.63635 8.72754L15.1818 15.273\"\n              stroke=\"#F35746\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </svg>\n        </button>\n      </div>\n      }\n    </div>\n\n\n  }@else {\n\n  <div class=\"title-header\">\n    <p style=\"font-size: 1em; font-weight: 500; color: #707070\">\n      {{ addTitle | translate }}\n    </p>\n\n    <div (click)=\"addField()\" class=\"plus-icon\">\n      <span class=\"svg-icon\">\n        <svg\n          width=\"14\"\n          height=\"14\"\n          viewBox=\"0 0 14 14\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <g opacity=\"0.5\" clip-path=\"url(#clip0_8646_24705)\">\n            <path\n              opacity=\"0.6\"\n              d=\"M0.852051 6.81799H12.7835\"\n              stroke=\"black\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n            <path\n              opacity=\"0.6\"\n              d=\"M6.81787 0.852234V12.7837\"\n              stroke=\"black\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </g>\n          <defs>\n            <clipPath id=\"clip0_8646_24705\">\n              <rect width=\"14\" height=\"14\" fill=\"white\" />\n            </clipPath>\n          </defs>\n        </svg>\n      </span>\n    </div>\n  </div>\n\n  <div formArrayName=\"{{ controlName }}\">\n    @for( group of fieldsFormArrayControllers ; track $index){\n\n      <div class=\"inputs-container\">\n\n        <div [formGroupName]=\"$index\" class=\"field-row\">\n          <custom-input-form\n          [className]=\"'new-input left-input'\"\n            name=\"key\"\n            controlName=\"key\"\n            [parentForm]=\"group\"\n            [placeholder]=\"'Field Name'\"\n            [validation]=\"requiredField\"\n            class=\"w-full\"\n          ></custom-input-form>\n\n          <custom-input-form\n          [className]=\"'new-input right-input'\"\n            name=\"value\"\n            controlName=\"value\"\n            [parentForm]=\"group\"\n            [placeholder]=\"'Field Value'\"\n            [validation]=\"requiredField\"\n            class=\"w-full\"\n          ></custom-input-form>\n\n        </div>\n        <button type=\"button\" class=\"remove-btn\" (click)=\"removeField($index)\">\n          <svg\n            width=\"12\"\n            height=\"12\"\n            viewBox=\"0 0 12 12\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M5.25333 5.62094L0.544994 0.977656L1.38757 0.123277L6.09589 4.76651L10.7388 0.0585423L11.5933 0.901174L6.95033 5.60919L11.6586 10.2524L10.8161 11.1068L6.10776 6.46356L1.4648 11.1716L0.610365 10.3289L5.25333 5.62094Z\"\n              fill=\"#FF3C3C\"\n            />\n          </svg>\n        </button>\n      </div>\n\n    }\n  </div>\n\n  }\n</div>\n", styles: [".field-row{display:flex;align-items:start;justify-content:center;gap:0em;margin-top:1em}.inputs-container{position:relative}.remove-btn{transform:scale(1.1) translateY(-50%);margin:auto;position:absolute;inset-inline-end:1em;inset-block-start:1.9em;cursor:pointer}.new-input{border-radius:0!important;width:50%}::ng-deep .new-input input{border-radius:0!important}::ng-deep .left-input input{border-start-start-radius:5px!important;border-end-start-radius:5px!important}::ng-deep .right-input input{border-start-end-radius:5px!important;border-end-end-radius:5px!important}::ng-deep .new-input input::placeholder{color:#707070!important}.add-btn-container{margin-top:10px;text-align:end}.title-header{display:flex;justify-content:space-between;align-items:center;margin:.5 0}.plus-icon{background-color:#fff;cursor:pointer;width:fit-content;padding:.5em;border-radius:50%;border:solid 1px #e6e6e6;display:flex;justify-content:center;align-items:center}.svg-icon{transform:scale(1)}.spacing-down{transform:translateY(1.5em);width:fit-content}\n"], dependencies: [{ kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { kind: "directive", type: i1$1.FormArrayName, selector: "[formArrayName]", inputs: ["formArrayName"] }, { kind: "component", type: CustomInputFormComponent, selector: "custom-input-form", inputs: ["class", "labelClass", "label", "placeholder", "name", "type", "controlName", "parentForm", "validation", "pattern"], outputs: ["valueChange"] }, { kind: "ngmodule", type: TranslateModule }, { kind: "pipe", type: i2$1.TranslatePipe, name: "translate" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomFieldsFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-fields-form', imports: [ReactiveFormsModule, CustomInputFormComponent, CustomButtonComponent, TranslateModule], template: "<div style=\"margin-top: 1em;\" [formGroup]=\"parentForm\">\n  <!-- <label class=\"custom-label\">Custom Field</label> -->\n\n  @if(addOneField()){\n\n <div class=\"title-header\">\n    <p style=\"font-size: 1em; font-weight: 500; color: #707070\">\n      {{ addTitle | translate }}\n    </p>\n\n    <div (click)=\"addField()\" class=\"plus-icon\">\n      <span class=\"svg-icon\">\n        <svg\n          width=\"14\"\n          height=\"14\"\n          viewBox=\"0 0 14 14\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <g opacity=\"0.5\" clip-path=\"url(#clip0_8646_24705)\">\n            <path\n              opacity=\"0.6\"\n              d=\"M0.852051 6.81799H12.7835\"\n              stroke=\"black\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n            <path\n              opacity=\"0.6\"\n              d=\"M6.81787 0.852234V12.7837\"\n              stroke=\"black\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </g>\n          <defs>\n            <clipPath id=\"clip0_8646_24705\">\n              <rect width=\"14\" height=\"14\" fill=\"white\" />\n            </clipPath>\n          </defs>\n        </svg>\n      </span>\n    </div>\n  </div>\n    <div formArrayName=\"{{ controlName }}\">\n      @for( group of fieldsFormArrayControllers ; track $index){\n\n      <div [formGroupName]=\"$index\" class=\"field-row\">\n        <custom-input-form\n          name=\"key\"\n          controlName=\"key\"\n          [parentForm]=\"group\"\n          [label]=\"'Field Name'\"\n          [validation]=\"requiredField\"\n          class=\"w-full\"\n        ></custom-input-form>\n\n        <custom-input-form\n          name=\"value\"\n          controlName=\"value\"\n          [parentForm]=\"group\"\n          [label]=\"'Field Value'\"\n          [validation]=\"requiredField\"\n          class=\"w-full\"\n        ></custom-input-form>\n\n        <button type=\"button\" class=\"remove-btn\" (click)=\"removeField($index)\">\n          <svg\n            width=\"24\"\n            height=\"24\"\n            viewBox=\"0 0 24 24\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M11.9091 22.909C17.934 22.909 22.8182 18.0248 22.8182 11.9999C22.8182 5.97499 17.934 1.09082 11.9091 1.09082C5.88417 1.09082 1 5.97499 1 11.9999C1 18.0248 5.88417 22.909 11.9091 22.909Z\"\n              stroke=\"#F35746\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n            <path\n              d=\"M15.1818 8.72754L8.63635 15.273\"\n              stroke=\"#F35746\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n            <path\n              d=\"M8.63635 8.72754L15.1818 15.273\"\n              stroke=\"#F35746\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </svg>\n        </button>\n      </div>\n      }\n    </div>\n\n\n  }@else {\n\n  <div class=\"title-header\">\n    <p style=\"font-size: 1em; font-weight: 500; color: #707070\">\n      {{ addTitle | translate }}\n    </p>\n\n    <div (click)=\"addField()\" class=\"plus-icon\">\n      <span class=\"svg-icon\">\n        <svg\n          width=\"14\"\n          height=\"14\"\n          viewBox=\"0 0 14 14\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <g opacity=\"0.5\" clip-path=\"url(#clip0_8646_24705)\">\n            <path\n              opacity=\"0.6\"\n              d=\"M0.852051 6.81799H12.7835\"\n              stroke=\"black\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n            <path\n              opacity=\"0.6\"\n              d=\"M6.81787 0.852234V12.7837\"\n              stroke=\"black\"\n              stroke-width=\"1.5\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </g>\n          <defs>\n            <clipPath id=\"clip0_8646_24705\">\n              <rect width=\"14\" height=\"14\" fill=\"white\" />\n            </clipPath>\n          </defs>\n        </svg>\n      </span>\n    </div>\n  </div>\n\n  <div formArrayName=\"{{ controlName }}\">\n    @for( group of fieldsFormArrayControllers ; track $index){\n\n      <div class=\"inputs-container\">\n\n        <div [formGroupName]=\"$index\" class=\"field-row\">\n          <custom-input-form\n          [className]=\"'new-input left-input'\"\n            name=\"key\"\n            controlName=\"key\"\n            [parentForm]=\"group\"\n            [placeholder]=\"'Field Name'\"\n            [validation]=\"requiredField\"\n            class=\"w-full\"\n          ></custom-input-form>\n\n          <custom-input-form\n          [className]=\"'new-input right-input'\"\n            name=\"value\"\n            controlName=\"value\"\n            [parentForm]=\"group\"\n            [placeholder]=\"'Field Value'\"\n            [validation]=\"requiredField\"\n            class=\"w-full\"\n          ></custom-input-form>\n\n        </div>\n        <button type=\"button\" class=\"remove-btn\" (click)=\"removeField($index)\">\n          <svg\n            width=\"12\"\n            height=\"12\"\n            viewBox=\"0 0 12 12\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M5.25333 5.62094L0.544994 0.977656L1.38757 0.123277L6.09589 4.76651L10.7388 0.0585423L11.5933 0.901174L6.95033 5.60919L11.6586 10.2524L10.8161 11.1068L6.10776 6.46356L1.4648 11.1716L0.610365 10.3289L5.25333 5.62094Z\"\n              fill=\"#FF3C3C\"\n            />\n          </svg>\n        </button>\n      </div>\n\n    }\n  </div>\n\n  }\n</div>\n", styles: [".field-row{display:flex;align-items:start;justify-content:center;gap:0em;margin-top:1em}.inputs-container{position:relative}.remove-btn{transform:scale(1.1) translateY(-50%);margin:auto;position:absolute;inset-inline-end:1em;inset-block-start:1.9em;cursor:pointer}.new-input{border-radius:0!important;width:50%}::ng-deep .new-input input{border-radius:0!important}::ng-deep .left-input input{border-start-start-radius:5px!important;border-end-start-radius:5px!important}::ng-deep .right-input input{border-start-end-radius:5px!important;border-end-end-radius:5px!important}::ng-deep .new-input input::placeholder{color:#707070!important}.add-btn-container{margin-top:10px;text-align:end}.title-header{display:flex;justify-content:space-between;align-items:center;margin:.5 0}.plus-icon{background-color:#fff;cursor:pointer;width:fit-content;padding:.5em;border-radius:50%;border:solid 1px #e6e6e6;display:flex;justify-content:center;align-items:center}.svg-icon{transform:scale(1)}.spacing-down{transform:translateY(1.5em);width:fit-content}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomSteppersControllersComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomSteppersControllersComponent, isStandalone: true, selector: "custom-steppers-controllers", inputs: { disabledNext: { classPropertyName: "disabledNext", publicName: "disabledNext", isSignal: true, isRequired: false, transformFunction: null }, nextLabel: { classPropertyName: "nextLabel", publicName: "nextLabel", isSignal: true, isRequired: false, transformFunction: null }, prevLabel: { classPropertyName: "prevLabel", publicName: "prevLabel", isSignal: true, isRequired: false, transformFunction: null }, cancelLabel: { classPropertyName: "cancelLabel", publicName: "cancelLabel", isSignal: true, isRequired: false, transformFunction: null }, sendLabel: { classPropertyName: "sendLabel", publicName: "sendLabel", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onNext: "onNext", onPerv: "onPerv", onCancel: "onCancel", onSubmit: "onSubmit" }, ngImport: i0, template: "<div class=\"steppers-controllers\">\n  <div class=\"steppers-controllers__left-side\">\n\n    <custom-button\n      [class]=\"'cancel-btn '\"\n      (buttonClick)=\"cancel()\"\n\n      >{{cancelLabel() | translate }}</custom-button\n    >\n  </div>\n  <div class=\"steppers-controllers__right-side\">\n\n    <custom-button\n      [class]=\"'prev-btn '\"\n      (buttonClick)=\"previousStep()\"\n      [disabled]=\"!stepperService.hasPrevious()\"\n      >{{prevLabel() | translate }}</custom-button\n    >\n\n    @if(stepperService.hasNext()){\n\n    <custom-button [class]=\"'next-btn '\" (buttonClick)=\"nextStep()\"   [disabled]=\"disabledNext()\"\n      >{{nextLabel() | translate }}</custom-button\n    >\n    }@else{\n    <custom-button [class]=\"'next-btn '\" (buttonClick)=\"submit()\"    [disabled]=\"disabledNext()\"\n      >{{sendLabel() | translate }}</custom-button\n    >\n\n    }\n  </div>\n</div>\n", styles: ["::ng-deep .cancel-btn{background-color:#f43f5e;color:#fff}::ng-deep .prev-btn{background-color:#06213d;color:#fff;margin-inline-end:1em}::ng-deep .prev-btn:disabled{background-color:#e4e4e4;color:#595959}::ng-deep .next-btn{background-color:#1db3a9;color:#fff}.steppers-controllers{border-top:1px solid #e6e6e6;padding:1.5em 0 0;margin-top:1.5em;display:flex;justify-content:space-between;min-height:5em}.steppers-controllers__left-side{flex:1}.steppers-controllers__right-side{display:flex}\n"], dependencies: [{ kind: "component", type: CustomButtonComponent, selector: "custom-button", inputs: ["disabled", "type", "class"], outputs: ["buttonClick"] }, { kind: "ngmodule", type: TranslateModule }, { kind: "pipe", type: i2$1.TranslatePipe, name: "translate" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomSteppersControllersComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-steppers-controllers', imports: [CustomButtonComponent, TranslateModule], template: "<div class=\"steppers-controllers\">\n  <div class=\"steppers-controllers__left-side\">\n\n    <custom-button\n      [class]=\"'cancel-btn '\"\n      (buttonClick)=\"cancel()\"\n\n      >{{cancelLabel() | translate }}</custom-button\n    >\n  </div>\n  <div class=\"steppers-controllers__right-side\">\n\n    <custom-button\n      [class]=\"'prev-btn '\"\n      (buttonClick)=\"previousStep()\"\n      [disabled]=\"!stepperService.hasPrevious()\"\n      >{{prevLabel() | translate }}</custom-button\n    >\n\n    @if(stepperService.hasNext()){\n\n    <custom-button [class]=\"'next-btn '\" (buttonClick)=\"nextStep()\"   [disabled]=\"disabledNext()\"\n      >{{nextLabel() | translate }}</custom-button\n    >\n    }@else{\n    <custom-button [class]=\"'next-btn '\" (buttonClick)=\"submit()\"    [disabled]=\"disabledNext()\"\n      >{{sendLabel() | translate }}</custom-button\n    >\n\n    }\n  </div>\n</div>\n", styles: ["::ng-deep .cancel-btn{background-color:#f43f5e;color:#fff}::ng-deep .prev-btn{background-color:#06213d;color:#fff;margin-inline-end:1em}::ng-deep .prev-btn:disabled{background-color:#e4e4e4;color:#595959}::ng-deep .next-btn{background-color:#1db3a9;color:#fff}.steppers-controllers{border-top:1px solid #e6e6e6;padding:1.5em 0 0;margin-top:1.5em;display:flex;justify-content:space-between;min-height:5em}.steppers-controllers__left-side{flex:1}.steppers-controllers__right-side{display:flex}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomRadioGroupFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomRadioGroupFormComponent, isStandalone: true, selector: "custom-radio-group-form", inputs: { setFirstAsDefaultValue: "setFirstAsDefaultValue", name: "name", controlName: "controlName", parentForm: "parentForm", validation: "validation", options: "options" }, outputs: { onChange: "onChange" }, ngImport: i0, template: "<div class=\"radio-group\" [formGroup]=\"parentForm\">\n  @for(option of options ; track $index){\n\n  <label class=\"custom-radio-wrapper\">\n    <input\n    (change)=\"onRadioChange(option)\"\n      type=\"radio\"\n      [value]=\"option.value\"\n      [name]=\"name\"\n      [formControlName]=\"controlName\"\n    />\n    <span class=\"radio-custom\"></span>\n    {{ option.label }}\n  </label>\n  }\n  <custom-app-error\n    [control]=\"parentForm.controls[controlName]\"\n    [validation]=\"validation\"\n    [name]=\"name\"\n  />\n</div>\n", styles: [":host{--radio-border-color: #D9D9D9;--radio-checked-fill-color: #1DB3A9}.radio-group{display:flex;gap:1.5em;align-items:center;height:100%}.custom-radio-wrapper{display:inline-flex;align-items:center;height:100%;gap:.5em;position:relative;cursor:pointer;font-weight:500;color:#262626}.custom-radio-wrapper input[type=radio]{opacity:0;position:absolute;pointer-events:none}.radio-custom{width:1.8em;height:1.8em;border:2px solid var(--radio-border-color, #D9D9D9);border-radius:50%;display:inline-block;position:relative;transition:border-color .3s ease}.custom-radio-wrapper input[type=radio]:checked+.radio-custom{border-color:var(--radio-checked-fill-color, #1DB3A9)}.custom-radio-wrapper input[type=radio]:checked+.radio-custom:after{content:\"\";width:.8em;height:.8em;background-color:var(--radio-checked-fill-color, #1DB3A9);border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}\n"], dependencies: [{ kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name", "showErrors"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomRadioGroupFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-radio-group-form', imports: [CustomAppErrorComponent, ReactiveFormsModule], template: "<div class=\"radio-group\" [formGroup]=\"parentForm\">\n  @for(option of options ; track $index){\n\n  <label class=\"custom-radio-wrapper\">\n    <input\n    (change)=\"onRadioChange(option)\"\n      type=\"radio\"\n      [value]=\"option.value\"\n      [name]=\"name\"\n      [formControlName]=\"controlName\"\n    />\n    <span class=\"radio-custom\"></span>\n    {{ option.label }}\n  </label>\n  }\n  <custom-app-error\n    [control]=\"parentForm.controls[controlName]\"\n    [validation]=\"validation\"\n    [name]=\"name\"\n  />\n</div>\n", styles: [":host{--radio-border-color: #D9D9D9;--radio-checked-fill-color: #1DB3A9}.radio-group{display:flex;gap:1.5em;align-items:center;height:100%}.custom-radio-wrapper{display:inline-flex;align-items:center;height:100%;gap:.5em;position:relative;cursor:pointer;font-weight:500;color:#262626}.custom-radio-wrapper input[type=radio]{opacity:0;position:absolute;pointer-events:none}.radio-custom{width:1.8em;height:1.8em;border:2px solid var(--radio-border-color, #D9D9D9);border-radius:50%;display:inline-block;position:relative;transition:border-color .3s ease}.custom-radio-wrapper input[type=radio]:checked+.radio-custom{border-color:var(--radio-checked-fill-color, #1DB3A9)}.custom-radio-wrapper input[type=radio]:checked+.radio-custom:after{content:\"\";width:.8em;height:.8em;background-color:var(--radio-checked-fill-color, #1DB3A9);border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}\n"] }]
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

const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

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
        }
    }
    setExcistValue() {
        const timeString = this.parentForm.get(this.controlName)?.value; // e.g., "13:45:00"
        const [hour, minute] = timeString.split(':');
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
        if (this.selectedHour && this.selectedMinute) {
            this.parentForm
                .get(this.controlName)
                ?.setValue(`${this.selectedHour}:${this.selectedMinute}:00`);
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
        if (this.selectedPeriod == 'PM' && this.selectedHour != 12) {
            this.selectedHour = Number(this.selectedHour) + 12;
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
        return (`${this.selectedHour?.toString().padStart(2, '0') || '--'}:${this.selectedMinute?.toString().padStart(2, '0') || '--'} ` || null);
        //${this.selectedPeriod}
        // return {
        //   hour: this.selectedHour ?? 0,
        //   minute: this.selectedMinute ?? 0,
        //   second: 0,
        //   nano: 0,
        // };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomTimeInputFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomTimeInputFormComponent, isStandalone: true, selector: "custom-time-input-form", inputs: { parentForm: "parentForm", name: "name", controlName: "controlName", label: "label", labelClass: "labelClass", inputClass: "inputClass", validation: "validation", defaultTime: "defaultTime" }, outputs: { timeChange: "timeChange" }, ngImport: i0, template: "<div class=\"time-picker-container\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n  <div class=\"time-picker__input\">\n    <input\n      type=\"text\"\n      readonly\n      [class]=\"'custom-input ' + inputClass\"\n      [value]=\"displayTime()\"\n      (click)=\"toggleDropdown()\"\n      [attr.name]=\"name\"\n      [attr.id]=\"name\"\n    />\n    <span class=\"time-picker__input--time-icon\" (click)=\"toggleDropdown()\">\n      <svg\n        width=\"22\"\n        height=\"22\"\n        viewBox=\"0 0 22 22\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <g opacity=\"0.5\" clip-path=\"url(#clip0_10062_19268)\">\n          <path\n            d=\"M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z\"\n            stroke=\"#828282\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 5V11L15 13\"\n            stroke=\"#828282\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n        <defs>\n          <clipPath id=\"clip0_10062_19268\">\n            <rect width=\"22\" height=\"22\" fill=\"white\" />\n          </clipPath>\n        </defs>\n      </svg>\n    </span>\n  </div>\n\n  @if(dropdownOpen()){\n\n  <div\n    #dropdownOptions\n    [clickOutside]=\"dropdownOptions\"\n    (clickOutsideEmitter)=\"toggleDropdown()\"\n    class=\"time-dropdown-container\"\n  >\n    <select [(ngModel)]=\"selectedHour\" class=\"time-select\">\n      @for( h of hours ;track $index){\n\n      <option [value]=\"h\">{{ h }}</option>\n      }\n    </select>\n\n    <span>:</span>\n\n    <select [(ngModel)]=\"selectedMinute\" class=\"time-select\">\n      @for( m of minutes ;track $index){\n\n      <option [value]=\"m\">{{ m }}</option>\n      }\n    </select>\n\n    <select [(ngModel)]=\"selectedPeriod\" class=\"time-select time-period\">\n      <option value=\"AM\">AM</option>\n      <option value=\"PM\">PM</option>\n    </select>\n\n    <button type=\"button\" (click)=\"confirmTime()\" class=\"confirm-btn\">\u2714</button>\n  </div>\n  }\n  <div class=\"error-container\">\n    <custom-app-error\n      [showErrors]=\"showErrors()\"\n      [control]=\"parentForm.controls[controlName]\"\n      [validation]=\"validation\"\n      [name]=\"controlName\"\n    />\n  </div>\n</div>\n", styles: [".time-picker-container{position:relative;width:100%;cursor:pointer;min-width:15em}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.time-picker__input{position:relative}.custom-input{height:3.6em;width:100%;border-radius:.375em;border:1px solid #82828233;padding-left:.5em;padding-right:.5em;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;cursor:pointer}.time-picker__input--time-icon{position:absolute;right:.5em;top:50%;transform:translateY(-50%);pointer-events:none}.time-dropdown-container{position:absolute;top:100%;inset-inline-start:0;width:100%;min-width:15em;display:flex;justify-content:space-between;align-items:center;gap:.3em;margin-top:4px;background:#fff;border-radius:.375em;border:1px solid #82828233;padding:.5em;z-index:100;box-shadow:0 4px 10px #0000000d}.time-select{width:25%;padding:.3em;font-size:1em;border-radius:.375em;border:1px solid #82828233;background:#f9f9f9}.confirm-btn{background:#1db3a9;border:none;color:#fff;font-size:.8em;border-radius:.375em;padding:.7em;cursor:pointer}.error-container{position:absolute;top:100%;inset-inline-start:0}.time-period{font-size:.8em}\n"], dependencies: [{ kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name", "showErrors"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1$1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1$1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomTimeInputFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-time-input-form', imports: [CustomAppErrorComponent, ReactiveFormsModule, FormsModule, ClickOutsideDirective], template: "<div class=\"time-picker-container\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n  <div class=\"time-picker__input\">\n    <input\n      type=\"text\"\n      readonly\n      [class]=\"'custom-input ' + inputClass\"\n      [value]=\"displayTime()\"\n      (click)=\"toggleDropdown()\"\n      [attr.name]=\"name\"\n      [attr.id]=\"name\"\n    />\n    <span class=\"time-picker__input--time-icon\" (click)=\"toggleDropdown()\">\n      <svg\n        width=\"22\"\n        height=\"22\"\n        viewBox=\"0 0 22 22\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <g opacity=\"0.5\" clip-path=\"url(#clip0_10062_19268)\">\n          <path\n            d=\"M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z\"\n            stroke=\"#828282\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11 5V11L15 13\"\n            stroke=\"#828282\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n        <defs>\n          <clipPath id=\"clip0_10062_19268\">\n            <rect width=\"22\" height=\"22\" fill=\"white\" />\n          </clipPath>\n        </defs>\n      </svg>\n    </span>\n  </div>\n\n  @if(dropdownOpen()){\n\n  <div\n    #dropdownOptions\n    [clickOutside]=\"dropdownOptions\"\n    (clickOutsideEmitter)=\"toggleDropdown()\"\n    class=\"time-dropdown-container\"\n  >\n    <select [(ngModel)]=\"selectedHour\" class=\"time-select\">\n      @for( h of hours ;track $index){\n\n      <option [value]=\"h\">{{ h }}</option>\n      }\n    </select>\n\n    <span>:</span>\n\n    <select [(ngModel)]=\"selectedMinute\" class=\"time-select\">\n      @for( m of minutes ;track $index){\n\n      <option [value]=\"m\">{{ m }}</option>\n      }\n    </select>\n\n    <select [(ngModel)]=\"selectedPeriod\" class=\"time-select time-period\">\n      <option value=\"AM\">AM</option>\n      <option value=\"PM\">PM</option>\n    </select>\n\n    <button type=\"button\" (click)=\"confirmTime()\" class=\"confirm-btn\">\u2714</button>\n  </div>\n  }\n  <div class=\"error-container\">\n    <custom-app-error\n      [showErrors]=\"showErrors()\"\n      [control]=\"parentForm.controls[controlName]\"\n      [validation]=\"validation\"\n      [name]=\"controlName\"\n    />\n  </div>\n</div>\n", styles: [".time-picker-container{position:relative;width:100%;cursor:pointer;min-width:15em}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.time-picker__input{position:relative}.custom-input{height:3.6em;width:100%;border-radius:.375em;border:1px solid #82828233;padding-left:.5em;padding-right:.5em;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;cursor:pointer}.time-picker__input--time-icon{position:absolute;right:.5em;top:50%;transform:translateY(-50%);pointer-events:none}.time-dropdown-container{position:absolute;top:100%;inset-inline-start:0;width:100%;min-width:15em;display:flex;justify-content:space-between;align-items:center;gap:.3em;margin-top:4px;background:#fff;border-radius:.375em;border:1px solid #82828233;padding:.5em;z-index:100;box-shadow:0 4px 10px #0000000d}.time-select{width:25%;padding:.3em;font-size:1em;border-radius:.375em;border:1px solid #82828233;background:#f9f9f9}.confirm-btn{background:#1db3a9;border:none;color:#fff;font-size:.8em;border-radius:.375em;padding:.7em;cursor:pointer}.error-container{position:absolute;top:100%;inset-inline-start:0}.time-period{font-size:.8em}\n"] }]
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
            }] } });

class CustomSearchInputComponent {
    class = '';
    labelClass = '';
    label = '';
    placeholder = '';
    name = '';
    value;
    valueChange = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomSearchInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomSearchInputComponent, isStandalone: true, selector: "custom-search-input", inputs: { class: "class", labelClass: "labelClass", label: "label", placeholder: "placeholder", name: "name", value: "value" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div style=\"width: 100% ; min-width: 15rem\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n  <div class=\"search-input-wrapper\">\n    <span class=\"search-icon\">\n      <svg\n        xmlns=\"http://www.w3.org/2000/svg\"\n        width=\"17\"\n        height=\"18\"\n        viewBox=\"0 0 17 18\"\n        fill=\"none\"\n      >\n        <g opacity=\"0.2\">\n          <path\n            d=\"M8.14616 15.375C11.8626 15.375 14.8753 12.3623 14.8753 8.64585C14.8753 4.92944 11.8626 1.91669 8.14616 1.91669C4.42974 1.91669 1.41699 4.92944 1.41699 8.64585C1.41699 12.3623 4.42974 15.375 8.14616 15.375Z\"\n            stroke=\"#292D32\"\n            stroke-width=\"1.5\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M15.5837 16.0834L14.167 14.6667\"\n            stroke=\"#292D32\"\n            stroke-width=\"1.5\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n      </svg>\n    </span>\n\n    <input\n      [id]=\"label || name\"\n      type=\"text\"\n      [name]=\"name\"\n      [placeholder]=\"placeholder\"\n      [class]=\"'custom-input ' + class\"\n      [(ngModel)]=\"value\"\n      (ngModelChange)=\"valueChange.emit($event)\"\n    />\n  </div>\n</div>\n", styles: [".custom-input{height:3em;width:100%;border-radius:.375em;border:1px solid #82828233;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;padding-inline-start:2.2em;padding-inline-end:.5em}.custom-input:placeholder-shown{color:#292d32;font-size:1em;font-weight:400}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.search-input-wrapper{position:relative}.search-icon{position:absolute;top:50%;inset-inline-start:.5em;transform:translateY(-50%);color:#9ca3af;pointer-events:none}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomSearchInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-search-input', imports: [FormsModule], template: "<div style=\"width: 100% ; min-width: 15rem\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n  <div class=\"search-input-wrapper\">\n    <span class=\"search-icon\">\n      <svg\n        xmlns=\"http://www.w3.org/2000/svg\"\n        width=\"17\"\n        height=\"18\"\n        viewBox=\"0 0 17 18\"\n        fill=\"none\"\n      >\n        <g opacity=\"0.2\">\n          <path\n            d=\"M8.14616 15.375C11.8626 15.375 14.8753 12.3623 14.8753 8.64585C14.8753 4.92944 11.8626 1.91669 8.14616 1.91669C4.42974 1.91669 1.41699 4.92944 1.41699 8.64585C1.41699 12.3623 4.42974 15.375 8.14616 15.375Z\"\n            stroke=\"#292D32\"\n            stroke-width=\"1.5\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M15.5837 16.0834L14.167 14.6667\"\n            stroke=\"#292D32\"\n            stroke-width=\"1.5\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </g>\n      </svg>\n    </span>\n\n    <input\n      [id]=\"label || name\"\n      type=\"text\"\n      [name]=\"name\"\n      [placeholder]=\"placeholder\"\n      [class]=\"'custom-input ' + class\"\n      [(ngModel)]=\"value\"\n      (ngModelChange)=\"valueChange.emit($event)\"\n    />\n  </div>\n</div>\n", styles: [".custom-input{height:3em;width:100%;border-radius:.375em;border:1px solid #82828233;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;padding-inline-start:2.2em;padding-inline-end:.5em}.custom-input:placeholder-shown{color:#292d32;font-size:1em;font-weight:400}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.search-input-wrapper{position:relative}.search-icon{position:absolute;top:50%;inset-inline-start:.5em;transform:translateY(-50%);color:#9ca3af;pointer-events:none}\n"] }]
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

const infoSvg = '<svg width="170" height="169" viewBox="0 0 150 149" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M75.2708 136.357C41.0382 136.357 13.2873 108.606 13.2873 74.3741C13.2873 40.1415 41.0382 12.3906 75.2708 12.3906C109.503 12.3906 137.254 40.1415 137.254 74.3741C137.254 108.606 109.503 136.357 75.2708 136.357ZM75.2708 123.961C102.657 123.961 124.857 101.76 124.857 74.3741C124.857 46.988 102.657 24.7873 75.2708 24.7873C47.8847 24.7873 25.684 46.988 25.684 74.3741C25.684 101.76 47.8847 123.961 75.2708 123.961ZM69.0724 43.3823H81.4691V55.779H69.0724V43.3823ZM69.0724 68.1757H81.4691V105.366H69.0724V68.1757Z" fill="white"/></svg>';
const checkIcon = `<svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 65C13 36.2812 36.2812 13 65 13C93.7189 13 117 36.2812 117 65C117 93.7189 93.7189 117 65 117C36.2812 117 13 93.7189 13 65ZM65 0C29.1015 0 0 29.1015 0 65C0 100.898 29.1015 130 65 130C100.898 130 130 100.898 130 65C130 29.1015 100.898 0 65 0ZM100.471 48.4712L91.2789 39.2788L58.5 72.0577L40.3462 53.9039L31.1538 63.0961L58.5 90.4423L100.471 48.4712Z" fill="white"/>
</svg>
`;

class CustomConfirmPopupComponent {
    sanitizer;
    message = '';
    type = 'info';
    confirmButtonText = 'YES';
    cancelButtonText = 'NO';
    extraButton;
    confirmEvent = new EventEmitter();
    cancelEvent = new EventEmitter();
    extraEvent = new EventEmitter();
    overlayClicked = new EventEmitter(false);
    showSuccessScreen = input(false);
    successMsg = input('');
    checkedInfoSvg;
    checkIcon;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        const infoSvgIcon = infoSvg;
        this.checkedInfoSvg = this.sanitizer.bypassSecurityTrustHtml(infoSvgIcon);
        this.checkIcon = this.sanitizer.bypassSecurityTrustHtml(checkIcon);
    }
    isVisible = false;
    eventVal;
    open(event) {
        this.isVisible = true;
        this.eventVal = event;
    }
    close() {
        if (!this.showSuccessScreen())
            this.isVisible = false;
    }
    onOverlayClick(event) {
        this.overlayClicked.emit(true);
        if (event.target === event.currentTarget) {
            this.isVisible = false;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomConfirmPopupComponent, deps: [{ token: i1$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomConfirmPopupComponent, isStandalone: true, selector: "custom-confirm-popup", inputs: { message: { classPropertyName: "message", publicName: "message", isSignal: false, isRequired: true, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: false, isRequired: true, transformFunction: null }, confirmButtonText: { classPropertyName: "confirmButtonText", publicName: "confirmButtonText", isSignal: false, isRequired: false, transformFunction: null }, cancelButtonText: { classPropertyName: "cancelButtonText", publicName: "cancelButtonText", isSignal: false, isRequired: false, transformFunction: null }, extraButton: { classPropertyName: "extraButton", publicName: "extraButton", isSignal: false, isRequired: false, transformFunction: null }, showSuccessScreen: { classPropertyName: "showSuccessScreen", publicName: "showSuccessScreen", isSignal: true, isRequired: false, transformFunction: null }, successMsg: { classPropertyName: "successMsg", publicName: "successMsg", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { confirmEvent: "confirmEvent", cancelEvent: "cancelEvent", extraEvent: "extraEvent", overlayClicked: "overlayClicked" }, ngImport: i0, template: "<div class=\"popup-overlay\" *ngIf=\"isVisible\" (click)=\"onOverlayClick($event)\">\n  @if(showSuccessScreen()){\n  <div class=\"success-container\">\n    <div class=\"check-popup-icon\" [innerHTML]=\"checkIcon\"></div>\n    <p class=\"sucess-msg\">\n      {{ successMsg() }}\n    </p>\n  </div>\n\n  } @else {\n  <div class=\"popup-container\" [ngClass]=\"type\">\n    <div class=\"popup-header\">\n      <div class=\"popup-icon\" [innerHTML]=\"checkedInfoSvg\"></div>\n    </div>\n    <div class=\"popup-message\">\n      <p>{{ message }}</p>\n    </div>\n    <div\n      class=\"popup-actions\"\n      [ngClass]=\"{ 'three-buttons': extraButton, 'two-buttons': !extraButton }\"\n    >\n      <button\n        class=\"btn yes-btn\"\n        [ngClass]=\"type\"\n        (click)=\"confirmEvent.emit(); close()\"\n      >\n        {{ confirmButtonText }}\n      </button>\n      @if(extraButton) {\n      <button class=\"btn extra-btn\" (click)=\"extraEvent.emit(); close()\">\n        {{ extraButton }}\n      </button>\n      }\n      <button class=\"btn no-btn\" (click)=\"cancelEvent.emit(); close()\">\n        {{ cancelButtonText }}\n      </button>\n    </div>\n  </div>\n  }\n</div>\n", styles: [".popup-overlay{position:fixed;inset:0;background:#0000001a;display:flex;align-items:center;justify-content:center;z-index:1000}.popup-container{background:#fff;border-radius:.9em;min-width:33em;max-width:95vw;box-shadow:0 4px 24px #0000001a;overflow:hidden;text-align:center}.popup-container.info .popup-header{background:#3b80aa}.popup-container.delete .popup-header{background:#f43f5e}.popup-header{padding:2em 0 1em}.popup-icon{width:110px;height:110px;margin:0 auto;display:flex;align-items:center;justify-content:center}.popup-message{padding:3em 2em 0}.popup-message p{font-size:1.3em;color:#707070;font-weight:600;margin:auto}.popup-actions{display:flex;justify-content:center;gap:24px;padding:3em 4em 4em}.popup-actions.three-buttons{gap:18px}.btn{min-width:5.5em;padding:1em 1.5em;border:none;border-radius:.7em;font-size:1.1em;font-weight:500;cursor:pointer;transition:background .2s;color:#fff}.popup-actions .btn{margin:0}@media (max-width: 600px){.popup-container{min-width:90vw;font-size:.95em}.btn{min-width:90px;font-size:1em;padding:12px 0}}.three-buttons .no-btn{background-color:#ff4c4c}.three-buttons .yes-btn{background-color:#25c7bc}.three-buttons .extra-btn{background-color:#06213d}.two-buttons .yes-btn.info{background:#25c7bc}.two-buttons .yes-btn.delete{background:#ff4c4c}.two-buttons .no-btn{background:#06213d}.success-container{display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:#25c7bc;color:#fff;padding:3em;opacity:0;border-radius:.9em;transform:translateY(20px);animation:slideUp .3s ease-in forwards}.check-popup-icon{width:11em;height:11em;margin:2em auto;display:flex;align-items:center;justify-content:center}.sucess-msg{font-size:1.3em}@keyframes slideUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomConfirmPopupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-confirm-popup', imports: [CommonModule], template: "<div class=\"popup-overlay\" *ngIf=\"isVisible\" (click)=\"onOverlayClick($event)\">\n  @if(showSuccessScreen()){\n  <div class=\"success-container\">\n    <div class=\"check-popup-icon\" [innerHTML]=\"checkIcon\"></div>\n    <p class=\"sucess-msg\">\n      {{ successMsg() }}\n    </p>\n  </div>\n\n  } @else {\n  <div class=\"popup-container\" [ngClass]=\"type\">\n    <div class=\"popup-header\">\n      <div class=\"popup-icon\" [innerHTML]=\"checkedInfoSvg\"></div>\n    </div>\n    <div class=\"popup-message\">\n      <p>{{ message }}</p>\n    </div>\n    <div\n      class=\"popup-actions\"\n      [ngClass]=\"{ 'three-buttons': extraButton, 'two-buttons': !extraButton }\"\n    >\n      <button\n        class=\"btn yes-btn\"\n        [ngClass]=\"type\"\n        (click)=\"confirmEvent.emit(); close()\"\n      >\n        {{ confirmButtonText }}\n      </button>\n      @if(extraButton) {\n      <button class=\"btn extra-btn\" (click)=\"extraEvent.emit(); close()\">\n        {{ extraButton }}\n      </button>\n      }\n      <button class=\"btn no-btn\" (click)=\"cancelEvent.emit(); close()\">\n        {{ cancelButtonText }}\n      </button>\n    </div>\n  </div>\n  }\n</div>\n", styles: [".popup-overlay{position:fixed;inset:0;background:#0000001a;display:flex;align-items:center;justify-content:center;z-index:1000}.popup-container{background:#fff;border-radius:.9em;min-width:33em;max-width:95vw;box-shadow:0 4px 24px #0000001a;overflow:hidden;text-align:center}.popup-container.info .popup-header{background:#3b80aa}.popup-container.delete .popup-header{background:#f43f5e}.popup-header{padding:2em 0 1em}.popup-icon{width:110px;height:110px;margin:0 auto;display:flex;align-items:center;justify-content:center}.popup-message{padding:3em 2em 0}.popup-message p{font-size:1.3em;color:#707070;font-weight:600;margin:auto}.popup-actions{display:flex;justify-content:center;gap:24px;padding:3em 4em 4em}.popup-actions.three-buttons{gap:18px}.btn{min-width:5.5em;padding:1em 1.5em;border:none;border-radius:.7em;font-size:1.1em;font-weight:500;cursor:pointer;transition:background .2s;color:#fff}.popup-actions .btn{margin:0}@media (max-width: 600px){.popup-container{min-width:90vw;font-size:.95em}.btn{min-width:90px;font-size:1em;padding:12px 0}}.three-buttons .no-btn{background-color:#ff4c4c}.three-buttons .yes-btn{background-color:#25c7bc}.three-buttons .extra-btn{background-color:#06213d}.two-buttons .yes-btn.info{background:#25c7bc}.two-buttons .yes-btn.delete{background:#ff4c4c}.two-buttons .no-btn{background:#06213d}.success-container{display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:#25c7bc;color:#fff;padding:3em;opacity:0;border-radius:.9em;transform:translateY(20px);animation:slideUp .3s ease-in forwards}.check-popup-icon{width:11em;height:11em;margin:2em auto;display:flex;align-items:center;justify-content:center}.sucess-msg{font-size:1.3em}@keyframes slideUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}\n"] }]
        }], ctorParameters: () => [{ type: i1$2.DomSanitizer }], propDecorators: { message: [{
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
            }] } });

class CustomCategoryTableComponent {
    path = '../../../../src/public/gear-icon.png';
    tableCategories;
    tableHeader;
    showStatusColumn;
    showActionColumn;
    statusCol = {
        header: 'status',
        trueValue: true,
        trueText: 'Active',
        falseText: 'InActive',
    };
    rowClass = '';
    headerClass = '';
    templates = {};
    enableEdit = true;
    enableDelete = true;
    enableView = true;
    onEdit = new EventEmitter();
    onView = new EventEmitter();
    onDelete = new EventEmitter();
    onRowClick = new EventEmitter();
    tableData = [];
    ngOnInit() {
        if (!this.tableHeader) {
            throw new Error('tableHeader input is required.');
        }
        if (!this.tableCategories) {
            throw new Error('You need to log tableCategories or tableData');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomCategoryTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomCategoryTableComponent, isStandalone: true, selector: "custom-category-table", inputs: { tableCategories: "tableCategories", tableHeader: "tableHeader", showStatusColumn: "showStatusColumn", showActionColumn: "showActionColumn", statusCol: "statusCol", rowClass: "rowClass", headerClass: "headerClass", templates: "templates", enableEdit: "enableEdit", enableDelete: "enableDelete", enableView: "enableView", tableData: "tableData" }, outputs: { onEdit: "onEdit", onView: "onView", onDelete: "onDelete", onRowClick: "onRowClick" }, ngImport: i0, template: "<table class=\"striped-table\">\n  <thead [class]=\"headerClass\">\n    <tr>\n      @for(item of tableHeader; track $index) {\n      <th>{{ item.header }}</th>\n      } @if(showStatusColumn) {\n      <th>Status</th>\n      } @if(showActionColumn) {\n      <th>Actions</th>\n      }\n    </tr>\n  </thead>\n<tbody>\n  @for (item of tableData; track $index) {\n    <tr (click)=\"onRowClick.emit(item)\" [class]=\"rowClass\">\n      @for (col of tableHeader; track $index) {\n        <td>\n          @if(col.htmlRef) {\n            <ng-container *ngTemplateOutlet=\"templates[col.htmlRef]; context: { $implicit: item }\"></ng-container>\n          }\n          @else if(col.body) {\n            {{ col.inputTransform ? col.inputTransform(item) : item[col.body] }}\n          }\n        </td>\n      }\n      @if (showStatusColumn) {\n        <td>\n          @if (item[statusCol.header] === statusCol.trueValue) {\n            <span class=\"true\">{{ statusCol.trueText }}</span>\n          } @else {\n            <span class=\"false\">{{ statusCol.falseText }}</span>\n          }\n        </td>\n      }\n      @if (showActionColumn) {\n        <td>\n          <!-- Actions Here -->\n        </td>\n      }\n    </tr>\n  }\n</tbody>\n\n</table>\n", styles: [".category-section{background-color:#f4f6fb}.category-header{padding:0;border-left:5px solid #25c7bc}.table-header-cell{display:flex;flex-direction:row;justify-content:flex-start;gap:.5em;align-items:center}.sort-icon{height:1.5em;display:flex;align-items:center;justify-content:center;overflow:auto;cursor:pointer}.category-header-wrapper{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;font-weight:700;background-color:#f4f6fb}.category-title{font-size:16px;color:#1a1a1a}.toggle-button{background:none;border:none;color:#25c7bc;cursor:pointer;font-weight:600}.category-item-row{background-color:#fff}.actions{display:flex;justify-content:start;align-items:center;gap:10px;cursor:pointer}.status-td{padding:.1em .4em!important}.status{height:100%;display:flex;justify-content:center;align-items:center}.status div{display:flex;justify-content:center;align-items:center;padding:.25em 0;border:0px solid transparent;border-radius:1em;width:6em}.true{color:#0d7d0b;background-color:#c8ffc7}.false{color:#d2344f;background-color:#ffe0e5}.striped-table{width:82.5em;overflow:hidden;background-color:#fff}.striped-table thead{color:#4b4b4b;text-align:left;border-bottom:2px solid #eeeeee;font-size:.85em}.striped-table th{padding:10px;border:1px solid #eeeeee}.striped-table tbody tr{font-weight:500;font-size:.72em}.striped-table td{padding:.8em .5em;color:#4b4b4b;border:1px solid #eeeeee}.striped-table tbody tr td:first-child{background-color:#fcfbfb}@media (max-width: 768px){.striped-table{display:block}.striped-table thead{display:none}.striped-table tbody tr{display:block;margin-bottom:15px;border-radius:8px;box-shadow:0 2px 8px #0000001a}.striped-table td{display:block;text-align:right;padding-left:50%;position:relative;border:1px solid #e0e0e0}.striped-table td:before{content:attr(data-label);position:absolute;left:15px;width:45%;padding-right:10px;font-weight:600;text-align:left;color:#4a6fa5}}.active{background-color:#c8ffc7;width:85px;height:28px;border-radius:100px;display:flex;justify-self:center;align-items:center;font-size:.67em;font-weight:500;color:#0d7d0b;text-align:center}.inactive{background-color:#ffe0e5;width:85px;height:28px;border-radius:100px;display:flex;justify-content:center;align-items:center;font-size:.67em;font-weight:500;color:#d2344f;text-align:center}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomCategoryTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-category-table', imports: [], template: "<table class=\"striped-table\">\n  <thead [class]=\"headerClass\">\n    <tr>\n      @for(item of tableHeader; track $index) {\n      <th>{{ item.header }}</th>\n      } @if(showStatusColumn) {\n      <th>Status</th>\n      } @if(showActionColumn) {\n      <th>Actions</th>\n      }\n    </tr>\n  </thead>\n<tbody>\n  @for (item of tableData; track $index) {\n    <tr (click)=\"onRowClick.emit(item)\" [class]=\"rowClass\">\n      @for (col of tableHeader; track $index) {\n        <td>\n          @if(col.htmlRef) {\n            <ng-container *ngTemplateOutlet=\"templates[col.htmlRef]; context: { $implicit: item }\"></ng-container>\n          }\n          @else if(col.body) {\n            {{ col.inputTransform ? col.inputTransform(item) : item[col.body] }}\n          }\n        </td>\n      }\n      @if (showStatusColumn) {\n        <td>\n          @if (item[statusCol.header] === statusCol.trueValue) {\n            <span class=\"true\">{{ statusCol.trueText }}</span>\n          } @else {\n            <span class=\"false\">{{ statusCol.falseText }}</span>\n          }\n        </td>\n      }\n      @if (showActionColumn) {\n        <td>\n          <!-- Actions Here -->\n        </td>\n      }\n    </tr>\n  }\n</tbody>\n\n</table>\n", styles: [".category-section{background-color:#f4f6fb}.category-header{padding:0;border-left:5px solid #25c7bc}.table-header-cell{display:flex;flex-direction:row;justify-content:flex-start;gap:.5em;align-items:center}.sort-icon{height:1.5em;display:flex;align-items:center;justify-content:center;overflow:auto;cursor:pointer}.category-header-wrapper{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;font-weight:700;background-color:#f4f6fb}.category-title{font-size:16px;color:#1a1a1a}.toggle-button{background:none;border:none;color:#25c7bc;cursor:pointer;font-weight:600}.category-item-row{background-color:#fff}.actions{display:flex;justify-content:start;align-items:center;gap:10px;cursor:pointer}.status-td{padding:.1em .4em!important}.status{height:100%;display:flex;justify-content:center;align-items:center}.status div{display:flex;justify-content:center;align-items:center;padding:.25em 0;border:0px solid transparent;border-radius:1em;width:6em}.true{color:#0d7d0b;background-color:#c8ffc7}.false{color:#d2344f;background-color:#ffe0e5}.striped-table{width:82.5em;overflow:hidden;background-color:#fff}.striped-table thead{color:#4b4b4b;text-align:left;border-bottom:2px solid #eeeeee;font-size:.85em}.striped-table th{padding:10px;border:1px solid #eeeeee}.striped-table tbody tr{font-weight:500;font-size:.72em}.striped-table td{padding:.8em .5em;color:#4b4b4b;border:1px solid #eeeeee}.striped-table tbody tr td:first-child{background-color:#fcfbfb}@media (max-width: 768px){.striped-table{display:block}.striped-table thead{display:none}.striped-table tbody tr{display:block;margin-bottom:15px;border-radius:8px;box-shadow:0 2px 8px #0000001a}.striped-table td{display:block;text-align:right;padding-left:50%;position:relative;border:1px solid #e0e0e0}.striped-table td:before{content:attr(data-label);position:absolute;left:15px;width:45%;padding-right:10px;font-weight:600;text-align:left;color:#4a6fa5}}.active{background-color:#c8ffc7;width:85px;height:28px;border-radius:100px;display:flex;justify-self:center;align-items:center;font-size:.67em;font-weight:500;color:#0d7d0b;text-align:center}.inactive{background-color:#ffe0e5;width:85px;height:28px;border-radius:100px;display:flex;justify-content:center;align-items:center;font-size:.67em;font-weight:500;color:#d2344f;text-align:center}\n"] }]
        }], propDecorators: { tableCategories: [{
                type: Input,
                args: [{ required: false }]
            }], tableHeader: [{
                type: Input,
                args: [{ required: true }]
            }], showStatusColumn: [{
                type: Input,
                args: [{ required: true }]
            }], showActionColumn: [{
                type: Input,
                args: [{ required: true }]
            }], statusCol: [{
                type: Input
            }], rowClass: [{
                type: Input
            }], headerClass: [{
                type: Input
            }], templates: [{
                type: Input
            }], enableEdit: [{
                type: Input
            }], enableDelete: [{
                type: Input
            }], enableView: [{
                type: Input
            }], onEdit: [{
                type: Output
            }], onView: [{
                type: Output
            }], onDelete: [{
                type: Output
            }], onRowClick: [{
                type: Output
            }], tableData: [{
                type: Input
            }] } });

const sortSvg = '<svg width="10" height="15" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.4"><path d="M1.53516 11.4792L5.6671 15.6112L9.79905 11.4792" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.53516 6.52086L5.6671 2.38892L9.79905 6.52086" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></g></svg>';
const actionViewSvg = '<svg width="auto" height="15" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0001 0.75C14.9429 0.75 19.055 4.30645 19.9172 9C19.055 13.6935 14.9429 17.25 10.0001 17.25C5.05728 17.25 0.945142 13.6935 0.0830078 9C0.945142 4.30645 5.05728 0.75 10.0001 0.75ZM10.0001 15.4167C13.8827 15.4167 17.2051 12.7143 18.0461 9C17.2051 5.28569 13.8827 2.58333 10.0001 2.58333C6.11739 2.58333 2.79504 5.28569 1.95405 9C2.79504 12.7143 6.11739 15.4167 10.0001 15.4167ZM10.0001 13.125C7.7219 13.125 5.87508 11.2782 5.87508 9C5.87508 6.72183 7.7219 4.875 10.0001 4.875C12.2782 4.875 14.1251 6.72183 14.1251 9C14.1251 11.2782 12.2782 13.125 10.0001 13.125ZM10.0001 11.2917C11.2658 11.2917 12.2918 10.2656 12.2918 9C12.2918 7.73436 11.2658 6.70833 10.0001 6.70833C8.73447 6.70833 7.70841 7.73436 7.70841 9C7.70841 10.2656 8.73447 11.2917 10.0001 11.2917Z" fill="#25C7BC"/></svg>';
const actionEditSvg = '<svg width="auto" height="15" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M13.6745 12.0231L14.7622 10.9354C14.9321 10.7654 15.2278 10.8844 15.2278 11.1291V16.0713C15.2278 16.9721 14.497 17.7029 13.5963 17.7029H1.63155C0.7308 17.7029 0 16.9721 0 16.0713V4.10663C0 3.20587 0.7308 2.47507 1.63155 2.47507H10.928C11.1693 2.47507 11.2917 2.76739 11.1218 2.94074L10.0341 4.02845C9.98307 4.07943 9.91508 4.10663 9.8403 4.10663H1.63155V16.0713H13.5963V12.2134C13.5963 12.142 13.6235 12.074 13.6745 12.0231ZM18.9974 5.16374L10.0714 14.0897L6.99868 14.4296C6.10813 14.5282 5.35013 13.777 5.44871 12.8796L5.78861 9.80686L14.7146 0.880909C15.493 0.102522 16.7506 0.102522 17.5256 0.880909L18.994 2.34931C19.7724 3.12769 19.7724 4.38875 18.9974 5.16374ZM15.6391 6.21405L13.6643 4.23919L7.34879 10.5581L7.10065 12.7777L9.32025 12.5295L15.6391 6.21405ZM17.8417 3.50499L16.3733 2.03659C16.234 1.89723 16.0062 1.89723 15.8703 2.03659L14.8199 3.0869L16.7948 5.06176L17.8451 4.01145C17.9811 3.86869 17.9811 3.64435 17.8417 3.50499Z" fill="#444A6D"/></g></svg>';
const actionDeleteSvg = '<svg width="auto" height="15" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8955_16606)"><path d="M15.0485 1.32129L1.69141 14.6784" stroke="#F43F5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.69141 1.32129L15.0485 14.6784" stroke="#F43F5E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_8955_16606"><rect width="15.5833" height="15.5833" fill="white" transform="translate(0.578125 0.208252)"/></clipPath></defs></svg>';
const expandIcon = `<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 0.999999L7 7L13 1" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

class CustomDynamicTableWithCategoriesComponent {
    sanitizer;
    config;
    hasCheckBox = true;
    cellTemplates = {};
    actionTemplates = {};
    sortColumn = new EventEmitter();
    nameClick = new EventEmitter();
    checkedSortIcon;
    checkedActionViewSvg;
    checkedActionEditSvg;
    checkedActionDeleteSvg;
    expandSvg;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        const sortSvgIcon = sortSvg;
        this.checkedSortIcon = this.sanitizer.bypassSecurityTrustHtml(sortSvgIcon);
        const ActionView = actionViewSvg;
        this.checkedActionViewSvg =
            this.sanitizer.bypassSecurityTrustHtml(ActionView);
        const ActionEdit = actionEditSvg;
        this.checkedActionEditSvg =
            this.sanitizer.bypassSecurityTrustHtml(ActionEdit);
        const ActionDelete = actionDeleteSvg;
        this.checkedActionDeleteSvg =
            this.sanitizer.bypassSecurityTrustHtml(ActionDelete);
        const ExpandIcon = expandIcon;
        this.expandSvg = this.sanitizer.bypassSecurityTrustHtml(ExpandIcon);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomDynamicTableWithCategoriesComponent, deps: [{ token: i1$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomDynamicTableWithCategoriesComponent, isStandalone: true, selector: "custom-dynamic-table-with-categories", inputs: { config: "config", hasCheckBox: "hasCheckBox", cellTemplates: "cellTemplates", actionTemplates: "actionTemplates" }, outputs: { sortColumn: "sortColumn", nameClick: "nameClick" }, ngImport: i0, template: "<table class=\"striped-table\">\n  <thead>\n    <tr>\n      @if(hasCheckBox){\n      <th>\n        <div class=\"check-box-container\">\n          <input id=\"checkbox\" class=\"custom-checkbox\" type=\"checkbox\" />\n        </div>\n      </th>\n\n      } @for(column of config.columns; track $index) {\n      <th>\n        <div class=\"table-header-cell\">\n          {{ column.label | translate }}\n          @if(column.sort){\n          <div\n            [innerHTML]=\"checkedSortIcon\"\n            class=\"sort-icon\"\n            (click)=\"sortColumn.emit(column)\"\n          ></div>\n          }\n        </div>\n      </th>\n\n      } @if(config.actions?.length) {\n\n      <th class=\"actions-width\">\n        <div class=\"table-header-cell\">\n          {{ \"Actions\" | translate }}\n        </div>\n      </th>\n      }\n    </tr>\n  </thead>\n  <tbody>\n    @if(config.groupedData?.length) { @for(group of config.groupedData; track\n    $index) {\n    <!-- Group Header -->\n    <tr (click)=\"group.isCollapsed = !group.isCollapsed\">\n      <td\n        class=\"group-header__wrapper\"\n        [attr.colspan]=\"\n          config.columns.length + (config.actions?.length ? 1 : 0)\n        \"\n      >\n        <div class=\"group-header__title-container\">\n          <div\n            [ngClass]=\"{ rotated: group.isCollapsed }\"\n            [innerHTML]=\"expandSvg\"\n            class=\"group-header__expand-icon\"\n          ></div>\n          <p class=\"group-header__title\">\n            {{ group.title }} ({{ group.items.length }})\n          </p>\n        </div>\n      </td>\n    </tr>\n    <!-- Group Rows -->\n    @if(!group.isCollapsed) { @for(row of group.items; track $index) {\n    <tr>\n      <!-- Columns -->\n      <td>\n        <div class=\"check-box-container\">\n          <input id=\"checkbox\" class=\"custom-checkbox\" type=\"checkbox\" />\n        </div>\n      </td>\n      @for(col of config.columns; track $index) {\n\n        @if(col.key === 'nameEn' ||\n      col.key === 'nameAr') {\n      <td\n        [style.background-color]=\"group.color\"\n        (click)=\"nameClick.emit(row)\"\n        [style.cursor]=\"'pointer'\"\n      >\n        <span style=\"font-size: 1em\">\n          {{ getNestedValue(row, col.key) }}\n        </span>\n      </td>\n\n      }@else {\n\n      <td [class]=\"col.customClass\">\n        @if(cellTemplates[col.key]) {\n        <ng-template\n          *ngTemplateOutlet=\"\n            cellTemplates[col.key];\n            context: { $implicit: row }\n          \"\n        >\n        </ng-template>\n        } @else {\n        <span style=\"font-size: 1em\"\n              [ngClass]=\"{'no-wrap': col.key.toLowerCase().includes('date')}\">\n          {{ getNestedValue(row, col.key) }}\n        </span>\n        }\n      </td>\n      } }\n\n      <!-- Actions Column -->\n\n      <td>\n        <div class=\"action-buttons\">\n          @for ( action of config.actions; track $index) {\n          <!-- @if (actionTemplates[action.label]) {\n            <ng-template\n              *ngTemplateOutlet=\"\n                actionTemplates[action.label];\n                context: { $implicit: row }\n              \"\n            >\n            </ng-template>\n            } @else {} -->\n\n          <button\n            style=\"padding: 0.5em\"\n            [disabled]=\"action.isDisabled?.(row)\"\n            (click)=\"onAction(row, action.handler)\"\n          >\n            <img [src]=\"action.iconPath\" alt=\"\" />\n          </button>\n\n          }\n        </div>\n      </td>\n    </tr>\n    } } } }\n  </tbody>\n</table>\n", styles: [".striped-table{margin:.5em;overflow:hidden;background-color:#fff}.striped-table thead{color:#4b4b4b;text-align:left;border-bottom:2px solid #eeeeee;font-size:1.1em}.striped-table th{padding:.6em .8em;border:1px solid #eeeeee}.striped-table tbody tr{font-weight:500;font-size:1em}.striped-table td{padding:.3em .5em;color:#4b4b4b;border:1px solid #eeeeee}.table-header-cell{display:flex;flex-direction:row;justify-content:flex-start;gap:.5em;align-items:center;font-size:.9em;color:#4b4b4b}.sort-icon{height:1.5em;display:flex;align-items:center;justify-content:center;overflow:auto;cursor:pointer}.group-header__wrapper{border:none!important}.group-header__title-container{display:flex;align-items:center}.group-header__expand-icon{cursor:pointer;transition:transform .3s}.rotated{transform:rotate(-180deg)}.group-header__title{margin-top:.8em;margin-bottom:.8em;font-size:1.1em;font-weight:900;margin-inline-start:.5em;color:#000}th:first-child,td:first-child{width:1%}.check-box-container{display:flex;justify-content:center}.custom-checkbox{appearance:none;width:1.2em;height:1.2em;border:1px solid #ccc;border-radius:.1em;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease-in,background-color .3s ease-in}.custom-checkbox:focus{border-color:#25c7bc}.custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.custom-checkbox:checked:after{content:\"\";position:absolute;top:10%;inset-inline-start:50%;transform:translate(-50%,-10%) rotate(45deg);width:.4em;height:.9em;border:solid white;border-width:0 .2em .2em 0}.custom-checkbox:disabled{cursor:not-allowed}.action-buttons{display:flex;gap:.5em}.bg-titles{background-color:#fcfbfb!important}.no-wrap{white-space:nowrap}\n"], dependencies: [{ kind: "ngmodule", type: TranslateModule }, { kind: "pipe", type: i2$1.TranslatePipe, name: "translate" }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomDynamicTableWithCategoriesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-dynamic-table-with-categories', imports: [TranslateModule, NgClass, NgTemplateOutlet], template: "<table class=\"striped-table\">\n  <thead>\n    <tr>\n      @if(hasCheckBox){\n      <th>\n        <div class=\"check-box-container\">\n          <input id=\"checkbox\" class=\"custom-checkbox\" type=\"checkbox\" />\n        </div>\n      </th>\n\n      } @for(column of config.columns; track $index) {\n      <th>\n        <div class=\"table-header-cell\">\n          {{ column.label | translate }}\n          @if(column.sort){\n          <div\n            [innerHTML]=\"checkedSortIcon\"\n            class=\"sort-icon\"\n            (click)=\"sortColumn.emit(column)\"\n          ></div>\n          }\n        </div>\n      </th>\n\n      } @if(config.actions?.length) {\n\n      <th class=\"actions-width\">\n        <div class=\"table-header-cell\">\n          {{ \"Actions\" | translate }}\n        </div>\n      </th>\n      }\n    </tr>\n  </thead>\n  <tbody>\n    @if(config.groupedData?.length) { @for(group of config.groupedData; track\n    $index) {\n    <!-- Group Header -->\n    <tr (click)=\"group.isCollapsed = !group.isCollapsed\">\n      <td\n        class=\"group-header__wrapper\"\n        [attr.colspan]=\"\n          config.columns.length + (config.actions?.length ? 1 : 0)\n        \"\n      >\n        <div class=\"group-header__title-container\">\n          <div\n            [ngClass]=\"{ rotated: group.isCollapsed }\"\n            [innerHTML]=\"expandSvg\"\n            class=\"group-header__expand-icon\"\n          ></div>\n          <p class=\"group-header__title\">\n            {{ group.title }} ({{ group.items.length }})\n          </p>\n        </div>\n      </td>\n    </tr>\n    <!-- Group Rows -->\n    @if(!group.isCollapsed) { @for(row of group.items; track $index) {\n    <tr>\n      <!-- Columns -->\n      <td>\n        <div class=\"check-box-container\">\n          <input id=\"checkbox\" class=\"custom-checkbox\" type=\"checkbox\" />\n        </div>\n      </td>\n      @for(col of config.columns; track $index) {\n\n        @if(col.key === 'nameEn' ||\n      col.key === 'nameAr') {\n      <td\n        [style.background-color]=\"group.color\"\n        (click)=\"nameClick.emit(row)\"\n        [style.cursor]=\"'pointer'\"\n      >\n        <span style=\"font-size: 1em\">\n          {{ getNestedValue(row, col.key) }}\n        </span>\n      </td>\n\n      }@else {\n\n      <td [class]=\"col.customClass\">\n        @if(cellTemplates[col.key]) {\n        <ng-template\n          *ngTemplateOutlet=\"\n            cellTemplates[col.key];\n            context: { $implicit: row }\n          \"\n        >\n        </ng-template>\n        } @else {\n        <span style=\"font-size: 1em\"\n              [ngClass]=\"{'no-wrap': col.key.toLowerCase().includes('date')}\">\n          {{ getNestedValue(row, col.key) }}\n        </span>\n        }\n      </td>\n      } }\n\n      <!-- Actions Column -->\n\n      <td>\n        <div class=\"action-buttons\">\n          @for ( action of config.actions; track $index) {\n          <!-- @if (actionTemplates[action.label]) {\n            <ng-template\n              *ngTemplateOutlet=\"\n                actionTemplates[action.label];\n                context: { $implicit: row }\n              \"\n            >\n            </ng-template>\n            } @else {} -->\n\n          <button\n            style=\"padding: 0.5em\"\n            [disabled]=\"action.isDisabled?.(row)\"\n            (click)=\"onAction(row, action.handler)\"\n          >\n            <img [src]=\"action.iconPath\" alt=\"\" />\n          </button>\n\n          }\n        </div>\n      </td>\n    </tr>\n    } } } }\n  </tbody>\n</table>\n", styles: [".striped-table{margin:.5em;overflow:hidden;background-color:#fff}.striped-table thead{color:#4b4b4b;text-align:left;border-bottom:2px solid #eeeeee;font-size:1.1em}.striped-table th{padding:.6em .8em;border:1px solid #eeeeee}.striped-table tbody tr{font-weight:500;font-size:1em}.striped-table td{padding:.3em .5em;color:#4b4b4b;border:1px solid #eeeeee}.table-header-cell{display:flex;flex-direction:row;justify-content:flex-start;gap:.5em;align-items:center;font-size:.9em;color:#4b4b4b}.sort-icon{height:1.5em;display:flex;align-items:center;justify-content:center;overflow:auto;cursor:pointer}.group-header__wrapper{border:none!important}.group-header__title-container{display:flex;align-items:center}.group-header__expand-icon{cursor:pointer;transition:transform .3s}.rotated{transform:rotate(-180deg)}.group-header__title{margin-top:.8em;margin-bottom:.8em;font-size:1.1em;font-weight:900;margin-inline-start:.5em;color:#000}th:first-child,td:first-child{width:1%}.check-box-container{display:flex;justify-content:center}.custom-checkbox{appearance:none;width:1.2em;height:1.2em;border:1px solid #ccc;border-radius:.1em;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease-in,background-color .3s ease-in}.custom-checkbox:focus{border-color:#25c7bc}.custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.custom-checkbox:checked:after{content:\"\";position:absolute;top:10%;inset-inline-start:50%;transform:translate(-50%,-10%) rotate(45deg);width:.4em;height:.9em;border:solid white;border-width:0 .2em .2em 0}.custom-checkbox:disabled{cursor:not-allowed}.action-buttons{display:flex;gap:.5em}.bg-titles{background-color:#fcfbfb!important}.no-wrap{white-space:nowrap}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomAvatarsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomAvatarsComponent, isStandalone: true, selector: "custom-avatars", inputs: { items: "items", size: "size", overlapOffset: "overlapOffset", removeOutline: "removeOutline" }, ngImport: i0, template: "<div class=\"avatar-list\">\n  @for(item of items; track $index) { @if(item.name || item.imgPath){\n\n  <div\n    class=\"avatar-item\"\n    [style.width.em]=\"size\"\n    [style.height.em]=\"size\"\n    [title]=\"item.name\"\n    [style.transform]=\"'translateX(' + -$index * overlapOffset + 'em)'\"\n    [style.zIndex]=\"items.length - $index\"\n    [ngClass]=\"{ outline: !removeOutline }\"\n  >\n    @switch(!!item.imgPath) { @case(true) {\n    <img\n      [src]=\"item.imgPath\"\n      [alt]=\"item.name\"\n      class=\"avatar-img\"\n      [style.width.em]=\"size\"\n      [style.height.em]=\"size\"\n    />\n    } @default {\n    <div\n      style=\"letter-spacing: 0.1em\"\n      class=\"avatar-initials\"\n      [style.fontSize.em]=\"size / 3\"\n      [style.background-color]=\"'#e57373'\"\n    >\n      {{ getInitials(item.name) }}\n    </div>\n\n    } }\n  </div>\n  } }\n</div>\n", styles: [".avatar-list{display:flex;align-items:center}.avatar-item{position:relative;border-radius:50%;overflow:hidden;flex-shrink:0}.outline{border:solid 2px #fff;box-shadow:0 0 0 1px #0000001a}.avatar-img{object-fit:cover;display:block}.avatar-initials{display:flex;justify-content:center;align-items:center;background-color:#bbb;color:#fff;font-weight:700;width:100%;height:100%}\n"], dependencies: [{ kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomAvatarsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-avatars', imports: [NgClass], template: "<div class=\"avatar-list\">\n  @for(item of items; track $index) { @if(item.name || item.imgPath){\n\n  <div\n    class=\"avatar-item\"\n    [style.width.em]=\"size\"\n    [style.height.em]=\"size\"\n    [title]=\"item.name\"\n    [style.transform]=\"'translateX(' + -$index * overlapOffset + 'em)'\"\n    [style.zIndex]=\"items.length - $index\"\n    [ngClass]=\"{ outline: !removeOutline }\"\n  >\n    @switch(!!item.imgPath) { @case(true) {\n    <img\n      [src]=\"item.imgPath\"\n      [alt]=\"item.name\"\n      class=\"avatar-img\"\n      [style.width.em]=\"size\"\n      [style.height.em]=\"size\"\n    />\n    } @default {\n    <div\n      style=\"letter-spacing: 0.1em\"\n      class=\"avatar-initials\"\n      [style.fontSize.em]=\"size / 3\"\n      [style.background-color]=\"'#e57373'\"\n    >\n      {{ getInitials(item.name) }}\n    </div>\n\n    } }\n  </div>\n  } }\n</div>\n", styles: [".avatar-list{display:flex;align-items:center}.avatar-item{position:relative;border-radius:50%;overflow:hidden;flex-shrink:0}.outline{border:solid 2px #fff;box-shadow:0 0 0 1px #0000001a}.avatar-img{object-fit:cover;display:block}.avatar-initials{display:flex;justify-content:center;align-items:center;background-color:#bbb;color:#fff;font-weight:700;width:100%;height:100%}\n"] }]
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
    emptyColor = '#D9FFF7';
    showProgressInline = true;
    barHeight = '5px';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomProgressBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: CustomProgressBarComponent, isStandalone: true, selector: "custom-progress-bar", inputs: { value: "value", color: "color", emptyColor: "emptyColor", showProgressInline: "showProgressInline", barHeight: "barHeight" }, ngImport: i0, template: "<div\n  class=\"progress-bar-main\"\n  [ngClass]=\"{\n    'inline-Progress': showProgressInline,\n    'col-Progress': !showProgressInline\n  }\"\n>\n  <div\n    class=\"progress-bar-container\"\n    [ngStyle]=\"{\n      'background-color': emptyColor,\n      '--bar-height': barHeight\n    }\"\n  >\n    <div\n      class=\"progress-bar-fill\"\n      [ngStyle]=\"{\n        'width.%': value,\n        'background-color': color\n      }\"\n    ></div>\n  </div>\n  <div class=\"progress-bar-label\">{{ value }}%</div>\n</div>\n", styles: [".progress-bar-main{display:flex;justify-content:center}.progress-bar-container{width:100%;background:#f0f0f0;height:var(--bar-height, 5px);border-radius:4px;overflow:hidden}.progress-bar-fill{height:100%;border-radius:4px;transition:width .3s ease}.progress-bar-label{font-size:1em;text-align:right;margin-inline-start:.5em}.inline-Progress{flex-direction:row;align-items:center}.col-Progress{flex-direction:column-reverse;align-items:flex-end}\n"], dependencies: [{ kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomProgressBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-progress-bar', imports: [NgStyle, NgClass], template: "<div\n  class=\"progress-bar-main\"\n  [ngClass]=\"{\n    'inline-Progress': showProgressInline,\n    'col-Progress': !showProgressInline\n  }\"\n>\n  <div\n    class=\"progress-bar-container\"\n    [ngStyle]=\"{\n      'background-color': emptyColor,\n      '--bar-height': barHeight\n    }\"\n  >\n    <div\n      class=\"progress-bar-fill\"\n      [ngStyle]=\"{\n        'width.%': value,\n        'background-color': color\n      }\"\n    ></div>\n  </div>\n  <div class=\"progress-bar-label\">{{ value }}%</div>\n</div>\n", styles: [".progress-bar-main{display:flex;justify-content:center}.progress-bar-container{width:100%;background:#f0f0f0;height:var(--bar-height, 5px);border-radius:4px;overflow:hidden}.progress-bar-fill{height:100%;border-radius:4px;transition:width .3s ease}.progress-bar-label{font-size:1em;text-align:right;margin-inline-start:.5em}.inline-Progress{flex-direction:row;align-items:center}.col-Progress{flex-direction:column-reverse;align-items:flex-end}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], color: [{
                type: Input
            }], emptyColor: [{
                type: Input
            }], showProgressInline: [{
                type: Input
            }], barHeight: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomDropdownButtonComponent, deps: [{ token: i1$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomDropdownButtonComponent, isStandalone: true, selector: "custom-dropdown-button", inputs: { options: "options" }, outputs: { selected: "selected" }, ngImport: i0, template: "<div class=\"dropdown-wrapper\">\n  <button (click)=\"toggleDropdown()\" class=\"dropdown-btn\">\n    <div class=\"dropdown-label\">\n      <ng-content select=\"[buttonLabel]\"></ng-content>\n    </div>\n    <div class=\"dropdown-label-arrow\" [innerHTML]=\"dropdownArrow\"></div>\n  </button>\n\n  @if(isOpen){\n  <div\n    #ButtonDropdown\n    class=\"dropdown-menu\"\n    [clickOutside]=\"ButtonDropdown\"\n    (clickOutsideEmitter)=\"isOpen = false\"\n  >\n    <div class=\"dropdown-options\">\n      @for (option of options; track option) {\n      <button\n        class=\"dropdown-item\"\n        (click)=\"$event.stopPropagation(); handleSelect(option)\"\n      >\n        {{ option.nameEn }}\n      </button>\n      }\n    </div>\n  </div>\n  }\n</div>\n", styles: [".dropdown-wrapper{position:relative;display:flex;text-align:left;background-color:#25c7bc;border-radius:.4em;padding:.1em;height:2.6em;align-items:center;justify-content:center}.dropdown-btn{display:flex;align-items:center;color:#fff;font-weight:500;border:none;outline:none;cursor:pointer;overflow:hidden;min-width:9em}.dropdown-label{padding:0 .5em;border-right:2px #ffffff33 solid;font-size:1.7rem;font-weight:530;height:100%;display:flex;justify-content:center;align-items:center;min-width:75%}.dropdown-label-arrow{padding:0 .5em;height:100%}.dropdown-wrapper:hover{background-color:#39dbd0}.dropdown-menu{position:absolute;right:0;top:100%;margin-top:.2em;width:100%;background-color:#fff;border:1px solid #e5e7eb;border-radius:.4em;box-shadow:0 10px 15px -3px #0000001a,0 4px 6px -2px #0000000d;z-index:999;overflow:hidden;min-width:13em}.dropdown-options{padding:.5em}.dropdown-item{display:block;width:100%;text-align:left;padding:.2em .4em;color:#374151;background:none;border:none;cursor:pointer}.dropdown-item:hover{background-color:#e9fffa}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomDropdownButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-dropdown-button', imports: [CommonModule, ClickOutsideDirective], template: "<div class=\"dropdown-wrapper\">\n  <button (click)=\"toggleDropdown()\" class=\"dropdown-btn\">\n    <div class=\"dropdown-label\">\n      <ng-content select=\"[buttonLabel]\"></ng-content>\n    </div>\n    <div class=\"dropdown-label-arrow\" [innerHTML]=\"dropdownArrow\"></div>\n  </button>\n\n  @if(isOpen){\n  <div\n    #ButtonDropdown\n    class=\"dropdown-menu\"\n    [clickOutside]=\"ButtonDropdown\"\n    (clickOutsideEmitter)=\"isOpen = false\"\n  >\n    <div class=\"dropdown-options\">\n      @for (option of options; track option) {\n      <button\n        class=\"dropdown-item\"\n        (click)=\"$event.stopPropagation(); handleSelect(option)\"\n      >\n        {{ option.nameEn }}\n      </button>\n      }\n    </div>\n  </div>\n  }\n</div>\n", styles: [".dropdown-wrapper{position:relative;display:flex;text-align:left;background-color:#25c7bc;border-radius:.4em;padding:.1em;height:2.6em;align-items:center;justify-content:center}.dropdown-btn{display:flex;align-items:center;color:#fff;font-weight:500;border:none;outline:none;cursor:pointer;overflow:hidden;min-width:9em}.dropdown-label{padding:0 .5em;border-right:2px #ffffff33 solid;font-size:1.7rem;font-weight:530;height:100%;display:flex;justify-content:center;align-items:center;min-width:75%}.dropdown-label-arrow{padding:0 .5em;height:100%}.dropdown-wrapper:hover{background-color:#39dbd0}.dropdown-menu{position:absolute;right:0;top:100%;margin-top:.2em;width:100%;background-color:#fff;border:1px solid #e5e7eb;border-radius:.4em;box-shadow:0 10px 15px -3px #0000001a,0 4px 6px -2px #0000000d;z-index:999;overflow:hidden;min-width:13em}.dropdown-options{padding:.5em}.dropdown-item{display:block;width:100%;text-align:left;padding:.2em .4em;color:#374151;background:none;border:none;cursor:pointer}.dropdown-item:hover{background-color:#e9fffa}\n"] }]
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
    dropdownOptions = [
        {
            nameEn: 'Option 1',
            nameAr: '',
            id: '1',
        },
        {
            nameEn: 'Option 2',
            nameAr: '',
            id: '2',
        },
        {
            nameEn: 'Option 3',
            nameAr: '',
            id: '3',
        },
    ];
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.xMarkSvg = this.sanitizer.bypassSecurityTrustHtml(xMark);
        this.DetailDDSvg = this.sanitizer.bypassSecurityTrustHtml(detailDD);
    }
    toggleDropdown(event) {
        event.stopPropagation();
        this.showDropdown = !this.showDropdown;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomDetailsHeaderComponent, deps: [{ token: i1$2.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomDetailsHeaderComponent, isStandalone: true, selector: "custom-details-header", inputs: { showX: "showX", BreadCrumbs: "BreadCrumbs" }, outputs: { closeContainer: "closeContainer", dropdownSelectAction: "dropdownSelectAction" }, ngImport: i0, template: "<div class=\"custom-details-header\">\n  <custom-breadcrumb [breadcrumbItems]=\"breadCrumb\" />\n  <div class=\"header-svg\">\n    <overlay-panel [overlayClass]=\"'custom-class'\">\n      <ng-template #target>\n        <div\n          class=\"svg-element\"\n          [innerHTML]=\"DetailDDSvg\"\n          style=\"display: flex; align-items: center; height: 100%; width: 100%\"\n        ></div>\n      </ng-template>\n      <ng-template #overlay>\n        <ul class=\"flex flex-col py-1\">\n          @for(item of dropdownOptions;track item){\n          <li\n            class=\"px-2 py-1 cursor-pointer hover-action\"\n            (click)=\"dropdownSelectAction.emit(item.id)\"\n          >\n            {{ item.nameEn }}\n          </li>\n          }\n        </ul>\n      </ng-template>\n    </overlay-panel>\n    <!--  -->\n    @if(showX){\n    <div\n      class=\"svg-element\"\n      [innerHTML]=\"xMarkSvg\"\n      (click)=\"$event.stopPropagation(); closeContainer.emit()\"\n    ></div>\n    }\n  </div>\n</div>\n", styles: [".custom-details-header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;border-bottom:1px #e8e8e8 solid;padding:1em 1.1em 1em 1.5em}.header-svg{display:flex;flex-direction:row;justify-content:center;align-items:center}.header-svg .svg-element{padding:.5em .5em .5em .8em;cursor:pointer;position:relative}.header-dropdown-menu{position:absolute;background:#fff;border:1px solid #ccc;z-index:1000;min-width:120px;box-shadow:0 2px 8px #00000026;padding:8px 0}\n"], dependencies: [{ kind: "component", type: CustomBreadcrumbComponent, selector: "custom-breadcrumb", inputs: ["breadcrumbItems"], outputs: ["breadcrumbItemClicked"] }, { kind: "component", type: OverlayPanelComponent, selector: "overlay-panel", inputs: ["overlayClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomDetailsHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-details-header', imports: [CustomBreadcrumbComponent, OverlayPanelComponent], template: "<div class=\"custom-details-header\">\n  <custom-breadcrumb [breadcrumbItems]=\"breadCrumb\" />\n  <div class=\"header-svg\">\n    <overlay-panel [overlayClass]=\"'custom-class'\">\n      <ng-template #target>\n        <div\n          class=\"svg-element\"\n          [innerHTML]=\"DetailDDSvg\"\n          style=\"display: flex; align-items: center; height: 100%; width: 100%\"\n        ></div>\n      </ng-template>\n      <ng-template #overlay>\n        <ul class=\"flex flex-col py-1\">\n          @for(item of dropdownOptions;track item){\n          <li\n            class=\"px-2 py-1 cursor-pointer hover-action\"\n            (click)=\"dropdownSelectAction.emit(item.id)\"\n          >\n            {{ item.nameEn }}\n          </li>\n          }\n        </ul>\n      </ng-template>\n    </overlay-panel>\n    <!--  -->\n    @if(showX){\n    <div\n      class=\"svg-element\"\n      [innerHTML]=\"xMarkSvg\"\n      (click)=\"$event.stopPropagation(); closeContainer.emit()\"\n    ></div>\n    }\n  </div>\n</div>\n", styles: [".custom-details-header{display:flex;flex-direction:row;justify-content:space-between;align-items:center;border-bottom:1px #e8e8e8 solid;padding:1em 1.1em 1em 1.5em}.header-svg{display:flex;flex-direction:row;justify-content:center;align-items:center}.header-svg .svg-element{padding:.5em .5em .5em .8em;cursor:pointer;position:relative}.header-dropdown-menu{position:absolute;background:#fff;border:1px solid #ccc;z-index:1000;min-width:120px;box-shadow:0 2px 8px #00000026;padding:8px 0}\n"] }]
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
    isVisible = false;
    open() {
        this.isVisible = true;
    }
    close() {
        this.isVisible = false;
        // this.hideEvent.emit();
    }
    onOverlayClick(event) {
        if (event.target === event.currentTarget && this.overlayClickClose) {
            this.close();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomDetailsModalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomDetailsModalComponent, isStandalone: true, selector: "custom-details-modal", inputs: { modalTitle: "modalTitle", overlayClickClose: "overlayClickClose", BreadCrumbs: "BreadCrumbs" }, outputs: { headerButtonClick: "headerButtonClick" }, ngImport: i0, template: "@if(isVisible){\n<div\n  class=\"details-modal-overlay flex flex-row justify-start align-start\"\n  (click)=\"onOverlayClick($event)\"\n>\n  <!-- X button outside details-modal-content -->\n\n  <div class=\"flex flex-row\">\n    <div class=\"details-modal-body\">\n      <div class=\"details-modal-header\">\n        <custom-details-header\n          [BreadCrumbs]=\"BreadCrumbs\"\n          (closeContainer)=\"close()\"\n        >\n        </custom-details-header>\n      </div>\n      <div class=\"details-modal-content\">\n        <div class=\"details-modal-section\">\n          <ng-content select=\"[mainContent]\"></ng-content>\n        </div>\n        <div\n          class=\"details-modal-section\"\n          [ngStyle]=\"{ borderLeft: '1px #00000026 solid' }\"\n        >\n          <ng-content select=\"[sideContent]\"></ng-content>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n}\n", styles: [".details-modal-overlay{font-size:1em;position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000000b3;display:flex;align-items:center;justify-content:center;z-index:1000;overflow-y:none}.details-modal-body{position:relative;background:#fff;border-radius:10px;min-width:600px;max-width:95vw;display:flex;align-items:center;flex-direction:column;height:max-content;max-height:80vh;overflow-y:none;overflow-x:none}.details-modal-header{display:block;width:100%;align-items:center;justify-content:start;position:relative;height:100%}.details-modal-content{width:100%;display:grid;grid-template-columns:10fr 5fr;overflow:auto;height:100%}.details-modal-section{overflow-y:auto;height:100%}.border-content{border-right:1px #00000026 solid}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: CustomDetailsHeaderComponent, selector: "custom-details-header", inputs: ["showX", "BreadCrumbs"], outputs: ["closeContainer", "dropdownSelectAction"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomDetailsModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-details-modal', imports: [CommonModule, CustomDetailsHeaderComponent], template: "@if(isVisible){\n<div\n  class=\"details-modal-overlay flex flex-row justify-start align-start\"\n  (click)=\"onOverlayClick($event)\"\n>\n  <!-- X button outside details-modal-content -->\n\n  <div class=\"flex flex-row\">\n    <div class=\"details-modal-body\">\n      <div class=\"details-modal-header\">\n        <custom-details-header\n          [BreadCrumbs]=\"BreadCrumbs\"\n          (closeContainer)=\"close()\"\n        >\n        </custom-details-header>\n      </div>\n      <div class=\"details-modal-content\">\n        <div class=\"details-modal-section\">\n          <ng-content select=\"[mainContent]\"></ng-content>\n        </div>\n        <div\n          class=\"details-modal-section\"\n          [ngStyle]=\"{ borderLeft: '1px #00000026 solid' }\"\n        >\n          <ng-content select=\"[sideContent]\"></ng-content>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n}\n", styles: [".details-modal-overlay{font-size:1em;position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000000b3;display:flex;align-items:center;justify-content:center;z-index:1000;overflow-y:none}.details-modal-body{position:relative;background:#fff;border-radius:10px;min-width:600px;max-width:95vw;display:flex;align-items:center;flex-direction:column;height:max-content;max-height:80vh;overflow-y:none;overflow-x:none}.details-modal-header{display:block;width:100%;align-items:center;justify-content:start;position:relative;height:100%}.details-modal-content{width:100%;display:grid;grid-template-columns:10fr 5fr;overflow:auto;height:100%}.details-modal-section{overflow-y:auto;height:100%}.border-content{border-right:1px #00000026 solid}\n"] }]
        }], propDecorators: { modalTitle: [{
                type: Input
            }], overlayClickClose: [{
                type: Input
            }], BreadCrumbs: [{
                type: Input
            }], headerButtonClick: [{
                type: Output
            }] } });

class CustomDetailsNavComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomDetailsNavComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: CustomDetailsNavComponent, isStandalone: true, selector: "custom-details-nav", ngImport: i0, template: "<p>activity<br />chat</p>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomDetailsNavComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-details-nav', imports: [], template: "<p>activity<br />chat</p>\n" }]
        }] });

class CustomTitleContentComponent {
    title;
    color = '#06213D';
    separator = true;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomTitleContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.14", type: CustomTitleContentComponent, isStandalone: true, selector: "custom-title-content", inputs: { title: "title", color: "color", separator: "separator" }, ngImport: i0, template: "<div class=\"title-content-container\">\n  <h1\n    class=\"title-styles\"\n    [ngClass]=\"{ 'title-border': separator }\"\n    [ngStyle]=\"{ '--title-color': color }\"\n  >\n    {{ title }}\n  </h1>\n  <div class=\"content-section\">\n    <ng-content select=\"[content]\"></ng-content>\n  </div>\n</div>\n", styles: [".title-content-container{margin:1.5em 0;padding:0}.title-styles{font-size:1.25em;font-weight:600;color:var(--title-color);margin-bottom:1em;padding-bottom:.2em}.title-border{border-bottom:1px solid #00000026}.content-section{margin-top:1em;display:flex;flex-direction:column;gap:1em}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomTitleContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-title-content', imports: [CommonModule], template: "<div class=\"title-content-container\">\n  <h1\n    class=\"title-styles\"\n    [ngClass]=\"{ 'title-border': separator }\"\n    [ngStyle]=\"{ '--title-color': color }\"\n  >\n    {{ title }}\n  </h1>\n  <div class=\"content-section\">\n    <ng-content select=\"[content]\"></ng-content>\n  </div>\n</div>\n", styles: [".title-content-container{margin:1.5em 0;padding:0}.title-styles{font-size:1.25em;font-weight:600;color:var(--title-color);margin-bottom:1em;padding-bottom:.2em}.title-border{border-bottom:1px solid #00000026}.content-section{margin-top:1em;display:flex;flex-direction:column;gap:1em}\n"] }]
        }], propDecorators: { title: [{
                type: Input
            }], color: [{
                type: Input
            }], separator: [{
                type: Input
            }] } });

class CustomPlateNumberInputFormComponent {
    class = '';
    labelClass = '';
    label = '';
    parentForm;
    numberControlName = '';
    lettersControlName = '';
    validation = [];
    maxNumberLength = 4;
    maxLetterLength = 3;
    // maxLetterLength
    valueChange = new EventEmitter();
    containRequiredError() {
        return this.validation.some((error) => error.errorType.includes(ComponentFormErrorConstant.REQUIRED));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomPlateNumberInputFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.14", type: CustomPlateNumberInputFormComponent, isStandalone: true, selector: "custom-plate-input-form", inputs: { class: "class", labelClass: "labelClass", label: "label", parentForm: "parentForm", numberControlName: "numberControlName", lettersControlName: "lettersControlName", validation: "validation", maxNumberLength: "maxNumberLength", maxLetterLength: "maxLetterLength" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\" class=\"input-wrapper\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    } @else {\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n\n  <div class=\"plate-input-row\">\n    <!-- Numeric Part -->\n    <div\n      class=\"input-error-container\"\n      [class.has-error]=\"\n        parentForm.controls[numberControlName].invalid &&\n        parentForm.controls[numberControlName].touched\n      \"\n    >\n      <input\n        [id]=\"label + '-number'\"\n        type=\"text\"\n        [name]=\"numberControlName\"\n        placeholder=\"1234\"\n        [class]=\"'custom-input left plate-number-input ' + class\"\n        [formControlName]=\"numberControlName\"\n        (ngModelChange)=\"valueChange.emit($event)\"\n        [class.input-error]=\"\n          parentForm.controls[numberControlName].invalid &&\n          parentForm.controls[numberControlName].touched\n        \"\n        [maxlength]=\"maxNumberLength\"\n      />\n      @if(parentForm.controls[numberControlName].invalid &&\n      parentForm.controls[numberControlName].touched){\n      <span class=\"input-error-icon\"><!-- SVG as in your original --></span>\n      }\n    </div>\n\n    <!-- Letters Part -->\n    <div\n      class=\"input-error-container\"\n      [class.has-error]=\"\n        parentForm.controls[lettersControlName].invalid &&\n        parentForm.controls[lettersControlName].touched\n      \"\n    >\n      <input\n        [id]=\"label + '-letters'\"\n        type=\"text\"\n        [name]=\"lettersControlName\"\n        placeholder=\"ABC\"\n        [class]=\"'custom-input right plate-letters-input ' + class\"\n        [formControlName]=\"lettersControlName\"\n        (ngModelChange)=\"valueChange.emit($event)\"\n        [class.input-error]=\"\n          parentForm.controls[lettersControlName].invalid &&\n          parentForm.controls[lettersControlName].touched\n        \"\n        [maxlength]=\"maxLetterLength\"\n      />\n      @if(parentForm.controls[lettersControlName].invalid &&\n      parentForm.controls[lettersControlName].touched){\n      <span class=\"input-error-icon\"><!-- SVG as in your original --></span>\n      }\n    </div>\n  </div>\n\n  <!-- Error Messages -->\n  @if( (parentForm.controls[numberControlName].invalid &&\n  parentForm.controls[numberControlName].touched) ||\n  (parentForm.controls[lettersControlName].invalid &&\n  parentForm.controls[lettersControlName].touched) ){\n  <div class=\"dropdown-error-container\">\n    <custom-app-error\n      [control]=\"\n        parentForm.controls[numberControlName].invalid\n          ? parentForm.controls[numberControlName]\n          : parentForm.controls[lettersControlName]\n      \"\n      [validation]=\"validation\"\n      [name]=\"label\"\n    />\n  </div>\n  }\n</div>\n", styles: [".plate-input-row{display:flex;gap:-.1em}.plate-number-input{width:50%}.plate-letters-input{width:40%}.input-wrapper,.input-error-container{position:relative}.custom-input{width:100%;border:1px solid #82828233;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;padding:1em;transition:border-color .2s}.custom-input.left{border-radius:.375em 0 0 .375em}.custom-input.right{border-radius:0 .375em .375em 0;margin-left:-.01em}.custom-input.input-error{border:1px solid #d70c0c;box-shadow:1px 0 6px #d70c0c26}.input-error-icon{position:absolute;right:1em;top:50%;transform:translateY(-50%);color:#d70c0c;font-size:1.5em;pointer-events:none}.custom-input::placeholder{color:#82828233;font-size:1em;font-weight:400}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.dropdown-error-container{position:relative;right:-.8em}\n"], dependencies: [{ kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name", "showErrors"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: CustomPlateNumberInputFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-plate-input-form', imports: [ReactiveFormsModule, CustomAppErrorComponent], template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\" class=\"input-wrapper\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    } @else {\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >&nbsp;</span\n    >\n    }\n  </label>\n  }\n\n  <div class=\"plate-input-row\">\n    <!-- Numeric Part -->\n    <div\n      class=\"input-error-container\"\n      [class.has-error]=\"\n        parentForm.controls[numberControlName].invalid &&\n        parentForm.controls[numberControlName].touched\n      \"\n    >\n      <input\n        [id]=\"label + '-number'\"\n        type=\"text\"\n        [name]=\"numberControlName\"\n        placeholder=\"1234\"\n        [class]=\"'custom-input left plate-number-input ' + class\"\n        [formControlName]=\"numberControlName\"\n        (ngModelChange)=\"valueChange.emit($event)\"\n        [class.input-error]=\"\n          parentForm.controls[numberControlName].invalid &&\n          parentForm.controls[numberControlName].touched\n        \"\n        [maxlength]=\"maxNumberLength\"\n      />\n      @if(parentForm.controls[numberControlName].invalid &&\n      parentForm.controls[numberControlName].touched){\n      <span class=\"input-error-icon\"><!-- SVG as in your original --></span>\n      }\n    </div>\n\n    <!-- Letters Part -->\n    <div\n      class=\"input-error-container\"\n      [class.has-error]=\"\n        parentForm.controls[lettersControlName].invalid &&\n        parentForm.controls[lettersControlName].touched\n      \"\n    >\n      <input\n        [id]=\"label + '-letters'\"\n        type=\"text\"\n        [name]=\"lettersControlName\"\n        placeholder=\"ABC\"\n        [class]=\"'custom-input right plate-letters-input ' + class\"\n        [formControlName]=\"lettersControlName\"\n        (ngModelChange)=\"valueChange.emit($event)\"\n        [class.input-error]=\"\n          parentForm.controls[lettersControlName].invalid &&\n          parentForm.controls[lettersControlName].touched\n        \"\n        [maxlength]=\"maxLetterLength\"\n      />\n      @if(parentForm.controls[lettersControlName].invalid &&\n      parentForm.controls[lettersControlName].touched){\n      <span class=\"input-error-icon\"><!-- SVG as in your original --></span>\n      }\n    </div>\n  </div>\n\n  <!-- Error Messages -->\n  @if( (parentForm.controls[numberControlName].invalid &&\n  parentForm.controls[numberControlName].touched) ||\n  (parentForm.controls[lettersControlName].invalid &&\n  parentForm.controls[lettersControlName].touched) ){\n  <div class=\"dropdown-error-container\">\n    <custom-app-error\n      [control]=\"\n        parentForm.controls[numberControlName].invalid\n          ? parentForm.controls[numberControlName]\n          : parentForm.controls[lettersControlName]\n      \"\n      [validation]=\"validation\"\n      [name]=\"label\"\n    />\n  </div>\n  }\n</div>\n", styles: [".plate-input-row{display:flex;gap:-.1em}.plate-number-input{width:50%}.plate-letters-input{width:40%}.input-wrapper,.input-error-container{position:relative}.custom-input{width:100%;border:1px solid #82828233;outline:none!important;box-shadow:none;font-size:1em;font-weight:400;padding:1em;transition:border-color .2s}.custom-input.left{border-radius:.375em 0 0 .375em}.custom-input.right{border-radius:0 .375em .375em 0;margin-left:-.01em}.custom-input.input-error{border:1px solid #d70c0c;box-shadow:1px 0 6px #d70c0c26}.input-error-icon{position:absolute;right:1em;top:50%;transform:translateY(-50%);color:#d70c0c;font-size:1.5em;pointer-events:none}.custom-input::placeholder{color:#82828233;font-size:1em;font-weight:400}.custom-label{font-size:1em;font-weight:500;display:block;color:#707070;margin-bottom:.3em}.dropdown-error-container{position:relative;right:-.8em}\n"] }]
        }], propDecorators: { class: [{
                type: Input
            }], labelClass: [{
                type: Input
            }], label: [{
                type: Input
            }], parentForm: [{
                type: Input,
                args: [{ required: true }]
            }], numberControlName: [{
                type: Input,
                args: [{ required: true }]
            }], lettersControlName: [{
                type: Input,
                args: [{ required: true }]
            }], validation: [{
                type: Input,
                args: [{ required: true }]
            }], maxNumberLength: [{
                type: Input
            }], maxLetterLength: [{
                type: Input
            }], valueChange: [{
                type: Output
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: DispatchingFeComponentsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: DispatchingFeComponentsService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.14", ngImport: i0, type: DispatchingFeComponentsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

/**
 * Generated bundle index. Do not edit.
 */

export { API_BASE_URL, AllowNumberOnlyDirective, ArabicOnlyDirective, AuthBeService, AuthConstant, AuthContextService, AuthDirective, AuthInterceptor, AuthService, BlurBackdropDirective, ClickOutsideDirective, CommonHttpService, ComponentFormErrorConstant, CustomAppErrorComponent, CustomAvatarsComponent, CustomBreadcrumbComponent, CustomButtonComponent, CustomCalendarComponent, CustomCalenderFormComponent, CustomCategoryTableComponent, CustomCheckBoxComponent, CustomCheckBoxFormComponent, CustomConfirmPopupComponent, CustomDetailsHeaderComponent, CustomDetailsModalComponent, CustomDetailsNavComponent, CustomDropdownButtonComponent, CustomDropdownComponent, CustomDropdownFormComponent, CustomDynamicTableWithCategoriesComponent, CustomFieldsFormComponent, CustomFileUploadComponent, CustomFileViewerComponent, CustomInputComponent, CustomInputFormComponent, CustomLoadingSpinnerComponent, CustomModalComponent, CustomMultiSelectComponent, CustomMultiSelectFormComponent, CustomPaginationComponent, CustomPlateNumberInputFormComponent, CustomPopUpComponent, CustomProgressBarComponent, CustomRadioGroupFormComponent, CustomSearchInputComponent, CustomSteppersContainerComponent, CustomSteppersControllersComponent, CustomSvgIconComponent, CustomTableComponent, CustomTextareaComponent, CustomTextareaFormComponent, CustomTimeInputFormComponent, CustomTitleContentComponent, CustomToastComponent, CustomToggleSwitchComponent, CustomToggleSwitchFormComponent, DispatchingFeComponentsService, EnglishOnlyDirective, ErrorInterceptor, I18nConstant, LoadingService, ModuleRoutes, NetworkConnectionInterceptor, OverlayPanelComponent, PermissionGuard, Permissions, Resources, Roles, StepperService, StorageService, ToastService, ToggleElementDirective, TranslationService, Types, UserDataService, UserStatus, actionPermission, authGuard, b64toBlob, blobToB64, convertDateFormat, convertFileToBase64, convertFormGroupToFormData, diffTime, downloadBlob, excelDateToJSDate, flattenTree, formatDate, formatDateWithTime, formatTimestamp, formatinitialTakeTime, generateRandomColor, generateUniqueNumber, getFormValidationErrors, isDocumentPath, isImagePath, isVedioPath, loadingInterceptor, logger, noAuthGuard, someFieldsContainData, timeAgo };
//# sourceMappingURL=dispatching-fe-components.mjs.map
