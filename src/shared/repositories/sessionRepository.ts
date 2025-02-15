import pool from "../lib/db";


export async function upsertSession(userId: number) {
    const client = await pool.connect();
    try {
        const query = `
            INSERT INTO public.sessions(
                "userId", expires)
            VALUES ($1, NOW() + interval '12 hours')
            ON CONFLICT ("userId")
            DO UPDATE SET
                expires = NOW() + interval '12 hours'
            RETURNING *;
      `;
        const values = [userId];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

export async function deleteSession(userId: number) {
    const client = await pool.connect();
    try {
        const query = `
            DELETE FROM public.sessions
            WHERE "userId" = $1
            RETURNING *;
      `;
        const values = [userId];
        const result = await client.query(query, values);
        return result.rows[0]; // Returns the deleted row, or undefined if no row was deleted
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

export async function checkSession(userId: number) {
    const client = await pool.connect();
    try {
        const query = `
            SELECT *,
            CASE 
                WHEN expires > NOW() THEN true
                ELSE false
            END as isActive,
                expires - NOW() as timeRemaining
            FROM public.sessions
            WHERE "userId" = $1
            LIMIT 1;
      `;
        const values = [userId];
        const result = await client.query(query, values);
        return (result.rows[0] as { isActive: boolean; timeRemaining: any; expires: Date; }) || null;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}