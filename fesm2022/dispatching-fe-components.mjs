import * as i0 from '@angular/core';
import { Injectable, signal, computed, InjectionToken, Optional, Inject, inject, PLATFORM_ID, Input, Component, EventEmitter, Output, HostListener, Directive, ContentChild, effect } from '@angular/core';
import * as i1 from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import * as i1$1 from '@angular/common';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { catchError, throwError, tap, Subscription, fromEvent, filter } from 'rxjs';
import * as i1$2 from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i1$3 from '@angular/router';
import { Router } from '@angular/router';

class ModuleRoutes {
    static AUTH = 'auth';
    static USER_PROFILE = `profile`;
    static MAIN_PAGE = `main`; // overview
    static TASK_MANAGEMENT_HOME = `task-management`;
    static PLAN_MANAGEMENT_HOME = `plan-management`;
}

var AuthConstant;
(function (AuthConstant) {
    AuthConstant["TOKEN"] = "token";
    AuthConstant["USER_DATA"] = "userData";
    AuthConstant["USER_PERMISSIONS"] = "permissions";
})(AuthConstant || (AuthConstant = {}));

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

class AuthService {
    constructor() { }
    isLoggedIn() {
        return localStorage.getItem(AuthConstant.TOKEN) !== null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: AuthService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: AuthService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: AuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });

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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: UserDataService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: UserDataService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: UserDataService, decorators: [{
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
    CommonPostRequests(model, url) {
        return this.http.post(this.buildUrl(url), model);
    }
    CommonPutRequests(model, url) {
        return this.http.put(this.buildUrl(url), model);
    }
    CommonGetRequests(url) {
        return this.http.get(this.buildUrl(url));
    }
    CommonDeleteRequest(url) {
        return this.http.delete(this.buildUrl(url));
    }
    CommonGetRequestsWithQuery(url, Model) {
        if (Model) {
            let queryString = Object.keys(Model)
                .map((key) => Model[key] != null && Model[key] != '' && Model[key] != undefined
                ? key + '=' + Model[key]
                : null)
                .filter((x) => x != null)
                .join('&');
            url += queryString == '' ? '' : '?' + queryString;
        }
        return this.http.get(this.buildUrl(url));
    }
    CommonPostRequestsWithQuery(url, Model, body) {
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
        return this.http.post(this.buildUrl(url), body);
    }
    CommonPutRequestsWithQuery(url, Model, body) {
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
        return this.http.put(this.buildUrl(url), body);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CommonHttpService, deps: [{ token: i1.HttpClient }, { token: API_BASE_URL, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CommonHttpService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CommonHttpService, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: ToastService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: ToastService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: ToastService, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: TranslationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: TranslationService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: TranslationService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

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
function b64toBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
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

const TokenInterceptor = (req, next) => {
    const token = localStorage.getItem(AuthConstant.TOKEN);
    const translate = localStorage.getItem(I18nConstant.LANGUAGE);
    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
            'accept-language': translate === I18nConstant.EN ? 'en-US' : 'e.g',
        },
    });
    return next(authReq);
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const ErrorInterceptor = (req, next) => {
    return next(req).pipe(catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
            localStorage.clear();
            console.error('Unauthorized', error);
        }
        if (error instanceof HttpErrorResponse && error.status === 400) {
            console.error('Bad Request');
        }
        if (error instanceof HttpErrorResponse && error.status === 403) {
            console.error('Forbidden');
        }
        if (error.error && isPlatformBrowser(PLATFORM_ID)) {
            if (error.error.errors) {
                const errorMessages = Object.values(error.error.errors).flat();
                errorMessages.forEach((errorMessage) => {
                    console.error(errorMessage);
                });
            }
            else if (error?.error?.message) {
                console.error(error.error.message);
            }
            else {
                console.error('Something went wrong');
            }
        }
        return throwError(error);
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
    shouldShowError(item) {
        return item.errorType.some(error => this.control.hasError(error) &&
            this.control.invalid &&
            (this.control.touched || this.control.dirty));
    }
    getErrorMessage(item) {
        const activeError = item.errorType.find(error => this.control.hasError(error));
        return activeError ? item.errorMessage : '';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomAppErrorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomAppErrorComponent, isStandalone: true, selector: "custom-app-error", inputs: { control: "control", validation: "validation", name: "name" }, ngImport: i0, template: "@for (item of validation; track $index) {\n  @if (shouldShowError(item)) {\n    <span role=\"alert\" class=\"error-message\">\n      {{ getErrorMessage(item) }}\n    </span>\n  }\n}", styles: [".error-message{color:#d32f2f!important;font-size:.8rem;margin-top:4px;font-weight:500;display:block}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomAppErrorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-app-error', imports: [], standalone: true, template: "@for (item of validation; track $index) {\n  @if (shouldShowError(item)) {\n    <span role=\"alert\" class=\"error-message\">\n      {{ getErrorMessage(item) }}\n    </span>\n  }\n}", styles: [".error-message{color:#d32f2f!important;font-size:.8rem;margin-top:4px;font-weight:500;display:block}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.13", type: CustomButtonComponent, isStandalone: true, selector: "custom-button", inputs: { disabled: "disabled", type: "type", class: "class" }, outputs: { buttonClick: "buttonClick" }, ngImport: i0, template: "<button\n  (click)=\"buttonClick.emit()\"\n  type=\"{{ type }}\"\n  [class]=\"'custom-button ' + class\"\n  [disabled]=\"disabled\"\n>\n  <ng-content></ng-content>\n</button>\n", styles: [".custom-button{border:none;border-radius:4px;height:46px!important;max-height:46px!important;font-size:16px;cursor:pointer;min-width:100px;text-align:center;display:flex;justify-content:center;align-items:center;gap:8px;font-weight:500;font-size:1rem}.custom-button:disabled{cursor:not-allowed;opacity:.5}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-button', imports: [], standalone: true, template: "<button\n  (click)=\"buttonClick.emit()\"\n  type=\"{{ type }}\"\n  [class]=\"'custom-button ' + class\"\n  [disabled]=\"disabled\"\n>\n  <ng-content></ng-content>\n</button>\n", styles: [".custom-button{border:none;border-radius:4px;height:46px!important;max-height:46px!important;font-size:16px;cursor:pointer;min-width:100px;text-align:center;display:flex;justify-content:center;align-items:center;gap:8px;font-weight:500;font-size:1rem}.custom-button:disabled{cursor:not-allowed;opacity:.5}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: ToggleElementDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.13", type: ToggleElementDirective, isStandalone: true, selector: "[toggleElement]", inputs: { element: "element", hideElement: "hideElement" }, host: { listeners: { "document:click": "onDocumentClick($event,$event.target)", "click": "onClick()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: ToggleElementDirective, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: AllowNumberOnlyDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.13", type: AllowNumberOnlyDirective, isStandalone: true, selector: "[appAllowNumberOnly]", host: { listeners: { "keydown": "onKeyDown($event)", "paste": "onPaste($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: AllowNumberOnlyDirective, decorators: [{
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
    destroySubscribtion = new Subscription();
    ngAfterViewInit() {
        const element = this.clickOutside || this.elementReference.nativeElement;
        this.zone.runOutsideAngular(() => {
            if (isPlatformBrowser(this.platform)) {
                const documentClick$ = fromEvent(document, 'click');
                const subscription = documentClick$
                    .pipe(filter(() => !this.isFirstTime || (this.isFirstTime = false)), filter((clickEvent) => !element.contains(clickEvent.target)))
                    .subscribe(() => {
                    this.zone.run(() => {
                        this.clickOutsideEmitter.emit();
                    });
                });
                this.destroySubscribtion = subscription;
            }
        });
    }
    ngOnDestroy() {
        this.destroySubscribtion.unsubscribe();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: ClickOutsideDirective, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.13", type: ClickOutsideDirective, isStandalone: true, selector: "[clickOutside]", inputs: { clickOutside: "clickOutside" }, outputs: { clickOutsideEmitter: "clickOutsideEmitter" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: ClickOutsideDirective, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: EnglishOnlyDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.13", type: EnglishOnlyDirective, isStandalone: true, selector: "[appEnglishOnly]", host: { listeners: { "input": "onInputChange($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: EnglishOnlyDirective, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: ArabicOnlyDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.13", type: ArabicOnlyDirective, isStandalone: true, selector: "[appArabicOnly]", host: { listeners: { "input": "onInputChange($event)" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: ArabicOnlyDirective, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: BlurBackdropDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.13", type: BlurBackdropDirective, isStandalone: true, selector: "[blurBackdrop]", inputs: { showBackdrop: "showBackdrop" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: BlurBackdropDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[blurBackdrop]',
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { showBackdrop: [{
                type: Input
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomCalendarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomCalendarComponent, isStandalone: true, selector: "custom-calendar", inputs: { label: "label", placeholder: "placeholder", labelClass: "labelClass", calendarPopUpClass: "calendarPopUpClass", calendarInputClass: "calendarInputClass", calendarContainerClass: "calendarContainerClass", minDate: "minDate", maxDate: "maxDate", value: "value" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div [class]=\"'custom-calendar-container ' + calendarContainerClass\">\n  @if(label){\n  <label [class]=\"'custom-label ' + labelClass\">{{ label }}</label>\n  }\n\n  <div\n    [class]=\"'custom-calendar-input ' + calendarInputClass\"\n    (click)=\"toggleCalendar()\"\n  >\n    <span class=\"placeholder\" *ngIf=\"!value\">{{ placeholder }}</span>\n    <span *ngIf=\"value\">{{ formatDisplayDate() }}</span>\n    <span class=\"calendar-icon\">\n      <svg\n        width=\"24\"\n        height=\"24\"\n        viewBox=\"0 0 24 24\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M8 2V5\"\n          stroke=\"#602650\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M16 2V5\"\n          stroke=\"#602650\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M3.5 9.08984H20.5\"\n          stroke=\"#602650\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z\"\n          stroke=\"#602650\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M15.6947 13.7002H15.7037\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M15.6947 16.7002H15.7037\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M11.9955 13.7002H12.0045\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M11.9955 16.7002H12.0045\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M8.29431 13.7002H8.30329\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M8.29431 16.7002H8.30329\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n    </span>\n  </div>\n\n  @if(showCalendar) {\n  <div\n    [class]=\"'calendar-popup ' + calendarPopUpClass\"\n    #calendarPopup\n    [clickOutside]=\"calendarPopup\"\n    (clickOutsideEmitter)=\"showCalendar = false\"\n  >\n    <div class=\"calendar-header\">\n      <button type=\"button\" class=\"nav-button\" (click)=\"prevMonth()\">\n        <svg\n          width=\"8\"\n          height=\"12\"\n          viewBox=\"0 0 8 12\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M6.5 11L1.5 6L6.5 1\"\n            stroke=\"black\"\n            stroke-opacity=\"0.72\"\n            stroke-width=\"1.66667\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </button>\n      <div class=\"month-title\">{{ getMonthName() }} {{ getYear() }}</div>\n      <button type=\"button\" class=\"nav-button\" (click)=\"nextMonth()\">\n        <svg\n          width=\"8\"\n          height=\"12\"\n          viewBox=\"0 0 8 12\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M1.5 11L6.5 6L1.5 1\"\n            stroke=\"black\"\n            stroke-opacity=\"0.72\"\n            stroke-width=\"1.66667\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </button>\n    </div>\n\n    <div class=\"weekdays\">\n      @for(weekday of weekdays; track weekday) {\n      <div class=\"weekday\">{{ weekday }}</div>\n      }\n    </div>\n\n    <div class=\"days-grid\">\n      @for(day of days; track day) {\n      <div\n        class=\"day\"\n        [class.current-month]=\"isCurrentMonth(day)\"\n        [class.selected]=\"isSelected(day)\"\n        [class.disabled]=\"isDisabled(day)\"\n        (click)=\"!isDisabled(day) && selectDate(day)\"\n      >\n        {{ day.getDate() }}\n      </div>\n      }\n    </div>\n  </div>\n  }\n</div>\n", styles: [".custom-calendar-container{position:relative;width:100%}.custom-label{display:block;margin-bottom:4px;font-size:14px;color:#333;font-weight:500}.custom-calendar-input{position:relative;height:46px;width:100%;border:1px solid #d1d5db;border-radius:6px;padding:0 12px;display:flex;align-items:center;cursor:pointer;background-color:#fff}.placeholder{color:#9ca3af}.calendar-icon{position:absolute;right:12px}.fullWidth{width:100%}.calendar-popup{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #d1d5db;border-radius:.375rem;margin-top:4px;padding:1rem;z-index:10;box-shadow:0 4px 6px #0000001a}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.month-title{font-weight:600}.nav-button{background:none;border:none;font-size:16px;cursor:pointer;padding:4px 8px}.weekdays{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-weight:500;font-size:12px;margin-bottom:8px}.days-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.day{height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;cursor:pointer;font-size:14px}.day.current-month{color:#111827}.day:not(.current-month){color:#9ca3af}.day.selected{background-color:#602650;color:#fff}.day.disabled{color:#d1d5db;cursor:not-allowed;text-decoration:line-through}.day:not(.disabled):not(.selected):hover{background-color:#f3f4f6}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomCalendarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-calendar', standalone: true, imports: [FormsModule, ClickOutsideDirective, CommonModule], template: "<div [class]=\"'custom-calendar-container ' + calendarContainerClass\">\n  @if(label){\n  <label [class]=\"'custom-label ' + labelClass\">{{ label }}</label>\n  }\n\n  <div\n    [class]=\"'custom-calendar-input ' + calendarInputClass\"\n    (click)=\"toggleCalendar()\"\n  >\n    <span class=\"placeholder\" *ngIf=\"!value\">{{ placeholder }}</span>\n    <span *ngIf=\"value\">{{ formatDisplayDate() }}</span>\n    <span class=\"calendar-icon\">\n      <svg\n        width=\"24\"\n        height=\"24\"\n        viewBox=\"0 0 24 24\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M8 2V5\"\n          stroke=\"#602650\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M16 2V5\"\n          stroke=\"#602650\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M3.5 9.08984H20.5\"\n          stroke=\"#602650\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z\"\n          stroke=\"#602650\"\n          stroke-width=\"1.5\"\n          stroke-miterlimit=\"10\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M15.6947 13.7002H15.7037\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M15.6947 16.7002H15.7037\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M11.9955 13.7002H12.0045\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M11.9955 16.7002H12.0045\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M8.29431 13.7002H8.30329\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n        <path\n          d=\"M8.29431 16.7002H8.30329\"\n          stroke=\"#602650\"\n          stroke-width=\"2\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n    </span>\n  </div>\n\n  @if(showCalendar) {\n  <div\n    [class]=\"'calendar-popup ' + calendarPopUpClass\"\n    #calendarPopup\n    [clickOutside]=\"calendarPopup\"\n    (clickOutsideEmitter)=\"showCalendar = false\"\n  >\n    <div class=\"calendar-header\">\n      <button type=\"button\" class=\"nav-button\" (click)=\"prevMonth()\">\n        <svg\n          width=\"8\"\n          height=\"12\"\n          viewBox=\"0 0 8 12\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M6.5 11L1.5 6L6.5 1\"\n            stroke=\"black\"\n            stroke-opacity=\"0.72\"\n            stroke-width=\"1.66667\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </button>\n      <div class=\"month-title\">{{ getMonthName() }} {{ getYear() }}</div>\n      <button type=\"button\" class=\"nav-button\" (click)=\"nextMonth()\">\n        <svg\n          width=\"8\"\n          height=\"12\"\n          viewBox=\"0 0 8 12\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M1.5 11L6.5 6L1.5 1\"\n            stroke=\"black\"\n            stroke-opacity=\"0.72\"\n            stroke-width=\"1.66667\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </button>\n    </div>\n\n    <div class=\"weekdays\">\n      @for(weekday of weekdays; track weekday) {\n      <div class=\"weekday\">{{ weekday }}</div>\n      }\n    </div>\n\n    <div class=\"days-grid\">\n      @for(day of days; track day) {\n      <div\n        class=\"day\"\n        [class.current-month]=\"isCurrentMonth(day)\"\n        [class.selected]=\"isSelected(day)\"\n        [class.disabled]=\"isDisabled(day)\"\n        (click)=\"!isDisabled(day) && selectDate(day)\"\n      >\n        {{ day.getDate() }}\n      </div>\n      }\n    </div>\n  </div>\n  }\n</div>\n", styles: [".custom-calendar-container{position:relative;width:100%}.custom-label{display:block;margin-bottom:4px;font-size:14px;color:#333;font-weight:500}.custom-calendar-input{position:relative;height:46px;width:100%;border:1px solid #d1d5db;border-radius:6px;padding:0 12px;display:flex;align-items:center;cursor:pointer;background-color:#fff}.placeholder{color:#9ca3af}.calendar-icon{position:absolute;right:12px}.fullWidth{width:100%}.calendar-popup{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #d1d5db;border-radius:.375rem;margin-top:4px;padding:1rem;z-index:10;box-shadow:0 4px 6px #0000001a}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.month-title{font-weight:600}.nav-button{background:none;border:none;font-size:16px;cursor:pointer;padding:4px 8px}.weekdays{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-weight:500;font-size:12px;margin-bottom:8px}.days-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.day{height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;cursor:pointer;font-size:14px}.day.current-month{color:#111827}.day:not(.current-month){color:#9ca3af}.day.selected{background-color:#602650;color:#fff}.day.disabled{color:#d1d5db;cursor:not-allowed;text-decoration:line-through}.day:not(.disabled):not(.selected):hover{background-color:#f3f4f6}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomCalenderFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomCalenderFormComponent, isStandalone: true, selector: "custom-calender-form", inputs: { label: "label", placeholder: "placeholder", labelClass: "labelClass", calendarPopUpClass: "calendarPopUpClass", calendarInputClass: "calendarInputClass", calendarContainerClass: "calendarContainerClass", componentClass: "componentClass", minDate: "minDate", maxDate: "maxDate", controlName: "controlName", parentForm: "parentForm", validation: "validation", name: "name", disabled: "disabled" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div [class]=\"'fullWidth ' + componentClass\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    }\n  </label>\n  }\n\n  <div [class]=\"'custom-calendar-container ' + calendarContainerClass\">\n    <div\n      [class]=\"'custom-calendar-input ' + calendarInputClass\"\n      [class.disabled]=\"disabled\"\n      [attr.aria-disabled]=\"disabled\"\n      (click)=\"!disabled && toggleCalendar()\"\n    >\n      <span class=\"placeholder\" *ngIf=\"!value\">{{ placeholder }}</span>\n      <span *ngIf=\"value\">{{ formatDisplayDate() }}</span>\n      <span class=\"calendar-icon\">\n        <svg\n          width=\"24\"\n          height=\"24\"\n          viewBox=\"0 0 24 24\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M8 2V5\"\n            stroke=\"#602650\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M16 2V5\"\n            stroke=\"#602650\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M3.5 9.08984H20.5\"\n            stroke=\"#602650\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z\"\n            stroke=\"#602650\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M15.6947 13.7002H15.7037\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M15.6947 16.7002H15.7037\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11.9955 13.7002H12.0045\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11.9955 16.7002H12.0045\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M8.29431 13.7002H8.30329\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M8.29431 16.7002H8.30329\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </span>\n    </div>\n\n    @if(showCalendarForm && !disabled) {\n    <div\n      [class]=\"'calendar-popup ' + calendarPopUpClass\"\n      #calendarPopUpForm\n      [clickOutside]=\"calendarPopUpForm\"\n      (clickOutsideEmitter)=\"showCalendarForm = false\"\n    >\n      <div class=\"calendar-header\">\n        <button type=\"button\" class=\"nav-button\" (click)=\"prevMonth()\">\n          <svg\n            width=\"8\"\n            height=\"12\"\n            viewBox=\"0 0 8 12\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M6.5 11L1.5 6L6.5 1\"\n              stroke=\"black\"\n              stroke-opacity=\"0.72\"\n              stroke-width=\"1.66667\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </svg>\n        </button>\n        <div class=\"month-title\">{{ getMonthName() }} {{ getYear() }}</div>\n        <button type=\"button\" class=\"nav-button\" (click)=\"nextMonth()\">\n          <svg\n            width=\"8\"\n            height=\"12\"\n            viewBox=\"0 0 8 12\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M1.5 11L6.5 6L1.5 1\"\n              stroke=\"black\"\n              stroke-opacity=\"0.72\"\n              stroke-width=\"1.66667\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </svg>\n        </button>\n      </div>\n\n      <div class=\"weekdays\">\n        @for(weekday of weekdays; track weekday) {\n        <div class=\"weekday\">{{ weekday }}</div>\n        }\n      </div>\n\n      <div class=\"days-grid\">\n        @for(day of days; track day) {\n        <div\n          class=\"day\"\n          [class.current-month]=\"isCurrentMonth(day)\"\n          [class.selected]=\"isSelected(day)\"\n          [class.disabled]=\"isDisabled(day) || disabled\"\n          (click)=\"!isDisabled(day) && !disabled && selectDate(day)\"\n        >\n          {{ day.getDate() }}\n        </div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n\n  <custom-app-error\n    [control]=\"parentForm.controls[controlName]\"\n    [validation]=\"validation\"\n    [name]=\"name\"\n  />\n</div>\n", styles: [".custom-calendar-container{position:relative;width:100%}.fullWidth{width:100%}.custom-label{display:block;margin-bottom:4px;font-size:14px;color:#333;font-weight:500}.custom-calendar-input{position:relative;height:46px;width:100%;border:1px solid #d1d5db;border-radius:6px;padding:0 12px;display:flex;align-items:center;cursor:pointer;background-color:#fff}.placeholder{color:#9ca3af}.calendar-icon{position:absolute;right:12px}.calendar-popup{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #d1d5db;border-radius:.375rem;margin-top:4px;padding:1rem;z-index:10;box-shadow:0 4px 6px #0000001a}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.month-title{font-weight:600}.nav-button{background:none;border:none;font-size:16px;cursor:pointer;padding:4px 8px}.weekdays{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-weight:500;font-size:12px;margin-bottom:8px}.days-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.day{height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;cursor:pointer;font-size:14px}.day.current-month{color:#111827}.day:not(.current-month){color:#9ca3af}.day.selected{background-color:#602650;color:#fff}.day.disabled{color:#d1d5db;cursor:not-allowed;text-decoration:line-through}.day:not(.disabled):not(.selected):hover{background-color:#f3f4f6}.custom-calendar-input.disabled{background:#f3f3f3;color:#b0b0b0;cursor:not-allowed;border-color:#e0e0e0}\n"], dependencies: [{ kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name"] }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomCalenderFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-calender-form', standalone: true, imports: [
                        CustomAppErrorComponent,
                        ClickOutsideDirective,
                        ReactiveFormsModule,
                        CommonModule,
                    ], template: "<div [class]=\"'fullWidth ' + componentClass\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    }\n  </label>\n  }\n\n  <div [class]=\"'custom-calendar-container ' + calendarContainerClass\">\n    <div\n      [class]=\"'custom-calendar-input ' + calendarInputClass\"\n      [class.disabled]=\"disabled\"\n      [attr.aria-disabled]=\"disabled\"\n      (click)=\"!disabled && toggleCalendar()\"\n    >\n      <span class=\"placeholder\" *ngIf=\"!value\">{{ placeholder }}</span>\n      <span *ngIf=\"value\">{{ formatDisplayDate() }}</span>\n      <span class=\"calendar-icon\">\n        <svg\n          width=\"24\"\n          height=\"24\"\n          viewBox=\"0 0 24 24\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M8 2V5\"\n            stroke=\"#602650\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M16 2V5\"\n            stroke=\"#602650\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M3.5 9.08984H20.5\"\n            stroke=\"#602650\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z\"\n            stroke=\"#602650\"\n            stroke-width=\"1.5\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M15.6947 13.7002H15.7037\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M15.6947 16.7002H15.7037\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11.9955 13.7002H12.0045\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M11.9955 16.7002H12.0045\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M8.29431 13.7002H8.30329\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n          <path\n            d=\"M8.29431 16.7002H8.30329\"\n            stroke=\"#602650\"\n            stroke-width=\"2\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </span>\n    </div>\n\n    @if(showCalendarForm && !disabled) {\n    <div\n      [class]=\"'calendar-popup ' + calendarPopUpClass\"\n      #calendarPopUpForm\n      [clickOutside]=\"calendarPopUpForm\"\n      (clickOutsideEmitter)=\"showCalendarForm = false\"\n    >\n      <div class=\"calendar-header\">\n        <button type=\"button\" class=\"nav-button\" (click)=\"prevMonth()\">\n          <svg\n            width=\"8\"\n            height=\"12\"\n            viewBox=\"0 0 8 12\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M6.5 11L1.5 6L6.5 1\"\n              stroke=\"black\"\n              stroke-opacity=\"0.72\"\n              stroke-width=\"1.66667\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </svg>\n        </button>\n        <div class=\"month-title\">{{ getMonthName() }} {{ getYear() }}</div>\n        <button type=\"button\" class=\"nav-button\" (click)=\"nextMonth()\">\n          <svg\n            width=\"8\"\n            height=\"12\"\n            viewBox=\"0 0 8 12\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M1.5 11L6.5 6L1.5 1\"\n              stroke=\"black\"\n              stroke-opacity=\"0.72\"\n              stroke-width=\"1.66667\"\n              stroke-linecap=\"round\"\n              stroke-linejoin=\"round\"\n            />\n          </svg>\n        </button>\n      </div>\n\n      <div class=\"weekdays\">\n        @for(weekday of weekdays; track weekday) {\n        <div class=\"weekday\">{{ weekday }}</div>\n        }\n      </div>\n\n      <div class=\"days-grid\">\n        @for(day of days; track day) {\n        <div\n          class=\"day\"\n          [class.current-month]=\"isCurrentMonth(day)\"\n          [class.selected]=\"isSelected(day)\"\n          [class.disabled]=\"isDisabled(day) || disabled\"\n          (click)=\"!isDisabled(day) && !disabled && selectDate(day)\"\n        >\n          {{ day.getDate() }}\n        </div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n\n  <custom-app-error\n    [control]=\"parentForm.controls[controlName]\"\n    [validation]=\"validation\"\n    [name]=\"name\"\n  />\n</div>\n", styles: [".custom-calendar-container{position:relative;width:100%}.fullWidth{width:100%}.custom-label{display:block;margin-bottom:4px;font-size:14px;color:#333;font-weight:500}.custom-calendar-input{position:relative;height:46px;width:100%;border:1px solid #d1d5db;border-radius:6px;padding:0 12px;display:flex;align-items:center;cursor:pointer;background-color:#fff}.placeholder{color:#9ca3af}.calendar-icon{position:absolute;right:12px}.calendar-popup{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #d1d5db;border-radius:.375rem;margin-top:4px;padding:1rem;z-index:10;box-shadow:0 4px 6px #0000001a}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.month-title{font-weight:600}.nav-button{background:none;border:none;font-size:16px;cursor:pointer;padding:4px 8px}.weekdays{display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-weight:500;font-size:12px;margin-bottom:8px}.days-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.day{height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;cursor:pointer;font-size:14px}.day.current-month{color:#111827}.day:not(.current-month){color:#9ca3af}.day.selected{background-color:#602650;color:#fff}.day.disabled{color:#d1d5db;cursor:not-allowed;text-decoration:line-through}.day:not(.disabled):not(.selected):hover{background-color:#f3f4f6}.custom-calendar-input.disabled{background:#f3f3f3;color:#b0b0b0;cursor:not-allowed;border-color:#e0e0e0}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomCheckBoxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomCheckBoxComponent, isStandalone: true, selector: "custom-check-box", inputs: { checkboxClass: "checkboxClass", labelClass: "labelClass", componentClass: "componentClass", label: "label", name: "name", value: "value" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div [style]=\"'checkBox-style '+ componentClass\">\n  <input\n    [id]=\"label\"\n    type=\"checkbox\"\n    [name]=\"name\"\n    [class]=\"'custom-checkbox ' + checkboxClass\"\n    [(ngModel)]=\"value\"\n    (ngModelChange)=\"valueChange.emit($event)\"\n  />\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n</div>\n", styles: [".custom-checkbox{appearance:none;width:25px;height:25px;border:2px solid #ccc;border-radius:3px;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease,background-color .3s ease}.checkBox-style{width:100%;display:flex;align-items:center;gap:4px}.custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.custom-checkbox:checked:after{content:\"\";position:absolute;top:0;left:8px;width:8px;height:18px;border:solid white;border-width:0 4px 4px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#25c7bc}.custom-label{font-size:.875rem;color:#374151;font-weight:500;margin-top:5px}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$2.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i1$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomCheckBoxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-check-box', imports: [FormsModule], standalone: true, template: "<div [style]=\"'checkBox-style '+ componentClass\">\n  <input\n    [id]=\"label\"\n    type=\"checkbox\"\n    [name]=\"name\"\n    [class]=\"'custom-checkbox ' + checkboxClass\"\n    [(ngModel)]=\"value\"\n    (ngModelChange)=\"valueChange.emit($event)\"\n  />\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n</div>\n", styles: [".custom-checkbox{appearance:none;width:25px;height:25px;border:2px solid #ccc;border-radius:3px;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease,background-color .3s ease}.checkBox-style{width:100%;display:flex;align-items:center;gap:4px}.custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.custom-checkbox:checked:after{content:\"\";position:absolute;top:0;left:8px;width:8px;height:18px;border:solid white;border-width:0 4px 4px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#25c7bc}.custom-label{font-size:.875rem;color:#374151;font-weight:500;margin-top:5px}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomCheckBoxFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomCheckBoxFormComponent, isStandalone: true, selector: "custom-check-box-form", inputs: { checkboxClass: "checkboxClass", componentClass: "componentClass", labelClass: "labelClass", label: "label", name: "name", controlName: "controlName", parentForm: "parentForm", validation: "validation" }, ngImport: i0, template: "<div class=\"full-width\" [formGroup]=\"parentForm\">\n  <div [style]=\"'checkBox-style '+ componentClass\">\n    <input\n      [id]=\"label\"\n      type=\"checkbox\"\n      [name]=\"name\"\n      [class]=\"'custom-checkbox ' + checkboxClass\"\n      [formControlName]=\"controlName\"\n    />\n\n    @if(label){\n    <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n      {{ label }}\n    </label>\n    }\n  </div>\n\n  <custom-app-error\n    [control]=\"parentForm.controls[controlName]\"\n    [validation]=\"validation\"\n    [name]=\"name\"\n  />\n</div>\n", styles: [".custom-checkbox{appearance:none;width:25px;height:25px;border:2px solid #ccc;border-radius:3px;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease,background-color .3s ease}.fullWidth{width:100%}.checkBox-style{width:100%;display:flex;align-items:center;gap:4px}.custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.custom-checkbox:checked:after{content:\"\";position:absolute;top:0;left:8px;width:8px;height:18px;border:solid white;border-width:0 4px 4px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#25c7bc}.custom-label{font-size:.875rem;color:#374151;font-weight:500;margin-top:5px}\n"], dependencies: [{ kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$2.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i1$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomCheckBoxFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-check-box-form', standalone: true, imports: [CustomAppErrorComponent, ReactiveFormsModule], template: "<div class=\"full-width\" [formGroup]=\"parentForm\">\n  <div [style]=\"'checkBox-style '+ componentClass\">\n    <input\n      [id]=\"label\"\n      type=\"checkbox\"\n      [name]=\"name\"\n      [class]=\"'custom-checkbox ' + checkboxClass\"\n      [formControlName]=\"controlName\"\n    />\n\n    @if(label){\n    <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n      {{ label }}\n    </label>\n    }\n  </div>\n\n  <custom-app-error\n    [control]=\"parentForm.controls[controlName]\"\n    [validation]=\"validation\"\n    [name]=\"name\"\n  />\n</div>\n", styles: [".custom-checkbox{appearance:none;width:25px;height:25px;border:2px solid #ccc;border-radius:3px;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease,background-color .3s ease}.fullWidth{width:100%}.checkBox-style{width:100%;display:flex;align-items:center;gap:4px}.custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.custom-checkbox:checked:after{content:\"\";position:absolute;top:0;left:8px;width:8px;height:18px;border:solid white;border-width:0 4px 4px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#25c7bc}.custom-label{font-size:.875rem;color:#374151;font-weight:500;margin-top:5px}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomDropdownComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomDropdownComponent, isStandalone: true, selector: "custom-dropdown", inputs: { label: "label", labelClass: "labelClass", dropdownOptionsClass: "dropdownOptionsClass", dropdownHeaderClass: "dropdownHeaderClass", dropdownContainerClass: "dropdownContainerClass", placeholder: "placeholder", enableFilter: "enableFilter", showClear: "showClear", options: "options", name: "name", value: "value", reset: "reset" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<!-- custom-dropdown.component.html -->\n<div style=\"width: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n\n  <div [class]=\"'dropdown-container ' + dropdownContainerClass\">\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      (click)=\"toggleDropdown()\"\n    >\n      <span class=\"selected-value\">\n        {{ selectedOption?.nameEn || placeholder }}\n      </span>\n      <div class=\"dropdown-icons\">\n        @if(selectedOption && showClear){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"17\"\n            height=\"17\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1710\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n        </span>\n        }\n        <svg\n          width=\"17\"\n          height=\"16\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#602650\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen){\n    <div\n      #dropdownOptions\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptions\"\n      (clickOutsideEmitter)=\"isOpen = false\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n        />\n      </div>\n      }\n\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <div\n          class=\"dropdown-option\"\n          [class.selected]=\"option.id === value\"\n          (click)=\"selectOption(option)\"\n        >\n          {{ option.nameEn }}\n        </div>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n</div>\n", styles: [".dropdown-container{position:relative;width:100%}.dropdown-header{height:46px;width:100%;border-radius:.375rem;border:1px solid #d1d5db;padding:0 .5rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151}.dropdown-icons{display:flex;align-items:center;gap:8px}.clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer}.clear-icon:hover{color:#6b7280}.dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #d1d5db;border-radius:.375rem;margin-top:4px;z-index:10;box-shadow:0 4px 6px #0000001a}.filter-container{padding:8px;border-bottom:1px solid #e5e7eb}.filter-input{width:100%;padding:8px;border:1px solid #d1d5db;border-radius:.25rem;outline:none}.options-list{padding:4px 0}.dropdown-option{padding:8px 16px;cursor:pointer}.dropdown-option:hover{background-color:#f3f4f6}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.custom-label{font-size:.875rem;color:#374151;margin-bottom:.25rem;font-weight:500;display:block}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-dropdown', standalone: true, imports: [FormsModule, ClickOutsideDirective], template: "<!-- custom-dropdown.component.html -->\n<div style=\"width: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n\n  <div [class]=\"'dropdown-container ' + dropdownContainerClass\">\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      (click)=\"toggleDropdown()\"\n    >\n      <span class=\"selected-value\">\n        {{ selectedOption?.nameEn || placeholder }}\n      </span>\n      <div class=\"dropdown-icons\">\n        @if(selectedOption && showClear){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"17\"\n            height=\"17\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1710\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n        </span>\n        }\n        <svg\n          width=\"17\"\n          height=\"16\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#602650\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen){\n    <div\n      #dropdownOptions\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptions\"\n      (clickOutsideEmitter)=\"isOpen = false\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n        />\n      </div>\n      }\n\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <div\n          class=\"dropdown-option\"\n          [class.selected]=\"option.id === value\"\n          (click)=\"selectOption(option)\"\n        >\n          {{ option.nameEn }}\n        </div>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n</div>\n", styles: [".dropdown-container{position:relative;width:100%}.dropdown-header{height:46px;width:100%;border-radius:.375rem;border:1px solid #d1d5db;padding:0 .5rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151}.dropdown-icons{display:flex;align-items:center;gap:8px}.clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer}.clear-icon:hover{color:#6b7280}.dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #d1d5db;border-radius:.375rem;margin-top:4px;z-index:10;box-shadow:0 4px 6px #0000001a}.filter-container{padding:8px;border-bottom:1px solid #e5e7eb}.filter-input{width:100%;padding:8px;border:1px solid #d1d5db;border-radius:.25rem;outline:none}.options-list{padding:4px 0}.dropdown-option{padding:8px 16px;cursor:pointer}.dropdown-option:hover{background-color:#f3f4f6}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.custom-label{font-size:.875rem;color:#374151;margin-bottom:.25rem;font-weight:500;display:block}\n"] }]
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
    valueChange = new EventEmitter();
    isOpen = false;
    selectedOption = null;
    filteredOptions = [];
    filterText = '';
    value;
    ngOnInit() {
        this.filteredOptions = [...this.options];
        // Initialize with current form value if any
        const currentValue = this.parentForm.get(this.controlName)?.value;
        if (currentValue) {
            this.selectedOption =
                this.options.find((opt) => opt.id === currentValue) || null;
        }
        if (this.parentForm && this.controlName) {
            const control = this.parentForm.get(this.controlName);
            if (control) {
                // Set initial value
                if (control.value) {
                    this.value = control.value;
                }
                // Subscribe to future changes
                control.valueChanges.subscribe((value) => {
                    this.value = value;
                });
            }
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomDropdownFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomDropdownFormComponent, isStandalone: true, selector: "custom-dropdown-form", inputs: { parentForm: "parentForm", controlName: "controlName", label: "label", labelClass: "labelClass", dropdownOptionsClass: "dropdownOptionsClass", dropdownHeaderClass: "dropdownHeaderClass", dropdownContainerClass: "dropdownContainerClass", placeholder: "placeholder", enableFilter: "enableFilter", showClear: "showClear", options: "options", name: "name", validation: "validation", reset: "reset" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<!-- dropdown.component.html -->\n<div style=\"width: 100%\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    }\n  </label>\n  }\n\n  <div [class]=\"'dropdown-container ' + dropdownContainerClass\">\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      (click)=\"toggleDropdown()\"\n    >\n      <span class=\"selected-value\">\n        {{ selectedOption?.nameEn || placeholder }}\n      </span>\n      <div class=\"dropdown-icons\">\n        @if(selectedOption && showClear){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"17\"\n            height=\"17\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1710\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n        </span>\n        }\n        <svg\n          width=\"17\"\n          height=\"16\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#602650\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen){\n    <div\n      #dropdownOptions\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptions\"\n      (clickOutsideEmitter)=\"isOpen = false\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n        />\n      </div>\n      }\n\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <div\n          class=\"dropdown-option\"\n          [class.selected]=\"option.id === selectedOption?.id\"\n          (click)=\"selectOption(option)\"\n        >\n          {{ option.nameEn }}\n        </div>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n\n  <input\n    type=\"hidden\"\n    [id]=\"label\"\n    [name]=\"name\"\n    [formControlName]=\"controlName\"\n  />\n\n  <custom-app-error\n    [control]=\"parentForm.controls[controlName]\"\n    [validation]=\"validation\"\n    [name]=\"name\"\n  />\n</div>\n", styles: [".dropdown-container{position:relative;width:100%}.dropdown-header{height:46px;width:100%;border-radius:.375rem;border:1px solid #d1d5db;padding:0 .5rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151}.dropdown-icons{display:flex;align-items:center;gap:8px}.clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer}.clear-icon:hover{color:#6b7280}.dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #d1d5db;border-radius:.375rem;margin-top:4px;z-index:10;box-shadow:0 4px 6px #0000001a}.filter-container{padding:8px;border-bottom:1px solid #e5e7eb}.filter-input{width:100%;padding:8px;border:1px solid #d1d5db;border-radius:.25rem;outline:none}.options-list{padding:4px 0}.dropdown-option{padding:8px 16px;cursor:pointer}.dropdown-option:hover{background-color:#f3f4f6}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.custom-label{font-size:.875rem;color:#374151;margin-bottom:.25rem;font-weight:500;display:block}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomDropdownFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-dropdown-form', standalone: true, imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        ClickOutsideDirective,
                        CustomAppErrorComponent,
                    ], template: "<!-- dropdown.component.html -->\n<div style=\"width: 100%\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    }\n  </label>\n  }\n\n  <div [class]=\"'dropdown-container ' + dropdownContainerClass\">\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      (click)=\"toggleDropdown()\"\n    >\n      <span class=\"selected-value\">\n        {{ selectedOption?.nameEn || placeholder }}\n      </span>\n      <div class=\"dropdown-icons\">\n        @if(selectedOption && showClear){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"17\"\n            height=\"17\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1710\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n        </span>\n        }\n        <svg\n          width=\"17\"\n          height=\"16\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#602650\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen){\n    <div\n      #dropdownOptions\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptions\"\n      (clickOutsideEmitter)=\"isOpen = false\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n        />\n      </div>\n      }\n\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <div\n          class=\"dropdown-option\"\n          [class.selected]=\"option.id === selectedOption?.id\"\n          (click)=\"selectOption(option)\"\n        >\n          {{ option.nameEn }}\n        </div>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n\n  <input\n    type=\"hidden\"\n    [id]=\"label\"\n    [name]=\"name\"\n    [formControlName]=\"controlName\"\n  />\n\n  <custom-app-error\n    [control]=\"parentForm.controls[controlName]\"\n    [validation]=\"validation\"\n    [name]=\"name\"\n  />\n</div>\n", styles: [".dropdown-container{position:relative;width:100%}.dropdown-header{height:46px;width:100%;border-radius:.375rem;border:1px solid #d1d5db;padding:0 .5rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151}.dropdown-icons{display:flex;align-items:center;gap:8px}.clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer}.clear-icon:hover{color:#6b7280}.dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #d1d5db;border-radius:.375rem;margin-top:4px;z-index:10;box-shadow:0 4px 6px #0000001a}.filter-container{padding:8px;border-bottom:1px solid #e5e7eb}.filter-input{width:100%;padding:8px;border:1px solid #d1d5db;border-radius:.25rem;outline:none}.options-list{padding:4px 0}.dropdown-option{padding:8px 16px;cursor:pointer}.dropdown-option:hover{background-color:#f3f4f6}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.custom-label{font-size:.875rem;color:#374151;margin-bottom:.25rem;font-weight:500;display:block}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomInputComponent, isStandalone: true, selector: "custom-input", inputs: { class: "class", labelClass: "labelClass", label: "label", placeholder: "placeholder", name: "name", type: "type", value: "value" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "\n\n<div style=\"width: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n  <input\n    [id]=\"label || name\"\n    [type]=\"type\"\n    [name]=\"name\"\n    [placeholder]=\"placeholder\"\n    [class]=\"'custom-input ' + class\"\n    [(ngModel)]=\"value\"\n    (ngModelChange)=\"valueChange.emit($event)\"\n  />\n</div>\n", styles: [".custom-input{height:46px;width:100%;border-radius:.375rem;border:1px solid #d1d5db;padding-left:.5rem;padding-right:.5rem;outline:none!important;box-shadow:none;font-size:1rem;font-weight:400}.custom-input:placeholder-shown{color:#9ca3af;font-size:1rem;font-weight:400}.custom-label{font-size:.875rem;color:#374151;margin-bottom:.25rem;font-weight:500}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-input', standalone: true, imports: [FormsModule], template: "\n\n<div style=\"width: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n  <input\n    [id]=\"label || name\"\n    [type]=\"type\"\n    [name]=\"name\"\n    [placeholder]=\"placeholder\"\n    [class]=\"'custom-input ' + class\"\n    [(ngModel)]=\"value\"\n    (ngModelChange)=\"valueChange.emit($event)\"\n  />\n</div>\n", styles: [".custom-input{height:46px;width:100%;border-radius:.375rem;border:1px solid #d1d5db;padding-left:.5rem;padding-right:.5rem;outline:none!important;box-shadow:none;font-size:1rem;font-weight:400}.custom-input:placeholder-shown{color:#9ca3af;font-size:1rem;font-weight:400}.custom-label{font-size:.875rem;color:#374151;margin-bottom:.25rem;font-weight:500}\n"] }]
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
    valueChange = new EventEmitter();
    containRequiredError() {
        return this.validation.some((error) => error.errorType.includes(ComponentFormErrorConstant.REQUIRED));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomInputFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomInputFormComponent, isStandalone: true, selector: "custom-input-form", inputs: { class: "class", labelClass: "labelClass", label: "label", placeholder: "placeholder", name: "name", type: "type", controlName: "controlName", parentForm: "parentForm", validation: "validation" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\">*</span>\n    }\n  </label>\n  }\n  <input [id]=\"label || name\" [type]=\"type\" [name]=\"name\" [placeholder]=\"placeholder\" [class]=\"'custom-input ' + class\"\n    [formControlName]=\"controlName\" (ngModelChange)=\"valueChange.emit($event)\" />\n\n  <custom-app-error [control]=\"parentForm.controls[controlName]\" [validation]=\"validation\" [name]=\"name\" />\n</div>", styles: [".custom-input{height:46px;width:100%;border-radius:.375rem;border:1px solid #d1d5db;padding-left:.5rem;padding-right:.5rem;outline:none!important;box-shadow:none;font-size:1rem;font-weight:400}.custom-input:placeholder-shown{color:#9ca3af;font-size:1rem;font-weight:400}.custom-label{font-size:.875rem;color:#374151;margin-bottom:.25rem;font-weight:500}\n"], dependencies: [{ kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomInputFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-input-form', standalone: true, imports: [ReactiveFormsModule, CustomAppErrorComponent], template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\">*</span>\n    }\n  </label>\n  }\n  <input [id]=\"label || name\" [type]=\"type\" [name]=\"name\" [placeholder]=\"placeholder\" [class]=\"'custom-input ' + class\"\n    [formControlName]=\"controlName\" (ngModelChange)=\"valueChange.emit($event)\" />\n\n  <custom-app-error [control]=\"parentForm.controls[controlName]\" [validation]=\"validation\" [name]=\"name\" />\n</div>", styles: [".custom-input{height:46px;width:100%;border-radius:.375rem;border:1px solid #d1d5db;padding-left:.5rem;padding-right:.5rem;outline:none!important;box-shadow:none;font-size:1rem;font-weight:400}.custom-input:placeholder-shown{color:#9ca3af;font-size:1rem;font-weight:400}.custom-label{font-size:.875rem;color:#374151;margin-bottom:.25rem;font-weight:500}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomMultiSelectComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomMultiSelectComponent, isStandalone: true, selector: "custom-multi-select", inputs: { label: "label", labelClass: "labelClass", dropdownOptionsClass: "dropdownOptionsClass", dropdownHeaderClass: "dropdownHeaderClass", dropdownContainerClass: "dropdownContainerClass", placeholder: "placeholder", enableFilter: "enableFilter", showClear: "showClear", options: "options", value: "value", reset: "reset" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div style=\"width: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n\n  <div [class]=\"'dropdown-container ' + dropdownContainerClass\">\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      (click)=\"toggleDropdown()\"\n    >\n      <span class=\"selected-value\">\n        {{ selectedOptions.length > 0 ? getSelectedLabels() : placeholder }}\n      </span>\n      <div class=\"dropdown-icons\">\n        @if(selectedOptions.length > 0 && showClear){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"17\"\n            height=\"17\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1710\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n        </span>\n        }\n        <svg\n          width=\"17\"\n          height=\"16\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#602650\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen){\n    <div\n      #dropdownOptions\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptions\"\n      (clickOutsideEmitter)=\"isOpen = false\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n        />\n      </div>\n      }\n\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <div class=\"dropdown-option\" (click)=\"toggleOptionSelection(option)\">\n          <input\n            type=\"checkbox\"\n            class=\"custom-checkbox\"\n            [checked]=\"isSelected(option.id)\"\n            (click)=\"$event.stopPropagation()\"\n          />\n          <span>{{ option.nameEn }}</span>\n        </div>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n</div>\n", styles: [".dropdown-container{position:relative;width:100%}.dropdown-header{height:46px;width:100%;border-radius:.375rem;border:1px solid #d1d5db;padding:0 .5rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151}.dropdown-icons{display:flex;align-items:center;gap:8px}.clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer}.clear-icon:hover{color:#6b7280}.dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #d1d5db;border-radius:.375rem;margin-top:4px;z-index:10;box-shadow:0 4px 6px #0000001a}.filter-container{padding:8px;border-bottom:1px solid #e5e7eb}.filter-input{width:100%;padding:8px;border:1px solid #d1d5db;border-radius:.25rem;outline:none}.options-list{padding:4px 0}.dropdown-option{padding:8px 16px;cursor:pointer}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.custom-label{font-size:.875rem;color:#374151;margin-bottom:.25rem;font-weight:500;display:block}.dropdown-option{display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;transition:background-color .2s}.dropdown-option:hover{background-color:#f3f4f6}.option-label{flex:1}.custom-checkbox{appearance:none;width:20px;height:20px;border:2px solid #ccc;border-radius:3px;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease,background-color .3s ease;flex-shrink:0}.custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.custom-checkbox:checked:after{content:\"\";position:absolute;top:0;left:5px;width:6px;height:12px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#25c7bc}.dropdown-option.selected{background-color:#e5e7eb}.no-options{padding:12px 16px;color:#6b7280;font-style:italic;text-align:center}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomMultiSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-multi-select', standalone: true, imports: [FormsModule, ClickOutsideDirective], template: "<div style=\"width: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n\n  <div [class]=\"'dropdown-container ' + dropdownContainerClass\">\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      (click)=\"toggleDropdown()\"\n    >\n      <span class=\"selected-value\">\n        {{ selectedOptions.length > 0 ? getSelectedLabels() : placeholder }}\n      </span>\n      <div class=\"dropdown-icons\">\n        @if(selectedOptions.length > 0 && showClear){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"17\"\n            height=\"17\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1710\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n        </span>\n        }\n        <svg\n          width=\"17\"\n          height=\"16\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#602650\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen){\n    <div\n      #dropdownOptions\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptions\"\n      (clickOutsideEmitter)=\"isOpen = false\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n        />\n      </div>\n      }\n\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <div class=\"dropdown-option\" (click)=\"toggleOptionSelection(option)\">\n          <input\n            type=\"checkbox\"\n            class=\"custom-checkbox\"\n            [checked]=\"isSelected(option.id)\"\n            (click)=\"$event.stopPropagation()\"\n          />\n          <span>{{ option.nameEn }}</span>\n        </div>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n</div>\n", styles: [".dropdown-container{position:relative;width:100%}.dropdown-header{height:46px;width:100%;border-radius:.375rem;border:1px solid #d1d5db;padding:0 .5rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151}.dropdown-icons{display:flex;align-items:center;gap:8px}.clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer}.clear-icon:hover{color:#6b7280}.dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #d1d5db;border-radius:.375rem;margin-top:4px;z-index:10;box-shadow:0 4px 6px #0000001a}.filter-container{padding:8px;border-bottom:1px solid #e5e7eb}.filter-input{width:100%;padding:8px;border:1px solid #d1d5db;border-radius:.25rem;outline:none}.options-list{padding:4px 0}.dropdown-option{padding:8px 16px;cursor:pointer}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.custom-label{font-size:.875rem;color:#374151;margin-bottom:.25rem;font-weight:500;display:block}.dropdown-option{display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;transition:background-color .2s}.dropdown-option:hover{background-color:#f3f4f6}.option-label{flex:1}.custom-checkbox{appearance:none;width:20px;height:20px;border:2px solid #ccc;border-radius:3px;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease,background-color .3s ease;flex-shrink:0}.custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.custom-checkbox:checked:after{content:\"\";position:absolute;top:0;left:5px;width:6px;height:12px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#25c7bc}.dropdown-option.selected{background-color:#e5e7eb}.no-options{padding:12px 16px;color:#6b7280;font-style:italic;text-align:center}\n"] }]
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
        return this.selectedOptions.map((opt) => opt.nameEn).join(', ');
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomMultiSelectFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomMultiSelectFormComponent, isStandalone: true, selector: "custom-multi-select-form", inputs: { parentForm: "parentForm", controlName: "controlName", label: "label", labelClass: "labelClass", dropdownOptionsClass: "dropdownOptionsClass", dropdownHeaderClass: "dropdownHeaderClass", dropdownContainerClass: "dropdownContainerClass", placeholder: "placeholder", enableFilter: "enableFilter", showClear: "showClear", options: "options", name: "name", validation: "validation", reset: "reset" }, ngImport: i0, template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    }\n  </label>\n  }\n  <div [class]=\"'dropdown-container ' + dropdownContainerClass\">\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      (click)=\"toggleDropdown()\"\n    >\n      <span class=\"selected-value\">\n        {{ getSelectedLabels() || placeholder }}\n      </span>\n      <div class=\"dropdown-icons\">\n        @if(selectedOptions.length > 0 && showClear){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"17\"\n            height=\"17\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n          </svg>\n        </span>\n        }\n        <svg\n          width=\"17\"\n          height=\"16\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#602650\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen){\n    <div\n      #dropdownOptions\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptions\"\n      (clickOutsideEmitter)=\"isOpen = false\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n        />\n      </div>\n      }\n\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <label class=\"dropdown-option\">\n          <input\n            type=\"checkbox\"\n            class=\"custom-checkbox\"\n            [checked]=\"isSelected(option.id)\"\n            (change)=\"toggleOptionSelection(option)\"\n          />\n          <span class=\"option-label\">{{ option.nameEn }}</span>\n        </label>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n\n  <input\n    type=\"hidden\"\n    [id]=\"label\"\n    [name]=\"name\"\n    [formControlName]=\"controlName\"\n  />\n\n  <custom-app-error\n    [control]=\"parentForm.controls[controlName]\"\n    [validation]=\"validation\"\n    [name]=\"name\"\n  />\n</div>\n", styles: [".dropdown-container{position:relative;width:100%}.dropdown-header{height:46px;width:100%;border-radius:.375rem;border:1px solid #d1d5db;padding:0 .5rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151}.dropdown-icons{display:flex;align-items:center;gap:8px}.clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer}.clear-icon:hover{color:#6b7280}.dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #d1d5db;border-radius:.375rem;margin-top:4px;z-index:10;box-shadow:0 4px 6px #0000001a}.filter-container{padding:8px;border-bottom:1px solid #e5e7eb}.filter-input{width:100%;padding:8px;border:1px solid #d1d5db;border-radius:.25rem;outline:none}.options-list{padding:4px 0}.dropdown-option{padding:8px 16px;cursor:pointer}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.custom-label{font-size:.875rem;color:#374151;margin-bottom:.25rem;font-weight:500;display:block}.dropdown-option{display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;transition:background-color .2s}.dropdown-option:hover{background-color:#f3f4f6}.option-label{flex:1}.custom-checkbox{appearance:none;width:20px;height:20px;border:2px solid #ccc;border-radius:3px;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease,background-color .3s ease;flex-shrink:0}.custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.custom-checkbox:checked:after{content:\"\";position:absolute;top:0;left:5px;width:6px;height:12px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#25c7bc}.dropdown-option.selected{background-color:#e5e7eb}.no-options{padding:12px 16px;color:#6b7280;font-style:italic;text-align:center}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomMultiSelectFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-multi-select-form', standalone: true, imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        ClickOutsideDirective,
                        CustomAppErrorComponent,
                    ], template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    }\n  </label>\n  }\n  <div [class]=\"'dropdown-container ' + dropdownContainerClass\">\n    <div\n      [class]=\"'dropdown-header ' + dropdownHeaderClass\"\n      (click)=\"toggleDropdown()\"\n    >\n      <span class=\"selected-value\">\n        {{ getSelectedLabels() || placeholder }}\n      </span>\n      <div class=\"dropdown-icons\">\n        @if(selectedOptions.length > 0 && showClear){\n        <span class=\"clear-icon\" (click)=\"clearSelection($event)\">\n          <svg\n            width=\"17\"\n            height=\"17\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1710)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#602650\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n          </svg>\n        </span>\n        }\n        <svg\n          width=\"17\"\n          height=\"16\"\n          viewBox=\"0 0 17 16\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M14.5 5.5L9.56061 11.0118C8.97727 11.6627 8.02273 11.6627 7.43939 11.0118L2.5 5.5\"\n            stroke=\"#602650\"\n            stroke-miterlimit=\"10\"\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n          />\n        </svg>\n      </div>\n    </div>\n\n    @if(isOpen){\n    <div\n      #dropdownOptions\n      [class]=\"'dropdown-options ' + dropdownOptionsClass\"\n      [clickOutside]=\"dropdownOptions\"\n      (clickOutsideEmitter)=\"isOpen = false\"\n    >\n      @if(enableFilter){\n      <div class=\"filter-container\">\n        <input\n          type=\"text\"\n          class=\"filter-input\"\n          placeholder=\"Filter options...\"\n          #filterInput\n          (input)=\"filterText = filterInput.value; filterOptions()\"\n        />\n      </div>\n      }\n\n      <div class=\"options-list\">\n        @for(option of filteredOptions; track option.id){\n        <label class=\"dropdown-option\">\n          <input\n            type=\"checkbox\"\n            class=\"custom-checkbox\"\n            [checked]=\"isSelected(option.id)\"\n            (change)=\"toggleOptionSelection(option)\"\n          />\n          <span class=\"option-label\">{{ option.nameEn }}</span>\n        </label>\n        } @if(filteredOptions.length === 0){\n        <div class=\"no-options\">No options found</div>\n        }\n      </div>\n    </div>\n    }\n  </div>\n\n  <input\n    type=\"hidden\"\n    [id]=\"label\"\n    [name]=\"name\"\n    [formControlName]=\"controlName\"\n  />\n\n  <custom-app-error\n    [control]=\"parentForm.controls[controlName]\"\n    [validation]=\"validation\"\n    [name]=\"name\"\n  />\n</div>\n", styles: [".dropdown-container{position:relative;width:100%}.dropdown-header{height:46px;width:100%;border-radius:.375rem;border:1px solid #d1d5db;padding:0 .5rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background-color:#fff}.selected-value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#374151}.dropdown-icons{display:flex;align-items:center;gap:8px}.clear-icon{color:#9ca3af;font-size:1.2rem;cursor:pointer}.clear-icon:hover{color:#6b7280}.dropdown-options{position:absolute;top:100%;left:0;right:0;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #d1d5db;border-radius:.375rem;margin-top:4px;z-index:10;box-shadow:0 4px 6px #0000001a}.filter-container{padding:8px;border-bottom:1px solid #e5e7eb}.filter-input{width:100%;padding:8px;border:1px solid #d1d5db;border-radius:.25rem;outline:none}.options-list{padding:4px 0}.dropdown-option{padding:8px 16px;cursor:pointer}.dropdown-option.selected{background-color:#e5e7eb;font-weight:500}.no-options{padding:8px 16px;color:#9ca3af;font-style:italic}.custom-label{font-size:.875rem;color:#374151;margin-bottom:.25rem;font-weight:500;display:block}.dropdown-option{display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;transition:background-color .2s}.dropdown-option:hover{background-color:#f3f4f6}.option-label{flex:1}.custom-checkbox{appearance:none;width:20px;height:20px;border:2px solid #ccc;border-radius:3px;position:relative;outline:none;cursor:pointer;transition:border-color .3s ease,background-color .3s ease;flex-shrink:0}.custom-checkbox:checked{background-color:#25c7bc;border-color:#25c7bc}.custom-checkbox:checked:after{content:\"\";position:absolute;top:0;left:5px;width:6px;height:12px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.custom-checkbox:focus{border-color:#25c7bc}.dropdown-option.selected{background-color:#e5e7eb}.no-options{padding:12px 16px;color:#6b7280;font-style:italic;text-align:center}\n"] }]
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
    totalPages = [];
    ngOnInit() {
        this.calculateTotalPages();
    }
    calculateTotalPages() {
        this.totalPages = Array.from({ length: Math.ceil(this.totalCount / this.pageSize) }, (_, i) => i + 1);
        console.log(this.totalCount);
        console.log(this.pageSize);
        console.log(this.totalPages);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomPaginationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomPaginationComponent, isStandalone: true, selector: "custom-pagination", inputs: { page: "page", pageSize: "pageSize", totalCount: "totalCount" }, outputs: { pageChange: "pageChange" }, ngImport: i0, template: "<div class=\"pagination\">\n  <p class=\"totalCount\">A total of {{ totalCount }} data</p>\n  @if(totalPages.length > 2){\n\n  <div class=\"page-container\">\n    <div\n      class=\"page\"\n      (click)=\"firstPage()\"\n      [ngClass]=\"{ disabled: 1 === page }\"\n    >\n      <svg\n        width=\"10\"\n        height=\"8\"\n        viewBox=\"0 0 10 8\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          fill-rule=\"evenodd\"\n          clip-rule=\"evenodd\"\n          d=\"M9.63255 7.81586C9.40287 8.05473 9.02305 8.06218 8.78418 7.8325L5.18418 4.4325C5.06653 4.31938 5.00005 4.16321 5.00005 4C5.00005 3.83679 5.06653 3.68062 5.18418 3.5675L8.78418 0.1675C9.02304 -0.0621766 9.40287 -0.0547285 9.63255 0.184134C9.86222 0.422997 9.85478 0.802823 9.61591 1.0325L6.46571 4L9.61591 6.9675C9.85478 7.19718 9.86222 7.577 9.63255 7.81586ZM4.83255 7.81586C4.60287 8.05473 4.22305 8.06218 3.98418 7.8325L0.384182 4.4325C0.266534 4.31938 0.200047 4.16321 0.200047 4C0.200047 3.83679 0.266534 3.68062 0.384182 3.5675L3.98418 0.1675C4.22304 -0.0621762 4.60287 -0.0547281 4.83255 0.184134C5.06222 0.422997 5.05478 0.802823 4.81591 1.0325L1.66571 4L4.81591 6.9675C5.05478 7.19718 5.06222 7.577 4.83255 7.81586Z\"\n          fill=\"#595959\"\n        />\n      </svg>\n    </div>\n\n    <div class=\"page\" (click)=\"prevPage()\" [ngClass]=\"{ disabled: 1 === page }\">\n      <svg\n        width=\"16\"\n        height=\"17\"\n        viewBox=\"0 0 16 17\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M10 12.0728L6 8.07275L10 4.07275\"\n          stroke=\"#595959\"\n          stroke-width=\"1.25\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n    </div>\n\n    @for(item of totalPages; track $index) {\n    <div\n      (click)=\"pageChange.emit({ page: $index + 1, pageSize: pageSize })\"\n      class=\"page\"\n      [ngClass]=\"{ active: $index + 1 === page }\"\n    >\n      {{ $index + 1 }}\n    </div>\n\n    }\n    <div\n      class=\"page\"\n      (click)=\"nextPage()\"\n      [ngClass]=\"{ disabled: totalPages.length === page }\"\n    >\n      <svg\n        width=\"17\"\n        height=\"17\"\n        viewBox=\"0 0 17 17\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M6.51001 12.0728L10.51 8.07275L6.51001 4.07275\"\n          stroke=\"#595959\"\n          stroke-width=\"1.25\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n    </div>\n\n    <div\n      class=\"page\"\n      (click)=\"lastPage()\"\n      [ngClass]=\"{ disabled: totalPages.length === page }\"\n    >\n      <svg\n        width=\"10\"\n        height=\"8\"\n        viewBox=\"0 0 10 8\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M0.384087 6.9675C0.145224 7.19718 0.137776 7.577 0.367452 7.81587C0.597128 8.05473 0.976954 8.06218 1.21582 7.8325L4.81582 4.4325C4.93347 4.31938 4.99995 4.16321 4.99995 4C4.99995 3.83679 4.93347 3.68062 4.81582 3.5675L1.21582 0.167501C0.976954 -0.0621752 0.597128 -0.0547274 0.367452 0.184135C0.137776 0.422999 0.145224 0.802824 0.384087 1.0325L3.53429 4L0.384087 6.9675Z\"\n          fill=\"#595959\"\n        />\n        <path\n          d=\"M5.18409 6.9675C4.94522 7.19718 4.93778 7.577 5.16745 7.81587C5.39713 8.05473 5.77695 8.06218 6.01582 7.8325L9.61582 4.4325C9.73347 4.31938 9.79995 4.16321 9.79995 4C9.79995 3.83679 9.73347 3.68062 9.61582 3.5675L6.01582 0.167501C5.77695 -0.0621752 5.39713 -0.0547274 5.16745 0.184135C4.93778 0.422999 4.94522 0.802824 5.18409 1.0325L8.33429 4L5.18409 6.9675Z\"\n          fill=\"#595959\"\n        />\n      </svg>\n    </div>\n\n    <div class=\"pageSize\">\n      <select class=\"pageSizeSelect\" (change)=\"onPageSizeChange($event)\">\n        <option [value]=\"10\">10 Items / Page</option>\n        <option [value]=\"20\">20 Items / Page</option>\n        <option [value]=\"50\">50 Items / Page</option>\n      </select>\n    </div>\n  </div>\n  }\n</div>\n", styles: [".pagination{display:flex;justify-content:space-between;align-items:center;width:100%;max-height:50px;margin:20px 0}.totalCount{font-size:14px;color:#595959;font-weight:500}.page-container{display:flex;align-items:center;gap:8px;max-height:50px}.page{width:32px;height:32px;max-width:32px;max-height:32px;border-radius:4px;border:1px solid rgba(217,217,217,1);color:#595959;font-size:14px;font-weight:500;display:flex;justify-content:center;align-items:center;cursor:pointer}.page.active{border:1px solid rgba(96,36,80,1);background-color:#f8f8f8}.page.disabled{border:1px solid rgba(217,217,217,1);background-color:#f2f2f2;cursor:auto}.pageSizeSelect{height:32px;border-radius:4px;border:1px solid rgba(217,217,217,1);color:#595959;font-size:14px;font-weight:500;display:flex;justify-content:center;align-items:center;cursor:pointer}select:focus-visible{outline:none;border:1px solid rgba(217,217,217,1)}.pageSizeSelect:focus-visible{outline:none;border:1px solid rgba(217,217,217,1)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomPaginationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-pagination', standalone: true, imports: [CommonModule], template: "<div class=\"pagination\">\n  <p class=\"totalCount\">A total of {{ totalCount }} data</p>\n  @if(totalPages.length > 2){\n\n  <div class=\"page-container\">\n    <div\n      class=\"page\"\n      (click)=\"firstPage()\"\n      [ngClass]=\"{ disabled: 1 === page }\"\n    >\n      <svg\n        width=\"10\"\n        height=\"8\"\n        viewBox=\"0 0 10 8\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          fill-rule=\"evenodd\"\n          clip-rule=\"evenodd\"\n          d=\"M9.63255 7.81586C9.40287 8.05473 9.02305 8.06218 8.78418 7.8325L5.18418 4.4325C5.06653 4.31938 5.00005 4.16321 5.00005 4C5.00005 3.83679 5.06653 3.68062 5.18418 3.5675L8.78418 0.1675C9.02304 -0.0621766 9.40287 -0.0547285 9.63255 0.184134C9.86222 0.422997 9.85478 0.802823 9.61591 1.0325L6.46571 4L9.61591 6.9675C9.85478 7.19718 9.86222 7.577 9.63255 7.81586ZM4.83255 7.81586C4.60287 8.05473 4.22305 8.06218 3.98418 7.8325L0.384182 4.4325C0.266534 4.31938 0.200047 4.16321 0.200047 4C0.200047 3.83679 0.266534 3.68062 0.384182 3.5675L3.98418 0.1675C4.22304 -0.0621762 4.60287 -0.0547281 4.83255 0.184134C5.06222 0.422997 5.05478 0.802823 4.81591 1.0325L1.66571 4L4.81591 6.9675C5.05478 7.19718 5.06222 7.577 4.83255 7.81586Z\"\n          fill=\"#595959\"\n        />\n      </svg>\n    </div>\n\n    <div class=\"page\" (click)=\"prevPage()\" [ngClass]=\"{ disabled: 1 === page }\">\n      <svg\n        width=\"16\"\n        height=\"17\"\n        viewBox=\"0 0 16 17\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M10 12.0728L6 8.07275L10 4.07275\"\n          stroke=\"#595959\"\n          stroke-width=\"1.25\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n    </div>\n\n    @for(item of totalPages; track $index) {\n    <div\n      (click)=\"pageChange.emit({ page: $index + 1, pageSize: pageSize })\"\n      class=\"page\"\n      [ngClass]=\"{ active: $index + 1 === page }\"\n    >\n      {{ $index + 1 }}\n    </div>\n\n    }\n    <div\n      class=\"page\"\n      (click)=\"nextPage()\"\n      [ngClass]=\"{ disabled: totalPages.length === page }\"\n    >\n      <svg\n        width=\"17\"\n        height=\"17\"\n        viewBox=\"0 0 17 17\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M6.51001 12.0728L10.51 8.07275L6.51001 4.07275\"\n          stroke=\"#595959\"\n          stroke-width=\"1.25\"\n          stroke-linecap=\"round\"\n          stroke-linejoin=\"round\"\n        />\n      </svg>\n    </div>\n\n    <div\n      class=\"page\"\n      (click)=\"lastPage()\"\n      [ngClass]=\"{ disabled: totalPages.length === page }\"\n    >\n      <svg\n        width=\"10\"\n        height=\"8\"\n        viewBox=\"0 0 10 8\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M0.384087 6.9675C0.145224 7.19718 0.137776 7.577 0.367452 7.81587C0.597128 8.05473 0.976954 8.06218 1.21582 7.8325L4.81582 4.4325C4.93347 4.31938 4.99995 4.16321 4.99995 4C4.99995 3.83679 4.93347 3.68062 4.81582 3.5675L1.21582 0.167501C0.976954 -0.0621752 0.597128 -0.0547274 0.367452 0.184135C0.137776 0.422999 0.145224 0.802824 0.384087 1.0325L3.53429 4L0.384087 6.9675Z\"\n          fill=\"#595959\"\n        />\n        <path\n          d=\"M5.18409 6.9675C4.94522 7.19718 4.93778 7.577 5.16745 7.81587C5.39713 8.05473 5.77695 8.06218 6.01582 7.8325L9.61582 4.4325C9.73347 4.31938 9.79995 4.16321 9.79995 4C9.79995 3.83679 9.73347 3.68062 9.61582 3.5675L6.01582 0.167501C5.77695 -0.0621752 5.39713 -0.0547274 5.16745 0.184135C4.93778 0.422999 4.94522 0.802824 5.18409 1.0325L8.33429 4L5.18409 6.9675Z\"\n          fill=\"#595959\"\n        />\n      </svg>\n    </div>\n\n    <div class=\"pageSize\">\n      <select class=\"pageSizeSelect\" (change)=\"onPageSizeChange($event)\">\n        <option [value]=\"10\">10 Items / Page</option>\n        <option [value]=\"20\">20 Items / Page</option>\n        <option [value]=\"50\">50 Items / Page</option>\n      </select>\n    </div>\n  </div>\n  }\n</div>\n", styles: [".pagination{display:flex;justify-content:space-between;align-items:center;width:100%;max-height:50px;margin:20px 0}.totalCount{font-size:14px;color:#595959;font-weight:500}.page-container{display:flex;align-items:center;gap:8px;max-height:50px}.page{width:32px;height:32px;max-width:32px;max-height:32px;border-radius:4px;border:1px solid rgba(217,217,217,1);color:#595959;font-size:14px;font-weight:500;display:flex;justify-content:center;align-items:center;cursor:pointer}.page.active{border:1px solid rgba(96,36,80,1);background-color:#f8f8f8}.page.disabled{border:1px solid rgba(217,217,217,1);background-color:#f2f2f2;cursor:auto}.pageSizeSelect{height:32px;border-radius:4px;border:1px solid rgba(217,217,217,1);color:#595959;font-size:14px;font-weight:500;display:flex;justify-content:center;align-items:center;cursor:pointer}select:focus-visible{outline:none;border:1px solid rgba(217,217,217,1)}.pageSizeSelect:focus-visible{outline:none;border:1px solid rgba(217,217,217,1)}\n"] }]
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomPopUpComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomPopUpComponent, isStandalone: true, selector: "custom-pop-up", inputs: { popUpClass: "popUpClass", message: "message", icon: "icon", overlayClass: "overlayClass", messageClass: "messageClass", iconClass: "iconClass", isOpen: "isOpen" }, outputs: { onHide: "onHide" }, ngImport: i0, template: "@if(isOpen){\n<div [class]=\"'overlay ' + overlayClass\">\n  <div\n    [class]=\"'custom-pop-up-container ' + popUpClass\"\n    #popUp\n    [clickOutside]=\"popUp\"\n    (clickOutsideEmitter)=\"onHide.emit()\"\n  >\n    <img [src]=\"icon\" [class]=\"iconClass\" alt=\"\" />\n    <p [class]=\"'message ' + messageClass\">{{ message }}</p>\n    <ng-content></ng-content>\n  </div>\n</div>\n}\n", styles: [".overlay{position:fixed;inset:0;background-color:#000000b3;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:50;cursor:pointer}.custom-pop-up-container{width:38rem;border-radius:1rem;padding:5rem;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2rem}.message{font-size:1.2rem;color:#fff;font-weight:500;text-align:center}\n"], dependencies: [{ kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomPopUpComponent, decorators: [{
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

class CustomTableComponent {
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
    ngOnInit() {
        if (!this.tableHeader) {
            throw new Error('tableHeader input is required.');
        }
        if (!this.tableData && !this.tableCategories) {
            throw new Error('You need to log tableCategories or tableData');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomTableComponent, isStandalone: true, selector: "custom-table", inputs: { tableData: "tableData", tableCategories: "tableCategories", tableHeader: "tableHeader", showStatusColumn: "showStatusColumn", showActionColumn: "showActionColumn", statusCol: "statusCol", rowClass: "rowClass", headerClass: "headerClass", templates: "templates", enableEdit: "enableEdit", enableDelete: "enableDelete", enableView: "enableView" }, outputs: { onEdit: "onEdit", onView: "onView", onDelete: "onDelete", onRowClick: "onRowClick" }, ngImport: i0, template: "<table class=\"striped-table\">\n  <thead [class]=\"headerClass\">\n    <tr>\n      @for(item of tableHeader; track $index) {\n      <th>{{ item.header }}</th>\n      } @if(showStatusColumn) {\n      <th>Status</th>\n      } @if(showActionColumn) {\n      <th>Actions</th>\n      }\n    </tr>\n  </thead>\n  <tbody>\n    <!-- If tableCategories are provided, render by category -->\n    @if(tableCategories?.length) { @for(cat of tableCategories; track $index) {\n    <!-- Category Header Row -->\n    <tr class=\"category-row\" (click)=\"cat.isCollapsed = !cat.isCollapsed\">\n      <td\n        [attr.colspan]=\"\n          tableHeader.length +\n          (showStatusColumn ? 1 : 0) +\n          (showActionColumn ? 1 : 0)\n        \"\n      >\n        <strong>\n          {{ cat.category }}\n          <span style=\"float: right\">\n            <button type=\"button\">\n              {{ cat.isCollapsed ? \"Expand\" : \"Collapse\" }}\n            </button>\n          </span>\n        </strong>\n      </td>\n    </tr>\n    <!-- Category Rows (collapsible) -->\n    @if(!cat.isCollapsed) { @for(item of cat.rows; track $index) {\n    <tr (click)=\"onRowClick.emit(item)\" [class]=\"rowClass\">\n      @for(col of tableHeader; track $index) { @if(col.htmlRef) {\n      <td>\n        <ng-container\n          *ngTemplateOutlet=\"\n            templates[col.htmlRef];\n            context: { $implicit: item }\n          \"\n        ></ng-container>\n      </td>\n      } @else if(col.body) {\n      <td>{{ item[col.body] }}</td>\n      } } @if(showStatusColumn) {\n      <td data-label=\"Status\">\n        @if(item[statusCol.header] === statusCol.trueValue) {\n        <div class=\"true\">{{ statusCol.trueText }}</div>\n        } @else {\n        <div class=\"false\">{{ statusCol.falseText }}</div>\n        }\n      </td>\n      } @if(showActionColumn) {\n      <td>\n        <div\n          style=\"\n            display: flex;\n            justify-content: start;\n            align-items: center;\n            gap: 10px;\n            cursor: pointer;\n          \"\n        >\n          @if(enableView){\n\n          <svg\n            (click)=\"$event.stopPropagation(); onView.emit()\"\n            width=\"21\"\n            height=\"18\"\n            viewBox=\"0 0 21 18\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M10.8336 0.75C15.7764 0.75 19.8885 4.30645 20.7507 9C19.8885 13.6935 15.7764 17.25 10.8336 17.25C5.89078 17.25 1.77864 13.6935 0.916504 9C1.77864 4.30645 5.89078 0.75 10.8336 0.75ZM10.8336 15.4167C14.7162 15.4167 18.0386 12.7143 18.8796 9C18.0386 5.28569 14.7162 2.58333 10.8336 2.58333C6.95088 2.58333 3.62854 5.28569 2.78755 9C3.62854 12.7143 6.95088 15.4167 10.8336 15.4167ZM10.8336 13.125C8.5554 13.125 6.70857 11.2782 6.70857 9C6.70857 6.72183 8.5554 4.875 10.8336 4.875C13.1117 4.875 14.9586 6.72183 14.9586 9C14.9586 11.2782 13.1117 13.125 10.8336 13.125ZM10.8336 11.2917C12.0993 11.2917 13.1253 10.2656 13.1253 9C13.1253 7.73436 12.0993 6.70833 10.8336 6.70833C9.56797 6.70833 8.54191 7.73436 8.54191 9C8.54191 10.2656 9.56797 11.2917 10.8336 11.2917Z\"\n              fill=\"#25C7BC\"\n            />\n          </svg>\n          } @if(enableEdit){\n\n          <svg\n            (click)=\"$event.stopPropagation(); onEdit.emit()\"\n            width=\"20\"\n            height=\"19\"\n            viewBox=\"0 0 20 19\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M14.0631 12.6426L15.1508 11.5549C15.3208 11.3849 15.6165 11.5039 15.6165 11.7486V16.6909C15.6165 17.5916 14.8857 18.3224 13.9849 18.3224H2.02022C1.11947 18.3224 0.388672 17.5916 0.388672 16.6909V4.72616C0.388672 3.82541 1.11947 3.09461 2.02022 3.09461H11.3167C11.558 3.09461 11.6804 3.38693 11.5104 3.56028L10.4227 4.64798C10.3717 4.69897 10.3038 4.72616 10.229 4.72616H2.02022V16.6909H13.9849V12.8329C13.9849 12.7616 14.0121 12.6936 14.0631 12.6426ZM19.3861 5.78327L10.4601 14.7092L7.38735 15.0491C6.4968 15.1477 5.73881 14.3965 5.83738 13.4992L6.17729 10.4264L15.1032 1.50045C15.8816 0.72206 17.1393 0.72206 17.9143 1.50045L19.3827 2.96884C20.1611 3.74723 20.1611 5.00829 19.3861 5.78327ZM16.0278 6.83359L14.0529 4.85873L7.73746 11.1776L7.48933 13.3972L9.70892 13.1491L16.0278 6.83359ZM18.2304 4.12453L16.762 2.65613C16.6226 2.51677 16.3949 2.51677 16.2589 2.65613L15.2086 3.70644L17.1835 5.6813L18.2338 4.63099C18.3697 4.48823 18.3697 4.26389 18.2304 4.12453Z\"\n              fill=\"#444A6D\"\n            />\n          </svg>\n          } @if(enableDelete){\n          <svg\n            (click)=\"$event.stopPropagation(); onDelete.emit()\"\n            width=\"17\"\n            height=\"17\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1766)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#F43F5E\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#F43F5E\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1766\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n          }\n        </div>\n      </td>\n      }\n    </tr>\n    } } } }\n    <!-- If no tableCategories, render flat tableData as before -->\n    @else { @for(item of tableData; track $index) {\n    <tr (click)=\"onRowClick.emit(item)\" [class]=\"rowClass\">\n      @for(col of tableHeader; track $index) { @if(col.htmlRef) {\n      <td>\n        <ng-container\n          *ngTemplateOutlet=\"\n            templates[col.htmlRef];\n            context: { $implicit: item }\n          \"\n        ></ng-container>\n      </td>\n      } @else if(col.body) {\n      <td>{{ item[col.body] }}</td>\n      } } @if(showStatusColumn) {\n      <td data-label=\"Status\">\n        @if(item[statusCol.header] === statusCol.trueValue) {\n        <div class=\"true\">{{ statusCol.trueText }}</div>\n        } @else {\n        <div class=\"false\">{{ statusCol.falseText }}</div>\n        }\n      </td>\n      } @if(showActionColumn) {\n      <td>\n        <div\n          style=\"\n            display: flex;\n            justify-content: start;\n            align-items: center;\n            gap: 10px;\n            cursor: pointer;\n          \"\n        >\n          @if(enableView){\n\n          <svg\n            (click)=\"$event.stopPropagation(); onView.emit()\"\n            width=\"21\"\n            height=\"18\"\n            viewBox=\"0 0 21 18\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M10.8336 0.75C15.7764 0.75 19.8885 4.30645 20.7507 9C19.8885 13.6935 15.7764 17.25 10.8336 17.25C5.89078 17.25 1.77864 13.6935 0.916504 9C1.77864 4.30645 5.89078 0.75 10.8336 0.75ZM10.8336 15.4167C14.7162 15.4167 18.0386 12.7143 18.8796 9C18.0386 5.28569 14.7162 2.58333 10.8336 2.58333C6.95088 2.58333 3.62854 5.28569 2.78755 9C3.62854 12.7143 6.95088 15.4167 10.8336 15.4167ZM10.8336 13.125C8.5554 13.125 6.70857 11.2782 6.70857 9C6.70857 6.72183 8.5554 4.875 10.8336 4.875C13.1117 4.875 14.9586 6.72183 14.9586 9C14.9586 11.2782 13.1117 13.125 10.8336 13.125ZM10.8336 11.2917C12.0993 11.2917 13.1253 10.2656 13.1253 9C13.1253 7.73436 12.0993 6.70833 10.8336 6.70833C9.56797 6.70833 8.54191 7.73436 8.54191 9C8.54191 10.2656 9.56797 11.2917 10.8336 11.2917Z\"\n              fill=\"#25C7BC\"\n            />\n          </svg>\n          } @if(enableEdit){\n\n          <svg\n            (click)=\"$event.stopPropagation(); onEdit.emit()\"\n            width=\"20\"\n            height=\"19\"\n            viewBox=\"0 0 20 19\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M14.0631 12.6426L15.1508 11.5549C15.3208 11.3849 15.6165 11.5039 15.6165 11.7486V16.6909C15.6165 17.5916 14.8857 18.3224 13.9849 18.3224H2.02022C1.11947 18.3224 0.388672 17.5916 0.388672 16.6909V4.72616C0.388672 3.82541 1.11947 3.09461 2.02022 3.09461H11.3167C11.558 3.09461 11.6804 3.38693 11.5104 3.56028L10.4227 4.64798C10.3717 4.69897 10.3038 4.72616 10.229 4.72616H2.02022V16.6909H13.9849V12.8329C13.9849 12.7616 14.0121 12.6936 14.0631 12.6426ZM19.3861 5.78327L10.4601 14.7092L7.38735 15.0491C6.4968 15.1477 5.73881 14.3965 5.83738 13.4992L6.17729 10.4264L15.1032 1.50045C15.8816 0.72206 17.1393 0.72206 17.9143 1.50045L19.3827 2.96884C20.1611 3.74723 20.1611 5.00829 19.3861 5.78327ZM16.0278 6.83359L14.0529 4.85873L7.73746 11.1776L7.48933 13.3972L9.70892 13.1491L16.0278 6.83359ZM18.2304 4.12453L16.762 2.65613C16.6226 2.51677 16.3949 2.51677 16.2589 2.65613L15.2086 3.70644L17.1835 5.6813L18.2338 4.63099C18.3697 4.48823 18.3697 4.26389 18.2304 4.12453Z\"\n              fill=\"#444A6D\"\n            />\n          </svg>\n          } @if(enableDelete){\n          <svg\n            (click)=\"$event.stopPropagation(); onDelete.emit()\"\n            width=\"17\"\n            height=\"17\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1766)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#F43F5E\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#F43F5E\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1766\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n          }\n        </div>\n      </td>\n      }\n    </tr>\n    } }\n  </tbody>\n</table>\n<!-- \n<table class=\"striped-table\">\n  <thead [class]=\"headerClass\">\n    <tr>\n      @for( item of tableHeader; track $index) {\n      <th>{{ item.header }}</th>\n      } @if(showStatusColumn) {\n      <th>Status</th>\n      } @if(showActionColumn) {\n      <th>Actions</th>\n      }\n    </tr>\n  </thead>\n  <tbody>\n    @for( item of tableData; track $index) {\n    <tr (click)=\"onRowClick.emit(item)\" [class]=\"rowClass\">\n      @for(col of tableHeader; track $index) { @if(col.htmlRef) {\n      <td>\n        <ng-container\n          *ngTemplateOutlet=\"\n            templates[col.htmlRef];\n            context: { $implicit: item }\n          \"\n        ></ng-container>\n      </td>\n      } @else if(col.body) {\n      <td>{{ item[col.body] }}</td>\n      } } @if(showStatusColumn) {\n      <td data-label=\"Status\">\n        @if(item[statusCol.header] === statusCol.trueValue) {\n        <div class=\"true\">{{ statusCol.trueText }}</div>\n        } @else {\n        <div class=\"false\">{{ statusCol.falseText }}</div>\n        }\n      </td>\n      } @if(showActionColumn) {\n\n      <td>\n        <div\n          style=\"\n            display: flex;\n            justify-content: start;\n            align-items: center;\n            gap: 10px;\n            cursor: pointer;\n          \"\n        >\n          @if(enableView){\n\n          <svg\n            (click)=\"$event.stopPropagation(); onView.emit()\"\n            width=\"21\"\n            height=\"18\"\n            viewBox=\"0 0 21 18\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M10.8336 0.75C15.7764 0.75 19.8885 4.30645 20.7507 9C19.8885 13.6935 15.7764 17.25 10.8336 17.25C5.89078 17.25 1.77864 13.6935 0.916504 9C1.77864 4.30645 5.89078 0.75 10.8336 0.75ZM10.8336 15.4167C14.7162 15.4167 18.0386 12.7143 18.8796 9C18.0386 5.28569 14.7162 2.58333 10.8336 2.58333C6.95088 2.58333 3.62854 5.28569 2.78755 9C3.62854 12.7143 6.95088 15.4167 10.8336 15.4167ZM10.8336 13.125C8.5554 13.125 6.70857 11.2782 6.70857 9C6.70857 6.72183 8.5554 4.875 10.8336 4.875C13.1117 4.875 14.9586 6.72183 14.9586 9C14.9586 11.2782 13.1117 13.125 10.8336 13.125ZM10.8336 11.2917C12.0993 11.2917 13.1253 10.2656 13.1253 9C13.1253 7.73436 12.0993 6.70833 10.8336 6.70833C9.56797 6.70833 8.54191 7.73436 8.54191 9C8.54191 10.2656 9.56797 11.2917 10.8336 11.2917Z\"\n              fill=\"#25C7BC\"\n            />\n          </svg>\n          } @if(enableEdit){\n\n          <svg\n            (click)=\"$event.stopPropagation(); onEdit.emit()\"\n            width=\"20\"\n            height=\"19\"\n            viewBox=\"0 0 20 19\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M14.0631 12.6426L15.1508 11.5549C15.3208 11.3849 15.6165 11.5039 15.6165 11.7486V16.6909C15.6165 17.5916 14.8857 18.3224 13.9849 18.3224H2.02022C1.11947 18.3224 0.388672 17.5916 0.388672 16.6909V4.72616C0.388672 3.82541 1.11947 3.09461 2.02022 3.09461H11.3167C11.558 3.09461 11.6804 3.38693 11.5104 3.56028L10.4227 4.64798C10.3717 4.69897 10.3038 4.72616 10.229 4.72616H2.02022V16.6909H13.9849V12.8329C13.9849 12.7616 14.0121 12.6936 14.0631 12.6426ZM19.3861 5.78327L10.4601 14.7092L7.38735 15.0491C6.4968 15.1477 5.73881 14.3965 5.83738 13.4992L6.17729 10.4264L15.1032 1.50045C15.8816 0.72206 17.1393 0.72206 17.9143 1.50045L19.3827 2.96884C20.1611 3.74723 20.1611 5.00829 19.3861 5.78327ZM16.0278 6.83359L14.0529 4.85873L7.73746 11.1776L7.48933 13.3972L9.70892 13.1491L16.0278 6.83359ZM18.2304 4.12453L16.762 2.65613C16.6226 2.51677 16.3949 2.51677 16.2589 2.65613L15.2086 3.70644L17.1835 5.6813L18.2338 4.63099C18.3697 4.48823 18.3697 4.26389 18.2304 4.12453Z\"\n              fill=\"#444A6D\"\n            />\n          </svg>\n          } @if(enableDelete){\n          <svg\n            (click)=\"$event.stopPropagation(); onDelete.emit()\"\n            width=\"17\"\n            height=\"17\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1766)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#F43F5E\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#F43F5E\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1766\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n          }\n        </div>\n      </td>\n      }\n    </tr>\n    }\n  </tbody>\n</table> -->\n", styles: [".category-section{background-color:#f4f6fb}.category-header{padding:0;border-left:5px solid #25c7bc}.category-header-wrapper{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;font-weight:700;background-color:#f4f6fb}.category-title{font-size:16px;color:#1a1a1a}.toggle-button{background:none;border:none;color:#25c7bc;cursor:pointer;font-weight:600}.category-item-row{background-color:#fff}.actions{display:flex;justify-content:start;align-items:center;gap:10px;cursor:pointer}.true{color:green}.false{color:red}.striped-table{width:100%;overflow:hidden}.striped-table thead{background-color:#f5f5f5;color:#72788e;text-align:left}.striped-table th{padding:10px}.striped-table tbody tr{font-weight:600;font-size:1.2rem}.striped-table tbody tr:nth-child(2n){background-color:#25c7bc1a}.striped-table tbody tr:nth-child(odd){background-color:#fff}.striped-table tbody tr{font-weight:500;font-size:1rem}.striped-table td{padding:8px 10px;color:#72788e}.striped-table tbody tr:last-child td{border-bottom:none}@media (max-width: 768px){.striped-table{display:block}.striped-table thead{display:none}.striped-table tbody tr{display:block;margin-bottom:15px;border-radius:8px;box-shadow:0 2px 8px #0000001a}.striped-table td{display:block;text-align:right;padding-left:50%;position:relative;border-bottom:1px solid #e0e0e0}.striped-table td:before{content:attr(data-label);position:absolute;left:15px;width:45%;padding-right:10px;font-weight:600;text-align:left;color:#4a6fa5}}.active{background-color:#c8ffc7;width:85px;height:28px;border-radius:100px;display:flex;justify-content:center;align-items:center;font-size:.8rem;font-weight:500;color:#0d7d0b}.inactive{background-color:#ffe0e5;width:85px;height:28px;border-radius:100px;display:flex;justify-content:center;align-items:center;font-size:.8rem;font-weight:500;color:#d2344f}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-table', standalone: true, imports: [CommonModule], template: "<table class=\"striped-table\">\n  <thead [class]=\"headerClass\">\n    <tr>\n      @for(item of tableHeader; track $index) {\n      <th>{{ item.header }}</th>\n      } @if(showStatusColumn) {\n      <th>Status</th>\n      } @if(showActionColumn) {\n      <th>Actions</th>\n      }\n    </tr>\n  </thead>\n  <tbody>\n    <!-- If tableCategories are provided, render by category -->\n    @if(tableCategories?.length) { @for(cat of tableCategories; track $index) {\n    <!-- Category Header Row -->\n    <tr class=\"category-row\" (click)=\"cat.isCollapsed = !cat.isCollapsed\">\n      <td\n        [attr.colspan]=\"\n          tableHeader.length +\n          (showStatusColumn ? 1 : 0) +\n          (showActionColumn ? 1 : 0)\n        \"\n      >\n        <strong>\n          {{ cat.category }}\n          <span style=\"float: right\">\n            <button type=\"button\">\n              {{ cat.isCollapsed ? \"Expand\" : \"Collapse\" }}\n            </button>\n          </span>\n        </strong>\n      </td>\n    </tr>\n    <!-- Category Rows (collapsible) -->\n    @if(!cat.isCollapsed) { @for(item of cat.rows; track $index) {\n    <tr (click)=\"onRowClick.emit(item)\" [class]=\"rowClass\">\n      @for(col of tableHeader; track $index) { @if(col.htmlRef) {\n      <td>\n        <ng-container\n          *ngTemplateOutlet=\"\n            templates[col.htmlRef];\n            context: { $implicit: item }\n          \"\n        ></ng-container>\n      </td>\n      } @else if(col.body) {\n      <td>{{ item[col.body] }}</td>\n      } } @if(showStatusColumn) {\n      <td data-label=\"Status\">\n        @if(item[statusCol.header] === statusCol.trueValue) {\n        <div class=\"true\">{{ statusCol.trueText }}</div>\n        } @else {\n        <div class=\"false\">{{ statusCol.falseText }}</div>\n        }\n      </td>\n      } @if(showActionColumn) {\n      <td>\n        <div\n          style=\"\n            display: flex;\n            justify-content: start;\n            align-items: center;\n            gap: 10px;\n            cursor: pointer;\n          \"\n        >\n          @if(enableView){\n\n          <svg\n            (click)=\"$event.stopPropagation(); onView.emit()\"\n            width=\"21\"\n            height=\"18\"\n            viewBox=\"0 0 21 18\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M10.8336 0.75C15.7764 0.75 19.8885 4.30645 20.7507 9C19.8885 13.6935 15.7764 17.25 10.8336 17.25C5.89078 17.25 1.77864 13.6935 0.916504 9C1.77864 4.30645 5.89078 0.75 10.8336 0.75ZM10.8336 15.4167C14.7162 15.4167 18.0386 12.7143 18.8796 9C18.0386 5.28569 14.7162 2.58333 10.8336 2.58333C6.95088 2.58333 3.62854 5.28569 2.78755 9C3.62854 12.7143 6.95088 15.4167 10.8336 15.4167ZM10.8336 13.125C8.5554 13.125 6.70857 11.2782 6.70857 9C6.70857 6.72183 8.5554 4.875 10.8336 4.875C13.1117 4.875 14.9586 6.72183 14.9586 9C14.9586 11.2782 13.1117 13.125 10.8336 13.125ZM10.8336 11.2917C12.0993 11.2917 13.1253 10.2656 13.1253 9C13.1253 7.73436 12.0993 6.70833 10.8336 6.70833C9.56797 6.70833 8.54191 7.73436 8.54191 9C8.54191 10.2656 9.56797 11.2917 10.8336 11.2917Z\"\n              fill=\"#25C7BC\"\n            />\n          </svg>\n          } @if(enableEdit){\n\n          <svg\n            (click)=\"$event.stopPropagation(); onEdit.emit()\"\n            width=\"20\"\n            height=\"19\"\n            viewBox=\"0 0 20 19\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M14.0631 12.6426L15.1508 11.5549C15.3208 11.3849 15.6165 11.5039 15.6165 11.7486V16.6909C15.6165 17.5916 14.8857 18.3224 13.9849 18.3224H2.02022C1.11947 18.3224 0.388672 17.5916 0.388672 16.6909V4.72616C0.388672 3.82541 1.11947 3.09461 2.02022 3.09461H11.3167C11.558 3.09461 11.6804 3.38693 11.5104 3.56028L10.4227 4.64798C10.3717 4.69897 10.3038 4.72616 10.229 4.72616H2.02022V16.6909H13.9849V12.8329C13.9849 12.7616 14.0121 12.6936 14.0631 12.6426ZM19.3861 5.78327L10.4601 14.7092L7.38735 15.0491C6.4968 15.1477 5.73881 14.3965 5.83738 13.4992L6.17729 10.4264L15.1032 1.50045C15.8816 0.72206 17.1393 0.72206 17.9143 1.50045L19.3827 2.96884C20.1611 3.74723 20.1611 5.00829 19.3861 5.78327ZM16.0278 6.83359L14.0529 4.85873L7.73746 11.1776L7.48933 13.3972L9.70892 13.1491L16.0278 6.83359ZM18.2304 4.12453L16.762 2.65613C16.6226 2.51677 16.3949 2.51677 16.2589 2.65613L15.2086 3.70644L17.1835 5.6813L18.2338 4.63099C18.3697 4.48823 18.3697 4.26389 18.2304 4.12453Z\"\n              fill=\"#444A6D\"\n            />\n          </svg>\n          } @if(enableDelete){\n          <svg\n            (click)=\"$event.stopPropagation(); onDelete.emit()\"\n            width=\"17\"\n            height=\"17\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1766)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#F43F5E\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#F43F5E\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1766\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n          }\n        </div>\n      </td>\n      }\n    </tr>\n    } } } }\n    <!-- If no tableCategories, render flat tableData as before -->\n    @else { @for(item of tableData; track $index) {\n    <tr (click)=\"onRowClick.emit(item)\" [class]=\"rowClass\">\n      @for(col of tableHeader; track $index) { @if(col.htmlRef) {\n      <td>\n        <ng-container\n          *ngTemplateOutlet=\"\n            templates[col.htmlRef];\n            context: { $implicit: item }\n          \"\n        ></ng-container>\n      </td>\n      } @else if(col.body) {\n      <td>{{ item[col.body] }}</td>\n      } } @if(showStatusColumn) {\n      <td data-label=\"Status\">\n        @if(item[statusCol.header] === statusCol.trueValue) {\n        <div class=\"true\">{{ statusCol.trueText }}</div>\n        } @else {\n        <div class=\"false\">{{ statusCol.falseText }}</div>\n        }\n      </td>\n      } @if(showActionColumn) {\n      <td>\n        <div\n          style=\"\n            display: flex;\n            justify-content: start;\n            align-items: center;\n            gap: 10px;\n            cursor: pointer;\n          \"\n        >\n          @if(enableView){\n\n          <svg\n            (click)=\"$event.stopPropagation(); onView.emit()\"\n            width=\"21\"\n            height=\"18\"\n            viewBox=\"0 0 21 18\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M10.8336 0.75C15.7764 0.75 19.8885 4.30645 20.7507 9C19.8885 13.6935 15.7764 17.25 10.8336 17.25C5.89078 17.25 1.77864 13.6935 0.916504 9C1.77864 4.30645 5.89078 0.75 10.8336 0.75ZM10.8336 15.4167C14.7162 15.4167 18.0386 12.7143 18.8796 9C18.0386 5.28569 14.7162 2.58333 10.8336 2.58333C6.95088 2.58333 3.62854 5.28569 2.78755 9C3.62854 12.7143 6.95088 15.4167 10.8336 15.4167ZM10.8336 13.125C8.5554 13.125 6.70857 11.2782 6.70857 9C6.70857 6.72183 8.5554 4.875 10.8336 4.875C13.1117 4.875 14.9586 6.72183 14.9586 9C14.9586 11.2782 13.1117 13.125 10.8336 13.125ZM10.8336 11.2917C12.0993 11.2917 13.1253 10.2656 13.1253 9C13.1253 7.73436 12.0993 6.70833 10.8336 6.70833C9.56797 6.70833 8.54191 7.73436 8.54191 9C8.54191 10.2656 9.56797 11.2917 10.8336 11.2917Z\"\n              fill=\"#25C7BC\"\n            />\n          </svg>\n          } @if(enableEdit){\n\n          <svg\n            (click)=\"$event.stopPropagation(); onEdit.emit()\"\n            width=\"20\"\n            height=\"19\"\n            viewBox=\"0 0 20 19\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M14.0631 12.6426L15.1508 11.5549C15.3208 11.3849 15.6165 11.5039 15.6165 11.7486V16.6909C15.6165 17.5916 14.8857 18.3224 13.9849 18.3224H2.02022C1.11947 18.3224 0.388672 17.5916 0.388672 16.6909V4.72616C0.388672 3.82541 1.11947 3.09461 2.02022 3.09461H11.3167C11.558 3.09461 11.6804 3.38693 11.5104 3.56028L10.4227 4.64798C10.3717 4.69897 10.3038 4.72616 10.229 4.72616H2.02022V16.6909H13.9849V12.8329C13.9849 12.7616 14.0121 12.6936 14.0631 12.6426ZM19.3861 5.78327L10.4601 14.7092L7.38735 15.0491C6.4968 15.1477 5.73881 14.3965 5.83738 13.4992L6.17729 10.4264L15.1032 1.50045C15.8816 0.72206 17.1393 0.72206 17.9143 1.50045L19.3827 2.96884C20.1611 3.74723 20.1611 5.00829 19.3861 5.78327ZM16.0278 6.83359L14.0529 4.85873L7.73746 11.1776L7.48933 13.3972L9.70892 13.1491L16.0278 6.83359ZM18.2304 4.12453L16.762 2.65613C16.6226 2.51677 16.3949 2.51677 16.2589 2.65613L15.2086 3.70644L17.1835 5.6813L18.2338 4.63099C18.3697 4.48823 18.3697 4.26389 18.2304 4.12453Z\"\n              fill=\"#444A6D\"\n            />\n          </svg>\n          } @if(enableDelete){\n          <svg\n            (click)=\"$event.stopPropagation(); onDelete.emit()\"\n            width=\"17\"\n            height=\"17\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1766)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#F43F5E\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#F43F5E\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1766\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n          }\n        </div>\n      </td>\n      }\n    </tr>\n    } }\n  </tbody>\n</table>\n<!-- \n<table class=\"striped-table\">\n  <thead [class]=\"headerClass\">\n    <tr>\n      @for( item of tableHeader; track $index) {\n      <th>{{ item.header }}</th>\n      } @if(showStatusColumn) {\n      <th>Status</th>\n      } @if(showActionColumn) {\n      <th>Actions</th>\n      }\n    </tr>\n  </thead>\n  <tbody>\n    @for( item of tableData; track $index) {\n    <tr (click)=\"onRowClick.emit(item)\" [class]=\"rowClass\">\n      @for(col of tableHeader; track $index) { @if(col.htmlRef) {\n      <td>\n        <ng-container\n          *ngTemplateOutlet=\"\n            templates[col.htmlRef];\n            context: { $implicit: item }\n          \"\n        ></ng-container>\n      </td>\n      } @else if(col.body) {\n      <td>{{ item[col.body] }}</td>\n      } } @if(showStatusColumn) {\n      <td data-label=\"Status\">\n        @if(item[statusCol.header] === statusCol.trueValue) {\n        <div class=\"true\">{{ statusCol.trueText }}</div>\n        } @else {\n        <div class=\"false\">{{ statusCol.falseText }}</div>\n        }\n      </td>\n      } @if(showActionColumn) {\n\n      <td>\n        <div\n          style=\"\n            display: flex;\n            justify-content: start;\n            align-items: center;\n            gap: 10px;\n            cursor: pointer;\n          \"\n        >\n          @if(enableView){\n\n          <svg\n            (click)=\"$event.stopPropagation(); onView.emit()\"\n            width=\"21\"\n            height=\"18\"\n            viewBox=\"0 0 21 18\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M10.8336 0.75C15.7764 0.75 19.8885 4.30645 20.7507 9C19.8885 13.6935 15.7764 17.25 10.8336 17.25C5.89078 17.25 1.77864 13.6935 0.916504 9C1.77864 4.30645 5.89078 0.75 10.8336 0.75ZM10.8336 15.4167C14.7162 15.4167 18.0386 12.7143 18.8796 9C18.0386 5.28569 14.7162 2.58333 10.8336 2.58333C6.95088 2.58333 3.62854 5.28569 2.78755 9C3.62854 12.7143 6.95088 15.4167 10.8336 15.4167ZM10.8336 13.125C8.5554 13.125 6.70857 11.2782 6.70857 9C6.70857 6.72183 8.5554 4.875 10.8336 4.875C13.1117 4.875 14.9586 6.72183 14.9586 9C14.9586 11.2782 13.1117 13.125 10.8336 13.125ZM10.8336 11.2917C12.0993 11.2917 13.1253 10.2656 13.1253 9C13.1253 7.73436 12.0993 6.70833 10.8336 6.70833C9.56797 6.70833 8.54191 7.73436 8.54191 9C8.54191 10.2656 9.56797 11.2917 10.8336 11.2917Z\"\n              fill=\"#25C7BC\"\n            />\n          </svg>\n          } @if(enableEdit){\n\n          <svg\n            (click)=\"$event.stopPropagation(); onEdit.emit()\"\n            width=\"20\"\n            height=\"19\"\n            viewBox=\"0 0 20 19\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M14.0631 12.6426L15.1508 11.5549C15.3208 11.3849 15.6165 11.5039 15.6165 11.7486V16.6909C15.6165 17.5916 14.8857 18.3224 13.9849 18.3224H2.02022C1.11947 18.3224 0.388672 17.5916 0.388672 16.6909V4.72616C0.388672 3.82541 1.11947 3.09461 2.02022 3.09461H11.3167C11.558 3.09461 11.6804 3.38693 11.5104 3.56028L10.4227 4.64798C10.3717 4.69897 10.3038 4.72616 10.229 4.72616H2.02022V16.6909H13.9849V12.8329C13.9849 12.7616 14.0121 12.6936 14.0631 12.6426ZM19.3861 5.78327L10.4601 14.7092L7.38735 15.0491C6.4968 15.1477 5.73881 14.3965 5.83738 13.4992L6.17729 10.4264L15.1032 1.50045C15.8816 0.72206 17.1393 0.72206 17.9143 1.50045L19.3827 2.96884C20.1611 3.74723 20.1611 5.00829 19.3861 5.78327ZM16.0278 6.83359L14.0529 4.85873L7.73746 11.1776L7.48933 13.3972L9.70892 13.1491L16.0278 6.83359ZM18.2304 4.12453L16.762 2.65613C16.6226 2.51677 16.3949 2.51677 16.2589 2.65613L15.2086 3.70644L17.1835 5.6813L18.2338 4.63099C18.3697 4.48823 18.3697 4.26389 18.2304 4.12453Z\"\n              fill=\"#444A6D\"\n            />\n          </svg>\n          } @if(enableDelete){\n          <svg\n            (click)=\"$event.stopPropagation(); onDelete.emit()\"\n            width=\"17\"\n            height=\"17\"\n            viewBox=\"0 0 17 17\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <g clip-path=\"url(#clip0_30_1766)\">\n              <path\n                d=\"M15.0539 1.8631L1.69678 15.2202\"\n                stroke=\"#F43F5E\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M1.69678 1.8631L15.0539 15.2202\"\n                stroke=\"#F43F5E\"\n                stroke-width=\"2\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </g>\n            <defs>\n              <clipPath id=\"clip0_30_1766\">\n                <rect\n                  width=\"15.5833\"\n                  height=\"15.5833\"\n                  fill=\"white\"\n                  transform=\"translate(0.583496 0.75)\"\n                />\n              </clipPath>\n            </defs>\n          </svg>\n          }\n        </div>\n      </td>\n      }\n    </tr>\n    }\n  </tbody>\n</table> -->\n", styles: [".category-section{background-color:#f4f6fb}.category-header{padding:0;border-left:5px solid #25c7bc}.category-header-wrapper{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;font-weight:700;background-color:#f4f6fb}.category-title{font-size:16px;color:#1a1a1a}.toggle-button{background:none;border:none;color:#25c7bc;cursor:pointer;font-weight:600}.category-item-row{background-color:#fff}.actions{display:flex;justify-content:start;align-items:center;gap:10px;cursor:pointer}.true{color:green}.false{color:red}.striped-table{width:100%;overflow:hidden}.striped-table thead{background-color:#f5f5f5;color:#72788e;text-align:left}.striped-table th{padding:10px}.striped-table tbody tr{font-weight:600;font-size:1.2rem}.striped-table tbody tr:nth-child(2n){background-color:#25c7bc1a}.striped-table tbody tr:nth-child(odd){background-color:#fff}.striped-table tbody tr{font-weight:500;font-size:1rem}.striped-table td{padding:8px 10px;color:#72788e}.striped-table tbody tr:last-child td{border-bottom:none}@media (max-width: 768px){.striped-table{display:block}.striped-table thead{display:none}.striped-table tbody tr{display:block;margin-bottom:15px;border-radius:8px;box-shadow:0 2px 8px #0000001a}.striped-table td{display:block;text-align:right;padding-left:50%;position:relative;border-bottom:1px solid #e0e0e0}.striped-table td:before{content:attr(data-label);position:absolute;left:15px;width:45%;padding-right:10px;font-weight:600;text-align:left;color:#4a6fa5}}.active{background-color:#c8ffc7;width:85px;height:28px;border-radius:100px;display:flex;justify-content:center;align-items:center;font-size:.8rem;font-weight:500;color:#0d7d0b}.inactive{background-color:#ffe0e5;width:85px;height:28px;border-radius:100px;display:flex;justify-content:center;align-items:center;font-size:.8rem;font-weight:500;color:#d2344f}\n"] }]
        }], propDecorators: { tableData: [{
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
            }] } });

class CustomTextareaComponent {
    class = '';
    labelClass = '';
    label = '';
    placeholder = '';
    name = '';
    value;
    valueChange = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomTextareaComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomTextareaComponent, isStandalone: true, selector: "custom-textarea", inputs: { class: "class", labelClass: "labelClass", label: "label", placeholder: "placeholder", name: "name", value: "value" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<div style=\"width: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n  <textarea\n    [id]=\"label\"\n    [name]=\"name\"\n    [placeholder]=\"placeholder\"\n    [class]=\"'custom-textarea ' + class\"\n    [(ngModel)]=\"value\"\n    (ngModelChange)=\"valueChange.emit($event)\"\n  ></textarea>\n</div>\n", styles: [".custom-textarea{width:100%;padding:12px;resize:vertical;border-radius:.375rem;border:1px solid #d1d5db;padding-left:.5rem;padding-right:.5rem;outline:none!important;box-shadow:none;font-size:1rem;font-weight:400;min-height:4.5rem}.custom-label{font-size:.875rem;color:#374151;margin-bottom:.25rem;font-weight:500}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomTextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-textarea', standalone: true, imports: [FormsModule], template: "<div style=\"width: 100%\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n  </label>\n  }\n  <textarea\n    [id]=\"label\"\n    [name]=\"name\"\n    [placeholder]=\"placeholder\"\n    [class]=\"'custom-textarea ' + class\"\n    [(ngModel)]=\"value\"\n    (ngModelChange)=\"valueChange.emit($event)\"\n  ></textarea>\n</div>\n", styles: [".custom-textarea{width:100%;padding:12px;resize:vertical;border-radius:.375rem;border:1px solid #d1d5db;padding-left:.5rem;padding-right:.5rem;outline:none!important;box-shadow:none;font-size:1rem;font-weight:400;min-height:4.5rem}.custom-label{font-size:.875rem;color:#374151;margin-bottom:.25rem;font-weight:500}\n"] }]
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
    name = '';
    controlName = '';
    parentForm;
    validation = [];
    containRequiredError() {
        return this.validation.some((error) => error.errorType.includes(ComponentFormErrorConstant.REQUIRED));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomTextareaFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomTextareaFormComponent, isStandalone: true, selector: "custom-textarea-form", inputs: { class: "class", labelClass: "labelClass", label: "label", placeholder: "placeholder", name: "name", controlName: "controlName", parentForm: "parentForm", validation: "validation" }, ngImport: i0, template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    }\n  </label>\n  }\n  <textarea\n    [id]=\"label\"\n    [name]=\"name\"\n    [placeholder]=\"placeholder\"\n    [class]=\"'custom-textarea ' + class\"\n    [formControlName]=\"controlName\"\n  ></textarea>\n\n  <custom-app-error\n    [control]=\"parentForm.controls[controlName]\"\n    [validation]=\"validation\"\n    [name]=\"name\"\n  />\n</div>\n", styles: [".custom-textarea{width:100%;padding:12px;resize:vertical;border-radius:.375rem;border:1px solid #d1d5db;padding-left:.5rem;padding-right:.5rem;outline:none!important;box-shadow:none;font-size:1rem;font-weight:400;min-height:4.5rem}.custom-label{font-size:.875rem;color:#374151;margin-bottom:.25rem;font-weight:500}\n"], dependencies: [{ kind: "component", type: CustomAppErrorComponent, selector: "custom-app-error", inputs: ["control", "validation", "name"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomTextareaFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-textarea-form', standalone: true, imports: [CustomAppErrorComponent, ReactiveFormsModule], template: "<div style=\"width: 100%\" [formGroup]=\"parentForm\">\n  @if(label){\n  <label [for]=\"label\" [class]=\"'custom-label ' + labelClass\">\n    {{ label }}\n\n    @if(containRequiredError()){\n    <span style=\"color: rgba(244, 63, 94, 1); font-size: 15px; font-weight: 500\"\n      >*</span\n    >\n    }\n  </label>\n  }\n  <textarea\n    [id]=\"label\"\n    [name]=\"name\"\n    [placeholder]=\"placeholder\"\n    [class]=\"'custom-textarea ' + class\"\n    [formControlName]=\"controlName\"\n  ></textarea>\n\n  <custom-app-error\n    [control]=\"parentForm.controls[controlName]\"\n    [validation]=\"validation\"\n    [name]=\"name\"\n  />\n</div>\n", styles: [".custom-textarea{width:100%;padding:12px;resize:vertical;border-radius:.375rem;border:1px solid #d1d5db;padding-left:.5rem;padding-right:.5rem;outline:none!important;box-shadow:none;font-size:1rem;font-weight:400;min-height:4.5rem}.custom-label{font-size:.875rem;color:#374151;margin-bottom:.25rem;font-weight:500}\n"] }]
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
        console.log('Breadcrumb item clicked:', item);
        this.router.navigate([item.url]);
    };
    constructor(router) {
        this.router = router;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomBreadcrumbComponent, deps: [{ token: i1$3.Router }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomBreadcrumbComponent, isStandalone: true, selector: "custom-breadcrumb", inputs: { breadcrumbItems: "breadcrumbItems" }, outputs: { breadcrumbItemClicked: "breadcrumbItemClicked" }, ngImport: i0, template: "<div class=\"breadcrumb\">\n  @for(item of breadcrumbItems ; track $index){\n\n  <p\n    [ngClass]=\"{\n    'first-item' : $index !== breadcrumbItems.length -1 ,\n    'last-item' : $index === breadcrumbItems.length -1 ,\n    }\"\n    (click)=\"breadcrumbItemClicked(item)\"\n  >\n    {{ item.label }}\n  </p>\n\n  @if( $index !== breadcrumbItems.length -1 ){\n  <svg\n    width=\"7\"\n    height=\"11\"\n    viewBox=\"0 0 7 11\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M0.327452 0.327391C0.652889 0.00195375 1.18053 0.00195375 1.50596 0.327391L6.0893 4.91072C6.41473 5.23616 6.41473 5.7638 6.0893 6.08923L1.50596 10.6726C1.18053 10.998 0.652889 10.998 0.327452 10.6726C0.00201478 10.3471 0.00201478 9.81949 0.327452 9.49406L4.32153 5.49998L0.327452 1.5059C0.00201478 1.18046 0.00201478 0.652828 0.327452 0.327391Z\"\n      fill=\"#25C7BC\"\n    />\n  </svg>\n\n  } }\n</div>\n", styles: [".first-item{font-weight:400;margin:0!important;cursor:pointer}.last-item{font-weight:700;margin:0!important;cursor:pointer}.breadcrumb{display:flex;align-items:center;list-style:none;padding:0;margin:0;font-size:1rem;color:#1e202c;gap:.5rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomBreadcrumbComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-breadcrumb', imports: [CommonModule], template: "<div class=\"breadcrumb\">\n  @for(item of breadcrumbItems ; track $index){\n\n  <p\n    [ngClass]=\"{\n    'first-item' : $index !== breadcrumbItems.length -1 ,\n    'last-item' : $index === breadcrumbItems.length -1 ,\n    }\"\n    (click)=\"breadcrumbItemClicked(item)\"\n  >\n    {{ item.label }}\n  </p>\n\n  @if( $index !== breadcrumbItems.length -1 ){\n  <svg\n    width=\"7\"\n    height=\"11\"\n    viewBox=\"0 0 7 11\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M0.327452 0.327391C0.652889 0.00195375 1.18053 0.00195375 1.50596 0.327391L6.0893 4.91072C6.41473 5.23616 6.41473 5.7638 6.0893 6.08923L1.50596 10.6726C1.18053 10.998 0.652889 10.998 0.327452 10.6726C0.00201478 10.3471 0.00201478 9.81949 0.327452 9.49406L4.32153 5.49998L0.327452 1.5059C0.00201478 1.18046 0.00201478 0.652828 0.327452 0.327391Z\"\n      fill=\"#25C7BC\"\n    />\n  </svg>\n\n  } }\n</div>\n", styles: [".first-item{font-weight:400;margin:0!important;cursor:pointer}.last-item{font-weight:700;margin:0!important;cursor:pointer}.breadcrumb{display:flex;align-items:center;list-style:none;padding:0;margin:0;font-size:1rem;color:#1e202c;gap:.5rem}\n"] }]
        }], ctorParameters: () => [{ type: i1$3.Router }], propDecorators: { breadcrumbItems: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomToggleSwitchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomToggleSwitchComponent, isStandalone: true, selector: "custom-toggle-switch", inputs: { value: "value", label: "label", labelPosition: "labelPosition", disabled: "disabled", size: "size", onColor: "onColor", offColor: "offColor", thumbColor: "thumbColor" }, outputs: { valueChange: "valueChange" }, host: { listeners: { "click": "toggle()" } }, ngImport: i0, template: "<div class=\"toggle-container\" [class.disabled]=\"disabled\">\n  @if(label && labelPosition === 'left') {\n  <span class=\"toggle-label left\">{{ label }}</span>\n  }\n\n  <div\n    class=\"toggle-switch\"\n    [class.active]=\"value\"\n    [class.small]=\"size === 'small'\"\n    [class.medium]=\"size === 'medium'\"\n    [class.large]=\"size === 'large'\"\n    [style.background-color]=\"value ? onColor : offColor\"\n  >\n    <div\n      class=\"toggle-thumb\"\n      [class.active]=\"value\"\n      [class.small]=\"size === 'small'\"\n      [class.medium]=\"size === 'medium'\"\n      [class.large]=\"size === 'large'\"\n      [style.background-color]=\"thumbColor\"\n    ></div>\n  </div>\n\n  @if(label && labelPosition === 'right') {\n  <span class=\"toggle-label right\">{{ label }}</span>\n  }\n</div>\n", styles: [".toggle-container{display:inline-flex;align-items:center;gap:12px;cursor:pointer;-webkit-tap-highlight-color:transparent}.toggle-label{font-family:Segoe UI,system-ui,sans-serif;font-size:14px;font-weight:500;color:#333;transition:color .2s ease}.toggle-label.left{order:1;margin-right:12px}.toggle-label.right{order:3;margin-left:12px}.toggle-switch{order:2;position:relative;display:inline-block;border-radius:16px;transition:all .3s cubic-bezier(.34,1.56,.64,1);box-shadow:inset 0 1px 3px #0000001a;background-color:#e0e0e0}.toggle-thumb{position:absolute;border-radius:50%;transition:all .3s cubic-bezier(.34,1.56,.64,1);background-color:#fff;box-shadow:0 2px 4px #0003;top:1.5px;left:2px}.toggle-switch.active{background-color:#4caf50}.toggle-thumb.active{transform:translate(calc(100% - 2px))}.toggle-switch.small{width:36px;height:20px}.toggle-thumb.small{width:16px;height:16px}.toggle-switch.medium{width:44px;height:24px}.toggle-thumb.medium{width:20px;height:20px}.toggle-switch.large{width:52px;height:28px}.toggle-thumb.large{width:24px;height:24px}.toggle-container.disabled{cursor:not-allowed;opacity:.6}.toggle-container:focus-within .toggle-switch{outline:2px solid #90caf9;outline-offset:2px}@media (prefers-color-scheme: dark){.toggle-label{color:#f5f5f5}.toggle-switch:not(.active){background-color:#555}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomToggleSwitchComponent, decorators: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomToggleSwitchFormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomToggleSwitchFormComponent, isStandalone: true, selector: "custom-toggle-switch-form", inputs: { label: "label", labelPosition: "labelPosition", size: "size", onColor: "onColor", offColor: "offColor", thumbColor: "thumbColor", disabled: "disabled", parentForm: "parentForm", controlName: "controlName" }, host: { listeners: { "click": "toggle()" } }, ngImport: i0, template: "<div [formGroup]=\"parentForm\">\n  <div class=\"toggle-container\" [class.disabled]=\"disabled\">\n    @if(label && labelPosition === 'left') {\n    <span class=\"toggle-label left\">{{ label }}</span>\n    }\n\n    <div\n      class=\"toggle-switch\"\n      [class.active]=\"value\"\n      [class.small]=\"size === 'small'\"\n      [class.medium]=\"size === 'medium'\"\n      [class.large]=\"size === 'large'\"\n      [style.background-color]=\"value ? onColor : offColor\"\n    >\n      <div\n        class=\"toggle-thumb\"\n        [class.active]=\"value\"\n        [class.small]=\"size === 'small'\"\n        [class.medium]=\"size === 'medium'\"\n        [class.large]=\"size === 'large'\"\n        [style.background-color]=\"thumbColor\"\n      ></div>\n    </div>\n\n    @if(label && labelPosition === 'right') {\n    <span class=\"toggle-label right\">{{ label }}</span>\n    }\n  </div>\n</div>\n", styles: [".toggle-container{display:inline-flex;align-items:center;gap:12px;cursor:pointer;-webkit-tap-highlight-color:transparent}.toggle-label{font-family:Segoe UI,system-ui,sans-serif;font-size:14px;font-weight:500;color:#333;transition:color .2s ease}.toggle-label.left{order:1;margin-right:12px}.toggle-label.right{order:3;margin-left:12px}.toggle-switch{order:2;position:relative;display:inline-block;border-radius:16px;transition:all .3s cubic-bezier(.34,1.56,.64,1);box-shadow:inset 0 1px 3px #0000001a;background-color:#e0e0e0}.toggle-thumb{position:absolute;border-radius:50%;transition:all .3s cubic-bezier(.34,1.56,.64,1);background-color:#fff;box-shadow:0 2px 4px #0003;top:1.5px;left:2px}.toggle-switch.active{background-color:#4caf50}.toggle-thumb.active{transform:translate(calc(100% - 2px))}.toggle-switch.small{width:36px;height:20px}.toggle-thumb.small{width:16px;height:16px}.toggle-switch.medium{width:44px;height:24px}.toggle-thumb.medium{width:20px;height:20px}.toggle-switch.large{width:52px;height:28px}.toggle-thumb.large{width:24px;height:24px}.toggle-container:focus-within .toggle-switch{outline:2px solid #90caf9;outline-offset:2px}@media (prefers-color-scheme: dark){.toggle-label{color:#f5f5f5}.toggle-switch:not(.active){background-color:#555}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomToggleSwitchFormComponent, decorators: [{
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

class OverlayPanelComponent {
    overlayClass = '';
    targetTemplate;
    overlayTemplate;
    isOpen = false;
    ngAfterContentInit() {
        if (!this.targetTemplate) {
            console.error('OverlayPanelComponent: #target template is required');
        }
        if (!this.overlayTemplate) {
            console.error('OverlayPanelComponent: #overlay template is required');
        }
    }
    toggleDropdown(event) {
        event.stopPropagation();
        this.isOpen = !this.isOpen;
    }
    closeDropdown() {
        this.isOpen = false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: OverlayPanelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: OverlayPanelComponent, isStandalone: true, selector: "overlay-panel", inputs: { overlayClass: "overlayClass" }, queries: [{ propertyName: "targetTemplate", first: true, predicate: ["target"], descendants: true }, { propertyName: "overlayTemplate", first: true, predicate: ["overlay"], descendants: true }], ngImport: i0, template: "<div class=\"overlay-container\">\n  <!-- Target content -->\n  <div (click)=\"toggleDropdown($event)\">\n    <ng-container *ngIf=\"targetTemplate\">\n      <ng-container *ngTemplateOutlet=\"targetTemplate\"></ng-container>\n    </ng-container>\n  </div>\n\n  <!-- Overlay content -->\n  @if(isOpen) {\n  <div\n    #overlayPanel\n    class=\"overlay\"\n    [class]=\"'overlay ' + overlayClass\"\n    [class.show]=\"isOpen\"\n    [clickOutside]=\"overlayPanel\"\n    (clickOutsideEmitter)=\"closeDropdown()\"\n  >\n    <ng-container *ngIf=\"overlayTemplate\">\n      <ng-container *ngTemplateOutlet=\"overlayTemplate\"></ng-container>\n    </ng-container>\n  </div>\n  }\n</div>", styles: [".overlay-container{position:relative;display:inline-block}.overlay{position:absolute;top:100%;right:0;min-width:160px;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #d1d5db;border-radius:.375rem;margin-top:.5rem;z-index:50;box-shadow:0 4px 6px #0000001a;opacity:0;transform:translateY(-10px);pointer-events:none;transition:opacity .2s ease,transform .2s ease}.overlay.show{opacity:1;transform:translateY(0);pointer-events:auto}\n"], dependencies: [{ kind: "directive", type: ClickOutsideDirective, selector: "[clickOutside]", inputs: ["clickOutside"], outputs: ["clickOutsideEmitter"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: OverlayPanelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'overlay-panel', imports: [ClickOutsideDirective, CommonModule], template: "<div class=\"overlay-container\">\n  <!-- Target content -->\n  <div (click)=\"toggleDropdown($event)\">\n    <ng-container *ngIf=\"targetTemplate\">\n      <ng-container *ngTemplateOutlet=\"targetTemplate\"></ng-container>\n    </ng-container>\n  </div>\n\n  <!-- Overlay content -->\n  @if(isOpen) {\n  <div\n    #overlayPanel\n    class=\"overlay\"\n    [class]=\"'overlay ' + overlayClass\"\n    [class.show]=\"isOpen\"\n    [clickOutside]=\"overlayPanel\"\n    (clickOutsideEmitter)=\"closeDropdown()\"\n  >\n    <ng-container *ngIf=\"overlayTemplate\">\n      <ng-container *ngTemplateOutlet=\"overlayTemplate\"></ng-container>\n    </ng-container>\n  </div>\n  }\n</div>", styles: [".overlay-container{position:relative;display:inline-block}.overlay{position:absolute;top:100%;right:0;min-width:160px;max-height:300px;overflow-y:auto;background-color:#fff;border:1px solid #d1d5db;border-radius:.375rem;margin-top:.5rem;z-index:50;box-shadow:0 4px 6px #0000001a;opacity:0;transform:translateY(-10px);pointer-events:none;transition:opacity .2s ease,transform .2s ease}.overlay.show{opacity:1;transform:translateY(0);pointer-events:auto}\n"] }]
        }], propDecorators: { overlayClass: [{
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomToastComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.13", type: CustomToastComponent, isStandalone: true, selector: "custom-toast", ngImport: i0, template: "@if(toastService.show()){\n<div [class]=\"'custom-toast ' + positionClass + ' ' + colorClass\">\n  @if(toastService.type() === \"info\" || toastService.type() === \"black\") {\n    <svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15 3.75C8.7868 3.75 3.75 8.7868 3.75 15C3.75 21.2132 8.7868 26.25 15 26.25C21.2132 26.25 26.25 21.2132 26.25 15C26.25 8.7868 21.2132 3.75 15 3.75ZM1.25 15C1.25 7.40608 7.40608 1.25 15 1.25C22.5939 1.25 28.75 7.40608 28.75 15C28.75 22.5939 22.5939 28.75 15 28.75C7.40608 28.75 1.25 22.5939 1.25 15Z\" fill=\"white\"/>\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15 13.75C15.6904 13.75 16.25 14.3096 16.25 15V20C16.25 20.6904 15.6904 21.25 15 21.25C14.3096 21.25 13.75 20.6904 13.75 20V15C13.75 14.3096 14.3096 13.75 15 13.75Z\" fill=\"white\"/>\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.75 10C13.75 9.30964 14.3096 8.75 15 8.75H15.0125C15.7029 8.75 16.2625 9.30964 16.2625 10C16.2625 10.6904 15.7029 11.25 15.0125 11.25H15C14.3096 11.25 13.75 10.6904 13.75 10Z\" fill=\"white\"/>\n        </svg>\n        \n\n  } @else if(toastService.type() === \"success\") {\n  <svg\n    width=\"30\"\n    height=\"30\"\n    viewBox=\"0 0 30 30\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M19.5788 4.7168C17.3628 3.72943 14.887 3.48482 12.5207 4.01946C10.1544 4.5541 8.02427 5.83935 6.44807 7.68351C4.87186 9.52767 3.93401 11.8319 3.77439 14.2527C3.61477 16.6734 4.24193 19.0808 5.56233 21.116C6.88274 23.1512 8.82564 24.705 11.1013 25.5457C13.3769 26.3864 15.8634 26.469 18.1898 25.7812C20.5162 25.0933 22.5579 23.6719 24.0105 21.7289C25.4631 19.7858 26.2486 17.4253 26.25 14.9993V13.85C26.25 13.1597 26.8097 12.6 27.5 12.6C28.1904 12.6 28.75 13.1597 28.75 13.85V15C28.7483 17.9651 27.7882 20.8509 26.0128 23.2257C24.2375 25.6006 21.742 27.3379 18.8986 28.1786C16.0552 29.0193 13.0162 28.9183 10.2349 27.8908C7.45356 26.8632 5.0789 24.9641 3.46507 22.4767C1.85124 19.9893 1.08471 17.0468 1.27981 14.0882C1.4749 11.1295 2.62116 8.31318 4.54763 6.0592C6.47411 3.80523 9.07758 2.23438 11.9698 1.58093C14.8619 0.92748 17.8879 1.22644 20.5963 2.43323C21.2268 2.7142 21.5103 3.45317 21.2293 4.08377C20.9483 4.71436 20.2093 4.99777 19.5788 4.7168Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M28.3834 4.11567C28.8718 4.60359 28.8722 5.39504 28.3843 5.88344L15.8843 18.3959C15.6499 18.6306 15.3319 18.7624 15.0003 18.7625C14.6687 18.7626 14.3506 18.6309 14.1161 18.3964L10.3661 14.6464C9.87796 14.1582 9.87796 13.3668 10.3661 12.8786C10.8543 12.3905 11.6457 12.3905 12.1339 12.8786L14.9996 15.7443L26.6157 4.11656C27.1036 3.62816 27.895 3.62776 28.3834 4.11567Z\"\n      fill=\"white\"\n    />\n  </svg>\n\n  } @else if(toastService.type() === \"warning\") {\n  <svg\n    width=\"30\"\n    height=\"30\"\n    viewBox=\"0 0 30 30\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M13.1603 2.85388C13.7219 2.53769 14.3555 2.37158 15 2.37158C15.6445 2.37158 16.2782 2.53769 16.8398 2.85388C17.4014 3.17008 17.872 3.62568 18.2063 4.17673L18.2099 4.18266L28.7974 21.8577L28.8075 21.8749C29.1349 22.442 29.3082 23.0849 29.31 23.7397C29.3119 24.3944 29.1422 25.0383 28.818 25.6072C28.4937 26.176 28.0262 26.6501 27.4618 26.9822C26.8975 27.3142 26.256 27.4927 25.6013 27.4999L25.5875 27.5001L4.39879 27.5C3.74403 27.4928 3.10258 27.3142 2.53824 26.9822C1.9739 26.6501 1.50634 26.176 1.18209 25.6072C0.857833 25.0383 0.688184 24.3944 0.690017 23.7397C0.691851 23.0849 0.865103 22.442 1.19254 21.8749L1.20269 21.8577L11.7938 4.17672C12.128 3.62567 12.5987 3.17008 13.1603 2.85388ZM15 4.87158C14.7852 4.87158 14.574 4.92695 14.3868 5.03235C14.2004 5.13727 14.0441 5.28824 13.9328 5.47081L3.35338 23.1323C3.24691 23.3195 3.19061 23.5312 3.19001 23.7467C3.1894 23.9649 3.24595 24.1795 3.35403 24.3692C3.46212 24.5588 3.61797 24.7168 3.80608 24.8275C3.99255 24.9372 4.20427 24.9966 4.42052 25H25.5795C25.7958 24.9966 26.0075 24.9372 26.194 24.8275C26.3821 24.7168 26.5379 24.5588 26.646 24.3692C26.7541 24.1795 26.8107 23.9649 26.81 23.7467C26.8094 23.5312 26.7532 23.3196 26.6467 23.1324L16.0688 5.4733C16.0683 5.47247 16.0678 5.47164 16.0673 5.47081C15.9559 5.28824 15.7996 5.13727 15.6133 5.03235C15.4261 4.92695 15.2149 4.87158 15 4.87158Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M15 10C15.6904 10 16.25 10.5596 16.25 11.25V16.25C16.25 16.9404 15.6904 17.5 15 17.5C14.3096 17.5 13.75 16.9404 13.75 16.25V11.25C13.75 10.5596 14.3096 10 15 10Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M13.75 21.25C13.75 20.5596 14.3096 20 15 20H15.0125C15.7029 20 16.2625 20.5596 16.2625 21.25C16.2625 21.9404 15.7029 22.5 15.0125 22.5H15C14.3096 22.5 13.75 21.9404 13.75 21.25Z\"\n      fill=\"white\"\n    />\n  </svg>\n\n  } @else if(toastService.type() === \"error\") {\n  <svg\n    width=\"30\"\n    height=\"30\"\n    viewBox=\"0 0 30 30\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M8.94112 1.61612C9.17554 1.3817 9.49348 1.25 9.825 1.25H20.175C20.5065 1.25 20.8245 1.3817 21.0589 1.61612L28.3839 8.94112C28.6183 9.17554 28.75 9.49348 28.75 9.825V20.175C28.75 20.5065 28.6183 20.8245 28.3839 21.0589L21.0589 28.3839C20.8245 28.6183 20.5065 28.75 20.175 28.75H9.825C9.49348 28.75 9.17554 28.6183 8.94112 28.3839L1.61612 21.0589C1.3817 20.8245 1.25 20.5065 1.25 20.175V9.825C1.25 9.49348 1.3817 9.17554 1.61612 8.94112L8.94112 1.61612ZM10.3428 3.75L3.75 10.3428V19.6572L10.3428 26.25H19.6572L26.25 19.6572V10.3428L19.6572 3.75H10.3428Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M19.6339 10.3661C20.122 10.8543 20.122 11.6457 19.6339 12.1339L12.1339 19.6339C11.6457 20.122 10.8543 20.122 10.3661 19.6339C9.87796 19.1457 9.87796 18.3543 10.3661 17.8661L17.8661 10.3661C18.3543 9.87796 19.1457 9.87796 19.6339 10.3661Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M10.3661 10.3661C10.8543 9.87796 11.6457 9.87796 12.1339 10.3661L19.6339 17.8661C20.122 18.3543 20.122 19.1457 19.6339 19.6339C19.1457 20.122 18.3543 20.122 17.8661 19.6339L10.3661 12.1339C9.87796 11.6457 9.87796 10.8543 10.3661 10.3661Z\"\n      fill=\"white\"\n    />\n  </svg>\n\n  }\n\n  <p class=\"custom-toast-message\">{{ toastService.message() }}</p>\n\n  <svg class=\"close-toast\" (click)=\"hideToast()\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15.5893 4.41073C15.9147 4.73617 15.9147 5.26381 15.5893 5.58925L5.58928 15.5892C5.26384 15.9147 4.7362 15.9147 4.41076 15.5892C4.08533 15.2638 4.08533 14.7362 4.41076 14.4107L14.4108 4.41073C14.7362 4.0853 15.2638 4.0853 15.5893 4.41073Z\" fill=\"white\"/>\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.41076 4.41073C4.7362 4.0853 5.26384 4.0853 5.58928 4.41073L15.5893 14.4107C15.9147 14.7362 15.9147 15.2638 15.5893 15.5892C15.2638 15.9147 14.7362 15.9147 14.4108 15.5892L4.41076 5.58925C4.08533 5.26381 4.08533 4.73617 4.41076 4.41073Z\" fill=\"white\"/>\n    </svg>\n    \n</div>\n\n}\n", styles: [".custom-toast{width:500px;min-height:60px;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:20px;border-radius:10px}.toast-top-right{position:fixed;z-index:9999;top:20px;right:20px}.toast-top-left{position:fixed;z-index:9999;top:20px;left:20px}.toast-bottom-right{position:fixed;z-index:9999;bottom:20px;right:20px}.toast-bottom-left{position:fixed;z-index:9999;bottom:20px;left:20px}.toast-top-center{position:fixed;z-index:9999;top:20px;left:50%;transform:translate(-50%)}.toast-bottom-center{position:fixed;z-index:9999;bottom:20px;left:50%;transform:translate(-50%)}.toast-success{background-color:#19af66;color:#fff}.toast-error{background-color:#ff4d4f;color:#fff}.toast-warning{background-color:#ffbf00;color:#fff}.toast-info{background-color:#9d67aa;color:#fff}.toast-black{background-color:#000;color:#fff}.custom-toast-message{font-weight:500;font-size:16px;text-align:start;width:100%;text-wrap:wrap}.close-toast{cursor:pointer}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomToastComponent, decorators: [{
            type: Component,
            args: [{ selector: 'custom-toast', imports: [], template: "@if(toastService.show()){\n<div [class]=\"'custom-toast ' + positionClass + ' ' + colorClass\">\n  @if(toastService.type() === \"info\" || toastService.type() === \"black\") {\n    <svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15 3.75C8.7868 3.75 3.75 8.7868 3.75 15C3.75 21.2132 8.7868 26.25 15 26.25C21.2132 26.25 26.25 21.2132 26.25 15C26.25 8.7868 21.2132 3.75 15 3.75ZM1.25 15C1.25 7.40608 7.40608 1.25 15 1.25C22.5939 1.25 28.75 7.40608 28.75 15C28.75 22.5939 22.5939 28.75 15 28.75C7.40608 28.75 1.25 22.5939 1.25 15Z\" fill=\"white\"/>\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15 13.75C15.6904 13.75 16.25 14.3096 16.25 15V20C16.25 20.6904 15.6904 21.25 15 21.25C14.3096 21.25 13.75 20.6904 13.75 20V15C13.75 14.3096 14.3096 13.75 15 13.75Z\" fill=\"white\"/>\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.75 10C13.75 9.30964 14.3096 8.75 15 8.75H15.0125C15.7029 8.75 16.2625 9.30964 16.2625 10C16.2625 10.6904 15.7029 11.25 15.0125 11.25H15C14.3096 11.25 13.75 10.6904 13.75 10Z\" fill=\"white\"/>\n        </svg>\n        \n\n  } @else if(toastService.type() === \"success\") {\n  <svg\n    width=\"30\"\n    height=\"30\"\n    viewBox=\"0 0 30 30\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M19.5788 4.7168C17.3628 3.72943 14.887 3.48482 12.5207 4.01946C10.1544 4.5541 8.02427 5.83935 6.44807 7.68351C4.87186 9.52767 3.93401 11.8319 3.77439 14.2527C3.61477 16.6734 4.24193 19.0808 5.56233 21.116C6.88274 23.1512 8.82564 24.705 11.1013 25.5457C13.3769 26.3864 15.8634 26.469 18.1898 25.7812C20.5162 25.0933 22.5579 23.6719 24.0105 21.7289C25.4631 19.7858 26.2486 17.4253 26.25 14.9993V13.85C26.25 13.1597 26.8097 12.6 27.5 12.6C28.1904 12.6 28.75 13.1597 28.75 13.85V15C28.7483 17.9651 27.7882 20.8509 26.0128 23.2257C24.2375 25.6006 21.742 27.3379 18.8986 28.1786C16.0552 29.0193 13.0162 28.9183 10.2349 27.8908C7.45356 26.8632 5.0789 24.9641 3.46507 22.4767C1.85124 19.9893 1.08471 17.0468 1.27981 14.0882C1.4749 11.1295 2.62116 8.31318 4.54763 6.0592C6.47411 3.80523 9.07758 2.23438 11.9698 1.58093C14.8619 0.92748 17.8879 1.22644 20.5963 2.43323C21.2268 2.7142 21.5103 3.45317 21.2293 4.08377C20.9483 4.71436 20.2093 4.99777 19.5788 4.7168Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M28.3834 4.11567C28.8718 4.60359 28.8722 5.39504 28.3843 5.88344L15.8843 18.3959C15.6499 18.6306 15.3319 18.7624 15.0003 18.7625C14.6687 18.7626 14.3506 18.6309 14.1161 18.3964L10.3661 14.6464C9.87796 14.1582 9.87796 13.3668 10.3661 12.8786C10.8543 12.3905 11.6457 12.3905 12.1339 12.8786L14.9996 15.7443L26.6157 4.11656C27.1036 3.62816 27.895 3.62776 28.3834 4.11567Z\"\n      fill=\"white\"\n    />\n  </svg>\n\n  } @else if(toastService.type() === \"warning\") {\n  <svg\n    width=\"30\"\n    height=\"30\"\n    viewBox=\"0 0 30 30\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M13.1603 2.85388C13.7219 2.53769 14.3555 2.37158 15 2.37158C15.6445 2.37158 16.2782 2.53769 16.8398 2.85388C17.4014 3.17008 17.872 3.62568 18.2063 4.17673L18.2099 4.18266L28.7974 21.8577L28.8075 21.8749C29.1349 22.442 29.3082 23.0849 29.31 23.7397C29.3119 24.3944 29.1422 25.0383 28.818 25.6072C28.4937 26.176 28.0262 26.6501 27.4618 26.9822C26.8975 27.3142 26.256 27.4927 25.6013 27.4999L25.5875 27.5001L4.39879 27.5C3.74403 27.4928 3.10258 27.3142 2.53824 26.9822C1.9739 26.6501 1.50634 26.176 1.18209 25.6072C0.857833 25.0383 0.688184 24.3944 0.690017 23.7397C0.691851 23.0849 0.865103 22.442 1.19254 21.8749L1.20269 21.8577L11.7938 4.17672C12.128 3.62567 12.5987 3.17008 13.1603 2.85388ZM15 4.87158C14.7852 4.87158 14.574 4.92695 14.3868 5.03235C14.2004 5.13727 14.0441 5.28824 13.9328 5.47081L3.35338 23.1323C3.24691 23.3195 3.19061 23.5312 3.19001 23.7467C3.1894 23.9649 3.24595 24.1795 3.35403 24.3692C3.46212 24.5588 3.61797 24.7168 3.80608 24.8275C3.99255 24.9372 4.20427 24.9966 4.42052 25H25.5795C25.7958 24.9966 26.0075 24.9372 26.194 24.8275C26.3821 24.7168 26.5379 24.5588 26.646 24.3692C26.7541 24.1795 26.8107 23.9649 26.81 23.7467C26.8094 23.5312 26.7532 23.3196 26.6467 23.1324L16.0688 5.4733C16.0683 5.47247 16.0678 5.47164 16.0673 5.47081C15.9559 5.28824 15.7996 5.13727 15.6133 5.03235C15.4261 4.92695 15.2149 4.87158 15 4.87158Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M15 10C15.6904 10 16.25 10.5596 16.25 11.25V16.25C16.25 16.9404 15.6904 17.5 15 17.5C14.3096 17.5 13.75 16.9404 13.75 16.25V11.25C13.75 10.5596 14.3096 10 15 10Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M13.75 21.25C13.75 20.5596 14.3096 20 15 20H15.0125C15.7029 20 16.2625 20.5596 16.2625 21.25C16.2625 21.9404 15.7029 22.5 15.0125 22.5H15C14.3096 22.5 13.75 21.9404 13.75 21.25Z\"\n      fill=\"white\"\n    />\n  </svg>\n\n  } @else if(toastService.type() === \"error\") {\n  <svg\n    width=\"30\"\n    height=\"30\"\n    viewBox=\"0 0 30 30\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n  >\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M8.94112 1.61612C9.17554 1.3817 9.49348 1.25 9.825 1.25H20.175C20.5065 1.25 20.8245 1.3817 21.0589 1.61612L28.3839 8.94112C28.6183 9.17554 28.75 9.49348 28.75 9.825V20.175C28.75 20.5065 28.6183 20.8245 28.3839 21.0589L21.0589 28.3839C20.8245 28.6183 20.5065 28.75 20.175 28.75H9.825C9.49348 28.75 9.17554 28.6183 8.94112 28.3839L1.61612 21.0589C1.3817 20.8245 1.25 20.5065 1.25 20.175V9.825C1.25 9.49348 1.3817 9.17554 1.61612 8.94112L8.94112 1.61612ZM10.3428 3.75L3.75 10.3428V19.6572L10.3428 26.25H19.6572L26.25 19.6572V10.3428L19.6572 3.75H10.3428Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M19.6339 10.3661C20.122 10.8543 20.122 11.6457 19.6339 12.1339L12.1339 19.6339C11.6457 20.122 10.8543 20.122 10.3661 19.6339C9.87796 19.1457 9.87796 18.3543 10.3661 17.8661L17.8661 10.3661C18.3543 9.87796 19.1457 9.87796 19.6339 10.3661Z\"\n      fill=\"white\"\n    />\n    <path\n      fill-rule=\"evenodd\"\n      clip-rule=\"evenodd\"\n      d=\"M10.3661 10.3661C10.8543 9.87796 11.6457 9.87796 12.1339 10.3661L19.6339 17.8661C20.122 18.3543 20.122 19.1457 19.6339 19.6339C19.1457 20.122 18.3543 20.122 17.8661 19.6339L10.3661 12.1339C9.87796 11.6457 9.87796 10.8543 10.3661 10.3661Z\"\n      fill=\"white\"\n    />\n  </svg>\n\n  }\n\n  <p class=\"custom-toast-message\">{{ toastService.message() }}</p>\n\n  <svg class=\"close-toast\" (click)=\"hideToast()\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15.5893 4.41073C15.9147 4.73617 15.9147 5.26381 15.5893 5.58925L5.58928 15.5892C5.26384 15.9147 4.7362 15.9147 4.41076 15.5892C4.08533 15.2638 4.08533 14.7362 4.41076 14.4107L14.4108 4.41073C14.7362 4.0853 15.2638 4.0853 15.5893 4.41073Z\" fill=\"white\"/>\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.41076 4.41073C4.7362 4.0853 5.26384 4.0853 5.58928 4.41073L15.5893 14.4107C15.9147 14.7362 15.9147 15.2638 15.5893 15.5892C15.2638 15.9147 14.7362 15.9147 14.4108 15.5892L4.41076 5.58925C4.08533 5.26381 4.08533 4.73617 4.41076 4.41073Z\" fill=\"white\"/>\n    </svg>\n    \n</div>\n\n}\n", styles: [".custom-toast{width:500px;min-height:60px;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:20px;border-radius:10px}.toast-top-right{position:fixed;z-index:9999;top:20px;right:20px}.toast-top-left{position:fixed;z-index:9999;top:20px;left:20px}.toast-bottom-right{position:fixed;z-index:9999;bottom:20px;right:20px}.toast-bottom-left{position:fixed;z-index:9999;bottom:20px;left:20px}.toast-top-center{position:fixed;z-index:9999;top:20px;left:50%;transform:translate(-50%)}.toast-bottom-center{position:fixed;z-index:9999;bottom:20px;left:50%;transform:translate(-50%)}.toast-success{background-color:#19af66;color:#fff}.toast-error{background-color:#ff4d4f;color:#fff}.toast-warning{background-color:#ffbf00;color:#fff}.toast-info{background-color:#9d67aa;color:#fff}.toast-black{background-color:#000;color:#fff}.custom-toast-message{font-weight:500;font-size:16px;text-align:start;width:100%;text-wrap:wrap}.close-toast{cursor:pointer}\n"] }]
        }], ctorParameters: () => [] });

class CustomModalComponent {
    modalTitle = '';
    showDot = false;
    headerButton = '';
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
        if (event.target === event.currentTarget) {
            this.close();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomModalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.13", type: CustomModalComponent, isStandalone: true, selector: "modal", inputs: { modalTitle: "modalTitle", showDot: "showDot", headerButton: "headerButton" }, outputs: { hideEvent: "hideEvent", headerButtonClick: "headerButtonClick" }, ngImport: i0, template: "<div\n  *ngIf=\"isVisible\"\n  class=\"modal-overlay flex flex-row justify-start align-start\"\n  (click)=\"onOverlayClick($event)\"\n>\n  <!-- X button outside modal-content -->\n\n  <div class=\"flex flex-row\">\n    <div class=\"modal-content\" (click)=\"$event.stopPropagation()\">\n      <div class=\"modal-header\">\n        <span *ngIf=\"showDot\" class=\"modal-dot\"></span>\n        <span class=\"modal-title\">{{ modalTitle }}</span>\n        <div *ngIf=\"headerButton\">\n          <button\n            type=\"button\"\n            class=\"btn-header\"\n            (click)=\"onHeaderButtonClick()\"\n          >\n            {{ headerButton }}\n          </button>\n        </div>\n      </div>\n      <ng-content></ng-content>\n    </div>\n    <div class=\"flex justify-start\">\n      <button\n        type=\"button\"\n        class=\"btn-close\"\n        aria-label=\"Close\"\n        (click)=\"close()\"\n      >\n        <svg\n          width=\"80\"\n          height=\"80\"\n          viewBox=\"0 0 80 80\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n          aria-hidden=\"true\"\n        >\n          <line\n            x1=\"20\"\n            y1=\"20\"\n            x2=\"60\"\n            y2=\"60\"\n            stroke=\"currentColor\"\n            stroke-width=\"4\"\n            stroke-linecap=\"round\"\n          />\n          <line\n            x1=\"60\"\n            y1=\"20\"\n            x2=\"20\"\n            y2=\"60\"\n            stroke=\"currentColor\"\n            stroke-width=\"4\"\n            stroke-linecap=\"round\"\n          />\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".modal-overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000000b3;display:flex;align-items:center;justify-content:center;z-index:1000;overflow-y:scroll}.modal-content{background:#fff;border-radius:10px 0 10px 10px;min-width:600px;max-width:90vw;box-shadow:0 5px 15px #0000004d;position:relative;padding-bottom:24px;display:flex;justify-content:center;align-items:center;flex-direction:column;max-height:90vh;overflow-y:scroll}.modal-header{display:flex;width:100%;align-items:center;justify-content:start;padding:24px 24px 0;position:relative}.btn-header{cursor:pointer;border:#63748680 solid 1px;border-radius:.4em;padding:.3rem 1rem}.modal-title{flex:1;text-align:left;font-size:1rem;font-weight:600;width:min-content}.modal-dot{width:12px;height:12px;background:#25c7bc;border-radius:25%;margin-right:10px}.btn-close{height:2.5rem;width:2.5rem;padding:.5rem .6rem;background-color:#526275;display:flex;align-items:center;border-top-right-radius:25%;border-bottom-right-radius:25%;cursor:pointer;color:#fff;outline:none;font-size:large}.btn-close:hover{background-color:#4f5a6b}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: CustomModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'modal', standalone: true, imports: [CommonModule], template: "<div\n  *ngIf=\"isVisible\"\n  class=\"modal-overlay flex flex-row justify-start align-start\"\n  (click)=\"onOverlayClick($event)\"\n>\n  <!-- X button outside modal-content -->\n\n  <div class=\"flex flex-row\">\n    <div class=\"modal-content\" (click)=\"$event.stopPropagation()\">\n      <div class=\"modal-header\">\n        <span *ngIf=\"showDot\" class=\"modal-dot\"></span>\n        <span class=\"modal-title\">{{ modalTitle }}</span>\n        <div *ngIf=\"headerButton\">\n          <button\n            type=\"button\"\n            class=\"btn-header\"\n            (click)=\"onHeaderButtonClick()\"\n          >\n            {{ headerButton }}\n          </button>\n        </div>\n      </div>\n      <ng-content></ng-content>\n    </div>\n    <div class=\"flex justify-start\">\n      <button\n        type=\"button\"\n        class=\"btn-close\"\n        aria-label=\"Close\"\n        (click)=\"close()\"\n      >\n        <svg\n          width=\"80\"\n          height=\"80\"\n          viewBox=\"0 0 80 80\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n          aria-hidden=\"true\"\n        >\n          <line\n            x1=\"20\"\n            y1=\"20\"\n            x2=\"60\"\n            y2=\"60\"\n            stroke=\"currentColor\"\n            stroke-width=\"4\"\n            stroke-linecap=\"round\"\n          />\n          <line\n            x1=\"60\"\n            y1=\"20\"\n            x2=\"20\"\n            y2=\"60\"\n            stroke=\"currentColor\"\n            stroke-width=\"4\"\n            stroke-linecap=\"round\"\n          />\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".modal-overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000000b3;display:flex;align-items:center;justify-content:center;z-index:1000;overflow-y:scroll}.modal-content{background:#fff;border-radius:10px 0 10px 10px;min-width:600px;max-width:90vw;box-shadow:0 5px 15px #0000004d;position:relative;padding-bottom:24px;display:flex;justify-content:center;align-items:center;flex-direction:column;max-height:90vh;overflow-y:scroll}.modal-header{display:flex;width:100%;align-items:center;justify-content:start;padding:24px 24px 0;position:relative}.btn-header{cursor:pointer;border:#63748680 solid 1px;border-radius:.4em;padding:.3rem 1rem}.modal-title{flex:1;text-align:left;font-size:1rem;font-weight:600;width:min-content}.modal-dot{width:12px;height:12px;background:#25c7bc;border-radius:25%;margin-right:10px}.btn-close{height:2.5rem;width:2.5rem;padding:.5rem .6rem;background-color:#526275;display:flex;align-items:center;border-top-right-radius:25%;border-bottom-right-radius:25%;cursor:pointer;color:#fff;outline:none;font-size:large}.btn-close:hover{background-color:#4f5a6b}\n"] }]
        }], propDecorators: { modalTitle: [{
                type: Input
            }], showDot: [{
                type: Input
            }], headerButton: [{
                type: Input
            }], hideEvent: [{
                type: Output
            }], headerButtonClick: [{
                type: Output
            }] } });

const authGuard = () => {
    const platformId = inject(PLATFORM_ID);
    const router = inject(Router);
    const authService = inject(AuthService);
    console.log('authGuard called');
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
    return false;
};

const noAuthGuard = () => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const platformId = inject(PLATFORM_ID);
    console.log('noAuthGuard called');
    if (!isPlatformBrowser(platformId)) {
        return false; // Exit early for non-browser platforms
    }
    if (authService.isLoggedIn()) {
        router.navigateByUrl(ModuleRoutes.MAIN_PAGE);
        return false;
    }
    return true;
};

class PermissionGuard {
    router;
    constructor(router) {
        this.router = router;
    }
    canActivate(route) {
        const requiredPermissions = route.data['permissions'];
        const listOfRoles = localStorage
            .getItem(AuthConstant.USER_PERMISSIONS)
            ?.split(',');
        if (requiredPermissions.some((p) => listOfRoles?.includes(p))) {
            return true;
        }
        else {
            this.router.navigate(['error/403']);
            return false;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: PermissionGuard, deps: [{ token: i1$3.Router }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: PermissionGuard, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.13", ngImport: i0, type: PermissionGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1$3.Router }] });

/**
 * Generated bundle index. Do not edit.
 */

export { API_BASE_URL, AllowNumberOnlyDirective, ArabicOnlyDirective, AuthConstant, AuthService, BlurBackdropDirective, ClickOutsideDirective, CommonHttpService, ComponentFormErrorConstant, CustomAppErrorComponent, CustomBreadcrumbComponent, CustomButtonComponent, CustomCalendarComponent, CustomCalenderFormComponent, CustomCheckBoxComponent, CustomCheckBoxFormComponent, CustomDropdownComponent, CustomDropdownFormComponent, CustomInputComponent, CustomInputFormComponent, CustomModalComponent, CustomMultiSelectComponent, CustomMultiSelectFormComponent, CustomPaginationComponent, CustomPopUpComponent, CustomTableComponent, CustomTextareaComponent, CustomTextareaFormComponent, CustomToastComponent, CustomToggleSwitchComponent, CustomToggleSwitchFormComponent, EnglishOnlyDirective, ErrorInterceptor, I18nConstant, ModuleRoutes, NetworkConnectionInterceptor, OverlayPanelComponent, PermissionGuard, ToastService, ToggleElementDirective, TokenInterceptor, TranslationService, UserDataService, authGuard, b64toBlob, blobToB64, convertDateFormat, convertFileToBase64, convertFormGroupToFormData, diffTime, excelDateToJSDate, flattenTree, formatDate, formatDateWithTime, formatTimestamp, formatinitialTakeTime, generateRandomColor, generateUniqueNumber, getFormValidationErrors, isDocumentPath, isImagePath, isVedioPath, logger, noAuthGuard, someFieldsContainData, timeAgo };
//# sourceMappingURL=dispatching-fe-components.mjs.map
