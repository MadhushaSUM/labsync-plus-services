import { CROSS_ORIGIN } from '../../../shared/config/CORS';
import { updatePatient } from '../../../shared/services/patientService';

export const handler = async (event: any) => {
    const { id } = event.pathParameters;
    const patientDetails = JSON.parse(event.body);    

    try {
        const result = await updatePatient(id, patientDetails);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': CROSS_ORIGIN,
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
            },
            body: JSON.stringify({ message: 'Patient updated successfully', content: result })
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
