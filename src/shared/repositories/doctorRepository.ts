import AWS from 'aws-sdk';
import { DoctorType } from '../types/doctor';
import { Key, ScanInput } from 'aws-sdk/clients/dynamodb';
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function saveDoctor(doctor: DoctorType) {
    const params = {
        TableName: 'DoctorTable',
        Item: doctor
    };

    await dynamoDB.put(params).promise();
    return doctor;
}

export async function fetchDoctorById(doctorId: string) {
    const params = {
        TableName: 'DoctorTable',
        Key: {
            id: doctorId
        }
    };

    const result = await dynamoDB.get(params).promise();
    return result.Item;
}

export async function fetchAllDoctors(limit: number, lastEvaluatedKey: Key) {
    const params: ScanInput = {
        TableName: 'DoctorTable',
        Limit: limit,
        ExclusiveStartKey: lastEvaluatedKey
    };

    const result = await dynamoDB.scan(params).promise();
    return {
        doctors: result.Items,
        lastEvaluatedKey: result.LastEvaluatedKey
    };
}

export async function modifyDoctor(id: string, doctorDetails: DoctorType) {
    const params = {
        TableName: 'DoctorTable',
        Key: { id: id },
        UpdateExpression: 'set #name = :name',
        ExpressionAttributeNames: {
            '#name': 'name'
        },
        ExpressionAttributeValues: {
            ':name': doctorDetails.name
        },
        ReturnValues: 'ALL_NEW'
    };

    const result = await dynamoDB.update(params).promise();
    return result.Attributes;
}
