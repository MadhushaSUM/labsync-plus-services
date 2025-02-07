import pool from '../lib/db';

export async function fetchInvestigationById(investigationId: number) {
    const query = `
        SELECT * FROM public.tests
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

export async function fetchAllInvestigations(limit: number, offset: number, search: string = '') {
    const searchQuery = `%${search.trim().toLowerCase()}%`;

    const query = `SELECT * FROM public.tests WHERE LOWER(TRIM(name)) LIKE $1 ORDER BY id LIMIT $2 OFFSET $3`;

    const { rows: investigations } = await pool.query(query, [searchQuery, limit, offset]);

    const countQuery = 'SELECT COUNT(*) FROM public.tests WHERE LOWER(TRIM(name)) LIKE $1';
    const { rows: countRows } = await pool.query(countQuery, [searchQuery]);
    const totalCount = parseInt(countRows[0].count, 10);

    const totalPages = Math.ceil(totalCount / limit);

    return {
        investigations,
        totalCount,
        totalPages
    };
}

export async function modifyInvestigationPrice(id: number, price: number, version: number) {
    const query = `
        UPDATE public.tests
        SET price = $1, version = $2
        WHERE id = $3
        RETURNING *;
    `;

    const { rows } = await pool.query(query, [
        price,
        version + 1,
        id
    ]);

    return rows[0];
}

export async function fetchInvestigationFieldsByTestId(testId: number) {
    const query = `SELECT * FROM public.test_fields WHERE test_id = $1`;

    const { rows: investigationFileds } = await pool.query(query, [testId]);

    return investigationFileds;
}