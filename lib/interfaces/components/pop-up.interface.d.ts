import { TemplateRef } from '@angular/core';
import { IDropdownOption } from './dropdown.interface';
export interface notionPopup<T = any> extends PlanObjectType {
    actionButtons: TemplateRef<T> | null;
}
export interface PlanObjectType extends IDropdownOption {
    startDate: string;
    endDate: string;
    status: PlanStatusEnum;
    priority: planPriorityEnum;
    planTypeNameEn: planTypeNameEnum;
    planTypeNameAr: string;
    zones: IDropdownOption[];
    supervisor: IDropdownOption;
    backupSupervisor: IDropdownOption;
    progress: number;
    tasks?: Task[];
    isExpanded?: boolean;
    attachments: IDropdownOption[];
    description: string;
}
export declare enum planPriorityEnum {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}
export declare enum planTypeNameEnum {
    WEEKLY = "WEEKLY",
    CAMPAIGN = "CAMPAIGN"
}
export declare enum PlanStatusEnum {
    DRAFT = "DRAFT",
    ACTIVE = "ACTIVE"
}
export interface Task {
    name: string;
    assignees: string[];
    startDay: number;
    endDay: number;
    progress: number;
}
