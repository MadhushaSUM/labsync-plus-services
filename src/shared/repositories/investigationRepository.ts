import pool from '../lib/db';

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

    return rows as { id: number; name: string; code: string; price: number }[];
}