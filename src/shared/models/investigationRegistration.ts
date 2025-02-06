import { getInvestigationRegistrationById } from "../services/investigationRegistrationService";

export async function validateInvestigationRegister(invReg: any) {
    if (
        !invReg.date ||
        !invReg.patient_id ||
        !invReg.investigations ||
        !invReg.totalCost ||
        !invReg.branch_id ||
        !invReg.version
    ) {
        throw new Error('Invalid investigation register data');
    }

    const verifiedInvReg:
        {
            date: Date;
            patient_id: number;
            doctor_id?: number;
            investigations: number[],
            totalCost: number;
            paid: number;
            branch_id: number;
            refNumber?: number;
            version: number;
        } = {
        date: new Date(invReg.date),
        patient_id: invReg.patient_id,
        doctor_id: invReg.doctor_id,
        investigations: Array.from(new Set(invReg.investigations)),
        totalCost: invReg.totalCost,
        paid: invReg.paid,
        branch_id: invReg.branch_id,
        refNumber: invReg.refNumber,
        version: invReg.version,
    }

    return verifiedInvReg;
}

export async function validateUpdatingInvestigationRegister(invReg: any) {
    if (
        !invReg.id ||
        !invReg.patient_id ||
        !invReg.doctor_id ||
        !invReg.date ||
        !invReg.investigations ||
        !invReg.totalCost ||
        !invReg.paid ||
        invReg.collected == undefined ||
        !invReg.branch_id ||
        !invReg.version
    ) {
        throw new Error('Invalid investigation register data');
    }

    const verifiedInvReg: {
        id: number;
        patient_id: number;
        doctor_id?: number;
        refNumber: number | null;
        date: Date;
        investigations: number[],
        totalCost: number;
        paid: number;
        collected: boolean;
        branch_id: number;
        version: number;
    } = {
        id: invReg.id,
        patient_id: invReg.patient_id,
        doctor_id: invReg.doctor_id,
        refNumber: invReg.refNumber ? invReg.refNumber : null,
        date: new Date(invReg.date),
        investigations: invReg.investigations.map((id: string) => Number(id)),
        totalCost: invReg.totalCost,
        paid: invReg.paid,
        collected: invReg.collected,
        branch_id: invReg.branch_id,
        version: invReg.version,
    }

    return verifiedInvReg;
}