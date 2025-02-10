import { InvestigationBase } from '../models/investigation/investigationBase';
import pool from '../lib/db';

export async function saveInvestigationData(registrations_id: number, test_id: number, data: object, options: object, doctor_id?: number) {
    try {
        const query = `
            UPDATE public.registrations_tests
            SET doctor_id = $1, data = $2, data_added = true, options = $3, version = registrations_tests.version + 1
            WHERE registrations_id = $4 AND test_id = $5
            RETURNING *;
        `;

        const { rows } = await pool.query(query, [
            doctor_id,
            JSON.stringify(data),
            JSON.stringify(options),
            registrations_id,
            test_id
        ]);

        return rows[0];

    } catch (error) {
        throw error;
    }
}

export async function fetchInvestigationData(investigationRegisterId: number, investigationId: number) {
    try {
        const regResult = await pool.query(
            `SELECT * FROM public.registrations_tests
            WHERE registrations_id = $1 AND test_id = $2`,
            [investigationRegisterId, investigationId]
        );

        return regResult.rows[0];
    } catch (error) {
        throw error;
    }
}

export async function modifyInvestigationData(invRegId: number, investigationId: number, investigationData: InvestigationBase) {
    const query = `
        UPDATE public."Investigation data"
        SET data = $1
        WHERE registration_id = $2 AND investigation_id = $3
        RETURNING *;
    `;

    const { rows } = await pool.query(query, [
        investigationData,
        invRegId,
        investigationId
    ]);

    return rows[0];
}

export async function fetchDataEmptyInvestigations() {
    const query = `
        SELECT 
            tr.id AS registrations_id,
            tr.date,
            tr.ref_number,
            p.id AS patient_id,
            p.name AS patient_name,
            p.gender AS patient_gender,
            p.date_of_birth AS patient_date_of_birth,
            t.id AS test_id,
            t.name AS test_name,
            d.id AS doctor_id,
            d.name AS doctor_name,
            trt.data,
            trt.options,
            trt.version
        FROM registrations AS tr
        INNER JOIN patients AS p ON tr.patient_id = p.id
        INNER JOIN registrations_tests AS trt ON tr.id = trt.registrations_id
        INNER JOIN tests AS t ON trt.test_id = t.id
        LEFT JOIN doctors AS d ON trt.doctor_id = d.id
        WHERE trt.data_added = false;
    `;

    const { rows } = await pool.query(query);
    return rows;
}

export async function fetchDataAddedInvestigations(
    offset: number,
    limit: number,
    fromDate?: string,
    toDate?: string,
    patientId?: number,
    refNumber?: number,
    allReports?: boolean,
) {
    const conditions: string[] = [];
    const params: any[] = [];

    if (fromDate) {
        conditions.push(`tr.date >= $${params.length + 1}`);
        params.push(fromDate);
    }
    if (toDate) {
        conditions.push(`tr.date <= $${params.length + 1}`);
        params.push(toDate);
    }
    if (patientId) {
        conditions.push(`tr.patient_id = $${params.length + 1}`);
        params.push(patientId);
    }
    if (refNumber) {
        conditions.push(`tr.ref_number = $${params.length + 1}`);
        params.push(refNumber);
    }

    const filteredRegisterConditions = conditions.length > 0 ? `AND ${conditions.join(' AND ')}` : '';

    // Append limit and offset to the params array
    params.push(limit, offset);

    // Query to get paginated results
    const dataQuery = `
      SELECT
        tr.id AS registrations_id,
        tr.date,
        tr.ref_number,
        p.id AS patient_id,
        p.name AS patient_name,
        p.gender AS patient_gender,
        p.date_of_birth AS patient_date_of_birth,
        t.id AS test_id,
        t.name AS test_name,
        d.id AS doctor_id,
        d.name AS doctor_name,
        trt.data,
        trt.options,
        trt.version
      FROM registrations AS tr
      INNER JOIN patients AS p ON tr.patient_id = p.id
      INNER JOIN registrations_tests AS trt ON tr.id = trt.registrations_id
      INNER JOIN tests AS t ON trt.test_id = t.id
      LEFT JOIN doctors AS d ON trt.doctor_id = d.id
      WHERE trt.data_added = true ${allReports ? '' : 'AND trt.printed = false'} ${filteredRegisterConditions}
      ORDER BY tr.id
      LIMIT $${params.length - 1} OFFSET $${params.length}
    `;

    // Query to get the total count of matching rows
    const countQuery = `
      SELECT COUNT(*) AS total_count
      FROM registrations AS tr
      INNER JOIN patients AS p ON tr.patient_id = p.id
      INNER JOIN registrations_tests AS trt ON tr.id = trt.registrations_id
      INNER JOIN tests AS t ON trt.test_id = t.id
      LEFT JOIN doctors AS d ON trt.doctor_id = d.id
      WHERE trt.data_added = true ${filteredRegisterConditions}
    `;

    // Run both queries in parallel
    const [dataResult, countResult] = await Promise.all([
        pool.query(dataQuery, params),
        pool.query(countQuery, params.slice(0, params.length - 2)), // Remove limit and offset for count query
    ]);

    return {
        data: dataResult.rows,
        totalCount: parseInt(countResult.rows[0].total_count, 10),
    };
}

