import { validateInvestigationRegister } from "../models/investigationRegistration";
import { addInvestigationToDataAdded, fetchAllInvestigationRegistrations, fetchInvestigationRegistrationById, modifyInvestigationRegisterConfirmation, modifyInvestigationRegistration, saveInvestigationRegistration } from "../repositories/investigationRegistrationRepository";
import { InvestigationRegistrationResponseType } from "../types/investigationRegistration";

export async function addInvestigationRegistration(invReg: any) {
    const addingInvReg = await validateInvestigationRegister(invReg);

    return await saveInvestigationRegistration(addingInvReg);
}

export async function getAllInvestigationRegistrations(limit: number, offset: number, filterUnconfirmed: boolean) {
    const results = await fetchAllInvestigationRegistrations(limit, offset, filterUnconfirmed);

    let invRegs: InvestigationRegistrationResponseType[] = [];
    for (const result of results.content) {
        invRegs.push({
            id: result.id,
            date: result.date,
            patient: {
                name: result.patient_name,
                gender: result.gender,
                date_of_birth: result.date_of_birth,
                whatsapp_number: result.whatsapp_number,
                version: result.patient_version,            
            },
            doctor: {
                name: result.doctor_name,
                version: result.doctor_version
            },
            investigations: result.investigations,
            data_added_investigations: result.data_added_investigations,
            cost: result.cost,
            is_confirmed: result.is_confirmed
        });
    }

    return { content: invRegs, totalPages: results.totalPages, totalCount: results.totalCount };
}

export async function getInvestigationRegistrationById(invRegId: number) {
    if (invRegId == undefined) {
        throw new Error("Investigation registration id must be defined");
    }
    return await fetchInvestigationRegistrationById(invRegId);
}

export async function updateInvestigationRegistration(id: number, invReg: any) {
    const addingInvReg = await validateInvestigationRegister(invReg, true);

    return await modifyInvestigationRegistration(id, addingInvReg);
}

export async function markInvestigationRegistrationConfirmed(id: number) {
    return await modifyInvestigationRegisterConfirmation(id, true);
}

export async function addInvestigationToDataAddedList(invRegId: number, investigationId: number) {
    return await addInvestigationToDataAdded(invRegId, investigationId);
}