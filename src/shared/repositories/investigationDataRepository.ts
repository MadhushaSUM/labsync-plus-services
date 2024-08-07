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