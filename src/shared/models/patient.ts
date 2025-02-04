import { PatientType } from "../types/patient";

export function validatePatient(patient: any) {
    if (
        // !patient.id ||
        !patient.name ||
        !patient.gender ||
        !patient.date_of_birth ||
        !patient.version
    ) {
        throw new Error('Invalid patient data');
    }

    const verifiedPatient: PatientType = {
        // id: patient.id,
        name: patient.name,
        gender: patient.gender,
        date_of_birth: patient.date_of_birth,
        whatsapp_number: patient.whatsapp_number,
        version: patient.version,
    }

    return verifiedPatient;
}
