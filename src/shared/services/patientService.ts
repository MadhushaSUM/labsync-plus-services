import { Key } from "aws-sdk/clients/dynamodb";
import { validatePatient } from "../models/patient";
import { fetchAllPatients, fetchPatientById, modifyPatient, savePatient } from "../repositories/patientRepository";

export async function addPatient(patient: any) {
    const addingPatient = validatePatient(patient);

    return await savePatient(addingPatient);
}

export async function getPatientById(patientId: string) {
    if (patientId == undefined) {
        throw new Error("Patient id must be defined");
    }
    return await fetchPatientById(patientId);
}

export async function getAllPatients(limit: number, lastEvaluatedKey: Key) {
    return await fetchAllPatients(limit, lastEvaluatedKey);
}

export async function updatePatient(id: string, patientDetails: any) {
    const updatingPatient = validatePatient(patientDetails);

    return await modifyPatient(id, updatingPatient);
}

