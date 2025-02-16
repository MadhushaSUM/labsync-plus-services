import pool from '../lib/db';
import { formatISO } from 'date-fns';

export async function saveInvestigationRegistration(data: {
    date: Date;
    patientId: number;
    branchId: number;
    refNumber?: number | null;
    doctorId?: number | null;
    totalCost: number;
    paidPrice: number;
    investigations: number[];
}) {
    const { patientId, doctorId, refNumber, date, investigations, totalCost, paidPrice, branchId } = data;
    const dateOfTest = formatISO(date, { representation: "date" });

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const testRegisterResult = await client.query(
            `
            INSERT INTO registrations (date, patient_id, branch_id, ref_number, total_cost, paid, collected, version)
            VALUES ($1, $2, $3, $4, $5, $6, false, 1)
            RETURNING id;
            `,
            [dateOfTest, patientId, branchId, refNumber || null, totalCost, paidPrice]
        );
        const testRegisterId = testRegisterResult.rows[0].id;

        const testRegisterTestsValues = investigations.map(
            (testId) => `(${testRegisterId}, ${testId}, ${doctorId || 'NULL'})`
        ).join(',');

        await client.query(
            `
            INSERT INTO registrations_tests (registrations_id, test_id, doctor_id)
            VALUES ${testRegisterTestsValues};
            `
        );

        await client.query('COMMIT');

        return testRegisterId;
    } catch (error: any) {
        await client.query('ROLLBACK');
        throw new Error(`Transaction failed: ${error.message}`);
    } finally {
        client.release();
    }
}

export async function fetchInvestigationRegistrationById(id: number) {
    try {
        const query = `
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
            trt.version AS registration_test_version,
            b.id AS branch_id,
            b.name AS branch_name,
            b.address AS branch_address,
            b.telephone AS branch_telephone,
            b.version AS branch_version
        FROM registrations AS tr
        INNER JOIN patients AS p ON tr.patient_id = p.id
        INNER JOIN registrations_tests AS trt ON tr.id = trt.registrations_id
        INNER JOIN tests AS t ON trt.test_id = t.id
        INNER JOIN branches AS b ON tr.branch_id = b.id
        LEFT JOIN doctors AS d ON trt.doctor_id = d.id
        WHERE tr.id = $1;
    `;
        const { rows } = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function modifyInvestigationRegistration(registrationId: number, data: {
    id: number;
    patientId: number;
    branch_id: number;
    doctorId: number | null;
    refNumber: number | null;
    date: Date;
    testIds: number[];
    dataAddedTestIds: number[];
    previousTestIds: number[];
    totalCost: number;
    paidPrice: number;
    collected: boolean;
    version: number;
}) {
    const { patientId, branch_id, doctorId, refNumber, date, testIds, dataAddedTestIds, previousTestIds, totalCost, paidPrice, collected, version } = data;
    const dateOfTest = formatISO(date, { representation: "date" });

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Update test register details
        await client.query(
            `
            UPDATE registrations
            SET patient_id = $1, ref_number = $2, date = $3, total_cost = $4, paid = $5, branch_id = $6, collected = $7, version = $8
            WHERE id = $9;
            `,
            [patientId, refNumber || null, dateOfTest, totalCost, paidPrice, branch_id, collected, version + 1, registrationId]
        );

        const dataEmptyTestsToRemove = previousTestIds.filter(
            testId => !dataAddedTestIds.includes(testId)
        );

        if (dataEmptyTestsToRemove.length > 0) {
            await client.query(
                `
                DELETE FROM registrations_tests
                WHERE registrations_id = $1 AND test_id = ANY($2::int[]);
                `,
                [registrationId, dataEmptyTestsToRemove]
            );
        }

        // Identify tests to add (new or edited tests)
        const testsToAdd = testIds.filter(testId => !dataAddedTestIds.includes(testId));
        const testRegisterTestsValues = testsToAdd
            .map(testId => `(${registrationId}, ${testId}, ${doctorId || 'NULL'})`)
            .join(',');

        if (testsToAdd.length > 0) {
            await client.query(
                `
                INSERT INTO registrations_tests (registrations_id, test_id, doctor_id)
                VALUES ${testRegisterTestsValues};
                `
            );
        }

        await client.query('COMMIT');

        return { success: true };
    } catch (error: any) {
        await client.query('ROLLBACK');
        throw new Error(`Transaction failed: ${error.message}`);
    } finally {
        client.release();
    }
}

export async function fetchAllInvestigationRegistrations(
    offset: number,
    limit: number,
    fromDate?: string,
    toDate?: string,
    patientId?: number,
    refNumber?: number,
    branchId?: number
) {
    try {
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
            trt.version AS registration_test_version,
            b.id AS branch_id,
            b.name AS branch_name,
            b.address AS branch_address,
            b.telephone AS branch_telephone,
            b.version AS branch_version
        FROM registrations AS tr
        INNER JOIN patients AS p ON tr.patient_id = p.id
        INNER JOIN registrations_tests AS trt ON tr.id = trt.registrations_id
        INNER JOIN tests AS t ON trt.test_id = t.id
        INNER JOIN branches AS b ON tr.branch_id = b.id
        LEFT JOIN doctors AS d ON trt.doctor_id = d.id
    `;

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
        if (branchId) {
            conditions.push(`tr.branch_id = $${params.length + 1}`);
            params.push(branchId);
        }

        const filteredRegisterConditions = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        const query = `
        WITH filtered_registers AS (
            SELECT tr.id
            FROM registrations AS tr
            ${filteredRegisterConditions}
            ORDER BY tr.id
            LIMIT $${params.length + 1} OFFSET $${params.length + 2}
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

        params.push(limit, offset);

        const { rows } = await pool.query(query, params);

        return rows;
    } catch (error) {
        throw error;
    }
}