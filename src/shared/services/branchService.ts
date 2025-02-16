import { validateBranch } from "../models/branch";
import { fetchAllBranches, fetchBranchById, modifyBranch, saveBranch } from "../repositories/branchRepository";
import { addAuditTrailRecord } from "./auditTrailService";


export async function getAllBranches(limit: number, offset: number, search?: string) {
    return await fetchAllBranches(limit, offset, search);
}

export async function getBranchById(branchId: number) {
    if (branchId == undefined) {
        throw new Error("Branch id must be defined");
    }
    return await fetchBranchById(branchId);
}

export async function addBranch(branch: any, userId: number) {
    const addingBranch = validateBranch(branch);

    addAuditTrailRecord(userId, "Add new branch", addingBranch);

    return await saveBranch(addingBranch);
}

export async function updateBranch(id: number, branchDetails: any, userId: number) {
    const updatingBranch = validateBranch(branchDetails);

    const oldBranch = await fetchBranchById(id);

    if (oldBranch.version != updatingBranch.version) {
        throw new Error("Version mismatch. Please fetch the latest version before updating!");
    } else {
        addAuditTrailRecord(userId, "Update patient", { new: updatingBranch, old: oldBranch });
        return await modifyBranch(id, updatingBranch);
    }
}