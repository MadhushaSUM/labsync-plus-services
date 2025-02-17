import pool from "../lib/db";


export async function fetchConfigById(configId: number) {
    const query = `
        SELECT * FROM public.configs
        WHERE id = $1;
    `;

    const { rows } = await pool.query(query, [configId]);
    return rows[0];
}

export async function updateConfigById(configId: number, config: object) {
    const query = `
        UPDATE public.configs
        SET configuration = $1
        WHERE id = $2;
    `;

    const { rows } = await pool.query(query, [config, configId]);
    return rows[0];
}