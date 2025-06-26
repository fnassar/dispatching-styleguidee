import { EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export interface FileData {
    id: string;
    fileName: string;
    mimeType: string;
    base64Content: string;
    uploadTime?: string;
    fileSize: string;
}
export declare class CustomFileViewerComponent {
    private sanitizer;
    file: FileData;
    showMenu: boolean;
    menuClick: EventEmitter<FileData>;
    fileClick: EventEmitter<FileData>;
    showTooltip: boolean;
    private mimeTypesMap;
    constructor(sanitizer: DomSanitizer);
    getFileTypeLabel(): string;
    getFileIcon(): SafeHtml;
    formatDate(date: string | undefined): string;
    onFileClick(): void;
    onMenuClick(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomFileViewerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomFileViewerComponent, "custom-file-viewer", never, { "file": { "alias": "file"; "required": true; }; "showMenu": { "alias": "showMenu"; "required": false; }; }, { "menuClick": "menuClick"; "fileClick": "fileClick"; }, never, never, true, never>;
}
