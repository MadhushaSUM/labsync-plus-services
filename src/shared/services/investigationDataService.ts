import { validateInvestigationDataRequestBody } from "../models/investigationData";
import { saveInvestigationData, fetchInvestigationData, modifyInvestigationData } from "../repositories/investigationDataRepository";
import { InvestigationData } from "../types/investigationData";
import { v4 as uuidv4 } from 'uuid';
import { addInvestigationToDataAddedList } from "./investigationRegistrationService";

export async function addInvestigationData(investigationRegistrationId: string, investigationId: string, body: any) {
    const validatedDataBody = await validateInvestigationDataRequestBody(investigationId, body);

    const investigation_data: InvestigationData = {
        id: uuidv4(),
        investigation_registration_id: investigationRegistrationId,
        investigation_id: investigationId,
        data: validatedDataBody
    }

    await addInvestigationToDataAddedList(investigationRegistrationId, investigationId);
    await saveInvestigationData(investigation_data);
    return investigation_data;
}

export async function getInvestigationData(investigationRegistrationId: string, investigationId: string) {
    return await fetchInvestigationData(investigationRegistrationId, investigationId);;
}

export async function updateInvestigationData(investigationDataId: string, investigationId: string, body: any) {
    const validatedDataBody = await validateInvestigationDataRequestBody(investigationId, body);

    return await modifyInvestigationData(investigationDataId, validatedDataBody);
}