import { CROSS_ORIGIN } from "../../../shared/config/CORS";
import { searchPatientByName } from "../../../shared/services/patientService";

export const handler = async (event: any) => {
    const origin = event.headers?.origin;
    const responseOrigin = CROSS_ORIGIN.includes(origin) ? origin : CROSS_ORIGIN[0];

    try {
        const result = await searchPatientByName(event.queryStringParameters.query);

        if (result) {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': responseOrigin,
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT',
                },
                body: JSON.stringify({ message: 'Patient data retrieved successfully', content: result })
            };
        } else {
            return {
                statusCode: 404,
                headers: {
                    'Access-Control-Allow-Origin': responseOrigin,
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT',
                },
                body: JSON.stringify({ message: `No patient found for query: ${event.queryStringParameters.query}` })
            };
        }
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