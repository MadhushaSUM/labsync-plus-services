import { DoctorType } from "../types/doctor";

export function validateDoctor(doctor: any) {
    if (
        // !doctor.id ||
        !doctor.name ||
        !doctor.version
    ) {
        throw new Error('Invalid doctor data');
    }

    const verifiedDoctor: DoctorType = {
        // id: doctor.id,
        name: doctor.name,
        version: doctor.version,
    }

    return verifiedDoctor;
}
