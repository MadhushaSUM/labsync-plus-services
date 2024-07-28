import { validateInvestigationRegister } from "../models/investigationRegistration";
import { saveInvestigationRegistration } from "../repositories/investigationRegistrationRepository";

export async function addInvestigationRegistration(invReg: any) {
    const addingInvReg = await validateInvestigationRegister(invReg);

    return await saveInvestigationRegistration(addingInvReg);
}