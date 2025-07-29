export interface IGlobalAuthResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
export interface IGenericGlobalDataResponse<T> {
    timestamp: string;
    status: 'SUCCESS' | 'ERROR' | string;
    message: string;
    data: T;
}
