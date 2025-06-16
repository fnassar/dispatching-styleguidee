import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export interface FileData {
    fileName: string;
    mimeType: string;
    fileSize: string;
    lastModified: Date;
    blob?: File;
}
export declare class CustomFileViewerComponent {
    file: FileData;
    showMenu: boolean;
    menuClick: EventEmitter<FileData>;
    fileClick: EventEmitter<FileData>;
    showTooltip: boolean;
    private mimeTypesMap;
    getFileTypeLabel(): string;
    getFileIcon(): string;
    formatDate(date: Date): string;
    onFileClick(): void;
    onMenuClick(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomFileViewerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomFileViewerComponent, "custom-file-viewer", never, { "file": { "alias": "file"; "required": true; }; "showMenu": { "alias": "showMenu"; "required": false; }; }, { "menuClick": "menuClick"; "fileClick": "fileClick"; }, never, never, true, never>;
}
