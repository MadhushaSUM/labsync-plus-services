import { PatientType } from '../types/patient';
import pool from '../lib/db';

export async function savePatient(patient: PatientType) {
    const query = `
        INSERT INTO public.patients(name, date_of_birth, gender, whatsapp_number, version)
        VALUES ($1, $2, $3, $4, 1)
        RETURNING *;
    `;
    const values = [patient.name, patient.date_of_birth, patient.gender, patient.whatsapp_number ? patient.whatsapp_number : null];

    const result = await pool.query(query, values);
    return result.rows[0];
}

export async function fetchPatientById(patientId: number) {
    const query = `
        SELECT * FROM public.patients
        WHERE id = $1;
    `;

    const { rows } = await pool.query(query, [patientId]);
    return rows[0];
}

export async function fetchPatientByName(queryString: string) {
    const query = `
        SELECT * FROM public.patients
        WHERE name ILIKE '%' || $1 || '%';
    `;

    const { rows } = await pool.query(query, [queryString]);
    return rows;
}

export async function fetchAllPatients(limit: number, offset: number, search: string = '') {
    const searchQuery = `%${search.trim().toLowerCase()}%`;

    const query = `SELECT * FROM public.patients WHERE LOWER(TRIM(name)) LIKE $1 ORDER BY id LIMIT $2 OFFSET $3`;

    const { rows: patients } = await pool.query(query, [searchQuery, limit, offset]);

    const countQuery = 'SELECT COUNT(*) FROM public.patients WHERE LOWER(TRIM(name)) LIKE $1';
    const { rows: countRows } = await pool.query(countQuery, [searchQuery]);
    const totalCount = parseInt(countRows[0].count, 10);

    const totalPages = Math.ceil(totalCount / limit);

    return {
        patients,
        totalCount,
        totalPages
    };
}


export async function modifyPatient(id: number, patientDetails: PatientType) {
    const query = `
        UPDATE public.patients
        SET name = $1, gender = $2, date_of_birth = $3, whatsapp_number = $4, version = $5
        WHERE id = $6
        RETURNING *;
    `;

    const { rows } = await pool.query(query, [
        patientDetails.name,
        patientDetails.gender,
        patientDetails.date_of_birth,
        patientDetails.whatsapp_number,
        patientDetails.version + 1,
        id
    ]);

    return rows[0];
}
