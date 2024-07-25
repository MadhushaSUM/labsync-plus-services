import { validatePatient } from "../models/patient";
import { savePatient } from "../repositories/patientRepository";

export async function addPatient(patient: any) {
    const addingPatient = validatePatient(patient);

    return await savePatient(addingPatient);
}

