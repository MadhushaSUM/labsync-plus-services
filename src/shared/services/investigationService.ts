import { fetchInvestigationById, fetchInvestigationsByIds } from "../repositories/investigationRepository";

export async function getInvestigationById(investigationId: number) {
    if (investigationId == undefined) {
        throw new Error("InvestigationId id must be defined");
    }
    return await fetchInvestigationById(investigationId);
}

export async function checkInvalidInvestigationIds(ids: number[]) {
    const result = await fetchInvestigationsByIds(ids);
    if (result ) {
        const foundIds = new Set(result.map(inv => inv.id));
        const missingIds = ids.filter(id => !foundIds.has(id));

        return missingIds;
    }

    return ids;
}