export declare const TeamManagementPaths: {
    MODULE_NAME: string;
    TEAM: string;
    USER: string;
    PROFILE: string;
};
export declare const TeamManagementModules: {
    MAIN_USER_USER_MANAGEMENT: {
        key: string;
        permissions: {
            ADD_TEAM_MEMBERS: string;
            VIEW_TEAM_MEMBERS: string;
        };
    };
};
export declare class AssetManagementPaths {
    static MODULE_NAME: string;
    static MAIN: string;
    static VEHICLES: string;
    static EQUIPMENT: string;
}
export declare const AssetManagementModules: {
    MAIN_ASSET_MANAGEMENT: {
        key: string;
        permissions: {
            ADD_ASSETS: string;
            VIEW_ASSETS: string;
        };
    };
};
export declare class WeeklyPlansPaths {
    static MODULE_NAME: string;
    static LAYOUT: string;
    static TASKS: string;
    static VIEW_W_PLAN: string;
    static CREATE_W_PLAN: string;
}
export declare const WeeklyPlansModules: {
    WEEKLY_PLAN_VIEW: {
        key: string;
        permissions: {
            VIEW_WEEKLY_PLAN: string;
            EDIT_WEEKLY_PLAN: string;
        };
    };
    WEEKLY_PLAN_CREATE: {
        key: string;
        permissions: {
            CREATE_WEEKLY_PLAN: string;
        };
    };
};
export declare class TasksPaths {
    static MODULE_NAME: string;
    static LAYOUT: string;
    static VIEW_W_PLAN: string;
    static CREATE_W_PLAN: string;
}
export declare class STORAGE_KEYS {
    static PARSED_TOKEN: string;
    static TABS: string;
    static TEAMS_MODULE: string;
    static WEEKLY_PLAN: string;
}
export declare const ZERO_INDEX = 0;
