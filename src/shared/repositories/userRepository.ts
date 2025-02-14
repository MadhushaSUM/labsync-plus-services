import pool from "../lib/db";

export async function fetchUserByEmail(email: string) {
    const query = `
        SELECT * FROM public.users
        WHERE email = $1;
    `;

    const { rows } = await pool.query(query, [email]);
    return rows[0];
}

export async function fetchUserById(id: number) {
    const query = `
        SELECT * FROM public.users
        WHERE id = $1;
    `;

    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

export async function saveUser(name: string, email: string, password: string) {
    const query = `
        INSERT INTO public.users(name, email, password)
        VALUES ($1, $2, $3);
    `;
    const values = [name, email, password];

    await pool.query(query, values);
}