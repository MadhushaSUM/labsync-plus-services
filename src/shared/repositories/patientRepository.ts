import AWS from 'aws-sdk';
import { PatientType } from '../types/patient';
import { Key, ScanInput } from 'aws-sdk/clients/dynamodb';
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function savePatient(patient: PatientType) {
    const params = {
        TableName: 'PatientTable',
        Item: patient
    };

    await dynamoDB.put(params).promise();
    return patient;
}

export async function fetchPatientById(patientId: string) {
    const params = {
        TableName: 'PatientTable',
        Key: {
            id: patientId
        }
    };

    const result = await dynamoDB.get(params).promise();
    return result.Item;
}

export async function fetchAllPatients(limit: number, lastEvaluatedKey: Key) {
    const params: ScanInput = {
        TableName: 'PatientTable',
        Limit: limit,
        ExclusiveStartKey: lastEvaluatedKey
    };

    const result = await dynamoDB.scan(params).promise();
    return {
        patients: result.Items,
        lastEvaluatedKey: result.LastEvaluatedKey
    };
}
