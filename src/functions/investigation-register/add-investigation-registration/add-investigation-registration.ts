import { CROSS_ORIGIN } from "../../../shared/config/CORS";
import { addInvestigationRegistration } from "../../../shared/services/investigationRegistrationService";

export const handler = async (event: any) => {
    const invRegDetails = JSON.parse(event.body);

    try {
        const result = await addInvestigationRegistration(invRegDetails);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': CROSS_ORIGIN,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
            },
            body: JSON.stringify({ message: 'Investigation registration added successfully', content: result })
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