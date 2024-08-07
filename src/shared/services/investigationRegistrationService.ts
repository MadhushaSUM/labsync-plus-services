import { validateInvestigationRegister } from "../models/investigationRegistration";
import { addInvestigationToDataAdded, fetchAllInvestigationRegistrations, fetchInvestigationRegistrationById, modifyInvestigationRegisterConfirmation, modifyInvestigationRegistration, saveInvestigationRegistration } from "../repositories/investigationRegistrationRepository";

export async function addInvestigationRegistration(invReg: any) {
    const addingInvReg = await validateInvestigationRegister(invReg);

    return await saveInvestigationRegistration(addingInvReg);
}

export async function getAllInvestigationRegistrations(limit: number, offset: number, filterUnconfirmed: boolean) {
    return await fetchAllInvestigationRegistrations(limit, offset, filterUnconfirmed);
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