import { getInvestigationRegistrationById } from "../services/investigationRegistrationService";

export async function validateInvestigationRegister(invReg: any) {
    if (
        !invReg.date ||
        !invReg.patient_id ||
        !invReg.doctor_id ||
        !invReg.investigations ||
        !invReg.totalCost ||
        !invReg.branch_id ||
        !invReg.version
    ) {
        throw new Error('Invalid investigation register data');
    }

    const verifiedInvReg:
        {
            id?: number;
            date: Date;
            patient_id: number;
            doctor_id: number;
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
        totalCost: invReg.cost,
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
        !invReg.dataAddedInvestigations ||
        !invReg.totalCost ||
        !invReg.paid ||
        !invReg.collected ||
        !invReg.branch_id ||
        !invReg.version
    ) {
        throw new Error('Invalid investigation register data');
    }

    const previousReg = await getInvestigationRegistrationById(invReg.id);
    if (previousReg) {
        // if updating previous data added investigations must still in investigations 
        const dataAddedRegisteredTests = previousReg.registeredTests.filter(test => test.data_added);
        for (const dataAddedRegisteredTest of dataAddedRegisteredTests) {

            if (!invReg.investigations.find((invId: number) => invId === dataAddedRegisteredTest.test.id)) {
                throw new Error("Can not remove previously data added investigations");
            }
        }
    } else {
        throw new Error(`No previous record under id: ${invReg.id}`);
    }

    const verifiedInvReg: {
        id: number;
        patient_id: number;
        doctor_id: number;
        refNumber: number | null;
        date: Date;
        investigations: number[],
        dataAddedInvestigations: number[],
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
        investigations: Array.from(new Set(invReg.investigations)),
        dataAddedInvestigations: Array.from(new Set(invReg.dataAddedInvestigations)),
        totalCost: invReg.cost,
        paid: invReg.paid,
        collected: invReg.collected,
        branch_id: invReg.branch_id,
        version: invReg.version,
    }

    return verifiedInvReg;
}