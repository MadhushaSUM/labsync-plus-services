import { CROSS_ORIGIN } from "../../../shared/config/CORS";
import { getAllInvestigationRegistrations } from "../../../shared/services/investigationRegistrationService";

export const handler = async (event: any) => {
    const { limit, offset, filterUnconfirmed } = event.queryStringParameters;
    const origin = event.headers?.origin;
    const responseOrigin = CROSS_ORIGIN.includes(origin) ? origin : CROSS_ORIGIN[0]; 

    try {
        const result = await getAllInvestigationRegistrations(limit, offset, filterUnconfirmed);

        const out = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': responseOrigin,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
            },
            body: JSON.stringify({ content: result.content, totalPages: result.totalPages, totalElements: result.totalCount })
        };
        console.log(out);

        return out;
        
    } catch (error: any) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': responseOrigin,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
            },
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
        };
    }
};