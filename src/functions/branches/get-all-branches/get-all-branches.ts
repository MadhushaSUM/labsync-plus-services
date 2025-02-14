import { getAllBranches } from "../../../shared/services/branchService";

export const handler = async (event: any) => {
    const { limit, offset, search } = event.queryStringParameters;

    try {
        const result = await getAllBranches(limit, offset, search);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            },
            body: JSON.stringify({
                content: result.branches,
                totalPages: result.totalPages,
                totalElements: result.totalCount,
            }),
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

