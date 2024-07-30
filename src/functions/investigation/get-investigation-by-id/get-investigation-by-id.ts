import { CROSS_ORIGIN } from "../../../shared/config/CORS";
import { getInvestigationById } from "../../../shared/services/investigationService";

export const handler = async (event: any) => {
    try {
        const result = await getInvestigationById(event.queryStringParameters.investigationId);
        if (result) {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': CROSS_ORIGIN,
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT',
                },
                body: JSON.stringify({ message: 'Investigation data retrieved successfully', content: result })
            };
        } else {
            return {
                statusCode: 404,
                headers: {
                    'Access-Control-Allow-Origin': CROSS_ORIGIN,
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT',
                },
                body: JSON.stringify({ message: `No investigation found for id: ${event.queryStringParameters.investigationId}` })
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