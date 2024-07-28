import { addInvestigationRegistration } from "../../../shared/services/investigationRegistrationService";

export const handler = async (event: any) => {
    const invRegDetails = JSON.parse(event.body);

    try {
        const result = await addInvestigationRegistration(invRegDetails);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Investigation registration added successfully', registration: result })
        };
    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
        };
    }
};