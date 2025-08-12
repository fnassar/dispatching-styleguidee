export interface TableColumn {
    key: string;
    label: string;
    type?: 'text' | 'number' | 'date' | 'action' | 'image' | 'progress' | 'periority' | 'actions';
    sort?: boolean;
    customClass?: string;
    columnHandler?: (row: any) => void;
    categoryBg?: string;
}
export interface TableAction {
    label: 'edit' | 'delete' | 'view' | 'multi';
    iconPath?: string;
    handler: (row: any) => void;
    isDisabled?: (row: any) => boolean;
}
export interface TableConfig {
    columns: TableColumn[];
    actions?: TableAction[];
    data: any;
}
export interface GroupedTableConfig {
    columns: TableColumn[];
    actions?: TableAction[];
    groupedData: TableGroup[];
}
export interface Paginators {
    pageSize: number;
    currentPage: number;
    totalItems?: number;
    totalPages: number;
}
export interface TableGroup<T = any> {
    title: string;
    color: string;
    items: T[];
    isCollapsed?: boolean;
}
