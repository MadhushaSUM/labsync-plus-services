import AWS from 'aws-sdk';
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function fetchInvestigationById(investigationId: string) {
    const params = {
        TableName: 'InvestigationTable',
        Key: {
            id: investigationId
        }
    };

    const result = await dynamoDB.get(params).promise();
    return result.Item;
}

export async function fetchInvestigationsByIds(ids: string[]) {
    const keys = ids.map(id => ({ id }));
    const params = {
        RequestItems: {
            InvestigationTable: {
                Keys: keys
            }
        }
    };

    const result = await dynamoDB.batchGet(params).promise();

    return result;
}
