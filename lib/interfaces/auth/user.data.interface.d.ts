import { Permissions, Resources, Roles, UserStatus } from '../../enums/auth/auth.constant';
/**
 * Represents the authentication data returned with login and refresh token.
 *
 * @property accessToken - The JWT access token for authentication.
 * @property refreshToken - The token used to obtain a new access token.
 * @property tokenType - The type of the token (e.g., "Bearer").
 * @property expiresIn - The number of seconds until the access token expires.
 * @property user - The authenticated user's data.
 * @property roles - The list of roles assigned to the user.
 * @property permissions - The list of permissions granted to the user.
 *
 * @remarks
 * This interface is returned with login and refresh token operations.
 */
export interface ILoginData {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    user: IUserData;
    roles: Roles[];
    permissions: Permissions[];
}
/**
 * This interface represents the data returned on validate token.
 *
 * @property valid Indicates if the token is valid.
 * @property username The username associated with the validated token.
 * @property user The user data object.
 * @property roles The list of roles assigned to the user.
 * @property permissions The list of permissions granted to the user.
 */
export interface IValidationData {
    valid: true;
    username: 'amr@gmail.com';
    user: IUserData;
    roles: Roles[];
    permissions: Permissions[];
}
export interface IRoleData {
    id: string;
    name: Roles;
    description: string;
    type: string;
    isActive: boolean;
    permissions: IPermissionData[];
}
export interface IPermissionData {
    id: number;
    name: Permissions;
    description: string;
    resource: Resources[];
    action: string;
    scope: string;
    fullName: string;
    isActive: boolean;
}
export interface IPreferences {
    theme: string;
    language: string;
    timezone: string;
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    twoFactorEnabled: boolean;
}
/**
 * Represents the user data returned with getCurrentUser and as the `user` property in login/validation responses.
 *
 * @property id - The unique identifier of the user.
 * @property wso2UserId - The WSO2 user identifier.
 * @property username - The username of the user.
 * @property email - The email address of the user.
 * @property firstName - The user's first name.
 * @property lastName - The user's last name.
 * @property displayName - The display name of the user.
 * @property fullName - The full name of the user.
 * @Property department - no clue
 * @property position - no clue
 * @property status - The status of the user account > ACTIVE / INACTIVE
 * @property directReports - no clue
 * @property teams - no clue
 * @property roles - List of role objects that defines roles assigned to the user.
 * @property permissions - List of permissions granted to the user.
 * @property preferences - User's preferences.
 *
 * @remarks
 * This interface is returned by getCurrentUser and as the `user` property in login/validation responses.
 */
export interface IUserData {
    id: number;
    wso2UserId: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
    fullName: string;
    department: string;
    position: string;
    status: UserStatus;
    directReports: string[];
    teams: string[];
    roles: IRoleData[];
    permissions: Permissions[];
    preferences: IPreferences;
}
/**
 * Represents the data structure to be stored in session storage or local storage for user authentication.
 *
 * @property roles - An array of roles assigned to the user.
 * @property permissions - An array of permissions granted to the user.
 */
export interface ISessionData {
    roles: Roles[];
    permissions: Permissions[];
}
/**
 * Represents the structure of authentication tokens and their expiration to be stored locally.
 *
 * @property accessToken - The JWT access token for authentication.
 * @property refreshToken - The token used to obtain a new access token.
 * @property user - The user data object containing user-specific information.

 */
export interface ILocalData {
    accessToken: string;
    refreshToken: string;
    user: IUserData;
}
