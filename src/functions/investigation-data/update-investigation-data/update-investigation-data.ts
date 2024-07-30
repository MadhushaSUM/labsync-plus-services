import { updateInvestigationData } from "../../../shared/services/investigationDataService";

export const handler = async (event: any) => {
    const { id } = event.pathParameters;
    const { investigationId } = event.queryStringParameters;
    const inverstigationDataDetails = JSON.parse(event.body);

    try {
        const result = await updateInvestigationData(id, investigationId, inverstigationDataDetails);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Investigation data updated successfully', data: result })
        };
    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
        };
    }
};
