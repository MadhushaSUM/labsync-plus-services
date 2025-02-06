import { validateInvestigationDataRequestBody } from "../models/investigationData";
import { saveInvestigationData, fetchInvestigationData, modifyInvestigationData, fetchDataEmptyInvestigations } from "../repositories/investigationDataRepository";
import { DataEmptyTests, InvestigationData } from "../types/investigationData";

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

export async function getDataEmptyInvestigations() {
    const rows = await fetchDataEmptyInvestigations();

    const registrations: DataEmptyTests[] = [];

    rows.forEach(row => {
        registrations.push({
            testRegisterId: row.test_register_id,
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
            options: row.options
        });
    });

    return registrations;
}