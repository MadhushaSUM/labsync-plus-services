import { getDoctorById } from "../../../shared/services/doctorService";

export const handler = async (event: any) => {
    try {
        const result = await getDoctorById(event.queryStringParameters.doctorId);
        if (result) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Doctor data retrieved successfully', doctor: result })
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: `No doctor found for id: ${event.queryStringParameters.doctorId}` })
            };
        }
    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
        };
    }
};