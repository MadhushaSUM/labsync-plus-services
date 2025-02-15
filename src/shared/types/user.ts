export interface UserType {
    id: number;
    name: string;
    email: string;
    role: string;
    branch: {
        id: number;
        name: string;
        address: string;
        telephone: string;
        version: string;
    }
    emailVerified?: string;
    image?: string;
    version: number;
}