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