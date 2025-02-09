import { InvestigationBase } from "../models/investigation/investigationBase";

export interface InvestigationData {
    investigation_registration_id: number;
    investigation_id: number;
    doctor_id?: number;
    data: InvestigationBase;
    options: object;
    data_added: boolean;
    printed: boolean;
    version: number;
}

export interface DataEmptyTests {
    testRegisterId: number;
    testId: number;
    date: Date;
    testName: string;
    patientId: number;
    patientName: string;
    patientDOB: Date;
    patientGender: string;
    options: Record<string, any>;
    ref_number?: number;
    doctorId?: number;
    doctorName?: string;
    data?: Record<string, any>;
    version: number;
}