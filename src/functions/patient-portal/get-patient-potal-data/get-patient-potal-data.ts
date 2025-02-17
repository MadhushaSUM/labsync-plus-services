import { decryptQueryString } from "../../../shared/lib/patient-portal";
import { getInvestigationDataPatientPortal } from "../../../shared/services/investigationDataService";
import { getNormalRangesByTestId } from "../../../shared/services/normalRangesService";

export const handler = async (event: any) => {
    const { s: encryptedString } = event.queryStringParameters;

    try {
        if (!encryptedString) {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                },
                body: JSON.stringify({ message: "No encrypted text provided" })
            };
        }

        const { registrationId, investigationId } = await decryptQueryString(encryptedString);
        const investigationData = await getInvestigationDataPatientPortal(registrationId, investigationId);
        const normalRanges = await getNormalRangesByTestId(investigationId);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            },
            body: JSON.stringify({
                content: investigationData,
                normalRanges: normalRanges.normalRanges,
            }),
        };
    } catch (error: any) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            },
            body: JSON.stringify({ message: error.message || error.toString() }),
        };
    }
};

