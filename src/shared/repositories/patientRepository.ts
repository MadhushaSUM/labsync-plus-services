import AWS from 'aws-sdk';
import { AddPatientType } from '../types/patient';
import { GetItemInput } from 'aws-sdk/clients/dynamodb';
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function savePatient(patient: AddPatientType) {
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