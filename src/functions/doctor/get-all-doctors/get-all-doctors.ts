import { CROSS_ORIGIN } from "../../../shared/config/CORS";
import { getAllDoctors } from "../../../shared/services/doctorService";

export const handler = async (event: any) => {
    const { limit, offset } = event.queryStringParameters;

    try {
        const result = await getAllDoctors(limit, offset);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': CROSS_ORIGIN,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
            },
            body: JSON.stringify({ content: result.doctors, totalPages: result.totalPages, totalElements: result.totalCount })
        };
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
