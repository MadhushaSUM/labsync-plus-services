import { validateInvestigationDataRequestBody } from "../models/investigationData";
import { saveInvestigationData, fetchInvestigationData, modifyInvestigationData, fetchDataEmptyInvestigations, fetchDataAddedInvestigations, markAsPrinted, markAsDataAdded, fetchInvestigationDataPatientPortal } from "../repositories/investigationDataRepository";
import { DataEmptyTests } from "../types/investigationData";
import { addAuditTrailRecord } from "./auditTrailService";

export async function addInvestigationData(investigationRegistrationId: number, investigationId: number, body: any, userId: number) {
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

        addAuditTrailRecord(userId, oldInvestigationData.version == 1 ? "Add investigation data" : "Update investigation data", { old: oldInvestigationData, new: res });
        return { new: oldInvestigationData.version == 1, content: res };
    }
}

export async function getInvestigationData(investigationRegistrationId: number, investigationId: number) {
    return await fetchInvestigationData(investigationRegistrationId, investigationId);;
}

export async function getInvestigationDataPatientPortal(investigationRegistrationId: number, investigationId: number) {
    const row = await fetchInvestigationDataPatientPortal(investigationRegistrationId, investigationId);
    const data: DataEmptyTests = {
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
        branch: {
            id: row.branch_id,
            name: row.branch_name,
            address: row.branch_address,
            telephone: row.branch_telephone,
            version: row.branch_version,
        },
        version: row.version,
    }

    return data;
}

export async function updateInvestigationData(invRegId: number, investigationId: number, body: any) {
    const validatedDataBody = await validateInvestigationDataRequestBody(investigationId, body);

    return await modifyInvestigationData(invRegId, investigationId, validatedDataBody);
}

export async function getDataEmptyInvestigations(branchId?: number) {
    const rows = await fetchDataEmptyInvestigations(branchId);

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
            branch: {
                id: row.branch_id,
                name: row.branch_name,
                address: row.branch_address,
                telephone: row.branch_telephone,
                version: row.branch_version,
            },
            version: row.version,
        });
    });

    return registrations;
}

export async function getDataAddedInvestigations(limit: number, offset: number, patientId: number, startDate?: string, endDate?: string, refNumber?: number, branchId?: number, allReports?: boolean) {
    const { data, totalCount } = await fetchDataAddedInvestigations(offset, limit, startDate, endDate, patientId, refNumber, branchId, allReports);

    if (data.length === 0) {
        return { totalCount: 0, totalPages: 0, registrations: [] };
    }

    const registrations: DataEmptyTests[] = [];

    data.forEach(row => {
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
            branch: {
                id: row.branch_id,
                name: row.branch_name,
                address: row.branch_address,
                telephone: row.branch_telephone,
                version: row.branch_version,
            },
            version: row.version,
        });
    });

    const totalPages = Math.ceil(totalCount / limit);

    return { totalCount, registrations, totalPages };
}

export async function markInvestigationDataAsPrinted(investigationRegisterId: number, investigationId: number, userId: number) {
    const res = await markAsPrinted(true, investigationRegisterId, investigationId)
    await addAuditTrailRecord(userId, "Investigation marked as printed", { registrationId: investigationRegisterId, investigationId: investigationId });
    return res;
}

export async function markInvestigationDataAsDataAdded(data_added: boolean, investigationRegisterId: number, investigationId: number, userId: number) {
    const res = await markAsDataAdded(data_added, investigationRegisterId, investigationId);
    await addAuditTrailRecord(userId, "Investigation marked to add data again", { registrationId: investigationRegisterId, investigationId: investigationId });
    return res;
}