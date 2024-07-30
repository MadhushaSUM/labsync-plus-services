import { CROSS_ORIGIN } from "../../../shared/config/CORS";
import { updateInvestigationRegistration } from "../../../shared/services/investigationRegistrationService";

export const handler = async (event: any) => {
    const { id } = event.pathParameters;
    const invRegDetails = JSON.parse(event.body);

    try {
        const result = await updateInvestigationRegistration(id, invRegDetails);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': CROSS_ORIGIN,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
            },
            body: JSON.stringify({ message: 'Investigation registration updated successfully', content: result })
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