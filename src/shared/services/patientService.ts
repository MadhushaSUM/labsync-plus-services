import { validatePatient } from "../models/patient";
import { fetchAllPatients, fetchPatientById, fetchPatientByName, modifyPatient, savePatient } from "../repositories/patientRepository";

export async function addPatient(patient: any) {
    const addingPatient = validatePatient(patient);

    return await savePatient(addingPatient);
}

export async function getPatientById(patientId: number) {
    if (patientId == undefined) {
        throw new Error("Patient id must be defined");
    }
    return await fetchPatientById(patientId);
}

export async function searchPatientByName(query: string) {
    if (query == undefined) {
        return;
    }
    return await fetchPatientByName(query);
}

export async function getAllPatients(limit: number, offset: number, search?: string) {
    return await fetchAllPatients(limit, offset, search);
}

export async function updatePatient(id: number, patientDetails: any) {
    const updatingPatient = validatePatient(patientDetails);

    const oldPatient = await fetchPatientById(id);

    if (oldPatient.version != updatingPatient.version) {
        throw new Error("Version mismatch. Please fetch the latest version before updating!");
    } else {
        return await modifyPatient(id, updatingPatient);
    }
}

