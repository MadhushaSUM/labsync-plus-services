import { markInvestigationRegistrationConfirmed } from "../../../shared/services/investigationRegistrationService";

export const handler = async (event: any) => {
    const { id } = event.queryStringParameters;

    try {
        await markInvestigationRegistrationConfirmed(id);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Investigation registration confirmed successfully` })
        };
    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
        };
    }
};