import pool from "../lib/db";
import { Registration } from "../types/investigationRegistration";

export async function fetchTestRegistrationByPatient(patientId: number, startDate?: string, endDate?: string) {
    let baseQuery = `
        SELECT 
            tr.id AS registrations_id,
            tr.date,
            tr.ref_number,
            tr.total_cost,
            tr.paid AS paid_price,
            tr.collected,
            tr.version AS registration_version,
            p.id AS patient_id,
            p.name AS patient_name,
            p.gender AS patient_gender,
            p.date_of_birth AS patient_date_of_birth,
            p.whatsapp_number AS patient_whatsapp_number,
            p.version AS patient_version,
            t.id AS test_id,
            t.name AS test_name,
            t.code AS test_code,
            t.price AS test_price,
            t.version AS test_version,
            d.id AS doctor_id,
            d.name AS doctor_name,
            d.version AS doctor_version,
            trt.data,
            trt.options,
            trt.data_added,
            trt.printed,
            trt.version AS registration_test_version
        FROM registrations AS tr
        INNER JOIN patients AS p ON tr.patient_id = p.id
        INNER JOIN registrations_tests AS trt ON tr.id = trt.registrations_id
        INNER JOIN tests AS t ON trt.test_id = t.id
        LEFT JOIN doctors AS d ON trt.doctor_id = d.id
        WHERE tr.patient_id = ${patientId} 
    `;

    const conditions: string[] = [];
    const params: any[] = [];

    if (startDate) {
        conditions.push(`tr.date >= $${params.length + 1}`);
        params.push(startDate);
    }

    if (endDate) {
        conditions.push(`tr.date <= $${params.length + 1}`);
        params.push(endDate);
    }

    const filteredRegisterConditions = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const query = `
        WITH filtered_registers AS (
            SELECT tr.id
            FROM registrations AS tr
            ${filteredRegisterConditions}
            ORDER BY tr.id
        ),
        filtered_data AS (
            ${baseQuery}
        )
        SELECT 
            (SELECT COUNT(*) FROM registrations AS tr ${filteredRegisterConditions}) AS total_count,
            fd.*
        FROM filtered_data AS fd
        WHERE fd.registrations_id IN (SELECT id FROM filtered_registers)
        ORDER BY fd.registrations_id DESC;
    `;

    const { rows } = await pool.query(query, params);

    if (rows.length === 0) {
        return { totalCount: 0, registrations: [] };
    }

    const totalCount = parseInt(rows[0].total_count, 10);

    const registrations: Registration[] = [];
    const registrationMap = new Map<number, Registration>();

    rows.forEach(row => {
        if (!registrationMap.has(row.test_register_id)) {
            const registration: Registration = {
                id: row.test_register_id,
                date: row.date,
                patient: {
                    id: row.patient_id,
                    name: row.patient_name,
                    gender: row.patient_gender,
                    date_of_birth: row.patient_date_of_birth,
                    whatsapp_number: row.whatsapp_number,
                    version: row.patient_version
                },
                ref_number: row.ref_number,
                total_cost: row.total_cost,
                paid_price: row.paid_price,
                collected: row.collected,
                registeredTests: [],
                version: row.registration_version,
            };
            registrationMap.set(row.test_register_id, registration);
            registrations.push(registration);
        }

        const registration: Registration = registrationMap.get(row.test_register_id)!;
        registration.registeredTests.push({
            test: {
                id: row.test_id,
                name: row.test_name,
                code: row.test_code,
                price: row.test_price,
                version: row.test_version,
            },
            doctor: row.doctor_id
                ? {
                    id: row.doctor_id,
                    name: row.doctor_name,
                    version: row.doctor_version,
                }
                : null,
            data: row.data,
            options: row.options,
            data_added: row.data_added,
            printed: row.printed,
            version: row.registration_test_version,
        });
    });

    return { totalCount, registrations };
}

