import { DoctorType } from "../types/doctor";

export function validateDoctor(doctor: any) {
    if (
        !doctor.id ||
        !doctor.name
    ) {
        throw new Error('Invalid doctor data');
    }

    const verifiedDoctor: DoctorType = {
        id: doctor.id,
        name: doctor.name
    }

    return verifiedDoctor;
}
