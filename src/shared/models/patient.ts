import { PatientType } from "../types/patient";

export function validatePatient(patient: any) {
    if (
        !patient.id ||
        !patient.name ||
        !patient.gender ||
        !patient.date_of_birth ||
        !patient.contact_number
    ) {
        throw new Error('Invalid patient data');
    }

    const verifiedPatient: PatientType = {
        id: patient.id,
        name: patient.name,
        gender: patient.gender,
        date_of_birth: patient.date_of_birth,
        contact_number: patient.contact_number,
    }

    return verifiedPatient;
}
