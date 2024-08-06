import { DoctorType } from '../types/doctor';
import pool from '../lib/db';

export async function saveDoctor(doctor: DoctorType) {
    const query = `
        INSERT INTO public."Doctor" (name)
        VALUES ($1)
        RETURNING *;
    `;
    const values = [doctor.name];

    const result = await pool.query(query, values);
    return result.rows[0];
}

export async function fetchDoctorById(doctorId: number) {
    const query = `
        SELECT * FROM  public."Doctor"
        WHERE id = $1;
    `;

    const { rows } = await pool.query(query, [doctorId]);
    return rows[0];
}

export async function fetchAllDoctors(limit: number, offset: number) {
    const query = `
        SELECT * FROM public."Doctor"
        ORDER BY id
        LIMIT $1 OFFSET $2;
    `;

    const { rows: doctors } = await pool.query(query, [limit, offset]);

    const countQuery = 'SELECT COUNT(*) FROM public."Doctor"';
    const { rows: countRows } = await pool.query(countQuery);
    const totalCount = parseInt(countRows[0].count, 10);

    // // Calculate the next offset for pagination
    // const nextOffset = offset + limit < totalCount ? offset + limit : null;

    // Total pages
    const totalPages = Math.ceil(totalCount / limit);

    return {
        doctors,
        totalCount,
        totalPages
    };
}

export async function modifyDoctor(id: number, doctorDetails: DoctorType) {
    const query = `
        UPDATE public."Doctor"
        SET name = $1
        WHERE id = $2
        RETURNING *;
    `;

    const { rows } = await pool.query(query, [
        doctorDetails.name,
        id
    ]);

    return rows[0];
}
