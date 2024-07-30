import AWS from 'aws-sdk';
import { InvestigationData } from '../types/investigationData';
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function saveInvestigationData(investigation_data:InvestigationData) {
    const params = {
        TableName: 'InvestigationDataTable',
        Item: investigation_data
    };

    await dynamoDB.put(params).promise();
    return investigation_data;
}