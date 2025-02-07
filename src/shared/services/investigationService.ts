import { validateInvestigation } from "../models/investigationData";
import { fetchAllInvestigations, fetchInvestigationById, fetchInvestigationFieldsByTestId, fetchInvestigationsByIds, modifyInvestigationPrice } from "../repositories/investigationRepository";
import { addAuditTrailRecord } from "./auditTrailService";

export async function getInvestigationById(investigationId: number) {
    if (investigationId == undefined) {
        throw new Error("InvestigationId id must be defined");
    }
    return await fetchInvestigationById(investigationId);
}

export async function getAllInvestigations(limit: number, offset: number, search?: string) {
    return await fetchAllInvestigations(limit, offset, search);
}


export async function checkInvalidInvestigationIds(ids: number[]) {
    const result = await fetchInvestigationsByIds(ids);
    if (result) {
        const foundIds = new Set(result.map(inv => inv.id));
        const missingIds = ids.filter(id => !foundIds.has(id));

        return missingIds;
    }

    return ids;
}

export async function updateInvestigationPrice(id: number, investigationDetails: any) {
    const updatingInvestigation = validateInvestigation(investigationDetails);

    const oldInvestigation = await fetchInvestigationById(id);

    if (oldInvestigation.version != updatingInvestigation.version) {
        throw new Error("Version mismatch. Please fetch the latest version before updating!");
    } else {
        const res = await modifyInvestigationPrice(id, updatingInvestigation.price, updatingInvestigation.version);
        //TODO: update userId 
        addAuditTrailRecord("user001", "Update investigation price", { new: updatingInvestigation, old: oldInvestigation });
        return res;
    }
}

export async function getInvestigationFieldsByTestId(testId: number) {
    if (testId == undefined) {
        throw new Error("Investigation id must be defined");
    }
    return await fetchInvestigationFieldsByTestId(testId);
}