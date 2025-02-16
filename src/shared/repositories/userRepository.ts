import pool from "../lib/db";
import { UserType } from "../types/user";

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
        SELECT 
            u.id AS user_id,
            u.name,
            u.email,
            u.role,
            u."emailVerified",
            u.image,
            u.version AS user_version,
            b.id AS branch_id,
            b.name AS branch_name,
            b.address AS branch_address,
            b.telephone,
            b.version AS branch_version
        FROM public.users AS u
        LEFT JOIN public.branches AS b ON u.branch = b.id
        WHERE u.id = $1;
    `;

    const { rows } = await pool.query(query, [id]);
    const user: UserType = {
        id: rows[0].user_id,
        name: rows[0].name,
        email: rows[0].email,
        role: rows[0].role,
        emailVerified: rows[0].emailVerified,
        image: rows[0].image,
        branch: {
            id: rows[0].branch_id,
            name: rows[0].branch_name,
            address: rows[0].branch_address,
            telephone: rows[0].branch_telephone,
            version: rows[0].branch_version,
        },
        version: rows[0].user_version,
    }

    return user;
}

export async function saveUser(name: string, email: string, password: string) {
    const query = `
        INSERT INTO public.users(name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [name, email, password];

    return await pool.query(query, values);
}


export async function fetchAllUsers(limit: number, offset: number, search: string = '') {
    const searchQuery = `%${search.trim()}%`;
  
    const query = `
        SELECT
            u.id AS user_id,
            u.name,
            u.email,
            u.role,
            u."emailVerified",
            u.image,
            u.version AS user_version,
            b.id AS branch_id,
            b.name AS branch_name,
            b.address AS branch_address,
            b.telephone,
            b.version AS branch_version
        FROM public.users AS u
        LEFT JOIN public.branches AS b ON u.branch = b.id
        WHERE LOWER(u.name) LIKE LOWER($1)
        LIMIT $2 OFFSET $3
    `;
  
    const { rows: users } = await pool.query(query, [searchQuery, limit, offset]);
  
    if (users.length === 0) {
      return { users: [], totalCount: 0, totalPages: 0 };
    }
  
    const countQuery = `
        SELECT COUNT(*) 
        FROM public.users 
        WHERE LOWER(name) LIKE LOWER($1)
    `;
    
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
        userDetails.branch.id,
        userDetails.version + 1,
        id
    ]);

    return rows[0];
}