import { getInvestigationData } from "../../../shared/services/investigationDataService";

export const handler = async (event: any) => {
    const { investigationRegisterId, investigationId } = event.queryStringParameters;

    try {
        const result = await getInvestigationData(investigationRegisterId, investigationId);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Investigation data retrieved successfully', data: result })
        };
    } catch (error: any) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Validation Error', error: error.message })
        };
    }
}
