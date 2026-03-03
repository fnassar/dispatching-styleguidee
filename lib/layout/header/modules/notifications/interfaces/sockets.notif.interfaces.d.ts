export interface ISubscribeMessage {
    action: 'subscribe' | 'unsubscribe';
    userId: number;
}
export interface IGenericSocketResponse<T = any> {
    type: 'notification' | 'subscription_confirmed' | 'badge_update';
    data: T;
    userId?: string;
    message?: string;
    unreadCount?: number;
}
