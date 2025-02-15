import { checkSession, deleteSession, upsertSession } from "../repositories/sessionRepository";
import { getUserById } from "./authService";


export async function createSessionByUserId(userId: number) {
    return await upsertSession(userId);
}

export async function expireSessionByUserId(userId: number) {
    return await deleteSession(userId);
}

export async function checkUserSessionInfo(userId: number) {
    const sessionInfo = await checkSession(userId);
    const userInfo = await getUserById(userId);
    if (sessionInfo) {
        return {
            isAdmin: userInfo.role == "admin",
            isActive: sessionInfo.isActive,
            timeRemaining: sessionInfo.timeRemaining,
            expires: sessionInfo.expires,
        }
    } else {
        return {
            isAdmin: userInfo.role == "admin",
            isActive: false,
            timeRemaining: undefined,
            expires: undefined,
        }
    }
}