import { CROSS_ORIGIN } from "../../../shared/config/CORS";
import { updateDoctor } from "../../../shared/services/doctorService";

export const handler = async (event: any) => {
    const { id } = event.pathParameters;
    const doctorDetails = JSON.parse(event.body);

    try {
        const result = await updateDoctor(id, doctorDetails);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': CROSS_ORIGIN,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
            },
            body: JSON.stringify({ message: 'Doctor updated successfully', content: result })
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
