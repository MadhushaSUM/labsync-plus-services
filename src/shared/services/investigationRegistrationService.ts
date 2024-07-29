import { Key } from "aws-sdk/clients/dynamodb";
import { validateInvestigationRegister } from "../models/investigationRegistration";
import { fetchAllInvestigationRegistrations, fetchInvestigationRegistrationById, modifyInvestigationRegisterConfirmation, modifyInvestigationRegistration, saveInvestigationRegistration } from "../repositories/investigationRegistrationRepository";

export async function addInvestigationRegistration(invReg: any) {
    const addingInvReg = await validateInvestigationRegister(invReg);

    return await saveInvestigationRegistration(addingInvReg);
}

export async function getAllInvestigationRegistrations(limit: number, lastEvaluatedKey: Key, filterUnconfirmed: boolean) {
    return await fetchAllInvestigationRegistrations(limit, lastEvaluatedKey, filterUnconfirmed);
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

export async function markInvestigationRegistrationConfirmed(id: string) {
    return await modifyInvestigationRegisterConfirmation(id, true);
}