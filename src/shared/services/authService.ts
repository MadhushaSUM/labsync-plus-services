import bcrypt from 'bcryptjs';
import { fetchUserByEmail, fetchUserById, saveUser } from "../repositories/userRepository";

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