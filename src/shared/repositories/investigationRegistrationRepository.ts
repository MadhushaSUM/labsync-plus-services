import AWS from 'aws-sdk';
import { InvestigationRegistrationType } from '../types/investigationRegistration';
import { AttributeValue, Key, ScanInput } from 'aws-sdk/clients/dynamodb';
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

export async function fetchAllInvestigationRegistrations(limit: number, lastEvaluatedKey: any, filterUnconfirmed: boolean = false) {
    const params: ScanInput = {
        TableName: 'InvestigationRegisterTable',
        Limit: limit,
        ExclusiveStartKey: lastEvaluatedKey,
    };

    if (filterUnconfirmed) {
        params.FilterExpression = 'is_confirmed = :is_confirmed';
        params.ExpressionAttributeValues = {
            ':is_confirmed': false as unknown as AttributeValue
        };
    }

    const result = await dynamoDB.scan(params).promise();
    return {
        items: result.Items,
        lastEvaluatedKey: result.LastEvaluatedKey
    };
}


export async function modifyInvestigationRegisterConfirmation(invRegId: string, confirmed: boolean) {
    const params = {
        TableName: 'InvestigationRegisterTable',
        Key: { id: invRegId },
        UpdateExpression: 'set is_confirmed = :is_confirmed',
        ExpressionAttributeValues: {
            ':is_confirmed': confirmed
        },
        ReturnValues: 'ALL_NEW'
    };

    const result = await dynamoDB.update(params).promise();
    return result.Attributes;
}

export async function addInvestigationToDataAdded(invRegId: string, investigationId: string) {
    const params = {
        TableName: 'InvestigationRegisterTable',
        Key: { id: invRegId },
        UpdateExpression: 'SET data_added_investigations = list_append(data_added_investigations, :newInvestigation)',
        ExpressionAttributeValues: {
            ':newInvestigation': [investigationId]
        },
        ReturnValues: 'ALL_NEW'
    };

    const result = await dynamoDB.update(params).promise();
    return result.Attributes;
}