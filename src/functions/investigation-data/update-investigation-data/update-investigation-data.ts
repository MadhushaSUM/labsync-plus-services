import { CROSS_ORIGIN } from "../../../shared/config/CORS";
import { updateInvestigationData } from "../../../shared/services/investigationDataService";

export const handler = async (event: any) => {
    const { id } = event.pathParameters;
    const { investigationId } = event.queryStringParameters;
    const inverstigationDataDetails = JSON.parse(event.body);

    try {
        const result = await updateInvestigationData(id, investigationId, inverstigationDataDetails);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': CROSS_ORIGIN,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
            },
            body: JSON.stringify({ message: 'Investigation data updated successfully', content: result })
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
