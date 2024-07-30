import AWS from 'aws-sdk';
import { InvestigationData } from '../types/investigationData';
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function saveInvestigationData(investigation_data: InvestigationData) {
    const params = {
        TableName: 'InvestigationDataTable',
        Item: investigation_data
    };

    await dynamoDB.put(params).promise();
    return investigation_data;

}

export async function fetchInvestigationData(investigationRegisterId: string, investigationId: string) {
    const params = {
        TableName: 'InvestigationDataTable',
        FilterExpression: 'investigation_registration_id = :irId AND investigation_id = :iId',
        ExpressionAttributeValues: {
            ':irId': investigationRegisterId,
            ':iId': investigationId
        }
    };
    
    //TODO: Not efficient to use scan here
    const result = await dynamoDB.scan(params).promise();
    return result.Items;
}
