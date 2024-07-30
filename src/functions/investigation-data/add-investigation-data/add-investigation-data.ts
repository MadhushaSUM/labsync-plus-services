import { addInvestigationData } from "../../../shared/services/investigationDataService";

export const handler = async (event: any) => {
    const { investigationRegisterId, investigationId } = event.queryStringParameters;

    try {
        const result = await addInvestigationData(investigationRegisterId, investigationId, JSON.parse(event.body));
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Investigation data added successfully', data: result })
        };
    } catch (error: any) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Validation Error', error: error.message })
        };
    }
}
