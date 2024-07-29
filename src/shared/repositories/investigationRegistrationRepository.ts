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

export async function fetchInvestigationRegistrationById(invRegId: string) {
    const params = {
        TableName: 'InvestigationRegisterTable',
        Key: {
            id: invRegId
        }
    };

    const result = await dynamoDB.get(params).promise();
    return result.Item as InvestigationRegistrationType;
}

export async function modifyInvestigationRegistration(id: string, invReg: InvestigationRegistrationType) {
    const params = {
        TableName: 'InvestigationRegisterTable',
        Key: { id: id },
        UpdateExpression: 'set #patient_id = :patient_id, doctor_id = :doctor_id, #date = :date, investigations = :investigations, data_added_investigations = :data_added_investigations, cost = :cost, is_confirmed = :is_confirmed',
        ExpressionAttributeNames: {
            '#patient_id': 'patient_id',
            '#date': 'date'
        },
        ExpressionAttributeValues: {
            ':patient_id': invReg.patient_id,
            ':doctor_id': invReg.doctor_id,
            ':date': invReg.date,
            ':investigations': invReg.investigations,
            ':data_added_investigations': invReg.data_added_investigations,
            ':cost': invReg.cost,
            ':is_confirmed': invReg.is_confirmed
        },
        ReturnValues: 'ALL_NEW'
    };

    const result = await dynamoDB.update(params).promise();
    return result.Attributes;
}
