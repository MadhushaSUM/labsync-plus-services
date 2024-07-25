import AWS from 'aws-sdk';
import { AddPatientType } from '../types/patient';
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function savePatient(patient: AddPatientType) {
    const params = {
        TableName: 'PatientTable',
        Item: patient
    };

    await dynamoDB.put(params).promise();
    return patient;
}