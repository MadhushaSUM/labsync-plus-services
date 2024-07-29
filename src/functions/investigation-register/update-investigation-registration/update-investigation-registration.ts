import { updateInvestigationRegistration } from "../../../shared/services/investigationRegistrationService";

export const handler = async (event: any) => {
    const { id } = event.pathParameters;
    const invRegDetails = JSON.parse(event.body);

    try {
        const result = await updateInvestigationRegistration(id, invRegDetails);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Investigation registration updated successfully', registration: result })
        };
    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
        };
    }
};