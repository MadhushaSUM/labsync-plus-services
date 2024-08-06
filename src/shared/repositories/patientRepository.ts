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

export async function modifyPatient(id: string, patientDetails: PatientType) {
    const params = {
        TableName: 'PatientTable',
        Key: { id: id },
        UpdateExpression: 'set #name = :name, gender = :gender, date_of_birth = :dob, contact_number = :contact',
        ExpressionAttributeNames: {
            '#name': 'name'
        },
        ExpressionAttributeValues: {
            ':name': patientDetails.name,
            ':gender': patientDetails.gender,
            ':dob': patientDetails.date_of_birth,
            ':contact': patientDetails.contact_number
        },
        ReturnValues: 'ALL_NEW'
    };

    const result = await dynamoDB.update(params).promise();
    return result.Attributes;
}
