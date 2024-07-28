import { getDoctorById } from "../services/doctorService";
import { checkInvalidInvestigationIds } from "../services/investigationService";
import { getPatientById } from "../services/patientService";
import { InvestigationRegistrationType } from "../types/investigationRegistration";

export async function validateInvestigationRegister(invReg: any) {
    if (
        !invReg.id ||
        !invReg.date ||
        !invReg.patient_id ||
        !invReg.doctor_id ||
        !invReg.investigations ||
        !invReg.data_added_investigations ||
        !invReg.cost ||
        invReg.is_confirmed == undefined
        // !invReg.branch_id 
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
    const missingIds = await checkInvalidInvestigationIds(invReg.investigations.concat(invReg.data_added_investigations));
    if (missingIds.length != 0) throw new Error("Invalid investigation ids");

    // TODO: verify branch id

    const verifiedInvReg: InvestigationRegistrationType = {
        id: invReg.id,
        date: invReg.name,
        patient_id: invReg.patient_id,
        doctor_id: invReg.doctor_id,
        investigations: invReg.investigations,
        data_added_investigations: invReg.data_added_investigations,
        cost: invReg.cost,
        is_confirmed: invReg.is_confirmed,
        // branch_id: invReg.branch_id
    }

    return verifiedInvReg;
}