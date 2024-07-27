import { getAllPatients } from "../../../shared/services/patientService";


export const handler = async (event: any) => {
    const { limit, lastEvaluatedKey } = JSON.parse(event.body);

    try {
        const result = await getAllPatients(limit, lastEvaluatedKey);
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
        };
    }
};
