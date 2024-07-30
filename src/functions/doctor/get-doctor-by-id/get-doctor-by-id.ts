import { CROSS_ORIGIN } from "../../../shared/config/CORS";
import { getDoctorById } from "../../../shared/services/doctorService";

export const handler = async (event: any) => {
    try {
        const result = await getDoctorById(event.queryStringParameters.doctorId);
        if (result) {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': CROSS_ORIGIN,
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT',
                },
                body: JSON.stringify({ message: 'Doctor data retrieved successfully', content: result })
            };
        } else {
            return {
                statusCode: 404,
                headers: {
                    'Access-Control-Allow-Origin': CROSS_ORIGIN,
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT',
                },
                body: JSON.stringify({ message: `No doctor found for id: ${event.queryStringParameters.doctorId}` })
            };
        }
    } catch (error: any) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': CROSS_ORIGIN,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
            },
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
        };
    }
};