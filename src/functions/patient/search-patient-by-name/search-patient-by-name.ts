import { searchPatientByName } from "../../../shared/services/patientService";

export const handler = async (event: any) => {

    try {
        const result = await searchPatientByName(event.queryStringParameters.query);

        if (result) {
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                },
                body: JSON.stringify({ message: 'Patient data retrieved successfully', content: result })
            };
        } else {
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                },
                body: JSON.stringify({ message: `No patient found for query: ${event.queryStringParameters.query}` })
            };
        }
    } catch (error: any) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            },
            body: JSON.stringify({ message: error.message || error.toString() }),
        };
    }
};