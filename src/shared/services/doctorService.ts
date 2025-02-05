import { validateDoctor } from "../models/doctor";
import { fetchAllDoctors, fetchDoctorById, modifyDoctor, saveDoctor } from "../repositories/doctorRepository";

export async function addDoctor(Doctor: any) {
    const addingDoctor = validateDoctor(Doctor);

    return await saveDoctor(addingDoctor);
}

export async function getDoctorById(DoctorId: number) {
    if (DoctorId == undefined) {
        throw new Error("Doctor id must be defined");
    }
    return await fetchDoctorById(DoctorId);
}

export async function getAllDoctors(limit: number, offset: number, search?: string) {
    return await fetchAllDoctors(limit, offset, search);
}

export async function updateDoctor(id: number, DoctorDetails: any) {
    const updatingDoctor = validateDoctor(DoctorDetails);

    const oldDoctor = await fetchDoctorById(id);

    if (oldDoctor.version != updatingDoctor.version) {
        throw new Error("Version mismatch. Please fetch the latest version before updating!");
    } else {
        return await modifyDoctor(id, updatingDoctor);
    }
}

