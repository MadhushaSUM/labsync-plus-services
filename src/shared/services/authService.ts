import bcrypt from 'bcryptjs';
import { fetchUserByEmail, saveUser } from "../repositories/userRepository";

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