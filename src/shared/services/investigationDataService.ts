import { validateInvestigationDataRequestBody } from "../models/investigationData";
import { saveInvestigationData, fetchInvestigationData, modifyInvestigationData } from "../repositories/investigationDataRepository";
import { InvestigationData } from "../types/investigationData";

export async function addInvestigationData(investigationRegistrationId: number, investigationId: number, body: any) {
    const validatedDataBody = await validateInvestigationDataRequestBody(investigationId, body);

    const investigation_data: InvestigationData = {
        investigation_registration_id: investigationRegistrationId,
        investigation_id: investigationId,
        data: validatedDataBody
    }
    
    await saveInvestigationData(investigation_data);
    return investigation_data;
}

export async function getInvestigationData(investigationRegistrationId: number, investigationId: number) {
    return await fetchInvestigationData(investigationRegistrationId, investigationId);;
}

export async function updateInvestigationData(invRegId: number, investigationId: number, body: any) {
    const validatedDataBody = await validateInvestigationDataRequestBody(investigationId, body);

    return await modifyInvestigationData(invRegId, investigationId, validatedDataBody);
}