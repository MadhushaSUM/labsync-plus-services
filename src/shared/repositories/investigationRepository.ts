import pool from '../lib/db';
import { InvestigationType } from '../types/Investigation';

export async function fetchInvestigationById(investigationId: number) {
    const query = `
        SELECT * FROM public."Investigation"
        WHERE id = $1;
    `;

    const { rows } = await pool.query(query, [investigationId]);
    return rows[0];
}

export async function fetchInvestigationsByIds(ids: number[]) {
    const uniqueIds = Array.from(new Set(ids));

    if (uniqueIds.length === 0) {
        return [];
    }

    const query = `
        SELECT * FROM public."Investigation"
        WHERE id = ANY($1::int[]);
    `;

    // Execute the query
    const { rows } = await pool.query(query, [uniqueIds]);

    return rows as InvestigationType[];
}