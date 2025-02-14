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

export async function fetchAllUsers(limit: number, offset: number, search: string = '') {
    const searchQuery = `%${search.trim().toLowerCase()}%`;

    const query = `SELECT id, name, email, "emailVerified", image, role, branch, version FROM public.users WHERE LOWER(TRIM(name)) LIKE $1 ORDER BY id LIMIT $2 OFFSET $3`;

    const { rows: users } = await pool.query(query, [searchQuery, limit, offset]);

    const countQuery = 'SELECT COUNT(*) FROM public.users WHERE LOWER(TRIM(name)) LIKE $1';
    const { rows: countRows } = await pool.query(countQuery, [searchQuery]);
    const totalCount = parseInt(countRows[0].count, 10);

    const totalPages = Math.ceil(totalCount / limit);

    return {
        users,
        totalCount,
        totalPages
    };
}

export async function modifyUser(id: number, userDetails: {
    id: any;
    name: any;
    email: any;
    role: any;
    branch: any;
    image?: string;
    version: any;
}) {
    const query = `
        UPDATE public.users
        SET name=$1, "emailVerified"=$2, image=$3, role=$4, branch=$5, version=$6
        WHERE id = $7
        RETURNING *;
    `;

    const { rows } = await pool.query(query, [
        userDetails.name,
        new Date(),
        userDetails.image,
        userDetails.role,
        userDetails.branch,
        userDetails.version + 1,
        id
    ]);

    return rows[0];
}