export async function getTestRegistrationsForDateRange(
    startDate?: string,
    endDate?: string
) {
    let baseQuery = `
        SELECT 
            tr.id AS registrations_id,
            tr.date,
            tr.ref_number,
            tr.total_cost,
            tr.paid AS paid_price,
            tr.collected,
            tr.version AS registration_version,
            p.id AS patient_id,
            p.name AS patient_name,
            p.gender AS patient_gender,
            p.date_of_birth AS patient_date_of_birth,
            p.whatsapp_number AS patient_whatsapp_number,
            p.version AS patient_version,
            t.id AS test_id,
            t.name AS test_name,
            t.code AS test_code,
            t.price AS test_price,
            t.version AS test_version,
            d.id AS doctor_id,
            d.name AS doctor_name,
            d.version AS doctor_version,
            trt.data,
            trt.options,
            trt.data_added,
            trt.printed,
            trt.version AS registration_test_version
        FROM registrations AS tr
        INNER JOIN patients AS p ON tr.patient_id = p.id
        INNER JOIN registrations_tests AS trt ON tr.id = trt.registrations_id
        INNER JOIN tests AS t ON trt.test_id = t.id
        LEFT JOIN doctors AS d ON trt.doctor_id = d.id
    `;

    const conditions: string[] = [];
    const params: any[] = [];

    if (startDate) {
        conditions.push(`tr.date >= $${params.length + 1}`);
        params.push(startDate);
    }
    if (endDate) {
        conditions.push(`tr.date <= $${params.length + 1}`);
        params.push(endDate);
    }

    const filteredRegisterConditions = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const query = `
        WITH filtered_registers AS (
            SELECT tr.id
            FROM registrations AS tr
            ${filteredRegisterConditions}
            ORDER BY tr.id
        ),
        filtered_data AS (
            ${baseQuery}
        )
        SELECT 
            (SELECT COUNT(*) FROM registrations AS tr ${filteredRegisterConditions}) AS total_count,
            fd.*
        FROM filtered_data AS fd
        WHERE fd.registrations_id IN (SELECT id FROM filtered_registers)
        ORDER BY fd.registrations_id DESC;
    `;

    const { rows } = await pool.query(query, params);

    if (rows.length === 0) {
        return { totalCount: 0, registrations: [] };
    }

    const totalCount = parseInt(rows[0].total_count, 10);

    const registrations: Registration[] = [];
    const registrationMap = new Map<number, Registration>();

    rows.forEach(row => {
        if (!registrationMap.has(row.test_register_id)) {
            const registration: Registration = {
                id: row.test_register_id,
                date: row.date,
                patient: {
                    id: row.patient_id,
                    name: row.patient_name,
                    gender: row.patient_gender,
                    date_of_birth: row.patient_date_of_birth,
                    whatsapp_number: row.whatsapp_number,
                    version: row.patient_version
                },
                ref_number: row.ref_number,
                total_cost: row.total_cost,
                paid_price: row.paid_price,
                collected: row.collected,
                registeredTests: [],
                version: row.registration_version,
            };
            registrationMap.set(row.test_register_id, registration);
            registrations.push(registration);
        }

        const registration: Registration = registrationMap.get(row.test_register_id)!;
        registration.registeredTests.push({
            test: {
                id: row.test_id,
                name: row.test_name,
                code: row.test_code,
                price: row.test_price,
                version: row.test_version,
            },
            doctor: row.doctor_id
                ? {
                    id: row.doctor_id,
                    name: row.doctor_name,
                    version: row.doctor_version,
                }
                : null,
            data: row.data,
            options: row.options,
            data_added: row.data_added,
            printed: row.printed,
            version: row.registration_test_version,
        });
    });

    return { totalCount, registrations };
}

export async function getPeriodsWithTestRegisterIds(granularity: string, startDate?: string, endDate?: string) {
    const query = `
        WITH time_series AS (
            SELECT
                generate_series(
                    date_trunc(
                        CASE 
                            WHEN $1 = 'daily' THEN 'day'
                            WHEN $1 = 'weekly' THEN 'week'
                            WHEN $1 = 'monthly' THEN 'month'
                            WHEN $1 = 'annually' THEN 'year'
                        END, $2::timestamp
                    ),
                    date_trunc(
                        CASE 
                            WHEN $1 = 'daily' THEN 'day'
                            WHEN $1 = 'weekly' THEN 'week'
                            WHEN $1 = 'monthly' THEN 'month'
                            WHEN $1 = 'annually' THEN 'year'
                        END, $3::timestamp
                    ),
                    CASE 
                        WHEN $1 = 'daily' THEN '1 day'::interval
                        WHEN $1 = 'weekly' THEN '1 week'::interval
                        WHEN $1 = 'monthly' THEN '1 month'::interval
                        WHEN $1 = 'annually' THEN '1 year'::interval
                    END
                ) AS start_date
        ),
        period_boundaries AS (
            SELECT
                start_date,
                start_date + 
                CASE 
                    WHEN $1 = 'daily' THEN '1 day'::interval
                    WHEN $1 = 'weekly' THEN '1 week'::interval
                    WHEN $1 = 'monthly' THEN '1 month'::interval
                    WHEN $1 = 'annually' THEN '1 year'::interval
                END - '1 second'::interval AS end_date
            FROM time_series
        )
        SELECT
            pb.start_date AS start_date_of_period,
            pb.end_date AS end_date_of_period,
            COALESCE(json_agg(tr.id), '[]'::json) AS test_register_ids
        FROM period_boundaries pb
        LEFT JOIN registrations tr 
            ON tr.date >= pb.start_date 
            AND tr.date <= pb.end_date
        GROUP BY pb.start_date, pb.end_date
        ORDER BY pb.start_date;
    `;

    const values = [granularity, startDate, endDate];

    try {
        const result = await pool.query(query, values);
        return result.rows.map(row => ({
            startDateOfPeriod: new Date(row.start_date_of_period),
            endDateOfPeriod: new Date(row.end_date_of_period),
            testRegisterIds: row.test_register_ids,
        }));
    } catch (err) {
        throw err;
    }
}