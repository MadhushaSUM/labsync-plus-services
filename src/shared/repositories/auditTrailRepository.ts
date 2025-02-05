import pool from "../lib/db";

export async function saveAuditTrailRecord(userId: string, operation: string, payload: object) {
    const query = `
        INSERT INTO public.audit_trail(user_id, operation, payload)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [userId, operation, JSON.stringify(payload)];

    const result = await pool.query(query, values);
    return result.rows[0];
}


export async function fetchAllAuditTrailRecords(
    limit: number, 
    offset: number, 
    startDate?: string, 
    endDate?: string
) {
    const start = startDate ? new Date(startDate).toISOString() : '1970-01-01T00:00:00Z';
    const end = endDate ? new Date(endDate).toISOString() : new Date().toISOString();

    const query = `
        SELECT * FROM public.audit_trail
        WHERE time_stamp >= $1 AND time_stamp < $2
        ORDER BY id
        LIMIT $3 OFFSET $4
    `;

    const { rows: auditRecords } = await pool.query(query, [start, end, limit, offset]);

    const countQuery = `
        SELECT COUNT(*) FROM public.audit_trail
        WHERE time_stamp >= $1 AND time_stamp < $2
    `;

    const { rows: countRows } = await pool.query(countQuery, [start, end]);
    const totalCount = parseInt(countRows[0].count, 10);
    const totalPages = Math.ceil(totalCount / limit);

    return {
        auditRecords,
        totalCount,
        totalPages
    };
}
