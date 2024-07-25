"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePatient = validatePatient;
function validatePatient(patient) {
    if (!patient.id || !patient.name || !patient.address || !patient.date_of_birth || !patient.contact_number) {
        throw new Error('Invalid patient data');
    }
    const addingPatient = {
        id: patient.id,
        name: patient.name,
        address: patient.address,
        date_of_birth: patient.date_of_birth,
        conatact_number: patient.conatact_number,
    };
    return addingPatient;
}
