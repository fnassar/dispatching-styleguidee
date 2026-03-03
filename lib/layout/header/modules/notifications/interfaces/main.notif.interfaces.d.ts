import { NOTIF_ENUM } from '../enums/main.notif.enums';
export interface INotification {
    notificationId: string;
    type: NOTIF_ENUM;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: string | number[];
    sentAt: string;
    taskDetails: ITaskDetails;
    channels: IChannels[];
}
export interface INotificationAction {
    text: (data: any) => string;
    color: string;
    icon: string;
    action: (notification: INotification) => void;
    routePath: string;
    additionalData: Record<string, any>;
}
export interface ITaskDetails {
    taskId: string | number;
    taskTitle: string;
    action: string;
    status: string;
    priority: string;
    dueDate: string;
    operatorName: string;
}
export interface IChannels {
    channel: string;
    status: string;
    sentAt: string;
    deliveredAt: string;
    errorMessage: string;
}
export interface IPageResInterface<T = any> {
    content: T;
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasNext: boolean;
    hasPrevious: boolean;
}
