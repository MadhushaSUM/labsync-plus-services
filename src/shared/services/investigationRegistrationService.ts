import { validateInvestigationRegister } from "../models/investigationRegistration";
import { fetchInvestigationRegistrationById, modifyInvestigationRegistration, saveInvestigationRegistration } from "../repositories/investigationRegistrationRepository";

export async function addInvestigationRegistration(invReg: any) {
    const addingInvReg = await validateInvestigationRegister(invReg);
    
    return await saveInvestigationRegistration(addingInvReg);
}

export async function getInvestigationRegistrationById(invRegId: string) {
    if (invRegId == undefined) {
        throw new Error("Investigation registration id must be defined");
    }
    return await fetchInvestigationRegistrationById(invRegId);
}

export async function updateInvestigationRegistration(id: string, invReg: any) {
    const addingInvReg = await validateInvestigationRegister(invReg, true);

    return await modifyInvestigationRegistration(id, addingInvReg);
}