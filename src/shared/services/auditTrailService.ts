import { fetchAllAuditTrailRecords, saveAuditTrailRecord } from "../repositories/auditTrailRepository";

export async function addAuditTrailRecord(userId: number, operation: string, payload: object) {

    return await saveAuditTrailRecord(userId, operation, payload);
}

export async function getAllAuditTrailRecords(limit: number, offset: number, startDate?: string, endDate?: string) {
    return await fetchAllAuditTrailRecords(limit, offset, startDate, endDate);
}