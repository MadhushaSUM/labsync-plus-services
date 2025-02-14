import pool from "../lib/db";
import { BranchType } from "../types/branch";


export async function fetchAllBranches(limit: number, offset: number, search: string = '') {
    const searchQuery = `%${search.trim().toLowerCase()}%`;

    const query = `SELECT * FROM public.branches WHERE LOWER(TRIM(name)) LIKE $1 ORDER BY id LIMIT $2 OFFSET $3`;

    const { rows: branches } = await pool.query(query, [searchQuery, limit, offset]);

    const countQuery = 'SELECT COUNT(*) FROM public.branches WHERE LOWER(TRIM(name)) LIKE $1';
    const { rows: countRows } = await pool.query(countQuery, [searchQuery]);
    const totalCount = parseInt(countRows[0].count, 10);

    const totalPages = Math.ceil(totalCount / limit);

    return {
        branches,
        totalCount,
        totalPages
    };
}

export async function fetchBranchById(id: number) {
    const query = `
        SELECT * FROM public.branches
        WHERE id = $1;
    `;

    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

export async function saveBranch(branch: BranchType) {
    const query = `
        INSERT INTO public.branches(name, address, telephone, version)
        VALUES ($1, $2, $3, 1)
        RETURNING *;
    `;
    const values = [branch.name, branch.address, branch.telephone];

    const result = await pool.query(query, values);
    return result.rows[0];
}

export async function modifyBranch(id: number, branch: BranchType) {
    const query = `
        UPDATE public.branches
        SET name = $1, address = $2, telephone = $3, version = $4
        WHERE id = $5
        RETURNING *;
    `;

    const { rows } = await pool.query(query, [
        branch.name,
        branch.address,
        branch.telephone,
        branch.version + 1,
        id
    ]);

    return rows[0];
}