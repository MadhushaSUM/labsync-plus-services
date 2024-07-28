import { addPatient } from "../../../shared/services/patientService"

export const handler = async (event: any) => {
    const patientDetails = JSON.parse(event.body);

    try {
        const result = await addPatient(patientDetails);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Patient added successfully', patient: result })
        };
    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
        };
    }
};
