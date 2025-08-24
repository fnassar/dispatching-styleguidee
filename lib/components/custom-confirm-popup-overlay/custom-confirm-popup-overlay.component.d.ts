import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ConfirmPopupService } from '../../services';
import { CustomConfirmPopupComponent } from '../custom-confirm-popup/custom-confirm-popup.component';
import * as i0 from "@angular/core";
export declare class CustomConfirmPopupOverlayComponent implements AfterViewInit, OnDestroy {
    confirmService: ConfirmPopupService;
    viewModel: import("@angular/core").Signal<{
        isOpen: boolean;
        options: import("dispatching-fe-components").ConfirmOptions | null;
    }>;
    dialogPanelRef: ElementRef<HTMLElement>;
    popupRef: CustomConfirmPopupComponent;
    private previouslyFocusedElement;
    constructor();
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onBackdropClick(): void;
    onKeydown(event: KeyboardEvent): void;
    private trapFocus;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomConfirmPopupOverlayComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomConfirmPopupOverlayComponent, "custom-confirm-popup-overlay", never, {}, {}, never, never, true, never>;
}
