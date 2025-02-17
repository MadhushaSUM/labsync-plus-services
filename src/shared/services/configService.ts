import { fetchConfigById, updateConfigById } from "../repositories/configRepository";
import { addAuditTrailRecord } from "./auditTrailService";


export async function getConfigById(configId: number) {
    return await fetchConfigById(configId);
}

export async function setConfigById(configId: number, config: object, userId: number) {
    const res = await updateConfigById(configId, config);
    await addAuditTrailRecord(userId, "Update configuration", { configId, details: configId == 1 ? "WhatsApp config" : undefined })
}