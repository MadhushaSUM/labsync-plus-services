import { updateUser } from "../../../shared/services/authService";
import { checkUserSessionInfo } from "../../../shared/services/sessionService";

export const handler = async (event: any) => {
    const { userId } = event.queryStringParameters;
    const { id } = event.pathParameters;
    const userDetails = JSON.parse(event.body);

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

        const result = await updateUser(id, userDetails);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            },
            body: JSON.stringify({ message: 'User updated successfully', content: result })
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
