import { getDataAddedInvestigations } from "../../../shared/services/investigationDataService";
import { checkUserSessionInfo } from "../../../shared/services/sessionService";

export const handler = async (event: any) => {
    const { limit, offset, patientId, startDate, endDate, refNumber, allReports, userId } = event.queryStringParameters;

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

        const result = await getDataAddedInvestigations(limit, offset, patientId, startDate, endDate, refNumber, allReports);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            },
            body: JSON.stringify({ content: result.registrations, totalPages: result.totalPages, totalElements: result.totalCount })
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
