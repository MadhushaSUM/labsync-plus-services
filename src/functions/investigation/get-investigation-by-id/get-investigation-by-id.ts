import { CROSS_ORIGIN } from "../../../shared/config/CORS";
import { getInvestigationById } from "../../../shared/services/investigationService";
import { checkUserSessionInfo } from "../../../shared/services/sessionService";

export const handler = async (event: any) => {
    const { userId } = event.queryStringParameters;
    
    try {
        const { isActive } = await checkUserSessionInfo(Number(userId));
        if (!isActive) {
            return {
                statusCode: 401,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                },
                body: JSON.stringify({ message: "No active session!" })
            };
        }

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