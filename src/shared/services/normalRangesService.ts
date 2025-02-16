import { fetchNormalRangesByTest, fetchNormalRangesByTestField, upsertNormalRange } from "../repositories/normalRangesRepository";
import { addAuditTrailRecord } from "./auditTrailService";


export async function getNormalRangesByTestId(testId: number) {
    if (testId == undefined) {
        throw new Error("Investigation id must be defined");
    }
    return await fetchNormalRangesByTest(testId);
}

export async function getNormalRangesByTestFieldId(testfieldId: number) {
    if (testfieldId == undefined) {
        throw new Error("Investigation field id must be defined");
    }
    return await fetchNormalRangesByTestField(testfieldId);
}

export async function addOrUpdateNormalRangeRules(normalRules: any, userId: number) {
    const oldRules = await getNormalRangesByTestFieldId(normalRules.test_field_id);

    if (oldRules.normalRanges && oldRules.normalRanges.version != normalRules.version) {
        throw new Error("Version mismatch. Please fetch the latest version before updating!");
    }

    try {
        const res = await upsertNormalRange(Number(normalRules.test_field_id), Number(normalRules.test_id), normalRules.rules);
        addAuditTrailRecord(userId, "Update normal range rules", { new: normalRules, old: oldRules });
        return { message: oldRules.normalRanges ? "Normal range rules updated successfully" : "New normal range rules saved successfully", content: res };
    } catch (error) {
        throw error;
    }
}