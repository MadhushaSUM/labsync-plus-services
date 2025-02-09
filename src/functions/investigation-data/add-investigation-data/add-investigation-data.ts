import { addInvestigationData } from "../../../shared/services/investigationDataService";

export const handler = async (event: any) => {
    const { investigationRegisterId, investigationId } = event.queryStringParameters;    

    try {
        const result = await addInvestigationData(investigationRegisterId, investigationId, JSON.parse(event.body));
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            },
            body: JSON.stringify({ message: result.new ? 'Investigation data added successfully' : 'Investigation data updated successfully', content: result.content })
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
}
