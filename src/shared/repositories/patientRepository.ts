import AWS from 'aws-sdk';
import { PatientType } from '../types/patient';
import pool from '../lib/db';
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function savePatient(patient: PatientType) {
    const query = `
        INSERT INTO public."Patient" (name, gender, date_of_birth, contact_number)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [patient.name, patient.gender, patient.date_of_birth, patient.contact_number];

    const result = await pool.query(query, values);
    return result.rows[0];
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

export async function fetchAllPatients(limit: number, offset: number) {
    // Define the SQL query with LIMIT and OFFSET
    const query = `
        SELECT * FROM public."Patient"
        ORDER BY id
        LIMIT $1 OFFSET $2;
    `;

    // Execute the query
    const { rows: patients } = await pool.query(query, [limit, offset]);

    // Get the total count of rows for pagination
    const countQuery = 'SELECT COUNT(*) FROM public."Patient"';
    const { rows: countRows } = await pool.query(countQuery);
    const totalCount = parseInt(countRows[0].count, 10);

    // Calculate the next offset for pagination
    const nextOffset = offset + limit < totalCount ? offset + limit : null;

    // Total pages
    const totalPages = Math.ceil(totalCount / limit);

    return {
        patients,
        totalCount,
        totalPages
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
