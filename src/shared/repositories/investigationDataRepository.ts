import { InvestigationData } from '../types/investigationData';
import { InvestigationBase } from '../models/investigation/investigationBase';
import pool from '../lib/db';

export async function saveInvestigationData(investigation_data: InvestigationData) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const result = await client.query(
            `INSERT INTO public."Investigation data"(registration_id, investigation_id, data)
	        VALUES ($1, $2, $3)`,
            [investigation_data.investigation_registration_id, investigation_data.investigation_id, investigation_data.data]
        );

        await client.query(
            `INSERT INTO public."Data Added Investigations" (registration_id, investigation_id)
            VALUES ($1, $2)`,
            [investigation_data.investigation_registration_id, investigation_data.investigation_id]
        );

        await client.query('COMMIT');

        return result;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

export async function fetchInvestigationData(investigationRegisterId: number, investigationId: number) {
    try {
        const regResult = await pool.query(
            `SELECT * FROM public."Investigation data"
            WHERE registration_id = $1 AND investigation_id = $2`,
            [investigationRegisterId, investigationId]
        );

        return regResult.rows[0];
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function modifyInvestigationData(invRegId: number, investigationId: number, investigationData: InvestigationBase) {
    const query = `
        UPDATE public."Investigation data"
        SET data = $1
        WHERE registration_id = $2 AND investigation_id = $3
        RETURNING *;
    `;

    const { rows } = await pool.query(query, [
        investigationData,
        invRegId,
        investigationId
    ]);

    return rows[0];
}

export async function fetchDataEmptyInvestigations() {
    const query = `
        SELECT 
            tr.id AS registrations_id,
            tr.date,
            tr.ref_number,
            p.id AS patient_id,
            p.name AS patient_name,
            p.gender AS patient_gender,
            p.date_of_birth AS patient_date_of_birth,
            t.id AS test_id,
            t.name AS test_name,
            d.id AS doctor_id,
            d.name AS doctor_name,
            trt.data,
            trt.options
        FROM registrations AS tr
        INNER JOIN patients AS p ON tr.patient_id = p.id
        INNER JOIN registrations_tests AS trt ON tr.id = trt.registrations_id
        INNER JOIN tests AS t ON trt.test_id = t.id
        LEFT JOIN doctors AS d ON trt.doctor_id = d.id
        WHERE trt.data_added = false;
    `;

    const { rows } = await pool.query(query);
    return rows;
}