import { updateInvestigationPrice } from "../../../shared/services/investigationService";
import { checkUserSessionInfo } from "../../../shared/services/sessionService";

export const handler = async (event: any) => {
    const { userId } = event.queryStringParameters;
    const { id } = event.pathParameters;
    const investigationDetails = JSON.parse(event.body);

    try {
        const { isActive, isAdmin } = await checkUserSessionInfo(Number(userId));
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
        if (!isAdmin) {
            return {
                statusCode: 403,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                },
                body: JSON.stringify({ message: "Admin privileges required!" })
            };
        }

        const result = await updateInvestigationPrice(id, investigationDetails, userId);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            },
            body: JSON.stringify({ message: 'Investigation price updated successfully', content: result })
        };
    } catch (error: any) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            },
            body: JSON.stringify({ message: error.message || error.toString() })
        };
    }
};
