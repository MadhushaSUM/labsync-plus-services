import { InvestigationRegistrationType } from '../types/investigationRegistration';
import pool from '../lib/db';

export async function saveInvestigationRegistration(invReg: InvestigationRegistrationType) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Insert into Investigation Registration
        const result = await client.query(
            `INSERT INTO public."Investigation Registration" (date, patient_id, doctor_id, cost, is_confirmed)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id`,
            [invReg.date, invReg.patient_id, invReg.doctor_id, invReg.cost, invReg.is_confirmed]
        );

        const registrationId = result.rows[0].id;

        // Insert into Registered Investigations
        const registeredInvestigations = invReg.investigations.map(id => `(${registrationId}, ${id})`).join(', ');
        const registeredInvestigationsQuery = `INSERT INTO public."Registered Investigations" (registration_id, investigation_id) VALUES ${registeredInvestigations}`;
        await client.query(registeredInvestigationsQuery);

        await client.query('COMMIT');

        return {
            ...invReg,
            id: registrationId
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

export async function fetchInvestigationRegistrationById(id: number): Promise<InvestigationRegistrationType | null> {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const regResult = await client.query(
            `SELECT id, date, patient_id, doctor_id, cost, is_confirmed, branch_id
            FROM public."Investigation Registration"
            WHERE id = $1`,
            [id]
        );

        if (regResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return null; // Return null if no record found
        }

        const registration = regResult.rows[0];

        const registeredInvestigationsResult = await client.query(
            `SELECT investigation_id
            FROM public."Registered Investigations"
            WHERE registration_id = $1`,
            [id]
        );
        const investigations = registeredInvestigationsResult.rows.map(row => row.investigation_id);

        const dataAddedInvestigationsResult = await client.query(
            `SELECT investigation_id
            FROM public."Data Added Investigations"
            WHERE registration_id = $1`,
            [id]
        );
        const dataAddedInvestigations = dataAddedInvestigationsResult.rows.map(row => row.investigation_id);

        await client.query('COMMIT');

        return {
            ...registration,
            investigations,
            data_added_investigations: dataAddedInvestigations
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

export async function modifyInvestigationRegistration(id: number, invReg: InvestigationRegistrationType) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Update the Investigation Registration record
        await client.query(
            `UPDATE public."Investigation Registration"
            SET date = $1, patient_id = $2, doctor_id = $3, cost = $4, is_confirmed = $5
            WHERE id = $6`,
            [invReg.date, invReg.patient_id, invReg.doctor_id, invReg.cost, invReg.is_confirmed, id]
        );

        // Remove old registered investigations
        await client.query(
            `DELETE FROM public."Registered Investigations"
            WHERE registration_id = $1`,
            [id]
        );

        // Insert new registered investigations
        const registeredInvestigations = invReg.investigations.map(id => [id, id]); // [(registrationId, investigationId)]
        if (registeredInvestigations.length > 0) {
            const registeredInvestigationsQuery = `INSERT INTO public."Registered Investigations" (registration_id, investigation_id) VALUES ${registeredInvestigations.map((_, i) => `($1, $${i + 2})`).join(', ')}`;
            await client.query(registeredInvestigationsQuery, [id, ...invReg.investigations]);
        }

        // Remove old data added investigations
        await client.query(
            `DELETE FROM public."Data Added Investigations"
            WHERE registration_id = $1`,
            [id]
        );

        // Insert new data added investigations
        const dataAddedInvestigations = invReg.data_added_investigations.map(id => [id, id]); // [(registrationId, investigationId)]
        if (dataAddedInvestigations.length > 0) {
            const dataAddedInvestigationsQuery = `INSERT INTO public."Data Added Investigations" (registration_id, investigation_id) VALUES ${dataAddedInvestigations.map((_, i) => `($1, $${i + 2})`).join(', ')}`;
            await client.query(dataAddedInvestigationsQuery, [id, ...invReg.data_added_investigations]);
        }

        await client.query('COMMIT');

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

export async function fetchAllInvestigationRegistrations(limit: number, offset: number, filterUnconfirmed: boolean = false) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        let query = `SELECT id, date, patient_id, doctor_id, cost, is_confirmed, branch_id
                     FROM public."Investigation Registration"`;
        const queryParams: any[] = [];

        if (filterUnconfirmed) {
            query += ' WHERE is_confirmed = false';
        }

        query += ' ORDER BY date DESC';
        query += ' LIMIT $1 OFFSET $2';

        queryParams.push(limit, offset);

        const result = await client.query(query, queryParams);

        const registrations = result.rows;

        const registrationIds = registrations.map(reg => reg.id);

        if (registrationIds.length === 0) {
            await client.query('COMMIT');
            return registrations.map(reg => ({
                ...reg,
                investigations: [],
                data_added_investigations: []
            }));
        }

        // Fetch registered investigations
        const registeredInvestigationsResult = await client.query(
            `SELECT registration_id, investigation_id
            FROM public."Registered Investigations"
            WHERE registration_id = ANY($1::int[])`,
            [registrationIds]
        );

        // Fetch data added investigations
        const dataAddedInvestigationsResult = await client.query(
            `SELECT registration_id, investigation_id
            FROM public."Data Added Investigations"
            WHERE registration_id = ANY($1::int[])`,
            [registrationIds]
        );

        // Commit the transaction
        await client.query('COMMIT');

        // Map the results into the desired format
        return registrations.map(reg => {
            const registeredInvestigations = registeredInvestigationsResult.rows
                .filter(row => row.registration_id === reg.id)
                .map(row => row.investigation_id);

            const dataAddedInvestigations = dataAddedInvestigationsResult.rows
                .filter(row => row.registration_id === reg.id)
                .map(row => row.investigation_id);

            return {
                ...reg,
                investigations: registeredInvestigations,
                data_added_investigations: dataAddedInvestigations
            };
        });
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

export async function modifyInvestigationRegisterConfirmation(invRegId: number, confirmed: boolean) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const result = await client.query(
            `UPDATE public."Investigation Registration"
            SET is_confirmed = $1
            WHERE id = $2`,
            [confirmed, invRegId]
        );

        if (result.rowCount === 0) {
            throw new Error('No record found with the provided ID');
        }

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

export async function addInvestigationToDataAdded(invRegId: number, investigationId: number) {
    try {

        const result = await pool.query(
            `INSERT INTO public."Data Added Investigations" (registration_id, investigation_id)
            VALUES ($1, $2)`,
            [invRegId, investigationId]
        );

        return result;

    } catch (error) {
        throw error;
    }
}
