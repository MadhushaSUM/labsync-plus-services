import { getInvestigationById } from "../../../shared/services/investigationService";

export const handler = async (event: any) => {
    try {
        const result = await getInvestigationById(event.queryStringParameters.investigationId);
        if (result) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Investigation data retrieved successfully', patient: result })
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: `No investigation found for id: ${event.queryStringParameters.investigationId}` })
            };
        }
    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
        };
    }
};