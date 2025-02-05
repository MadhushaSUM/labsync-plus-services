import { DoctorType } from '../types/doctor';
import pool from '../lib/db';

export async function saveDoctor(doctor: DoctorType) {
    const query = `
        INSERT INTO public.doctors (name, version)
        VALUES ($1, 1)
        RETURNING *;
    `;
    const values = [doctor.name];

    const result = await pool.query(query, values);
    return result.rows[0];
}

export async function fetchDoctorById(doctorId: number) {
    const query = `SELECT * FROM  public.doctors WHERE id = $1;`;

    const { rows } = await pool.query(query, [doctorId]);
    return rows[0];
}

export async function fetchAllDoctors(limit: number, offset: number, search: string = '') {
    const searchQuery = `%${search.trim().toLowerCase()}%`;

    const query = `SELECT * FROM public.doctors WHERE LOWER(TRIM(name)) LIKE $1 ORDER BY id LIMIT $2 OFFSET $3`;

    const { rows: doctors } = await pool.query(query, [searchQuery, limit, offset]);

    const countQuery = 'SELECT COUNT(*) FROM public.doctors WHERE LOWER(TRIM(name)) LIKE $1';
    const { rows: countRows } = await pool.query(countQuery, [searchQuery]);
    const totalCount = parseInt(countRows[0].count, 10);

    const totalPages = Math.ceil(totalCount / limit);

    return {
        doctors,
        totalCount,
        totalPages
    };
}

export async function modifyDoctor(id: number, doctorDetails: DoctorType) {
    const query = `
        UPDATE public.doctors
        SET name = $1, version = $2
        WHERE id = $3
        RETURNING *;
    `;

    const { rows } = await pool.query(query, [
        doctorDetails.name,
        doctorDetails.version + 1,
        id
    ]);

    return rows[0];
}
