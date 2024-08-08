import { DoctorType } from "./doctor";
import { PatientType } from "./patient";

export interface InvestigationRegistrationType {
    id?: number;
    date: string;
    patient_id: string;
    doctor_id: string;
    investigations: number[];
    data_added_investigations: number[];
    cost: number;
    is_confirmed: boolean;
    // branch_id: string;
}

export interface InvestigationRegistrationResponseType {
    id?: number;
    date: string;
    patient: PatientType;
    doctor: DoctorType;
    investigations: number[];
    data_added_investigations: number[];
    cost: number;
    is_confirmed: boolean;
    // branch_id: string;
}

