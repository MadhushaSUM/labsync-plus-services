import { fetchInvestigationById } from "../repositories/investigationRepository";

export async function getInvestigationById(investigationId: string) {
    if (investigationId == undefined) {
        throw new Error("InvestigationId id must be defined");
    }
    return await fetchInvestigationById(investigationId);
}