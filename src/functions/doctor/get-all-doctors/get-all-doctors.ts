import { CROSS_ORIGIN } from "../../../shared/config/CORS";
import { getAllDoctors } from "../../../shared/services/doctorService";

export const handler = async (event: any) => {
    const { limit, lastEvaluatedKey } = JSON.parse(event.body);

    try {
        const result = await getAllDoctors(limit, lastEvaluatedKey);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': CROSS_ORIGIN,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
            },
            body: JSON.stringify({ content: result.doctors })
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
