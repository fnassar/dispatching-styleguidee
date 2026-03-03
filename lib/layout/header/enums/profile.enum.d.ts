import { IDropdownOption } from '../../../interfaces';
export interface IFunctionDropdown extends IDropdownOption {
    iconConst: string;
    function: () => void;
}
export interface IChangePass {
    newPassword: string;
    oldPassword: string;
    confirmNewPassword: string;
}
