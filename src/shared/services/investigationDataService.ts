import { validateInvestigationDataRequestBody } from "../models/investigationData";
import { saveInvestigationData, fetchInvestigationData, modifyInvestigationData, fetchDataEmptyInvestigations } from "../repositories/investigationDataRepository";
import { DataEmptyTests } from "../types/investigationData";
import { addAuditTrailRecord } from "./auditTrailService";

export async function addInvestigationData(investigationRegistrationId: number, investigationId: number, body: any) {
    const validatedDataBody = await validateInvestigationDataRequestBody(investigationId, body.data);
    
    const oldInvestigationData = await getInvestigationData(investigationRegistrationId, investigationId);
    if (oldInvestigationData.version != body.version) {
        throw new Error("Version mismatch. Please fetch the latest version before updating!");
    } else {
        const res = await saveInvestigationData(
            investigationRegistrationId,
            investigationId,
            validatedDataBody,
            body.options,
            body.doctor_id
        );

        //TODO: update userId 
        addAuditTrailRecord("user001", oldInvestigationData.version == 1 ? "Add investigation data" : "Update investigation data", { old: oldInvestigationData, new: res });
        return { new: oldInvestigationData.version == 1, content: res };
    }
}

export async function getInvestigationData(investigationRegistrationId: number, investigationId: number) {
    return await fetchInvestigationData(investigationRegistrationId, investigationId);;
}

export async function updateInvestigationData(invRegId: number, investigationId: number, body: any) {
    const validatedDataBody = await validateInvestigationDataRequestBody(investigationId, body);

    return await modifyInvestigationData(invRegId, investigationId, validatedDataBody);
}

export async function getDataEmptyInvestigations() {
    const rows = await fetchDataEmptyInvestigations();

    const registrations: DataEmptyTests[] = [];

    rows.forEach(row => {
        registrations.push({
            testRegisterId: row.registrations_id,
            testId: row.test_id,
            testName: row.test_name,
            patientId: row.patient_id,
            patientName: row.patient_name,
            patientDOB: new Date(row.patient_date_of_birth),
            patientGender: row.patient_gender,
            date: row.date,
            doctorId: row.doctor_id,
            doctorName: row.doctor_name,
            ref_number: row.ref_number,
            data: row.data,
            options: row.options,
            version: row.version,
        });
    });

    return registrations;
}