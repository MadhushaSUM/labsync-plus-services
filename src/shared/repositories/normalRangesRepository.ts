import pool from '../lib/db';
import { NormalRange } from '../types/Investigation';

export async function upsertNormalRange(testFieldId: number, testId: number, rules: object) {
    const client = await pool.connect();

    try {
        const query = `
        INSERT INTO public.normal_ranges 
          (test_field_id, test_id, rules, version)
        VALUES 
          ($1, $2, $3::jsonb, 1)
        ON CONFLICT (test_field_id, test_id) 
        DO UPDATE SET 
          rules = $3::jsonb,
          version = normal_ranges.version + 1
        RETURNING *;
      `;

        const values = [testFieldId, testId, JSON.stringify(rules)];
        const result = await client.query(query, values);

        return result.rows[0];
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

export async function fetchNormalRangesByTestField(testFieldId: number) {
    try {
        const result = await pool.query(
            `SELECT * FROM public.normal_ranges
             WHERE test_field_id=$1`,
            [testFieldId]
        );

        return {
            normalRanges: result.rows[0] as NormalRange
        };
    } catch (error) {
        throw error;
    }
}
export async function fetchNormalRangesByTest(testId: number) {
    try {
        const result = await pool.query(
            `SELECT * FROM public.normal_ranges
             WHERE test_id=$1`,
            [testId]
        );

        return {
            normalRanges: result.rows as NormalRange[]
        };
    } catch (error) {
        throw error;
    }
}