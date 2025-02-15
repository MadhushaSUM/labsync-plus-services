import { updateInvestigationRegistration } from "../../../shared/services/investigationRegistrationService";
import { checkUserSessionInfo } from "../../../shared/services/sessionService";

export const handler = async (event: any) => {
    const { userId } = event.queryStringParameters;
    const { id } = event.pathParameters;
    const invRegDetails = JSON.parse(event.body);

    try {
        const { isActive } = await checkUserSessionInfo(Number(userId));
        if (!isActive) {
            return {
                statusCode: 401,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                },
                body: JSON.stringify({ message: "No active session!" })
            };
        }

        const result = await updateInvestigationRegistration(id, invRegDetails);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            },
            body: JSON.stringify({ message: 'Investigation registration updated successfully', content: result })
        };
    } catch (error: any) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            },
            body: JSON.stringify({ message: error.message || error.toString() }),
        };
    }
};