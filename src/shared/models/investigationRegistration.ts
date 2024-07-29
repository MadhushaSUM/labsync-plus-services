import { fetchInvestigationRegistrationById } from "../repositories/investigationRegistrationRepository";
import { getDoctorById } from "../services/doctorService";
import { checkInvalidInvestigationIds } from "../services/investigationService";
import { getPatientById } from "../services/patientService";
import { InvestigationRegistrationType } from "../types/investigationRegistration";

export async function validateInvestigationRegister(invReg: any, isUpdate: boolean = false) {
    if (
        !invReg.id ||
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

    // verify patient id
    const patient = await getPatientById(invReg.patient_id);
    if (!patient) throw new Error("Invalid patient id");

    // verify doctor id
    const doctor = await getDoctorById(invReg.doctor_id);
    if (!doctor) throw new Error("Invalid doctor id");

    // verify investigation ids
    let missingIds;
    if (invReg.data_added_investigations) {
        missingIds = await checkInvalidInvestigationIds(invReg.investigations.concat(invReg.data_added_investigations));
    } else {
        missingIds = await checkInvalidInvestigationIds(invReg.investigations);
    }
    if (missingIds.length != 0) throw new Error("Invalid investigation ids");

    if (isUpdate) {
        const previousReg = await fetchInvestigationRegistrationById(invReg.id);
        if (previousReg) {
            // if updating previous data added investigations must still in investigations 
            for (const prevDataAddedInvestigationId of previousReg.data_added_investigations) {
                if (!invReg.investigations.find((invId: string) => invId === prevDataAddedInvestigationId)) {
                    throw new Error("Can not remove previously data added investigations");
                }
            }

            // if registration is confirmed before
            if (previousReg.is_confirmed) {
                throw new Error("Can not edit confirmed registrations");
            }
        } else {
            throw new Error(`No previous record under id: ${invReg.id}`);
        }
    }

    //TODO: verify branch id

    const verifiedInvReg: InvestigationRegistrationType = {
        id: invReg.id,
        date: invReg.date,
        patient_id: invReg.patient_id,
        doctor_id: invReg.doctor_id,
        investigations: invReg.investigations,
        data_added_investigations: [],
        cost: invReg.cost,
        is_confirmed: false
        //TODO: branch_id: invReg.branch_id
    }

    if (isUpdate) {
        verifiedInvReg.is_confirmed = invReg.is_confirmed;
        verifiedInvReg.data_added_investigations = invReg.data_added_investigations;
    }

    return verifiedInvReg;
}