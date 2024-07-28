import AWS from 'aws-sdk';
import { InvestigationRegistrationType } from '../types/investigationRegistration';
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function saveInvestigationRegistration(invReg: InvestigationRegistrationType) {
    const params = {
        TableName: 'InvestigationRegisterTable',
        Item: invReg
    };

    await dynamoDB.put(params).promise();
    return invReg;
}