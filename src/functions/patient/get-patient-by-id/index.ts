import { getPatientById } from "../../../shared/services/patientService";

export const handler = async (event: any) => {
    try {
        const result = await getPatientById(event.queryStringParameters.patientId);
        if (result) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Patient data retrieved successfully', patient: result })
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: `No patient found for id: ${event.queryStringParameters.patientId}` })
            };
        }
    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
        };
    }
};