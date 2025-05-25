export interface IUserData {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    lastLogin: Date;
    profilePictureUrl?: string;
}
