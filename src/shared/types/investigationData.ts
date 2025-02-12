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

export interface AnalysisData {
    totalTestNumber: number,
    pieChartData: {
        testId: number,
        testName: string,
        count: number,
        tests: {
            date: Date,
            refNumber?: number,
            testRegisterId: number,
            data?: object,
        }[]
    }[],
}

export interface FinancialAnalysisOutput {
    totalCost: number;
    totalPaid: number;
    periods: {
        startDate: Date;
        endDate: Date;
        periodCost: number;
        periodPaid: number;
        tests: {
            testId: number;
            testName: string;
            testTotalCost: number;
        }[]
    }[]
}