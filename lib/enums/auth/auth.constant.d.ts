export declare enum AuthConstant {
    TOKEN = "accessToken",
    REFRESH_TOKEN = "refreshToken",
    USER_DATA = "user",
    USER_PERMISSIONS = "permissions",
    USER_ROLES = "roles",
    EXPIRES_AT = "expiresIn"
}
export declare enum UserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    SUSPENDED = "SUSPENDED"
}
export declare enum Roles {
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN",
    PLANNER = "PLANNER",
    SUPERVISOR = "SUPERVISOR",
    OPERATOR = "OPERATOR"
}
export declare enum Types {
    ADMIN = "ADMIN",
    PLANNER = "PLANNER",
    SUPERVISOR = "SUPERVISOR",
    OPERATOR = "OPERATOR"
}
export declare enum Resources {
    USER = "user",
    TASK = "task",
    PLAN = "plan",
    VEHICLE = "vehicle",
    EQUIPMENT = "Equipment",
    MOBILE_TASK = "mobile:task",
    MOBILE_USER = "mobile:user",
    MOBILE_LANDING = "mobile:landing"
}
export declare enum actionPermission {
    VIEW_DETAILS = "view-details",
    CREATE = "create",
    VIEW_LIST = "view-list",
    UPDATE = "update",
    DELETE = "delete",
    START = "start",
    PAUSE = "pause",
    RESUME = "resume",
    STOP = "stop",
    VIEW_PROFILE = "view-profile",
    VIEW_LANDING = "view-landing"
}
export declare enum Permissions {
    all = "all",
    UserReadSelf = "user:read:self",
    UserViewProfileSelf = "user:view-profile:self",
    UserViewListOrganization = "user:view-list:ORGANIZATION",
    UserCreateOrganization = "user:create:ORGANIZATION",
    teamViewListORGANIZATION = "team:view-list:ORGANIZATION",
    teamCreateORGANIZATION = "team:create:ORGANIZATION",
    zoneCreateTeam = "zone:create:team",
    zoneViewListTeam = "zone:view-list:team",
    zoneCreateBulkTeam = "zone:create-bulk:team",
    TaskCreateTeam = "task:create:team",
    TaskViewListSelf = "task:view-list:self",
    TaskViewDetailsSelf = "task:view-details:self",
    PlanCreateDraftTeam = "plan:create-draft:team",
    PlanCreatePublishTeam = "plan:create-publish:team",
    PlanViewGanttChartSelf = "plan:view-gantt-chart:self",
    PlanViewDetailsSelf = "plan:view-details:self",
    PlanUpdateSelf = "plan:update:self",
    VehicleCreateOrganization = "vehicle:create:organization",
    VehicleViewListOrganization = "vehicle:view-list:organization",
    EquipmentCreateOrganization = "equipment:create:organization",
    EquipmentViewListOrganization = "equipment:view-list:organization",
    MobileUserViewProfileSelf = "mobile:user:view-profile:self",
    MobileLandingViewLandingSelf = "mobile:landing:view-landing:self",
    MobileTaskViewListSelf = "mobile:task:view-list:self",
    MobileTaskViewDetailsSelf = "mobile:task:view-details:self",
    MobileTaskStartSelf = "mobile:task:start:self",
    MobileTaskPauseSelf = "mobile:task:pause:self",
    MobileTaskResumeSelf = "mobile:task:resume:self",
    MobileTaskStopSelf = "mobile:task:stop:self"
}
