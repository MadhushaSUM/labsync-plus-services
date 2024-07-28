import { fetchInvestigationById, fetchInvestigationsByIds } from "../repositories/investigationRepository";
import { InvestigationType } from "../types/Investigation";

export async function getInvestigationById(investigationId: string) {
    if (investigationId == undefined) {
        throw new Error("InvestigationId id must be defined");
    }
    return await fetchInvestigationById(investigationId);
}

export async function checkInvalidInvestigationIds(ids: string[]) {
    const result = await fetchInvestigationsByIds(ids);
    if (result && result.Responses) {
        const foundInvestigations = result.Responses.InvestigationTable as InvestigationType[];

        const foundIds = new Set(foundInvestigations.map(inv => inv.id));
        const missingIds = ids.filter(id => !foundIds.has(id));

        return missingIds;
    }

    return ids;
}