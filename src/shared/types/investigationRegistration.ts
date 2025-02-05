import { DoctorType } from "./doctor";
import { Test } from "./Investigation";
import { PatientType } from "./patient";

export interface RegisteredTest {
    test: Test;
    doctor: DoctorType | null;
    data: Record<string, any>;
    options: Record<string, any>;
    data_added: boolean;
    printed: boolean;
    version: number;
}

export interface Registration {
    id: number;
    date: Date;
    patient: PatientType;
    ref_number?: number;
    total_cost: number;
    paid_price: number;
    collected: boolean;
    registeredTests: RegisteredTest[];
    version: number;
}
