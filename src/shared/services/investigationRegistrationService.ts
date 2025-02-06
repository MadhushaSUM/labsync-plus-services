import { validateInvestigationRegister, validateUpdatingInvestigationRegister } from "../models/investigationRegistration";
import { fetchAllInvestigationRegistrations, fetchInvestigationRegistrationById, modifyInvestigationRegistration, saveInvestigationRegistration } from "../repositories/investigationRegistrationRepository";
import { Registration } from "../types/investigationRegistration";
import { addAuditTrailRecord } from "./auditTrailService";

export async function addInvestigationRegistration(invReg: any) {
    const addingInvReg = await validateInvestigationRegister(invReg);



    const res = await saveInvestigationRegistration({
        patientId: addingInvReg.patient_id,
        date: addingInvReg.date,
        branchId: addingInvReg.branch_id,
        investigations: addingInvReg.investigations,
        totalCost: addingInvReg.totalCost,
        paidPrice: addingInvReg.paid,
        doctorId: addingInvReg.doctor_id,
        refNumber: addingInvReg.refNumber,
    });

    //TODO: update userId 
    addAuditTrailRecord("user001", "Add registration", addingInvReg);

    return res;
}

export async function getAllInvestigationRegistrations(limit: number, offset: number, patientId: number, startDate?: string, endDate?: string, refNumber?: number) {
    const rows = await fetchAllInvestigationRegistrations(offset, limit, startDate, endDate, patientId, refNumber);

    if (rows.length === 0) {
        return { totalCount: 0, totalPages: 0, registrations: [] };
    }

    const totalCount = parseInt(rows[0].total_count, 10);

    const registrations: Registration[] = [];
    const registrationMap = new Map<number, Registration>();

    rows.forEach(row => {
        if (!registrationMap.has(row.registrations_id)) {
            const registration: Registration = {
                id: row.registrations_id,
                date: row.date,
                patient: {
                    id: row.patient_id,
                    name: row.patient_name,
                    gender: row.patient_gender,
                    date_of_birth: row.patient_date_of_birth,
                    whatsapp_number: row.patient_whatsapp_number,
                    version: row.patient_version
                },
                ref_number: row.ref_number,
                total_cost: row.total_cost,
                paid_price: row.paid_price,
                collected: row.collected,
                registeredTests: [],
                version: row.registration_version,
            };
            registrationMap.set(row.registrations_id, registration);
            registrations.push(registration);
        }

        const registration: Registration = registrationMap.get(row.registrations_id)!;
        registration.registeredTests.push({
            test: {
                id: row.test_id,
                name: row.test_name,
                code: row.test_code,
                price: row.test_price,
                version: row.test_version,
            },
            doctor: row.doctor_id
                ? {
                    id: row.doctor_id,
                    name: row.doctor_name,
                    version: row.doctor_version,
                }
                : null,
            data: row.data,
            options: row.options,
            data_added: row.data_added,
            printed: row.printed,
            version: row.registration_test_version,
        });
    });

    const totalPages = Math.ceil(totalCount / limit);

    return { totalCount, registrations, totalPages };
}

export async function getInvestigationRegistrationById(invRegId: number) {
    if (invRegId == undefined) {
        throw new Error("Investigation registration id must be defined");
    }

    const rows = await fetchInvestigationRegistrationById(invRegId);

    if (rows.length === 0) {
        return null;
    }

    const registration: Registration = {
        id: rows[0].registrations_id,
        date: rows[0].date,
        patient: {
            id: rows[0].patient_id,
            name: rows[0].patient_name,
            gender: rows[0].patient_gender,
            date_of_birth: rows[0].patient_date_of_birth,
            whatsapp_number: rows[0].patient_whatsapp_number,
            version: rows[0].patient_version,
        },
        ref_number: rows[0].ref_number,
        total_cost: rows[0].total_cost,
        paid_price: rows[0].paid_price,
        collected: rows[0].collected,
        version: rows[0].registration_version,
        registeredTests: rows.map(row => ({
            test: {
                id: row.test_id,
                name: row.test_name,
                code: row.test_code,
                price: row.test_price,
                version: row.test_version
            },
            doctor: row.doctor_id
                ? {
                    id: row.doctor_id,
                    name: row.doctor_name,
                    version: row.doctor_version
                }
                : null,
            data: row.data,
            options: row.options,
            data_added: row.data_added,
            printed: row.printed,
            version: row.registration_test_version,
        })),
    };

    return registration;
}

export async function updateInvestigationRegistration(id: number, invReg: any) {
    const newInvReg = await validateUpdatingInvestigationRegister(invReg);

    const oldInvReg = await getInvestigationRegistrationById(id);

    if (oldInvReg) {
        if (oldInvReg.version != newInvReg.version) {
            throw new Error("Version mismatch. Please fetch the latest version before updating!");
        } else {
            // if updating previous data added investigations must still in investigations 
            const dataAddedRegisteredTests = oldInvReg.registeredTests.filter(test => test.data_added);

            for (const dataAddedRegisteredTest of dataAddedRegisteredTests) {

                if (!newInvReg.investigations.find((invId: number) => invId === Number(dataAddedRegisteredTest.test.id))) {
                    throw new Error("Can not remove previously data added investigations");
                }
            }

            const previousTestIds = oldInvReg.registeredTests.map(test => Number(test.test.id));

            const res = await modifyInvestigationRegistration(id, {
                id: newInvReg.id,
                patientId: newInvReg.patient_id,
                branch_id: newInvReg.branch_id,
                doctorId: newInvReg.doctor_id || null,
                refNumber: newInvReg.refNumber,
                date: newInvReg.date,
                testIds: newInvReg.investigations,
                dataAddedTestIds: oldInvReg.registeredTests.filter(item => item.data_added).map(item => Number(item.test.id)),
                previousTestIds: previousTestIds,
                totalCost: newInvReg.totalCost,
                paidPrice: newInvReg.paid,
                collected: newInvReg.collected,
                version: newInvReg.version
            });

            //TODO: update userId 
            addAuditTrailRecord("user001", "Update registration", { new: newInvReg, old: oldInvReg });

            return res;
        }
    } else {
        throw new Error(`No previous record under id: ${invReg.id}`);
    }
}