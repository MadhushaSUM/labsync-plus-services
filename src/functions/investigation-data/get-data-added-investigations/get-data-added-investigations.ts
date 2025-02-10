import { getDataAddedInvestigations } from "../../../shared/services/investigationDataService";

export const handler = async (event: any) => {
    const { limit, offset, patientId, startDate, endDate, refNumber, allReports } = event.queryStringParameters;

    try {
        const result = await getDataAddedInvestigations(limit, offset, patientId, startDate, endDate, refNumber, allReports );

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
