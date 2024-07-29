import { getAllInvestigationRegistrations } from "../../../shared/services/investigationRegistrationService";

export const handler = async (event: any) => {
    const { limit, lastEvaluatedKey, filterUnconfirmed } = JSON.parse(event.body);

    try {
        const result = await getAllInvestigationRegistrations(limit, lastEvaluatedKey, filterUnconfirmed);
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