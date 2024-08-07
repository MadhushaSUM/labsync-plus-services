import { getInvestigationRegistrationById } from "../services/investigationRegistrationService";
import { InvestigationRegistrationType } from "../types/investigationRegistration";

export async function validateInvestigationRegister(invReg: any, isUpdate: boolean = false) {
    if (
        !invReg.date ||
        !invReg.patient_id ||
        !invReg.doctor_id ||
        !invReg.investigations ||
        !invReg.cost
        // !invReg.branch_id 
    ) {
        throw new Error('Invalid investigation register data');
    }

    if (isUpdate &&
        (!invReg.data_added_investigations ||
            invReg.is_confirmed == undefined)
    ) {
        throw new Error('Invalid investigation register data');
    }

    if (isUpdate) {
        const previousReg = await getInvestigationRegistrationById(invReg.id);
        if (previousReg) {
            // if registration is confirmed before
            if (previousReg.is_confirmed) {
                throw new Error("Can not edit confirmed registrations");
            }

            // if updating previous data added investigations must still in investigations 
            for (const prevDataAddedInvestigationId of previousReg.data_added_investigations) {
                if (!invReg.investigations.find((invId: number) => invId === prevDataAddedInvestigationId)) {
                    throw new Error("Can not remove previously data added investigations");
                }
            }
        } else {
            throw new Error(`No previous record under id: ${invReg.id}`);
        }
    }

    //TODO: verify branch id

    const verifiedInvReg: InvestigationRegistrationType = {
        date: invReg.date,
        patient_id: invReg.patient_id,
        doctor_id: invReg.doctor_id,
        investigations: Array.from(new Set(invReg.investigations)),
        data_added_investigations: [],
        cost: invReg.cost,
        is_confirmed: false
        //TODO: branch_id: invReg.branch_id
    }

    if (isUpdate) {
        verifiedInvReg.id = invReg.id;
        verifiedInvReg.is_confirmed = invReg.is_confirmed;
        verifiedInvReg.data_added_investigations = Array.from(new Set(invReg.data_added_investigations));
    }

    return verifiedInvReg;
}