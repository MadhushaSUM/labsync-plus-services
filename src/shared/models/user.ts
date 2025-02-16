import { UserType } from "../types/user";

export function validateUser(user: any) {
    if (
        !user.id ||
        !user.name ||
        !user.email ||
        !user.role ||
        !user.branch ||
        !user.version
    ) {
        throw new Error('Invalid user data');
    }

    const verifiedUser: UserType = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        branch: {
            id: user.branch.id,
            name: user.branch.name,
            address: user.branch.address,
            telephone: user.branch.telephone,
            version: user.branch.version,
        },
        emailVerified: user.emailVerified,
        image: user.image,
        version: user.version,
    }

    return verifiedUser;
}
