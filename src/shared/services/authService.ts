import bcrypt from 'bcryptjs';
import { fetchAllUsers, fetchUserByEmail, fetchUserById, modifyUser, saveUser } from "../repositories/userRepository";
import { addAuditTrailRecord } from './auditTrailService';
import { validateUser } from '../models/user';

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

    await saveUser(name, email, hashedPassword);
    //TODO: update userId 
    addAuditTrailRecord("user001", "New user registration", { name, email });
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
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            //TODO: add fields like role
        }
    } else {
        throw new Error("Invalid username or password!");
    }
}

export async function getUserById(id: number) {
    if (id == undefined) {
        throw new Error("user id must be defined!");
    }
    const { password, ...rest } = await fetchUserById(id);

    return { ...rest };
}

export async function getAllUsers(limit: number, offset: number, search?: string) {
    return await fetchAllUsers(limit, offset, search);
}

export async function updateUser(id: number, userDetails: any) {
    const updatingUser = validateUser(userDetails);

    const oldUser = await fetchUserById(id);

    if (oldUser.version != updatingUser.version) {
        throw new Error("Version mismatch. Please fetch the latest version before updating!");
    } else {
        const res = await modifyUser(id, updatingUser);
        //TODO: update userId 
        const { password, ...rest } = oldUser
        addAuditTrailRecord("user001", "Update user", { new: updatingUser, old: { ...rest } });
        return res;
    }
}