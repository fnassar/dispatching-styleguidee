export interface ITableCategory<T> {
    category: string;
    rows: T[];
    isCollapsed?: boolean;
}
export interface IPageChangeEvent {
    page: number;
    pageSize: number;
}
export interface IStatusCol<T> {
    header: keyof T;
    trueValue: string | boolean;
    trueText: string;
    falseText: string;
    sort?: boolean;
}
export interface ITableHeader<T> {
    header: string;
    body: keyof T | string;
    sort?: boolean;
    align?: 'left' | 'center' | 'right';
    width?: string;
    htmlRef?: string;
    expandedHtmlRef?: string;
    inputTransform?: (row: T) => string;
    isEditable?: boolean;
    canEdit?: (row: T) => boolean;
}
export type EditingCell = {
    rowKey: string;
    colKey: string;
    isChild: boolean;
    parentKey?: string;
} | null;
export interface TableSelection {
    parents: Set<string>;
    children: Set<string>;
}
