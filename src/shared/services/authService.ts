import bcrypt from 'bcryptjs';
import { fetchAllUsers, fetchUserByEmail, fetchUserById, modifyUser, saveUser } from "../repositories/userRepository";
import { addAuditTrailRecord } from './auditTrailService';
import { validateUser } from '../models/user';
import { UserType } from '../types/user';
import { createSessionByUserId } from './sessionService';

export async function registerNewUser(name: string, email: string, password: string) {
    if (!name || !email || !password) {
        throw new Error("Missing required fields");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }

    const existingUser = await fetchUserByEmail(email);
    if (existingUser) {
        throw new Error("Email already registered");
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const res = await saveUser(name, email, hashedPassword);
    addAuditTrailRecord(res.rows[0].id, "New user registration", { name, email });
}

export async function userLogin(email: string, password: string) {
    if (!email || !password) {
        throw new Error("Missing required fields");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }

    const user = await fetchUserByEmail(email);

    if (!user || !user.password) throw new Error("Invalid username or password!");

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
        // Creating a session
        await createSessionByUserId(user.id);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    } else {
        throw new Error("Invalid username or password!");
    }
}

export async function getUserById(id: number) {
    if (id == undefined) {
        throw new Error("user id must be defined!");
    }
    return await fetchUserById(id);
}

export async function getAllUsers(limit: number, offset: number, search?: string) {
    const results = await fetchAllUsers(limit, offset, search);

    const usersArr: UserType[] = [];
    for (const user of results.users) {
        usersArr.push({
            id: user.user_id,
            name: user.name,
            email: user.email,
            role: user.role,
            emailVerified: user.emailVerified,
            image: user.image,
            branch: {
                id: user.branch_id,
                name: user.branch_name,
                address: user.branch_address,
                telephone: user.branch_telephone,
                version: user.branch_version,
            },
            version: user.user_version,
        });
    }

    return {
        users: usersArr,
        totalCount: results.totalCount,
        totalPages: results.totalPages,
    }
}

export async function updateUser(id: number, userDetails: any) {
    const updatingUser = validateUser(userDetails);

    const oldUser = await fetchUserById(id);

    if (oldUser.version != updatingUser.version) {
        throw new Error("Version mismatch. Please fetch the latest version before updating!");
    } else {
        const res = await modifyUser(id, updatingUser);
        addAuditTrailRecord(id, "Update user", { new: updatingUser, old: oldUser });
        return res;
    }
}