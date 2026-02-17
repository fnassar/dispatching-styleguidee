import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CustomCalendarExpandedComponent {
    calendarPopUpClass: string;
    calendarInputClass: string;
    calendarContainerClass: string;
    minDate: Date | null;
    maxDate: Date | null;
    value: Date | null;
    valueChange: EventEmitter<Date | null>;
    showCalendar: boolean;
    currentMonth: Date;
    days: Date[];
    weekdays: string[];
    constructor();
    toggleCalendar(): void;
    selectDate(date: Date): void;
    prevMonth(): void;
    nextMonth(): void;
    generateCalendar(): void;
    isSelected(date: Date): boolean;
    isCurrentMonth(date: Date): boolean;
    isDisabled(date: Date): boolean;
    getMonthName(): string;
    getYear(): number;
    formatDisplayDate(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomCalendarExpandedComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomCalendarExpandedComponent, "custom-calendar-expanded", never, { "calendarPopUpClass": { "alias": "calendarPopUpClass"; "required": false; }; "calendarInputClass": { "alias": "calendarInputClass"; "required": false; }; "calendarContainerClass": { "alias": "calendarContainerClass"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "value": { "alias": "value"; "required": true; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
