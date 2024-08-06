import { PatientType } from '../types/patient';
import pool from '../lib/db';

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

export async function fetchPatientById(patientId: number) {
    const query = `
        SELECT * FROM public."Patient"
        WHERE id = $1;
    `;

    const { rows } = await pool.query(query, [patientId]);
    return rows[0];
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

    // // Calculate the next offset for pagination
    // const nextOffset = offset + limit < totalCount ? offset + limit : null;

    // Total pages
    const totalPages = Math.ceil(totalCount / limit);

    return {
        patients,
        totalCount,
        totalPages
    };
}

export async function modifyPatient(id: number, patientDetails: PatientType) {
    const query = `
        UPDATE public."Patient"
        SET name = $1, gender = $2, date_of_birth = $3, contact_number = $4
        WHERE id = $5
        RETURNING *;
    `;

    const { rows } = await pool.query(query, [
        patientDetails.name,
        patientDetails.gender,
        patientDetails.date_of_birth,
        patientDetails.contact_number,
        id
    ]);

    return rows[0];
}
