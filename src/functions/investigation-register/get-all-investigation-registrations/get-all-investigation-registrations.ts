import { CROSS_ORIGIN } from "../../../shared/config/CORS";
import { getAllInvestigationRegistrations } from "../../../shared/services/investigationRegistrationService";

export const handler = async (event: any) => {
    const { limit, offset, filterUnconfirmed } = event.queryStringParameters;

    try {
        const result = await getAllInvestigationRegistrations(limit, offset, filterUnconfirmed);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': CROSS_ORIGIN,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
            },
            body: JSON.stringify({ content: result })
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