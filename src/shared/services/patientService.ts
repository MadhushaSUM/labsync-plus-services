import { validatePatient } from "../models/patient";
import { fetchAllPatients, fetchPatientById, modifyPatient, savePatient } from "../repositories/patientRepository";

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

export async function getAllPatients(limit: number, offset: number) {
    return await fetchAllPatients(limit, offset);
}

export async function updatePatient(id: number, patientDetails: any) {
    const updatingPatient = validatePatient(patientDetails);

    return await modifyPatient(id, updatingPatient);
}

