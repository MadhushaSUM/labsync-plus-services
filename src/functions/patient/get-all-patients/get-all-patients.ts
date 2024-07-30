import { CROSS_ORIGIN } from "../../../shared/config/CORS";
import { getAllPatients } from "../../../shared/services/patientService";

export const handler = async (event: any) => {
    const limit = event.queryStringParameters.limit;
    const lastEvaluatedKey = event.queryStringParameters.lastEvaluatedKey ? JSON.parse(event.queryStringParameters.lastEvaluatedKey) : null;

    try {
        const result = await getAllPatients(limit, lastEvaluatedKey);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': CROSS_ORIGIN,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
            },
            body: JSON.stringify({ content: result.patients })
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
