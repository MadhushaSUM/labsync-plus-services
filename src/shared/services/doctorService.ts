import { Key } from "aws-sdk/clients/dynamodb";
import { validateDoctor } from "../models/doctor";
import { fetchAllDoctors, fetchDoctorById, modifyDoctor, saveDoctor } from "../repositories/doctorRepository";

export async function addDoctor(Doctor: any) {
    const addingDoctor = validateDoctor(Doctor);

    return await saveDoctor(addingDoctor);
}

export async function getDoctorById(DoctorId: string) {
    if (DoctorId == undefined) {
        throw new Error("Doctor id must be defined");
    }
    return await fetchDoctorById(DoctorId);
}

export async function getAllDoctors(limit: number, lastEvaluatedKey: Key) {
    return await fetchAllDoctors(limit, lastEvaluatedKey);
}

export async function updateDoctor(id: string, DoctorDetails: any) {
    const updatingDoctor = validateDoctor(DoctorDetails);

    return await modifyDoctor(id, updatingDoctor);
}

