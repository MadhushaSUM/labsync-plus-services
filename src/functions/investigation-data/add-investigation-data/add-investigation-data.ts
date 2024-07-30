import { CROSS_ORIGIN } from "../../../shared/config/CORS";
import { addInvestigationData } from "../../../shared/services/investigationDataService";

export const handler = async (event: any) => {
    const { investigationRegisterId, investigationId } = event.queryStringParameters;

    try {
        const result = await addInvestigationData(investigationRegisterId, investigationId, JSON.parse(event.body));
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': CROSS_ORIGIN,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
            },
            body: JSON.stringify({ message: 'Investigation data added successfully', content: result })
        };
    } catch (error: any) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': CROSS_ORIGIN,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
            },
            body: JSON.stringify({ message: 'Validation Error', error: error.message })
        };
    }
}
