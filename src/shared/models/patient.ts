import { PatientType } from "../types/patient";

export function validatePatient(patient: any) {
    if (!patient.id || !patient.name || !patient.address || !patient.date_of_birth || !patient.contact_number) {
        throw new Error('Invalid patient data');
    }

    const addingPatient: PatientType = {
        id: patient.id,
        name: patient.name,
        address: patient.address,
        date_of_birth: patient.date_of_birth,
        contact_number: patient.contact_number,
    }

    return addingPatient;
}
