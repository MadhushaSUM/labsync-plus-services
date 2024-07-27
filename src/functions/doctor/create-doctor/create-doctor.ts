import { addDoctor } from "../../../shared/services/doctorService";


export const handler = async (event: any) => {
    const doctorDetails = JSON.parse(event.body);

    try {
        const result = await addDoctor(doctorDetails);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Doctor added successfully', doctor: result })
        };
    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
        };
    }
};
