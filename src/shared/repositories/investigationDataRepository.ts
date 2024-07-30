import AWS from 'aws-sdk';
import { InvestigationData } from '../types/investigationData';
import { InvestigationBase } from '../models/investigation/investigationBase';
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

export async function modifyInvestigationData(id: string, investigationData: InvestigationBase) {
    const params = {
        TableName: 'InvestigationDataTable',
        Key: { id: id },
        UpdateExpression: 'set #data = :data',
        ExpressionAttributeNames: {
            '#data': 'data'
        },
        ExpressionAttributeValues: {
            ':data': investigationData
        },
        ReturnValues: 'ALL_NEW'
    };

    const result = await dynamoDB.update(params).promise();
    return result.Attributes;
}