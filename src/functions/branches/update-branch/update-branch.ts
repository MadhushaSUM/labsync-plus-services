import { updateBranch } from '../../../shared/services/branchService';

export const handler = async (event: any) => {
    const { id } = event.pathParameters;
    const branchDetails = JSON.parse(event.body);

    try {
        const result = await updateBranch(id, branchDetails);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            },
            body: JSON.stringify({ message: 'Branch updated successfully', content: result })
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
